import Link from 'next/link'
import { Home } from 'lucide-react'
import { getCurrencyFromCookies } from '@/lib/cookies'
import { CurrencySelect } from '@/components/CurrencySelect'

/**
 * Server component Header with currency selector
 * 
 * Rendering: Server Component (SSR)
 * - Gets currency from cookies on the server
 * - Rendered on the server on each request
 * - Passes initial currency value to client CurrencySelect component
 */
export async function Header() {
  const currentCurrency = await getCurrencyFromCookies()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Home className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-display font-semibold tracking-tight">
            Недвижимость Пхукет
          </h1>
        </Link>
        <CurrencySelect currentCurrency={currentCurrency} />
      </div>
    </header>
  )
}
