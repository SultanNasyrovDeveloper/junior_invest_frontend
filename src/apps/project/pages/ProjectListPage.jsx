import {
  PageHeader,
  Button,
  Select,
  Pagination,
  Space,
} from 'antd';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { useState, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTitle, useAsync } from 'react-use';

import { VerticalMarginRow } from 'components';
import { projectStore } from 'store';
import { fetchProjects } from '../api';
import {
  ProjectsList,
  CategoryFilterSelectMenu,
} from '../components';
import { orderingOptions, pageSizeOptions } from '../constants';

const ObservingProjectsList = observer(ProjectsList);
const ObservingCategorySelectFilter = observer(CategoryFilterSelectMenu);

const ProjectListPage = () => {

  useTitle('Список проектов');
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [projectsCount, setProjectsCount] = useState(0);
  const [ordering, setOrdering] = useState('created');
  const [chosenCategories, setChosenCategories] = useState(new Set());

  const orderingSelectOptions = useMemo(() => {
    const options = []
    _.forOwn(orderingOptions, (value, key) => {
      options.push({ label: value, value: key });
    });
    return options;
  }, []);

  const queryParams = useMemo(() => {
    const queryParams = new URLSearchParams();
    queryParams.append('order', ordering);
    queryParams.append('limit', pageSize);
    queryParams.append('offset', pageSize * (page - 1))
    chosenCategories.forEach(categoryId => {
      queryParams.append('category', categoryId);
    });
    return queryParams;
  }, [page, pageSize, ordering, chosenCategories]);

  const handleCategoryFilterChange = useCallback((event, categoryId) => {
    event.target.checked
      ? setChosenCategories(prev => {
        const newChosenCategories = new Set(prev);
        newChosenCategories.add(categoryId);
        return newChosenCategories;
      })
      : setChosenCategories(prev => {
        const newChosenCategories = new Set(prev);
        newChosenCategories.delete(categoryId);
        return newChosenCategories;
      });
  }, []);

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
        title="Список проектов"
        ghost={false}
        extra={
          <Link to="/projects/new/general">
            <Button type="primary">Создать</Button>
          </Link>
        }
      >
        Здесь вы можете увидеть список проектов, созданных талантливыми учениками со всего Татарстана.
      </PageHeader>

      <div>
        {
          !_.isEmpty(projectStore.projectsList) &&
          <VerticalMarginRow justify="space-between">
            <Select
              value={pageSize}
              options={pageSizeOptions}
              onChange={setPageSize}
            />
            <Space>
              <ObservingCategorySelectFilter
                categories={projectStore.projectCategories}
                checked={chosenCategories}
                onChange={handleCategoryFilterChange}
              />
              <Select
                style={{minWidth: 250}}
                value={ordering}
                options={orderingSelectOptions}
                onChange={setOrdering}
              />
            </Space>
          </VerticalMarginRow>
        }

        <ObservingProjectsList
          projects={projectStore.projectsList}
          onClick={(project) => navigate(`/projects/${project.id}`)}
        />

        {
          !_.isEmpty(projectStore.projectsList) &&
          <VerticalMarginRow justify="center">
            <Pagination
              current={page}
              pageSize={pageSize}
              total={projectsCount}
              onChange={setPage}
            />
          </VerticalMarginRow>
        }
      </div>
    </>
  );
};

export default observer(ProjectListPage);
