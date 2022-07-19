import { Form, Input } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  UserOutlined
} from "@ant-design/icons";
import _ from 'lodash';
import React from 'react';
import { SubmitButton } from '../components';


const SignupForm = (props) => {

  const { onSubmit, formRef, loading } = props;

  return (
    <Form
      ref={formRef}
      layout="vertical"
      onFinish={onSubmit}
    >

      <Form.Item
        label="Фамилия"
        name="last_name"
        normalize={(value) => _.startCase(value)}
        rules={[{ required: true, message: 'Введите фамилию' }]}
      >
        <Input
          size="large"
          prefix={<UserOutlined />}
          placeholder="Иванов"
        />
      </Form.Item>
      <Form.Item
        label="Имя"
        name="first_name"
        normalize={(value) => _.startCase(value)}
        rules={[{ required: true, message: 'Введите имя' }]}
      >
        <Input
          size="large"
          prefix={<UserOutlined />}
          placeholder="Иван"
        />
      </Form.Item>
      <Form.Item
        label="Электронная почта"
        name="email"
        rules={[{
          required: true,
          type: 'email',
          message: 'Введите валидный адрес электронной почты'
        }]}
      >
        <Input
          size="large"
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="ivanov_ivan@mail.ru"
        />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Введите пароль' }]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Пароль"
        />
      </Form.Item>
      <Form.Item
        label="Подтверждение пароля"
        name="re_password"
        rules={[{ required: true, message: 'Посторите пароль' }]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Пароль"
        />
      </Form.Item>
      <Form.Item>
        <SubmitButton
          loading={loading}
          size="large"
          type="primary"
          htmlType="submit"
        >Зарегистрироваться</SubmitButton>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
