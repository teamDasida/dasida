import axiosInstance from './axios';

export interface QuizPostRequest {
    quizId: number;
    answer: string;
    dayType: number;
}

export interface QuizPostResponse {
    userAnswerId: number;
    correct: boolean;
}

export const postQuiz = async (payload: QuizPostRequest): Promise<QuizPostResponse> => {
    const response = await axiosInstance.post<QuizPostResponse>(`/quizzes/${payload.quizId}/answers`, {
        answer: payload.answer,
        dayType: payload.dayType,
    });
    return response.data;
};
