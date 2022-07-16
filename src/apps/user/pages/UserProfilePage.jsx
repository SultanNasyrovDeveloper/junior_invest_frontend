import { PageHeader, Col, Card } from 'antd';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTitle } from 'react-use';

import { VerticalMarginRow } from 'components';
import { userStore } from 'store';
import { PersonalInfoForm, MyProjectsList } from '../components';

const ObservingPersonalInfoForm = observer(PersonalInfoForm);

const tabs = [
  { key: 'personal', tab: 'Личная информация' },
  { key: 'projects', tab: 'Мои проекты' },
];

const UserProfilePage = () => {
  useTitle('Профиль пользователя');
  const [activeTab, setActiveTab] = useState('personal');

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
              <ObservingPersonalInfoForm />
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
