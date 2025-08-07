import Image from "next/image";
export default function WisataSection() {
	return (
		<div className="section-wisata items-startoverflow-hidden inline-flex w-full justify-center rounded-[40px] bg-pastel py-16">
			<div className="flex items-start justify-start">
				<div className="inline-flex flex-col items-start justify-start">
					<div className="flex flex-col items-start justify-start gap-6 self-stretch">
						<div className="justify-center text-sm leading-tight font-normal tracking-wide text-neutral-800 uppercase">
              layanan
						</div>
						<div className="w-60 justify-start text-4xl leading-10 font-semibold text-neutral-800">
              Wisata Desa
						</div>
						<div className="inline-flex h-9 items-center justify-center gap-2 rounded-[50px] bg-neutral-800 px-5 py-2 outline-1 outline-neutral-800">
							<div className="justify-start text-base leading-normal font-normal text-emerald-100">
                Baca Selengkapnya
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-1 items-start justify-evenly gap-8">
					<div className="flex flex-1 items-start justify-between gap-8 self-stretch">
						<div className="inline-flex flex-col items-start justify-start gap-4">
							<div className="inline-flex w-60 items-start justify-start">
								<Image
									alt="wisata"
									width={240}
									height={311}
									className="h-80 w-60 rounded-[20px]"
									src="https://picsum.photos/240/311"
								/>
							</div>
							<div className="flex w-60 flex-col items-start justify-start gap-2.5">
								<div className="justify-start self-stretch text-base leading-tight font-semibold text-neutral-800">
                  Ciranca
								</div>
								<div className="justify-center self-stretch text-sm leading-snug font-normal text-neutral-800">
                  With TrailHive, youll have access to a comprehensive database
                  of trails, complete with detailed information on ratings,
                  difficulty levels, and user reviews.{" "}
								</div>
							</div>
						</div>
						<div className="inline-flex flex-col items-start justify-start gap-4">
							<div className="inline-flex w-60 items-start justify-start">
								<Image
									alt="wisata"
									width={240}
									height={311}
									className="h-80 w-60 rounded-[20px]"
									src="https://picsum.photos/240/311"
								/>
							</div>
							<div className="flex w-60 flex-col items-start justify-start gap-2.5">
								<div className="justify-start self-stretch text-base leading-tight font-semibold text-neutral-800">
                  Sawah Bengkok
								</div>
								<div className="justify-center self-stretch text-sm leading-snug font-normal text-neutral-800">
                  With TrailHive, youll have access to a comprehensive database
                  of trails, complete with detailed information on ratings,
                  difficulty levels, and user reviews.{" "}
								</div>
							</div>
						</div>
						<div className="inline-flex flex-col items-start justify-start gap-4">
							<div className="inline-flex w-60 items-start justify-start">
								<Image
									alt="wisata"
									width={240}
									height={311}
									className="h-80 w-60 rounded-[20px]"
									src="https://picsum.photos/240/311"
								/>
							</div>
							<div className="flex w-60 flex-col items-start justify-start gap-2.5">
								<div className="justify-start self-stretch text-base leading-tight font-semibold text-neutral-800">
                  Access nature
								</div>
								<div className="justify-center self-stretch text-sm leading-snug font-normal text-neutral-800">
                  With TrailHive, youll have access to a comprehensive database
                  of trails, complete with detailed information on ratings,
                  difficulty levels, and user reviews.{" "}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
