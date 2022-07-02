import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShowNavigation: false
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleNavigation: (state) => {
      state.isShowNavigation = !state.isShowNavigation;
    },
    showNavigation: (state) => {
      state.isShowNavigation = true;
    },
    closeNavigation: (state) => {
      state.isShowNavigation = false;
    }
  }
});

export const { actions } = appSlice;

export default appSlice.reducer;

