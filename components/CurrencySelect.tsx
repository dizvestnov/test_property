'use client'

import { useState, useEffect } from 'react'
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
 * Client component for currency selection with optimistic UI
 * Updates local state immediately while router.refresh() is in progress
 */
export function CurrencySelect({ currentCurrency }: CurrencySelectProps) {
  const router = useRouter()
  const [optimisticCurrency, setOptimisticCurrency] = useState<Currency>(currentCurrency)

  // Sync optimistic state with server value when it updates
  useEffect(() => {
    setOptimisticCurrency(currentCurrency)
  }, [currentCurrency])

  const handleCurrencyChange = (value: string) => {
    const currency = value as Currency
    // Optimistic update - update UI immediately
    setOptimisticCurrency(currency)
    // Save to cookie and refresh server components
    setCurrencyCookie(currency)
    router.refresh()
  }

  return (
    <Select value={optimisticCurrency} onValueChange={handleCurrencyChange}>
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
