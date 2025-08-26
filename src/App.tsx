// src/App.tsx
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
import useAutoSyncFcmToken from './hooks/useAutoSyncFcmToken';

function App() {
    useAutoSyncFcmToken();

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
