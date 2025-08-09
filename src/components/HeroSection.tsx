// src/app/components/HeroSection.tsx
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { HOME_HERO_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
export default async function HeroSection() {
	const hero = await client.fetch(HOME_HERO_QUERY);
	const imageUrl = hero?.image
		? urlFor(hero.image).height(800).width(800).quality(85).auto("format").url()
		: "https://placehold.co/800x800/png";
	return (
		<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-24 lg:px-8">
			{/* Responsive: teks di atas, gambar di bawah saat mobile;
          teks & gambar sebelahan (split) saat md/desktop */}
			<div className="flex w-full flex-col-reverse md:flex-row items-center justify-between gap-8">
				{/* Text/CTA */}
				<div className="flex-1 flex flex-col items-center md:items-start justify-center gap-8 w-full">
					<h1 className="w-full text-center md:text-left text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-lime-400 leading-tight">
						{hero?.heading}
					</h1>
					<p className="w-full text-center md:text-left text-base sm:text-lg md:text-xl leading-7 font-normal text-emerald-100">
						{hero?.subheading}
					</p>
					<div className="w-full flex justify-center md:justify-start">
						<a
							href={hero?.cta?.link}
							className="bg-lemon font-semibold text-zaitun px-6 py-3 rounded shadow hover:bg-lemon/80 transition"
						>
							{hero?.cta?.text || "Download the app"}
						</a>
					</div>
				</div>
				{/* Responsive Image */}
				<div className="flex-1 flex items-center justify-center md:justify-end w-full mb-8 md:mb-0">
					<div className="w-full max-w-full md:max-w-[500px] h-auto">
						<Image
							alt="Hero image"
							src={imageUrl}
							// Ukuran tetap besar dan proporsional, tidak terpotong di desktop
							fill={false}
							width={800} // Untuk performa, bisa 800 px preview (desktop)
							height={800}
							className="
                rounded-[20px] 
                aspect-square
                object-cover
                w-full
                max-w-full 
                md:max-w-[500px]
                h-auto 
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
