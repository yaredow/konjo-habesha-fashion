/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "platform-lookaside.fbsbx.com" },
    ],
  },
  transpilePackages: ["lucid-react"],
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
