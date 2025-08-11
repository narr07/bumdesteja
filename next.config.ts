const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "", // optional, usually empty
        pathname: "/**", // ini untuk semua path, bisa juga '/320x240' saja
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "", // optional, usually empty
        pathname: "/**", // ini untuk semua path, bisa juga '/320x240' saja
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "", // optional, usually empty
        pathname: "/**", // ini untuk semua path, bisa juga '/320x240' saja
      },
    ],
  },
};
export default nextConfig;
