import { MenuOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";

import { Layout, RequiresAuth, HeaderLayout, UserMenu } from './components';
import { NotFoundPage } from './pages';
import HomePage from 'pages/home';
import UserProfilePage from 'pages/user';
import SigninPage from 'pages/signin';

function App() {
  const [isShowNavigation, setIsShowNavigation] = useState(false);

  return (
    <Layout
      header={
        <HeaderLayout
          burgerIcon={<MenuOutlined
            onClick={() => setIsShowNavigation(prev => !prev)}
          />}

          userMenu={<UserMenu/>}
        />
      }
      footer={<div>Footer</div>}
      navigationPanel={<div>Navigation Panel</div>}
      isShowNavigation={isShowNavigation}
      onNavigationClose={() => setIsShowNavigation(false)}
      content={
        <Routes>
          {/* public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SigninPage />} />

          {/* protected routes */}
          <Route element={<RequiresAuth />}>
            <Route path="/profile" element={<UserProfilePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      }
    />

  );
}

export default App;
