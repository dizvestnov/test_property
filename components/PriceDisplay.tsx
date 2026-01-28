import { cn } from '@/lib/utils'
import { convertCurrency, formatPrice, type Currency } from '@/lib/currency'

interface PriceDisplayProps {
  priceInThb: number
  currency: Currency
  className?: string
}

/**
 * Component for displaying price with currency conversion
 * 
 * Rendering: Server Component (SSR)
 * - Pure function without side effects
 * - Performs conversion and formatting on the server
 * - Reusable component (DRY principle)
 */
export function PriceDisplay({ priceInThb, currency, className }: PriceDisplayProps) {
  const convertedPrice = convertCurrency(priceInThb, currency)
  const formattedPrice = formatPrice(convertedPrice, currency)
  
  return <span className={cn("text-xl font-bold", className)}>{formattedPrice}</span>
}
