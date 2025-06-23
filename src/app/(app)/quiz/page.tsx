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
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 p-6">
        <h2 className="text-3xl font-semibold text-color-brand text-center">
          Generate Summary & Quiz with AI
        </h2>
        <div className="p-4 text-text-secondary font-regular text-center">
          Make quick summary and quiz from your youtube link, pdf, etc
        </div>

        {/* SELECT FILE BUTTON */}
        <label className="w-full bg-color-brand2 text-text-negative p-4 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer text-center block">
          SELECT FILE
          <input type="file" className="hidden" />
        </label>

        <div className="text-text-secondary text-center font-semibold my-6">
          OR
        </div>

        {/* FORM INPUT */}
        <input
          type="text"
          placeholder="Input a Youtube Link"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          className="w-full border-2 border-text-secondary px-4 py-4 text-text-primary focus:outline-none rounded-xl text-center"
        />

        {/* GENERATE BUTTON */}
        <button
          type="submit"
          className="w-full bg-color-brand text-text-negative mt-6 p-4 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer"
        >
          GENERATE
        </button>
      </form>
    </MainLayout>
  );
}
