import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import DashboardAdmin from './pages/DashboardAdmin';
const router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(App, {}),
        children: [
            { path: 'login', element: _jsx(LoginPage, {}) },
        ],
    },
    {
        path: '/AdminDashboard',
        element: _jsx(DashboardAdmin, {})
    }
]);
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(RouterProvider, { router: router }) }));
