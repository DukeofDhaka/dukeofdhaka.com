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
    <section id={id} className={`mx-auto max-w-5xl px-6 py-24 sm:py-32 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="mb-3 text-sm tracking-[0.3em] text-gold uppercase">
          {index}
        </p>
        <h2 className="font-display mb-12 text-4xl text-paper sm:text-5xl">
          {title}
        </h2>
        {children}
      </motion.div>
    </section>
  );
}
