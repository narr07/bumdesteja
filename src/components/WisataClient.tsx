/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/wisata/WisataClient.tsx
"use client";
import { useEffect, useRef, useMemo, useState } from "react";
import useSWR from "swr";
import { animate, createScope } from "animejs";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WisataLikeButton from "./WisataLikeButton";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
export default function WisataClient({ wisataList }: { wisataList: any[] }) {
	const mainRef = useRef<HTMLDivElement>(null);
	const scope = useRef<ReturnType<typeof createScope> | null>(null);
	// Bulk like counts (DB) similar to UMKM implementation
	const ids = useMemo(
		() => wisataList.map((w) => w._id).filter(Boolean),
		[wisataList]
	);
	const { data: bulkLikes, mutate } = useSWR(
		ids.length ? ["wisata-bulk-likes", ids] : null,
		async ([, idList]) => {
			const res = await fetch("/api/wisata-likes-bulk", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ids: idList }),
			});
			return (await res.json()).likes as Record<string, number>;
		}
	);
	useEffect(() => {
		if (!ids.length) return;
		const t = setInterval(() => mutate(), 30000);
		return () => clearInterval(t);
	}, [ids, mutate]);
	// Sorting state (default newest = original order)
	const [sort, setSort] = useState("newest");
	const enriched = useMemo(
		() => wisataList.map((w) => ({ ...w, likeCount: bulkLikes?.[w._id] ?? 0 })),
		[wisataList, bulkLikes]
	);
	const displayed = useMemo(() => {
		if (sort === "likes-desc")
			return [...enriched].sort((a, b) => b.likeCount - a.likeCount);
		return enriched; // original order already newest
	}, [sort, enriched]);
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
			<p className="mb-4 text-neutral-700">
        Jelajahi berbagai wisata unggulan desa kami:
			</p>
			<div className="mb-8 flex flex-wrap gap-4">
				<div>
					<Select value={sort} onValueChange={setSort}>
						<SelectTrigger className="w-[200px]">
							<SelectValue placeholder="Urutkan" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="newest">Terbaru</SelectItem>
							<SelectItem value="likes-desc">Terbanyak Disukai</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				{displayed?.map((item, idx) => {
					const likeCount = item.likeCount;
					return (
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
										placeholder="blur"
										blurDataURL={item.images[0]?.asset?.metadata?.lqip}
									/>
								)}
								<div className="mb-2 flex items-center justify-between gap-2">
									<h3 className="line-clamp-1 text-lg font-bold text-zaitun">
										{item.name}
									</h3>
									{item._id && (
										<WisataLikeButton id={item._id} initialLikes={likeCount} />
									)}
								</div>
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
					);
				})}
			</div>
		</main>
	);
}
