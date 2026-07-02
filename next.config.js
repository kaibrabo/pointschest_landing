/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/app',
        destination: 'https://pointschest-app.vercel.app/', 
      },
      {
        source: '/app/:path*',
        destination: 'https://pointschest-app.vercel.app/:path*', 
      },
      {
        source: '/_expo/:path*',
        destination: 'https://pointschest-app.vercel.app/_expo/:path*', 
      },
      {
        source: '/assets/:path*',
        destination: 'https://pointschest-app.vercel.app/assets/:path*', 
      },
    ]
  },
}

module.exports = nextConfig
