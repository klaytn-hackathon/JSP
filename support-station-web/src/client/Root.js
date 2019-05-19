import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App';

const Root = () => (
  <BrowserRouter>
    <div style={{ height: '100vh', background: 'white' }}>
      <App />
    </div>
  </BrowserRouter>
);

export default Root;
