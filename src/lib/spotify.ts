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

export type AlbumType = "Album" | "Single" | "Compilation";

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
  type: AlbumType;
  categories: string[];
  cover: CoverStyle;
  tracks: Track[];
};

const COVER_STYLES: Record<string, CoverStyle> = {
  p0: { gradient: "linear-gradient(135deg, #0b1026 0%, #04060f 60%, #000 100%)", color: "#16213e", label: "FOCUS" },
  p1: { gradient: "linear-gradient(135deg, #0070AD 0%, #003a5c 100%)", color: "#0070AD", label: "Capgemini" },
  p2: { gradient: "linear-gradient(135deg, #6d28d9 0%, #312e81 100%)", color: "#5b21b6", label: "Autoinvoice" },
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
  p1: "Capgemini · Cybersecurity Consultant",
  p2: "Autoinvoice · SaaS exit €10k",
  p3: "ShowYourBrand · GEO Platform",
  p4: "JEECE · Junior Enterprise",
  p5: "Les Chandelles",
  p6: "Recrutement Success",
  p7: "No Larsen",
  p8: "BrandOrbit · London",
  p9: "Fedhubs",
  p10: "iPhone 15 Clone",
};

const ALBUM_TYPES: Record<string, AlbumType> = {
  p0: "Album",
  p1: "Compilation",
  p2: "Album",
  p3: "Album",
  p4: "Compilation",
  p5: "Single",
  p6: "Single",
  p7: "Compilation",
  p8: "Compilation",
  p9: "Single",
  p10: "Single",
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
  type: ALBUM_TYPES[post.id] ?? "Single",
  categories: CATEGORIES[post.id] ?? [],
  cover: COVER_STYLES[post.id] ?? { gradient: "linear-gradient(135deg, #333, #111)", color: "#333", label: post.title.slice(0, 2) },
  tracks: tracksOf(post),
}));

export function albumById(id: string): Album | undefined {
  return albums.find((a) => a.id === id);
}

export const popularAlbums = ["p0", "p1", "p2", "p3", "p10"]
  .map((id) => albumById(id))
  .filter((a): a is Album => Boolean(a));

export const hackathonProjects = ["p0", "p2", "p3", "p10"]
  .map((id) => albumById(id))
  .filter((a): a is Album => Boolean(a));

export const madeByMax = ["p5", "p6", "p9", "p4"]
  .map((id) => albumById(id))
  .filter((a): a is Album => Boolean(a));

export { me, experiences, education, certifications, skills, messagingContacts };
