import { EMAIL } from "@/lib/contact";

// Open roles for /careers. Each role is a card; clicking it opens a pop-up with
// the details and the application. /careers?role=<slug> opens one directly.
//
// - `focus`: the short bold line on the card (what the role works on).
// - `details`: optional sections for the pop-up, e.g.
//   { heading: "What you'll do", items: ["...", "..."] }.
// - `formUrl` and `formId`: the role's HighLevel form embed URL
//   (https://link.growxcrm.com/widget/form/...) and its iframe id. Without them
//   the Apply button falls back to email.
// - The card photo is public/roles/<slug>.jpg (960×720, black and white).

export type Team = "Production" | "Marketing" | "Client and delivery" | "Design";

export type RoleSection = { heading: string; items: string[] };

export type Role = {
  slug: string;
  title: string;
  team: Team;
  summary: string;
  focus: string;
  details?: RoleSection[];
  formUrl?: string;
  formId?: string;
};

export const LOCATION = "On-site or remote";

// The order teams appear in on the careers page.
export const TEAMS: Team[] = ["Production", "Marketing", "Client and delivery", "Design"];

export const ROLES: Role[] = [
  {
    slug: "expert-video-editor",
    title: "Expert Video Editor",
    team: "Production",
    summary:
      "Cut product demos, founder clips and launch films that are tight, clear and on brand, from raw footage to the final export.",
    focus: "Product demos, founder clips, launch films",
  },
  {
    slug: "expert-motion-designer",
    title: "Expert Motion Designer",
    team: "Production",
    summary:
      "Bring scripts and storyboards to life with motion design and animation for launch films, explainers and product videos.",
    focus: "Launch films, explainers, product animation",
  },
  {
    slug: "ai-video-creator",
    title: "AI Video Creator",
    team: "Production",
    summary:
      "Make videos with the latest AI tools and blend them with the craft of our designers and animators.",
    focus: "AI scenes, AI twin videos, fast edits",
  },
  {
    slug: "expert-visualizer",
    title: "Expert Visualizer (Storyboard and Design)",
    team: "Production",
    summary:
      "Turn scripts into storyboards and styleframes that set the look of each video before animation starts.",
    focus: "Storyboards, styleframes, visual direction",
  },
  {
    slug: "social-media-manager",
    title: "Social Media Manager",
    team: "Marketing",
    summary:
      "Plan, write and publish Vidiosa's social content, and grow the audience of SaaS teams who follow our work.",
    focus: "Content calendar, posts, community",
  },
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    team: "Marketing",
    summary:
      "Own Vidiosa's marketing plan, from campaigns and content to the numbers behind them.",
    focus: "Campaigns, content, growth numbers",
  },
  {
    slug: "video-marketing-strategist",
    title: "Video Marketing Strategist",
    team: "Marketing",
    summary:
      "Turn a product roadmap into a video plan: what to make, who it is for and how each video gets seen.",
    focus: "Video plans, hooks, distribution",
  },
  {
    slug: "client-success-manager",
    title: "Client Success Manager",
    team: "Client and delivery",
    summary:
      "Be the main contact for our SaaS clients. Keep projects on track, gather feedback and make every client glad they stayed.",
    focus: "Client calls, feedback, renewals",
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    team: "Client and delivery",
    summary:
      "Run the weekly schedule across the team so every video ships on time, with clear briefs and fewer surprises.",
    focus: "Schedules, briefs, on-time delivery",
  },
  {
    slug: "website-designer",
    title: "Website Designer",
    team: "Design",
    summary:
      "Design and improve Vidiosa's website and landing pages with a sharp eye for layout, type and motion.",
    focus: "Web pages, landing pages, motion details",
  },
];

export const getRole = (slug: string) => ROLES.find((role) => role.slug === slug);

export const roleImage = (role: Role) => `/roles/${role.slug}.jpg`;

export const applyByEmailUrl = (role: Role) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(`Application: ${role.title}`)}`;
