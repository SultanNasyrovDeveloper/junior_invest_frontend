import { PageHeader, Row, Col, Card, Button } from 'antd';
import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback
} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchProjectCategories,
  createProject,
  fetchMyNewProject
} from '../api';
import {
  FormSteps,
  GeneralInfoForm,
  PresentationForm,
} from '../components';
import { projectSelectors } from '../store';

const NewProjectPage = () => {
  const dispatch = useDispatch();

  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const projectCategories = useSelector(
    projectSelectors.getProjectCategories
  );
  const newProject = useSelector(projectSelectors.getNewProject);

  const formProps = useMemo(() => {
    return {
      formRef: formRef,
      initialValues: newProject
    }
  }, [formRef, newProject]);

  const currentForm = useMemo(() => {

    if (currentStep === 0) {
      return <GeneralInfoForm {...formProps} />;
    }
    if (currentStep === 1) {
      return <PresentationForm {...formProps}/>;
    }
  }, [currentStep, formProps]);

  const handleNextStepClick = useCallback(async () => {
    try {
      const validatedData = await formRef.current.validateFields();
      dispatch(createProject(validatedData))

    } catch (error) {
      console.log('Form is not valid');
    }
  }, [formRef]);

  useEffect(() => {
    setIsLoading(true);
    console.log('Is loading')
    dispatch(fetchMyNewProject)
    if (!projectCategories) {
      dispatch(fetchProjectCategories);
    }
    setIsLoading(false);
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
          {
            !isLoading &&
            <Card>
              { currentForm }
            </Card>
          }
        </Col>
      </Row>
    </>
  );
};

export default NewProjectPage;
