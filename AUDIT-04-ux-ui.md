# Auditoría UX/UI y SEO — Synapsis Health
## Parte 04: UX/UI Patterns (PRIORIDAD MEDIA)

---

## 14. RESPONSIVE DESIGN

### 14.1 Meta viewport

**Estado:** ✅ CORRECTO — `width=device-width, initial-scale=1.0` en las 3 páginas.

---

### 14.2 Media queries / breakpoints

**Estado:** ✅ CORRECTO

Tailwind usa breakpoints estándar (mobile-first):
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

Uso detectado en el código:
- `md:flex` para nav desktop (oculta mobile)
- `md:hidden` para hamburger (oculta desktop)
- `md:grid-cols-2`, `md:grid-cols-3` para grids responsive
- `sm:grid-cols-2` para ética grid
- `md:px-10 lg:px-16` para container padding
- `md:py-30` para section padding
- `md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]` para sidebar servicios

CSS custom: `@media (max-width: 768px)` para touch targets → ✅

---

### 14.3 Unidades fijas que rompan responsive

**Estado:** ✅ CORRECTO (mayormente)

Búsqueda de valores fijos potencialmente problemáticos:

| Valor | Ubicación | Riesgo |
|---|---|---|
| `w-72` (288px) | Mobile menu width | ✅ OK — es un slide-in, no full-width |
| `max-w-2xl`, `max-w-3xl` | Contenedores de texto | ✅ OK — max, no fijo |
| `min-h-[90vh]` | Hero | ✅ OK — relativo a viewport |
| `h-20` (80px) | Navbar height | ✅ OK — fijo apropiado para nav |
| `w-40 h-40` (160px) | Foto equipo grande | ⚠️ OK para circle, pero verificar en pantallas <320px |
| `w-16 h-16` (64px) | Foto equipo thumb | ✅ OK |
| `grid-cols-[280px_1fr]` | Sidebar servicios | ⚠️ Solo en `md:` — ✅ |
| `min-height: 140px` | Textarea | ✅ OK |

No se detectan unidades fijas que rompan el layout responsive.

---

### 14.4 Mobile-first approach

**Estado:** ✅ CORRECTO

Tailwind es mobile-first por diseño. Las clases base son mobile y se modifican con prefijos responsive (`md:`, `lg:`):
```html
<!-- Ejemplo: grid 1 col mobile → 3 cols desktop -->
<div class="grid md:grid-cols-3 gap-8">
```

---

### 14.5 Overflow horizontal en móvil

**Estado:** ⚠️ ADVERTENCIA

**Hallazgo:** No hay `overflow-x: hidden` global. Posibles causas de overflow:

1. **Hero decorativo SVG** (`index.html:159`): `absolute right-12` con SVG de 500px ancho. Tiene `hidden lg:block` → solo visible en desktop y la section tiene `overflow-hidden`. ✅

2. **Footer nav** en las 3 páginas: `flex justify-center gap-8` con 4 links. En pantallas muy estrechas (<320px) podría desbordar.

**Recomendación:**
```css
/* Agregar en input.css, layer base */
body {
  overflow-x: hidden;
}
```

O bien `flex-wrap` en el footer nav:
```html
<nav class="flex flex-wrap justify-center gap-4 md:gap-8 ...">
```

**Impacto:** Bajo — Afectaría solo pantallas <320px.

---

### 14.6 Font-sizes responsive

**Estado:** ⚠️ ADVERTENCIA

**Hallazgo:** Los tamaños tipográficos usan valores fijos definidos en `tailwind.config.js`:
```javascript
fontSize: {
  'display-xl': ['3.25rem', { lineHeight: '1.1', ... }],   // 52px
  'display':    ['2.5rem', { lineHeight: '1.15', ... }],    // 40px
  'display-sm': ['2rem', { lineHeight: '1.2', ... }],       // 32px
  'title':      ['1.375rem', { lineHeight: '1.3', ... }],   // 22px
  'subtitle':   ['1.25rem', { lineHeight: '1.4', ... }],    // 20px
  'label':      ['0.7rem', { lineHeight: '1', ... }],       // 11.2px
}
```

