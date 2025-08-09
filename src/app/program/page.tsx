// src/app/components/ProgramSection.tsx
"use client";
import { useEffect, useRef } from "react";
import { animate, createScope } from "animejs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const programList = [
	{
		nama: "Bank Sampah Desa",
		deskripsi: "Pengelolaan sampah untuk ekonomi sirkular dan lingkungan bersih.",
		icon: "♻️",
	},
	{
		nama: "Digitalisasi UMKM",
		deskripsi: "UMKM lokal go digital melalui pelatihan & teknologi.",
		icon: "💻",
	},
	{
		nama: "Taman Edukasi Ciranca",
		deskripsi: "Wisata edukasi untuk anak-anak dan komunitas desa.",
		icon: "🌳",
	},
	{
		nama: "Koperasi Desa Pintar",
		deskripsi: "Produk dan hasil panen dipasarkan lewat koperasi desa.",
		icon: "📈",
	},
];
export default function ProgramSection() {
	const mainRef = useRef<HTMLDivElement>(null);
	const scope = useRef<ReturnType<typeof createScope> | null>(null);
	useEffect(() => {
		scope.current = createScope({ root: mainRef });
		if (mainRef.current) {
			animate(mainRef.current, {
				opacity: [0, 1],
				translateY: [40, 0],
				duration: 900,
				easing: "out(3)",
			});
		}
		return () => scope.current?.revert();
	}, []);
	return (
		<main
			ref={mainRef}
			style={{ padding: 32, opacity: 0 }}
			className="mx-auto max-w-6xl px-4 pb-20"
		>
			<h1 className="text-3xl md:text-4xl font-bold text-lime-500 mb-3">
        Program Bumdes
			</h1>
			<p className="mb-8 text-neutral-700">
        Berikut daftar program unggulan Bumdes Desa Ciranca:
			</p>
			{/* Grid: Mobile 1 kolom, Tablet/Desktop max 2 kolom */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{programList.map((program, idx) => (
					<Card
						key={idx}
						// Tambahkan class `group`
						className="group rounded-2xl shadow-md bg-pastel hover:bg-lemon flex flex-col justify-between hover:shadow-lg transition"
					>
						<CardContent className="p-6 flex-1 flex flex-col">
							<div className="text-4xl mb-4">{program.icon}</div>
							<h3 className="font-bold text-lg mb-2 text-zaitun">
								{program.nama}
							</h3>
							<p className="text-sm text-neutral-600 flex-1">
								{program.deskripsi}
							</p>
						</CardContent>
						<CardFooter className="p-6 pt-0">
							<Button
								variant="lemon"
								className="
            font-semibold text-zaitun 
            transition-colors 
            group-hover:bg-zaitun 
            group-hover:text-lemon
          "
								onClick={() => alert(`Detail ${program.nama}`)}
							>
          Detail
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	);
}
