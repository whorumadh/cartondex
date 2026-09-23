// ==============================================================================
//  CARD DE ESPÉCIMEN DEL BESTIARIO CON CHECKBOX DIRECTO Y PRECIOS TCG
// ==============================================================================

'use client';

import React from 'react';
import Image from 'next/image';
import { Specimen, CollectionItem } from '@/types';
import { HORROR_CATEGORIES } from '@/data/categories';
import { formatCurrency, convertUsdToMxn } from '@/lib/utils';
import { Check, Layers, ExternalLink, Sparkles, Tag } from 'lucide-react';

interface PokemonCardProps {
  specimen: Specimen;
  collectionItem?: CollectionItem;
  onToggleOwned: (specimenId: string, currentOwned: boolean) => void;
  onOpenCardModal: (specimen: Specimen) => void;
  isPriority?: boolean;
}

// Colores según tipo elemental
const TYPE_COLORS: Record<string, string> = {
  Normal: 'bg-zinc-700/80 text-zinc-200 border-zinc-600',
  Fire: 'bg-orange-950/80 text-orange-300 border-orange-700/60',
  Water: 'bg-blue-950/80 text-blue-300 border-blue-700/60',
  Grass: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60',
  Poison: 'bg-purple-950/80 text-purple-300 border-purple-700/60',
  Bug: 'bg-lime-950/80 text-lime-300 border-lime-700/60',
  Flying: 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60',
  Ground: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
  Rock: 'bg-stone-900 text-stone-300 border-stone-700/60',
  Psychic: 'bg-pink-950/80 text-pink-300 border-pink-700/60',
  Ghost: 'bg-violet-950/80 text-violet-300 border-violet-700/60',
  Ice: 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60',
  Fighting: 'bg-red-950/80 text-red-300 border-red-800/60',
  Fairy: 'bg-rose-950/80 text-rose-300 border-rose-700/60',
  Dark: 'bg-zinc-950 text-zinc-300 border-zinc-700/60',
};

export function PokemonCard({
  specimen,
  collectionItem,
  onToggleOwned,
  onOpenCardModal,
  isPriority = false,
}: PokemonCardProps) {
  const isOwned = !!collectionItem?.owned;
  const categoryInfo = HORROR_CATEGORIES[specimen.category];
  const hasSpecificCard = !!collectionItem?.card_id;

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOwned
          ? 'bg-zinc-900/90 border-emerald-500/60 shadow-xl shadow-emerald-950/20 ring-1 ring-emerald-500/30'
          : 'bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40'
      }`}
    >
      {/* Efecto foil holográfico sutil si está en el binder */}
      {isOwned && (
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-pink-500/5 pointer-events-none" />
      )}

      {/* Encabezado de la Card: Dex # y Checkbox Tengo */}
      <div className="p-4 pb-0 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-zinc-400">
            {specimen.formattedId}
          </span>
          {specimen.form !== 'Normal' && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {specimen.form}
            </span>
          )}
        </div>

        {/* Checkbox "En Binder" */}
        <button
          onClick={() => onToggleOwned(specimen.id, isOwned)}
          title={isOwned ? 'Quitar del binder' : 'Marcar como en mi binder'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
            isOwned
              ? 'bg-emerald-500 text-zinc-950 border-emerald-400 font-bold shadow-md shadow-emerald-950/50'
              : 'bg-zinc-900/80 text-zinc-400 border-zinc-700/80 hover:text-zinc-200 hover:border-zinc-600'
          }`}
        >
          <div
            className={`w-4 h-4 rounded flex items-center justify-center border transition ${
              isOwned
                ? 'bg-zinc-950 border-zinc-950 text-emerald-400'
                : 'border-zinc-500 bg-transparent'
            }`}
          >
            {isOwned && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
          <span>{isOwned ? 'En Binder' : 'Tengo'}</span>
        </button>
      </div>

      {/* Arte oficial del Pokémon */}
      <div className="relative py-4 px-6 flex items-center justify-center">
        {/* Glow de categoría detrás del espécimen */}
        <div
          className="absolute w-36 h-36 rounded-full blur-2xl opacity-20 pointer-events-none transition group-hover:opacity-35"
          style={{ backgroundColor: categoryInfo?.glowColor || 'rgba(255,255,255,0.1)' }}
        />

        {/* Imagen del espécimen */}
        <div className="relative w-40 h-40 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={specimen.officialArtworkUrl}
            alt={specimen.name}
            fill
            sizes="(max-width: 768px) 160px, 160px"
            className="object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]"
            priority={isPriority}
            loading={isPriority ? undefined : 'lazy'}
          />
        </div>
      </div>

      {/* Información del espécimen */}
      <div className="p-4 pt-1 flex-1 flex flex-col justify-between z-10 space-y-3">
        <div>
          {/* Nombre y Tipos */}
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-base font-bold text-zinc-100 group-hover:text-red-400 transition tracking-tight">
              {specimen.name}
            </h4>
            <div className="flex items-center gap-1 shrink-0">
              {specimen.types.map((t) => (
                <span
                  key={t}
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${
                    TYPE_COLORS[t] || 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Badge de Categoría de Horror */}
          <div className="mt-2">
            <span
              className={`inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-lg border ${categoryInfo?.colorBg} ${categoryInfo?.colorBorder} ${categoryInfo?.colorText}`}
            >
              <span className="truncate">{specimen.category}</span>
            </span>
          </div>

          {/* Extracto de Horror de la Pokédex */}
          <p className="mt-2.5 text-xs text-zinc-400 line-clamp-3 leading-relaxed italic border-l-2 border-zinc-800 pl-2">
            &ldquo;{specimen.horrorExcerpt}&rdquo;
          </p>
        </div>

        {/* Tarjeta vinculada y Botón de Precios */}
        <div className="pt-2 border-t border-zinc-800/80">
          {hasSpecificCard ? (
            <div className="mb-2 p-2 rounded-xl bg-zinc-900/90 border border-emerald-500/40 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                {collectionItem.card_image ? (
                  <div className="relative w-8 h-11 shrink-0 rounded overflow-hidden border border-zinc-700">
                    <Image
                      src={`${collectionItem.card_image}/low.webp`}
                      alt={collectionItem.card_name || 'Card'}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <Tag className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="text-xs font-bold text-zinc-200 truncate">
                    {collectionItem.card_name || 'Tarjeta Vinculada'}
                  </p>
                  <p className="text-[10px] text-zinc-400 truncate">
                    {collectionItem.set_name || 'Set'} • {collectionItem.card_number || ''} ({collectionItem.language?.toUpperCase()})
                  </p>
                </div>
              </div>

              {/* Precios guardados (USD & MXN) */}
              <div className="text-right shrink-0">
                <span className="block text-xs font-mono font-bold text-emerald-400">
                  {formatCurrency(collectionItem.price_usd, 'USD')}
                </span>
                {collectionItem.price_usd && (
                  <span className="block text-[10px] font-mono text-amber-400/90">
                    {formatCurrency(convertUsdToMxn(collectionItem.price_usd), 'MXN')}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="mb-2 flex items-center justify-between text-xs text-zinc-500 px-1">
              <span>Sin tarjeta física asignada</span>
              <span className="text-[11px] text-zinc-600">TCGdex</span>
            </div>
          )}

          {/* Botón para abrir el selector de cartas y cotización */}
          <button
            onClick={() => onOpenCardModal(specimen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs font-semibold text-zinc-200 hover:text-white transition cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-red-400" />
            <span>{hasSpecificCard ? 'Cambiar Tarjeta / Ver Precios' : 'Elegir Tarjeta & Precios'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
