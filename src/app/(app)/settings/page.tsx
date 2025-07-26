"use client";

import MainLayout from "@/components/MainLayout";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { format } from "date-fns";

export default function SettingsPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [joinedAt, setJoinedAt] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Failed to get user:", error.message);
        return;
      }

      const user = data.user;
      if (user) {
        setEmail(user.email || "");
        setJoinedAt(format(new Date(user.created_at || ""), "MMMM d, yyyy"));
      }

      setLoading(false);
    };

    getUser();
  }, [supabase]);

  const handleDeleteAccount = async () => {
    const confirmed = confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;

    alert("Account deletion must be handled through a secure backend route.");
    // TODO: Call your own API route that uses Supabase Admin SDK to delete the user
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Settings</h1>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Joined At */}
            <div className="text-sm text-gray-500 mt-2 mb-10">
              Joined on {joinedAt}
            </div>

            {/* Delete Account */}
            <div>
              <p className="block text-sm font-medium mb-1 text-red-600">
                Danger Zone
              </p>
              <button
                onClick={handleDeleteAccount}
                className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
              >
                Delete Account
              </button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
