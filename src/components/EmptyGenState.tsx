// ==============================================================================
//  ESTADO VACÍO PARA GENERACIONES 2 A 9 (SIN PRELLENADO SEGÚN INDICACIÓN)
// ==============================================================================

'use client';

import React from 'react';
import { Skull, ArrowLeft, Archive, Search } from 'lucide-react';

interface EmptyGenStateProps {
  gen: number;
  onBackToGen1: () => void;
}

const REGION_NAMES: Record<number, string> = {
  2: 'Johto',
  3: 'Hoenn',
  4: 'Sinnoh',
  5: 'Unova / Teselia',
  6: 'Kalos',
  7: 'Alola',
  8: 'Galar',
  9: 'Paldea',
};

export function EmptyGenState({ gen, onBackToGen1 }: EmptyGenStateProps) {
  const region = REGION_NAMES[gen] || 'Desconocida';

  return (
    <div className="w-full my-8 p-8 sm:p-12 rounded-3xl bg-zinc-950/70 border border-zinc-800/80 text-center relative overflow-hidden shadow-2xl backdrop-blur-md">
      {/* Glow ambiental */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-zinc-900/90 border border-zinc-700/60 flex items-center justify-center text-zinc-400 shadow-xl">
            <Archive className="w-10 h-10 text-zinc-500" />
          </div>
          <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-red-950 border border-red-500/50 text-red-400">
            <Skull className="w-4 h-4" />
          </div>
        </div>

        <span className="text-xs font-mono tracking-widest text-red-400/90 uppercase px-3 py-1 rounded-full bg-red-950/40 border border-red-900/60 mb-3">
          Expediente Sellado • Generación {gen}
        </span>

        <h3 className="text-2xl font-bold text-zinc-100 tracking-tight">
          Región de {region} sin clasificar
        </h3>

        <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
          Los especímenes de esta generación aún no han sido analizados bajo la taxonomía de horror de la Pokédex. Por decisión de diseño del binder, no se realiza ningún prellenado automático.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onBackToGen1}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-sm transition shadow-lg shadow-red-950/50 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Gen 1 (63 Especímenes)
          </button>
        </div>
      </div>
    </div>
  );
}
