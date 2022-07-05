import { Button, Form, Space, Input } from "antd";
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { newProjectStore } from 'store';
import { updateProject } from '../api';
import { YoutubeVideoForm } from '../components'

const youtubeVideoStart = 'https://www.youtube.com/watch?v=';

const VideoFormPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const initialValues = useMemo(() => {
    if (!newProjectStore.youtubeVideoUrl) {
      return {};
    }
    return { youtube_video_url: newProjectStore.youtubeVideoUrl };
  }, [newProjectStore.youtubeVideoUrl])


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
  }, []);

  useEffect(() => {
    newProjectStore.setCurrentStep(2);
  }, [location]);

  return (
    <YoutubeVideoForm
      initialValues={initialValues}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onSubmit={handleFormSubmit}
    />
  );
};

export default observer(VideoFormPage);
