"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, nextTheme } from "@/lib/theme";

const root = () => document.documentElement;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(root(), { attributes: true, attributeFilter: ["class"] });
  // Follow the OS while the visitor has not made an explicit choice.
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = (event: MediaQueryListEvent) => {
    try {
      if (localStorage.getItem(THEME_STORAGE_KEY)) return;
    } catch {
      /* storage unavailable: still follow the system */
    }
    root().classList.toggle("dark", event.matches);
  };
  media.addEventListener("change", onSystemChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onSystemChange);
  };
}

const getSnapshot = () => root().classList.contains("dark");
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const theme = nextTheme(isDark);
    root().classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* private mode: the choice just will not persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label="Dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-2"
    >
      {/* Both icons are in the DOM; CSS shows the right one, so there is no hydration flicker. */}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 dark:hidden" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="hidden size-5 dark:block" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
