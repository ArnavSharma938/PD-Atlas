"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-xl">
        <div>
          <h2 
            className="text-4xl font-bold text-center mb-2"
            style={{ fontFamily: "var(--font-libre-baskerville)" }}
          >
            Create Account
          </h2>
          <p className="text-gray-400 text-center">
            Join PD-Atlas to access advanced Parkinsons research tools
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-300"
              style={{ fontFamily: "var(--font-krub)" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-300"
              style={{ fontFamily: "var(--font-krub)" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50"
            style={{ fontFamily: "var(--font-libre-baskerville)" }}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-green-500 hover:text-green-400">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
} 