import Link from 'next/link'
import { Home } from 'lucide-react'
import { getCurrencyFromCookies } from '@/lib/cookies'
import { CurrencySelect } from '@/components/CurrencySelect'

/**
 * Серверный компонент Header с переключателем валюты
 * 
 * Рендеринг: Server Component (SSR)
 * - Получает валюту из cookies на сервере
 * - Рендерится на сервере при каждом запросе
 * - Передает начальное значение валюты клиентскому CurrencySelect
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
