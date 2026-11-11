import type { ReactNode } from "react";
import { resolveLink } from "@/lib/links";

interface SafeLinkProps {
  url: string;
  children: ReactNode;
  /** Label announced and shown while the URL is still a `TODO` placeholder. */
  pendingLabel?: string;
  className?: string;
  pendingClassName?: string;
  /** Accessible name when the visible text is not enough on its own. */
  ariaLabel?: string;
}

/**
 * Renders a real link when the URL is configured, otherwise a clearly disabled "coming soon"
 * element, so the page never ships a dead `href="TODO"`.
 */
export function SafeLink({ url, children, pendingLabel = "coming soon", className, pendingClassName, ariaLabel }: SafeLinkProps) {
  const link = resolveLink(url);

  if (link.isPlaceholder) {
    return (
      <span
        role="link"
        aria-disabled="true"
        data-placeholder="true"
        title={`Not published yet: ${pendingLabel}`}
        className={pendingClassName ?? className}
      >
        {children}
        <span className="sr-only"> ({pendingLabel})</span>
      </span>
    );
  }

  return (
    <a
      href={link.href as string}
      aria-label={ariaLabel}
      className={className}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
