import { MenuOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
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
import { appStore } from 'store';

import {
  Layout,
  RequiresAuth,
  HeaderLayout,
  UserMenu,
  SidebarMenu
} from './components';
import { NotFoundPage } from './pages';

function App() {

  return (
    <Layout
      header={
        <HeaderLayout
          burgerIcon={<MenuOutlined onClick={() => appStore.toggleSidebar()}/>}
          userMenu={<UserMenu/>}
        />
      }
      footer={<div>Footer</div>}
      navigationPanel={
        <SidebarMenu />
      }
      isShowNavigation={appStore.isSidebarVisible}
      onNavigationClose={() => appStore.closeSidebar()}
      content={
        <Routes>
          {/* public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/activate/:uid/:token" element={<ActivateAccountPage />} />
          <Route path="/password/reset" element={<ResetPasswordPage />} />
          <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirmPage />} />

          <Route path="/projects" element={<ProjectListPage />} />


          {/* protected routes */}
          <Route element={<RequiresAuth />}>
            <Route path="/profile" element={<UserProfilePage />} />

            <Route path="/projects/new" element={<NewProjectPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      }
    />

  );
}

export default observer(App);
