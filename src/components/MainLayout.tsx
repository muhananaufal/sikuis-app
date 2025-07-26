"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { subDays } from "date-fns";
import Image from "next/image";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const supabase = createClient();
  const [streakCount, setStreakCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchStreak = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) return;

      const { data: streak, error } = await supabase
        .from("streaks")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (!streak) return;

      const now = new Date();
      const todayStr = now.toISOString().split("T")[0];
      const yesterdayStr = subDays(now, 1).toISOString().split("T")[0];
      const lastTriggeredStr = streak.last_triggered_at;

      const isToday = lastTriggeredStr === todayStr;
      const isYesterday = lastTriggeredStr === yesterdayStr;

      if (isToday || isYesterday) {
        setStreakCount(streak.count);
      } else {
        // Streak expired – reset to 1
        await supabase
          .from("streaks")
          .update({
            count: 1,
            last_triggered_at: todayStr,
          })
          .eq("user_id", user.id);

        setStreakCount(1);
      }
    };

    fetchStreak();
  }, [supabase]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <header className="flex items-center justify-between text-color-brand p-4 border-b border-text-secondary sticky top-0 z-50 bg-white">
        <div className="flex items-center">
          <button
            className="lg:hidden flex items-center mr-4 cursor-pointer"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <span className="material-icons">menu</span>
          </button>
          <div className="text-xl font-bold">
            <Image src="/logo-inline.png" alt="Logo" width={100} height={10} />
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-xl font-bold mr-4">
            {streakCount !== null ? streakCount : "-"}
          </div>

          <Image
            src="/streak-fire.svg"
            alt="Google"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-[400px] bg-background z-40 transform lg:static lg:translate-x-0  ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close button */}
          <div className="flex items-center justify-between p-4 lg:hidden ">
            <div className="text-xl font-bold text-color-brand">
              <i>SiKuis</i>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
              className="cursor-pointer"
            >
              <span className="material-icons ">close</span>
            </button>
          </div>

          {/* Sidebar Content */}
          <nav className="p-4">
            <ul className="space-y-2 mt-2">
              <li className="font-semibold">Generator</li>
              <li>
                <a href="/roadmaps">
                  <button className="relative w-full bg-transparent border-2 text-color-brand p-3 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex justify-center items-center">
                    <span className="material-icons-outlined absolute left-4">
                      map
                    </span>
                    Roadmap Generator
                  </button>
                </a>
              </li>
              <li>
                <a href="/quiz">
                  <button className="relative w-full bg-transparent border-2 text-color-brand p-3 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="currentColor"
                      className="absolute left-4 object-contain"
                    >
                      <path d="M400-160h160v-160H400v160ZM160-400h160v-160H160v160Zm240 0h160v-160H400v160Zm240 0h160v-160H640v160Zm0-240h160v-160H640v160ZM320-80v-240H80v-320h480v-240h320v560H640v240H320Z" />
                    </svg>
                    Summary & Quiz Generator
                  </button>
                </a>
              </li>
            </ul>
            <br />
            <ul className="space-y-2 mt-2">
              <li className="font-semibold">General</li>
              <li>
                <a href="/u">
                  <button className="relative w-full bg-transparent border-2 text-color-brand p-3 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex justify-center items-center">
                    <span className="material-icons-outlined absolute left-4">
                      bookmark
                    </span>
                    Saved Item
                  </button>
                </a>
              </li>
              <li>
                <a href="/settings">
                  <button className="relative w-full bg-transparent border-2 text-color-brand p-3 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex justify-center items-center">
                    <span className="material-icons-outlined absolute left-4">
                      settings
                    </span>
                    Settings
                  </button>
                </a>
              </li>
              <li>
                <form method="POST" action="/api/auth/signout">
                  <button
                    type="submit"
                    className="relative w-full border-2 bg-color-brand text-text-negative p-3 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex justify-center items-center"
                  >
                    <span className="material-icons-outlined absolute left-4">
                      logout
                    </span>
                    Sign Out
                  </button>
                </form>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 ">{children}</main>
      </div>
    </div>
  );
}
