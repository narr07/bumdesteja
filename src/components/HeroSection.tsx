// src/app/components/HeroSection.tsx
import Image from "next/image";
import { HOME_HERO_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
export default async function HeroSection() {
	// Revalidate setiap 10 detik (ISR)
	const hero = await client.fetch(
		HOME_HERO_QUERY,
		{},
		{
			next: { revalidate: 10 }, // ISR 10 detik
		}
	);
	const imageUrl = hero?.image
		? urlFor(hero.image).height(800).width(800).quality(85).auto("format").url()
		: "https://placehold.co/800x800/png";
	return (
		<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-24 lg:px-8">
			{/* Responsive: teks di atas, gambar di bawah saat mobile;
          teks & gambar sebelahan (split) saat md/desktop */}
			<div className="flex w-full flex-col-reverse items-center justify-between gap-8 md:flex-row">
				{/* Text/CTA */}
				<div className="flex w-full flex-1 flex-col items-center justify-center gap-8 md:items-start">
					<h1 className="w-full text-center text-3xl leading-tight font-black text-lime-400 sm:text-4xl md:text-left md:text-6xl lg:text-7xl">
						{hero?.heading}
					</h1>
					<p className="w-full text-center text-base leading-7 font-normal text-emerald-100 sm:text-lg md:text-left md:text-xl">
						{hero?.subheading}
					</p>
					<div className="flex w-full justify-center md:justify-start">
						<a
							href={hero?.cta?.link}
							className="rounded bg-lemon px-6 py-3 font-semibold text-zaitun shadow transition hover:bg-lemon/80"
						>
							{hero?.cta?.text || "Download the app"}
						</a>
					</div>
				</div>
				{/* Responsive Image */}
				<div className="mb-8 flex w-full flex-1 items-center justify-center md:mb-0 md:justify-end">
					<div className="h-auto w-full max-w-full md:max-w-[500px]">
						<Image
							alt="Hero image"
							src={imageUrl}
							// Ukuran tetap besar dan proporsional, tidak terpotong di desktop
							fill={false}
							width={800} // Untuk performa, bisa 800 px preview (desktop)
							height={800}
							className="
                aspect-square 
                h-auto
                w-full
                max-w-full
                rounded-[20px] 
                object-cover
                md:max-w-[500px] 
              "
							priority
							sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
