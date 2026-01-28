import { cookies } from 'next/headers'
import { type Currency } from './currency'

const CURRENCY_COOKIE_NAME = 'selected-currency'
const DEFAULT_CURRENCY: Currency = 'THB'

/**
 * Получает выбранную валюту из cookies (server-side)
 */
export async function getCurrencyFromCookies(): Promise<Currency> {
  const cookieStore = await cookies()
  const currencyCookie = cookieStore.get(CURRENCY_COOKIE_NAME)
  
  if (currencyCookie?.value && isValidCurrency(currencyCookie.value)) {
    return currencyCookie.value as Currency
  }
  
  return DEFAULT_CURRENCY
}

/**
 * Проверяет, является ли строка валидной валютой
 */
function isValidCurrency(value: string): value is Currency {
  return ['THB', 'USD', 'EUR', 'RUB'].includes(value)
}
