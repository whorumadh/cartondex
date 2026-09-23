// ==============================================================================
// VERIFICACION DE ADMINISTRADOR EN EL SERVIDOR (PROTEGIDO)
// ==============================================================================

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userEmail = (body?.email || '').trim().toLowerCase();
    const configuredAdminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();

    // Si no se ha configurado ADMIN_EMAIL en el servidor, cualquier usuario autenticado en Supabase es admin inicial
    if (!configuredAdminEmail) {
      return NextResponse.json({
        isAdmin: true,
        notice: 'ADMIN_EMAIL no definido en servidor, acceso permitido para configuracion inicial',
      });
    }

    // Si esta configurado, se compara de forma estricta en el servidor
    const isAuthorized = userEmail.length > 0 && userEmail === configuredAdminEmail;

    return NextResponse.json({
      isAdmin: isAuthorized,
    });
  } catch (error) {
    return NextResponse.json(
      { isAdmin: false, error: 'Error al verificar credenciales' },
      { status: 500 }
    );
  }
}
