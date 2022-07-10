import { observer } from 'mobx-react-lite';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAsync } from 'react-use';

import { projectStore } from 'store';
import { fetchProjectCategories } from "../api";

const ProjectsPage = () => {

  useAsync(async () => {
    try {
      if (!projectStore.projectCategories) {
        const projectCategories = await fetchProjectCategories();
        projectStore.setProjectCategories(projectCategories);
      }
    }
    catch(error) {
      console.log(error);
    }
  }, []);

  return <Outlet />;
};

export default observer(ProjectsPage);
