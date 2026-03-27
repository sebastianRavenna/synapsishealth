# Reporte de Auditoría Web — Synapsis Health

**Fecha original:** 2026-02-14
**Última actualización:** 2026-03-27
**Auditor:** Claude (UX/UI + SEO Técnico)
**Sitio:** https://synapsishealth.vercel.app
**Stack:** HTML5 + Tailwind CSS 3.4 + Vanilla JS + Vercel

---

## 1. Resumen Ejecutivo

### Estado general del sitio (2026-03-27)

| Área | Score | Tendencia |
|---|---|---|
| **SEO Técnico** | 4/10 | ⬇️ Crítico — No aparece en Google |
| **Performance** | 7/10 | ⬆️ Mejorado (imágenes pendientes) |
| **Accesibilidad** | 9/10 | ⬆️ Casi completo |
| **UX/UI** | 9/10 | ⬆️ Casi completo |
| **Técnico/Contenido** | 7/10 | ➡️ Legal pendiente |

### Issues totales

| Categoría | Original (02/14) | Corregidos | Nuevos hallazgos | Pendientes actual |
|---|---|---|---|---|
| Ortografía/Tildes | 50+ | 50+ ✅ | 0 | 0 |
| SEO On-Page | 18 | 8 | 8 | **18** |
| Accesibilidad | 15 | 10 ✅ | 0 | **2** |
| Performance | 6 | 4 ✅ | 4 | **6** |
| UX/UI | 5 | 3 ✅ | 0 | **2** |
| Seguridad | 5 | 5 ✅ | 0 | 0 |
| Legal/Compliance | 2 | 0 | 1 | **3** |
| Archivos de config | 4 | 4 ✅ | 0 | 0 |
| **TOTAL** | **105+** | **84+** | **13** | **31** |

---

## 2. ⚠️ URGENTE: La página no aparece en Google

### Diagnóstico

La página no aparece en búsquedas de Google (ni siquiera buscando "Synapsis Health") por la combinación de estos factores:

| # | Factor | Estado | Acción requerida |
|---|---|---|---|
| 1 | **Google Search Console** | ❌ No registrado | Registrar y verificar propiedad |
| 2 | **Dominio propio** | ❌ No configurado | Apuntar synapsishealth.com.ar a Vercel |
| 3 | **Sitemap.xml** | ❌ Desactualizado (2025-02-14), incompleto (3 URLs) | Actualizar con todas las URLs y fecha actual |
| 4 | **og:image** | ❌ Comentado en todas las páginas | Descomentar con imagen real 1200×630px |
| 5 | **Alt text en imágenes** | ❌ Todas vacías (9+ imágenes) | Agregar alt descriptivo a cada imagen |
| 6 | **equipo.html** | ❌ Sin canonical, sin OG, sin favicon, title con "Opción F" | Alinear <head> con index.html |
| 7 | **hreflang** | ❌ No existe para contenido bilingüe | Agregar tags hreflang ES/EN |
| 8 | **Schema en subpáginas** | ❌ Solo Organization en index.html | Agregar Schema a servicios.html |
| 9 | **Email inconsistente** | ❌ Schema vs HTML diferentes | Unificar |

### Plan de acción prioritario (SEO)

**Semana 1 — Indexación:**
1. Registrar sitio en Google Search Console
2. Actualizar sitemap.xml (todas las URLs, fecha actual)
3. Solicitar indexación manual de las 4 páginas principales
4. Configurar dominio propio synapsishealth.com.ar

**Semana 2 — On-Page SEO:**
5. Descomentar og:image con imagen real
6. Agregar alt text a todas las imágenes de contenido
7. Corregir equipo.html (canonical, OG, favicon, title)
8. Agregar meta robots explícito

**Semana 3 — Structured Data:**
9. Agregar Schema ProfessionalService en servicios.html
10. Agregar hreflang para contenido bilingüe
11. Corregir email inconsistente en Schema
12. Agregar Schema BreadcrumbList

---

## 3. Correcciones realizadas (desde auditoría original)

### Corregidos ✅

| Corrección | Archivo | Fecha |
|---|---|---|
| JS minificado con Terser | package.json, build | ✅ |
| Scripts con `defer` | index.html, servicios.html | ✅ |
| Focus trap en modal móvil | js/main.js | ✅ |
| ESC cierra modal | js/main.js | ✅ |
| `prefers-reduced-motion` | css/input.css | ✅ |
| Disabled button state | css/input.css | ✅ |
| Favicon descomentado | index.html, servicios.html | ✅ |
| `dns-prefetch` agregado | index.html, servicios.html | ✅ |
| LCP hero H1 sin .reveal | index.html | ✅ |
| Google Fonts optimizado (8 pesos) | index.html, servicios.html | ✅ |
| CSP header implementado | vercel.json | ✅ |
| HSTS header implementado | vercel.json | ✅ |
| `aria-live` en form feedback | index.html | ✅ |
| `aria-invalid` en validación JS | js/main.js | ✅ |
| Error messages populados por JS | js/main.js | ✅ |
| `overflow-x: hidden` en body | css/input.css | ✅ |
| Meta keywords eliminados | index.html, servicios.html | ✅ |
| Meta titles optimizados (<60 chars) | index.html, servicios.html | ✅ |
| Meta descriptions ajustadas | index.html | ✅ |
| Schema Organization @id agregado | index.html | ✅ |
| Schema logo corregido | index.html | ✅ |

