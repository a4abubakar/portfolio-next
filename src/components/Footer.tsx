import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {profile.name}
        </p>
        <p>Built with Next.js, React and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
