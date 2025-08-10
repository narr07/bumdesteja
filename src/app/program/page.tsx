/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/program/page.tsx
import { client } from "@/sanity/lib/client";
import { PROGRAM_LIST_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Enable ISR (Incremental Static Regeneration) per 60 detik
export const revalidate = 60;
export default async function ProgramPage() {
	const programs = await client.fetch(PROGRAM_LIST_QUERY);
	return (
		<main className="mx-auto max-w-6xl px-4 pb-20">
			<h1 className="mb-3 text-3xl font-bold text-lime-500 md:text-4xl">
        Program Bumdes
			</h1>
			<p className="mb-8 text-neutral-700">
        Berikut daftar program unggulan Bumdes Desa Ciranca:
			</p>
			{/* Grid 1 kolom mobile, 2 kolom desktop */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{programs?.map((program: any, idx: number) => (
					<Card
						key={idx}
						className="group flex flex-col justify-between rounded-2xl bg-pastel shadow-md transition hover:bg-lemon hover:shadow-lg"
					>
						<CardContent className="flex flex-1 flex-col p-6">
							{program.image && (
								<Image
									src={urlFor(program.image).width(500).height(300).url()}
									alt={program.title}
									width={500}
									height={300}
									className="mb-4 rounded-xl object-cover"
									placeholder="blur"
									blurDataURL={program.image?.asset?.metadata?.lqip}
									priority
								/>
							)}
							<h3 className="mb-2 text-lg font-bold text-zaitun">
								{program.title}
							</h3>
							<p className="flex-1 text-sm text-neutral-600">
								{program.description}
							</p>
						</CardContent>
						<CardFooter className="p-6 pt-0">
							{/* Button styled: warna berubah saat card hover */}
							<Button
								asChild
								variant="lemon"
								className="
    w-full font-semibold
    text-zaitun
    transition-colors
    group-hover:bg-zaitun
    group-hover:text-lemon
  "
							>
								<Link href={`/program/${program.slug}`}>Detail</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	);
}
