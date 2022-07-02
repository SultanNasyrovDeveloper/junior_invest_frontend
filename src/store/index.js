import { configureStore } from '@reduxjs/toolkit';

import { default as appStore } from 'app/store';
import { default as authStore } from 'apps/auth/store';
import { default as userStore } from 'apps/user/store';
import { default as projectStore } from 'apps/project/store';

const rootReducer = {
  app: appStore,
  auth: authStore,
  user: userStore,
  project: projectStore
};

const store = configureStore({
  reducer: rootReducer
});

export default store;
