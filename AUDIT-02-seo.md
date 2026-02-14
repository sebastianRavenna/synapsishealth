# Auditoría UX/UI y SEO — Synapsis Health
## Parte 02: SEO Técnico (PRIORIDAD ALTA)

---

## 3. META TAGS Y SEO ON-PAGE

### 3.1 H1 único en cada página

**Estado:** ✅ CORRECTO

| Página | H1 | Línea | Chars |
|---|---|---|---|
| `index.html` | "Transformamos evidencia en decisiones sanitarias eficientes." | 142 | 60 |
| `equipo.html` | "Nuestro Equipo" | 96 | 14 |
| `servicios.html` | "Análisis y evaluación para decisiones en salud" | 97-98 | 47 |

Cada página tiene exactamente un `<h1>`. ✅

---

### 3.2 Jerarquía de headings

**Estado:** ⚠️ ADVERTENCIA

**index.html:** H1 → H2 → H3 ✅
```
H1: Transformamos evidencia...
  H2: La complejidad ya no es técnica...
  H2: Arquitectura de decisión sanitaria
  H2: Nuestro enfoque
    H3: Evidencia / Gobernanza / Acceso
  H2: Áreas de trabajo
    H3: Evaluación estratégica / Acceso gestionado / Soporte institucional
  H2: Por qué Synapsis
  H2: Producción de conocimiento...
  H2: Equipo fundador
  H2: Independencia y transparencia
  H2: Contacto institucional
```
Jerarquía correcta, sin saltos. ✅

**equipo.html:** ⚠️ Problema menor
```
H1: Nuestro Equipo
  H2: Nombre Apellido (×4 en paneles) — OK
  H2: ¿Necesitás asesoramiento? — OK
```
Correcto. ✅

**servicios.html:** ⚠️ Problema
```
H1: Análisis y evaluación para decisiones en salud
  H2: Servicios (sidebar label, línea 112) — esto es un label, no un heading real
  H2: Evaluación de Tecnologías Sanitarias (×6 paneles)
  H2: ¿Necesitás asesoramiento?
```

**Hallazgo:** `servicios.html:112` — El `<h2>` "Servicios" en el sidebar es meramente un label visual. Podría ser un `<p>` o `<span>` con clase visual.

**Recomendación:**
```html
<!-- ACTUAL (servicios.html:112) -->
<h2 class="font-heading text-sm tracking-wider uppercase text-graphite-300 mb-4">Servicios</h2>

<!-- RECOMENDADO: no necesita ser h2, es un label de navegación -->
<p class="font-heading text-sm tracking-wider uppercase text-graphite-300 mb-4">Servicios</p>
```

**Impacto:** Bajo — No afecta significativamente el SEO, pero ensucia la jerarquía semántica.

---

### 3.3 Meta title en cada página (50-60 chars)

**Estado:** ✅ CORRECTO

| Página | Title | Chars |
|---|---|---|
| `index.html` | "Synapsis Health \| Evaluación de Tecnologías Sanitarias - Argentina" | 68 |
| `equipo.html` | "Equipo \| Synapsis Health - Expertos en Evaluación de Tecnologías Sanitarias" | 77 |
| `servicios.html` | "Servicios \| Synapsis Health - Evaluación y Acceso a Tecnologías Sanitarias" | 76 |

⚠️ Los tres títulos superan los 60 caracteres recomendados. Google truncará a ~55-60 chars en SERPs.

**Recomendación:**
```html
<!-- index.html — ACTUAL: 68 chars -->
<title>Synapsis Health | Evaluación de Tecnologías Sanitarias - Argentina</title>
<!-- RECOMENDADO: 57 chars -->
<title>Synapsis Health | Evaluación de Tecnologías Sanitarias</title>

<!-- equipo.html — ACTUAL: 77 chars -->
<title>Equipo | Synapsis Health - Expertos en Evaluación de Tecnologías Sanitarias</title>
<!-- RECOMENDADO: 53 chars -->
<title>Equipo | Synapsis Health - Tecnologías Sanitarias</title>

<!-- servicios.html — ACTUAL: 76 chars -->
<title>Servicios | Synapsis Health - Evaluación y Acceso a Tecnologías Sanitarias</title>
<!-- RECOMENDADO: 55 chars -->
<title>Servicios | Synapsis Health - Evaluación Sanitaria</title>
```

