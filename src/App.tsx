// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Main from './pages/Main/MainContainer';
import TodayQuiz from './pages/TodayQuiz/TodayQuizContainer';
import AddContainer from './pages/KnowledgeAdd/AddContainer';
import IncorrectList from './pages/IncorrectList/IncorrectList';
import List from './pages/KnowledgeList/List';
import Detail from './pages/KnowledgeDetail/Detail';
import MainLayout from './layouts/MainLayout';

function App() {


    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/main" element={<Main />} />
                <Route path="/" element={<TodayQuiz />} />
                <Route path="/knowledge" element={<List />} />
                <Route path="/knowledge/:id" element={<Detail />} />
                <Route path="/knowledge/add" element={<AddContainer />} />
                <Route path="/wrong-answers" element={<IncorrectList />} />
            </Route>
        </Routes>
    );
}

export default App;
