# Reporte de Auditoría Web — Synapsis Health

**Fecha:** 2026-02-14
**Auditor:** Claude (UX/UI + SEO Técnico)
**Sitio:** https://synapsishealth.vercel.app
**Stack:** HTML5 + Tailwind CSS 3.4 + Vanilla JS + Vercel

---

## 1. Resumen Ejecutivo

### Issues encontrados y corregidos

| Categoría | Issues | Corregidos | Pendientes |
|---|---|---|---|
| Ortografía/Tildes | 50+ | 50+ | 0 |
| SEO On-Page | 18 | 18 | 0 |
| Accesibilidad (WCAG 2.1 AA) | 15 | 15 | 0 |
| Semántica HTML | 8 | 8 | 0 |
| Performance | 6 | 4 | 2 |
| Seguridad | 5 | 5 | 0 |
| Archivos de configuración | 4 | 4 | 0 |
| **TOTAL** | **106+** | **104+** | **2** |

---

## 2. Detalle de Correcciones Realizadas

### FASE 1: Ortografía y Contenido

**Archivo: `index.html`** — 50+ correcciones de tildes en textos hardcoded:

| Texto original | Texto corregido |
|---|---|
| Evaluacion de Tecnologias Sanitarias | Evaluación de Tecnologías Sanitarias |
| Plataforma estrategica | Plataforma estratégica |
| evidencia cientifica, analisis economico | evidencia científica, análisis económico |
| Areas de trabajo | Áreas de trabajo |
| El desafio | El desafío |
| tecnica. Es institucional | técnica. Es institucional |
| tecnologias cada vez mas costosas | tecnologías cada vez más costosas |
| politicamente sensibles | políticamente sensibles |
| la tecnica aislada | la técnica aislada |
| La politica sin evidencia | La política sin evidencia |
| marcos solidos...economia | marcos sólidos...economía |
| Arquitectura de decision sanitaria | Arquitectura de decisión sanitaria |
| plataforma estrategica especializada | plataforma estratégica especializada |
| infraestructura tecnica | infraestructura técnica |
| evidencia cientifica, politica publica | evidencia científica, política pública |
| Evaluacion rigurosa...estandares | Evaluación rigurosa...estándares |
| tecnologias de alto impacto | tecnologías de alto impacto |
| Que hacemos | Qué hacemos |
| Evaluacion estrategica | Evaluación estratégica |
| Evaluacion de Tecnologias Sanitarias rapida | Evaluación de Tecnologías Sanitarias rápida |
| Analisis de impacto | Análisis de impacto |
| Evaluacion de valor y priorizacion explicita | Evaluación de valor y priorización explícita |
| Diseno de acuerdos | Diseño de acuerdos |
| Soporte tecnico en negociacion | Soporte técnico en negociación |
| Diseno de marcos | Diseño de marcos |
| judicializacion | judicialización |
| Construccion de capacidades publicas de decision | Construcción de capacidades públicas de decisión |
| Por que Synapsis | Por qué Synapsis |
| decisiones publicas | decisiones públicas |
| Diseno y negociacion | Diseño y negociación |
| Comprension profunda...politico-institucional | Comprensión profunda...político-institucional |
| Integracion de academia...gestion real | Integración de academia...gestión real |
| Marco etico explicito | Marco ético explícito |
| credibilidad tecnica...auditoria tecnica | credibilidad técnica...auditoría técnica |
| escrutinio politico y evaluacion publica | escrutinio político y evaluación pública |
| Rigor metodologico | Rigor metodológico |
| Comprension institucional | Comprensión institucional |
| Vinculacion academica | Vinculación académica |
| Produccion de conocimiento y formacion | Producción de conocimiento y formación |
| produccion cientifica...formacion ejecutiva | producción científica...formación ejecutiva |
| instituciones academicas | instituciones académicas |
| capacidades publicas | capacidades públicas |
| negociacion de tecnologias...gestion publica | negociación de tecnologías...gestión pública |
| solidez tecnica...vision estrategica | solidez técnica...visión estratégica |
| Etica y gobernanza | Ética y gobernanza |
| principios explicitos | principios explícitos |
| Politicas de conflictos de interes | Políticas de conflictos de interés |
| informacion | información |
| Separacion entre sector publico | Separación entre sector público |
| Trazabilidad metodologica | Trazabilidad metodológica |
| Ubicacion | Ubicación |
| Latinoamerica | Latinoamérica |
| Organizacion | Organización |
| en que podemos | en qué podemos |
| Iniciar conversacion | Iniciar conversación |
| Contactanos | Contáctanos |
| Abrir menu | Abrir menú |
| Cerrar menu | Cerrar menú |

