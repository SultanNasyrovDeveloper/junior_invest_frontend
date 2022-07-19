import { Col, Card, Typography } from 'antd';
import React from 'react';
import { useTitle, useAsync } from 'react-use';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import createProjectImage from 'assets/icons/create_project.png';
import viewProjectsImage from 'assets/icons/viewProjects.png';

import { projectStore } from 'store';

import { VerticalMarginRow } from 'components';
import { Banner, Projects } from './components';

const ObservingProjects = observer(Projects);

const HomePage = () => {
  useTitle(' Junior Invest');
  const navigate = useNavigate();

  useAsync(async () => {
    const queryParams = { limit: 8, status: 'moderated' };
    await projectStore.fetchProjects(queryParams);
  }, []);

  return (
    <>
      <Banner
        title="Junior Invest"
        subtitle="Платформа для поддержки проектов талантливых детей"
        actions="Таомртвло"
      />

      <VerticalMarginRow gutter={5}>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            cover={<img src={createProjectImage} alt=""/>}
            onClick={() => navigate('/projects/new/general')}
          >
            <VerticalMarginRow justify="center">
              <Typography.Title level={4} type="primary">Раскрути свой проект</Typography.Title>
            </VerticalMarginRow>

          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card
            hoverable
            style={{ height: '100%' }}
            onClick={() => navigate('/projects')}
            cover={<img src={viewProjectsImage} alt=""/>}
          >
            <VerticalMarginRow justify="center">
              <Typography.Title level={4} type="primary">Смотри проекты участников</Typography.Title>
            </VerticalMarginRow>
          </Card>
        </Col>
      </VerticalMarginRow>

      <ObservingProjects
        projects={projectStore.projectsList}
        onProjectClick={(projectId) => navigate(`/projects/${projectId}`)}
        onButtonClick={() => navigate('/projects')}
      />
    </>
  );
};

export default observer(HomePage);
