import { PageHeader, Row, Col, Spin, Card } from 'antd';
import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { userStore, projectStore, newProjectStore } from 'store';
import {
  fetchProjectCategories,
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
      const projectCategories = await fetchProjectCategories();
      const myNewProject = await fetchMyNewProject(userStore.id);
      projectStore.setProjectCategories(projectCategories);
      newProjectStore.setProject(myNewProject);
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
