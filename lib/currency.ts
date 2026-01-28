export type Currency = 'THB' | 'USD' | 'EUR' | 'RUB'

export const CURRENCY_RATES: Record<Currency, number> = {
  THB: 1,
  USD: 0.0286,
  EUR: 0.0263,
  RUB: 2.57,
}

/**
 * Currency codes for Intl.NumberFormat
 */
const CURRENCY_CODES: Record<Currency, string> = {
  THB: 'THB',
  USD: 'USD',
  EUR: 'EUR',
  RUB: 'RUB',
}

/**
 * Converts price from THB to the specified currency
 */
export function convertCurrency(priceInThb: number, targetCurrency: Currency): number {
  return priceInThb * CURRENCY_RATES[targetCurrency]
}

/**
 * Formats price with currency symbol using Intl.NumberFormat
 * Uses currency style for proper localization
 */
export function formatPrice(price: number, currency: Currency): string {
  const currencyCode = CURRENCY_CODES[currency]
  
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: currency === 'USD' || currency === 'EUR' ? 2 : 0,
    maximumFractionDigits: currency === 'USD' || currency === 'EUR' ? 2 : 0,
  }).format(price)
}
