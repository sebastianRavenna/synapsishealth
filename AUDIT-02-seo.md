# Auditoría UX/UI y SEO — Synapsis Health
## Parte 02: SEO Técnico (PRIORIDAD CRÍTICA)

**Fecha original:** 2026-02-14
**Última actualización:** 2026-03-27
**Sitio:** https://synapsishealth.vercel.app
**Estado de indexación:** ❌ La página NO aparece en Google, ni siquiera buscando "Synapsis Health"

---

## ⚠️ DIAGNÓSTICO: ¿POR QUÉ LA PÁGINA NO APARECE EN GOOGLE?

### Causas principales identificadas (por orden de impacto):

| # | Causa | Impacto | Estado |
|---|---|---|---|
| 1 | **No se ha registrado en Google Search Console** | CRÍTICO | ❌ Pendiente |
| 2 | **Dominio propio (synapsishealth.com.ar) no apunta al sitio** | CRÍTICO | ❌ El canonical en coming-soon.html y enconstruccion/index.html apunta a `synapsishealth.com.ar` pero el sitio vive en `synapsishealth.vercel.app` |
| 3 | **Sitemap desactualizado y incompleto** | ALTO | ❌ Solo 3 URLs, lastmod de 2025-02-14 |
| 4 | **og:image comentado en todas las páginas** | ALTO | ❌ Sin imagen de preview social |
| 5 | **Imágenes de contenido sin alt text** | ALTO | ❌ 9+ imágenes con `alt=""` |
| 6 | **equipo.html sin canonical, sin OG tags, sin favicon** | ALTO | ❌ Página incompleta para SEO |
| 7 | **Sin hreflang para contenido bilingüe** | MEDIO | ❌ Sitio ES/EN sin señalización |
| 8 | **Sin meta robots explícito en páginas indexables** | BAJO | ❌ Funciona por defecto pero no es explícito |
| 9 | **Inconsistencia de emails en Schema vs HTML** | MEDIO | ❌ Schema dice contacto@synapsishealth.com, HTML dice info@synapsishealth.com.ar |

### Plan de acción inmediato para aparecer en Google:

1. **Registrar en Google Search Console** → Verificar propiedad del dominio
2. **Enviar sitemap.xml actualizado** → Con TODAS las URLs y fechas correctas
3. **Solicitar indexación manual** de las páginas principales
4. **Configurar dominio propio** (synapsishealth.com.ar) con redirección a Vercel
5. **Descomentar og:image** con imagen real de 1200×630px
6. **Agregar alt text** a todas las imágenes de contenido

---

## 3. META TAGS Y SEO ON-PAGE

### 3.1 H1 único en cada página

**Estado:** ✅ CORRECTO

| Página | H1 | Chars |
|---|---|---|
| `index.html` | "Transformamos evidencia en decisiones sanitarias eficientes." | 60 |
| `equipo.html` | "Equipo interdisciplinario" | 25 |
| `servicios.html` | "Análisis y evaluación para decisiones en salud" | 47 |
| `articulos.html` | "Artículos y análisis" | 20 |

Cada página tiene exactamente un `<h1>`. ✅

---

### 3.2 Jerarquía de headings

**Estado:** ✅ CORRECTO (mejorado desde última auditoría)

**index.html:** H1 → H2 → H3 — sin saltos ✅
**equipo.html:** H1 → H2 ✅
**servicios.html:** H1 → H2 → H3 ✅
**articulos.html:** H1 → H2 ✅

---

### 3.3 Meta title en cada página (50-60 chars)

**Estado:** ⚠️ ADVERTENCIA PARCIAL

