import { Steps } from 'antd';
import React from 'react';
import {
  ContainerOutlined,
  FileAddOutlined,
  FileImageOutlined,
  SnippetsOutlined,
  YoutubeOutlined
} from "@ant-design/icons";

const FormSteps = (props) => {

  const { currentStep } = props;

  return (
    <Steps
      current={currentStep}
      labelPlacement="vertical"
    >
      <Steps.Step
        title="Общая информация"
        icon={<ContainerOutlined />}
      />
      <Steps.Step
        title="Презентация"
        icon={<SnippetsOutlined />}
      />
      <Steps.Step
        title="Видео"
        icon={<YoutubeOutlined />}
      />
      <Steps.Step
        title="Изображения"
        icon={<FileImageOutlined />}
      />
      <Steps.Step
        title="Материалы"
        icon={<FileAddOutlined />}
      />
    </Steps>
  );
};

export default FormSteps;
