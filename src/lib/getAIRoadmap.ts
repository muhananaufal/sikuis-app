// PENTING: File ini sekarang hanya untuk digunakan di sisi server (dalam Server Actions)
import { GoogleGenerativeAI } from "@google/generative-ai";

// Pastikan Anda sudah menginstall: npm install @google/generative-ai
// Inisialisasi Gemini Client dengan API Key dari environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getAIRoadmap(topic: string) {
  if (!topic) {
    throw new Error("Topic is required.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `Create a structured learning roadmap for the topic: "${topic}".
  The output must be a valid JSON array of objects.
  Each object must have the following properties: "id" (string), "title" (string), "description" (string), and "children" (an array of a similar object, can be empty).
  Do not include any text outside of the JSON array. Do not wrap the JSON in markdown backticks.
  Example: [{"id": "1", "title": "Introduction", "description": "Start here.", "children": []}]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();
    
    // Validasi dan parse JSON di sini. Jika gagal, akan di-catch.
    const parsedJson = JSON.parse(rawText);
    
    // TODO: Tambahkan validasi dengan Zod di sini untuk memastikan struktur JSON benar
    
    return parsedJson;

  } catch (err) {
    console.error("Error calling Gemini API:", err);
    // Kembalikan error agar bisa ditangani oleh Server Action
    throw new Error("Failed to generate roadmap from AI. Please try again.");
  }
}
