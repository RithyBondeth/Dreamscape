"use client";

import dynamic from "next/dynamic";
import { useProgress } from "@react-three/drei";
import { ArrowDownRight, Maximize2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { CameraViewId } from "@/components/3d/CameraController";

const Scene = dynamic(() => import("@/components/3d/Scene"), {
  ssr: false,
  loading: () => null,
});

const VIEWS: Array<{ id: CameraViewId; number: string; label: string }> = [
  { id: "exterior", number: "01", label: "Residence" },
  { id: "garage", number: "02", label: "Automobile" },
  { id: "garden", number: "03", label: "Poolside" },
];

const VIEW_COPY: Record<
  CameraViewId,
  { eyebrow: string; lead: string; accent: string; description: string }
> = {
  exterior: {
    eyebrow: "An architecture of calm",
    lead: "After",
    accent: "dusk.",
    description:
      "Move through a private world where warm stone, water and light meet at the edge of evening.",
  },
  garage: {
    eyebrow: "Private automotive gallery",
    lead: "Showroom",
    accent: "glow.",
    description:
      "A controlled garage perspective for the residence's performance centerpiece.",
  },
  garden: {
    eyebrow: "Poolside atmosphere",
    lead: "Water",
    accent: "light.",
    description:
      "A low evening view across the garden, terrace and illuminated pool edge.",
  },
};

function LoadingScreen() {
  const { active, progress } = useProgress();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!active && progress >= 100) {
      const timeout = window.setTimeout(() => setHasLoaded(true), 350);
      return () => window.clearTimeout(timeout);
    }
  }, [active, progress]);

  return (
    <div
      className="loading-screen"
      data-visible={!hasLoaded}
      aria-live="polite"
      aria-label={`Loading Dreamscape, ${Math.round(progress)} percent`}
    >
      <div className="relative grid place-items-center">
        <div className="loading-orbit" />
        <span className="font-display text-4xl font-medium italic text-[#e7d4b5]">
          D
        </span>
        <span className="absolute top-[74px] whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.42em] text-white/45">
          Composing scene · {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}

export default function DreamscapeExperience() {
  const [activeView, setActiveView] = useState<CameraViewId>("exterior");
  const activeIndex = VIEWS.findIndex((view) => view.id === activeView);
  const copy = VIEW_COPY[activeView];

  return (
    <main className="dreamscape-shell">
      <Scene activeView={activeView} />
      <LoadingScreen />

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between px-5 py-5 sm:px-8 sm:py-7 lg:px-12 lg:py-10">
        <header className="pointer-events-auto flex items-start justify-between">
          <button
            className="group flex items-center gap-3 text-left"
            onClick={() => setActiveView("exterior")}
            aria-label="Return to the villa exterior"
          >
            <span className="grid size-9 place-items-center rounded-full border border-white/30 font-display text-lg italic text-[#e7d4b5] transition-colors group-hover:border-[#d5b17b]">
              D
            </span>
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.38em] text-white">
                Dreamscape
              </span>
              <span className="mt-1 block text-[7px] uppercase tracking-[0.28em] text-white/45">
                Private residences
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            <div className="text-right text-[8px] font-medium uppercase leading-[1.8] tracking-[0.24em] text-white/45">
              <span className="block text-white/80">Villa No. 01</span>
              Cinematic collection
            </div>
            <div className="grid size-10 place-items-center rounded-full border border-white/20 bg-black/10 backdrop-blur-md">
              <Maximize2 aria-hidden="true" size={14} strokeWidth={1.5} />
            </div>
          </div>
        </header>

        <section className="pointer-events-auto absolute right-5 top-1/2 hidden w-36 -translate-y-1/2 sm:block lg:right-12">
          <div className="mb-5 flex items-center justify-between text-[7px] uppercase tracking-[0.25em] text-white/35">
            <span>Perspectives</span>
            <span>{VIEWS[activeIndex].number} / 03</span>
          </div>
          <div className="h-px w-full bg-white/15" />
          <nav className="mt-3" aria-label="Camera perspectives">
            {VIEWS.map((view) => (
              <button
                key={view.id}
                className="view-rail-button"
                data-active={activeView === view.id}
                onClick={() => setActiveView(view.id)}
                aria-pressed={activeView === view.id}
              >
                {view.label}
              </button>
            ))}
          </nav>
        </section>

        <div className="flex items-end justify-between">
          <div className="max-w-[620px]">
            <div className="reveal-up-delayed mb-3 flex items-center gap-3 text-[8px] font-semibold uppercase tracking-[0.22em] text-[#d5b17b] sm:mb-5">
              <span className="h-px w-8 bg-[#d5b17b]" />
              {copy.eyebrow}
            </div>
            <h1 className="reveal-up font-display text-5xl font-normal leading-[0.9] tracking-normal text-[#f5efe4] sm:text-6xl lg:text-7xl 2xl:text-8xl">
              {copy.lead}{" "}
              <span className="italic text-[#d9c3a2]">{copy.accent}</span>
            </h1>
            <div className="mt-5 flex flex-col gap-4 sm:mt-7 sm:flex-row sm:items-end sm:gap-8">
              <p className="hidden max-w-60 text-[10px] leading-[1.8] tracking-[0.06em] text-white/55 sm:block">
                {copy.description}
              </p>

              <div className="pointer-events-auto grid grid-cols-2 gap-2 sm:flex sm:gap-3">
                <button
                  className="luxury-button glass-panel"
                  data-active={activeView === "exterior"}
                  onClick={() => setActiveView("exterior")}
                >
                  Explore villa
                  <ArrowDownRight aria-hidden="true" size={16} strokeWidth={1.4} />
                </button>
                <button
                  className="luxury-button glass-panel"
                  data-active={activeView === "garage"}
                  onClick={() => setActiveView("garage")}
                >
                  View garage
                  <ArrowDownRight aria-hidden="true" size={16} strokeWidth={1.4} />
                </button>
              </div>
            </div>
          </div>

          <div className="hidden flex-col items-end gap-2 text-[7px] uppercase tracking-[0.22em] text-white/35 lg:flex">
            <span>Drag to explore</span>
            <span>Scroll to approach</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[2px] w-full bg-white/10">
        <div
          className="h-full bg-[#d5b17b] transition-[width] duration-1000 ease-out"
          style={{ width: `${((activeIndex + 1) / VIEWS.length) * 100}%` }}
        />
      </div>
    </main>
  );
}
