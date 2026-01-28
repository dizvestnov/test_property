'use client'

import { useRouter } from 'next/navigation'
import { type Currency } from '@/lib/currency'
import { setCurrencyCookie } from '@/lib/cookies-client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CurrencySelectProps {
  currentCurrency: Currency
}

/**
 * Клиентский компонент для выбора валюты
 */
export function CurrencySelect({ currentCurrency }: CurrencySelectProps) {
  const router = useRouter()

  const handleCurrencyChange = (value: string) => {
    const currency = value as Currency
    setCurrencyCookie(currency)
    router.refresh()
  }

  return (
    <Select value={currentCurrency} onValueChange={handleCurrencyChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="THB">THB (฿)</SelectItem>
        <SelectItem value="USD">USD ($)</SelectItem>
        <SelectItem value="EUR">EUR (€)</SelectItem>
        <SelectItem value="RUB">RUB (₽)</SelectItem>
      </SelectContent>
    </Select>
  )
}
