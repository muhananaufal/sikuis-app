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

        <div className="flex justify-center text-color-brand mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            height="120px"
            width="120px"
            fill="currentColor"
            className="object-contain"
          >
            <path d="M400-160h160v-160H400v160ZM160-400h160v-160H160v160Zm240 0h160v-160H400v160Zm240 0h160v-160H640v160Zm0-240h160v-160H640v160ZM320-80v-240H80v-320h480v-240h320v560H640v240H320Z" />
          </svg>
        </div>

        <h2 className="text-3xl font-semibold text-color-brand text-center">
          Piano Mastery
        </h2>
        <div className="py-4 text-text-secondary font-regular text-center">
          3 Question • Easy
        </div>
        <div className="pb-4 text-text-secondary font-regular text-center">
          Multiple Choices, Yes-No, Open Question
        </div>

        {/* START QUIZ BUTTON */}
        <button
          type="submit"
          className="relative w-full bg-color-brand text-text-negative p-4 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex items-center justify-center"
        >
          START
        </button>

        {/* QUIZ SETTINGS */}
        <ul className="space-y-2 mt-10">
          <li className="font-semibold mb-4">Past Attemps</li>
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
      </div>
    </MainLayout>
  );
}
