"use client";

import { useEffect } from "react";

export function EntranceAnimations() {
  useEffect(() => {
    const main = document.getElementById("main");
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!main || motionPreference.matches || !("IntersectionObserver" in window)) {
      return;
    }

    const elements = main.querySelectorAll<HTMLElement>("[data-entrance]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting && !element.dataset.entered) {
            element.dataset.entered = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    // Only mark elements when they enter view. Unmarked content stays visible,
    // even if hydration or the observer is unavailable.
    for (const element of elements) {
      observer.observe(element);
    }

    function revealFocusedContent(event: FocusEvent) {
      if (!(event.target instanceof HTMLElement)) return;

      const element = event.target.closest<HTMLElement>("[data-entrance]");
      if (!element || !main?.contains(element)) return;

      // Keyboard users should never have to wait for a delayed entrance.
      element.dataset.entered = "instant";
      observer.unobserve(element);
    }

    function handleMotionChange(event: MediaQueryListEvent) {
      if (!event.matches) return;

      observer.disconnect();
      for (const element of elements) {
        element.dataset.entered = "instant";
      }
    }

    main.addEventListener("focusin", revealFocusedContent);
    motionPreference.addEventListener("change", handleMotionChange);

    return () => {
      observer.disconnect();
      main.removeEventListener("focusin", revealFocusedContent);
      motionPreference.removeEventListener("change", handleMotionChange);
      for (const element of elements) {
        delete element.dataset.entered;
      }
    };
  }, []);

  return null;
}
