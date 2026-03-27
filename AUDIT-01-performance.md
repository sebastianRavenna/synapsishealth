# Auditoría UX/UI y SEO — Synapsis Health
## Parte 01: Performance & Core Web Vitals (PRIORIDAD CRÍTICA)

**Fecha original:** 2026-02-14
**Última actualización:** 2026-03-27
**Sitio:** https://synapsishealth.vercel.app
**Stack:** HTML5 estático + Tailwind CSS 3.4 + Vanilla JS + Vercel
**Páginas auditadas:** `index.html`, `equipo.html`, `servicios.html`, `articulos.html`

---

## 1. ANÁLISIS DE PERFORMANCE

### 1.1 Imágenes sin lazy loading

**Estado:** ⚠️ PARCIALMENTE CORREGIDO

**Corregido:** Las imágenes en `servicios.html` y variantes tienen `loading="lazy"` ✅:
```html
<img src="./assets/img/decisiones.webp?v=5e0b8c20" alt="" loading="lazy">
<img src="./assets/img/etes.webp?v=d2146005" alt="" loading="lazy">
<!-- ... 6 imágenes con lazy loading -->
```

**Pendiente:** Las imágenes en `index.html` **NO tienen** `loading="lazy"`:
- `index.html:213` — `quienes_somos.webp` ❌
- `index.html:447` — `diferencial.webp` ❌
- `index.html:508` — `academico.webp` ❌
- `index.html:163` — `logo-full.png` (decorativo, below-the-fold) ❌

**Recomendación:** Agregar `loading="lazy"` a las imágenes de index.html que están below-the-fold.

**Impacto:** Medio — Las 3 imágenes de index.html se cargarían todas al inicio sin lazy loading.

---

### 1.2 Formato de imágenes

**Estado:** ✅ CORRECTO (mayormente)

Las imágenes principales usan formato **WebP**:
- quienes_somos.webp (28KB) ✅
- diferencial.webp (92KB) ✅
- academico.webp (324KB) ⚠️ grande
- decisiones.webp (60KB) ✅
- etes.webp (200KB) ⚠️
- eval_economicas.webp (40KB) ✅
- analisis_datos.webp (616KB) ❌ muy grande
- pol_sanitarias.webp (288KB) ⚠️
- educacion.webp (56KB) ✅

**Excepción:** `equipo-bg.jpg` (1.2MB) — Imagen JPG sin WebP alternativo, muy pesada.

**Recomendación:**
- Comprimir `analisis_datos.webp` (616KB → objetivo <200KB)
- Comprimir `academico.webp` (324KB → objetivo <150KB)
- Convertir `equipo-bg.jpg` (1.2MB) a WebP y comprimir (objetivo <300KB)
- Considerar `<picture>` con fallback para navegadores sin soporte WebP (minoritarios)

**Impacto:** Alto — `equipo-bg.jpg` y `analisis_datos.webp` suman 1.8MB innecesarios.

---

### 1.3 Imágenes sin width/height (CLS)

**Estado:** ❌ PROBLEMA

Ninguna imagen `<img>` tiene `width` y `height` explícitos:

```html
<!-- index.html:213 — sin width/height -->
<img src="./assets/img/quienes_somos.webp" class="rounded-2xl h-full object-cover" alt="">

<!-- servicios.html:398 — sin width/height -->
<img src="./assets/img/decisiones.webp" alt="" loading="lazy">
```

**Mitigación parcial:** Las imágenes en index.html están dentro de contenedores con `aspect-[4/3]` que reservan espacio → reduce CLS. ✅

Las imágenes en servicios.html **NO** están en contenedores con aspect ratio definido → riesgo de CLS.

**Recomendación:**
```html
<img src="./assets/img/quienes_somos.webp" alt="..." width="800" height="600" loading="lazy">
```

**Impacto:** Medio — Mitigado parcialmente por contenedores aspect-ratio en index.html.

---

### 1.4 Imágenes sobredimensionadas

**Estado:** ⚠️ ADVERTENCIA

| Imagen | Tamaño archivo | Uso real máximo | Estado |
|---|---|---|---|
| `equipo-bg.jpg` | 1.2MB | Background cover (podría ser 1200px) | ❌ Muy grande |
| `analisis_datos.webp` | 616KB | Card ~400px ancho | ❌ Muy grande |
| `academico.webp` | 324KB | Card ~400px ancho | ⚠️ Grande |
| `pol_sanitarias.webp` | 288KB | Card ~400px ancho | ⚠️ Grande |
| `etes.webp` | 200KB | Card ~400px ancho | ⚠️ Aceptable |
| `Diseño sin título (6).jpg` | 748KB | No usado en HTML | ❌ Archivo innecesario |

---

### 1.5 Implementación de srcset

