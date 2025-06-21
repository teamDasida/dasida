export interface UserAnswer {
    userAnswerId: number;
    userAnswer: string;
    dayType: number;
    correct: boolean;
}

export interface WrongAnswerNote {
    quizId: number;
    quizText: string;
    quizAnswer: string;
    answers: UserAnswer[];
}

export interface WrongAnswerNotesResponse {
    data: WrongAnswerNote[];
}
