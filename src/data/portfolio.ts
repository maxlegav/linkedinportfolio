/** Previous portfolio (texts, media, and links source) */
export const LEGACY_PORTFOLIO_URL = "https://portfoliomaxlegav-maxs-projects-04fa28ce.vercel.app";

export function legacyNextImage(assetPath: string, width = 1920): string {
  const path = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  const q = encodeURIComponent(path);
  return `${LEGACY_PORTFOLIO_URL}/_next/image?url=${q}&w=${width}&q=75`;
}

export function randomImage(seed: string, width = 1200, height = 800): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}

export type User = {
  name: string;
  headline: string;
  location: string;
  about: string;
  avatarUrl: string;
  bannerUrl: string;
  connectionsLabel: string;
  cvUrl: string;
  linkedinUrl: string;
  email: string;
  phone: string;
  languages: string[];
};

export type ProjectLink = { label: string; url: string; copyText?: string };

export type ProjectPost = {
  id: string;
  author: User;
  createdAt: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  imageFit?: "cover" | "contain";
  imagePadding?: "normal" | "tight" | "none";
  links: ProjectLink[];
  likeCount?: number;
  commentCount?: number;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  location: string;
  description?: string;
  courses?: string[];
  gpa?: string;
  logoLetter: string;
  logoUrl?: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
  logoLetter: string;
  color?: string;
  logoUrl?: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  logoLetter: string;
  color?: string;
  logoUrl?: string;
};

export type Skill = {
  name: string;
  iconUrl: string;
};

export type MessagingContact = {
  id: string;
  name: string;
  relation: string;
  lastMessage: string;
  timeLabel: string;
  unread?: boolean;
  avatarLetter: string;
  avatarUrl?: string;
};

export const me: User = {
  name: "Max Lemoine-Gavoille",
  headline: "Cybersecurity Consultant @ Capgemini · Founder of AI & SaaS ventures · Engineering student @ ECE Paris",
  location: "Paris, France",
  about:
    "Cybersecurity consultant at Capgemini and founder of multiple AI and SaaS ventures, looking to scale at the intersection of deep tech and business. Engineering student in cybersecurity and AI at ECE Paris (GPA 3.75/4). Outside work: chess at 2000 Elo (top 1% worldwide), judo black belt, and 15 years of guitar.",
  avatarUrl: "/photo_profil copie-Photoroom.png",
  bannerUrl: "/banner-eiffel.jpg",
  connectionsLabel: "500+ connections",
  cvUrl: "/MaxLemoineGavoilleCV.pdf",
  linkedinUrl: "https://www.linkedin.com/in/max-lemoine-gavoille-173158260/",
  email: "maxlemgav@gmail.com",
  phone: "+33 661089000",
  languages: ["French (native)", "English (C1/C2 – TOEIC 940 / IELTS 7.5)", "German (academic)", "Korean (academic)"],
};