| Página | Title | Chars | Estado |
|---|---|---|---|
| `index.html` | "Synapsis Health \| Evaluación de Tecnologías Sanitarias" | 57 | ✅ OK |
| `servicios.html` | "Servicios \| Synapsis Health - Evaluación Sanitaria" | 52 | ✅ OK |
| `equipo.html` | "Equipo — Opción F \| Synapsis Health" | 36 | ❌ **PROBLEMA**: contiene "Opción F" que es irrelevante para el usuario |
| `articulos.html` | "Artículos \| Synapsis Health - Publicaciones" | 46 | ✅ OK |
| `articulo.html` | "Artículo \| Synapsis Health" | 28 | ⚠️ Genérico, debería ser dinámico |

**Corrección requerida para equipo.html:**
```html
<!-- ACTUAL -->
<title>Equipo — Opción F | Synapsis Health</title>
<!-- RECOMENDADO -->
<title>Equipo | Synapsis Health - Tecnologías Sanitarias</title>
```

**Impacto:** Alto — "Opción F" en el title confunde a Google y a usuarios.

---

### 3.4 Meta description en cada página (150-160 chars)

**Estado:** ✅ CORRECTO

| Página | Chars | Estado |
|---|---|---|
| `index.html` | 155 | ✅ Dentro del rango |
| `servicios.html` | 131 | ⚠️ Podría ser más largo |
| `equipo.html` | 152 | ✅ OK |
| `articulos.html` | 126 | ⚠️ Podría ser más largo |
| `articulo.html` | 74 | ❌ Muy corto, genérico |

---

### 3.5 Meta keywords

**Estado:** ✅ CORRECTO — Eliminados de todas las páginas (eran obsoletos). ✅

---

### 3.6 Canonical tags

**Estado:** ❌ PROBLEMA

| Página | Canonical | Estado |
|---|---|---|
| `index.html` | `https://synapsishealth.vercel.app/` | ✅ |
| `servicios.html` | `https://synapsishealth.vercel.app/servicios.html` | ✅ |
| `equipo.html` | **AUSENTE** | ❌ **No tiene canonical** |
| `articulos.html` | `https://synapsishealth.vercel.app/articulos.html` | ✅ |
| `articulo.html` | `https://synapsishealth.vercel.app/articulo.html` | ✅ |
| `servicios_0.html` | apunta a `servicios.html` | ✅ (correctamente) |
| `servicios_2.html` | apunta a `servicios.html` | ✅ |
| `servicios_3.html` | apunta a `servicios.html` | ✅ |
| `coming-soon.html` | apunta a `synapsishealth.com.ar` | ⚠️ Dominio diferente |
| `enconstruccion/` | apunta a `synapsishealth.com.ar` | ⚠️ Dominio diferente |

**Problema crítico:** `equipo.html` no tiene tag canonical. Esto puede causar problemas de contenido duplicado.

**Recomendación:**
```html
<!-- Agregar en equipo.html <head> -->
<link rel="canonical" href="https://synapsishealth.vercel.app/equipo.html">
```

**Impacto:** Alto — Canonical ausente = Google podría no indexar correctamente.

---

### 3.7 Meta viewport

**Estado:** ✅ CORRECTO — Todas las páginas tienen `width=device-width, initial-scale=1.0`.

---

### 3.8 Lang attribute en `<html>`

**Estado:** ✅ CORRECTO — `<html lang="es">` en todas las páginas. El i18n.js actualiza dinámicamente al cambiar idioma.

**Problema pendiente:** No hay `hreflang` para indicar la versión en inglés.

**Recomendación:**
```html
<link rel="alternate" hreflang="es" href="https://synapsishealth.vercel.app/">
<link rel="alternate" hreflang="en" href="https://synapsishealth.vercel.app/?lang=en">
<link rel="alternate" hreflang="x-default" href="https://synapsishealth.vercel.app/">
```

**Impacto:** Medio — Google podría no entender que el sitio tiene contenido en dos idiomas.

---

### 3.9 Charset UTF-8

**Estado:** ✅ CORRECTO — `<meta charset="UTF-8">` en todas las páginas.

---

## 4. OPEN GRAPH Y REDES SOCIALES

### 4.1 og:title, og:description, og:image, og:url

