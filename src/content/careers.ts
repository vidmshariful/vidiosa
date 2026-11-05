// Open roles for /careers. Each role is a card; clicking it opens a pop-up with
// the details and the application. /careers?role=<slug> opens one directly.
//
// - `summary`: the short line on the card. `about`: the paragraph in the pop-up.
// - `formId`: the role's HighLevel form id (from
//   https://link.growxcrm.com/widget/form/<id>). Without one the role shows
//   "Applications open soon".
// - The card photo is public/roles/<slug>.jpg (960×720, black and white).

export type Team =
  | "Creative leadership"
  | "Motion design"
  | "Design"
  | "Video editing"
  | "Marketing"
  | "Clients and sales"
  | "Operations";

export type Role = {
  slug: string;
  title: string;
  team: Team;
  experience: string;
  salary: string;
  summary: string;
  about: string;
  duties: string[];
  requirements: string[];
  formId?: string;
};

export const EMPLOYMENT = "Full-time";
export const LOCATION = "On-site, Savar DOHS";

export const PERKS = [
  {
    title: "Two Eid festival bonuses every year",
    text: "A festival bonus for each Eid, so you can celebrate with your family.",
  },
  {
    title: "A friendly, collaborative team culture",
    text: "Work with a supportive team that shares ideas, gives clear feedback and helps each other grow.",
  },
  {
    title: "Paid leave in line with industry standards",
    text: "Time off to rest and recharge, so you can do your best work.",
  },
];

// The order teams appear in on the careers page.
export const TEAMS: Team[] = [
  "Creative leadership",
  "Motion design",
  "Design",
  "Video editing",
  "Marketing",
  "Clients and sales",
  "Operations",
];

