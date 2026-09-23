// ==============================================================================
//  HOOK useTcgCards — CONSULTA Y FILTRADO DE TARJETAS TCGDEX (EN, ES, ZH)
// ==============================================================================

'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { TcgCardBrief, TcgCardDetail, TcgLanguage } from '@/types';
import { fetchCardsByDexId, fetchCardDetail } from '@/lib/tcgdex';

export function useTcgCards(dexNumber: number | null, initialLang: TcgLanguage = 'en') {
  const [language, setLanguage] = useState<TcgLanguage>(initialLang);
  const [cards, setCards] = useState<TcgCardBrief[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [cardDetail, setCardDetail] = useState<TcgCardDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [selectedSet, setSelectedSet] = useState<string>('all');

  // Cargar lista de tarjetas según dexNumber e idioma
  const loadCards = useCallback(async () => {
    if (!dexNumber) {
      setCards([]);
      return;
    }

    setLoading(true);
    try {
      const data = await fetchCardsByDexId(dexNumber, language);
      setCards(data);
      if (data.length > 0) {
        setSelectedCardId(data[0].id);
      } else {
        setSelectedCardId(null);
        setCardDetail(null);
      }
    } catch (err) {
      console.error('Error al cargar tarjetas TCGdex:', err);
      setCards([]);
    } finally {
      setLoading(false);
    }
  }, [dexNumber, language]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  // Cargar detalles de la tarjeta seleccionada (precios, set, arte)
  useEffect(() => {
    if (!selectedCardId) {
      setCardDetail(null);
      return;
    }

    let isMounted = true;
    setLoadingDetail(true);

    fetchCardDetail(selectedCardId, language)
      .then((detail) => {
        if (isMounted) {
          setCardDetail(detail);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoadingDetail(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedCardId, language]);

  // Lista de sets únicos para el dropdown de filtro
  const availableSets = useMemo(() => {
    const sets = new Set<string>();
    cards.forEach((c) => {
      // Los IDs suelen tener el formato "set-num" (ej: "sm115-37" o "base1-4")
      const parts = c.id.split('-');
      if (parts.length > 1) {
        sets.add(parts[0].toUpperCase());
      }
    });
    return Array.from(sets);
  }, [cards]);

  // Tarjetas filtradas por búsqueda de texto y set
  const filteredCards = useMemo(() => {
    return cards.filter((c) => {
      const matchSearch =
        searchTerm.trim() === '' ||
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.localId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchSet =
        selectedSet === 'all' ||
        c.id.toUpperCase().startsWith(selectedSet + '-');

      return matchSearch && matchSet;
    });
  }, [cards, searchTerm, selectedSet]);

  return {
    language,
    setLanguage,
    cards: filteredCards,
    totalCardsCount: cards.length,
    loading,
    selectedCardId,
    setSelectedCardId,
    cardDetail,
    loadingDetail,
    searchTerm,
    setSearchTerm,
    selectedRarity,
    setSelectedRarity,
    selectedSet,
    setSelectedSet,
    availableSets,
  };
}
