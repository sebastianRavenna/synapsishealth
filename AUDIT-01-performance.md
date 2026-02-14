# Auditoría UX/UI y SEO — Synapsis Health
## Parte 01: Performance & Core Web Vitals (PRIORIDAD CRÍTICA)

**Fecha:** 2026-02-14
**Sitio:** https://synapsishealth.vercel.app
**Stack:** HTML5 estático + Tailwind CSS 3.4 + Vanilla JS + Vercel
**Páginas auditadas:** `index.html`, `equipo.html`, `servicios.html`

---

## 1. ANÁLISIS DE PERFORMANCE

### 1.1 Imágenes sin lazy loading

**Estado:** ⚠️ ADVERTENCIA (condicional)

No hay imágenes `<img>` en el proyecto actual. Todas las imágenes están como placeholders (divs con texto). Cuando se agreguen imágenes reales:

**Recomendación de código:**
```html
<!-- ACTUAL (placeholder) -->
<div class="aspect-[4/3] bg-graphite-50 ...">
  <span class="overline text-graphite-200">Imagen institucional</span>
</div>

<!-- RECOMENDADO cuando se agreguen imágenes: -->
<img src="assets/img/institucional.webp"
     alt="Equipo de Synapsis Health en reunión estratégica"
     loading="lazy"
     width="800" height="600"
     class="aspect-[4/3] rounded-2xl object-cover">
```

**Ubicaciones afectadas:**
- `index.html:250` — Imagen institucional (sección Quiénes Somos)
- `index.html:420` — Imagen diferencial
- `index.html:476` — Imagen académica
- `servicios.html:163,192,214,236,258,279` — 6 imágenes de servicios
- `equipo.html:115-161` — 4 fotos de equipo (dentro de botones tab)
- `equipo.html:179,209,233,253` — 4 fotos grandes de miembros

**Impacto:** Alto — Sin `loading="lazy"`, todas las imágenes below-the-fold se cargarían de golpe.

---

### 1.2 Formato de imágenes

**Estado:** ⚠️ ADVERTENCIA (pendiente de assets)

No hay imágenes reales todavía. Cuando se incorporen:

**Recomendación:**
```html
<!-- Usar <picture> con WebP + fallback -->
<picture>
  <source srcset="assets/img/hero.avif" type="image/avif">
  <source srcset="assets/img/hero.webp" type="image/webp">
  <img src="assets/img/hero.jpg" alt="..." loading="lazy" width="800" height="600">
</picture>
```

**Impacto:** Alto — WebP reduce ~30% vs JPEG, AVIF ~50%.

---

### 1.3 Imágenes sin width/height (CLS)

**Estado:** ⚠️ ADVERTENCIA (condicional)

Los placeholders actuales usan `aspect-[4/3]` y `aspect-[16/7]` via Tailwind, lo cual **reserva espacio correctamente** y evita CLS. Esto es buena práctica.

**Ubicaciones con aspect ratio definido:**
- `index.html:250` → `aspect-[4/3]` ✅
- `index.html:420` → `aspect-[4/3]` ✅
- `index.html:476` → `aspect-[4/3]` ✅
- `servicios.html:163` → `aspect-[16/7]` ✅

**Recomendación:** Cuando se reemplacen por `<img>`, agregar `width` y `height` explícitos para mantener la reserva de espacio antes de que CSS cargue.

**Impacto:** Medio — Bien resuelto con placeholders, vigilar al agregar imágenes reales.

---

### 1.4 Imágenes sobredimensionadas

**Estado:** ✅ N/A — No hay imágenes reales aún.

**Recomendación futura:** Servir imágenes al tamaño máximo de visualización:
- Hero: max 1920px ancho
- Cards/secciones: max 800px
- Fotos equipo: max 400px
- Thumbnails tabs: max 128px

---

### 1.5 Implementación de srcset

**Estado:** ⚠️ PENDIENTE (para cuando se agreguen imágenes)

