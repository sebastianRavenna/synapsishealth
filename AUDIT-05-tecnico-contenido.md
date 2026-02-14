# Auditoría UX/UI y SEO — Synapsis Health
## Parte 05: Contenido, Navegación, Detalles Técnicos y Polish (PRIORIDAD MEDIA-BAJA)

---

## 19. ESTRUCTURA DE CONTENIDO

### 19.1 Longitud de párrafos

**Estado:** ✅ CORRECTO

Los párrafos en las 3 páginas son cortos (2-4 líneas). No hay "wall of text". Las secciones de contenido usan `space-y-5` para separación.

---

### 19.2 Uso de listas

**Estado:** ✅ CORRECTO

- Servicios: listas `<ul>` con bullets ✅ (`index.html:340-405`)
- Diferencial: lista `<ul>` con bullets ✅ (`index.html:430-461`)
- Ética: grid de ítems con checkmarks ✅ (`index.html:538-563`)

---

### 19.3 Destacados (bold, emphasis)

**Estado:** ✅ CORRECTO

Cada sección usa un cierre enfático con `font-heading font-normal text-graphite-800` (o `text-white` en dark):
```html
<p class="text-graphite-800 font-heading font-normal reveal">
  Synapsis Health existe para cerrar esa brecha.
</p>
```

Bien dosificado — 1 frase por sección. ✅

---

### 19.4 Bloques sin breaking

**Estado:** ✅ CORRECTO — No hay bloques de texto extensos sin separación.

---

### 19.5 Secciones con headings claros

**Estado:** ✅ CORRECTO — Todas las secciones tienen overline + H2 + line-accent como patrón consistente.

---

## 20. NAVEGACIÓN

### 20.1 Navegación principal

**Estado:** ✅ CORRECTO

4 items: Inicio, Equipo, Servicios, Contacto + CTA "Contáctanos" + lang toggle.
Clara, limpia, con `aria-label="Navegación principal"`. ✅

---

### 20.2 Breadcrumbs

**Estado:** ⚠️ ADVERTENCIA

No hay breadcrumbs en `equipo.html` ni `servicios.html`. Para un sitio de 3 páginas no es estrictamente necesario, pero mejoraría UX y SEO.

**Recomendación (opcional):**
```html
<nav aria-label="Breadcrumb" class="container-site pt-24 pb-4">
  <ol class="flex gap-2 text-sm text-graphite-400">
    <li><a href="/" class="hover:text-graphite-700">Inicio</a></li>
    <li aria-hidden="true">/</li>
    <li aria-current="page" class="text-graphite-700">Equipo</li>
  </ol>
</nav>
```

Con Schema breadcrumb:
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://synapsishealth.vercel.app/" },
    { "@type": "ListItem", "position": 2, "name": "Equipo" }
  ]
}
```

**Impacto:** Bajo — Mejora menor para sitio de 3 páginas.

---

### 20.3 Footer con enlaces importantes

**Estado:** ✅ CORRECTO

Footer incluye: Logo + Nav (Inicio, Equipo, Servicios, Contacto) + Copyright.

⚠️ Faltan enlaces a:
- Política de privacidad
- Términos y condiciones
- LinkedIn u otras redes sociales

---

### 20.4 Menú móvil funcional

**Estado:** ✅ CORRECTO — Slide-in, overlay, close button, links funcionales. (Detallado en sección 14.8)

---

### 20.5 Indicador de página actual en nav

**Estado:** ✅ CORRECTO

Cada página marca el link activo con `class="nav-link active"` y `aria-current="page"`:
- `index.html:76` → Inicio active
- `equipo.html:49` → Equipo active
- `servicios.html:50` → Servicios active

---

### 20.6 Enlaces del footer funcionales

**Estado:** ✅ CORRECTO

Todos los enlaces del footer apuntan a páginas existentes:
- `index.html` → `/` ✅
- `equipo.html` ✅
- `servicios.html` ✅
- `#contacto` (o `index.html#contacto` desde subpáginas) ✅

---

## 21. SEGURIDAD Y HEADERS