export const ROLES: Role[] = [
  {
    slug: "creative-director",
    title: "Creative Director",
    team: "Creative leadership",
    experience: "3+ years leading creative work",
    salary: "Salary negotiable",
    summary:
      "Lead the creative vision across every Vidiosa project, from concept to final delivery.",
    about:
      "Lead the creative vision across every Vidiosa project, guiding our motion, design and video teams from concept to final delivery. You'll shape how each SaaS product is explained on screen: the idea, the script direction, the look and the motion. You'll work closely with clients, project managers and every creative on the team, and you'll own the quality of everything we ship.",
    duties: [
      "Set the creative direction for each project, from concept and script to final film",
      "Turn client briefs into clear concepts, storyboards and visual styles",
      "Lead and review the work of the motion, design and video editing teams",
      "Present creative ideas to our international SaaS clients",
      "Keep quality and style consistent across every delivery",
    ],
    requirements: [
      "3+ years leading creative work in motion design, design or video",
      "A portfolio of projects you directed",
      "A strong eye for storytelling, design and motion",
      "Experience leading a creative team",
      "Fluent English for presenting to clients",
    ],
    formId: "3SNI6Er6yEq6D2j3GDFS",
  },
  {
    slug: "junior-motion-designer",
    title: "Junior Motion Designer",
    team: "Motion design",
    experience: "0 to 1 year · freshers with a strong portfolio welcome",
    salary: "BDT 15,000 to 25,000 a month",
    summary:
      "Animate scenes for SaaS explainers, product demos and social videos, with guidance from our senior motion designers.",
    about:
      "Animate scenes for SaaS explainers, product demos and social videos, working from storyboards and styleframes with guidance from our senior motion designers. You'll work on real client projects from your first weeks and get regular feedback on every scene you animate. It's a good start for someone early in their career who wants to grow fast.",
    duties: [
      "Animate scenes in After Effects from approved storyboards and styleframes",
      "Animate UI screens, text and icons for product videos",
      "Make revisions based on feedback from leads and clients",
      "Keep project files clean and organised",
    ],
    requirements: [
      "0 to 1 year of experience. Freshers with a strong portfolio are welcome.",
      "Working knowledge of Adobe After Effects",
      "A good understanding of timing, easing and basic animation principles",
      "A portfolio or reel of your motion work",
    ],
  },
  {
    slug: "motion-designer",
    title: "Motion Designer",
    team: "Motion design",
    experience: "1 to 3 years of experience",
    salary: "BDT 25,000 to 35,000 a month",
    summary:
      "Bring SaaS explainers, product demos and launch films to life, from styleframes to final render.",
    about:
      "Bring SaaS explainers, product demos and launch films to life. You'll own the animation of scenes from styleframes to final render, turning product screens and ideas into motion that viewers can follow easily. You'll work closely with our designers, editors and project managers, and your work will reach software companies around the world.",
    duties: [
      "Animate full scenes and videos in After Effects from storyboards and styleframes",
      "Animate product UI, kinetic typography and transitions so complex features are easy to follow",
      "Sync animation to voiceover, music and sound",
      "Deliver revisions on time and keep project files clean",
    ],
    requirements: [
      "1 to 3 years of professional motion design experience",
      "Strong Adobe After Effects skills",
      "A good sense of timing, easing and visual storytelling",
      "A reel or portfolio of your motion work",
    ],
    formId: "wm6AIxNo1bTUbPINOxyW",
  },
  {
    slug: "senior-motion-designer",
    title: "Senior Motion Designer",
    team: "Motion design",
    experience: "3+ years of experience",
    salary: "BDT 40,000 to 70,000 a month",
    summary:
      "Lead animation on our most important SaaS projects and set the motion quality bar for the studio.",
    about:
      "Lead animation on our most important SaaS projects, set the motion quality bar for the studio and guide our motion team. You'll decide how a project moves before the first keyframe: its pacing, its transitions and how the product UI comes to life. You'll work hand in hand with the Creative Director and help our junior and mid-level motion designers grow.",
    duties: [
      "Lead animation on explainers, product demos and launch films, from styleframes to final delivery",
      "Plan the motion approach for each project: pacing, transitions and how the UI moves",
      "Review the work of junior and mid-level motion designers and give clear feedback",
      "Solve difficult animation problems and build reusable setups for the team",
    ],
    requirements: [
      "3+ years of professional motion design experience",
      "Expert Adobe After Effects skills",
      "A strong reel of motion work you led or animated",
      "Experience reviewing or guiding other motion designers",
    ],
  },
  {
    slug: "junior-designer",
    title: "Junior Designer",
    team: "Design",
    experience: "0 to 1 year · freshers with a strong portfolio welcome",
    salary: "BDT 12,000 to 18,000 a month",
    summary:
      "Create visual assets for our SaaS videos and social channels with support from our senior designers.",
    about:
      "Create visual assets for our SaaS videos and social channels with support from our senior designers. You'll learn how a styleframe becomes a finished video and how to prepare designs that animate well. It's a good start for someone early in their career who wants real client work and steady feedback.",
    duties: [
      "Design scene assets, icons and UI elements for videos from approved styleframes",
      "Create social media graphics",
      "Prepare clean, well-organised files for the motion team",
      "Make revisions based on feedback",
    ],
    requirements: [
      "0 to 1 year of experience. Freshers with a strong portfolio are welcome.",
      "Working knowledge of Figma, Adobe Illustrator or Photoshop",
      "A good eye for layout, colour and typography",
      "A design portfolio",
    ],
  },
  {
    slug: "designer",
    title: "Designer",
    team: "Design",
    experience: "1 to 3 years of experience",
    salary: "BDT 20,000 to 30,000 a month",
    summary:
      "Design the look of our SaaS videos: styleframes, storyboard frames and UI-led visuals.",
    about:
      "Design the look of our SaaS videos: styleframes, storyboard frames and UI-led visuals that our motion team animates. You'll take complex software products and make them simple, clear and good-looking on screen. You'll work on projects from the first sketch, alongside our motion designers and the Creative Director.",
    duties: [
      "Design styleframes and storyboard frames for explainers, product demos and launch films",
      "Recreate and simplify product UI for videos",
      "Create illustrations, icons and scene assets",
      "Design social media and marketing graphics",
      "Prepare animation-ready files for the motion team",
    ],
    requirements: [
      "1 to 3 years of professional design experience",
      "Strong skills in Figma, Adobe Illustrator and Photoshop",
      "Strong layout, colour and typography",
      "A portfolio of your design work",
    ],
    formId: "Q2tbfs7UzK6AL4GxdCnA",
  },
  {
    slug: "senior-designer",
    title: "Senior Designer",
    team: "Design",
    experience: "3+ years of experience",
    salary: "BDT 40,000 to 60,000 a month",
    summary: "Set the visual direction for our SaaS videos and guide our design team.",
    about:
      "Set the visual direction for our SaaS videos, from the first styleframes to final assets, and guide our design team. You'll decide how each project looks and make sure it fits both the client's brand and the story we're telling. You'll also review the team's work and help our junior and mid-level designers improve.",
    duties: [
      "Define the visual style for new projects and design the key styleframes",
      "Lead storyboard and styleframe design on major projects",
      "Keep every design consistent with the client's brand",
      "Review the work of junior and mid-level designers and give clear feedback",
      "Work closely with the motion team so designs animate well",
    ],
    requirements: [
      "3+ years of professional design experience",
      "Expert skills in Figma, Adobe Illustrator and Photoshop",
      "A portfolio that shows strong visual direction",
      "Experience reviewing or guiding other designers",
    ],
  },
  {
    slug: "junior-video-editor",
    title: "Junior Video Editor",
    team: "Video editing",
    experience: "0 to 1 year · freshers with sample edits welcome",
    salary: "BDT 15,000 to 20,000 a month",
    summary:
      "Edit footage into clean, engaging videos for clients and our own channels, with guidance from our senior editors.",
    about:
      "Edit footage into clean, engaging videos for our clients and our own channels, with guidance from our senior editors. You'll work on product videos, ads and social clips, and learn how pacing, sound and captions make a video easy to watch. It's a good start for someone who loves editing and wants to build a strong reel.",
    duties: [
      "Cut raw footage, screen recordings and voiceover into first edits",
      "Add music, captions, simple titles and transitions",
      "Export videos in the right formats for each platform",
      "Make revisions based on feedback",
    ],
    requirements: [
      "0 to 1 year of experience. Freshers with sample edits are welcome.",
      "Working knowledge of Adobe Premiere Pro or DaVinci Resolve",
      "A good sense of pacing and rhythm",
      "Samples of your editing work",
    ],
  },
  {
    slug: "video-editor",
    title: "Video Editor",
    team: "Video editing",
    experience: "1 to 3 years of experience",
    salary: "BDT 15,000 to 25,000 a month",
    summary:
      "Edit product videos, ads and social content that are clear, well paced and on brand.",
    about:
      "Edit product videos, ads and social content that are clear, well paced and on brand. You'll turn raw footage, screen recordings and voiceover into finished videos, ready for every platform. You'll work with our motion designers and project managers to deliver on time for clients around the world.",
    duties: [
      "Edit product demos, ads and social videos from start to finish",
      "Clean up audio, balance music and voiceover, and add captions",
      "Colour correct footage",
      "Cut versions for different platforms (16:9, 9:16, 1:1)",
      "Deliver revisions on time",
    ],
    requirements: [
      "1 to 3 years of professional video editing experience",
      "Strong Adobe Premiere Pro or DaVinci Resolve skills",
      "A good sense of story, pacing and sound",
      "A reel or portfolio of your edits",
    ],
  },
  {
    slug: "senior-video-editor",
    title: "Senior Video Editor",
    team: "Video editing",
    experience: "3+ years of experience",
    salary: "BDT 30,000 to 45,000 a month",
    summary: "Own the edit on our most important videos and guide our editing team.",
    about:
      "Own the edit on our most important videos and guide our editing team. You'll shape the story, the pacing and the final sound and colour of each project. You'll also set the workflows and standards the rest of the editing team follows.",
    duties: [
      "Lead the edit on key client and brand projects, from raw footage to final master",
      "Shape the story, pacing and sound of each video",
      "Handle colour grading and the final audio mix",
      "Review the work of junior and mid-level editors and give clear feedback",
      "Build editing workflows and templates the team can reuse",
    ],
    requirements: [
      "3+ years of professional video editing experience",
      "Expert Adobe Premiere Pro or DaVinci Resolve skills",
      "Strong colour grading and audio finishing skills",
      "A reel of high-quality edits",
      "Experience reviewing or guiding other editors",
    ],
  },
  {
    slug: "social-media-manager",
    title: "Social Media Manager",
    team: "Marketing",
    experience: "Up to 3 years · freshers with strong examples welcome",
    salary: "BDT 12,000 to 25,000 a month",
    summary:
      "Run Vidiosa's social channels and grow our audience across LinkedIn, Instagram, Facebook, YouTube and Behance.",
    about:
      "Run Vidiosa's social media channels and grow our audience across LinkedIn, Instagram, Facebook, YouTube and Behance. You'll plan what we post, write the captions and work with our designers and motion designers to show our work at its best. You'll also track what performs and use it to make next month's content better.",
    duties: [
      "Plan and publish a monthly content calendar",
      "Write captions and post copy",
      "Work with our designers and motion designers to create content",
      "Reply to comments and messages",
      "Track performance and report what's working",
    ],
    requirements: [
      "Up to 3 years of social media experience. Freshers with strong examples are welcome.",
      "Strong written English",
      "A good understanding of how each platform works: formats, trends and what performs",
      "Examples of accounts or content you've managed",
    ],
    formId: "5tOODQQlUhkhO2mh85Ul",
  },
  {
    slug: "marketing-associate",
    title: "Marketing Associate",
    team: "Marketing",
    experience: "Up to 3 years · freshers welcome",
    salary: "BDT 15,000 to 25,000 a month",
    summary:
      "Support our marketing team in running the campaigns that bring SaaS companies to Vidiosa.",
    about:
      "Support our marketing team in running the campaigns that bring SaaS companies to Vidiosa. You'll help with everything from writing copy and researching our market to setting up campaigns and reporting results. It's a good fit for someone who wants to learn B2B marketing from the inside.",
    duties: [
      "Help plan and run marketing campaigns",
      "Write copy for posts, emails and landing pages",
      "Research our audience, competitors and market trends",
      "Help set up and track ads and email campaigns",
      "Prepare simple reports on campaign results",
    ],
    requirements: [
      "Up to 3 years of marketing experience. Freshers are welcome.",
      "Strong written English",
      "A basic understanding of digital marketing: social media, email and ads",
      "Comfortable working with numbers and simple reports",
    ],
  },
  {
    slug: "head-of-marketing",
    title: "Head of Marketing",
    team: "Marketing",
    experience: "3+ years, including leading campaigns or a team",
    salary: "Up to BDT 100,000 a month",
    summary:
      "Lead Vidiosa's marketing: our brand, our channels and the flow of SaaS clients who come to us.",
    about:
      "Lead Vidiosa's marketing. You'll own our brand, our channels and the flow of SaaS clients who come to us. You'll set the strategy, lead the marketing team and report results directly to leadership, so your work will shape how Vidiosa grows.",
    duties: [
      "Build and run Vidiosa's marketing strategy and plan",
      "Lead the marketing team",
      "Own our brand positioning and messaging",
      "Run campaigns across social media, content, email and paid ads",
      "Set goals, track results and report to leadership",
    ],
    requirements: [
      "3+ years of marketing experience, including leading campaigns or a team",
      "Proven results growing a brand or generating leads",
      "Fluent written and spoken English",
      "A good understanding of B2B or SaaS marketing",
    ],
  },
  {
    slug: "client-success-manager",
    title: "Client Success Manager",
    team: "Clients and sales",
    experience: "Up to 3 years · freshers with fluent English welcome",
    salary: "BDT 12,000 to 25,000 a month",
    summary:
      "Be the main point of contact for our international SaaS clients, from project kickoff to final delivery.",
    about:
      "Be the main point of contact for our international SaaS clients, from project kickoff to final delivery. You'll make sure every client knows where their project stands, that their feedback reaches the team clearly, and that they're happy with the result. Happy clients come back for their next video, so this role matters a lot to the studio.",
    duties: [
      "Onboard new clients and collect their project briefs",
      "Share updates, previews and final files with clients",
      "Collect client feedback and pass it clearly to the production team",
      "Answer client questions by email, chat and call",
      "Build long-term relationships so clients return for their next video",
    ],
    requirements: [
      "Up to 3 years in client service, account management or customer support. Freshers with fluent English are welcome.",
      "Fluent written and spoken English",
      "Organised, with strong attention to detail",
      "Calm and professional with clients",
    ],
  },
  {
    slug: "sales-representative",
    title: "Sales Representative",
    team: "Clients and sales",
    experience: "Up to 3 years · freshers with fluent English welcome",
    salary: "BDT 15,000 to 25,000 a month",
    summary:
      "Find and win new SaaS clients for Vidiosa, from the first message to a signed project.",
    about:
      "Find and win new SaaS clients for Vidiosa. You'll research companies that need video, start conversations with them and guide them from the first message to a signed project. You'll work with our team on proposals and keep every lead moving.",
    duties: [
      "Research SaaS companies that need video",
      "Reach out to prospects by email, LinkedIn and phone",
      "Reply to inbound leads and book meetings",
      "Join sales calls, send proposals and follow up",
      "Keep the CRM up to date",
    ],
    requirements: [
      "Up to 3 years in sales or business development. Freshers with fluent English are welcome.",
      "Fluent written and spoken English",
      "Confident on calls with international clients",
      "Organised and consistent with follow-ups",
    ],
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    team: "Operations",
    experience: "1 to 3 years of experience",
    salary: "BDT 15,000 to 30,000 a month",
    summary:
      "Keep our video projects on time and on brief, from kickoff to final delivery.",
    about:
      "Keep our video projects on time and on brief, from kickoff to final delivery. You'll plan the work, assign tasks across our designers, motion designers and editors, and make sure nothing slips. You'll work closely with Client Success so clients get what they asked for, when they expect it.",
    duties: [
      "Plan project timelines and assign tasks to designers, motion designers and editors",
      "Track progress in our project management tool",
      "Run team check-ins and keep every project on schedule",
      "Work with Client Success to manage client feedback and revision rounds",
      "Check that every delivery matches the brief",
    ],
    requirements: [
      "1 to 3 years in project management or production coordination",
      "Good written and spoken English",
      "Experience with a project management tool such as ClickUp, Asana or Trello",
      "Able to manage several projects at once",
    ],
    formId: "TZKKtRv2gMwjYdBbkOKS",
  },
  {
    slug: "hr",
    title: "HR",
    team: "Operations",
    experience: "1 to 3 years of experience",
    salary: "Up to BDT 50,000 a month",
    summary:
      "Look after hiring, people and HR processes for our growing studio team.",
    about:
      "Look after hiring, people and HR processes for our growing studio team. You'll run recruitment from job post to offer, onboard new team members and keep our records and policies in order. You'll also help keep Vidiosa a good place to work.",
    duties: [
      "Run hiring from start to finish: job posts, screening, interviews and offers",
      "Onboard new team members",
      "Manage attendance, leave and payroll records",
      "Keep HR policies up to date and in line with the Bangladesh Labour Act",
      "Support a healthy working culture and help resolve team issues",
    ],
    requirements: [
      "1 to 3 years of HR experience",
      "Working knowledge of the Bangladesh Labour Act",
      "Good written English and Bangla",
      "Discreet with confidential information",
    ],
    formId: "OrhyaeJpEcDTQGlDPvvr",
  },
];

// Roles from the first careers page, so links already shared still open
// the closest role.
const RENAMED: Record<string, string> = {
  "expert-video-editor": "senior-video-editor",
  "expert-motion-designer": "senior-motion-designer",
  "expert-visualizer": "senior-designer",
  "marketing-manager": "head-of-marketing",
};

export const getRole = (slug: string) =>
  ROLES.find((role) => role.slug === (RENAMED[slug] ?? slug));

export const roleImage = (role: Role) => `/roles/${role.slug}.jpg`;

export const roleFormUrl = (role: Role) =>
  role.formId && `https://link.growxcrm.com/widget/form/${role.formId}?src=website`;
