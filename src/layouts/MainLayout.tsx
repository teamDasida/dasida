// src/layouts/MainLayout.tsx
import { matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import UserHeader from '../components/UserHeader/UserHeader';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataStructure } from '../type';
import { fetchHomeData, fetchWrongAnswerNotes } from '../api/quizApi';
import Loading from '../components/Loading/Loading';
import useMainQuizStore from '../store/useMainQuizStore';
import AddBtn from '../components/AddBtn/AddBtn';
import BottomBtns from '../components/BottomBtns/BottomBtns';
import { checkSession } from '../api/authApi';
import useIsStandalone from '../hooks/useIsStandalone';
import KnowledgeAdd2 from '../pages/KnowledgeAdd2/KnowledgeAdd2';

const ONE_DAY = 24 * 60 * 60 * 1000;

function MainLayout() {
    const location = useLocation();
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const isStandalone = useIsStandalone();
    const { setMainQuiz, setWrongAnswerNotes } = useMainQuizStore();

    const [todayKey, setTodayKey] = useState(() => new Date().toDateString());

    // 최소 로딩 시간을 위한 상태 (1.5초 이상 로딩 애니메이션을 보여줌)
    const [minTimePassed, setMinTimePassed] = useState(false);
    const [addModalView, setAddModalView] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setMinTimePassed(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    // React Query를 통한 데이터 불러오기
    const {
        /** 로딩 상태 → sessionLoading */
        isLoading: sessionLoading,
        /** 에러 여부 → sessionError */
        isError: sessionError,
        /** 응답 데이터(boolean) → isSessionValid */
        data: isSessionValid,
        /** 필요하면 수동으로 다시 호출할 때 사용 */
    } = useQuery<boolean>({
        queryKey: ['sessionCheck'],
        queryFn: checkSession, // axios({ withCredentials: true })
        retry: false, // 401 등 인증 실패 시 재시도 금지
        staleTime: 5 * 60 * 1000, // 5 분 동안 fresh → 포커스 전환 시에도 재호출 안 함
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: 'always', // 포커스 이동 시 항상 재요청(단, staleTime 동안엔 생략)
        refetchOnReconnect: 'always', // 네트워크 재연결 시 항상 재요청
        refetchOnMount: 'always', // 컴포넌트 마운트 때마다 재요청
    });

    const getMsUntilMidnight = () => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        return midnight.getTime() - now.getTime();
    };

    useEffect(() => {
        const timeout = setTimeout(() => setTodayKey(new Date().toDateString()), getMsUntilMidnight());
        return () => clearTimeout(timeout);
    }, [todayKey]);

    useEffect(() => {
        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                const current = new Date().toDateString();
                if (current !== todayKey) {
                    setTodayKey(current);
                }
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, [todayKey]);

    const msUntilMidnight = getMsUntilMidnight();

    const {
        data: homeData,
        isLoading: homeLoading,
        isError: homeError,
    } = useQuery({
        queryKey: ['home', todayKey],
        queryFn: fetchHomeData,
        enabled: !!isSessionValid, // 세션 유효할 때만
        // ── 신선도/캐시 보존 ──
        staleTime: msUntilMidnight, // 자정이 되면 stale 처리
        gcTime: ONE_DAY * 2, // 구독 끊겨도 캐시는 2일 보관(선택)

        // ── 자동 재조회(폴링) ──
        refetchInterval: msUntilMidnight, // 자정에 맞춰 재조회
        refetchIntervalInBackground: true, // 백그라운드(비활성 탭)에서도 수행

        // ── 유저가 돌아왔을 때 ──
        // 아래 옵션들은 "stale일 때"만 트리거 → 자정 이후 stale이면 즉시 재조회
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
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
    const handleAddBtn = () => {
        // navigate('/knowledge/add');

        if (!homeData?.hasRegisteredKnowledge) {
            // if (!isStandalone && isMobile) {
            //     // 📱 모바일 브라우저이지만 아직 PWA 설치 안 함
            //     alert('앱을 홈 화면에 설치한 후 이용해 주세요!');
            // } else if (isStandalone && !isMobile) {
            //     // 💻 데스크톱(또는 태블릿)에서 PWA 모드로 열었지만 모바일 아님
            //     alert('앱은 스마트폰 전용입니다. 휴대폰에서 홈 화면에 설치해 이용해 주세요!');
            // } else if (!isStandalone && !isMobile) {
            //     // 💻 데스크톱 일반 브라우저
            //     alert('앱은 스마트폰 전용입니다. 휴대폰에서 홈 화면에 설치한 뒤 이용해 주세요!');
            // }
            if (isStandalone && isMobile) {
                setAddModalView(true);
            } else {
                setAddModalView(true);

                // alert('앱은 스마트폰 전용입니다. 휴대폰에서 홈 화면에 설치한 뒤 이용해 주세요!');
            }
        } else {
            setAddModalView(true);
        }
    };

    // 2) 헤더 노출 여부 계산 (컴포넌트 내부, 반환부 위에 추가)
    const hideHeaderOnMobile = useMemo(() => {
        if (!isMobile) return false;
        const p = location.pathname;

        const baseMatches =
            matchPath({ path: '/knowledge', end: true }, p) !== null ||
            matchPath({ path: '/knowledge/add', end: true }, p) !== null ||
            matchPath({ path: '/wrong-answers', end: true }, p) !== null;

        const detailMatch = matchPath({ path: '/knowledge/:id', end: true }, p) !== null;

        return baseMatches || detailMatch;
    }, [isMobile, location.pathname]);

    const showHeader = useMemo(() => {
        return location.pathname !== '/main' && !hideHeaderOnMobile;
    }, [location.pathname, hideHeaderOnMobile]);

    // 스크롤 상단으로
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // homeData가 준비되면 store에 저장
    useEffect(() => {
        if (!homeData) return;

        const modified: DataStructure = {
            ...homeData,
            quizzes: homeData.quizzes.map((q) => ({
                ...q,
                viewHint: false,
                result: 'unanswered',
            })),
        };
        setMainQuiz(modified); // hasRegisteredKnowledge 포함
    }, [homeData, setMainQuiz]);

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
            {addModalView && <KnowledgeAdd2 onClose={()=>setAddModalView(false)} />}
            {showHeader && <UserHeader isMobile={isMobile} />}
            <Outlet />
            {location.pathname !== '/main' && <AddBtn onConfirm={handleAddBtn} />}
            {isMobile && location.pathname !== '/main' && <BottomBtns />}
        </>
    );
}

export default MainLayout;