### 21.1 HTTPS en todos los recursos

**Estado:** ✅ CORRECTO

Todos los recursos externos usan HTTPS:
- `https://fonts.googleapis.com` ✅
- `https://fonts.gstatic.com` ✅
- Canonical URLs: `https://synapsishealth.vercel.app` ✅
- Vercel sirve HTTPS por defecto ✅

---

### 21.2 Mixed content

**Estado:** ✅ CORRECTO — No hay recursos HTTP en páginas HTTPS.

---

### 21.3 Content Security Policy

**Estado:** ⚠️ ADVERTENCIA

No hay CSP configurado ni en meta tag ni en `vercel.json` headers.

**Recomendación para `vercel.json`:**
```json
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://synapsishealth-backend.vercel.app; frame-ancestors 'none'"
}
```

**Nota:** `'unsafe-inline'` necesario para los estilos inline de Tailwind y las animaciones JS que usan `element.style`.

**Impacto:** Medio — CSP es una capa importante de seguridad contra XSS.

---

### 21.4 X-Frame-Options

**Estado:** ✅ CORRECTO — `DENY` configurado en `vercel.json:15`.

---

### 21.5 Referrer-Policy

**Estado:** ✅ CORRECTO — `strict-origin-when-cross-origin` en `vercel.json:23`.

---

## 22. JAVASCRIPT

### 22.1 console.log olvidados

**Estado:** ⚠️ ADVERTENCIA

**Hallazgo:**
- `main.js:232` → `console.error("Contact form error:", err);` — Aceptable para debugging de producción.
- `backend/server.js:110` → `console.log(\`[CONTACT] Mensaje de ${nombre}\`);` — Aceptable para logging de servidor.
- `backend/server.js:114` → `console.error("[CONTACT] Error:", error);` — Aceptable.

No hay `console.log` de debugging olvidados. Los logs existentes son intencionales. ✅

---

### 22.2 Manejo de errores

**Estado:** ✅ CORRECTO

- Form submit: `try/catch` con feedback al usuario (`main.js:218-237`) ✅
- Backend: `try/catch` con status codes 400/429/500 (`server.js:43-116`) ✅
- Init functions: early return con null checks (`if (!toggle || !menu) return;`) ✅

---

### 22.3 Event listeners sin cleanup

**Estado:** ⚠️ ADVERTENCIA MENOR

**Hallazgo:** Los IntersectionObserver callbacks usan `obs.unobserve(e.target)` después de activar la animación → ✅ limpieza correcta.

Los event listeners de scroll y click no se remueven, pero en un sitio estático sin navegación SPA, esto es aceptable — los listeners viven toda la sesión de página.

**Impacto:** Ninguno para este caso de uso.

---

### 22.4 Memory leaks potenciales

**Estado:** ✅ CORRECTO

- `IntersectionObserver`: unobserve después de trigger ✅
- No hay intervals/timeouts persistentes (el `setTimeout` de 8s en feedback se auto-limpia) ✅
- No hay referencias circulares detectadas ✅
- `submissions` Map en backend: podría crecer indefinidamente, pero es solo rate limiting IP → riesgo bajo en producción

⚠️ **Nota backend:** La `Map` de rate limiting nunca se limpia. En un servidor de larga duración, podría acumular IPs.

**Recomendación para backend:**
```javascript
// Limpiar IPs viejas periódicamente
setInterval(() => {
  const now = Date.now();
  for (const [ip, time] of submissions) {
    if (now - time > RATE_LIMIT_MS * 2) submissions.delete(ip);
  }
}, RATE_LIMIT_MS * 2);
```

---

### 22.5 const/let vs var

**Estado:** ✅ CORRECTO — Todo el código usa `const` y `let`. No hay `var`. ✅

---

### 22.6 Código comentado no usado

**Estado:** ✅ CORRECTO

`main.js` y `i18n.js` no tienen código comentado residual. Los únicos comentarios son secciones descriptivas y el bloque de configuración del endpoint.

---

## 23. CSS

### 23.1 CSS no utilizado

**Estado:** ⚠️ ADVERTENCIA

