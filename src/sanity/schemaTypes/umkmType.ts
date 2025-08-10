// src/sanity/schemaTypes/umkmType.ts
import { defineType, defineField, defineArrayMember } from "sanity";
export const umkmType = defineType({
	name: "umkm",
	title: "UMKM",
	type: "document",
	fields: [
		// Foto/logo UMKM
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			options: { hotspot: true },
		}),
		// Nama UMKM
		defineField({
			name: "name",
			title: "Name",
			type: "string",
		}),
		// Slug untuk halaman detail (umkm/[slug])
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: { source: "name", maxLength: 96 },
		}),
		// Deskripsi singkat
		defineField({
			name: "description",
			title: "Description",
			type: "text",
		}),
		// Detail profil (rich text)
		defineField({
			name: "profile",
			title: "Profile Detail",
			type: "array",
			of: [
				defineArrayMember({
					type: "block",
				}),
			],
		}),
		// Kontak UMKM
		defineField({
			name: "contact",
			title: "Contact",
			type: "object",
			fields: [
				defineField({
					name: "address",
					title: "Address",
					type: "string",
				}),
				defineField({
					name: "phone",
					title: "Phone",
					type: "string",
				}),
				defineField({
					name: "email",
					title: "Email",
					type: "string",
				}),
				defineField({
					name: "website",
					title: "Website",
					type: "url",
				}),
			],
		}),
		// Bidang usaha
		defineField({
			name: "sector",
			title: "Business Sector",
			type: "string",
			options: {
				list: [
					{ title: "Kuliner", value: "kuliner" },
					{ title: "Fashion", value: "fashion" },
					{ title: "Kerajinan", value: "kerajinan" },
					{ title: "Teknologi", value: "teknologi" },
					{ title: "Jasa", value: "jasa" },
					{ title: "Lainnya", value: "lainnya" },
				],
			},
		}),
	],
});
