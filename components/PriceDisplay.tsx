import { cn } from '@/lib/utils'
import { convertCurrency, formatPrice, type Currency } from '@/lib/currency'

interface PriceDisplayProps {
  priceInThb: number
  currency: Currency
  className?: string
}

/**
 * Компонент для отображения цены с конвертацией валюты
 * 
 * Рендеринг: Server Component (SSR)
 * - Чистая функция без side effects
 * - Выполняет конвертацию и форматирование на сервере
 * - Переиспользуемый компонент (DRY принцип)
 */
export function PriceDisplay({ priceInThb, currency, className }: PriceDisplayProps) {
  const convertedPrice = convertCurrency(priceInThb, currency)
  const formattedPrice = formatPrice(convertedPrice, currency)
  
  return <span className={cn("text-xl font-bold", className)}>{formattedPrice}</span>
}