// All skills from CV
export const skills: Skill[] = [
  // Languages
  { name: "Python",       iconUrl: `${LEGACY_PORTFOLIO_URL}/python.png` },
  { name: "JavaScript",   iconUrl: `${LEGACY_PORTFOLIO_URL}/javascript.png` },
  { name: "TypeScript",   iconUrl: `${LEGACY_PORTFOLIO_URL}/typescript.png` },
  { name: "PHP",          iconUrl: `${LEGACY_PORTFOLIO_URL}/php.png` },
  { name: "C",            iconUrl: `${LEGACY_PORTFOLIO_URL}/C.png` },
  { name: "C++",          iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Swift",        iconUrl: `${LEGACY_PORTFOLIO_URL}/swift.png` },
  { name: "Kotlin",       iconUrl: `${LEGACY_PORTFOLIO_URL}/kotlin.png` },
  // Web / Frameworks
  { name: "Next.js",      iconUrl: `${LEGACY_PORTFOLIO_URL}/nextjs.png` },
  { name: "React",        iconUrl: `${LEGACY_PORTFOLIO_URL}/react.png` },
  { name: "Node.js",      iconUrl: `${LEGACY_PORTFOLIO_URL}/node.png` },
  { name: "Express",      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Tailwind CSS", iconUrl: `${LEGACY_PORTFOLIO_URL}/tailwind.png` },
  { name: "Flutter",      iconUrl: `${LEGACY_PORTFOLIO_URL}/flutter.png` },
  // AI / ML
  { name: "PyTorch",      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "TensorFlow",   iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  // Databases
  { name: "MySQL",        iconUrl: `${LEGACY_PORTFOLIO_URL}/mysql.png` },
  { name: "PostgreSQL",   iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB",      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Firebase",     iconUrl: `${LEGACY_PORTFOLIO_URL}/firebase.png` },
  // DevOps / Tools
  { name: "Git",          iconUrl: `${LEGACY_PORTFOLIO_URL}/git.png` },
  { name: "Docker",       iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Vercel",       iconUrl: `${LEGACY_PORTFOLIO_URL}/vercel.png` },
  { name: "Arduino",      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
  // Cybersecurity tools
  { name: "Nmap",         iconUrl: "/nmap-logo.png" },
  { name: "Metasploit",   iconUrl: "/metasploit-logo.svg" },
  { name: "Burp Suite",   iconUrl: "/portswigger-logo.svg" },
  { name: "Wireshark",    iconUrl: "/wireshark-logo.svg" },
  { name: "MISP",         iconUrl: "/misp-logo.png" },
  { name: "Ettercap",     iconUrl: "/ettercap-logo.png" },
  { name: "Shodan",       iconUrl: "/shodan-logo.png" },
  { name: "Kali Linux",   iconUrl: "/kali-logo.svg" },
  { name: "Prompt Eng.",  iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "LLM Deploy",   iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  // Cybersecurity
  { name: "OpenCTI",              iconUrl: "/opencti-logo.png" },
  { name: "Censys",               iconUrl: "/shodan-logo.png" },
  { name: "OWASP",                iconUrl: "/portswigger-logo.svg" },
  { name: "Penetration Testing",  iconUrl: "/kali-logo.svg" },
  { name: "Threat Intelligence",  iconUrl: "/misp-logo.png" },
  { name: "IAM",                  iconUrl: "/kali-logo.svg" },
  { name: "Cryptography",         iconUrl: "/kali-logo.svg" },
  { name: "LLM Security",         iconUrl: "/kali-logo.svg" },
  // AI
  { name: "Machine Learning",     iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "Diffusion Models",     iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "RAG",                  iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Claude / Anthropic API", iconUrl: "/claude-logo.svg" },
  { name: "Hugging Face",         iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  // Soft skills
  { name: "Leadership",           iconUrl: "" },
  { name: "Project Management",   iconUrl: "" },
  { name: "Client Communication", iconUrl: "" },
  { name: "Public Speaking & Pitching", iconUrl: "" },
  { name: "Entrepreneurship",     iconUrl: "" },
  { name: "Teamwork",             iconUrl: "" },
  { name: "Adaptability",         iconUrl: "" },
  { name: "Problem Solving",      iconUrl: "" },
];

export const certifications: Certification[] = [
  { id: "c11", name: "OpenAI PartnerU early-access track (6 practitioner certifications)", issuer: "OpenAI",               logoLetter: "O", color: "#10a37f" },
  { id: "c12", name: "Claude Certified Associate · Forward Deployed Engineer (early-access track)", issuer: "Anthropic", logoLetter: "A", color: "#d97757", logoUrl: "/anthropic-logo.svg" },
  { id: "c1", name: "AI Fluency for Small Businesses",              issuer: "Anthropic",                                logoLetter: "A", color: "#d97757", logoUrl: "/anthropic-logo.svg" },
  { id: "c2", name: "Claude 101",                                   issuer: "Anthropic",                                logoLetter: "A", color: "#d97757", logoUrl: "/claude-logo.svg" },
  { id: "c3", name: "Claude Code 101",                              issuer: "Anthropic",                                logoLetter: "A", color: "#d97757", logoUrl: "/claude-logo.svg" },
  { id: "c4", name: "Claude Platform 101",                          issuer: "Anthropic",                                logoLetter: "A", color: "#d97757", logoUrl: "/claude-logo.svg" },
  { id: "c5", name: "AI Business Professional",                     issuer: "Microsoft",                                logoLetter: "M", color: "#00A4EF", logoUrl: "/microsoft-logo.svg" },
  { id: "c6", name: "AI-900 - Azure AI Fundamentals",               issuer: "Microsoft",                                logoLetter: "M", color: "#00A4EF", logoUrl: "/microsoft-logo.svg" },
  { id: "c7", name: "AI Essentials (98%)",                          issuer: "Google",                                   logoLetter: "G", color: "#4285F4", logoUrl: "/google-logo.svg" },
  { id: "c8", name: "Google Project Management (91%)"            ,   issuer: "Google",                                   logoLetter: "G", color: "#34A853", logoUrl: "/google-logo.svg" },
  { id: "c9", name: "Threat Intelligence - MISP, OpenCTI, Shodan & Censys", issuer: "EduGroupe",                        logoLetter: "E", color: "#e11d48", logoUrl: "/misp-logo.png" },
  { id: "c10", name: "AWS Cloud Practitioner",                      issuer: "Amazon Web Services",                      logoLetter: "A", color: "#FF9900", logoUrl: "/aws-logo.svg" },
];

// Education logos updated with new files
export const education: Education[] = [
  {
    id: "e1",
    school: "Ecole Centrale d'Electronique (ECE Paris)",
    degree: "Engineering Degree",
    field: "Cybersecurity & Artificial Intelligence",
    startYear: "Sep 2022",
    endYear: "Jun 2027",
    location: "Paris, France",
    gpa: "3.75 / 4",
    courses: ["Machine Learning", "Systèmes d'information", "AI Injection", "Penetration Testing", "Cryptographie", "Algorithms"],
    description:
      "Red and blue team simulations of real-world attacks (OWASP), exploiting and remediating web vulnerabilities and privilege escalation scenarios. IAM consulting case designing access control for a 300+ user enterprise.",
    logoLetter: "E",
    logoUrl: "/ece.png",
  },
  {
    id: "e2",
    school: "Ajou University",
    degree: "Exchange Student",
    field: "Artificial Intelligence (Master-level courses)",
    startYear: "Sep 2024",
    endYear: "Mar 2025",
    location: "Seoul, South Korea",
    gpa: "88%",
    courses: ["AI Model Development", "Computer Programming for AI & Data", "Machine Learning", "Algorithms"],
    description:
      "Researched text-to-music diffusion models. Built and trained a chess AI on my own games, reaching 1500 Elo.",
    logoLetter: "A",
    logoUrl: "/ajou.jpeg",
  },
];

export const experiences: Experience[] = [
  {
    id: "x1",
    company: "Capgemini",
    role: "Cybersecurity Consultant (Apprenticeship)",
    location: "Paris, France",
    startDate: "Sep 2025",
    endDate: "Present",
    logoLetter: "C",
    color: "#0070AD",
    logoUrl: "/capgemini-logo.svg",
    bullets: [
      "Selected for an OpenAI early-access partnership in London and San Francisco on unreleased models, then acting as the internal forward-deployed engineer embedding them into Capgemini's audit delivery.",
      "Led 50+ pentests for 30+ clients across Web, API, LLM, Network, AWS and Active Directory environments, managing the full audit lifecycle from scoping to delivery: €72.5K in annual revenue.",
      "Project manager on a major key account, coordinating scoping, audit planning and billing across 4 countries.",
    ],
  },
  {
    id: "x5",
    company: "BNP Paribas",
    role: "Final-Year Engineering Project, 4-person team",
    location: "Paris, France",
    startDate: "Dec 2026",
    endDate: "Feb 2027",
    logoLetter: "B",
    color: "#00915a",
    bullets: [
      "Security and compliance lead on an open-source harness governing multi-agent LLMs for financial advice.",
      "Publication target: NeurIPS, subject to BNP validation, with an arXiv preprint and open-source release.",
    ],
  },
  {
    id: "x2",
    company: "Founder & Freelance - Multiple SaaS ventures",
    role: "Founder & Co-Founder",
    location: "Paris, France",
    startDate: "Jan 2022",
    endDate: "Present",
    logoLetter: "S",
    color: "#7c3aed",
    bullets: [
      "Autoinvoice, founder (Jun 2025 - Feb 2026): invoicing SaaS for freelancers and SMEs, built entirely from scratch on my own; grew it to €700+ MRR and exited for €10K.",
      "ShowYourBrand, co-founder (May 2026): led the technical side of a GEO platform that helps brands measure and improve how they appear in AI answers on ChatGPT, Claude and others.",
    ],
  },
  {
    id: "x3",
    company: "Freelance Engineer",
    role: "Full-stack SaaS, web and mobile apps",
    location: "Paris, France / Remote",
    startDate: "2022",
    endDate: "2025",
    logoLetter: "F",
    color: "#059669",
    bullets: [
      "€25K+ per year delivering full-stack SaaS, web and mobile apps for several SMEs (Recrutement Success, Les Chandelles, Fedhubs), handling deployment, SEO and maintenance.",
    ],
  },
  {
    id: "x6",
    company: "Groupe Muller",
    role: "Technical Sales Intern",
    location: "Paris, France / Frankfurt, Germany",
    startDate: "Mar 2025",
    endDate: "May 2025",
    logoLetter: "M",
    color: "#1e3a8a",
    bullets: [
      "Participated in the ISH trade fair in Frankfurt (17-21 March 2025), supporting a heat pump launch. Generated 14 qualified leads, converting into 9 sales in Q2 2025: €1.07M in revenue at a 38% margin.",
    ],
  },
  {
    id: "x4",
    company: "BrandOrbit - International Marketing Startup",
    role: "Co-Founder",
    location: "London, United Kingdom",
    startDate: "Jan 2025",
    endDate: "Present",
    logoLetter: "B",
    color: "#dc2626",
    logoUrl: "/brandorbit.webp",
    bullets: [
      "Implemented targeted digital prospecting strategies and LinkedIn outreach campaigns to identify and acquire international clients, using lead scoring methodologies to secure 10+ global clients.",
      "Assisted SaaS founders (Autoinvoice, Autoplanner) in establishing presence across Asian markets with focus on South Korea, implementing targeted market research and localisation strategies.",
    ],
  },
];

// Feed posts - ordered as requested
export const projectPosts: ProjectPost[] = [
  {
    id: "p13",
    author: me,
    createdAt: "Experience · BNP Paribas · Dec 2026 - Feb 2027",
    title: "BNP Paribas - Harness Matters for Small Models (final-year research project)",
    description:
      "Final-year engineering project proposed by BNP Paribas CIB, in a 4-person team (Robin Quériaux, Victor Mazloum, Romain Mallet and me). The quality of an LLM assistant depends not only on the model but on its harness: the code that decides what the model sees, which tools it may call, how many calls it makes and how its answers are checked. With a small, fast model held fixed, we study how far harness engineering alone can push answer quality against ground truths at the lowest latency, focusing on two problems simple harnesses handle poorly: precise follow-ups on details stated early in long conversations, and tool overload when many MCP servers are exposed. Deliverables: SwiftHarness, an open-source modular harness with tracing and deterministic replay; two public test suites (FollowUp-Bench and ToolScale, from 8 to 512 tools); and a research paper. I am the security and compliance lead: verification, security and robustness of a harness governing multi-agent LLMs for financial advice. Publication target: NeurIPS, subject to BNP validation, with an arXiv preprint and open-source release.",
    tags: ["Research", "LLM Agents", "Agent Harness", "MCP", "Context Engineering", "Security", "Compliance", "Small Models", "Latency", "Open Source", "NeurIPS", "BNP Paribas"],
    links: [{ label: "Read the project statement (PDF)", url: "/BNP-Paribas-PFE-Harness-Matters-for-Small-Models.pdf" }],
    likeCount: 64,
    commentCount: 7,
  },
  {
    id: "p15",
    author: me,
    createdAt: "Hackathon · Accel AI Innovate · Paris · Oct 2026",
    title: "Accel AI Innovate - Deterministic guardrail for banking and insurance AI agents",
    description:
      "At Accel AI Innovate in Paris, I built a deterministic guardrail that sits between a bank's or insurer's AI agent and its actions, blocking rule-breaking actions in milliseconds, using Anthropic models and Cognition. One of 300+ participants; we won €250 in credits and a pitch slot.",
    tags: ["Hackathon", "Accel", "AI Agents", "Guardrails", "Security", "Compliance", "Banking", "Insurance", "Anthropic", "Cognition", "Pitch"],
    links: [],
    likeCount: 52,
    commentCount: 6,
  },
  {
    id: "p14",
    author: me,
    createdAt: "CTF · Campus CyberDrill · Paris · Sep 2026",
    title: "Campus CyberDrill, Offensive Edition - 2nd out of 95",
    description:
      "Ranked 2nd out of 95 participants at Campus CyberDrill, Offensive Edition, a capture-the-flag competition in Paris, against teams from Hermès, Ministère des Armées, PwC and Wavestone.",
    tags: ["CTF", "Offensive Security", "Pentest", "Red Team", "Cybersecurity", "Competition", "Paris"],
    links: [],
    likeCount: 58,
    commentCount: 5,
  },
  {
    id: "p16",
    author: me,
    createdAt: "Hackathon · SWEYoung · Stockholm · Jun 2026",
    title: "SWEYoung - Selected among 60 builders out of 500+ applicants",
    description:
      "Selected among 60 builders out of 500+ applicants for a 48-hour hackathon in Stockholm.",
    tags: ["Hackathon", "Stockholm", "International", "Builders", "48 hours", "Startup"],
    links: [],
    likeCount: 33,
    commentCount: 2,
  },
  {
    id: "p0",
    author: me,
    createdAt: "Hackathon · Space tech · 2025",
    title: "FOCUS - Hackathon Satellite Collision project",
    description:
      "I participated in a hackathon where we built FOCUS, a satellite collision avoidance analysis platform: For Orbital Cleanliness & Universal Safety. The project models satellites and orbital debris in LEO, lets users inspect objects like Starlink, NOAA-19 and Cosmos-2251 debris, compare orbits, tune physical/orbital/environmental parameters, and estimate whether an avoidance maneuver is required. The interface combines a 3D globe, satellite gallery, space weather controls, CDM-style reliability inputs, risk trend analysis and a policy engine with threshold, MDP and hybrid decision modes. The goal was to turn complex conjunction analysis into an operator-style dashboard that can recommend concrete actions such as verifying latest tracking updates and preparing a delta-V budget for a collision avoidance burn. The app is password-protected; click the link below and the password ryphal2026 will be copied automatically.",
    tags: ["Hackathon", "SpaceTech", "Satellite", "CollisionAvoidance", "OrbitalDebris", "3D", "ML", "MDP", "Next.js", "RiskAnalysis", "Simulation"],
    imageUrl: "/focus.png",
    imageFit: "contain",
    imagePadding: "none",
    links: [{ label: "Open Focus (password auto-copied)", url: "https://focus-mvp-pearl.vercel.app/", copyText: "ryphal2026" }],
    likeCount: 86,
    commentCount: 21,
  },
  {
    id: "p11",
    author: me,
    createdAt: "Hackathon · Y Combinator × Anthropic · Paris · Jun 2026",
    title: "Alcatraz - Agentic red-teaming harness (Y Combinator × Anthropic Hackathon)",
    description:
      "36 hours. No sleep. Build a company from scratch and pitch it for Y Combinator. That was the Paris Builds Hackathon in partnership with Y Combinator, powered by Anthropic, Hugging Face and Qube Research & Technologies. With Célia Lecat and Liam Szefner, we built Alcatraz, an agentic red-teaming harness and security layer for AI agents. The idea is simple: just like startups delegate payments to Stripe, they can delegate agent security to us. Two lines of code to add, and they can focus entirely on their product, while staying compliant enough to close enterprise deals and actually sell. In 36 hours: 200 cold outreaches, 5 demos, and 1 paying client - a previous hackathon winner who became our first customer. The room was the real thing - founders from Asia and all across Europe. What the format proves: in one weekend, you can go from zero to a product, a first customer, and a shot at a YC interview.",
    tags: ["Hackathon", "YCombinator", "Startup", "AI Agents", "Security", "Anthropic", "Hugging Face", "B2B", "Compliance", "Sales", "Pitch"],
    imageUrl: "/alcatraz-hackathon.jpg",
    imageFit: "contain",
    imagePadding: "none",
    links: [{ label: "LinkedIn post", url: "https://www.linkedin.com/feed/update/urn:li:activity:7477594335635546112/" }],
    likeCount: 41,
    commentCount: 3,
  },
  {
    id: "p12",
    author: me,
    createdAt: "Research · AI · Academic project · 2024",
    title: "Moûsai - Efficient Text-to-Music Diffusion Models (research reproduction)",
    description:
      "As part of my studies, I researched Text-to-Music Diffusion Models - AI systems that generate music from text prompts. I studied the ACL 2024 paper 'Moûsai: Efficient Text-to-Music Diffusion Models' in depth and reproduced its experiments, running the tests described in the paper to validate its results on efficient long-context latent diffusion for high-quality, real-time-capable music generation. This project gave me hands-on experience with diffusion architectures, audio latent spaces, and the practical challenges of reproducing state-of-the-art AI research.",
    tags: ["AI", "Research", "Diffusion Models", "Text-to-Music", "Audio", "Deep Learning", "PyTorch", "ACL 2024", "Reproduction", "Generative AI", "Academic"],
    links: [{ label: "Read the paper (ACL 2024)", url: "https://aclanthology.org/2024.acl-long.437.pdf" }],
    likeCount: 35,
    commentCount: 4,
  },
  {
    id: "p1",
    author: me,
    createdAt: "Experience · Capgemini · Sep 2025 - Present",
    title: "Cybersecurity Consultant @ Capgemini",
    description:
      "Cybersecurity consultant (apprenticeship) at Capgemini. Selected for an OpenAI early-access partnership in London and San Francisco on unreleased models, then acting as the internal forward-deployed engineer embedding them into Capgemini's audit delivery. Led 50+ pentests for 30+ clients across Web, API, LLM, Network, AWS and Active Directory environments, managing the full audit lifecycle from scoping to delivery: €72.5K in annual revenue. Project manager on a major key account, coordinating scoping, audit planning and billing across 4 countries.",
    tags: ["Pentest", "OpenAI", "Forward Deployed Engineer", "LLM", "AWS", "Active Directory", "OWASP", "Cybersecurity", "Red Team", "Blue Team", "API Security", "Network Security", "Consulting", "AI", "Capgemini"],
    imageUrl: "/capgemini-logo.svg",
    imageFit: "contain",
    links: [{ label: "capgemini.com", url: "https://www.capgemini.com" }],
    likeCount: 142,
    commentCount: 18,
  },
  {
    id: "p2",
    author: me,
    createdAt: "SaaS · Jun 2025 - Feb 2026 · Exited",
    title: "Autoinvoice - Invoice automation SaaS (founded and exited)",
    description:
      "Autoinvoice is an invoice automation SaaS I built entirely solo, from zero, for freelancers and small businesses. The idea came from a real pain point: spending too much time on admin instead of actual work. I designed the product, built the full stack (Next.js, Node.js, PostgreSQL), integrated Stripe for payments, built the onboarding flow, and handled customer support myself. Grew it to €700+ MRR with real paying users, then exited for €10K. The whole journey from idea to exit took about 9 months. It taught me everything about building a product people actually pay for: pricing, retention, churn, support, and knowing when to sell.",
    tags: ["SaaS", "Founder", "Full-stack", "Exit", "Next.js", "PostgreSQL", "Stripe", "Automation", "Freelance Tools", "Startup", "Solo Founder", "Product", "B2B", "Invoice"],
    imageUrl: "/autoinvoic.png",
    imageFit: "contain",
    imagePadding: "none",
    links: [],
    likeCount: 98,
    commentCount: 11,
  },
  {
    id: "p3",
    author: me,
    createdAt: "SaaS · Co-Founded May 2026",
    title: "ShowYourBrand - GEO platform for brand visibility in AI answers",
    description:
      "Co-founded ShowYourBrand in May 2026, a Generative Engine Optimization (GEO) platform that helps brands measure and improve how they appear in AI answers on ChatGPT, Claude and others. Think SEO, but for AI engines. I led the entire technical side: architecture, backend, frontend, and deployment.",
    tags: ["GEO", "AI", "SaaS", "Co-Founder", "SEO", "ChatGPT", "Claude", "LLM", "Marketing Tech", "Startup", "Next.js", "B2B", "Brand Visibility", "AI Search"],
    imageUrl: "/screenshot-showyourbrand.jpg",
    imageFit: "contain",
    imagePadding: "none",
    links: [{ label: "showyourbrand.app", url: "https://showyourbrand.app" }],
    likeCount: 76,
    commentCount: 9,
  },
  {
    id: "p4",
    author: me,
    createdAt: "Extra-curricular · JEECE · ECE Paris",
    title: "JEECE - Junior Enterprise: Technical and Commercial Lead",
    description:
      "Technical and commercial lead at JEECE, the Junior Entreprise of ECE Paris: 14 clients and €70.7K invoiced. Responsible for client scoping, full website design and development, project management, and supervising a team of student developers. JEECE connects companies with engineering students for real consulting missions. I led the technical side of client projects while also handling commercial prospecting and client relationships.",
    tags: ["Leadership", "Junior Enterprise", "Web", "Team", "ECE Paris", "Consulting", "Project Management", "Next.js", "Student", "Association", "Commercial", "Full-stack"],
    imageUrl: "/screenshot-jeece.jpg",
    imageFit: "contain",
    imagePadding: "none",
    links: [{ label: "jeece.fr", url: "https://www.jeece.fr" }],
    likeCount: 45,
    commentCount: 6,
  },
  {
    id: "p5",
    author: me,
    createdAt: "Freelance · Client project · 2024",
    title: "Les Chandelles - Full restaurant website",
    description:
      "Designed and developed the complete website for Les Chandelles, a Parisian restaurant. Built with Next.js, fully responsive and SEO-optimised. Integrated online reservation system, menu management, and a custom CMS so the client can update content without touching code. Handled deployment, domain setup, and ongoing maintenance.",
    tags: ["Next.js", "Freelance", "Restaurant", "SEO", "CMS", "Responsive", "Reservation System", "Deployment", "Tailwind CSS", "Full-stack", "Client Project", "Paris"],
    imageUrl: "/screenshot-leschandelles.jpg",
    links: [{ label: "leschandelles.com", url: "https://www.leschandelles.com" }],
    likeCount: 31,
    commentCount: 4,
  },
  {
    id: "p6",
    author: me,
    createdAt: "Freelance · Client project · 2024",
    title: "Recrutement Success - Full-stack recruitment platform",
    description:
      "Built the full-stack Recrutement Success platform from scratch for a recruitment consulting firm. Covers the complete stack: UI/UX design, business logic, database architecture, SEO, and production deployment. The platform handles candidate management, job listings, and client-facing dashboards. Part of 200+ billable hours delivered as a freelance developer, contributing to €25K+ per year in freelance revenue.",
    tags: ["Next.js", "Freelance", "Full-stack", "SEO", "Recruitment", "Dashboard", "PostgreSQL", "Deployment", "Tailwind CSS", "Client Project", "B2B", "SaaS"],
    imageUrl: legacyNextImage("/_next/static/media/Recrutement_succes.0e6a7421.jpeg", 1200),
    imageFit: "cover",
    links: [{ label: "recrutement-success.com", url: "https://recrutement-success.com/" }],
    likeCount: 54,
    commentCount: 7,
  },
  {
    id: "p7",
    author: me,
    createdAt: "Extra-curricular · No Larsen · ECE Paris",
    title: "No Larsen - Student Event Creation and Management",
    description:
      "Event creation and management with No Larsen, the student music society at ECE Paris. Produced 3 events for about 1,000 attendees, handling ticketing, the website, logistics and venues, from concept to execution with budgets, external partners and a team of volunteers.",
    tags: ["Events", "Management", "Team", "ECE Paris", "Student", "Association", "Logistics", "Partnerships", "Leadership", "Organisation"],
    imageUrl: "/screenshot-nolarsen.jpg",
    links: [{ label: "nolarsen.fr", url: "https://www.nolarsen.fr" }],
    likeCount: 28,
    commentCount: 5,
  },
  {
    id: "p17",
    author: me,
    createdAt: "Extra-curricular · Generathon · Paris · 2026",
    title: "Generathon - Business Development & Event Manager",
    description:
      "Business development and event manager for Generathon, a monthly 24-hour AI video hackathon: 114 creators, 104 films and 1.2M+ views. I develop sponsorships alongside Red Bull, CapCut, Station F, HEXA and Le Motif (1.7M followers).",
    tags: ["Events", "Business Development", "Sponsorship", "AI Video", "Hackathon", "Generative AI", "Station F", "Red Bull", "CapCut", "Leadership"],
    links: [],
    likeCount: 47,
    commentCount: 5,
  },
  {
    id: "p18",
    author: me,
    createdAt: "Experience · Groupe Muller · Mar - May 2025",
    title: "Groupe Muller - Technical Sales Intern (ISH Frankfurt)",
    description:
      "Technical sales internship at Groupe Muller between Paris and Frankfurt. I took part in the ISH trade fair in Frankfurt (17-21 March 2025), supporting a heat pump launch. Generated 14 qualified leads, converting into 9 sales in Q2 2025: €1.07M in revenue at a 38% margin.",
    tags: ["Sales", "B2B", "Trade Fair", "Frankfurt", "International", "Lead Generation", "Heat Pumps", "Internship"],
    links: [],
    likeCount: 26,
    commentCount: 2,
  },
  {
    id: "p8",
    author: me,
    createdAt: "Extra-curricular · BrandOrbit · London",
    title: "BrandOrbit - International Marketing Startup",
    description:
      "Co-founded BrandOrbit, an international marketing startup based in London. Implemented targeted digital prospecting strategies and LinkedIn outreach campaigns to identify and acquire international clients, using lead scoring methodologies to secure 10+ global clients. Also assisted SaaS founders in establishing presence across Asian markets with a focus on South Korea. Francesca Bushell is one of our clients - we built her portfolio site and supported her brand presence internationally.",
    tags: ["Marketing", "Co-Founder", "International", "B2B", "Freelance", "London", "LinkedIn", "Lead Generation", "Asia", "South Korea", "Digital Marketing", "Startup", "Portfolio"],
    imageUrl: "/screenshot-brandorbit.png",
    imageFit: "contain",
    imagePadding: "none",
    links: [
      { label: "brand-orbit.vercel.app", url: "https://brand-orbit.vercel.app/" },
      { label: "LinkedIn page", url: "https://www.linkedin.com/company/brand-orbit-international-marketing/" },
    ],
    likeCount: 27,
    commentCount: 3,
  },
  {
    id: "p9",
    author: me,
    createdAt: "Freelance · Startup contribution · 2025",
    title: "Fedhubs - Core backend infrastructure",
    description:
      "Contributed to Fedhubs early technical infrastructure during the company founding phase. Designed and implemented core backend systems including API architecture, database schema, and authentication flows. The goal was to build a scalable foundation ready for production from day one, avoiding costly rewrites later.",
    tags: ["Backend", "Startup", "Architecture", "API", "Node.js", "PostgreSQL", "Authentication", "Scalability", "Freelance", "Infrastructure", "Early Stage"],
    imageUrl: "/screenshot-fedhubs.jpg",
    imageFit: "contain",
    imagePadding: "none",
    links: [{ label: "fedhubs.org", url: "https://fedhubs.org" }],
    likeCount: 22,
    commentCount: 3,
  },
  {
    id: "p10",
    author: me,
    createdAt: "Project · Freelance demo · 2023",
    title: "Apple iPhone 15 landing page clone",
    description:
      "A demo site I built to show potential freelance clients what I can do. Pixel-accurate rebuild of the Apple iPhone 15 product page, fully responsive with smooth scroll animations, 3D model interactions, and video transitions. This was my sales tool as a freelance developer: show, don't tell. It worked - several clients hired me after seeing this.",
    tags: ["UI", "Front-end", "React", "Animation", "Freelance Demo", "Apple", "3D", "GSAP", "Three.js", "Responsive", "Portfolio", "Showcase", "Next.js"],
    imageUrl: legacyNextImage("/_next/static/media/iphone.a1bde86b.png", 1200),
    imageFit: "contain",
    imagePadding: "none",
    links: [{ label: "Live demo", url: "https://iphone-doc.vercel.app/" }],
    likeCount: 63,
    commentCount: 8,
  },
];

export const messagingContacts: MessagingContact[] = [
  {
    id: "m1",
    name: "Capgemini - Senior Manager",
    relation: "Cybersecurity · Recommendation",
    lastMessage: "Max has been an outstanding consultant. His technical depth on pentests and his ability to manage client relationships simultaneously is rare at his level. Highly recommend.",
    timeLabel: "1h ago",
    avatarLetter: "C",
    unread: true,
    avatarUrl: "/capgemini-logo.svg",
  },
  {
    id: "m2",
    name: "Recrutement Success - CEO",
    relation: "Freelance client · Recommendation",
    lastMessage: "Max delivered our platform on time and above expectations. He handled everything: design, dev, SEO, deployment. We saw a 40% increase in organic traffic within 2 months. Will work with him again.",
    timeLabel: "3h ago",
    avatarLetter: "R",
    avatarUrl: randomImage("recrutement-success-contact", 200, 200),
  },
  {
    id: "m3",
    name: "JEECE - President",
    relation: "Junior Enterprise · Recommendation",
    lastMessage: "As technical lead at JEECE, Max completely transformed how we deliver client projects. He built our website, trained the dev team, and brought in new clients. Exceptional profile.",
    timeLabel: "Yesterday",
    avatarLetter: "J",
    unread: true,
    avatarUrl: "/screenshot-jeece.jpg",
  },
  {
    id: "m4",
    name: "Fedhubs - Co-Founder",
    relation: "Startup · Recommendation",
    lastMessage: "Max built our entire backend infrastructure from scratch in record time. Clean architecture, well-documented, and production-ready. Exactly what an early-stage startup needs.",
    timeLabel: "2d ago",
    avatarLetter: "F",
    avatarUrl: "/screenshot-fedhubs.jpg",
  },
];

export const jobOpportunities = [
  {
    id: "j1",
    company: "Linux security team",
    role: "Penetration Tester / Red Team Engineer",
    location: "Paris, France",
    mode: "Hybrid",
    summary:
      "Senior pentest role covering Linux, Web, API and cloud environments. Strong match with your Capgemini audit experience, Kali workflow and OWASP background.",
    imageUrl: "/kali-logo.svg",
  },
  {
    id: "j2",
    company: "Offensive security platform",
    role: "Security Automation Engineer",
    location: "Remote, Europe",
    mode: "Remote",
    summary:
      "Build tooling around Linux-based attack simulation, reporting automation and infrastructure hardening. Strong fit for your pentest, LLM and SaaS experience.",
    imageUrl: "/metasploit-logo.svg",
  },
] as const;

export const notifications = [
  {
    id: "n1",
    title: "Capgemini: Your penetration test report for Client #31 has been reviewed and approved.",
    time: "Just now",
    type: "analytics",
    unread: true,
  },
  {
    id: "n2",
    title: "ShowYourBrand: brands are measuring their visibility in ChatGPT and Claude answers.",
    time: "2h ago",
    type: "network",
    unread: true,
  },
  {
    id: "n3",
    title: "Recrutement Success: new candidate submission via your platform. Check the dashboard.",
    time: "Yesterday",
    type: "analytics",
    unread: false,
  },
  {
    id: "n4",
    title: "Your LinkedIn profile was viewed 47 times this week. 3 people saved your profile.",
    time: "2d ago",
    type: "network",
    unread: false,
  },
  {
    id: "n5",
    title: "Autoinvoice: your SaaS exit story was shared by 2 founders in a startup community.",
    time: "3d ago",
    type: "reminder",
    unread: false,
  },
  {
    id: "n6",
    title: "FOCUS: 21 people reacted to your satellite collision avoidance hackathon project.",
    time: "3d ago",
    type: "analytics",
    unread: true,
  },
  {
    id: "n7",
    title: "A space-tech founder viewed your FOCUS post and opened the demo.",
    time: "4d ago",
    type: "network",
    unread: true,
  },
  {
    id: "n8",
    title: "Kali Linux skill match: 6 new security roles fit your profile.",
    time: "4d ago",
    type: "reminder",
    unread: true,
  },
  {
    id: "n9",
    title: "Metasploit experience added weight to your Red Team job recommendations.",
    time: "5d ago",
    type: "analytics",
    unread: false,
  },
  {
    id: "n10",
    title: "BrandOrbit: your international marketing project received a profile click.",
    time: "5d ago",
    type: "network",
    unread: false,
  },
  {
    id: "n11",
    title: "Capgemini: 3 cybersecurity consultants viewed your profile after the pentest post.",
    time: "6d ago",
    type: "network",
    unread: false,
  },
  {
    id: "n12",
    title: "Autoinvoice: invoice automation post crossed 98 reactions.",
    time: "6d ago",
    type: "analytics",
    unread: false,
  },
  {
    id: "n13",
    title: "JEECE: a Junior Enterprise member saved your technical lead experience.",
    time: "1w ago",
    type: "network",
    unread: false,
  },
  {
    id: "n14",
    title: "ShowYourBrand: AI search and GEO keywords are trending in your feed.",
    time: "1w ago",
    type: "analytics",
    unread: false,
  },
  {
    id: "n15",
    title: "Linux security jobs: 2 saved searches now match Kali, Nmap and Metasploit.",
    time: "1w ago",
    type: "reminder",
    unread: false,
  },
  {
    id: "n16",
    title: "Fedhubs: backend architecture post was viewed by a startup CTO.",
    time: "1w ago",
    type: "network",
    unread: false,
  },
  {
    id: "n17",
    title: "FOCUS: collision risk, CDM reliability and orbit simulation tags are performing well.",
    time: "1w ago",
    type: "analytics",
    unread: false,
  },
  {
    id: "n18",
    title: "Your profile appeared in searches for cybersecurity consultant and SaaS founder.",
    time: "1w ago",
    type: "analytics",
    unread: false,
  },
  {
    id: "n19",
    title: "Les Chandelles: a restaurant owner opened your freelance website project.",
    time: "2w ago",
    type: "network",
    unread: false,
  },
  {
    id: "n20",
    title: "Recrutement Success: full-stack recruitment platform post got a new comment.",
    time: "2w ago",
    type: "network",
    unread: false,
  },
  {
    id: "n21",
    title: "Apple iPhone 15 clone: animation and 3D tags brought new traffic.",
    time: "2w ago",
    type: "analytics",
    unread: false,
  },
  {
    id: "n22",
    title: "Reminder: keep your CV link visible for recruiters checking the quick links.",
    time: "2w ago",
    type: "reminder",
    unread: false,
  },
  {
    id: "n23",
    title: "No Larsen: event leadership experience was saved by an ECE Paris contact.",
    time: "2w ago",
    type: "network",
    unread: false,
  },
  {
    id: "n24",
    title: "Security tooling: Shodan, Ettercap and Wireshark tags now support better role matching.",
    time: "3w ago",
    type: "analytics",
    unread: false,
  },
  {
    id: "n25",
    title: "Your profile gained momentum across cybersecurity, AI and product-builder searches.",
    time: "3w ago",
    type: "network",
    unread: false,
  },
] as const;

export const feedAsideItems = [
  {
    title: "Download CV",
    subtitle: "Get my resume as PDF.",
    href: me.cvUrl,
  },
  {
    title: "My Profile",
    subtitle: "View full profile, skills and experience.",
    href: "/profile",
  },
  {
    title: "Official LinkedIn",
    subtitle: "Connect using the public profile link.",
    href: me.linkedinUrl,
  },
  {
    title: "Email",
    subtitle: me.email,
    href: `mailto:${me.email}`,
  },
] as const;
