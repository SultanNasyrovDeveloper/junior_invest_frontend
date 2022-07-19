import { Row, Col, Card, notification } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTitle } from 'react-use';

import { userStore } from 'store';

import { SigninForm } from '../components';
import { useAuth } from '../hooks';
import AuthService from '../service';

const SigninPage = () => {
  useTitle('Вход в систему');
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const targetLocation = useMemo(() => {
    return location.state?.from?.pathname || '/profile';
  }, [location]);

  const handelSignupClick = useCallback(() => {
    navigate('/signup');
  }, [navigate])

  const handleFormSubmit = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const tokens = await userStore.signin(credentials);
      AuthService.login(tokens);
      setIsLoggedIn(true);
      await userStore.fetchMe();
      navigate(targetLocation);
    } catch(error) {
      notification.error({
        message: 'Не удалось войти в систему',
        description: 'Пользователь с таким именем и паролем не найден попробуйте еще раз.'
      });
      AuthService.logout();
      setIsLoggedIn(false);
      formRef.current.resetFields()
    }
    finally {
      setLoading(false);
    }
  }, [setIsLoggedIn, targetLocation]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(targetLocation);
    }
  }, [isLoggedIn, targetLocation]);

  return (
    <Row justify="center">
      <Col  xs={24} sm={20} md={12} lg={8}>
        <Card title="Авторизация">
          <SigninForm
            loading={loading}
            formRef={formRef}
            onSignupClick={handelSignupClick}
            onSubmit={handleFormSubmit}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default observer(SigninPage);
