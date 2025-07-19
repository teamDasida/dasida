// src/store/useStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DataStructure } from '../type';
import { WrongAnswerNote } from '../types/quizTypes';

// util: React처럼 값 or 업데이트 함수 둘 다 받을 수 있도록
type SetStateAction<T> = T | ((prev: T) => T);

interface StoreState {
  mainQuiz: DataStructure | null;
  wrongAnswerNotes: WrongAnswerNote[];
  setMainQuiz: (action: SetStateAction<DataStructure | null>) => void;
  setWrongAnswerNotes: (notes: WrongAnswerNote[]) => void;
}

const useMainQuizStore = create<StoreState>()(
  persist<StoreState>(
    (set) => ({
      mainQuiz: null,
      wrongAnswerNotes: [],
      setMainQuiz: (action) =>
        set((state) => ({
          mainQuiz: typeof action === 'function' ? action(state.mainQuiz) : action,
        })),
      setWrongAnswerNotes: (notes) => set({ wrongAnswerNotes: notes }),
    }),
    {
      name: 'myStore',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useMainQuizStore;
