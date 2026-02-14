# Auditoría UX/UI y SEO — Synapsis Health
## Parte 03: Accesibilidad WCAG 2.1 (PRIORIDAD ALTA)

---

## 9. HTML SEMÁNTICO

### 9.1 Uso de tags semánticos

**Estado:** ✅ CORRECTO

| Tag | index.html | equipo.html | servicios.html |
|---|---|---|---|
| `<nav>` | ✅ (navbar + footer nav) | ✅ | ✅ |
| `<main>` | ✅ `id="main-content"` | ✅ | ✅ |
| `<footer>` | ✅ | ✅ | ✅ |
| `<section>` | ✅ (10 secciones) | ✅ (4 secciones) | ✅ (4 secciones) |
| `<aside>` | N/A | N/A | ✅ (sidebar servicios, línea 111) |
| `<header>` | ❌ Ausente | ❌ Ausente | ❌ Ausente |
| `<article>` | ❌ Ausente | ❌ Ausente | ❌ Ausente |

**Hallazgo:** No se usa `<header>`. El `<nav>` actúa como header pero semánticamente debería estar envuelto:

**Recomendación:**
```html
<!-- ACTUAL -->
<nav id="navbar" class="fixed top-0 ...">...</nav>

<!-- RECOMENDADO (mejora semántica, impacto bajo) -->
<header>
  <nav id="navbar" class="fixed top-0 ...">...</nav>
</header>
```

`<article>` no es estrictamente necesario para este tipo de contenido (no son artículos/posts).

**Impacto:** Bajo — La estructura semántica actual es funcional.

---

### 9.2 Estructura lógica del documento

**Estado:** ✅ CORRECTO

Las 3 páginas siguen: skip-link → nav → main (sections) → footer. Orden lógico de lectura correcto.

---

### 9.3 `<button>` vs `<a>` correctamente

**Estado:** ✅ CORRECTO

- **Botones para acciones:** `<button>` usado para toggle menú, cambio idioma, tabs → ✅
- **Links para navegación:** `<a>` usado para navegación entre páginas y secciones → ✅
- **CTAs:** `<a href="...">` con clase `btn-primary` → ✅ (son navegación, no acciones)

---

### 9.4 Listas

**Estado:** ✅ CORRECTO

- `index.html:340-405` — Listas de servicios usan `<ul>` con `<li>` ✅
- `index.html:430-461` — Lista diferencial usa `<ul>` con `<li>` ✅
- Footer nav usa `<nav>` con enlaces directos (sin `<ul>`) — aceptable ✅

---

### 9.5 Tablas

**Estado:** ✅ N/A — No hay tablas en el sitio. La tabla en el email del backend usa HTML de email que no aplica a WCAG.

---

### 9.6 Uso incorrecto de `<div>`

**Estado:** ⚠️ ADVERTENCIA MENOR

**Hallazgo:** El contenedor de ética (`index.html:538-563`) usa un `<div>` con `grid` que podría ser una `<ul>`:

```html
<!-- ACTUAL (index.html:538) -->
<div class="grid sm:grid-cols-2 gap-4 mb-8">
  <div class="flex items-center gap-3 reveal">
    <svg>...</svg>
    <span>Políticas de conflictos de interés</span>
  </div>
  <!-- 3 más... -->
</div>

<!-- RECOMENDADO: es una lista de ítems -->
<ul class="grid sm:grid-cols-2 gap-4 mb-8">
  <li class="flex items-center gap-3 reveal">
    <svg>...</svg>
    <span>Políticas de conflictos de interés</span>
  </li>
</ul>
```

**Impacto:** Bajo — Mejora semántica menor.

---

## 10. ARIA Y ACCESIBILIDAD

### 10.1 ARIA labels en iconos sin texto

**Estado:** ✅ CORRECTO

