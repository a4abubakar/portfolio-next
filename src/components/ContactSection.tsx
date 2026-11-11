import type { ReactNode } from "react";
import { profile } from "@/data/profile";
import { mailtoHref } from "@/lib/links";
import { SafeLink } from "@/components/SafeLink";
import { SectionHeading } from "@/components/SectionHeading";

const row =
  "flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-5 py-4 transition-colors";
const rowActive = `${row} hover:border-accent hover:bg-accent-soft`;
const rowPending = `${row} cursor-not-allowed border-dashed text-muted`;

function Arrow(): ReactNode {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-surface-2/50">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Get in touch"
            title="Let's build something good"
            intro={`${profile.availability}. Email is the fastest way to reach me.`}
          />
          <p className="mt-6 text-muted">Based in {profile.location}.</p>
        </div>

        <ul className="space-y-3 self-center" aria-label="Contact links">
          <li>
            <a href={mailtoHref(profile.email)} className={rowActive}>
              <span>
                <span className="block text-xs uppercase tracking-widest text-muted">Email</span>
                <span className="block break-all font-medium">{profile.email}</span>
              </span>
              <Arrow />
            </a>
          </li>
          <li>
            <SafeLink url={profile.linkedinUrl} className={rowActive} ariaLabel="LinkedIn profile">
              <span>
                <span className="block text-xs uppercase tracking-widest text-muted">LinkedIn</span>
                <span className="block font-medium">Muhammad Abubaker Siddiq</span>
              </span>
              <Arrow />
            </SafeLink>
          </li>
          <li>
            <SafeLink url={profile.githubUrl} pendingLabel="GitHub link coming soon" className={rowActive} pendingClassName={rowPending} ariaLabel="GitHub profile">
              <span>
                <span className="block text-xs uppercase tracking-widest text-muted">GitHub</span>
                <span className="block font-medium">Coming soon</span>
              </span>
              <Arrow />
            </SafeLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
