/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "res.cloudinary.com" }],
  },
  transpilePackages: ["lucid-react"],
};

export default nextConfig;