**Estado:** ❌ PROBLEMA CRÍTICO (og:image)

| Propiedad | index.html | equipo.html | servicios.html | articulos.html |
|---|---|---|---|---|
| og:type | ✅ website | ❌ **Ausente** | ✅ website | ✅ website |
| og:title | ✅ | ❌ **Ausente** | ✅ | ✅ |
| og:description | ✅ | ❌ **Ausente** | ✅ | ✅ |
| og:url | ✅ | ❌ **Ausente** | ✅ | ✅ |
| og:site_name | ✅ | ❌ **Ausente** | ✅ | ✅ |
| og:locale | ✅ es_AR | ❌ **Ausente** | ✅ es_AR | ✅ es_AR |
| **og:image** | ❌ **Comentado** | ❌ **Ausente** | ❌ **Ausente** | ❌ **Ausente** |

**Hallazgo crítico:**
- `og:image` está **comentado** en index.html (línea 21) y **ausente** en el resto.
- `equipo.html` no tiene **ningún** tag Open Graph.

Sin `og:image`, cuando alguien comparta el sitio en LinkedIn/Facebook/Twitter, no aparecerá imagen preview. Esto reduce significativamente el CTR de las comparticiones sociales.

**Nota:** Existen archivos de OG image en `assets/icons/`:
- `og-image Synapsis (3).png`
- `Copia de Copia de og-image Synapsis.png`

Estos podrían usarse inmediatamente pero tienen nombres de archivo inadecuados.

**Recomendación inmediata:**
1. Renombrar `og-image Synapsis (3).png` a `og-image.png`
2. Verificar que sea 1200×630px
3. Descomentar/agregar en TODAS las páginas:
```html
<meta property="og:image" content="https://synapsishealth.vercel.app/assets/icons/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Synapsis Health - Evaluación de Tecnologías Sanitarias">
```

**Impacto:** CRÍTICO — Fundamental para visibilidad en redes sociales y SEO indirecto.

---

### 4.2 og:type

**Estado:** ✅ CORRECTO en páginas que lo tienen — `website` para páginas, `article` para artículos.

---

### 4.3 Twitter Cards

**Estado:** ❌ PROBLEMA

| Propiedad | index.html | equipo.html | servicios.html |
|---|---|---|---|
| twitter:card | ✅ summary_large_image | ❌ Ausente | ✅ |
| twitter:title | ✅ | ❌ Ausente | ✅ |
| twitter:description | ✅ | ❌ Ausente | ✅ |
| **twitter:image** | ❌ **Comentado** | ❌ Ausente | ❌ Ausente |

**Impacto:** Medio — `summary_large_image` sin imagen funciona como `summary`.

---

### 4.4 Dimensiones og:image y rutas absolutas

**Estado:** ❌ PENDIENTE — No hay imagen OG activa. Archivos candidatos existen en `assets/icons/` pero con nombres inadecuados.

---

## 5. STRUCTURED DATA (Schema.org)

### 5.1 Schema Organization

**Estado:** ✅ CORRECTO (con problemas menores)

`index.html:841-871` implementa JSON-LD Organization con:
- `@id` para referenciabilidad ✅
- `name`, `description`, `url` ✅
- `logo` apunta a `assets/icons/logo-full.png` → ✅ Archivo existe
- `address` con Buenos Aires, CABA, AR ✅
- `areaServed`: Latinoamérica ✅
- `contactPoint` con email y idiomas ✅
- `sameAs` con LinkedIn ✅

**Problema:** Email en Schema (`contacto@synapsishealth.com`) ≠ Email en HTML (`info@synapsishealth.com.ar`). Google podría marcar inconsistencia.

**Recomendación:** Unificar al email real de contacto en ambos lugares.

---

### 5.2 Schema LocalBusiness / ProfessionalService

**Estado:** ⚠️ AUSENTE (recomendado)