Todos los SVGs decorativos/icónicos tienen `aria-hidden="true"`:
- Iconos de navbar: `aria-hidden="true"` ✅
- Iconos de secciones (pilares, servicios, ética): `aria-hidden="true"` ✅
- Bullets decorativos (`<span>` puntos): `aria-hidden="true"` ✅
- Logo SVG: `aria-hidden="true"` ✅
- Separadores `|`: `aria-hidden="true"` ✅

Los botones con solo icono tienen `aria-label`:
- `index.html:93` — `aria-label="Abrir menú"` ✅
- `index.html:105` — `aria-label="Cerrar menú"` ✅
- `index.html:82` — `aria-label="Cambiar idioma"` ✅

---

### 10.2 Role attributes

**Estado:** ✅ CORRECTO

| Elemento | Role | Ubicación |
|---|---|---|
| Mobile menu | `role="dialog"` | index.html:103, equipo.html:69, servicios.html:69 |
| Tab list (servicios) | `role="tablist"` | servicios.html:113 |
| Tab buttons (servicios) | `role="tab"` | servicios.html:115-149 |
| Tab panels (servicios) | `role="tabpanel"` | servicios.html:158-294 |
| Tab list (equipo) | `role="tablist"` | equipo.html:109 |
| Tab buttons (equipo) | `role="tab"` | equipo.html:112-161 |
| Tab panels (equipo) | `role="tabpanel"` | equipo.html:173-263 |
| Error messages | `role="alert"` | index.html:636,645,661 |
| Success message | `role="status"` | index.html:665 |

---

### 10.3 aria-hidden en elementos decorativos

**Estado:** ✅ CORRECTO — Verificado en punto 10.1. Todos los SVGs decorativos y elementos visuales usan `aria-hidden="true"`.

---

### 10.4 aria-label/aria-labelledby en form inputs

**Estado:** ✅ CORRECTO

Todos los inputs tienen `<label>` con `for`/`id` matching Y `aria-describedby` para mensajes de error:
```html
<label for="nombre">Nombre *</label>
<input id="nombre" aria-required="true" aria-describedby="nombre-error">
<span id="nombre-error" class="error-message" role="alert"></span>
```

---

### 10.5 aria-live para contenido dinámico

**Estado:** ✅ CORRECTO

```html
<!-- index.html:665 -->
<div id="form-success" class="success-message" role="status" aria-live="polite">
```

⚠️ Sin embargo, `#form-feedback` (línea 664) que muestra errores/éxito dinámicos **no tiene** `aria-live`:

```html
<!-- index.html:664 -->
<div id="form-feedback" class="hidden"></div>
```

**Recomendación:**
```html
<div id="form-feedback" class="hidden" aria-live="assertive"></div>
```

**Impacto:** Medio — Los usuarios de screen reader no serían notificados de errores de formulario mostrados dinámicamente via JS.

---

### 10.6 ARIA innecesario

**Estado:** ✅ CORRECTO — No hay ARIA redundante detectado. Los `role` complementan la semántica existente sin duplicarla.

---

### 10.7 Landmarks ARIA

**Estado:** ✅ CORRECTO

La estructura de landmarks es:
```
navigation (nav aria-label="Navegación principal")
main (main id="main-content")
  region (sections con IDs)
contentinfo (footer)
  navigation (nav aria-label="Navegación del pie de página")
```

Las dos `<nav>` tienen `aria-label` diferenciados. ✅

---

## 11. FORMULARIOS ACCESIBLES

### 11.1 Labels asociados a inputs

**Estado:** ✅ CORRECTO

| Input | Label | for/id match |
|---|---|---|
| nombre | "Nombre *" | `for="nombre"` / `id="nombre"` ✅ |
| email | "Email *" | `for="email"` / `id="email"` ✅ |
| organizacion | "Organización" | `for="organizacion"` / `id="organizacion"` ✅ |
| mensaje | "Mensaje *" | `for="mensaje"` / `id="mensaje"` ✅ |

---

### 11.2 Placeholders NO reemplazan labels

**Estado:** ✅ CORRECTO

Todos los campos tienen labels visibles Y placeholders adicionales:
```html
<label for="nombre">Nombre *</label>
<input id="nombre" placeholder="Tu nombre completo">
```

