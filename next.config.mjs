/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**", 
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", 
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**", 
      },

      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
