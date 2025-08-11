"use client";
import { useEffect } from "react";
import { animate, stagger } from "animejs";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
interface ProgramItem {
  title: string;
  description?: string;
  slug: string;
  image?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
interface ProgramGridProps {
  programs: ProgramItem[];
}
export default function ProgramGrid({ programs }: ProgramGridProps) {
	useEffect(() => {
		const cards = document.querySelectorAll<HTMLElement>(".program-card");
		if (!cards.length) return;
		// If user prefers reduced motion, tampilkan langsung
		if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			cards.forEach(c => {
				c.style.opacity = "1";
				c.style.transform = "translateY(0) scale(1)";
			});
			return;
		}
		animate(cards, {
			opacity: ["0", "1"],
			y: ["50", "0"],
			ease: "inOutQuart",
			duration: 400,
			delay: stagger(90, { start: 100 }),
		});
	}, []);
	if (!programs?.length) {
		return <p className="text-sm text-neutral-500">Belum ada program.</p>;
	}
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
			{programs.map((program, idx) => (
				<Card
					key={idx}
					className="program-card group flex flex-col justify-between rounded-2xl bg-pastel opacity-0 translate-y-6 scale-[0.96] will-change-transform shadow-md transition hover:bg-lemon hover:shadow-lg"
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
						<h3 className="mb-2 text-lg font-bold text-zaitun">{program.title}</h3>
						<p className="flex-1 text-sm text-neutral-600">{program.description}</p>
					</CardContent>
					<CardFooter className="p-6 pt-0">
						<Button
							asChild
							variant="lemon"
							className="w-full font-semibold text-zaitun transition-colors group-hover:bg-zaitun group-hover:text-lemon"
						>
							<Link href={`/program/${program.slug}`}>Detail</Link>
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
