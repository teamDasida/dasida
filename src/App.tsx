// src/App.tsx
// import { useEffect } from 'react';npm
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Main from './pages/Main/MainContainer';
import TodayQuiz from './pages/TodayQuiz/TodayQuizContainer';
import AddContainer from './pages/KnowledgeAdd/AddContainer';
import IncorrectList from './pages/IncorrectList/IncorrectList';
import Detail from './pages/KnowledgeDetail/Detail';
import KnowledgeListContainer from './pages/KnowledgeList/KnowledgeListContainer';
import NotFound from './pages/NotFound/NotFound';
import MainLayout from './layouts/MainLayout';
// import { getFcmToken, PUSH_AVAILABLE } from './firebase';

function App() {
    /* --------------------------------------------------
     FCM 토큰 요청 → 로그 & 로컬저장 (첫 마운트 한 번)
  -------------------------------------------------- */
    // useEffect(() => {
    //     let ignore = false;

    //     (async () => {
    //         console.log('▶ PUSH_AVAILABLE:', PUSH_AVAILABLE); // ① 브라우저 지원 여부
    //         console.log('▶ Notification.permission:', Notification.permission); // ② 권한 상태

    //         if (!PUSH_AVAILABLE) return;

    //         const token = await getFcmToken();
    //         console.log('▶ getFcmToken() 반환값:', token);

    //         if (!ignore && token) {
    //             console.log('[FCM] token:', token);
    //         }
    //     })();

    //     return () => void (ignore = true);
    // }, []);

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/main" element={<Main />} />
                <Route path="/" element={<TodayQuiz />} />
                <Route path="/knowledge" element={<KnowledgeListContainer />} />
                <Route path="/knowledge/:id" element={<Detail />} />
                <Route path="/knowledge/add" element={<AddContainer />} />
                <Route path="/wrong-answers" element={<IncorrectList />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
