import { Row, Space, Button } from 'antd';
import { Formik } from 'formik';
import { Form, Input } from 'formik-antd'
import _ from 'lodash';
import React from 'react';
import YouTube from "react-youtube";

import { youtubeVideoValidationSchema } from "./validation";
import { extractYoutubeVideoId } from './utils';

const YoutubeVideoForm = (props) => {

  const {
    initialValues,
    onSubmit,
    onNext,
    onPrevious
  } = props;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableValidation={true}
      validationSchema={youtubeVideoValidationSchema}
    >
      {(form) => (
        <Form
          name="youtube_video"
          layout="vertical"
        >
          <Form.Item
            name="youtube_video_url"
            label="Ссылка на видео youtube"
          >
            <Input
              name="youtube_video_url"
              placeholder="https://www.youtube.com/watch?v=zrygIDMgfkM"
            />
          </Form.Item>

          <Row justify="center">
            <YouTube
              videoId={
                form.isValid &&
                extractYoutubeVideoId(form.values.youtube_video_url)
              }
            />
          </Row>

          <Row justify="end">
            <Space>
              <Button onClick={onPrevious}>Предыдущий шаг</Button>
              <Button
                onClick={onNext}
                disabled={!form.isValid}
              >Пропустить</Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!form.isValid || _.isEmpty(form.touched)}
              >Сохранить и продолжить</Button>
            </Space>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default YoutubeVideoForm;
