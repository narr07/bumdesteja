// src/app/program/page.tsx
import { client } from "@/sanity/lib/client";
import { PROGRAM_LIST_QUERY } from "@/sanity/lib/queries";
import ProgramGrid from "@/components/ProgramGrid";
// Enable ISR (Incremental Static Regeneration) per 60 detik
export const revalidate = 60;
export default async function ProgramPage() {
	const rawPrograms = await client.fetch(PROGRAM_LIST_QUERY);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const programs = (rawPrograms || []).map((p: any) => ({
		title: p.title ?? "(Tanpa Judul)",
		description: p.description ?? "",
		slug: p.slug ?? "",
		image: p.image,
	}));
	return (
		<main className="mx-auto max-w-6xl px-4 pb-20">
			<h1 className="mb-3 text-3xl font-bold text-lime-500 md:text-4xl">
        Program Bumdes
			</h1>
			<p className="mb-8 text-neutral-700">
        Berikut daftar program unggulan Bumdes Desa Ciranca:
			</p>
			<ProgramGrid programs={programs} />
		</main>
	);
}
