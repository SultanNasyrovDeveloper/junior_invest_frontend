import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});

export const { actions } = authSlice;
export default authSlice.reducer;
