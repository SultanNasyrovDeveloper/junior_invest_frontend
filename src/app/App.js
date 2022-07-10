import { MenuOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from 'apps/home';
import UserProfilePage from 'apps/user';
import {
  SigninPage,
  SignupPage,
  RequiresAuth,
  RegistrationSuccessPage,
  ActivateAccountPage,
  ResetPasswordPage,
  ResetPasswordConfirmPage,
  ActivationSuccessPage
} from 'apps/auth';
import {
  ProjectListPage,
  NewProjectPage,
  ProjectsPage,
  GeneralInfoFormPage,
  ImagesFormPage,
  PresentationFormPage,
  ProjectPage,
  VideoFormPage
} from 'apps/project';
import { appStore } from 'store';

import {
  Layout,
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
          <Route path="/registration/success" element={<RegistrationSuccessPage />} />
          <Route path="/activate/:uid/:token" element={<ActivateAccountPage />} />
          <Route path="/activation/success" element={<ActivationSuccessPage />} />
          <Route path="/password/reset" element={<ResetPasswordPage />} />
          <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirmPage />} />

          <Route element={<ProjectsPage />} >
            <Route path="/projects" element={<ProjectListPage />} />
          </Route>

          {/* protected routes */}
          <Route element={<RequiresAuth />}>
            <Route path="/profile" element={<UserProfilePage />} />
            <Route element={<ProjectsPage />}>
              <Route element={<NewProjectPage />}>
                <Route path="/projects/new/general" element={<GeneralInfoFormPage />} />
                <Route path="/projects/new/presentation" element={<PresentationFormPage />} />
                <Route path="/projects/new/video" element={<VideoFormPage />} />
                <Route path="/projects/new/images" element={<ImagesFormPage />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      }
    />

  );
}

export default observer(App);
