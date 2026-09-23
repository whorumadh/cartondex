// ==============================================================================
// ️ SELECTOR DE GENERACIONES POKÉMON (GEN 1 A GEN 9)
// ==============================================================================

'use client';

import React from 'react';

export interface GenerationInfo {
  gen: number;
  roman: string;
  region: string;
  activeSpecimensCount: number;
}

const GENERATIONS: GenerationInfo[] = [
  { gen: 1, roman: 'GEN I', region: 'Kanto', activeSpecimensCount: 63 },
  { gen: 2, roman: 'GEN II', region: 'Johto', activeSpecimensCount: 0 },
  { gen: 3, roman: 'GEN III', region: 'Hoenn', activeSpecimensCount: 0 },
  { gen: 4, roman: 'GEN IV', region: 'Sinnoh', activeSpecimensCount: 0 },
  { gen: 5, roman: 'GEN V', region: 'Unova', activeSpecimensCount: 0 },
  { gen: 6, roman: 'GEN VI', region: 'Kalos', activeSpecimensCount: 0 },
  { gen: 7, roman: 'GEN VII', region: 'Alola', activeSpecimensCount: 0 },
  { gen: 8, roman: 'GEN VIII', region: 'Galar', activeSpecimensCount: 0 },
  { gen: 9, roman: 'GEN IX', region: 'Paldea', activeSpecimensCount: 0 },
];

interface GenerationSelectorProps {
  currentGen: number;
  onSelectGen: (gen: number) => void;
}

export function GenerationSelector({ currentGen, onSelectGen }: GenerationSelectorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Filtrar por Generación
        </span>
        <span className="text-xs text-zinc-500">
          {currentGen === 1 ? '63 Especímenes Clasificados' : 'Archivos en Investigación'}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 pb-2">
        {GENERATIONS.map((g) => {
          const isActive = currentGen === g.gen;
          const isComplete = g.activeSpecimensCount > 0;

          return (
            <button
              key={g.gen}
              onClick={() => onSelectGen(g.gen)}
              className={`group relative flex flex-col items-center justify-center min-w-[90px] sm:min-w-[108px] px-3.5 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-zinc-800/90 border-red-500/80 text-white shadow-lg shadow-red-950/40 ring-1 ring-red-500/50'
                  : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              {/* Indicador superior */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-extrabold tracking-wide font-mono">
                  {g.roman}
                </span>
                {isComplete && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                )}
              </div>

              {/* Región */}
              <span className="text-[11px] text-zinc-400 font-medium mt-0.5">
                {g.region}
              </span>

              {/* Badge de conteo */}
              <span
                className={`text-[9px] font-mono mt-1 px-1.5 py-0.2 rounded-full border ${
                  isComplete
                    ? 'bg-red-950/70 border-red-500/40 text-red-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                }`}
              >
                {isComplete ? `${g.activeSpecimensCount} docs` : 'Vacío'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
