import { useNavigate } from 'react-router-dom';
import { NoQuizContainer } from './styles';

interface Props {
    clear?: boolean;
    mainTxt?: string;
    subtxt?: string;
}
export default function NoQuiz({ clear, mainTxt, subtxt }: Props) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (subtxt === '오답노트로 가기') navigate('/wrong-answers');
        else return;
    };
    return (
        <NoQuizContainer $clear={clear} onClick={handleNavigate}>
            <span>
                {mainTxt}
                <b>{subtxt}</b>
            </span>
        </NoQuizContainer>
    );
}
