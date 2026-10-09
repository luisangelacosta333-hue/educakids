/* ============================================================
   audio.js — Efectos de sonido con WebAudio (sin archivos externos)
   + pronunciación de palabras con SpeechSynthesis del navegador.
   ============================================================ */
(function () {
  'use strict';
  var ctx = null;
  var muted = false;
  try { muted = localStorage.getItem('educakids_mute') === '1'; } catch (e) {}

  function ac() {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ctx = null; } }
    // algunos navegadores exigen reanudar tras interacción del usuario
    if (ctx && ctx.state === 'suspended') { try { ctx.resume(); } catch (e) {} }
    return ctx;
  }

  function tono(freq, dur, type, when, vol) {
    var c = ac();
    if (!c || muted) return;
    type = type || 'sine'; when = when || 0; vol = vol || 0.15;
    var o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.value = freq;
    var t0 = c.currentTime + when;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t0); o.stop(t0 + dur + 0.05);
  }

  var Audio = {
    get muted() { return muted; },
    toggle: function () {
      muted = !muted;
      try { localStorage.setItem('educakids_mute', muted ? '1' : '0'); } catch (e) {}
      return muted;
    },
    click:   function () { tono(620, 0.08, 'triangle', 0, 0.10); },
    correcto: function () { tono(523, 0.12, 'sine', 0); tono(659, 0.12, 'sine', 0.10); tono(784, 0.22, 'sine', 0.20); },
    error:   function () { tono(220, 0.22, 'sawtooth', 0, 0.07); tono(180, 0.25, 'sawtooth', 0.12, 0.06); },
    nivel:   function () { [523, 659, 784, 1047].forEach(function (f, i) { tono(f, 0.18, 'sine', i * 0.12, 0.14); }); },
    medalla: function () { [784, 988, 1175, 1568].forEach(function (f, i) { tono(f, 0.22, 'triangle', i * 0.10, 0.12); }); },
    flip:    function () { tono(880, 0.06, 'sine', 0, 0.08); },
    /* Pronunciación de palabras (idiomas). Usa la voz del sistema. */
    hablar: function (texto, lang) {
      if (muted || !('speechSynthesis' in window)) return;
      try {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(texto);
        u.lang = lang || 'es-ES';
        u.rate = 0.85; u.pitch = 1.15; u.volume = 1;
        window.speechSynthesis.speak(u);
      } catch (e) {}
    }
  };

  window.EK = window.EK || {};
  window.EK.Audio = Audio;
})();
