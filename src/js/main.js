/**
 * Synapsis Health — main.js
 * Funcionalidad: menú mobile, scroll reveal, navbar scroll,
 * tabs de servicios, tabs de equipo, formulario de contacto.
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initScrollReveal();
  initNavbarScroll();
  initSmoothScroll();
  initServiceTabs();
  initTeamTabs();
  initContactForm();
});


/* ============================================================
   MOBILE MENU — slide-in desde la derecha
   ============================================================ */
function initMobileMenu() {
  const toggle  = document.getElementById("menu-toggle");
  const menu    = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");
  const close   = document.getElementById("menu-close");
  if (!toggle || !menu) return;

  const open = () => {
    menu.classList.replace("translate-x-full", "translate-x-0");
    overlay?.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };
  const shut = () => {
    menu.classList.replace("translate-x-0", "translate-x-full");
    overlay?.classList.add("hidden");
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", open);
  close?.addEventListener("click", shut);
  overlay?.addEventListener("click", shut);
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", shut));
}


/* ============================================================
   SCROLL REVEAL — IntersectionObserver
   ============================================================ */
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const obs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );
  els.forEach(el => obs.observe(el));
}


/* ============================================================
   NAVBAR — fondo al scrollear
   ============================================================ */
function initNavbarScroll() {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  const update = () => {
    if (window.scrollY > 60) {
      nav.classList.add("bg-white/95", "backdrop-blur-md", "shadow-sm");
    } else {
      nav.classList.remove("bg-white/95", "backdrop-blur-md", "shadow-sm");
    }
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}


/* ============================================================
   SMOOTH SCROLL — para anchors #id
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const offset = document.getElementById("navbar")?.offsetHeight || 0;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset - 20,
        behavior: "smooth",
      });
    });
  });
}


/* ============================================================
   SERVICE TABS — sidebar de servicios (servicios.html)
   ============================================================ */
function initServiceTabs() {
  const btns = document.querySelectorAll("[data-service-tab]");
  const panels = document.querySelectorAll("[data-service-panel]");
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.serviceTab;

      // Activar tab
      btns.forEach(b => {
        b.classList.remove("bg-graphite-800", "text-white");
        b.classList.add("text-graphite-500", "hover:text-graphite-800", "hover:bg-graphite-50");
      });
      btn.classList.add("bg-graphite-800", "text-white");
      btn.classList.remove("text-graphite-500", "hover:text-graphite-800", "hover:bg-graphite-50");

      // Mostrar panel
      panels.forEach(p => {
        p.classList.add("hidden");
        if (p.dataset.servicePanel === id) {
          p.classList.remove("hidden");
          // Fade in
          p.style.opacity = "0";
          p.style.transform = "translateY(10px)";
          requestAnimationFrame(() => {
            p.style.transition = "opacity 0.4s ease, transform 0.4s ease";
            p.style.opacity = "1";
            p.style.transform = "translateY(0)";
          });
        }
      });
    });
  });
}


/* ============================================================
   TEAM TABS — selector de miembros (equipo.html)
   ============================================================ */
function initTeamTabs() {
  const btns = document.querySelectorAll("[data-team-tab]");
  const panels = document.querySelectorAll("[data-team-panel]");
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.teamTab;

      // Activar tab
      btns.forEach(b => {
        b.classList.remove("bg-graphite-800", "text-white", "border-graphite-800");
        b.classList.add("border-graphite-100");
      });
      btn.classList.add("bg-graphite-800", "text-white", "border-graphite-800");
      btn.classList.remove("border-graphite-100");

      // Mostrar panel
      panels.forEach(p => {
        p.classList.add("hidden");
        if (p.dataset.teamPanel === id) {
          p.classList.remove("hidden");
          p.style.opacity = "0";
          requestAnimationFrame(() => {
            p.style.transition = "opacity 0.5s ease";
            p.style.opacity = "1";
          });
        }
      });

      // Scroll al panel en mobile
      if (window.innerWidth < 768) {
        const target = document.getElementById("team-detail");
        if (target) {
          const offset = document.getElementById("navbar")?.offsetHeight || 0;
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset - 20,
            behavior: "smooth",
          });
        }
      }
    });
  });
}


/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const btn = form.querySelector('button[type="submit"]');
  const feedback = document.getElementById("form-feedback");

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    // Validación
    if (!data.nombre || !data.email || !data.mensaje) {
      showFeedback(feedback, "Por favor completá todos los campos obligatorios.", "error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      showFeedback(feedback, "Por favor ingresá un email válido.", "error");
      return;
    }

    btn.disabled = true;
    btn.textContent = "Enviando...";

    try {
      /* =============================================
         CONFIGURAR: URL del endpoint real del backend
         ============================================= */
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");

      showFeedback(feedback, "Mensaje enviado. Nos pondremos en contacto pronto.", "success");
      form.reset();
    } catch (err) {
      console.error("Contact form error:", err);
      showFeedback(feedback, "Error al enviar. Por favor intentá nuevamente o escribinos a contacto@synapsishealth.com", "error");
    } finally {
      btn.disabled = false;
      btn.textContent = "Enviar mensaje";
    }
  });
}

function showFeedback(el, msg, type) {
  if (!el) return;
  el.textContent = msg;
  el.className = type === "success"
    ? "mt-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3"
    : "mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3";
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 8000);
}
