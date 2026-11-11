export interface Profile {
  name: string;
  shortName: string;
  initials: string;
  title: string;
  headline: string;
  tagline: string;
  location: string;
  availability: string;
  email: string;
  linkedinUrl: string;
  /** `TODO` placeholders are rendered as "coming soon" instead of dead links. */
  githubUrl: string;
  /** Served from `public/cv.pdf`. Drop the file in and the link starts working. */
  cvPath: string;
  stats: { value: string; label: string }[];
}

export const profile: Profile = {
  name: "Muhammad Abubaker Siddiq",
  shortName: "Abubaker",
  initials: "AS",
  title: "Senior Frontend Engineer",
  headline: "Senior Frontend Engineer",
  tagline: "React, Next.js and TypeScript.",
  location: "Karachi, Pakistan",
  availability: "Open to new roles",
  email: "abubakarsadiq6727@gmail.com",
  linkedinUrl:
    "https://www.linkedin.com/in/muhammad-abubaker-siddiq-27b37615b",
  githubUrl: "https://github.com/a4abubakar",
  cvPath: "/cv.pdf",
  stats: [
    { value: "9+", label: "years building for the web" },
    { value: "300+", label: "responsive email templates shipped" },
    { value: "45", label: "components in a shared library" },
    { value: "6", label: "employers across 4 countries" },
  ],
};

export const siteConfig = {
  /** Set NEXT_PUBLIC_SITE_URL when you deploy; the fallback is the local dev server. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-next-six-tau.vercel.app",
  title: `${profile.name} | ${profile.title}`,
  description:
    "Senior Frontend Engineer with 9+ years of experience in React, Next.js and TypeScript. Open to new roles.",
  keywords: [
    "Senior Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "HTML email",
    "Maizzle",
    "Karachi",
    "Remote",
  ],
} as const;

export const education = {
  degree: "B.E. Computer Systems Engineering",
  school: "Dawood University of Engineering and Technology",
  location: "Karachi",
  period: "2017 to 2020",
} as const;
