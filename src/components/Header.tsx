"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { ThemeToggle } from "@/components/ThemeToggle";

export const NAV_ITEMS = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export function Header() {
  const [active, setActive] = useState<string>("");

  // Highlight the nav link for the section nearest the top of the viewport.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 sm:flex-nowrap sm:px-6 sm:py-3">
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label={`${profile.name}, back to top`}>
          <span aria-hidden="true" className="grid size-9 place-items-center rounded-lg bg-ink font-mono text-sm text-bg">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
          <span className="sm:hidden">{profile.shortName}</span>
        </a>

        <nav aria-label="Primary" className="order-last -mx-1 flex w-full justify-between gap-1 sm:order-none sm:mx-0 sm:w-auto sm:justify-start">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-ink aria-[current=location]:bg-accent-soft aria-[current=location]:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
