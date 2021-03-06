import _ from 'lodash';
import React from 'react';
import { Card, Row, Space, Image, Tag } from "antd";
import { HeartOutlined }  from '@ant-design/icons';

import styled from 'styled-components';

const ProjectCardStyled = styled(Card)`
  height: 100%;
  
  .ant-skeleton-image {
    width: 100%;
    height: 100%;
  }
`;

const projectStatusesTranslate = {
  created: 'Заполняется',
  filled: 'На модерации',
  moderated: 'Модерация пройдена'
};

const projectStatusesColor = {
  created: 'orange',
  filled: 'blue',
  moderated: 'green'
};

const getProjectsStatus = (status) => {
  return projectStatusesTranslate[status];
}

const getTagColor = (status) => {
  return projectStatusesColor[status];
}

const ProjectCard = (props) => {

  const { project, onClick, showStatus } = props;

  return (
    <ProjectCardStyled
      onClick={() => onClick(project)}
      hoverable={true}
      cover={
        <>
          {
            !_.isEmpty(project.images) &&
            <Image
              preview={false}
              src={project.images[0]?.thumbnail}
              alt={project.images[0]?.name}
            />
          }
          {
            _.isEmpty(project.images) &&
            <Image
              preview={false}
              src="https://via.placeholder.com/400X300.png?text=Нет+Изображения"
            />
          }
        </>

      }
    >
      <Row>
        { _.truncate(project.name, { length: 75 }) }
      </Row>
      {
        showStatus &&
        <Tag color={getTagColor(project.status)}>
          { getProjectsStatus(project.status) }
        </Tag>
      }
      <Row justify="space-between">
        {`${project.author?.last_name} ${project.author?.first_name}`}

        <Space>
          <HeartOutlined />
          {project.votes_count}
        </Space>
      </Row>
    </ProjectCardStyled>
  );
};

export default ProjectCard;
