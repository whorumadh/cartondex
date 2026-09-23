# DIRECTIVAS DE DESARROLLO Y REGLAS DE CODIFICACION — AGENTS.MD

## REGLAS ESTRICTAS DE DESARROLLO (NO NEGOCIABLES)

1. **PROHIBICION ABSOLUTA DE EMOJIS:**
   - **JAMAS deben incluirse emojis en el codigo bajo ninguna circunstancia**:
     - No usar emojis en archivos de componentes (.tsx, .jsx, .html).
     - No usar emojis en datos, constantes, arreglos ni objetos (.ts, .js, .json).
     - No usar emojis en comentarios de codigo ni cabeceras de archivos.
     - No usar emojis en la interfaz de usuario, botones, titulos, badges ni banderas de idiomas.
     - Usar exclusivamente tipografia limpia, diseno sobrio o en su defecto iconos vectoriales SVG discretos (como la libreria Lucide Icons).

2. **GESTOR DE PAQUETES Y HERRAMIENTAS:**
   - Usar estrictamente **pnpm** como gestor de paquetes por directiva de seguridad y rendimiento.
   - Framework: **Next.js (App Router)** con **TypeScript** y **Tailwind CSS**.

3. **BASE DE DATOS Y PERSISTENCIA:**
   - Persistencia exclusivamente en **Supabase (PostgreSQL)** en la nube.
   - Cero almacenamiento en LocalStorage.
   - Las paginas y componentes publicos no deben mostrar botones de configuracion de base de datos ni advertencias tecnicas a los usuarios finales.

4. **MONEDAS Y COTIZACIONES:**
   - Mostrar precios exclusivamente en **USD ($)** mediante la API de TCGPlayer y su estimacion en **MXN ($)** (pesos mexicanos).
   - No utilizar ni mostrar monedas ni referencias del mercado europeo (EUR / Cardmarket).

5. **TAXONOMIA DE HORROR Y GENERACIONES:**
   - **Gen 1 (Kanto):** Catalogo completo de 63 especimenes distribuidos en las 9 categorias oficiales detalladas a continuacion.
   - **Gen 2 a 9:** Listadas en la interfaz para navegacion, pero estrictamente vacias (sin prellenado automatico) hasta que se realice la clasificacion oficial.

---

# Taxonomia y Categorias de Horror Pokemon (Gen 1)

Este documento define la taxonomia oficial de categorias tematicas de horror para los Pokemon de la **Generacion 1** (incluyendo formas regionales de Alola, Megaevoluciones y formas Gigamax derivadas de dicha generacion), con base estricta en las descripciones oficiales de la **Pokedex**.

---

## Principios Rectores y Criterio de Seleccion

1. **Fidelidad Estricta a la Pokedex:** La asignacion a cada categoria se fundamenta exclusivamente en lo que el texto oficial de las entradas de la Pokedex describe de forma explicita.
2. **Cero Extrapolacion Infundada:** No se asumen rasgos por parentesco evolutivo a menos que la propia entrada de la especie o forma lo especifique.
3. **Horror Biologico, Psicologico y Tematico:** Se contemplan las dimensiones de horror corporal, depredacion letal, decadencia ambiental, perturbacion mental, fatalismo existencial y anomalias de la naturaleza.

---

## Definicion de Categorias y Criterios de Inclusion (Orden Alfabetico)

A continuacion se detallan las **9 categorias finales** en orden alfabetico, su marco conceptual, que tipo de criaturas albergan y la lista de Pokemon correspondientes:

---

### 1. Ancestro Comun (1 especimen)

* **Definicion Conceptual:**
  El origen biologico primigenio y arquetipico de donde emana todo el arbol filogenetico Pokemon; la matriz molecular que alberga en potencia todas las mutaciones, venenos, organos depredadores y aberraciones de la franquicia.
* **Criterios de Inclusion:**
  - Poseer en su genoma el mapa de ADN de todos los Pokemon existentes en el universo.
* **Especie Incluida:**
  - `#0151` Mew

---

### 2. Depredacion Voraz & Carniceria (19 especimenes)

* **Definicion Conceptual:**
  Criaturas cuya ecologia, metodos de caza o estilo de combate involucran violencia grafica, desmembramiento, consumo visceral, ataques despiadados o carniceria desmedida hacia presas o rivales.
