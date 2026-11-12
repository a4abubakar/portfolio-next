/**
 * Production websites and apps from earlier roles (carried over from the previous portfolio,
 * abubaker-portfolio.netlify.app). Screenshots are of the live sites in Nov 2026, which may have
 * changed since. A client without `image` gets a generated gradient card.
 */
export interface ClientProject {
  slug: string;
  name: string;
  category: string;
  summary: string;
  url: string;
  image?: string;
  /** What I built there, shown as bullets under the summary. */
  highlights?: string[];
  tech?: string[];
  /** Colours for the fallback card when there is no screenshot. */
  colors: { from: string; to: string };
}

export const clientProjects: ClientProject[] = [
  {
    slug: "insurancemarket",
    name: "InsuranceMarket.ae",
    category: "Insurance comparison platform",
    summary:
      "A UAE platform where customers compare and buy car, health, home, life, travel, pet, bike and yacht insurance.",
    url: "https://insurancemarket.ae/",
    image: "/clients/insurancemarket.jpg",
    highlights: [
      "Customer-facing comparison and quote journeys in Next.js, React and TypeScript, focused on page speed, SEO and a smooth quote-to-purchase flow.",
      "300+ responsive email templates (Maizzle, Tailwind CSS, Liquid) for WebEngage journeys, 170+ of them renewal reminders, built on a 45-component shared library.",
      "Emails delivered through WebEngage, Brevo, Postmark and Bird, tested across Gmail, Outlook and Apple Mail in light and dark mode.",
      "AI agents and Claude/MCP tools that take ClickUp tasks to GitHub branches and pull requests.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Maizzle", "Liquid", "WebEngage"],
    colors: { from: "#ea580c", to: "#fb923c" },
  },
  {
    slug: "my2cents",
    name: "my2cents",
    category: "Blockchain social network",
    summary: "A social network on the blockchain where users tip each other in BSV for their posts.",
    url: "https://www.my2cents.io/",
    image: "/clients/my2cents.jpg",
    colors: { from: "#1d4ed8", to: "#60a5fa" },
  },
  {
    slug: "pixeledge",
    name: "PixelEdge",
    category: "Marketing website",
    summary: "The marketing website for PixelEdge, a US software development studio.",
    url: "https://www.pixeledge.io/",
    colors: { from: "#0f766e", to: "#5eead4" },
  },
  {
    slug: "uraudits",
    name: "UR Audits",
    category: "Audit and inspection platform",
    summary: "Audits and site inspections built from multiple configurable templates, on web and mobile.",
    url: "https://www.uraudits.com/",
    image: "/clients/uraudits.jpg",
    colors: { from: "#0369a1", to: "#38bdf8" },
  },
  {
    slug: "treasurycube",
    name: "TreasuryCube",
    category: "Treasury management",
    summary: "Currency conversion, transactions and cash management in one treasury platform.",
    url: "https://www.treasurycube.com/",
    image: "/clients/treasurycube.jpg",
    colors: { from: "#111827", to: "#f59e0b" },
  },
  {
    slug: "deenconnect",
    name: "DeenConnect",
    category: "Community platform",
    summary: "Connects Muslims around the world with their local masjids and organisations through dedicated portals.",
    url: "https://deenconnect.io/",
    image: "/clients/deenconnect.jpg",
    colors: { from: "#6d28d9", to: "#a78bfa" },
  },
  {
    slug: "outlier",
    name: "Outlier",
    category: "Online education",
    summary: "Online college courses for students, taught by instructors from leading universities.",
    url: "https://outlier.org/",
    image: "/clients/outlier.jpg",
    colors: { from: "#134e4a", to: "#5eead4" },
  },
];
