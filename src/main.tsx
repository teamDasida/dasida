// router.tsx (또는 index.tsx, main.tsx 등 라우터를 정의한 파일)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Main from './pages/Main/Main';
import TodayQuiz from './pages/TodayQuiz/TodayQuiz';
import Editor from './pages/Editor/Editor';
import EditorView from './pages/Viewer/EditorView';
import List from './pages/List/List';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import IncorrectList from './pages/IncorrectList/IncorrectList';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <TodayQuiz /> },
            { path: '/main', element: <Main /> },
            { path: '/editor', element: <Editor /> },
            { path: '/list', element: <List /> },
            { path: '/incorrectList', element: <IncorrectList /> },
            { path: '/editorView', element: <EditorView /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
);
