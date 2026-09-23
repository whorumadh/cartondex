// ==============================================================================
//  HOOK useSupabaseCollection — GESTIÓN DE COLECCIÓN EN SUPABASE (POSTGRESQL)
// ==============================================================================

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { CollectionItem, Specimen } from '@/types';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export function useSupabaseCollection(generation: number = 1) {
  const [items, setItems] = useState<Record<string, CollectionItem>>({});
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verificar configuración al montar
  useEffect(() => {
    setConfigured(isSupabaseConfigured());
  }, []);

  // Cargar elementos desde Supabase
  const loadCollection = useCallback(async () => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('collection_items')
        .select('*')
        .eq('generation', generation);

      if (fetchError) {
        throw fetchError;
      }

      if (data) {
        const itemMap: Record<string, CollectionItem> = {};
        data.forEach((row: CollectionItem) => {
          itemMap[row.specimen_id] = row;
        });
        setItems(itemMap);
      }
    } catch (err: any) {
      console.error('Error al cargar colección desde Supabase:', err);
      setError(err?.message || 'Error al conectar con la base de datos de Supabase');
    } finally {
      setLoading(false);
    }
  }, [generation]);

  useEffect(() => {
    loadCollection();
  }, [loadCollection]);

  // Alternar estado "Tengo / Falta"
  const toggleOwned = useCallback(
    async (specimenId: string, currentOwned: boolean, gen: number = 1) => {
      const nextOwned = !currentOwned;
      const existing = items[specimenId];

      const updatedItem: CollectionItem = {
        ...(existing || {
          specimen_id: specimenId,
          generation: gen,
        }),
        specimen_id: specimenId,
        generation: gen,
        owned: nextOwned,
        updated_at: new Date().toISOString(),
      };

      // Actualización optimista inmediata en la UI
      setItems((prev) => ({
        ...prev,
        [specimenId]: updatedItem,
      }));

      const supabase = getSupabaseClient();
      if (!supabase) {
        return;
      }

      try {
        const { error: upsertError } = await supabase
          .from('collection_items')
          .upsert(
            {
              specimen_id: specimenId,
              generation: gen,
              owned: nextOwned,
              card_id: updatedItem.card_id || null,
              card_name: updatedItem.card_name || null,
              card_image: updatedItem.card_image || null,
              set_id: updatedItem.set_id || null,
              set_name: updatedItem.set_name || null,
              card_number: updatedItem.card_number || null,
              rarity: updatedItem.rarity || null,
              language: updatedItem.language || 'en',
              price_usd: updatedItem.price_usd || null,
              price_eur: updatedItem.price_eur || null,
              notes: updatedItem.notes || null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'specimen_id' }
          );

        if (upsertError) {
          throw upsertError;
        }
      } catch (err: any) {
        console.error('Error al guardar estado de posesión en Supabase:', err);
        setError('No se pudo sincronizar con Supabase: ' + (err?.message || ''));
      }
    },
    [items]
  );

  // Asignar o cambiar la tarjeta seleccionada para el espécimen
  const assignCard = useCallback(
    async (specimenId: string, cardData: Partial<CollectionItem>, gen: number = 1) => {
      const existing = items[specimenId];
      const updatedItem: CollectionItem = {
        ...(existing || {
          specimen_id: specimenId,
          generation: gen,
        }),
        ...cardData,
        specimen_id: specimenId,
        generation: gen,
        owned: true, // Al asignar una tarjeta física automáticamente se marca como "Tengo"
        updated_at: new Date().toISOString(),
      };

      // Actualización optimista
      setItems((prev) => ({
        ...prev,
        [specimenId]: updatedItem,
      }));

      const supabase = getSupabaseClient();
      if (!supabase) {
        return;
      }

      try {
        const { error: upsertError } = await supabase
          .from('collection_items')
          .upsert(
            {
              specimen_id: specimenId,
              generation: gen,
              owned: true,
              card_id: updatedItem.card_id || null,
              card_name: updatedItem.card_name || null,
              card_image: updatedItem.card_image || null,
              set_id: updatedItem.set_id || null,
              set_name: updatedItem.set_name || null,
              card_number: updatedItem.card_number || null,
              rarity: updatedItem.rarity || null,
              language: updatedItem.language || 'en',
              price_usd: updatedItem.price_usd ?? null,
              price_eur: updatedItem.price_eur ?? null,
              notes: updatedItem.notes || null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'specimen_id' }
          );

        if (upsertError) {
          throw upsertError;
        }
      } catch (err: any) {
        console.error('Error al guardar tarjeta en Supabase:', err);
        setError('Error al guardar en Supabase: ' + (err?.message || ''));
      }
    },
    [items]
  );

  // Quitar la tarjeta vinculada
  const unassignCard = useCallback(
    async (specimenId: string, gen: number = 1) => {
      const existing = items[specimenId];
      if (!existing) return;

      const updatedItem: CollectionItem = {
        ...existing,
        card_id: null,
        card_name: null,
        card_image: null,
        set_id: null,
        set_name: null,
        card_number: null,
        rarity: null,
        price_usd: null,
        price_eur: null,
        updated_at: new Date().toISOString(),
      };

      setItems((prev) => ({
        ...prev,
        [specimenId]: updatedItem,
      }));

      const supabase = getSupabaseClient();
      if (!supabase) return;

      try {
        await supabase
          .from('collection_items')
          .upsert(
            {
              ...updatedItem,
              specimen_id: specimenId,
              generation: gen,
            },
            { onConflict: 'specimen_id' }
          );
      } catch (err: any) {
        console.error('Error al desvincular tarjeta:', err);
      }
    },
    [items]
  );

  // Estadísticas globales de la colección
  const stats = useMemo(() => {
    let ownedCount = 0;
    let totalUsd = 0;
    let totalEur = 0;

    Object.values(items).forEach((item) => {
      if (item.owned) {
        ownedCount++;
        if (typeof item.price_usd === 'number' && !isNaN(item.price_usd)) {
          totalUsd += item.price_usd;
        }
        if (typeof item.price_eur === 'number' && !isNaN(item.price_eur)) {
          totalEur += item.price_eur;
        }
      }
    });

    return {
      ownedCount,
      totalUsd,
      totalEur,
    };
  }, [items]);

  return {
    items,
    loading,
    isConfigured: configured,
    error,
    stats,
    toggleOwned,
    assignCard,
    unassignCard,
    reload: loadCollection,
  };
}
