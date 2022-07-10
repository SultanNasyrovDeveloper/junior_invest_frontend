import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { projectStore, newProjectStore } from 'store';
import { updateProject, createProject} from '../api';

import { GeneralInfoForm } from '../components';
import { useTitle } from "react-use";

const GeneralInfoFormPage = () => {

  useTitle('Форма создания проекта - общая информация');

  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()

  const initialValues = useMemo(() => {
    if (newProjectStore.id) {
      return _.pick(
        newProjectStore.project,
        ['name', 'category', 'description']
      );
    }
    return {};
  }, [newProjectStore.project]);

  const categoryOptions = useMemo(() => {
    const categoriesList = projectStore.projectCategories || [];
    return categoriesList.map(category => ({
      value: category.id,
      label: category.name
    }));
  }, [projectStore.projectCategories]);

  const handleSubmit = useCallback(async (validatedData) => {
    setIsUploading(true);
    try {
      if (newProjectStore.id) {
        const updatedProject = await updateProject(
          newProjectStore.id,
          validatedData
        );
        newProjectStore.updateProject(updatedProject);
      } else {
        const newProject = await createProject(validatedData);
        newProjectStore.setProject(newProject);
      }
      navigate('/projects/new/presentation');
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setIsUploading(false);
    }
  }, []);

  const handleNext = useCallback(() => {
    navigate('/projects/new/presentation');
  }, []);

  useEffect(() => {
    newProjectStore.setCurrentStep(0);
  }, [location]);

  return (
    <GeneralInfoForm
      initialValues={initialValues}
      categoryOptions={categoryOptions}
      onSubmit={handleSubmit}
      isUploading={isUploading}
      onNext={handleNext}
    />
  );
};

export default observer(GeneralInfoFormPage);
