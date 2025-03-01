import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from './pages/Main/Main';
import TodayQuiz from './pages/TodayQuiz/TodayQuiz';

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <TodayQuiz /> },
            { path: '/main', element: <Main /> },
        ],
    },
]);

// Retrieve the element and check if it's null
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </React.StrictMode>
    );
} else {
    console.error('Failed to find the root element');
}
