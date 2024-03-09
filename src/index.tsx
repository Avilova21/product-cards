import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ErrorContextProvider } from './shared/context/ErrorContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ErrorContextProvider>
    <App />
  </ErrorContextProvider>
);