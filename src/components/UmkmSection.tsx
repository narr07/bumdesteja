/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/components/UmkmSection.tsx
import { client } from "@/sanity/lib/client";
import { UMKM_THREE_QUERY } from "@/sanity/lib/queries";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
// Tambahkan revalidate kalau mau data tetap fresh tiap 1 menit
export const revalidate = 60;
export default async function UmkmSection() {
	const umkmList = await client.fetch(UMKM_THREE_QUERY);
	return (
		<section className="section-umkm flex w-full flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
			<div className="mb-10 flex w-full max-w-7xl flex-col items-center justify-center gap-6 md:items-start">
				<div className="text-sm font-normal tracking-wide text-lime-400 uppercase sm:text-base">
          UMKM Unggulan Desa
				</div>
				<h2 className="text-center text-3xl leading-tight font-bold text-lime-400 sm:text-4xl md:text-left md:text-5xl">
          Jelajahi produk lokal & bisnis kreatif desa kami
				</h2>
			</div>
			{/* CAROUSEL UMKM */}
			<Carousel
				className="relative w-full max-w-6xl"
				opts={{ align: "center", loop: true }}
			>
				<CarouselContent>
					{umkmList?.map((umkm: any, idx: number) => (
						<CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
							<Card className="flex h-full flex-col overflow-hidden rounded-[20px] shadow-md">
								<CardContent className="flex flex-col items-center p-4">
									{umkm.image && (
										<Image
											alt={umkm.name}
											src={urlFor(umkm.image).width(240).height(180).url()}
											width={240}
											height={180}
											className="mb-4 h-44 w-full rounded-[16px] object-cover"
										/>
									)}
									<h3 className="mb-2 text-center text-lg font-bold text-neutral-800">
										{umkm.name}
									</h3>
									<p className="mb-2 text-center text-sm text-neutral-600">
										{umkm.description}
									</p>
									<Link href={`/umkm/${umkm.slug}`} className="mt-auto">
										<button className="rounded-full bg-lemon px-4 py-1 font-semibold text-zaitun transition hover:bg-lemon/80">
                      Kunjungi
										</button>
									</Link>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="absolute top-1/2 left-2 z-10 -translate-y-1/2 text-zaitun md:-left-12" />
				<CarouselNext className="absolute top-1/2 right-2 z-10 -translate-y-1/2 text-zaitun md:-right-12" />
			</Carousel>
		</section>
	);
}
