import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface QuizOptions {
  numQuestions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionTypes: string[];
}

/**
 * Generates a summary and a custom quiz from a given topic.
 * @param topic The topic provided by the user.
 * @param options The quiz settings from the user.
 * @returns A structured object with summary and questions.
 */
export async function getAISummaryAndQuizFromTopic(topic: string, options: QuizOptions) {
  if (!topic) throw new Error("Topic cannot be empty.");

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
      Anda adalah seorang pendidik ahli. Seorang pengguna ingin belajar tentang topik berikut: "${topic}".
  
      Harap lakukan dua tugas berdasarkan topik ini:
      1. Tulis ringkasan yang padat dan informatif tentang topik tersebut (sekitar 100-150 kata).
      2. Buat kuis untuk menguji pemahaman pengguna tentang topik tersebut, dengan mengikuti aturan berikut:
         - Jumlah pertanyaan: ${options.numQuestions}
         - Tingkat kesulitan: ${options.difficulty}
         - Jenis pertanyaan yang wajib ada: ${options.questionTypes.join(', ')}.
  
      Output akhir HARUS berupa satu objek JSON yang valid dengan struktur persis seperti di bawah ini.
      Jangan sertakan teks, penjelasan, atau tanda petik terbalik markdown (backticks) di luar objek JSON.
  
      {
        "summary": "Ringkasan yang Anda hasilkan di sini.",
        "questions": [
          {
            "type": "Pilihan Tunggal" | "Pilihan Ganda" | "Ya-Tidak",
            "question": "Teks pertanyaannya?",
            "options": ["Opsi A", "Opsi B", "Opsi C", "Opsi D"],
            "answer": "Teks opsi yang benar untuk Pilihan Tunggal/Ya-Tidak, atau sebuah array berisi string yang benar untuk Pilihan Ganda."
          }
        ]
      }
    `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let rawText = response.text();
    
    rawText = rawText.replace(/```json|```/g, "").trim();
    const parsedJson = JSON.parse(rawText);
    
    return parsedJson;
  } catch (err) {
    console.error("Error calling Gemini API for Topic-Based Quiz:", err);
    throw new Error("Gagal menghasilkan konten dari AI. AI mungkin sibuk, silakan coba lagi.");
  }
}
