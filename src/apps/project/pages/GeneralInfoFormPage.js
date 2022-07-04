import { Form, Input, Select, Button, Space } from 'antd';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { projectStore, newProjectStore } from 'store';
import { updateProject, createProject} from '../api';

const GeneralInfoFormPage = () => {

  const [hasChanged, setHasChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()

  const initialValues = useMemo(() => {
    if (newProjectStore.id) {
      return _.pick(
        newProjectStore.project,
        ['name', 'category', 'description']
      );
    }
    return null;
  }, [newProjectStore.project]);

  const categoryOptions = useMemo(() => {
    const categoriesList = projectStore.projectCategories || [];
    return categoriesList.map(category => ({
      value: category.id,
      label: category.name
    }));
  }, [projectStore.projectCategories]);

  const handleValuesChange = useCallback((changed, allValues) => {
    setHasChanged(!_.isEqual(allValues, initialValues));
  }, [initialValues, setHasChanged]);

  const handleSubmit = useCallback(async (validatedData) => {
    setIsLoading(true);
    try {
      if (newProjectStore.id) {
        const updatedProject = await updateProject(
          newProjectStore.id,
          validatedData
        );
        newProjectStore.updateProject(updatedProject);
      } else {
        const newProject = await createProject(validatedData);
        newProjectStore.setProject(newProject);
      }
      navigate('/projects/new/presentation');
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }

  }, []);

  useEffect(() => {
    newProjectStore.setCurrentStep(0);
  }, [location]);

  return (
    <Form
      name="project"
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleSubmit}
      onValuesChange={handleValuesChange}
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
        <Input.TextArea rows={4}/>
      </Form.Item>

      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Space>
            <Link to="/projects/new/presentation">
              <Button
                disabled={!!initialValues && hasChanged }
              >Пропустить</Button>
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!hasChanged}
              loading={isLoading}
            >Сохранить и продолжить</Button>
          </Space>
        </div>
      </Form.Item>
    </Form>
  );
};

export default observer(GeneralInfoFormPage);