**Recomendación:**
```html
<img srcset="assets/img/hero-480.webp 480w,
             assets/img/hero-800.webp 800w,
             assets/img/hero-1200.webp 1200w,
             assets/img/hero-1920.webp 1920w"
     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
     src="assets/img/hero-800.webp"
     alt="..." loading="lazy" width="800" height="600">
```

---

### 1.6 Fuentes web sin font-display: swap

**Estado:** ✅ CORRECTO

`index.html:32`, `equipo.html:30`, `servicios.html:30`:
```
fonts.googleapis.com/css2?family=...&display=swap
```
El parámetro `display=swap` está presente en la URL de Google Fonts → genera `font-display: swap` en el CSS descargado.

**Impacto:** Ninguno — Bien implementado.

---

### 1.7 Carga de fuentes (subsetting, formatos woff2)

**Estado:** ⚠️ ADVERTENCIA

**Hallazgo:** Se cargan 3 familias tipográficas con múltiples pesos en una sola request a Google Fonts:
```
Playfair+Display:wght@400;500;600
Jost:wght@200;300;400;500
DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500
```

Esto son **10 pesos tipográficos** en total. Google Fonts sirve woff2 automáticamente, pero la cantidad de pesos es elevada.

**Ubicación:** Las 3 páginas, línea 30-32 del `<head>`.

**Recomendación:**
- Reducir pesos si es posible. Según uso real en el CSS:
  - `Playfair Display`: solo se usa para `.font-logo` → podría bastar con `wght@400` (1 peso)
  - `Jost`: se usa `font-extralight` (200), `font-light` (300), `font-normal` (400), `font-medium` (500) → 4 pesos justificados
  - `DM Sans`: se usa `font-light` (300), `font-normal` (400), `font-medium` (500) → 3 pesos justificados

```html
<!-- OPTIMIZADO: de 10 a 8 pesos, eliminando Playfair 500 y 600 no usados -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400&family=Jost:wght@200;300;400;500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
```

**Impacto:** Medio — Cada peso adicional añade ~15-25KB. Eliminar 2 pesos ahorra ~30-50KB.

---

### 1.8 CSS/JS sin minificar

**Estado:** ✅ CORRECTO (parcial)

- **CSS:** `package.json` tiene `"build": "npx tailwindcss ... --minify"` → CSS se minifica en producción. ✅
- **JS:** `js/main.js` (250 líneas) y `js/i18n.js` (427 líneas) **NO están minificados**. ❌

**Recomendación:**
```json
// package.json — agregar minificación de JS al build
{
  "scripts": {
    "build": "npx tailwindcss -i ./css/input.css -o ./styles.css --minify && npx terser js/main.js -o js/main.min.js && npx terser js/i18n.js -o js/i18n.min.js"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "terser": "^5.0.0"
  }
}
```
Y luego en los HTML usar `main.min.js` e `i18n.min.js` en producción.

**Impacto:** Medio — main.js (~6KB) + i18n.js (~15KB) podrían reducirse ~40-50% con minificación.

---

### 1.9 JavaScript bloqueante en el `<head>`

**Estado:** ✅ CORRECTO

Los scripts están al final del `<body>`, no en el `<head>`:
```html
<!-- index.html:751-752, equipo.html:308-309, servicios.html:341-342 -->
  <script src="./js/i18n.js"></script>
  <script src="./js/main.js"></script>
</body>
```

Están correctamente ubicados al final del body, por lo que no bloquean el renderizado inicial.

**Impacto:** Ninguno — Bien implementado.

---

### 1.10 CSS crítico inline vs carga tardía

**Estado:** ⚠️ ADVERTENCIA

**Hallazgo:** Todo el CSS se carga como un archivo externo:
```html
<link rel="stylesheet" href="./styles.css">
```

No hay CSS crítico inlineado. Para un sitio estático pequeño esto es aceptable, pero no óptimo.

