import { useEffect, useRef, useState } from "react";
import type { Fireworks } from "fireworks-js";
import { Button } from "@/components/ui/button";
import sky from "@/assets/diwali-night-sky-illustrated-preview.jpg";
import anaar from "@/assets/diwali-anaar.png";

export function DiwaliNight() {
  const container = useRef<HTMLDivElement>(null);
  const engine = useRef<Fireworks | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [ready, setReady] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  useEffect(() => {
    let disposed = false;
    void import("fireworks-js").then(({ Fireworks }) => {
      if (disposed || !container.current) return;
      engine.current = new Fireworks(container.current, {
        autoresize: true,
        rocketsPoint: { min: 49, max: 51 },
        intensity: 0,
        particles: 140,
        traceLength: 4,
        traceSpeed: 6,
        acceleration: 1.03,
        friction: 0.97,
        gravity: 1.3,
        explosion: 7,
        flickering: 30,
        brightness: { min: 65, max: 90 },
        decay: { min: 0.012, max: 0.023 },
        hue: { min: 15, max: 55 },
        lineWidth: { explosion: { min: 1, max: 2 }, trace: { min: 1, max: 2 } },
        mouse: { click: false, move: false },
        sound: { enabled: false },
      });
      setReady(true);
    });
    const stop = () => {
      if (document.hidden) engine.current?.stop();
    };
    document.addEventListener("visibilitychange", stop);
    return () => {
      disposed = true;
      timers.current.forEach(clearTimeout);
      engine.current?.stop(true);
      engine.current = null;
      document.removeEventListener("visibilitychange", stop);
    };
  }, []);

  const launch = () => {
    if (celebrating) return;
    setCelebrating(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      engine.current?.start();
      engine.current?.launch(1);
      timers.current.push(setTimeout(() => engine.current?.launch(2), 900));
      timers.current.push(setTimeout(() => engine.current?.launch(2), 1800));
    }
    timers.current.push(setTimeout(() => {
      engine.current?.stop();
      engine.current?.clear();
      setCelebrating(false);
      timers.current = [];
    }, 8000));
  };

  return (
    <>
      <div className="diwali-sky" aria-hidden="true">
        <img src={sky} alt="" width={1920} height={1088} className="diwali-sky-image" />
        <div className="diwali-stars" />
      </div>
      <div ref={container} className="diwali-fireworks" aria-hidden="true" />
      <div className="diwali-launcher">
        <Button variant="ghost" disabled={!ready || celebrating} onClick={launch}
          aria-label="Launch Diwali fireworks" title="Launch Diwali fireworks"
          className="diwali-anaar" data-cursor-label="LIGHT IT UP">
          <img src={anaar} alt="Red and gold anaar firecracker" width={512} height={512} loading="lazy" />
        </Button>
      </div>
    </>
  );
}