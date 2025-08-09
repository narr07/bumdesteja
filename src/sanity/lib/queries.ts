// src/sanity/lib/queries.ts
import { defineQuery } from "next-sanity"
// Query untuk mengambil hero di dokumen home
export const HOME_HERO_QUERY = defineQuery(`*[_type == "home"][0].hero{
  heading,
  subheading,
  image,
  cta
}`)
// Query: List Program (untuk card/list di halaman daftar)
export const PROGRAM_LIST_QUERY = defineQuery(`
  *[_type == "program"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    description,
    image
  }
`)
// Query: Detail Program (untuk halaman /program/[slug])
export const PROGRAM_DETAIL_QUERY = defineQuery(`
  *[_type == "program" && slug.current == $slug][0] {
    title,
    description,
    image,
    detail
  }
`)