No hay `clamp()` ni tamaños responsive. El H1 en mobile (`text-display-xl` = 52px) podría ser demasiado grande en pantallas <375px.

**Recomendación:**
```javascript
// tailwind.config.js — usar clamp para tamaños display
fontSize: {
  'display-xl': ['clamp(2.25rem, 5vw + 1rem, 3.25rem)', { lineHeight: '1.1' }],
  'display':    ['clamp(1.75rem, 4vw + 0.5rem, 2.5rem)', { lineHeight: '1.15' }],
  'display-sm': ['clamp(1.5rem, 3vw + 0.5rem, 2rem)', { lineHeight: '1.2' }],
}
```

**Impacto:** Medio — Textos grandes pueden ser incómodos en mobile.

---

### 14.7 Imágenes sin max-width: 100%

**Estado:** ✅ N/A — No hay imágenes `<img>`. Tailwind incluye `img { max-width: 100%; height: auto; }` en su base reset (Preflight).

---

### 14.8 Hamburger menu funcional

**Estado:** ✅ CORRECTO

- Toggle: `md:hidden` → visible solo en mobile ✅
- Slide-in animation: `translate-x-full` ↔ `translate-x-0` ✅
- Overlay: `bg-graphite-900/50` ✅
- Close button ✅
- Links cierran menú al click ✅
- Body scroll lock: `document.body.style.overflow = "hidden"` ✅

---

## 15. TIPOGRAFÍA Y JERARQUÍA

### 15.1 Escala tipográfica consistente

**Estado:** ✅ CORRECTO

La escala tipográfica sigue una progresión lógica:
```
label:      11.2px (0.7rem)
xs:         12px
sm:         14px
base:       16px
subtitle:   20px (1.25rem)
title:      22px (1.375rem)
display-sm: 32px (2rem)
display:    40px (2.5rem)
display-xl: 52px (3.25rem)
```

Ratio entre niveles: ~1.2-1.3x (escala menor tercera / mayor segunda) — consistente.

---

### 15.2 Cantidad de font-families

**Estado:** ✅ CORRECTO

3 familias tipográficas (el máximo recomendado):
1. **Playfair Display** — solo logo (serif, personalidad)
2. **Jost** — headings (sans-serif, moderna)
3. **DM Sans** — body text (sans-serif, legible)

Cada una tiene un rol claro y diferenciado. ✅

---

### 15.3 Pesos de fuente cargados

**Estado:** ⚠️ ADVERTENCIA (ya cubierto en Performance 1.7)

10 pesos cargados en total. Playfair Display carga 3 pero solo usa 1. Se pueden eliminar 2.

---

### 15.4 Line-length (50-75 caracteres)

**Estado:** ✅ CORRECTO

Contenedores de texto limitados:
- `max-w-2xl` = 672px ≈ 65-75 chars a 16px ✅
- `max-w-3xl` = 768px ≈ 75-80 chars ⚠️ (ligeramente largo)
- `max-w-lg` = 512px ≈ 50-55 chars ✅

La mayoría del body text está dentro de rangos aceptables.

---

### 15.5 Espaciado entre párrafos

**Estado:** ✅ CORRECTO

Los párrafos usan `space-y-5` (20px) entre ellos:
```html
<div class="space-y-5 text-graphite-500 leading-relaxed">
  <p>...</p>
  <p>...</p>
</div>
```

20px de gap entre párrafos con `leading-relaxed` (line-height 1.625) da buena legibilidad. ✅

---

### 15.6 Jerarquía visual

**Estado:** ✅ CORRECTO

La jerarquía visual es clara:
1. **Overline** — pequeño, uppercase, tracking wide, color muted (graphite-300)
2. **H2 display** — grande, extralight weight, graphite-800
3. **Line accent** — barra decorativa de separación
4. **Body text** — weight 300, graphite-500, leading-relaxed
5. **Emphasis** — font-heading, font-normal, graphite-800

Diferenciación por tamaño + peso + color. Excelente jerarquía tipográfica. ✅

---

## 16. ESPACIADO Y LAYOUT

### 16.1 Sistema de espaciado consistente

**Estado:** ✅ CORRECTO

