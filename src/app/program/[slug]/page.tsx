// src/app/program/[slug]/page.tsx
import { client } from "@/sanity/lib/client";
import { PROGRAM_DETAIL_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
export const revalidate = 60;
// SEO dinamis untuk halaman program detail
export async function generateMetadata({
	params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
	const program = await client.fetch(PROGRAM_DETAIL_QUERY, {
		slug: params.slug,
	});
	if (!program) return {};
	return {
		title: program.title,
		description: program.description,
		openGraph: {
			title: program.title,
			description: program.description,
			images: program.image
				? [
					{
						url: urlFor(program.image).width(800).height(500).url(),
						alt: program.title,
					},
				]
				: [],
		},
		twitter: {
			card: "summary_large_image",
			title: program.title,
			description: program.description,
			images: program.image
				? [urlFor(program.image).width(800).height(500).url()]
				: [],
		},
	};
}
export default async function ProgramDetailPage({
	params,
}: {
  params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const program = await client.fetch(PROGRAM_DETAIL_QUERY, { slug });
	if (!program) {
		notFound();
	}
	return (
		<main className="mx-auto max-w-4xl px-4 py-12">
			<h1 className="mb-6 text-3xl font-bold text-lime-500 md:text-4xl">
				{program.title}
			</h1>
			{program.image && (
				<div className="mb-6">
					<Image
						src={urlFor(program.image).width(800).height(500).url()}
						alt={program.title}
						width={800}
						height={500}
						className="w-full rounded-2xl object-cover"
					/>
				</div>
			)}
			<p className="mb-8 text-neutral-700">{program.description}</p>
			{program.detail && (
				<article className="prose prose-lg max-w-none">
					<PortableText value={program.detail} />
				</article>
			)}
		</main>
	);
}
