import { Row, Col, Card } from 'antd';
import React from 'react';

const ProjectsList = (props) => {

  const { projects } = props;

  console.log(projects);
  return (
    <Row gutter={[5, 5]}>
      {
        projects?.map(project => (
          <Col key={project.id} span={8}>
            <Card
              cover={
              <img
                src={project.images[0]?.thumbnail}
              />
            }
            >
              <Card.Meta
                title={project.name}
              />
            </Card>
          </Col>
        ))
      }
    </Row>
  );
};

export default ProjectsList;