Tailwind usa un sistema de 4px base (4pt grid):
- `gap-3` = 12px, `gap-4` = 16px, `gap-6` = 24px, `gap-8` = 32px
- `mb-4` = 16px, `mb-6` = 24px, `mb-8` = 32px, `mb-10` = 40px
- Secciones: `py-20` = 80px, `md:py-30` = custom (ver config)

Custom spacing en config: `18: 4.5rem`, `22: 5.5rem`, `30: 7.5rem` — siguen el patrón del sistema.

---

### 16.2 Magic numbers

**Estado:** ✅ CORRECTO

No se detectan "magic numbers" fuera del sistema de Tailwind. Los valores custom en el config (`18`, `22`, `30`) extienden el sistema de forma coherente.

Únicos valores CSS inline:
- `min-height: 140px` (textarea) — aceptable ✅
- `top: -100px` (skip link) — aceptable ✅

---

### 16.3 White space

**Estado:** ✅ CORRECTO — Amplio white space entre secciones (80-120px). Buen balance.

---

### 16.4 Uso de CSS Grid/Flexbox

**Estado:** ✅ CORRECTO

- **Grid:** secciones de pilares, servicios, ética, contacto, sidebar servicios, team selector
- **Flexbox:** navbar, cards, list items, footer
- Uso apropiado de cada uno según contexto ✅

---

## 17. COMPONENTES INTERACTIVOS

### 17.1 Estados hover/focus/active

**Estado:** ✅ CORRECTO

| Componente | hover | focus | active |
|---|---|---|---|
| btn-primary | ✅ `hover:bg-graphite-950` | ✅ `focus:ring-2` | ✅ `active:scale-[0.98]` |
| btn-secondary | ✅ `hover:border-graphite-600` | ✅ `focus:ring-2` | ✅ `active:scale-[0.98]` |
| nav-link | ✅ `hover:text-graphite-900` | ✅ via focus-visible | — |
| card | ✅ `hover:shadow-lg hover:border-graphite-200` | — | — |
| form-input | — | ✅ `focus:border-graphite-400 focus:ring-2` | — |
| lang-toggle | ✅ `hover:text-graphite-800` | ✅ via focus-visible | — |

---

### 17.2 Touch targets (44x44px mínimo)

**Estado:** ✅ CORRECTO

`css/input.css:156-163`:
```css
@media (max-width: 768px) {
  button, a, input[type="submit"], input[type="button"] {
    min-height: 44px;
  }
}
```

Esto asegura el mínimo de 44px en mobile. ✅

⚠️ **Nota:** Solo aplica `min-height`, no `min-width`. Para botones muy estrechos podría faltar padding horizontal. Verificar el lang toggle (text "EN/ES") y el close button del menú.

---

### 17.3 cursor: pointer

**Estado:** ✅ CORRECTO — Tailwind aplica `cursor: pointer` a `<button>` y `<a>` por defecto via Preflight.

---

### 17.4 Loading states

**Estado:** ⚠️ ADVERTENCIA

El formulario tiene loading state básico:
```javascript
btn.disabled = true;
btn.textContent = "Enviando...";
```

Falta:
- Spinner visual
- Disabled styling diferenciado
- Loading state en tabs al cambiar contenido (menor)

**Impacto:** Bajo — El texto "Enviando..." es funcional.

---

### 17.5 Transitions/animations

**Estado:** ✅ CORRECTO

| Elemento | Transition |
|---|---|
| Navbar scroll | `transition-all duration-300` |
| Buttons | `transition-all duration-300` |
| Cards hover | `transition-all duration-300` |
| Nav links | `transition-colors duration-300` |
| Scroll reveal | `transition-all duration-700 ease-out` |
| Mobile menu | `transition-transform duration-300` |
| Tab panels | Inline `opacity 0.4s ease, transform 0.4s ease` |

Transitions consistentes y suaves. ✅

---

### 17.6 prefers-reduced-motion

**Estado:** ❌ PROBLEMA

**Hallazgo:** No hay media query `prefers-reduced-motion` en ningún archivo. Usuarios que prefieran movimiento reducido verán todas las animaciones igualmente.

