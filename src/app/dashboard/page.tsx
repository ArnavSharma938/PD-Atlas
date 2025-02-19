"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { User } from "@supabase/supabase-js";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      }
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900 rounded-xl p-8 mb-8">
          <div className="flex justify-between items-center">
            <h1 
              className="text-4xl font-bold"
              style={{ fontFamily: "var(--font-libre-baskerville)" }}
            >
              Welcome to PD-Atlas
            </h1>
            <button
              onClick={handleSignOut}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
              style={{ fontFamily: "var(--font-krub)" }}
            >
              Sign Out
            </button>
          </div>
          <p className="text-gray-400 mt-2">
            Email: {user?.email}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-xl">
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-libre-baskerville)" }}
            >
              Patient Data
            </h2>
            <p className="text-gray-400">
              View and analyze patient progression data
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-libre-baskerville)" }}
            >
              Analysis Tools
            </h2>
            <p className="text-gray-400">
              Access AI-powered analysis tools
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl">
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-libre-baskerville)" }}
            >
              Research Papers
            </h2>
            <p className="text-gray-400">
              Browse latest research findings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 