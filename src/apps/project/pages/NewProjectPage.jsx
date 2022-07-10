import { PageHeader, Row, Col, Spin, Card } from 'antd';
import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { userStore, newProjectStore } from 'store';
import {
  fetchMyNewProject,
} from '../api';
import { FormSteps } from '../components';

const NewProjectPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useAsync(async () => {
    setIsLoading(true);
    try {
      if (!newProjectStore.project) {
        const myNewProject = await fetchMyNewProject(userStore.id);
        newProjectStore.setProject(myNewProject);
      }
      if (
        location?.pathname !== '/projects/new/general' &&
        !newProjectStore.id
      ) {
        navigate('/projects/new/general');
      }
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <PageHeader
        title="Создать новый проект"
        ghost={false}
      >
        <FormSteps />
      </PageHeader>

      <Row>
        <Col span={24}>
          <Card>
            <Spin spinning={isLoading} />
            { !isLoading && <Outlet /> }
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default NewProjectPage;
