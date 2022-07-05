import { Button, Row, Space } from 'antd';
import _ from 'lodash';
import React from 'react';
import { Formik } from 'formik';
import { Form, Select, Input } from 'formik-antd'

import { generalInfoValidationSchema } from './validation';

const GeneralInfoForm = (props) => {

  const {
    initialValues,
    categoryOptions,
    onSubmit,
    onNext,
    isLoading
  } = props;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generalInfoValidationSchema}
      validateOnChange={true}
      onSubmit={onSubmit}
    >
      {({ touched, isValid }) => (
        <Form layout="vertical">
          <Form.Item label="Категория" name="category">
            <Select name="category" options={categoryOptions}/>
          </Form.Item>

          <Form.Item label="Название" name="name">
            <Input name="name" showCount={true} />
          </Form.Item>

          <Form.Item label="Описание" name="description">
            <Input.TextArea name="description" rows={4} showCount={true} />
          </Form.Item>
          <Row justify="end">
            <Space>
              <Button
                onClick={onNext}
                disabled={!_.isEmpty(touched)}
              >Пропустить</Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={_.isEmpty(touched) || !isValid }
                loading={isLoading}
              >Сохранить и продолжить</Button>
            </Space>
          </Row>

        </Form>
      )}
    </Formik>
  );
};

export default GeneralInfoForm;
