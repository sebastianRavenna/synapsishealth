# Auditoría UX/UI y SEO — Synapsis Health
## Parte 05: Contenido, Navegación, Detalles Técnicos y Polish (PRIORIDAD MEDIA-BAJA)

**Fecha original:** 2026-02-14
**Última actualización:** 2026-03-27

---

## 19. ESTRUCTURA DE CONTENIDO

### 19.1-19.5 Párrafos, listas, destacados, headings

**Estado:** ✅ CORRECTO — Sin cambios. Párrafos cortos, listas con `<ul>`, cierres enfáticos dosificados.

---

## 20. NAVEGACIÓN

### 20.1 Navegación principal

**Estado:** ✅ CORRECTO — 4 items + CTA + lang toggle. `aria-label="Navegación principal"`.

---

### 20.2 Breadcrumbs

**Estado:** ⚠️ ADVERTENCIA (sin cambios)

No hay breadcrumbs. Para un sitio de pocas páginas no es estrictamente necesario, pero beneficiaría SEO con Schema BreadcrumbList.

---

### 20.3 Footer con enlaces importantes

**Estado:** ⚠️ ADVERTENCIA

Footer incluye: Logo + Nav + Copyright. ✅

**Faltan:**
- Enlace a Política de Privacidad ❌
- Enlace a Términos y Condiciones ❌
- Enlace a LinkedIn/redes sociales ❌

---

### 20.4 Menú móvil funcional

**Estado:** ✅ CORRECTO — Slide-in con focus trap, ESC, overlay, body lock.

---

### 20.5 Indicador de página actual

**Estado:** ✅ CORRECTO — `class="nav-link active"` + `aria-current="page"`.

---

### 20.6 Enlaces del footer funcionales

**Estado:** ✅ CORRECTO — Todos apuntan a páginas existentes.

---

## 21. SEGURIDAD Y HEADERS

### 21.1-21.2 HTTPS y Mixed content

**Estado:** ✅ CORRECTO — Todo HTTPS. Sin mixed content.

---

### 21.3 Content Security Policy

**Estado:** ✅ CORRECTO (corregido desde última auditoría)

CSP implementado en `vercel.json:17-18`:
```
default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; ...
```

---

### 21.4-21.5 X-Frame-Options, Referrer-Policy, HSTS

**Estado:** ✅ CORRECTO — Todos implementados en vercel.json con valores apropiados.

**Headers de seguridad completos:**
- X-Content-Type-Options: nosniff ✅
- X-Frame-Options: DENY ✅
- Content-Security-Policy ✅
- Strict-Transport-Security (HSTS) ✅
- Referrer-Policy: strict-origin-when-cross-origin ✅
- Permissions-Policy ✅
- X-DNS-Prefetch-Control: on ✅

---

## 22. JAVASCRIPT

### 22.1 console.log olvidados

**Estado:** ✅ CORRECTO — Solo logs intencionales (`console.error` en form y backend).

---

### 22.2 Manejo de errores

**Estado:** ✅ CORRECTO — try/catch en form submit, null checks en init.

---

### 22.3-22.4 Event listeners cleanup, Memory leaks

**Estado:** ✅ CORRECTO — IntersectionObserver usa unobserve. Scroll listener es lifetime del page.

---

### 22.5 const/let vs var

**Estado:** ✅ CORRECTO — Solo `const` y `let`.

---

### 22.6 Código comentado

**Estado:** ✅ CORRECTO — Comentarios son seccionales/útiles. No hay código muerto.

---

## 23. CSS

### 23.1 CSS no utilizado

**Estado:** ✅ CORRECTO — Tailwind tree-shaking + todas las clases custom se usan.

---

### 23.2 !important

**Estado:** ✅ CORRECTO — Solo en `prefers-reduced-motion` (justificado).

---

### 23.3-23.4 Especificidad, Duplicación

**Estado:** ✅ CORRECTO — Sin selectores excesivos. Duplicación inherente a sitio estático (esperado).

---

### 23.5 Vendor prefixes

**Estado:** ✅ CORRECTO — `-webkit-font-smoothing` y `-moz-osx-font-smoothing` presentes.

---

### 23.6 z-index values

**Estado:** ✅ CORRECTO — Escala lógica: contenido < nav/menu < skip link.

---

### 23.7 position: fixed

**Estado:** ✅ CORRECTO — Solo navbar, overlay, mobile menu, WhatsApp float.

---

## 24. ASSETS Y RECURSOS

### 24.1 Favicon

**Estado:** ✅ CORRECTO (corregido desde última auditoría)

Favicons descomentados y activos:
```html
<link rel="icon" href="./assets/icons/favicon.png" type="image/png">
<link rel="icon" type="image/png" sizes="32x32" href="./assets/icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="./assets/icons/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="./assets/icons/apple-touch-icon.png">
```

⚠️ **Nota:** Solo en index.html y servicios.html. `equipo.html` NO tiene favicons.

---

### 24.2 apple-touch-icon

**Estado:** ✅ CORRECTO en index.html. ❌ Ausente en equipo.html.

---

### 24.3 manifest.json / site.webmanifest

**Estado:** ✅ CORRECTO — `site.webmanifest` referenciado. Iconos de PWA configurados.

