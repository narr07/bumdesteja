// src/app/components/HeroSection.tsx (atau path sesuai proyekmu)
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { HOME_HERO_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
export default async function HeroSection() {
	// Fetch data Sanity
	const hero = await client.fetch(HOME_HERO_QUERY);
	const imageUrl = hero?.image
		? urlFor(hero.image)
			.height(500)
			.width(500)
			.quality(80)
			.auto("format")
			.url()
		: "https://placehold.co/550x310/png";
	return (
		<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-24 lg:px-8">
			<div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row">
				{/* grid1 */}
				<div className="flex flex-1 flex-col items-start justify-start gap-6">
					<div className="flex flex-col items-start justify-start gap-6 self-stretch">
						<h1 className="justify-start self-stretch text-7xl leading-[68px] font-bold text-balance text-lime-400">
							{hero?.heading}
						</h1>
						<p className="flex-1 justify-center text-lg leading-7 font-normal text-balance text-emerald-100">
							{hero?.subheading}
						</p>
					</div>
					<div className="justify-start text-base leading-normal font-semibold text-neutral-800">
						<a href={hero?.cta?.link} className="bg-lemon font-semibold text-zaitun px-4 py-2 rounded">
							{hero?.cta?.text || "Download the app"}
						</a>
					</div>
				</div>
				{/* grid2 */}
				<div className="flex flex-1 items-center justify-end">
					<div className="hover:rotate-1 transition-transform duration-300 ease-in-out">
						{hero?.image && (
          						<Image
          							alt="Hero image"
          							width={500}
          							height={500}
          							className="rounded-[20px] aspect-square object-cover"
          							src={imageUrl}
          						/>
          					)}
					</div>
				</div>
			</div>
		</div>
	);
}
