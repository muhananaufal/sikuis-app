"use client";

import MainLayout from "@/components/MainLayout";
import Image from "next/image";

export default function UserRoadmaps() {
  return (
    <MainLayout>
      <div className="max-w-xl mx-auto p-6">
        <div className="font-semibold text-center mb-10">CONGRATULATIONS</div>

        <div className="py-4 mb-4 text-[var(--text-secondary)] font-regular text-center">
          A streak is born! Practice every day to help it grow
        </div>
        <div className="flex justify-center text-[var(--text-brand)] mb-6">
          <Image
            src="/streak-fire.svg"
            alt="Google"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        <h2 className="text-9xl font-semibold text-[var(--text-brand2)] text-center">
          60
        </h2>
        <h2 className="text-3xl font-semibold text-[var(--text-brand2)] text-center">
          Day Streak
        </h2>

        <div className="rounded-xl border-2 border-[var(--text-brand)] p-4 my-6 text-[var(--text-brand)]">
          <div className="grid grid-cols-7 gap-2 text-center">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, index) => (
              <div
                key={day}
                className="flex flex-col items-center justify-center p-2 rounded-lg"
              >
                {/* Day Label */}
                <div className="font-semibold mb-1">{day}</div>

                {/* Check Circle */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 border-[var(--text-brand)] cursor-pointer transition
            ${
              index < 4
                ? "bg-[var(--text-brand)] text-white"
                : "bg-white text-[var(--text-brand)]"
            }`}
                >
                  <span className="material-icons-outlined text-xl">
                    {index < 4 ? "check_circle" : "radio_button_unchecked"}
                  </span>
                </div>
              </div>
            ))}
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
