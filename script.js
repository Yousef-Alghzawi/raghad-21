(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  /* the letter always opens at the top, so the tree gets to draw itself first */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (!location.hash) window.scrollTo(0, 0);

  /* ---------- 0. the hero tree fills a phone, sits beside the words on a desk ---------- */

  var heroBranch = document.querySelector('.hero-branch');
  var wideQuery = window.matchMedia ? window.matchMedia('(min-width: 900px)') : null;
  function fitHeroTree() {
    if (!heroBranch) return;
    var wide = wideQuery && wideQuery.matches;
    heroBranch.setAttribute('preserveAspectRatio', wide ? 'xMidYMid meet' : 'xMidYMid slice');
  }
  fitHeroTree();
  if (wideQuery && wideQuery.addEventListener) wideQuery.addEventListener('change', fitHeroTree);

  /* ---------- 1. plant the sprigs ---------- */

  document.querySelectorAll('.sprig[data-sprig]').forEach(function (slot) {
    var tpl = document.getElementById('sprig-' + slot.getAttribute('data-sprig'));
    if (tpl) slot.appendChild(tpl.content.cloneNode(true));
  });

  /* ---------- 2. give every branch its highlight stroke ---------- */

  document.querySelectorAll('path.bark').forEach(function (p) {
    var hi = p.cloneNode(false);
    hi.setAttribute('class', p.getAttribute('class').replace('bark', 'bark-hi'));
    p.parentNode.insertBefore(hi, p.nextSibling);
  });

  /* ---------- 3. prepare strokes for drawing ---------- */

  var drawables = Array.prototype.slice.call(document.querySelectorAll('path.bark, path.bark-hi'));
  drawables.forEach(function (p) {
    var len = 0;
    try { len = p.getTotalLength(); } catch (e) { len = 0; }
    p.dataset.len = len;
    p.style.strokeDasharray = len + ' ' + len;
    p.style.strokeDashoffset = len;
  });

  function showAllStrokes() {
    drawables.forEach(function (p) { p.style.strokeDashoffset = 0; });
  }

  /* ---------- 4. the grove ---------- */

  var grove = document.querySelector('.grove');
  var note = document.querySelector('.grove-note-text');
  var noteDefault = note ? note.innerHTML : '';

  if (grove && note) {
    grove.addEventListener('click', function (ev) {
      var btn = ev.target.closest('button');
      if (!btn) return;
      var item = btn.closest('.place');
      var wasOpen = item.classList.contains('is-open');
      grove.querySelectorAll('.place.is-open').forEach(function (el) {
        el.classList.remove('is-open');
        el.querySelector('button').setAttribute('aria-expanded', 'false');
      });
      if (wasOpen) {
        note.innerHTML = noteDefault;
        note.classList.add('is-hint');
        return;
      }
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      var line = item.querySelector('.place-line');
      note.classList.remove('is-hint');
      if (hasGsap && !reduceMotion) {
        gsap.fromTo(note, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', overwrite: true });
      }
      note.textContent = line ? line.textContent : '';
    });
    note.classList.add('is-hint');
  }

  /* ---------- 5. no motion: show everything and stop ---------- */

  if (!hasGsap || reduceMotion) {
    showAllStrokes();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- 6. progress bar ---------- */

  gsap.to('.progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.4 }
  });

  /* ---------- 7. hero: the tree draws itself, then blooms, then the name ---------- */

  var hero = document.querySelector('.hero');
  var heroBark = hero.querySelectorAll('path.bark, path.bark-hi');
  var heroBlooms = hero.querySelectorAll('.bloom');

  gsap.set(heroBlooms, { scale: 0, transformOrigin: '0 0' });
  gsap.set('.hero-name', { opacity: 0, y: 30, scale: 0.94 });
  gsap.set('.hero-line', { opacity: 0, y: 18 });

  var intro = gsap.timeline({ defaults: { ease: 'power2.out' }, delay: 0.2 });
  intro.to(heroBark, {
    strokeDashoffset: 0,
    duration: 2.6,
    ease: 'power1.inOut',
    stagger: { each: 0.12, from: 'start' }
  });
  intro.to(heroBlooms, {
    scale: 1,
    duration: 1.1,
    ease: 'back.out(1.8)',
    stagger: { each: 0.06, from: 'random' }
  }, '-=1.6');
  intro.to('.hero-name', { opacity: 1, y: 0, scale: 1, duration: 1.4 }, '-=1.4');
  intro.to('.hero-line', { opacity: 1, y: 0, duration: 1, stagger: 0.16 }, '-=0.9');

  gsap.to('.hero-inner', {
    y: -60,
    opacity: 0.2,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
  });

  /* ---------- 8. chapter reveals ---------- */

  gsap.utils.toArray('.reveal').forEach(function (el) {
    gsap.from(el, {
      opacity: 0,
      y: 26,
      duration: 1.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    });
  });

  /* ---------- 9. sprigs draw in and bloom as they arrive ---------- */

  document.querySelectorAll('.sprig').forEach(function (sprig) {
    var bark = sprig.querySelectorAll('path.bark, path.bark-hi');
    var blooms = sprig.querySelectorAll('.bloom');
    gsap.set(blooms, { scale: 0, transformOrigin: '0 0' });

    gsap.to(bark, {
      strokeDashoffset: 0,
      ease: 'none',
      stagger: 0.05,
      scrollTrigger: { trigger: sprig, start: 'top 95%', end: 'top 45%', scrub: 0.5 }
    });

    gsap.to(blooms, {
      scale: 1,
      duration: 1,
      ease: 'back.out(1.8)',
      stagger: { each: 0.07, from: 'random' },
      scrollTrigger: { trigger: sprig, start: 'top 70%', once: true }
    });
  });

  /* gift blossoms */
  var giftBlooms = document.querySelectorAll('.jewels .bloom');
  gsap.set(giftBlooms, { scale: 0, transformOrigin: '0 0' });
  gsap.to(giftBlooms, {
    scale: 1, duration: 1, ease: 'back.out(1.8)', stagger: 0.15,
    scrollTrigger: { trigger: '.jewels', start: 'top 75%', once: true }
  });

  /* ---------- 10. wardrobe fan ---------- */

  gsap.from('.fan-petal', {
    rotation: 0,
    y: 40,
    opacity: 0,
    duration: 1.2,
    ease: 'back.out(1.4)',
    stagger: 0.09,
    scrollTrigger: { trigger: '.fan', start: 'top 80%', once: true }
  });

  /* ---------- 11. the missing petal comes home ---------- */

  gsap.to('.petal-lost', {
    x: 0, y: 0, rotation: 0,
    ease: 'power1.inOut',
    scrollTrigger: { trigger: '#piece', start: 'top 75%', end: 'top 20%', scrub: 0.8 }
  });

  /* ---------- 12. a slow breath on the big blossom ---------- */

  gsap.to('.big-blossom', {
    rotation: 6,
    duration: 9,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    transformOrigin: '50% 50%'
  });

  /* ---------- 13. refresh when fonts and embeds settle ---------- */

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
})();
