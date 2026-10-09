/* ============================================================
   juegos-nuevos.js — 5 minijuegos adicionales
   Se registran en EK.JuegosExtra (no toca minijuegos.js original).
   ============================================================ */
(function () {
  'use strict';
  var barajar = EK.Engine.barajar;
  var esc = EK.Engine.escapeHtml;
  var timers = [];
  function limpiarTimers() { timers.forEach(clearTimeout); timers = []; }
  function despues(ms, fn) { var t = setTimeout(fn, ms); timers.push(t); return t; }

  var LISTA = [
    { id: 'atrapa',    nombre: 'Atrapa la respuesta', emoji: '🎯', desc: 'Tocá la correcta' },
    { id: 'letras',    nombre: 'Letras y sonidos',   emoji: '🔤', desc: 'Escuchá y elegí' },
    { id: 'reloj',     nombre: '¿Qué hora es?',      emoji: '⏰', desc: 'Aprendé las horas' },
    { id: 'monedas',   nombre: 'Contá las monedas',  emoji: '🪙', desc: 'Sumá el valor' },
    { id: 'memopal',   nombre: 'Memoria de palabras',emoji: '🔤', desc: 'Español ↔ Inglés' }
  ];

  function ganar(nombre, emoji) {
    limpiarTimers();
    EK.Store.addEstrellas(20); EK.Store.addJuegoGanado(); EK.Store.addActividad();
    var nuevas = EK.Store.revisarMedallas();
    if (nuevas.length) EK.Audio.medalla(); else EK.Audio.nivel();
    EK.App.actualizarTopbar();
    if (EK.Mascota) EK.Mascota.reaccionar('bien');
    var app = document.getElementById('app');
    app.innerHTML = '<div class="screen premio-screen" style="--acento:#EE5A6F"><div class="premio-card pop">' +
      '<div class="premio-emoji">' + emoji + '</div><h2>¡Ganaste! 🎉</h2>' +
      '<div class="premio-stats"><div class="premio-stat"><span class="big">+20</span><span>estrellas ⭐</span></div></div>' +
      '<div class="premio-btns"><button class="btn-sec" data-act="jugar">🔄 Otra vez</button>' +
      '<button class="btn-pri" data-act="volver">🎮 Más juegos</button></div></div></div>';
    app.querySelector('[data-act="jugar"]').addEventListener('click', function () { EK.Audio.click(); EK.JuegosExtra.iniciar(estado.id); });
    app.querySelector('[data-act="volver"]').addEventListener('click', function () { EK.Audio.click(); EK.App.ir('mundo', { id: 'juegos' }); });
  }
  var estado = { id: null };
  function header(t, e, c) {
    return '<div class="quiz-head"><button class="back-btn" data-act="volver">←</button><div class="quiz-title">' + e + ' ' + esc(t) + '</div><div class="quiz-counter">' + (c || '') + '</div></div>';
  }
  function bindVolver(app) { app.querySelector('[data-act="volver"]').addEventListener('click', function () { limpiarTimers(); EK.Audio.click(); EK.App.ir('mundo', { id: 'juegos' }); }); }

  /* 1) ATRAPA LA RESPUESTA */
  function atrapa() {
    var ronda = 0, total = 5, lock = false;
    var app = document.getElementById('app');
    function render() {
      if (ronda >= total) { despues(300, function () { ganar('Atrapa', '🎯'); }); return; }
      var a = Math.floor(Math.random()*9)+1, b = Math.floor(Math.random()*9)+1, c = a+b;
      var opts = barajar([c, c+1, Math.max(1,c-1)].filter(function(v,i,arr){return arr.indexOf(v)===i;}).map(String));
      lock = false;
      app.innerHTML = '<div class="screen juego-screen">' + header('Atrapa la respuesta','🎯',(ronda+1)+'/'+total) +
        '<div class="pregunta-card"><div class="pregunta-texto big-op">'+a+' + '+b+' = ?</div></div>' +
        '<div class="atrapa-grid">'+opts.map(function(o,i){return '<button class="atrapa-bola" style="animation-delay:'+(i*0.2)+'s" data-v="'+o+'">'+o+'</button>';}).join('')+'</div>' +
        '<div class="feedback" id="feedback"></div></div>';
      bindVolver(app);
      app.querySelectorAll('.atrapa-bola').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          var ok = b.dataset.v === String(c);
          if (ok) { EK.Audio.correcto(); if (EK.Mascota) EK.Mascota.reaccionar('bien'); document.getElementById('feedback').innerHTML='<div class="fb-msg ok">¡Atrapada! ⭐</div>'; }
          else { EK.Audio.error(); if (EK.Mascota) EK.Mascota.reaccionar('mal'); document.getElementById('feedback').innerHTML='<div class="fb-msg mal">Era '+c+'</div>'; }
          ronda++; despues(1100, render);
        });
      });
    }
    render();
  }

  /* 2) LETRAS Y SONIDOS */
  function letras() {
    var letras = ['A','B','C','D','E','F','G','H','I','J','L','M','N','O','P','R','S','T'];
    var ronda = 0, total = 5, lock = false;
    var app = document.getElementById('app');
    function render() {
      if (ronda >= total) { despues(300, function () { ganar('Letras', '🔤'); }); return; }
      var correcta = letras[Math.floor(Math.random()*letras.length)];
      var otras = barajar(letras.filter(function(l){return l!==correcta;})).slice(0,2);
      var opts = barajar([correcta].concat(otras));
      lock = false;
      app.innerHTML = '<div class="screen juego-screen">' + header('Letras y sonidos','🔤',(ronda+1)+'/'+total) +
        '<div class="pregunta-card"><div class="pregunta-texto">🔊 Escuchá... ¿qué letra escuchás?</div>' +
        '<button class="btn-pri escuchar-preg" data-act="escuchar">🔊 Repetir</button></div>' +
        '<div class="opciones-grid cols-3">'+opts.map(function(o){return '<button class="opcion-btn" style="--acento:#EE5A6F;font-size:36px">'+o+'</button>';}).join('')+'</div>' +
        '<div class="feedback" id="feedback"></div></div>';
      bindVolver(app);
      if (EK.Voz) EK.Voz.hablar('Letra ' + correcta);
      app.querySelector('[data-act="escuchar"]').addEventListener('click', function () { EK.Audio.click(); if (EK.Voz) EK.Voz.hablar('Letra ' + correcta); });
      app.querySelectorAll('.opcion-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          var ok = b.textContent === correcta;
          app.querySelectorAll('.opcion-btn').forEach(function (x) { x.disabled=true; if (x.textContent===correcta) x.classList.add('ok'); else if (x===b) x.classList.add('mal'); });
          if (ok) { EK.Audio.correcto(); if (EK.Mascota) EK.Mascota.reaccionar('bien'); document.getElementById('feedback').innerHTML='<div class="fb-msg ok">¡Correcto! ⭐</div>'; }
          else { EK.Audio.error(); if (EK.Mascota) EK.Mascota.reaccionar('mal'); document.getElementById('feedback').innerHTML='<div class="fb-msg mal">Era la '+correcta+'</div>'; }
          ronda++; despues(1300, render);
        });
      });
    }
    render();
  }

  /* 3) ¿QUÉ HORA ES? */
  function reloj() {
    var ronda = 0, total = 5, lock = false;
    var horas = ['3:00','6:00','9:00','12:00','2:00','7:00','10:00','4:00'];
    var app = document.getElementById('app');
    function render() {
      if (ronda >= total) { despues(300, function () { ganar('Reloj', '⏰'); }); return; }
      var correcta = horas[Math.floor(Math.random()*horas.length)];
      var otras = barajar(horas.filter(function(h){return h!==correcta;})).slice(0,2);
      var opts = barajar([correcta].concat(otras));
      var h = parseInt(correcta);
      var emojiReloj = ['🕒','🕕','🕘','🕛','🕑','🕖','🕙','🕓'][horas.indexOf(correcta)] || '🕒';
      lock = false;
      app.innerHTML = '<div class="screen juego-screen">' + header('¿Qué hora es?','⏰',(ronda+1)+'/'+total) +
        '<div class="pregunta-card"><div style="font-size:80px">'+emojiReloj+'</div><div class="pregunta-texto">¿Qué hora marca el reloj?</div></div>' +
        '<div class="opciones-grid cols-3">'+opts.map(function(o){return '<button class="opcion-btn" style="--acento:#EE5A6F">'+o+'</button>';}).join('')+'</div>' +
        '<div class="feedback" id="feedback"></div></div>';
      bindVolver(app);
      app.querySelectorAll('.opcion-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          var ok = b.textContent === correcta;
          app.querySelectorAll('.opcion-btn').forEach(function (x) { x.disabled=true; if (x.textContent===correcta) x.classList.add('ok'); else if (x===b) x.classList.add('mal'); });
          if (ok) { EK.Audio.correcto(); if (EK.Mascota) EK.Mascota.reaccionar('bien'); }
          else { EK.Audio.error(); if (EK.Mascota) EK.Mascota.reaccionar('mal'); document.getElementById('feedback').innerHTML='<div class="fb-msg mal">Eran las '+correcta+'</div>'; }
          ronda++; despues(1200, render);
        });
      });
    }
    render();
  }

  /* 4) CONTÁ LAS MONEDAS */
  function monedas() {
    var ronda = 0, total = 5, lock = false;
    var app = document.getElementById('app');
    function render() {
      if (ronda >= total) { despues(300, function () { ganar('Monedas', '🪙'); }); return; }
      var n10 = Math.floor(Math.random()*3)+1, n1 = Math.floor(Math.random()*4);
      var totalVal = n10*10 + n1;
      var emojis = '🪙'.repeat(n10) + '🟡'.repeat(n1);
      var opts = barajar([totalVal, totalVal+5, Math.max(1,totalVal-5)].filter(function(v,i,arr){return arr.indexOf(v)===i;}).map(String));
      lock = false;
      app.innerHTML = '<div class="screen juego-screen">' + header('Contá las monedas','🪙',(ronda+1)+'/'+total) +
        '<div class="pregunta-card"><div class="pregunta-emoji" style="font-size:44px">🪙=$10 · 🟡=$1</div><div style="font-size:40px;letter-spacing:4px">'+emojis+'</div><div class="pregunta-texto">¿Cuánto dinero hay?</div></div>' +
        '<div class="opciones-grid cols-3">'+opts.map(function(o){return '<button class="opcion-btn" style="--acento:#EE5A6F">$'+o+'</button>';}).join('')+'</div>' +
        '<div class="feedback" id="feedback"></div></div>';
      bindVolver(app);
      app.querySelectorAll('.opcion-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          var ok = b.textContent === '$'+totalVal;
          app.querySelectorAll('.opcion-btn').forEach(function (x) { x.disabled=true; if (x.textContent==='$'+totalVal) x.classList.add('ok'); else if (x===b) x.classList.add('mal'); });
          if (ok) { EK.Audio.correcto(); if (EK.Mascota) EK.Mascota.reaccionar('bien'); }
          else { EK.Audio.error(); if (EK.Mascota) EK.Mascota.reaccionar('mal'); document.getElementById('feedback').innerHTML='<div class="fb-msg mal">Eran $'+totalVal+'</div>'; }
          ronda++; despues(1200, render);
        });
      });
    }
    render();
  }

  /* 5) MEMORIA DE PALABRAS (español ↔ inglés) */
  function memopal() {
    var pares = [['Perro','Dog'],['Gato','Cat'],['Casa','House'],['Sol','Sun'],['Agua','Water'],['Manzana','Apple'],['Libro','Book'],['Flor','Flower']];
    var elegidos = barajar(pares).slice(0, 5);
    var cartas = barajar([].concat.apply([], elegidos.map(function(p){return [{t:p[0],par:p[0]+p[1]},{t:p[1],par:p[0]+p[1]}];})));
    var volteadas = [], encontradas = 0, lock = false, mov = 0;
    var app = document.getElementById('app');
    app.innerHTML = '<div class="screen juego-screen">' + header('Memoria de palabras','🔤','Mov: 0') +
      '<div class="memoria-grid memopal-grid" id="mem-grid"></div><p class="hint">Uní la palabra en español con su traducción en inglés</p></div>';
    bindVolver(app);
    var grid = document.getElementById('mem-grid');
    cartas.forEach(function (c) {
      var b = document.createElement('button');
      b.className = 'carta'; b.dataset.par = c.par;
      b.innerHTML = '<span class="carta-dorso">❓</span><span class="carta-frente" style="font-size:16px;padding:4px">'+esc(c.t)+'</span>';
      b.addEventListener('click', function () {
        if (lock || b.classList.contains('volteada') || b.classList.contains('ok')) return;
        EK.Audio.flip(); b.classList.add('volteada'); volteadas.push(b);
        if (volteadas.length === 2) {
          mov++; app.querySelector('.quiz-counter').textContent = 'Mov: '+mov; lock = true;
          var a = volteadas[0], bb = volteadas[1];
          if (a.dataset.par === bb.dataset.par) {
            despues(500, function () { a.classList.add('ok'); bb.classList.add('ok'); encontradas++; volteadas=[]; lock=false; EK.Audio.correcto(); if (encontradas===elegidos.length) despues(600, function(){ ganar('Memoria de palabras','🔤'); }); });
          } else {
            despues(1000, function () { a.classList.remove('volteada'); bb.classList.remove('volteada'); volteadas=[]; lock=false; });
          }
        }
      });
      grid.appendChild(b);
    });
  }

  var JuegosExtra = {
    LISTA: LISTA,
    iniciar: function (id) {
      limpiarTimers(); estado.id = id;
      if (id === 'atrapa') atrapa();
      else if (id === 'letras') letras();
      else if (id === 'reloj') reloj();
      else if (id === 'monedas') monedas();
      else if (id === 'memopal') memopal();
    }
  };
  window.EK.JuegosExtra = JuegosExtra;
})();