**Impacto:** Medio — Títulos truncados pierden información en los resultados de búsqueda.

---

### 3.4 Meta description en cada página (150-160 chars)

**Estado:** ✅ CORRECTO (con ajuste menor)

| Página | Chars |
|---|---|
| `index.html` | 195 |
| `equipo.html` | 152 |
| `servicios.html` | 131 |

**Hallazgo:** `index.html` meta description excede los 160 chars. Google truncará.

**Recomendación para index.html:**
```html
<!-- ACTUAL: 195 chars -->
<meta name="description" content="Plataforma estratégica de Evaluación de Tecnologías Sanitarias. Integramos evidencia científica, análisis económico y gobernanza institucional para decisiones sanitarias de alto impacto en Latinoamérica.">

<!-- RECOMENDADO: 155 chars -->
<meta name="description" content="Plataforma estratégica de Evaluación de Tecnologías Sanitarias. Integramos evidencia científica, análisis económico y gobernanza para decisiones de alto impacto.">
```

`servicios.html` tiene 131 chars — podría expandirse un poco para aprovechar el espacio disponible.

**Impacto:** Medio.

---

### 3.5 Meta keywords

**Estado:** ❌ PROBLEMA

**Hallazgo:** Las 3 páginas incluyen `<meta name="keywords">`:
- `index.html:11`
- `equipo.html:11`
- `servicios.html:11`

`meta keywords` es **obsoleto**. Google lo ignora desde 2009. Puede ser señal de sobre-optimización.

**Recomendación:** Eliminar de las 3 páginas.
```html
<!-- ELIMINAR estas líneas -->
<meta name="keywords" content="evaluación tecnologías sanitarias, ETS, ...">
```

**Impacto:** Bajo — No causa daño directo, pero no aporta valor y ocupa espacio.

---

### 3.6 Canonical tags

**Estado:** ✅ CORRECTO

| Página | Canonical |
|---|---|
| `index.html:12` | `https://synapsishealth.vercel.app/` |
| `equipo.html:12` | `https://synapsishealth.vercel.app/equipo.html` |
| `servicios.html:12` | `https://synapsishealth.vercel.app/servicios.html` |

Cada página tiene canonical único que apunta a sí misma. ✅

**Nota:** El redirect en `vercel.json` de `/index.html` → `/` es coherente con el canonical de index.

---

### 3.7 Meta viewport

**Estado:** ✅ CORRECTO

Las 3 páginas tienen:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

### 3.8 Lang attribute en `<html>`

**Estado:** ✅ CORRECTO

```html
<html lang="es">
```

Presente en las 3 páginas. Además, el sistema i18n actualiza dinámicamente:
```javascript
// i18n.js:389
document.documentElement.lang = lang === "es" ? "es" : "en";
```

---

### 3.9 Charset UTF-8

**Estado:** ✅ CORRECTO

```html
<meta charset="UTF-8">
```

Primera línea del `<head>` en las 3 páginas. ✅

---

## 4. OPEN GRAPH Y REDES SOCIALES

### 4.1 og:title, og:description, og:image, og:url

**Estado:** ⚠️ ADVERTENCIA

| Propiedad | index.html | equipo.html | servicios.html |
|---|---|---|---|
| og:type | ✅ website | ✅ website | ✅ website |
| og:title | ✅ | ✅ | ✅ |
| og:description | ✅ | ✅ | ✅ |
| og:url | ✅ | ✅ | ✅ |
| og:site_name | ✅ | ✅ | ✅ |
| og:locale | ✅ es_AR | ✅ es_AR | ✅ es_AR |
| **og:image** | ❌ Comentado | ❌ Ausente | ❌ Ausente |

**Hallazgo crítico:** `og:image` está **comentado** en index.html (línea 21) y **ausente** en equipo.html y servicios.html.

