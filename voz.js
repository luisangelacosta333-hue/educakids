/* ============================================================
   voz.js — Motor de VOZ para la SUPER APP (TTS + STT)
   Sin romper nada: se carga después de mundos.js y del engine.
   - EK.Voz.hablar(texto, lang)  -> lee en voz alta (TTS)
   - EK.Voz.leerPregunta(preg)   -> lee cualquier pregunta (todos los mundos)
   - EK.Voz.escucharYComparar(palabraCorrecta, lang, cb) -> micrófono (STT)
     el niño repite, se compara con la correcta y se aprueba si pronunció bien
   - EK.Voz.detener() / EK.Voz.soportado() / EK.Voz.voces()
   Idiomas: es-AR, en-US, pt-BR, fr-FR, it-IT, de-DE
   ============================================================ */
(function () {
  'use strict';
  window.EK = window.EK || {};
  EK.Voz = EK.Voz || {};

  var LANGS = { es: 'es-AR', ingles: 'en-US', portugues: 'pt-BR', frances: 'fr-FR', italiano: 'it-IT', aleman: 'de-DE', en: 'en-US', pt: 'pt-BR', fr: 'fr-FR', it: 'it-IT', de: 'de-DE' };
  var vocesCache = [];

  // Cargar voces (son asíncronas en algunos navegadores)
  function cargarVoces() {
    if (!('speechSynthesis' in window) || !window.speechSynthesis) return;
    try {
      if (typeof window.speechSynthesis.getVoices === 'function') {
        vocesCache = window.speechSynthesis.getVoices() || [];
      }
    } catch (e) { vocesCache = []; }
  }
  if ('speechSynthesis' in window && window.speechSynthesis) {
    cargarVoces();
    try { window.speechSynthesis.onvoiceschanged = cargarVoces; } catch (e) {}
  }

  // Normalizar texto para comparar (sin acentos, minúsculas, sin puntuación)
  function normalizar(t) {
    return String(t || '').toLowerCase().trim()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,!?¡¿;:()"'«»\u00BF\u00A1]/g, '')
      .replace(/\s+/g, ' ');
  }

  // Distancia Levenshtein simple para comparación tolerante
  function levenshtein(a, b) {
    var m = a.length, n = b.length, d = [], i, j;
    if (m === 0) return n; if (n === 0) return m;
    for (i = 0; i <= m; i++) { d[i] = [i]; }
    for (j = 0; j <= n; j++) { d[0][j] = j; }
    for (j = 1; j <= n; j++) for (i = 1; i <= m; i++) {
      d[i][j] = a[i-1] === b[j-1] ? d[i-1][j-1] : 1 + Math.min(d[i-1][j], d[i][j-1], d[i-1][j-1]);
    }
    return d[m][n];
  }

  // Comparación tolerante: éxito si coincide exacto, contiene, o distancia <= 1 (o <=2 si palabra larga)
  function pronunciacionCorrecta(dicho, correcta) {
    var d = normalizar(dicho), c = normalizar(correcta);
    if (!d || !c) return false;
    if (d === c) return true;
    if (d.indexOf(c) >= 0 || c.indexOf(d) >= 0) return true;
    var tolerancia = c.length >= 6 ? 2 : 1;
    if (levenshtein(d, c) <= tolerancia) return true;
    // comparar palabra por palabra (si dijo una frase, que contenga la correcta)
    var palabras = d.split(' ');
    for (var i = 0; i < palabras.length; i++) {
      if (levenshtein(palabras[i], c) <= tolerancia) return true;
    }
    return false;
  }

  function resolverLang(lang) {
    if (!lang) return 'es-AR';
    return LANGS[lang] || lang;
  }

  function elegirVoz(langCode) {
    if (!vocesCache.length) cargarVoces();
    var base = langCode.split('-')[0];
    // 1) voz exacta del país, 2) voz del mismo idioma, 3) la primera que tenga el idioma
    for (var i = 0; i < vocesCache.length; i++) { if (vocesCache[i].lang === langCode) return vocesCache[i]; }
    for (var j = 0; j < vocesCache.length; j++) { if (vocesCache[j].lang && vocesCache[j].lang.indexOf(base) === 0) return vocesCache[j]; }
    return null;
  }

  /* ---------- TTS: leer en voz alta ---------- */
  function hablar(texto, opts) {
    opts = opts || {};
    if (!('speechSynthesis' in window) || !window.speechSynthesis) return { soportado: false };
    try { window.speechSynthesis.cancel(); } catch (e) {}
    var u = new SpeechSynthesisUtterance(String(texto || ''));
    u.lang = resolverLang(opts.lang);
    u.rate = opts.rate || 0.9;      // más lento para niños
    u.pitch = opts.pitch || 1.1;    // tono más agudo, amigable
    u.volume = opts.volume || 1;
    var voz = elegirVoz(u.lang);
    if (voz) u.voice = voz;
    if (typeof opts.onend === 'function') u.onend = opts.onend;
    if (typeof opts.onerror === 'function') u.onerror = opts.onerror;
    window.speechSynthesis.speak(u);
    return { soportado: true, utterance: u };
  }

  function detener() {
    if ('speechSynthesis' in window && window.speechSynthesis) { try { window.speechSynthesis.cancel(); } catch (e) {} }
    if (reconocedorActivo) { try { reconocedorActivo.stop(); } catch (e) {} reconocedorActivo = null; }
  }

  // Lee cualquier pregunta (de cualquier mundo) en voz alta.
  // Lee el texto de la pregunta y, si se pide, también las opciones.
  function leerPregunta(pregunta, opts) {
    opts = opts || {};
    if (!pregunta) return { soportado: false };
    var lang = opts.lang || pregunta.lang || 'es-AR';
    var texto = String(pregunta.pregunta || pregunta.p || '');
    // Si es pregunta de idioma con audio, usar el audio nativo si existe
    if (pregunta.audio && pregunta.audio.texto && !opts.forzarTexto) {
      return hablar(pregunta.audio.texto, { lang: pregunta.audio.lang || lang, rate: opts.rate, onend: opts.onend });
    }
    if (opts.leerOpciones && pregunta.opciones) {
      texto += '. Opciones: ' + pregunta.opciones.join('. . ');
    }
    return hablar(texto, { lang: lang, rate: opts.rate || 0.95, onend: opts.onend });
  }

  /* ---------- STT: micrófono para pronunciar ---------- */
  var reconocedorActivo = null;

  function soportaReconocimiento() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  // Escucha al niño, compara con palabraCorrecta.
  // callback({soportado, escuchando, exito, dicho, correcta, error, intentos})
  function escucharYComparar(palabraCorrecta, lang, callback, opts) {
    opts = opts || {};
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { callback({ soportado: false }); return { soportado: false }; }
    try { if (reconocedorActivo) { reconocedorActivo.stop(); } } catch (e) {}
    var rec = new SR();
    rec.lang = resolverLang(lang);
    rec.interimResults = false;
    rec.continuous = false;
    rec.maxAlternatives = opts.maxAlternatives || 6;
    reconocedorActivo = rec;
    var respondio = false;

    rec.onresult = function (e) {
      if (respondio) return; respondio = true;
      reconocedorActivo = null;
      var resultado = e.results[0];
      var exito = false, dicho = resultado[0].transcript;
      // Probar todas las alternativas que dio el reconocedor
      for (var i = 0; i < resultado.length; i++) {
        var alt = resultado[i].transcript;
        if (pronunciacionCorrecta(alt, palabraCorrecta)) { exito = true; dicho = alt; break; }
      }
      // También probar con la palabra en español (por si dijo la traducción, se lo avisamos)
      var dijoEspanol = opts.palabraEspanol && pronunciacionCorrecta(dicho, opts.palabraEspanol);
      var res = {
        soportado: true, exito: exito, dijoEspanol: dijoEspanol,
        dicho: dicho, correcta: palabraCorrecta,
        lang: rec.lang,
        mensaje: exito ? '¡Perfecto, se escuchó bien!' : (dijoEspanol ? '¡Casi! Decilo en el otro idioma' : 'Escuché: "' + dicho + '". Intentá de nuevo')
      };
      // Feedback por voz: si está mal, reproducimos la pronunciación correcta para que escuche
      if (!exito && opts.reproducirCorrecto !== false) {
        hablar(palabraCorrecta, { lang: rec.lang, rate: 0.85, onend: function () { callback(res); } });
      } else {
        callback(res);
      }
    };
    rec.onerror = function (e) {
      if (respondio) return; respondio = true;
      reconocedorActivo = null;
      callback({ soportado: true, error: e.error, exito: false, mensaje: errorAMensaje(e.error) });
    };
    rec.onend = function () {
      reconocedorActivo = null;
      if (!respondio) { respondio = true; callback({ soportado: true, error: 'sin-audio', exito: false, mensaje: 'No escuché nada. Acercate al micrófono.' }); }
    };
    try { rec.start(); } catch (e) { callback({ soportado: true, error: 'start-fail', exito: false }); }
    return { soportado: true, escuchando: true, reconocedor: rec };
  }

  function errorAMensaje(err) {
    switch (err) {
      case 'not-allowed': return 'Permiso de micrófono denegado. Habilitalo en el navegador.';
      case 'no-speech': return 'No escuché nada. Intentá de nuevo.';
      case 'audio-capture': return 'No hay micrófono disponible.';
      case 'network': return 'Error de red. El reconocimiento necesita internet.';
      default: return 'Ocurrió un error. Intentá de nuevo.';
    }
  }

  // Pedir permiso de micrófono y probar
  function probarMicrofono(callback) {
    if (!soportaReconocimiento()) { callback({ soportado: false }); return; }
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
        stream.getTracks().forEach(function (t) { t.stop(); });
        callback({ soportado: true, permiso: true });
      }).catch(function () { callback({ soportado: true, permiso: false }); });
    } else {
      callback({ soportado: true, permiso: null });
    }
  }

  /* ---------- Feedback por voz (ánimo) ---------- */
  var FRASES = {
    exito: ['¡Excelente!', '¡Muy bien pronunciado!', '¡Perfecto!', '¡Sos un genio!', '¡Increíble!', '¡Bravo!'],
    fracaso: ['Casi, escuchá bien', 'Intentá de nuevo', 'Vamos, vos podés', 'Escuchá cómo se dice'],
    enEspanol: ['¡Bien! Pero decilo en inglés', '¡Muy bien! Ahora en el otro idioma']
  };
  function feedback(tipo, lang) {
    var arr = FRASES[tipo] || FRASES.exito;
    hablar(arr[Math.floor(Math.random() * arr.length)], { lang: lang || 'es-AR', rate: 1 });
  }

  // Voces disponibles (para que la UI muestre selector)
  function vocesDisponibles() {
    cargarVoces();
    return vocesCache.map(function (v) { return { lang: v.lang, nombre: v.name, local: v.localService }; });
  }

  EK.Voz = {
    LANGS: LANGS,
    hablar: hablar,
    detener: detener,
    leerPregunta: leerPregunta,
    escucharYComparar: escucharYComparar,
    soportaReconocimiento: soportaReconocimiento,
    probarMicrofono: probarMicrofono,
    voces: vocesDisponibles,
    normalizar: normalizar,
    pronunciacionCorrecta: pronunciacionCorrecta,
    feedback: feedback,
    FRASES: FRASES,
    resolverLang: resolverLang
  };
})();
