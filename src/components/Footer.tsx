import { profile } from "@/data/profile";
import { SafeLink } from "@/components/SafeLink";

const linkClass = "underline-offset-4 hover:text-ink hover:underline";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {profile.name}
        </p>
        <nav aria-label="Profiles" className="flex flex-wrap gap-x-5 gap-y-1">
          <SafeLink url={profile.githubUrl} className={linkClass} ariaLabel="GitHub profile">
            GitHub
          </SafeLink>
          <SafeLink url={profile.linkedinUrl} className={linkClass} ariaLabel="LinkedIn profile">
            LinkedIn
          </SafeLink>
        </nav>
        <p>Built with Next.js, React and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
