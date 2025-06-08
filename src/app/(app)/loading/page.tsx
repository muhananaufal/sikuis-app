"use client";

import MainLayout from "@/components/MainLayout";

export default function Loading() {
  return (
    <MainLayout>
      <div className="text-center py-6">
        <span
          className="material-icons-outlined text-[var(--text-brand)]"
          style={{ fontSize: "5rem" }}
        >
          refresh
        </span>
        <h2 className="text-3xl font-semibold text-[var(--text-brand)] text-center">
          Generating Summary...
        </h2>
        <div className="p-4 text-[var(--text-secondary)] font-regular text-center">
          Dream big, Do big
        </div>
      </div>
    </MainLayout>
  );
}
