// src/components/TodayQuiz/TodayQuizContainer.tsx
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchHomeData } from '../../api/todayQuiz';
import { DataStructure } from '../../type';
import TodayQuizView from './TodayQuizView';

export default function TodayQuizContainer() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery<DataStructure, Error>({
    queryKey: ['home'],
    queryFn: fetchHomeData,
  });

  // GET 요청 중 에러(예: 401 에러) 발생 시 '/main'으로 이동
  useEffect(() => {
    if (isError) {
      navigate('/main');
    }
  }, [isError, navigate]);

  // '나의 지식' 클릭 시 '/list'로 이동하는 핸들러
  const handleKnowledgeClick = () => {
    navigate('/list');
  };

  return (
    <TodayQuizView
      data={data}
      isLoading={isLoading}
      onKnowledgeClick={handleKnowledgeClick}
    />
  );
}
