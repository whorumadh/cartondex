// ==============================================================================
// 🧭 HEADER DEL BESTIARIO CON ESTADÍSTICAS GLOBALES (USD & MXN)
// ==============================================================================

'use client';

import React from 'react';
import { BookOpen, DollarSign, Coins } from 'lucide-react';
import { formatCurrency, convertUsdToMxn } from '@/lib/utils';

interface HeaderProps {
  totalSpecimens: number;
  ownedCount: number;
  totalUsd: number;
}

export function Header({
  totalSpecimens,
  ownedCount,
  totalUsd,
}: HeaderProps) {
  const percentage = totalSpecimens > 0 ? Math.round((ownedCount / totalSpecimens) * 100) : 0;
  const totalMxn = convertUsdToMxn(totalUsd);

  return (
    <header className="relative w-full pt-8 pb-6 border-b border-zinc-800/80 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-transparent">
      {/* Luz ambiental sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-red-950/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título principal */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-100 tracking-tight flex items-center gap-3">
              <span>BESTIARIO POKÉMON</span>
            </h1>
          </div>
        </div>

        {/* Panel de Métricas y Valoración del Binder (Progreso, USD y MXN) */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Métrica 1: Progreso */}
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-red-400" />
                Especímenes en Binder
              </span>
              <span className="font-mono text-zinc-300 font-bold">{percentage}%</span>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-zinc-100 font-mono tracking-tight">
                {ownedCount}
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                / {totalSpecimens} criaturas
              </span>
            </div>

            {/* Barra de progreso */}
            <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden mt-3 border border-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-red-600 via-pink-600 to-emerald-500 transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Métrica 2: Valor en USD (TCGPlayer) */}
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Valor Colección (USD)
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">TCGPlayer</span>
            </div>

            <div className="mt-2">
              <span className="text-2xl font-black text-emerald-400 font-mono tracking-tight">
                {formatCurrency(totalUsd, 'USD')}
              </span>
              <span className="block text-[11px] text-zinc-500 mt-0.5">
                Cotización de mercado en dólares
              </span>
            </div>
          </div>

          {/* Métrica 3: Valor Estimado en MXN (Pesos Mexicanos) */}
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                Valor Estimado (MXN)
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Pesos Mexicanos</span>
            </div>

            <div className="mt-2">
              <span className="text-2xl font-black text-amber-400 font-mono tracking-tight">
                {formatCurrency(totalMxn, 'MXN')}
              </span>
              <span className="block text-[11px] text-zinc-500 mt-0.5">
                Aprox. en pesos mexicanos (~$20 MXN/USD)
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