**Estado:** ❌ AUSENTE — Ninguna imagen usa `srcset` ni `<picture>` para responsive.

**Recomendación:**
```html
<img srcset="assets/img/quienes-somos-480.webp 480w,
             assets/img/quienes-somos-800.webp 800w"
     sizes="(max-width: 768px) 100vw, 50vw"
     src="assets/img/quienes_somos.webp"
     alt="..." loading="lazy" width="800" height="600">
```

**Impacto:** Medio — Reduciría carga en mobile significativamente.

---

### 1.6 Fuentes web sin font-display: swap

**Estado:** ✅ CORRECTO

`index.html:36` y `servicios.html`: `&display=swap` en URL de Google Fonts ✅

⚠️ **Excepción:** `equipo.html:11` carga Google Fonts con una URL diferente que incluye TODOS los pesos (no optimizada):
```
family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Jost:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900
```
Esta URL carga rangos variables completos (100-1000) en vez de pesos específicos. Mucho más pesada.

---

### 1.7 Carga de fuentes (subsetting, formatos woff2)

**Estado:** ✅ CORRECTO (index.html, servicios.html) / ⚠️ PROBLEMA (equipo.html)

**Páginas optimizadas (index.html, servicios.html, articulos.html):**
```
Playfair+Display:wght@400 (1 peso)
Jost:wght@200;300;400;500 (4 pesos)
DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500 (3 pesos)
Total: 8 pesos
```

**equipo.html — NO optimizado:**
```
Playfair+Display:ital,wght@0,400..900;1,400..900 (rango completo)
Jost:ital,wght@0,100..900;1,100..900 (rango completo)
DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000 (rango completo)
```
Esto carga **TODOS los pesos e itálicas** de las 3 familias — mucho más datos de fuente.

**Recomendación:** Usar la misma URL de Google Fonts optimizada en equipo.html.

**Impacto:** Alto para equipo.html — Cada peso adicional añade ~15-25KB.

---

### 1.8 CSS/JS sin minificar

**Estado:** ✅ CORRECTO (corregido desde última auditoría)

- **CSS:** `--minify` en build ✅
- **JS:** Build script incluye Terser para minificar:
  ```json
  "build": "npx tailwindcss ... --minify && npx terser js/main.js -o js/main.min.js -c -m && npx terser js/i18n.js -o js/i18n.min.js -c -m && node scripts/cachebust.js"
  ```

⚠️ **Nota:** Los HTML referencian `main.js` e `i18n.js` (no las versiones `.min.js`). Si el cache-busting no los reemplaza automáticamente, podrían estar sirviendo las versiones no minificadas.

---

### 1.9 JavaScript bloqueante en el `<head>`

**Estado:** ✅ CORRECTO (corregido desde última auditoría)

Scripts al final del body con `defer`:
```html
<script src="./js/i18n.js?v=20260320" defer></script>
<script src="./js/main.js?v=20260320" defer></script>
```

---

### 1.10 CSS crítico inline vs carga tardía

**Estado:** ⚠️ ADVERTENCIA (sin cambios)

Todo el CSS se carga como archivo externo. Para un sitio estático pequeño es aceptable.

---

### 1.11 Uso de async/defer en scripts

**Estado:** ✅ CORRECTO (corregido desde última auditoría)

Todos los scripts usan `defer`. ✅

---

### 1.12 Librerías/dependencias no utilizadas

**Estado:** ✅ CORRECTO

Stack mínimo: Tailwind (dev), Terser (dev), nodemailer (backend). No hay librerías JS en frontend.

**Archivos no utilizados en el repo:**
- `assets/vid/hero.mp4` (6.7MB) — Video hero comentado en HTML
- `assets/vid/logo-anim.mp4`, `logo-anim2.mp4`, `logo-anim3.mp4` — No referenciados
- `assets/vid/Diseño sin título (4).gif` — No referenciado
- `assets/img/Diseño sin título (6).jpg` (748KB) — No referenciado
- `assets/img/hero_sinapsis.webp` — No referenciado en HTML
- `assets/img/arqui 1.webp` — No referenciado en HTML
- `assets/img/el desafio.webp` — No referenciado en HTML

**Recomendación:** Eliminar archivos no utilizados del repositorio para reducir tamaño de deploy.

---

### 1.13 Recursos externos que bloqueen rendering

**Estado:** ⚠️ ADVERTENCIA (sin cambios)

Google Fonts es render-blocking. Mitigado con `preconnect` y `dns-prefetch`.

**Nota:** `equipo.html` no tiene `dns-prefetch` (falta en su `<head>`).

---

### 1.14 Tamaño total del bundle

**Estado:** ✅ CORRECTO

