import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectCategories: [],
  projectDetail: [],
  projects: [],
  projectsCount: 0,
  page: 0,
  pageSize: 0,
  newProject: {}
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectCategories(state, { payload: { categories }}) {
      state.projectCategories = categories;
    }
  }
});

export const { actions } = projectSlice;
export default projectSlice.reducer;
