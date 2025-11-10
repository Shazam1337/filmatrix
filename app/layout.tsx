import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FILMATRIX - The Decentralized Matrix of Storage and Flow',
  description: 'Track Filecoin storage, data flow, and on-chain activity — all in one place. FILMATRIX is a decentralized data visualization platform built to empower the Filecoin ecosystem.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

