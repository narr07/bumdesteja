// src/sanity/schemaTypes/wisataType.ts
// src/sanity/schemaTypes/wisataType.ts
import { defineType, defineField, defineArrayMember } from "sanity";
export const wisataType = defineType({
	name: "wisata",
	title: "Wisata",
	type: "document",
	fields: [
		// Nama Wisata
		defineField({
			name: "name",
			title: "Nama Wisata",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		// Slug (untuk URL /wisata/[slug])
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		// Buka/Tutup Hari
		defineField({
			name: "operationalDays",
			title: "Hari Operasional",
			type: "string",
			description: "Contoh: Senin - Jumat, atau Setiap hari",
		}),
		// Jam buka & tutup
		defineField({
			name: "operationalHours",
			title: "Jam Operasional",
			type: "string",
			description: "Contoh: 08.00 - 17.00 WIB",
		}),
		// Harga tiket masuk
		defineField({
			name: "ticketPrice",
			title: "Tiket Masuk",
			type: "string",
			description: "Contoh: Rp 10.000/orang",
		}),
		// Foto (lebih dari satu)
		defineField({
			name: "images",
			title: "Foto Wisata",
			type: "array",
			of: [
				defineArrayMember({
					type: "image",
					options: {
						hotspot: true,
					},
				}),
			],
		}),
		// Alamat
		defineField({
			name: "address",
			title: "Alamat",
			type: "text",
			rows: 2,
		}),
		// Deskripsi Lengkap
		defineField({
			name: "description",
			title: "Deskripsi",
			type: "array",
			of: [
				defineArrayMember({
					type: "block",
				}),
			],
		}),
	],
});
