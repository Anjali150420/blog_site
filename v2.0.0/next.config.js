/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "upload.wikimedia.org",
      "images.samsung.com",
      "fdn2.gsmarena.com",
    ], // Add all required domains here
  },
  async rewrites() {
    return [
      {
        source: "/rss.xml",
        destination: "/api/rss",
      },
    ];
  },
};

module.exports = nextConfig;
