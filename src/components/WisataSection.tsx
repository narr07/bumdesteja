/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/components/WisataSection.tsx
import { client } from "@/sanity/lib/client";
import { WISATA_THREE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
export const revalidate = 60; // ISR tiap 1 menit
export default async function WisataSection() {
	const wisataList = await client.fetch(WISATA_THREE_QUERY);
	return (
		<div>
			<section className="mx-auto rounded-[40px] bg-pastel">
				<div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-4 py-12 sm:px-6 md:flex-row md:items-start md:gap-16 md:py-16 lg:px-8">
					{/* Side (Text/CTA) */}
					<div className="flex w-full flex-col items-center justify-center gap-6 md:w-2/5 md:items-start">
						<div className="text-sm font-normal tracking-wide text-neutral-800 uppercase">
              layanan
						</div>
						<div className="w-full text-center text-3xl font-semibold text-neutral-800 sm:text-4xl md:text-left lg:text-5xl">
              Wisata Desa
						</div>
						<Link
							href="/wisata"
							className="mt-4 inline-flex h-9 items-center gap-2 rounded-[50px] bg-neutral-800 px-6 py-2 text-base font-normal text-emerald-100 transition hover:bg-neutral-700"
						>
              Baca Selengkapnya
						</Link>
					</div>
					{/* Wisata Cards */}
					<div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:w-3/5 md:grid-cols-3">
						{wisataList.map((wisata: any, idx: number) => (
							<div key={idx} className="flex flex-col items-start gap-4">
								<div className="w-full">
									{wisata.images?.[0] && (
										<Image
											alt={wisata.name}
											width={240}
											height={311}
											src={urlFor(wisata.images[0])
												.width(240)
												.height(311)
												.url()}
											className="h-64 w-full rounded-[20px] object-cover sm:h-72"
											priority
										/>
									)}
								</div>
								<div className="flex w-full flex-col gap-2.5">
									<div className="text-base font-semibold text-neutral-800">
										{wisata.name}
									</div>
									<div className="line-clamp-3 text-sm font-normal text-neutral-800">
										{wisata.description
											? (wisata.description[0]?.children?.[0]?.text ?? "")
											: ""}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			{/* Testimonial Section (Tetap) */}
			<section className="section-umkm flex w-full flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
				<div className="flex w-full max-w-5xl flex-col items-center justify-center gap-12 sm:gap-16 md:items-start md:gap-20">
					<div className="text-sm font-normal tracking-wide text-lime-400 uppercase sm:text-base">
            Kata pengunjung
					</div>
					<div className="text-center text-2xl leading-snug font-bold text-lime-400 sm:text-3xl sm:leading-snug md:text-left md:text-4xl md:leading-snug lg:text-5xl">
            Pepohonan yang rindang, udara sejuk, dan aliran air yang jernih jadi
            nuansa menenangkan di Situ Ciranca. Tempat ini benar-benar hidden
            gem untuk menenangkan diri dari aktivitas kota.
					</div>
					<div className="text-lg font-bold text-lime-400 sm:text-xl md:text-2xl">
            - John R.
					</div>
				</div>
			</section>
		</div>
	);
}
