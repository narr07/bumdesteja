import { defineQuery } from "next-sanity";
// Query untuk mengambil hero di dokumen home
export const HOME_HERO_QUERY = defineQuery(`*[_type == "home"][0].hero{
  heading,
  subheading,
  image{
    asset->{
      url,
      metadata { lqip }
    }
  },
  cta
}`);
// Query: List Program (semua image + lqip)
export const PROGRAM_LIST_QUERY = defineQuery(`
  *[_type == "program"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    description,
    image{
      asset->{
        url,
        metadata { lqip }
      }
    }
  }
`);
// Query: Detail Program
export const PROGRAM_DETAIL_QUERY = defineQuery(`
  *[_type == "program" && slug.current == $slug][0] {
    title,
    description,
    image{
      asset->{
        url,
        metadata { lqip }
      }
    },
    detail
  }
`);
// Query: List UMKM
export const UMKM_LIST_QUERY = defineQuery(`
  *[_type == "umkm"] | order(_createdAt desc) {
  _id,
    name,
    "slug": slug.current,
    description,
    image{
      asset->{
        url,
        metadata { lqip }
      }
    },
  sector,
  likes
  }
`);
// Query: Detail UMKM
export const UMKM_DETAIL_QUERY = defineQuery(`
  *[_type == "umkm" && slug.current == $slug][0] {
  _id,
    name,
    description,
    image{
      asset->{
        url,
        metadata { lqip }
      }
    },
    profile,
    sector,
  contact,
  likes
  }
`);
// Query: 8 UMKM terakhir
export const UMKM_THREE_QUERY = defineQuery(`
  *[_type == "umkm"] | order(_createdAt desc)[0...8] {
  _id,
    name,
    "slug": slug.current,
    description,
    image{
      asset->{
        url,
        metadata { lqip }
      }
    }
  }
`);
// List Wisata
export const WISATA_LIST_QUERY = defineQuery(`
  *[_type == "wisata"] | order(_createdAt desc) {
  _id,
    name,
    "slug": slug.current,
    images[]{
      asset->{
        url,
        metadata { lqip }
      }
    },
    address,
    ticketPrice,
    operationalDays,
  operationalHours,
  }
`);
// Detail Wisata
export const WISATA_DETAIL_QUERY = defineQuery(`
  *[_type == "wisata" && slug.current == $slug][0] {
  _id,
    name,
    images[]{
      asset->{
        url,
        metadata { lqip }
      }
    },
    address,
    ticketPrice,
    operationalDays,
    operationalHours,
  description,
  location,
  }
`);
// Query: 3 Wisata terakhir
export const WISATA_THREE_QUERY = defineQuery(`
  *[_type == "wisata"] | order(_createdAt desc)[0...3] {
    name,
    "slug": slug.current,
    images[]{
      asset->{
        url,
        metadata { lqip }
      }
    },
    description
  }
`);
