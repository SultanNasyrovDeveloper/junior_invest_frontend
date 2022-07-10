import { Card, Col, Row } from 'antd';
import _ from 'lodash';
import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { signup } from '../api'
import { SignupForm } from '../components';

const SingupPage = () => {

  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleFormSubmit = useCallback(async (validatedData) => {
    try {
      await signup(validatedData);
      navigate('/registration/success');
    }
    catch(error) {
      if (error.response?.status === 400) {
        const serverErrors = error.response.data;
        const formErrors = [];
        _.forIn(serverErrors, (fieldErrorMessages, fieldName) => {
          formErrors.push({name: fieldName, errors: fieldErrorMessages});
        });
        formRef.current.setFields(formErrors);
      }
      console.log(error);
    }
  },[]);

  return (
    <Row justify="center">
      <Col span={8}>
        <Card title="Форма регистрации">
          <SignupForm
            formRef={formRef}
            onSubmit={handleFormSubmit}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default SingupPage;
