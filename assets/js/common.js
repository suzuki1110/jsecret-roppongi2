// common.js - ヘッダー / オーバーレイメニュー / FAQアコーディオン / 固定CTA
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var header = document.querySelector('.site-header');
  var menuToggle = document.querySelector('.menu-toggle');
  var overlayMenu = document.querySelector('.overlay-menu');
  var overlayClose = document.querySelector('.overlay-close');
  var isHome = document.body.classList.contains('home');

  // --- ヘッダーの背景切り替え（HOMEのみ透明→実体化） ---
  function updateHeaderState() {
    if (!header || !isHome) return;
    if (window.scrollY > window.innerHeight * 0.7) {
      header.classList.add('is-solid');
    } else {
      header.classList.remove('is-solid');
    }
  }
  if (isHome) {
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    updateHeaderState();
  }

  // --- オーバーレイメニュー開閉 ---
  function openMenu() {
    if (!overlayMenu || !menuToggle) return;
    overlayMenu.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var firstLink = overlayMenu.querySelector('a');
    if (firstLink) firstLink.focus();
  }
  function closeMenu() {
    if (!overlayMenu || !menuToggle) return;
    overlayMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    menuToggle.focus();
  }
  if (menuToggle && overlayMenu) {
    menuToggle.addEventListener('click', function () {
      var isOpen = overlayMenu.classList.contains('is-open');
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });
    if (overlayClose) overlayClose.addEventListener('click', closeMenu);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlayMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });
    // メニュー内リンクをクリックしたら閉じる
    overlayMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  // --- FAQアコーディオン ---
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var isOpen = item.getAttribute('data-open') === 'true';
      item.setAttribute('data-open', isOpen ? 'false' : 'true');
      q.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
  });

})();
// --- メニューとフッターに「3つのなぜ」を追加（HTML側に無い場合のみ） ---
(function () {
  'use strict';
  var groups = [
    { sel: '.overlay-menu nav', html: '<span class="en">WHY J.secret</span>3つのなぜ' },
    { sel: '.site-footer .flinks', html: '3つのなぜ' }
  ];
  groups.forEach(function (g) {
    var box = document.querySelector(g.sel);
    if (!box || box.querySelector('a[href$="why.html"]')) return;
    var concept = box.querySelector('a[href$="concept.html"]');
    if (!concept) return;
    var a = document.createElement('a');
    a.href = concept.getAttribute('href').replace('concept.html', 'why.html');
    a.innerHTML = g.html;
    concept.insertAdjacentElement('afterend', a);
  });
})();
