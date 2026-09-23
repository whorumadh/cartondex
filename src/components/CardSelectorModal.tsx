// ==============================================================================
// 🎴 MODAL DE SELECCIÓN DE TARJETAS TCG (EN, ES, ZH) CON FILTROS Y PRECIOS EN VIVO
// ==============================================================================

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Specimen, CollectionItem, TcgLanguage } from '@/types';
import { useTcgCards } from '@/hooks/useTcgCards';
import { extractUsdPrice, extractEurPrice } from '@/lib/tcgdex';
import { formatCurrency, convertUsdToMxn } from '@/lib/utils';
import {
  X,
  Search,
  Globe,
  Tag,
  Calendar,
  Layers,
  CheckCircle,
  ExternalLink,
  DollarSign,
  TrendingUp,
  BookmarkCheck,
  RotateCcw,
  Loader2,
} from 'lucide-react';

interface CardSelectorModalProps {
  specimen: Specimen | null;
  collectionItem?: CollectionItem;
  isOpen: boolean;
  onClose: () => void;
  onAssignCard: (specimenId: string, cardData: Partial<CollectionItem>) => void;
  onUnassignCard: (specimenId: string) => void;
}

const LANGUAGES: { code: TcgLanguage; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'zh-tw', label: '中文 (繁體)', flag: '🇨🇳' },
  { code: 'zh-cn', label: '中文 (简体)', flag: '🇨🇳' },
];

