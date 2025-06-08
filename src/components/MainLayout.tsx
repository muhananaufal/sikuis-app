"use client";

import { useState } from "react";
import Image from "next/image";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <header className="flex items-center justify-between text-[var(--text-brand)] p-4 border-b border-[var(--text-secondary)]">
        <div className="flex items-center">
          <button
            className="lg:hidden flex items-center mr-4 cursor-pointer"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <span className="material-icons">menu</span>
          </button>
          <div className="text-xl font-bold">
            <i>SiKuis</i>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-xl font-bold mr-4">60</div>
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
          className={`fixed top-0 left-0 h-full w-[400px] bg-[var(--background)] z-40 transform lg:static lg:translate-x-0  ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close button */}
          <div className="flex items-center justify-between p-4 lg:hidden ">
            <div className="text-xl font-bold text-[var(--text-brand)]">
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
                  <button className="relative w-full bg-transparent border-2 text-[var(--text-brand)] p-3 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex justify-center items-center">
                    <span className="material-icons-outlined absolute left-4">
                      map
                    </span>
                    Roadmap Generator
                  </button>
                </a>
              </li>
              <li>
                <a href="/quiz">
                  <button className="relative w-full bg-transparent border-2 text-[var(--text-brand)] p-3 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex justify-center items-center">
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
                <a href="#">
                  <button className="relative w-full bg-transparent border-2 text-[var(--text-brand)] p-3 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex justify-center items-center">
                    <span className="material-icons-outlined absolute left-4">
                      person
                    </span>
                    Account
                  </button>
                </a>
              </li>
              <li>
                <a href="#">
                  <button className="relative w-full bg-transparent border-2 text-[var(--text-brand)] p-3 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex justify-center items-center">
                    <span className="material-icons-outlined absolute left-4">
                      map
                    </span>
                    Roadmap
                  </button>
                </a>
              </li>
              <li>
                <a href="#">
                  <button className="relative w-full bg-transparent border-2 text-[var(--text-brand)] p-3 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex justify-center items-center">
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
                    Quiz
                  </button>
                </a>
              </li>
              <li>
                <a href="#">
                  <button className="relative w-full bg-transparent border-2 text-[var(--text-brand)] p-3 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex justify-center items-center">
                    <span className="material-icons-outlined absolute left-4">
                      settings
                    </span>
                    Settings
                  </button>
                </a>
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