**Hallazgo:** Tailwind con `--minify` flag hace tree-shaking automático basado en los content paths del config:
```javascript
content: ["./*.html", "./js/**/*.js"],
```

Esto elimina clases no usadas. ✅

Sin embargo, el CSS custom en `input.css` se incluye siempre:
- `.form-textarea` usa `@apply form-input` — referencia a otra clase custom ✅
- Todas las clases custom se usan en al menos una página ✅

---

### 23.2 !important

**Estado:** ✅ CORRECTO — No hay `!important` en `input.css`. ✅

---

### 23.3 Especificidad excesiva

**Estado:** ✅ CORRECTO — No hay selectores anidados excesivos. Las clases usan `@apply` de Tailwind. La especificidad más alta es `*:focus-visible` que es apropiado. ✅

---

### 23.4 Duplicación de estilos

**Estado:** ⚠️ ADVERTENCIA MENOR

El navbar, mobile menu, y footer se repiten en las 3 páginas HTML (sin templating). Esto causa duplicación de clases inline pero es inherente a un sitio estático sin framework. No es un problema de CSS sino de arquitectura.

---

### 23.5 Vendor prefixes

**Estado:** ✅ CORRECTO

- `-webkit-font-smoothing` ✅ (`input.css:29`)
- `-moz-osx-font-smoothing` ✅ (`input.css:30`)

Tailwind agrega autoprefixer por defecto cuando se instala como PostCSS plugin. Con el CLI, depende de la versión pero las propiedades modernas usadas (grid, flexbox, transform) tienen soporte universal.

---

### 23.6 z-index values

**Estado:** ✅ CORRECTO

| Elemento | z-index | Fuente |
|---|---|---|
| Skip link | 100 | `z-[100]` en input.css |
| Mobile overlay | 50 | `z-50` en HTML |
| Mobile menu | 50 | `z-50` en HTML |
| Navbar | 50 | `z-50` en HTML |
| Section content | 10 | `z-10` en quiénes somos, académica |

Escala lógica: contenido < nav/menu < skip link. ✅

⚠️ **Nota:** Overlay, mobile menu y navbar comparten `z-50`. Esto funciona porque overlay y menu solo se muestran cuando el menú está abierto, y el menú aparece después del overlay en el DOM.

---

### 23.7 position: fixed

**Estado:** ✅ CORRECTO

Elementos fixed:
- `#navbar`: `fixed top-0 left-0 right-0` — navbar sticky ✅
- `#menu-overlay`: `fixed inset-0` — overlay fullscreen ✅
- `#mobile-menu`: `fixed top-0 right-0 h-full w-72` — slide panel ✅

Todos tienen propósito legítimo y no causan problemas de layout.

---

## 24. ASSETS Y RECURSOS

### 24.1 Favicon

**Estado:** ❌ PROBLEMA

**Hallazgo:** Todas las líneas de favicon están **comentadas** en `index.html:37-41`:
```html
<!-- <link rel="icon" href="./assets/icons/favicon.svg" type="image/svg+xml"> -->
<!-- <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"> -->
<!-- <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"> -->
<!-- <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"> -->
```

Y los archivos de favicon **no existen** en el proyecto.

**Impacto:** Medio — Sin favicon, el sitio muestra el icono genérico del browser. Los archivos referenciados en `site.webmanifest` (android-chrome-192x192.png, 512x512.png) tampoco existen.

---

### 24.2 apple-touch-icon

**Estado:** ❌ AUSENTE — Comentado y sin archivo. (Ver 24.1)

---

### 24.3 manifest.json / site.webmanifest

**Estado:** ⚠️ ADVERTENCIA

El archivo `site.webmanifest` existe y está referenciado:
```html
<link rel="manifest" href="/site.webmanifest">
```

Pero los iconos que referencia **no existen**:
```json
"icons": [
  { "src": "/android-chrome-192x192.png" },
  { "src": "/android-chrome-512x512.png" }
]
```

---

### 24.4 preconnect/prefetch

**Estado:** ✅ CORRECTO

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

