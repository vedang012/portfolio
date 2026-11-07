import { useEffect } from "react";
import type { FallingLeaves } from "falling-leaves";

export function LeafEffect() {
  useEffect(() => {
    let disposed = false;
    let leaves: FallingLeaves | undefined;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPlayback = () => {
      if (motion.matches || document.hidden) leaves?.stop();
      else leaves?.start();
    };

    void import("falling-leaves").then(({ FallingLeaves }) => {
      if (disposed) return;
      const tokens = getComputedStyle(document.documentElement);
      leaves = new FallingLeaves({
        count: window.innerWidth < 640 ? 12 : 22,
        size: [14, 26],
        speed: [0.4, 0.9],
        wind: [-0.2, 0.5],
        shapes: ["maple", "oak", "ginkgo"],
        colors: ["--leaf-gold", "--leaf-rust", "--leaf-red"].map((token) =>
          tokens.getPropertyValue(token).trim(),
        ),
        opacity: 0.55,
        zIndex: 20,
        autoStart: false,
        respectReducedMotion: true,
      });
      syncPlayback();
    });

    document.addEventListener("visibilitychange", syncPlayback);
    motion.addEventListener("change", syncPlayback);
    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", syncPlayback);
      motion.removeEventListener("change", syncPlayback);
      leaves?.destroy();
    };
  }, []);

  return null;
}