**Recomendación (mejora opcional):**
Inline el CSS del above-the-fold (navbar + hero) en un `<style>` en el `<head>`, y cargar el resto con `media="print" onload`:
```html
<style>
  /* CSS crítico: navbar, hero, tipografía base (~2-3KB) */
  body { font-family: 'DM Sans', sans-serif; ... }
  .container-site { ... }
  #navbar { ... }
  /* etc */
</style>
<link rel="stylesheet" href="./styles.css" media="print" onload="this.media='all'">
```

**Impacto:** Bajo-Medio — El CSS de Tailwind compilado es relativamente pequeño para un sitio de 3 páginas.

---

### 1.11 Uso de async/defer en scripts

**Estado:** ⚠️ ADVERTENCIA

**Hallazgo:** Los scripts no usan `async` ni `defer`:
```html
<!-- index.html:751-752 -->
<script src="./js/i18n.js"></script>
<script src="./js/main.js"></script>
```

Aunque están al final del body (mitigando el bloqueo), `defer` sería más semánticamente correcto y permitiría al browser optimizar la carga.

**Recomendación:**
```html
<script src="./js/i18n.js" defer></script>
<script src="./js/main.js" defer></script>
```

**Nota:** Ambos scripts usan `DOMContentLoaded`, por lo que `defer` es compatible. Sin embargo, `i18n.js` debe cargar antes que `main.js` (orden de ejecución), y `defer` mantiene el orden, así que es seguro.

**Impacto:** Bajo — Ya están al final del body, la mejora sería marginal.

---

### 1.12 Librerías/dependencias no utilizadas

**Estado:** ✅ CORRECTO

**Frontend:** Solo Tailwind CSS (dev dependency, no se envía al cliente). No hay jQuery, Bootstrap, ni ninguna librería JS en el frontend. El JS es 100% vanilla.

**Backend:** Express, cors, dotenv, nodemailer — todas utilizadas en `backend/server.js`.

**Impacto:** Ninguno — Stack mínimo y limpio.

---

### 1.13 Recursos externos que bloqueen rendering

**Estado:** ⚠️ ADVERTENCIA

**Hallazgo:** Google Fonts es un recurso externo render-blocking:
```html
<!-- Líneas 30-32 en las 3 páginas -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
```

El `preconnect` mitiga parcialmente el problema (ahorra ~100-200ms de DNS+TCP+TLS), pero el `<link rel="stylesheet">` sigue siendo render-blocking.

**Recomendación (mejora opcional):**
```html
<!-- Opción 1: Cargar fonts de forma no bloqueante -->
<link rel="preload" as="style"
      href="https://fonts.googleapis.com/css2?family=...&display=swap"
      onload="this.onload=null;this.rel='stylesheet'">
<noscript>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=...&display=swap">
</noscript>

<!-- Opción 2 (mejor): Self-host las fuentes con archivos woff2 locales -->
```

**Impacto:** Medio — Google Fonts es la dependencia externa más significativa.

---

### 1.14 Tamaño total del bundle

**Estado:** ✅ CORRECTO (estimado)

| Recurso | Tamaño estimado | Comprimido (gzip) |
|---|---|---|
| `index.html` | ~45KB | ~12KB |
| `equipo.html` | ~20KB | ~5KB |
| `servicios.html` | ~23KB | ~6KB |
| `styles.css` (Tailwind compilado) | ~15-25KB | ~4-6KB |
| `main.js` | ~6KB | ~2KB |
| `i18n.js` | ~15KB | ~4KB |
| Google Fonts CSS | ~3KB | ~1KB |
| Font files (woff2) | ~80-120KB | N/A (ya comprimidos) |
| **Total por página** | **~165-215KB** | **~30-35KB + fonts** |

Esto es **excelente** para un sitio web. Muy por debajo del threshold de 500KB recomendado.

---

## 2. CORE WEB VITALS DESDE CÓDIGO

