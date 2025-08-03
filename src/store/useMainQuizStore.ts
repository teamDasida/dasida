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
    hasRegisteredKnowledge: boolean;
    setMainQuiz: (action: SetStateAction<DataStructure | null>) => void;
    updateMainQuiz: (partial: Partial<DataStructure>) => void; // 부분 업데이트
    setHasRegisteredKnowledge: (flag: boolean) => void;
    setWrongAnswerNotes: (notes: WrongAnswerNote[]) => void;
}

const defaultDataStructure = (overrides?: Partial<DataStructure>): DataStructure => ({
    hasRegisteredKnowledge: false,
    quizzes: [],
    knowledges: [],
    ...overrides,
});

const useMainQuizStore = create<StoreState>()(
    persist<StoreState>(
        (set) => ({
            mainQuiz: null,
            wrongAnswerNotes: [],
            hasRegisteredKnowledge: false,
            setMainQuiz: (action) =>
                set((state) => {
                    const next = typeof action === 'function' ? action(state.mainQuiz) : action;
                    return { mainQuiz: next };
                }),
            updateMainQuiz: (partial) =>
                set((state) => {
                    const base = state.mainQuiz ?? defaultDataStructure();
                    return { mainQuiz: { ...base, ...partial } };
                }),
            setHasRegisteredKnowledge: (flag) =>
                set((state) => {
                    const base = state.mainQuiz ?? defaultDataStructure();
                    return { mainQuiz: { ...base, hasRegisteredKnowledge: flag } };
                }),
            setWrongAnswerNotes: (notes) => set({ wrongAnswerNotes: notes }),
        }),
        {
            name: 'myStore',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useMainQuizStore;