| Recurso | Tamaño | Estado |
|---|---|---|
| `index.html` | ~45KB | ✅ |
| `styles.css` (compilado) | ~15-25KB | ✅ |
| `main.js` | ~12KB (~6KB min) | ✅ |
| `i18n.js` | ~38KB (~29KB min) | ✅ |
| Google Fonts CSS | ~3KB | ✅ |
| Font files (woff2) | ~80-120KB | ✅ |
| **Imágenes index.html** | **~444KB** | ⚠️ |
| **equipo-bg.jpg** | **1.2MB** | ❌ |
| **Total index** | **~650KB** | ✅ |
| **Total equipo** | **~1.5MB+** | ❌ |

---

## 2. CORE WEB VITALS DESDE CÓDIGO

### 2.1 Elementos que cambien tamaño después de carga (CLS)

**Estado:** ✅ CORRECTO (mayormente)

- Placeholders con `aspect-[4/3]` reservan espacio ✅
- Navbar `h-20` fija ✅
- Hero con `md:min-h-[90vh]` ✅
- `.reveal` usa `translate-y` (no afecta layout) ✅

---

### 2.2 Reserva de espacio para ads, embeds, iframes

**Estado:** ✅ N/A — No hay ads ni iframes.

---

### 2.3 Animaciones CSS que afecten layout

**Estado:** ✅ CORRECTO — Solo `opacity` + `transform` (compositor). No afectan layout.

---

### 2.4 Cargas de contenido dinámico sin skeleton/placeholder

**Estado:** ⚠️ ADVERTENCIA MENOR

- Tabs: contenido pre-cargado en DOM, sin necesidad de skeleton ✅
- Form submit: muestra "Enviando..." como texto, sin spinner visual ⚠️
- Cambio de idioma: flash momentáneo al traducir contenido ⚠️

---

### 2.5 Largest Contentful Paint (LCP)

**Estado:** ✅ CORRECTO (corregido desde última auditoría)

El H1 del hero ya **NO tiene clase `.reveal`**:
```html
<!-- index.html:146 — SIN .reveal (corregido) -->
<h1 class="text-display-xl font-logo font-normal text-graphite-900 mb-6" data-i18n="hero.headline">
  Transformamos evidencia en decisiones sanitarias eficientes.
</h1>
```

El H1 es visible inmediatamente → LCP no penalizado. ✅

---

### 2.6 Event handlers que puedan causar delay (FID/INP)

**Estado:** ✅ CORRECTO

- Scroll listener con `{ passive: true }` ✅
- Handlers livianos (classList toggle, fetch async) ✅
- No hay operaciones síncronas pesadas ✅

---

## RESUMEN DE PERFORMANCE & CORE WEB VITALS (actualizado 2026-03-27)

| Ítem | Estado anterior (02/14) | Estado actual (03/27) | Impacto |
|---|---|---|---|
| Imágenes lazy loading | ⚠️ Pendiente | ⚠️ Parcial (servicios ✅, index ❌) | Medio |
| Formato WebP/AVIF | ⚠️ Pendiente | ✅ WebP usado (archivos grandes pendientes) | Alto |
| Width/height en imágenes | ⚠️ Pendiente | ❌ Ausentes en todas las `<img>` | Medio |
| srcset responsive | ⚠️ Pendiente | ❌ Ausente | Medio |
| font-display: swap | ✅ | ✅ | — |
| Pesos tipográficos | ⚠️ 10 pesos | ✅ 8 pesos (excepto equipo.html) | Alto |
| CSS minificado | ✅ | ✅ | — |
| JS minificado | ❌ Faltaba | ✅ Terser en build | — |
| Scripts con defer | ⚠️ Mejora | ✅ Implementado | — |
| CSS crítico inline | ⚠️ Opcional | ⚠️ Sin cambio | Bajo |
| Dependencias no utilizadas | ✅ | ✅ (archivos no usados en repo) | Bajo |
| Google Fonts blocking | ⚠️ | ⚠️ Sin cambio | Medio |
| Bundle size | ✅ Excelente | ✅ (excepto equipo.html 1.5MB+) | Alto |
| CLS (layout shifts) | ✅ | ✅ | — |
| Animaciones layout-safe | ✅ | ✅ | — |
| LCP (hero H1 opacity:0) | ❌ Riesgo | ✅ **Corregido** (sin .reveal) | — |
| Event handlers (FID/INP) | ✅ | ✅ | — |
| equipo.html fonts bloat | — | ❌ **NUEVO** (carga todos los pesos) | Alto |
| Imágenes sobredimensionadas | N/A | ❌ **NUEVO** (1.2MB + 616KB) | Alto |

**Errores Críticos:** 3 (imágenes sobredimensionadas, equipo.html fonts, width/height ausentes)
**Advertencias:** 5
**Correctos:** 12
**Corregidos desde última auditoría:** 4 (JS minificado, defer, LCP hero, fonts optimizados)
