/* ============================================================
   voz.js — Sistema de voz / profesor virtual
   Lee en voz alta preguntas e instrucciones (para quienes aún
   no leen). Recuerda el último texto para repetir con la mascota.
   ============================================================ */
(function () {
  'use strict';
  var ultimo = '';
  var habilitado = true;

  function hablar(texto, lang) {
    if (!habilitado || EK.Audio.muted) return;
    ultimo = texto;
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(texto);
      u.lang = lang || 'es-AR';
      u.rate = 0.88; u.pitch = 1.2; u.volume = 1;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  function callar() { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {} }

  var Voz = {
    hablar: hablar, callar: callar,
    get ultimoTexto() { return ultimo; },
    set habilitado(v) { habilitado = v; },
    get habilitado() { return habilitado; },
    /* Lee una pregunta completa en voz alta */
    leerPregunta: function (p) {
      var texto = p.pregunta || '';
      if (p.emojiPregunta && /^[0-9🍎🍌⭐🎈🐶🌸🚗⚽]+$/.test(p.emojiPregunta)) {
        // si son objetos repetidos, cuenta: "Hay 5 manzanas"
      }
      hablar(texto);
    }
  };
  window.EK = window.EK || {};
  window.EK.Voz = Voz;
})();
