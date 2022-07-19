import { Result, Button, Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTitle } from "react-use";

const RegistrationSuccessPage = () => {

  useTitle('Подтверждение регистрации');

  return (
    <Card>
      <Result
        title="Форма регистрации заполнена успешно"
        subTitle="Ссылка для активации аккаунта была отправлена на указанную электронную почту"
        status="info"
        extra={[
          <Link to='/signup'>
            <Button>Назад</Button>
          </Link>,
          <Link to='/'>
            <Button type="primary">На главную</Button>
          </Link>,
        ]}
        ghost="false"
      />
    </Card>
  );
};

export default RegistrationSuccessPage;