### 2.1 Elementos que cambien tamaño después de carga (CLS)

**Estado:** ✅ CORRECTO (mayormente)

**Bien hecho:**
- Placeholders de imágenes usan `aspect-[4/3]` y `aspect-[16/7]` → reservan espacio ✅
- Navbar tiene altura fija `h-20` (80px) ✅
- El hero tiene `min-h-[90vh]` → tamaño predecible ✅

**Riesgo potencial:**
- `index.html:138` — La sección hero usa `min-h-[90vh]` pero su contenido es dinámico (reveal animations). Los elementos `.reveal` empiezan con `opacity-0 translate-y-5` y se animan a `opacity-100 translate-y-0`. El `translate-y-5` (20px) **NO causa CLS** porque `transform` no afecta el layout. ✅

- La clase `.reveal` usa `translate-y` (transform), no `margin-top`, así que no genera layout shifts. ✅

**Impacto:** Ninguno — Bien implementado.

---

### 2.2 Reserva de espacio para ads, embeds, iframes

**Estado:** ✅ N/A

No hay ads, embeds ni iframes en el sitio.

---

### 2.3 Animaciones CSS que afecten layout

**Estado:** ✅ CORRECTO

**Animación principal** (`css/input.css:95-100`):
```css
.reveal {
  @apply opacity-0 translate-y-5 transition-all duration-700 ease-out;
}
.reveal.visible {
  @apply opacity-100 translate-y-0;
}
```

Usa `opacity` y `transform` (translate-y) → propiedades que se procesan en el **compositor**, no afectan layout. Esto es la mejor práctica para animaciones performantes.

**Animación en tailwind.config.js:**
```js
keyframes: { 'fade-up': { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { ... } } }
```
También usa solo opacity + transform. ✅

**Impacto:** Ninguno — Animaciones correctamente implementadas.

---

### 2.4 Cargas de contenido dinámico sin skeleton/placeholder

**Estado:** ⚠️ ADVERTENCIA

**Hallazgo 1 — Tabs de servicios y equipo:**
Cuando se cambia de tab, el contenido se muestra/oculta con `hidden`. No hay skeleton loading, pero la transición es instantánea (el contenido ya está en el DOM), por lo que no se necesita skeleton.

**Hallazgo 2 — Formulario de contacto:**
Al enviar el formulario (`main.js:215-237`):
```javascript
btn.disabled = true;
btn.textContent = "Enviando...";
```
El botón cambia a "Enviando..." → esto es feedback de loading. ✅

Sin embargo, **no hay spinner ni indicador visual** más allá del cambio de texto.

**Recomendación:**
```javascript
// Agregar clase de loading al botón
btn.disabled = true;
btn.innerHTML = '<svg class="animate-spin h-4 w-4 mr-2 inline" viewBox="0 0 24 24">...</svg> Enviando...';
```

**Hallazgo 3 — i18n (cambio de idioma):**
Al cambiar idioma, `applyTranslations()` recorre todos los `[data-i18n]` y cambia el texto. Esto puede causar un flash momentáneo en contenido pesado. No hay skeleton ni indicador de transición.

**Impacto:** Bajo — El contenido dinámico es mínimo y está pre-cargado en el DOM.

---

### 2.5 Largest Contentful Paint (elemento hero/principal)

**Estado:** ✅ CORRECTO

El LCP probable en `index.html` es el `<h1>`:
```html
<!-- index.html:142-144 -->
<h1 class="text-display-xl font-logo font-normal text-graphite-900 mb-6 reveal">
  Transformamos evidencia en decisiones sanitarias eficientes.
</h1>
```

**Análisis:**
- Es texto, no imagen → LCP depende de la carga de la fuente (Playfair Display)
- `font-display: swap` está configurado → el texto se muestra inmediatamente con fallback, luego swap
- `preconnect` a Google Fonts está configurado → reduce latencia
- No hay imágenes hero que compitan por el LCP

