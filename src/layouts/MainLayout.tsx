// src/layouts/MainLayout.tsx
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import UserHeader from '../components/UserHeader/UserHeader';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataStructure } from '../type';
import { fetchHomeData, fetchWrongAnswerNotes } from '../api/quizApi';
import Loading from '../components/Loading/Loading';
import useMainQuizStore from '../store/useMainQuizStore';
import AddBtn from '../components/AddBtn/AddBtn';
import BottomBtns from '../components/BottomBtns/BottomBtns';

function MainLayout() {
    const location = useLocation();
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const { setMainQuiz } = useMainQuizStore();

    // 최소 로딩 시간을 위한 상태 (1.5초 이상 로딩 애니메이션을 보여줌)
    const [minTimePassed, setMinTimePassed] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setMinTimePassed(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // React Query를 통한 데이터 불러오기
    const { data: homeData, isLoading: homeLoading, isError: homeError } = useQuery({
        queryKey: ['home'],
        queryFn: fetchHomeData,
    });
    const { data: wrongNotes, isLoading: wrongLoading, isError: wrongError } = useQuery({
        queryKey: ['wrongAnswerNotes'],
        queryFn: fetchWrongAnswerNotes,
    });
    useEffect(() => {
        window.scrollTo(0, 0);
  
    }, [homeError, location.pathname]);
    // 데이터가 불러와지면 quizzes에 viewHint와 result 값을 추가하여 zustand 스토어에 저장
    useEffect(() => {
        if (homeData) {
            const modifiedData: DataStructure = {
                ...homeData,
                quizzes: homeData.quizzes.map((quiz) => ({
                    ...quiz,
                    viewHint: false, // 힌트 보기 상태 (기본값 false)
                    result: 'unanswered', // 정답 여부 상태 (기본값 unanswered)
                })),
            };
            setMainQuiz(modifiedData);
        }
    }, [homeData, setMainQuiz]);
    useEffect(() => {
        if (wrongNotes) {
            console.log('Wrong answer notes:', wrongNotes);
        }
    }, [wrongNotes]);

    // 데이터 로딩 중이거나 최소 1.5초가 지나지 않은 경우 Loading 컴포넌트 표시
    if (homeLoading || wrongLoading || !minTimePassed) return <Loading />;


    if (homeError || wrongError) {
        navigate('/main');
    }
    return (
        <>
            {!isMobile && location.pathname !== '/main' && <UserHeader />}
            <Outlet />
            {location.pathname !== '/main' && <AddBtn onConfirm={() => navigate('/knowledge/add')} />}
            {isMobile && location.pathname !== '/main' && <BottomBtns />}
        </>
    );
}

export default MainLayout;