No hay Schema ProfessionalService. Para una consultora especializada sería beneficioso:

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Synapsis Health",
  "serviceType": "Health Technology Assessment Consulting",
  "areaServed": "Latin America",
  "provider": { "@id": "https://synapsishealth.vercel.app/#organization" }
}
```

---

### 5.3 Schema ContactPoint

**Estado:** ✅ IMPLEMENTADO en Organization. Falta teléfono (aceptable si no es público).

---

### 5.4 Schema Service/MedicalBusiness

**Estado:** ❌ AUSENTE

No hay Schema para los servicios. Esto sería beneficioso para SEO de servicios específicos.

**Recomendación para `servicios.html`:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Synapsis Health - Servicios",
  "url": "https://synapsishealth.vercel.app/servicios.html",
  "provider": { "@id": "https://synapsishealth.vercel.app/#organization" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Evaluación de Tecnologías Sanitarias",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Evaluación de Tecnologías Sanitarias (ETES)",
          "description": "Proceso multidisciplinario de análisis de tecnologías en salud"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Acceso Gestionado",
          "description": "Diseño de acuerdos de riesgo compartido y modelos de cobertura"
        }
      }
    ]
  }
}
</script>
```

**Impacto:** Medio — Mejoraría aparición en búsquedas de servicios específicos.

---

### 5.5 Formato JSON-LD

**Estado:** ✅ CORRECTO — Usa JSON-LD (preferido sobre microdata). Solo en index.html.

### 5.6 Sintaxis JSON-LD

**Estado:** ✅ CORRECTO — JSON válido, sin errores de sintaxis.

⚠️ **Nota:** No hay JSON-LD en `equipo.html`, `servicios.html`, ni `articulos.html`.

---

## 6. URLs Y ESTRUCTURA

### 6.1 Estructura de URLs

**Estado:** ✅ CORRECTO

URLs descriptivas, lowercase. El `.html` es aceptable para sitios estáticos.

⚠️ Idealmente serían `/equipo/` y `/servicios/` (sin extensión) mediante rewrite en Vercel.

---

### 6.2 URLs con parámetros innecesarios

**Estado:** ✅ CORRECTO — No hay parámetros de URL. `robots.txt` bloquea `/*?*`.

---

### 6.3 Trailing slashes consistentes

**Estado:** ✅ CORRECTO

---

### 6.4 Enlaces internos (absolutos vs relativos)

**Estado:** ✅ CORRECTO — Todos usan rutas relativas consistentes.

---

### 6.5 Links con title apropiado

**Estado:** ⚠️ ADVERTENCIA — Ningún enlace tiene `title`. Impacto marginal.

---

### 6.6 Enlaces rotos o href="#"

**Estado:** ✅ CORRECTO — No hay `href="#"` vacíos. Todos los anchors apuntan a IDs válidos.

---

### 6.7 Links externos con rel="noopener"

**Estado:** ✅ CORRECTO — Todos los links externos (WhatsApp) tienen `rel="noopener noreferrer"` y `target="_blank"`.

---

## 7. IMÁGENES SEO

### 7.1 Alt text descriptivo

**Estado:** ❌ PROBLEMA CRÍTICO

**Imágenes de contenido con `alt=""` vacío:**

| Archivo | Imagen | alt actual | alt recomendado |
|---|---|---|---|
| `index.html:213` | quienes_somos.webp | `""` | "Equipo de Synapsis Health en sesión estratégica de evaluación sanitaria" |
| `index.html:447` | diferencial.webp | `""` | "Enfoque diferencial de Synapsis Health en tecnologías sanitarias" |
| `index.html:508` | academico.webp | `""` | "Producción académica y formación en evaluación de tecnologías sanitarias" |
| `index.html:163` | logo-full.png (decorativo) | `""` | Aceptable (es decorativo, pero falta `aria-hidden="true"`) |
| `servicios.html:398` | decisiones.webp | `""` | "Evaluación estratégica para decisiones en salud" |
| `servicios.html:437` | etes.webp | `""` | "Evaluación de Tecnologías Sanitarias ETES" |
| `servicios.html:470` | eval_economicas.webp | `""` | "Evaluaciones económicas en salud" |
| `servicios.html:500` | analisis_datos.webp | `""` | "Análisis de datos en salud y economía sanitaria" |
| `servicios.html:534` | pol_sanitarias.webp | `""` | "Políticas sanitarias y gobernanza en salud" |
| `servicios.html:568` | educacion.webp | `""` | "Capacitación y formación en tecnologías sanitarias" |

