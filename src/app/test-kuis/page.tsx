"use client";

// pages/index.tsx
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("Artificial Intelligence");

  return (
    <main className="flex flex-col items-center mt-20 space-y-6">
      <h1 className="text-4xl font-bold">Kuis Generator</h1>

      <div className="flex gap-4 items-center">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border px-4 py-2 rounded w-64"
          placeholder="Enter a topic (e.g., Web Development)"
        />
        <button
          onClick={() => alert("FUNCTION NOT IMPLEMENTED")}
          className="px-4 py-2 bg-black text-white rounded cursor-pointer"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate from Gemini"}
        </button>
      </div>
    </main>
  );
}
