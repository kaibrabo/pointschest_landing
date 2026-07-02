/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/app',
        destination: 'https://pointschest-app.vercel.app/', // TODO: Replace with your actual Expo web app URL
      },
      {
        source: '/app/:path*',
        destination: 'https://pointschest-app.vercel.app/:path*', // TODO: Replace with your actual Expo web app URL
      },
    ]
  },
}

module.exports = nextConfig