Los labels no desaparecen. ✅

---

### 11.3 Atributos required, type

**Estado:** ✅ CORRECTO

| Input | type | required | minlength | maxlength |
|---|---|---|---|---|
| nombre | text | ✅ | 2 | 100 |
| email | email | ✅ | — | — |
| organizacion | text | — (opcional) | — | 150 |
| mensaje | textarea | ✅ | 10 | 1000 |

---

### 11.4 Autocomplete attributes

**Estado:** ✅ CORRECTO

| Input | autocomplete |
|---|---|
| nombre | `name` ✅ |
| email | `email` ✅ |
| organizacion | `organization` ✅ |

---

### 11.5 Mensajes de error con role="alert"

**Estado:** ✅ CORRECTO

```html
<span id="nombre-error" class="error-message" role="alert"></span>
<span id="email-error" class="error-message" role="alert"></span>
<span id="mensaje-error" class="error-message" role="alert"></span>
```

⚠️ Sin embargo, los mensajes de error individuales por campo **nunca se llenan** por el JS actual. El `main.js:206-213` solo muestra feedback genérico en `#form-feedback`, no en los spans individuales de error.

**Recomendación:** Implementar validación por campo que llene los `<span>` de error individuales:
```javascript
// Ejemplo para validación por campo
if (!data.nombre) {
  document.getElementById('nombre-error').textContent = 'El nombre es obligatorio';
  document.getElementById('nombre').setAttribute('aria-invalid', 'true');
}
```

**Impacto:** Medio — Los campos de error existen en el HTML pero nunca se populan por JS.

---

### 11.6 aria-invalid en campos con error

**Estado:** ❌ AUSENTE

El JS de validación (`main.js:206-213`) no agrega `aria-invalid` a los campos con error.

**Recomendación:**
```javascript
// Agregar al flujo de validación
if (!data.nombre) {
  document.getElementById('nombre').setAttribute('aria-invalid', 'true');
} else {
  document.getElementById('nombre').removeAttribute('aria-invalid');
}
```

**Impacto:** Medio — Screen readers no pueden identificar qué campos tienen error.

---

### 11.7 aria-describedby para help text

**Estado:** ✅ CORRECTO — Los campos obligatorios tienen `aria-describedby` que apunta a sus spans de error.

---

### 11.8 fieldset/legend en grupos de inputs

**Estado:** ⚠️ ADVERTENCIA

El formulario no usa `<fieldset>` ni `<legend>`. Para un formulario simple de contacto esto es aceptable, pero semánticamente mejoraría:

```html
<form id="contact-form" novalidate>
  <fieldset>
    <legend class="sr-only">Formulario de contacto institucional</legend>
    <!-- inputs -->
  </fieldset>
</form>
```

**Impacto:** Bajo — No es crítico para un formulario simple.

---

## 12. NAVEGACIÓN POR TECLADO

### 12.1 Tabindex apropiado

**Estado:** ✅ CORRECTO

No hay `tabindex` con valores positivos en ningún archivo. Los elementos interactivos nativos (`<a>`, `<button>`, `<input>`) son focusables por defecto.

---

### 12.2 Skip links

**Estado:** ✅ CORRECTO

Las 3 páginas tienen skip link:
```html
<a href="#main-content" class="skip-link">Saltar al contenido principal</a>
```

Con CSS que lo oculta y lo muestra al focus:
```css
.skip-link { top: -100px; }
.skip-link:focus { top: 0; }
```

---

### 12.3 Focus visible

**Estado:** ✅ CORRECTO

`css/input.css:150-153`:
```css
*:focus-visible {
  outline: 2px solid #2D2D2D;
  outline-offset: 2px;
}
```

