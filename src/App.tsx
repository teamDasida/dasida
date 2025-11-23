// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Main from './pages/Main/MainContainer';
import TodayQuiz from './pages/TodayQuiz/TodayQuizContainer';
import IncorrectList from './pages/IncorrectList/IncorrectList';
import Detail from './pages/KnowledgeDetail/Detail';
import KnowledgeListContainer from './pages/KnowledgeList/KnowledgeListContainer';
import NotFound from './pages/NotFound/NotFound';
import MainLayout from './layouts/MainLayout';
import useAutoSyncFcmToken from './hooks/useAutoSyncFcmToken';
import { IOSInAppGuard } from './components/IOSInAppGuard/IOSInAppGuard';

function App() {
  useAutoSyncFcmToken();

  return (
    // ✅ 최상단에서 인앱 가드: iOS 네이버앱이면 메인 렌더 대신 사파리 유도
    <IOSInAppGuard>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/main" element={<Main />} />
          <Route path="/" element={<TodayQuiz />} />
          <Route path="/knowledge" element={<KnowledgeListContainer />} />
          <Route path="/knowledge/:id" element={<Detail />} />
          <Route path="/wrong-answers" element={<IncorrectList />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </IOSInAppGuard>
  );
}

export default App;
