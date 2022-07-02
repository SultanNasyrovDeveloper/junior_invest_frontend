import { Row, Col, Card } from 'antd';
import React, { useCallback, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTitle } from 'react-use';

import { fetchMe } from 'apps/user/api';

import { login } from '../api';
import { SigninForm } from '../components';
import { useAuth } from '../hooks';
import AuthService from '../service';

const SigninPage = () => {
  useTitle('Вход в систему')
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const targetLocation = useMemo(() => {
    return location.state?.from?.pathname || '/profile';
  }, [location]);

  const handleFormSubmit = useCallback(async (credentials) => {
    try {
      const tokens = await login(credentials);
      AuthService.login(tokens);
      setIsLoggedIn(true);
    } catch(error) {
      console.log(error);
    }
    await dispatch(fetchMe);
    navigate(targetLocation);
  }, [dispatch, setIsLoggedIn, targetLocation]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(targetLocation);
    }
  }, [isLoggedIn, targetLocation]);

  return (
    <Row justify="center">
      <Col span={8}>
        <Card title="SignIn form">
          <SigninForm onSubmit={handleFormSubmit}/>
        </Card>
      </Col>
    </Row>
  );
};

export default SigninPage;
