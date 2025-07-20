'use server';

import { createClientServer } from "@/lib/supabase/server";

// Definisikan tipe data untuk kejelasan
interface RoadmapForSelection {
  id: string;
  title: string;
  data: {
    id: string;
    title: string;
    description: string;
    children: {
        id: string;
        title: string;
        description: string;
    }[];
  }[];
}

export async function getUserRoadmapsAction(): Promise<{ roadmaps?: RoadmapForSelection[]; error?: string }> {
    const supabase = await createClientServer();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: 'User not authenticated.' };
    }

    const { data, error } = await supabase
        .from('roadmaps')
        .select('id, title, data')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Failed to fetch user roadmaps:", error);
        return { error: 'Failed to retrieve your roadmaps.' };
    }

    return { roadmaps: data as RoadmapForSelection[] };
}
