(function () {
  function initSidebar() {
    var sbNav    = document.querySelector('.sb-nav');
    var sections = document.querySelectorAll('[data-sb-section]');
    if (!sbNav || !sections.length) return;

    function setActive(id) {
      sbNav.querySelectorAll('[data-sb-nav]').forEach(function (item) {
        item.classList.toggle('active', item.dataset.sbNav === id);
      });
      var activeItem = sbNav.querySelector('[data-sb-nav="' + id + '"].active');
      if (activeItem && window.innerWidth < 768) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    sbNav.addEventListener('click', function (e) {
      var item = e.target.closest('[data-sb-nav]');
      if (!item) return;

      var id = item.dataset.sbNav;
      var target = document.getElementById(id);
      if (!target) return;

      var navbarH = 80;
      var sbH = (window.innerWidth < 768) ? sbNav.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - navbarH - sbH - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
      setActive(id);
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { setActive(entry.target.id); }
      });
    }, { rootMargin: '-80px 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });

    if (sections[0]) { setActive(sections[0].id); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
}());
