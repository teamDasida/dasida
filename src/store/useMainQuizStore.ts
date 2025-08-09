// src/store/useStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DataStructure } from '../type';
import { WrongAnswerNote } from '../types/quizTypes';

// util: 값 또는 업데이트 함수 모두 받는 타입
type SetStateAction<T> = T | ((prev: T) => T);

interface StoreState {
    mainQuiz: DataStructure | null;
    wrongAnswerNotes: WrongAnswerNote[];

    setMainQuiz: (action: SetStateAction<DataStructure | null>) => void;
    updateMainQuiz: (partial: Partial<DataStructure>) => void;
    setWrongAnswerNotes: (notes: WrongAnswerNote[]) => void;
}

const defaultDataStructure = (overrides?: Partial<DataStructure>): DataStructure => ({
    hasRegisteredKnowledge: false,
    quizzes: [],
    knowledges: [],
    ...overrides,
});

const useMainQuizStore = create<StoreState>()(
    persist(
        (set) => ({
            mainQuiz: null,
            wrongAnswerNotes: [],

            setMainQuiz: (action) =>
                set((state) => ({
                    mainQuiz: typeof action === 'function' ? action(state.mainQuiz) : action,
                })),

            updateMainQuiz: (partial) =>
                set((state) => ({
                    mainQuiz: { ...(state.mainQuiz ?? defaultDataStructure()), ...partial },
                })),

            setWrongAnswerNotes: (notes) => set({ wrongAnswerNotes: notes }),
        }),
        { name: 'myStore', storage: createJSONStorage(() => sessionStorage) }
    )
);

export default useMainQuizStore;
