"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useMotionValue, type MotionValue } from "motion/react";

type CursorState = {
  label: string | null;
  hovered: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
  isPointerFine: boolean;
};

const CursorContext = createContext<CursorState | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    setIsPointerFine(media.matches);

    const onMediaChange = () => setIsPointerFine(media.matches);
    media.addEventListener("change", onMediaChange);

    if (!media.matches) {
      return () => media.removeEventListener("change", onMediaChange);
    }

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const el = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement | null;

      const labeled = el?.closest("[data-cursor-label]") as HTMLElement | null;
      if (labeled) {
        setLabel(labeled.dataset["cursorLabel"] || null);
        setHovered(true);
        return;
      }

      const interactive = el?.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      );
      setHovered(!!interactive);
      setLabel(null);
    };

    const onLeave = () => {
      setHovered(false);
      setLabel(null);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      media.removeEventListener("change", onMediaChange);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  return (
    <CursorContext.Provider value={{ label, hovered, x, y, isPointerFine }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error("useCursor must be used within CursorProvider");
  return ctx;
}
