import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClientServer } from "@/lib/supabase/server";


export async function GET() {
  const supabase = await createClientServer();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("❌ getUser error:", userError.message);
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { data: roadmaps, error } = await supabase
  .from("roadmaps")
  .select("id, title, data, created_at")
  .eq("user_id", user?.id)
  .order("created_at", { ascending: false });
  
  if (error) {
    console.error("❌ Supabase fetch error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ roadmaps, user });
}


export async function POST(req: Request) {
  const supabase = await createClientServer();

  const { title, steps } = await req.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return new Response("Unauthorized", { status: 401 });

  const { data, error } = await supabase
    .from("roadmaps")
    .insert([{ user_id: user.id, title, data: steps }])
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ message: "Roadmap saved", data });
}
