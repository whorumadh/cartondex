// ==============================================================================
// ACCESO PRIVADO AL PANEL DE ADMINISTRACION (RUTA OCULTA)
// ==============================================================================

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Lock, Mail, Key, ShieldCheck, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export default function AccesoBestiarioPage() {
  const router = useRouter();
  const { user, isAdmin, loading: authLoading, signIn, signUp, signOut } = useAdminAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Si ya esta autenticado como admin
  if (!authLoading && user && isAdmin) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-100">Sesion de Administrador Activa</h2>
            <p className="text-xs text-zinc-400 mt-1 font-mono">{user.email}</p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => router.push('/')}
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Ir al Bestiario en Modo Editor</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={async () => {
                await signOut();
                router.refresh();
              }}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs transition cursor-pointer"
            >
              Cerrar Sesion
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setErrorMsg('Por favor completa todos los campos');
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        const result = await signIn(email, password);
        if (!result.success) {
          setErrorMsg(result.error || 'Credenciales invalidas');
        } else {
          setSuccessMsg('Acceso concedido. Redirigiendo...');
          setTimeout(() => {
            router.push('/');
          }, 1000);
        }
      } else {
        const result = await signUp(email, password);
        if (!result.success) {
          setErrorMsg(result.error || 'No se pudo crear la cuenta');
        } else {
          setSuccessMsg(
            'Cuenta registrada con exito. Si Supabase requiere confirmacion, revisa tu bandeja de entrada.'
          );
          setTimeout(() => {
            router.push('/');
          }, 1500);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4 selection:bg-red-500 selection:text-white">
      <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

        {/* Encabezado */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 mx-auto flex items-center justify-center">
            <Lock className="w-5 h-5 text-red-500" />
          </div>
          <h2 className="text-xl font-extrabold text-zinc-100 tracking-tight">
            Acceso Privado al Bestiario
          </h2>
          <p className="text-xs text-zinc-500">
            Ingreso restringido exclusivamente para el propietario del binder
          </p>
        </div>

        {/* Selector de Modo */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition cursor-pointer ${
              mode === 'login'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Iniciar Sesion
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg(null);
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition cursor-pointer ${
              mode === 'register'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Registrar Cuenta
          </button>
        </div>

        {/* Mensajes de Alerta */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
              Correo Electronico
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu_correo@ejemplo.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-red-500 transition font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
              Contrasena
            </label>
            <div className="relative">
              <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-red-500 transition font-sans"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || authLoading}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition cursor-pointer shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verificando...</span>
              </>
            ) : mode === 'login' ? (
              <span>Acceder al Panel</span>
            ) : (
              <span>Crear Cuenta de Administrador</span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-900 text-center">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition cursor-pointer"
          >
            Volver a la vista publica
          </button>
        </div>
      </div>
    </div>
  );
}
