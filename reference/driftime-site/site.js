document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.burger');
  var panel = document.querySelector('.menu-panel');
  var closeBtn = document.querySelector('.menu-close');

  function toggle(open) {
    if (!burger || !panel) return;
    var isOpen = open !== undefined ? open : !panel.classList.contains('open');
    panel.classList.toggle('open', isOpen);
    burger.classList.toggle('is-open', isOpen);
  }

  if (burger) burger.addEventListener('click', function () { toggle(); });
  if (closeBtn) closeBtn.addEventListener('click', function () { toggle(false); });

  document.addEventListener('click', function (e) {
    if (!panel || !panel.classList.contains('open')) return;
    if (panel.contains(e.target) || (burger && burger.contains(e.target))) return;
    toggle(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { toggle(false); closeContact(); }
  });

  /* ---------------- Contact modal ---------------- */
  var overlay = document.getElementById('contact-modal');

  function openContact(e) {
    if (e) e.preventDefault();
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeContact() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('a[href="#contact"], a[href="index.html#contact"], .js-contact-open').forEach(function (el) {
    el.addEventListener('click', openContact);
  });
  var contactCloseBtn = document.querySelector('.contact-close');
  if (contactCloseBtn) contactCloseBtn.addEventListener('click', closeContact);
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeContact();
    });
  }

  /* ---------------- Tag choice single-select ---------------- */
  document.querySelectorAll('.tag-group').forEach(function (group) {
    group.querySelectorAll('.tag-choice').forEach(function (btn) {
      btn.addEventListener('click', function () {
        group.querySelectorAll('.tag-choice').forEach(function (b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
      });
    });
  });

  /* ---------------- Service tier toggle tabs ---------------- */
  document.querySelectorAll('[data-service]').forEach(function (svc) {
    var btns = svc.querySelectorAll('[data-tier-btn]');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tier = btn.getAttribute('data-tier-btn');
        btns.forEach(function (b) { b.classList.toggle('active', b === btn); });
        svc.querySelectorAll('[data-tier-panel]').forEach(function (panel) {
          panel.hidden = panel.getAttribute('data-tier-panel') !== tier;
        });
      });
    });
  });

  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('button[type="submit"]');
      if (btn) { btn.textContent = 'Message sent ✓'; }
    });
  }
});

