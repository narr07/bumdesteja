import { client } from "@/sanity/lib/client";
import { PROGRAM_DETAIL_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
export const revalidate = 30;
export default async function ProgramDetailPage(
	{ params }: { params: Promise<{ slug: string }> }
) {
	const { slug } = await params;
	const program = await client.fetch(PROGRAM_DETAIL_QUERY, { slug });
	if (!program) {
		notFound();
	}
	return (
		<main className="mx-auto max-w-4xl px-4 py-12">
			<h1 className="text-3xl md:text-4xl font-bold text-lime-500 mb-6">
				{program.title}
			</h1>
			{program.image && (
				<div className="mb-6">
					<Image
						src={urlFor(program.image).width(800).height(500).url()}
						alt={program.title ?? "Program image"}
						width={800}
						height={500}
						className="rounded-2xl object-cover w-full"
					/>
				</div>
			)}
			<p className="text-neutral-700 mb-8">{program.description}</p>
			{program.detail && (
				<article className="prose prose-lg max-w-none">
					<PortableText value={program.detail} />
				</article>
			)}
		</main>
	);
}
