"use client";

import { motion, useSpring } from "motion/react";

import { cn } from "@/lib/utils";
import { useCursor } from "@/hooks/use-cursor";

export function CustomCursor() {
  const { x, y, hovered, label, isPointerFine } = useCursor();

  const springX = useSpring(x, { stiffness: 400, damping: 28 });
  const springY = useSpring(y, { stiffness: 400, damping: 28 });

  if (!isPointerFine) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      )}
    >
      {/* Dot pinned to the exact pointer position */}
      <motion.div
        className="absolute left-0 top-0"
        style={{ x, y }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <div className="h-1 w-1 rounded-full bg-accent-tech" />
        </div>
      </motion.div>

      {/* Ring that trails slightly behind and expands on hover */}
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: springX, y: springY }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="h-6 w-6 rounded-full border border-accent-tech/60"
            initial={false}
            animate={{
              scale: hovered ? 2.5 : 1,
              opacity: hovered ? 1 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{
              opacity: hovered && label ? 1 : 0,
              scale: hovered && label ? 1 : 0.85,
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <span className="whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-wider text-accent-tech">
              {label}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
