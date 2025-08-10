/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/sanity/lib/client";
import { WISATA_DETAIL_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
export const revalidate = 60;
export async function generateMetadata(
	{ params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
	const { slug } = await params;
	const wisata = await client.fetch(WISATA_DETAIL_QUERY, { slug });
	if (!wisata) {
		return {
			title: "Wisata Tidak Ditemukan",
			description: "",
		};
	}
	return {
		title: wisata.title ?? "",
		description: wisata.description ?? "",
		openGraph: {
			title: wisata.title ?? "",
			description: wisata.description ?? "",
			url: `/wisata/${slug}`,
			images: wisata.image
				? [
					{
						url: urlFor(wisata.image).width(1200).height(630).url(),
						width: 1200,
						height: 630,
						alt: wisata.title ?? "",
					},
				]
				: [],
		},
		twitter: {
			card: "summary_large_image",
			title: wisata.title ?? "",
			description: wisata.description ?? "",
			images: wisata.image
				? [urlFor(wisata.image).width(800).height(500).url()]
				: [],
		},
	};
}
export default async function WisataDetailPage(
	{ params }: { params: Promise<{ slug: string }> }
) {
	const { slug } = await params;
	const wisata = await client.fetch(WISATA_DETAIL_QUERY, { slug });
	if (!wisata) {
		notFound();
	}
	return (
		<main className="mx-auto max-w-6xl px-4 py-12">
			<h1 className="mb-6 text-4xl font-bold text-lime-600">{wisata.name}</h1>
			{wisata.images && wisata.images.length > 0 && (
				<div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{wisata.images.map((img: any, i: number) => (
						<Image
							key={i}
							src={urlFor(img).width(800).height(500).url()}
							alt={`${wisata.name} - ${i + 1}`}
							width={800}
							height={500}
							className="h-64 w-full rounded-xl object-cover"
							placeholder="blur"
							blurDataURL={img?.asset?.metadata?.lqip}
						/>
					))}
				</div>
			)}
			<div className="mb-8 rounded-xl bg-pastel p-6 shadow">
				<ul className="space-y-2 text-sm text-neutral-700 md:text-base">
					<li>
						<span className="font-semibold text-neutral-900">Alamat: </span>
						{wisata.address}
					</li>
					<li>
						<span className="font-semibold text-neutral-900">Hari Operasional: </span>
						{wisata.operationalDays}
					</li>
					<li>
						<span className="font-semibold text-neutral-900">Jam Operasional: </span>
						{wisata.operationalHours}
					</li>
					<li>
						<span className="font-semibold text-neutral-900">Tiket Masuk: </span>
						{wisata.ticketPrice}
					</li>
				</ul>
			</div>
			{wisata.description && (
				<article className="prose prose-lg max-w-none text-neutral-800">
					<PortableText value={wisata.description} />
				</article>
			)}
		</main>
	);
}
