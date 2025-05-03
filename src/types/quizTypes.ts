export interface UserAnswer {
  userAnswerId: number;
  userAnswer: string;
  dayType: number;
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
