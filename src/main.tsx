// src/main.tsx
/* -------------------------------------------------
   GitHub Pages 404 리다이렉트 ?p= 디코딩 한 줄
-------------------------------------------------- */
// const params = new URLSearchParams(window.location.search);
// const p = params.get('p');
// if (p) {
//     // 이중 인코딩 문제 해결: 슬래시가 %2F로 인코딩되는 것을 방지
//     let decoded = decodeURIComponent(p);
    
//     // 만약 경로가 /%2F로 시작한다면 수정
//     if (decoded.startsWith('/%2F')) {
//         decoded = '/' + decoded.substring(4);
//     }
    
//     window.history.replaceState({}, '', decoded);
// }
/* ------------------------------------------------- */

// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';
import './firebase'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);

// // router.tsx (또는 index.tsx, main.tsx 등 라우터를 정의한 파일)

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import App from './App';
// import Main from './pages/Main/Main';
// import TodayQuiz from './pages/TodayQuiz/TodayQuiz';
// import Editor from './pages/Editor/Editor';
// import EditorView from './pages/Viewer/EditorView';
// import List from './pages/List/List';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import IncorrectList from './pages/IncorrectList/IncorrectList';

// const queryClient = new QueryClient();

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <App />,
//         children: [
//             { index: true, element: <TodayQuiz /> },
//             { path: '/main', element: <Main /> },
//             { path: '/editor', element: <Editor /> },
//             { path: '/list', element: <List /> },
//             { path: '/incorrectList', element: <IncorrectList /> },
//             { path: '/editorView', element: <EditorView /> },
//         ],
//     },
// ]);

// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <React.StrictMode>
//         <QueryClientProvider client={queryClient}>
//             <RouterProvider router={router} />
//         </QueryClientProvider>
//     </React.StrictMode>
// );
