"use client";

import MainLayout from "@/components/MainLayout";
import { useState } from "react";

export default function GenerateRoadmaps() {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you'd call your API
  };

  return (
    <MainLayout>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 p-6">
        <h2 className="text-3xl font-semibold text-color-brand text-center">
          Generate Roadmaps with AI
        </h2>
        <div className="p-4 text-text-secondary font-regular text-center">
          Enter a topic and let the AI generate a roadmap for you
        </div>

        {/* FORM INPUT */}
        <input
          type="text"
          placeholder="Enter a topic to generate roadmap for"
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

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-color-brand2 text-text-negative mt-6 px-4 py-2 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex"
          >
            <span
              className="material-icons-outlined m-0"
              style={{ fontSize: "1.5rem" }}
            >
              file_download
            </span>
          </button>
          <button
            type="submit"
            className="bg-color-brand2 text-text-negative mt-6 px-4 py-2 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex"
          >
            <span
              className="material-icons-outlined m-0"
              style={{ fontSize: "1.5rem" }}
            >
              share
            </span>
          </button>
          <button
            type="submit"
            className="bg-color-brand2 text-text-negative mt-6 px-4 py-2 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex"
          >
            <span
              className="material-icons-outlined m-0"
              style={{ fontSize: "1.5rem" }}
            >
              save
            </span>
          </button>
        </div>
      </form>
    </MainLayout>
  );
}
