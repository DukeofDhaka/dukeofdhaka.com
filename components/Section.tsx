"use client";

import { motion } from "framer-motion";

export default function Section({
  id,
  index,
  title,
  children,
  className = "",
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-accent">{index}</p>
        <h2 className="display-huge mb-14 text-5xl text-paper sm:text-7xl">
          {title}
        </h2>
        {children}
      </motion.div>
    </section>
  );
}
