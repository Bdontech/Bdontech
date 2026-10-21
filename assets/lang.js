// Language switch shared by every page. Loaded in <head> so the page never
// flashes in the wrong language: the remembered choice, else the phone's
// language (Sinhala phones get Sinhala), else English.
(function () {
  var root = document.documentElement;
  var lang = null;
  try { lang = localStorage.getItem('lang'); } catch (e) {}
  if (lang !== 'en' && lang !== 'si') {
    lang = (navigator.language || '').toLowerCase().indexOf('si') === 0 ? 'si' : 'en';
  }

  function show(l) {
    root.dataset.lang = l;
    root.lang = l;
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.setLang === l ? 'true' : 'false');
    });
  }
  show(lang);

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.addEventListener('click', function () {
        try { localStorage.setItem('lang', b.dataset.setLang); } catch (e) {}
        show(b.dataset.setLang);
      });
    });
    show(root.dataset.lang);
  });
})();
