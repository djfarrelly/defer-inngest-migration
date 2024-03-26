/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // see https://www.defer.run/docs/get-started/quickstart/nextjs#disable-server-minification
    serverMinification: false,
  },
};

module.exports = nextConfig;
