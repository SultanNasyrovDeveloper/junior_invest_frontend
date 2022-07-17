import { PageHeader, Col, Card, notification } from 'antd';
import _ from 'lodash';
import React, { useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useTitle } from 'react-use';

import { VerticalMarginRow } from 'components';
import { userStore } from 'store';
import { PersonalInfoForm, MyProjectsList } from '../components';

const ObservingPersonalInfoForm = observer(PersonalInfoForm);

const tabs = [
  { key: 'personal', tab: 'Личная информация' },
  { key: 'projects', tab: 'Проекты' },
];

const UserProfilePage = () => {
  useTitle('Профиль пользователя');
  const [activeTab, setActiveTab] = useState('personal');

  const handleFormSubmit = useCallback(async (validatedData) => {
    const hasChanged = (
      validatedData.last_name !== userStore.user?.last_name
      || validatedData.first_name !== userStore.user?.first_name
    );

    const cleanValidatedData = _.omit(validatedData, 'email');
    if (hasChanged) {
      try {
        await userStore.updateUser(userStore.user.id, cleanValidatedData);
        notification.success({
          message: 'Данные успешно обновлены'
        });
      }
      catch(error) {
        notification.error({
          message: 'Не удалось обновить данные пользователя'
        });
      }
    }
  }, []);

  return (
    <>
      <PageHeader
        ghost={false}
        title={userStore.fullName}
      />

      <VerticalMarginRow>
        <Col span={24}>
          <Card
            tabList={tabs}
            onTabChange={setActiveTab}
          >
            {
              activeTab === 'personal' &&
              <ObservingPersonalInfoForm
                initialValues={userStore.user}
                onSubmit={handleFormSubmit}
              />
            }
            {
              activeTab === 'projects' &&
              <MyProjectsList />
            }

          </Card>
        </Col>
      </VerticalMarginRow>

    </>
  );
};

export default observer(UserProfilePage);
