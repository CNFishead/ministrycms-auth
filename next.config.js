/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "res.cloudinary.com", "api.shepherdcms.org"],
  },
};

module.exports = nextConfig;
