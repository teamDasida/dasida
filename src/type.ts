export interface Quiz {
    dayType: number;
    quizId: number;
    question: string;
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
