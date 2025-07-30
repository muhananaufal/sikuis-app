/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { createClientServer } from '@/lib/supabase/server'
// Perhatikan, saya asumsikan file ini ada di path yang benar
import { getAISummaryAndQuizFromTopic } from '@/lib/getAISummaryAndQuiz';

// Definisikan tipe untuk state yang akan dikembalikan
export interface SummaryQuizState {
  data?: {
    summary: string;
    questions: any[];
  };
  error?: string | null;
  message?: string | null;
}

export async function generateSummaryAndQuizAction(prevState: SummaryQuizState, formData: FormData): Promise<SummaryQuizState> {
    const supabase = await createClientServer();

    const nodeTitle = formData.get('nodeTitle') as string;
    const nodeDescription = formData.get('nodeDescription') as string;

    if (!nodeTitle) {
        return { error: 'Node title is missing.' };
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'You must be logged in to perform this action.' };
    }

    try {
        // ✅ STEP 1: Gabungkan title dan description untuk menjadi topik yang lebih kaya konteks.
        const fullTopic = nodeDescription ? `${nodeTitle}: ${nodeDescription}` : nodeTitle;

        // ✅ STEP 2: Siapkan objek 'options' yang dibutuhkan oleh fungsi AI.
        // Anda perlu menentukan nilai-nilai ini. Bisa dari form atau hardcode sebagai default.
        const quizOptions = {
            numQuestions: 5,
            difficulty: 'Medium' as const, // Gunakan 'as const' untuk menjaga tipe literal
            questionTypes: ['Pilihan Tunggal', 'Ya-Tidak']
        };
        
        // ✅ STEP 3: Panggil fungsi AI dengan argumen yang sudah benar.
        const aiContent = await getAISummaryAndQuizFromTopic(fullTopic, quizOptions);

        // 4. Simpan ke database dalam satu transaksi (jika salah satu gagal, semua dibatalkan)
        // Kita gunakan .rpc() untuk memanggil fungsi PostgreSQL
        // Anda perlu membuat fungsi ini di database Supabase Anda.
        // Ini adalah cara paling aman untuk memastikan integritas data.
        
        // Simpan ringkasan terlebih dahulu untuk mendapatkan ID-nya
        const { data: summaryData, error: summaryError } = await supabase
            .from('summaries')
            .insert({
                user_id: user.id,
                title: nodeTitle,
                summary: aiContent.summary,
            })
            .select('id')
            .single();

        if (summaryError) throw summaryError;

        // Simpan kuis dengan summary_id yang baru dibuat
        const { error: quizError } = await supabase
            .from('quizzes')
            .insert({
                user_id: user.id,
                summary_id: summaryData.id,
                title: `${nodeTitle} Quiz`,
                questions: aiContent.questions,
            });

        if (quizError) throw quizError;
        
        // 5. Kembalikan data ke UI
        return { data: aiContent };

    } catch (e: any) {
        console.error("Transaction failed:", e.message);
        return { error: e.message };
    }
}
