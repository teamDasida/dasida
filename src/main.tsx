// router.tsx (또는 index.tsx, main.tsx 등 라우터를 정의한 파일)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom'; 
import App from './App';
import Main from './pages/Main/Main';
import TodayQuiz from './pages/TodayQuiz/TodayQuiz';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <TodayQuiz /> },
      { path: '/main', element: <Main /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
