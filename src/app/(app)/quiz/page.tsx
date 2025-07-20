'use client';

import MainLayout from '@/components/MainLayout';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateQuizFromTopicAction, QuizGenerationState } from './actions';

// Definisikan initial state untuk useActionState
const initialState: QuizGenerationState = {};

export default function GenerateQuizPage() {
	const [state, formAction, isPending] = useActionState(generateQuizFromTopicAction, initialState);
	const router = useRouter();

	useEffect(() => {
		if (state.data?.summaryId) {
			router.push(`/u/quiz-cover/${state.data.summaryId}`);
		}
	}, [state.data, router]);

	return (
		<MainLayout>
			<form action={formAction} className="max-w-2xl mx-auto mt-10 p-6">
				<div className="text-center mb-8">
					<h2 className="text-3xl font-bold text-color-brand">Summary & Quiz Generator</h2>
					<p className="mt-2 text-text-secondary">Masukkan sebuah topik, dan biarkan AI membuat ringkasan dan kuis untuk Anda.</p>
				</div>

				{/* --- BAGIAN 1: INPUT TOPIK --- */}
				<div className="p-6 border-2 border-dashed rounded-xl mb-6">
					<h3 className="font-semibold text-lg mb-4 text-text-primary">1. Masukkan Topik Anda</h3>
					<textarea
						name="topic"
						required
						placeholder="Contoh: 'Sejarah Kerajaan Majapahit' atau 'Dasar-dasar Fisika Kuantum'"
						className="w-full border-2 border-text-secondary px-4 py-4 text-text-primary focus:outline-none rounded-xl"
						rows={3}
					/>
				</div>

				{/* --- BAGIAN 2: KUSTOMISASI KUIS --- */}
				<div className="p-6 border-2 border-dashed rounded-xl">
					<h3 className="font-semibold text-lg mb-4 text-text-primary">2. Atur Kuis Anda</h3>
					<div className="space-y-6">
						{/* ✅ PERUBAHAN: Number of Question menjadi Select */}
						<div>
							<h4 className="font-semibold mb-2">Jumlah Soal</h4>
							<select name="numQuestions" required className="w-full border-2 border-gray-300 rounded-lg p-4 bg-white appearance-none" defaultValue="5">
								<option value="3">3 Soal</option>
								<option value="5">5 Soal</option>
								<option value="10">10 Soal</option>
								<option value="20">20 Soal</option>
								<option value="30">30 Soal</option>
								<option value="50">50 Soal</option>
							</select>
						</div>
						{/* Difficulty */}
						<div>
							<h4 className="font-semibold mb-2">Difficulty</h4>
							<div className="flex space-x-2">
								{['Easy', 'Medium', 'Hard'].map((level) => (
									<label key={level} className="flex-1 cursor-pointer">
										<input type="radio" name="difficulty" value={level} className="peer hidden" defaultChecked={level === 'Easy'} />
										<div className="w-full text-center border-2 border-color-brand p-3 rounded-lg font-semibold text-color-brand peer-checked:bg-color-brand peer-checked:text-text-negative transition">{level}</div>
									</label>
								))}
							</div>
						</div>
						{/* Types of Question */}
						<div>
							<h4 className="font-semibold mb-2">Types of Question</h4>
							<div className="flex flex-wrap gap-2">
								{['Single Choice', 'Multiple Choice', 'Yes-No'].map((type) => (
									<label key={type} className="cursor-pointer">
										<input type="checkbox" name="questionTypes" value={type} className="peer hidden" defaultChecked={true} />
										<div className="px-4 py-2 border-2 border-color-brand rounded-lg font-semibold text-color-brand peer-checked:bg-color-brand peer-checked:text-text-negative transition">{type}</div>
									</label>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* TOMBOL GENERATE UTAMA */}
				<button type="submit" disabled={isPending} className="w-full bg-color-brand text-text-negative mt-8 p-4 font-bold text-lg rounded-xl hover:brightness-90 transition cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">
					{isPending ? 'Membuat Kuis...' : 'GENERATE'}
				</button>

				{/* TAMPILAN ERROR */}
				{state?.error && (
					<div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded-lg text-center">
						<strong>Error:</strong> {state.error}
					</div>
				)}
			</form>
		</MainLayout>
	);
}
