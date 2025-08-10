/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/UmkmList.tsx
// src/app/umkm/UmkmList.tsx
"use client";
import { useState, useMemo } from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
const sectorOptions = [
	{ title: "Semua Sektor", value: "all" },
	{ title: "Kuliner", value: "kuliner" },
	{ title: "Fashion", value: "fashion" },
	{ title: "Kerajinan", value: "kerajinan" },
	{ title: "Teknologi", value: "teknologi" },
	{ title: "Jasa", value: "jasa" },
	{ title: "Lainnya", value: "lainnya" },
];
export default function UmkmList({ umkmList }: { umkmList: any[] }) {
	const [sector, setSector] = useState("all");
	const filteredList = useMemo(
		() =>
			sector === "all"
				? umkmList
				: umkmList.filter((umkm) => umkm.sector === sector),
		[sector, umkmList]
	);
	return (
		<main className="mx-auto max-w-6xl px-4 pb-20">
			<h1 className="mb-3 text-3xl font-bold text-lime-600 md:text-4xl">
        Daftar UMKM
			</h1>
			<p className="mb-4 text-neutral-700">
        Berikut profil UMKM unggulan Desa Anda:
			</p>
			{/* Dropdown Select */}
			<div className="mb-8">
				<Select value={sector} onValueChange={setSector}>
					<SelectTrigger className="w-[220px]">
						<SelectValue placeholder="Pilih Sektor Usaha..." />
					</SelectTrigger>
					<SelectContent>
						{sectorOptions.map((opt) => (
							<SelectItem key={opt.value} value={opt.value}>
								{opt.title}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			{/* Grid UMKM */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-4">
				{filteredList?.map((umkm, idx) => (
					<Card
						key={idx}
						className="group flex flex-col justify-between rounded-2xl bg-pastel shadow-md transition hover:bg-lemon hover:shadow-lg"
					>
						<CardContent className="flex flex-1 flex-col p-6">
							{umkm.image && (
								<Image
									src={urlFor(umkm.image).width(500).height(300).url()}
									alt={umkm.name}
									width={500}
									height={300}
									className="mb-4 rounded-xl object-cover"
									priority
								/>
							)}
							<h3 className="mb-2 text-lg font-bold text-zaitun">
								{umkm.name}
							</h3>
							<p className="flex-1 text-sm text-neutral-600">
								{umkm.description}
							</p>
							<span className="mt-2 text-xs text-gray-500">{umkm.sector}</span>
						</CardContent>
						<CardFooter className="p-6 pt-0">
							<Button
								asChild
								variant="lemon"
								className="w-full font-semibold text-zaitun transition-colors group-hover:bg-zaitun group-hover:text-lemon"
							>
								<Link href={`/umkm/${umkm.slug}`}>Detail</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	);
}
