import { create } from 'zustand';

//문항 번호 + 점수만 저장해서 서버에서 요구하는 "B1=1 B2=4" 형태로 만들기 쉽게
export interface Answer {
  qitemNo: number; // 문항 번호
  answerScore: string; // 선택한 점수 값 (예: "1")
}

interface TestStore {
  answers: Answer[];
  addAnswer: (answer: Answer) => void;
  resetAnswers: () => void;
}

export const useTestStore = create<TestStore>((set) => ({
  answers: [],
  addAnswer: (answer) =>
    set((state) => ({
      answers: [...state.answers, answer],
    })),
  resetAnswers: () => set({ answers: [] }),
}));
