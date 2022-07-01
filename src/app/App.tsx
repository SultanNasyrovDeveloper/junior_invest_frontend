import React from 'react';
import { Routes, Route } from "react-router-dom";

import { RequiresAuth } from 'app/components';
import { NotFoundPage } from './pages';
import HomePage from 'pages/home';
import UserProfilePage from 'pages/user';
import SigninPage from 'pages/signin';


function App() {
  return (
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
  );
}

export default App;
