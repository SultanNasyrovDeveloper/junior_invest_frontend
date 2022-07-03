import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';

import App from 'app/App';
import { ObservableAuthProvider } from 'context';

import 'antd/dist/antd.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ObservableAuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </ObservableAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

