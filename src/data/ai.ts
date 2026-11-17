/** AI and automation work at InsuranceMarket.ae, worded to match the CV. */
export interface AiWork {
  slug: string;
  title: string;
  summary: string;
  points: string[];
  impact: string;
  tech: string[];
}

export const aiWork: AiWork[] = [
  {
    slug: "clickup-github-agents",
    title: "AI agents for the engineering workflow",
    summary: "Agents built with Claude and the Model Context Protocol (MCP) that take a ClickUp task all the way to a GitHub pull request.",
    points: [
      "Read ClickUp tasks and their requirements",
      "Create GitHub branches and pull requests",
      "Post progress updates and keep ticket statuses in sync",
    ],
    impact: "Removed repetitive manual work from the engineering workflow.",
    tech: ["Claude", "MCP", "AI agents", "ClickUp", "GitHub"],
  },
  {
    slug: "email-plugins",
    title: "Claude plugins and skills for email",
    summary: "Plugins and skills built on the company's Maizzle email component library, for designers, analysts and developers.",
    points: [
      "Designers and business analysts prototype emails from the component library themselves",
      "Design-to-template conversion into production Maizzle templates",
      "A pull request opened automatically for developer review",
    ],
    impact: "Developers turn designs into production templates in a fraction of the time.",
    tech: ["Claude Code", "Plugins", "Skills", "Maizzle", "GitHub"],
  },
  {
    slug: "ai-assisted-development",
    title: "AI-assisted development across the team",
    summary: "Reusable skills, prompts and documentation that standardise how features and templates are built.",
    points: [
      "Shared skills and prompts the whole team uses",
      "Documentation so every feature and template follows the same steps",
      "Agentic and multi-agent workflows for multi-step tasks",
    ],
    impact: "Standardised how features and templates are built across the team.",
    tech: ["Prompt engineering", "Multi-agent workflows", "LLM APIs"],
  },
];
