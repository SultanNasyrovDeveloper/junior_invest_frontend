import { Form, Input, Row, Space } from 'antd';
import {
  MailOutlined,
  LockOutlined
} from '@ant-design/icons';
import React, { useCallback } from 'react';

import { SubmitButton } from '../components';

const SigninForm = (props) => {

  const { formRef, onSignupClick, onSubmit } = props;

  const onFinish = useCallback((data) => {
    onSubmit(data);
  }, []);

  return (
    <Form
      name="signin-form"
      ref={formRef}
      initialValues={{ remember: true }}
      layout="vertical"
      onFinish={onFinish}
      validateTrigger="onBlur"
      autoComplete="off"
    >
      <Form.Item
        label="Электронная почта"
        name="email"
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Введите валидный адрес почты'
          }]}
      >
        <Input
          size="large"
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="ivan_ivanov@mail.ru"
        />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{
          required: true,
          message: 'Введите пароль'
        }]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Пароль"
        />
      </Form.Item>

      <Form.Item>
        <SubmitButton
          size="large"
          type="primary"
          htmlType="submit"
        >
          Войти
        </SubmitButton>
      </Form.Item>

      <Row justify="center">
        <Space>
          <span>
            Нет аккаунта?
          </span>
          <a onClick={onSignupClick}>Зарегистрироваться</a>
        </Space>

      </Row>
    </Form>
  );
};

export default SigninForm;
