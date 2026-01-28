import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Недвижимость Пхукет',
  description: 'Каталог объектов недвижимости на Пхукете',
}

/**
 * Root Layout
 * 
 * Rendering: Server Component (SSR)
 * - Rendered on the server
 * - Configures fonts and global styles
 * - Wraps all pages
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
