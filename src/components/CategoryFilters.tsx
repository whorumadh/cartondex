// ==============================================================================
// 🏷️ FILTROS POR CATEGORÍA DE HORROR Y ESTADO DE COLECCIÓN
// ==============================================================================

'use client';

import React from 'react';
import { HorrorCategoryName } from '@/types';
import { HORROR_CATEGORIES, CATEGORIES_LIST } from '@/data/categories';
import { Search, Sparkles, Filter, CheckCircle2, CircleDashed } from 'lucide-react';

export type CollectionFilterStatus = 'all' | 'owned' | 'missing';

interface CategoryFiltersProps {
  selectedCategory: HorrorCategoryName | 'all';
  onSelectCategory: (cat: HorrorCategoryName | 'all') => void;
  statusFilter: CollectionFilterStatus;
  onChangeStatusFilter: (status: CollectionFilterStatus) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  categoryCounts: Record<string, { owned: number; total: number }>;
}

export function CategoryFilters({
  selectedCategory,
  onSelectCategory,
  statusFilter,
  onChangeStatusFilter,
  searchTerm,
  onSearchChange,
  categoryCounts,
}: CategoryFiltersProps) {
  return (
    <div className="w-full space-y-4">
      {/* Barra de búsqueda y selector de estado */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Buscador */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por nombre o número (ej: Cubone, #0094)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-red-500/70 focus:ring-1 focus:ring-red-500/50 transition font-sans"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filtros de Posesión */}
        <div className="flex items-center gap-1 p-1 bg-zinc-900/90 border border-zinc-800 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => onChangeStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => onChangeStatusFilter('owned')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              statusFilter === 'owned'
                ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            En Binder
          </button>
          <button
            onClick={() => onChangeStatusFilter('missing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              statusFilter === 'missing'
                ? 'bg-amber-950/80 border border-amber-500/40 text-amber-300 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <CircleDashed className="w-3.5 h-3.5 text-amber-400" />
            Faltantes
          </button>
        </div>
      </div>

      {/* Chips de Categorías de Horror */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
        {/* Botón Todas */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border whitespace-nowrap transition cursor-pointer shrink-0 ${
            selectedCategory === 'all'
              ? 'bg-zinc-100 text-zinc-950 border-white font-bold shadow-md'
              : 'bg-zinc-950/80 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Todas las Categorías</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300 font-mono">
            63
          </span>
        </button>

        {/* Las 9 categorías oficiales */}
        {CATEGORIES_LIST.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          const count = categoryCounts[cat.name] || { owned: 0, total: cat.countGen1 };

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border whitespace-nowrap transition cursor-pointer shrink-0 ${
                isSelected
                  ? `${cat.colorBg} ${cat.colorBorder} ${cat.colorText} ring-1 ring-current shadow-lg`
                  : 'bg-zinc-950/80 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full border ${
                  count.owned === count.total && count.total > 0
                    ? 'bg-emerald-950 border-emerald-500/40 text-emerald-400 font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                {count.owned}/{count.total}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
