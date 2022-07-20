import {
  PageHeader,
  Button,
  Select,
  Pagination,
  Space,
} from 'antd';
import _ from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTitle, useAsync } from 'react-use';

import { VerticalMarginRow } from 'components';
import { projectStore } from 'store';
import {
  ProjectsList,
  CategoryFilterSelectMenu,
} from '../components';
import { orderingOptions, pageSizeOptions } from '../constants';

const ObservingProjectsList = observer(ProjectsList);
const ObservingCategorySelectFilter = observer(CategoryFilterSelectMenu);

const ProjectListPage = () => {

  useTitle('Список проектов');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [projectsCount, setProjectsCount] = useState(0);
  const [ordering, setOrdering] = useState('created');
  // const [chosenCategories, setChosenCategories] = useState(new Set());

  const projects = useMemo(() => {
    return projectStore.projectsList;
  }, [projectStore.projectsList])

  const orderingSelectOptions = useMemo(() => {
    const options = []
    _.forOwn(orderingOptions, (value, key) => {
      options.push({ label: value, value: key });
    });
    return options;
  }, []);

  const chosenCategories = useMemo(() => {
    return searchParams.getAll('category').map((category) => parseInt(category));
  }, [searchParams]);
  console.log(chosenCategories)

  const queryParams = useMemo(() => {
    const queryParams = new URLSearchParams();
    queryParams.append('order', ordering);
    queryParams.append('status', 'moderated');
    queryParams.append('limit', pageSize);
    queryParams.append('offset', pageSize * (page - 1))
    searchParams.forEach((value, key) => {
      queryParams.append(key, value);
    })
    return queryParams;
  }, [page, pageSize, ordering, searchParams]);

  console.log(queryParams.toString());

  const addChosenCategory = useCallback((categoryId) => {
    const newSearchParams = searchParams;
    newSearchParams.append('category', categoryId);
    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

  const removeChosenCategory = useCallback((categoryId) => {
    const newSearchParams = searchParams;
    const entries = newSearchParams.getAll('category');
    const newEntries = entries.filter(entry => entry !== `${categoryId}`);
    newSearchParams.delete('category');
    newEntries.forEach(newEntry => newSearchParams.append('category', newEntry));
    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

  const handleCategoryFilterChange = useCallback((event, categoryId) => {
    event.target.checked
      ? addChosenCategory(categoryId)
      : removeChosenCategory(categoryId);
  }, []);

  useEffect(() => {
    console.log('Updating query based on chosen categories');
    const newSearchParams = searchParams;
    chosenCategories.forEach((categoryId) => {
      if (!newSearchParams.getAll('category').includes(`${categoryId}`)) {
        newSearchParams.append('category', categoryId);
      }
    });
    setSearchParams(newSearchParams);
  }, [chosenCategories]);

  useAsync(async () => {
    try {
      console.log(queryParams.toString());
      const [,count] = await projectStore.fetchProjects(queryParams);
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

        <ObservingProjectsList
          projects={projects}
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
