import { client } from "@/sanity/lib/client";
import { UMKM_DETAIL_QUERY } from "@/sanity/lib/queries";
// import { urlFor } from "@/sanity/lib/image"; // dynamic OG image provided
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image"; // still used for main image display
export const revalidate = 30;
export async function generateMetadata({
	params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const umkm = await client.fetch(UMKM_DETAIL_QUERY, { slug });
	if (!umkm) {
		return {
			title: "UMKM Tidak Ditemukan",
			description: "",
		};
	}
	const title =
    (umkm && "name" in umkm ? (umkm as { name?: string }).name : undefined) ??
    "";
	return {
		title,
		description: umkm.description ?? "",
		openGraph: {
			title,
			description: umkm.description ?? "",
			url: `/umkm/${slug}`,
			images: [
				{
					url: `/umkm/${slug}/opengraph-image`,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description: umkm.description ?? "",
			images: [`/umkm/${slug}/opengraph-image`],
		},
	};
}
export default async function UmkmDetailPage({
	params,
}: {
  params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const umkm = await client.fetch(UMKM_DETAIL_QUERY, { slug });
	if (!umkm) {
		notFound();
	}
	return (
		<main className="mx-auto max-w-4xl px-4 py-12">
			<h1 className="mb-6 text-3xl font-bold text-lime-500 md:text-4xl">
				{umkm.name}
			</h1>
			{umkm.image && (
				<div className="mb-6">
					<Image
						src={urlFor(umkm.image).width(800).height(500).url()}
						alt={umkm.name ?? "UMKM image"}
						width={800}
						height={500}
						className="w-full rounded-2xl object-cover"
						placeholder="blur"
						blurDataURL={umkm.image?.asset?.metadata?.lqip ?? undefined}
					/>
				</div>
			)}
			<p className="mb-8 text-neutral-700">{umkm.description}</p>
			{umkm.profile && (
				<article className="prose prose-lg max-w-none">
					<PortableText value={umkm.profile} />
				</article>
			)}
		</main>
	);
}
