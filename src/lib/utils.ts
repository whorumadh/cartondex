// ==============================================================================
// ️ UTILIDADES GENERALES
// ==============================================================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Tasa aproximada de conversión USD a MXN para el mercado mexicano
export const USD_TO_MXN_RATE = 20.0;

export function formatCurrency(
  amount: number | null | undefined,
  currency: 'USD' | 'MXN' | 'EUR' = 'USD'
): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '—';
  }
  const locale = currency === 'MXN' ? 'es-MX' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function convertUsdToMxn(usd: number | null | undefined): number | null {
  if (usd === null || usd === undefined || isNaN(usd)) return null;
  return Number((usd * USD_TO_MXN_RATE).toFixed(2));
}
