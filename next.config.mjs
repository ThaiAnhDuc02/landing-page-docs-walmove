import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

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
  codeHighlight: true
}

export default withNextra(nextConfig)