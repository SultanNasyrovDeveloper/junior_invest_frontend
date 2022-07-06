import { Upload, Form, Typography, Space, Button} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { newProjectStore } from 'store';

import { updateProject } from '../api';

const maxSize = 1024 * 1000 * 5;

const PresentationFormPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [showSizeErrorText, setShowSizeErrorText] = useState(false);

  const projectPresentation = useMemo(() => {
    if (newProjectStore.presentation) {
      const presentation = newProjectStore.presentation;
      return {
        name: presentation.name,
        size: presentation.size
      };
    }
  }, [newProjectStore.presentation]);

  const handleChange = useCallback((event) => {
    setHasChanged(true);
    setShowSizeErrorText(false);
    if (event?.file.status === 'removed') {
      setFiles([]);
      return;
    }
    if (event?.file.size > maxSize) {
      setShowSizeErrorText(true);
      setFiles([]);
      return
    }
    setFiles([event?.file]);
  }, [setHasChanged]);

  const handleSubmit = useCallback(async () => {
    const formData = new FormData();
    formData.append('presentation', files[0]);
    try {
      setUploading(true);
      const updatedProject = await updateProject(
        newProjectStore.id,
        formData,
        files[0].name
      )
      newProjectStore.updateProject(updatedProject);
      setHasChanged(false);
      navigate('/projects/new/video')
    }
    catch(error) {
      console.log(error);
    }
    finally {
      setUploading(false);
    }
  }, [files, newProjectStore.project]);

  useEffect(() => {
    if (projectPresentation) {
      setFiles([projectPresentation]);
    }
  }, [projectPresentation]);

  useEffect(() => {
    newProjectStore.setCurrentStep(1);
  }, [location, newProjectStore.project]);

  console.log(files)

  return (
    <Form layout="vertical">
      <Form.Item label="Презентация">
        {
          showSizeErrorText &&
          <Typography.Text type="danger">
            Превышен лимит размера файла.
          </Typography.Text>
        }

        <Form.Item
          valuePropName="file"
          noStyle
        >
          <Upload.Dragger
            name="files"
            accept=".pps,.ppsx,.ppt,.pptx"
            beforeUpload={() => false}
            maxCount={1}
            fileList={files}
            onChange={handleChange}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Нажмите или перетащите файл для загрузки</p>
            <p className="ant-upload-hint">Доступна загрузка файла в форматах .pps, .ppsx, .ppt, .pptx размером до 5 МБ</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Space>
            <Link to="/projects/new/general">
              <Button>Предыдущий шаг</Button>
            </Link>
            <Link to="/projects/new/video">
              <Button
                disabled={_.isEmpty(files)}
              >Пропустить</Button>
            </Link>
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={uploading}
              disabled={!hasChanged || _.isEmpty(files)}
            >Сохранить и продолжить</Button>
          </Space>
        </div>
      </Form.Item>
    </Form>
  );
};

export default observer(PresentationFormPage);
