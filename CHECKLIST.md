# Checklist Final Pre-Launch — Synapsis Health

## SEO
- [x] Todas las páginas tienen title único y optimizado
- [x] Todas las páginas tienen meta description
- [x] robots.txt creado y accesible
- [x] sitemap.xml creado
- [ ] sitemap.xml enviado a Google Search Console
- [x] Schema.org implementado (Organization en index.html)
- [x] Open Graph tags completos en todas las páginas
- [x] Twitter Card tags en todas las páginas
- [x] Canonical tags en todas las páginas
- [x] Keywords meta en todas las páginas
- [x] URLs limpias y semánticas

## Accesibilidad
- [x] Navegación por teclado funcional
- [x] Skip links implementados en todas las páginas
- [x] Labels en formularios correctamente asociados
- [x] ARIA attributes en navegación, tabs, formularios
- [x] Foco visible en elementos interactivos (focus-visible)
- [x] aria-current="page" en navegación activa
- [x] role="tablist", role="tab", role="tabpanel" en componentes
- [x] role="dialog" en menú mobile
- [x] aria-hidden="true" en SVGs decorativos
- [x] aria-label en botones de icono
- [x] Touch targets mínimos 44px en mobile

## Performance
- [ ] PageSpeed ≥90 en mobile
- [ ] PageSpeed ≥90 en desktop
- [x] CSS minificado (Tailwind --minify en build)
- [ ] Imágenes optimizadas (pendiente: sin imágenes aún)
- [x] Lazy loading preparado en estructura HTML
- [x] Headers de cache configurados en vercel.json
- [x] Preconnect a Google Fonts
- [x] font-display: swap en fuentes custom

## Seguridad
- [x] X-Content-Type-Options: nosniff
- [x] X-Frame-Options: DENY
- [x] X-XSS-Protection habilitado
- [x] Referrer-Policy: strict-origin-when-cross-origin
- [x] Permissions-Policy restrictivo
- [x] HTML entities para caracteres especiales

## UX/UI
- [x] Responsive en todos los breakpoints
- [x] Touch targets ≥44px en mobile
- [x] Estados hover/focus/active en botones
- [x] Formulario con validación funcional
- [x] CTAs claros y visibles
- [x] Jerarquía visual clara
- [x] Escala tipográfica consistente

## Contenido
- [x] Sin errores ortográficos (tildes corregidas)
- [x] Todos los acentos y tildes correctos en HTML
- [x] Tildes correctas en sistema i18n (ES y EN)
- [x] Jerarquía de headings correcta (un H1 por página)
- [x] Enlaces internos funcionando
- [x] Email de contacto presente y válido

## Archivos de configuración
- [x] vercel.json con headers de seguridad y cache
- [x] robots.txt
- [x] sitemap.xml
- [x] site.webmanifest
- [x] .gitignore actualizado

## Pendientes (requieren recursos externos)
- [ ] Imágenes del equipo (400x400px)
- [ ] Hero image (desktop/tablet/mobile)
- [ ] Imágenes de secciones (institucional, diferencial, académica)
- [ ] Imágenes de servicios (6 servicios)
- [ ] OG Image (1200x630px)
- [ ] Twitter Card image (1200x600px)
- [ ] Favicon set (ico, 16x16, 32x32, apple-touch-icon)
- [ ] Isotipo SVG definitivo
- [ ] Licencia de fuente Canela
- [ ] Configuración de backend (SMTP para formulario)
- [ ] Google Search Console setup
- [ ] Google Analytics 4 implementación

## Testing cross-browser
- [ ] Chrome (última versión)
- [ ] Firefox (última versión)
- [ ] Safari desktop
- [ ] Safari mobile (iOS)
- [ ] Chrome mobile (Android)
- [ ] Edge (última versión)
