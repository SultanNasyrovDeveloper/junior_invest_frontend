import { Modal, Upload, Form, Progress, Row, Space, Button, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import { newProjectStore } from 'store';
import { createProjectImage, deleteProjectImage, updateProject } from '../api';
import { useTitle } from "react-use";

const getBase64 = (file)  =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const maxImageSize = 1024 * 1000 * 3;

const ImagesFormPage = () => {

  useTitle('Форма создания проекта - загрузка изображений');

  const location = useLocation();
  const navigate = useNavigate();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState([]);

  const readyToBeModerated = useMemo(() => {
    return (newProjectStore.id && newProjectStore.presentation);
  }, [newProjectStore.project]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || (file.preview));
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ file, fileList: newFileList }) => {
    if (file.size > maxImageSize) {
      return;
    }
    setFiles(newFileList);
  };

  const handleRemove = useCallback(async (file) => {
    const imageId = file.response.id;
    try {
      await deleteProjectImage(imageId);
      newProjectStore.deleteProjectImage(imageId);
    }
    catch(error) {
      return false;
    }
  }, []);

  const checkSize = useCallback((file) => {
    if (file.size > maxImageSize) {
      return false;
    }
  }, []);

  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setUploadProgress(percent);
        if (percent === 100) {
          setTimeout(() => setUploadProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };
    fmData.append("file", file);
    try {
      const image = await createProjectImage(
        newProjectStore.id,
        fmData,
        config
      );
      newProjectStore.addProjectImage(image);
      onSuccess(image);
    } catch (error) {
      onError({ error });
    }
  };

  const handleSubmit = useCallback(async () => {
    try {
      try {
        await updateProject(newProjectStore.id, { status: 'filled' });
        newProjectStore.deleteProject();
        navigate('/projects')
        notification.success({
          message: 'Проект передан на модерацию',
          description: 'Проект заполнен успешно и передан на модерацию. Вы можете следить за статусом своих проектов в личном кабинете.'
        })
      }
      catch(error) {
        console.log(error)
      }
    }
    catch(error) {
      console.log(error);
    }
  }, [newProjectStore.project]);

  useEffect(() => {
    newProjectStore.setCurrentStep(3);
    if (newProjectStore.images) {
      const images = newProjectStore.images.map(image => ({
        uid: image.id,
        url: image.file.url,
        size: image.file.size,
        name: image.file.name,
        response: image
      }));
      setFiles(images);
    }
  }, [location, newProjectStore.images]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Form layout="vertical">
      <Form.Item label="Изображения">
        <Upload
          accept="image/png, image/jpeg"
          listType="picture-card"
          fileList={files}
          onPreview={handlePreview}
          onChange={handleChange}
          customRequest={uploadImage}
          beforeUpload={checkSize}
          maxCount={5}
          onRemove={handleRemove}
        >
          {files.length >= 5 ? null : uploadButton}
        </Upload>
        {uploadProgress > 0 ? <Progress percent={uploadProgress} /> : null}
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img
            alt="example"
            style={{
              width: '100%',
            }}
            src={previewImage}
          />
        </Modal>
      </Form.Item>
      <Row justify="end">
        <Space>
          <Link to="/projects/new/media">
            <Button>Предыдущий шаг</Button>
          </Link>

          <Button
            type="primary"
            disabled={!readyToBeModerated}
            onClick={handleSubmit}
          >Отправить на модерацию</Button>
        </Space>
      </Row>
    </Form>

  );
};

export default observer(ImagesFormPage);

