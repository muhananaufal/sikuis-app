"use client";

import MainLayout from "@/components/MainLayout";

export default function UserRoadmaps() {
  return (
    <MainLayout>
      <div className="max-w-xl mx-auto p-6">
        <div className="font-semibold text-center mb-10">CONGRATULATIONS</div>

        <h2 className="text-3xl font-semibold text-[var(--text-brand)] text-center">
          Quiz Complete!
        </h2>

        <div className="grid grid-cols-3 gap-4 my-16">
          {/* Incorrect */}
          <div className="flex flex-col items-center justify-center bg-red-500 rounded-2xl p-1 text-white">
            <div className="my-1 font-semibold">Incorrect</div>
            <div className="flex items-center justify-center bg-white text-red-500 rounded-xl px-4 py-6 w-full">
              <span className="material-icons-outlined mr-2">cancel</span>
              <span className="font-bold text-lg">3</span>
            </div>
          </div>

          {/* Correct */}
          <div className="flex flex-col items-center justify-center bg-green-500 rounded-2xl p-1 text-white">
            <div className="my-1 font-semibold">Correct</div>
            <div className="flex items-center justify-center bg-white text-green-500 rounded-xl px-4 py-6 w-full">
              <span className="material-icons-outlined mr-2">check_circle</span>
              <span className="font-bold text-lg">7</span>
            </div>
          </div>

          {/* Time Spent */}
          <div className="flex flex-col items-center justify-center bg-blue-500 rounded-2xl p-1 text-white">
            <div className="my-1 font-semibold">Time Spent</div>
            <div className="flex items-center justify-center bg-white text-blue-500 rounded-xl px-4 py-6 w-full">
              <span className="material-icons-outlined mr-2">schedule</span>
              <span className="font-bold text-lg">01:23</span>
            </div>
          </div>
        </div>

        {/* START QUIZ BUTTON */}
        <button
          type="submit"
          className="relative w-full bg-[var(--text-brand)] text-[var(--text-white)] p-4 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex items-center justify-center"
        >
          NEXT
        </button>
      </div>
    </MainLayout>
  );
}
