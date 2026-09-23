// ==============================================================================
//  PÁGINA PRINCIPAL: LANDING PAGE & TRACKER DEL BESTIARIO POKÉMON TCG
// ==============================================================================

'use client';

import React, { useState, useMemo } from 'react';
import { GEN1_SPECIMENS } from '@/data/specimens-gen1';
import { HORROR_CATEGORIES, CATEGORIES_LIST } from '@/data/categories';
import { HorrorCategoryName, Specimen } from '@/types';
import { useSupabaseCollection } from '@/hooks/useSupabaseCollection';
import { Header } from '@/components/Header';
import { GenerationSelector } from '@/components/GenerationSelector';
import { CategoryFilters, CollectionFilterStatus } from '@/components/CategoryFilters';
import { PokemonCard } from '@/components/PokemonCard';
import { CardSelectorModal } from '@/components/CardSelectorModal';
import { EmptyGenState } from '@/components/EmptyGenState';
import { Loader2, SearchX, ShieldCheck, LogOut } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';

export default function BestiaryPage() {
  const { user, isAdmin, signOut } = useAdminAuth();
  const [currentGen, setCurrentGen] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<HorrorCategoryName | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<CollectionFilterStatus>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Modal de tarjeta seleccionada
  const [activeModalSpecimen, setActiveModalSpecimen] = useState<Specimen | null>(null);

  // Hook de colección en Supabase
  const {
    items,
    loading,
    isConfigured,
    stats,
    toggleOwned,
    assignCard,
    unassignCard,
  } = useSupabaseCollection(currentGen);

  // Conteo dinámico de posesión por cada una de las 9 categorías
  const categoryCounts = useMemo(() => {
    const counts: Record<string, { owned: number; total: number }> = {};

    CATEGORIES_LIST.forEach((cat) => {
      counts[cat.name] = { owned: 0, total: 0 };
    });

    GEN1_SPECIMENS.forEach((specimen) => {
      if (!counts[specimen.category]) {
        counts[specimen.category] = { owned: 0, total: 0 };
      }
      counts[specimen.category].total += 1;
      if (items[specimen.id]?.owned) {
        counts[specimen.category].owned += 1;
      }
    });

    return counts;
  }, [items]);

  // Filtrado reactivo de especímenes para Gen 1
  const filteredSpecimens = useMemo(() => {
    if (currentGen !== 1) return [];

    return GEN1_SPECIMENS.filter((specimen) => {
      // 1. Filtro por Categoría
      if (selectedCategory !== 'all' && specimen.category !== selectedCategory) {
        return false;
      }

      // 2. Filtro por Estado (En binder / Faltantes)
      const isOwned = !!items[specimen.id]?.owned;
      if (statusFilter === 'owned' && !isOwned) return false;
      if (statusFilter === 'missing' && isOwned) return false;

      // 3. Filtro por Buscador de Texto
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchName = specimen.name.toLowerCase().includes(query);
        const matchId = specimen.formattedId.toLowerCase().includes(query);
        const matchType = specimen.types.some((t) => t.toLowerCase().includes(query));
        const matchExcerpt = specimen.horrorExcerpt.toLowerCase().includes(query);
        return matchName || matchId || matchType || matchExcerpt;
      }

      return true;
    });
  }, [currentGen, selectedCategory, statusFilter, searchTerm, items]);

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Barra de Modo Administrador (Visible unicamente para el administrador autenticado) */}
      {isAdmin && (
        <aside
          aria-label="Barra de Administracion"
          className="sticky top-0 z-50 w-full bg-red-950/90 backdrop-blur border-b border-red-800/80 px-4 sm:px-6 py-2 flex items-center justify-between shadow-lg shadow-black/60"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-xs font-semibold text-red-100">
              Modo Administrador Activo
            </span>
            {user?.email && (
              <span className="hidden sm:inline font-mono text-[11px] text-red-300/80">
                ({user.email})
              </span>
            )}
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-red-900/60 text-red-200 border border-red-700/60">
              Edicion Habilitada
            </span>
          </div>

          <button
            onClick={() => signOut()}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-900/50 hover:bg-red-800/80 border border-red-700/60 text-xs font-semibold text-red-100 hover:text-white transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesion</span>
          </button>
        </aside>
      )}

      {/* Header con estadísticas globales (Progreso, USD, MXN) */}
      <Header
        totalSpecimens={GEN1_SPECIMENS.length}
        ownedCount={stats.ownedCount}
        totalUsd={stats.totalUsd}
      />

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* 1. Selector de Generaciones */}
        <section aria-label="Selector de Generaciones">
          <GenerationSelector
            currentGen={currentGen}
            onSelectGen={(gen) => {
              setCurrentGen(gen);
              setSelectedCategory('all');
            }}
          />
        </section>

        {/* 2. Contenido según la generación */}
        {currentGen === 1 ? (
          <div className="space-y-6">
            {/* Filtros de Categorías de Horror y Estado */}
            <section aria-label="Filtros del Bestiario">
              <CategoryFilters
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                statusFilter={statusFilter}
                onChangeStatusFilter={setStatusFilter}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                categoryCounts={categoryCounts}
              />
            </section>

            {/* Grid de Especímenes */}
            <section aria-label="Grid de Criaturas">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 text-zinc-400">
                  <Loader2 className="w-10 h-10 animate-spin text-red-500 mb-3" />
                  <p className="text-sm font-medium">Sincronizando colección con la base de datos...</p>
                </div>
              ) : filteredSpecimens.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-zinc-800 rounded-3xl bg-zinc-950/40">
                  <SearchX className="w-12 h-12 text-zinc-600 mb-3" />
                  <h3 className="text-base font-bold text-zinc-300">
                    No se encontraron especímenes
                  </h3>
                  <p className="text-xs text-zinc-500 max-w-sm mt-1">
                    No hay Pokémon que coincidan con los filtros seleccionados ({selectedCategory !== 'all' ? selectedCategory : 'todas las categorías'} y estado &ldquo;{statusFilter}&rdquo;).
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setStatusFilter('all');
                      setSearchTerm('');
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition cursor-pointer"
                  >
                    Restablecer filtros
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {filteredSpecimens.map((specimen, index) => (
                    <PokemonCard
                      key={specimen.id}
                      specimen={specimen}
                      collectionItem={items[specimen.id]}
                      onToggleOwned={toggleOwned}
                      onOpenCardModal={(spec) => setActiveModalSpecimen(spec)}
                      isPriority={index < 4}
                      canEdit={isAdmin}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        ) : (
          /* Generaciones 2 a 9: Estado vacío elegante */
          <EmptyGenState
            gen={currentGen}
            onBackToGen1={() => setCurrentGen(1)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-zinc-900 bg-zinc-950/80 text-center text-xs text-zinc-500">
        <p>
          Bestiario Pokémon TCG • Taxonomía oficial de Horror Gen 1 fundamentada en la Pokédex.
        </p>
        <p className="mt-1 text-[11px] text-zinc-600">
          Pokémon y sus respectivas marcas son marcas registradas de Nintendo, Creatures Inc. y GAME FREAK.
        </p>
      </footer>

      {/* Modal de Selector de Tarjetas TCG (Multilingüe: EN, ES, ZH) */}
      <CardSelectorModal
        specimen={activeModalSpecimen}
        collectionItem={activeModalSpecimen ? items[activeModalSpecimen.id] : undefined}
        isOpen={!!activeModalSpecimen}
        onClose={() => setActiveModalSpecimen(null)}
        onAssignCard={assignCard}
        onUnassignCard={unassignCard}
        canEdit={isAdmin}
      />
    </div>
  );
}
