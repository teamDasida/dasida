import { useNavigate } from 'react-router-dom';
import TodayQuizView from './components/TodayQuizView';
import useMainQuizStore from '../../store/useMainQuizStore';
import { useMutation } from '@tanstack/react-query';
import { postQuiz } from '../../api/postQuiz';
import { useQueryClient } from '@tanstack/react-query';

export default function TodayQuizContainer() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mainQuiz, setMainQuiz } = useMainQuizStore();

    // '나의 지식' 클릭 시 '/list'로 이동하는 핸들러
    const handleKnowledgeClick = () => {
        navigate('/knowledge');
    };
    const handleKnowledgeDetailClick = (id: number) => {
        navigate('/knowledge/' + id);
    };

    // postQuiz API를 호출하기 위한 React Query mutation
    const { mutate: submitQuiz } = useMutation({
        mutationFn: postQuiz,
        onSuccess: (data, variables) => {
            console.log('퀴즈 제출 성공:', data);
            // API 응답의 data.correct 값(true/false)에 따라 해당 퀴즈의 result 업데이트
            if (mainQuiz) {
                const updatedQuizzes = mainQuiz.quizzes.map((quiz) => {
                    if (quiz.quizId === variables.quizId) {
                        return {
                            ...quiz,
                            result: (data.correct ? 'correct' : 'incorrect') as 'correct' | 'incorrect',
                        };
                    }
                    return quiz;
                });
                setMainQuiz({ ...mainQuiz, quizzes: updatedQuizzes });
            }
            if (!data.correct) {
                queryClient.invalidateQueries({
                    queryKey: ['wrongAnswerNotes'],
                });
            }
        },
    });

    // 퀴즈 답안 제출 핸들러 (TodayQuizView로 전달할 prop)
    const handleSubmitAnswer = (quizId: number, answer: string, dayType: number) => {
        submitQuiz({ quizId, answer, dayType });
    };

    return (
        <>
            <TodayQuizView
                data={mainQuiz}
                onKnowledgeClick={handleKnowledgeClick}
                onKnowledgDetaileClick={handleKnowledgeDetailClick}
                onSubmitAnswer={handleSubmitAnswer} // TodayQuizView에서 이 prop을 활용하여 제출 이벤트를 처리
            />
            {/* 전송 후 리턴값 UI 렌더링 등 추가 가능 */}
        </>
    );
}
