import MainLayout from '@/components/MainLayout';
import { createClientServer } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { Key } from 'react'; // Import Key jika diperlukan secara eksplisit, meski biasanya tidak

// ✅ STEP 1: Definisikan tipe untuk data Anda
interface Question {
	type: string;
	// Tambahkan properti lain jika ada, misal: text: string, options: string[]
}

interface Quiz {
	id: string; // atau number, sesuaikan dengan skema DB Anda
	questions: Question[];
}

interface Summary {
	id: string; // atau number
	title: string;
	summary: string;
}

// Tipe untuk Props halaman
type Props = {
	params: { summaryId: string };
	searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function QuizCoverPage({ params }: Props) {
	const supabase = await createClientServer();

	// ✅ STEP 2: Gunakan tipe saat mengambil data
	const { data: summary, error: summaryError } = await supabase.from('summaries').select('id, title, summary').eq('id', params.summaryId).single<Summary>(); // Beri tahu Supabase tipe yang diharapkan

	if (summaryError || !summary) {
		notFound();
	}

	// Lakukan hal yang sama untuk quiz
	const { data: quiz, error: quizError } = await supabase.from('quizzes').select('id, questions').eq('summary_id', summary.id).single<Quiz>(); // Beri tahu Supabase tipe yang diharapkan

	if (quizError || !quiz || !quiz.questions) {
		// Tambahkan pengecekan `!quiz.questions`
		console.error('Quiz not found or has no questions for summary:', summary.id);
		// Mungkin lebih baik redirect ke halaman error atau menampilkan pesan
		redirect('/u');
	}

	// ✅ STEP 3: Hapus `any` karena TypeScript sekarang tahu tipenya
	// `q` sekarang secara otomatis bertipe `Question`, dan `q.type` adalah `string`
	const questionCount = quiz.questions.length;
	const questionTypes = [...new Set(quiz.questions.map((q) => q.type))];

	return (
		<MainLayout>
			<div className="max-w-xl mx-auto p-6 text-center">
				<div className="flex justify-center text-color-brand mb-6">
					<span className="material-icons-outlined" style={{ fontSize: '120px' }}>
						quiz
					</span>
				</div>

				<h1 className="text-3xl font-bold text-color-brand">{summary.title}</h1>

				<div className="py-4 text-text-secondary font-regular flex justify-center items-center gap-2 flex-wrap">
					<span>{questionCount} Pertanyaan</span>
					<span className="text-gray-300">•</span>
					{/* SEKARANG INI AMAN. `type` adalah string. */}
					{questionTypes.map((type: Key | null | undefined) => (
						<span key={type} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
							{type}
						</span>
					))}
				</div>

				<p className="text-slate-600 mb-8">{summary.summary}</p>

				<Link href={`/u/quiz-type/${quiz.id}`} className="w-full inline-block bg-color-brand text-text-negative p-4 font-bold text-lg rounded-xl hover:brightness-90 transition">
					START QUIZ
				</Link>

				<div className="mt-10 text-left">
					<h2 className="font-semibold mb-4">Riwayat Pengerjaan</h2>
					<p className="text-sm text-gray-500">Anda belum pernah mengerjakan kuis ini.</p>
				</div>
			</div>
		</MainLayout>
	);
}
