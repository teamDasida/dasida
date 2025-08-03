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
import { checkSession } from '../api/authApi';

function MainLayout() {
    const location = useLocation();
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const { setMainQuiz, setWrongAnswerNotes, setHasRegisteredKnowledge } = useMainQuizStore();

    // 최소 로딩 시간을 위한 상태 (1.5초 이상 로딩 애니메이션을 보여줌)
    const [minTimePassed, setMinTimePassed] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setMinTimePassed(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    // React Query를 통한 데이터 불러오기
    const {
        isLoading: sessionLoading,
        isError: sessionError,
        data: isSessionValid, // true | undefined
    } = useQuery({
        queryKey: ['sessionCheck'],
        queryFn: checkSession,
        retry: false, // 401일 때 재시도 불필요
        staleTime: 5 * 60 * 1000, // 5분 동안은 재호출 안 함
    });

    console.log(isSessionValid);
    
    const {
        data: homeData,
        isLoading: homeLoading,
        isError: homeError,
    } = useQuery({
        queryKey: ['home'],
        queryFn: fetchHomeData,
        enabled: !!isSessionValid, // 핵심!
    });

    const {
        data: wrongNotes,
        isLoading: wrongLoading,
        isError: wrongError,
    } = useQuery({
        queryKey: ['wrongAnswerNotes'],
        queryFn: fetchWrongAnswerNotes,
        enabled: !!isSessionValid, // 핵심!
    });
    // 스크롤 상단으로
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // homeData가 준비되면 store에 저장
    useEffect(() => {
        if (homeData) {
            const modifiedData: DataStructure = {
                ...homeData,
                quizzes: homeData.quizzes.map((q) => ({
                    ...q,
                    viewHint: false,
                    result: 'unanswered',
                })),
            };
            setMainQuiz(modifiedData);
            setHasRegisteredKnowledge(homeData.hasRegisteredKnowledge);
        }
    }, [homeData, setMainQuiz, setHasRegisteredKnowledge]);

    // wrongNotes가 준비되면 store에 저장
    useEffect(() => {
        if (wrongNotes) {
            setWrongAnswerNotes(wrongNotes);
        }
    }, [wrongNotes, setWrongAnswerNotes]);

    // 에러 시 메인으로 리다이렉트
    useEffect(() => {
        if (sessionError || homeError || wrongError) {
            navigate('/main');
        }
    }, [homeError, wrongError, navigate, sessionError]);

    // 데이터 로딩 중이거나 최소 시간 미경과 시 로딩 컴포넌트 표시
    if (sessionLoading || homeLoading || wrongLoading || !minTimePassed) {
        return <Loading />;
    }

    return (
        <>
            {location.pathname !== '/main' && <UserHeader isMobile={isMobile} />}
            <Outlet />
            {location.pathname !== '/main' && <AddBtn onConfirm={() => navigate('/knowledge/add')} />}
            {isMobile && location.pathname !== '/main' && <BottomBtns />}
        </>
    );
}

export default MainLayout;
