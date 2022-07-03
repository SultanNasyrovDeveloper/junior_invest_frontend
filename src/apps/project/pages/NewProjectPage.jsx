import { PageHeader, Row, Col, Card, Button, Spin } from 'antd';
import { useAsync } from 'react-use';
import React, {
  useState,
  useMemo,
  useRef,
  useCallback
} from 'react';

import { userStore, projectStore } from 'store';
import {
  fetchProjectCategories,
  fetchMyNewProject,
  createProject,
  updateProject
} from '../api';
import {
  ProjectFormCardStyled,
  FormSteps,
  GeneralInfoForm,
  PresentationForm,
} from '../components';

const NewProjectPage = () => {

  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [projectIsUploading, setProjectIsUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const currentForm = useMemo(() => {

    if (currentStep === 0) {
      return <GeneralInfoForm formRef={formRef} />;
    }
    if (currentStep === 1) {
      return <PresentationForm formRef={formRef} />;
    }
  }, [currentStep]);

  const handleNextStepClick = useCallback(async () => {
    debugger;
    if (formRef.current.isFieldsTouched()) {
      try {
        setProjectIsUploading(true);
        const validatedData = await formRef.current.validateFields();
        if (projectStore.myNewProject?.id) {
          const updatedProject = await updateProject(
            projectStore.myNewProject.id,
            validatedData
          );
          projectStore.updateMyNewProject(updatedProject);
        }
        else {
          const newProject = await createProject(validatedData);
          projectStore.setMyNewProject(newProject);
        }
      } catch (error) {
        console.log('Form is not valid');
        return;
      }
      finally {
        setProjectIsUploading(false);
      }
    }
    setCurrentStep(previousStepValue => previousStepValue + 1);
  }, [formRef, projectStore.myNewProject]);

  useAsync(async () => {
    setIsLoading(true);
    try {
      const projectCategories = await fetchProjectCategories();
      const myNewProject = await fetchMyNewProject(userStore.id);
      console.log(myNewProject);
      projectStore.setProjectCategories(projectCategories);
      projectStore.setMyNewProject(myNewProject);
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
        title="Create new project"
        ghost={false}
        extra={
          <>
            { currentStep !== 0 &&
              <Button
                onClick={() => setCurrentStep(prev => prev - 1)}
              >Предыдущий шаг</Button>
            }
            {
              currentStep < 4 &&
              <Button
                type="primary"
                loading={projectIsUploading}
                onClick={handleNextStepClick}
              >
                Сохранить и продолжить
              </Button>
            }
            { currentStep === 4 &&
              <Button
                type="primary"
                loading={isLoading}
              >Submit</Button>
            }
          </>
        }
      >
        <FormSteps currentStep={currentStep} />
      </PageHeader>

      <Row>
        <Col span={24}>
          <ProjectFormCardStyled>
            <Spin spinning={isLoading} delay={100} />
            { !isLoading && currentForm }
          </ProjectFormCardStyled>
        </Col>
      </Row>
    </>
  );
};

export default NewProjectPage;
