import { Form, Upload, Typography } from 'antd';
import React, { useState } from 'react';

const maxFileSize = 1025 * 1000 * 5 ;

const PresentationForm = ({ formRef }) => {
  const [showFileSizeError, setShowFileSizeError ] = useState(false)
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setShowFileSizeError(false);
    if (e.file.status !== 'removed') {
      if (e.file.size > maxFileSize) {
        setShowFileSizeError(true);
        setFiles([]);
        return;
      }
      setFiles([e.file]);
      console.log(e);
    }
    else {
      setFiles([]);
    }
  };

  return (
    <Form
      ref={formRef}
      layout="vertical"
    >
      <Form.Item label="Презентация">
        <Form.Item
          name="presentation"
          valuePropName="file"
          noStyle
        >
          {
            showFileSizeError &&
            <Typography.Text type="danger">
              Размер файла привышает допустимый лимит
            </Typography.Text>
          }


          <Upload.Dragger
            name="files"
            maxCount={1}
            fileList={files}
            beforeUpload={() => false}
            onChange={handleChange}
            accept="
              .pps,
              .pptx,
              application/vnd.ms-powerpoint,
              application/vnd.openxmlformats-officedocument.presentationml.slideshow,
              application/vnd.openxmlformats-officedocument.presentationml.presentation
            "
          >
            <p className="ant-upload-text">Нажмите или перетащите файл в эту область для загрузки</p>
            <p className="ant-upload-hint">Файл в формате .ppx размером не более 5 МБ</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

export default PresentationForm;
