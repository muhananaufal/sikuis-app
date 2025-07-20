import MainLayout from '@/components/MainLayout';
import { QuizPlayer } from '@/components/QuizPlayer';
import { createClientServer } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export interface Question {
	type: 'Single Choice' | 'Multiple Choice' | 'Yes-No';
	question: string;
	options?: string[];
	answer: string | string[];
}

export interface QuizData {
	id: string;
	title: string;
	questions: Question[];
}

export default async function QuizTypePage({ params }: { params: { quizId: string } }) {
	const supabase = await createClientServer();

	// ✅ PERBAIKAN: Ambil quizId dari params ke variabelnya sendiri
	const { quizId } = params;

	const { data: quizData, error } = await supabase
		.from('quizzes')
		.select('id, title, questions')
		.eq('id', quizId) // Gunakan variabel quizId di sini
		.single();

	if (error || !quizData) {
		notFound();
	}

	return (
		<MainLayout>
			<div className="container mx-auto">
				<QuizPlayer quizData={quizData as QuizData} />
			</div>
		</MainLayout>
	);
}
