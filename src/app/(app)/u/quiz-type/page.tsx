"use client";

import { useRouter } from "next/navigation";
import MainLayout from "@/components/MainLayout";

export default function UserRoadmaps() {
  const router = useRouter();

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto p-6">
        {/* Back + Progress */}
        <div className="flex items-center pb-10 text-color-brand cursor-pointer w-full">
          {/* Logout Icon */}
          <button onClick={() => router.back()} className="cursor-pointer">
            <span
              className="material-icons-outlined mr-4 rotate-180"
              style={{ fontSize: "1.5rem" }}
            >
              logout
            </span>
          </button>

          {/* Progress Bar */}
          <div className="flex-1 h-4 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-color-brand transition-all duration-300"
              style={{ width: "65%" }}
            />
          </div>
        </div>

        {/* Multiple Choice */}
        <div>
          <h2 className="font-bold mb-2">Multiple Choice Question</h2>
          <p className="mb-4">What is the capital of France?</p>

          <div className="flex flex-col space-y-2 mb-6">
            {["A", "B", "C", "D"].map((opt, i) => (
              <label
                key={i}
                className="flex items-center justify-center w-full border-2 rounded-xl cursor-pointer text-color-brand border-color-brand transition"
              >
                <input
                  type="radio"
                  name="mcq"
                  value={opt}
                  className="peer hidden"
                />
                <span className="peer-checked:bg-color-brand2 peer-checked:text-white flex-1 text-center  p-3 rounded-xl">
                  {opt}
                </span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="relative w-full bg-color-brand text-text-negative p-4 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex items-center justify-center"
          >
            SEND ANSWER
          </button>
        </div>

        <div className="py-6">
          <hr />
        </div>

        {/* Yes-No */}
        <div>
          <h2 className="font-bold mb-2">Yes-No Question</h2>
          <p className="mb-4">Is the Earth flat?</p>

          <div className="flex space-x-4 mb-6">
            {["Yes", "No"].map((opt, i) => (
              <label
                key={i}
                className="flex-1 flex items-center justify-center border-2 rounded-xl cursor-pointer text-color-brand border-color-brand transition"
              >
                <input
                  type="radio"
                  name="yesno"
                  value={opt}
                  className="peer hidden"
                />
                <span className="peer-checked:bg-color-brand2 peer-checked:text-white flex-1 text-center rounded-xl p-3">
                  {opt}
                </span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="relative w-full bg-color-brand text-text-negative p-4 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex items-center justify-center"
          >
            SEND ANSWER
          </button>
        </div>

        <div className="py-6">
          <hr />
        </div>

        {/* Open Question */}
        <div>
          <h2 className="font-bold mb-2">Open Question</h2>
          <p className="mb-4">Explain the theory of relativity in brief.</p>

          <textarea
            className="w-full border-2 border-gray-300 rounded-xl p-3 mb-6 focus:outline-none focus:border-color-brand"
            rows="5"
            placeholder="Type your answer here..."
          ></textarea>

          <button
            type="submit"
            className="relative w-full bg-color-brand text-text-negative p-4 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex items-center justify-center"
          >
            SEND ANSWER
          </button>
        </div>

        <div className="py-6">
          <hr />
        </div>

        <div className="flex items-center space-x-4 p-4 border-2 border-gray-300 rounded-xl">
          <span className="material-icons-outlined text-3xl text-green-500">
            check_circle
          </span>

          <div>
            <div className="font-bold mb-1">Correct!</div>
            <div className="text-sm">
              Correct Answer: <span className="font-semibold">Paris</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4 p-4 border-2 border-gray-300 rounded-xl">
          <span className="material-icons-outlined text-3xl text-red-500">
            cancel
          </span>

          <div>
            <div className="font-bold mb-1">Incorrect!</div>
            <div className="text-sm">
              Correct Answer: <span className="font-semibold">Paris</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
