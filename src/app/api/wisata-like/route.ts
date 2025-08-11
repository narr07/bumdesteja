import { NextRequest, NextResponse } from "next/server";
import {
	ensureWisataLikeTable,
	incrementWisataLike,
	ensureWisataLikeEventTable,
	countRecentWisataLikesByIp,
	recordWisataLikeEvent,
} from "@/lib/db";
// Increment like count for a Wisata document
export async function POST(req: NextRequest) {
	try {
		const { id } = await req.json();
		if (!id) {
			return NextResponse.json({ error: "Missing WISATA ID" }, { status: 400 });
		}
		const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
		await ensureWisataLikeEventTable();
		const recent = await countRecentWisataLikesByIp(ip, 60);
		if (recent >= 10) {
			return NextResponse.json(
				{ error: "Rate limit exceeded (10 likes / hour)" },
				{ status: 429 }
			);
		}
		await ensureWisataLikeTable();
		const likes = await incrementWisataLike(id);
		await recordWisataLikeEvent(ip, id);
		return NextResponse.json({ likes, remaining: 10 - (recent + 1) });
	} catch (e) {
		console.error("Wisata like increment failed", e);
		return NextResponse.json({ error: "Update failed" }, { status: 500 });
	}
}
export function GET() {
	return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
