// ==============================================================================
// HOOK useAdminAuth — GESTION DE SESION Y VERIFICACION DE ADMINISTRADOR
// ==============================================================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { getSupabaseClient } from '@/lib/supabase';

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar en el servidor si el email del usuario es el administrador autorizado
  const verifyAdminStatus = useCallback(async (userEmail: string | undefined) => {
    if (!userEmail) {
      setIsAdmin(false);
      return false;
    }

    try {
      const res = await fetch('/api/auth/verify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await res.json();
      const authorized = !!data.isAdmin;
      setIsAdmin(authorized);
      return authorized;
    } catch (err) {
      console.error('Error al verificar privilegios de administrador:', err);
      setIsAdmin(false);
      return false;
    }
  }, []);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Comprobar sesion actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser?.email) {
        verifyAdminStatus(currentUser.email).finally(() => setLoading(false));
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });

    // Suscribirse a cambios de autenticacion
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser?.email) {
        await verifyAdminStatus(currentUser.email);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [verifyAdminStatus]);

  // Iniciar sesion
  const signIn = async (email: string, password: string) => {
    const supabase = getSupabaseClient();
    if (!supabase) return { success: false, error: 'Supabase no esta configurado' };

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      const authorized = await verifyAdminStatus(data.user?.email);
      if (!authorized) {
        await supabase.auth.signOut();
        return {
          success: false,
          error: 'Esta cuenta no tiene permisos de administrador para este Bestiario',
        };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Error al iniciar sesion' };
    }
  };

  // Crear cuenta de administrador inicial
  const signUp = async (email: string, password: string) => {
    const supabase = getSupabaseClient();
    if (!supabase) return { success: false, error: 'Supabase no esta configurado' };

    try {
      // Verificar previamente contra el servidor si el correo esta autorizado
      const authCheckRes = await fetch('/api/auth/verify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const authCheck = await authCheckRes.json();

      if (!authCheck.isAdmin) {
        return {
          success: false,
          error: 'El correo ingresado no coincide con el administrador autorizado',
        };
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        await verifyAdminStatus(data.user.email);
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Error al crear cuenta' };
    }
  };

  // Cerrar sesion
  const signOut = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  return {
    user,
    isAdmin,
    loading,
    signIn,
    signUp,
    signOut,
  };
}
