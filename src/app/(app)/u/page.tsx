import { createClientServer } from '@/lib/supabase/server';
import MainLayout from '@/components/MainLayout';
import { DashboardClient } from '@/components/DashboardClient'; // Impor komponen klien kita
import { redirect } from 'next/navigation';

// Ini adalah Server Component, jadi kita bisa langsung mengambil data di sini
export default async function UserDashboardPage() {
	const supabase = await createClientServer();

	// 1. Dapatkan data pengguna yang sedang login
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) {
		redirect('/signin'); // Jika tidak ada user, redirect ke halaman login
	}

	// 2. Ambil semua data secara bersamaan (paralel) untuk efisiensi
	const [roadmapsResult, summariesResult] = await Promise.all([
		supabase.from('roadmaps').select('id, title, data').eq('user_id', user.id).order('created_at', { ascending: false }),
		supabase.from('summaries').select('id, title, created_at').eq('user_id', user.id).order('created_at', { ascending: false }),
	]);

	// 3. Tangani jika ada error saat pengambilan data
	if (roadmapsResult.error) {
		console.error('Error fetching roadmaps:', roadmapsResult.error);
		// Tampilkan pesan error atau state kosong
	}
	if (summariesResult.error) {
		console.error('Error fetching summaries:', summariesResult.error);
	}

	// 4. Kirim data yang sudah bersih ke Client Component untuk ditampilkan
	const roadmaps = roadmapsResult.data || [];
	const summaries = summariesResult.data || [];

	return (
		<MainLayout>
			<DashboardClient initialRoadmaps={roadmaps} initialSummaries={summaries} />
		</MainLayout>
	);
}
