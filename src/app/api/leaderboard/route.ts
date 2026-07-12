export type LeaderboardEntry = { name: string; score: number; date: number };

const KEY = "wrapped-leaderboard";
const MAX_ENTRIES = 50;

function redisConfig() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

async function redisCommand(command: (string | number)[]): Promise<unknown> {
  const config = redisConfig();
  if (!config) return null;
  const res = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis error ${res.status}`);
  const data = (await res.json()) as { result: unknown };
  return data.result;
}

const memoryStore: LeaderboardEntry[] = [];

async function readEntries(): Promise<LeaderboardEntry[]> {
  if (!redisConfig()) return [...memoryStore].sort((a, b) => b.score - a.score);
  const raw = (await redisCommand(["ZRANGE", KEY, 0, MAX_ENTRIES - 1, "REV", "WITHSCORES"])) as
    | string[]
    | null;
  if (!raw) return [];
  const entries: LeaderboardEntry[] = [];
  for (let i = 0; i < raw.length; i += 2) {
    const [name, date] = raw[i].split("|");
    entries.push({ name, score: Number(raw[i + 1]), date: Number(date) || 0 });
  }
  return entries;
}

async function addEntry(entry: LeaderboardEntry): Promise<void> {
  if (!redisConfig()) {
    memoryStore.push(entry);
    memoryStore.sort((a, b) => b.score - a.score);
    memoryStore.splice(MAX_ENTRIES);
    return;
  }
  await redisCommand(["ZADD", KEY, entry.score, `${entry.name}|${entry.date}`]);
  await redisCommand(["ZREMRANGEBYRANK", KEY, 0, -(MAX_ENTRIES + 1)]);
}

export async function GET() {
  try {
    const entries = await readEntries();
    return Response.json({ entries: entries.slice(0, 10) });
  } catch {
    return Response.json({ entries: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const { name, score } = (body ?? {}) as { name?: unknown; score?: unknown };
  const cleanName = typeof name === "string" ? name.trim().replace(/[|<>]/g, "").slice(0, 24) : "";
  if (!cleanName) return Response.json({ error: "Name required" }, { status: 400 });
  if (typeof score !== "number" || !Number.isFinite(score) || score < 0 || score > 99999) {
    return Response.json({ error: "Invalid score" }, { status: 400 });
  }
  try {
    await addEntry({ name: cleanName, score: Math.floor(score), date: Date.now() });
    const entries = await readEntries();
    return Response.json({ entries: entries.slice(0, 10) });
  } catch {
    return Response.json({ error: "Storage unavailable" }, { status: 500 });
  }
}
