"use client";

import dynamic from "next/dynamic";

const Surf404 = dynamic(() => import("@/components/Surf404"), { ssr: false });

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center">
      <div className="absolute inset-x-0 top-0 h-[55vh]">
        <Surf404 />
      </div>
      <div className="relative mt-[38vh]">
        <h1 className="display-huge text-8xl text-paper sm:text-9xl">
          4<span className="text-accent">0</span>4
        </h1>
        <p className="mt-4 text-lg text-paper-dim">
          Wiped out — this page doesn&apos;t exist.
        </p>
        <a
          href="/"
          className="font-display mt-8 inline-block rounded-full bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wide text-paper transition-transform hover:scale-105"
        >
          Paddle back home
        </a>
      </div>
    </main>
  );
}
