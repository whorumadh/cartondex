// ==============================================================================
// 🧭 HEADER DEL BESTIARIO CON ESTADÍSTICAS GLOBALES Y ESTADO SUPABASE
// ==============================================================================

'use client';

import React from 'react';
import { Database, ShieldCheck, AlertCircle, BookOpen, DollarSign, TrendingUp, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface HeaderProps {
  totalSpecimens: number;
  ownedCount: number;
  totalUsd: number;
  totalEur: number;
  isConfigured: boolean;
  onOpenSetupModal: () => void;
}

export function Header({
  totalSpecimens,
  ownedCount,
  totalUsd,
  totalEur,
  isConfigured,
  onOpenSetupModal,
}: HeaderProps) {
  const percentage = totalSpecimens > 0 ? Math.round((ownedCount / totalSpecimens) * 100) : 0;

  return (
    <header className="relative w-full pt-8 pb-6 border-b border-zinc-800/80 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-transparent">
      {/* Luz ambiental sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-red-950/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Barra superior con Título y Estado Supabase */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-red-500 uppercase px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-900/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Grimorio &amp; Archivo de Coleccionista
              </span>
              <span className="text-xs text-zinc-500 font-mono">v1.0 • Kanto</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-100 tracking-tight mt-2 flex items-center gap-3">
              <span>BESTIARIO POKÉMON</span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Catálogo de clasificación de horror de la Generación 1 con cotización de tarjetas en tiempo real en inglés, español y chino.
            </p>
          </div>

          {/* Botón de Estado de Supabase */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={onOpenSetupModal}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition cursor-pointer shadow-lg ${
                isConfigured
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/70'
                  : 'bg-amber-950/50 border-amber-500/50 text-amber-300 hover:bg-amber-950/80 animate-pulse'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>
                {isConfigured ? 'Supabase Conectado' : 'Configurar Supabase'}
              </span>
              {isConfigured ? (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              )}
            </button>
          </div>
        </div>

        {/* Panel de Métricas y Valoración del Binder */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
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

          {/* Métrica 2: Valor Estimado TCGPlayer (USD) */}
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Valor Colección (TCGPlayer)
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">USD</span>
            </div>

            <div className="mt-2">
              <span className="text-2xl font-black text-emerald-400 font-mono tracking-tight">
                {formatCurrency(totalUsd, 'USD')}
              </span>
              <span className="block text-[11px] text-zinc-500 mt-0.5">
                Suma de tarjetas físicas registradas
              </span>
            </div>
          </div>

          {/* Métrica 3: Valor Estimado Cardmarket (EUR) */}
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                Valor Colección (Cardmarket)
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">EUR</span>
            </div>

            <div className="mt-2">
              <span className="text-2xl font-black text-cyan-400 font-mono tracking-tight">
                {formatCurrency(totalEur, 'EUR')}
              </span>
              <span className="block text-[11px] text-zinc-500 mt-0.5">
                Cotización media del mercado europeo
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
