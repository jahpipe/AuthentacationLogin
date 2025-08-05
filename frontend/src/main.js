import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import DashboardAdmin from './pages/DashboardAdmin';
import { RegisterPage } from './pages/RegisterPage';
import { Dashboard } from './pages/admin/Dashboard';
import { Orders } from './pages/admin/Orders';
import Users from './pages/admin/Users';
import Menu from './components/Menu';
const router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(App, {}),
        children: [
            { path: 'login', element: _jsx(LoginPage, {}) },
            { path: 'register', element: _jsx(RegisterPage, {}) },
        ],
    },
    {
        path: '/admindashboard',
        element: _jsx(DashboardAdmin, {}),
        children: [
            { path: '', element: _jsx(Dashboard, {}) }, // /admindashboard
            { path: 'orders', element: _jsx(Orders, {}) }, // /admindashboard/orders
            { path: 'users', element: _jsx(Users, {}) },
            { path: 'menu', element: _jsx(Menu, {}) },
        ],
    },
]);
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(RouterProvider, { router: router }) }));
