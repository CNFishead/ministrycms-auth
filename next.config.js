/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "res.cloudinary.com", "api.shepherdcms.org"],
  },
  env: {
    ENV: "production",
    // ENV: "development",
  },
};

module.exports = nextConfig;
