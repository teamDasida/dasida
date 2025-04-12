// src/layouts/MainLayout.tsx
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import UserHeader from '../components/UserHeader/UserHeader';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataStructure } from '../type';
import { fetchHomeData } from '../api/todayQuiz';
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
    const { data, isLoading, isError } = useQuery<DataStructure, Error>({
        queryKey: ['home'],
        queryFn: fetchHomeData,
    });

    // 데이터가 불러와지면 quizzes에 viewHint와 result 값을 추가하여 zustand 스토어에 저장
    useEffect(() => {
        if (data) {
            const modifiedData: DataStructure = {
                ...data,
                quizzes: data.quizzes.map((quiz) => ({
                    ...quiz,
                    viewHint: false, // 힌트 보기 상태 (기본값 false)
                    result: 'unanswered', // 정답 여부 상태 (기본값 unanswered)
                })),
            };
            setMainQuiz(modifiedData);
        }
    }, [data, setMainQuiz]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (isError) {
            navigate('/main');
        }
    }, [isError, location.pathname, navigate]);

    // 네비게이트 이후 '/main' 경로에서는 로딩 애니메이션 없이 바로 Outlet 렌더링
    if (location.pathname !== '/main') {
        return (
            <>
                {!isMobile && <UserHeader />}
                <Outlet />
                {location.pathname !== '/main' && <AddBtn onConfirm={() => navigate('/knowledge/add')} />}
                {isMobile && location.pathname !== '/main' && <BottomBtns />}
            </>
        );
    }

    // 데이터 로딩 중이거나 최소 1.5초가 지나지 않은 경우 Loading 컴포넌트 표시
    if (isLoading || !minTimePassed) return <Loading />;

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
