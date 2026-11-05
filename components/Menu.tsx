"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import HoverText from "@/components/HoverText";
import { site } from "@/lib/content";
import { handleEmailClick } from "@/lib/email";

const LINKS = [
  { label: "About Me", href: "#about" },
  { label: "What I Do", href: "#whatido" },
  { label: "My Career", href: "#journey" },
  { label: "Works", href: "#works" },
  { label: "Skillset", href: "#skills" },
  { label: "Life", href: "#life" },
  { label: "Contact", href: "#contact" },
];

declare global {
  interface Window {
    __lenis?: {
      scrollTo(target: string, opts?: object): void;
      stop?(): void;
      start?(): void;
      on?(event: string, cb: (e: { velocity: number }) => void): void;
      off?(event: string, cb: (e: { velocity: number }) => void): void;
    };
  }
}

function MontrealTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-CA", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "America/Montreal",
          hour12: false,
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);
  return <>{time}</>;
}

export default function Menu() {
  const [open, setOpen] = useState(false);

  const go = (href: string) => {
    setOpen(false);
    // let the overlay start closing before the scroll kicks off
    setTimeout(() => {
      if (window.__lenis) {
        window.__lenis.scrollTo(href, { duration: 1.4 });
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }, 350);
  };

  return (
    <>
      {/* top bar — mobile only (Navbar handles desktop). The fade behind it
          keeps the name readable over the marquee and section text. */}
      {!open && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-30 h-[calc(5.5rem+env(safe-area-inset-top))] bg-gradient-to-b from-ink via-ink/80 to-transparent md:hidden"
        />
      )}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between pb-5 pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] pt-[max(1.25rem,env(safe-area-inset-top))] mix-blend-difference sm:pl-10 sm:pr-10 md:hidden">
        <button
          onClick={() => go("#top")}
          className="font-display text-sm font-bold uppercase tracking-[0.2em] text-paper"
        >
          ঢ — Duke of Dhaka
        </button>
        <div className="flex items-center gap-6">
          <span className="hidden text-[11px] uppercase tracking-[0.2em] text-paper/70 sm:block">
            Montréal <MontrealTime />
          </span>
          <Magnetic strength={0.45}>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="group flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full border border-paper/30 bg-ink/40 backdrop-blur"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="block h-px w-5 bg-paper"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                className="block h-px w-5 bg-paper"
              />
            </button>
          </Magnetic>
        </div>
      </div>

      {/* full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
            className="fixed inset-0 z-[35] flex flex-col justify-between overflow-y-auto bg-ink-soft px-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-[calc(7rem+env(safe-area-inset-top))] sm:px-10"
          >
            <ul>
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.5 }}
                  className="border-b border-paper/10"
                >
                  <button
                    onClick={() => go(link.href)}
                    className="group flex w-full items-baseline gap-6 py-4 text-left [@media(max-height:760px)]:py-2.5"
                  >
                    <span className="text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display-huge text-5xl text-paper [@media(max-height:760px)]:text-[2.6rem] sm:text-7xl">
                      <HoverText text={link.label} />
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-end justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-paper-dim"
            >
              <a href={`mailto:${site.email}`} onClick={handleEmailClick} className="hover:text-accent">
                {site.email}
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                GitHub ↗
              </a>
              <span>
                ♪ {site.music.title} — {site.music.artist}
              </span>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
