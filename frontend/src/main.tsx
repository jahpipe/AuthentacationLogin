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
    element: <App />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/admindashboard',
    element: <DashboardAdmin />,
    children: [
      { path: '', element: <Dashboard/> }, // /admindashboard
      { path: 'orders', element: <Orders/> }, // /admindashboard/orders
      { path: 'users', element: <Users/> },   
      { path: 'menu', element: <Menu/> },

    ],
  },
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