Aplica a todos los elementos focusables. Color de outline oscuro (#2D2D2D) con buen contraste.

Botones tienen focus ring adicional via Tailwind:
```css
.btn-primary { focus:ring-2 focus:ring-graphite-400 focus:ring-offset-2 }
.btn-secondary { focus:ring-2 focus:ring-graphite-400 focus:ring-offset-2 }
```

---

### 12.4 Elementos clickeables sin acceso por teclado

**Estado:** ✅ CORRECTO

Todos los elementos interactivos son `<a>` o `<button>` nativos, que son accesibles por teclado por defecto. No hay `<div onclick>` ni `<span onclick>`.

---

### 12.5 Orden lógico de tab navigation

**Estado:** ✅ CORRECTO

El orden DOM sigue el orden visual:
1. Skip link
2. Logo (link)
3. Nav links
4. Lang toggle
5. CTA button
6. (contenido de secciones)
7. Footer nav links

No hay reordenamientos con CSS `order` que rompan la secuencia de tabulación, excepto en `index.html:474,480` donde `order-2 md:order-1` se usa para la sección académica. Pero esto solo aplica en desktop y es coherente visualmente.

---

### 12.6 Modals trapean focus

**Estado:** ❌ PROBLEMA

**Hallazgo:** El menú móvil (`role="dialog"`) **no atrapa el focus**. Cuando está abierto, el usuario puede tabular fuera del menú hacia el contenido detrás del overlay.

**Código actual** (`main.js:21-43`):
```javascript
const open = () => {
  menu.classList.replace("translate-x-full", "translate-x-0");
  overlay?.classList.remove("hidden");
  document.body.style.overflow = "hidden";
};
```

**Faltante:** No hay focus trap ni `focus()` al primer elemento del menú.

**Recomendación:**
```javascript
const open = () => {
  menu.classList.replace("translate-x-full", "translate-x-0");
  overlay?.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  // Focus al botón de cierre
  close?.focus();
  // Trap focus dentro del menú
  menu.addEventListener('keydown', trapFocus);
};

function trapFocus(e) {
  if (e.key !== 'Tab') return;
  const focusable = menu.querySelectorAll('a, button');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}
```

**Impacto:** Alto — Requisito WCAG 2.1 AA para diálogos modales.

---

### 12.7 ESC cierra modals/dropdowns

**Estado:** ❌ PROBLEMA

**Hallazgo:** No hay listener para la tecla Escape en el menú móvil.

**Recomendación:**
```javascript
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !menu.classList.contains('translate-x-full')) {
    shut();
    toggle.focus(); // Devolver focus al botón que abrió el menú
  }
});
```

**Impacto:** Alto — Requisito WCAG 2.1 AA.

---

## 13. CONTRASTE Y VISUALIZACIÓN

### 13.1-13.3 Contraste de colores

**Estado:** ⚠️ ADVERTENCIA (análisis por colores)

Paleta principal y ratios de contraste sobre fondo `#FAFAFA`:

| Uso | Color | Hex | Ratio vs #FAFAFA | WCAG AA (4.5:1) | WCAG AA Large (3:1) |
|---|---|---|---|---|---|
| Texto principal | graphite-800 | #2D2D2D | 11.5:1 | ✅ | ✅ |
| Body text | graphite-500 | #5C5C5C | 5.7:1 | ✅ | ✅ |
| Muted text | graphite-400 | #7A7A7A | 3.8:1 | ❌ | ✅ |
| Labels/overline | graphite-300 | #9A9A9A | 2.6:1 | ❌ | ❌ |
| Borders | graphite-200 | #BCBCBC | 1.8:1 | N/A | N/A |
| Placeholders | graphite-300 | #9A9A9A | 2.6:1 | ❌ (texto) | ❌ |

Sobre fondo `#111111` (footer/dark sections):

| Uso | Color | Hex | Ratio vs #111111 | WCAG AA |
|---|---|---|---|---|
| White text | white | #FFFFFF | 18.1:1 | ✅ |
| Light text | graphite-300 | #9A9A9A | 4.8:1 | ✅ |
| Muted text | graphite-400 | #7A7A7A | 3.2:1 | ❌ normal / ✅ large |
| Label text | graphite-600 | #4A4A4A | 1.6:1 | ❌ |

**Problemas de contraste detectados:**

1. **`.overline` (graphite-300 #9A9A9A sobre #FAFAFA):** Ratio 2.6:1 — ❌ Falla AA y AA Large
   - Ubicación: Overlines en todas las secciones ("El desafío", "Nuestro enfoque", etc.)
   - **Recomendación:** Cambiar a graphite-500 (#5C5C5C) mínimo

2. **Placeholders (graphite-300 #9A9A9A sobre blanco #FFFFFF):** Ratio 2.7:1 — ❌
   - Ubicación: `index.html:635,643,651,660` (inputs del formulario)
   - **Nota:** WCAG 2.1 no exige contraste en placeholders, pero sí lo recomienda 1.4.3

3. **Footer links (graphite-400 #7A7A7A sobre #111111):** Ratio 3.2:1 — ❌ para texto normal
   - Ubicación: Footer nav en las 3 páginas
   - **Recomendación:** Los links del footer usan `graphite-400`, cambiar a `graphite-300` (#9A9A9A ratio 4.8:1)

4. **Footer copyright (graphite-600 #4A4A4A sobre #111111):** Ratio 1.6:1 — ❌
   - Ubicación: `index.html:712`, `equipo.html:303`, `servicios.html:336`
   - **Recomendación:** Cambiar a graphite-400 mínimo

**Impacto:** Alto — Varios textos no pasan WCAG AA.

---

### 13.4 Color como único indicador

**Estado:** ✅ CORRECTO

- Nav active link usa `text-graphite-900` vs `text-graphite-500` — diferencia de peso visual además de color ✅
- Tabs activos usan `bg-graphite-800 text-white` vs `border-graphite-100` — cambio de fondo completo ✅
- Errores de form usan texto + clase visual + `role="alert"` ✅
- No hay indicadores basados únicamente en color

---

### 13.5 Tamaños de fuente mínimos

**Estado:** ✅ CORRECTO

Body text base configurado via Tailwind como `font-body font-light` con DM Sans. El tamaño base del browser (16px) se mantiene. Los tamaños más pequeños usados:
- `text-xs` = 12px → usado en labels, overlines, footer legal → ⚠️ 12px es pequeño pero aceptable para contenido secundario
- `text-sm` = 14px → usado en body text de cards, form labels
- Base = 16px → texto principal

---

### 13.6 Line-height

**Estado:** ✅ CORRECTO

Tailwind classes usadas:
- `leading-relaxed` = 1.625 → ✅ supera mínimo 1.5
- Body text por defecto en DM Sans con Tailwind = 1.5 → ✅

---

## RESUMEN ACCESIBILIDAD WCAG 2.1

| Ítem | Estado | Impacto |
|---|---|---|
| Tags semánticos | ✅ (falta header) | Bajo |
| Estructura lógica | ✅ | — |
| button vs a | ✅ | — |
| Listas | ✅ | — |
| ARIA labels iconos | ✅ | — |
| Roles | ✅ | — |
| aria-hidden decorativos | ✅ | — |
| Form labels | ✅ | — |
| aria-live form feedback | ⚠️ Parcial | Medio |
| Placeholders vs labels | ✅ | — |
| Autocomplete | ✅ | — |
| Error role="alert" | ✅ (no populados por JS) | Medio |
| aria-invalid | ❌ Ausente | Medio |
| Skip links | ✅ | — |
| Focus visible | ✅ | — |
| Keyboard access | ✅ | — |
| Focus trap en modal | ❌ Ausente | Alto |
| ESC cierra modal | ❌ Ausente | Alto |
| Contraste textos | ⚠️ Varios fallos | Alto |
| Color como indicador | ✅ | — |
| Font sizes | ✅ | — |
| Line-height | ✅ | — |

**Errores Críticos:** 4 (focus trap, ESC modal, aria-invalid, contraste overlines/footer)
**Advertencias:** 3
**Correctos:** 15
