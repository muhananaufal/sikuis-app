"use client";

import MainLayout from "@/components/MainLayout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { subDays } from "date-fns";

export default function UserRoadmaps() {
  const [streakCount, setStreakCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAndUpdateStreak = async () => {
      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) return console.error("User not found");

      const { data: streak, error } = await supabase
        .from("streaks")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching streak:", error.message);
        return;
      }

      const now = new Date();
      const todayStr = now.toISOString().split("T")[0];
      const yesterdayStr = subDays(now, 1).toISOString().split("T")[0];

      console.log("🧠 todayStr:", todayStr);
      console.log("🧠 yesterdayStr:", yesterdayStr);
      console.log("🧠 last_triggered_at:", streak?.last_triggered_at);

      if (!streak) {
        // First-time user
        const { error: insertError } = await supabase.from("streaks").insert({
          user_id: user.id,
          count: 1,
          last_triggered_at: todayStr,
        });
        if (insertError) console.error("Insert failed:", insertError.message);
        setStreakCount(1);
        return;
      }

      const lastTriggeredStr = streak.last_triggered_at;

      if (lastTriggeredStr === todayStr) {
        // Already updated today
        setStreakCount(streak.count);
      } else if (lastTriggeredStr === yesterdayStr) {
        // Increment streak
        const newCount = streak.count + 1;
        const { error: updateError } = await supabase
          .from("streaks")
          .update({
            count: newCount,
            last_triggered_at: todayStr,
          })
          .eq("user_id", user.id);

        if (updateError) {
          console.error("Failed to update streak:", updateError.message);
          setStreakCount(streak.count);
        } else {
          setStreakCount(newCount);
        }
      } else {
        // Missed a day, reset streak
        const { error: resetError } = await supabase
          .from("streaks")
          .update({
            count: 1,
            last_triggered_at: todayStr,
          })
          .eq("user_id", user.id);

        if (resetError)
          console.error("Failed to reset streak:", resetError.message);
        setStreakCount(1);
      }
    };

    checkAndUpdateStreak().finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto p-6">
        {loading ? (
          <div className="text-center">Loading streak...</div>
        ) : (
          <>
            <div className="font-semibold text-center mb-10">
              CONGRATULATIONS
            </div>

            <div className="py-4 mb-4 text-text-secondary font-regular text-center">
              A streak is born! Practice every day to help it grow
            </div>
            <div className="flex justify-center text-color-brand mb-6">
              <Image
                src="/streak-fire.svg"
                alt="Streak Icon"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>

            <h2 className="text-9xl font-semibold text-color-brand2 text-center">
              {streakCount ?? "?"}
            </h2>
            <h2 className="text-3xl font-semibold text-color-brand2 text-center">
              Day Streak
            </h2>

            <a
              href="/u"
              className="relative w-full bg-color-brand text-text-negative p-4 mt-5 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex items-center justify-center"
            >
              NEXT
            </a>
          </>
        )}
      </div>
    </MainLayout>
  );
}
