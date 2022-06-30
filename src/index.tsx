import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import App from 'app/App';
import store from 'store';

import 'antd/dist/antd.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

