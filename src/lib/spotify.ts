import {
  me,
  projectPosts,
  experiences,
  education,
  certifications,
  skills,
  messagingContacts,
  type ProjectPost,
} from "@/data/portfolio";

export type AlbumGroup = "Hackathons & SaaS founded" | "Professional Experience" | "Made by Max";

export type CoverStyle = {
  /** CSS gradient / background used behind the artwork and page headers */
  gradient: string;
  /** Dominant color used for page header gradients */
  color: string;
  /** Short label rendered on CSS-only covers */
  label: string;
};

export type Track = { name: string; meta: string };

export type Album = {
  id: string;
  post: ProjectPost;
  title: string;
  shortTitle: string;
  subtitle: string;
  year: string;
  group: AlbumGroup;
  categories: string[];
  cover: CoverStyle;
  tracks: Track[];
  /** Optional demo video shown in the player overlay (file in /public/videos or external URL) */
  videoUrl?: string;
};

const COVER_STYLES: Record<string, CoverStyle> = {
  p0: { gradient: "linear-gradient(135deg, #0b1026 0%, #04060f 60%, #000 100%)", color: "#16213e", label: "FOCUS" },
  p11: { gradient: "linear-gradient(135deg, #f26522 0%, #7a2e0e 100%)", color: "#c2410c", label: "Alcatraz" },
  p1: { gradient: "linear-gradient(135deg, #0070AD 0%, #003a5c 100%)", color: "#0070AD", label: "Capgemini" },
  p2: { gradient: "linear-gradient(135deg, #6b7280 0%, #374151 100%)", color: "#4b5563", label: "Autoinvoice" },
  p3: { gradient: "linear-gradient(135deg, #111 0%, #7c2d5e 55%, #c2410c 100%)", color: "#9d174d", label: "SYB" },
  p4: { gradient: "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)", color: "#b91c1c", label: "JEECE" },
  p5: { gradient: "linear-gradient(135deg, #d6b16e 0%, #8a6d3b 100%)", color: "#a8834b", label: "Les Chandelles" },
  p6: { gradient: "linear-gradient(135deg, #047857 0%, #064e3b 100%)", color: "#047857", label: "RS" },
  p7: { gradient: "linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)", color: "#4c1d95", label: "No Larsen" },
  p8: { gradient: "linear-gradient(135deg, #dc2626 0%, #f8fafc 160%)", color: "#dc2626", label: "BrandOrbit" },
  p9: { gradient: "linear-gradient(135deg, #334155 0%, #0c4a6e 100%)", color: "#33506b", label: "Fedhubs" },
  p10: { gradient: "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)", color: "#8a94a6", label: "iPhone 15" },
};

const SHORT_TITLES: Record<string, string> = {
  p0: "FOCUS · Satellite Collision Avoidance",
  p11: "Alcatraz · Security for AI Agents",
  p1: "Capgemini · Cybersecurity Consultant",
  p2: "Autoinvoice · Founded and exited",
  p3: "ShowYourBrand · GEO Platform",
  p4: "JEECE · Junior Enterprise",
  p5: "Les Chandelles",
  p6: "Recrutement Success",
  p7: "No Larsen",
  p8: "BrandOrbit · London",
  p9: "Fedhubs",
  p10: "iPhone 15 Clone",
};

const GROUPS: Record<string, AlbumGroup> = {
  p0: "Hackathons & SaaS founded",
  p11: "Hackathons & SaaS founded",
  p2: "Hackathons & SaaS founded",
  p3: "Hackathons & SaaS founded",
  p8: "Hackathons & SaaS founded",
  p1: "Professional Experience",
  p4: "Professional Experience",
  p7: "Professional Experience",
  p5: "Made by Max",
  p6: "Made by Max",
  p9: "Made by Max",
  p10: "Made by Max",
};

