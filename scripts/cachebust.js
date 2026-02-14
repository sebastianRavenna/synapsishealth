/**
 * cachebust.js — Agrega ?v=<hash> a las referencias de CSS/JS en los HTML.
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
const HTML_FILES = ["index.html", "equipo.html", "servicios.html"];

// 1. Generar hash corto (8 chars) del contenido de cada asset
const hashes = {};
ASSETS.forEach((file) => {
  const filepath = path.join(ROOT, file);
  if (!fs.existsSync(filepath)) return;
  const content = fs.readFileSync(filepath);
  hashes[file] = crypto
    .createHash("md5")
    .update(content)
    .digest("hex")
    .slice(0, 8);
});

// 2. Reemplazar referencias en cada HTML
HTML_FILES.forEach((htmlFile) => {
  const filepath = path.join(ROOT, htmlFile);
  if (!fs.existsSync(filepath)) return;

  let html = fs.readFileSync(filepath, "utf8");

  ASSETS.forEach((file) => {
    if (!hashes[file]) return;
    // Escapar . y / para usar en regex
    const escaped = file.replace(/[./]/g, "\\$&");
    // Matchea el nombre del archivo con o sin ?v=... existente
    const re = new RegExp(`(${escaped})(\\?v=[a-f0-9]*)?`, "g");
    html = html.replace(re, `${file}?v=${hashes[file]}`);
  });

  fs.writeFileSync(filepath, html);
});

console.log("Cache-bust:", hashes);
