import {
  PageHeader,
  Button,
  Row,
  Col,
  Select,
  Pagination
} from 'antd';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTitle, useAsync } from 'react-use';

import { projectStore } from 'store';
import { fetchProjects } from '../api';
import { ProjectsList } from '../components';
import { orderingOptions, pageSizeOptions } from '../constants';

const ObservingProjectsList = observer(ProjectsList);


const ProjectListPage = () => {

  useTitle('Список проектов');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [projectsCount, setProjectsCount] = useState(0);
  const [ordering, setOrdering] = useState('created');

  const orderingSelectOptions = useMemo(() => {
    const options = []
    _.forOwn(orderingOptions, (value, key) => {
      options.push({ label: value, value: key });
    });
    return options;
  }, []);

  const queryParams = useMemo(() => {
    return {
      limit: pageSize,
      offset: pageSize * (page - 1)
    };
  }, [page, pageSize, ordering]);

  useAsync(async () => {
    try {
      const [projects, count] = await fetchProjects(queryParams);
      projectStore.setProjects(projects);
      setProjectsCount(count);
    }
    catch(error) {
      console.log(error);
    }
  }, [queryParams]);

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

      <div>
        <Row>
          <Col span={6}>Категории</Col>
          <Col span={18}>
            <Row justify="space-between" >
              <Select
                value={pageSize}
                options={pageSizeOptions}
                onChange={setPageSize}
              />
              <Select
                value={ordering}
                options={orderingSelectOptions}
                onChange={setOrdering}
              />
            </Row>

            <ObservingProjectsList
              projects={projectStore.projectsList}
            />

            <Row justify="center">
              <Pagination
                defaultCurrent={page}
                total={Math.floor(projectsCount / pageSize)}
              />
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default observer(ProjectListPage);
