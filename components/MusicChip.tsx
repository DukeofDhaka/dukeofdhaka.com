"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/content";

export default function MusicChip({
  playing,
  onToggle,
}: {
  playing: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      onClick={onToggle}
      title={playing ? "Pause the music" : "Play the music"}
      className="fixed bottom-4 left-4 z-40 flex items-center gap-3 rounded-full border border-paper/15 bg-ink-soft/90 px-4 py-2.5 backdrop-blur transition-colors hover:border-gold/50"
    >
      <span className={`eq ${playing ? "" : "paused"}`} aria-hidden>
        <span />
        <span />
        <span />
      </span>
      <span className="hidden text-xs text-paper-dim sm:block">
        {playing ? "Now playing — " : "Paused — "}
        <span className="text-paper">
          {site.music.title} · {site.music.artist}
        </span>
      </span>
      <span className="text-xs text-gold sm:hidden">{playing ? "❚❚" : "▶"}</span>
    </motion.button>
  );
}
