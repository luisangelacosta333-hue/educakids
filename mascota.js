/* ============================================================
   mascota.js — Mascota virtual "Luna" 🦊 (VERSIÓN ULTRA PREMIUM)
   Acompaña, habla, cuenta chistes, tiene animaciones propias
   e inyecta su propio CSS para garantizar que siempre aparezca.
   ============================================================ */
(function () {
  'use strict';

  var NOMBRE_KEY = 'educakids_mascota_nombre';
  var nombre = 'Luna';
  try { nombre = localStorage.getItem(NOMBRE_KEY) || 'Luna'; } catch (e) {}

  var el = null, burbuja = null, timerBurbuja = null, timerInactividad = null;

  // Inyectamos el CSS directamente desde JS para que NUNCA falle ni se vuelva invisible
  function inyectarCSS() {
    if (document.getElementById('mascota-premium-styles')) return;
    var style = document.createElement('style');
    style.id = 'mascota-premium-styles';
    style.innerHTML = `
      .mascota-premium { position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; align-items: center; pointer-events: none; }
      .mascota-cuerpo { font-size: 65px; background: none; border: none; cursor: pointer; pointer-events: auto; filter: drop-shadow(0px 10px 10px rgba(0,0,0,0.2)); transition: transform 0.2s; animation: flotar 3s ease-in-out infinite; margin-top: 10px; padding: 0; line-height: 1; }
      .mascota-cuerpo:hover { transform: scale(1.15) rotate(5deg); }
      .mascota-cuerpo:active { transform: scale(0.9); }
      .mascota-burbuja { background: #ffffff; color: #333; padding: 12px 18px; border-radius: 20px 20px 0px 20px; border: 4px solid #FF6B6B; font-weight: 700; font-family: 'Fredoka', sans-serif; box-shadow: 0 8px 20px rgba(0,0,0,0.15); opacity: 0; transform: translateY(20px) scale(0.8); transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); pointer-events: auto; text-align: center; max-width: 220px; font-size: 1.1rem; line-height: 1.3; }
      .mascota-burbuja.visible { opacity: 1; transform: translateY(0) scale(1); }
      @keyframes flotar { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      .mascota-premium.reacciona-bien .mascota-cuerpo { animation: saltoBien 0.6s ease; }
      .mascota-premium.reacciona-mal .mascota-cuerpo { animation: tiemblaMal 0.5s ease; }
      @keyframes saltoBien { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-40px) scale(1.2) rotate(10deg); } }
      @keyframes tiemblaMal { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-15px) rotate(-10deg); } 40% { transform: translateX(15px) rotate(10deg); } 60% { transform: translateX(-15px) rotate(-10deg); } 80% { transform: translateX(15px) rotate(10deg); } }
    `;
    document.head.appendChild(style);
  }

  // Bancos de diversión para cuando el niño la toca
  var chistes = [
    "¿Qué le dice un pato a otro pato? ¡Estamos empatados! 🦆",
    "¿Cuál es el pez más divertido? ¡El pez-taso! 🐟",
    "¿Qué hace una abeja en el gimnasio? ¡Zum-ba! 🐝",
    "¿Por qué los pájaros no usan Facebook? ¡Porque ya tienen Twitter! 🐦"
  ];
  var datosCuriosos = [
    "¿Sabías que los zorros escuchan un reloj a 30 metros de distancia? 🦊",
    "¿Sabías que el corazón de un colibrí late hasta mil veces por minuto? ❤️",
    "¡En el espacio no hay sonido! Todo es súper silencioso. 🌌",
    "¿Sabías que las vacas tienen mejores amigos? 🐮"
  ];

  function crear() {
    if (document.getElementById('mascota')) return;
    inyectarCSS();
    
    el = document.createElement('div');
    el.id = 'mascota';
    el.className = 'mascota-premium';
    el.innerHTML =
      '<div class="mascota-burbuja" id="mascota-burbuja"></div>' +
      '<button class="mascota-cuerpo" id="mascota-cuerpo" aria-label="Hablar con Luna" title="¡Tocame!">🦊</button>';
    document.body.appendChild(el);
    burbuja = document.getElementById('mascota-burbuja');
    
    // Interacción al tocar la mascota
    document.getElementById('mascota-cuerpo').addEventListener('click', function () {
      if (EK.Audio && EK.Audio.click) EK.Audio.click();
      reiniciarInactividad();
      
      // Si hay una instrucción activa en un juego, la repite
      if (window.EK && EK.Voz && EK.Voz.ultimoTexto && document.querySelector('.screen:not(.hidden) .quiz-head')) {
        EK.Voz.hablar(EK.Voz.ultimoTexto);
        decir("¡Te lo repito! Escuchá con atención.");
      } else {
        // Si está en el menú, dice cosas divertidas al azar
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
    
    // Llama a la voz si está disponible, limpiando emojis para que no los lea
    if (window.EK && EK.Voz) {
      var textoLimpio = texto.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
      if (typeof EK.Voz.leer === 'function') EK.Voz.leer(textoLimpio);
      else if (typeof EK.Voz.hablar === 'function') EK.Voz.hablar(textoLimpio);
    }
  }

  function reaccionar(tipo) {
    if (!el) crear();
    el.classList.remove('reacciona-bien', 'reacciona-mal');
    void el.offsetWidth; // Reflow para reiniciar la animación CSS
    
    if (tipo === 'bien') {
      el.classList.add('reacciona-bien');
      var frases = ['¡Excelente! ⭐', '¡Muy bien!', '¡Sos un genio!', '¡Increíble! 🌟', '¡Así se hace!'];
      decir(frases[Math.floor(Math.random() * frases.length)], 2500);
    } else {
      el.classList.add('reacciona-mal');
      var frasesMal = ['¡Casi! Intentá de nuevo 💪', 'No pasa nada, ¡vos podés!', '¡Muy cerca!', 'Otra vez va 😊'];
      decir(frasesMal[Math.floor(Math.random() * frasesMal.length)], 2500);
    }
  }

  function saludoInicial() {
    crear();
    var hora = new Date().getHours();
    var saludo = hora < 12 ? '¡Buenos días!' : hora < 19 ? '¡Buenas tardes!' : '¡Buenas noches!';
    setTimeout(function () { decir(saludo + ' Soy ' + nombre + '. ¡Vamos a aprender jugando! 🚀', 4000); }, 800);
  }

  // Si el niño no toca la pantalla por 30 segundos, Luna lo motiva
  function reiniciarInactividad() {
    if (timerInactividad) clearTimeout(timerInactividad);
    timerInactividad = setTimeout(function() {
      if (document.querySelector('.screen:not(.hidden)')) {
        var frasesIdle = ['¿Estás ahí? 👀', '¡Dale, vos podés!', '¡Elegí una opción!', 'Pensemos juntos... 🤔'];
        decir(frasesIdle[Math.floor(Math.random() * frasesIdle.length)], 3000);
      }
    }, 30000); // 30 segundos
  }

  function setNombre(n) {
    nombre = (n || 'Luna').trim().slice(0, 14) || 'Luna';
    try { localStorage.setItem(NOMBRE_KEY, nombre); } catch (e) {}
  }
  function getNombre() { return nombre; }

  /* EVOLUCIÓN: Según el nivel del niño, Luna se viste diferente */
  function actualizarNivel(nivel) {
    if (!el) crear();
    // Nivel 1: Normal, Nivel 2: Estudiosa, Nivel 3: Mágica, Nivel 4: Espacial, Nivel 5: Super, Nivel 6+: Reina
    var emojis = ['🦊', '🦊👓', '🦊🎩', '🦊🚀', '🦊🦸‍♀️', '🦊👑'];
    el.querySelector('.mascota-cuerpo').textContent = emojis[Math.min(nivel, emojis.length - 1)] || '🦊';
  }

  var Mascota = { decir: decir, reaccionar: reaccionar, saludoInicial: saludoInicial, setNombre: setNombre, getNombre: getNombre, actualizarNivel: actualizarNivel, crear: crear };
  window.EK = window.EK || {};
  window.EK.Mascota = Mascota;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', crear);
  else crear();
})();
