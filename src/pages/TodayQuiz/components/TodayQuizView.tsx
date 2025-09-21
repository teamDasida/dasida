import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Main, SubTitle, HintContainer } from '../../../style/GlobalStyle';
import { Days, HelpBtn, Passage, QuizContainer, QuizList, KnowledgeList } from '../styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
import NoQuiz from '../../../components/NoQuiz/NoQuiz';
import { Knowledge, Quiz } from '../../../type';
import useMainQuizStore from '../../../store/useMainQuizStore';

interface Props {
    quizList: Quiz[];
    knowledges: Knowledge[];
    onKnowledgeClick: () => void;
    onKnowledgeDetailClick: (id: number) => void;
    onSubmitAnswer: (quizId: number, answer: string, dayType: number) => void;
    isMobile: boolean;
}

export default function TodayQuizView({
    quizList,
    knowledges,
    onKnowledgeClick,
    onKnowledgeDetailClick,
    onSubmitAnswer,
    isMobile,
}: Props) {
    const mainQuiz = useMainQuizStore((s) => s.mainQuiz);
    const hasRegisteredKnowledge = !!mainQuiz?.hasRegisteredKnowledge;

    // 입력/힌트/스와이프 상태
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [visibleHints, setVisibleHints] = useState<Record<number, boolean>>({});
    const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleInputChange = (quizId: number, v: string) => setAnswers((p) => ({ ...p, [quizId]: v }));

    const clear = quizList.length === 0 && knowledges.length > 0;
    const activeQuiz = quizList[activeIndex];
    const hasHint = !!(activeQuiz && visibleHints[activeQuiz.quizId]); // ← 현재 힌트 열렸는지

    // 이전 퀴즈 id 목록 저장
    const prevIdsRef = useRef<number[]>([]);

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
        onSubmitAnswer(quizId, (answers[quizId] ?? '').trim(), dayType);
    };

    // 힌트: 하나만 열리고 5초 뒤 자동 닫힘
    const handleHintClick = (quizId: number) => {
        setVisibleHints({ [quizId]: true });
        setTimeout(() => setVisibleHints({}), 5000);
    };

    const renderText = () => {
        if (clear) return '오늘의 퀴즈를 모두 풀었어요';
        if (!hasRegisteredKnowledge) return '아직 우려낼 지식이 없어요';
        return '오늘은 복습할 지식이 없어요';
    };

    // 정답이면 0.5s 뒤 다음 슬라이드
    useEffect(() => {
        if (!swiper) return;
        if (quizList[activeIndex]?.result === 'correct') {
            const id = setTimeout(() => swiper.slideNext(), 500);
            return () => clearTimeout(id);
        }
    }, [quizList, activeIndex, swiper]);

    // 원본 배열 길이 줄어들면 인덱스 보정
    useLayoutEffect(() => {
        if (!swiper) return;

        swiper.update();

        const prevIds = prevIdsRef.current;
        const currIds = quizList.map((q) => q.quizId);

        if (currIds.length < prevIds.length) {
            const removedId = prevIds.find((id) => !currIds.includes(id));
            const removedIndex = removedId !== undefined ? prevIds.indexOf(removedId) : -1;

            if (swiper.activeIndex >= currIds.length) {
                swiper.slideTo(Math.max(currIds.length - 1, 0), 0, false);
            } else if (removedIndex !== -1 && removedIndex < swiper.activeIndex) {
                swiper.slideTo(swiper.activeIndex - 1, 0, false);
            }
            setActiveIndex(swiper.activeIndex);
        }

        prevIdsRef.current = currIds;
    }, [quizList, swiper]);

    return (
        <Main $paddingTop={isMobile}>
            {quizList.length ? (
                <>
                    <QuizContainer $hasHint={hasHint}>
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

                                            {/* ⛔️ 슬라이드 내부 힌트 렌더링 제거 (바깥으로 이동) */}
                                        </QuizList>
                                    </form>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </QuizContainer>

                    {/* ✅ 퀴즈 컨테이너 아래에 현재 활성 슬라이드의 힌트만 표시 */}

                    <HintContainer $show={hasHint}>
                        <p>Hint</p>
                        <span>{activeQuiz.hint}</span>
                    </HintContainer>

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
                    mainTxt={renderText()}
                    subtxt={clear ? '오답노트로 가기' : '+버튼으로 새로운 지식 추가하기'}
                />
            )}
        </Main>
    );
}
