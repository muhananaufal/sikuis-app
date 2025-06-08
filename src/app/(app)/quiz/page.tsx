"use client";

import MainLayout from "@/components/MainLayout";
import { useState } from "react";

export default function GenerateQuiz() {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you'd call your API
  };

  return (
    <MainLayout>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6">
        <h2 className="text-3xl font-semibold text-[var(--text-brand)] text-center">
          Generate Summary & Quiz with AI
        </h2>
        <div className="p-4 text-[var(--text-secondary)] font-regular text-center">
          Make quick summary and quiz from your youtube link, pdf, etc
        </div>

        {/* SELECT FILE BUTTON */}
        <label className="w-full bg-[var(--text-brand2)] text-[var(--text-white)] p-4 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer text-center block">
          SELECT FILE
          <input type="file" className="hidden" />
        </label>

        <div className="text-[var(--text-secondary)] text-center font-semibold my-6">
          OR
        </div>

        {/* FORM INPUT */}
        <input
          type="text"
          placeholder="Input a Youtube Link"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          className="w-full border-2 border-[var(--text-secondary)] px-4 py-4 text-[var(--text-primary)] focus:outline-none rounded-xl placeholder:text-center text-center"
        />

        {/* GENERATE BUTTON */}
        <button
          type="submit"
          className="w-full bg-[var(--text-brand)] text-[var(--text-white)] mt-6 p-4 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer"
        >
          GENERATE
        </button>
      </form>
    </MainLayout>
  );
}
