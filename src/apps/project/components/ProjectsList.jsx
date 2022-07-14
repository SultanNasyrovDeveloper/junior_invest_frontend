import { Row, Col, Empty } from 'antd';
import React from 'react';

import { VerticalMarginRow } from 'components';
import ProjectCard from './ProjectCard';


const ProjectsList = (props) => {

  const { projects, onClick } = props;

  return (
    <VerticalMarginRow gutter={[8, 8]}>
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
              onClick={onClick}
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
    </VerticalMarginRow>
  );
};

export default ProjectsList;
