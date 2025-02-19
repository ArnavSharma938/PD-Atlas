"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");

  return (
    <main className="bg-dark text-white min-h-screen">
      <section className="w-full px-6 md:px-12 py-16 md:py-32 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          AI-Driven Parkinsons Disease Progression Analysis
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
          Visualizing and predicting disease progression using Graph Neural Networks and Transformers.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 w-64 text-black rounded-md outline-none"
          />
          <button className="bg-primary px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-500 transition">
            Get Early Access
          </button>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div>
            <h2 className="text-3xl font-bold">AI-Powered Predictions</h2>
            <p className="text-gray-400 mt-2">Analyze patient trajectories with deep learning models.</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Interactive Visualization</h2>
            <p className="text-gray-400 mt-2">Explore disease progression with real-time UMAP and Sankey diagrams.</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Open Source</h2>
            <p className="text-gray-400 mt-2">MIT Licensed – contribute on GitHub and shape the future of PD research.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
