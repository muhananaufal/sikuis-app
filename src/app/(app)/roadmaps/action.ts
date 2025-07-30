/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClientServer } from '@/lib/supabase/server'
import { getAIRoadmap } from '@/lib/getAIRoadmap'

// Tipe untuk state Generate
export interface RoadmapState {
  data?: any;
  error?: string | null;
  message?: string | null;
}

// Tipe untuk state Save (lebih spesifik)
export interface SaveState {
  error?: string | null;
  message?: string | null;
}

export async function generateRoadmapAction(prevState: RoadmapState, formData: FormData): Promise<RoadmapState> {
  const topic = formData.get('topic') as string;
  if (!topic) {
    return { error: 'Topic cannot be empty.' };
  }

  try {
    const roadmapData = await getAIRoadmap(topic);
    return { data: roadmapData, message: "Roadmap generated successfully! Don't forget to save." };
  } catch (e: any) {
    return { error: e.message };
  }
}

// --- PERUBAHAN DI SINI ---
// Tambahkan prevState dan definisikan tipe return Promise<SaveState>
export async function saveRoadmapAction(prevState: SaveState, formData: FormData): Promise<SaveState> {
  const supabase = await createClientServer();

  const title = formData.get('title') as string;
  const roadmapDataString = formData.get('roadmapData') as string;

  if (!title || !roadmapDataString) {
    return { error: 'Title and roadmap data are required to save.' };
  }

  let roadmapData;
  try {
    roadmapData = JSON.parse(roadmapDataString);
  } catch (e) {
    console.log('Error parsing roadmap data:', e);
    return { error: 'Invalid roadmap data format.' };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    // Di dunia nyata, ini seharusnya tidak terjadi jika halaman dilindungi middleware.
    return { error: 'You must be logged in to save a roadmap.' };
  }

  const { data, error } = await supabase
    .from('roadmaps')
    .insert({
      user_id: user.id,
      title: title,
      data: roadmapData,
    })
    .select()
    .single();
  
  if (error) {
    console.error('Supabase save error:', error);
    return { error: 'Failed to save roadmap to your account.' };
  }

  // Redirect jika berhasil. Revalidate & Redirect akan menghentikan eksekusi di sini.
  revalidatePath('/u/roadmaps');
  redirect(`/u/roadmaps/${data.id}`);

  // Catatan: Baris di bawah ini tidak akan pernah tercapai karena redirect,
  // tapi secara teknis diperlukan agar fungsi memenuhi kontrak return type-nya.
  // Dalam kasus redirect, React akan menangani transisi state.
  // return { message: 'Roadmap saved successfully!' }; 
}