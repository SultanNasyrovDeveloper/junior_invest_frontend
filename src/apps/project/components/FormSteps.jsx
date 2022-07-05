import { Steps } from 'antd';
import {
  ContainerOutlined,
  FileImageOutlined,
  SnippetsOutlined,
  YoutubeOutlined
} from "@ant-design/icons";
import React from 'react';
import { observer } from 'mobx-react-lite';

import { newProjectStore } from 'store';

const FormSteps = () => {

  return (
    <Steps
      current={newProjectStore.currentStep}
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
    </Steps>
  );
};

export default observer(FormSteps);
