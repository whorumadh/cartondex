// ==============================================================================
// ⚙️ MODAL DE GUÍA Y CONFIGURACIÓN DE SUPABASE
// ==============================================================================

'use client';

import React, { useState } from 'react';
import { Database, Check, Copy, ExternalLink, X, ShieldCheck, AlertCircle } from 'lucide-react';

interface SupabaseSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  isConfigured: boolean;
}

export function SupabaseSetupModal({ isOpen, onClose, isConfigured }: SupabaseSetupModalProps) {
  const [copiedEnv, setCopiedEnv] = useState(false);

  if (!isOpen) return null;

  const envSnippet = `NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Encabezado */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${isConfigured ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400' : 'bg-amber-950/60 border-amber-500/40 text-amber-400'}`}>
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                Conexión con Supabase
                {isConfigured ? (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-900/50 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Conectado
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-900/50 text-amber-400 border border-amber-500/40 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Pendiente
                  </span>
                )}
              </h3>
              <p className="text-xs text-zinc-400">
                Tu base de datos PostgreSQL en la nube para guardar tu Bestiario
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pasos */}
        <div className="mt-6 space-y-6">
          {/* Paso 1: SQL Script */}
          <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/30 shrink-0 mt-0.5">
                1
              </span>
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">
                  Ejecutar el script SQL en Supabase
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  En el repositorio tienes el archivo <code className="text-emerald-400 font-mono">supabase_schema.sql</code> listo.
                  Abre tu panel de Supabase &gt; <strong className="text-zinc-300">SQL Editor</strong>, pega el contenido y presiona <strong className="text-zinc-300">Run</strong>.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition"
                  >
                    Abrir Supabase Dashboard <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Paso 2: Variables de entorno */}
          <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/30 shrink-0 mt-0.5">
                2
              </span>
              <div className="w-full">
                <h4 className="text-sm font-semibold text-zinc-200">
                  Agregar variables en tu archivo <code className="text-emerald-400 font-mono">.env.local</code>
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  En Supabase ve a <strong className="text-zinc-300">Project Settings &gt; API</strong> y copia tu URL y tu llave anon:
                </p>

                <div className="relative mt-3 p-3 bg-black/60 border border-zinc-800 rounded-lg font-mono text-xs text-zinc-300">
                  <pre className="whitespace-pre-wrap select-all">{envSnippet}</pre>
                  <button
                    onClick={() => copyToClipboard(envSnippet)}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition flex items-center gap-1 text-[11px]"
                  >
                    {copiedEnv ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copiar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Paso 3: Vercel */}
          <div className="bg-zinc-900/70 border border-zinc-800/80 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs border border-emerald-500/30 shrink-0 mt-0.5">
                3
              </span>
              <div>
                <h4 className="text-sm font-semibold text-zinc-200">
                  Despliegue en Vercel
                </h4>
                <p className="text-xs text-zinc-400 mt-1">
                  Al desplegar tu proyecto en Vercel, agrega estas mismas 2 variables en la sección <strong className="text-zinc-300">Settings &gt; Environment Variables</strong> de tu proyecto en Vercel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
