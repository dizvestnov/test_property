import { cookies } from 'next/headers'
import { type Currency } from './currency'

const CURRENCY_COOKIE_NAME = 'selected-currency'
const DEFAULT_CURRENCY: Currency = 'THB'

/**
 * Gets selected currency from cookies (server-side)
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
 * Checks if a string is a valid currency
 */
function isValidCurrency(value: string): value is Currency {
  return ['THB', 'USD', 'EUR', 'RUB'].includes(value)
}