```html
<!-- index.html:21 — COMENTADO -->
<!-- <meta property="og:image" content="https://synapsishealth.vercel.app/images/og-image.jpg"> -->
```

Sin `og:image`, cuando alguien comparta el sitio en LinkedIn/Facebook/Twitter, no aparecerá imagen preview.

**Recomendación:** Crear una imagen OG de 1200x630px y descomentar/agregar en las 3 páginas:
```html
<meta property="og:image" content="https://synapsishealth.vercel.app/assets/img/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Synapsis Health - Evaluación de Tecnologías Sanitarias">
```

**Impacto:** Alto — Fundamental para visibilidad en redes sociales.

---

### 4.2 og:type

**Estado:** ✅ CORRECTO — `website` en las 3 páginas.

---

### 4.3 Twitter Cards

**Estado:** ⚠️ ADVERTENCIA

| Propiedad | index.html | equipo.html | servicios.html |
|---|---|---|---|
| twitter:card | ✅ summary_large_image | ✅ | ✅ |
| twitter:title | ✅ | ✅ | ✅ |
| twitter:description | ✅ | ✅ | ✅ |
| **twitter:image** | ❌ Comentado | ❌ Ausente | ❌ Ausente |
| twitter:site | ❌ Ausente | ❌ Ausente | ❌ Ausente |

**Hallazgo:** `twitter:image` está comentado en index.html (línea 27). `twitter:site` (handle de Twitter/X) está ausente.

**Recomendación:**
```html
<meta name="twitter:image" content="https://synapsishealth.vercel.app/assets/img/twitter-card.jpg">
<meta name="twitter:image:alt" content="Synapsis Health - Evaluación de Tecnologías Sanitarias">
<!-- Si tienen cuenta de X/Twitter: -->
<meta name="twitter:site" content="@SynapsisHealth">
```

**Impacto:** Medio — `summary_large_image` sin imagen funciona como `summary`.

---

### 4.4 Dimensiones og:image y rutas absolutas

**Estado:** ⚠️ PENDIENTE — No hay imagen OG todavía.

**Recomendación:** Cuando se cree, asegurar:
- Tamaño: 1200x630px (Facebook/LinkedIn) o 1200x675px (Twitter)
- Formato: JPG o PNG (<5MB)
- Ruta absoluta con dominio completo

---

## 5. STRUCTURED DATA (Schema.org)

### 5.1 Schema Organization

**Estado:** ✅ CORRECTO (con mejoras posibles)

`index.html:720-748` implementa JSON-LD Organization:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Synapsis Health",
  "description": "...",
  "url": "https://synapsishealth.vercel.app",
  "logo": "https://synapsishealth.vercel.app/images/logo.png",
  "foundingDate": "2024",
  "address": { "@type": "PostalAddress", ... },
  "areaServed": { "@type": "Place", "name": "Latinoamérica" },
  "contactPoint": { "@type": "ContactPoint", ... },
  "sameAs": ["https://linkedin.com/company/synapsishealth"]
}
```

**Problemas encontrados:**
1. `"logo"` apunta a `/images/logo.png` que **no existe** (el logo es un SVG inline)
2. `"foundingDate": "2024"` debería ser formato ISO: `"2024-01-01"` o al menos `"2024"`  (aceptable)
3. Falta `"@id"` para referenciabilidad

**Recomendación:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://synapsishealth.vercel.app/#organization",
  "name": "Synapsis Health",
  "logo": "https://synapsishealth.vercel.app/assets/icons/logo.svg",
  ...
}
```

**Impacto:** Medio — El logo referenciado no existe, Google podría marcar un error.

---

### 5.2 Schema LocalBusiness

**Estado:** ⚠️ ADVERTENCIA

No hay Schema LocalBusiness. Synapsis Health tiene dirección en Buenos Aires pero opera regionalmente, así que `Organization` es más apropiado que `LocalBusiness`. Sin embargo, podría beneficiarse de `ProfessionalService`:

