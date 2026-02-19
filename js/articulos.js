/**
 * Synapsis Health — articulos.js
 * Carga y renderiza artículos desde data/articulos.json.
 * Funciona en: index.html (3 últimos), articulos.html (todos), articulo.html (detalle).
 */

document.addEventListener("DOMContentLoaded", initArticulos);

async function initArticulos() {
  try {
    const res = await fetch("./data/articulos.json");
    if (!res.ok) throw new Error("No se pudo cargar articulos.json");
    const articulos = await res.json();

    const lang = (localStorage.getItem("synapsis-lang") || "es");

    // Home: 3 últimos artículos
    const homeContainer = document.getElementById("home-articles");
    if (homeContainer) {
      renderHomeArticles(homeContainer, articulos.slice(0, 3), lang);
    }

    // Listado completo
    const listContainer = document.getElementById("all-articles");
    if (listContainer) {
      renderAllArticles(listContainer, articulos, lang);
    }

    // Detalle de artículo individual
    const detailContainer = document.getElementById("article-detail");
    if (detailContainer) {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get("slug");
      const articulo = articulos.find(a => a.slug === slug);
      if (articulo) {
        renderArticleDetail(detailContainer, articulo, lang);
      } else {
        detailContainer.innerHTML = '<p class="text-graphite-500">Artículo no encontrado.</p>';
      }
    }
  } catch (err) {
    console.error("Error cargando artículos:", err);
  }
}

function renderHomeArticles(container, articulos, lang) {
  container.innerHTML = articulos.map(a => {
    const title = lang === "en" ? a.titleEn : a.title;
    const summary = lang === "en" ? a.summaryEn : a.summary;
    const date = formatDate(a.date, lang);
    return `
      <article class="card flex flex-col">
        <p class="text-xs font-heading text-graphite-400 tracking-wide uppercase mb-3">${date}</p>
        <h3 class="font-heading text-title font-light text-graphite-800 mb-3 line-clamp-2">${title}</h3>
        <p class="text-graphite-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">${summary}</p>
        <a href="articulo.html?slug=${a.slug}" class="btn-secondary text-xs py-2 px-5 self-start" data-i18n="articles.readMore">+ info</a>
      </article>
    `;
  }).join("");
}

function renderAllArticles(container, articulos, lang) {
  container.innerHTML = articulos.map(a => {
    const title = lang === "en" ? a.titleEn : a.title;
    const summary = lang === "en" ? a.summaryEn : a.summary;
    const author = lang === "en" ? a.authorEn : a.author;
    const date = formatDate(a.date, lang);
    return `
      <article class="card flex flex-col md:flex-row gap-8">
        <div class="flex-1">
          <p class="text-xs font-heading text-graphite-400 tracking-wide uppercase mb-2">${date} — ${author}</p>
          <h3 class="font-heading text-title font-light text-graphite-800 mb-3">${title}</h3>
          <p class="text-graphite-500 text-sm leading-relaxed mb-4">${summary}</p>
          <a href="articulo.html?slug=${a.slug}" class="btn-secondary text-xs py-2 px-5 inline-flex" data-i18n="articles.readMore">+ info</a>
        </div>
      </article>
    `;
  }).join("");
}

function renderArticleDetail(container, articulo, lang) {
  const title = lang === "en" ? articulo.titleEn : articulo.title;
  const content = lang === "en" ? articulo.contentEn : articulo.content;
  const author = lang === "en" ? articulo.authorEn : articulo.author;
  const date = formatDate(articulo.date, lang);
  const backText = lang === "en" ? "Back to all articles" : "Volver a artículos";

  container.innerHTML = `
    <a href="articulos.html" class="inline-flex items-center gap-2 text-sm font-heading text-graphite-500 hover:text-graphite-800 transition-colors mb-8">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
      ${backText}
    </a>
    <p class="text-xs font-heading text-graphite-400 tracking-wide uppercase mb-4">${date} — ${author}</p>
    <h1 class="text-display font-heading font-extralight text-graphite-800 mb-8">${title}</h1>
    <div class="line-accent mb-8"></div>
    <div class="prose-article space-y-5 text-graphite-500 leading-relaxed">${content}</div>
  `;

  // Update page title
  document.title = title + " | Synapsis Health";
}

function formatDate(dateStr, lang) {
  const d = new Date(dateStr + "T12:00:00");
  const months = lang === "en"
    ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    : ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}