**Riesgo:** La clase `.reveal` hace que el H1 empiece con `opacity: 0`. Esto **puede afectar LCP** porque el browser podría no contar un elemento invisible como LCP candidate hasta que se hace visible.

**Recomendación:**
```html
<!-- Excluir el H1 del hero de la animación reveal, o hacerlo visible inmediatamente -->
<h1 class="text-display-xl font-logo font-normal text-graphite-900 mb-6">
  Transformamos evidencia en decisiones sanitarias eficientes.
</h1>
```

O aplicar la clase `visible` inmediatamente al H1 del hero sin esperar al IntersectionObserver.

**Impacto:** Alto — El LCP podría verse penalizado si el H1 empieza invisible.

---

### 2.6 Event handlers que puedan causar delay (FID/INP)

**Estado:** ✅ CORRECTO

**Revisión de handlers en `main.js`:**

| Handler | Línea | Tipo | Riesgo FID |
|---|---|---|---|
| `scroll` (navbar) | 77 | `{ passive: true }` | Ninguno ✅ |
| `click` (mobile menu open) | 39 | Clases CSS toggle | Ninguno ✅ |
| `click` (mobile menu close) | 40-42 | Clases CSS toggle | Ninguno ✅ |
| `click` (smooth scroll) | 87 | `scrollTo` | Ninguno ✅ |
| `click` (service tabs) | 110-137 | Clases CSS toggle | Ninguno ✅ |
| `click` (team tabs) | 150-186 | Clases CSS + scroll | Ninguno ✅ |
| `submit` (contact form) | 200-238 | `async fetch` | Ninguno ✅ |

Todos los handlers son livianos (manipulación de clases CSS, fetch asíncrono). El scroll listener usa `{ passive: true }`. No hay operaciones síncronas pesadas.

**Impacto:** Ninguno — Handlers bien implementados.

---

## RESUMEN DE PERFORMANCE & CORE WEB VITALS

| Ítem | Estado | Impacto | Acción |
|---|---|---|---|
| Imágenes lazy loading | ⚠️ Pendiente | Alto | Agregar `loading="lazy"` al incorporar imágenes |
| Formato WebP/AVIF | ⚠️ Pendiente | Alto | Usar `<picture>` con fallback |
| Width/height en imágenes | ⚠️ Pendiente | Medio | Agregar al incorporar imágenes |
| srcset responsive | ⚠️ Pendiente | Medio | Implementar al agregar imágenes |
| font-display: swap | ✅ Correcto | — | — |
| Pesos tipográficos | ⚠️ Optimizable | Medio | Eliminar Playfair 500,600 |
| CSS minificado | ✅ Correcto | — | — |
| JS sin minificar | ❌ Falta | Medio | Agregar terser al build |
| Scripts en body (no blocking) | ✅ Correcto | — | — |
| CSS crítico inline | ⚠️ Opcional | Bajo | Considerar para optimización |
| async/defer en scripts | ⚠️ Mejora menor | Bajo | Agregar `defer` |
| Dependencias no utilizadas | ✅ Limpio | — | — |
| Google Fonts blocking | ⚠️ Optimizable | Medio | Preload o self-host |
| Bundle size | ✅ Excelente | — | ~30-35KB gzip por página |
| CLS (layout shifts) | ✅ Bien manejado | — | — |
| Animaciones layout-safe | ✅ Correcto | — | — |
| Skeletons/placeholders | ⚠️ Menor | Bajo | Spinner en form submit |
| LCP (hero H1 con opacity:0) | ❌ Riesgo | Alto | Excluir H1 hero de `.reveal` |
| Event handlers (FID/INP) | ✅ Correcto | — | — |

**Errores Críticos:** 2 (JS sin minificar, LCP hero con opacity:0)
**Advertencias:** 8 (mayoría pendiente de assets de imágenes)
**Correctos:** 9
