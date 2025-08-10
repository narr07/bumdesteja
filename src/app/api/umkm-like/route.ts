import { NextRequest, NextResponse } from "next/server";
import { ensureLikeTable, incrementLike, ensureLikeEventTable, countRecentLikesByIp, recordLikeEvent } from "@/lib/db";
// Increment like count for a UMKM document
export async function POST(req: NextRequest) {
	try {
		const { id } = await req.json();
		if (!id) {
			return NextResponse.json({ error: "Missing UMKM ID" }, { status: 400 });
		}
		// Rate limit (max 10 likes per IP per hour)
		const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
		await ensureLikeEventTable();
		const recent = await countRecentLikesByIp(ip, 60);
		if (recent >= 10) {
			return NextResponse.json({ error: "Rate limit exceeded (10 likes / hour)" }, { status: 429 });
		}
		await ensureLikeTable();
		const likes = await incrementLike(id);
		await recordLikeEvent(ip, id);
		return NextResponse.json({ likes, remaining: 10 - (recent + 1) });
	} catch (e) {
		console.error("Like increment failed", e);
		return NextResponse.json({ error: "Update failed" }, { status: 500 });
	}
}
// Disallow other methods explicitly (GET can be added if needed)
export function GET() {
	return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
