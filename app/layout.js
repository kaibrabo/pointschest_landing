import './globals.css'
import { Analytics } from '@vercel/analytics/react'

export const metadata = {
  title: 'PointsChest — Find the Best Credit Card for How You Spend',
  description:
    'Search credit cards by spending category — dining, travel, gas, groceries — and instantly see which cards earn the highest reward rates. Apply directly to the issuer.',
  icons: {
    icon: '/black_chest_logo.png',
    apple: '/black_chest_logo.png',
  },
  openGraph: {
    title: 'PointsChest — Find the Best Credit Card for How You Spend',
    description:
      'Search by category, see the top-earning cards, and apply in one tap.',
    type: 'website',
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      {children}
      <Analytics />
    </body>
    </html>
  )
}
