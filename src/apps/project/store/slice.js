import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectCategories: null,
  projectDetail: null,
  projects: null,
  projectsCount: 0,
  page: 0,
  pageSize: 0,
  newProject: null
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectCategories(state, { payload: { categories }}) {
      state.projectCategories = categories;
    },
    setNewProject(state, { payload: { project }}) {
      state.newProject = project;
    }
  }
});

export const { actions } = projectSlice;
export default projectSlice.reducer;
