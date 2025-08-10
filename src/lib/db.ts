import { neon } from "@neondatabase/serverless";
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
export interface LikeRow { likes: number }
export async function incrementLike(umkmId: string) {
	const sql = getSql();
	const rows = (await sql`INSERT INTO umkm_likes (umkm_id, likes) VALUES (${umkmId}, 1)
		ON CONFLICT (umkm_id) DO UPDATE SET likes = umkm_likes.likes + 1, updated_at = now()
		RETURNING likes`) as unknown as LikeRow[];
	return rows[0].likes;
}
export async function getLike(umkmId: string) {
	const sql = getSql();
	const rows = (await sql`SELECT likes FROM umkm_likes WHERE umkm_id = ${umkmId}`) as unknown as LikeRow[];
	return rows[0]?.likes ?? 0;
}
export async function getLikesBulk(ids: string[]) {
	if (ids.length === 0) return {} as Record<string, number>;
	const sql = getSql();
	// Using ANY requires array cast; neon parameter interpolation handles this automatically
	const rows = (await sql`SELECT umkm_id, likes FROM umkm_likes WHERE umkm_id = ANY(${ids}::text[])`) as unknown as { umkm_id: string; likes: number }[];
	return rows.reduce<Record<string, number>>((acc, r) => {
		acc[r.umkm_id] = r.likes;
		return acc;
	}, {});
}
export async function countRecentLikesByIp(ip: string, windowMinutes = 60) {
	const sql = getSql();
	const rows = (await sql`SELECT count(*)::int AS cnt FROM umkm_like_events WHERE ip = ${ip} AND created_at > now() - (${windowMinutes}::text || ' minutes')::interval`) as unknown as { cnt: number }[];
	return rows[0]?.cnt ?? 0;
}
export async function recordLikeEvent(ip: string, umkmId: string) {
	const sql = getSql();
	await sql`INSERT INTO umkm_like_events (ip, umkm_id) VALUES (${ip}, ${umkmId})`;
}
