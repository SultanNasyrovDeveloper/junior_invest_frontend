import { Row, Col, Card } from 'antd';
import React, { useCallback } from 'react';
import {useNavigate, useLocation, Navigate} from 'react-router-dom';

import { authService, useAuth } from 'app';

import { fetchTokenPair, fetchMe } from './api';
import { SigninForm } from './components';
import { IAuthCredentials } from './types';

const SigninPage = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.state?.pathname || '/profile';

  const handleFormSubmit = useCallback(async (credentials: IAuthCredentials) => {
    try {
      const responseData = await fetchTokenPair(credentials);
      setUser(responseData.user);
      authService.setAuthData(responseData);
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  }, [setUser]);

  return (
    <Row justify="center">
      {
        user
          ? <Navigate to={from} state={{ from }} replace/>
          : <Col span={8}>
            <Card title="SignIn form">
              <SigninForm onSubmit={handleFormSubmit}/>
            </Card>
          </Col>
      }
    </Row>
  );
};

export default SigninPage;
