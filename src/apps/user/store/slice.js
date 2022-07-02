import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload: { user }}) {
      state.user = user;
    }
  }
});

export const { actions } = userSlice;
export default userSlice.reducer;
