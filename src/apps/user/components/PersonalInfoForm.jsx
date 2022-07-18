import _ from 'lodash';
import { Row, Col, Form, Input, Button } from 'antd';
import React from 'react';
import {MailOutlined, UserOutlined} from "@ant-design/icons";

const PersonalInfoForm = (props) => {

  const { initialValues, loading, onSubmit } = props;

  return (
      <Row gutter={5}>
        <Col xs={24} md={14}>
          {
            initialValues &&
            <Form
              name="basic"
              layout="vertical"
              initialValues={initialValues}
              onFinish={onSubmit}
              autoComplete="off"
            >
              <Form.Item
                label="Фамилия"
                name="last_name"
                normalize={(value) => _.startCase(value)}
                rules={[{ required: true, message: 'Введите фамилию' }]}
              >
                <Input
                  placeholder="Иванов"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                label="Имя"
                name="first_name"
                normalize={(value) => _.startCase(value)}
                rules={[{ required: true, message: 'Введите имя' }]}
              >
                <Input
                  placeholder="Иван"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                label="Электронная почта"
                name="email"
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  disabled={true}
                />
              </Form.Item>
              <Form.Item
              >
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                >Сохранить</Button>
              </Form.Item>
            </Form>
          }
        </Col>
      </Row>
  );
};

export default PersonalInfoForm;
