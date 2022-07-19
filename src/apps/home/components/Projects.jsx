import {Typography, Button, Col, Row, Empty} from 'antd';
import React from 'react';

import { StyledHomePageRow } from './components.styled';
import ProjectCard from "apps/project/components/ProjectCard";

const Projects = (props) => {

  const { projects, onProjectClick, onButtonClick } = props;

  return (
    <>
      <StyledHomePageRow justify="center">
        <Typography.Title level={2}>Проекты</Typography.Title>
      </StyledHomePageRow>

      <StyledHomePageRow gutter={[8, 8]}>
        {
          projects?.map(project => (
            <Col
              key={project.id}
              xs={24}
              md={12}
              lg={8}
              xl={6}
            >
              <ProjectCard
                project={project}
                onClick={() => onProjectClick(project.id)}
              />
            </Col>
          ))
        }
        {
          (!projects || projects?.length === 0) &&
          <Row
            justify="center"
            align="middle"
            style={{width: '100%', minHeight: '30vh'}}
          >
            <Empty description="Список проектов пуст" />
          </Row>
        }
      </StyledHomePageRow>


      <StyledHomePageRow justify="center">
        <Button
          size="large"
          onClick={onButtonClick}
          type="primary"
        >Смотреть еще</Button>
      </StyledHomePageRow>
    </>
  );
};

export default Projects;
