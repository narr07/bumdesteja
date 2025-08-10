// src/app/umkm/page.tsx
import { client } from "@/sanity/lib/client";
import { UMKM_LIST_QUERY } from "@/sanity/lib/queries";
import UmkmList from "../../components/UmkmList";
export const revalidate = 60; // ini valid di server!
export default async function UmkmPage() {
	const umkmList = await client.fetch(UMKM_LIST_QUERY);
	return <UmkmList umkmList={umkmList} />;
}
