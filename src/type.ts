export interface Quiz {
    dayType: number;
    quizId: number;
    question: string;
    viewHint?:boolean;
    result?: 'unanswered' | 'correct' | 'incorrect';
}

export interface Knowledge {
    dayType: number;
    id: number;
    title: string;
    content: string;
}

export interface DataStructure {
    quizzes: Quiz[];
    knowledges: Knowledge[];
}
