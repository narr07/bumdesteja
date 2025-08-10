// src/app/wisata/page.tsx
import { client } from "@/sanity/lib/client";
import { WISATA_LIST_QUERY } from "@/sanity/lib/queries";
import WisataClient from "../../components/WisataClient";
export const revalidate = 60; // ISR tiap 1 menit
export default async function WisataPage() {
	const wisataList = await client.fetch(WISATA_LIST_QUERY);
	return <WisataClient wisataList={wisataList} />;
}