---

### 24.4 preconnect/prefetch

**Estado:** ✅ CORRECTO (corregido desde última auditoría)

```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

⚠️ **Nota:** `equipo.html` no tiene `dns-prefetch`.

---

### 24.5 Recursos no utilizados en el repositorio

**Estado:** ⚠️ ADVERTENCIA

Archivos en el repo que no se referencian en el HTML:

| Archivo | Tamaño | Estado |
|---|---|---|
| `assets/vid/hero.mp4` | 6.7MB | ❌ No usado (video hero comentado) |
| `assets/vid/logo-anim.mp4` | 577KB | ❌ No referenciado |
| `assets/vid/logo-anim2.mp4` | 855KB | ❌ No referenciado |
| `assets/vid/logo-anim3.mp4` | 536KB | ❌ No referenciado |
| `assets/vid/Diseño sin título (4).gif` | — | ❌ No referenciado |
| `assets/img/Diseño sin título (6).jpg` | 748KB | ❌ No referenciado |
| `assets/img/hero_sinapsis.webp` | 32KB | ❌ No referenciado |
| `assets/img/arqui 1.webp` | 36KB | ❌ No referenciado |
| `assets/img/el desafio.webp` | 84KB | ❌ No referenciado |

**Total no utilizado:** ~9.5MB

**Recomendación:** Eliminar o mover a un branch de assets estos archivos para reducir el tamaño del deploy.

---

## 25. POLISH

### 25.1-25.4 Smooth scroll, transiciones, skeletons, animaciones

**Estado:** ✅ CORRECTO — Todo sin cambios. Smooth scroll con offset, transiciones suaves, reveal con IntersectionObserver.

---

## 26. CROSS-BROWSER

### 26.1-26.2 Features sin fallback, Vendor prefixes

**Estado:** ✅ CORRECTO — CSS Grid (97%+), Flexbox (99%+), aspect-ratio (93%+). Prefixes presentes.

---

## 27. COMENTARIOS Y DOCUMENTACIÓN

### 27.1-27.3 Código comentado, comentarios útiles, TODOs

**Estado:** ✅ CORRECTO — Comentarios seccionales claros. Sin código muerto.

**TODOs implícitos pendientes:**
- Favicon: "reemplazar con isotipo SVG definitivo"
- Hero: "reemplazar la URL cuando se tenga la imagen definitiva"
- Canela font: descomentar cuando se tenga licencia
- OG image: descomentar cuando exista

---

## 28. LEGAL Y COMPLIANCE

### 28.1 Enlaces a políticas

**Estado:** ❌ PROBLEMA (sin cambios)

No hay enlace a:
- Política de privacidad ❌
- Términos y condiciones ❌

**Impacto:** Alto — Obligatorio legalmente en Argentina (Ley 25.326) al recopilar datos via formulario.

---

### 28.2 Cookie consent

**Estado:** ⚠️ ADVERTENCIA

No hay cookies de tracking actualmente (no hay GA). Solo `localStorage` para idioma.
Si se agrega Google Analytics, será necesario un banner de consentimiento.

---

### 28.3 Información de contacto

**Estado:** ⚠️ ADVERTENCIA

- Email en HTML: `info@synapsishealth.com.ar` ✅
- Email en Schema JSON-LD: `contacto@synapsishealth.com` ❌ **Inconsistente**
- WhatsApp: +54 9 11 7828-2173 ✅
- Ubicación: Buenos Aires, Argentina ✅

**Recomendación:** Unificar email en Schema y HTML.

---

## RESUMEN CONTENIDO/TÉCNICO (actualizado 2026-03-27)

| Ítem | Estado anterior (02/14) | Estado actual (03/27) | Impacto |
|---|---|---|---|
| Estructura contenido | ✅ | ✅ | — |
| Navegación principal | ✅ | ✅ | — |
| Breadcrumbs | ⚠️ | ⚠️ Sin cambio | Bajo |
| Footer enlaces | ⚠️ Falta legal | ⚠️ Sin cambio | Alto |
| Menú móvil | ✅ | ✅ | — |
| Página actual indicator | ✅ | ✅ | — |
| HTTPS/Mixed content | ✅ | ✅ | — |
| CSP | ❌ Ausente | ✅ **Corregido** | — |
| Security headers | ✅ | ✅ (+ HSTS, CSP) | — |
| JS quality | ✅ | ✅ | — |
| CSS quality | ✅ | ✅ | — |
| Favicon | ❌ Comentado | ✅ **Corregido** (excepto equipo.html) | Medio |
| Preconnect/prefetch | ⚠️ Sin dns-prefetch | ✅ **Corregido** (excepto equipo.html) | — |
| Archivos no utilizados | — | ⚠️ **NUEVO** ~9.5MB en repo | Bajo |
| Política privacidad | ❌ | ❌ **Sin cambio** | Alto |
| Cookie consent | ⚠️ | ⚠️ Sin cambio | Bajo |
| Email inconsistente | — | ⚠️ **NUEVO** Schema vs HTML | Medio |

**Errores:** 1 (política de privacidad ausente)
**Advertencias:** 5
**Correctos:** 14
**Corregidos desde última auditoría:** 3 (CSP, favicon, dns-prefetch)
