import _ from "lodash";
import { Button, Row, Space, Col, Typography } from 'antd';
import React from 'react';

import { mediaValidationSchema } from "./validation";
import { Input, Form } from "formik-antd";
import { Formik, FieldArray } from "formik";

import { VerticalMarginRow } from 'components';

const MediaForm = (props) => {

  const { initialValues, onPrevious, onNext, onSubmit } = props;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={mediaValidationSchema}
      onSubmit={onSubmit}
    >
      {({ touched, isValid, values }) => (

        <Form layout="vertical">
          <Typography>Ссылки на медиа ресурсы</Typography>
          <FieldArray name="media">
            { ({ remove, push }) => (
              <>
                {
                  values.media?.length > 0 &&
                  values.media.map((media, index) => (
                    <>
                      <Row key={`media.[${index}].url`}>
                        <Col xs={24} md={20}>
                          <Form.Item name={`media.[${index}].url`}>
                            <Input name={`media.[${index}].url`} placeholder="Адрес ресурса"/>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={4}>
                          <Button onClick={() => remove(index)}>Удалить</Button>
                        </Col>
                      </Row>

                    </>
                  ))
                }
                <VerticalMarginRow>
                  <Button
                    onClick={() => push({ url: '' })}
                  >Добавить</Button>
                </VerticalMarginRow>

              </>
            ) }
          </FieldArray>

          <Row justify="end">
            <Space>
              <Button
                onClick={onPrevious}
              >Предыдущий шаг</Button>
              <Button
                disabled={!isValid || !_.isEmpty(touched) || _.isEmpty(values)}
                onClick={onNext}
              >Пропустить</Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!isValid }
              >Сохранить и продолжить</Button>
            </Space>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default MediaForm;
