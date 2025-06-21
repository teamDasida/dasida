import { NoQuizContainer } from '../styles';

export default function NoQuiz({ mainTxt = '아직 우려낼 지식이 없어요', subtxt = '+버튼으로 새로운 지식 추가하기' }) {
    return (
        <NoQuizContainer>
            <span>
                {mainTxt}
                <b>{subtxt}</b>
            </span>
        </NoQuizContainer>
    );
}
