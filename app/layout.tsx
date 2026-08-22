import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AthleteOS — One Platform. Every Athlete.',
  description:
    'Build your sports identity, find athletes near you, join matches and events, and grow your game — all in one place.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-brand-blue selection:text-white">
        {children}
      </body>
    </html>
  )
}