**Nota:** Las imágenes de logo con `alt=""` + `aria-hidden="true"` son correctas (decorativas). ✅

**Impacto:** CRÍTICO — Google usa alt text para entender el contenido de las imágenes. Imágenes sin alt text son invisibles para SEO y accesibilidad.

---

### 7.2 Nombres de archivo descriptivos

**Estado:** ⚠️ MIXTO

| Archivo | Estado |
|---|---|
| `quienes_somos.webp` | ✅ Descriptivo |
| `diferencial.webp` | ✅ Descriptivo |
| `academico.webp` | ✅ Descriptivo |
| `etes.webp` | ✅ Descriptivo |
| `eval_economicas.webp` | ✅ Descriptivo |
| `analisis_datos.webp` | ✅ Descriptivo |
| `pol_sanitarias.webp` | ✅ Descriptivo |
| `educacion.webp` | ✅ Descriptivo |
| `equipo-bg.jpg` | ✅ Descriptivo |
| `Diseño sin título (6).jpg` | ❌ Nombre genérico con espacios |
| `og-image Synapsis (3).png` | ❌ Nombre genérico con espacios y paréntesis |
| `Logo 1 off.png` | ❌ Nombre con espacios |

**Impacto:** Bajo — Los nombres de archivo afectan marginalmente al SEO de imágenes.

---

### 7.3 figcaption donde sea apropiado

**Estado:** ⚠️ AUSENTE — Ninguna imagen usa `<figure>/<figcaption>`. Recomendado para imágenes principales.

---

## 8. ROBOTS Y CRAWLABILITY

### 8.1 robots.txt

**Estado:** ✅ CORRECTO

```
User-agent: *
Allow: /
Disallow: /private/
Disallow: /*.json$
Disallow: /*?*
Sitemap: https://synapsishealth.vercel.app/sitemap.xml
```

---

### 8.2 Meta robots

**Estado:** ⚠️ ADVERTENCIA

- Páginas principales (index, equipo, servicios, articulos): **Sin meta robots** → por defecto `index, follow` (OK)
- `coming-soon.html`: `noindex, nofollow` ✅
- `enconstruccion/index.html`: `noindex, nofollow` ✅

**Recomendación:** Agregar explícitamente en páginas indexables:
```html
<meta name="robots" content="index, follow">
```

---

### 8.3 sitemap.xml

**Estado:** ❌ PROBLEMA CRÍTICO

**Problemas:**
1. **Solo 3 URLs** — Faltan: `articulos.html`, `articulo.html`
2. **lastmod desactualizado**: `2025-02-14` (más de 1 año atrás)
3. **Páginas dinámicas no incluidas** (equipo_0-5.html, servicios_0-3.html) — aunque las que tienen canonical a otra página no deberían estar

**Sitemap actual:**
```xml
<url><loc>https://synapsishealth.vercel.app/</loc><lastmod>2025-02-14</lastmod></url>
<url><loc>https://synapsishealth.vercel.app/equipo.html</loc><lastmod>2025-02-14</lastmod></url>
<url><loc>https://synapsishealth.vercel.app/servicios.html</loc><lastmod>2025-02-14</lastmod></url>
```

