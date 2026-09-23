// ==============================================================================
// 🃏 CLIENTE TCGDEX API (EN, ES, ZH) CON COTIZACIONES DE TCGPLAYER & CARDMARKET
// ==============================================================================

import { TcgCardBrief, TcgCardDetail, TcgLanguage } from '@/types';

const BASE_URL = 'https://api.tcgdex.net/v2';

// Caché en memoria para evitar llamadas redundantes
const cardsCache = new Map<string, TcgCardBrief[]>();
const detailsCache = new Map<string, TcgCardDetail>();

/**
 * Normaliza el código de idioma para la API de TCGdex
 */
function normalizeLang(lang: TcgLanguage): string {
  if (lang === 'zh-cn' || lang === 'zh-tw') return lang;
  if (lang === 'es') return 'es';
  return 'en';
}

/**
 * Consulta la lista de cartas de un Pokémon por su número de Pokédex Nacional
 */
export async function fetchCardsByDexId(
  dexId: number,
  lang: TcgLanguage = 'en'
): Promise<TcgCardBrief[]> {
  const normalized = normalizeLang(lang);
  const cacheKey = `${normalized}_dex_${dexId}`;

  if (cardsCache.has(cacheKey)) {
    return cardsCache.get(cacheKey)!;
  }

  try {
    const res = await fetch(`${BASE_URL}/${normalized}/cards?dexId=${dexId}`);
    if (!res.ok) {
      if (res.status === 404) return [];
      throw new Error(`Error ${res.status} al consultar tarjetas TCGdex`);
    }

    const data: TcgCardBrief[] = await res.json();
    cardsCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching TCG cards for dex ${dexId} in ${lang}:`, error);
    // Si falla en español o chino, intentar fallback a inglés
    if (lang !== 'en') {
      try {
        return await fetchCardsByDexId(dexId, 'en');
      } catch {
        return [];
      }
    }
    return [];
  }
}

/**
 * Obtiene los detalles completos de una carta (set, rareza, imagen de alta resolución y precios en USD / EUR)
 */
export async function fetchCardDetail(
  cardId: string,
  lang: TcgLanguage = 'en'
): Promise<TcgCardDetail | null> {
  const normalized = normalizeLang(lang);
  const cacheKey = `${normalized}_card_${cardId}`;

  if (detailsCache.has(cacheKey)) {
    return detailsCache.get(cacheKey)!;
  }

  try {
    const res = await fetch(`${BASE_URL}/${normalized}/cards/${cardId}`);
    if (!res.ok) {
      if (res.status === 404 && lang !== 'en') {
        // Fallback a inglés si la carta no está en el idioma solicitado
        return fetchCardDetail(cardId, 'en');
      }
      return null;
    }

    const data: TcgCardDetail = await res.json();
    detailsCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching card detail ${cardId} in ${lang}:`, error);
    return null;
  }
}

/**
 * Extrae el mejor precio disponible en USD (TCGPlayer)
 */
export function extractUsdPrice(pricing?: TcgCardDetail['pricing']): number | null {
  if (!pricing?.tcgplayer) return null;
  const tp = pricing.tcgplayer;

  // Prioridad 1: Normal market price
  if (tp.normal?.marketPrice) return tp.normal.marketPrice;
  // Prioridad 2: Holofoil market price
  if (tp.holofoil?.marketPrice) return tp.holofoil.marketPrice;
  // Prioridad 3: Reverse-holofoil market price
  if (tp['reverse-holofoil']?.marketPrice) return tp['reverse-holofoil'].marketPrice;

  // Fallbacks a midPrice
  if (tp.normal?.midPrice) return tp.normal.midPrice;
  if (tp.holofoil?.midPrice) return tp.holofoil.midPrice;
  if (tp['reverse-holofoil']?.midPrice) return tp['reverse-holofoil'].midPrice;

  // Fallbacks a lowPrice
  if (tp.normal?.lowPrice) return tp.normal.lowPrice;
  if (tp.holofoil?.lowPrice) return tp.holofoil.lowPrice;
  if (tp['reverse-holofoil']?.lowPrice) return tp['reverse-holofoil'].lowPrice;

  return null;
}

/**
 * Extrae el mejor precio disponible en EUR (Cardmarket)
 */
export function extractEurPrice(pricing?: TcgCardDetail['pricing']): number | null {
  if (!pricing?.cardmarket) return null;
  const cm = pricing.cardmarket;

  if (cm.trend) return cm.trend;
  if (cm.avg) return cm.avg;
  if (cm.low) return cm.low;

  return null;
}
