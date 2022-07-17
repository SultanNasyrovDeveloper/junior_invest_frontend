import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';

const MediaForm = () => {
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  return (
    <Form
      name="dynamic_form_item"
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.List name="media">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                label={index === 0 ? 'Ссылки на медиа ресурсы' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onBlur']}
                  name="url"
                  rules={[
                    {
                      required: true,
                      type: 'url',
                      message: "Введите влидную ссылку на медиа ресурс или удалите это поле",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="Ссылка на ресурс" style={{ width: '90%' }} />
                </Form.Item>
                <MinusCircleOutlined
                  style={{ marginLeft: '1rem' }}
                  onClick={() => remove(field.name)}
                />
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Добавить
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MediaForm;
