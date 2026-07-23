// voices.js - お客様の声の絞り込み
(function () {
  'use strict';
  var buttons = document.querySelectorAll('[data-vf]');
  var cards = document.querySelectorAll('[data-vcat]');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      var f = btn.getAttribute('data-vf');
      cards.forEach(function (c) {
        c.hidden = !(f === 'すべて' || c.getAttribute('data-vcat') === f);
      });
    });
  });
})();
