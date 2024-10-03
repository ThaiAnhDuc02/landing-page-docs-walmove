import { createNextraConfig } from 'nextra';

const withNextra = createNextraConfig({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => [
    {
      source: '/docs',
      destination: `/docs/latest`,
      permanent: true,
    },
  ],
  reactStrictMode: true,
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
    ],
  },
};

export default withNextra(nextConfig);