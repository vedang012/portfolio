import { useEffect, useRef, useState } from "react";

export function useScrollReveal<T extends HTMLElement>({
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
  triggerOnce = true,
}: {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
} = {}) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(element);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
