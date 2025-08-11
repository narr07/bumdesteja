"use client";
import { useState, useCallback, useRef } from "react";
import useSWR from "swr";
import Image from "next/image";
import { animate } from "animejs";
interface UmkmLikeButtonProps {
  id: string;
  initialLikes: number;
  className?: string;
  size?: "sm" | "md";
}
const fetcher = (url: string) => fetch(url).then((r) => r.json());
export default function UmkmLikeButton({
	id,
	initialLikes,
	className = "",
	size = "sm",
}: UmkmLikeButtonProps) {
	const { data, mutate } = useSWR(
		id ? `/api/umkm-like-count?id=${id}` : null,
		fetcher,
		{ fallbackData: { likes: initialLikes } }
	);
	const [submitting, setSubmitting] = useState(false);
	const [remaining, setRemaining] = useState<number | null>(null);
	const likes = data?.likes ?? initialLikes;
  // Floating particles animation state
  interface Particle {
    id: number;
    // randomized target offsets
    x: number; // final x translate
    y: number; // final (negative) y translate
    rot: number;
    scale: number;
    duration: number;
  }
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const spawnParticle = useCallback(() => {
  	// Respect prefers-reduced-motion
  	if (
  		typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  	)
  		return;
  	const idVal = ++particleIdRef.current;
  	const p: Particle = {
  		id: idVal,
  		x: Math.random() * 60 - 30, // -30 .. 30
  		y: -90 - Math.random() * 60, // -150 .. -180
  		rot: Math.random() * 60 - 30,
  		scale: 0.8 + Math.random() * 0.6,
  		duration: 900 + Math.random() * 500,
  	};
  	setParticles((prev) =>
  		prev.length > 18 ? [...prev.slice(1), p] : [...prev, p]
  	);
  }, []);
  const limitReached = remaining !== null && remaining <= 0;
  const handleLike = useCallback(async () => {
  	if (!id || submitting || limitReached) return;
  	setSubmitting(true);
  	const optimistic = likes + 1;
  	const rollback = data;
  	mutate({ ...data, likes: optimistic }, false);
  	// spawn animation particle (optimistic)
  	spawnParticle();
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
  }, [id, submitting, limitReached, likes, data, mutate, spawnParticle]);
  const sizing =
    size === "md" ? "px-3 py-1.5 text-sm" : "px-2 py-1 text-[11px]";
  // Animation mount per particle (use ref callback so we don't re-run globally)
  const handleParticleRef = (
  	el: HTMLSpanElement | null,
  	particle: Particle
  ) => {
  	if (!el) return;
  	animate(el, {
  		translateX: [0, particle.x],
  		translateY: [0, particle.y],
  		rotate: [0, particle.rot],
  		scale: [1, particle.scale],
  		opacity: [
  			{ to: 1, duration: 50 },
  			{ to: 1, duration: particle.duration * 0.4 },
  			{ to: 0, duration: particle.duration * 0.6 },
  		],
  		duration: particle.duration,
  		ease: "outCubic",
  		onComplete: () => {
  			setParticles((prev) => prev.filter((p) => p.id !== particle.id));
  		},
  	});
  };
  return (
  	<button
  		onClick={handleLike}
  		disabled={submitting || limitReached}
  		className={`relative inline-flex items-center gap-1 overflow-visible rounded-full font-medium shadow transition disabled:opacity-50 ${
  			limitReached
  				? "bg-gray-200 text-gray-500"
  				: "bg-white/70 text-zaitun hover:bg-white"
  		} ${sizing} ${className}`}
  		aria-label="Like UMKM"
  		title={limitReached ? "Batas 10 like / jam tercapai" : "Like"}
  	>
  		{/* Floating particles */}
  		{particles.map((p) => (
  			<span
  				key={p.id}
  				ref={(el) => handleParticleRef(el, p)}
  				className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
  				style={{
  					zIndex: 10,
  				}}
  			>
  				<Image
  					src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Thumbs%20Up.png"
  					alt="Thumbs Up Floating"
  					width={24}
  					height={24}
  					unoptimized
  				/>
  			</span>
  		))}
  		<span role="img" aria-hidden="true">
  			<Image
  				src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Thumbs%20Up.png"
  				alt="Thumbs Up"
  				width={25}
  				height={25}
  			/>
  		</span>
  		{likes}
  	</button>
  );
}
