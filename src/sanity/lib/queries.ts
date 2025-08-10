// src/sanity/lib/queries.ts
import { defineQuery } from "next-sanity";
// Query untuk mengambil hero di dokumen home
export const HOME_HERO_QUERY = defineQuery(`*[_type == "home"][0].hero{
  heading,
  subheading,
  image,
  cta
}`);
// Query: List Program (untuk card/list di halaman daftar)
export const PROGRAM_LIST_QUERY = defineQuery(`
  *[_type == "program"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    description,
    image
  }
`);
// Query: Detail Program (untuk halaman /program/[slug])
export const PROGRAM_DETAIL_QUERY = defineQuery(`
  *[_type == "program" && slug.current == $slug][0] {
    title,
    description,
    image,
    detail
  }
`);
// Query: List UMKM (untuk card/list di halaman daftar)
export const UMKM_LIST_QUERY = defineQuery(`
  *[_type == "umkm"] | order(_createdAt desc) {
    name,
    "slug": slug.current,
    description,
    image,
    sector
  }
`);
// Query: Detail UMKM (untuk halaman /umkm/[slug])
export const UMKM_DETAIL_QUERY = defineQuery(`
  *[_type == "umkm" && slug.current == $slug][0] {
    name,
    description,
    image,
    profile,
    sector,
    contact
  }
`);
// Query: 3 UMKM terakhir (untuk section carousel)
export const UMKM_THREE_QUERY = defineQuery(`
  *[_type == "umkm"] | order(_createdAt desc)[0...8] {
    name,
    "slug": slug.current,
    description,
    image
  }
`);
// List Wisata (misal untuk grid card di /wisata atau homepage)
export const WISATA_LIST_QUERY = `
  *[_type == "wisata"] | order(_createdAt desc) {
    name,
    "slug": slug.current,
    images,
    address,
    ticketPrice,
    operationalDays,
    operationalHours
  }
`;
// Detail Wisata (untuk /wisata/[slug])
export const WISATA_DETAIL_QUERY = `
  *[_type == "wisata" && slug.current == $slug][0] {
    name,
    images,
    address,
    ticketPrice,
    operationalDays,
    operationalHours,
    description
  }
`;
// Query: 3 Wisata terakhir
export const WISATA_THREE_QUERY = `
  *[_type == "wisata"] | order(_createdAt desc)[0...3] {
    name,
    "slug": slug.current,
    images,
    description
  }
`;
