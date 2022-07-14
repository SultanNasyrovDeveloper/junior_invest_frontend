import { PageHeader, Row, Col, Button, Descriptions, Card } from 'antd';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useAsync } from 'react-use';
import { useParams, useNavigate } from 'react-router-dom';

import { VerticalMarginRow } from 'components';
import { projectStore } from 'store';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useAsync(async () => {
    if (projectStore.projectDetail?.id !== id) {
      await projectStore.getProjectDetail(id);
    }
  }, [id]);


  return (
    <>
      <PageHeader
        ghost={false}
        title={projectStore.projectDetail?.name}
        onBack={() => navigate('/projects')}
        extra={[
          <Button type="primary">Голосовать</Button>
        ]}
      />

      <VerticalMarginRow>
        <Col
          xs={24}
          md={20}
        >
          <Card>
            <iframe
              title="project-presentation"
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${'https://www.free-power-point-templates.com/wp-content/files/160930-artificial-intelligence-template-16x9.pptx'}`}
              width="100%"
              height="550px"
              frameBorder="0"
            ></iframe>
          </Card>
        </Col>

        <Col xs={24} md={4}>
          <Row gutter={5}>
            <Col xs={4} md={24}>
              Youtube video
            </Col>
            <Col xs={4} md={24}>
              Image
            </Col>
          </Row>
        </Col>
      </VerticalMarginRow>

      <VerticalMarginRow>
        <Descriptions>
          <Descriptions.Item label="Описание проекта">
            { projectStore.projectDetail?.description }
          </Descriptions.Item>
          <Descriptions.Item label="Автор">
            {`${projectStore.projectDetail?.author.last_name} ${projectStore.projectDetail?.author.first_name}`}
          </Descriptions.Item>
        </Descriptions>
      </VerticalMarginRow>
    </>
  );
};

export default observer(ProjectDetailPage);

