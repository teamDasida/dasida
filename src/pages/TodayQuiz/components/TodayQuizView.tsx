import { useEffect, useRef, useState } from 'react';
import { Main, SubTitle, HintContainer } from '../../../style/GlobalStyle';
import { Days, HelpBtn, Passage, QuizContainer, QuizList, KnowledgeList } from '../styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
import NoQuiz from '../../../components/NoQuiz/NoQuiz';
import { Knowledge, Quiz } from '../../../type'; // KnowledgeType은 알아서 정의

interface Props {
    quizList: Quiz[]; // ← prop 이름·타입 변경
    knowledges: Knowledge[];
    onKnowledgeClick: () => void;
    onKnowledgeDetailClick: (id: number) => void;
    onSubmitAnswer: (quizId: number, answer: string, dayType: number) => void;
}

export default function TodayQuizView({
    quizList,
    knowledges,
    onKnowledgeClick,
    onKnowledgeDetailClick,
    onSubmitAnswer,
}: Props) {
    /* ── ① 입력·힌트·스와이프 상태 ─────────────────────────────── */
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [visibleHints, setVisibleHints] = useState<Record<number, boolean>>({});
    const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const handleInputChange = (quizId: number, v: string) => setAnswers((p) => ({ ...p, [quizId]: v }));
    const clear = quizList.length === 0 && knowledges.length > 0;
    /** ① 이전 퀴즈 개수를 기억해 둘 ref */
    const prevLenRef = useRef(quizList.length);

    const renderQuestion = (question: string, quizId: number) => {
        const parts = question.split('____');
        return parts.flatMap((part, i) => [
            <span key={`${quizId}-part-${i}`}>{part}</span>,
            ...(i < parts.length - 1
                ? [
                      <input
                          key={`${quizId}-input-${i}`}
                          type="text"
                          value={answers[quizId] || ''}
                          onChange={(e) => handleInputChange(quizId, e.target.value)}
                      />,
                  ]
                : []),
        ]);
    };

    const handleSubmit = (e: React.FormEvent, quizId: number, dayType: number) => {
        e.preventDefault();
        onSubmitAnswer(quizId, answers[quizId] ?? '', dayType);
    };

    const handleHintClick = (quizId: number) => {
        setVisibleHints((p) => ({ ...p, [quizId]: true }));
        setTimeout(() => setVisibleHints((p) => ({ ...p, [quizId]: false })), 5000);
    };

    /* ── ② 정답 맞히면 0.5초 뒤 다음 슬라이드 ─────────────────── */
    // View 안에서는 “슬라이드 이동만” 담당
    /* ────────────────────────────────────────────────────────── */
    /* 1️⃣  result==="correct" → 0.5 s 뒤 다음 슬라이드 이동       */
    /* ────────────────────────────────────────────────────────── */
    useEffect(() => {
        if (!swiper) return;

        // 현재 슬라이드가 정답 처리된 경우
        if (quizList[activeIndex]?.result === 'correct') {
            const id = setTimeout(() => swiper.slideNext(), 500);
            return () => clearTimeout(id); // cleanup
        }
    }, [quizList, activeIndex, swiper]);

    /* ────────────────────────────────────────────────────────── */
    /* 2️⃣  원본 배열 길이가 줄어든 순간 인덱스 보정                */
    /* ────────────────────────────────────────────────────────── */
    useEffect(() => {
        if (!swiper) return;

        const prevLen = prevLenRef.current;
        if (quizList.length < prevLen) {
            // 삭제된 슬라이드가 activeIndex 앞쪽에 있으면 한 칸 앞으로
            if (swiper.activeIndex >= quizList.length) {
                swiper.slideTo(Math.max(quizList.length - 1, 0), 0, false);
                setActiveIndex(swiper.activeIndex); // state 동기화
            }
        }
        prevLenRef.current = quizList.length; // 다음 비교에 사용
    }, [quizList.length, swiper]);
    /* ── ③ 렌더링 ───────────────────────────────────────────────── */
    return (
        <Main>
            {quizList.length ? (
                <>
                    <QuizContainer>
                        <SubTitle>오늘의 퀴즈</SubTitle>
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            onSwiper={setSwiper}
                            onSlideChange={(ins) => setActiveIndex(ins.activeIndex)}
                        >
                            {quizList.map((quiz) => (
                                <SwiperSlide key={quiz.quizId}>
                                    <form onSubmit={(e) => handleSubmit(e, quiz.quizId, quiz.dayType)}>
                                        <QuizList $answer={quiz.result}>
                                            <Passage $length={quiz.answerLength}>
                                                {renderQuestion(quiz.question, quiz.quizId)}
                                            </Passage>

                                            <HelpBtn type="button" onClick={() => handleHintClick(quiz.quizId)}>
                                                힌트 보기
                                            </HelpBtn>
                                            <Days>{quiz.dayType}일차</Days>

                                            {visibleHints[quiz.quizId] && (
                                                <HintContainer>
                                                    <p>Hint</p>
                                                    <span>{quiz.hint}</span>
                                                </HintContainer>
                                            )}
                                        </QuizList>
                                    </form>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </QuizContainer>

                    <SubTitle onClick={onKnowledgeClick}>
                        나의 지식 <img src="./img/arrow.svg" alt="" />
                    </SubTitle>
                    <KnowledgeList>
                        {knowledges.map((k) => (
                            <li key={k.id} onClick={() => onKnowledgeDetailClick(k.id)}>
                                <div>
                                    <p>{k.title}</p>
                                    <span>{k.content}</span>
                                </div>
                            </li>
                        ))}
                    </KnowledgeList>
                </>
            ) : (
                <NoQuiz
                    clear={clear}
                    mainTxt={clear ? '오늘의 퀴즈를 모두 풀었어요' : '아직 우려낼 지식이 없어요'}
                    subtxt={clear ? '오답노트로 가기' : '+버튼으로 새로운 지식 추가하기'}
                />
            )}
        </Main>
    );
}
