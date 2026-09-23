// ==============================================================================
// 🧭 CATEGORÍAS TEMÁTICAS DE HORROR POKÉMON (GEN 1) — BASADAS EN AGENTS.MD
// ==============================================================================

import { HorrorCategoryInfo, HorrorCategoryName } from '@/types';

export const HORROR_CATEGORIES: Record<HorrorCategoryName, HorrorCategoryInfo> = {
  'Ancestro Común': {
    id: 'ancestro-comun',
    name: 'Ancestro Común',
    icon: '🧬',
    countGen1: 1,
    colorBorder: 'border-pink-500/50',
    colorBg: 'bg-pink-950/30',
    colorText: 'text-pink-400',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    description:
      'El origen biológico primigenio y arquetípico de donde emana todo el árbol filogenético Pokémon; la matriz molecular que alberga en potencia todas las mutaciones, venenos y aberraciones.',
  },
  'Depredación Voraz & Carnicería': {
    id: 'depredacion-carniceria',
    name: 'Depredación Voraz & Carnicería',
    icon: '🩸',
    countGen1: 19,
    colorBorder: 'border-red-500/50',
    colorBg: 'bg-red-950/30',
    colorText: 'text-red-400',
    glowColor: 'rgba(220, 38, 38, 0.4)',
    description:
      'Criaturas cuya ecología o combate involucran violencia gráfica, desmembramiento, consumo visceral, ataques despiadados o carnicería desmedida hacia presas o rivales.',
  },
  'Horror Corporal & Mutación': {
    id: 'horror-corporal-mutacion',
    name: 'Horror Corporal & Mutación',
    icon: '☣️',
    countGen1: 8,
    colorBorder: 'border-orange-500/50',
    colorBg: 'bg-orange-950/30',
    colorText: 'text-orange-400',
    glowColor: 'rgba(234, 88, 12, 0.4)',
    description:
      'Anomalías de la carne, ingeniería genética aberrante, metamorfosis perturbadoras, atrofia muscular o visibilidad grotesca de órganos internos que desafían la integridad biológica.',
  },
  'Horror Psíquico & Predación Mental': {
    id: 'horror-psiquico-predacion-mental',
    name: 'Horror Psíquico & Predación Mental',
    icon: '🧠',
    countGen1: 3,
    colorBorder: 'border-purple-500/50',
    colorBg: 'bg-purple-950/30',
    colorText: 'text-purple-400',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    description:
      'Depredación invasiva que vulnera el santuario de la mente, los sueños y la voluntad motriz mediante hipnosis forzada, parasitación onírica o danzas de control corporal irresistible.',
  },
  'Manifestación Espectral & Maldición': {
    id: 'manifestacion-espectral-maldicion',
    name: 'Manifestación Espectral & Maldición',
    icon: '👻',
    countGen1: 8,
    colorBorder: 'border-violet-500/50',
    colorBg: 'bg-violet-950/30',
    colorText: 'text-violet-400',
    glowColor: 'rgba(124, 58, 237, 0.4)',
    description:
      'Apariciones del más allá, espíritus errantes de humanos fallecidos, almas retenidas, maldiciones centenarias o fauces que actúan como portales al inframundo.',
  },
  'Origen Cósmico & Ultraterreno': {
    id: 'origen-cosmico-ultraterreno',
    name: 'Origen Cósmico & Ultraterreno',
    icon: '🌌',
    countGen1: 3,
    colorBorder: 'border-cyan-500/50',
    colorBg: 'bg-cyan-950/30',
    colorText: 'text-cyan-400',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    description:
      'Entidades biológicas o geométricas originadas fuera de la biosfera terrestre; organismos vinculados al espacio exterior, meteoritos y señales interestelares.',
  },
  'Parasitismo & Simbiosis Hostil': {
    id: 'parasitismo-simbiosis-hostil',
    name: 'Parasitismo & Simbiosis Hostil',
    icon: '🍄',
    countGen1: 4,
    colorBorder: 'border-lime-500/50',
    colorBg: 'bg-lime-950/30',
    colorText: 'text-lime-400',
    glowColor: 'rgba(132, 204, 22, 0.4)',
    description:
      'Relaciones simbióticas patológicas donde un organismo parásito drena, subyuga, anula o devora el cuerpo de su huésped hasta convertirlo en un títere o rehén biológico.',
  },
  'Toxicidad & Polución Letal': {
    id: 'toxicidad-polucion-letal',
    name: 'Toxicidad & Polución Letal',
    icon: '🧪',
    countGen1: 9,
    colorBorder: 'border-emerald-500/50',
    colorBg: 'bg-emerald-950/30',
    colorText: 'text-emerald-400',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    description:
      'Entidades biológicas o antropogénicas compuestas de desechos químicos, toxinas letales o efluvios ponzoñosos que marchitan la vida, corrompen el suelo o provocan asfixia fulminante.',
  },
  'Tragedia Biológica & Fatalidad': {
    id: 'tragedia-biologica-fatalidad',
    name: 'Tragedia Biológica & Fatalidad',
    icon: '☠️',
    countGen1: 8,
    colorBorder: 'border-slate-500/50',
    colorBg: 'bg-slate-900/40',
    colorText: 'text-slate-300',
    glowColor: 'rgba(148, 163, 184, 0.4)',
    description:
      'Pokémon atrapados en destinos biológicos crueles, condiciones físicas fatales fuera de su control o tragedias intrínsecas donde su propia fisiología o duelo perpetuo los condena al sufrimiento o la muerte.',
  },
};

export const CATEGORIES_LIST = Object.values(HORROR_CATEGORIES);
