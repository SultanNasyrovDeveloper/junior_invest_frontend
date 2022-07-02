import { MenuOutlined } from '@ant-design/icons';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import HomePage from 'apps/home';
import UserProfilePage from 'apps/user';
import {
  SigninPage,
  SignupPage,
  ActivateAccountPage,
  ResetPasswordPage,
  ResetPasswordConfirmPage,
} from 'apps/auth';
import {
  ProjectListPage,
  NewProjectPage
} from 'apps/project';

import {
  Layout,
  RequiresAuth,
  HeaderLayout,
  UserMenu,
  SidebarMenu
} from './components';
import { NotFoundPage } from './pages';
import { appSelectors, appActions } from './store';

function App() {

  const dispatch = useDispatch();
  const isShowNavigation = useSelector(appSelectors.getIsShowNavigation)

  return (
    <Layout
      header={
        <HeaderLayout
          burgerIcon={<MenuOutlined
            onClick={() => dispatch(appActions.toggleNavigation())}
          />}

          userMenu={<UserMenu/>}
        />
      }
      footer={<div>Footer</div>}
      navigationPanel={
        <SidebarMenu />
      }
      isShowNavigation={isShowNavigation}
      onNavigationClose={() => dispatch(appActions.closeNavigation())}
      content={
        <Routes>
          {/* public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/activate/:uid/:token" element={<ActivateAccountPage />} />
          <Route path="/password/reset" element={<ResetPasswordPage />} />
          <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirmPage />} />


          {/* protected routes */}
          <Route element={<RequiresAuth />}>
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/projects" element={<ProjectListPage />} />
            <Route path="/projects/new" element={<NewProjectPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      }
    />

  );
}

export default App;
