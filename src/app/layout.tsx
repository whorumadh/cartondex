import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#090a0f',
};

export const metadata: Metadata = {
  title: 'Bestiario Pokémon TCG — Catálogo de Horror & Binder Tracker',
  description:
    'Catálogo personal e inventario de colección del Bestiario Pokémon TCG fundamentado en la taxonomía oficial de horror de la Generación 1 con precios en vivo de TCGPlayer y Cardmarket.',
  keywords: [
    'Pokemon TCG',
    'Bestiario Pokemon',
    'Horror Pokemon',
    'Gen 1',
    'TCGPlayer',
    'Cardmarket',
    'Pokédex Horror',
    'Colección de Tarjetas',
  ],
  authors: [{ name: 'Pokemon Bestiary Collector' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-black text-zinc-100 font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