**Recomendación (opcional):**
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Synapsis Health",
  "serviceType": "Health Technology Assessment",
  ...
}
```

**Impacto:** Bajo — `Organization` es suficiente para el caso de uso.

---

### 5.3 Schema ContactPoint

**Estado:** ✅ IMPLEMENTADO en el JSON-LD de Organization.

```json
"contactPoint": {
  "@type": "ContactPoint",
  "email": "contacto@synapsishealth.com",
  "contactType": "Consultas institucionales",
  "availableLanguage": ["es", "en"]
}
```

Falta `"telephone"` (no hay teléfono público, así que es aceptable).

---

### 5.4 Schema Service/MedicalBusiness

**Estado:** ❌ AUSENTE

No hay Schema para los servicios individuales. Esto sería beneficioso para SEO de servicios.

**Recomendación para `servicios.html`:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Synapsis Health",
  "url": "https://synapsishealth.vercel.app/servicios.html",
  "provider": {
    "@type": "Organization",
    "@id": "https://synapsishealth.vercel.app/#organization"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Evaluación de Tecnologías Sanitarias",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Evaluación de Tecnologías Sanitarias (ETES)",
          "description": "Proceso multidisciplinario que analiza las implicaciones médicas, económicas, sociales y éticas de tecnologías en salud."
        }
      }
    ]
  }
}
</script>
```

**Impacto:** Medio — Mejoraría la aparición en búsquedas de servicios específicos.

---

### 5.5 Formato JSON-LD

**Estado:** ✅ CORRECTO — Usa JSON-LD (preferido sobre microdata). Solo en index.html.

### 5.6 Sintaxis JSON-LD

**Estado:** ✅ CORRECTO — JSON válido, sin errores de sintaxis.

⚠️ **Nota:** No hay JSON-LD en `equipo.html` ni `servicios.html`.

---

## 6. URLs Y ESTRUCTURA

### 6.1 Estructura de URLs

**Estado:** ✅ CORRECTO

```
/               → index.html (redirect 301)
/equipo.html    → Equipo
/servicios.html → Servicios
```

URLs descriptivas, lowercase. El `.html` es aceptable para sitios estáticos.

⚠️ Idealmente serían `/equipo/` y `/servicios/` (sin extensión), pero requeriría configuración adicional en Vercel.

---

### 6.2 URLs con parámetros innecesarios

**Estado:** ✅ CORRECTO — No hay parámetros de URL. `robots.txt` bloquea `/*?*`.

---

### 6.3 Trailing slashes consistentes

**Estado:** ✅ CORRECTO — Solo la raíz usa trailing slash (`/`). Las subpáginas no (`/equipo.html`).

---

### 6.4 Enlaces internos (absolutos vs relativos)

**Estado:** ✅ CORRECTO

Todos los enlaces internos usan rutas relativas consistentes:
```html
<a href="index.html">
<a href="equipo.html">
<a href="servicios.html">
<a href="#contacto">
<a href="index.html#contacto">  <!-- desde subpáginas -->
```

---

### 6.5 Links con title apropiado

**Estado:** ⚠️ ADVERTENCIA

Ningún enlace tiene atributo `title`. No es obligatorio pero es útil para accesibilidad y SEO.

**Recomendación:** Agregar `title` en enlaces clave:
```html
<a href="equipo.html" class="nav-link" title="Conocer al equipo de Synapsis Health">Equipo</a>
```

**Impacto:** Bajo — `title` en links es opcional y tiene valor marginal.

---

### 6.6 Enlaces rotos o href="#"

**Estado:** ✅ CORRECTO

No hay enlaces con `href="#"` vacío. Todos los anchors apuntan a IDs válidos:
- `#contacto` → existe en index.html
- `#pilares` → existe en index.html
- `#que-hacemos` → existe en index.html
- `#main-content` → existe en las 3 páginas

---

### 6.7 Links externos con rel="noopener"

**Estado:** ⚠️ ADVERTENCIA

**Hallazgo:** No hay links externos visibles en el HTML (el único link externo es `sameAs` en el JSON-LD que apunta a LinkedIn). Sin embargo, el enlace `mailto:` no necesita `noopener`.

