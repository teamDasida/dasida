// src/App.tsx
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import Main from './pages/Main/MainContainer';
import TodayQuiz from './pages/TodayQuiz/TodayQuiz';
import AddContainer from './pages/KnowledgeAdd/AddContainer';
import IncorrectList from './pages/IncorrectList/IncorrectList';
import List from './pages/KnowledgeList/List';
import Detail from './pages/KnowledgeDetail/Detail';

function App() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <Routes>
            <Route path="/main" element={<Main />} />
            <Route path="/" element={<TodayQuiz />} />
            <Route path="/knowledge" element={<List />} />
            <Route path="/knowledge/:id" element={<Detail />} />
            <Route path="/knowledge/add" element={<AddContainer />} />
            <Route path="/wrong-answers" element={<IncorrectList />} />
        </Routes>
    );
}

export default App;
