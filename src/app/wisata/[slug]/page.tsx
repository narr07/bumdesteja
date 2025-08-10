/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";
import { WISATA_DETAIL_QUERY } from "@/sanity/lib/queries";
// import { urlFor } from "@/sanity/lib/image"; // OG image now generated dynamically
import WisataGallery from "@/components/WisataGallery";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
// Import client component directly (it contains its own dynamic imports for Leaflet)
import WisataMap from "@/components/WisataMap";
import type { Metadata } from "next";
export const revalidate = 60;
export async function generateMetadata({
	params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const wisata = await client.fetch(WISATA_DETAIL_QUERY, { slug });
	if (!wisata) {
		return {
			title: "Wisata Tidak Ditemukan",
			description: "",
		};
	}
	// query returns object with name & description
	const title =
	(wisata && "name" in wisata
		? (wisata as { name?: string }).name
		: undefined) ?? "";
	// Safely convert possible Portable Text blocks to plain string for metadata
	const rawDescription = (wisata as any).description;
	const description =
	typeof rawDescription === "string"
		? rawDescription
		: Array.isArray(rawDescription)
			? rawDescription
				.map(
					(block: any) =>
						block?.children
							?.map((child: any) => child.text)
							.filter(Boolean)
							.join(" ")
				)
				.filter(Boolean)
				.join("\n")
			: "";
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: `/wisata/${slug}`,
			images: [
				{
					url: `/wisata/${slug}/opengraph-image`,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [`/wisata/${slug}/opengraph-image`],
		},
	};
}
export default async function WisataDetailPage({
	params,
}: {
  params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const wisata = await client.fetch(WISATA_DETAIL_QUERY, { slug });
	if (!wisata) {
		notFound();
	}
	return (
		<main className="mx-auto max-w-6xl px-4 py-12">
			<h1 className="mb-6 text-4xl font-bold text-lime-600">{wisata.name}</h1>
			<WisataGallery images={wisata.images} name={wisata.name ?? ""} />
			<div className="mb-8 rounded-xl bg-pastel p-6 shadow">
				<ul className="space-y-2 text-sm text-neutral-700 md:text-base">
					<li>
						<span className="font-semibold text-neutral-900">Alamat: </span>
						{wisata.address}
					</li>
					<li>
						<span className="font-semibold text-neutral-900">
              Hari Operasional:{" "}
						</span>
						{wisata.operationalDays}
					</li>
					<li>
						<span className="font-semibold text-neutral-900">
              Jam Operasional:{" "}
						</span>
						{wisata.operationalHours}
					</li>
					<li>
						<span className="font-semibold text-neutral-900">
              Tiket Masuk:{" "}
						</span>
						{wisata.ticketPrice}
					</li>
					{wisata.location?.lat && wisata.location?.lng && (
						<li>
							<span className="font-semibold text-neutral-900">
                Koordinat:{" "}
							</span>
							{wisata.location.lat.toFixed(5)}, {wisata.location.lng.toFixed(5)}
						</li>
					)}
				</ul>
			</div>
			{/* Interactive Map */}
			{wisata.location?.lat && wisata.location?.lng && (
				<section className="mb-10">
					<h2 className="mb-3 text-xl font-semibold text-neutral-900">
            Lokasi di Peta
					</h2>
					<WisataMap
						location={wisata.location}
						showAttribution={false}
						name={wisata.name ?? undefined}
					/>
				</section>
			)}
			{wisata.description && (
				<article className="prose prose-lg max-w-none text-neutral-800">
					<PortableText value={wisata.description} />
				</article>
			)}
		</main>
	);
}
