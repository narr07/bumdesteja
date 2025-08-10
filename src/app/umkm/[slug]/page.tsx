import { client } from "@/sanity/lib/client";
import { UMKM_DETAIL_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import type { Metadata } from "next";
export const revalidate = 60;
export async function generateMetadata({
	params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
	const umkm = await client.fetch(UMKM_DETAIL_QUERY, { slug: params.slug });
	if (!umkm) return {};
	return {
		title: umkm.name,
		description: umkm.description,
		openGraph: {
			title: umkm.name,
			description: umkm.description,
			images: umkm.image
				? [
					{
						url: urlFor(umkm.image).width(800).height(500).url(),
						alt: umkm.name,
					},
				]
				: [],
		},
		twitter: {
			card: "summary_large_image",
			title: umkm.name,
			description: umkm.description,
			images: umkm.image
				? [urlFor(umkm.image).width(800).height(500).url()]
				: [],
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
			<h1 className="mb-6 text-3xl font-bold text-lime-600 md:text-4xl">
				{umkm.name}
			</h1>
			{umkm.image && (
				<div className="mb-6">
					<Image
						src={urlFor(umkm.image).width(800).height(500).url()}
						alt={umkm.name}
						width={800}
						height={500}
						className="w-full rounded-2xl object-cover"
					/>
				</div>
			)}
			<p className="mb-2 text-neutral-700">{umkm.description}</p>
			<span className="mb-4 block text-xs text-gray-500">{umkm.sector}</span>
			{umkm.profile && (
				<article className="prose prose-lg mb-8 max-w-none">
					<PortableText value={umkm.profile} />
				</article>
			)}
			{umkm.contact && (
				<div className="mb-8">
					<h2 className="text-lg font-semibold">Kontak</h2>
					<ul className="text-sm text-neutral-700">
						{umkm.contact.address && <li>Alamat: {umkm.contact.address}</li>}
						{umkm.contact.phone && <li>Telepon: {umkm.contact.phone}</li>}
						{umkm.contact.email && <li>Email: {umkm.contact.email}</li>}
						{umkm.contact.website && <li>Website: {umkm.contact.website}</li>}
					</ul>
				</div>
			)}
		</main>
	);
}
