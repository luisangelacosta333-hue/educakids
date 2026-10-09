/* ============================================================
   engine.js — MOTOR DE PREGUNTAS REUTILIZABLE (ULTRA PREMIUM)
   Novedades: Accesibilidad total para niños que no saben leer.
   Lee preguntas, lee las opciones tocadas y da feedback auditivo.
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

  /* Función segura para enviar texto a la voz, limpiando emojis */
  function hablar(texto) {
    if (window.EK && EK.Voz) {
      var textoLimpio = texto.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
      if (typeof EK.Voz.leer === 'function') EK.Voz.leer(textoLimpio);
      else if (typeof EK.Voz.hablar === 'function') EK.Voz.hablar(textoLimpio);
    }
  }

  function iniciar(opts) {
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

  function leerPregunta(p) {
    if (!EK.Voz) return;
    if (p.audio) { EK.Voz.hablar(p.audio.texto, p.audio.lang); return; }
    hablar(p.pregunta || '');
  }

  function renderPregunta() {
    var app = document.getElementById('app');
    var p = q.preguntas[q.idx];
    var total = q.preguntas.length;
    var prog = Math.round((q.idx / total) * 100);
    var cols = Math.min(4, p.opciones.length);
    var opcionesHtml = barajar(p.opciones).map(function (op) {
      return '<button class="opcion-btn" style="--acento:' + q.color + '">' + escapeHtml(op) + '</button>';
    }).join('');

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
          '<button class="btn-sec escuchar-preg" data-act="repetir" style="margin-top: 15px; font-weight: bold;">🔊 Escuchar de nuevo</button>' +
        '</div>' +
        '<div class="opciones-grid cols-' + cols + '">' + opcionesHtml + '</div>' +
        '<div class="feedback" id="feedback"></div>' +
      '</div>';

    app.querySelectorAll('.opcion-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { responder(btn); });
    });
    app.querySelector('[data-act="volver"]').addEventListener('click', function () {
      EK.Audio.click(); limpiarTimers(); if (EK.Voz) EK.Voz.callar();
      if (q.opts.onVolver) q.opts.onVolver(); else EK.App.ir('inicio');
    });
    app.querySelector('[data-act="repetir"]').addEventListener('click', function () { EK.Audio.click(); leerPregunta(p); });
    if (q.opts.onPreguntaRender) q.opts.onPreguntaRender(p);
    
    // Leemos la pregunta al entrar
    despues(400, function () { leerPregunta(p); });
  }

  function responder(btn) {
    if (q.lock) return;
    q.lock = true;
    
    var p = q.preguntas[q.idx];
    var elegido = btn.textContent;
    
    // PREMIUM: Leemos en voz alta la opción que el niño tocó
    hablar(elegido);

    var esCorrecto = elegido === p.correcta;
    var botones = document.querySelectorAll('.opcion-btn');
    botones.forEach(function (b) {
      b.disabled = true;
      if (b.textContent === p.correcta) b.classList.add('ok');
      else if (b === btn) b.classList.add('mal');
    });
    
    var fb = document.getElementById('feedback');
    if (esCorrecto) {
      q.correctas++;
      q.estrellasSesion += 10;
      EK.Store.addCorrecta();
      EK.Audio.correcto();
      if (EK.Mascota) EK.Mascota.reaccionar('bien');
      fb.innerHTML = '<div class="fb-msg ok">¡Excelente! <b>+10 ⭐</b></div>';
      EK.App.actualizarTopbar();
      lanzarEstrellas(btn);
    } else {
      EK.Audio.error();
      if (EK.Mascota) EK.Mascota.reaccionar('mal');
      fb.innerHTML = '<div class="fb-msg mal">¡Casi! Era <b>' + escapeHtml(p.correcta) + '</b></div>';
      // PREMIUM: Si se equivoca, la voz le dice cuál era la correcta
      despues(800, function() { hablar("La correcta era " + p.correcta); });
    }
    
    // Le damos un poquito más de tiempo para que la voz termine de hablar antes de pasar a la siguiente
    despues(2500, siguiente);
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
            
    // Premium: Luna dice el mensaje de finalización en voz alta
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
    for (var i = 0; i < 5; i++) {
      var s = document.createElement('span');
      s.className = 'star-fly';
      s.textContent = '⭐';
      s.style.left = (rect.left + rect.width / 2) + 'px';
      s.style.top = (rect.top + rect.height / 2) + 'px';
      s.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
      s.style.setProperty('--dy', (-80 - Math.random() * 80) + 'px');
      fx.appendChild(s);
      (function (el) { setTimeout(function () { el.remove(); }, 1100); })(s);
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var Engine = { iniciar: iniciar, escapeHtml: escapeHtml, barajar: barajar };
  window.EK = window.EK || {};
  window.EK.Engine = Engine;
})();
