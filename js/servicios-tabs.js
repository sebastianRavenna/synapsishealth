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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabs);
  } else {
    initTabs();
  }
}());
