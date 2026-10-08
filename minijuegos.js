/* ============================================================
   minijuegos.js — Mundo de Juegos (10 minijuegos)
   Todos comparten puntos, medallas y la misma celebración.
   ============================================================ */
(function () {
  'use strict';
  var barajar = EK.Engine.barajar;
  var esc = EK.Engine.escapeHtml;
  var timers = [];
  function limpiarTimers() { timers.forEach(clearTimeout); timers = []; }
  function despues(ms, fn) { var t = setTimeout(fn, ms); timers.push(t); return t; }

  var LISTA = [
    { id: 'memoria',    nombre: 'Memoria',        emoji: '🧠', desc: 'Encontrá los pares' },
    { id: 'secuencias', nombre: 'Secuencias',     emoji: '🔢', desc: '¿Qué número sigue?' },
    { id: 'diferente',  nombre: 'El diferente',   emoji: '👀', desc: 'Encontrá el distinto' },
    { id: 'rapido',     nombre: 'Cálculo rápido', emoji: '⚡', desc: 'Resolvé seguido' },
    { id: 'patrones',   nombre: 'Patrones',       emoji: '🔴', desc: '¿Qué sigue en la serie?' },
    { id: 'palabra',    nombre: 'Palabra loca',   emoji: '🔤', desc: 'Ordená las letras' },
    { id: 'visual',     nombre: 'Memoria visual', emoji: '🧩', desc: '¿Qué viste?' },
    { id: 'reaccion',   nombre: 'Reacción',       emoji: '🏃', desc: '¡Tocá rápido!' },
    { id: 'formas',     nombre: 'Formas',         emoji: '🔷', desc: 'Reconocé las formas' },
    { id: 'colores',    nombre: 'Colores',        emoji: '🎨', desc: 'Reconocé los colores' }
  ];

  var estadoJuego = { id: null };

  function ganarJuego(nombre, emoji) {
    limpiarTimers();
    EK.Store.addEstrellas(20);
    EK.Store.addJuegoGanado();
    EK.Store.addActividad();
    var nuevas = EK.Store.revisarMedallas();
    if (nuevas.length) EK.Audio.medalla(); else EK.Audio.nivel();
    EK.App.actualizarTopbar();
    var medallasHtml = nuevas.length ? '<div class="nuevas-medallas">' +
      nuevas.map(function (m) { return '<div class="medalla-nueva pop"><span class="medalla-emoji">' + m.emoji + '</span>' + esc(m.nombre) + '</div>'; }).join('') +
      '</div>' : '';
    var app = document.getElementById('app');
    app.innerHTML =
      '<div class="screen premio-screen" style="--acento:#EE5A6F">' +
        '<div class="premio-card pop">' +
          '<div class="premio-emoji">' + emoji + '</div>' +
          '<h2>¡Ganaste! 🎉</h2>' +
          '<div class="premio-stats"><div class="premio-stat"><span class="big">+20</span><span>estrellas ⭐</span></div></div>' +
          medallasHtml +
          '<div class="premio-btns">' +
            '<button class="btn-sec" data-act="jugar">🔄 Jugar de nuevo</button>' +
            '<button class="btn-pri" data-act="volver">🎮 Más juegos</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    app.querySelector('[data-act="jugar"]').addEventListener('click', function () { EK.Audio.click(); EK.Juegos.iniciar(estadoJuego.id); });
    app.querySelector('[data-act="volver"]').addEventListener('click', function () { EK.Audio.click(); EK.App.ir('mundo', { id: 'juegos' }); });
  }

  function headerVolver(titulo, emoji, contador) {
    return '<div class="quiz-head"><button class="back-btn" data-act="volver">←</button>' +
      '<div class="quiz-title">' + emoji + ' ' + esc(titulo) + '</div>' +
      '<div class="quiz-counter">' + (contador || '') + '</div></div>';
  }
  function bindVolver(app) {
    app.querySelector('[data-act="volver"]').addEventListener('click', function () { limpiarTimers(); EK.Audio.click(); EK.App.ir('mundo', { id: 'juegos' }); });
  }
  function opciones3(respuesta, opciones) {
    return barajar(opciones.map(String));
  }

  /* 1) MEMORIA */
  function memoria() {
    var emojis = ['🍎','🌟','🎈','🐶','🚗','🎵','🌸','⚽','🦋','🍕'];
    var pares = barajar(emojis).slice(0, 6);
    var cartas = barajar(pares.concat(pares));
    var volteadas = [], encontradas = 0, lock = false, mov = 0;
    var app = document.getElementById('app');
    app.innerHTML = '<div class="screen juego-screen">' + headerVolver('Memoria','🧠','Mov: 0') +
      '<div class="memoria-grid" id="mem-grid"></div><p class="hint">Tocá dos cartas para encontrar los pares</p></div>';
    bindVolver(app);
    var grid = document.getElementById('mem-grid');
    cartas.forEach(function (em) {
      var c = document.createElement('button');
      c.className = 'carta'; c.dataset.em = em;
      c.innerHTML = '<span class="carta-dorso">❓</span><span class="carta-frente">' + em + '</span>';
      c.addEventListener('click', function () {
        if (lock || c.classList.contains('volteada') || c.classList.contains('ok')) return;
        EK.Audio.flip(); c.classList.add('volteada'); volteadas.push(c);
        if (volteadas.length === 2) {
          mov++; app.querySelector('.quiz-counter').textContent = 'Mov: ' + mov; lock = true;
          var a = volteadas[0], b = volteadas[1];
          if (a.dataset.em === b.dataset.em) {
            despues(500, function () { a.classList.add('ok'); b.classList.add('ok'); encontradas++; volteadas = []; lock = false; EK.Audio.correcto(); if (encontradas === pares.length) despues(600, function () { ganarJuego('Memoria','🧠'); }); });
          } else {
            despues(900, function () { a.classList.remove('volteada'); b.classList.remove('volteada'); volteadas = []; lock = false; });
          }
        }
      });
      grid.appendChild(c);
    });
  }

  /* 2) SECUENCIAS */
  function secuencias() {
    var ronda = 0, correctas = 0, total = 5, lock = false;
    var app = document.getElementById('app');
    function render() {
      if (ronda >= total) { despues(300, function () { ganarJuego('Secuencias','🔢'); }); return; }
      var inicio = Math.floor(Math.random()*5)+1, paso = Math.floor(Math.random()*4)+2;
      var seq = []; for (var i=0;i<4;i++) seq.push(inicio+paso*i);
      var respuesta = inicio+paso*4;
      var opts = barajar([respuesta, respuesta+paso, Math.max(1,respuesta-paso)].map(String));
      lock = false;
      app.innerHTML = '<div class="screen juego-screen">' + headerVolver('Secuencias','🔢',(ronda+1)+'/'+total) +
        '<div class="progress-track"><div class="progress-fill" style="width:'+(ronda/total*100)+'%"></div></div>' +
        '<div class="pregunta-card"><div class="pregunta-texto">¿Qué número sigue?</div><div class="secuencia">'+seq.join(' · ')+' · <span class="signo">?</span></div></div>' +
        '<div class="opciones-grid cols-3">'+opts.map(function(o){return '<button class="opcion-btn" style="--acento:#EE5A6F">'+o+'</button>';}).join('')+'</div>' +
        '<div class="feedback" id="feedback"></div></div>';
      bindVolver(app);
      app.querySelectorAll('.opcion-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          var ok = b.textContent === String(respuesta);
          app.querySelectorAll('.opcion-btn').forEach(function (x) { x.disabled = true; if (x.textContent === String(respuesta)) x.classList.add('ok'); else if (x===b) x.classList.add('mal'); });
          if (ok) { correctas++; EK.Audio.correcto(); document.getElementById('feedback').innerHTML='<div class="fb-msg ok">¡Bien! ⭐</div>'; }
          else { EK.Audio.error(); document.getElementById('feedback').innerHTML='<div class="fb-msg mal">Era el '+respuesta+'</div>'; }
          ronda++; despues(1200, render);
        });
      });
    }
    render();
  }

  /* 3) EL DIFERENTE */
  function diferente() {
    var ronda = 0, total = 5, lock = false;
    var grupos = [['🐶','🐱'],['🍎','🍌'],['⭐','🌟'],['🔴','🔵'],['🚗','✈️'],['🌸','🌻'],['⚽','🏀'],['🐟','🐦']];
    var app = document.getElementById('app');
    function render() {
      if (ronda >= total) { despues(300, function () { ganarJuego('El diferente','👀'); }); return; }
      var par = grupos[Math.floor(Math.random()*grupos.length)];
      var normal = par[0], distinto = par[1], pos = Math.floor(Math.random()*9);
      var celdas = []; for (var i=0;i<9;i++) celdas.push(i===pos ? distinto : normal);
      lock = false;
      app.innerHTML = '<div class="screen juego-screen">' + headerVolver('El diferente','👀',(ronda+1)+'/'+total) +
        '<div class="pregunta-card"><div class="pregunta-texto">¡Encontrá el que es distinto!</div></div>' +
        '<div class="diferente-grid">'+celdas.map(function(c,i){return '<button class="celda-dif" data-i="'+i+'">'+c+'</button>';}).join('')+'</div>' +
        '<div class="feedback" id="feedback"></div></div>';
      bindVolver(app);
      app.querySelectorAll('.celda-dif').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          var ok = Number(b.dataset.i) === pos;
          if (ok) { b.classList.add('ok'); EK.Audio.correcto(); document.getElementById('feedback').innerHTML='<div class="fb-msg ok">¡Lo encontraste! ⭐</div>'; }
          else { b.classList.add('mal'); app.querySelectorAll('.celda-dif')[pos].classList.add('ok'); EK.Audio.error(); document.getElementById('feedback').innerHTML='<div class="fb-msg mal">¡Ahí estaba!</div>'; }
          ronda++; despues(1100, render);
        });
      });
    }
    render();
  }

  /* 4) CÁLCULO RÁPIDO */
  function rapido() {
    var ronda = 0, total = 5, lock = false;
    var app = document.getElementById('app');
    function render() {
      if (ronda >= total) { despues(300, function () { ganarJuego('Cálculo rápido','⚡'); }); return; }
      var a = Math.floor(Math.random()*9)+1, b = Math.floor(Math.random()*9)+1, c = a+b;
      var opts = barajar([c, c+1, c+2, Math.max(1,c-1)].filter(function(v,i,arr){return arr.indexOf(v)===i;}).slice(0,3).map(String));
      lock = false;
      app.innerHTML = '<div class="screen juego-screen">' + headerVolver('Cálculo rápido','⚡',(ronda+1)+'/'+total) +
        '<div class="pregunta-card"><div class="pregunta-texto big-op">'+a+' + '+b+' = ?</div></div>' +
        '<div class="opciones-grid cols-3">'+opts.map(function(o){return '<button class="opcion-btn" style="--acento:#EE5A6F">'+o+'</button>';}).join('')+'</div>' +
        '<div class="feedback" id="feedback"></div></div>';
      bindVolver(app);
      app.querySelectorAll('.opcion-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          var ok = b.textContent === String(c);
          app.querySelectorAll('.opcion-btn').forEach(function (x) { x.disabled=true; if (x.textContent===String(c)) x.classList.add('ok'); else if (x===b) x.classList.add('mal'); });
          if (ok) { EK.Audio.correcto(); document.getElementById('feedback').innerHTML='<div class="fb-msg ok">¡Rápido! ⭐</div>'; }
          else { EK.Audio.error(); document.getElementById('feedback').innerHTML='<div class="fb-msg mal">Era '+c+'</div>'; }
          ronda++; despues(1000, render);
        });
      });
    }
    render();
  }

  /* 5) PATRONES */
  function patrones() {
    var ronda = 0, total = 5, lock = false;
    var pats = [['🔴','🔵'],['⭐','🌙'],['🍎','🍌','🍇'],['🔺','🔻'],['🟢','🟡','🔴']];
    var app = document.getElementById('app');
    function render() {
      if (ronda >= total) { despues(300, function () { ganarJuego('Patrones','🔴'); }); return; }
      var pat = pats[Math.floor(Math.random()*pats.length)];
      var seq = []; for (var i=0;i<5;i++) seq.push(pat[i%pat.length]);
      var respuesta = seq[4];
      var otros = barajar(['⭐','🔵','🍎','🌙','🟢','🔺'].filter(function(x){return x!==respuesta;})).slice(0,2);
      var opts = barajar([respuesta].concat(otros));
      lock = false;
      app.innerHTML = '<div class="screen juego-screen">' + headerVolver('Patrones','🔴',(ronda+1)+'/'+total) +
        '<div class="pregunta-card"><div class="pregunta-texto">¿Qué sigue?</div><div class="secuencia">'+seq.slice(0,4).join(' ')+' <span class="signo">?</span></div></div>' +
        '<div class="opciones-grid cols-3">'+opts.map(function(o){return '<button class="opcion-btn" style="--acento:#EE5A6F;font-size:32px">'+o+'</button>';}).join('')+'</div>' +
        '<div class="feedback" id="feedback"></div></div>';
      bindVolver(app);
      app.querySelectorAll('.opcion-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          var ok = b.textContent === respuesta;
          app.querySelectorAll('.opcion-btn').forEach(function (x) { x.disabled=true; if (x.textContent===respuesta) x.classList.add('ok'); else if (x===b) x.classList.add('mal'); });
          if (ok) { EK.Audio.correcto(); document.getElementById('feedback').innerHTML='<div class="fb-msg ok">¡Bien! ⭐</div>'; }
          else { EK.Audio.error(); document.getElementById('feedback').innerHTML='<div class="fb-msg mal">Era '+respuesta+'</div>'; }
          ronda++; despues(1100, render);
        });
      });
    }
    render();
  }

  /* 6) PALABRA DESORDENADA */
  function palabra() {
    var palabras = ['PERRO','GATO','CASA','SOL','LUNA','FLOR','AGUA','LIBRO','PELOTA','ARBOL'];
    var ronda = 0, total = 5, lock = false;
    var app = document.getElementById('app');
    function render() {
      if (ronda >= total) { despues(300, function () { ganarJuego('Palabra loca','🔤'); }); return; }
      var p = palabras[Math.floor(Math.random()*palabras.length)];
      var letras = barajar(p.split(''));
      while (letras.join('') === p) letras = barajar(p.split(''));
      var otras = barajar(palabras.filter(function(x){return x!==p;})).slice(0,2);
      var opts = barajar([p].concat(otras));
      lock = false;
      app.innerHTML = '<div class="screen juego-screen">' + headerVolver('Palabra loca','🔤',(ronda+1)+'/'+total) +
        '<div class="pregunta-card"><div class="pregunta-texto">Ordená las letras:</div><div class="secuencia">'+letras.join(' · ')+'</div></div>' +
        '<div class="opciones-grid cols-3">'+opts.map(function(o){return '<button class="opcion-btn" style="--acento:#EE5A6F">'+o+'</button>';}).join('')+'</div>' +
        '<div class="feedback" id="feedback"></div></div>';
      bindVolver(app);
      app.querySelectorAll('.opcion-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          var ok = b.textContent === p;
          app.querySelectorAll('.opcion-btn').forEach(function (x) { x.disabled=true; if (x.textContent===p) x.classList.add('ok'); else if (x===b) x.classList.add('mal'); });
          if (ok) { EK.Audio.correcto(); document.getElementById('feedback').innerHTML='<div class="fb-msg ok">¡Correcto! ⭐</div>'; }
          else { EK.Audio.error(); document.getElementById('feedback').innerHTML='<div class="fb-msg mal">Era '+p+'</div>'; }
          ronda++; despues(1200, render);
        });
      });
    }
    render();
  }

  /* 7) MEMORIA VISUAL */
  function visual() {
    var emojis = ['🍎','🌟','🎈','🐶','🚗','🎵','🌸','⚽','🦋','🍕','🐱','🎨'];
    var ronda = 0, total = 5;
    var app = document.getElementById('app');
    function render() {
      if (ronda >= total) { despues(300, function () { ganarJuego('Memoria visual','🧩'); }); return; }
      var grupo = barajar(emojis).slice(0, 4);
      var pregunta = grupo[Math.floor(Math.random()*grupo.length)];
      var otros = barajar(emojis.filter(function(x){return grupo.indexOf(x)===-1;})).slice(0,2);
      var opts = barajar([pregunta].concat(otros));
      app.innerHTML = '<div class="screen juego-screen">' + headerVolver('Memoria visual','🧩',(ronda+1)+'/'+total) +
        '<div class="pregunta-card"><div class="pregunta-texto">¡Mirá bien! 👀</div><div class="secuencia" style="font-size:48px">'+grupo.join(' ')+'</div></div>' +
        '<div class="feedback" id="feedback">Recordá estos objetos...</div></div>';
      bindVolver(app);
      despues(2500, function () {
        app.innerHTML = '<div class="screen juego-screen">' + headerVolver('Memoria visual','🧩',(ronda+1)+'/'+total) +
          '<div class="pregunta-card"><div class="pregunta-texto">¿Cuál apareció?</div></div>' +
          '<div class="opciones-grid cols-3">'+opts.map(function(o){return '<button class="opcion-btn" style="--acento:#EE5A6F;font-size:32px">'+o+'</button>';}).join('')+'</div>' +
          '<div class="feedback" id="feedback"></div></div>';
        bindVolver(app);
        var lock = false;
        app.querySelectorAll('.opcion-btn').forEach(function (b) {
          b.addEventListener('click', function () {
            if (lock) return; lock = true;
            var ok = b.textContent === pregunta;
            app.querySelectorAll('.opcion-btn').forEach(function (x) { x.disabled=true; if (x.textContent===pregunta) x.classList.add('ok'); else if (x===b) x.classList.add('mal'); });
            if (ok) { EK.Audio.correcto(); document.getElementById('feedback').innerHTML='<div class="fb-msg ok">¡Recordaste! ⭐</div>'; }
            else { EK.Audio.error(); document.getElementById('feedback').innerHTML='<div class="fb-msg mal">Era '+pregunta+'</div>'; }
            ronda++; despues(1200, render);
          });
        });
      });
    }
    render();
  }

  /* 8) REACCIÓN */
  function reaccion() {
    var aciertos = 0, total = 5, ronda = 0;
    var app = document.getElementById('app');
    function render() {
      if (ronda >= total) { despues(300, function () { ganarJuego('Reacción','🏃'); }); return; }
      var emojis = ['🎯','⭐','🍎','🎈','⚽'];
      var target = emojis[Math.floor(Math.random()*emojis.length)];
      app.innerHTML = '<div class="screen juego-screen">' + headerVolver('Reacción','🏃',(ronda+1)+'/'+total) +
        '<div class="pregunta-card"><div class="pregunta-texto">¡Tocá el '+target+' rápido!</div></div>' +
        '<div class="reaccion-grid" id="reac-grid"></div>' +
        '<div class="feedback" id="feedback"></div></div>';
      bindVolver(app);
      var grid = document.getElementById('reac-grid');
      var posTarget = Math.floor(Math.random()*9);
      for (var i=0;i<9;i++) {
        var b = document.createElement('button');
        b.className = 'celda-dif';
        b.textContent = i===posTarget ? target : emojis[Math.floor(Math.random()*emojis.length)];
        (function(btn, esTarget){
          btn.addEventListener('click', function () {
            if (esTarget) { aciertos++; EK.Audio.correcto(); document.getElementById('feedback').innerHTML='<div class="fb-msg ok">¡Rápido! ⭐</div>'; }
            else { EK.Audio.error(); document.getElementById('feedback').innerHTML='<div class="fb-msg mal">¡Ese no era!</div>'; }
            ronda++; despues(700, render);
          });
        })(b, i===posTarget);
        grid.appendChild(b);
      }
    }
    render();
  }

  /* 9) FORMAS */
  function formas() {
    var formas = [
      {nombre:'Círculo', emoji:'🔴'}, {nombre:'Cuadrado', emoji:'🟦'}, {nombre:'Triángulo', emoji:'🔺'},
      {nombre:'Estrella', emoji:'⭐'}, {nombre:'Corazón', emoji:'❤️'}, {nombre:'Luna', emoji:'🌙'}
    ];
    var ronda = 0, total = 5, lock = false;
    var app = document.getElementById('app');
    function render() {
      if (ronda >= total) { despues(300, function () { ganarJuego('Formas','🔷'); }); return; }
      var f = formas[Math.floor(Math.random()*formas.length)];
      var otras = barajar(formas.filter(function(x){return x.nombre!==f.nombre;})).slice(0,2).map(function(x){return x.nombre;});
      var opts = barajar([f.nombre].concat(otras));
      lock = false;
      app.innerHTML = '<div class="screen juego-screen">' + headerVolver('Formas','🔷',(ronda+1)+'/'+total) +
        '<div class="pregunta-card"><div class="pregunta-emoji" style="font-size:72px">'+f.emoji+'</div><div class="pregunta-texto">¿Qué forma es?</div></div>' +
        '<div class="opciones-grid cols-3">'+opts.map(function(o){return '<button class="opcion-btn" style="--acento:#EE5A6F">'+o+'</button>';}).join('')+'</div>' +
        '<div class="feedback" id="feedback"></div></div>';
      bindVolver(app);
      app.querySelectorAll('.opcion-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          var ok = b.textContent === f.nombre;
          app.querySelectorAll('.opcion-btn').forEach(function (x) { x.disabled=true; if (x.textContent===f.nombre) x.classList.add('ok'); else if (x===b) x.classList.add('mal'); });
          if (ok) { EK.Audio.correcto(); document.getElementById('feedback').innerHTML='<div class="fb-msg ok">¡Correcto! ⭐</div>'; }
          else { EK.Audio.error(); document.getElementById('feedback').innerHTML='<div class="fb-msg mal">Era '+f.nombre+'</div>'; }
          ronda++; despues(1100, render);
        });
      });
    }
    render();
  }

  /* 10) COLORES */
  function colores() {
    var cols = [
      {nombre:'Rojo', css:'#EE5A6F'}, {nombre:'Azul', css:'#4D96FF'}, {nombre:'Verde', css:'#6BCB77'},
      {nombre:'Amarillo', css:'#FFD93D'}, {nombre:'Naranja', css:'#FF9F43'}, {nombre:'Morado', css:'#A55EEA'}
    ];
    var ronda = 0, total = 5, lock = false;
    var app = document.getElementById('app');
    function render() {
      if (ronda >= total) { despues(300, function () { ganarJuego('Colores','🎨'); }); return; }
      var c = cols[Math.floor(Math.random()*cols.length)];
      var otras = barajar(cols.filter(function(x){return x.nombre!==c.nombre;})).slice(0,2).map(function(x){return x.nombre;});
      var opts = barajar([c.nombre].concat(otras));
      lock = false;
      app.innerHTML = '<div class="screen juego-screen">' + headerVolver('Colores','🎨',(ronda+1)+'/'+total) +
        '<div class="pregunta-card"><div style="width:120px;height:120px;border-radius:50%;background:'+c.css+';margin:0 auto 10px"></div><div class="pregunta-texto">¿De qué color es?</div></div>' +
        '<div class="opciones-grid cols-3">'+opts.map(function(o){return '<button class="opcion-btn" style="--acento:#EE5A6F">'+o+'</button>';}).join('')+'</div>' +
        '<div class="feedback" id="feedback"></div></div>';
      bindVolver(app);
      app.querySelectorAll('.opcion-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          var ok = b.textContent === c.nombre;
          app.querySelectorAll('.opcion-btn').forEach(function (x) { x.disabled=true; if (x.textContent===c.nombre) x.classList.add('ok'); else if (x===b) x.classList.add('mal'); });
          if (ok) { EK.Audio.correcto(); document.getElementById('feedback').innerHTML='<div class="fb-msg ok">¡Correcto! ⭐</div>'; }
          else { EK.Audio.error(); document.getElementById('feedback').innerHTML='<div class="fb-msg mal">Era '+c.nombre+'</div>'; }
          ronda++; despues(1100, render);
        });
      });
    }
    render();
  }

  var Juegos = {
    LISTA: LISTA,
    iniciar: function (id) {
      limpiarTimers();
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
    }
  };
  window.EK.Juegos = Juegos;
})();
