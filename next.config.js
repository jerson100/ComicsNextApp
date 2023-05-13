/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
  images: {
    domains: ["imgs.xkcd.com"],
  },
};

//comic/120 -> en - default
//es/comic/120 -> es

module.exports = nextConfig;
