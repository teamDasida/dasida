import { useNavigate } from 'react-router-dom';
import TodayQuizView from './components/TodayQuizView';
import useMainQuizStore from '../../store/useMainQuizStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postQuiz } from '../../api/postQuiz';

export default function TodayQuizContainer() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    /** Zustand */
    const { mainQuiz, setMainQuiz, hasRegisteredKnowledge } = useMainQuizStore();
   

    /* ── 네비게이션 ─────────────────────────────────────────────── */
    const handleKnowledgeClick = () => navigate('/knowledge');
    const handleKnowledgeDetailClick = (id: number) => navigate(`/knowledge/${id}`);

    /* ── 퀴즈 제출 mutation ─────────────────────────────────────── */
    const { mutate: submitQuiz } = useMutation({
        mutationFn: postQuiz,
        onSuccess: ({ correct }, variables) => {
            /* ① 결과 플래그만 즉시 반영 */
            setMainQuiz((prev) =>
                prev
                    ? {
                          ...prev,
                          quizzes: prev.quizzes.map((q) =>
                              q.quizId === variables.quizId ? { ...q, result: correct ? 'correct' : 'incorrect' } : q
                          ),
                      }
                    : prev
            );

            /* ② 오답이면 오답노트만 갱신하고 종료 */
            if (!correct) {
                queryClient.invalidateQueries({ queryKey: ['wrongAnswerNotes'] });
                return;
            }

            /* ③ 정답이면 3초 뒤 원본 배열에서 제거 */
            setTimeout(() => {
                setMainQuiz((prev) =>
                    prev
                        ? {
                              ...prev,
                              quizzes: prev.quizzes.filter((q) => q.quizId !== variables.quizId),
                          }
                        : prev
                );
            }, 3000);
        },
    });

    /* ── View 에 내려줄 핸들러 ──────────────────────────────────── */
    const handleSubmitAnswer = (quizId: number, answer: string, dayType: number) =>
        submitQuiz({ quizId, answer, dayType });

    /* ── 렌더링 ─────────────────────────────────────────────────── */
    return (
        <TodayQuizView
            quizList={mainQuiz?.quizzes ?? []} // 배열 보장
            knowledges={mainQuiz?.knowledges ?? []}
            onKnowledgeClick={handleKnowledgeClick}
            onKnowledgeDetailClick={handleKnowledgeDetailClick}
            onSubmitAnswer={handleSubmitAnswer}
            hasRegisteredKnowledge={hasRegisteredKnowledge}
        />
    );
}
