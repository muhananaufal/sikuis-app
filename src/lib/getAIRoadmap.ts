export async function getAIRoadmap(topic: string) {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });

  const data = await res.json();
  let rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  rawText = rawText.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(rawText);
  } catch (err) {
    console.error("Failed to parse Gemini response:", err);
    return null;
  }
}
