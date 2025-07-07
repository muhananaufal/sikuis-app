"use client";

import MainLayout from "@/components/MainLayout";
import TreeRoadmap, { RoadmapItem } from "@/components/TreeRoadmap";
import { getAIRoadmap } from "@/lib/getAIRoadmap";
import { useEffect, useState } from "react";

import domtoimage from "dom-to-image";

export default function GenerateRoadmaps() {
  const [roadmaps, setRoadmaps] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [topic, setTopic] = useState("");

  // useEffect(() => {
  //   fetch("/roadmaps.json")
  //     .then((res) => res.json())
  //     .then(setRoadmaps)
  //     .catch((err) => console.error("Failed to load roadmaps.json:", err));
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!topic.trim()) return;
    setLoading(true);
    const result = await getAIRoadmap(topic);
    if (result) setRoadmaps(result);
    setLoading(false);
  };

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();

    const node = document.getElementById("downloadableElement");

    if (!node) return;

    domtoimage.toPng(node).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "downloaded-picture.png";
      link.href = dataUrl;
      link.click();
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!topic.trim() || roadmaps.length === 0) {
      alert("Please generate a roadmap first.");
      return;
    }

    const res = await fetch("/api/roadmaps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: topic,
        steps: roadmaps,
      }),
    });

    if (!res.ok) {
      console.error("Failed to save roadmap");
      alert("Failed to save roadmap.");
      return;
    }

    const data = await res.json();
    console.log("Roadmap saved ✅", data);
    alert("Roadmap saved!");
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
          id="downloadableElemen"
          className="w-full bg-color-brand text-text-negative mt-6 p-4 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>

        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="bg-color-brand2 text-text-negative mt-6 px-4 py-2 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex"
          >
            <span
              className="material-icons-outlined m-0"
              style={{ fontSize: "1.5rem" }}
            >
              file_download
            </span>
          </button>
          <button className="bg-color-brand2 text-text-negative mt-6 px-4 py-2 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex">
            <span
              className="material-icons-outlined m-0"
              style={{ fontSize: "1.5rem" }}
            >
              share
            </span>
          </button>
          <button
            onClick={handleSave}
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

      {roadmaps && roadmaps.length > 0 && (
        <TreeRoadmap RoadmapData={roadmaps} />
      )}
    </MainLayout>
  );
}