* **Criterios de Inclusion:**
  - Desgarrar, cortar o partir en dos a las presas (*"torn in half"*, *"splits them apart"*, *"dress its prey"*).
  - Destruir o rematar al rival derribado con crueldad y sin piedad (*"mercilessly"*, *"without pity"*).
  - Drenar sangre o fluidos internos mediante colmillos, aguijones o guadanas.
  - Provocar devastacion masiva descontrolada y prolongada en pueblos o habitats.
* **Especies / Formas Incluidas:**
  - `#0005` Charmeleon
  - `#0015` Beedrill
  - `#0015` Mega Beedrill
  - `#0020` Raticate
  - `#0024` Arbok
  - `#0028` Sandslash
  - `#0034` Nidoking
  - `#0042` Golbat
  - `#0053` Persian
  - `#0070` Weepinbell
  - `#0071` Victreebel
  - `#0073` Tentacruel
  - `#0076` Golem
  - `#0123` Scyther
  - `#0127` Pinsir
  - `#0127` Mega Pinsir
  - `#0130` Gyarados
  - `#0130` Mega Gyarados
  - `#0141` Kabutops

---

### 3. Horror Corporal & Mutacion (8 especimenes)

* **Definicion Conceptual:**
  Anomalias de la carne, ingenieria genetica aberrante, metamorfosis perturbadoras, atrofia muscular o visibilidad grotesca de organos internos que desafian la integridad biologica y la identidad del ser.
* **Criterios de Inclusion:**
  - Disolucion y licuefaccion interna de organos durante fases larvarias o crisalidas.
  - Transparencia cutanea que deja visceras e intestinos en espiral a la vista.
  - Metamorfosis involuntarias de seres humanos en monstruos.
  - Crecimiento desmedido de masa cerebral que atrofia la locomocion o deforma el craneo.
  - Inestabilidad celular y mutaciones forzadas en laboratorio sin compasion.
  - Erupciones oseas o petreas que desgarran la piel desde el interior provocando agonia.
* **Especies / Formas Incluidas:**
  - `#0011` Metapod
  - `#0060` Poliwag
  - `#0064` Kadabra
  - `#0065` Alakazam
  - `#0065` Mega Alakazam
  - `#0132` Ditto
  - `#0142` Mega Aerodactyl
  - `#0150` Mewtwo

---

### 4. Horror Psiquico & Predacion Mental (3 especimenes)

* **Definicion Conceptual:**
  Depredacion y manipulacion invasiva que vulnera el santuario de la mente, los suenos y la voluntad motriz mediante hipnosis forzada, parasitacion onirica o danzas de control corporal irresistible.
* **Criterios de Inclusion:**
  - Acechar a personas dormidas sobre sus almohadas para devorar sus suenos a traves de las fosas nasales.
  - Hipnotizar a personas o ninos humanos y secuestrarlos fuera del entorno seguro.
  - Forzar ritmos biomecanicos en humanos y Pokemon que los obligan a bailar sin control hasta el desfallecimiento.
* **Especies / Formas Incluidas:**
  - `#0096` Drowzee
  - `#0097` Hypno
  - `#0124` Jynx

---

### 5. Manifestacion Espectral & Maldicion (8 especimenes)

* **Definicion Conceptual:**
  Apariciones del mas alla, espiritus errantes de humanos fallecidos, almas retenidas, maldiciones centenarias o umbrales directos hacia el inframundo.
* **Criterios de Inclusion:**
  - Cuerpos compuestos por almas de personas que fallecieron envenenadas o asfixiadas.
  - Robar la fuerza vital de personas en momentos de vulnerabilidad o inducir hipotermia subita.
  - Haber sido humano en el pasado y buscar llevarse a otros para no estar solo.
  - Portar maldiciones de venganza que duran mil anos transmitiendose entre generaciones.
  - Estar poseido o imbuido por el espiritu de un difunto.
  - Fauces que actuan como puertas directas al reino de los muertos (*netherworld*).
* **Especies / Formas Incluidas:**
  - `#0038` Ninetales
  - `#0055` Golduck
  - `#0092` Gastly
  - `#0093` Haunter
  - `#0094` Gengar
  - `#0094` Mega Gengar
  - `#0094` Gigantamax Gengar
  - `#0107` Hitmonchan

---

### 6. Origen Cosmico & Ultraterreno (3 especimenes)

* **Definicion Conceptual:**
  Entidades cuyo origen se situa fuera de la biosfera terrestre; organismos vinculados al espacio exterior, meteoritos y comunicacion interestelar que representan lo enigmatico y desconocido del cosmos.
