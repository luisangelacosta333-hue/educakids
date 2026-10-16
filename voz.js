/* ============================================================
   voz.js — Motor de voz SUPER PREMIUM / narradora virtual  (v3.0)
   - Narradora cálida: selección inteligente de voces NEURALES
     (Microsoft Online / Natural, Google Wavenet, Apple Siri),
     con scoring por calidad y prosodia por emoción.
   - Prosodia premium: pausas naturales entre frases, respiración,
     entonación variable, modo "cuento" / "celebración" / "susurro".
   - Lee en voz alta: preguntas, opciones (A/B/C) y explicaciones.
   - Repetir última frase con la mascota.
   - Reconocimiento por micrófono con MEDIDOR DE VOLUMEN REAL
     (AnalyserNode), overlay glassmorphism dorado, ring animado.
   - Comparación difusa (Levenshtein) tolera errores chicos.
   - Celebración PREMIUM: confeti en canvas con física (gravedad,
     rotación, brillo), estrellas doradas, ráfaga radial + lluvia,
     y chime armónico con Web Audio (no depende de EK.Audio).
   v3.0: emociones, scoring de voces, medidor de nivel real,
         canvas confeti, chime Web Audio, API 100% compatible.
   API conservada: EK.Voz.hablar / callar / ultimoTexto /
   habilitado / leerPregunta / leerOpcion / explicar / repetir /
   hablarSecuencia / reconocer / repeticionGuiada / compararDicho /
   celebrar / vozPara / getIdiomasVoces / soportaReconocimiento.
   Nuevos: hablarConEmocion, susurrar, celebrarGrito, chime,
           setEmocion, getVocesDisponibles, recalentarVoces.
   ============================================================ */
