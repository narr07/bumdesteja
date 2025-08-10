/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/wisata/WisataClient.tsx
"use client";
import { useEffect, useRef } from "react";
import { animate, createScope } from "animejs";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function WisataClient({ wisataList }: { wisataList: any[] }) {
	const mainRef = useRef<HTMLDivElement>(null);
	const scope = useRef<ReturnType<typeof createScope> | null>(null);
	useEffect(() => {
		scope.current = createScope({ root: mainRef });
		if (mainRef.current) {
			animate(mainRef.current, {
				opacity: [0, 1],
				translateY: [40, 0],
				duration: 900,
				easing: "easeOutQuad",
			});
		}
		return () => scope.current?.revert();
	}, []);
	return (
		<main ref={mainRef} style={{ padding: 32, opacity: 0 }}>
			<h1 className="mb-3 text-3xl font-bold text-lime-600 md:text-4xl">
        Wisata Desa
			</h1>
			<p className="mb-8 text-neutral-700">
        Jelajahi berbagai wisata unggulan desa kami:
			</p>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				{wisataList?.map((item, idx) => (
					<Card
						key={idx}
						className="group flex flex-col rounded-2xl bg-white shadow-md transition hover:bg-lemon hover:shadow-lg"
					>
						<CardContent className="flex flex-1 flex-col p-4">
							{item.images?.[0] && (
								<Image
									src={urlFor(item.images[0]).width(500).height(300).url()}
									alt={item.name}
									width={500}
									height={300}
									className="mb-4 rounded-xl object-cover"
								/>
							)}
							<h3 className="mb-2 text-lg font-bold text-zaitun">
								{item.name}
							</h3>
							<p className="text-sm text-gray-600">{item.address}</p>
							<p className="mt-1 text-xs text-gray-500">
								{item.operationalDays} • {item.operationalHours}
							</p>
							<p className="mt-2 text-sm font-semibold text-lime-600">
								{item.ticketPrice}
							</p>
						</CardContent>
						<CardFooter className="p-4 pt-0">
							<Button
								asChild
								variant="lemon"
								className="w-full font-semibold text-zaitun group-hover:bg-zaitun group-hover:text-lemon"
							>
								<Link href={`/wisata/${item.slug}`}>Detail</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	);
}
