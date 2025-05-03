// src/components/TodayQuiz/TodayQuizView.tsx
import { useState, useEffect } from 'react';
import { Main, SubTitle ,HintContainer} from '../../../style/GlobalStyle';
import { HelpBtn, Knowledge, Passage, QuizContainer, QuizList } from '../styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { DataStructure } from '../../../type';
import { Swiper as SwiperInstance } from 'swiper';
import NoQuiz from './NoQuiz';

interface TodayQuizViewProps {
  data: DataStructure | null;
  onKnowledgeClick: () => void;
  onSubmitAnswer: (quizId: number, answer: string, dayType: number) => void;
}

export default function TodayQuizView({
  data,
  onKnowledgeClick,
  onSubmitAnswer,
}: TodayQuizViewProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [visibleHints, setVisibleHints] = useState<Record<number, boolean>>({});
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleInputChange = (quizId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [quizId]: value }));
  };

  const renderQuestion = (question: string, quizId: number) => {
    const parts = question.split('____');
    const result: React.ReactNode[] = [];
    parts.forEach((part, i) => {
      result.push(<span key={`${quizId}-part-${i}`}>{part}</span>);
      if (i < parts.length - 1) {
        result.push(
          <input
            key={`${quizId}-input-${i}`}
            type="text"
            value={answers[quizId] || ''}
            onChange={(e) => handleInputChange(quizId, e.target.value)}
          />
        );
      }
    });
    return result;
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    quizId: number,
    dayType: number
  ) => {
    e.preventDefault();
    onSubmitAnswer(quizId, answers[quizId] || '', dayType);
  };

  const handleHintClick = (quizId: number) => {
    setVisibleHints((prev) => ({ ...prev, [quizId]: true }));
    setTimeout(() => {
      setVisibleHints((prev) => ({ ...prev, [quizId]: false }));
    }, 5000);
  };

  useEffect(() => {
    if (data && swiper) {
      const current = data.quizzes[activeIndex];
      if (current?.result === 'correct') {
        const t = setTimeout(() => swiper.slideNext(), 500);
        return () => clearTimeout(t);
      }
    }
  }, [data, activeIndex, swiper]);

  return (
    <Main>
      {data?.quizzes.length ? (
        <>
          <QuizContainer>
            <SubTitle>오늘의 퀴즈</SubTitle>
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              onSwiper={(ins) => setSwiper(ins)}
              onSlideChange={(ins) => setActiveIndex(ins.activeIndex)}
            >
              {data.quizzes.map((quiz) => (
                <SwiperSlide key={quiz.quizId}>
                  <form onSubmit={(e) => handleSubmit(e, quiz.quizId, quiz.dayType)}>
                    <QuizList $answer={quiz.result}>
                      <Passage $length={quiz.answerLength}>
                        {renderQuestion(quiz.question, quiz.quizId)}
                      </Passage>
                      <HelpBtn
                        type="button"
                        onClick={() => handleHintClick(quiz.quizId)}
                      >
                        힌트 보기
                      </HelpBtn>
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
          <Knowledge>
            {data.knowledges.map((k) => (
              <li key={k.id}>
                <div>
                  <p>{k.title}</p>
                  <span>{k.content}</span>
                </div>
              </li>
            ))}
          </Knowledge>
        </>
      ) : (
        <NoQuiz />
      )}
    </Main>
  );
}
