import _ from 'lodash';
import React from 'react';
import { Card, Row, Space, Image } from "antd";
import { HeartOutlined }  from '@ant-design/icons';

import styled from 'styled-components';

const ProjectCardStyled = styled(Card)`
  height: 100%;
  
  .ant-skeleton-image {
    width: 100%;
    height: 100%;
  }
`;

const ProjectCard = (props) => {

  const { project, onClick } = props;

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
        { project.name }
      </Row>
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
