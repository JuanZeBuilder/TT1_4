import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter, createRoutesFromElements, Route, RouterProvider
} from 'react-router-dom';

import App from './App.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import HomePage from './pages/HomePage.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="dashboard" element={<DashboardPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
