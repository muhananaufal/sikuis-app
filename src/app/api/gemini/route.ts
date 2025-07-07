import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { topic } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey)
    return NextResponse.json({ error: "No API key" }, { status: 500 });

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const prompt = `Create a JavaScript array of objects as a roadmap to learn ${topic}. Determine the language of the topic "${topic}". Generate the 'title' and 'description' fields in the detected language (English or Indonesian). The 'id' field must always be an English string. Each object must have: id (string), title (string), description (string), and children (array). Maximum 10 steps. Return only valid JSON. No adding anything other than valid JSON.`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  const data = await res.json();

  return NextResponse.json(data);
}
