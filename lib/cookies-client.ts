'use client'

import { type Currency } from './currency'

const CURRENCY_COOKIE_NAME = 'selected-currency'

/**
 * Устанавливает валюту в cookies (client-side)
 */
export function setCurrencyCookie(currency: Currency) {
  document.cookie = `${CURRENCY_COOKIE_NAME}=${currency}; path=/; max-age=31536000`
}
