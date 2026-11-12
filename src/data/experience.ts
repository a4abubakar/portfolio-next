export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  /** `YYYY-MM` */
  start: string;
  /** `YYYY-MM`, or `null` for a current role */
  end: string | null;
  note?: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

export const experience: Experience[] = [
  {
    id: "insurancemarket",
    role: "Senior Software Engineer",
    company: "InsuranceMarket.ae",
    location: "Dubai, UAE",
    start: "2025-12",
    end: null,
    summary:
      "Insurance comparison and quote journeys with Next.js, React and TypeScript, plus the email system behind the WebEngage customer journeys.",
    highlights: [
      "Built and maintain a Maizzle + Tailwind + Liquid email system for WebEngage journeys: 300+ responsive templates, 170+ of them renewal reminders across Motor, Health, Pet, Cycle, Bike, Yacht and Group Medical.",
      "Templates sit on a 45-component shared library, with 215+ commits kept in sync with the live journeys through branches and pull requests.",
      "Delivery through WebEngage, Brevo, Bird and Postmark.",
      "Built AI agents and Claude plugins/skills (MCP) that take ClickUp tasks to GitHub branches and PRs, and let designers prototype emails.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Maizzle", "Tailwind CSS", "Liquid", "WebEngage", "MCP"],
  },
  {
    id: "pixeledge",
    role: "Senior Software Engineer",
    company: "PixelEdge Solutions",
    location: "Northampton, US (remote)",
    start: "2022-02",
    end: "2025-12",
    summary: "Led frontend for large, data-intensive applications for corporate clients.",
    highlights: [
      "Built component libraries and set coding standards across React, Next.js, React Native, TypeScript, Tailwind and Ant Design.",
      "Turned Figma and XD designs into pixel-perfect interfaces.",
      "Worked with designers on clean interfaces and simple, intuitive interactions, and managed large, complex design projects for corporate clients.",
      "Ran code reviews, mentored engineers and coordinated releases with clients.",
    ],
    tech: ["React", "Next.js", "React Native", "TypeScript", "Tailwind CSS", "Ant Design"],
  },
  {
    id: "proge",
    role: "Senior Frontend Engineer",
    company: "Proge Software",
    location: "Rome, Italy",
    start: "2023-04",
    end: "2024-01",
    note: "Contract",
    summary:
      "SharePoint Online SPFx web parts and extensions with React and TypeScript for Nestlé Switzerland.",
    highlights: [],
    tech: ["SharePoint SPFx", "React", "TypeScript"],
  },
  {
    id: "expertizo",
    role: "Frontend Engineer",
    company: "Expertizo",
    location: "Karachi, Pakistan",
    start: "2021-01",
    end: "2022-01",
    summary: "React, Next.js and React Native applications.",
    highlights: [
      "Built front ends for public-facing and internal websites, plus back-end server code.",
      "Ran quality assurance tests to find errors early and improve usability.",
    ],
    tech: ["React", "Next.js", "React Native", "Tailwind CSS", "Bootstrap", "MUI", "Unit testing"],
  },
  {
    id: "fine-solutions",
    role: "Full Stack Engineer",
    company: "Fine Solutions",
    location: "Karachi, Pakistan",
    start: "2019-11",
    end: "2021-12",
    summary: "React and React Native frontends on REST APIs, with Python/Flask on the server.",
    highlights: [
      "Built interfaces with React, React Native, MUI and Ant Design.",
      "Worked on REST services in Python and Flask.",
      "Tested React components with Jest; pair-programmed and reviewed teammates' code to catch missed errors.",
      "Worked in an Agile team: weekly stand-ups, sprint planning and retrospectives, user stories and bugs tracked in GitHub Projects.",
    ],
    tech: ["React", "React Native", "MUI", "Ant Design", "Bootstrap", "Jest", "Python", "Flask"],
  },
  {
    id: "saylani",
    role: "Web & Mobile App Developer",
    company: "Saylani Welfare International Trust",
    location: "Karachi, Pakistan",
    start: "2017-01",
    end: "2019-10",
    summary: "Built e-commerce frontends.",
    highlights: [
      "Created and maintained front-end code for multiple e-commerce websites.",
      "Helped produce and deploy marketing campaigns, including advertisements.",
      "Built dynamic web solutions in line with company standards and best practices.",
    ],
    tech: ["React", "React Native", "Bootstrap", "MUI", "Ant Design"],
  },
];
