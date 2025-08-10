import { client } from "@/sanity/lib/client";
import { UMKM_DETAIL_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
export const revalidate = 30;
export async function generateMetadata(
	{ params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
	const { slug } = await params;
	const umkm = await client.fetch(UMKM_DETAIL_QUERY, { slug });
	if (!umkm) {
		return {
			title: "UMKM Tidak Ditemukan",
			description: "",
		};
	}
	return {
		title: umkm.title ?? "",
		description: umkm.description ?? "",
		openGraph: {
			title: umkm.title ?? "",
			description: umkm.description ?? "",
			url: `/umkm/${slug}`,
			images: umkm.image
				? [
					{
						url: urlFor(umkm.image).width(1200).height(630).url(),
						width: 1200,
						height: 630,
						alt: umkm.title ?? "",
					},
				]
				: [],
		},
		twitter: {
			card: "summary_large_image",
			title: umkm.title ?? "",
			description: umkm.description ?? "",
			images: umkm.image
				? [urlFor(umkm.image).width(800).height(500).url()]
				: [],
		},
	};
}
export default async function UmkmDetailPage(
	{ params }: { params: Promise<{ slug: string }> }
) {
	const { slug } = await params;
	const umkm = await client.fetch(UMKM_DETAIL_QUERY, { slug });
	if (!umkm) {
		notFound();
	}
	return (
		<main className="mx-auto max-w-4xl px-4 py-12">
			<h1 className="text-3xl md:text-4xl font-bold text-lime-500 mb-6">
				{umkm.title}
			</h1>
			{umkm.image && (
				<div className="mb-6">
					<Image
						src={urlFor(umkm.image).width(800).height(500).url()}
						alt={umkm.title ?? "umkm image"}
						width={800}
						height={500}
						className="rounded-2xl object-cover w-full"
						placeholder="blur"
						blurDataURL={umkm.image?.asset?.metadata?.lqip}
					/>
				</div>
			)}
			<p className="text-neutral-700 mb-8">{umkm.description}</p>
			{umkm.detail && (
				<article className="prose prose-lg max-w-none">
					<PortableText value={umkm.detail} />
				</article>
			)}
		</main>
	);
}
