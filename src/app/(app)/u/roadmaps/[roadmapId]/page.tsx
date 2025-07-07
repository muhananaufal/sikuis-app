"use client";

import { useRouter } from "next/navigation";
import MainLayout from "@/components/MainLayout";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TreeRoadmap, { RoadmapItem } from "@/components/TreeRoadmap";

export default function UserRoadmaps() {
  const { roadmapId } = useParams();

  const [roadmaps, setRoadmaps] = useState<RoadmapItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!roadmapId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/roadmaps?roadmapID=${roadmapId}`);

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        setRoadmaps(data.roadmaps[0].data);

        console.log("✅ Roadmaps:", data);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      }
    };

    fetchData();
  }, [roadmapId]);

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        <button
          onClick={() => router.back()}
          className="flex items-center pb-10 text-text-primary cursor-pointer"
        >
          <span
            className="material-icons-outlined m-0 mr-4"
            style={{ fontSize: "1.5rem" }}
          >
            arrow_back
          </span>
          <span className="font-semibold">Back</span>
        </button>

        <h2 className="text-3xl font-semibold text-text-primary mb-10">
          Piano Mastery
        </h2>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-color-brand2 text-text-negative px-4 py-2 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex"
          >
            <span
              className="material-icons-outlined m-0 mr-2"
              style={{ fontSize: "1.5rem" }}
            >
              file_download
            </span>
            Download
          </button>
          <button
            type="submit"
            className="bg-color-brand2 text-text-negative px-4 py-2 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex"
          >
            <span
              className="material-icons-outlined m-0 mr-2"
              style={{ fontSize: "1.5rem" }}
            >
              share
            </span>
            Share
          </button>
        </div>

        <div className="bg-gray-100 p-4 flex justify-center mt-4">
          <button
            type="submit"
            className="bg-color-brand text-text-negative px-10 py-2 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex"
          >
            Roadmap
          </button>
        </div>
      </div>

      {roadmaps && roadmaps.length > 0 && (
        <TreeRoadmap RoadmapData={roadmaps} />
      )}
    </MainLayout>
  );
}
