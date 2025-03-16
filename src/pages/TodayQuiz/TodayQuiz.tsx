import React, { useEffect } from 'react';
import UserHeader from '../../components/Header/UserHeader';
import { MainContainer, SubTitle } from '../../style/GlobalStyle';
import { HelpBtn, Knowledge, Passage, PassageTitle, QuizContainer, QuizList } from './styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import { useResource } from '../../api/queries';
import { DataStructure } from '../../type';

export default function TodayQuiz() {
    const navigate = useNavigate();
    const { data, isError, error } = useResource<DataStructure>('/home', ['main']); // 하우스 데이터 호출

    // If a 401 error occurs, navigate to '/main'
    useEffect(() => {
        if (isError && error?.response?.status === 401) {
            navigate('/main');
        }
    }, [isError, error, navigate]);

    return (
        <>
            <UserHeader />
            <MainContainer>
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
                <SubTitle onClick={() => navigate('/list')}>
                    나의 지식 <img src="./img/arrow.svg" alt="" />
                </SubTitle>
                <Knowledge>
                    <li>
                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of who
                            don’t know what ancient Greek music sounded like, because there are no examples of
                        </span>
                    </li>
                    <li>
                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of who
                            don’t know what ancient Greek music sounded like, because there are no examples of
                        </span>
                    </li>
                    <li>
                        <p>고3 3월 모고29번</p>
                        <span>
                            Who don’t know what ancient Greek music sounded like, because there are no examples of who
                            don’t know what ancient Greek music sounded like, because there are no examples of
                        </span>
                    </li>
                </Knowledge>
            </MainContainer>
        </>
    );
}
