import { Button, Form, Input, Icon } from 'antd';
import React, { useCallback } from 'react';

const SigninForm = (props) => {

  const { onSubmit } = props;

  const onFinish = useCallback((data) => {
    onSubmit(data);
  }, []);

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Should be valid email address'
          }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SigninForm;
