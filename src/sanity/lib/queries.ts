import { defineQuery } from "next-sanity"
// Query untuk mengambil hero di dokumen home
export const HOME_HERO_QUERY = defineQuery(`*[_type == "home"][0].hero{
  heading,
  subheading,
  image,
  cta
}`)
