import { NextRequest, NextResponse } from "next/server";
import { getLike, ensureLikeTable } from "@/lib/db";
export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	if (!id) return NextResponse.json({ error: "Missing UMKM ID" }, { status: 400 });
	try {
		await ensureLikeTable();
		const likes = await getLike(id);
		return NextResponse.json({ likes });
	} catch {
		return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
	}
}
