"use client";

import { Roadmap } from "@/app/types/roadmap";
import MainLayout from "@/components/MainLayout";
import { useEffect, useState } from "react";

export default function UserRoadmaps() {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);

  const [selectedTab, setSelectedTab] = useState<string>("all");

  useEffect(() => {
    const fetchRoadmaps = async () => {
      const res = await fetch("api/roadmaps");

      if (!res.ok) {
        console.error("Failed to save roadmap");
        alert("Failed to save roadmap.");
        return;
      }

      const data = await res.json();
      setRoadmaps(data.roadmaps);
    };
    fetchRoadmaps();
  }, []);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-6">
        {/* Radio-style buttons */}
        <div className="flex space-x-2 mb-6">
          {["all", "roadmaps", "summary"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-2 rounded-xl font-semibold border-2 transition ${
                selectedTab === tab
                  ? "bg-color-brand text-white border-color-brand"
                  : "border-text-secondary text-text-secondary hover:bg-gray-100"
              }`}
            >
              {tab === "all"
                ? "All"
                : tab === "roadmaps"
                ? "Roadmaps"
                : "Summary & Quiz"}
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {/* ROADMAPS */}
          {(selectedTab === "all" || selectedTab === "roadmaps") && (
            <ul className="space-y-2 mt-6">
              <li className="font-semibold mb-4 flex justify-between">
                <div>Roadmaps</div>
                <a
                  href="/roadmaps"
                  className="border rounded-xl py-1 px-3 flex items-center"
                >
                  <span
                    className="material-icons mr-1"
                    style={{ fontSize: "1rem" }}
                  >
                    add
                  </span>
                  Add
                </a>
              </li>
              {roadmaps &&
                roadmaps.map((roadmap) => (
                  <li key={roadmap.id}>
                    <a href={`/u/roadmaps/${roadmap.id}`}>
                      <button className="relative w-full bg-transparent border-2 text-color-brand p-3 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                            fill="currentColor"
                            className="object-contain"
                          >
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM10 5.47l4 1.4v11.66l-4-1.4V5.47zm-5 .99l3-1.01v11.7l-3 1.16V6.46zm14 11.08l-3 1.01V6.86l3-1.16v11.84z" />
                          </svg>
                        </div>

                        <div className="w-full ml-4 text-left">
                          <h2>{roadmap.title} - Roadmap</h2>
                          <p className="text-text-secondary font-normal">
                            {roadmap.data.length} Steps
                          </p>
                        </div>
                        <div className="text-color-brand text-2xl leading-none">
                          <span className="material-icons">more_vert</span>
                        </div>
                      </button>
                    </a>
                  </li>
                ))}
            </ul>
          )}

          {/* SUMMARY & QUIZ */}
          {(selectedTab === "all" || selectedTab === "summary") && (
            <ul className="space-y-2">
              <li className="font-semibold mb-4 flex justify-between">
                <div>Summary & Quiz</div>
                <button className="border rounded-xl py-1 px-3 flex items-center">
                  <span
                    className="material-icons mr-1"
                    style={{ fontSize: "1rem" }}
                  >
                    add
                  </span>
                  Add
                </button>
              </li>
              <li>
                <a href="#">
                  <button className="relative w-full bg-transparent border-2 text-color-brand p-3 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor"
                        className="object-contain"
                      >
                        <path d="M400-160h160v-160H400v160ZM160-400h160v-160H160v160Zm240 0h160v-160H400v160Zm240 0h160v-160H640v160Zm0-240h160v-160H640v160ZM320-80v-240H80v-320h480v-240h320v560H640v240H320Z" />
                      </svg>
                    </div>
                    <div className="w-full ml-4 text-left">
                      <h2>Piano Mastery Quiz #1</h2>
                      <p className="text-text-secondary font-normal">
                        3 Questions • Easy
                      </p>
                      <p className="text-text-secondary font-normal">
                        Multiple Choices, Yes-No, Open Question
                      </p>
                    </div>
                    <div className="text-color-brand text-2xl leading-none">
                      <span className="material-icons">more_vert</span>
                    </div>
                  </button>
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
