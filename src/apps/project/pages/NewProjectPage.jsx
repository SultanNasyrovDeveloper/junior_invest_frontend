import { PageHeader, Row, Col, Card, Button } from 'antd';
import _ from 'lodash';
import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback
} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchProjectCategories } from '../api';
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

  const currentForm = useMemo(() => {

    if (currentStep === 0) {
      return <GeneralInfoForm formRef={formRef}/>;
    }
    if (currentStep === 1) {
      return <PresentationForm formRef={formRef}/>;
    }
  }, [currentStep]);

  const handleNextStepClick = useCallback(async () => {
    try {
      const validatedData = await formRef.current.validateFields();
      console.log(validatedData);

    } catch (error) {
      console.log('Form is not valid');
    }
  }, [formRef]);

  useEffect(() => {
    if (_.isEmpty(projectCategories)) {
      dispatch(fetchProjectCategories);
    }
  }, [dispatch, projectCategories]);


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
                Следующий шаг
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
          <Card>
            { currentForm }
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default NewProjectPage;
