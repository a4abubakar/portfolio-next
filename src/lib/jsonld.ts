import { education, profile, siteConfig } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { isPlaceholderUrl } from "@/lib/links";

/** schema.org Person for the home page. Placeholder URLs are left out, not published. */
export function buildPersonJsonLd() {
  const sameAs = [profile.linkedinUrl, profile.githubUrl].filter((url) => !isPlaceholderUrl(url));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: siteConfig.description,
    url: siteConfig.url,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education.school,
    },
    knowsAbout: skillGroups.flatMap((group) => group.items).slice(0, 12),
    sameAs,
  };
}

/** Safe to inline in a script tag: stops "</script>" sequences in data from closing it. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
