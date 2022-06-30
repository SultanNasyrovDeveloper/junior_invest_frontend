import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IAppState {
}

const initialState: IAppState = {
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {}
});

export const { actions } = appSlice;

export default appSlice.reducer;
