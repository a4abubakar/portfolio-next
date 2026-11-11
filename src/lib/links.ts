/** True for empty values and the `TODO` placeholders used before a project is deployed. */
export function isPlaceholderUrl(url: string | undefined | null): boolean {
  if (!url) return true;
  return /todo/i.test(url.trim());
}

export interface ResolvedLink {
  href: string | null;
  isPlaceholder: boolean;
  external: boolean;
}

/** Decides whether a configured URL can be rendered as a real link. */
export function resolveLink(url: string | undefined | null): ResolvedLink {
  if (isPlaceholderUrl(url)) return { href: null, isPlaceholder: true, external: false };
  const href = (url as string).trim();
  return { href, isPlaceholder: false, external: /^https?:\/\//i.test(href) };
}

export function mailtoHref(email: string, subject?: string): string {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email}${query}`;
}