* **Criterios de Inclusion:**
  - Poblaciones biologicas asociadas a crateres de meteoritos y piedras lunares, con reportes de avistamientos OVNI.
  - Cuerpos geometricos no convencionales que emiten senales de radio y destellos hacia el cielo nocturno y estrellas distantes.
* **Especies / Formas Incluidas:**
  - `#0035` Clefairy
  - `#0036` Clefable
  - `#0121` Starmie

---

### 7. Parasitismo & Simbiosis Hostil (4 especimenes)

* **Definicion Conceptual:**
  Relaciones simbioticas patologicas donde un organismo parasito drena, subyuga, anula o devora el cuerpo de su huesped hasta convertirlo en un titere o rehen biologico.
* **Criterios de Inclusion:**
  - Hongos entomopatogenos que colonizan al huesped desde el nacimiento y lo reemplazan biologicamente al morir (*zombie fungico*).
  - Parasitos que inoculan toxinas anestesicas para bloquear el dolor del huesped mientras se alimentan de sus sobras.
  - Organismos que crecen desproporcionadamente hasta engullir al portador casi en su totalidad.
* **Especies / Formas Incluidas:**
  - `#0046` Paras
  - `#0047` Parasect
  - `#0080` Slowbro
  - `#0080` Mega Slowbro

---

### 8. Toxicidad & Polucion Letal (9 especimenes)

* **Definicion Conceptual:**
  Entidades biologicas o antropogenicas compuestas de desechos quimicos, toxinas letales o efluvios ponzonosos que marchitan la vida, corrompen el suelo o provocan asfixia inmediata en cualquier ser vivo cercano.
* **Criterios de Inclusion:**
  - Liquidos, polvos o espinas que matan o marchitan vegetacion y arboles al contacto instantaneo.
  - Vapores y fluidos fetidos que causan desmayos, alergias graves o envenenamiento fulminante a distancia.
  - Lodos toxicos industriales o espumas alcalinas causticas capaces de disolver carne y materiales.
* **Especies / Formas Incluidas:**
  - `#0029` Nidoran F
  - `#0044` Gloom
  - `#0045` Vileplume
  - `#0088` Grimer
  - `#0088` Alolan Grimer
  - `#0089` Muk
  - `#0099` Gigantamax Kingler
  - `#0109` Koffing
  - `#0110` Weezing

---

### 9. Tragedia Biologica & Fatalidad (8 especimenes)

* **Definicion Conceptual:**
  Pokemon atrapados en destinos biologicos crueles, condiciones fisicas fatales fuera de su propio control o tragedias intrinsecas a su ciclo de vida donde su propia fisiologia o luto constante los condena al sufrimiento o la muerte.
* **Criterios de Inclusion:**
  - Nacer con una debilidad biologica que extingue su vida si falla (la flama de la cola, crecimiento incontrolado de incisivos).
  - Morir como consecuencia directa de su propio estado mental o fisiologico (ira descontrolada que provoca la muerte biologica).
  - Trastornos y dolores cronicos insoportables (jaquecas incapacitantes continuas).
  - Vinculos funebres de duelo perpetuo (portar los restos o craneo de una madre fallecida).
  - Inercia biomecanica destructiva e incontrolable (rodar sin frenos cuesta abajo).
  - Riesgo de asfixia autoprovocada al no poder detener una funcion instintiva (cantar hasta agotar el aire).
* **Especies / Formas Incluidas:**
  - `#0004` Charmander
  - `#0019` Rattata
  - `#0039` Jigglypuff
  - `#0054` Psyduck
  - `#0057` Primeape
  - `#0075` Graveler
  - `#0104` Cubone
  - `#0105` Marowak

---

## Matriz de Distribucion por Categoria

| Categoria Tematica | Conteo | Porcentaje Aprox. |
|---|:---:|:---:|
| **Ancestro Comun** | 1 | 1.6% |
| **Depredacion Voraz & Carniceria** | 19 | 30.2% |
| **Horror Corporal & Mutacion** | 8 | 12.7% |
| **Horror Psiquico & Predacion Mental** | 3 | 4.8% |
| **Manifestacion Espectral & Maldicion** | 8 | 12.7% |
| **Origen Cosmico & Ultraterreno** | 3 | 4.8% |
| **Parasitismo & Simbiosis Hostil** | 4 | 6.3% |
| **Toxicidad & Polucion Letal** | 9 | 14.3% |
| **Tragedia Biologica & Fatalidad** | 8 | 12.7% |
| **Total General** | **63** | **100%** |
