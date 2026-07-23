// gallery.js - カテゴリー絞り込み + モーダルギャラリー
(function () {
  'use strict';
  var buttons = document.querySelectorAll('.filter-btn');
  var items = document.querySelectorAll('.gallery-grid figure');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var f = btn.getAttribute('data-filter');
      items.forEach(function (it) {
        var show = (f === 'all' || it.getAttribute('data-cat') === f);
        it.hidden = !show;
      });
    });
  });

  var lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;
  var lbImg = lightbox.querySelector('img');
  var lbCap = lightbox.querySelector('figcaption');
  var lbClose = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.lightbox-trigger').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      lbImg.src = a.getAttribute('data-full');
      lbImg.alt = a.querySelector('img') ? a.querySelector('img').alt : '';
      lbCap.textContent = a.getAttribute('data-caption') || '';
      lightbox.classList.add('is-open');
    });
  });
  function close() { lightbox.classList.remove('is-open'); lbImg.src = ''; }
  lbClose.addEventListener('click', close);
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