export const CATEGORY_DEFS: { id: string; label: string; emoji: string; color: string }[] = [
  { id: "hackathons", label: "Hackathons", emoji: "🚀", color: "#14532d" },
  { id: "cybersecurity", label: "Cybersecurity", emoji: "🛡️", color: "#991b1b" },
  { id: "freelance", label: "Freelance", emoji: "💼", color: "#1d4ed8" },
  { id: "ai-ml", label: "AI & Machine Learning", emoji: "🧠", color: "#6d28d9" },
  { id: "international", label: "International", emoji: "🌍", color: "#c2410c" },
  { id: "education", label: "Education", emoji: "🎓", color: "#0f766e" },
  { id: "saas", label: "SaaS & Startups", emoji: "🏗️", color: "#be185d" },
  { id: "events", label: "Events & Leadership", emoji: "🎭", color: "#a16207" },
];

const CATEGORIES: Record<string, string[]> = {
  p0: ["hackathons", "ai-ml"],
  p11: ["hackathons", "cybersecurity", "saas"],
  p1: ["cybersecurity", "ai-ml"],
  p2: ["saas"],
  p3: ["saas", "ai-ml"],
  p4: ["events", "education", "freelance"],
  p5: ["freelance"],
  p6: ["freelance", "saas"],
  p7: ["events", "education"],
  p8: ["international", "events"],
  p9: ["freelance", "saas"],
  p10: ["freelance"],
};

/** Add per-project demo videos here, e.g. p0: "/videos/focus-demo.mp4" */
const VIDEO_URLS: Record<string, string> = {};

const FOCUS_TRACKS: Track[] = [
  { name: "3D Orbital Globe", meta: "SpaceTech" },
  { name: "Satellite Gallery", meta: "ML" },
  { name: "Risk Analysis Dashboard", meta: "MDP" },
  { name: "Space Weather Controls", meta: "Simulation" },
  { name: "Policy Engine", meta: "Next.js" },
];

function yearOf(post: ProjectPost): string {
  const match = post.createdAt.match(/20\d{2}/);
  return match ? match[0] : "2025";
}

function tracksOf(post: ProjectPost): Track[] {
  if (post.id === "p0") return FOCUS_TRACKS;
  const tags = post.tags.slice(0, 8);
  return tags.map((tag, i) => ({ name: tag, meta: post.tags[(i + 8) % post.tags.length] }));
}

export const albums: Album[] = projectPosts.map((post) => ({
  id: post.id,
  post,
  title: post.title,
  shortTitle: SHORT_TITLES[post.id] ?? post.title,
  subtitle: post.createdAt,
  year: yearOf(post),
  group: GROUPS[post.id] ?? "Made by Max",
  categories: CATEGORIES[post.id] ?? [],
  cover: COVER_STYLES[post.id] ?? { gradient: "linear-gradient(135deg, #333, #111)", color: "#333", label: post.title.slice(0, 2) },
  tracks: tracksOf(post),
  videoUrl: VIDEO_URLS[post.id],
}));

export function albumById(id: string): Album | undefined {
  return albums.find((a) => a.id === id);
}

function byIds(ids: string[]): Album[] {
  return ids.map((id) => albumById(id)).filter((a): a is Album => Boolean(a));
}

export const popularAlbums = byIds(["p11", "p0", "p1", "p2", "p3"]);

/** Home carousels (an album can appear in more than one) */
export const hackathonsAndSaas = byIds(["p11", "p0", "p2", "p3", "p8"]);
export const professionalExperience = byIds(["p1", "p4", "p7", "p2", "p3"]);
export const madeByMax = byIds(["p5", "p6", "p9", "p10"]);

/** Everything, projects & hackathons first - used for recommendations */
export const recommendedAlbums = byIds([
  "p11", "p0", "p2", "p3", "p8", "p10", "p1", "p4", "p7", "p5", "p6", "p9",
]);

export { me, experiences, education, certifications, skills, messagingContacts };
