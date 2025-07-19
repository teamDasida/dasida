import { NoQuizContainer } from './styles';

interface Props {
    clear?: boolean;
    mainTxt?: string;
    subtxt?: string;
}
export default function NoQuiz({ clear, mainTxt, subtxt }: Props) {
    return (
        <NoQuizContainer $clear={clear}>
            <span>
                {mainTxt}
                <b>{subtxt}</b>
            </span>
        </NoQuizContainer>
    );
}
