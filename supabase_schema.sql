-- ==============================================================================
-- 📜 SCRIPT DE BASE DE DATOS SUPABASE — BESTIARIO POKÉMON TCG
-- ==============================================================================
-- Instrucciones de instalación:
-- 1. Ve a tu proyecto en Supabase (https://supabase.com/dashboard)
-- 2. En el menú lateral izquierdo, haz clic en "SQL Editor"
-- 3. Haz clic en "New query"
-- 4. Pega todo el contenido de este archivo y presiona el botón "Run" (o Cmd/Ctrl + Enter)
-- 5. Ve a "Project Settings" -> "API" y copia la "Project URL" y la llave anon "Project API keys"
-- 6. Pégalas en tu archivo .env.local de este proyecto:
--    NEXT_PUBLIC_SUPABASE_URL=tu_url_aqui
--    NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
-- ==============================================================================

-- 1. Habilitar la extensión para UUID si no está activa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Crear la tabla principal de la colección del Bestiario
CREATE TABLE IF NOT EXISTS public.collection_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    specimen_id TEXT NOT NULL UNIQUE,       -- ID único del espécimen (ej: '0004', '0015-mega', '0088-alola', '0094-gmax')
    generation INT NOT NULL DEFAULT 1,      -- Generación del Pokémon (1 a 9)
    owned BOOLEAN NOT NULL DEFAULT false,   -- ¿Está en la colección/binder? (true / false)
    
    -- Datos de la tarjeta física seleccionada por el coleccionista
    card_id TEXT,                          -- ID de la carta en TCGdex (ej: 'sm115-37', 'base1-4')
    card_name TEXT,                        -- Nombre impreso en la tarjeta
    card_image TEXT,                       -- URL de imagen de la carta en alta resolución
    set_id TEXT,                           -- Identificador del set/expansión (ej: 'sm115', 'base1')
    set_name TEXT,                         -- Nombre legible de la expansión (ej: 'Hidden Fates', 'Jungle')
    card_number TEXT,                      -- Número de la tarjeta (ej: '37/68')
    rarity TEXT,                           -- Rareza (Common, Rare Holo, Secret Rare, etc.)
    language TEXT DEFAULT 'en',            -- Idioma de la carta elegida ('en', 'es', 'zh-tw', 'zh-cn')
    
    -- Cotización de mercado al momento del registro
    price_usd NUMERIC(10, 2),              -- Precio TCGPlayer Market / Normal / Holo en USD
    price_eur NUMERIC(10, 2),              -- Precio Cardmarket Trend en EUR
    
    -- Anotaciones personales y timestamps
    notes TEXT,                            -- Notas (ej: "Near Mint", "Firmada", "Caja 1")
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Crear índices para búsquedas ultra-rápidas
CREATE INDEX IF NOT EXISTS idx_collection_items_specimen_id ON public.collection_items (specimen_id);
CREATE INDEX IF NOT EXISTS idx_collection_items_generation ON public.collection_items (generation);
CREATE INDEX IF NOT EXISTS idx_collection_items_owned ON public.collection_items (owned);

-- 4. Habilitar Row Level Security (RLS)
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;

-- 5. Políticas de Acceso (Permitir lectura y modificación con la anon key para uso personal del binder)
-- Si en el futuro agregas autenticación con usuarios de Supabase, puedes restringir por auth.uid()

DROP POLICY IF EXISTS "Permitir lectura publica de la coleccion" ON public.collection_items;
CREATE POLICY "Permitir lectura publica de la coleccion" 
ON public.collection_items 
FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Permitir insercion de items de la coleccion" ON public.collection_items;
CREATE POLICY "Permitir insercion de items de la coleccion" 
ON public.collection_items 
FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir actualizacion de items de la coleccion" ON public.collection_items;
CREATE POLICY "Permitir actualizacion de items de la coleccion" 
ON public.collection_items 
FOR UPDATE 
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir eliminacion de items de la coleccion" ON public.collection_items;
CREATE POLICY "Permitir eliminacion de items de la coleccion" 
ON public.collection_items 
FOR DELETE 
USING (true);

-- 6. Otorgar permisos a los roles anon y authenticated de Supabase (Evita error 42501)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE public.collection_items TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- 6. Trigger automático para actualizar el campo updated_at al modificar un registro
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_collection_items ON public.collection_items;
CREATE TRIGGER trigger_update_collection_items
BEFORE UPDATE ON public.collection_items
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Comentario explicativo en la tabla
COMMENT ON TABLE public.collection_items IS 'Inventario del Bestiario Pokémon TCG con persistencia en Supabase';
