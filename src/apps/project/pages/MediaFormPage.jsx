import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { newProjectStore } from 'store';
import { updateProject } from '../api';
import { MediaForm } from '../components'

const MediaFormPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const initialValues = useMemo(() => {
    if (!newProjectStore.media) {
      return {};
    }
    return { media: newProjectStore.media };
  }, [newProjectStore.media])


  const handleFormSubmit = useCallback(async (validatedData) => {
    try {
      const updatedProject = await updateProject(
        newProjectStore.id,
        validatedData
      );
      newProjectStore.updateProject(updatedProject);
      navigate('/projects/new/images')
    }
    catch(error) {
      console.log(error);
    }
  }, [newProjectStore.id]);

  const handlePrevious = useCallback(() => {
    navigate('/projects/new/presentation');
  }, []);

  const handleNext = useCallback(() => {
    navigate('/projects/new/images');
  }, [navigate]);

  useEffect(() => {
    newProjectStore.setCurrentStep(2);
  }, [location]);

  return (
    <MediaForm
      initialValues={initialValues}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onSubmit={handleFormSubmit}
    />
  );
};

export default observer(MediaFormPage);
