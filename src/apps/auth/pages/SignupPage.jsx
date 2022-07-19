import { Card, Col, Row } from 'antd';
import _ from 'lodash';
import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signup } from '../api'
import { SignupForm } from '../components';

const SingupPage = () => {

  const formRef = useRef(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = useCallback(async (validatedData) => {
    setLoading(true);
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
    }
    finally {
      setLoading(false);
    }
  },[]);

  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={12} lg={8}>
        <Card title="Форма регистрации">
          <SignupForm
            loading={loading}
            formRef={formRef}
            onSubmit={handleFormSubmit}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default SingupPage;