export function CardSelectorModal({
  specimen,
  collectionItem,
  isOpen,
  onClose,
  onAssignCard,
  onUnassignCard,
}: CardSelectorModalProps) {
  const initialLanguage = (collectionItem?.language as TcgLanguage) || 'en';

  const {
    language,
    setLanguage,
    cards,
    totalCardsCount,
    loading,
    selectedCardId,
    setSelectedCardId,
    cardDetail,
    loadingDetail,
    searchTerm,
    setSearchTerm,
    selectedSet,
    setSelectedSet,
    availableSets,
  } = useTcgCards(specimen ? specimen.dexNumber : null, initialLanguage);

  const [saving, setSaving] = useState(false);

  if (!isOpen || !specimen) return null;

  const currentUsdPrice = extractUsdPrice(cardDetail?.pricing);
  const currentEurPrice = extractEurPrice(cardDetail?.pricing);

  const isCurrentCardBound =
    collectionItem?.card_id === cardDetail?.id && collectionItem?.language === language;

  // Manejar vinculación de la carta seleccionada
  const handleSaveSelection = async () => {
    if (!cardDetail) return;
    setSaving(true);

    try {
      await onAssignCard(specimen.id, {
        card_id: cardDetail.id,
        card_name: cardDetail.name,
        card_image: cardDetail.image,
        set_id: cardDetail.set?.id || null,
        set_name: cardDetail.set?.name || null,
        card_number: cardDetail.localId,
        rarity: cardDetail.rarity || null,
        language: language,
        price_usd: currentUsdPrice,
        price_eur: currentEurPrice,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUnassign = async () => {
    setSaving(true);
    try {
      await onUnassignCard(specimen.id);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Glow ambiental */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-red-950/30 rounded-full blur-3xl pointer-events-none" />

        {/* Encabezado del Modal */}
        <div className="p-4 sm:p-6 border-b border-zinc-800/80 flex items-start justify-between gap-4 z-10 bg-zinc-950/80">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center p-1 overflow-hidden shrink-0">
              <Image
                src={specimen.officialArtworkUrl}
                alt={specimen.name}
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-red-400">
                  {specimen.formattedId}
                </span>
                <h3 className="text-xl font-extrabold text-zinc-100 tracking-tight">
                  {specimen.name}
                </h3>
                {specimen.form !== 'Normal' && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {specimen.form}
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-1 italic">
                &ldquo;{specimen.horrorExcerpt}&rdquo;
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de Filtros e Idioma */}
        <div className="px-4 sm:px-6 py-3 border-b border-zinc-800/60 bg-zinc-900/40 flex flex-wrap items-center justify-between gap-3 z-10">
          {/* Selector de Idioma (EN, ES, ZH) */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-950 border border-zinc-800 rounded-xl">
            <span className="px-2 text-xs text-zinc-400 font-semibold flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-zinc-500" />
              Idioma:
            </span>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                  language === lang.code
                    ? 'bg-zinc-800 text-white font-bold shadow-sm border border-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>

          {/* Filtros de Búsqueda y Sets */}
          <div className="flex items-center gap-2 flex-1 max-w-md justify-end">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filtrar por nombre o #..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-red-500 transition"
              />
            </div>

            {/* Dropdown de Sets */}
            {availableSets.length > 0 && (
              <select
                value={selectedSet}
                onChange={(e) => setSelectedSet(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 focus:outline-none focus:border-red-500 cursor-pointer"
              >
                <option value="all">Todos los Sets ({availableSets.length})</option>
                {availableSets.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Cuerpo del Modal: Vista Dividida (Detalle + Galería de Cartas) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Columna Izquierda (LG: 5 cols): Inspector de la Carta Seleccionada */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4 sm:p-5">
            {loadingDetail ? (
              <div className="h-80 flex flex-col items-center justify-center text-zinc-400">
                <Loader2 className="w-8 h-8 animate-spin text-red-500 mb-2" />
                <span className="text-xs">Consultando detalles y cotizaciones TCGdex...</span>
              </div>
            ) : cardDetail ? (
              <>
                <div className="flex flex-col items-center">
                  {/* Vista de la Tarjeta TCG en Alta Resolución */}
                  <div className="relative w-52 h-72 sm:w-56 sm:h-80 rounded-xl overflow-hidden shadow-2xl border border-zinc-700/80 bg-zinc-950 group">
                    {cardDetail.image ? (
                      <Image
                        src={`${cardDetail.image}/high.webp`}
                        alt={cardDetail.name}
                        fill
                        sizes="(max-width: 640px) 208px, 224px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-zinc-500">
                        <Layers className="w-12 h-12 mb-2 text-zinc-600" />
                        <span className="text-xs font-semibold">Sin imagen digital</span>
                      </div>
                    )}

                    {/* Badge de Idioma */}
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-zinc-700">
                      {language.toUpperCase()}
                    </div>
                  </div>

                  {/* Metadatos de la Tarjeta */}
                  <div className="w-full mt-4 text-center">
                    <h4 className="text-base font-bold text-zinc-100">{cardDetail.name}</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {cardDetail.set?.name || 'Set desconocido'} • #{cardDetail.localId}
                      {cardDetail.rarity && ` • ${cardDetail.rarity}`}
                    </p>
                    {cardDetail.illustrator && (
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        Ilustrador: {cardDetail.illustrator}
                      </p>
                    )}
                  </div>
                </div>

                {/* Precios de Mercado en Vivo (USD y MXN) */}
                <div className="w-full p-3.5 rounded-xl bg-black/60 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 border-b border-zinc-800 pb-2">
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      Cotización de Mercado
                    </span>
                    <span className="text-[10px] text-zinc-500">TCGPlayer</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {/* TCGPlayer USD */}
                    <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-center">
                      <span className="block text-[10px] text-zinc-400 font-medium">TCGPlayer (USD)</span>
                      <span className="block text-sm font-mono font-extrabold text-emerald-400 mt-0.5">
                        {formatCurrency(currentUsdPrice, 'USD')}
                      </span>
                      {cardDetail.pricing?.tcgplayer?.holofoil?.marketPrice && (
                        <span className="block text-[9px] text-zinc-500 mt-0.5">
                          Holo: {formatCurrency(cardDetail.pricing.tcgplayer.holofoil.marketPrice, 'USD')}
                        </span>
                      )}
                    </div>

                    {/* Aprox MXN (Pesos Mexicanos) */}
                    <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-center">
                      <span className="block text-[10px] text-zinc-400 font-medium">Aprox. (MXN)</span>
                      <span className="block text-sm font-mono font-extrabold text-amber-400 mt-0.5">
                        {formatCurrency(convertUsdToMxn(currentUsdPrice), 'MXN')}
                      </span>
                      <span className="block text-[9px] text-zinc-500 mt-0.5">
                        ~$20 MXN / USD
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botón de Acción para Vincular */}
                <div className="w-full pt-2">
                  {isCurrentCardBound ? (
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 flex items-center justify-center gap-2 text-xs font-bold text-emerald-300">
                        <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                        Tarjeta fijada en tu Binder
                      </div>
                      <button
                        onClick={handleUnassign}
                        disabled={saving}
                        className="w-full py-2 text-xs text-zinc-400 hover:text-red-400 border border-zinc-800 hover:border-red-900 rounded-xl transition cursor-pointer"
                      >
                        {saving ? 'Desvinculando...' : 'Desvincular esta tarjeta'}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleSaveSelection}
                      disabled={saving}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-950/50 cursor-pointer disabled:opacity-50"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Guardando en Supabase...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Vincular esta Tarjeta a mi Binder</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="h-80 flex flex-col items-center justify-center text-zinc-500">
                <Layers className="w-8 h-8 mb-2" />
                <span className="text-xs">Selecciona una tarjeta para ver sus detalles</span>
              </div>
            )}
          </div>

          {/* Columna Derecha (LG: 7 cols): Catálogo de Tarjetas Impresas */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-red-400" />
                Tarjetas Existentes ({cards.length} de {totalCardsCount})
              </h4>
              <span className="text-[11px] text-zinc-500">Haz clic en una carta para examinarla</span>
            </div>

            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center py-16 text-zinc-400">
                <Loader2 className="w-8 h-8 animate-spin text-red-500 mb-2" />
                <span className="text-xs">Cargando tarjetas desde TCGdex...</span>
              </div>
            ) : cards.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-16 text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">
                <Layers className="w-10 h-10 mb-2 text-zinc-600" />
                <p className="text-sm font-semibold text-zinc-400">No se encontraron tarjetas</p>
                <p className="text-xs text-zinc-500 mt-1">
                  Prueba cambiando a otro idioma (ej: English) o ajustando los filtros.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto max-h-[520px] pr-1 scrollbar-thin">
                {cards.map((c) => {
                  const isSelected = c.id === selectedCardId;
                  const isBound = collectionItem?.card_id === c.id;

                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCardId(c.id)}
                      className={`relative flex flex-col rounded-xl border p-2 text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-800/90 border-red-500 ring-2 ring-red-500/40 shadow-lg'
                          : isBound
                          ? 'bg-emerald-950/30 border-emerald-500/60'
                          : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900'
                      }`}
                    >
                      {/* Imagen miniatura */}
                      <div className="relative w-full aspect-[2.5/3.5] rounded-lg overflow-hidden bg-black/60 mb-2">
                        {c.image ? (
                          <Image
                            src={`${c.image}/low.webp`}
                            alt={c.name}
                            fill
                            sizes="120px"
                            className="object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-600 font-mono">
                            #{c.localId}
                          </div>
                        )}

                        {isBound && (
                          <div className="absolute top-1 left-1 p-1 rounded-md bg-emerald-500 text-zinc-950 shadow-md">
                            <BookmarkCheck className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      {/* Info de la carta */}
                      <p className="text-xs font-bold text-zinc-200 truncate">{c.name}</p>
                      <p className="text-[10px] text-zinc-400 font-mono truncate">
                        #{c.localId} • {c.id.split('-')[0].toUpperCase()}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-950 flex items-center justify-between text-xs text-zinc-500">
          <span>Fuente de datos: TCGdex API • Precios en tiempo real de TCGPlayer</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
