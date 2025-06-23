"use client";

import { useRouter } from "next/navigation";
import MainLayout from "@/components/MainLayout";

export default function UserRoadmaps() {
  const router = useRouter();

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto p-6">
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

        <h2 className="text-3xl font-semibold text-text-primary">
          Piano Mastery
        </h2>
        <div className="py-4 text-text-secondary font-regular">Description</div>

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

        <div className="bg-gray-100 p-4 flex justify-center gap-2 mt-4">
          <button
            type="submit"
            className="bg-transparent text-color-brand px-10 py-2 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex"
          >
            Roadmap
          </button>
          <button
            type="submit"
            className="bg-color-brand text-text-negative px-10 py-2 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex"
          >
            Quiz
          </button>
        </div>

        {/* QUIZ SETTINGS */}
        <ul className="space-y-2 mt-10">
          <li className="font-semibold mb-4">Quizez</li>
          <li>
            <a href="#">
              <button className="relative w-full bg-transparent border-2 text-color-brand p-3 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex">
                <div>
                  <span className="material-icons-outlined">map</span>
                </div>
                <div className="w-full ml-4 text-left">
                  <h2>Piano Mastery Quiz #1</h2>
                  <p className="text-text-secondary font-normal">
                    3 Question • Easy
                  </p>
                  <p className="text-text-secondary font-normal">
                    Multiple Choices, Yes-No, Open Question
                  </p>
                </div>

                {/* Top-right kebab menu */}
                <div className="text-color-brand text-2xl leading-none">
                  <span className="material-icons">more_vert</span>
                </div>
              </button>
            </a>
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
                    3 Question • Easy
                  </p>
                  <p className="text-text-secondary font-normal">
                    Multiple Choices, Yes-No, Open Question
                  </p>
                </div>

                {/* Top-right kebab menu */}
                <div className="text-color-brand text-2xl leading-none">
                  <span className="material-icons">more_vert</span>
                </div>
              </button>
            </a>
          </li>
        </ul>

        <div className="py-10">
          <hr />
        </div>

        <form action="" className="space-y-6">
          {/* Number of Question */}
          <div>
            <h2 className="font-semibold mb-2">Number of Question</h2>
            <input
              required
              type="number"
              min="1"
              className="w-full border-2 border-gray-300 rounded-lg p-4"
              placeholder="Enter number"
            />
          </div>
          {/* Difficulty */}
          <div>
            <h2 className="font-semibold mb-2">Difficulty</h2>
            <div className="flex space-x-2">
              {["Easy", "Medium", "Hard"].map((level) => (
                <label key={level} className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="difficulty"
                    value={level.toLowerCase()}
                    className="peer hidden"
                  />
                  <div className="w-full text-center border-2 border-color-brand p-3 rounded-lg font-semibold text-color-brand peer-checked:bg-color-brand peer-checked:text-text-negative transition">
                    {level}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Types of Question */}
          <div>
            <h2 className="font-semibold mb-2">Types of Question</h2>
            <div className="flex flex-wrap gap-2">
              {["Flash Card", "Multiple Choice", "Open Question", "Yes-No"].map(
                (type) => (
                  <label key={type} className="cursor-pointer">
                    <input
                      type="checkbox"
                      name="questionTypes"
                      value={type}
                      className="peer hidden"
                    />
                    <div className="px-4 py-2 border-2 border-color-brand rounded-lg font-semibold text-color-brand peer-checked:bg-color-brand peer-checked:text-text-negative transition">
                      {type}
                    </div>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="relative w-full bg-color-brand text-text-negative p-4 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex items-center justify-center"
          >
            <span className="material-icons absolute left-4">add_circle</span>
            Generate Quiz
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