Preconnect configurado para Google Fonts. ✅

⚠️ No hay `dns-prefetch` fallback para browsers antiguos:
```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
```

**Impacto:** Bajo — Mejora marginal.

---

### 24.5 Recursos 404

**Estado:** ❌ PROBLEMA

Recursos referenciados que **no existen**:

| Recurso | Referencia | Archivo |
|---|---|---|
| `favicon.svg` | index.html:38 (comentado) | No existe |
| `favicon-32x32.png` | index.html:39 (comentado) | No existe |
| `favicon-16x16.png` | index.html:40 (comentado) | No existe |
| `apple-touch-icon.png` | index.html:41 (comentado) | No existe |
| `android-chrome-192x192.png` | site.webmanifest:6 | No existe |
| `android-chrome-512x512.png` | site.webmanifest:11 | No existe |
| `/images/logo.png` | Schema JSON-LD (index.html:727) | No existe |

**Impacto:** Medio — El Schema logo y los manifest icons generarán errores 404.

---

## 25. PRIORIDAD BAJA — POLISH

### 25.1 Smooth scroll

**Estado:** ✅ CORRECTO

- CSS: `scroll-behavior: smooth` en `html` (`input.css:28`) ✅
- JS: `initSmoothScroll()` con offset del navbar (`main.js:85-98`) ✅

---

### 25.2 Transiciones suaves

**Estado:** ✅ CORRECTO — Todas las transiciones usan `duration-300` o `duration-700` con `ease-out`. Suaves y consistentes.

---

### 25.3 Loading skeletons

**Estado:** ⚠️ N/A — No hay carga asíncrona de contenido visible (todo está en el HTML).

---

### 25.4 Animaciones de entrada

**Estado:** ✅ CORRECTO — Sistema `.reveal` con IntersectionObserver. Fade-up suave. ✅

---

## 26. CROSS-BROWSER

### 26.1 Features sin fallback

**Estado:** ✅ CORRECTO (mayormente)

Features modernas usadas:
- CSS Grid → soporte 97%+ ✅
- Flexbox → soporte 99%+ ✅
- `backdrop-blur-md` → soporte ~95% ⚠️ (no funciona en Firefox <103, IE11)
- `IntersectionObserver` → soporte 96%+ ✅
- `replaceAll` (no usado, `replace` sí) ✅
- `classList.replace()` → soporte 97%+ ✅
- `aspect-ratio` → soporte 93%+ ⚠️

⚠️ `backdrop-blur` y `aspect-ratio` no funcionan en IE11, pero IE11 tiene <1% de uso global.

---

### 26.2 Vendor prefixes

**Estado:** ✅ — `-webkit-font-smoothing` y `-moz-osx-font-smoothing` presentes.

---

## 27. COMENTARIOS Y DOCUMENTACIÓN

### 27.1 Código comentado innecesario

**Estado:** ✅ CORRECTO

Los comentarios en HTML son seccionales (`<!-- NAVBAR -->`, `<!-- HERO -->`) y útiles para navegación. No hay código muerto comentado en JS/CSS (excepto el bloque de Canela font que es intencional como recordatorio de licencia).

---

### 27.2 Comentarios útiles

**Estado:** ✅ CORRECTO — JSDoc-style headers en ambos JS files. Comentarios seccionales claros.

---

### 27.3 TODO/FIXME pendientes

**Estado:** ⚠️ ADVERTENCIA

**Hallazgos:**
- `main.js:219-221` — Comentario de configuración: `/* CONFIGURAR: URL del endpoint real del backend */`
- `backend/server.js:23-30` — Comentario de configuración: `// CONFIGURAR: Variables de entorno en .env`
- `index.html:37` — `<!-- Favicon: reemplazar con isotipo SVG definitivo -->`
- `css/input.css:6-23` — Bloque Canela font comentado con instrucción de descomentar

No hay TODO/FIXME explícitos, pero hay 4 items pendientes de configuración.

---

## 28. LEGAL Y COMPLIANCE

### 28.1 Enlaces a políticas

**Estado:** ❌ PROBLEMA

