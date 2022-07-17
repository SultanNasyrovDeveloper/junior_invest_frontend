import React from 'react';
import { useTitle, useAsync } from 'react-use';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { projectStore } from 'store';

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
      <ObservingProjects
        projects={projectStore.projectsList}
        onProjectClick={(projectId) => navigate(`/projects/${projectId}`)}
        onButtonClick={() => navigate('/projects')}
      />
    </>
  );
};

export default observer(HomePage);
