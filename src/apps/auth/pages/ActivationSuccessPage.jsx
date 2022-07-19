import React from 'react';
import { Button, Card, Result } from "antd";
import { Link } from "react-router-dom";
import { useTitle } from "react-use";

const ActivationSuccessPage = () => {

  useTitle('Активация успешна');

  return (
    <Card>
      <Result
        title="Активация аккаунта прошла успешно"
        subTitle="Ссылка для активации аккаунта была отправлена на указанную электронную почту"
        status="success"
        extra={[
          <Link to='/'>
            <Button>На главную</Button>
          </Link>,
          <Link to='/signin'>
            <Button type="primary">Войти</Button>
          </Link>,
        ]}
        ghost="false"
      />
    </Card>
  );
};

export default ActivationSuccessPage;
