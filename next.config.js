/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/app',
        destination: 'https://pointschest-app.vercel.app/',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
