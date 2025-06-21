// src/App.tsx
import React, { useEffect } from 'react';
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
import { requestNotificationPermission } from './firebase';

function App() {
  /* --------------------------------------------------
     FCM 토큰 요청 → 로그 & 로컬저장 (첫 마운트 한 번)
  -------------------------------------------------- */
  useEffect(() => {
    let ignore = false; // StrictMode 두 번 호출 방지
    (async () => {
      const token = await requestNotificationPermission();
      if (!ignore && token) {
        console.log('[FCM] token:', token);
        localStorage.setItem('fcmToken', token);
        // TODO: 필요하면 여기서 서버로 POST
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

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
