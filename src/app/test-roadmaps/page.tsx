"use client";

// pages/index.tsx
import { useState, useEffect } from "react";
import {
  NodeContainer,
  Modal,
  RoadmapNode,
} from "@/components/RoadmapComponents";
import { getAIRoadmap } from "@/lib/getAIRoadmap";

export default function Home() {
  const [roadmaps, setRoadmaps] = useState<RoadmapNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("Artificial Intelligence");

  useEffect(() => {
    fetch("/roadmaps.json")
      .then((res) => res.json())
      .then(setRoadmaps)
      .catch((err) => console.error("Failed to load roadmaps.json:", err));
  }, []);

  const handleGenerateNewRoadmap = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    const result = await getAIRoadmap(topic);
    if (result) setRoadmaps(result);
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center mt-20 space-y-6">
      <h1 className="text-4xl font-bold">Roadmap Generator</h1>

      <div className="flex gap-4 items-center">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border px-4 py-2 rounded w-64"
          placeholder="Enter a topic (e.g., Web Development)"
        />
        <button
          onClick={handleGenerateNewRoadmap}
          className="px-4 py-2 bg-black text-white rounded cursor-pointer"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate from Gemini"}
        </button>
      </div>

      {roadmaps.map((tree, idx) => (
        <NodeContainer key={idx} node={tree} onNodeClick={setSelectedNode} />
      ))}

      <Modal node={selectedNode} onClose={() => setSelectedNode(null)} />
    </main>
  );
}