No hay enlace a:
- Política de privacidad
- Términos y condiciones / Términos de uso

**Recomendación:**
```html
<!-- En el footer, después del copyright -->
<div class="flex justify-center gap-4 mt-4">
  <a href="/privacidad.html" class="text-xs text-graphite-600 hover:text-graphite-400">Política de privacidad</a>
  <a href="/terminos.html" class="text-xs text-graphite-600 hover:text-graphite-400">Términos de uso</a>
</div>
```

**Impacto:** Alto — Obligatorio legalmente en Argentina (Ley 25.326 de Protección de Datos Personales) al recopilar datos via formulario de contacto.

---

### 28.2 Cookie consent

**Estado:** ⚠️ ADVERTENCIA

No hay banner de cookies. Actualmente el sitio usa:
- `localStorage` para preferencia de idioma (`synapsis-lang`)
- No hay Google Analytics ni tracking cookies
- No hay cookies de terceros (Google Fonts no setea cookies)

Si se agrega Google Analytics u otro tracking, será necesario un banner de consentimiento.

**Impacto:** Bajo actualmente — Pero necesario si se agrega analytics.

---

### 28.3 Información de contacto accesible

**Estado:** ✅ CORRECTO

- Email: `contacto@synapsishealth.com` (enlace mailto) ✅
- Ubicación: Buenos Aires, Argentina ✅
- Cobertura: Latinoamérica · Internacional ✅
- Formulario de contacto funcional ✅

---

## RESUMEN GENERAL DE LA AUDITORÍA

### Totales por prioridad

| Prioridad | Correctos | Advertencias | Errores |
|---|---|---|---|
| **CRÍTICA** (Performance) | 9 | 8 | 2 |
| **ALTA** (SEO) | 12 | 6 | 3 |
| **ALTA** (Accesibilidad) | 15 | 3 | 4 |
| **MEDIA** (UX/UI) | 17 | 4 | 1 |
| **MEDIA** (Contenido/Nav) | 10 | 2 | 1 |
| **NORMAL** (Técnico) | 14 | 4 | 2 |
| **BAJA** (Polish/Legal) | 5 | 2 | 1 |
| **TOTAL** | **82** | **29** | **14** |

### TOP 10 Errores Más Críticos (por impacto)

| # | Error | Impacto | Archivo |
|---|---|---|---|
| 1 | og:image ausente/comentado en 3 páginas | Alto (SEO social) | 3 HTML files |
| 2 | Focus trap ausente en modal móvil | Alto (WCAG AA) | js/main.js |
| 3 | ESC no cierra modal móvil | Alto (WCAG AA) | js/main.js |
| 4 | Contraste insuficiente en overlines/footer | Alto (WCAG AA) | css/input.css |
| 5 | LCP hero con opacity:0 (reveal) | Alto (CWV) | index.html |
| 6 | Política de privacidad ausente | Alto (Legal) | footer |
| 7 | prefers-reduced-motion ausente | Medio (WCAG) | css/input.css |
| 8 | JS sin minificar en producción | Medio (Perf) | js/*.js |
| 9 | Schema logo apunta a archivo inexistente | Medio (SEO) | index.html:727 |
| 10 | Favicon ausente (comentado, sin archivos) | Medio (UX/SEO) | index.html |

### Lo Que Está Muy Bien Hecho

1. **Stack mínimo y limpio** — Vanilla JS, sin dependencias innecesarias
2. **HTML semántico** — nav, main, section, aside, roles ARIA
3. **Formulario accesible** — labels, autocomplete, aria-describedby, role="alert"
4. **Sistema de diseño consistente** — Tailwind config con tokens de color/spacing
5. **Animaciones performantes** — Solo opacity + transform (compositor)
6. **Skip links** — Implementados en las 3 páginas
7. **i18n completo** — ES/EN con 348+ claves
8. **Security headers** — XSS, clickjacking, referrer, permissions
9. **Jerarquía tipográfica** — Clara diferenciación size/weight/color
10. **Backend seguro** — escapeHtml, rate limiting, validación
