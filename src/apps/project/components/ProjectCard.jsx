import React from 'react';
import { Card, Row, Space } from "antd";
import { HeartOutlined }  from '@ant-design/icons';

const ProjectCard = (props) => {

  const { project, onClick } = props;

  return (
    <Card
      onClick={() => onClick(project)}
      hoverable={true}
      cover={
        <img
          src={project.images[0]?.thumbnail}
          alt={project.images[0]?.name}
        />
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
    </Card>
  );
};

export default ProjectCard;
