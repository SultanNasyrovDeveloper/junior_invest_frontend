import { Form, Input, Select } from "antd";
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';

import { projectStore } from 'store';

const GeneralInfoForm = ({ formRef}) => {

  const initialValues = useMemo(() => {
    if (projectStore.myNewProject?.id) {
      return _.pick(
        projectStore.myNewProject,
        ['name', 'category', 'description']
      );
    }
    return null;
  }, [projectStore.myNewProject]);

  const categoryOptions = useMemo(() => {
    const categoriesList = projectStore.projectCategories || [];
    return categoriesList.map(category => ({
      value: category.id,
      label: category.name
    }));
  }, [projectStore.projectCategories]);

  return (
    <Form
      name="project"
      ref={formRef}
      layout="vertical"
      initialValues={initialValues}
    >
      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please enter project name!' }]}
      >
        <Select
          options={categoryOptions}
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

export default observer(GeneralInfoForm);