### Nuevos hallazgos ❌

| Hallazgo | Archivo | Prioridad |
|---|---|---|
| equipo.html sin canonical, OG, favicon | equipo.html | CRÍTICA |
| equipo.html title contiene "Opción F" | equipo.html | ALTA |
| equipo.html carga todos los pesos de fonts | equipo.html | ALTA |
| equipo-bg.jpg 1.2MB sin optimizar | assets/img/ | ALTA |
| analisis_datos.webp 616KB sobredimensionado | assets/img/ | MEDIA |
| Email inconsistente Schema vs HTML | index.html | MEDIA |
| ~9.5MB de archivos no utilizados en repo | assets/vid/, assets/img/ | BAJA |
| Imágenes sin width/height | *.html | MEDIA |

---

## 4. Pendientes por prioridad

### CRÍTICO (resolver esta semana)

- [ ] Registrar en Google Search Console
- [ ] Actualizar sitemap.xml (URLs + lastmod)
- [ ] Configurar dominio synapsishealth.com.ar
- [ ] Corregir equipo.html (canonical, OG, title, favicon)
- [ ] Descomentar og:image en todas las páginas
- [ ] Agregar alt text a todas las imágenes

### ALTO (resolver en 2 semanas)

- [ ] Agregar hreflang para contenido bilingüe
- [ ] Agregar Schema ProfessionalService en servicios.html
- [ ] Optimizar equipo-bg.jpg (1.2MB → <300KB WebP)
- [ ] Comprimir analisis_datos.webp (616KB → <200KB)
- [ ] Unificar email en Schema y HTML
- [ ] Crear página de Política de Privacidad
- [ ] Agregar meta robots explícito

### MEDIO (resolver en 1 mes)

- [ ] Agregar width/height a todas las `<img>`
- [ ] Implementar srcset para imágenes responsive
- [ ] Agregar Schema BreadcrumbList
- [ ] Mejorar contraste footer (graphite-400 → graphite-300)
- [ ] Usar clamp() para font-sizes display

### BAJO (mejoras opcionales)

- [ ] Eliminar archivos no utilizados del repo (~9.5MB)
- [ ] CSS crítico inline
- [ ] Self-host Google Fonts
- [ ] Agregar spinner visual al form submit
- [ ] Agregar `<header>` semántico

---

## 5. Recomendaciones Post-Indexación

### Google Search Console

1. Verificar propiedad del dominio (HTML tag o DNS)
2. Enviar sitemap.xml actualizado
3. Solicitar indexación de las 4 páginas principales
4. Monitorear errores de rastreo
5. Verificar mobile-friendly
6. Revisar Core Web Vitals

### Google Analytics 4

1. Crear propiedad GA4
2. Agregar tag (requiere actualizar CSP)
3. Configurar eventos: form_submit, CTA_click
4. Definir conversiones: envío de formulario

### Monitoreo continuo

1. PageSpeed Insights mensual
2. Search Console semanal (primeros meses)
3. Revisar errores 404
4. Monitorear posiciones de keywords

---

## 6. Archivos de auditoría detallados

| Archivo | Contenido | Estado |
|---|---|---|
| `AUDIT-01-performance.md` | Performance & Core Web Vitals | Actualizado 2026-03-27 |
| `AUDIT-02-seo.md` | SEO Técnico (PRIORIDAD CRÍTICA) | Actualizado 2026-03-27 |
| `AUDIT-03-accesibilidad.md` | Accesibilidad WCAG 2.1 | Actualizado 2026-03-27 |
| `AUDIT-04-ux-ui.md` | UX/UI Patterns | Actualizado 2026-03-27 |
| `AUDIT-05-tecnico-contenido.md` | Contenido y Técnico | Actualizado 2026-03-27 |
| `AUDIT-REPORT.md` | Este resumen ejecutivo | Actualizado 2026-03-27 |

---

## 7. Lo que está muy bien hecho

1. **Stack mínimo y limpio** — Vanilla JS, sin dependencias innecesarias
2. **HTML semántico** — nav, main, section, aside, roles ARIA completos
3. **Formulario accesible** — labels, autocomplete, aria-describedby, aria-invalid, role="alert"
4. **Focus management** — Focus trap, ESC handler, focus restoration en modal
5. **Security headers** — CSP, HSTS, XSS, clickjacking, referrer, permissions
6. **Animaciones performantes** — Solo opacity + transform (compositor)
7. **Skip links** — Implementados en todas las páginas
8. **i18n completo** — ES/EN con 348+ claves de traducción
9. **prefers-reduced-motion** — Animaciones desactivadas para usuarios que lo prefieran
10. **Backend seguro** — escapeHtml, rate limiting, validación, honeypot antispam
