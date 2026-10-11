/* ============================================================
   voz.js — Motor de voz PREMIUM / profesor virtual
   - Lee en voz alta: preguntas, opciones (A/B/C) y explicaciones.
   - Repetir última frase con la mascota.
   - Reconocimiento por micrófono 🎤: el niño repite una palabra
     en otro idioma y se valida con comparación difusa (tolera
     errores chicos de pronunciación). Si está bien → celebra y
     avanza.
   - Celebración visual: confeti + destellos + audio.
   API conservada: EK.Voz.hablar / callar / ultimoTexto /
   habilitado / leerPregunta. Nuevos métodos abajo.
   ============================================================ */
(function () {
  'use strict';

  var ultimo = '';
  var habilitado = true;
  var colaActiva = false;
  var vozPreferida = null;

  /* ---------- CSS inyectado (micrófono + confeti) ---------- */
  function inyectarCSS() {
    if (document.getElementById('voz-css')) return;
    var st = document.createElement('style');
    st.id = 'voz-css';
    st.textContent =
      '#vozMicOverlay{position:fixed;inset:0;background:rgba(20,28,60,.45);z-index:80;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;backdrop-filter:blur(3px);}' +
      '.voz-mic-circ{width:110px;height:110px;border-radius:50%;background:linear-gradient(135deg,#4D96FF,#A55EEA);display:flex;align-items:center;justify-content:center;font-size:52px;box-shadow:0 0 0 0 rgba(77,150,255,.6);animation:vozPulso 1.3s infinite;}' +
      '@keyframes vozPulso{0%{box-shadow:0 0 0 0 rgba(77,150,255,.6);}70%{box-shadow:0 0 0 34px rgba(77,150,255,0);}100%{box-shadow:0 0 0 0 rgba(77,150,255,0);}}' +
      '.voz-mic-texto{color:#fff;font-size:22px;font-weight:700;text-shadow:0 2px 8px rgba(0,0,0,.4);text-align:center;padding:0 20px;}' +
      '.voz-mic-barras{display:flex;gap:5px;align-items:flex-end;height:34px;}' +
      '.voz-mic-barras span{width:7px;background:#fff;border-radius:4px;animation:vozBarra .9s ease-in-out infinite;}' +
      '.voz-mic-barras span:nth-child(2){animation-delay:.15s}.voz-mic-barras span:nth-child(3){animation-delay:.3s}.voz-mic-barras span:nth-child(4){animation-delay:.45s}.voz-mic-barras span:nth-child(5){animation-delay:.6s}' +
      '@keyframes vozBarra{0%,100%{height:10px}50%{height:32px}}' +
      '.voz-resultado{font-size:60px;animation:vozPop .4s ease;}' +
      '@keyframes vozPop{0%{transform:scale(.3);opacity:0}70%{transform:scale(1.2)}100%{transform:scale(1);opacity:1}}' +
      '#vozConfeti{position:fixed;inset:0;pointer-events:none;z-index:90;overflow:hidden;}' +
      '.voz-confeti{position:absolute;top:-20px;width:10px;height:14px;opacity:.95;animation:vozCaer linear forwards;}' +
      '@keyframes vozCaer{to{transform:translateY(110vh) rotate(720deg);opacity:.6;}}';
    document.head.appendChild(st);
  }

  /* ---------- Voz preferida (tono infantil) ---------- */
  function elegirVoz() {
    if (!('speechSynthesis' in window)) return;
    var voces = window.speechSynthesis.getVoices();
    if (!voces.length) return;
    var preferidas = voces.filter(function (v) { return /^es/i.test(v.lang); });
    vozPreferida =
      preferidas.find(function (v) { return /female|mujer|sabina|elena|paulina|google.*español/i.test(v.name); }) ||
      preferidas[0] ||
      voces.find(function (v) { return /female|samantha|google/i.test(v.name); }) ||
      null;
  }
  if ('speechSynthesis' in window) {
    elegirVoz();
    window.speechSynthesis.onvoiceschanged = elegirVoz;
  }

  function configU(u, lang, rate, pitch) {
    u.lang = lang || 'es-AR';
    u.rate = rate != null ? rate : 0.88;
    u.pitch = pitch != null ? pitch : 1.25;
    u.volume = 1;
    if (vozPreferida && /^es/i.test(u.lang)) u.voice = vozPreferida;
  }

  /* ---------- Hablar (backward compatible) ---------- */
  function hablar(texto, lang, rate, pitch) {
    if (!habilitado || (window.EK && EK.Audio && EK.Audio.muted)) return;
    ultimo = texto || ultimo;
    if (!('speechSynthesis' in window) || !texto) return;
    try {
      colaActiva = false;
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(texto);
      configU(u, lang, rate, pitch);
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  function callar() {
    colaActiva = false;
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
  }

  /* Lee varios textos en cadena, con pausas naturales. cb al terminar. */
  function hablarSecuencia(textos, lang, cb) {
    if (!habilitado || (window.EK && EK.Audio && EK.Audio.muted)) { if (cb) cb(); return; }
    if (!('speechSynthesis' in window)) { if (cb) cb(); return; }
    callar();
    colaActiva = true;
    var i = 0;
    function siguiente() {
      if (!colaActiva) { if (cb) cb(); return; }
      if (i >= textos.length) { colaActiva = false; if (cb) cb(); return; }
      var t = textos[i++];
      if (!t) { siguiente(); return; }
      ultimo = t;
      var u = new SpeechSynthesisUtterance(t);
      configU(u, lang);
      u.onend = siguiente;
      u.onerror = siguiente;
      window.speechSynthesis.speak(u);
    }
    siguiente();
  }

  /* ---------- Leer pregunta + opciones ---------- */
  function letras(i) { return ['A', 'B', 'C', 'D', 'E'][i] || String(i + 1); }

  /* Lee la pregunta y luego cada opción en voz alta. (mejora de leerPregunta) */
  function leerPreguntaCompleta(p, cb) {
    var textos = [];
    if (p && p.pregunta) textos.push(p.pregunta);
    if (p && p.opciones && p.opciones.length) {
      textos.push('Las opciones son:');
      p.opciones.forEach(function (op, i) {
        textos.push('Opción ' + letras(i) + ': ' + (typeof op === 'string' ? op : (op.texto || op.opcion || '')));
      });
    }
    if (!textos.length) { if (cb) cb(); return; }
    hablarSecuencia(textos, 'es-AR', cb);
  }

  /* Lee solo una opción (botón 🔊 al lado de cada alternativa) */
  function leerOpcion(op, i) {
    var texto = typeof op === 'string' ? op : (op.texto || op.opcion || '');
    hablar('Opción ' + letras(i != null ? i : 0) + ': ' + texto);
  }

  /* Explica por qué la respuesta es correcta (más lento y claro) */
  function explicar(texto, esCorrecta) {
    var prefijo = esCorrecta === false ? 'Casi. ' : '¡Muy bien! ';
    hablar(prefijo + (texto || ''), 'es-AR', 0.82, 1.15);
  }

  function repetir() { if (ultimo) hablar(ultimo); }

  /* ---------- Normalización y comparación difusa ---------- */
  function normalizar(s) {
    return (s || '').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9áéíóúñ\s]/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }
  function levenshtein(a, b) {
    var m = a.length, n = b.length, i, j;
    if (!m) return n; if (!n) return m;
    var dp = [];
    for (i = 0; i <= m; i++) dp[i] = [i];
    for (j = 0; j <= n; j++) dp[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    return dp[m][n];
  }
  /* target puede ser string o array de respuestas aceptadas */
  function compararDicho(dicho, target, tolerancia) {
    var d = normalizar(dicho);
    var targets = Array.isArray(target) ? target.map(normalizar) : [normalizar(target)];
    if (!d) return { ok: false, dicho: dicho, mejor: targets[0], distancia: 99 };
    var mejor = null, mejorDist = 999;
    for (var i = 0; i < targets.length; i++) {
      var t = targets[i];
      if (!t) continue;
      if (d === t || d.indexOf(t) !== -1 || t.indexOf(d) !== -1) return { ok: true, dicho: dicho, mejor: t, distancia: 0 };
      var dist = levenshtein(d, t);
      var tol = tolerancia != null ? tolerancia : Math.max(1, Math.floor(t.length / 3));
      if (dist <= tol) return { ok: true, dicho: dicho, mejor: t, distancia: dist };
      if (dist < mejorDist) { mejorDist = dist; mejor = t; }
    }
    return { ok: false, dicho: dicho, mejor: mejor, distancia: mejorDist };
  }

  /* ---------- Reconocimiento por micrófono (bajo nivel) ---------- */
  function reconocer(idioma, tiempoMaxMs) {
    return new Promise(function (resolver) {
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) { resolver({ soportado: false, transcript: '' }); return; }
      var rec = new SR();
      rec.lang = idioma || 'en-US';
      rec.continuous = false;
      rec.interimResults = false;
      rec.maxAlternatives = 5;
      var terminado = false;
      function finalizar(r) { if (terminado) return; terminado = true; try { rec.stop(); } catch (e) {} resolver(r); }
      var to = setTimeout(function () { finalizar({ soportado: true, transcript: '', timeout: true }); }, tiempoMaxMs || 6000);
      rec.onresult = function (e) {
        clearTimeout(to);
        var mejor = '';
        for (var i = 0; i < e.results[0].length; i++) {
          var alt = e.results[0][i].transcript.trim();
          if (alt.length > mejor.length) mejor = alt;
        }
        finalizar({ soportado: true, transcript: mejor });
      };
      rec.onerror = function () { clearTimeout(to); finalizar({ soportado: true, transcript: '', error: true }); };
      rec.onend = function () { clearTimeout(to); finalizar({ soportado: true, transcript: '' }); };
      try { rec.start(); } catch (e) { clearTimeout(to); resolver({ soportado: true, transcript: '', error: true }); }
    });
  }

  /* ---------- Micrófono con UI (overlay animado) ---------- */
  function overlayMic() {
    var ov = document.createElement('div');
    ov.id = 'vozMicOverlay';
    ov.innerHTML =
      '<div class="voz-mic-circ">🎤</div>' +
      '<div class="voz-mic-texto">Estoy escuchando…<br><small>Decí la palabra en voz alta</small></div>' +
      '<div class="voz-mic-barras"><span></span><span></span><span></span><span></span><span></span></div>';
    document.body.appendChild(ov);
    return ov;
  }
  function resultadoOverlay(ov, ok) {
    ov.innerHTML = '<div class="voz-resultado">' + (ok ? '✅' : '🔁') + '</div>' +
      '<div class="voz-mic-texto">' + (ok ? '¡Excelente! Lo dijiste perfecto.' : 'Casi… intentemos de nuevo.') + '</div>';
  }

  /* Flujo guiado: muestra el mic, escucha, compara, celebra si está bien.
     target: string o array. idioma: 'en-US', 'pt-BR', etc.
     Devuelve Promise<{ok, dicho, intentos}>. */
  function repeticionGuiada(target, idioma, opts) {
    opts = opts || {};
    var maxIntentos = opts.intentos || 3;
    var ov = overlayMic();
    var intento = 0;
    function intentar() {
      intento++;
      return reconocer(idioma, opts.tiempoMs || 6000).then(function (r) {
        if (!r.soportado) {
          ov.innerHTML = '<div class="voz-resultado">🎤</div><div class="voz-mic-texto">Usá Chrome o Edge para usar el micrófono.</div>';
          setTimeout(function () { document.body.removeChild(ov); }, 2200);
          return { ok: false, dicho: '', intentos: intento, soportado: false };
        }
        var cmp = compararDicho(r.transcript, target, opts.tolerancia);
        if (cmp.ok) {
          resultadoOverlay(ov, true);
          celebrar();
          if (window.EK && EK.Audio) { try { EK.Audio.medalla ? EK.Audio.medalla() : EK.Audio.click(); } catch (e) {} }
          setTimeout(function () { document.body.removeChild(ov); }, 1600);
          return { ok: true, dicho: r.transcript, intentos: intento };
        }
        resultadoOverlay(ov, false);
        if (intento < maxIntentos) {
          return new Promise(function (res) {
            setTimeout(function () {
              ov.innerHTML = '<div class="voz-mic-circ">🎤</div><div class="voz-mic-texto">Otra vez… escuchando</div><div class="voz-mic-barras"><span></span><span></span><span></span><span></span><span></span></div>';
              intentar().then(res);
            }, 1600);
          });
        }
        setTimeout(function () { document.body.removeChild(ov); }, 1600);
        return { ok: false, dicho: r.transcript, intentos: intento, esperado: cmp.mejor };
      });
    }
    return intentar();
  }

  /* ---------- Celebración: confeti + audio ---------- */
  function celebrar(cantidad) {
    inyectarCSS();
    var c = document.createElement('div');
    c.id = 'vozConfeti';
    var colores = ['#EE5A6F', '#FF9F43', '#FFD93D', '#6BCB77', '#4ECDC4', '#4D96FF', '#A55EEA', '#F368E0'];
    var n = cantidad || 60;
    for (var i = 0; i < n; i++) {
      var p = document.createElement('div');
      p.className = 'voz-confeti';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.background = colores[i % colores.length];
      p.style.animationDuration = (1.6 + Math.random() * 1.6) + 's';
      p.style.animationDelay = (Math.random() * 0.4) + 's';
      p.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
      if (Math.random() > 0.5) p.style.borderRadius = '50%';
      c.appendChild(p);
    }
    document.body.appendChild(c);
    setTimeout(function () { if (c.parentNode) c.parentNode.removeChild(c); }, 3600);
    if (window.EK && EK.Audio) { try { EK.Audio.medalla ? EK.Audio.medalla() : EK.Audio.click(); } catch (e) {} }
  }

  /* ---------- API pública ---------- */
  var Voz = {
    hablar: hablar,
    callar: callar,
    repetir: repetir,
    hablarSecuencia: hablarSecuencia,
    leerPregunta: leerPreguntaCompleta,          // antes leía solo la pregunta; ahora lee pregunta + opciones
    leerPreguntaCompleta: leerPreguntaCompleta,
    leerOpcion: leerOpcion,
    explicar: explicar,
    reconocer: reconocer,
    repeticionGuiada: repeticionGuiada,
    compararDicho: compararDicho,
    celebrar: celebrar,
    get ultimoTexto() { return ultimo; },
    set habilitado(v) { habilitado = v; if (!v) callar(); },
    get habilitado() { return habilitado; },
    get soportaReconocimiento() { return !!(window.SpeechRecognition || window.webkitSpeechRecognition); }
  };

  window.EK = window.EK || {};
  window.EK.Voz = Voz;
  inyectarCSS();
})();
