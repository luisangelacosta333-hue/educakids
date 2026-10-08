/* ============================================================
   app.js — Navegación y pantallas (v2 completa)
   Novedades: racha 🔥, desafío diario 🎯, rueda 🎡, modo padres,
   hub de creatividad, modo escuchar-y-elegir, anti-farm, tiempo.
   ============================================================ */
(function () {
  'use strict';
  var esc = EK.Engine.escapeHtml;
  var barajar = EK.Engine.barajar;
  var AVATARES = ['🦊','🐼','🐨','🦁','🐯','🐸','🐵','🦄','🐰','🐻','🐧','🦉'];
  var avisoTimer = null;

  /* ================= ROUTER ================= */
  function ir(pantalla, params) {
    params = params || {};
    var app = document.getElementById('app');
    window.scrollTo(0, 0);
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

  /* ================= INICIO ================= */
  function renderInicio() {
    var app = document.getElementById('app');
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
        '<span class="esp-emoji">🎯</span><span class="esp-txt"><b>Desafío del día</b><small>'+(desafioOk?'¡Completalo y ganá +50 ⭐!':'¡Ya lo completaste hoy!')+'</small></span>' +
      '</button>' +
      '<button class="especial-card '+(ruedaOk?'':'done')+'" data-act="rueda" style="--mc:#A55EEA">' +
        '<span class="esp-emoji">🎡</span><span class="esp-txt"><b>Rueda de premios</b><small>'+(ruedaOk?'Girá y ganá estrellas':'Ya la usaste hoy')+'</small></span>' +
      '</button>';

    app.innerHTML = '<div class="screen inicio-screen">' +
      '<div class="hero"><div class="hero-logo">🌟</div><h1 class="titulo">EducaKids</h1><p class="subtitulo">✨ Aprendé jugando ✨</p></div>' +
      '<div class="especiales-grid">'+especiales+'</div>' +
      '<div class="mundos-grid">'+tarjetas+'</div>' +
      '<p class="footer-note">Tocá un mundo para empezar tu aventura 🚀</p></div>';
    app.querySelectorAll('.mundo-card').forEach(function (c) { c.addEventListener('click', function () { EK.Audio.click(); ir('mundo', { id: c.dataset.id }); }); });
    app.querySelectorAll('.especial-card').forEach(function (c) { c.addEventListener('click', function () { EK.Audio.click(); ir(c.dataset.act); }); });
  }

  /* ================= MUNDO: despacha por tipo ================= */
  function renderMundo(id) {
    var m = EK.Mundos.MUNDOS.find(function (x) { return x.id === id; });
    if (!m) { ir('inicio'); return; }
    if (m.tipo === 'niveles') renderNiveles(m);
    else if (m.tipo === 'categorias') renderCategorias(m);
    else if (m.tipo === 'idiomas') renderIdiomas();
    else if (m.tipo === 'juegos') renderJuegos();
    else if (m.tipo === 'creatividad') renderCreatividad();
  }

  function headerMundo(m, extra) {
    return '<div class="quiz-head" style="--acento:'+m.color+'"><button class="back-btn" data-act="inicio">←</button>' +
      '<div class="quiz-title"><span class="q-emoji">'+m.emoji+'</span> '+esc(m.nombre)+'</div>' + (extra || '<div></div>') + '</div>';
  }
  function bindInicio(app) { var b = app.querySelector('[data-act="inicio"]'); if (b) b.addEventListener('click', function () { EK.Audio.click(); ir('inicio'); }); }

  /* ================= NIVELES (Matemáticas, Dinero, Verde) ================= */
  function generadorPara(id) {
    if (id === 'matematicas') return EK.Mundos.genMate;
    if (id === 'dinero') return EK.Mundos.genDinero;
    if (id === 'verde') return EK.Mundos.genVerde;
    return null;
  }
  function empezarNivel(id, nivel) {
    var m = EK.Mundos.MUNDOS.find(function (x) { return x.id === id; });
    var gen = generadorPara(id);
    var first = !EK.Store.esNivelCompletado(id, nivel); // anti-farm
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
          if (wasFirst && EK.Store.mundoCompleto(id)) {
            EK.Store.addEstrellas(100);
            EK.App.mostrarAviso('🌍 ¡Mundo completado! +100 ⭐');
          }
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
      var lock = n > desbloqueado;
      var done = EK.Store.esNivelCompletado(m.id, n);
      html += '<button class="nivel-btn '+(lock?'lock':'')+'" data-n="'+n+'" style="--acento:'+m.color+'" '+(lock?'disabled':'')+'>' +
        '<span class="nivel-num">'+(lock?'🔒':n)+'</span><span class="nivel-label">Nivel '+n+'</span>' +
        (done?'<span class="nivel-ok">✅</span>':(n===desbloqueado?'<span class="nivel-actual">¡Jugá!</span>':'')) + '</button>';
    }
    app.innerHTML = '<div class="screen niveles-screen" style="--acento:'+m.color+'">'+headerMundo(m)+
      '<p class="hint">Completá con el 60% de aciertos para desbloquear el siguiente · 10 niveles</p>' +
      '<div class="niveles-grid">'+html+'</div></div>';
    bindInicio(app);
    app.querySelectorAll('.nivel-btn:not(.lock)').forEach(function (b) {
      b.addEventListener('click', function () { EK.Audio.click(); empezarNivel(m.id, Number(b.dataset.n)); });
    });
  }

  /* ================= CATEGORÍAS (Ciencia) ================= */
  function renderCategorias(m) {
    var app = document.getElementById('app');
    var cats = Object.keys(EK.Mundos.CIENCIA);
    var html = cats.map(function (c) {
      return '<button class="cat-btn" data-cat="'+esc(c)+'" style="--acento:'+m.color+'">'+c+'</button>';
    }).join('');
    app.innerHTML = '<div class="screen categorias-screen" style="--acento:'+m.color+'">'+headerMundo(m)+
      '<p class="hint">Elegí un tema para explorar</p><div class="categorias-grid">'+html+'</div></div>';
    bindInicio(app);
    app.querySelectorAll('.cat-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        EK.Audio.click();
        var cat = b.dataset.cat;
        var banco = EK.Mundos.CIENCIA[cat].map(function (x) { return { pregunta: x.pregunta, opciones: x.opciones, correcta: x.correcta }; });
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

  /* ================= IDIOMAS ================= */
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
    app.querySelectorAll('.idioma-btn').forEach(function (b) { b.addEventListener('click', function () { EK.Audio.click(); ir('idioma-cat', { idioma: b.dataset.idioma }); }); });
  }

  function renderIdiomaCat(idiomaId) {
    var app = document.getElementById('app');
    var i = EK.Mundos.IDIOMAS[idiomaId];
    var html = Object.keys(i.categorias).map(function (cat) {
      return '<button class="cat-btn" data-cat="'+esc(cat)+'" style="--acento:#4ECDC4">'+cat+' <span class="cat-cant">('+i.categorias[cat].length+')</span></button>';
    }).join('');
    app.innerHTML = '<div class="screen idiomacat-screen" style="--acento:#4ECDC4">' +
      '<div class="quiz-head"><button class="back-btn" data-act="volver-idiomas">←</button><div class="quiz-title">'+i.bandera+' '+esc(i.nombre)+'</div><div></div></div>' +
      '<p class="hint">Elegí una categoría</p><div class="categorias-grid">'+html+'</div></div>';
    app.querySelector('[data-act="volver-idiomas"]').addEventListener('click', function () { EK.Audio.click(); renderIdiomas(); });
    app.querySelectorAll('.cat-btn').forEach(function (b) { b.addEventListener('click', function () { EK.Audio.click(); ir('aprender', { idioma: idiomaId, cat: b.dataset.cat }); }); });
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
        (idx===lista.length-1?'<div style="text-align:center;margin-top:10px"><button class="btn-sec" data-act="quiz-escuchar">👂 Escuchar y elegir</button></div>':'') +
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

  /* ================= JUEGOS ================= */
  function renderJuegos() {
    var app = document.getElementById('app');
    var m = EK.Mundos.MUNDOS.find(function (x) { return x.id === 'juegos'; });
    var html = EK.Juegos.LISTA.map(function (j) {
      return '<button class="juego-btn" data-id="'+j.id+'" style="--acento:'+m.color+'"><span class="juego-emoji">'+j.emoji+'</span>' +
        '<span class="juego-nombre">'+esc(j.nombre)+'</span><span class="juego-desc">'+esc(j.desc)+'</span></button>';
    }).join('');
    app.innerHTML = '<div class="screen juegos-screen" style="--acento:'+m.color+'">'+headerMundo(m)+
      '<p class="hint">¡Cada juego que ganás te da +20 estrellas!</p><div class="juegos-grid">'+html+'</div></div>';
    bindInicio(app);
    app.querySelectorAll('.juego-btn').forEach(function (b) { b.addEventListener('click', function () { EK.Audio.click(); EK.Juegos.iniciar(b.dataset.id); }); });
  }

  /* ================= CREATIVIDAD (hub) ================= */
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
      { p: '¿De qué color es el cielo? ☀️→🌤️', c: 'Azul', opts: ['Azul','Rojo','Verde'] },
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
    var caras = ['😊','😎','🤩','😜','🥳','🤠'];
    var accesorios = ['🎩','👑','🎀','🧢','👓','⛑️'];
    var estado = { cara: 0, acc: 0, premio: false };
    function render() {
      app.innerHTML = '<div class="screen crear-personaje">' +
        '<div class="quiz-head"><button class="back-btn" data-act="volver">←</button><div class="quiz-title">👤 Crear personaje</div><div></div></div>' +
        '<div class="personaje-preview"><span class="personaje-acc">'+accesorios[estado.acc]+'</span><span class="personaje-cara">'+caras[estado.cara]+'</span></div>' +
        '<div class="personaje-opts"><b>Cara:</b><div class="mini-grid">'+caras.map(function(c,i){return '<button class="mini-btn '+(i===estado.cara?'sel':'')+'" data-cara="'+i+'">'+c+'</button>';}).join('')+'</div></div>' +
        '<div class="personaje-opts"><b>Accesorio:</b><div class="mini-grid">'+accesorios.map(function(a,i){return '<button class="mini-btn '+(i===estado.acc?'sel':'')+'" data-acc="'+i+'">'+a+'</button>';}).join('')+'</div></div>' +
        '<div style="text-align:center;margin-top:14px"><button class="btn-pri" data-act="listo">✅ ¡Listo! +5 ⭐</button></div></div>';
      app.querySelector('[data-act="volver"]').addEventListener('click', function () { EK.Audio.click(); renderCreatividad(); });
      app.querySelectorAll('[data-cara]').forEach(function (b) { b.addEventListener('click', function () { EK.Audio.click(); estado.cara = Number(b.dataset.cara); render(); }); });
      app.querySelectorAll('[data-acc]').forEach(function (b) { b.addEventListener('click', function () { EK.Audio.click(); estado.acc = Number(b.dataset.acc); render(); }); });
      app.querySelector('[data-act="listo"]').addEventListener('click', function () {
        if (!estado.premio) { estado.premio = true; EK.Store.addEstrellas(5); EK.Store.addActividad(); EK.Store.revisarMedallas(); actualizarTopbar(); }
        EK.Audio.nivel(); EK.App.mostrarAviso('¡Qué personaje tan genial! +5 ⭐');
      });
    }
    render();
  }

  /* ================= DESAFÍO DIARIO ================= */
  function desafioDelDia() {
    var opciones = [
      { id: 'matematicas', texto: 'Resolvé 5 preguntas de Matemáticas 🔢', gen: function(){ return EK.Mundos.genMate(3); } },
      { id: 'ciencia', texto: 'Respondé 5 preguntas de Ciencia 🔬', gen: function(){ var k = Object.keys(EK.Mundos.CIENCIA)[0]; return EK.Mundos.CIENCIA[k].map(function(x){return {pregunta:x.pregunta,opciones:x.opciones,correcta:x.correcta};}); } },
      { id: 'verde', texto: 'Respondé 5 preguntas del Mundo Verde 🌱', gen: function(){ return EK.Mundos.genVerde(2); } },
      { id: 'dinero', texto: 'Respondé 5 preguntas de Dinero 💰', gen: function(){ return EK.Mundos.genDinero(3); } }
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
    app.innerHTML = '<div class="screen premio-screen"><div class="premio-card pop"><div class="premio-emoji">🎯</div><h2>Desafío del día</h2><p style="font-size:18px;margin:10px 0">'+esc(d.texto)+'</p><p class="hint">Al completarlo ganás <b>+50 ⭐</b> extra</p><div class="premio-btns"><button class="btn-pri" data-act="empezar">🚀 ¡Empezar!</button><button class="btn-sec" data-act="volver">🏠 Volver</button></div></div></div>';
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
            EK.Store.marcarDesafio();
            EK.Store.addEstrellas(50);
            EK.Store.revisarMedallas();
            EK.App.mostrarAviso('🎯 ¡Desafío completado! +50 ⭐');
          }
        }
      });
    });
  }

  /* ================= RUEDA DE PREMIOS ================= */
  function renderRueda() {
    var app = document.getElementById('app');
    if (!EK.Store.ruedaDisponible()) {
      app.innerHTML = '<div class="screen premio-screen"><div class="premio-card pop"><div class="premio-emoji">🎡</div><h2>Ya giraste la rueda hoy</h2><p class="hint">Volvé mañana para girar de nuevo</p><div class="premio-btns"><button class="btn-pri" data-act="volver">🏠 Volver</button></div></div></div>';
      app.querySelector('[data-act="volver"]').addEventListener('click', function () { ir('inicio'); });
      return;
    }
    var premios = [10, 20, 50, 15, 25, 10, 20, 30];
    app.innerHTML = '<div class="screen premio-screen"><div class="premio-card pop"><div class="premio-emoji" id="rueda-emoji">🎡</div><h2>Rueda de premios</h2><p class="hint" id="rueda-msg">Tocá el botón para girar</p><div class="premio-btns"><button class="btn-pri" id="girar">🎡 ¡Girar!</button><button class="btn-sec" data-act="volver">🏠 Volver</button></div></div></div>';
    app.querySelector('[data-act="volver"]').addEventListener('click', function () { ir('inicio'); });
    document.getElementById('girar').addEventListener('click', function () {
      this.disabled = true;
      EK.Audio.click();
      var emoji = document.getElementById('rueda-emoji');
      emoji.style.animation = 'spin .3s linear infinite';
      var premio = premios[Math.floor(Math.random()*premios.length)];
      setTimeout(function () {
        emoji.style.animation = '';
        EK.Store.marcarRueda();
        EK.Store.addEstrellas(premio);
        EK.Store.addActividad();
        EK.Store.revisarMedallas();
        EK.Audio.nivel();
        actualizarTopbar();
        document.getElementById('rueda-msg').innerHTML = '¡Ganaste <b>+'+premio+' ⭐</b>! 🎉';
        document.getElementById('rueda-emoji').textContent = '⭐';
      }, 1800);
    });
  }

  /* ================= MODO PADRES ================= */
  function renderPadresGate() {
    var app = document.getElementById('app');
    var a = Math.floor(Math.random()*8)+2, b = Math.floor(Math.random()*8)+2;
    app.innerHTML = '<div class="screen premio-screen"><div class="premio-card pop"><div class="premio-emoji">👨‍👩‍👧</div><h2>Modo Padres</h2><p class="hint">Para entrar, resolvé:</p><div class="pregunta-texto" style="font-size:28px;margin:10px 0">¿Cuánto es '+a+' × '+b+'?</div><input type="number" id="padre-resp" class="padre-input" placeholder="Tu respuesta" /><div class="premio-btns"><button class="btn-pri" id="padre-ok">✅ Entrar</button><button class="btn-sec" data-act="volver">🏠 Volver</button></div></div></div>';
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
      '<div class="perfil-seccion"><h3>📊 Resumen</h3>' +
      '<div class="padres-grid"><div class="pstat"><span class="big">⭐ '+e.estrellas+'</span><span>estrellas</span></div>' +
      '<div class="pstat"><span class="big">🔥 '+e.racha+'</span><span>días de racha</span></div>' +
      '<div class="pstat"><span class="big">✅ '+e.correctas+'</span><span>respuestas correctas</span></div>' +
      '<div class="pstat"><span class="big">🎯 '+e.actividades+'</span><span>actividades</span></div>' +
      '<div class="pstat"><span class="big">🎮 '+e.juegosGanados+'</span><span>juegos ganados</span></div>' +
      '<div class="pstat"><span class="big">🏅 '+e.medallas.length+'</span><span>medallas</span></div>' +
      '<div class="pstat"><span class="big">⏱️ '+EK.Store.tiempoHoyMin()+' min</span><span>hoy</span></div>' +
      '<div class="pstat"><span class="big">⏱️ '+EK.Store.tiempoTotalMin()+' min</span><span>en total</span></div></div></div>' +
      '<div class="perfil-seccion"><h3>🌍 Progreso por mundo</h3>'+prog+'</div>' +
      '<div class="perfil-seccion"><button class="btn-sec reset-btn" data-act="reset">🗑️ Reiniciar todo el progreso</button></div></div>';
    app.querySelector('[data-act="volver"]').addEventListener('click', function () { ir('perfil'); });
    app.querySelector('[data-act="reset"]').addEventListener('click', function () {
      if (confirm('¿Seguro? Se borra TODO el progreso del niño.')) { EK.Store.reset(); actualizarTopbar(); ir('inicio'); }
    });
  }

  /* ================= PERFIL ================= */
  function renderPerfil() {
    var app = document.getElementById('app');
    var e = EK.Store.estado;
    var avataresHtml = AVATARES.map(function (a, i) { return '<button class="avatar-opt '+(i===e.avatar?'sel':'')+'" data-i="'+i+'">'+a+'</button>'; }).join('');
    var medallasHtml = EK.Store.MEDALLAS.map(function (m) {
      var tiene = e.medallas.indexOf(m.id) !== -1;
      return '<div class="medalla-item '+(tiene?'':'no')+'" title="'+esc(m.desc)+'"><span class="medalla-emoji">'+(tiene?m.emoji:'🔒')+'</span><span>'+esc(m.nombre)+'</span></div>';
    }).join('');
    var progresoHtml = EK.Mundos.MUNDOS.map(function (m) {
      var p = EK.Store.progresoMundo(m.id);
      return '<div class="prog-row"><span class="prog-emoji">'+m.emoji+'</span><span class="prog-nombre">'+esc(m.nombre)+'</span><div class="prog-track"><div class="prog-fill" style="width:'+p+'%;background:'+m.color+'"></div></div><span class="prog-pct">'+p+'%</span></div>';
    }).join('');
    app.innerHTML = '<div class="screen perfil-screen">' +
      '<div class="quiz-head"><button class="back-btn" data-act="inicio">←</button><div class="quiz-title">👤 Mi Perfil</div><div></div></div>' +
      '<div class="perfil-hero"><div class="perfil-avatar">'+AVATARES[e.avatar]+'</div>' +
      '<input class="perfil-nombre" id="perfil-nombre" value="'+esc(e.nombre)+'" maxlength="20" />' +
      '<div class="perfil-stats">' +
        '<div class="pstat"><span class="big">⭐ '+e.estrellas+'</span><span>estrellas</span></div>' +
        '<div class="pstat"><span class="big">Nivel '+EK.Store.nivelGeneral()+'</span><span>nivel general</span></div>' +
        '<div class="pstat"><span class="big">🔥 '+e.racha+'</span><span>días de racha</span></div>' +
        '<div class="pstat"><span class="big">⏱️ '+EK.Store.tiempoHoyMin()+' min</span><span>hoy</span></div>' +
        '<div class="pstat"><span class="big">🏅 '+e.medallas.length+'/'+EK.Store.MEDALLAS.length+'</span><span>medallas</span></div>' +
      '</div></div>' +
      '<div class="perfil-seccion"><h3>🎭 Elegí tu avatar</h3><div class="avatares-grid">'+avataresHtml+'</div></div>' +
      '<div class="perfil-seccion"><h3>🏆 Mis medallas</h3><div class="medallas-grid">'+medallasHtml+'</div></div>' +
      '<div class="perfil-seccion"><h3>📊 Progreso por mundo</h3>'+progresoHtml+'</div>' +
      '<div class="perfil-seccion"><button class="btn-sec" data-act="padres">👨‍👩‍👧 Modo Padres</button></div></div>';
    bindInicio(app);
    app.querySelectorAll('.avatar-opt').forEach(function (b) { b.addEventListener('click', function () { EK.Audio.click(); EK.Store.setAvatar(Number(b.dataset.i)); renderPerfil(); }); });
    document.getElementById('perfil-nombre').addEventListener('change', function () { EK.Store.setNombre(this.value); actualizarTopbar(); });
    app.querySelector('[data-act="padres"]').addEventListener('click', function () { EK.Audio.click(); renderPadresGate(); });
  }

  /* ================= TOPBAR y avisos ================= */
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
    avisoTimer = setTimeout(function () { modal.classList.add('hidden'); }, 2400);
  }

  /* ================= INICIALIZACIÓN ================= */
  function init() {
    EK.Store.registrarDia(); // actualiza racha
    document.getElementById('btn-inicio').addEventListener('click', function () { EK.Audio.click(); ir('inicio'); });
    document.getElementById('btn-perfil').addEventListener('click', function () { EK.Audio.click(); ir('perfil'); });
    document.getElementById('btn-sonido').addEventListener('click', function () { var m = EK.Audio.toggle(); if (!m) EK.Audio.click(); actualizarTopbar(); });
    // timer de tiempo de uso (cada 15s suma 15s)
    var ultimo = Date.now();
    setInterval(function () { var ahora = Date.now(); EK.Store.addTiempo(Math.round((ahora-ultimo)/1000)); ultimo = ahora; }, 15000);
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
    }
    ir('inicio');
    actualizarTopbar();
  }

  var App = { ir: ir, actualizarTopbar: actualizarTopbar, mostrarAviso: mostrarAviso, renderInicio: renderInicio, renderCreatividad: renderCreatividad };
  window.EK.App = App;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