### FASE 2: SEO On-Page

**Archivos:** `index.html`, `equipo.html`, `servicios.html`

| Mejora | Estado |
|---|---|
| Title tags únicos y optimizados (50-60 chars) | Implementado |
| Meta descriptions persuasivas (150-160 chars) | Implementado |
| Keywords meta por página | Implementado |
| Canonical tags | Implementado |
| Open Graph tags completos (type, title, description, url, site_name, locale) | Implementado |
| Twitter Cards (card, title, description) | Implementado |
| OG Image placeholders (comentados, listos para activar) | Preparado |
| Schema.org Organization en index.html | Implementado |
| robots.txt | Creado |
| sitemap.xml (3 URLs) | Creado |
| site.webmanifest | Creado |
| theme-color meta | Implementado |

### FASE 3: Semántica HTML

| Mejora | Archivo | Detalle |
|---|---|---|
| `<main id="main-content">` | Todas | Agregado tag `<main>` semántico |
| Skip link | Todas | `<a href="#main-content" class="skip-link">` |
| `aria-label` en `<nav>` | Todas | "Navegación principal", "Navegación del pie de página" |
| `aria-current="page"` | Todas | En link de página activa |
| `role="dialog"` en mobile menu | Todas | Con aria-label descriptivo |
| `aria-hidden="true"` en SVGs | Todas | En iconos decorativos |
| `role="tablist/tab/tabpanel"` | equipo.html, servicios.html | Tabs accesibles |
| `aria-selected` en tabs | equipo.html, servicios.html | Estado correcto |
| `aria-controls` en tabs | equipo.html, servicios.html | Vinculación tab-panel |
| Un solo H1 por página | Todas | Verificado y corregido |

### FASE 4: Accesibilidad del Formulario

**Archivo:** `index.html` — Formulario de contacto

| Mejora | Detalle |
|---|---|
| `aria-required="true"` | En campos obligatorios |
| `aria-describedby` | Vinculado a mensajes de error |
| `autocomplete` | name, email, organization |
| `minlength/maxlength` | Validación nativa |
| `<span role="alert">` | Mensajes de error accesibles |
| `aria-label="obligatorio"` | En asteriscos |
| `novalidate` + JS validation | Validación personalizada |
| `aria-live="polite"` | En mensaje de éxito |

### FASE 5: CSS y UX

**Archivo:** `css/input.css`

| Mejora | Detalle |
|---|---|
| `.skip-link` | Oculto por defecto, visible al focus |
| `.error-message` | Estilo para errores de formulario |
| `.success-message` | Estilo para mensaje de éxito |
| `*:focus-visible` | Outline visible para navegación por teclado |
| Mobile touch targets | `min-height: 44px` en elementos interactivos |
| `active:scale-[0.98]` | Feedback táctil en botones |
| `focus:ring-2` | Ring de focus mejorado en inputs |

### FASE 6: Seguridad y Performance

**Archivo:** `vercel.json`

| Header | Valor | Propósito |
|---|---|---|
| X-Content-Type-Options | nosniff | Previene MIME sniffing |
| X-Frame-Options | DENY | Previene clickjacking |
| X-XSS-Protection | 1; mode=block | Protección XSS del navegador |
| Referrer-Policy | strict-origin-when-cross-origin | Control de referrer |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | Bloquea APIs sensibles |
| Cache-Control (assets) | public, max-age=31536000, immutable | Cache 1 año para estáticos |
| Redirect /index.html → / | 301 permanent | URL canónica limpia |

