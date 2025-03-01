import UserHeader from '../../components/Header/UserHeader';
import { MainContainer, SubTitle } from '../../style/GlobalStyle';
import { HelpBtn, Knowledge, Passage, PassageTitle, QuizContainer, QuizList } from './styles';

export default function TodayQuiz() {

    
    return (
        <>
            <UserHeader />
            <MainContainer>
                <QuizContainer>
                    <SubTitle>오늘의 퀴즈</SubTitle>
                    <QuizList>
                        <Passage>
                            After three days of heavy rain, the sun <input /> appeared in the sky.
                        </Passage>
                        <PassageTitle>영어 3과 본문</PassageTitle>
                        <HelpBtn>힌트 보기</HelpBtn>
                    </QuizList>
                </QuizContainer>
                <SubTitle>
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
