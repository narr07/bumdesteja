import { defineType, defineField, defineArrayMember } from "sanity";
export const programType = defineType({
	name: "program",
	title: "Program",
	type: "document",
	fields: [
		// Gambar utama di card/list
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			options: { hotspot: true },
		}),
		// Nama program
		defineField({
			name: "title",
			title: "Title",
			type: "string",
		}),
		// Slug untuk halaman detail (program/[slug])
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: { source: "title", maxLength: 96 },
		}),
		// Deskripsi singkat untuk card/list
		defineField({
			name: "description",
			title: "Description",
			type: "text",
		}),
		// Info detail panjang (untuk halaman detail)
		defineField({
			name: "detail",
			title: "Detail",
			type: "array",
			of: [
				defineArrayMember({
					type: "block", // Rich text block, bisa gambar, heading, dsb.
				}),
			],
		}),
	],
});
