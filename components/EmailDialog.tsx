"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { emailDialog, site } from "@/lib/content";
import { composeLinks, onOpenEmailDialog } from "@/lib/email";

/**
 * "Say hello" dialog. Every email button opens this instead of a bare
 * mailto: link — on machines with no mail app configured (common on work
 * laptops) mailto just opens a browser tab. Visitors can copy the address
 * or compose in Gmail / Outlook / their mail app with it prefilled.
 */
export default function EmailDialog() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const copyBtn = useRef<HTMLButtonElement>(null);
  const links = composeLinks();

  const close = useCallback(() => setOpen(false), []);

  useEffect(
    () =>
      onOpenEmailDialog(() => {
        returnFocus.current = document.activeElement as HTMLElement | null;
        setCopied(false);
        setOpen(true);
      }),
    []
  );

  // while open: Escape closes, the page behind doesn't scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    window.__lenis?.stop?.();
    const t = setTimeout(() => copyBtn.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start?.();
      clearTimeout(t);
      returnFocus.current?.focus?.();
    };
  }, [open, close]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      // no clipboard API (old in-app browsers): select the address instead
      const el = document.getElementById("email-dialog-address");
      if (el) window.getSelection()?.selectAllChildren(el);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/75 p-5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="email-dialog-title"
            initial={{ y: 24, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="w-full max-w-md rounded-2xl border border-paper/15 bg-ink-soft p-7 shadow-2xl shadow-black/60 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <h2
                id="email-dialog-title"
                className="display-huge text-4xl text-paper"
              >
                {emailDialog.title}
                <span className="text-accent">.</span>
              </h2>
              <button
                onClick={close}
                aria-label="Close"
                className="-mr-2 -mt-1 flex h-10 w-10 items-center justify-center rounded-full text-xl text-paper-dim transition-colors hover:text-accent"
              >
                ×
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-paper-dim">{emailDialog.note}</p>

            <div className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-paper/15 bg-ink px-4 py-3">
              <span
                id="email-dialog-address"
                className="font-display min-w-0 truncate text-base font-bold tracking-tight text-paper sm:text-lg"
              >
                {site.email}
              </span>
              <button
                ref={copyBtn}
                onClick={copy}
                className="shrink-0 rounded-full border border-accent/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-accent transition-colors hover:bg-accent hover:text-ink"
              >
                {copied ? emailDialog.copied : emailDialog.copy}
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {emailDialog.options.map((o) => (
                <a
                  key={o.id}
                  href={links[o.id]}
                  target={o.id === "app" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  // close right away: a delayed close gets throttled once the
                  // compose tab takes focus, leaving the dialog up on return
                  onClick={close}
                  className="font-display rounded-full border border-paper/20 px-3 py-3 text-center text-xs font-bold uppercase tracking-wide text-paper transition-colors hover:border-accent hover:text-accent"
                >
                  {o.label}
                  {o.id !== "app" && " ↗"}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
