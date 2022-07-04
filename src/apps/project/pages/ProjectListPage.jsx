import { PageHeader, Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const ProjectListPage = () => {
  return (
    <>
      <PageHeader
        title="Projects list"
        ghost={false}
        extra={
          <Link to="/projects/new/general">
            <Button type="primary">Create</Button>
          </Link>
        }
      >
        Here you can see list of available projects created by young talented students
      </PageHeader>
    </>
  );
};

export default ProjectListPage;