**Sitemap recomendado:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://synapsishealth.vercel.app/</loc>
    <lastmod>2026-03-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://synapsishealth.vercel.app/equipo.html</loc>
    <lastmod>2026-03-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://synapsishealth.vercel.app/servicios.html</loc>
    <lastmod>2026-03-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://synapsishealth.vercel.app/articulos.html</loc>
    <lastmod>2026-03-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

**Impacto:** CRÍTICO — Un sitemap desactualizado/incompleto dificulta el rastreo de Google.

---

### 8.4 Contenido duplicado

**Estado:** ⚠️ ADVERTENCIA

- Las páginas `servicios_0.html`, `servicios_2.html`, `servicios_3.html` tienen canonical correcto hacia `servicios.html` ✅
- Las páginas `equipo_0.html` a `equipo_5.html` **NO tienen canonical** → ❌ Potencial contenido duplicado
- `articulo.html` tiene canonical genérico sin ser dinámico ⚠️

---

## 9. PROBLEMAS ESPECÍFICOS DE equipo.html

**Estado:** ❌ MÚLTIPLES PROBLEMAS

`equipo.html` es la página con más problemas SEO:

| Problema | Estado |
|---|---|
| Title contiene "Opción F" (irrelevante) | ❌ |
| Sin canonical tag | ❌ |
| Sin Open Graph tags (ninguno) | ❌ |
| Sin Twitter Card tags | ❌ |
| Sin favicon tags | ❌ |
| Sin dns-prefetch | ❌ |
| Carga TODOS los pesos de Google Fonts (no optimizado como index.html) | ⚠️ |
| Sin theme-color meta | ❌ |
| Sin manifest link | ❌ |
| Background image de 1.2MB sin optimizar | ⚠️ |

**Recomendación:** Alinear el `<head>` de equipo.html con el de index.html.

---

## RESUMEN SEO TÉCNICO (actualizado 2026-03-27)

| Ítem | Estado anterior (02/14) | Estado actual (03/27) | Impacto |
|---|---|---|---|
| H1 único por página | ✅ | ✅ | — |
| Jerarquía headings | ⚠️ | ✅ Corregido | — |
| Meta titles | ⚠️ >60 chars | ✅ Corregido (excepto equipo.html) | Alto |
| Meta descriptions | ⚠️ index >160 | ✅ Corregido | — |
| Meta keywords (obsoleto) | ❌ Presente | ✅ Eliminados | — |
| Canonical tags | ✅ | ❌ Falta en equipo.html | Alto |
| Viewport | ✅ | ✅ | — |
| Lang attribute | ✅ | ✅ (falta hreflang) | Medio |
| Charset | ✅ | ✅ | — |
| og:image | ❌ Comentado | ❌ **Sigue comentado** | CRÍTICO |
| twitter:image | ❌ Comentado | ❌ **Sigue comentado** | Medio |
| equipo.html OG/Twitter | — (no reportado) | ❌ **Totalmente ausente** | Alto |
| Schema Organization | ✅ (logo roto) | ✅ Logo corregido (email inconsistente) | Medio |
| Schema Services | ❌ Ausente | ❌ **Sigue ausente** | Medio |
| JSON-LD en subpáginas | ❌ Ausente | ❌ **Sigue ausente** | Medio |
| URLs estructura | ✅ | ✅ | — |
| Links rotos | ✅ | ✅ | — |
| robots.txt | ✅ | ✅ | — |
| sitemap.xml | ✅ | ❌ **Desactualizado e incompleto** | CRÍTICO |
| Alt text en imágenes | ⚠️ Pendiente | ❌ **Imágenes reales sin alt** | CRÍTICO |
| Google Search Console | — | ❌ **No registrado** | CRÍTICO |
| hreflang bilingüe | — | ❌ **Ausente** | Medio |

**Errores Críticos:** 6 (og:image, sitemap, alt text, equipo.html incompleto, Search Console, canonical faltante)
**Advertencias:** 5
**Correctos:** 10
**Corregidos desde última auditoría:** 4 (titles, descriptions, keywords eliminados, logo Schema)
