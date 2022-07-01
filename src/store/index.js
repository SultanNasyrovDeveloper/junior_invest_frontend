import { configureStore } from '@reduxjs/toolkit';

import { default as appStore } from 'app/store';

const rootReducer = {
  app: appStore
};

const store = configureStore({
  reducer: rootReducer
});

export default store;
