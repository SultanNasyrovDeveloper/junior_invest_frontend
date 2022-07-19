import { PageHeader, Col, Card, notification } from 'antd';
import _ from 'lodash';
import React, { useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useTitle, useAsync } from 'react-use';
import { useNavigate } from 'react-router-dom';

import { VerticalMarginRow } from 'components';
import { userStore } from 'store';
import { ProjectsList } from 'apps/project/components';
import { PersonalInfoForm } from '../components';

const ObservingPersonalInfoForm = observer(PersonalInfoForm);
const ObservingProjectsList = observer(ProjectsList);

const tabs = [
  { key: 'personal', tab: 'Личная информация' },
  { key: 'projects', tab: 'Проекты' },
];

const UserProfilePage = () => {
  useTitle('Профиль пользователя');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [dataIsUploading, setDataIsUploading] = useState(false);

  const handleFormSubmit = useCallback(async (validatedData) => {
    const hasChanged = (
      validatedData.last_name !== userStore.user?.last_name
      || validatedData.first_name !== userStore.user?.first_name
    );

    const cleanValidatedData = _.omit(validatedData, 'email');
    if (hasChanged) {
      try {
        setDataIsUploading(true);
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
      finally {
        setDataIsUploading(false);
      }
    }
  }, []);

  const handleProjectClick = useCallback((project) => {
    if (project.status === 'created') {
      navigate('/projects/new/general');
      return;
    }
    navigate(`/projects/${project.id}`);

  }, []);

  useAsync(async () => {
    try {
      await userStore.fetchMyProjects();
    }
    catch(error) {
    }
  }, [activeTab]);

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
                loading={dataIsUploading}
                initialValues={userStore.user}
                onSubmit={handleFormSubmit}
              />
            }
            {
              activeTab === 'projects' &&
              <ObservingProjectsList
                projects={userStore.myProjects}
                onClick={handleProjectClick}
                showProjectStatus={true}
              />
            }
          </Card>
        </Col>
      </VerticalMarginRow>
    </>
  );
};

export default observer(UserProfilePage);
