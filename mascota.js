/* ============================================================
   mascota.js — BuggyIa Escuela · Mascota premium 🤖 ROBOT
   Sin zorro, sin corona. Burbuja de vidrio esmerilado.
   Más chico y con z-index bajo para NO estorbar botones.
   ============================================================ */
(function () {
  'use strict';

  var NOMBRE_KEY = 'buggyia_mascota_nombre';
  var nombre = 'Buggy';
  try { nombre = localStorage.getItem(NOMBRE_KEY) || 'Buggy'; } catch (e) {}

  var el = null, burbuja = null, timerBurbuja = null, timerInactividad = null;

  // CSS inyectado: VIDRIO ESMERILADO premium, tema oscuro, SIN estorbar
  function inyectarCSS() {
    if (document.getElementById('mascota-premium-styles')) return;
    var style = document.createElement('style');
    style.id = 'mascota-premium-styles';
    style.innerHTML = `
      .mascota-premium {
        position: fixed; bottom: 14px; right: 14px; z-index: 80;
        display: flex; flex-direction: column; align-items: flex-end;
        pointer-events: none; max-width: 200px;
      }
      .mascota-cuerpo {
        font-size: 44px; background: rgba(255,255,255,0.14) !important;
        backdrop-filter: blur(16px) saturate(180%); -webkit-backdrop-filter: blur(16px) saturate(180%);
        border: 1px solid rgba(255,255,255,0.3) !important;
        border-radius: 50% !important; width: 62px; height: 62px;
        display: grid !important; place-items: center;
        cursor: pointer; pointer-events: auto; padding: 0 !important;
        line-height: 1; box-shadow: 0 6px 18px rgba(8,4,35,0.4), 0 0 20px rgba(124,92,255,0.35), inset 0 1px 0 rgba(255,255,255,0.4) !important;
        transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1) !important;
        animation: mascotaFlotar 3.5s ease-in-out infinite;
      }
      .mascota-cuerpo:hover { transform: scale(1.15) rotate(8deg); box-shadow: 0 8px 24px rgba(8,4,35,0.5), 0 0 30px rgba(0,229,200,0.5), inset 0 1px 0 rgba(255,255,255,0.5) !important; }
      .mascota-cuerpo:active { transform: scale(0.85); }
      .mascota-burbuja {
        background: rgba(255,255,255,0.18) !important;
        backdrop-filter: blur(24px) saturate(200%); -webkit-backdrop-filter: blur(24px) saturate(200%);
        color: #fff !important; padding: 10px 16px;
        border-radius: 18px 18px 4px 18px !important;
        border: 1px solid rgba(255,255,255,0.35) !important;
        font-weight: 600; font-family: 'Fredoka', sans-serif;
        box-shadow: 0 10px 30px rgba(8,4,35,0.45), inset 0 1px 0 rgba(255,255,255,0.4) !important;
        opacity: 0; transform: translateY(16px) scale(0.85);
        transition: all 0.3s cubic-bezier(0.68,-0.55,0.265,1.55);
        pointer-events: none; text-align: center;
        max-width: 190px; font-size: 14px; line-height: 1.35;
        margin-bottom: 8px; text-shadow: 0 1px 3px rgba(0,0,0,0.3);
      }
      .mascota-burbuja.visible { opacity: 1; transform: translateY(0) scale(1); }
      @keyframes mascotaFlotar { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      .mascota-premium.reacciona-bien .mascota-cuerpo { animation: mascotaSalto 0.6s ease; }
      .mascota-premium.reacciona-mal .mascota-cuerpo { animation: mascotaTiembla 0.5s ease; }
      @keyframes mascotaSalto { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-28px) scale(1.15) rotate(8deg); } }
      @keyframes mascotaTiembla { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-10px) rotate(-8deg); } 40% { transform: translateX(10px) rotate(8deg); } 60% { transform: translateX(-10px) rotate(-8deg); } 80% { transform: translateX(10px) rotate(8deg); } }
      @media (max-width: 480px) {
        .mascota-cuerpo { width: 52px; height: 52px; font-size: 36px; }
        .mascota-burbuja { max-width: 160px; font-size: 13px; padding: 8px 12px; }
      }
    `;
    document.head.appendChild(style);
  }

  // Bancos de frases (sin emojis de zorro ni corona)
  var chistes = [
    "¿Qué le dice un pato a otro? ¡Estamos empatados!",
    "¿Cuál es el pez más divertido? ¡El pez-taso!",
    "¿Qué hace una abeja en el gimnasio? ¡Zum-ba!",
    "¿Por qué los pájaros no usan Facebook? ¡Porque ya tienen Twitter!"
  ];
  var datosCuriosos = [
    "¿Sabías que el corazón de un colibrí late hasta mil veces por minuto?",
    "¡En el espacio no hay sonido! Todo es súper silencioso.",
    "¿Sabías que las vacas tienen mejores amigos?",
    "¡Los pulpos tienen tres corazones! ¿Increíble no?"
  ];

  function crear() {
    if (document.getElementById('mascota')) return;
    inyectarCSS();

    el = document.createElement('div');
    el.id = 'mascota';
    el.className = 'mascota-premium';
    el.innerHTML =
      '<div class="mascota-burbuja" id="mascota-burbuja"></div>' +
      '<button class="mascota-cuerpo" id="mascota-cuerpo" aria-label="Hablar con Buggy" title="¡Tocame!">🤖</button>';
    document.body.appendChild(el);
    burbuja = document.getElementById('mascota-burbuja');

    document.getElementById('mascota-cuerpo').addEventListener('click', function () {
      if (window.EK && EK.Audio && EK.Audio.click) EK.Audio.click();
      reiniciarInactividad();

      if (window.EK && EK.Voz && EK.Voz.ultimoTexto && document.querySelector('.screen:not(.hidden) .quiz-head')) {
        if (typeof EK.Voz.hablar === 'function') EK.Voz.hablar(EK.Voz.ultimoTexto);
        decir("¡Te lo repito! Escuchá con atención.");
      } else {
        var aleatorio = Math.random();
        if (aleatorio < 0.3) {
          decir('¡Hola! Soy ' + nombre + '. ¡Elegí un mundo para jugar!');
        } else if (aleatorio < 0.6) {
          decir(chistes[Math.floor(Math.random() * chistes.length)], 4000);
        } else {
          decir(datosCuriosos[Math.floor(Math.random() * datosCuriosos.length)], 4500);
        }
      }
    });

    reiniciarInactividad();
    document.addEventListener('click', reiniciarInactividad);
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
    }, duracion || 3500);

    if (window.EK && EK.Voz) {
      var textoLimpio = texto.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
      if (typeof EK.Voz.leer === 'function') EK.Voz.leer(textoLimpio);
      else if (typeof EK.Voz.hablar === 'function') EK.Voz.hablar(textoLimpio);
    }
  }

  function reaccionar(tipo) {
    if (!el) crear();
    el.classList.remove('reacciona-bien', 'reacciona-mal');
    void el.offsetWidth;

    if (tipo === 'bien') {
      el.classList.add('reacciona-bien');
      var frases = ['¡Excelente!', '¡Muy bien!', '¡Sos un genio!', '¡Increíble!', '¡Así se hace!'];
      decir(frases[Math.floor(Math.random() * frases.length)], 2500);
    } else {
      el.classList.add('reacciona-mal');
      var frasesMal = ['¡Casi! Intentá de nuevo', 'No pasa nada, ¡vos podés!', '¡Muy cerca!', 'Otra vez va'];
      decir(frasesMal[Math.floor(Math.random() * frasesMal.length)], 2500);
    }
  }

  function saludoInicial() {
    crear();
    var hora = new Date().getHours();
    var saludo = hora < 12 ? '¡Buenos días!' : hora < 19 ? '¡Buenas tardes!' : '¡Buenas noches!';
    setTimeout(function () { decir(saludo + ' Soy ' + nombre + '. ¡Vamos a aprender jugando!', 4000); }, 800);
  }

  function reiniciarInactividad() {
    if (timerInactividad) clearTimeout(timerInactividad);
    timerInactividad = setTimeout(function() {
      if (document.querySelector('.screen:not(.hidden)')) {
        var frasesIdle = ['¿Estás ahí?', '¡Dale, vos podés!', '¡Elegí una opción!', 'Pensemos juntos...'];
        decir(frasesIdle[Math.floor(Math.random() * frasesIdle.length)], 3000);
      }
    }, 30000);
  }

  function setNombre(n) {
    nombre = (n || 'Buggy').trim().slice(0, 14) || 'Buggy';
    try { localStorage.setItem(NOMBRE_KEY, nombre); } catch (e) {}
  }
  function getNombre() { return nombre; }

  /* EVOLUCIÓN: Sin zorro, SIN CORONA. Solo emojis de robot/estrella/cohete */
  function actualizarNivel(nivel) {
    if (!el) crear();
    var emojis = ['🤖', '🤖', '⭐', '🚀', '🌟', '🏆'];
    el.querySelector('.mascota-cuerpo').textContent = emojis[Math.min(nivel, emojis.length - 1)] || '🤖';
  }

  var Mascota = { decir: decir, reaccionar: reaccionar, saludoInicial: saludoInicial, setNombre: setNombre, getNombre: getNombre, actualizarNivel: actualizarNivel, crear: crear };
  window.EK = window.EK || {};
  window.EK.Mascota = Mascota;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', crear);
  else crear();
})();
