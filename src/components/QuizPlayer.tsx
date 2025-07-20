'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { QuizData, Question } from '@/app/(app)/u/quiz-type/[quizId]/page';
import { useQuizResultStore } from '@/store/quizResultStore';

export function QuizPlayer({ quizData }: { quizData: QuizData }) {
	const router = useRouter();
	const setResults = useQuizResultStore((state) => state.setResults);

	// --- STATE MANAGEMENT ---
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userAnswers, setUserAnswers] = useState<Record<number, string | string[]>>({});
	const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State untuk sidebar

	const currentQuestion = quizData.questions[currentQuestionIndex];
	const progress = (currentQuestionIndex / quizData.questions.length) * 100;

	// --- LOGIC HANDLERS ---

	// Fungsi untuk menangani pemilihan jawaban
	const handleSelectAnswer = (option: string) => {
		const currentSelection = userAnswers[currentQuestionIndex];

		if (currentQuestion.type === 'Multiple Choice') {
			const newSelection = Array.isArray(currentSelection) ? [...currentSelection] : [];
			if (newSelection.includes(option)) {
				setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: newSelection.filter((item) => item !== option) }));
			} else {
				setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: [...newSelection, option] }));
			}
		} else {
			setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: option }));
		}
	};

	// Fungsi navigasi
	const handleNext = () => {
		if (currentQuestionIndex < quizData.questions.length - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
		}
	};

	const handlePrevious = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prev) => prev + 1);
		}
	};

	const finishQuiz = () => {
		setResults({ quizData, userAnswers });
		router.push(`/u/congrats/${quizData.id}`);
	};

	// --- RENDER LOGIC ---
	const renderOptions = (question: Question) => {
		const options = question.options || ['Yes', 'No'];
		const inputType = question.type === 'Multiple Choice' ? 'checkbox' : 'radio';
		const currentSelection = userAnswers[currentQuestionIndex];

		return (
			<div className="flex flex-col space-y-3">
				{options.map((option, index) => {
					const isSelected = Array.isArray(currentSelection) ? currentSelection.includes(option) : currentSelection === option;

					return (
						<label key={index} className={`flex items-center w-full border-2 rounded-xl cursor-pointer transition p-4 ${isSelected ? 'border-color-brand bg-blue-50' : 'border-gray-300'}`}>
							<input type={inputType} name={`question-${currentQuestionIndex}`} value={option} checked={isSelected} onChange={() => handleSelectAnswer(option)} className="hidden peer" />
							<span className="font-semibold text-text-primary">{option}</span>
						</label>
					);
				})}
			</div>
		);
	};

	return (
		<div className="max-w-6xl mx-auto p-6 flex flex-col min-h-[calc(100vh-80px)]">
			{/* Header: Tombol Keluar & Progress Bar */}
			<div className="flex items-center pb-8 text-color-brand w-full">
				<button onClick={() => router.back()} className="cursor-pointer">
					<span className="material-icons-outlined mr-4">close</span>
				</button>
				<div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
					<div className="h-full bg-color-brand transition-all duration-300" style={{ width: `${progress}%` }} />
				</div>
				<button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="cursor-pointer ml-4">
					<span className="material-icons-outlined">{isSidebarOpen ? 'menu_open' : 'menu'}</span>
				</button>
			</div>

			<div className="flex flex-grow gap-6">
				{/* Main Content: Pertanyaan */}
				<div className="flex-grow flex flex-col">
					<div className="flex-grow">
						<p className="text-sm text-gray-500 mb-2 font-semibold">
							Pertanyaan {currentQuestionIndex + 1} dari {quizData.questions.length}
						</p>
						<h2 className="font-bold mb-2 text-2xl text-text-primary">{currentQuestion.question}</h2>
						{/* ✅ Pembeda Tipe Soal */}
						<p className="text-sm text-blue-600 mb-6 font-semibold">{currentQuestion.type === 'Multiple Choice' ? '(Pilih satu atau lebih jawaban)' : '(Pilih satu jawaban)'}</p>

						{renderOptions(currentQuestion)}
					</div>

					{/* Navigasi Soal */}
					<div className="mt-10 flex justify-between items-center">
						<button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="bg-gray-200 text-text-primary px-6 py-3 font-bold rounded-xl hover:bg-gray-300 transition disabled:opacity-50">
							Previous
						</button>
						{currentQuestionIndex < quizData.questions.length - 1 ? (
							<button onClick={handleNext} className="bg-color-brand text-text-negative px-8 py-3 font-bold text-lg rounded-xl hover:brightness-90 transition">
								Next
							</button>
						) : (
							<button onClick={finishQuiz} className="bg-green-500 text-white px-8 py-3 font-bold text-lg rounded-xl hover:bg-green-600 transition">
								Finish Quiz
							</button>
						)}
					</div>
				</div>

				{/* Sidebar Navigasi Soal */}
				{isSidebarOpen && (
					<aside className="w-48 flex-shrink-0 p-4 border-l-2 rounded-lg bg-gray-50">
						<h3 className="font-bold mb-4 text-center">Navigasi Soal</h3>
						<div className="grid grid-cols-4 gap-2">
							{quizData.questions.map((_, index) => {
								const isAnswered = userAnswers[index] !== undefined && (Array.isArray(userAnswers[index]) ? (userAnswers[index] as string[]).length > 0 : true);
								const isCurrent = index === currentQuestionIndex;

								return (
									<button
										key={index}
										onClick={() => setCurrentQuestionIndex(index)}
										className={`h-10 w-10 rounded-lg font-bold border-2 transition
                      ${isCurrent ? 'bg-color-brand text-white border-color-brand' : ''}
                      ${!isCurrent && isAnswered ? 'bg-green-100 border-green-400 text-green-800' : ''}
                      ${!isCurrent && !isAnswered ? 'bg-white border-gray-300' : ''}
                    `}
									>
										{index + 1}
									</button>
								);
							})}
						</div>
					</aside>
				)}
			</div>
		</div>
	);
}
