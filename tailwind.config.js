/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#111111",
          900: "#1A1A1A",
          800: "#2D2D2D",
          700: "#3D3D3D",
          600: "#4A4A4A",
          500: "#5C5C5C",
          400: "#7A7A7A",
          300: "#9A9A9A",
          200: "#BCBCBC",
          100: "#E0E0E0",
          50:  "#F2F2F2",
        },
      },
      fontFamily: {
        /* CANELA: fuente del logotipo (licencia requerida).
           Fallback: "Playfair Display" o "Cormorant Garamond" hasta tener la licencia.
           Cuando se adquiera, cargar el @font-face en input.css y descomentar. */
        // logo: ['"Canela"', '"Playfair Display"', 'serif'],
        logo: ['"Playfair Display"', 'serif'],    // ← fallback temporal
        heading: ['"Jost"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      fontSize: {
        "display-xl": ["3.5rem",  { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display":    ["2.75rem", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        "display-sm": ["2rem",    { lineHeight: "1.2",  letterSpacing: "-0.005em" }],
        "title":      ["1.5rem",  { lineHeight: "1.25", letterSpacing: "0.01em" }],
        "subtitle":   ["1.125rem",{ lineHeight: "1.5" }],
        "label":      ["0.6875rem",{ lineHeight: "1", letterSpacing: "0.15em" }],
      },
      maxWidth: {
        site: "1200px",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