(function () {
  'use strict';

  var ultimo = '';
  var habilitado = true;
  var colaActiva = false;
  var emocionGlobal = 'calida'; // calida | cuento | alegre | celebracion | susurro | seria

  /* ---------- Idiomas con voz preferida (fácil de extender) ---------- */
  var PREFIJOS_VOZ = ['es', 'en', 'pt', 'it', 'fr', 'de', 'ca', 'eu', 'gl', 'ja', 'zh', 'ko'];
  var vocesPreferidas = {};   // { es: {voz, score}, en: {...}, ... }

  /* ---------- Textos del overlay de micrófono (todos los idiomas) ---------- */
  var TXT_UI = {
    es: { escuchando: 'Te estoy escuchando…', decí: 'Decí la palabra con mucho amor', excelente: '¡Bravo! Lo dijiste perfecto.', casi: 'Muy cerca… vamos de nuevo.', otravez: 'Otra vez… estoy escuchando', usaChrome: 'Usá Chrome o Edge para usar el micrófono.', perfecto: 'Perfecto' },
    en: { escuchando: 'I am listening to you…', decí: 'Say the word with a big smile', excelente: 'Bravo! You said it perfectly.', casi: 'So close… let\'s try again.', otravez: 'Once more… I am listening', usaChrome: 'Use Chrome or Edge to use the microphone.', perfecto: 'Perfect' },
    pt: { escuchando: 'Estou ouvindo você…', decí: 'Diga a palavra com carinho', excelente: 'Bravo! Você disse perfeitamente.', casi: 'Muito perto… vamos de novo.', otravez: 'De novo… estou ouvindo', usaChrome: 'Use Chrome ou Edge para usar o microfone.', perfecto: 'Perfeito' },
    it: { escuchando: 'Ti sto ascoltando…', decí: 'Di la parola con un sorriso', excelente: 'Bravo! L\'hai detta perfettamente.', casi: 'Così vicino… riproviamo.', otravez: 'Ancora… sto ascoltando', usaChrome: 'Usa Chrome o Edge per usare il microfono.', perfecto: 'Perfetto' },
    fr: { escuchando: 'Je t\'écoute…', decí: 'Dis le mot avec le sourire', excelente: 'Bravo ! Tu l\'as dit parfaitement.', casi: 'Si proche… on réessaie.', otravez: 'Encore… j\'écoute', usaChrome: 'Utilise Chrome ou Edge pour le microphone.', perfecto: 'Parfait' },
    de: { escuchando: 'Ich höre dir zu…', decí: 'Sag das Wort mit einem Lächeln', excelente: 'Bravo! Perfekt gesagt.', casi: 'Ganz nah… versuchen wir es nochmal.', otravez: 'Nochmal… ich höre zu', usaChrome: 'Verwende Chrome oder Edge für das Mikrofon.', perfecto: 'Perfekt' }
  };
  function txtUI(idioma, clave) {
    var lang = (idioma || 'es').slice(0, 2).toLowerCase();
    return (TXT_UI[lang] || TXT_UI.es)[clave] || TXT_UI.es[clave];
  }

  /* ---------- Frases para leerPregunta / explicar / leerOpcion ---------- */
  var FRASES = {
    es: { opcionesSon: 'Las opciones son:', opcion: 'Opción', casi: 'Casi, mi amor. ', bien: '¡Muy bien, campeón! ' },
    en: { opcionesSon: 'The options are:',  opcion: 'Option', casi: 'Almost, sweetheart. ', bien: 'Great job, champion! ' },
    pt: { opcionesSon: 'As opções são:',    opcion: 'Opção',  casi: 'Quase, meu amor. ', bien: 'Muito bem, campeão! ' },
    it: { opcionesSon: 'Le opzioni sono:',  opcion: 'Opzione', casi: 'Quasi, amore. ', bien: 'Molto bene, campione! ' },
    fr: { opcionesSon: 'Les options sont :', opcion: 'Option', casi: 'Presque, mon cœur. ', bien: 'Très bien, champion ! ' },
    de: { opcionesSon: 'Die Optionen sind:', opcion: 'Option', casi: 'Fast, Liebes. ', bien: 'Sehr gut, Champion! ' }
  };
  function frases(idioma) {
    var lang = (idioma || 'es-AR').slice(0, 2).toLowerCase();
    return FRASES[lang] || FRASES.es;
  }

  /* ---------- Emociones → prosodia premium ---------- */
  var EMOCIONES = {
    calida:      { rate: 0.86, pitch: 1.22, volume: 1,    pausa: 220 },
    cuento:      { rate: 0.78, pitch: 1.30, volume: 0.95, pausa: 380 },
    alegre:      { rate: 0.95, pitch: 1.35, volume: 1,    pausa: 160 },
    celebracion: { rate: 1.05, pitch: 1.45, volume: 1,    pausa: 120 },
    susurro:     { rate: 0.72, pitch: 1.10, volume: 0.55, pausa: 450 },
    seria:       { rate: 0.82, pitch: 1.05, volume: 0.95, pausa: 300 }
  };

  /* ---------- CSS inyectado PREMIUM (glassmorphism + oro) ---------- */
  function inyectarCSS() {
    if (document.getElementById('voz-css')) return;
    var st = document.createElement('style');
    st.id = 'voz-css';
    st.textContent =
      '#vozMicOverlay{position:fixed;inset:0;z-index:80;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;' +
      'background:radial-gradient(ellipse at center, rgba(30,20,60,.35) 0%, rgba(10,8,30,.65) 100%);' +
      'backdrop-filter:blur(14px) saturate(1.4);-webkit-backdrop-filter:blur(14px) saturate(1.4);' +
      'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;}' +
      '.voz-card{background:linear-gradient(160deg,rgba(255,255,255,.16),rgba(255,255,255,.06));' +
      'border:1px solid rgba(255,255,255,.28);border-radius:32px;padding:42px 52px;display:flex;flex-direction:column;' +
      'align-items:center;gap:20px;box-shadow:0 30px 80px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.4);' +
      'animation:vozCardIn .5s cubic-bezier(.2,1.4,.4,1);}' +
      '@keyframes vozCardIn{from{transform:scale(.8) translateY(20px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}' +
      '.voz-mic-wrap{position:relative;width:130px;height:130px;display:flex;align-items:center;justify-content:center;}' +
      '.voz-ring{position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,#FFD700,#FF9A3D,#FF5E8A,#A55EEA,#4D96FF,#FFD700);' +
      'animation:vozSpin 3s linear infinite;filter:blur(1px);opacity:.85;}' +
      '.voz-ring2{position:absolute;inset:6px;border-radius:50%;background:rgba(12,10,30,.85);}' +
      '@keyframes vozSpin{to{transform:rotate(360deg)}}' +
      '.voz-mic-circ{position:relative;width:104px;height:104px;border-radius:50%;' +
      'background:linear-gradient(145deg,#FFF3C4,#FFD700 40%,#F0A500);' +
      'display:flex;align-items:center;justify-content:center;font-size:50px;' +
      'box-shadow:0 0 40px rgba(255,200,60,.55),inset 0 2px 6px rgba(255,255,255,.7),inset 0 -4px 10px rgba(180,110,0,.4);' +
      'animation:vozBreathe 2.2s ease-in-out infinite;}' +
      '@keyframes vozBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}' +
      '.voz-mic-texto{color:#fff;font-size:24px;font-weight:700;text-align:center;padding:0 10px;line-height:1.35;' +
      'text-shadow:0 2px 12px rgba(0,0,0,.5);}' +
      '.voz-mic-texto small{display:block;margin-top:6px;font-size:15px;font-weight:500;opacity:.85;}' +
      '.voz-nivel{display:flex;gap:6px;align-items:flex-end;height:44px;}' +
      '.voz-nivel span{width:8px;background:linear-gradient(to top,#FFD700,#FF9A3D);border-radius:5px;height:10px;' +
      'box-shadow:0 0 10px rgba(255,180,60,.6);transition:height .08s ease;}' +
      '.voz-resultado{font-size:72px;animation:vozPop .5s cubic-bezier(.2,1.6,.4,1);filter:drop-shadow(0 0 24px rgba(255,215,0,.8));}' +
      '@keyframes vozPop{0%{transform:scale(.2) rotate(-20deg);opacity:0}70%{transform:scale(1.25) rotate(6deg)}100%{transform:scale(1) rotate(0);opacity:1}}' +
      '.voz-shake{animation:vozShake .5s ease;}' +
      '@keyframes vozShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-10px)}40%{transform:translateX(10px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}' +
      '#vozConfetiCanvas{position:fixed;inset:0;pointer-events:none;z-index:90;}' +
      '.voz-check{width:80px;height:80px;border-radius:50%;background:linear-gradient(145deg,#6BCB77,#2FA85F);' +
      'display:flex;align-items:center;justify-content:center;box-shadow:0 0 40px rgba(107,203,119,.7);animation:vozPop .5s cubic-bezier(.2,1.6,.4,1);}' +
      '.voz-check svg{width:46px;height:46px;stroke:#fff;stroke-width:6;fill:none;stroke-linecap:round;stroke-linejoin:round;' +
      'stroke-dasharray:60;stroke-dashoffset:60;animation:vozDraw .5s .15s ease forwards;}' +
      '@keyframes vozDraw{to{stroke-dashoffset:0}}';
    document.head.appendChild(st);
  }

  /* ---------- Scoring PREMIUM de voces (neural > natural > google > femenina) ---------- */
  function puntuarVoz(v, pref) {
    var nombre = (v.name || '').toLowerCase();
    var score = 0;
    // Tier S: voces neurales de máxima calidad
    if (/online \(natural\)|online natural|microsoft.*online|neural|wavenet|natural|24khz|enhanced|premium/.test(nombre)) score += 100;
    if (/google.*us english|google.*español|google.*português|google.*français|google.*deutsch|google.*italiano/.test(nombre)) score += 80;
    if (/samantha|victoria|karen|moira|tessa|sabina|elena|paulina|monica|serena|fiona|allison|ava|susan|zira|aria|jenny|aria|sonia|carmen|lucia|maria|ana|laura/.test(nombre)) score += 40;
    if (/female|mujer|femenina/.test(nombre)) score += 30;
    if (/male|hombre|masculino|david|mark|daniel|alex|fred/.test(nombre)) score -= 25; // preferimos narradora mujer
    // Coincidencia exacta de idioma
    var lang = (v.lang || '').toLowerCase();
    if (lang.slice(0, 2) === pref) score += 20;
    if (lang.indexOf(pref) === 0) score += 10;
    // Penalizar voces de sistema antiguas
    if (/microsoft.*desktop|microsoft.*speech desktop/.test(nombre)) score -= 15;
    return score;
  }

  function elegirVoces() {
    if (!('speechSynthesis' in window)) return;
    var voces = window.speechSynthesis.getVoices();
    if (!voces.length) return;
    PREFIJOS_VOZ.forEach(function (pref) {
      var match = voces.filter(function (v) {
        var l = (v.lang || '').toLowerCase();
        return l.slice(0, 2) === pref || l.indexOf(pref) === 0;
      });
      if (!match.length) {
        vocesPreferidas[pref] = null;
        return;
      }
      var mejor = null, mejorScore = -999;
      match.forEach(function (v) {
        var s = puntuarVoz(v, pref);
        if (s > mejorScore) { mejorScore = s; mejor = v; }
      });
      vocesPreferidas[pref] = { voz: mejor, score: mejorScore };
    });
  }
  if ('speechSynthesis' in window) {
    elegirVoces();
    window.speechSynthesis.onvoiceschanged = elegirVoces;
    // Recalentar: algunos navegadores cargan voces tarde
    setTimeout(elegirVoces, 500);
    setTimeout(elegirVoces, 1500);
  }

  /* Devuelve la mejor voz para un código de idioma (ej 'pt-BR' → voz pt). */
  function vozPara(lang) {
    var pref = (lang || 'es').slice(0, 2).toLowerCase();
    var entry = vocesPreferidas[pref];
    return entry ? entry.voz : null;
  }

  function configU(u, lang, rate, pitch, volumen) {
    u.lang = lang || 'es-AR';
    var emocion = EMOCIONES[emocionGlobal] || EMOCIONES.calida;
    u.rate = rate != null ? rate : emocion.rate;
    u.pitch = pitch != null ? pitch : emocion.pitch;
    u.volume = volumen != null ? volumen : emocion.volume;
    var v = vozPara(u.lang);
    if (v) u.voice = v;
  }

  /* ---------- Hablar (backward compatible + objeto como 2do arg) ----------
     Acepta:
       hablar(texto, lang, rate, pitch)            -> firma clásica
       hablar(texto, {lang, rate, pitch, onend, emocion, volumen}) -> firma objeto */
  function hablar(texto, lang, rate, pitch) {
    var onend = null, emocionTmp = null, volumen = null;
    if (lang && typeof lang === 'object') {
      var opts = lang;
      onend = opts.onend || null;
      pitch = opts.pitch;
      rate = opts.rate;
      volumen = opts.volumen;
      emocionTmp = opts.emocion || null;
      lang = opts.lang;
    }
    if (!habilitado || (window.EK && EK.Audio && EK.Audio.muted)) return;
    ultimo = texto || ultimo;
    if (!('speechSynthesis' in window) || !texto) return;
    var emocionAnterior = emocionGlobal;
    if (emocionTmp && EMOCIONES[emocionTmp]) emocionGlobal = emocionTmp;
    try {
      colaActiva = false;
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(texto);
      configU(u, lang, rate, pitch, volumen);
      if (onend) u.onend = function () { emocionGlobal = emocionAnterior; onend(); };
      else u.onend = function () { emocionGlobal = emocionAnterior; };
      window.speechSynthesis.speak(u);
    } catch (e) { emocionGlobal = emocionAnterior; }
  }

  /* Hablar con emoción específica (nuevo premium). */
  function hablarConEmocion(texto, emocion, lang, onend) {
    hablar(texto, { lang: lang, emocion: emocion, onend: onend });
  }
  function susurrar(texto, lang, onend) { hablarConEmocion(texto, 'susurro', lang, onend); }
  function celebrarGrito(texto, lang, onend) { hablarConEmocion(texto, 'celebracion', lang, onend); }

  function callar() {
    colaActiva = false;
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
  }

  /* ---------- Tokenizador premium: divide texto en frases con pausas ---------- */
  function tokenizar(texto) {
    if (!texto) return [];
    // Dividir por puntuación fuerte, conservando el signo
    var partes = texto.match(/[^.!?…]+[.!?…]*/g) || [texto];
    return partes.map(function (s) { return s.trim(); }).filter(Boolean);
  }

  /* Lee varios textos en cadena, con pausas naturales premium. cb al terminar. */
  function hablarSecuencia(textos, lang, cb) {
    if (!habilitado || (window.EK && EK.Audio && EK.Audio.muted)) { if (cb) cb(); return; }
    if (!('speechSynthesis' in window)) { if (cb) cb(); return; }
    callar();
    colaActiva = true;
    var emocion = EMOCIONES[emocionGlobal] || EMOCIONES.calida;
    var i = 0;
    function siguiente() {
      if (!colaActiva) { if (cb) cb(); return; }
      if (i >= textos.length) { colaActiva = false; if (cb) cb(); return; }
      var t = textos[i++];
      if (!t) { siguiente(); return; }
      ultimo = t;
      var u = new SpeechSynthesisUtterance(t);
      configU(u, lang);
      u.onend = function () {
        // Pausa natural entre frases (respiración de la narradora)
        setTimeout(siguiente, emocion.pausa);
      };
      u.onerror = function () { setTimeout(siguiente, 100); };
      window.speechSynthesis.speak(u);
    }
    siguiente();
  }

  /* ---------- Leer pregunta + opciones (con pausas premium) ---------- */
  function letras(i) { return ['A', 'B', 'C', 'D', 'E'][i] || String(i + 1); }

  function leerPreguntaCompleta(p, cb, lang) {
    lang = lang || 'es-AR';
    var fr = frases(lang);
    var textos = [];
    if (p && p.pregunta) textos = textos.concat(tokenizar(p.pregunta));
    if (p && p.opciones && p.opciones.length) {
      textos.push(fr.opcionesSon);
      p.opciones.forEach(function (op, i) {
        textos.push(fr.opcion + ' ' + letras(i) + ': ' + (typeof op === 'string' ? op : (op.texto || op.opcion || '')));
      });
    }
    if (!textos.length) { if (cb) cb(); return; }
    hablarSecuencia(textos, lang, cb);
  }

  function leerOpcion(op, i, lang) {
    lang = lang || 'es-AR';
    var fr = frases(lang);
    var texto = typeof op === 'string' ? op : (op.texto || op.opcion || '');
    hablar(fr.opcion + ' ' + letras(i != null ? i : 0) + ': ' + texto, lang);
  }

  function explicar(texto, esCorrecta, lang) {
    lang = lang || 'es-AR';
    var fr = frases(lang);
    var emocion = esCorrecta === false ? 'calida' : 'alegre';
    var prefijo = esCorrecta === false ? fr.casi : fr.bien;
    hablar(prefijo + (texto || ''), { lang: lang, emocion: emocion, rate: 0.82, pitch: esCorrecta === false ? 1.15 : 1.3 });
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
      var to = setTimeout(function () { finalizar({ soportado: true, transcript: '', timeout: true }); }, tiempoMaxMs || 7000);
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

  /* ---------- Medidor de volumen REAL (AnalyserNode) premium ---------- */
  function MedidorNivel(barras) {
    this.ctx = null; this.analyser = null; this.stream = null; this.raf = null; this.barras = barras;
  }
  MedidorNivel.prototype.iniciar = function () {
    var self = this;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      self.stream = stream;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      self.ctx = new AC();
      var src = self.ctx.createMediaStreamSource(stream);
      self.analyser = self.ctx.createAnalyser();
      self.analyser.fftSize = 64;
      src.connect(self.analyser);
      var data = new Uint8Array(self.analyser.frequencyBinCount);
      function loop() {
        self.raf = requestAnimationFrame(loop);
        self.analyser.getByteFrequencyData(data);
        var suma = 0;
        for (var i = 0; i < data.length; i++) suma += data[i];
        var nivel = suma / data.length / 255; // 0..1
        var n = self.barras.length;
        for (var b = 0; b < n; b++) {
          var umbral = (b + 1) / n * 0.9;
          var h = nivel > umbral ? 34 : (nivel / umbral) * 34 * 0.6;
          self.barras[b].style.height = Math.max(6, Math.min(40, h + 6)) + 'px';
        }
      }
      loop();
    }).catch(function () { /* silencioso: el micrófono igual funciona con SR */ });
  };
  MedidorNivel.prototype.detener = function () {
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.stream) this.stream.getTracks().forEach(function (t) { t.stop(); });
    if (this.ctx) { try { this.ctx.close(); } catch (e) {} }
  };

  /* ---------- Overlay de micrófono PREMIUM ---------- */
  function overlayMic(uiLang) {
    var ov = document.createElement('div');
    ov.id = 'vozMicOverlay';
    ov.innerHTML =
      '<div class="voz-card">' +
        '<div class="voz-mic-wrap">' +
          '<div class="voz-ring"></div>' +
          '<div class="voz-ring2"></div>' +
          '<div class="voz-mic-circ">🎤</div>' +
        '</div>' +
        '<div class="voz-mic-texto">' + txtUI(uiLang, 'escuchando') + '<small>' + txtUI(uiLang, 'decí') + '</small></div>' +
        '<div class="voz-nivel"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>' +
      '</div>';
    document.body.appendChild(ov);
    var barras = ov.querySelectorAll('.voz-nivel span');
    var medidor = new MedidorNivel(Array.prototype.slice.call(barras));
    medidor.iniciar();
    ov._medidor = medidor;
    return ov;
  }
  function resultadoOverlay(ov, ok, uiLang) {
    if (ov._medidor) ov._medidor.detener();
    var card = ov.querySelector('.voz-card');
    if (ok) {
      card.innerHTML =
        '<div class="voz-check"><svg viewBox="0 0 52 52"><path d="M14 27 L22 35 L38 17"/></svg></div>' +
        '<div class="voz-mic-texto">' + txtUI(uiLang, 'excelente') + '</div>';
    } else {
      card.classList.add('voz-shake');
      card.innerHTML =
        '<div class="voz-resultado">🔁</div>' +
        '<div class="voz-mic-texto">' + txtUI(uiLang, 'casi') + '</div>';
    }
  }
  function reiniciarOverlay(ov, uiLang) {
    var card = ov.querySelector('.voz-card');
    card.classList.remove('voz-shake');
    card.innerHTML =
      '<div class="voz-mic-wrap">' +
        '<div class="voz-ring"></div>' +
        '<div class="voz-ring2"></div>' +
        '<div class="voz-mic-circ">🎤</div>' +
      '</div>' +
      '<div class="voz-mic-texto">' + txtUI(uiLang, 'otravez') + '</div>' +
      '<div class="voz-nivel"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>';
    var barras = ov.querySelectorAll('.voz-nivel span');
    var medidor = new MedidorNivel(Array.prototype.slice.call(barras));
    medidor.iniciar();
    ov._medidor = medidor;
  }

  function repeticionGuiada(target, idioma, opts) {
    opts = opts || {};
    var uiLang = opts.uiLang || 'es';
    var maxIntentos = opts.intentos || 3;
    var ov = overlayMic(uiLang);
    var intento = 0;
    function limpiar() { if (ov._medidor) ov._medidor.detener(); if (ov.parentNode) document.body.removeChild(ov); }
    function intentar() {
      intento++;
      return reconocer(idioma, opts.tiempoMs || 7000).then(function (r) {
        if (!r.soportado) {
          if (ov._medidor) ov._medidor.detener();
          ov.querySelector('.voz-card').innerHTML = '<div class="voz-resultado">🎤</div><div class="voz-mic-texto">' + txtUI(uiLang, 'usaChrome') + '</div>';
          setTimeout(limpiar, 2400);
          return { ok: false, dicho: '', intentos: intento, soportado: false };
        }
        var cmp = compararDicho(r.transcript, target, opts.tolerancia);
        if (cmp.ok) {
          resultadoOverlay(ov, true, uiLang);
          celebrar();
          chimeExito();
          if (window.EK && EK.Audio) { try { EK.Audio.medalla ? EK.Audio.medalla() : EK.Audio.click(); } catch (e) {} }
          setTimeout(limpiar, 1800);
          return { ok: true, dicho: r.transcript, intentos: intento };
        }
        resultadoOverlay(ov, false, uiLang);
        chimeCasi();
        if (intento < maxIntentos) {
          return new Promise(function (res) {
            setTimeout(function () { reiniciarOverlay(ov, uiLang); intentar().then(res); }, 1700);
          });
        }
        setTimeout(limpiar, 1800);
        return { ok: false, dicho: r.transcript, intentos: intento, esperado: cmp.mejor };
      });
    }
    return intentar();
  }

  /* ---------- Chime PREMIUM con Web Audio (armónico, sin dependencias) ---------- */
  var audioCtxChime = null;
  function getAudioCtx() {
    if (!audioCtxChime) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtxChime = new AC();
    }
    if (audioCtxChime && audioCtxChime.state === 'suspended') { try { audioCtxChime.resume(); } catch (e) {} }
    return audioCtxChime;
  }
  function tocarNota(ctx, freq, inicio, duracion, tipo, volumen) {
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = tipo || 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, inicio);
    gain.gain.linearRampToValueAtTime(volumen || 0.18, inicio + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, inicio + duracion);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(inicio); osc.stop(inicio + duracion + 0.05);
  }
  /* Arpegio mayor ascendente brillante (C5-E5-G5-C6) + campanilla. */
  function chimeExito() {
    var ctx = getAudioCtx(); if (!ctx) return;
    var t = ctx.currentTime;
    tocarNota(ctx, 523.25, t,       0.5, 'triangle', 0.16); // C5
    tocarNota(ctx, 659.25, t + 0.09, 0.5, 'triangle', 0.16); // E5
    tocarNota(ctx, 783.99, t + 0.18, 0.6, 'triangle', 0.16); // G5
    tocarNota(ctx, 1046.5, t + 0.27, 0.9, 'sine',     0.14); // C6
    tocarNota(ctx, 2093.0, t + 0.27, 0.4, 'sine',     0.05); // brillo
  }
  /* Nota suave descendiente de aliento ("casi"). */
  function chimeCasi() {
    var ctx = getAudioCtx(); if (!ctx) return;
    var t = ctx.currentTime;
    tocarNota(ctx, 392.0, t,      0.35, 'sine', 0.10); // G4
    tocarNota(ctx, 329.63, t + 0.15, 0.45, 'sine', 0.10); // E4
  }

  /* ---------- Confeti PREMIUM en canvas con física ---------- */
  function celebrar(cantidad) {
    inyectarCSS();
    var canvas = document.createElement('canvas');
    canvas.id = 'vozConfetiCanvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var colores = ['#FFD700', '#FFA500', '#FF6B9D', '#A55EEA', '#4D96FF', '#4ECDC4', '#FFFFFF', '#FFE66D'];
    var n = cantidad || 140;
    var particulas = [];
    var cx = canvas.width / 2, cy = canvas.height * 0.35;
    // Ráfaga radial desde el centro (explosión)
    for (var i = 0; i < n * 0.6; i++) {
      var ang = Math.random() * Math.PI * 2;
      var vel = 4 + Math.random() * 9;
      particulas.push({
        x: cx, y: cy,
        vx: Math.cos(ang) * vel, vy: Math.sin(ang) * vel - 3,
        w: 6 + Math.random() * 8, h: 8 + Math.random() * 10,
        color: colores[i % colores.length],
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        estrella: Math.random() > 0.75,
        vida: 1
      });
    }
    // Lluvia suave desde arriba
    for (var j = 0; j < n * 0.4; j++) {
      particulas.push({
        x: Math.random() * canvas.width, y: -20 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 2, vy: 1.5 + Math.random() * 2.5,
        w: 6 + Math.random() * 8, h: 8 + Math.random() * 10,
        color: colores[j % colores.length],
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.2,
        estrella: Math.random() > 0.7,
        vida: 1
      });
    }
    var gravedad = 0.18;
    var frame = 0;
    function dibujarEstrella(ctx, x, y, r, rot) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
      ctx.beginPath();
      for (var k = 0; k < 5; k++) {
        var a = (k * 4 * Math.PI) / 5 - Math.PI / 2;
        ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath(); ctx.fill(); ctx.restore();
    }
    function loop() {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var vivas = 0;
      for (var p = 0; p < particulas.length; p++) {
        var pt = particulas[p];
        pt.vy += gravedad;
        pt.vx *= 0.99;
        pt.x += pt.vx; pt.y += pt.vy;
        pt.rot += pt.vr;
        if (pt.y > canvas.height + 30) { pt.vida -= 0.05; continue; }
        if (frame > 120) pt.vida -= 0.015;
        if (pt.vida <= 0) continue;
        vivas++;
        ctx.save();
        ctx.globalAlpha = Math.max(0, pt.vida);
        ctx.fillStyle = pt.color;
        ctx.shadowColor = pt.color;
        ctx.shadowBlur = 8;
        if (pt.estrella) {
          dibujarEstrella(ctx, pt.x, pt.y, pt.w, pt.rot);
        } else {
          ctx.translate(pt.x, pt.y); ctx.rotate(pt.rot);
          ctx.fillRect(-pt.w / 2, -pt.h / 2, pt.w, pt.h * Math.abs(Math.sin(pt.rot * 2)) * 0.7 + pt.h * 0.3);
        }
        ctx.restore();
      }
      if (vivas > 0 && frame < 400) requestAnimationFrame(loop);
      else { if (canvas.parentNode) canvas.parentNode.removeChild(canvas); }
    }
    loop();
    if (window.EK && EK.Audio) { try { EK.Audio.medalla ? EK.Audio.medalla() : EK.Audio.click(); } catch (e) {} }
  }

  /* ---------- API pública ---------- */
  var Voz = {
    hablar: hablar,
    callar: callar,
    detener: callar,
    repetir: repetir,
    hablarSecuencia: hablarSecuencia,
    leerPregunta: leerPreguntaCompleta,
    leerPreguntaCompleta: leerPreguntaCompleta,
    leerOpcion: leerOpcion,
    explicar: explicar,
    reconocer: reconocer,
    repeticionGuiada: repeticionGuiada,
    compararDicho: compararDicho,
    celebrar: celebrar,
    vozPara: vozPara,
    getIdiomasVoces: function () { return Object.keys(vocesPreferidas); },
    getVocesDisponibles: function () { return ('speechSynthesis' in window) ? window.speechSynthesis.getVoices() : []; },
    recalentarVoces: elegirVoces,
    // Nuevos premium
    hablarConEmocion: hablarConEmocion,
    susurrar: susurrar,
    celebrarGrito: celebrarGrito,
    chime: chimeExito,
    chimeCasi: chimeCasi,
    setEmocion: function (e) { if (EMOCIONES[e]) emocionGlobal = e; },
    getEmocion: function () { return emocionGlobal; },
    getEmociones: function () { return Object.keys(EMOCIONES); },
    get ultimoTexto() { return ultimo; },
    set habilitado(v) { habilitado = v; if (!v) callar(); },
    get habilitado() { return habilitado; },
    get soportaReconocimiento() { return !!(window.SpeechRecognition || window.webkitSpeechRecognition); }
  };

  window.EK = window.EK || {};
  window.EK.Voz = Voz;
  inyectarCSS();
})();
