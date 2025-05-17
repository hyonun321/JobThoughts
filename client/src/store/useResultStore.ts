// store/useResultStore.ts
import { create } from 'zustand';

interface ResultData {
  scores: { name: string; score: number }[];
  topValues: string[];
  jobsByMajor: Record<string, string[]>;
}

interface ResultStore {
  result: ResultData | null;
  setResult: (data: ResultData) => void;
  clearResult: () => void;
}

export const useResultStore = create<ResultStore>((set) => ({
  result: null,
  setResult: (data) => set({ result: data }),
  clearResult: () => set({ result: null }),
}));
