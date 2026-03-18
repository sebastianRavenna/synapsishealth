(function () {
  function initAcc() {
    var list = document.querySelector('.acc-list');
    if (!list) return;

    list.addEventListener('click', function (e) {
      var trigger = e.target.closest('button.acc-header');
      if (!trigger) return;
      var item = trigger.closest('.acc-item');
      if (!item) return;

      var isOpen = item.classList.contains('open');

      list.querySelectorAll('.acc-item').forEach(function (i) {
        i.classList.remove('open');
        var t = i.querySelector('button.acc-header');
        if (t) t.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAcc);
  } else {
    initAcc();
  }
}());
