import { create } from 'zustand';
import type { QuizData } from '@/app/(app)/u/quiz-type/[quizId]/page';

// Definisikan bentuk data yang akan kita simpan
interface QuizResultState {
  quizData: QuizData | null;
  userAnswers: Record<number, string | string[]>;
  // Fungsi untuk menyimpan hasil
  setResults: (data: { quizData: QuizData; userAnswers: Record<number, string | string[]> }) => void;
}

// Buat store-nya
export const useQuizResultStore = create<QuizResultState>((set) => ({
  quizData: null,
  userAnswers: {},
  setResults: (results) => set({ quizData: results.quizData, userAnswers: results.userAnswers }),
}));
