import type { UMKMItem, WisataItem, ProgramItem } from "./types";
// Simulate server delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export async function getUMKMData(): Promise<UMKMItem[]> {
	await delay(100); // Simulate server delay
	return [
		{
			id: "1",
			name: "Kerajinan Bambu Teja",
			description:
        "Usaha kerajinan bambu yang menghasilkan berbagai produk rumah tangga dan dekorasi dari bambu berkualitas tinggi.",
			image: "/placeholder.svg?height=300&width=400&text=Kerajinan+Bambu",
			category: "Kerajinan",
			owner: "Pak Suharto",
			location: "Desa Teja RT 02/RW 01",
			contact: "0812-3456-7890",
			products: [
				"Keranjang Bambu",
				"Lampu Hias",
				"Furniture Bambu",
				"Souvenir",
			],
			established: "2019",
		},
		{
			id: "2",
			name: "Warung Makan Bu Sari",
			description:
        "Warung makan tradisional yang menyajikan masakan khas Sunda dengan cita rasa autentik dan harga terjangkau.",
			image: "/placeholder.svg?height=300&width=400&text=Warung+Makan",
			category: "Kuliner",
			owner: "Bu Sari",
			location: "Jl. Raya Desa Teja No. 15",
			contact: "0813-2345-6789",
			products: ["Nasi Liwet", "Ayam Bakar", "Ikan Gurame", "Es Cendol"],
			established: "2015",
		},
		{
			id: "3",
			name: "Toko Kelontong Berkah",
			description:
        "Toko kelontong lengkap yang melayani kebutuhan sehari-hari masyarakat desa dengan harga bersaing.",
			image: "/placeholder.svg?height=300&width=400&text=Toko+Kelontong",
			category: "Retail",
			owner: "Pak Ahmad",
			location: "Desa Teja RT 03/RW 02",
			contact: "0814-3456-7891",
			products: ["Sembako", "Alat Tulis", "Obat-obatan", "Pulsa & Token"],
			established: "2018",
		},
		{
			id: "4",
			name: "Peternak Ayam Kampung",
			description:
        "Usaha peternakan ayam kampung yang menghasilkan telur dan daging ayam segar berkualitas tinggi.",
			image: "/placeholder.svg?height=300&width=400&text=Peternakan+Ayam",
			category: "Peternakan",
			owner: "Pak Budi",
			location: "Desa Teja RT 01/RW 03",
			contact: "0815-4567-8902",
			products: [
				"Telur Ayam Kampung",
				"Daging Ayam",
				"Ayam Hidup",
				"Pupuk Kandang",
			],
			established: "2020",
		},
	];
}
export async function getWisataData(): Promise<WisataItem[]> {
	await delay(100);
	return [
		{
			id: "1",
			name: "Situ Ciranca",
			description:
        "Danau alami yang dikelilingi perbukitan hijau, tempat yang sempurna untuk relaksasi dan menikmati keindahan alam.",
			image: "/placeholder.svg?height=300&width=400&text=Situ+Ciranca",
			location: "Desa Teja, Kecamatan Neglasari",
			price: "Rp 10.000",
			facilities: [
				"Area Parkir",
				"Gazebo",
				"Toilet",
				"Warung Makan",
				"Spot Foto",
			],
			openHours: "06:00 - 18:00 WIB",
			rating: 4.5,
		},
		{
			id: "2",
			name: "Sawah Bengkok",
			description:
        "Hamparan sawah terasering yang indah dengan pemandangan gunung di kejauhan, cocok untuk wisata edukasi pertanian.",
			image: "/placeholder.svg?height=300&width=400&text=Sawah+Bengkok",
			location: "Desa Teja, RT 02/RW 01",
			price: "Rp 5.000",
			facilities: [
				"Jalan Setapak",
				"Pondok Istirahat",
				"Toilet",
				"Guide Lokal",
			],
			openHours: "05:00 - 17:00 WIB",
			rating: 4.2,
		},
		{
			id: "3",
			name: "Hutan Pinus Teja",
			description:
        "Hutan pinus yang sejuk dan asri, dilengkapi dengan jalur trekking dan spot camping untuk petualangan alam.",
			image: "/placeholder.svg?height=300&width=400&text=Hutan+Pinus",
			location: "Desa Teja, RT 01/RW 02",
			price: "Rp 15.000",
			facilities: [
				"Jalur Trekking",
				"Area Camping",
				"Fire Camp",
				"Toilet",
				"Mushola",
			],
			openHours: "24 Jam",
			rating: 4.7,
		},
		{
			id: "4",
			name: "Air Terjun Curug Teja",
			description:
        "Air terjun setinggi 25 meter dengan kolam alami di bawahnya, tempat yang sempurna untuk berenang dan bermain air.",
			image: "/placeholder.svg?height=300&width=400&text=Air+Terjun",
			location: "Desa Teja, RT 03/RW 01",
			price: "Rp 12.000",
			facilities: [
				"Kolam Renang Alami",
				"Gazebo",
				"Toilet",
				"Warung",
				"Parkir",
			],
			openHours: "07:00 - 17:00 WIB",
			rating: 4.6,
		},
	];
}
export async function getProgramData(): Promise<ProgramItem[]> {
	await delay(100);
	return [
		{
			id: "1",
			name: "Program Pemberdayaan UMKM",
			description:
        "Program pelatihan dan pendampingan untuk mengembangkan usaha mikro, kecil, dan menengah di Desa Teja.",
			image: "/placeholder.svg?height=300&width=400&text=Program+UMKM",
			type: "Ekonomi",
			duration: "6 Bulan",
			participants: 25,
			status: "active",
			startDate: "2024-01-15",
		},
		{
			id: "2",
			name: "Desa Wisata Berkelanjutan",
			description:
        "Program pengembangan desa wisata yang ramah lingkungan dan berkelanjutan untuk meningkatkan ekonomi masyarakat.",
			image: "/placeholder.svg?height=300&width=400&text=Desa+Wisata",
			type: "Pariwisata",
			duration: "12 Bulan",
			participants: 40,
			status: "active",
			startDate: "2023-08-01",
		},
		{
			id: "3",
			name: "Pelatihan Pertanian Organik",
			description:
        "Program pelatihan teknik pertanian organik untuk meningkatkan kualitas hasil panen dan kesehatan lingkungan.",
			image: "/placeholder.svg?height=300&width=400&text=Pertanian+Organik",
			type: "Pertanian",
			duration: "3 Bulan",
			participants: 30,
			status: "completed",
			startDate: "2023-09-01",
		},
		{
			id: "4",
			name: "Digitalisasi UMKM",
			description:
        "Program pelatihan pemasaran digital dan e-commerce untuk UMKM agar dapat bersaing di era digital.",
			image: "/placeholder.svg?height=300&width=400&text=Digital+Marketing",
			type: "Teknologi",
			duration: "4 Bulan",
			participants: 20,
			status: "upcoming",
			startDate: "2024-03-01",
		},
	];
}
export async function getUMKMById(id: string): Promise<UMKMItem | null> {
	const data = await getUMKMData();
	return data.find((item) => item.id === id) || null;
}
export async function getWisataById(id: string): Promise<WisataItem | null> {
	const data = await getWisataData();
	return data.find((item) => item.id === id) || null;
}
export async function getProgramById(id: string): Promise<ProgramItem | null> {
	const data = await getProgramData();
	return data.find((item) => item.id === id) || null;
}
