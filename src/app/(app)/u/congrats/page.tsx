'use client';

import MainLayout from '@/components/MainLayout';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

// Komponen utama yang berisi logika untuk menampilkan hasil.
// Dibuat terpisah agar bisa dibungkus dalam <Suspense>.
function ResultsDisplay() {
	const searchParams = useSearchParams();
	const router = useRouter();

	// Ambil data skor dari parameter URL, berikan nilai default jika tidak ada.
	const correctAnswers = parseInt(searchParams.get('correct') || '0');
	const totalQuestions = parseInt(searchParams.get('total') || '0');
	const timeSpent = parseInt(searchParams.get('time') || '0');
	const incorrectAnswers = totalQuestions - correctAnswers;

	// Fungsi untuk memformat waktu dari detik menjadi MM:SS
	const formatTime = (totalSeconds: number) => {
		const minutes = Math.floor(totalSeconds / 60)
			.toString()
			.padStart(2, '0');
		const seconds = (totalSeconds % 60).toString().padStart(2, '0');
		return `${minutes}:${seconds}`;
	};

	const handleNextClick = () => {
		// Di Fase 5, ini akan mengarah ke halaman streak
		router.push('/u/congrats-streak');
	};

	return (
		<MainLayout>
			<div className="max-w-xl mx-auto p-6">
				<div className="font-semibold text-center mb-10 text-text-secondary">CONGRATULATIONS</div>

				<h2 className="text-3xl font-semibold text-color-brand text-center">Quiz Complete!</h2>

				<div className="grid grid-cols-3 gap-4 my-16">
					{/* Incorrect */}
					<div className="flex flex-col items-center justify-center bg-red-500 rounded-2xl p-1 text-white shadow-lg">
						<div className="my-1 font-semibold">Incorrect</div>
						<div className="flex items-center justify-center bg-white text-red-500 rounded-xl px-4 py-6 w-full">
							<span className="material-icons-outlined mr-2">cancel</span>
							<span className="font-bold text-lg">{incorrectAnswers}</span>
						</div>
					</div>

					{/* Correct */}
					<div className="flex flex-col items-center justify-center bg-green-500 rounded-2xl p-1 text-white shadow-lg">
						<div className="my-1 font-semibold">Correct</div>
						<div className="flex items-center justify-center bg-white text-green-500 rounded-xl px-4 py-6 w-full">
							<span className="material-icons-outlined mr-2">check_circle</span>
							<span className="font-bold text-lg">{correctAnswers}</span>
						</div>
					</div>

					{/* Time Spent */}
					<div className="flex flex-col items-center justify-center bg-blue-500 rounded-2xl p-1 text-white shadow-lg">
						<div className="my-1 font-semibold">Time Spent</div>
						<div className="flex items-center justify-center bg-white text-blue-500 rounded-xl px-4 py-6 w-full">
							<span className="material-icons-outlined mr-2">schedule</span>
							<span className="font-bold text-lg">{formatTime(timeSpent)}</span>
						</div>
					</div>
				</div>

				{/* Tombol NEXT */}
				<button onClick={handleNextClick} className="w-full bg-color-brand text-text-negative p-4 font-bold text-lg rounded-xl hover:brightness-90 transition cursor-pointer">
					NEXT
				</button>
			</div>
		</MainLayout>
	);
}

// Komponen Halaman utama yang mengekspor default.
// Ia hanya bertugas untuk menyediakan 'Suspense boundary'.
export default function CongratsPage() {
	return (
		<Suspense fallback={<div className="text-center p-10">Loading results...</div>}>
			<ResultsDisplay />
		</Suspense>
	);
}
