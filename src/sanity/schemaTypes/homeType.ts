// src/sanity/schemaTypes/homeType.ts
import { defineType, defineField, defineArrayMember } from "sanity"
export const homeType = defineType({
	name: "home",
	title: "Home",
	type: "document",
	fields: [
		// Hero Section
		defineField({
			name: "hero",
			title: "Hero",
			type: "object",
			fields: [
				defineField({
					name: "heading",
					title: "Heading",
					type: "string",
				}),
				defineField({
					name: "subheading",
					title: "Subheading",
					type: "string",
				}),
				defineField({
					name: "image",
					title: "Image",
					type: "image",
					options: { hotspot: true },
				}),
				defineField({
					name: "cta",
					title: "CTA",
					type: "object",
					fields: [
						defineField({ name: "text", title: "Text", type: "string" }),
						defineField({ name: "link", title: "Link", type: "url" }),
					],
				}),
			],
		}),
		// Testimoni Section
		defineField({
			name: "testimonials",
			title: "Testimonials",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					fields: [
						defineField({ name: "kata", title: "Kata", type: "text" }),
						defineField({ name: "nama", title: "Nama", type: "string" }),
					],
				}),
			],
		}),
		// Sponsor Section
		defineField({
			name: "sponsors",
			title: "Sponsors",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					fields: [
						defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
						defineField({ name: "link", title: "Link", type: "url" }),
						defineField({ name: "nama", title: "Nama", type: "string" }),
					],
				}),
			],
		}),
	],
})
