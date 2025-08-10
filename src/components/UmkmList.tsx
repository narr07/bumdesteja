/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/UmkmList.tsx
"use client";
import { useState, useMemo, useCallback, useEffect } from "react";
import useSWR from "swr";
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
	const [sort, setSort] = useState("newest");
	// Prepare IDs for bulk like fetch
	const ids = useMemo(
		() => umkmList.map((u) => u._id).filter(Boolean),
		[umkmList]
	);
	const { data: bulkLikes, mutate: mutateBulk } = useSWR(
		ids.length ? ["bulk-likes", ids] : null,
		async ([, idList]) => {
			const res = await fetch("/api/umkm-likes-bulk", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ids: idList }),
			});
			return (await res.json()).likes as Record<string, number>;
		},
		{ revalidateOnFocus: true }
	);
	// Compose list with like counts (fallback to initial likes from server if any)
	const enriched = useMemo(
		() =>
			umkmList.map((u) => ({
				...u,
				likeCount: bulkLikes?.[u._id] ?? u.likes ?? 0,
			})),
		[umkmList, bulkLikes]
	);
	const filteredList = useMemo(() => {
		let base =
      sector === "all" ? enriched : enriched.filter((u) => u.sector === sector);
		if (sort === "likes-desc")
			base = [...base].sort((a, b) => b.likeCount - a.likeCount);
		return base;
	}, [sector, sort, enriched]);
	// Lightweight periodic refresh of bulk likes (optional)
	useEffect(() => {
		const t = setInterval(() => {
			mutateBulk();
		}, 30000);
		return () => clearInterval(t);
	}, [mutateBulk]);
	return (
		<main className="mx-auto max-w-6xl px-4 pb-20">
			<h1 className="mb-3 text-3xl font-bold text-lime-600 md:text-4xl">
        Daftar UMKM
			</h1>
			<p className="mb-4 text-neutral-700">
        Berikut profil UMKM unggulan Desa Anda:
			</p>
			{/* Dropdown Select */}
			<div className="mb-8 flex flex-wrap gap-4">
				<div>
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
			{/* Grid UMKM */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-4">
				{filteredList?.map((umkm) => (
					<UmkmCard key={umkm._id ?? umkm.slug} umkm={umkm} />
				))}
			</div>
		</main>
	);
}
// Simple fetcher for SWR
const fetcher = (url: string) => fetch(url).then((r) => r.json());
function UmkmCard({ umkm }: { umkm: any }) {
	return (
		<Card className="group flex flex-col justify-between rounded-2xl bg-pastel shadow-md transition hover:bg-lemon hover:shadow-lg">
			<CardContent className="flex flex-1 flex-col p-6">
				{umkm.image && (
					<Image
						src={urlFor(umkm.image).width(500).height(300).url()}
						alt={umkm.name}
						width={500}
						height={300}
						className="mb-4 rounded-xl object-cover"
						placeholder="blur"
						blurDataURL={umkm.image?.asset?.metadata?.lqip}
						priority
					/>
				)}
				<h3 className="mb-1 text-lg font-bold text-zaitun">{umkm.name}</h3>
				<p className="flex-1 text-sm text-neutral-600">{umkm.description}</p>
				<div className="mt-3 flex items-center justify-between text-xs text-gray-600">
					<span>{umkm.sector}</span>
					<LikeButton
						id={umkm._id}
						initialLikes={umkm.likeCount ?? umkm.likes ?? 0}
					/>
				</div>
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
	);
}
function LikeButton({
	id,
	initialLikes,
}: {
  id: string;
  initialLikes: number;
}) {
	const { data, mutate } = useSWR(
		id ? `/api/umkm-like-count?id=${id}` : null,
		fetcher,
		{ fallbackData: { likes: initialLikes } }
	);
	const [submitting, setSubmitting] = useState(false);
	const likes = data?.likes ?? initialLikes;
	const [remaining, setRemaining] = useState<number | null>(null);
	const limitReached = remaining !== null && remaining <= 0;
	const handleLike = useCallback(async () => {
		if (!id || submitting || limitReached) return;
		setSubmitting(true);
		const optimistic = likes + 1;
		const rollback = data;
		mutate({ ...data, likes: optimistic }, false);
		try {
			const res = await fetch("/api/umkm-like", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id }),
			});
			if (res.status === 429) {
				mutate(rollback, false);
				setRemaining(0);
				setSubmitting(false);
				return;
			}
			const json = await res.json();
			if (json.likes !== undefined) {
				mutate({ likes: json.likes }, false);
				if (typeof json.remaining === "number") setRemaining(json.remaining);
			}
		} catch {
			mutate(rollback, false);
		} finally {
			setSubmitting(false);
		}
	}, [id, submitting, limitReached, likes, data, mutate]);
	return (
		<button
			onClick={handleLike}
			disabled={submitting || limitReached}
			className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium shadow transition disabled:opacity-50 ${
				limitReached
					? "bg-gray-200 text-gray-500"
					: "bg-white/70 text-zaitun hover:bg-white"
			}`}
			aria-label="Like UMKM"
			title={limitReached ? "Batas 10 like / jam tercapai" : "Like"}
		>
			<span role="img" aria-hidden>
        👍
			</span>
			{likes}
		</button>
	);
}
