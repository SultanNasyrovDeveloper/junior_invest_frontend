import {
  PageHeader,
  Row,
  Col,
  Button,
  Descriptions,
  Card,
  Image,
  Space
} from 'antd';
import { LikeFilled } from '@ant-design/icons';
import _ from 'lodash';
import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useAsync } from 'react-use';
import { useParams, useNavigate } from 'react-router-dom';

import { VerticalMarginRow } from 'components';
import { projectStore } from 'store';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = useMemo(() => {
    return projectStore.projectDetail;
  }, [projectStore.projectDetail])

  useAsync(async () => {
    if (projectStore.projectDetail?.id !== id) {
      await projectStore.getProjectDetail(id);
    }
  }, [id]);

  return (
    <>
      <PageHeader
        ghost={false}
        title={project?.name}
        onBack={() => navigate('/projects')}
        extra={[
          <Button
            type="primary"
            icon={<LikeFilled style={{ marginRight: 5}}/>}
          >
            <Space>{project?.votes_count} Голосовать</Space>
          </Button>
        ]}
      />

      <VerticalMarginRow gutter={3}>
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
          <Card style={{ overflowY: 'auto' }}>
            <Row gutter={5}>

              <Image.PreviewGroup>
                <Image
                  width={200}
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                />
                <Image
                  width={200}
                  src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                />
              </Image.PreviewGroup>
            </Row>
          </Card>
        </Col>
      </VerticalMarginRow>

      <VerticalMarginRow>
        <Col span={24}>
          <Card
            title="Информация о проекте"
          >
            <Descriptions layout="vertical" column={24} bordered={true}>
              <Descriptions.Item label="Автор">
                {`${project?.author.last_name} ${project?.author.first_name}`}
              </Descriptions.Item>
              <Descriptions.Item label="Описание проекта">
                { project?.description }
              </Descriptions.Item>
              {
                !_.isEmpty(project?.media) &&
                <Descriptions.Item label="Ссылки на медиа ресурсы">
                  {
                    project?.media.map(media => (
                      <a href={media.url}>{ media.url }</a>
                    ))
                  }
                </Descriptions.Item>

              }

            </Descriptions>
          </Card>
        </Col>
      </VerticalMarginRow>
    </>
  );
};

export default observer(ProjectDetailPage);

