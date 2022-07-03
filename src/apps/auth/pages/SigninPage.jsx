import { Row, Col, Card } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTitle } from 'react-use';

import { userStore } from 'store';
import { fetchMe } from 'apps/user/api';

import { signin } from '../api';
import { SigninForm } from '../components';
import { useAuth } from '../hooks';
import AuthService from '../service';

const SigninPage = () => {
  useTitle('Вход в систему')
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const targetLocation = useMemo(() => {
    return location.state?.from?.pathname || '/profile';
  }, [location]);

  const handleFormSubmit = useCallback(async (credentials) => {
    try {
      const tokens = await signin(credentials);
      AuthService.login(tokens);
      setIsLoggedIn(true);
      const user = await fetchMe();
      userStore.setUser(user);
    } catch(error) {
      console.log(error);
    }
    navigate(targetLocation);
  }, [setIsLoggedIn, targetLocation]);

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

export default observer(SigninPage);