**Recomendación para `css/input.css`:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

**Impacto:** Medio — Requisito WCAG 2.1 AA (2.3.3 Animation from Interactions).

---

### 17.7 Disabled states

**Estado:** ⚠️ ADVERTENCIA

El botón submit se deshabilita al enviar (`btn.disabled = true`) pero no hay estilo diferenciado para `:disabled`:

**Recomendación:**
```css
.btn-primary:disabled {
  @apply opacity-50 cursor-not-allowed;
}
```

**Impacto:** Bajo — Funcional pero sin feedback visual claro.

---

## 18. CTAs Y CONVERSIÓN

### 18.1 CTAs principales identificados

| CTA | Texto | Ubicación | Tipo |
|---|---|---|---|
| Hero CTA 1 | "Conocer nuestro enfoque" | `index.html:152` | Primario |
| Hero CTA 2 | "Áreas de trabajo" | `index.html:153` | Secundario |
| Nav CTA | "Contáctanos" | Navbar (3 páginas) | Primario |
| Team CTA | "Conocer al equipo" | `index.html:518` | Secundario |
| CTA Equipo | "Contactar con nuestro equipo" | `equipo.html:278` | Primario |
| CTA Servicios | "Contactar con nuestro equipo" | `servicios.html:311` | Primario |
| Submit form | "Iniciar conversación" | `index.html:663` | Primario |

---

### 18.2 Contraste y visibilidad de CTAs

**Estado:** ✅ CORRECTO

- `btn-primary`: `bg-graphite-800 text-white` → ratio 11.5:1 ✅
- `btn-secondary`: `border-graphite-200 text-graphite-700` → ratio 5.4:1 vs fondo ✅
- CTA en dark sections: `bg-white text-graphite-900` → ratio 11.5:1 ✅

---

### 18.3 Copy orientado a acción

**Estado:** ✅ CORRECTO

- "Conocer nuestro enfoque" → acción exploratoria ✅
- "Contáctanos" → acción directa ✅
- "Conocer al equipo" → acción exploratoria ✅
- "Contactar con nuestro equipo" → acción directa ✅
- "Iniciar conversación" → acción blanda, buen tono institucional ✅

---

### 18.4 Jerarquía visual (primario vs secundario)

**Estado:** ✅ CORRECTO — Clara diferenciación entre `btn-primary` (lleno, oscuro) y `btn-secondary` (outline, claro).

---

### 18.5 Proximidad a información relevante

**Estado:** ✅ CORRECTO — Los CTAs están ubicados después del contenido relevante de cada sección.

---

### 18.6 Repetición estratégica de CTAs

**Estado:** ✅ CORRECTO

"Contáctanos" aparece en:
1. Navbar (persistente)
2. Final de sección equipo (landing)
3. CTA section en equipo.html
4. CTA section en servicios.html
5. Formulario de contacto

Buena repetición sin ser excesiva. ✅

---

## RESUMEN UX/UI PATTERNS

| Ítem | Estado | Impacto |
|---|---|---|
| Responsive meta viewport | ✅ | — |
| Breakpoints | ✅ | — |
| Unidades responsive | ✅ | — |
| Mobile-first | ✅ | — |
| Overflow horizontal | ⚠️ Footer nav | Bajo |
| Font-sizes responsive | ⚠️ Sin clamp() | Medio |
| Hamburger menu | ✅ | — |
| Escala tipográfica | ✅ | — |
| Font families (<3) | ✅ | — |
| Line-length | ✅ | — |
| Jerarquía visual | ✅ | — |
| Sistema espaciado | ✅ | — |
| Grid/Flexbox | ✅ | — |
| Estados hover/focus/active | ✅ | — |
| Touch targets 44px | ✅ | — |
| Loading states | ⚠️ Básico | Bajo |
| Transitions | ✅ | — |
| prefers-reduced-motion | ❌ Ausente | Medio |
| Disabled states | ⚠️ Sin estilo | Bajo |
| CTAs visibilidad | ✅ | — |
| CTAs repetición | ✅ | — |

**Errores Críticos:** 1 (prefers-reduced-motion)
**Advertencias:** 4
**Correctos:** 17
