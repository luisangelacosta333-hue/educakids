/* ============================================================
   engine.js — MOTOR DE PREGUNTAS REUTILIZABLE (SÚPER PREMIUM)
   - Lee la pregunta Y las opciones en voz alta al aparecer.
   - Cada opción tiene botón 🔊 para escucharla de a una.
   - Al acertar: celebra (confeti + estrellas) y EXPLICA por qué
     es correcta, leído en voz alta (campo `explicacion`).
   - Al errar: dice cuál era la correcta + pista/explicación.
   - Botón 🎤 opcional por pregunta (campo `repetir`) para que el
     niño repita una palabra en otro idioma y gane estrellas extra.
   - Animaciones: acierto brillante, error temblor, feedback pop.
   API conservada: EK.Engine.iniciar(opts) con los mismos hooks.
   Nuevos campos por pregunta: explicacion, pista, repetir (opc.).
   ============================================================ */
(function () {
  'use strict';

  var q = null;
  var timers = [];
  function limpiarTimers() { timers.forEach(clearTimeout); timers = []; }
  function despues(ms, fn) { var t = setTimeout(fn, ms); timers.push(t); return t; }

  function barajar(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  /* ---------- CSS inyectado (animaciones premium) ---------- */
  function inyectarCSS() {
    if (document.getElementById('engine-css')) return;
    var st = document.createElement('style');
    st.id = 'engine-css';
    st.textContent =
      '.progress-fill{transition:width .5s ease;}' +
      '.opcion-btn{position:relative;transition:transform .15s ease, box-shadow .2s ease;}' +
      '.opcion-btn:active{transform:scale(.96);}' +
      '.opcion-btn.ok{animation:engineOk .6s ease; box-shadow:0 0 0 4px #6BCB77, 0 8px 20px rgba(107,203,119,.4);}' +
      '@keyframes engineOk{0%{transform:scale(1)}40%{transform:scale(1.08)}100%{transform:scale(1)}}' +
      '.opcion-btn.mal{animation:engineShake .45s ease; box-shadow:0 0 0 4px #EE5A6F;}' +
      '@keyframes engineShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}' +
      '.op-escuchar{margin-left:8px;opacity:.7;font-size:16px;cursor:pointer;background:#eef2fb;border-radius:50%;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;}' +
      '.op-escuchar:hover{opacity:1;background:#4D96FF;color:#fff;}' +
      '.explicacion-box{margin-top:10px;padding:12px 14px;border-radius:14px;background:#fff8e1;border:2px solid #FFD93D;font-size:15px;color:#5a4a1a;animation:enginePop .4s ease;}' +
      '.fb-msg{animation:enginePop .35s ease;}' +
      '@keyframes enginePop{0%{transform:scale(.7);opacity:0}100%{transform:scale(1);opacity:1}}' +
      '.mic-btn{margin-top:12px;background:linear-gradient(135deg,#4D96FF,#A55EEA);color:#fff;border:none;border-radius:20px;padding:8px 16px;font-weight:700;cursor:pointer;font-size:14px;}' +
      '.mic-btn:active{transform:scale(.95);}';
    document.head.appendChild(st);
  }

  /* ---------- Voz: limpia emojis y lee ---------- */
  var RE_EMOJI = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
  function limpiarTexto(t) { return String(t || '').replace(RE_EMOJI, '').replace(/\s+/g, ' ').trim(); }
  function vozHablar(texto, lang, rate) {
    if (window.EK && EK.Voz) {
      var t = limpiarTexto(texto);
      if (t) EK.Voz.hablar(t, lang, rate);
    }
  }
  function letras(i) { return ['A', 'B', 'C', 'D', 'E'][i] || String(i + 1); }

  /* Lee pregunta + opciones en cadena (con sus letras A/B/C) */
  function leerPreguntaCompleta(p) {
    if (!window.EK || !EK.Voz) return;
    if (p.audio) { EK.Voz.hablar(limpiarTexto(p.audio.texto), p.audio.lang); return; }
    var textos = [];
    if (p.pregunta) textos.push(limpiarTexto(p.pregunta));
    if (p.opciones && p.opciones.length) {
      textos.push('Las opciones son:');
      p.opciones.forEach(function (op, i) {
        textos.push('Opción ' + letras(i) + ': ' + limpiarTexto(op));
      });
    }
    EK.Voz.hablarSecuencia(textos, 'es-AR');
  }

  function iniciar(opts) {
    inyectarCSS();
    limpiarTimers();
    if (EK.Voz) EK.Voz.callar();
    q = {
      opts: opts,
      mundoId: opts.mundoId,
      titulo: opts.titulo,
      emoji: opts.emoji || '🎯',
      color: opts.color || '#FF6B6B',
      nivel: opts.nivel || null,
      bonus: (opts.bonus === undefined ? 50 : opts.bonus),
      preguntas: barajar(opts.preguntas).slice(0, opts.cantidad || 8),
      idx: 0, correctas: 0, lock: false, estrellasSesion: 0
    };
    renderPregunta();
  }

  function renderPregunta() {
    var app = document.getElementById('app');
    var p = q.preguntas[q.idx];
    var total = q.preguntas.length;
    var prog = Math.round((q.idx / total) * 100);
    var cols = Math.min(4, p.opciones.length);

    var opcionesHtml = barajar(p.opciones).map(function (op, i) {
      return '<button class="opcion-btn" style="--acento:' + q.color + '">' +
        '<span class="op-texto">' + escapeHtml(op) + '</span>' +
        '<span class="op-escuchar" data-escuchar title="Escuchar opción">🔊</span>' +
        '</button>';
    }).join('');

    var micHtml = p.repetir
      ? '<button class="mic-btn" data-act="mic">🎤 Repetí la palabra y ganá +5 ⭐</button>'
      : '';

    app.innerHTML =
      '<div class="screen quiz-screen" style="--acento:' + q.color + '">' +
        '<div class="quiz-head">' +
          '<button class="back-btn" data-act="volver" aria-label="Volver">←</button>' +
          '<div class="quiz-title"><span class="q-emoji">' + q.emoji + '</span> ' + escapeHtml(q.titulo) + '</div>' +
          '<div class="quiz-counter">' + (q.idx + 1) + '/' + total + ' · ' + prog + '%</div>' +
        '</div>' +
        '<div class="progress-track"><div class="progress-fill" style="width:' + prog + '%"></div></div>' +
        '<div class="pregunta-card">' +
          (p.emojiPregunta ? '<div class="pregunta-emoji">' + p.emojiPregunta + '</div>' : '') +
          '<div class="pregunta-texto">' + escapeHtml(p.pregunta) + '</div>' +
          '<button class="btn-sec escuchar-preg" data-act="repetir" style="margin-top:15px;font-weight:bold;">🔊 Escuchar de nuevo</button>' +
          micHtml +
        '</div>' +
        '<div class="opciones-grid cols-' + cols + '">' + opcionesHtml + '</div>' +
        '<div class="feedback" id="feedback"></div>' +
      '</div>';

    app.querySelectorAll('.opcion-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { responder(btn); });
    });
    app.querySelectorAll('.op-escuchar').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        EK.Audio.click();
        var txt = b.parentElement.querySelector('.op-texto').textContent;
        vozHablar(txt);
      });
    });
    app.querySelector('[data-act="volver"]').addEventListener('click', function () {
      EK.Audio.click(); limpiarTimers(); if (EK.Voz) EK.Voz.callar();
      if (q.opts.onVolver) q.opts.onVolver(); else EK.App.ir('inicio');
    });
    app.querySelector('[data-act="repetir"]').addEventListener('click', function () { EK.Audio.click(); leerPreguntaCompleta(p); });

    var micBtn = app.querySelector('[data-act="mic"]');
    if (micBtn) micBtn.addEventListener('click', function () {
      EK.Audio.click();
      var r = p.repetir, palabra = typeof r === 'string' ? r : r.palabra, idioma = (r && r.idioma) || 'en-US';
      if (EK.Voz && EK.Voz.repeticionGuiada) {
        micBtn.disabled = true;
        EK.Voz.repeticionGuiada(palabra, idioma).then(function (res) {
          micBtn.disabled = false;
          if (res.ok) {
            q.estrellasSesion += 5;
            EK.Store.addEstrellas(5);
            EK.App.actualizarTopbar();
            var fb = document.getElementById('feedback');
            fb.innerHTML = '<div class="fb-msg ok">🎤 ¡Lo dijiste perfecto! <b>+5 ⭐</b></div>';
          }
        });
      }
    });

    if (q.opts.onPreguntaRender) q.opts.onPreguntaRender(p);

    /* Lee la pregunta + opciones al entrar */
    despues(450, function () { leerPreguntaCompleta(p); });
  }

  function responder(btn) {
    if (q.lock) return;
    q.lock = true;

    var p = q.preguntas[q.idx];
    var elegido = btn.querySelector('.op-texto').textContent.trim();

    vozHablar(elegido);

    var esCorrecto = elegido === p.correcta;
    var botones = document.querySelectorAll('.opcion-btn');
    botones.forEach(function (b) {
      b.disabled = true;
      var txt = b.querySelector('.op-texto').textContent.trim();
      if (txt === p.correcta) b.classList.add('ok');
      else if (b === btn) b.classList.add('mal');
    });

    var fb = document.getElementById('feedback');
    var demoraSiguiente = 2600;

    if (esCorrecto) {
      q.correctas++;
      q.estrellasSesion += 10;
      EK.Store.addCorrecta();
      EK.Audio.correcto();
      if (EK.Mascota) EK.Mascota.reaccionar('bien');
      lanzarEstrellas(btn);
      if (EK.Voz && EK.Voz.celebrar) EK.Voz.celebrar(35);

      var html = '<div class="fb-msg ok">¡Excelente! <b>+10 ⭐</b></div>';
      if (p.explicacion) {
        html += '<div class="explicacion-box">💡 <b>¿Por qué?</b> ' + escapeHtml(p.explicacion) + '</div>';
        despues(700, function () { if (EK.Voz) EK.Voz.explicar(p.explicacion, true); });
        demoraSiguiente = Math.min(7000, 2200 + limpiarTexto(p.explicacion).length * 55);
      }
      fb.innerHTML = html;
      EK.App.actualizarTopbar();
    } else {
      EK.Audio.error();
      if (EK.Mascota) EK.Mascota.reaccionar('mal');
      var msg = '¡Casi! Era <b>' + escapeHtml(p.correcta) + '</b>';
      var explic = p.pista || p.explicacion;
      if (explic) msg += '<div class="explicacion-box">💡 ' + escapeHtml(explic) + '</div>';
      fb.innerHTML = '<div class="fb-msg mal">' + msg + '</div>';
      despues(800, function () {
        vozHablar('La correcta era ' + p.correcta + (explic ? '. ' + explic : ''));
      });
      demoraSiguiente = explic ? Math.min(7000, 2200 + limpiarTexto(explic).length * 55) : 3000;
    }

    despues(demoraSiguiente, siguiente);
  }

  function siguiente() {
    q.idx++;
    if (q.idx < q.preguntas.length) { q.lock = false; renderPregunta(); }
    else finalizar();
  }

  function finalizar() {
    var total = q.preguntas.length;
    q.estrellasSesion += q.bonus;
    if (q.estrellasSesion > 0) EK.Store.addEstrellas(q.estrellasSesion);
    EK.Store.addActividad();

    var desbloqueado = false;
    if (q.nivel && q.correctas / total >= 0.6) {
      desbloqueado = EK.Store.desbloquearSiguiente(q.mundoId);
    }
    if (q.opts.onFinish) q.opts.onFinish({ correctas: q.correctas, total: total, estrellas: q.estrellasSesion, aprobo: q.correctas / total >= 0.6 });

    var nuevasMedallas = EK.Store.revisarMedallas();
    if (nuevasMedallas.length) EK.Audio.medalla(); else EK.Audio.nivel();

    var porcentaje = Math.round(q.correctas / total * 100);
    var msg = porcentaje === 100 ? '¡Perfecto! 🏆'
            : porcentaje >= 70  ? '¡Muy bien! 🌟'
            : porcentaje >= 40  ? '¡Buen trabajo! 💪'
            : '¡Seguí practicando! 📚';

    if (EK.Voz && EK.Voz.celebrar && porcentaje >= 40) EK.Voz.celebrar(porcentaje === 100 ? 90 : 50);
    vozHablar(msg + '. Ganaste ' + q.estrellasSesion + ' estrellas.');
    if (EK.Mascota) EK.Mascota.decir(msg + ' Ganaste ' + q.estrellasSesion + ' estrellas.', 3500);

    EK.App.actualizarTopbar();

    var medallasHtml = nuevasMedallas.length
      ? '<div class="nuevas-medallas">' +
          nuevasMedallas.map(function (m) {
            return '<div class="medalla-nueva pop"><span class="medalla-emoji">' + m.emoji + '</span><span>' + escapeHtml(m.nombre) + '</span></div>';
          }).join('') +
        '</div>'
      : '';
    var bonusTxt = q.bonus > 0 ? '<div class="unlock-msg">🏆 ¡Nivel completado! +' + q.bonus + ' bonus</div>' : '';

    var app = document.getElementById('app');
    app.innerHTML =
      '<div class="screen premio-screen" style="--acento:' + q.color + '">' +
        '<div class="premio-card pop">' +
          '<div class="premio-emoji">' + q.emoji + '</div>' +
          '<h2>' + msg + '</h2>' +
          '<div class="premio-stats">' +
            '<div class="premio-stat"><span class="big">' + q.correctas + '/' + total + '</span><span>respuestas</span></div>' +
            '<div class="premio-stat"><span class="big">+' + q.estrellasSesion + '</span><span>estrellas ⭐</span></div>' +
          '</div>' +
          bonusTxt +
          (desbloqueado ? '<div class="unlock-msg">🔓 ¡Desbloqueaste el siguiente nivel!</div>' : '') +
          medallasHtml +
          '<div class="premio-btns">' +
            '<button class="btn-sec" data-act="repetir">🔄 Repetir</button>' +
            (desbloqueado && q.opts.onSiguiente ? '<button class="btn-pri" data-act="siguiente">➡️ Siguiente nivel</button>' : '') +
            '<button class="btn-pri" data-act="volver">🏠 Volver</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    app.querySelector('[data-act="repetir"]').addEventListener('click', function () {
      EK.Audio.click(); if (q.opts.onRepetir) q.opts.onRepetir(); else iniciar(q.opts);
    });
    var sig = app.querySelector('[data-act="siguiente"]');
    if (sig) sig.addEventListener('click', function () { EK.Audio.click(); q.opts.onSiguiente(); });
    app.querySelector('[data-act="volver"]').addEventListener('click', function () {
      EK.Audio.click(); if (q.opts.onVolver) q.opts.onVolver(); else EK.App.ir('inicio');
    });
  }

  function lanzarEstrellas(btn) {
    var fx = document.getElementById('fx');
    if (!fx) return;
    var rect = btn.getBoundingClientRect();
    for (var i = 0; i < 8; i++) {
      var s = document.createElement('span');
      s.className = 'star-fly';
      s.textContent = '⭐';
      s.style.left = (rect.left + rect.width / 2) + 'px';
      s.style.top = (rect.top + rect.height / 2) + 'px';
      s.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
      s.style.setProperty('--dy', (-90 - Math.random() * 100) + 'px');
      fx.appendChild(s);
      (function (el) { setTimeout(function () { el.remove(); }, 1100); })(s);
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var Engine = { iniciar: iniciar, escapeHtml: escapeHtml, barajar: barajar, leerPregunta: leerPreguntaCompleta };
  window.EK = window.EK || {};
  window.EK.Engine = Engine;
})();
