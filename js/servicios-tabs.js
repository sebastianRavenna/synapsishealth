(function () {
  function initTabs() {
    var bar       = document.querySelector('.tabs-bar');
    var panels    = document.querySelectorAll('.tab-panel');
    var indicator = document.querySelector('.tab-indicator');
    if (!bar || !indicator) return;

    function moveIndicator(btn) {
      indicator.style.left  = btn.offsetLeft + 'px';
      indicator.style.width = btn.offsetWidth + 'px';
    }

    function activate(id) {
      bar.querySelectorAll('.tab-btn').forEach(function (b) {
        var isActive = b.dataset.tab === id;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      panels.forEach(function (p) {
        p.classList.toggle('active', p.dataset.tabPanel === id);
      });
      var activeBtn = bar.querySelector('.tab-btn.active');
      if (activeBtn) {
        moveIndicator(activeBtn);
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.tab-btn');
      if (btn) activate(btn.dataset.tab);
    });

    bar.addEventListener('keydown', function (e) {
      var btn = e.target.closest('.tab-btn');
      if (!btn) return;
      var all = Array.from(bar.querySelectorAll('.tab-btn'));
      var idx = all.indexOf(btn);
      var next = null;
      if (e.key === 'ArrowRight') next = all[(idx + 1) % all.length];
      if (e.key === 'ArrowLeft')  next = all[(idx - 1 + all.length) % all.length];
      if (next) { e.preventDefault(); next.click(); next.focus(); }
    });

    var firstActive = bar.querySelector('.tab-btn.active');
    if (firstActive) {
      moveIndicator(firstActive);
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { indicator.classList.add('ready'); });
      });
    }

    window.addEventListener('resize', function () {
      var active = bar.querySelector('.tab-btn.active');
      if (active) moveIndicator(active);
    });
  }

  /* ── Accordion (mobile < 1024px) ── */
  function initAccordion() {
    var panels = document.querySelectorAll('.tab-panel');

    function openPanel(panel) {
      var btn  = panel.querySelector('.tab-panel-accordion-btn');
      var body = panel.querySelector('.accordion-body');
      panel.classList.add('accordion-open');
      if (btn) { btn.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
      if (body) {
        // Animate to the real content height (no giant placeholder)
        body.style.maxHeight = body.scrollHeight + 'px';
        // Once the transition ends, free up max-height so content can reflow freely
        function onOpen(e) {
          if (e.propertyName !== 'max-height') return;
          body.removeEventListener('transitionend', onOpen);
          if (panel.classList.contains('accordion-open')) body.style.maxHeight = 'none';
        }
        body.addEventListener('transitionend', onOpen);
      }
    }

    function closePanel(panel) {
      var btn  = panel.querySelector('.tab-panel-accordion-btn');
      var body = panel.querySelector('.accordion-body');
      panel.classList.remove('accordion-open');
      if (btn) { btn.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
      if (body) {
        // Pin the current height explicitly before animating to 0
        // (necessary when max-height was set to 'none')
        if (!body.style.maxHeight || body.style.maxHeight === 'none') {
          body.style.maxHeight = body.scrollHeight + 'px';
        }
        // Double rAF: let the browser paint the explicit height, then transition to 0
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { body.style.maxHeight = '0'; });
        });
      }
    }

    panels.forEach(function (panel) {
      var btn = panel.querySelector('.tab-panel-accordion-btn');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var isOpen = panel.classList.contains('accordion-open');
        panels.forEach(closePanel);
        if (!isOpen) {
          openPanel(panel);
          // After the expand animation finishes, scroll the button into view
          // so the user sees the content they just opened (not the footer).
          var body = panel.querySelector('.accordion-body');
          if (body) {
            body.addEventListener('transitionend', function onScroll(e) {
              if (e.propertyName !== 'max-height') return;
              body.removeEventListener('transitionend', onScroll);
              btn.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
          }
        }
      });
    });
  }

  function init() {
    initTabs();
    initAccordion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
