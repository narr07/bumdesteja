// src/app/components/UmkmSection.tsx
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
const umkmList = [
	{
		nama: "UMKM Ciranca",
		deskripsi:
      "Spesialis tempe organik dengan bahan alami dari desa Ciranca. Cocok untuk semua kalangan.",
		gambar: "https://picsum.photos/240/311?random=1",
	},
	{
		nama: "Warung Sawah Bengkok",
		deskripsi:
      "Kuliner tradisional dengan cita rasa Sunda autentik, masakan dari panen lokal.",
		gambar: "https://picsum.photos/240/311?random=2",
	},
	{
		nama: "Coffee Access Nature",
		deskripsi:
      "Kopi robusta pegunungan, proses roast natural, ambience outdoor alam desa.",
		gambar: "https://picsum.photos/240/311?random=3",
	},
	// Kamu bisa tambah data UMKM lain di sini
];
export default function UmkmSection() {
	return (
		<section className="section-umkm w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center">
			<div className="mb-10 flex flex-col items-center md:items-start justify-center gap-6 max-w-7xl w-full">
				{/* Judul dan deskripsi */}
				<div className="text-sm sm:text-base font-normal tracking-wide text-lime-400 uppercase">
          UMKM Unggulan Desa
				</div>
				<h2 className="text-center md:text-left text-3xl sm:text-4xl md:text-5xl font-bold text-lime-400 leading-tight">
          Jelajahi produk lokal & bisnis kreatif desa kami
				</h2>
			</div>
			{/* CAROUSEL UMKM */}
			<Carousel
				className="w-full max-w-6xl relative"
				opts={{ align: "center", loop: true }}
			>
				<CarouselContent className="">
					{umkmList.map((umkm, idx) => (
						<CarouselItem
							key={idx}
							className="pl-4 md:basis-1/2 lg:basis-1/3"
						>
							<Card className="rounded-[20px] shadow-md overflow-hidden h-full flex flex-col">
								<CardContent className="p-4 flex flex-col items-center">
									<Image
										alt={umkm.nama}
										src={umkm.gambar}
										width={240}
										height={180}
										className="rounded-[16px] w-full h-44 object-cover mb-4"
									/>
									<h3 className="text-lg font-bold text-neutral-800 mb-2 text-center">
										{umkm.nama}
									</h3>
									<p className="text-sm text-neutral-600 text-center mb-2">
										{umkm.deskripsi}
									</p>
									<button className="mt-auto bg-lemon text-zaitun py-1 px-4 rounded-full font-semibold hover:bg-lemon/80 transition">
              Kunjungi
									</button>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
				{/* Tombol navigasi diposisikan di dalam area carousel */}
				<CarouselPrevious
					className="absolute top-1/2 text-zaitun -translate-y-1/2 z-10 left-2 md:-left-12"
				/>
				<CarouselNext
					className="absolute text-zaitun top-1/2 -translate-y-1/2 z-10 right-2 md:-right-12"
				/>
			</Carousel>
		</section>
	);
}
