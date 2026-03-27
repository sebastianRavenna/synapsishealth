# Auditoría UX/UI y SEO — Synapsis Health
## Parte 04: UX/UI Patterns (PRIORIDAD MEDIA)

**Fecha original:** 2026-02-14
**Última actualización:** 2026-03-27

---

## 14. RESPONSIVE DESIGN

### 14.1 Meta viewport

**Estado:** ✅ CORRECTO — `width=device-width, initial-scale=1.0` en todas las páginas.

---

### 14.2 Media queries / breakpoints

**Estado:** ✅ CORRECTO — Tailwind breakpoints estándar (sm/md/lg/xl) usados correctamente.

---

### 14.3 Unidades fijas que rompan responsive

**Estado:** ✅ CORRECTO — No se detectan unidades fijas problemáticas.

---

### 14.4 Mobile-first approach

**Estado:** ✅ CORRECTO — Tailwind mobile-first por diseño.

---

### 14.5 Overflow horizontal en móvil

**Estado:** ✅ CORRECTO (corregido desde última auditoría)

`css/input.css:33` incluye `overflow-x-hidden` en body:
```css
body {
  @apply font-body font-light text-graphite-500 bg-[#FAFAFA] overflow-x-hidden;
}
```

---

### 14.6 Font-sizes responsive

**Estado:** ⚠️ ADVERTENCIA (sin cambios)

Los tamaños display (`display-xl: 52px`) no usan `clamp()` para escalado fluid. En pantallas <375px, el H1 podría ser demasiado grande.

**Recomendación:**
```javascript
// tailwind.config.js
'display-xl': ['clamp(2.25rem, 5vw + 1rem, 3.25rem)', { lineHeight: '1.1' }],
```

---

### 14.7 Imágenes sin max-width: 100%

**Estado:** ✅ CORRECTO — Tailwind Preflight incluye `img { max-width: 100%; height: auto; }`.

---

### 14.8 Hamburger menu funcional

**Estado:** ✅ CORRECTO — Slide-in, overlay, close, focus trap, ESC, body lock.

---

## 15. TIPOGRAFÍA Y JERARQUÍA

### 15.1 Escala tipográfica consistente

**Estado:** ✅ CORRECTO — Progresión lógica de 11.2px a 52px.

---

### 15.2 Cantidad de font-families

**Estado:** ✅ CORRECTO — 3 familias (Playfair Display, Jost, DM Sans) con roles claros.

---

### 15.3 Pesos de fuente

**Estado:** ✅ CORRECTO en index.html/servicios.html (8 pesos justificados)
**Estado:** ⚠️ PROBLEMA en equipo.html (carga todos los pesos/itálicas)

---

### 15.4 Line-length (50-75 caracteres)

**Estado:** ✅ CORRECTO — `max-w-2xl` y `max-w-3xl` mantienen rangos aceptables.

---

### 15.5 Espaciado entre párrafos

**Estado:** ✅ CORRECTO — `space-y-5` (20px) con `leading-relaxed`.

---

### 15.6 Jerarquía visual

**Estado:** ✅ CORRECTO — Clara diferenciación por tamaño, peso y color.

---

## 16. ESPACIADO Y LAYOUT

### 16.1-16.4 Sistema de espaciado, magic numbers, white space, Grid/Flexbox

**Estado:** ✅ CORRECTO — Todo sin cambios desde última auditoría. Sistema consistente basado en 4px grid.

---

## 17. COMPONENTES INTERACTIVOS

### 17.1 Estados hover/focus/active

**Estado:** ✅ CORRECTO — Todos los componentes tienen los 3 estados.

---

### 17.2 Touch targets (44x44px mínimo)

**Estado:** ✅ CORRECTO — `min-height: 44px` en mobile para botones, links, inputs.

---

### 17.3 cursor: pointer

**Estado:** ✅ CORRECTO — Tailwind Preflight lo aplica automáticamente.

---

### 17.4 Loading states

**Estado:** ⚠️ ADVERTENCIA (sin cambios)

Form submit muestra "Enviando..." como texto. Sin spinner visual.

---

### 17.5 Transitions/animations

**Estado:** ✅ CORRECTO — Consistentes `duration-300` y `duration-700`.

---

### 17.6 prefers-reduced-motion

**Estado:** ✅ CORRECTO (corregido desde última auditoría)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal { opacity: 1 !important; transform: none !important; }
  .hero-video, .hero-overlay { display: none; }
}
```

---

### 17.7 Disabled states

**Estado:** ✅ CORRECTO (corregido desde última auditoría)

```css
.btn-primary:disabled,
.btn-secondary:disabled {
  @apply opacity-50 cursor-not-allowed;
}
```

---

## 18. CTAs Y CONVERSIÓN

### 18.1-18.6 CTAs

**Estado:** ✅ CORRECTO — CTAs bien identificados, con contraste adecuado, copy orientado a acción, jerarquía visual clara, repetición estratégica sin ser excesiva.

---

## RESUMEN UX/UI PATTERNS (actualizado 2026-03-27)

| Ítem | Estado anterior (02/14) | Estado actual (03/27) | Impacto |
|---|---|---|---|
| Responsive viewport | ✅ | ✅ | — |
| Breakpoints | ✅ | ✅ | — |
| Unidades responsive | ✅ | ✅ | — |
| Mobile-first | ✅ | ✅ | — |
| Overflow horizontal | ⚠️ | ✅ **Corregido** | — |
| Font-sizes responsive | ⚠️ Sin clamp() | ⚠️ Sin cambio | Medio |
| Hamburger menu | ✅ | ✅ | — |
| Escala tipográfica | ✅ | ✅ | — |
| Font families | ✅ | ✅ | — |
| Line-length | ✅ | ✅ | — |
| Jerarquía visual | ✅ | ✅ | — |
| Sistema espaciado | ✅ | ✅ | — |
| Grid/Flexbox | ✅ | ✅ | — |
| Estados hover/focus/active | ✅ | ✅ | — |
| Touch targets 44px | ✅ | ✅ | — |
| Loading states | ⚠️ Básico | ⚠️ Sin cambio | Bajo |
| Transitions | ✅ | ✅ | — |
| prefers-reduced-motion | ❌ Ausente | ✅ **Corregido** | — |
| Disabled states | ⚠️ Sin estilo | ✅ **Corregido** | — |
| CTAs visibilidad | ✅ | ✅ | — |
| CTAs repetición | ✅ | ✅ | — |

**Errores Críticos:** 0 (todos los críticos fueron corregidos)
**Advertencias:** 2 (font-sizes sin clamp, loading state básico)
**Correctos:** 19
**Corregidos desde última auditoría:** 3 (overflow, reduced-motion, disabled states)
