import { profile } from "@/data/profile";
import { mailtoHref } from "@/lib/links";
import { SafeLink } from "@/components/SafeLink";

const primary =
  "inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 font-semibold text-accent-contrast transition-colors hover:bg-accent-strong";
const secondary =
  "inline-flex items-center justify-center rounded-full border border-line bg-surface px-6 py-3 font-semibold text-ink transition-colors hover:bg-surface-2";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="hero-glow relative overflow-hidden">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-24">
        <p className="rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-muted">
          <span aria-hidden="true" className="pulse-dot size-2 rounded-full bg-green-600" />
          {profile.availability}
        </p>

        <h1 id="hero-title" className="rise rise-2 mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          <span className="block text-xl font-medium tracking-normal text-muted sm:text-2xl">{profile.name}</span>
          <span className="mt-3 block">
            {profile.headline}.{" "}
            <span className="text-accent">{profile.tagline}</span>
          </span>
        </h1>

        <p className="rise rise-3 mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          I build fast, accessible interfaces and the systems behind them, from insurance quote journeys to a
          production email platform. Based in {profile.location}.
        </p>

        <div className="rise rise-4 mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#projects" className={primary}>
            View projects
          </a>
          <a href="#contact" className={secondary}>
            Contact
          </a>
          <a href={profile.cvPath} download="Muhammad-Abubaker-Siddiq-CV.pdf" className={secondary}>
            Download CV
          </a>
          <a href={mailtoHref(profile.email)} className="inline-flex items-center justify-center px-2 py-3 font-medium text-muted underline-offset-4 hover:text-ink hover:underline sm:ml-2">
            {profile.email}
          </a>
          <SafeLink
            url={profile.githubUrl}
            ariaLabel="GitHub profile"
            className="inline-flex items-center justify-center px-2 py-3 font-medium text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            {profile.githubUrl.replace(/^https:\/\//, "")}
          </SafeLink>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-4">
          {profile.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
              <dd className="text-4xl font-semibold tracking-tight sm:text-5xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
