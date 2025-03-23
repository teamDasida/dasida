// src/App.tsx
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import Main from './pages/Main/Main';
import TodayQuiz from './pages/TodayQuiz/TodayQuiz';
import List from './pages/Knowledge/List';
import EditorView from './pages/Knowledge/Detail';
import Editor from './pages/Knowledge/Add';
import IncorrectList from './pages/IncorrectList/IncorrectList';

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
            <Route path="/knowledge/:id" element={<EditorView />} />
            <Route path="/knowledge/add" element={<Editor />} />
            <Route path="/wrong-answers" element={<IncorrectList />} />
        </Routes>
    );
}

export default App;
