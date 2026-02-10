# Synapsis Health — Website

Sitio web institucional para **Synapsis Health**, consultora especializada en evaluación de tecnologías sanitarias (ETES), análisis estructurado y apoyo a la toma de decisiones en salud.

## Stack técnico

| Capa       | Tecnología                        |
|------------|-----------------------------------|
| Frontend   | HTML5 + Tailwind CSS v3 + Vanilla JS |
| Backend    | Node.js + Express (solo formulario)  |
| Build tool | Tailwind CLI                      |
| Fonts      | Canela (logo, licencia requerida) + Jost (headings) + DM Sans (body) |
| Deploy     | Hosting estático + backend separado  |

## Estructura

```
synapsis-health/
├── src/
│   ├── index.html              # Landing principal
│   ├── servicios.html          # Servicios con sidebar navegable
│   ├── equipo.html             # Equipo con bios expandibles
│   ├── css/
│   │   └── input.css           # Tailwind directives + custom components
│   ├── js/
│   │   └── main.js             # Menu, scroll, tabs, form handler
│   └── assets/
│       ├── img/                # Fotos (provee el cliente)
│       └── icons/              # Isotipo SVG + favicons
├── public/
│   └── styles.css              # Output de Tailwind (generado)
├── backend/
│   ├── server.js               # Express: POST /api/contact
│   └── package.json
├── tailwind.config.js
├── package.json
└── README.md
```

## Setup

```bash
# 1. Instalar dependencias del frontend
npm install

# 2. Dev mode (watch de Tailwind)
npm run dev

# 3. Build para producción
npm run build

# 4. Backend (otra terminal)
cd backend
npm install
npm start
```

## Notas importantes para el desarrollador

### Tipografía del logo
La marca usa **Canela** (serif de alto contraste). Es una fuente de pago.
- Licencia web: https://commercialtype.com/catalog/canela
- Si no se adquiere, usar **Playfair Display** o **Cormorant Garamond** como fallback temporal.
- En el código está marcado con `font-logo` y comentarios `/* CANELA */`.

### Imágenes
Todos los placeholders están marcados con `<!-- IMG: descripción -->`.
El cliente debe proveer fotos de equipo y contextuales.

### Isotipo SVG
El isotipo está inline en el HTML para poder controlarlo con CSS.
Reemplazar el placeholder con el SVG definitivo del logo elegido.

### Formulario
POST a `/api/contact` con JSON: `{ nombre, email, organizacion, mensaje }`.
El backend envía email via SMTP (configurar .env).

### Paleta

| Token         | Hex       | Uso                        |
|---------------|-----------|----------------------------|
| graphite-950  | #111111   | Énfasis máximo             |
| graphite-900  | #1A1A1A   | Fondos oscuros             |
| graphite-800  | #2D2D2D   | Texto principal            |
| graphite-700  | #3D3D3D   | Texto secundario           |
| graphite-600  | #4A4A4A   | Subtítulos                 |
| graphite-500  | #5C5C5C   | Body text                  |
| graphite-400  | #7A7A7A   | Texto muted                |
| graphite-300  | #9A9A9A   | Labels, captions           |
| graphite-200  | #BCBCBC   | Bordes                     |
| graphite-100  | #E0E0E0   | Separadores                |
| graphite-50   | #F2F2F2   | Fondos alternativos        |
