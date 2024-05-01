/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
  transpilePackages: ["lucid-react"],
};

export default nextConfig;
