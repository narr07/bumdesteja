import { neon } from "@neondatabase/serverless";
import crypto from "crypto";
// Lazy singleton
let _sql: ReturnType<typeof neon> | null = null;
export function getSql() {
	if (!_sql) {
		const url = process.env.DATABASE_URL;
		if (!url) throw new Error("Missing DATABASE_URL env var");
		_sql = neon(url);
	}
	return _sql;
}
export async function ensureLikeTable() {
	const sql = getSql();
	await sql`CREATE TABLE IF NOT EXISTS umkm_likes (
		umkm_id text primary key,
		likes integer not null default 0,
		updated_at timestamptz not null default now()
	)`;
}
// Table for rate limiting like events per IP (hashed or plain)
export async function ensureLikeEventTable() {
	const sql = getSql();
	await sql`CREATE TABLE IF NOT EXISTS umkm_like_events (
		id bigserial primary key,
		ip text not null,
		umkm_id text not null,
		created_at timestamptz not null default now()
	)`;
	// Optional index to speed up lookups by IP + time window
	await sql`CREATE INDEX IF NOT EXISTS umkm_like_events_ip_created_at_idx ON umkm_like_events (ip, created_at DESC)`;
}
export interface LikeRow {
  likes: number;
}
export async function incrementLike(umkmId: string) {
	const sql = getSql();
	const rows =
    (await sql`INSERT INTO umkm_likes (umkm_id, likes) VALUES (${umkmId}, 1)
		ON CONFLICT (umkm_id) DO UPDATE SET likes = umkm_likes.likes + 1, updated_at = now()
		RETURNING likes`) as unknown as LikeRow[];
	return rows[0].likes;
}
export async function getLike(umkmId: string) {
	const sql = getSql();
	const rows =
    (await sql`SELECT likes FROM umkm_likes WHERE umkm_id = ${umkmId}`) as unknown as LikeRow[];
	return rows[0]?.likes ?? 0;
}
export async function getLikesBulk(ids: string[]) {
	if (ids.length === 0) return {} as Record<string, number>;
	const sql = getSql();
	// Using ANY requires array cast; neon parameter interpolation handles this automatically
	const rows =
    (await sql`SELECT umkm_id, likes FROM umkm_likes WHERE umkm_id = ANY(${ids}::text[])`) as unknown as {
      umkm_id: string;
      likes: number;
    }[];
	return rows.reduce<Record<string, number>>((acc, r) => {
		acc[r.umkm_id] = r.likes;
		return acc;
	}, {});
}
export async function countRecentLikesByIp(ip: string, windowMinutes = 60) {
	const sql = getSql();
	const rows =
    (await sql`SELECT count(*)::int AS cnt FROM umkm_like_events WHERE ip = ${ip} AND created_at > now() - (${windowMinutes}::text || ' minutes')::interval`) as unknown as {
      cnt: number;
    }[];
	return rows[0]?.cnt ?? 0;
}
export async function recordLikeEvent(ip: string, umkmId: string) {
	const sql = getSql();
	await sql`INSERT INTO umkm_like_events (ip, umkm_id) VALUES (${ip}, ${umkmId})`;
}
// ================= WISATA LIKE SYSTEM (separate tables) =================
export async function ensureWisataLikeTable() {
	const sql = getSql();
	await sql`CREATE TABLE IF NOT EXISTS wisata_likes (
		wisata_id text primary key,
		likes integer not null default 0,
		updated_at timestamptz not null default now()
	)`;
}
export async function ensureWisataLikeEventTable() {
	const sql = getSql();
	await sql`CREATE TABLE IF NOT EXISTS wisata_like_events (
		id bigserial primary key,
		ip text not null,
		wisata_id text not null,
		created_at timestamptz not null default now()
	)`;
	await sql`CREATE INDEX IF NOT EXISTS wisata_like_events_ip_created_at_idx ON wisata_like_events (ip, created_at DESC)`;
}
export async function incrementWisataLike(wisataId: string) {
	const sql = getSql();
	const rows =
    (await sql`INSERT INTO wisata_likes (wisata_id, likes) VALUES (${wisataId}, 1)
		ON CONFLICT (wisata_id) DO UPDATE SET likes = wisata_likes.likes + 1, updated_at = now()
		RETURNING likes`) as unknown as LikeRow[];
	return rows[0].likes;
}
export async function getWisataLike(wisataId: string) {
	const sql = getSql();
	const rows =
    (await sql`SELECT likes FROM wisata_likes WHERE wisata_id = ${wisataId}`) as unknown as LikeRow[];
	return rows[0]?.likes ?? 0;
}
export async function getWisataLikesBulk(ids: string[]) {
	if (ids.length === 0) return {} as Record<string, number>;
	const sql = getSql();
	const rows =
    (await sql`SELECT wisata_id, likes FROM wisata_likes WHERE wisata_id = ANY(${ids}::text[])`) as unknown as {
      wisata_id: string;
      likes: number;
    }[];
	return rows.reduce<Record<string, number>>((acc, r) => {
		acc[r.wisata_id] = r.likes;
		return acc;
	}, {});
}
export async function countRecentWisataLikesByIp(
	ip: string,
	windowMinutes = 60
) {
	const sql = getSql();
	const rows =
    (await sql`SELECT count(*)::int AS cnt FROM wisata_like_events WHERE ip = ${ip} AND created_at > now() - (${windowMinutes}::text || ' minutes')::interval`) as unknown as {
      cnt: number;
    }[];
	return rows[0]?.cnt ?? 0;
}
export async function recordWisataLikeEvent(ip: string, wisataId: string) {
	const sql = getSql();
	await sql`INSERT INTO wisata_like_events (ip, wisata_id) VALUES (${ip}, ${wisataId})`;
}
// ================= VISITOR TRACKING =================
// ================= VISITOR TRACKING =================
// Table structure:
// visits (ip_hash text, visit_date date, first_seen_at timestamptz, primary key (ip_hash, visit_date))
// We store only the hashed IP to respect privacy.
export interface VisitorCounts {
  today: number; // unique visitors today
  total: number; // total unique visitors (all time)
}
export async function ensureVisitTable() {
	const sql = getSql();
	await sql`CREATE TABLE IF NOT EXISTS visits (
		ip_hash text NOT NULL,
		visit_date date NOT NULL,
		first_seen_at timestamptz NOT NULL DEFAULT now(),
		PRIMARY KEY (ip_hash, visit_date)
	)`;
	// Helpful indexes (created automatically for PK). Additional index for querying total distinct not required.
}
function hashIp(ip: string) {
	return crypto.createHash("sha256").update(ip).digest("hex");
}
export async function trackVisit(ip: string | null | undefined) {
	await ensureVisitTable();
	const sql = getSql();
	const rawIp = (ip || "0.0.0.0").trim();
	const ipHash = hashIp(rawIp);
	// Insert one row per ip per day; ignore if already exists today.
	await sql`INSERT INTO visits (ip_hash, visit_date) VALUES (${ipHash}, current_date)
		ON CONFLICT (ip_hash, visit_date) DO NOTHING`;
}
export async function getVisitorCounts(): Promise<VisitorCounts> {
	await ensureVisitTable();
	const sql = getSql();
	const todayRows =
    (await sql`SELECT count(*)::int AS c FROM visits WHERE visit_date = current_date`) as unknown as {
      c: number;
    }[];
	const totalRows =
    (await sql`SELECT count(DISTINCT ip_hash)::int AS c FROM visits`) as unknown as {
      c: number;
    }[];
	return { today: todayRows[0]?.c ?? 0, total: totalRows[0]?.c ?? 0 };
}
export async function trackVisitAndGetCounts(
	ip: string | null | undefined
): Promise<VisitorCounts> {
	await trackVisit(ip);
	return getVisitorCounts();
}