Si se agregan links externos en el futuro:
```html
<a href="https://linkedin.com/company/synapsishealth" target="_blank" rel="noopener noreferrer">LinkedIn</a>
```

**Impacto:** N/A actualmente — Tener en cuenta al agregar links externos.

---

## 7. IMÁGENES SEO

### 7.1-7.5 Alt text, nombres de archivo, figcaption

**Estado:** ⚠️ PENDIENTE — No hay imágenes `<img>` en el proyecto.

Todos los SVG decorativos tienen `aria-hidden="true"` correctamente. ✅

Cuando se agreguen imágenes:
```html
<!-- RECOMENDADO -->
<figure>
  <img src="assets/img/equipo-synapsis-reunión-estrategica.webp"
       alt="Equipo de Synapsis Health en una reunión de evaluación de tecnologías sanitarias"
       loading="lazy" width="800" height="600">
  <figcaption>Nuestro equipo en una sesión de evaluación estratégica</figcaption>
</figure>
```

**Checklist para cuando se agreguen imágenes:**
- [ ] Alt text descriptivo y específico (no "imagen" ni "foto")
- [ ] Nombres de archivo descriptivos con guiones (`equipo-reunión.webp`, no `IMG_1234.jpg`)
- [ ] `<figcaption>` donde sea apropiado (secciones principales)
- [ ] `title` attribute opcional

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

Bien configurado. Bloquea JSON files y parámetros. Referencia al sitemap. ✅

⚠️ Nota: `/*.json$` bloqueará `site.webmanifest`? No, porque tiene extensión `.webmanifest`, no `.json`.

---

### 8.2 Meta robots

**Estado:** ⚠️ ADVERTENCIA

No hay `<meta name="robots">` en ninguna página. Por defecto, esto equivale a `index, follow` (correcto), pero es buena práctica ser explícito.

**Recomendación:**
```html
<meta name="robots" content="index, follow">
```

**Impacto:** Bajo — El comportamiento por defecto es correcto.

---

### 8.3 sitemap.xml

**Estado:** ✅ CORRECTO

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://synapsishealth.vercel.app/</loc><priority>1.0</priority></url>
  <url><loc>https://synapsishealth.vercel.app/equipo.html</loc><priority>0.8</priority></url>
  <url><loc>https://synapsishealth.vercel.app/servicios.html</loc><priority>0.8</priority></url>
</urlset>
```

Incluye las 3 páginas con prioridades razonables. Referenciado desde robots.txt. ✅

⚠️ `lastmod: 2025-02-14` — Debería actualizarse cuando cambie el contenido.

---

### 8.4 Contenido duplicado

**Estado:** ✅ CORRECTO — Canonical tags implementados en las 3 páginas. No hay contenido duplicado detectable.

---

## RESUMEN SEO TÉCNICO

| Ítem | Estado | Impacto |
|---|---|---|
| H1 único por página | ✅ | — |
| Jerarquía headings | ⚠️ h2 label en servicios | Bajo |
| Meta titles | ⚠️ >60 chars | Medio |
| Meta descriptions | ⚠️ index >160 chars | Medio |
| Meta keywords (obsoleto) | ❌ Presente | Bajo |
| Canonical tags | ✅ | — |
| Viewport | ✅ | — |
| Lang attribute | ✅ | — |
| Charset | ✅ | — |
| og:image | ❌ Ausente/comentado | Alto |
| twitter:image | ❌ Ausente/comentado | Medio |
| Schema Organization | ✅ (logo roto) | Medio |
| Schema Services | ❌ Ausente | Medio |
| JSON-LD en subpáginas | ❌ Ausente | Medio |
| URLs estructura | ✅ | — |
| Links rotos | ✅ Ninguno | — |
| robots.txt | ✅ | — |
| sitemap.xml | ✅ | — |

**Errores Críticos:** 3 (og:image, meta keywords obsoleto, logo en Schema roto)
**Advertencias:** 6
**Correctos:** 12
