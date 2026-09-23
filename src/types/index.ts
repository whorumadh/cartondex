// ==============================================================================
// 🧬 TIPOS E INTERFACES DEL BESTIARIO POKÉMON TCG
// ==============================================================================

export type HorrorCategoryName =
  | 'Ancestro Común'
  | 'Depredación Voraz & Carnicería'
  | 'Horror Corporal & Mutación'
  | 'Horror Psíquico & Predación Mental'
  | 'Manifestación Espectral & Maldición'
  | 'Origen Cósmico & Ultraterreno'
  | 'Parasitismo & Simbiosis Hostil'
  | 'Toxicidad & Polución Letal'
  | 'Tragedia Biológica & Fatalidad';

export interface HorrorCategoryInfo {
  id: string;
  name: HorrorCategoryName;
  icon: string;
  countGen1: number;
  colorBorder: string;
  colorBg: string;
  colorText: string;
  glowColor: string;
  description: string;
}

export type PokemonFormType = 'Normal' | 'Mega' | 'Alola' | 'Gigantamax';

export interface Specimen {
  id: string;                  // Identificador único (ej: "0004", "0015-mega", "0088-alola")
  dexNumber: number;           // Número en la Pokédex Nacional (ej: 4, 15, 88)
  formattedId: string;         // Ej: "#0004"
  name: string;                // Ej: "Charmander"
  category: HorrorCategoryName;
  types: string[];             // Ej: ["Fire"], ["Ghost", "Poison"]
  generation: number;          // 1
  form: PokemonFormType;
  horrorExcerpt: string;       // Cita del horror de la Pokédex o criterio de clasificación
  officialArtworkUrl: string;  // Imagen oficial de alta resolución
  spriteUrl: string;           // Pixel sprite oficial
}

export type TcgLanguage = 'en' | 'es' | 'zh-tw' | 'zh-cn';

export interface TcgCardBrief {
  id: string;
  localId: string;
  name: string;
  image?: string;
}

export interface TcgCardDetail {
  id: string;
  localId: string;
  name: string;
  image?: string;
  rarity?: string;
  set?: {
    id: string;
    name: string;
    logo?: string;
    symbol?: string;
    cardCount?: {
      official: number;
      total: number;
    };
    releaseDate?: string;
  };
  types?: string[];
  stage?: string;
  description?: string;
  illustrator?: string;
  pricing?: {
    tcgplayer?: {
      unit?: string;
      normal?: {
        lowPrice?: number | null;
        midPrice?: number | null;
        marketPrice?: number | null;
      };
      holofoil?: {
        lowPrice?: number | null;
        midPrice?: number | null;
        marketPrice?: number | null;
      };
      'reverse-holofoil'?: {
        lowPrice?: number | null;
        midPrice?: number | null;
        marketPrice?: number | null;
      };
    };
    cardmarket?: {
      unit?: string;
      avg?: number | null;
      low?: number | null;
      trend?: number | null;
    };
  };
}

export interface CollectionItem {
  id?: string;
  specimen_id: string;
  generation: number;
  owned: boolean;
  card_id?: string | null;
  card_name?: string | null;
  card_image?: string | null;
  set_id?: string | null;
  set_name?: string | null;
  card_number?: string | null;
  rarity?: string | null;
  language?: TcgLanguage | string | null;
  price_usd?: number | null;
  price_eur?: number | null;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}
