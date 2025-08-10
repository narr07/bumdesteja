// src/app/program/[slug]/page.tsx
import { client } from "@/sanity/lib/client";
import { PROGRAM_DETAIL_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
export const revalidate = 60;
export default async function ProgramDetailPage({
	params,
}: {
  params: { slug: string };
}) {
	const { slug } = params;
	const program = await client.fetch(PROGRAM_DETAIL_QUERY, { slug });
	if (!program) {
		notFound();
	}
	return (
		<main className="mx-auto max-w-4xl px-4 py-12">
			{/* Judul */}
			<h1 className="mb-6 text-3xl font-bold text-lime-500 md:text-4xl">
				{program.title ?? ""}
			</h1>
			{/* Gambar utama */}
			{program.image && (
				<div className="mb-6">
					<Image
						src={urlFor(program.image).width(800).height(500).url()}
						alt={program.title ?? ""}
						width={800}
						height={500}
						className="w-full rounded-2xl object-cover"
					/>
				</div>
			)}
			{/* Deskripsi singkat */}
			<p className="mb-8 text-neutral-700">{program.description ?? ""}</p>
			{/* Detail panjang */}
			{program.detail && (
				<article className="prose prose-lg max-w-none">
					<PortableText value={program.detail} />
				</article>
			)}
		</main>
	);
}
