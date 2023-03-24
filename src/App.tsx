import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import HomePage from '@/pages/HomePage';

const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: '/'
  }
]);

const App: React.FC = () => <RouterProvider router={router} />;

export default App;
