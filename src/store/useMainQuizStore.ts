// src/store/useStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DataStructure } from '../type';
import { WrongAnswerNote } from '../types/quizTypes';

interface StoreState {
    mainQuiz: DataStructure | null;
    wrongAnswerNotes: WrongAnswerNote[];
    setMainQuiz: (newData: DataStructure) => void;
    setWrongAnswerNotes: (notes: WrongAnswerNote[]) => void;
}

const useMainQuizStore = create<StoreState>()(
    persist(
        (set) => ({
            mainQuiz: null,
            wrongAnswerNotes: [],
            setMainQuiz: (newData: DataStructure) => set({ mainQuiz: newData }),
            setWrongAnswerNotes: (notes: WrongAnswerNote[]) => set({ wrongAnswerNotes: notes }),
        }),
        {
            name: 'myStore', // sessionStorage에 저장될 key 이름
            storage: createJSONStorage(() => sessionStorage), // sessionStorage를 사용
        }
    )
);

export default useMainQuizStore;
