import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import StartPage from '@/pages/StartPage';
import GamePage from '@/pages/GamePage';
import MainLayout from './components/layouts/MainLayout';

const router = createBrowserRouter([
  {
    element: <StartPage />,
    path: '/'
  },
  {
    element: <GamePage />,
    path: '/game'
  }
]);

const App: React.FC = () => (
  <MainLayout>
    <RouterProvider router={router} />
  </MainLayout>
);

export default App;
