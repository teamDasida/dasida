// import useHideTitleOnScroll from '../../hooks/useHideTitleOnScroll';
import useIsMobile from '../../hooks/useIsMobile';
import useMainQuizStore from '../../store/useMainQuizStore';
import { HintContainer, ListTitle, Main, MyList } from '../../style/GlobalStyle';
import { IncorrectBox, LearningDetail, CloseBtn } from './styles';
import { useState } from 'react';
import { WrongAnswerNote } from '../../types/quizTypes';
import NoQuiz from '../../components/NoQuiz/NoQuiz';
import { IoCheckmark } from 'react-icons/io5';

export default function IncorrectList() {
    const [detail, setDetail] = useState(false);
    const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const isMobile = useIsMobile();
    // const hideTitle = useHideTitleOnScroll();
    const { wrongAnswerNotes } = useMainQuizStore();

    const handleQuizClick = (quiz: WrongAnswerNote) => {
        setSelectedQuizId(quiz.quizId);
        setDetail(true);
    };

    const handleShowAnswer = () => {
        setShowAnswer(true);
        // 3초 후에 정답 숨기기
        setTimeout(() => {
            setShowAnswer(false);
        }, 3000);
    };

    return (
        <>
            <Main $paddingTop={isMobile ? `132px` : '0'}>
                <ListTitle>
                    오답노트
                    {/* {!detail && (
                        <div className="searchInput">
                            <input type="text" placeholder="오답 검색" />
                        </div>
                    )} */}
                </ListTitle>
                {wrongAnswerNotes.length ? (
                    <IncorrectBox $isMobile={isMobile}>
                        <MyList $width={detail && !isMobile ? '384px' : '100%'}>
                            {wrongAnswerNotes.map((v) => (
                                <li key={v.quizId} onClick={() => handleQuizClick(v)}>
                                    <p>{v.quizText}</p>
                                </li>
                            ))}
                        </MyList>

                        {detail && selectedQuizId && (
                            <div>
                                <p>
                                    {wrongAnswerNotes.find((quiz) => quiz.quizId === selectedQuizId)?.quizText}
                                    <button onClick={handleShowAnswer}>클릭 해서 정답 보기</button>
                                    {showAnswer && (
                                        <HintContainer $center>
                                            <p>
                                                {
                                                    wrongAnswerNotes.find((quiz) => quiz.quizId === selectedQuizId)
                                                        ?.quizAnswer
                                                }
                                            </p>
                                        </HintContainer>
                                    )}
                                </p>
                                <CloseBtn aria-label="닫기" onClick={() => setDetail(false)}>
                                    ✕
                                </CloseBtn>

                                <LearningDetail>
                                    <p>학습 내역</p>
                                    <ul>
                                        {wrongAnswerNotes
                                            .find((quiz) => quiz.quizId === selectedQuizId)
                                            ?.answers.map((answer) => (
                                                <li key={answer.userAnswerId}>
                                                    {answer.correct ? (
                                                        <span className="icon-wrap">
                                                            {/* 연두색 빈 원 → IoRadioButtonOff */}
                                                            {/* <IoRadioButtonOff size={24} color="r" /> */}
                                                            {/* 흰색 체크 → IoCheckmark */}
                                                            <IoCheckmark size={16} color="#000" />
                                                        </span>
                                                    ) : (
                                                        <img src="./img/circle-alert.svg" alt="" />
                                                    )}
                                                    {answer.userAnswer}
                                                    <b>{answer.dayType} 일차</b>
                                                </li>
                                            ))}
                                    </ul>
                                </LearningDetail>
                            </div>
                        )}
                    </IncorrectBox>
                ) : (
                    <NoQuiz mainTxt="오답이 없어요" />
                )}
            </Main>
        </>
    );
}
