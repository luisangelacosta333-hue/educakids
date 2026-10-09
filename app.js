/* ============================================================
   app.js — Navegación y pantallas (VERSIÓN ULTRA PREMIUM)
   Bug de escuelas reparado. Menús inteligentes con lectura 
   de voz, fluidez mejorada y animaciones conectadas.
   ============================================================ */
(function () {
  'use strict';
  var esc = EK.Engine.escapeHtml;
  var barajar = EK.Engine.barajar;
  var AVATARES = ['🦊','🐼','🐨','🦁','🐯','🐸','🐵','🦄','🐰','🐻','🐧','🦉'];
  var avisoTimer = null;

  /* --- LECTOR DE VOZ PREMIUM PARA LOS MENÚS --- */
  function hablar(texto) {
    if (window.EK && EK.Voz) {
      var textoLimpio = texto.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
      if (typeof EK.Voz.leer === 'function') EK.Voz.leer(textoLimpio);
      else if (typeof EK.Voz.hablar === 'function') EK.Voz.hablar(textoLimpio);
    }
  }

  function ir(pantalla, params) {
    params = params || {};
    var app = document.getElementById('app');
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll suave Premium
    
    if (pantalla === 'inicio') renderInicio();
    else if (pantalla === 'mundo') renderMundo(params.id);
    else if (pantalla === 'idioma-cat') renderIdiomaCat(params.idioma);
    else if (pantalla === 'aprender') renderAprender(params.idioma, params.cat);
    else if (pantalla === 'perfil') renderPerfil();
    else if (pantalla === 'desafio') renderDesafio();
    else if (pantalla === 'rueda') renderRueda();
    else if (pantalla === 'padres') renderPadresGate();
    else if (pantalla === 'creatividad') renderCreatividad();
    actualizarTopbar();
  }

  function renderInicio() {
    var app = document.getElementById('app');
    var e = EK.Store.estado;
    var tarjetas = EK.Mundos.MUNDOS.map(function (m) {
      var prog = EK.Store.progresoMundo(m.id);
      return '<button class="mundo-card" data-id="'+m.id+'" style="--mc:'+m.color+'">' +
        '<div class="mundo-emoji">'+m.emoji+'</div><div class="mundo-nombre">'+esc(m.nombre)+'</div>' +
        '<div class="mundo-desc">'+esc(m.desc)+'</div>' +
        '<div class="mundo-prog"><div class="mundo-prog-fill" style="width:'+prog+'%"></div></div></button>';
    }).join('');
    
    var desafioOk = EK.Store.desafioDisponible();
    var ruedaOk = EK.Store.ruedaDisponible();
    var especiales =
      '<button class="especial-card '+(desafioOk?'':'done')+'" data-act="desafio" style="--mc:#FF6B6B">' +
        '<span class="esp-emoji">🎯</span><span class="esp-txt"><b>Desafío del día</b><small>'+(desafioOk?'¡Completalo y ganá +50 ⭐!':'¡Ya lo completaste hoy!')+'</small></span></button>' +
      '<button class="especial-card '+(ruedaOk?'':'done')+'" data-act="rueda" style="--mc:#A55EEA">' +
        '<span class="esp-emoji">🎡</span><span class="esp-txt"><b>Rueda de premios</b><small>'+(ruedaOk?'Girá y ganá estrellas':'Ya la usaste hoy')+'</small></span></button>';
        
    app.innerHTML = '<div class="screen inicio-screen">' +
      '<div class="hero"><div class="hero-logo">🌟</div><h1 class="titulo">EducaKids</h1><p class="subtitulo">✨ Aprendé jugando ✨</p></div>' +
      '<div class="especiales-grid">'+especiales+'</div>' +
      '<div class="mundos-grid">'+tarjetas+'</div>' +
      '<p class="footer-note">Tocá un mundo para empezar tu aventura 🚀 · 🦊 Luna te acompaña</p></div>';
      
    app.querySelectorAll('.mundo-card').forEach(function (c) { 
      c.addEventListener('click', function () { 
        EK.Audio.click(); ir('mundo', { id: c.dataset.id }); 
      }); 
    });
    app.querySelectorAll('.especial-card').forEach(function (c) { 
      c.addEventListener('click', function () { EK.Audio.click(); ir(c.dataset.act); }); 
    });
  }

  function renderMundo(id) {
    var m = EK.Mundos.MUNDOS.find(function (x) { return x.id === id; });
    if (!m) { ir('inicio'); return; }
    
    hablar(m.nombre); // Premium: La mascota dice el nombre del mundo al entrar

    if (m.tipo === 'niveles') renderNiveles(m);
    else if (m.tipo === 'categorias') renderCategorias(m);
    else if (m.tipo === 'idiomas') renderIdiomas();
    else if (m.tipo === 'juegos') renderJuegos();
    else if (m.tipo === 'creatividad') renderCreatividad();
    else if (m.tipo === 'escuela') renderEscuela(m);
  }

  /* ESCUELAS DEL FUTURO (IA, Programación, Robótica) - BUG REPARADO ✅ */
  function renderEscuela(m) {
    var app = document.getElementById('app');
    // CORRECCIÓN VITAL: Cambiamos "var esc" a "var escuelaData" para que no rompa la función escapeHtml
    var escuelaData = EK.Escuelas.ESCUELAS[m.id]; 
    var desb = EK.Escuelas.nivelDesbloqueado(m.id);
    var prog = EK.Escuelas.progreso(m.id);
    
    var html = escuelaData.niveles.map(function (nv, n) {
      var lock = (n + 1) > desb, done = EK.Escuelas.nivelCompletado(m.id, n);
      var acts = nv.actividades.map(function (act, a) {
        var adone = EK.Escuelas.actCompletada(m.id, n, a);
        return '<button class="act-btn ' + (adone ? 'done' : '') + '" data-n="' + n + '" data-a="' + a + '" ' + (lock ? 'disabled' : '') + ' style="--acento:' + m.color + '">' + act.emoji + ' ' + esc(act.nombre) + (adone ? ' ✅' : '') + '</button>';
      }).join('');
      return '<div class="nivel-escuela ' + (lock ? 'lock' : '') + (done ? ' done' : '') + '">' +
        '<div class="nivel-escuela-head"><span class="nivel-emoji">' + EK.Escuelas.NIVELES_EMOJIS[n] + '</span>' +
        '<span>Nivel ' + (n + 1) + ': ' + esc(nv.nombre) + '</span>' + (done ? '<span>✅</span>' : (lock ? '<span>🔒</span>' : '')) + '</div>' +
        '<div class="acts-grid">' + acts + '</div></div>';
    }).join('');
    
    app.innerHTML = '<div class="screen escuela-screen" style="--acento:' + m.color + '">' + headerMundo(m, '<div class="progreso-esc">' + prog + '%</div>') +
      '<div class="progress-track"><div class="progress-fill" style="width:' + prog + '%"></div></div>' +
      '<p class="hint">Completá las 2 actividades de cada nivel para desbloquear el siguiente. ¡Al terminar los 5 niveles ganás tu certificado 🎓!</p>' +
      '<div class="escuela-niveles">' + html + '</div></div>';
      
    bindInicio(app);
    app.querySelectorAll('.act-btn:not([disabled])').forEach(function (b) {
      b.addEventListener('click', function () { 
        EK.Audio.click(); 
        EK.Escuelas.iniciarActividad(m.id, Number(b.dataset.n), Number(b.dataset.a)); 
      });
    });
  }

  function headerMundo(m, extra) {
    return '<div class="quiz-head" style="--acento:'+m.color+'"><button class="back-btn" data-act="inicio">←</button>' +
      '<div class="quiz-title"><span class="q-emoji">'+m.emoji+'</span> '+esc(m.nombre)+'</div>' + (extra || '<div></div>') + '</div>';
  }
  function bindInicio(app) { var b = app.querySelector('[data-act="inicio"]'); if (b) b.addEventListener('click', function () { EK.Audio.click(); ir('inicio'); }); }

  var generadores = { matematicas: EK.Mundos.genMate, dinero: EK.Mundos.genDinero, verde: EK.Mundos.genVerde };
  
  function empezarNivel(id, nivel) {
    var m = EK.Mundos.MUNDOS.find(function (x) { return x.id === id; });
    var gen = generadores[id];
    var first = !EK.Store.esNivelCompletado(id, nivel);
    EK.Engine.iniciar({
      mundoId: id, titulo: m.nombre + ' · Nivel ' + nivel, emoji: m.emoji, color: m.color,
      nivel: nivel, bonus: first ? 50 : 0,
      preguntas: gen(nivel),
      onRepetir: function () { empezarNivel(id, nivel); },
      onSiguiente: nivel < EK.Store.NIVELES_POR_MUNDO ? function () { empezarNivel(id, nivel + 1); } : null,
      onVolver: function () { ir('mundo', { id: id }); },
      onFinish: function (s) {
        if (s.aprobo) {
          var wasFirst = EK.Store.marcarNivelCompletado(id, nivel);
          if (wasFirst && EK.Store.mundoCompleto(id)) { EK.Store.addEstrellas(100); EK.App.mostrarAviso('🌍 ¡Mundo completado! +100 ⭐'); hablar('¡Felicidades! Completaste este mundo.'); }
        }
      }
    });
    actualizarTopbar();
  }

  function renderNiveles(m) {
    var app = document.getElementById('app');
    var desbloqueado = EK.Store.nivel(m.id);
    var html = '';
    for (var n = 1; n <= EK.Store.NIVELES_POR_MUNDO; n++) {
      var lock = n > desbloqueado, done = EK.Store.esNivelCompletado(m.id, n);
      html += '<button class="nivel-btn '+(lock?'lock':'')+'" data-n="'+n+'" style="--acento:'+m.color+'" '+(lock?'disabled':'')+'>' +
        '<span class="nivel-num">'+(lock?'🔒':n)+'</span><span class="nivel-label">Nivel '+n+'</span>' +
        (done?'<span class="nivel-ok">✅</span>':(n===desbloqueado?'<span class="nivel-actual">¡Jugá!</span>':'')) + '</button>';
    }
    app.innerHTML = '<div class="screen niveles-screen" style="--acento:'+m.color+'">'+headerMundo(m)+
      '<p class="hint">Completá con el 60% de aciertos para desbloquear el siguiente</p>' +
      '<div class="niveles-grid">'+html+'</div></div>';
    bindInicio(app);
    app.querySelectorAll('.nivel-btn:not(.lock)').forEach(function (b) { 
      b.addEventListener('click', function () { EK.Audio.click(); empezarNivel(m.id, Number(b.dataset.n)); }); 
    });
  }

  function renderCategorias(m) {
    var app = document.getElementById('app');
    var datos = (EK.DATOS && EK.DATOS[m.id]) || {};
    var cats = Object.keys(datos);
    var html = cats.map(function (c) {
      return '<button class="cat-btn" data-cat="'+esc(c)+'" style="--acento:'+m.color+'">'+esc(c)+'</button>';
    }).join('');
    app.innerHTML = '<div class="screen categorias-screen" style="--acento:'+m.color+'">'+headerMundo(m)+
      '<p class="hint">Elegí un tema para explorar</p><div class="categorias-grid">'+html+'</div></div>';
    bindInicio(app);
    app.querySelectorAll('.cat-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        EK.Audio.click();
        var cat = b.dataset.cat;
        hablar(cat); // Premium: Lee la categoría elegida
        var banco = datos[cat].map(function (x) { return { pregunta: x.pregunta, opciones: x.opciones, correcta: x.correcta }; });
        var opts = {
          mundoId: m.id, titulo: cat, emoji: m.emoji, color: m.color, nivel: EK.Store.nivel(m.id),
          preguntas: banco,
          onRepetir: function () { EK.Engine.iniciar(opts); },
          onVolver: function () { ir('mundo', { id: m.id }); }
        };
        EK.Engine.iniciar(opts);
      });
    });
  }

  function renderIdiomas() {
    var app = document.getElementById('app');
    var m = EK.Mundos.MUNDOS.find(function (x) { return x.id === 'idiomas'; });
    var html = Object.keys(EK.Mundos.IDIOMAS).map(function (id) {
      var i = EK.Mundos.IDIOMAS[id];
      return '<button class="idioma-btn" data-idioma="'+id+'" style="--acento:'+m.color+'"><span class="idioma-bandera">'+i.bandera+'</span><span>'+esc(i.nombre)+'</span></button>';
    }).join('');
    app.innerHTML = '<div class="screen idiomas-screen" style="--acento:'+m.color+'">'+headerMundo(m)+
      '<p class="hint">¿Qué idioma querés aprender?</p><div class="idiomas-grid">'+html+'</div></div>';
    bindInicio(app);
    app.querySelectorAll('.idioma-btn').forEach(function (b) { 
      b.addEventListener('click', function () { 
        EK.Audio.click(); 
        ir('idioma-cat', { idioma: b.dataset.idioma }); 
      }); 
    });
  }

  function renderIdiomaCat(idiomaId) {
    var app = document.getElementById('app');
    var i = EK.Mundos.IDIOMAS[idiomaId];
    hablar("Aprender " + i.nombre);
    
    var html = Object.keys(i.categorias).map(function (cat) {
      return '<button class="cat-btn" data-cat="'+esc(cat)+'" style="--acento:#4ECDC4">'+esc(cat)+' <span class="cat-cant">('+i.categorias[cat].length+')</span></button>';
    }).join('');
    app.innerHTML = '<div class="screen idiomacat-screen" style="--acento:#4ECDC4">' +
      '<div class="quiz-head"><button class="back-btn" data-act="volver-idiomas">←</button><div class="quiz-title">'+i.bandera+' '+esc(i.nombre)+'</div><div></div></div>' +
      '<p class="hint">Elegí una categoría</p><div class="categorias-grid">'+html+'</div></div>';
    app.querySelector('[data-act="volver-idiomas"]').addEventListener('click', function () { EK.Audio.click(); renderIdiomas(); });
    app.querySelectorAll('.cat-btn').forEach(function (b) { 
      b.addEventListener('click', function () { 
        EK.Audio.click(); 
        ir('aprender', { idioma: idiomaId, cat: b.dataset.cat }); 
      }); 
    });
  }

  function renderAprender(idiomaId, cat) {
    var app = document.getElementById('app');
    var i = EK.Mundos.IDIOMAS[idiomaId];
    var lista = i.categorias[cat];
    var idx = 0;
    function renderCard() {
      var v = lista[idx];
      app.innerHTML = '<div class="screen aprender-screen" style="--acento:#4ECDC4">' +
        '<div class="quiz-head"><button class="back-btn" data-act="volver">←</button><div class="quiz-title">'+i.bandera+' '+esc(cat)+'</div><div class="quiz-counter">'+(idx+1)+'/'+lista.length+'</div></div>' +
        '<div class="flashcard pop"><div class="flash-emoji">'+v.emoji+'</div><div class="flash-es">'+esc(v.es)+'</div><div class="flash-tr">'+esc(v.tr)+'</div>' +
        '<button class="btn-pri escuchar-btn" data-act="escuchar">🔊 Escuchar</button></div>' +
        '<div class="flash-nav">' +
        (idx>0?'<button class="btn-sec" data-act="antes">← Anterior</button>':'<span></span>') +
        (idx<lista.length-1?'<button class="btn-pri" data-act="despues">Siguiente →</button>':'<button class="btn-pri" data-act="quiz">🎯 Quiz</button>') +
        '</div>' +
        (idx===lista.length-1?'<div style="text-align:center;margin-top:14px"><button class="btn-sec" data-act="quiz-escuchar" style="border: 2px solid #4ECDC4;">👂 Quiz Auditivo</button></div>':'') +
        '</div>';
        
      app.querySelector('[data-act="volver"]').addEventListener('click', function () { EK.Audio.click(); ir('idioma-cat', { idioma: idiomaId }); });
      app.querySelector('[data-act="escuchar"]').addEventListener('click', function () { EK.Audio.click(); EK.Audio.hablar(v.tr, i.lang); });
      var ant = app.querySelector('[data-act="antes"]'); if (ant) ant.addEventListener('click', function () { EK.Audio.click(); idx--; renderCard(); });
      var des = app.querySelector('[data-act="despues"]'); if (des) des.addEventListener('click', function () { EK.Audio.click(); idx++; renderCard(); });
      var quiz = app.querySelector('[data-act="quiz"]'); if (quiz) quiz.addEventListener('click', function () { empezarQuizIdioma(idiomaId, cat, false); });
      var qe = app.querySelector('[data-act="quiz-escuchar"]'); if (qe) qe.addEventListener('click', function () { empezarQuizIdioma(idiomaId, cat, true); });
      
      EK.Audio.hablar(v.tr, i.lang);
    }
    renderCard();
  }

  function empezarQuizIdioma(idiomaId, cat, escuchar) {
    var i = EK.Mundos.IDIOMAS[idiomaId];
    var lista = i.categorias[cat];
    var preguntas = escuchar ? EK.Mundos.genQuizEscuchar(lista, i.lang) : EK.Mundos.genQuizIdioma(lista, i.nombre);
    
    if(escuchar) hablar("¡A escuchar atentamente!");

    var opts = {
      mundoId: 'idiomas', titulo: i.nombre + ' · ' + cat, emoji: i.bandera, color: '#4ECDC4',
      preguntas: preguntas,
      onPreguntaRender: escuchar ? function (p) { if (p.audio) { setTimeout(function () { EK.Audio.hablar(p.audio.texto, p.audio.lang); }, 400); } } : null,
      onRepetir: function () { empezarQuizIdioma(idiomaId, cat, escuchar); },
      onVolver: function () { ir('idioma-cat', { idioma: idiomaId }); },
      onFinish: function () { EK.Store.marcarIdiomaCompletado(idiomaId); }
    };
    EK.Engine.iniciar(opts);
  }

  function renderJuegos() {
    var app = document.getElementById('app');
    var m = EK.Mundos.MUNDOS.find(function (x) { return x.id === 'juegos'; });
    var lista = EK.Juegos.LISTA.concat(EK.JuegosExtra ? EK.JuegosExtra.LISTA : []);
    var extraIds = (EK.JuegosExtra ? EK.JuegosExtra.LISTA : []).map(function (j) { return j.id; });
    var html = lista.map(function (j) {
      return '<button class="juego-btn" data-id="'+j.id+'" style="--acento:'+m.color+'"><span class="juego-emoji">'+j.emoji+'</span>' +
        '<span class="juego-nombre">'+esc(j.nombre)+'</span><span class="juego-desc">'+esc(j.desc)+'</span></button>';
    }).join('');
    app.innerHTML = '<div class="screen juegos-screen" style="--acento:'+m.color+'">'+headerMundo(m)+
      '<p class="hint">¡Cada juego que ganás te da +20 estrellas! · '+lista.length+' juegos</p><div class="juegos-grid">'+html+'</div></div>';
    bindInicio(app);
    app.querySelectorAll('.juego-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        EK.Audio.click();
        if (EK.JuegosExtra && extraIds.indexOf(b.dataset.id) !== -1) EK.JuegosExtra.iniciar(b.dataset.id);
        else EK.Juegos.iniciar(b.dataset.id);
      });
    });
  }

  function renderCreatividad() {
    var app = document.getElementById('app');
    var m = EK.Mundos.MUNDOS.find(function (x) { return x.id === 'creatividad'; });
    var acts = [
      { id: 'dibujar', emoji: '🎨', nombre: 'Dibujar', desc: 'Lienzo libre con colores' },
      { id: 'formas', emoji: '🔷', nombre: 'Formas', desc: 'Reconocé las formas' },
      { id: 'colores', emoji: '🌈', nombre: 'Colores', desc: 'Reconocé los colores' },
      { id: 'personaje', emoji: '👤', nombre: 'Crear personaje', desc: 'Armá tu personaje' }
    ];
    var html = acts.map(function (a) {
      return '<button class="juego-btn" data-id="'+a.id+'" style="--acento:'+m.color+'"><span class="juego-emoji">'+a.emoji+'</span>' +
        '<span class="juego-nombre">'+a.nombre+'</span><span class="juego-desc">'+a.desc+'</span></button>';
    }).join('');
    app.innerHTML = '<div class="screen juegos-screen" style="--acento:'+m.color+'">'+headerMundo(m)+
      '<p class="hint">Elegí una actividad creativa</p><div class="juegos-grid">'+html+'</div></div>';
    bindInicio(app);
    app.querySelectorAll('.juego-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        EK.Audio.click();
        var id = b.dataset.id;
        hablar(id);
        if (id === 'dibujar') EK.Dibujo.iniciar();
        else if (id === 'formas') quizFormasColores('formas');
        else if (id === 'colores') quizFormasColores('colores');
        else if (id === 'personaje') crearPersonaje();
      });
    });
  }

  function quizFormasColores(tipo) {
    var formas = [
      { p: '¿Qué forma es? 🔴', c: 'Círculo', opts: ['Círculo','Cuadrado','Triángulo'] },
      { p: '¿Qué forma es? 🟦', c: 'Cuadrado', opts: ['Círculo','Cuadrado','Triángulo'] },
      { p: '¿Qué forma es? 🔺', c: 'Triángulo', opts: ['Círculo','Cuadrado','Triángulo'] },
      { p: '¿Qué forma es? ⭐', c: 'Estrella', opts: ['Estrella','Corazón','Luna'] },
      { p: '¿Qué forma tiene una pelota? ⚽', c: 'Círculo', opts: ['Círculo','Cuadrado','Triángulo'] }
    ];
    var colores = [
      { p: '¿De qué color es el cielo? 🌤️', c: 'Azul', opts: ['Azul','Rojo','Verde'] },
      { p: '¿De qué color es el pasto? 🌱', c: 'Verde', opts: ['Verde','Amarillo','Rosa'] },
      { p: '¿De qué color es el sol? ☀️', c: 'Amarillo', opts: ['Amarillo','Negro','Azul'] },
      { p: '¿De qué color es una fresa? 🍓', c: 'Rojo', opts: ['Rojo','Azul','Verde'] },
      { p: '¿De qué color es el chocolate? 🍫', c: 'Marrón', opts: ['Marrón','Rosa','Celeste'] }
    ];
    var banco = (tipo === 'formas' ? formas : colores).map(function (x) { return { pregunta: x.p, opciones: barajar(x.opts), correcta: x.c }; });
    EK.Engine.iniciar({
      mundoId: 'creatividad', titulo: tipo === 'formas' ? '🔷 Formas' : '🌈 Colores', emoji: tipo==='formas'?'🔷':'🌈', color: '#F368E0',
      preguntas: banco, onRepetir: function () { quizFormasColores(tipo); }, onVolver: function () { renderCreatividad(); }
    });
  }

  function crearPersonaje() {
    var app = document.getElementById('app');
    var caras = ['😊','😎','🤩','😜','🥳','🤠','👽','👻','🤡'];
    var accesorios = ['🎩','👑','🎀','🧢','👓','⛑️','🎧','🎓','🌸'];
    var estado = { cara: 0, acc: 0, premio: false };
    function render() {
      app.innerHTML = '<div class="screen crear-personaje">' +
        '<div class="quiz-head"><button class="back-btn" data-act="volver">←</button><div class="quiz-title">👤 Crear personaje</div><div></div></div>' +
        '<div class="personaje-preview"><span class="personaje-acc">'+accesorios[estado.acc]+'</span><span class="personaje-cara">'+caras[estado.cara]+'</span></div>' +
        '<div class="personaje-opts"><b>Cara:</b><div class="mini-grid">'+caras.map(function(c,i){return '<button class="mini-btn '+(i===estado.cara?'sel':'')+'" data-cara="'+i+'">'+c+'</button>';}).join('')+'</div></div>' +
        '<div class="personaje-opts"><b>Accesorio:</b><div class="mini-grid">'+accesorios.map(function(a,i){return '<button class="mini-btn '+(i===estado.acc?'sel':'')+'" data-acc="'+i+'">'+a+'</button>';}).join('')+'</div></div>' +
        '<div style="text-align:center;margin-top:20px"><button class="btn-pri" data-act="listo">✅ ¡Listo! +5 ⭐</button></div></div>';
      app.querySelector('[data-act="volver"]').addEventListener('click', function () { EK.Audio.click(); renderCreatividad(); });
      app.querySelectorAll('[data-cara]').forEach(function (b) { b.addEventListener('click', function () { EK.Audio.click(); estado.cara = Number(b.dataset.cara); render(); }); });
      app.querySelectorAll('[data-acc]').forEach(function (b) { b.addEventListener('click', function () { EK.Audio.click(); estado.acc = Number(b.dataset.acc); render(); }); });
      app.querySelector('[data-act="listo"]').addEventListener('click', function () {
        if (!estado.premio) { estado.premio = true; EK.Store.addEstrellas(5); EK.Store.addActividad(); EK.Store.revisarMedallas(); actualizarTopbar(); }
        EK.Audio.nivel(); hablar('¡Qué personaje tan genial!'); EK.App.mostrarAviso('¡Qué personaje tan genial! +5 ⭐');
      });
    }
    render();
  }

  /* DESAFÍO DIARIO */
  function desafioDelDia() {
    var opciones = [
      { id: 'matematicas', texto: 'Resolvé 5 preguntas de Matemáticas 🔢', gen: function(){ return EK.Mundos.genMate(3); } },
      { id: 'ciencia', texto: 'Respondé 5 preguntas de Ciencia 🔬', gen: function(){ var k = Object.keys(EK.DATOS.ciencia)[0]; return EK.DATOS.ciencia[k].map(function(x){return {pregunta:x.pregunta,opciones:x.opciones,correcta:x.correcta};}); } },
      { id: 'verde', texto: 'Respondé 5 preguntas del Mundo Verde 🌱', gen: function(){ return EK.Mundos.genVerde(2); } },
      { id: 'geografia', texto: 'Respondé 5 preguntas de Geografía 🗺️', gen: function(){ var k = Object.keys(EK.DATOS.geografia)[0]; return EK.DATOS.geografia[k].map(function(x){return {pregunta:x.pregunta,opciones:x.opciones,correcta:x.correcta};}); } }
    ];
    var dia = Number(EK.Store.hoyStr().replace(/-/g,''));
    return opciones[dia % opciones.length];
  }
  
  function renderDesafio() {
    var app = document.getElementById('app');
    var d = desafioDelDia();
    if (!EK.Store.desafioDisponible()) {
      app.innerHTML = '<div class="screen premio-screen"><div class="premio-card pop"><div class="premio-emoji">✅</div><h2>¡Ya completaste el desafío de hoy!</h2><p class="hint">Volvé mañana por un nuevo desafío 🎯</p><div class="premio-btns"><button class="btn-pri" data-act="volver">🏠 Volver</button></div></div></div>';
      app.querySelector('[data-act="volver"]').addEventListener('click', function () { ir('inicio'); });
      return;
    }
    
    hablar('Desafío del día. ¡Completalo para ganar cincuenta estrellas!');
    
    app.innerHTML = '<div class="screen premio-screen"><div class="premio-card pop"><div class="premio-emoji">🎯</div><h2>Desafío del día</h2><p style="font-size:18px;margin:10px 0;font-weight:bold;">'+esc(d.texto)+'</p><p class="hint">Al completarlo ganás <b>+50 ⭐</b> extra</p><div class="premio-btns"><button class="btn-pri" data-act="empezar">🚀 ¡Empezar!</button><button class="btn-sec" data-act="volver">🏠 Volver</button></div></div></div>';
    app.querySelector('[data-act="volver"]').addEventListener('click', function () { ir('inicio'); });
    app.querySelector('[data-act="empezar"]').addEventListener('click', function () {
      EK.Audio.click();
      EK.Engine.iniciar({
        mundoId: 'desafio', titulo: '🎯 Desafío del día', emoji: '🎯', color: '#FF6B6B', cantidad: 5,
        preguntas: d.gen(),
        onRepetir: function () { renderDesafio(); },
        onVolver: function () { ir('inicio'); },
        onFinish: function (s) {
          if (s.aprobo && EK.Store.desafioDisponible()) {
            EK.Store.marcarDesafio(); EK.Store.addEstrellas(50); EK.Store.revisarMedallas();
            EK.App.mostrarAviso('🎯 ¡Desafío completado! +50 ⭐');
            hablar("¡Desafío completado!");
          }
        }
      });
    });
  }

  /* RUEDA DE PREMIOS */
  function renderRueda() {
    var app = document.getElementById('app');
    if (!EK.Store.ruedaDisponible()) {
      app.innerHTML = '<div class="screen premio-screen"><div class="premio-card pop"><div class="premio-emoji">🎡</div><h2>Ya giraste la rueda hoy</h2><p class="hint">Volvé mañana para girar de nuevo</p><div class="premio-btns"><button class="btn-pri" data-act="volver">🏠 Volver</button></div></div></div>';
      app.querySelector('[data-act="volver"]').addEventListener('click', function () { ir('inicio'); });
      return;
    }
    
    hablar('¡A girar la rueda de premios!');
    var premios = [10, 20, 50, 15, 25, 10, 20, 30];
    
    app.innerHTML = '<div class="screen premio-screen"><div class="premio-card pop"><div class="premio-emoji" id="rueda-emoji" style="font-size:100px;">🎡</div><h2>Rueda de premios</h2><p class="hint" id="rueda-msg" style="font-size:18px;">Tocá el botón para girar</p><div class="premio-btns"><button class="btn-pri" id="girar" style="transform: scale(1.1); margin:10px;">🎡 ¡Girar!</button><button class="btn-sec" data-act="volver">🏠 Volver</button></div></div></div>';
    app.querySelector('[data-act="volver"]').addEventListener('click', function () { ir('inicio'); });
    document.getElementById('girar').addEventListener('click', function () {
      this.disabled = true; EK.Audio.click();
      var emoji = document.getElementById('rueda-emoji');
      emoji.style.animation = 'spin .2s linear infinite'; // Giro más rápido y emocionante
      var premio = premios[Math.floor(Math.random()*premios.length)];
      
      setTimeout(function () {
        emoji.style.animation = 'pop .6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        EK.Store.marcarRueda(); EK.Store.addEstrellas(premio); EK.Store.addActividad(); EK.Store.revisarMedallas();
        EK.Audio.nivel(); actualizarTopbar();
        document.getElementById('rueda-msg').innerHTML = '¡Ganaste <b>+'+premio+' ⭐</b>! 🎉';
        document.getElementById('rueda-emoji').textContent = '⭐';
        hablar('Ganaste ' + premio + ' estrellas');
      }, 2000);
    });
  }

  /* MODO PADRES */
  function renderPadresGate() {
    var app = document.getElementById('app');
    var a = Math.floor(Math.random()*8)+2, b = Math.floor(Math.random()*8)+2;
    hablar('Modo padres. Resuelve la multiplicación para entrar.');
    
    app.innerHTML = '<div class="screen premio-screen"><div class="premio-card pop"><div class="premio-emoji">👨‍👩‍👧</div><h2>Modo Padres</h2><p class="hint">Para entrar, resolvé:</p><div class="pregunta-texto" style="font-size:32px;margin:14px 0;color:var(--acento);">¿Cuánto es '+a+' × '+b+'?</div><input type="number" id="padre-resp" class="padre-input" placeholder="Tu respuesta" /><div class="premio-btns" style="margin-top:16px;"><button class="btn-pri" id="padre-ok">✅ Entrar</button><button class="btn-sec" data-act="volver">🏠 Volver</button></div></div></div>';
    app.querySelector('[data-act="volver"]').addEventListener('click', function () { ir('perfil'); });
    document.getElementById('padre-ok').addEventListener('click', function () {
      if (Number(document.getElementById('padre-resp').value) === a*b) { EK.Audio.correcto(); renderPadresPanel(); }
      else { EK.Audio.error(); EK.App.mostrarAviso('Respuesta incorrecta 🤔'); }
    });
  }

  function renderPadresPanel() {
    var app = document.getElementById('app');
    var e = EK.Store.estado;
    var prog = EK.Mundos.MUNDOS.map(function (m) {
      var p = EK.Store.progresoMundo(m.id);
      return '<div class="prog-row"><span class="prog-emoji">'+m.emoji+'</span><span class="prog-nombre">'+esc(m.nombre)+'</span><div class="prog-track"><div class="prog-fill" style="width:'+p+'%;background:'+m.color+'"></div></div><span class="prog-pct">'+p+'%</span></div>';
    }).join('');
    app.innerHTML = '<div class="screen perfil-screen"><div class="quiz-head"><button class="back-btn" data-act="volver">←</button><div class="quiz-title">👨‍👩‍👧 Panel de Padres</div><div></div></div>' +
      '<div class="perfil-seccion"><h3>📊 Resumen General</h3>' +
      '<div class="padres-grid"><div class="pstat"><span class="big">⭐ '+e.estrellas+'</span><span>estrellas</span></div>' +
      '<div class="pstat"><span class="big">🔥 '+e.racha+'</span><span>días de racha</span></div>' +
      '<div class="pstat"><span class="big">✅ '+e.correctas+'</span><span>respuestas correctas</span></div>' +
      '<div class="pstat"><span class="big">🎯 '+e.actividades+'</span><span>actividades</span></div>' +
      '<div class="pstat"><span class="big">🎮 '+e.juegosGanados+'</span><span>juegos ganados</span></div>' +
      '<div class="pstat"><span class="big">🏅 '+e.medallas.length+'</span><span>medallas</span></div>' +
      '<div class="pstat"><span class="big">⏱️ '+EK.Store.tiempoHoyMin()+' min</span><span>tiempo hoy</span></div>' +
      '<div class="pstat"><span class="big">⏱️ '+EK.Store.tiempoTotalMin()+' min</span><span>tiempo total</span></div></div></div>' +
      '<div class="perfil-seccion"><h3>🌍 Progreso por mundo</h3>'+prog+'</div>' +
      '<div class="perfil-seccion"><button class="btn-sec reset-btn" data-act="reset">🗑️ Reiniciar todo el progreso</button></div></div>';
    app.querySelector('[data-act="volver"]').addEventListener('click', function () { ir('perfil'); });
    app.querySelector('[data-act="reset"]').addEventListener('click', function () {
      if (confirm('⚠️ ¿Estás seguro? Se borrará TODO el progreso, estrellas y medallas del niño. Esta acción no se puede deshacer.')) { 
        EK.Store.reset(); actualizarTopbar(); ir('inicio'); 
      }
    });
  }

  /* PERFIL */
  function renderPerfil() {
    var app = document.getElementById('app');
    var e = EK.Store.estado;
    hablar('Mi Perfil');
    
    var avataresHtml = AVATARES.map(function (a, i) { return '<button class="avatar-opt '+(i===e.avatar?'sel':'')+'" data-i="'+i+'">'+a+'</button>'; }).join('');
    var medallasHtml = EK.Store.MEDALLAS.map(function (m) {
      var tiene = e.medallas.indexOf(m.id) !== -1;
      return '<div class="medalla-item '+(tiene?'':'no')+'" title="'+esc(m.desc)+'"><span class="medalla-emoji">'+(tiene?m.emoji:'🔒')+'</span><span>'+esc(m.nombre)+'</span></div>';
    }).join('');
    var progresoHtml = EK.Mundos.MUNDOS.map(function (m) {
      var p = EK.Store.progresoMundo(m.id);
      return '<div class="prog-row"><span class="prog-emoji">'+m.emoji+'</span><span class="prog-nombre">'+esc(m.nombre)+'</span><div class="prog-track"><div class="prog-fill" style="width:'+p+'%;background:'+m.color+'"></div></div><span class="prog-pct">'+p+'%</span></div>';
    }).join('');
    
    var nombreMascota = EK.Mascota ? EK.Mascota.getNombre() : 'Luna';
    
    app.innerHTML = '<div class="screen perfil-screen">' +
      '<div class="quiz-head"><button class="back-btn" data-act="inicio">←</button><div class="quiz-title">👤 Mi Perfil</div><div></div></div>' +
      '<div class="perfil-hero"><div class="perfil-avatar">'+AVATARES[e.avatar]+'</div>' +
      '<input class="perfil-nombre" id="perfil-nombre" value="'+esc(e.nombre)+'" maxlength="20" placeholder="Escribí tu nombre..." />' +
      '<div class="perfil-stats">' +
        '<div class="pstat"><span class="big">⭐ '+e.estrellas+'</span><span>estrellas</span></div>' +
        '<div class="pstat"><span class="big">Nivel '+EK.Store.nivelGeneral()+'</span><span>nivel general</span></div>' +
        '<div class="pstat"><span class="big">🔥 '+e.racha+'</span><span>días de racha</span></div>' +
        '<div class="pstat"><span class="big">⏱️ '+EK.Store.tiempoHoyMin()+' min</span><span>jugado hoy</span></div>' +
        '<div class="pstat"><span class="big">🏅 '+e.medallas.length+'/'+EK.Store.MEDALLAS.length+'</span><span>medallas</span></div>' +
        '<div class="pstat"><span class="big">🦊 '+esc(nombreMascota)+'</span><span>tu mascota</span></div>' +
      '</div></div>' +
      '<div class="perfil-seccion"><h3>🎭 Elegí tu avatar</h3><div class="avatares-grid">'+avataresHtml+'</div></div>' +
      '<div class="perfil-seccion"><h3>🏆 Mis medallas</h3><div class="medallas-grid">'+medallasHtml+'</div></div>' +
      '<div class="perfil-seccion"><h3>📊 Progreso por mundo</h3>'+progresoHtml+'</div>' +
      '<div class="perfil-seccion"><button class="btn-sec" data-act="padres">👨‍👩‍👧 Opciones para Padres</button></div></div>';
      
    bindInicio(app);
    app.querySelectorAll('.avatar-opt').forEach(function (b) { 
      b.addEventListener('click', function () { 
        EK.Audio.click(); EK.Store.setAvatar(Number(b.dataset.i)); renderPerfil(); 
      }); 
    });
    document.getElementById('perfil-nombre').addEventListener('change', function () { 
      EK.Store.setNombre(this.value); actualizarTopbar(); 
    });
    app.querySelector('[data-act="padres"]').addEventListener('click', function () { 
      EK.Audio.click(); renderPadresGate(); 
    });
  }

  function actualizarTopbar() {
    var e = EK.Store.estado;
    var se = document.getElementById('stat-estrellas'); if (se) se.querySelector('b').textContent = e.estrellas;
    var sm = document.getElementById('stat-medallas'); if (sm) sm.querySelector('b').textContent = e.medallas.length;
    var sr = document.getElementById('stat-racha'); if (sr) sr.querySelector('b').textContent = e.racha;
    var bp = document.getElementById('btn-perfil'); if (bp) bp.textContent = AVATARES[e.avatar] || '👤';
    var bs = document.getElementById('btn-sonido'); if (bs) bs.textContent = EK.Audio.muted ? '🔇' : '🔊';
  }
  
  function mostrarAviso(msg) {
    var modal = document.getElementById('modal');
    document.getElementById('modal-card').innerHTML = '<div class="aviso pop">'+esc(msg)+'</div>';
    modal.classList.remove('hidden');
    if (avisoTimer) clearTimeout(avisoTimer);
    avisoTimer = setTimeout(function () { modal.classList.add('hidden'); }, 2600); // Un poco más de tiempo para leer
  }

  function init() {
    EK.Store.registrarDia();
    document.getElementById('btn-inicio').addEventListener('click', function () { EK.Audio.click(); ir('inicio'); });
    document.getElementById('btn-perfil').addEventListener('click', function () { EK.Audio.click(); ir('perfil'); });
    document.getElementById('btn-sonido').addEventListener('click', function () { var m = EK.Audio.toggle(); if (!m) EK.Audio.click(); actualizarTopbar(); });
    
    var ultimo = Date.now();
    setInterval(function () { var ahora = Date.now(); EK.Store.addTiempo(Math.round((ahora-ultimo)/1000)); ultimo = ahora; }, 15000);
    
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
    }
    
    ir('inicio');
    actualizarTopbar();
    if (EK.Mascota) { 
      EK.Mascota.saludoInicial(); 
      EK.Mascota.actualizarNivel(EK.Store.nivelGeneral()); 
    }
  }

  var App = { ir: ir, actualizarTopbar: actualizarTopbar, mostrarAviso: mostrarAviso, renderInicio: renderInicio, renderCreatividad: renderCreatividad };
  window.EK.App = App;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
