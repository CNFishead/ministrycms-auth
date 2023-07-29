/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "res.cloudinary.com", "api.shepherdcms.org"],
  },
  env: {
    ENV: "production",
    API_URL: "https://api.shepherdcms.org/api/v1",
    // ENV: "development",
  },
};

module.exports = nextConfig;
