import { Form, Input, Select, Button, Space } from 'antd';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { useState, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffectOnce } from 'react-use';

import { projectStore } from 'store';
import { updateProject, createProject} from '../api';

const GeneralInfoFormPage = () => {

  const [hasChanged, setHasChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleValuesChange = useCallback((changed, allValues) => {
    setHasChanged(!_.isEqual(allValues, initialValues));
  }, [initialValues, setHasChanged]);

  const handleSubmit = useCallback(async (validatedData) => {

    let apiAction;
    let storeAction;
    let apiActionArgs;
    if (projectStore.myNewProject?.id) {
      apiAction = updateProject;
      storeAction = projectStore.updateMyNewProject;
      apiActionArgs = {
        projectId: projectStore.myNewProject.id,
        updateData: validatedData
      };
    }
    else {
      apiAction = createProject;
      storeAction = projectStore.setMyNewProject;
      apiActionArgs = { projectData: validatedData };
    }
    setIsLoading(true);
    
    try {
      const project = await apiAction(...apiActionArgs);
      storeAction(project);
      navigate('/projects/new/presentation')
    }
    catch(error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  }, []);

  useEffectOnce(() => {
    projectStore.setNewProjectFormStep(0);
  });

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
