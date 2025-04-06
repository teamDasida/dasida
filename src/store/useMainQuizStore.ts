// src/store/useStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DataStructure } from '../type';

interface StoreState {
    mainQuiz: DataStructure | null;
    setMainQuiz: (newData: DataStructure) => void;
}

const useMainQuizStore = create<StoreState>()(
    persist(
        (set) => ({
            mainQuiz: null,
            setMainQuiz: (newData: DataStructure) => set({ mainQuiz: newData }),
        }),
        {
            name: 'myStore', // sessionStorage에 저장될 key 이름
            storage: createJSONStorage(() => sessionStorage), // sessionStorage를 사용
        }
    )
);

export default useMainQuizStore;
