import { Form, Input, Button, Typography } from 'antd';
import React from 'react';

const SignupForm = (props) => {

  const { onSubmit, formRef } = props;

  return (
    <Form
      ref={formRef}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Form.Item
        label="Фамилия"
        name="last_name"
        rules={[{ required: true, message: 'Пожалуйста введите фамилию' }]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        label="Имя"
        name="first_name"
        rules={[{ required: true, message: 'Пожалуйста введите фамилию' }]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        label="Эллектронаня почта"
        name="email"
        rules={[{ required: true, message: 'Пожалуйста введите фамилию' }]}
      >
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: 'Пожалуйста введите фамилию' }]}
      >
        <Input.Password placeholder="password" />
      </Form.Item>
      <Form.Item
        label="Подтверждение пароля"
        name="re_password"
        rules={[{ required: true, message: 'Пожалуйста введите фамилию' }]}
      >
        <Input.Password placeholder="input placeholder" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
