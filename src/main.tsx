// router.tsx (또는 index.tsx, main.tsx 등 라우터를 정의한 파일)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import App from './App';
import Main from './pages/Main/Main';
import TodayQuiz from './pages/TodayQuiz/TodayQuiz';
import Editor from './pages/Editor/Editor';
import EditorView from './pages/Viewer/EditorView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <TodayQuiz /> },
      { path: '/main', element: <Main /> },
      { path: '/editor', element: <Editor /> },
      { path: '/editorView', element: <EditorView /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
