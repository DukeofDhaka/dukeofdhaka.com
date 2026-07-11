"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { site, hero } from "@/lib/content";
import Splash from "@/components/Splash";
import MusicChip from "@/components/MusicChip";
import dynamic from "next/dynamic";
import Cursor from "@/components/Cursor";
import Menu from "@/components/Menu";

const Duke = dynamic(() => import("@/components/Duke"), { ssr: false });
import Marquee from "@/components/Marquee";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Life from "@/components/Life";
import Footer from "@/components/Footer";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  unMute: () => void;
  setVolume: (v: number) => void;
  seekTo: (s: number, allowSeekAhead: boolean) => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (el: string, opts: object) => YTPlayer;
      PlayerState: { PLAYING: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

/** Sections are sticky full-height cards; each one slides up over the last. */
function Panel({
  children,
  first = false,
}: {
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <div
      className={`sticky top-0 min-h-screen bg-ink ${
        first ? "" : "rounded-t-[2.5rem] border-t border-paper/10 shadow-[0_-20px_60px_rgba(0,0,0,0.6)]"
      }`}
    >
      {children}
    </div>
  );
}

export default function SiteShell() {
  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const pendingPlay = useRef(false);

  // Lenis smooth scrolling once the visitor is in
  useEffect(() => {
    if (!entered) return;
    const lenis = new Lenis({ lerp: 0.1 });
    window.__lenis = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.__lenis = undefined;
      lenis.destroy();
    };
  }, [entered]);

  useEffect(() => {
    const init = () => {
      if (!window.YT?.Player) return;
      new window.YT.Player("yt-audio", {
        width: "1",
        height: "1",
        videoId: site.music.youtubeId,
        playerVars: {
          playsinline: 1,
          controls: 0,
          disablekb: 1,
          rel: 0,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            playerRef.current = e.target;
            if (pendingPlay.current) {
              pendingPlay.current = false;
              e.target.unMute();
              e.target.setVolume(65);
              e.target.playVideo();
            }
          },
          onStateChange: (e: { data: number; target: YTPlayer }) => {
            const YT = window.YT!;
            setPlaying(e.data === YT.PlayerState.PLAYING);
            if (e.data === YT.PlayerState.ENDED) {
              e.target.seekTo(0, true);
              e.target.playVideo();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      init();
    } else {
      window.onYouTubeIframeAPIReady = init;
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }, []);

  const startMusic = useCallback(() => {
    const p = playerRef.current;
    if (p) {
      p.unMute();
      p.setVolume(65);
      p.playVideo();
    } else {
      pendingPlay.current = true;
    }
  }, []);

  const toggleMusic = useCallback(() => {
    const p = playerRef.current;
    if (!p) {
      pendingPlay.current = true;
      return;
    }
    if (playing) {
      p.pauseVideo();
    } else {
      p.unMute();
      p.playVideo();
    }
  }, [playing]);

  const handleEnter = useCallback(
    (withSound: boolean) => {
      setEntered(true);
      if (withSound) startMusic();
    },
    [startMusic]
  );

  return (
    <>
      <Cursor />

      {/* Offscreen YouTube player — audio only. Kept in the DOM (not display:none)
          so the IFrame API can control it. */}
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-0 right-0 h-px w-px overflow-hidden opacity-0"
      >
        <div id="yt-audio" />
      </div>

      <AnimatePresence>
        {!entered && <Splash key="splash" onEnter={handleEnter} />}
      </AnimatePresence>

      {entered && <Menu />}
      {entered && <Duke />}

      <main
        id="top"
        className={entered ? "" : "h-screen overflow-hidden"}
        aria-hidden={!entered}
      >
        <Panel first>
          <Hero />
        </Panel>
        <Panel>
          <Marquee items={hero.marquee} />
          <About />
        </Panel>
        <Panel>
          <Timeline />
        </Panel>
        <Panel>
          <Projects />
        </Panel>
        <Panel>
          <Marquee items={[...hero.marquee].reverse()} />
          <Skills />
        </Panel>
        <Panel>
          <Life />
        </Panel>
        <Panel>
          <Footer />
        </Panel>
      </main>

      {entered && <MusicChip playing={playing} onToggle={toggleMusic} />}
    </>
  );
}
