import { NextRequest, NextResponse } from "next/server";
import { ensureWisataLikeTable, getWisataLikesBulk } from "@/lib/db";
export async function POST(req: NextRequest) {
	try {
		const { ids } = await req.json();
		if (!Array.isArray(ids) || ids.length === 0) {
			return NextResponse.json(
				{ error: "ids array required" },
				{ status: 400 }
			);
		}
		await ensureWisataLikeTable();
		const data = await getWisataLikesBulk(ids.map(String));
		return NextResponse.json({ likes: data });
	} catch {
		return NextResponse.json({ error: "Bulk fetch failed" }, { status: 500 });
	}
}
export function GET() {
	return NextResponse.json(
		{ error: "Use POST with { ids: string[] }" },
		{ status: 405 }
	);
}
