import { NextRequest, NextResponse } from "next/server";
import { getWisataLike, ensureWisataLikeTable } from "@/lib/db";
export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	if (!id)
		return NextResponse.json({ error: "Missing WISATA ID" }, { status: 400 });
	try {
		await ensureWisataLikeTable();
		const likes = await getWisataLike(id);
		return NextResponse.json({ likes });
	} catch {
		return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
	}
}
