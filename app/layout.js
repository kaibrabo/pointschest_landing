import './globals.css'

export const metadata = {
  title: 'PointsChest — Find the Best Credit Card for How You Spend',
  description:
    'Search credit cards by spending category — dining, travel, gas, groceries — and instantly see which cards earn the highest reward rates. Apply directly to the issuer.',
  openGraph: {
    title: 'PointsChest — Find the Best Credit Card for How You Spend',
    description:
      'Search by category, see the top-earning cards, and apply in one tap.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
