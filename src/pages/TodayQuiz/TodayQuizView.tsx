// src/components/TodayQuiz/TodayQuizView.tsx
import { useState, useEffect } from 'react';
import { Main, SubTitle } from '../../style/GlobalStyle';
import { HelpBtn, HintContainer, Knowledge, Passage, QuizContainer, QuizList } from './styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { DataStructure } from '../../type';
// Swiper 인스턴스 타입을 가져옵니다.
import { Swiper as SwiperInstance } from 'swiper';

interface TodayQuizViewProps {
    data: DataStructure | null;
    onKnowledgeClick: () => void;
    onSubmitAnswer: (quizId: number, answer: string, dayType: number) => void;
}

export default function TodayQuizView({ data, onKnowledgeClick, onSubmitAnswer }: TodayQuizViewProps) {
    // 각 퀴즈의 입력값을 관리 (quizId를 key로)
    const [answers, setAnswers] = useState<Record<number, string>>({});
    // Swiper 인스턴스와 현재 활성 슬라이드 인덱스 관리
    const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleInputChange = (quizId: number, value: string) => {
        setAnswers((prev) => ({ ...prev, [quizId]: value }));
    };

    // 질문 문자열 내 "____" 부분을 input 요소로 대체 (각 퀴즈 별 컨트롤)
    const renderQuestion = (question: string, quizId: number) => {
        const parts = question.split('____');
        const result: React.ReactNode[] = [];
        parts.forEach((part, index) => {
            result.push(<span key={`part-${quizId}-${index}`}>{part}</span>);
            if (index < parts.length - 1) {
                result.push(
                    <input
                        key={`input-${quizId}-${index}`}
                        type="text"
                        value={answers[quizId] || ''}
                        onChange={(e) => handleInputChange(quizId, e.target.value)}
                    />
                );
            }
        });
        return result;
    };

    // 각 폼 제출 시 onSubmitAnswer 호출
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, quizId: number, dayType: number) => {
        e.preventDefault();
        const answer = answers[quizId] || '';
        onSubmitAnswer(quizId, answer, dayType);
    };

    // 현재 활성 슬라이드의 퀴즈가 정답이면 자동으로 다음 슬라이드로 이동
    useEffect(() => {
        if (data && swiper) {
            const currentQuiz = data.quizzes[activeIndex];
            if (currentQuiz && currentQuiz.result === 'correct') {
                // 잠시 후 자동 슬라이드 (예: 0.5초 후)
                const timer = setTimeout(() => {
                    swiper.slideNext();
                }, 500);
                return () => clearTimeout(timer);
            }
        }
    }, [data, activeIndex, swiper]);

    return (
        <Main>
            <QuizContainer>
                <SubTitle>오늘의 퀴즈</SubTitle>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    onSwiper={(swiperInstance) => setSwiper(swiperInstance)}
                    onSlideChange={(swiperInstance) => setActiveIndex(swiperInstance.activeIndex)}
                >
                    {data?.quizzes.map((v) => (
                        <SwiperSlide key={v.quizId}>
                            <form onSubmit={(e) => handleSubmit(e, v.quizId, v.dayType)}>
                                <QuizList $answer={v.result}>
                                    <Passage>{renderQuestion(v.question, v.quizId)}</Passage>
                                    {/* 제출 버튼은 엔터 제출과 함께 동작 */}
                                    <HelpBtn type="button">힌트 보기</HelpBtn>
                                    {v.viewHint && (
                                        <HintContainer>
                                            <p>Hint</p>
                                            <span>부사 긴 시간이나 많은 노력 끝에 원하던 일이 이루어 졌을때 사용</span>
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
            <Knowledge>
                {data?.knowledges.map((v) => (
                    <li key={v.id}>
                        <div>
                            <p>{v.title}</p>
                            <span>{v.content}</span>
                        </div>
                    </li>
                ))}
            </Knowledge>
        </Main>
    );
}
