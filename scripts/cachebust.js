/**
 * cachebust.js — Agrega ?v=<hash> a las referencias de CSS, JS e imágenes en los HTML.
 *
 * Se ejecuta como último paso del build. El hash se genera a partir
 * del contenido del archivo, así que solo cambia cuando el archivo cambia.
 * Esto fuerza al browser a descargar la versión nueva sin necesidad de Ctrl+F5.
 */
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const ASSETS = ["styles.css", "js/main.js", "js/i18n.js"];
const HTML_FILES = [
  "index.html",
  "equipo.html",
  "servicios.html",
  "articulos.html",
  "articulo.html",
];

/** Genera hash corto (8 chars) a partir del contenido del archivo */
function hashFile(filepath) {
  if (!fs.existsSync(filepath)) return null;
  return crypto
    .createHash("md5")
    .update(fs.readFileSync(filepath))
    .digest("hex")
    .slice(0, 8);
}

// 1. Generar hashes para CSS/JS conocidos
const hashes = {};
ASSETS.forEach((file) => {
  const h = hashFile(path.join(ROOT, file));
  if (h) hashes[file] = h;
});

// 2. Reemplazar referencias en cada HTML (CSS/JS + imágenes locales)
HTML_FILES.forEach((htmlFile) => {
  const filepath = path.join(ROOT, htmlFile);
  if (!fs.existsSync(filepath)) return;

  let html = fs.readFileSync(filepath, "utf8");

  // 2a. Cache-bust de CSS/JS
  ASSETS.forEach((file) => {
    if (!hashes[file]) return;
    const escaped = file.replace(/[./]/g, "\\$&");
    const re = new RegExp(`(${escaped})(\\?v=[a-f0-9]*)?`, "g");
    html = html.replace(re, `${file}?v=${hashes[file]}`);
  });

  // 2b. Cache-bust de imágenes locales (src="./assets/img/foto.webp")
  html = html.replace(
    /(src=["'])(\.\/assets\/img\/[^"'?]+)(\?v=[a-f0-9]*)?(["'])/g,
    (_match, pre, imgPath, _oldHash, post) => {
      const h = hashFile(path.join(ROOT, imgPath.replace("./", "")));
      return h ? `${pre}${imgPath}?v=${h}${post}` : `${pre}${imgPath}${post}`;
    }
  );

  fs.writeFileSync(filepath, html);
});

console.log("Cache-bust CSS/JS:", hashes);
console.log("Cache-bust images: done (hashes inline)");
