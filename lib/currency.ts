export type Currency = 'THB' | 'USD' | 'EUR' | 'RUB'

export const CURRENCY_RATES: Record<Currency, number> = {
  THB: 1,
  USD: 0.0286,
  EUR: 0.0263,
  RUB: 2.57,
}

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  THB: '฿',
  USD: '$',
  EUR: '€',
  RUB: '₽',
}

/**
 * Конвертирует цену из THB в указанную валюту
 */
export function convertCurrency(priceInThb: number, targetCurrency: Currency): number {
  return priceInThb * CURRENCY_RATES[targetCurrency]
}

/**
 * Форматирует цену с символом валюты
 */
export function formatPrice(price: number, currency: Currency): string {
  const symbol = CURRENCY_SYMBOLS[currency]
  
  return new Intl.NumberFormat('ru-RU', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + ` ${symbol}`
}
