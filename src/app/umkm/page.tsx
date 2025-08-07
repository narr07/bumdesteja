"use client";
import { useEffect, useRef } from "react";
import { animate, createScope } from "animejs";
export default function UMKM() {
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
		<main ref={mainRef} style={{ padding: 32, opacity: 0 }}>
			<h1>UMKM</h1>
			<p>Halaman informasi UMKM.</p>
		</main>
	);
}
