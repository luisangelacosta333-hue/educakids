/* ============================================================
   mascota.js — Mascota virtual "Luna" 🦊
   Acompaña al niño, lee las instrucciones en voz alta,
   felicita al acertar y anima al equivocarse. Crece con el nivel.
   ============================================================ */
(function () {
  'use strict';

  var NOMBRE_KEY = 'educakids_mascota_nombre';
  var nombre = 'Luna';
  try { nombre = localStorage.getItem(NOMBRE_KEY) || 'Luna'; } catch (e) {}

  var el = null, burbuja = null, timerBurbuja = null;

  function crear() {
    if (document.getElementById('mascota')) return;
    el = document.createElement('div');
    el.id = 'mascota';
    el.className = 'mascota';
    el.innerHTML =
      '<div class="mascota-burbuja" id="mascota-burbuja"></div>' +
      '<button class="mascota-cuerpo" id="mascota-cuerpo" aria-label="Repetir instrucción" title="Tocame para repetir">🦊</button>';
    document.body.appendChild(el);
    burbuja = document.getElementById('mascota-burbuja');
    document.getElementById('mascota-cuerpo').addEventListener('click', function () {
      EK.Audio.click();
      if (EK.Voz && EK.Voz.ultimoTexto) EK.Voz.hablar(EK.Voz.ultimoTexto);
      else decir('¡Hola! Soy ' + nombre + '. Tocame cuando quieras que repita algo.');
    });
  }

  function decir(texto, duracion) {
    if (!burbuja) crear();
    burbuja.textContent = texto;
    burbuja.classList.add('visible');
    el.classList.add('hablando');
    if (timerBurbuja) clearTimeout(timerBurbuja);
    timerBurbuja = setTimeout(function () {
      burbuja.classList.remove('visible');
      el.classList.remove('hablando');
    }, duracion || 3200);
    if (EK.Voz) EK.Voz.hablar(texto);
  }

  function reaccionar(tipo) {
    if (!el) crear();
    el.classList.remove('reacciona-bien', 'reacciona-mal');
    void el.offsetWidth; // reflow para reiniciar animación
    if (tipo === 'bien') {
      el.classList.add('reacciona-bien');
      var frases = ['¡Excelente! ⭐', '¡Muy bien!', '¡Sos un genio!', '¡Increíble! 🌟', '¡Así se hace!'];
      decir(frases[Math.floor(Math.random() * frases.length)], 2200);
    } else {
      el.classList.add('reacciona-mal');
      var frasesMal = ['¡Casi! Intentá de nuevo 💪', 'No pasa nada, ¡vos podés!', '¡Muy cerca!', 'Otra vez va 😊'];
      decir(frasesMal[Math.floor(Math.random() * frasesMal.length)], 2200);
    }
  }

  function saludoInicial() {
    crear();
    var hora = new Date().getHours();
    var saludo = hora < 12 ? '¡Buenos días!' : hora < 19 ? '¡Buenas tardes!' : '¡Buenas noches!';
    setTimeout(function () { decir(saludo + ' Soy ' + nombre + '. ¡Vamos a aprender jugando! 🚀'); }, 800);
  }

  function setNombre(n) {
    nombre = (n || 'Luna').trim().slice(0, 14) || 'Luna';
    try { localStorage.setItem(NOMBRE_KEY, nombre); } catch (e) {}
  }
  function getNombre() { return nombre; }

  /* Según el nivel general cambia el "tamaño"/emoji de la mascota */
  function actualizarNivel(nivel) {
    if (!el) crear();
    var emojis = ['🦊', '🦊', '🦊✨', '🦊🌟', '🦊👑', '🦊👑'];
    el.querySelector('.mascota-cuerpo').textContent = emojis[Math.min(nivel, emojis.length - 1)] || '🦊';
  }

  var Mascota = { decir: decir, reaccionar: reaccionar, saludoInicial: saludoInicial, setNombre: setNombre, getNombre: getNombre, actualizarNivel: actualizarNivel, crear: crear };
  window.EK = window.EK || {};
  window.EK.Mascota = Mascota;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', crear);
  else crear();
})();
