import React, { useMemo } from 'react';
import { Form, Input, Select } from "antd";
import { useSelector } from "react-redux";

import { projectSelectors } from '../../store';

const GeneralInfoForm = (props) => {

  const { initialValues, formRef } = props;
  const projectCategories = useSelector(projectSelectors.getProjectCategories);

  const projectCategoryOptions = useMemo(() => {
    return projectCategories?.map(category => {
      return { label: category.name, value: category.id };
    })
  }, [projectCategories]);

  return (
    <Form
      name="project"
      ref={formRef}
      layout="vertical"
    >
      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please enter project name!' }]}
      >
        <Select
          options={projectCategoryOptions}
        />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter project name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter project name!' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

    </Form>
  );
};

export default GeneralInfoForm;
