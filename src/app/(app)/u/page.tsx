"use client";

import MainLayout from "@/components/MainLayout";
import { useState } from "react";

export default function UserRoadmaps() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto p-6">
        <div className="relative w-full">
          {/* Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full border-2 border-[var(--text-secondary)] text-[var(--text-secondary)] font-semibold rounded-xl p-3 flex items-center justify-center space-x-2 hover:bg-gray-100 transition"
          >
            <span
              className={`material-icons-outlined text-lg transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              expand_more
            </span>

            <span className="flex-1 text-center">Select Option</span>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-[var(--text-secondary)] rounded-xl shadow-lg z-10">
              <ul className="divide-y divide-gray-200">
                {["Roadmaps", "Summary & Quiz", "Quiz"].map((option, index) => (
                  <li
                    key={index}
                    className="p-3 cursor-pointer hover:bg-gray-100 text-[var(--text-secondary)] text-center"
                    onClick={() => {
                      console.log(`Selected: ${option}`);
                      setIsOpen(false); // close menu on select
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* QUIZ SETTINGS */}
        <ul className="space-y-2 mt-10">
          <li className="font-semibold mb-4 flex justify-between ">
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
              <button className="relative w-full bg-transparent border-2 text-[var(--text-brand)] p-3 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex">
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
                  <p className="text-[var(--text-secondary)] font-normal">
                    3 Question • Easy
                  </p>
                  <p className="text-[var(--text-secondary)] font-normal">
                    Multiple Choices, Yes-No, Open Question
                  </p>
                </div>

                {/* Top-right kebab menu */}
                <div className="text-[var(--text-brand)] text-2xl leading-none">
                  <span className="material-icons">more_vert</span>
                </div>
              </button>
            </a>
          </li>
        </ul>
        <ul className="space-y-2 mt-10">
          <li className="font-semibold mb-4 flex justify-between ">
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
              <button className="relative w-full bg-transparent border-2 text-[var(--text-brand)] p-3 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex">
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
                  <p className="text-[var(--text-secondary)] font-normal">
                    3 Question • Easy
                  </p>
                  <p className="text-[var(--text-secondary)] font-normal">
                    Multiple Choices, Yes-No, Open Question
                  </p>
                </div>

                {/* Top-right kebab menu */}
                <div className="text-[var(--text-brand)] text-2xl leading-none">
                  <span className="material-icons">more_vert</span>
                </div>
              </button>
            </a>
          </li>
        </ul>
      </div>
    </MainLayout>
  );
}
