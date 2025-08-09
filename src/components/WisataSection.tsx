import Image from "next/image";
export default function WisataSection() {
	return (
		<div>
			<section className="mx-auto  bg-pastel rounded-[40px] ">
				<div className="flex flex-col md:flex-row px-4 py-12 sm:px-6 lg:px-8 items-center md:items-start gap-10 md:gap-16 mx-auto max-w-7xl    md:py-16 w-full">
					{/* Side (Text/CTA) */}
					<div className="w-full md:w-2/5 flex flex-col items-center md:items-start justify-center gap-6">
						<div className="uppercase text-sm font-normal tracking-wide text-neutral-800">
            layanan
						</div>
						<div className="w-full text-center md:text-left text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-800">
            Wisata Desa
						</div>
						<a href="#" className="mt-4 inline-flex h-9 items-center gap-2 rounded-[50px] bg-neutral-800 px-6 py-2 text-base font-normal text-emerald-100 hover:bg-neutral-700 transition">
            Baca Selengkapnya
						</a>
					</div>
					{/* Wisata Cards */}
					<div className="w-full md:w-3/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
						{/* Card 1 */}
						<div className="flex flex-col items-start gap-4">
							<div className="w-full">
								<Image
									alt="wisata"
									width={240}
									height={311}
									src="https://picsum.photos/240/311"
									className="rounded-[20px] object-cover w-full h-64 sm:h-72"
									priority
								/>
							</div>
							<div className="flex flex-col gap-2.5 w-full">
								<div className="text-base font-semibold text-neutral-800">Ciranca</div>
								<div className="text-sm font-normal text-neutral-800">
                With TrailHive, you&apos;ll have access to a comprehensive database of trails, complete with detailed information on ratings, difficulty levels, and user reviews.
								</div>
							</div>
						</div>
						{/* Card 2 */}
						<div className="flex flex-col items-start gap-4">
							<div className="w-full">
								<Image
									alt="wisata"
									width={240}
									height={311}
									src="https://picsum.photos/240/311"
									className="rounded-[20px] object-cover w-full h-64 sm:h-72"
									priority
								/>
							</div>
							<div className="flex flex-col gap-2.5 w-full">
								<div className="text-base font-semibold text-neutral-800">Sawah Bengkok</div>
								<div className="text-sm font-normal text-neutral-800">
                With TrailHive, you&apos;ll have access to a comprehensive database of trails, complete with detailed information on ratings, difficulty levels, and user reviews.
								</div>
							</div>
						</div>
						{/* Card 3 */}
						<div className="flex flex-col items-start gap-4">
							<div className="w-full">
								<Image
									alt="wisata"
									width={240}
									height={311}
									src="https://picsum.photos/240/311"
									className="rounded-[20px] object-cover w-full h-64 sm:h-72"
									priority
								/>
							</div>
							<div className="flex flex-col gap-2.5 w-full">
								<div className="text-base font-semibold text-neutral-800">Access nature</div>
								<div className="text-sm font-normal text-neutral-800">
                With TrailHive, you&apos;ll have access to a comprehensive database of trails, complete with detailed information on ratings, difficulty levels, and user reviews.
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="section-umkm w-full  px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 flex flex-col items-center justify-center">
				<div className="flex flex-col items-center md:items-start justify-center gap-12 sm:gap-16 md:gap-20 max-w-5xl w-full">
					{/* Judul kecil */}
					<div className="text-sm sm:text-base font-normal tracking-wide text-lime-400 uppercase">
          Kata pengunjung
					</div>
					{/* Kutipan */}
					<div className="text-center md:text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-lime-400 leading-snug sm:leading-snug md:leading-snug">
          Pepohonan yang rindang, udara sejuk, dan aliran air yang jernih jadi
          nuansa menenangkan di Situ Ciranca. Tempat ini benar-benar hidden gem
          untuk menenangkan diri dari aktivitas kota.
					</div>
					{/* Nama */}
					<div className="text-lg sm:text-xl md:text-2xl font-bold text-lime-400">
          - John R.
					</div>
				</div>
			</section>
		</div>
	);
}
