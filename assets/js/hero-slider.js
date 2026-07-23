// hero-slider.js - フルスクリーン写真スライダー（クロスフェード・前後ボタン・キーボード・スワイプ対応）
(function () {
  'use strict';

  var hero = document.querySelector('.hero');
  if (!hero) return;

  var slides = Array.prototype.slice.call(hero.querySelectorAll('.hero-slide'));
  var dotsWrap = hero.querySelector('.hero-nav-dots');
  if (slides.length <= 1) return;

  var current = slides.findIndex(function (s) { return s.classList.contains('is-active'); });
  if (current < 0) current = 0;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var intervalMs = 7000; // 6〜8秒でクロスフェード
  var timer = null;

  // 前後ボタン
  var prevBtn = document.createElement('button');
  prevBtn.className = 'hero-arrow hero-arrow-prev';
  prevBtn.setAttribute('aria-label', '前のスライド');
  prevBtn.innerHTML = '‹';
  var nextBtn = document.createElement('button');
  nextBtn.className = 'hero-arrow hero-arrow-next';
  nextBtn.setAttribute('aria-label', '次のスライド');
  nextBtn.innerHTML = '›';
  hero.appendChild(prevBtn);
  hero.appendChild(nextBtn);

  // ドット生成
  var dots = [];
  if (dotsWrap) {
    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', (i + 1) + '枚目の写真を表示');
      if (i === current) b.classList.add('is-active');
      b.addEventListener('click', function () { goTo(i); restart(); });
      dotsWrap.appendChild(b);
      dots.push(b);
    });
  }

  function show(index) {
    slides[current].classList.remove('is-active');
    if (dots[current]) dots[current].classList.remove('is-active');
    current = index;
    slides[current].classList.add('is-active');
    if (dots[current]) dots[current].classList.add('is-active');
  }

  function goTo(index) { show(index); }
  function next() { show((current + 1) % slides.length); }
  function prevSlide() { show((current - 1 + slides.length) % slides.length); }

  function start() {
    if (reduceMotion) return; // 動きを抑えたい場合は自動再生しない
    timer = setInterval(next, intervalMs);
  }
  function stop() { if (timer) clearInterval(timer); }
  function restart() { stop(); start(); }

  prevBtn.addEventListener('click', function () { prevSlide(); restart(); });
  nextBtn.addEventListener('click', function () { next(); restart(); });

  // キーボード操作（左右矢印）
  hero.setAttribute('tabindex', '0');
  hero.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { next(); restart(); }
    if (e.key === 'ArrowLeft') { prevSlide(); restart(); }
  });

  // タッチスワイプ
  var touchStartX = null;
  hero.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  hero.addEventListener('touchend', function (e) {
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) { next(); } else { prevSlide(); }
      restart();
    }
    touchStartX = null;
  }, { passive: true });

  start();

  // タブが非表示の間は止める（無駄なアニメーションを避ける）
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });
})();
