/* ============================================================
   minijuegos-super-premium.js — Mundo de Juegos (18 minijuegos)
   REEMPLAZA a minijuegos.js. Subir SOLO este archivo.
   MANTIENE API: window.EK.Juegos.iniciar(id) / .LISTA
   NUEVO SUPER PREMIUM:
   ✅ +8 juegos modernos y adictivos: Snake · 2048 · Atrapa-topos ·
      Simón dice · Flappy · Tic-Tac-Toe vs IA · Quiz relámpago · Preguntados
   ✅ Sistema de COMBO x2/x3/x4 por racha de aciertos
   ✅ Vidas (❤️❤️❤️) · Niveles con dificultad creciente · Puntaje
   ✅ High scores guardados en localStorage · Récord personal
   ✅ Confeti · Sonidos · Barra de progreso · Pausa · Game over con stats
   ✅ CSS premium con animaciones (pop, flotar, shake, pulse)
   ✅ EK.* defensivos (no rompe si EK no existe) · Voz latina es-MX
   ============================================================ */
(function () {
  'use strict';

  /* ---------- helpers defensivos ---------- */
  function barajar(arr) {
    if (window.EK && EK.Engine && typeof EK.Engine.barajar === 'function') return EK.Engine.barajar(arr);
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function esc(s) {
    if (window.EK && EK.Engine && typeof EK.Engine.escapeHtml === 'function') return EK.Engine.escapeHtml(s);
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function snd(nombre) {
    try { if (window.EK && EK.Audio && typeof EK.Audio[nombre] === 'function') EK.Audio[nombre](); else if (window.EK && EK.Audio && typeof EK.Audio.click === 'function') EK.Audio.click(); } catch (e) { }
  }
  function hablar(texto) {
    try {
      var limpio = String(texto).replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
      if (window.EK && EK.Voz) {
        if (typeof EK.Voz.leer === 'function') { EK.Voz.leer(limpio); return; }
        if (typeof EK.Voz.hablar === 'function') { EK.Voz.hablar(limpio); return; }
      }
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(limpio);
        u.lang = 'es-MX'; u.rate = 0.95; u.pitch = 1.05;
        var vs = speechSynthesis.getVoices() || [];
        var pref = vs.filter(function (v) { return (v.lang || '').toLowerCase().indexOf('es') === 0; });
        if (pref.length) u.voice = pref[0];
        speechSynthesis.speak(u);
      }
    } catch (e) { }
  }
  function aviso(msg) {
    try { if (window.EK && EK.App && EK.App.mostrarAviso) { EK.App.mostrarAviso(msg); return; } } catch (e) { }
    var t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;left:50%;top:18px;transform:translateX(-50%);background:linear-gradient(135deg,#4D96FF,#A55EEA);color:#fff;padding:10px 22px;border-radius:999px;z-index:99999;font-family:sans-serif;font-size:14px;font-weight:800;box-shadow:0 6px 20px rgba(77,150,255,.4);opacity:0;transition:opacity .3s;';
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.style.opacity = '1'; });
    setTimeout(function () { t.style.opacity = '0'; setTimeout(function () { t.remove(); }, 300); }, 2000);
  }
  function lanzarConfeti() {
    var colores = ['#FF9F43', '#FF6B9D', '#4D96FF', '#00B894', '#FFD43B', '#A55EEA', '#21C39A'];
    for (var i = 0; i < 60; i++) {
      var c = document.createElement('div');
      c.style.cssText = 'position:fixed;width:8px;height:8px;top:-10px;left:' + (Math.random() * 100) + 'vw;background:' + colores[i % colores.length] + ';border-radius:2px;z-index:99998;pointer-events:none;animation:mj-conf-fall ' + (1.5 + Math.random() * 1.5) + 's linear forwards;animation-delay:' + (Math.random() * 0.5) + 's;';
      document.body.appendChild(c);
      (function (el) { setTimeout(function () { el.remove(); }, 3500); })(c);
    }
  }

  /* ---------- CSS premium inyectado ---------- */
  (function () {
    if (document.getElementById('mj-css-premium')) return;
    var st = document.createElement('style');
    st.id = 'mj-css-premium';
    st.textContent = [
      '@keyframes mj-conf-fall{to{transform:translateY(105vh) rotate(720deg);opacity:0;}}',
      '@keyframes mj-pop{0%{transform:scale(.5);opacity:0;}60%{transform:scale(1.1);}100%{transform:scale(1);opacity:1;}}',
      '@keyframes mj-flotar{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}',
      '@keyframes mj-shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-6px);}75%{transform:translateX(6px);}}',
      '@keyframes mj-pulse{0%{box-shadow:0 0 0 0 rgba(255,107,107,.6);}70%{box-shadow:0 0 0 14px rgba(255,107,107,0);}100%{box-shadow:0 0 0 0 rgba(255,107,107,0);}}',
      '@keyframes mj-bounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);}}',
      '@keyframes mj-spin{to{transform:rotate(360deg);}}',
      '@keyframes mj-glow{0%,100%{box-shadow:0 0 10px rgba(77,150,255,.5);}50%{box-shadow:0 0 25px rgba(77,150,255,.9);}}',
      '.mj-screen{display:flex;flex-direction:column;height:100%;background:linear-gradient(160deg,#eef3ff 0%,#f6f0ff 50%,#fff0f6 100%);font-family:"Comic Sans MS","Segoe UI",system-ui,sans-serif;overflow-y:auto;}',
      '.mj-head{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#fff;border-bottom:2px solid #e6ebf5;box-shadow:0 2px 8px rgba(60,80,140,.08);}',
      '.mj-title{font-weight:900;color:#4D96FF;font-size:17px;display:flex;align-items:center;gap:6px;}',
      '.mj-stats{display:flex;gap:8px;align-items:center;font-weight:800;font-size:13px;}',
      '.mj-stat{background:#f0f3ff;border-radius:12px;padding:4px 10px;color:#4D96FF;}',
      '.mj-stat.combo{background:linear-gradient(135deg,#FFD43B,#FF9F43);color:#5B3A00;animation:mj-pulse 1.5s infinite;}',
      '.mj-lives{font-size:16px;letter-spacing:2px;}',
      '.mj-back{border:none;background:#eef2fb;color:#445;border-radius:12px;padding:8px 12px;font-size:17px;cursor:pointer;font-weight:900;}',
      '.mj-grid-juegos{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;padding:14px;}',
      '.mj-card-juego{background:#fff;border-radius:18px;padding:16px 10px;text-align:center;cursor:pointer;box-shadow:0 4px 14px rgba(60,80,140,.12);transition:all .2s;border:3px solid transparent;position:relative;overflow:hidden;}',
      '.mj-card-juego:hover{transform:translateY(-4px) scale(1.03);border-color:#4D96FF;box-shadow:0 8px 24px rgba(77,150,255,.3);}',
      '.mj-card-juego:active{transform:scale(.95);}',
      '.mj-card-juego .emoji{font-size:40px;display:block;animation:mj-flotar 3s infinite;}',
      '.mj-card-juego .nombre{font-weight:900;color:#334;font-size:14px;margin-top:6px;display:block;}',
      '.mj-card-juego .desc{font-size:11px;color:#889;font-weight:600;display:block;margin-top:2px;}',
      '.mj-card-juego .nuevo{position:absolute;top:6px;right:6px;background:linear-gradient(135deg,#FF6B9D,#FF9F43);color:#fff;font-size:9px;font-weight:900;padding:2px 7px;border-radius:999px;}',
      '.mj-card-juego .record{position:absolute;top:6px;left:6px;background:linear-gradient(135deg,#FFD43B,#FF9F43);color:#5B3A00;font-size:9px;font-weight:900;padding:2px 6px;border-radius:999px;}',
      '.mj-pregunta-card{background:#fff;border-radius:22px;padding:22px;margin:14px;text-align:center;box-shadow:0 6px 20px rgba(60,80,140,.15);animation:mj-pop .4s ease;}',
      '.mj-pregunta-texto{font-size:20px;font-weight:900;color:#334;margin-bottom:10px;}',
      '.mj-pregunta-texto.big-op{font-size:42px;color:#4D96FF;letter-spacing:2px;}',
      '.mj-secuencia{font-size:28px;font-weight:900;color:#A55EEA;letter-spacing:4px;}',
      '.mj-signo{color:#FF6B9D;animation:mj-pulse 1s infinite;}',
      '.mj-opciones{display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:10px;padding:0 14px;}',
      '.mj-opcion{border:none;background:#fff;border-radius:16px;padding:16px 10px;font-size:18px;font-weight:900;color:#334;cursor:pointer;box-shadow:0 4px 12px rgba(60,80,140,.12);transition:all .15s;font-family:inherit;}',
      '.mj-opcion:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(77,150,255,.3);}',
      '.mj-opcion:active{transform:scale(.94);}',
      '.mj-opcion.ok{background:linear-gradient(135deg,#00B894,#55EFC4)!important;color:#fff!important;animation:mj-pop .3s ease;}',
      '.mj-opcion.mal{background:linear-gradient(135deg,#FA5252,#FF6B6B)!important;color:#fff!important;animation:mj-shake .4s ease;}',
      '.mj-opcion:disabled{opacity:.6;cursor:default;}',
      '.mj-feedback{text-align:center;margin:12px;font-weight:900;font-size:17px;min-height:26px;}',
      '.mj-feedback.ok{color:#00B894;animation:mj-pop .3s ease;}',
      '.mj-feedback.mal{color:#FA5252;}',
      '.mj-progress{height:10px;background:#e0e6f0;border-radius:999px;margin:0 14px;overflow:hidden;}',
      '.mj-progress-fill{height:100%;background:linear-gradient(90deg,#4D96FF,#A55EEA,#FF6B9D);border-radius:999px;transition:width .4s ease;}',
      '.mj-gameover{position:fixed;inset:0;background:rgba(20,28,60,.7);z-index:500;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);}',
      '.mj-gameover-card{background:#fff;border-radius:24px;padding:28px;text-align:center;max-width:320px;width:90%;animation:mj-pop .5s ease;box-shadow:0 20px 60px rgba(0,0,0,.4);}',
      '.mj-gameover-card h2{margin:0 0 8px;color:#4D96FF;font-size:24px;}',
      '.mj-gameover-stats{display:flex;justify-content:space-around;margin:16px 0;}',
      '.mj-gameover-stat{text-align:center;}',
      '.mj-gameover-stat .num{font-size:28px;font-weight:900;color:#FF9F43;display:block;}',
      '.mj-gameover-stat .lbl{font-size:11px;color:#889;font-weight:700;}',
      '.mj-gameover-btns{display:flex;gap:8px;margin-top:14px;}',
      '.mj-btn-pri{flex:1;border:none;background:linear-gradient(135deg,#4D96FF,#A55EEA);color:#fff;border-radius:14px;padding:12px;font-weight:900;font-size:15px;cursor:pointer;font-family:inherit;box-shadow:0 4px 14px rgba(77,150,255,.4);}',
      '.mj-btn-sec{flex:1;border:none;background:#eef2fb;color:#445;border-radius:14px;padding:12px;font-weight:900;font-size:15px;cursor:pointer;font-family:inherit;}',
      '.mj-btn-pri:active,.mj-btn-sec:active{transform:scale(.95);}',
      '.mj-timer{font-weight:900;color:#FA5252;font-size:16px;animation:mj-pulse 1s infinite;}',
      '.mj-canvas-wrap{display:flex;justify-content:center;padding:10px;}',
      '.mj-canvas{background:#1a1a2e;border-radius:14px;box-shadow:0 8px 24px rgba(0,0,0,.3);touch-action:none;}',
      '.mj-simon-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;max-width:280px;margin:14px auto;}',
      '.mj-simon-btn{aspect-ratio:1;border:none;border-radius:20px;cursor:pointer;transition:all .1s;box-shadow:0 4px 12px rgba(0,0,0,.2);}',
      '.mj-simon-btn.active{transform:scale(1.08);filter:brightness(1.6);box-shadow:0 0 30px currentColor;}',
      '.mj-simon-btn:active{transform:scale(.95);}',
      '.mj-whack-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:340px;margin:14px auto;padding:0 14px;}',
      '.mj-topo-hole{background:linear-gradient(180deg,#8B5A2B,#5D3A1A);border-radius:50%;aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:0;cursor:pointer;transition:font-size .15s;overflow:hidden;position:relative;}',
      '.mj-topo-hole.up{font-size:44px;}',
      '.mj-topo-hole.bonked{animation:mj-shake .3s ease;}',
      '.mj-ttt-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:260px;margin:14px auto;}',
      '.mj-ttt-cell{aspect-ratio:1;background:#fff;border:none;border-radius:14px;font-size:36px;font-weight:900;cursor:pointer;box-shadow:0 4px 12px rgba(60,80,140,.12);font-family:inherit;transition:all .15s;}',
      '.mj-ttt-cell:hover{background:#f0f3ff;}',
      '.mj-ttt-cell.win{background:linear-gradient(135deg,#00B894,#55EFC4);color:#fff;animation:mj-pop .4s ease;}',
      '.mj-2048-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-width:300px;margin:14px auto;padding:10px;background:#BBADA0;border-radius:14px;}',
      '.mj-2048-cell{aspect-ratio:1;background:#CDC1B4;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:20px;font-family:inherit;color:#776E65;}',
      '.mj-flappy-wrap{position:relative;display:flex;justify-content:center;padding:10px;}',
      '.mj-quiz-cat{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:10px;}',
      '.mj-quiz-cat button{border:none;border-radius:999px;padding:6px 14px;font-weight:800;font-size:12px;cursor:pointer;font-family:inherit;background:#eef2fb;color:#445;}',
      '.mj-quiz-cat button.sel{background:linear-gradient(135deg,#FF9F43,#FF6B9D);color:#fff;}',
      '@media (max-width:480px){.mj-grid-juegos{grid-template-columns:repeat(2,1fr);}.mj-pregunta-texto.big-op{font-size:32px;}}'
    ].join('');
    document.head.appendChild(st);
  })();

  /* ---------- estado global del juego ---------- */
  var timers = [];
  function limpiarTimers() { timers.forEach(clearTimeout); timers = []; }
  function despues(ms, fn) { var t = setTimeout(fn, ms); timers.push(t); return t; }
  var intervalos = [];
  function limpiarIntervalos() { intervalos.forEach(clearInterval); intervalos = []; }
  function cada(ms, fn) { var t = setInterval(fn, ms); intervalos.push(t); return t; }

  var estadoJuego = { id: null, score: 0, combo: 0, vidas: 3, nivel: 1, record: 0 };
  function cargarRecord(id) {
    try { return Number(localStorage.getItem('mj_record_' + id) || 0); } catch (e) { return 0; }
  }
  function guardarRecord(id, score) {
    try {
      var prev = cargarRecord(id);
      if (score > prev) { localStorage.setItem('mj_record_' + id, String(score)); return true; }
    } catch (e) { }
    return false;
  }
  function resetEstado(id) {
    estadoJuego.id = id; estadoJuego.score = 0; estadoJuego.combo = 0;
    estadoJuego.vidas = 3; estadoJuego.nivel = 1; estadoJuego.record = cargarRecord(id);
  }
  function acierto(puntosBase) {
    estadoJuego.combo++;
    var mult = estadoJuego.combo >= 8 ? 4 : estadoJuego.combo >= 5 ? 3 : estadoJuego.combo >= 3 ? 2 : 1;
    var pts = puntosBase * mult;
    estadoJuego.score += pts;
    snd('correcto');
    return { pts: pts, mult: mult, combo: estadoJuego.combo };
  }
  function error() {
    estadoJuego.combo = 0;
    estadoJuego.vidas--;
    snd('error');
    return estadoJuego.vidas <= 0;
  }
  function statsHTML(extra) {
    var vidas = '❤️'.repeat(Math.max(0, estadoJuego.vidas)) + '🖤'.repeat(Math.max(0, 3 - estadoJuego.vidas));
    var comboStr = estadoJuego.combo >= 3 ? '<span class="mj-stat combo">🔥x' + (estadoJuego.combo >= 8 ? 4 : estadoJuego.combo >= 5 ? 3 : 2) + '</span>' : '';
    return '<div class="mj-stats"><span class="mj-stat">⭐' + estadoJuego.score + '</span>' + comboStr + '<span class="mj-lives">' + vidas + '</span>' + (extra || '') + '</div>';
  }
  function headerVolver(titulo, emoji, extra) {
    return '<div class="mj-head"><button class="mj-back" data-act="volver">←</button>' +
      '<div class="mj-title">' + emoji + ' ' + esc(titulo) + '</div>' + statsHTML(extra) + '</div>';
  }
  function bindVolver(app) {
    var b = app.querySelector('[data-act="volver"]');
    if (b) b.addEventListener('click', function () { limpiarTimers(); limpiarIntervalos(); snd('click'); try { if (window.EK && EK.App && EK.App.ir) EK.App.ir('mundo', { id: 'juegos' }); } catch (e) { mostrarMenu(); } });
  }

  var frasesAcierto = ['¡Muy bien!', '¡Genial!', '¡Excelente!', '¡Rápido!', '¡Sos un genio!', '¡Increíble!', '¡Perfecto!', '¡Bravo!'];
  var frasesError = ['¡Ups! Intenta de nuevo.', '¡Casi! Sigue buscando.', '¡No te rindas!', 'Ese no es.', '¡Casi lo lográs!'];
  function randomAcierto() { return frasesAcierto[Math.floor(Math.random() * frasesAcierto.length)]; }
  function randomError() { return frasesError[Math.floor(Math.random() * frasesError.length)]; }

  function gameOver(nombre, emoji, app) {
    limpiarTimers(); limpiarIntervalos();
    var esRecord = guardarRecord(estadoJuego.id, estadoJuego.score);
    try { if (window.EK && EK.Store) { EK.Store.addEstrellas && EK.Store.addEstrellas(Math.floor(estadoJuego.score / 10)); EK.Store.addActividad && EK.Store.addActividad(); } } catch (e) { }
    lanzarConfeti();
    hablar('¡Juego terminado! Conseguiste ' + estadoJuego.score + ' puntos.');
    var go = document.createElement('div');
    go.className = 'mj-gameover';
    go.innerHTML = '<div class="mj-gameover-card">' +
      '<div style="font-size:56px;animation:mj-bounce 1s infinite;">' + emoji + '</div>' +
      '<h2>' + (esRecord ? '🏆 ¡Nuevo récord!' : '¡Bien jugado!') + '</h2>' +
      '<div class="mj-gameover-stats">' +
      '<div class="mj-gameover-stat"><span class="num">' + estadoJuego.score + '</span><span class="lbl">Puntos</span></div>' +
      '<div class="mj-gameover-stat"><span class="num">' + estadoJuego.nivel + '</span><span class="lbl">Nivel</span></div>' +
      '<div class="mj-gameover-stat"><span class="num">' + Math.max(estadoJuego.record, estadoJuego.score) + '</span><span class="lbl">Récord</span></div>' +
      '</div>' +
      '<div class="mj-gameover-btns">' +
      '<button class="mj-btn-sec" data-go-again>🔄 Otra vez</button>' +
      '<button class="mj-btn-pri" data-go-menu>🎮 Menú</button>' +
      '</div></div>';
    document.body.appendChild(go);
    go.querySelector('[data-go-again]').addEventListener('click', function () { snd('click'); go.remove(); Juegos.iniciar(estadoJuego.id); });
    go.querySelector('[data-go-menu]').addEventListener('click', function () { snd('click'); go.remove(); mostrarMenu(); });
  }

  function ganarJuego(nombre, emoji) {
    limpiarTimers(); limpiarIntervalos();
    var esRecord = guardarRecord(estadoJuego.id, estadoJuego.score);
    try { if (window.EK && EK.Store) { EK.Store.addEstrellas && EK.Store.addEstrellas(20 + Math.floor(estadoJuego.score / 5)); EK.Store.addJuegoGanado && EK.Store.addJuegoGanado(); EK.Store.addActividad && EK.Store.addActividad(); var n = EK.Store.revisarMedallas && EK.Store.revisarMedallas(); if (n && n.length) snd('medalla'); } } catch (e) { }
    try { if (window.EK && EK.App) EK.App.actualizarTopbar && EK.App.actualizarTopbar(); } catch (e) { }
    lanzarConfeti();
    hablar('¡Felicidades! Ganaste el juego de ' + nombre + ' con ' + estadoJuego.score + ' puntos.');
    var app = document.getElementById('app');
    app.innerHTML = '<div class="mj-screen"><div style="padding:30px;text-align:center;">' +
      '<div style="font-size:80px;animation:mj-bounce 1s infinite;">' + emoji + '</div>' +
      '<h2 style="color:#4D96FF;font-size:28px;margin:10px 0;">¡Ganaste! 🎉</h2>' +
      (esRecord ? '<div style="background:linear-gradient(135deg,#FFD43B,#FF9F43);color:#5B3A00;font-weight:900;padding:8px 16px;border-radius:999px;display:inline-block;margin:8px 0;">🏆 ¡Nuevo récord: ' + estadoJuego.score + ' pts!</div>' : '<div style="font-weight:800;color:#667;">⭐ ' + estadoJuego.score + ' puntos</div>') +
      '<div style="margin-top:20px;display:flex;gap:10px;justify-content:center;">' +
      '<button class="mj-btn-sec" data-act="jugar" style="max-width:160px;">🔄 Jugar de nuevo</button>' +
      '<button class="mj-btn-pri" data-act="menu" style="max-width:160px;">🎮 Más juegos</button>' +
      '</div></div></div>';
    app.querySelector('[data-act="jugar"]').addEventListener('click', function () { snd('click'); Juegos.iniciar(estadoJuego.id); });
    app.querySelector('[data-act="menu"]').addEventListener('click', function () { snd('click'); mostrarMenu(); });
  }

  /* ============================================================
     JUEGOS MEJORADOS (10 originales + combo, vidas, niveles)
     ============================================================ */

  /* 1) MEMORIA con niveles */
  function memoria() {
    resetEstado('memoria');
    var emojisPool = ['🍎', '🌟', '🎈', '🐶', '🚗', '🎵', '🌸', '⚽', '🦋', '🍕', '🚀', '🤖', '💎', '🎨', '🎸', '🍉', '🐢', '🐙', '🦄', '🍩', '🌞', '🍓', '🚁', '🏀', '🧸', '🦁', '🥑', '🛸', '🎲', '🎯'];
    var nivel = 1, encontradas = 0, mov = 0;
    var app = document.getElementById('app');
    hablar('Encontrá todos los pares iguales.');
    function render() {
      var numPares = Math.min(4 + nivel, 12);
      var pares = barajar(emojisPool).slice(0, numPares);
      var cartas = barajar(pares.concat(pares));
      var volteadas = [], lock = false;
      encontradas = 0;
      app.innerHTML = '<div class="mj-screen">' + headerVolver('Memoria Nivel ' + nivel, '🧠') +
        '<div class="mj-progress"><div class="mj-progress-fill" style="width:0%"></div></div>' +
        '<div class="mj-grid-juegos" id="mem-grid" style="grid-template-columns:repeat(' + (numPares > 8 ? 4 : 3) + ',1fr);"></div>' +
        '<div class="mj-feedback">Movimientos: ' + mov + '</div></div>';
      bindVolver(app);
      var grid = document.getElementById('mem-grid');
      cartas.forEach(function (em) {
        var c = document.createElement('button');
        c.className = 'mj-opcion'; c.dataset.em = em; c.style.fontSize = '28px'; c.style.padding = '14px 4px';
        c.textContent = '❓';
        c.addEventListener('click', function () {
          if (lock || c.classList.contains('ok') || c.dataset.volteada) return;
          snd('flip'); c.textContent = em; c.dataset.volteada = '1'; volteadas.push(c);
          if (volteadas.length === 2) {
            mov++; lock = true;
            var a = volteadas[0], b = volteadas[1];
            if (a.dataset.em === b.dataset.em) {
              var r = acierto(10);
              a.classList.add('ok'); b.classList.add('ok'); encontradas++;
              app.querySelector('.mj-feedback').innerHTML = '<span class="mj-feedback ok">' + randomAcierto() + ' +' + r.pts + (r.mult > 1 ? ' 🔥x' + r.mult : '') + '</span>';
              app.querySelector('.mj-head .mj-stats').outerHTML = statsHTML().replace('<div class="mj-stats">', '<div class="mj-stats">');
              var prog = (encontradas / numPares * 100);
              app.querySelector('.mj-progress-fill').style.width = prog + '%';
              volteadas = []; lock = false;
              if (encontradas === numPares) {
                despues(600, function () { nivel++; if (nivel > 4) ganarJuego('Memoria', '🧠'); else { hablar('¡Nivel ' + nivel + '!'); render(); } });
              }
            } else {
              if (error()) { despues(500, function () { gameOver('Memoria', '🧠', app); }); return; }
              despues(900, function () { a.textContent = '❓'; b.textContent = '❓'; delete a.dataset.volteada; delete b.dataset.volteada; volteadas = []; lock = false; });
            }
          }
        });
        grid.appendChild(c);
      });
    }
    render();
  }

  /* 2) SECUENCIAS con niveles */
  function secuencias() {
    resetEstado('secuencias');
    var ronda = 0, total = 8, lock = false;
    var app = document.getElementById('app');
    hablar('¿Qué número sigue en la secuencia?');
    function render() {
      if (ronda >= total) { ganarJuego('Secuencias', '🔢'); return; }
      var dificultad = estadoJuego.nivel;
      var ascendente = Math.random() > 0.5;
      var paso = Math.floor(Math.random() * (3 + dificultad * 2)) + 2;
      var inicio = ascendente ? Math.floor(Math.random() * 10) + 1 : Math.floor(Math.random() * 20) + 30;
      var seq = [];
      for (var i = 0; i < 4; i++) seq.push(ascendente ? inicio + paso * i : inicio - paso * i);
      var respuesta = ascendente ? inicio + paso * 4 : inicio - paso * 4;
      var opts = barajar([respuesta, respuesta + paso, Math.max(0, respuesta - paso), respuesta + paso * 2].filter(function (v, i, a) { return a.indexOf(v) === i; }).slice(0, 3).map(String));
      lock = false;
      app.innerHTML = '<div class="mj-screen">' + headerVolver('Secuencias', '🔢', '<span class="mj-stat">' + (ronda + 1) + '/' + total + '</span>') +
        '<div class="mj-progress"><div class="mj-progress-fill" style="width:' + (ronda / total * 100) + '%"></div></div>' +
        '<div class="mj-pregunta-card"><div class="mj-pregunta-texto">¿Qué número sigue?</div><div class="mj-secuencia">' + seq.join(' · ') + ' · <span class="mj-signo">?</span></div></div>' +
        '<div class="mj-opciones">' + opts.map(function (o) { return '<button class="mj-opcion">' + o + '</button>'; }).join('') + '</div>' +
        '<div class="mj-feedback" id="feedback"></div></div>';
      bindVolver(app);
      app.querySelectorAll('.mj-opcion').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          hablar(b.textContent);
          var ok = b.textContent === String(respuesta);
          app.querySelectorAll('.mj-opcion').forEach(function (x) { x.disabled = true; if (x.textContent === String(respuesta)) x.classList.add('ok'); else if (x === b) x.classList.add('mal'); });
          var fb = document.getElementById('feedback');
          if (ok) {
            var r = acierto(15);
            fb.innerHTML = '<span class="mj-feedback ok">¡Bien! +' + r.pts + (r.mult > 1 ? ' 🔥x' + r.mult : '') + '</span>';
            if (ronda % 3 === 2) estadoJuego.nivel++;
          } else {
            fb.innerHTML = '<span class="mj-feedback mal">Era el ' + respuesta + '</span>';
            if (error()) { despues(800, function () { gameOver('Secuencias', '🔢', app); }); return; }
          }
          ronda++; despues(1200, render);
        });
      });
    }
    render();
  }

  /* 3) EL DIFERENTE con niveles (más celdas) */
  function diferente() {
    resetEstado('diferente');
    var ronda = 0, total = 8, lock = false;
    var grupos = [['🐶', '🐱'], ['🍎', '🍅'], ['⭐', '🌟'], ['🔴', '🟠'], ['🚗', '🚙'], ['🌸', '🌺'], ['⚽', '🏀'], ['🐟', '🐬'], ['🟢', '🟩'], ['🐝', '🐞'], ['🍔', '🌭'], ['🌞', '🌝'], ['🍏', '🍐'], ['🍓', '🍒'], ['🚲', '🛴'], ['📘', '📗'], ['😀', '😃'], ['🦁', '🐯'], ['🌲', '🌳'], ['🚁', '✈️'], ['🍰', '🧁'], ['🍇', '🫐'], ['🪐', '🌍'], ['🎸', '🎻'], ['💙', '💚'], ['🔺', '🔻'], ['🍋', '🍌'], ['🐸', '🐊']];
    var app = document.getElementById('app');
    hablar('Encontrá la figura que es diferente.');
    function render() {
      if (ronda >= total) { ganarJuego('El diferente', '👀'); return; }
      var numCeldas = estadoJuego.nivel >= 3 ? 16 : estadoJuego.nivel >= 2 ? 12 : 9;
      var cols = numCeldas === 16 ? 4 : 3;
      var par = grupos[Math.floor(Math.random() * grupos.length)];
      var normal = par[0], distinto = par[1], pos = Math.floor(Math.random() * numCeldas);
      var celdas = []; for (var i = 0; i < numCeldas; i++) celdas.push(i === pos ? distinto : normal);
      lock = false;
      app.innerHTML = '<div class="mj-screen">' + headerVolver('El diferente', '👀', '<span class="mj-stat">' + (ronda + 1) + '/' + total + '</span>') +
        '<div class="mj-pregunta-card"><div class="mj-pregunta-texto">¡Encontrá el distinto! 🔍</div></div>' +
        '<div class="mj-opciones" style="grid-template-columns:repeat(' + cols + ',1fr);padding:0 14px;">' + celdas.map(function (c, i) { return '<button class="mj-opcion" data-i="' + i + '" style="font-size:32px;padding:14px 4px;">' + c + '</button>'; }).join('') + '</div>' +
        '<div class="mj-feedback" id="feedback"></div></div>';
      bindVolver(app);
      app.querySelectorAll('.mj-opcion').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          var ok = Number(b.dataset.i) === pos;
          var fb = document.getElementById('feedback');
          if (ok) {
            b.classList.add('ok');
            var r = acierto(10);
            fb.innerHTML = '<span class="mj-feedback ok">¡Lo encontraste! +' + r.pts + (r.mult > 1 ? ' 🔥x' + r.mult : '') + '</span>';
            if (ronda % 3 === 2) estadoJuego.nivel++;
            hablar(randomAcierto());
          } else {
            b.classList.add('mal');
            app.querySelectorAll('.mj-opcion')[pos].classList.add('ok');
            fb.innerHTML = '<span class="mj-feedback mal">¡Ahí estaba!</span>';
            hablar(randomError());
            if (error()) { despues(800, function () { gameOver('El diferente', '👀', app); }); return; }
          }
          ronda++; despues(1100, render);
        });
      });
    }
    render();
  }

  /* 4) CÁLCULO RÁPIDO con timer y combo */
  function rapido() {
    resetEstado('rapido');
    var ronda = 0, total = 10, lock = false, tiempo = 8, timerInt = null;
    var app = document.getElementById('app');
    hablar('Resolvé rápido, tenés 8 segundos por cuenta.');
    function render() {
      if (ronda >= total) { ganarJuego('Cálculo rápido', '⚡'); return; }
      limpiarIntervalos();
      var tipo = Math.floor(Math.random() * 3);
      var a, b, c, signo;
      var dif = estadoJuego.nivel;
      if (tipo === 0) { a = Math.floor(Math.random() * (10 + dif * 5)) + 1; b = Math.floor(Math.random() * (8 + dif * 3)) + 1; c = a + b; signo = '+'; }
      else if (tipo === 1) { a = Math.floor(Math.random() * (15 + dif * 5)) + 5; b = Math.floor(Math.random() * (a - 1)) + 1; c = a - b; signo = '-'; }
      else { a = Math.floor(Math.random() * (6 + dif * 2)) + 2; b = Math.floor(Math.random() * (4 + dif)) + 2; c = a * b; signo = '×'; }
      var opts = barajar([c, c + 1, c - 1, c + 2, Math.max(0, c - 2)].filter(function (v, i, arr) { return arr.indexOf(v) === i; }).slice(0, 3).map(String));
      if (opts.indexOf(String(c)) === -1) opts[0] = String(c);
      opts = barajar(opts);
      lock = false; tiempo = Math.max(4, 8 - dif);
      app.innerHTML = '<div class="mj-screen">' + headerVolver('Cálculo rápido', '⚡', '<span class="mj-timer" id="mj-timer">⏱️' + tiempo + 's</span><span class="mj-stat">' + (ronda + 1) + '/' + total + '</span>') +
        '<div class="mj-pregunta-card"><div class="mj-pregunta-texto big-op">' + a + ' ' + signo + ' ' + b + ' = ?</div></div>' +
        '<div class="mj-opciones">' + opts.map(function (o) { return '<button class="mj-opcion" style="font-size:24px;">' + o + '</button>'; }).join('') + '</div>' +
        '<div class="mj-feedback" id="feedback"></div></div>';
      bindVolver(app);
      timerInt = cada(1000, function () {
        tiempo--;
        var t = document.getElementById('mj-timer');
        if (t) t.textContent = '⏱️' + tiempo + 's';
        if (tiempo <= 0) {
          limpiarIntervalos();
          if (!lock) {
            lock = true;
            app.querySelectorAll('.mj-opcion').forEach(function (x) { x.disabled = true; if (x.textContent === String(c)) x.classList.add('ok'); });
            document.getElementById('feedback').innerHTML = '<span class="mj-feedback mal">¡Se acabó el tiempo! Era ' + c + '</span>';
            if (error()) { despues(1000, function () { gameOver('Cálculo rápido', '⚡', app); }); return; }
            ronda++; despues(1300, render);
          }
        }
      });
      app.querySelectorAll('.mj-opcion').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true; limpiarIntervalos();
          hablar(b.textContent);
          var ok = b.textContent === String(c);
          app.querySelectorAll('.mj-opcion').forEach(function (x) { x.disabled = true; if (x.textContent === String(c)) x.classList.add('ok'); else if (x === b) x.classList.add('mal'); });
          var fb = document.getElementById('feedback');
          if (ok) {
            var bonus = tiempo * 2;
            var r = acierto(20 + bonus);
            fb.innerHTML = '<span class="mj-feedback ok">¡Rápido! +' + r.pts + (r.mult > 1 ? ' 🔥x' + r.mult : '') + '</span>';
            if (ronda % 3 === 2) estadoJuego.nivel++;
          } else {
            fb.innerHTML = '<span class="mj-feedback mal">Era ' + c + '</span>';
            if (error()) { despues(1000, function () { gameOver('Cálculo rápido', '⚡', app); }); return; }
          }
          ronda++; despues(1200, render);
        });
      });
    }
    render();
  }

  /* 5) PATRONES */
  function patrones() {
    resetEstado('patrones');
    var ronda = 0, total = 8, lock = false;
    var pats = [['🔴', '🔵'], ['⭐', '🌙'], ['🍎', '🍌', '🍇'], ['🔺', '🔻'], ['🟢', '🟡', '🔴'], ['🐶', '🐶', '🐱'], ['🚀', '🛸', '🛸'], ['🍕', '🍔', '🍟'], ['🐝', '🐝', '🌸'], ['💙', '💚', '💛', '❤️'], ['🔷', '🔶', '🔷'], ['🌟', '🌙', '🌟', '🌙']];
    var app = document.getElementById('app');
    hablar('Descubrí cuál figura sigue en la serie.');
    function render() {
      if (ronda >= total) { ganarJuego('Patrones', '🔴'); return; }
      var pat = pats[Math.floor(Math.random() * pats.length)];
      var seq = []; for (var i = 0; i < 5; i++) seq.push(pat[i % pat.length]);
      var respuesta = seq[4];
      var otros = barajar(['⭐', '🔵', '🍎', '🌙', '🟢', '🔺', '🐶', '🚀', '🍟', '💙', '🔷'].filter(function (x) { return x !== respuesta; })).slice(0, 2);
      var opts = barajar([respuesta].concat(otros));
      lock = false;
      app.innerHTML = '<div class="mj-screen">' + headerVolver('Patrones', '🔴', '<span class="mj-stat">' + (ronda + 1) + '/' + total + '</span>') +
        '<div class="mj-pregunta-card"><div class="mj-pregunta-texto">¿Qué sigue?</div><div class="mj-secuencia" style="font-size:36px;">' + seq.slice(0, 4).join(' ') + ' <span class="mj-signo">?</span></div></div>' +
        '<div class="mj-opciones">' + opts.map(function (o) { return '<button class="mj-opcion" style="font-size:32px;">' + o + '</button>'; }).join('') + '</div>' +
        '<div class="mj-feedback" id="feedback"></div></div>';
      bindVolver(app);
      app.querySelectorAll('.mj-opcion').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          var ok = b.textContent === respuesta;
          app.querySelectorAll('.mj-opcion').forEach(function (x) { x.disabled = true; if (x.textContent === respuesta) x.classList.add('ok'); else if (x === b) x.classList.add('mal'); });
          var fb = document.getElementById('feedback');
          if (ok) { var r = acierto(15); fb.innerHTML = '<span class="mj-feedback ok">¡Bien! +' + r.pts + (r.mult > 1 ? ' 🔥x' + r.mult : '') + '</span>'; if (ronda % 3 === 2) estadoJuego.nivel++; }
          else { fb.innerHTML = '<span class="mj-feedback mal">Era ' + respuesta + '</span>'; if (error()) { despues(800, function () { gameOver('Patrones', '🔴', app); }); return; } }
          ronda++; despues(1200, render);
        });
      });
    }
    render();
  }

  /* 6) PALABRA LOCA */
  function palabra() {
    resetEstado('palabra');
    var palabras = ['PERRO', 'GATO', 'CASA', 'SOL', 'LUNA', 'FLOR', 'AGUA', 'LIBRO', 'PELOTA', 'ARBOL', 'MESA', 'SILLA', 'AUTO', 'MUNDO', 'TREN', 'RELOJ', 'CIELO', 'NUBE', 'PAJARO', 'QUESO', 'MANGO', 'PIZZA', 'FUEGO', 'HIELO', 'LLAVE', 'VASO', 'PLATO', 'JUEGO', 'MAGIA', 'BARCO', 'LAPIZ', 'TIGRE', 'ELEFANTE', 'MARIPOSA', 'COMPUTADORA'];
    var ronda = 0, total = 8, lock = false;
    var app = document.getElementById('app');
    hablar('Ordená las letras para formar la palabra.');
    function render() {
      if (ronda >= total) { ganarJuego('Palabra loca', '🔤'); return; }
      var p = palabras[Math.floor(Math.random() * palabras.length)];
      var letras = barajar(p.split(''));
      while (letras.join('') === p) letras = barajar(p.split(''));
      var otras = barajar(palabras.filter(function (x) { return x !== p && x.length === p.length; })).slice(0, 2);
      if (otras.length < 2) otras = otras.concat(barajar(palabras.filter(function (x) { return x !== p; })).slice(0, 2 - otras.length));
      var opts = barajar([p].concat(otras));
      lock = false;
      app.innerHTML = '<div class="mj-screen">' + headerVolver('Palabra loca', '🔤', '<span class="mj-stat">' + (ronda + 1) + '/' + total + '</span>') +
        '<div class="mj-pregunta-card"><div class="mj-pregunta-texto">Ordená las letras:</div><div class="mj-secuencia">' + letras.join(' · ') + '</div></div>' +
        '<div class="mj-opciones">' + opts.map(function (o) { return '<button class="mj-opcion" style="font-size:16px;">' + o + '</button>'; }).join('') + '</div>' +
        '<div class="mj-feedback" id="feedback"></div></div>';
      bindVolver(app);
      app.querySelectorAll('.mj-opcion').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          hablar(b.textContent);
          var ok = b.textContent === p;
          app.querySelectorAll('.mj-opcion').forEach(function (x) { x.disabled = true; if (x.textContent === p) x.classList.add('ok'); else if (x === b) x.classList.add('mal'); });
          var fb = document.getElementById('feedback');
          if (ok) { var r = acierto(15); fb.innerHTML = '<span class="mj-feedback ok">¡Correcto! +' + r.pts + (r.mult > 1 ? ' 🔥x' + r.mult : '') + '</span>'; if (ronda % 3 === 2) estadoJuego.nivel++; }
          else { fb.innerHTML = '<span class="mj-feedback mal">Era ' + p + '</span>'; hablar(randomError()); if (error()) { despues(1000, function () { gameOver('Palabra loca', '🔤', app); }); return; } }
          ronda++; despues(1400, render);
        });
      });
    }
    render();
  }

  /* 7) MEMORIA VISUAL */
  function visual() {
    resetEstado('visual');
    var emojis = ['🍎', '🌟', '🎈', '🐶', '🚗', '🎵', '🌸', '⚽', '🦋', '🍕', '🐱', '🎨', '🚀', '💎', '🍉', '🦄', '🚁', '🎸', '🐢', '🐙', '🥑', '🍩', '🦁', '🎯'];
    var ronda = 0, total = 6;
    var app = document.getElementById('app');
    hablar('Mirá con atención, luego desaparecerán.');
    function render() {
      if (ronda >= total) { ganarJuego('Memoria visual', '🧩'); return; }
      var numObj = Math.min(3 + estadoJuego.nivel, 6);
      var grupo = barajar(emojis).slice(0, numObj);
      var pregunta = grupo[Math.floor(Math.random() * grupo.length)];
      var otros = barajar(emojis.filter(function (x) { return grupo.indexOf(x) === -1; })).slice(0, 2);
      var opts = barajar([pregunta].concat(otros));
      var tiempoMem = Math.max(1500, 3500 - estadoJuego.nivel * 400);
      app.innerHTML = '<div class="mj-screen">' + headerVolver('Memoria visual', '🧩', '<span class="mj-stat">' + (ronda + 1) + '/' + total + '</span>') +
        '<div class="mj-pregunta-card"><div class="mj-pregunta-texto">¡Mirá bien! 👀</div><div style="font-size:' + (56 - numObj * 4) + 'px;letter-spacing:8px;animation:mj-pop .4s ease;">' + grupo.join(' ') + '</div></div>' +
        '<div class="mj-feedback">Recordá estos objetos... (' + Math.round(tiempoMem / 1000) + 's)</div></div>';
      bindVolver(app);
      despues(tiempoMem, function () {
        hablar('¿Cuál de estos objetos apareció?');
        app.innerHTML = '<div class="mj-screen">' + headerVolver('Memoria visual', '🧩', '<span class="mj-stat">' + (ronda + 1) + '/' + total + '</span>') +
          '<div class="mj-pregunta-card"><div class="mj-pregunta-texto">¿Cuál apareció?</div></div>' +
          '<div class="mj-opciones">' + opts.map(function (o) { return '<button class="mj-opcion" style="font-size:36px;">' + o + '</button>'; }).join('') + '</div>' +
          '<div class="mj-feedback" id="feedback"></div></div>';
        bindVolver(app);
        var lock = false;
        app.querySelectorAll('.mj-opcion').forEach(function (b) {
          b.addEventListener('click', function () {
            if (lock) return; lock = true;
            var ok = b.textContent === pregunta;
            app.querySelectorAll('.mj-opcion').forEach(function (x) { x.disabled = true; if (x.textContent === pregunta) x.classList.add('ok'); else if (x === b) x.classList.add('mal'); });
            var fb = document.getElementById('feedback');
            if (ok) { var r = acierto(20); fb.innerHTML = '<span class="mj-feedback ok">¡Recordaste! +' + r.pts + (r.mult > 1 ? ' 🔥x' + r.mult : '') + '</span>'; if (ronda % 2 === 1) estadoJuego.nivel++; hablar(randomAcierto()); }
            else { fb.innerHTML = '<span class="mj-feedback mal">Era ' + pregunta + '</span>'; hablar(randomError()); if (error()) { despues(1000, function () { gameOver('Memoria visual', '🧩', app); }); return; } }
            ronda++; despues(1400, render);
          });
        });
      });
    }
    render();
  }

  /* 8) REACCIÓN con timer */
  function reaccion() {
    resetEstado('reaccion');
    var aciertos = 0, total = 10, ronda = 0;
    var app = document.getElementById('app');
    function render() {
      if (ronda >= total) { ganarJuego('Reacción', '🏃'); return; }
      var emojis = ['🎯', '⭐', '🍎', '🎈', '⚽', '🚀', '💎', '👽', '👻', '🍕', '🐱', '🌸', '🎵', '🦋'];
      var target = emojis[Math.floor(Math.random() * emojis.length)];
      var numCeldas = estadoJuego.nivel >= 3 ? 16 : estadoJuego.nivel >= 2 ? 12 : 9;
      var cols = numCeldas === 16 ? 4 : 3;
      if (ronda === 0) hablar('¡Tocá el objetivo lo más rápido posible!'); else hablar(target);
      app.innerHTML = '<div class="mj-screen">' + headerVolver('Reacción', '🏃', '<span class="mj-stat">' + (ronda + 1) + '/' + total + '</span>') +
        '<div class="mj-pregunta-card"><div class="mj-pregunta-texto">¡Tocá el <span style="font-size:32px;">' + target + '</span> rápido!</div></div>' +
        '<div class="mj-opciones" style="grid-template-columns:repeat(' + cols + ',1fr);padding:0 14px;" id="reac-grid"></div>' +
        '<div class="mj-feedback" id="feedback"></div></div>';
      bindVolver(app);
      var grid = document.getElementById('reac-grid');
      var posTarget = Math.floor(Math.random() * numCeldas);
      var tiempoLimite = Math.max(1500, 3000 - estadoJuego.nivel * 300);
      var timeoutId = despues(tiempoLimite, function () {
        if (!lock) { lock = true; fb.innerHTML = '<span class="mj-feedback mal">¡Muy lento! 😴</span>'; if (error()) { despues(800, function () { gameOver('Reacción', '🏃', app); }); return; } ronda++; despues(1000, render); }
      });
      var lock = false;
      var fb = document.getElementById('feedback');
      for (var i = 0; i < numCeldas; i++) {
        var b = document.createElement('button');
        b.className = 'mj-opcion'; b.style.fontSize = '28px'; b.style.padding = '12px 4px';
        b.textContent = i === posTarget ? target : emojis[Math.floor(Math.random() * emojis.length)];
        (function (btn, esTarget) {
          btn.addEventListener('click', function () {
            if (lock) return; lock = true; clearTimeout(timeoutId);
            if (esTarget) { aciertos++; var r = acierto(10); fb.innerHTML = '<span class="mj-feedback ok">¡Rápido! +' + r.pts + (r.mult > 1 ? ' 🔥x' + r.mult : '') + '</span>'; if (ronda % 3 === 2) estadoJuego.nivel++; }
            else { fb.innerHTML = '<span class="mj-feedback mal">¡Ese no era!</span>'; if (error()) { despues(800, function () { gameOver('Reacción', '🏃', app); }); return; } }
            ronda++; despues(700, render);
          });
        })(b, i === posTarget);
        grid.appendChild(b);
      }
    }
    render();
  }

  /* 9) FORMAS */
  function formas() {
    resetEstado('formas');
    var formasArr = [{ nombre: 'Círculo', emoji: '🔴' }, { nombre: 'Cuadrado', emoji: '🟦' }, { nombre: 'Triángulo', emoji: '🔺' }, { nombre: 'Estrella', emoji: '⭐' }, { nombre: 'Corazón', emoji: '❤️' }, { nombre: 'Luna', emoji: '🌙' }, { nombre: 'Rombo', emoji: '♦️' }, { nombre: 'Diamante', emoji: '💎' }, { nombre: 'Campana', emoji: '🔔' }, { nombre: 'Nube', emoji: '☁️' }, { nombre: 'Sol', emoji: '☀️' }, { nombre: 'Rayo', emoji: '⚡' }];
    var ronda = 0, total = 8, lock = false;
    var app = document.getElementById('app');
    hablar('Tocá el nombre de la forma que aparece.');
    function render() {
      if (ronda >= total) { ganarJuego('Formas', '🔷'); return; }
      var f = formasArr[Math.floor(Math.random() * formasArr.length)];
      var otras = barajar(formasArr.filter(function (x) { return x.nombre !== f.nombre; })).slice(0, 2).map(function (x) { return x.nombre; });
      var opts = barajar([f.nombre].concat(otras));
      lock = false;
      app.innerHTML = '<div class="mj-screen">' + headerVolver('Formas', '🔷', '<span class="mj-stat">' + (ronda + 1) + '/' + total + '</span>') +
        '<div class="mj-pregunta-card"><div style="font-size:72px;animation:mj-flotar 3s infinite;">' + f.emoji + '</div><div class="mj-pregunta-texto">¿Qué forma es?</div></div>' +
        '<div class="mj-opciones">' + opts.map(function (o) { return '<button class="mj-opcion">' + o + '</button>'; }).join('') + '</div>' +
        '<div class="mj-feedback" id="feedback"></div></div>';
      bindVolver(app);
      app.querySelectorAll('.mj-opcion').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          hablar(b.textContent);
          var ok = b.textContent === f.nombre;
          app.querySelectorAll('.mj-opcion').forEach(function (x) { x.disabled = true; if (x.textContent === f.nombre) x.classList.add('ok'); else if (x === b) x.classList.add('mal'); });
          var fb = document.getElementById('feedback');
          if (ok) { var r = acierto(10); fb.innerHTML = '<span class="mj-feedback ok">¡Correcto! +' + r.pts + '</span>'; }
          else { fb.innerHTML = '<span class="mj-feedback mal">Era ' + f.nombre + '</span>'; if (error()) { despues(800, function () { gameOver('Formas', '🔷', app); }); return; } }
          ronda++; despues(1100, render);
        });
      });
    }
    render();
  }

  /* 10) COLORES (efecto Stroop en niveles altos) */
  function colores() {
    resetEstado('colores');
    var cols = [{ nombre: 'Rojo', css: '#EE5A6F' }, { nombre: 'Azul', css: '#4D96FF' }, { nombre: 'Verde', css: '#6BCB77' }, { nombre: 'Amarillo', css: '#FFD93D' }, { nombre: 'Naranja', css: '#FF9F43' }, { nombre: 'Morado', css: '#A55EEA' }, { nombre: 'Rosa', css: '#FF9BCB' }, { nombre: 'Marrón', css: '#8D6E63' }, { nombre: 'Celeste', css: '#00BCD4' }, { nombre: 'Negro', css: '#212121' }];
    var ronda = 0, total = 8, lock = false;
    var app = document.getElementById('app');
    hablar('Elegí el color correcto.');
    function render() {
      if (ronda >= total) { ganarJuego('Colores', '🎨'); return; }
      var c = cols[Math.floor(Math.random() * cols.length)];
      var otras = barajar(cols.filter(function (x) { return x.nombre !== c.nombre; })).slice(0, 2).map(function (x) { return x.nombre; });
      var opts = barajar([c.nombre].concat(otras));
      lock = false;
      var stroop = estadoJuego.nivel >= 3 && Math.random() > 0.5;
      var colorMostrado = stroop ? cols[Math.floor(Math.random() * cols.length)].css : c.css;
      var extraStyle = c.nombre === 'Blanco' ? 'border:4px solid #eee;' : '';
      app.innerHTML = '<div class="mj-screen">' + headerVolver('Colores', '🎨', '<span class="mj-stat">' + (ronda + 1) + '/' + total + '</span>') +
        '<div class="mj-pregunta-card"><div style="width:120px;height:120px;border-radius:50%;background:' + colorMostrado + ';margin:0 auto 10px;' + extraStyle + 'animation:mj-glow 2s infinite;"></div><div class="mj-pregunta-texto">' + (stroop ? '¿De qué COLOR es el círculo?' : '¿De qué color es?') + '</div></div>' +
        '<div class="mj-opciones">' + opts.map(function (o) { return '<button class="mj-opcion">' + o + '</button>'; }).join('') + '</div>' +
        '<div class="mj-feedback" id="feedback"></div></div>';
      bindVolver(app);
      app.querySelectorAll('.mj-opcion').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          hablar(b.textContent);
          var ok = b.textContent === c.nombre;
          app.querySelectorAll('.mj-opcion').forEach(function (x) { x.disabled = true; if (x.textContent === c.nombre) x.classList.add('ok'); else if (x === b) x.classList.add('mal'); });
          var fb = document.getElementById('feedback');
          if (ok) { var r = acierto(10); fb.innerHTML = '<span class="mj-feedback ok">¡Correcto! +' + r.pts + '</span>'; hablar(randomAcierto()); if (ronda % 3 === 2) estadoJuego.nivel++; }
          else { fb.innerHTML = '<span class="mj-feedback mal">Era ' + c.nombre + '</span>'; hablar(randomError()); if (error()) { despues(800, function () { gameOver('Colores', '🎨', app); }); return; } }
          ronda++; despues(1100, render);
        });
      });
    }
    render();
  }

  /* ============================================================
     JUEGOS NUEVOS MODERNOS (8) — SUPER PREMIUM
     ============================================================ */

  /* 11) SNAKE (canvas) */
  function snake() {
    resetEstado('snake');
    var app = document.getElementById('app');
    app.innerHTML = '<div class="mj-screen">' + headerVolver('Snake', '🐍') +
      '<div class="mj-canvas-wrap"><canvas class="mj-canvas" id="snake-canvas" width="300" height="300"></canvas></div>' +
      '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;max-width:200px;margin:0 auto 14px;">' +
      '<div></div><button class="mj-opcion" data-dir="up">⬆️</button><div></div>' +
      '<button class="mj-opcion" data-dir="left">⬅️</button><button class="mj-opcion" data-dir="down">⬇️</button><button class="mj-opcion" data-dir="right">➡️</button>' +
      '</div><div class="mj-feedback">Comé la 🍎 y no te choques</div></div>';
    bindVolver(app);
    var cv = document.getElementById('snake-canvas'), ctx = cv.getContext('2d');
    var grid = 15, cell = cv.width / grid;
    var snake = [{ x: 7, y: 7 }], dir = { x: 1, y: 0 }, nextDir = { x: 1, y: 0 };
    var comida = { x: 12, y: 7 };
    var vel = Math.max(80, 180 - estadoJuego.nivel * 20);
    function nuevaComida() { comida = { x: Math.floor(Math.random() * grid), y: Math.floor(Math.random() * grid) }; }
    function dibujar() {
      ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = '#FF6B6B'; ctx.beginPath(); ctx.arc(comida.x * cell + cell / 2, comida.y * cell + cell / 2, cell / 2 - 2, 0, Math.PI * 2); ctx.fill();
      snake.forEach(function (s, i) {
        ctx.fillStyle = i === 0 ? '#00B894' : '#55EFC4';
        ctx.fillRect(s.x * cell + 1, s.y * cell + 1, cell - 2, cell - 2);
      });
    }
    function tick() {
      dir = nextDir;
      var cabeza = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      if (cabeza.x < 0 || cabeza.x >= grid || cabeza.y < 0 || cabeza.y >= grid || snake.some(function (s) { return s.x === cabeza.x && s.y === cabeza.y; })) {
        limpiarIntervalos(); gameOver('Snake', '🐍', app); return;
      }
      snake.unshift(cabeza);
      if (cabeza.x === comida.x && cabeza.y === comida.y) {
        var r = acierto(15); estadoJuego.score += 0; /* ya sumado en acierto */
        nuevaComida(); snd('correcto');
        if (snake.length % 4 === 0) { estadoJuego.nivel++; vel = Math.max(70, vel - 15); limpiarIntervalos(); loop = cada(vel, tick); }
        app.querySelector('.mj-head .mj-stats').outerHTML = statsHTML().replace('<div class="mj-stats">', '<div class="mj-stats">');
      } else { snake.pop(); }
      dibujar();
    }
    dibujar();
    var loop = cada(vel, tick);
    app.querySelectorAll('[data-dir]').forEach(function (b) {
      b.addEventListener('click', function () {
        var d = b.dataset.dir;
        if (d === 'up' && dir.y !== 1) nextDir = { x: 0, y: -1 };
        if (d === 'down' && dir.y !== -1) nextDir = { x: 0, y: 1 };
        if (d === 'left' && dir.x !== 1) nextDir = { x: -1, y: 0 };
        if (d === 'right' && dir.x !== -1) nextDir = { x: 1, y: 0 };
      });
    });
    document.addEventListener('keydown', function tecla(e) {
      if (estadoJuego.id !== 'snake') { document.removeEventListener('keydown', tecla); return; }
      if (e.key === 'ArrowUp' && dir.y !== 1) nextDir = { x: 0, y: -1 };
      if (e.key === 'ArrowDown' && dir.y !== -1) nextDir = { x: 0, y: 1 };
      if (e.key === 'ArrowLeft' && dir.x !== 1) nextDir = { x: -1, y: 0 };
      if (e.key === 'ArrowRight' && dir.x !== -1) nextDir = { x: 1, y: 0 };
    });
  }

  /* 12) 2048 */
  function juego2048() {
    resetEstado('2048');
    var app = document.getElementById('app');
    var tablero = [], puntaje = 0;
    function nuevo() {
      var vacias = [];
      for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) if (!tablero[i][j]) vacias.push({ i: i, j: j });
      if (vacias.length) { var p = vacias[Math.floor(Math.random() * vacias.length)]; tablero[p.i][p.j] = Math.random() > 0.9 ? 4 : 2; }
    }
    for (var i = 0; i < 4; i++) { tablero.push([0, 0, 0, 0]); }
    nuevo(); nuevo();
    var colores2048 = { 2: '#EEE4DA', 4: '#EDE0C8', 8: '#F2B179', 16: '#F59563', 32: '#F67C5F', 64: '#F65E3B', 128: '#EDCF72', 256: '#EDCC61', 512: '#EDC850', 1024: '#EDC53F', 2048: '#EDC22E' };
    function render() {
      app.innerHTML = '<div class="mj-screen">' + headerVolver('2048', '🔢') +
        '<div class="mj-feedback">Deslizá o usá las flechas para juntar iguales</div>' +
        '<div class="mj-2048-grid" id="g2048">' + tablero.map(function (fila) {
          return fila.map(function (v) {
            var bg = colores2048[v] || '#CDC1B4';
            var color = v > 4 ? '#fff' : '#776E65';
            var fs = v >= 1024 ? '14px' : v >= 128 ? '16px' : '20px';
            return '<div class="mj-2048-cell" style="background:' + bg + ';color:' + color + ';font-size:' + fs + ';">' + (v || '') + '</div>';
          }).join('');
        }).join('') + '</div>' +
        '<div style="display:flex;gap:6px;justify-content:center;margin:10px;">' +
        '<button class="mj-opcion" data-mov="up">⬆️</button><button class="mj-opcion" data-mov="down">⬇️</button><button class="mj-opcion" data-mov="left">⬅️</button><button class="mj-opcion" data-mov="right">➡️</button></div></div>';
      bindVolver(app);
      app.querySelectorAll('[data-mov]').forEach(function (b) { b.addEventListener('click', function () { mover(b.dataset.mov); }); });
    }
    function mover(dir) {
      var antes = JSON.stringify(tablero);
      var gano = false;
      function deslizar(fila) {
        var arr = fila.filter(Boolean);
        for (var i = 0; i < arr.length - 1; i++) {
          if (arr[i] === arr[i + 1]) { arr[i] *= 2; puntaje += arr[i]; estadoJuego.score += arr[i]; if (arr[i] === 2048) gano = true; arr.splice(i + 1, 1); }
        }
        while (arr.length < 4) arr.push(0);
        return arr;
      }
      var nuevoTablero = [[], [], [], []];
      if (dir === 'left') { for (var i = 0; i < 4; i++) nuevoTablero[i] = deslizar(tablero[i].slice()); }
      if (dir === 'right') { for (var i = 0; i < 4; i++) nuevoTablero[i] = deslizar(tablero[i].slice().reverse()).reverse(); }
      if (dir === 'up') { for (var j = 0; j < 4; j++) { var col = deslizar([tablero[0][j], tablero[1][j], tablero[2][j], tablero[3][j]]); for (var i = 0; i < 4; i++) nuevoTablero[i][j] = col[i]; } }
      if (dir === 'down') { for (var j = 0; j < 4; j++) { var col = deslizar([tablero[3][j], tablero[2][j], tablero[1][j], tablero[0][j]]).reverse(); for (var i = 0; i < 4; i++) nuevoTablero[i][j] = col[i]; } }
      tablero = nuevoTablero;
      if (JSON.stringify(tablero) !== antes) { nuevo(); snd('click'); }
      if (gano) { ganarJuego('2048', '🔢'); return; }
      var hayMov = tablero.some(function (f, i) { return f.some(function (v, j) { return !v || (j < 3 && v === f[j + 1]) || (i < 3 && v === tablero[i + 1][j]); }); });
      if (!hayMov) { gameOver('2048', '🔢', app); return; }
      render();
    }
    render();
    document.addEventListener('keydown', function tecla(e) {
      if (estadoJuego.id !== '2048') { document.removeEventListener('keydown', tecla); return; }
      if (e.key === 'ArrowUp') { e.preventDefault(); mover('up'); }
      if (e.key === 'ArrowDown') { e.preventDefault(); mover('down'); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); mover('left'); }
      if (e.key === 'ArrowRight') { e.preventDefault(); mover('right'); }
    });
  }

  /* 13) ATRAPA-TOPOS (whack-a-mole) con timer */
  function atrapaTopos() {
    resetEstado('topos');
    var app = document.getElementById('app');
    var tiempo = 30, scoreTopos = 0;
    app.innerHTML = '<div class="mj-screen">' + headerVolver('Atrapa-topos', '🔨', '<span class="mj-timer" id="topo-timer">⏱️30s</span>') +
      '<div class="mj-feedback">¡Golpeá los topos! 🐹</div>' +
      '<div class="mj-whack-grid" id="topo-grid"></div></div>';
    bindVolver(app);
    var grid = document.getElementById('topo-grid');
    var hoyos = [];
    for (var i = 0; i < 9; i++) {
      var h = document.createElement('button');
      h.className = 'mj-topo-hole'; h.dataset.i = i;
      h.addEventListener('click', function () {
        if (this.classList.contains('up')) {
          this.classList.remove('up'); this.classList.add('bonked');
          scoreTopos++; var r = acierto(5); estadoJuego.score += 0;
          this.textContent = '💥';
          var self = this;
          setTimeout(function () { self.classList.remove('bonked'); self.textContent = ''; }, 300);
          app.querySelector('.mj-head .mj-stats').outerHTML = statsHTML('<span class="mj-timer" id="topo-timer">⏱️' + tiempo + 's</span>').replace('<div class="mj-stats">', '<div class="mj-stats">');
        }
      });
      grid.appendChild(h); hoyos.push(h);
    }
    var topoInt = cada(700, function () {
      var libres = hoyos.filter(function (h) { return !h.classList.contains('up'); });
      if (libres.length) {
        var h = libres[Math.floor(Math.random() * libres.length)];
        h.classList.add('up'); h.textContent = '🐹';
        (function (hole) { setTimeout(function () { if (hole.classList.contains('up')) { hole.classList.remove('up'); hole.textContent = ''; } }, 900); })(h);
      }
    });
    var timerInt = cada(1000, function () {
      tiempo--;
      var t = document.getElementById('topo-timer');
      if (t) t.textContent = '⏱️' + tiempo + 's';
      if (tiempo <= 0) { limpiarIntervalos(); estadoJuego.score += scoreTopos * 10; ganarJuego('Atrapa-topos', '🔨'); }
    });
  }

  /* 14) SIMÓN DICE */
  function simon() {
    resetEstado('simon');
    var app = document.getElementById('app');
    var colores = [{ id: 'r', css: '#EE5A6F', nota: 'do' }, { id: 'g', css: '#00B894', nota: 're' }, { id: 'b', css: '#4D96FF', nota: 'mi' }, { id: 'y', css: '#FFD93D', nota: 'fa' }];
    var secuencia = [], jugadorIdx = 0, nivel = 1;
    app.innerHTML = '<div class="mj-screen">' + headerVolver('Simón dice', '🎵') +
      '<div class="mj-feedback" id="simon-fb">Mirá la secuencia...</div>' +
      '<div class="mj-simon-grid">' + colores.map(function (c, i) {
        return '<button class="mj-simon-btn" data-col="' + c.id + '" style="background:' + c.css + ';color:' + c.css + ';"></button>';
      }).join('') + '</div></div>';
    bindVolver(app);
    var btns = app.querySelectorAll('.mj-simon-btn');
    function iluminar(id, cb) {
      var b = app.querySelector('[data-col="' + id + '"]');
      b.classList.add('active'); snd('click');
      setTimeout(function () { b.classList.remove('active'); setTimeout(cb || function () { }, 200); }, 500);
    }
    function reproducirSecuencia() {
      app.querySelector('#simon-fb').textContent = 'Mirá la secuencia... Nivel ' + nivel;
      var i = 0;
      function next() {
        if (i >= secuencia.length) { jugadorIdx = 0; app.querySelector('#simon-fb').textContent = '¡A vos! Repetila'; return; }
        iluminar(secuencia[i], function () { i++; next(); });
      }
      next();
    }
    function nuevoNivel() {
      secuencia.push(colores[Math.floor(Math.random() * 4)].id);
      nivel = secuencia.length;
      estadoJuego.nivel = nivel;
      despues(600, reproducirSecuencia);
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var col = b.dataset.col;
        b.classList.add('active'); snd('click');
        setTimeout(function () { b.classList.remove('active'); }, 250);
        if (col === secuencia[jugadorIdx]) {
          jugadorIdx++;
          var r = acierto(10);
          if (jugadorIdx >= secuencia.length) {
            app.querySelector('#simon-fb').innerHTML = '<span class="mj-feedback ok">¡Nivel ' + (nivel + 1) + '! +' + r.pts + '</span>';
            if (nivel >= 8) { ganarJuego('Simón dice', '🎵'); return; }
            nuevoNivel();
          }
        } else {
          app.querySelector('#simon-fb').innerHTML = '<span class="mj-feedback mal">¡Fallaste! Era ' + secuencia[jugadorIdx] + '</span>';
          if (error()) { gameOver('Simón dice', '🎵', app); return; }
          jugadorIdx = 0; despues(1000, reproducirSecuencia);
        }
      });
    });
    nuevoNivel();
  }

  /* 15) FLAPPY (tap to fly) */
  function flappy() {
    resetEstado('flappy');
    var app = document.getElementById('app');
    app.innerHTML = '<div class="mj-screen">' + headerVolver('Flappy', '🐤') +
      '<div class="mj-flappy-wrap"><canvas class="mj-canvas" id="flappy-canvas" width="300" height="400" style="cursor:pointer;"></canvas></div>' +
      '<div class="mj-feedback">Tocá la pantalla para volar 🐤</div></div>';
    bindVolver(app);
    var cv = document.getElementById('flappy-canvas'), ctx = cv.getContext('2d');
    var pajaro = { y: 200, vy: 0, gravedad: 0.4, salto: -7 };
    var tubos = [], puntajeF = 0, frame = 0;
    function dibujar() {
      ctx.fillStyle = '#87CEEB'; ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = '#FFD93D'; ctx.beginPath(); ctx.arc(250, 50, 25, 0, Math.PI * 2); ctx.fill();
      tubos.forEach(function (t) {
        ctx.fillStyle = '#6BCB77'; ctx.fillRect(t.x, 0, 40, t.holeY);
        ctx.fillRect(t.x, t.holeY + 100, 40, cv.height - t.holeY - 100);
        ctx.fillStyle = '#55EFC4'; ctx.fillRect(t.x - 3, t.holeY - 10, 46, 10); ctx.fillRect(t.x - 3, t.holeY + 100, 46, 10);
      });
      ctx.fillStyle = '#FFD93D'; ctx.beginPath(); ctx.arc(60, pajaro.y, 14, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#FF9F43'; ctx.beginPath(); ctx.moveTo(74, pajaro.y); ctx.lineTo(84, pajaro.y - 4); ctx.lineTo(84, pajaro.y + 4); ctx.fill();
      ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(65, pajaro.y - 4, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 24px sans-serif'; ctx.textAlign = 'center'; ctx.fillText(puntajeF, cv.width / 2, 40);
    }
    function loop() {
      frame++;
      pajaro.vy += pajaro.gravedad; pajaro.y += pajaro.vy;
      if (frame % 90 === 0) tubos.push({ x: cv.width, holeY: 60 + Math.random() * 200 });
      tubos.forEach(function (t) { t.x -= 2.5; if (t.x + 40 < 60 && !t.contado) { t.contado = true; puntajeF++; acierto(10); } });
      tubos = tubos.filter(function (t) { return t.x > -50; });
      var choque = pajaro.y < 0 || pajaro.y > cv.height - 10 || tubos.some(function (t) {
        return 60 + 14 > t.x && 60 - 14 < t.x + 40 && (pajaro.y - 14 < t.holeY || pajaro.y + 14 > t.holeY + 100);
      });
      dibujar();
      if (choque) { limpiarIntervalos(); estadoJuego.score += puntajeF * 5; gameOver('Flappy', '🐤', app); return; }
    }
    var loopInt = cada(16, loop);
    function saltar() { pajaro.vy = pajaro.salto; snd('click'); }
    cv.addEventListener('pointerdown', saltar);
    document.addEventListener('keydown', function tecla(e) {
      if (estadoJuego.id !== 'flappy') { document.removeEventListener('keydown', tecla); return; }
      if (e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); saltar(); }
    });
  }

  /* 16) TIC-TAC-TOE vs IA */
  function tateti() {
    resetEstado('tateti');
    var app = document.getElementById('app');
    var tablero = ['', '', '', '', '', '', '', '', ''];
    var turno = 'X', juegoActivo = true;
    function render(msg) {
      app.innerHTML = '<div class="mj-screen">' + headerVolver('Ta-Te-Ti vs IA', '⭕') +
        '<div class="mj-feedback" id="ttt-fb">' + (msg || 'Juegas con ❌, la IA con ⭕') + '</div>' +
        '<div class="mj-ttt-grid">' + tablero.map(function (v, i) {
          return '<button class="mj-ttt-cell" data-i="' + i + '" style="color:' + (v === 'X' ? '#4D96FF' : '#FF6B9D') + ';">' + v + '</button>';
        }).join('') + '</div>' +
        '<button class="mj-btn-sec" id="ttt-reset" style="max-width:200px;margin:10px auto;display:block;">🔄 Reiniciar</button></div>';
      bindVolver(app);
      app.querySelectorAll('.mj-ttt-cell').forEach(function (b) {
        b.addEventListener('click', function () {
          if (!juegoActivo || tablero[Number(b.dataset.i)]) return;
          tablero[Number(b.dataset.i)] = 'X'; snd('click');
          var ganador = checkGanador();
          if (ganador) { fin(ganador); return; }
          if (tablero.every(Boolean)) { fin('empate'); return; }
          turno = 'O';
          despues(400, jugadaIA);
        });
      });
      document.getElementById('ttt-reset').addEventListener('click', function () { snd('click'); tateti(); });
    }
    function checkGanador() {
      var lineas = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
      for (var i = 0; i < lineas.length; i++) {
        var [a, b, c] = lineas[i];
        if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) return { ganador: tablero[a], linea: lineas[i] };
      }
      return null;
    }
    function jugadaIA() {
      if (!juegoActivo) return;
      var vacias = [];
      for (var i = 0; i < 9; i++) if (!tablero[i]) vacias.push(i);
      /* IA simple: ganar o bloquear */
      var jugada = null;
      for (var i = 0; i < vacias.length; i++) { tablero[vacias[i]] = 'O'; if (checkGanador()) { jugada = vacias[i]; } tablero[vacias[i]] = ''; if (jugada !== null) break; }
      if (jugada === null) for (var i = 0; i < vacias.length; i++) { tablero[vacias[i]] = 'X'; if (checkGanador()) { jugada = vacias[i]; } tablero[vacias[i]] = ''; if (jugada !== null) break; }
      if (jugada === null) jugada = vacias[Math.floor(Math.random() * vacias.length)];
      tablero[jugada] = 'O'; snd('click');
      var ganador = checkGanador();
      if (ganador) { fin(ganador); return; }
      if (tablero.every(Boolean)) { fin('empate'); return; }
      turno = 'X'; render('Tu turno ❌');
    }
    function fin(resultado) {
      juegoActivo = false;
      if (resultado === 'empate') { render('🤝 ¡Empate!'); acierto(5); despues(1500, function () { ganarJuego('Ta-Te-Ti', '⭕'); }); return; }
      if (resultado.ganador === 'X') {
        resultado.linea.forEach(function (i) { app.querySelectorAll('.mj-ttt-cell')[i].classList.add('win'); });
        render('🎉 ¡Ganaste! +50'); acierto(50); lanzarConfeti();
        despues(1500, function () { ganarJuego('Ta-Te-Ti', '⭕'); });
      } else {
        resultado.linea.forEach(function (i) { app.querySelectorAll('.mj-ttt-cell')[i].classList.add('win'); });
        render('😢 La IA ganó...'); error();
        despues(1500, function () { if (estadoJuego.vidas <= 0) gameOver('Ta-Te-Ti', '⭕', app); else { juegoActivo = true; tablero = ['', '', '', '', '', '', '', '', '']; render('Otra vez, vas ❌'); } });
      }
    }
    render();
  }

  /* 17) QUIZ RELÁMPAGO (trivia con categorías) */
  var QUIZ = {
    'Ciencia': [
      { p: '¿Cuántas patas tiene una araña?', o: ['6', '8', '10', '4'], c: 1 },
      { p: '¿Qué planeta es el más cercano al sol?', o: ['Venus', 'Tierra', 'Mercurio', 'Marte'], c: 2 },
      { p: '¿Cuántos minutos tiene una hora?', o: ['30', '60', '100', '24'], c: 1 },
      { p: '¿Qué animal es el más grande del mundo?', o: ['Elefante', 'Ballena azul', 'Jirafa', 'Tiburón'], c: 1 },
      { p: '¿De qué color es el cielo despejado?', o: ['Verde', 'Rojo', 'Azul', 'Amarillo'], c: 2 }
    ],
    'Geografía': [
      { p: '¿Cuál es la capital de Argentina?', o: ['Córdoba', 'Buenos Aires', 'Mendoza', 'Rosario'], c: 1 },
      { p: '¿Cuál es el océano más grande?', o: ['Atlántico', 'Índico', 'Pacífico', 'Ártico'], c: 2 },
      { p: '¿En qué continente está Egipto?', o: ['Europa', 'Asia', 'África', 'Oceanía'], c: 2 },
      { p: '¿Cuál es el río más largo del mundo?', o: ['Amazonas', 'Nilo', 'Misisipi', 'Paraná'], c: 1 },
      { p: '¿Cuántos continentes hay?', o: ['5', '6', '7', '8'], c: 2 }
    ],
    'Deportes': [
      { p: '¿Cuántos jugadores tiene un equipo de fútbol?', o: ['9', '10', '11', '12'], c: 2 },
      { p: '¿En qué deporte se usa una raqueta?', o: ['Fútbol', 'Tenis', 'Básquet', 'Natación'], c: 1 },
      { p: '¿Cada cuántos años son los Juegos Olímpicos?', o: ['2', '3', '4', '5'], c: 2 },
      { p: '¿Cuántos puntos vale un triple en básquet?', o: ['1', '2', '3', '4'], c: 2 },
      { p: '¿En qué deporte se mete un balón en un aro?', o: ['Vóley', 'Básquet', 'Tenis', 'Golf'], c: 1 }
    ],
    'Entretenimiento': [
      { p: '¿Qué animal es Mickey?', o: ['Perro', 'Gato', 'Ratón', 'Pato'], c: 2 },
      { p: '¿De qué color es la casa de Mickey?', o: ['Azul', 'Roja', 'Verde', 'Amarilla'], c: 1 },
      { p: '¿Quién es el amigo de Shrek?', o: ['Burro', 'Gato', 'Perro', 'Dragón'], c: 0 },
      { p: '¿Qué come el Hombre Araña? ¿No, qué animal lo picó?', o: ['Araña', 'Mosca', 'Abeja', 'Hormiga'], c: 0 },
      { p: '¿En qué cuento hay una manzana envenenada?', o: ['Cenicienta', 'Blancanieves', 'Rapunzel', 'La Bella'], c: 1 }
    ]
  };
  function quiz() {
    resetEstado('quiz');
    var app = document.getElementById('app');
    var categorias = Object.keys(QUIZ);
    var catActiva = categorias[0], ronda = 0, total = 5, lock = false, preguntaIdx = [];
    app.innerHTML = '<div class="mj-screen">' + headerVolver('Quiz relámpago', '❓') +
      '<div class="mj-quiz-cat" id="quiz-cats">' + categorias.map(function (c, i) {
        return '<button data-cat="' + c + '"' + (i === 0 ? ' class="sel"' : '') + '>' + c + '</button>';
      }).join('') + '</div>' +
      '<div class="mj-feedback">Elegí una categoría y empezá</div>' +
      '<div id="quiz-zone"></div></div>';
    bindVolver(app);
    app.querySelectorAll('[data-cat]').forEach(function (b) {
      b.addEventListener('click', function () {
        snd('click'); catActiva = b.dataset.cat;
        app.querySelectorAll('[data-cat]').forEach(function (x) { x.classList.toggle('sel', x === b); });
        preguntaIdx = barajar(QUIZ[catActiva].map(function (_, i) { return i; })).slice(0, total);
        ronda = 0; renderPregunta();
      });
    });
    function renderPregunta() {
      if (ronda >= total) { ganarJuego('Quiz', '❓'); return; }
      var q = QUIZ[catActiva][preguntaIdx[ronda]];
      var opts = barajar(q.o.map(function (o, i) { return { t: o, esC: i === q.c }; }));
      lock = false;
      var zona = document.getElementById('quiz-zone');
      zona.innerHTML = '<div class="mj-progress"><div class="mj-progress-fill" style="width:' + (ronda / total * 100) + '%"></div></div>' +
        '<div class="mj-pregunta-card"><div class="mj-pregunta-texto">' + esc(q.p) + '</div></div>' +
        '<div class="mj-opciones">' + opts.map(function (o) { return '<button class="mj-opcion" style="font-size:14px;">' + esc(o.t) + '</button>'; }).join('') + '</div>' +
        '<div class="mj-feedback" id="quiz-fb"></div>';
      zona.querySelectorAll('.mj-opcion').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          hablar(b.textContent);
          var esCorrecta = opts[Array.from(zona.querySelectorAll('.mj-opcion')).indexOf(b)].esC;
          zona.querySelectorAll('.mj-opcion').forEach(function (x, i) { x.disabled = true; if (opts[i].esC) x.classList.add('ok'); else if (x === b) x.classList.add('mal'); });
          var fb = document.getElementById('quiz-fb');
          if (esCorrecta) { var r = acierto(20); fb.innerHTML = '<span class="mj-feedback ok">¡Correcto! +' + r.pts + (r.mult > 1 ? ' 🔥x' + r.mult : '') + '</span>'; hablar(randomAcierto()); }
          else { fb.innerHTML = '<span class="mj-feedback mal">Era: ' + esc(q.o[q.c]) + '</span>'; hablar(randomError()); if (error()) { despues(1000, function () { gameOver('Quiz', '❓', app); }); return; } }
          ronda++; despues(1400, renderPregunta);
        });
      });
    }
    preguntaIdx = barajar(QUIZ[catActiva].map(function (_, i) { return i; })).slice(0, total);
    renderPregunta();
  }

  /* 18) PREGUNTADOS (rueda de categorías) */
  function preguntados() {
    resetEstado('preguntados');
    var app = document.getElementById('app');
    var categorias = Object.keys(QUIZ);
    var ruedaIdx = 0, aciertosP = 0, necesarios = 6;
    function girarRueda() {
      ruedaIdx = Math.floor(Math.random() * categorias.length);
      var cat = categorias[ruedaIdx];
      var q = QUIZ[cat][Math.floor(Math.random() * QUIZ[cat].length)];
      var opts = barajar(q.o.map(function (o, i) { return { t: o, esC: i === q.c }; }));
      var lock = false;
      app.innerHTML = '<div class="mj-screen">' + headerVolver('Preguntados', '🎡', '<span class="mj-stat">' + aciertosP + '/' + necesarios + '</span>') +
        '<div class="mj-pregunta-card"><div style="font-size:14px;font-weight:800;color:#A55EEA;margin-bottom:6px;">📚 Categoría: ' + cat + '</div>' +
        '<div class="mj-pregunta-texto" style="font-size:17px;">' + esc(q.p) + '</div></div>' +
        '<div class="mj-opciones">' + opts.map(function (o) { return '<button class="mj-opcion" style="font-size:13px;">' + esc(o.t) + '</button>'; }).join('') + '</div>' +
        '<div class="mj-feedback" id="preg-fb"></div></div>';
      bindVolver(app);
      app.querySelectorAll('.mj-opcion').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          var esC = opts[Array.from(app.querySelectorAll('.mj-opcion')).indexOf(b)].esC;
          app.querySelectorAll('.mj-opcion').forEach(function (x, i) { x.disabled = true; if (opts[i].esC) x.classList.add('ok'); else if (x === b) x.classList.add('mal'); });
          var fb = document.getElementById('preg-fb');
          if (esC) {
            aciertosP++; var r = acierto(25);
            fb.innerHTML = '<span class="mj-feedback ok">¡Bien! +' + r.pts + ' (' + aciertosP + '/' + necesarios + ')</span>';
            if (aciertosP >= necesarios) { despues(1200, function () { ganarJuego('Preguntados', '🎡'); }); return; }
            despues(1400, girarRueda);
          } else {
            fb.innerHTML = '<span class="mj-feedback mal">Era: ' + esc(q.o[q.c]) + '</span>';
            if (error()) { despues(1000, function () { gameOver('Preguntados', '🎡', app); }); return; }
            despues(1400, girarRueda);
          }
        });
      });
    }
    hablar('Respondé 6 preguntas correctas para ganar.');
    girarRueda();
  }

  /* ============================================================
     MENÚ PRINCIPAL + EXPORT
     ============================================================ */
  var LISTA = [
    { id: 'memoria', nombre: 'Memoria', emoji: '🧠', desc: 'Encontrá los pares' },
    { id: 'secuencias', nombre: 'Secuencias', emoji: '🔢', desc: '¿Qué número sigue?' },
    { id: 'diferente', nombre: 'El diferente', emoji: '👀', desc: 'Encontrá el distinto' },
    { id: 'rapido', nombre: 'Cálculo rápido', emoji: '⚡', desc: 'Resolvé seguido' },
    { id: 'patrones', nombre: 'Patrones', emoji: '🔴', desc: '¿Qué sigue?' },
    { id: 'palabra', nombre: 'Palabra loca', emoji: '🔤', desc: 'Ordená las letras' },
    { id: 'visual', nombre: 'Memoria visual', emoji: '🧩', desc: '¿Qué viste?' },
    { id: 'reaccion', nombre: 'Reacción', emoji: '🏃', desc: '¡Tocá rápido!' },
    { id: 'formas', nombre: 'Formas', emoji: '🔷', desc: 'Reconocé las formas' },
    { id: 'colores', nombre: 'Colores', emoji: '🎨', desc: 'Reconocé los colores' },
    { id: 'snake', nombre: 'Snake', emoji: '🐍', desc: 'Comé y crecé', nuevo: true },
    { id: '2048', nombre: '2048', emoji: '🔢', desc: 'Juntá los números', nuevo: true },
    { id: 'topos', nombre: 'Atrapa-topos', emoji: '🔨', desc: 'Golpeá los topos', nuevo: true },
    { id: 'simon', nombre: 'Simón dice', emoji: '🎵', desc: 'Repetí la secuencia', nuevo: true },
    { id: 'flappy', nombre: 'Flappy', emoji: '🐤', desc: 'Tocá para volar', nuevo: true },
    { id: 'tateti', nombre: 'Ta-Te-Ti', emoji: '⭕', desc: 'Vs la IA', nuevo: true },
    { id: 'quiz', nombre: 'Quiz', emoji: '❓', desc: 'Trivia por categorías', nuevo: true },
    { id: 'preguntados', nombre: 'Preguntados', emoji: '🎡', desc: '6 aciertos ganas', nuevo: true }
  ];

  function mostrarMenu() {
    limpiarTimers(); limpiarIntervalos();
    var app = document.getElementById('app');
    app.innerHTML = '<div class="mj-screen">' +
      '<div class="mj-head"><div class="mj-title" style="font-size:20px;">🎮 Mundo de Juegos</div>' +
      '<div class="mj-stats"><span class="mj-stat">🔥 Combo x2/x3/x4</span><span class="mj-stat">❤️ Vidas</span></div></div>' +
      '<div style="text-align:center;padding:8px;font-weight:800;color:#667;font-size:13px;">' + LISTA.length + ' juegos · Récords guardados · ¡Rompelos!</div>' +
      '<div class="mj-grid-juegos">' + LISTA.map(function (j) {
        var rec = cargarRecord(j.id);
        return '<div class="mj-card-juego" data-juego="' + j.id + '">' +
          (j.nuevo ? '<span class="nuevo">NUEVO</span>' : '') +
          (rec > 0 ? '<span class="record">🏆' + rec + '</span>' : '') +
          '<span class="emoji">' + j.emoji + '</span>' +
          '<span class="nombre">' + esc(j.nombre) + '</span>' +
          '<span class="desc">' + esc(j.desc) + '</span></div>';
      }).join('') + '</div></div>';
    app.querySelectorAll('.mj-card-juego').forEach(function (c) {
      c.addEventListener('click', function () { snd('click'); Juegos.iniciar(c.dataset.juego); });
    });
  }

  var Juegos = {
    LISTA: LISTA,
    mostrarMenu: mostrarMenu,
    iniciar: function (id) {
      limpiarTimers(); limpiarIntervalos();
      estadoJuego.id = id;
      if (id === 'memoria') memoria();
      else if (id === 'secuencias') secuencias();
      else if (id === 'diferente') diferente();
      else if (id === 'rapido') rapido();
      else if (id === 'patrones') patrones();
      else if (id === 'palabra') palabra();
      else if (id === 'visual') visual();
      else if (id === 'reaccion') reaccion();
      else if (id === 'formas') formas();
      else if (id === 'colores') colores();
      else if (id === 'snake') snake();
      else if (id === '2048') juego2048();
      else if (id === 'topos') atrapaTopos();
      else if (id === 'simon') simon();
      else if (id === 'flappy') flappy();
      else if (id === 'tateti') tateti();
      else if (id === 'quiz') quiz();
      else if (id === 'preguntados') preguntados();
      else mostrarMenu();
    }
  };
  window.EK = window.EK || {};
  window.EK.Juegos = Juegos;
  /* Si no hay EK.App.ir, mostrar menú automáticamente */
  try { if (!window.EK.App || !window.EK.App.ir) { if (document.getElementById('app')) mostrarMenu(); } } catch (e) { }
})();