---

## 3. Métricas de Mejora

### SEO Score (estimado)

| Métrica | Antes | Después |
|---|---|---|
| Title tags | 1/3 páginas | 3/3 páginas |
| Meta descriptions | 0/3 | 3/3 |
| Canonical tags | 0/3 | 3/3 |
| Open Graph | 0/3 | 3/3 |
| Schema.org | No | Sí |
| robots.txt | No | Sí |
| sitemap.xml | No | Sí |
| H1 heading count | Correcto | Verificado correcto |

### Accesibilidad

| Métrica | Antes | Después |
|---|---|---|
| Skip links | No | Sí (3 páginas) |
| ARIA landmarks | Parcial | Completo |
| Form labels | Parcial | Completo con ARIA |
| Focus visible | No explícito | Sí (focus-visible) |
| Touch targets | Sin verificar | 44px mínimo |
| Tab roles | Sin ARIA | Completo |
| Keyboard navigation | Parcial | Funcional |

### Ortografía

| Métrica | Antes | Después |
|---|---|---|
| Palabras sin tilde en HTML | 50+ | 0 |
| i18n.js (ya correcto) | OK | OK |

---

## 4. Pendientes

### Requieren recursos externos (imágenes)

- Hero images: desktop (1920x1080), tablet (1024x768), mobile (768x1024)
- Imágenes de secciones: institucional, diferencial, académica (1200x800)
- Fotos de equipo: 4 miembros (400x400)
- Imágenes de servicios: 6 servicios
- OG Image: 1200x630px
- Twitter Card: 1200x600px
- Favicon set: ico, png 16x16, 32x32, apple-touch-icon 180x180
- Isotipo SVG definitivo para reemplazar el actual

### Requieren decisiones del equipo

- Licencia de fuente Canela (actualmente usando Playfair Display como fallback)
- Configuración SMTP para el formulario de contacto
- Nombres reales del equipo (actualmente "Nombre Apellido")
- Contenido biográfico definitivo de cada miembro

### Funcionalidades por implementar

- Backend real para formulario de contacto (SMTP configurado)
- Google Analytics 4
- Cookie consent banner (si aplica para GDPR/leyes locales)

---

## 5. Recomendaciones Post-Launch

### Google Search Console

1. Verificar propiedad del dominio
2. Enviar sitemap.xml
3. Solicitar indexación de las 3 páginas
4. Monitorear errores de rastreo
5. Verificar mobile-friendly

### Google Analytics 4

1. Crear propiedad GA4
2. Agregar tag con Google Tag Manager o script directo
3. Configurar eventos: form_submit, CTA_click, page_scroll
4. Definir conversiones: envío de formulario

### Monitoreo continuo

1. PageSpeed Insights mensual
2. Search Console semanal (primeros meses)
3. Revisar errores 404
4. Monitorear Core Web Vitals

### Plan de contenido SEO

1. Blog con artículos sobre ETS y políticas sanitarias
2. Casos de estudio (cuando haya clientes)
3. Publicaciones académicas del equipo
4. Newsletter para instituciones

---

## Archivos Modificados

| Archivo | Tipo de cambio |
|---|---|
| `index.html` | Reescrito: ortografía, SEO, semántica, accesibilidad, Schema.org |
| `equipo.html` | Reescrito: SEO, semántica, accesibilidad, ARIA tabs |
| `servicios.html` | Reescrito: SEO, semántica, accesibilidad, ARIA tabs |
| `css/input.css` | Agregado: skip-link, error-message, success-message, focus-visible, touch targets |
| `vercel.json` | Agregado: headers de seguridad, cache, redirect |
| `robots.txt` | Creado |
| `sitemap.xml` | Creado |
| `site.webmanifest` | Creado |
| `CHECKLIST.md` | Creado |
| `AUDIT-REPORT.md` | Creado |
