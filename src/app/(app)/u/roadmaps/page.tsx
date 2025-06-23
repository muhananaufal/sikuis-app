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

        <div className="bg-gray-100 p-4 flex justify-center mt-4">
          <button
            type="submit"
            className="bg-color-brand text-text-negative px-10 py-2 font-semibold rounded-xl hover:brightness-90 transition cursor-pointer flex"
          >
            Roadmap
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
