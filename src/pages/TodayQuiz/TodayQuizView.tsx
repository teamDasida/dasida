// src/components/TodayQuiz/TodayQuizView.tsx
import UserHeader from '../../components/UserHeader/UserHeader';
import { Main, SubTitle } from '../../style/GlobalStyle';
import { HelpBtn, Knowledge, Passage, PassageTitle, QuizContainer, QuizList } from './styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { DataStructure } from '../../type';

interface TodayQuizViewProps {
    data: DataStructure | undefined;
    isLoading: boolean;
    onKnowledgeClick: () => void;
    isMobile: boolean;
}

export default function TodayQuizView({ data, isLoading, onKnowledgeClick, isMobile }: TodayQuizViewProps) {
    if (isLoading) return <div>Loading...</div>;

    // data는 현재 콘솔에 출력만 하고 있으나, 이후 UI 렌더링에 활용할 수 있음
    console.log(data);

    return (
        <>
            {!isMobile && <UserHeader />}
            <Main>
                <QuizContainer>
                    <SubTitle>오늘의 퀴즈</SubTitle>
                    <Swiper spaceBetween={30} slidesPerView={1}>
                        <SwiperSlide>
                            <QuizList>
                                <Passage>
                                    After three days of heavy rain, the sun <input /> appeared in the sky.
                                </Passage>
                                <PassageTitle>영어 3과 본문</PassageTitle>
                                <HelpBtn>힌트 보기</HelpBtn>
                            </QuizList>
                        </SwiperSlide>
                        <SwiperSlide>
                            <QuizList>
                                <Passage>
                                    After three days of heavy rain, the sun <input /> appeared in the sky.
                                </Passage>
                                <PassageTitle>영어 3과 본문</PassageTitle>
                                <HelpBtn>힌트 보기</HelpBtn>
                            </QuizList>
                        </SwiperSlide>
                        <SwiperSlide>
                            <QuizList>
                                <Passage>
                                    After three days of heavy rain, the sun <input /> appeared in the sky.
                                </Passage>
                                <PassageTitle>영어 3과 본문</PassageTitle>
                                <HelpBtn>힌트 보기</HelpBtn>
                            </QuizList>
                        </SwiperSlide>
                    </Swiper>
                </QuizContainer>
                <SubTitle onClick={onKnowledgeClick}>
                    나의 지식 <img src="./img/arrow.svg" alt="" />
                </SubTitle>
                <Knowledge>
                    <li><div>

                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of who
                            don’t know what ancient Greek music sounded like, because there are no examples of
                        </span>
                    </div>
                    </li>
                    <li><div>

                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of who
                            don’t know what ancient Greek music sounded like, because there are no examples of
                        </span>
                    </div>
                    </li>
                    <li><div>

                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of who
                            don’t know what ancient Greek music sounded like, because there are no examples of
                        </span>
                    </div>
                    </li>
                    <li><div>

                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of who
                            don’t know what ancient Greek music sounded like, because there are no examples of
                        </span>
                    </div>
                    </li>
                    <li><div>

                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of who
                            don’t know what ancient Greek music sounded like, because there are no examples of
                        </span>
                    </div>
                    </li>
                    <li><div>

                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of who
                            don’t know what ancient Greek music sounded like, because there are no examples of
                        </span>
                    </div>
                    </li>
                    <li><div>

                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of who
                            don’t know what ancient Greek music sounded like, because there are no examples of
                        </span>
                    </div>
                    </li>
                    <li><div>

                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of who
                            don’t know what ancient Greek music sounded like, because there are no examples of
                        </span>
                    </div>
                    </li>
                    <li><div>

                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of who
                            don’t know what ancient Greek music sounded like, because there are no examples of
                        </span>
                    </div>
                    </li>
                </Knowledge>
            </Main>
        </>
    );
}
