import { createClientServer } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const supabase = await createClientServer();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("❌ getUser error:", userError.message);
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const roadmapID = url.searchParams.get("roadmapID");

  if (!roadmapID) {
    return Response.json({ error: "Missing roadmapID" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("roadmaps")
    .select("data")
    .eq("id", roadmapID)
    .eq("user_id", user?.id)
    .single(); // Only one roadmap expected

  if (error) {
    console.error("❌ Supabase fetch error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}
