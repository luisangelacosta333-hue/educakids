/* ============================================================
   storybooks-reader.js — LECTOR de Cuentos del Mundo (v2.0 MULTILENGUAJE)
   Antes: lectura ES/EN bilingüe. Ahora: cualquier idioma (es, en, pt, it, fr, de, ...)
   con traducción a un segundo idioma seleccionable, audio por oración
   (reutiliza voz.js), vocabulario, preguntas de comprensión y juego
   de emparejar (palabra nativa ↔ palabra idioma destino).
   Depende de storybooks.js (cargar antes). No toca otros mundos.
   Estructura esperada del JSON de un cuento:
     { id, titulo: {es,en,pt,...},
       vocabulario: [ {img, es, en, pt, ...}, ... ],
       preguntas: [ {es, en, ..., opciones: {es:[], en:[], ...}, correcta: idx} ],
       paginas: [ { ilustracion, fondo, oraciones: [ {es, en, pt, ...}, ... ] } ] }
   ============================================================ */
(function () {
  'use strict';
  window.EK = window.EK || {};

  var st = null; // estado interno del lector actual

  /* ---------- Idiomas por defecto (se pueden ampliar vía opts.idiomas) ---------- */
  var IDIOMAS_DEFAULT = [
    { codigo: 'es', nombre: 'Español',   bandera: '🇪🇸' },
    { codigo: 'en', nombre: 'English',   bandera: '🇬🇧' },
    { codigo: 'pt', nombre: 'Português', bandera: '🇧🇷' },
    { codigo: 'it', nombre: 'Italiano',  bandera: '🇮🇹' },
    { codigo: 'fr', nombre: 'Français',  bandera: '🇫🇷' },
    { codigo: 'de', nombre: 'Deutsch',   bandera: '🇩🇪' }
  ];

  function escapar(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function barajar(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function esImagenURL(v) {
    if (!v || typeof v !== 'string') return false;
    return /^https?:\/\//i.test(v) || /\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(v);
  }
  function ilustracionHTML(v) {
    if (esImagenURL(v)) {
      return '<img src="' + escapar(v) + '" alt="" style="width:100%;height:100%;object-fit:cover;display:block;">';
    }
    return escapar(v || '📖');
  }
  // Texto multidioma de un objeto {es, en, pt, ...}
  function txtMulti(obj, lang) {
    if (!obj || typeof obj !== 'object') return String(obj || '');
    return obj[lang] || obj.es || obj.en || Object.values(obj)[0] || '';
  }
  function idiomaObj(codigo) {
    var lista = (st && st.idiomas) || IDIOMAS_DEFAULT;
    for (var i = 0; i < lista.length; i++) { if (lista[i].codigo === codigo) return lista[i]; }
    return lista[0];
  }
  // Idioma de traducción por defecto: si lee en otro idioma, traducir al español (nativo); si lee en español, al inglés.
  function langSecPorDefecto(lectura) {
    return lectura === 'es' ? 'en' : 'es';
  }

  /* ---------- Textos de la UI (todos los idiomas) ---------- */
  var TXT = {
    es: { pag: 'Página', de: 'de', atras: 'Atrás', siguiente: 'Siguiente', fin: '¡Terminé!', mostrarTrad: 'Mostrar traducción', leerPagina: 'Leer página', detener: 'Detener', vocabulario: 'Vocabulario', preguntas: 'Preguntas', juego: 'Juego', volverALeer: 'Volver a leer', biblioteca: 'Biblioteca', pregunta: 'Pregunta', de2: 'de', bien: '¡Muy bien! 🎉', mal: 'Intentá de nuevo 💪', puntaje: 'Puntaje', jugarDeNuevo: 'Jugar de nuevo', empareja: 'Tocá una palabra y su traducción', movidas: 'Movidas', felicidades: '¡Felicidades! Terminaste el cuento 🏆', leeOtraVez: 'Leé otra vez para aprender más', perfecto: '¡Perfecto! ¡Sos un genio!', ganaste: '¡Ganaste en', bienVoz: '¡Muy bien!', malVoz: 'Intentá de nuevo', leerEn: 'Leer en', traducirA: 'Traducir a' },
    en: { pag: 'Page', de: 'of', atras: 'Back', siguiente: 'Next', fin: 'I\'m done!', mostrarTrad: 'Show translation', leerPagina: 'Read page', detener: 'Stop', vocabulario: 'Vocabulary', preguntas: 'Questions', juego: 'Game', volverALeer: 'Read again', biblioteca: 'Library', pregunta: 'Question', de2: 'of', bien: 'Great job! 🎉', mal: 'Try again 💪', puntaje: 'Score', jugarDeNuevo: 'Play again', empareja: 'Tap a word and its translation', movidas: 'Moves', felicidades: 'Congratulations! You finished the story 🏆', leeOtraVez: 'Read again to learn more', perfecto: 'Perfect! You\'re a star!', ganaste: 'You won in', bienVoz: 'Great job!', malVoz: 'Try again', leerEn: 'Read in', traducirA: 'Translate to' },
    pt: { pag: 'Página', de: 'de', atras: 'Voltar', siguiente: 'Próximo', fin: 'Terminei!', mostrarTrad: 'Mostrar tradução', leerPagina: 'Ler página', detener: 'Parar', vocabulario: 'Vocabulário', preguntas: 'Perguntas', juego: 'Jogo', volverALeer: 'Voltar a ler', biblioteca: 'Biblioteca', pregunta: 'Pergunta', de2: 'de', bien: 'Muito bem! 🎉', mal: 'Tente de novo 💪', puntaje: 'Pontuação', jugarDeNuevo: 'Jogar de novo', empareja: 'Toque uma palavra e sua tradução', movidas: 'Jogadas', felicidades: 'Parabéns! Você terminou a história 🏆', leeOtraVez: 'Leia de novo para aprender mais', perfecto: 'Perfeito! Você é um gênio!', ganaste: 'Você ganhou em', bienVoz: 'Muito bem!', malVoz: 'Tente de novo', leerEn: 'Ler em', traducirA: 'Traduzir para' },
    it: { pag: 'Pagina', de: 'di', atras: 'Indietro', siguiente: 'Avanti', fin: 'Finito!', mostrarTrad: 'Mostra traduzione', leerPagina: 'Leggi pagina', detener: 'Ferma', vocabulario: 'Vocabolario', preguntas: 'Domande', juego: 'Gioco', volverALeer: 'Torna a leggere', biblioteca: 'Libreria', pregunta: 'Domanda', de2: 'di', bien: 'Molto bene! 🎉', mal: 'Riprova 💪', puntaje: 'Punteggio', jugarDeNuevo: 'Gioca ancora', empareja: 'Tocca una parola e la sua traduzione', movidas: 'Mosse', felicidades: 'Congratulazioni! Hai finito la storia 🏆', leeOtraVez: 'Rileggi per imparare di più', perfecto: 'Perfetto! Sei un genio!', ganaste: 'Hai vinto in', bienVoz: 'Molto bene!', malVoz: 'Riprova', leerEn: 'Leggi in', traducirA: 'Traduci in' },
    fr: { pag: 'Page', de: 'sur', atras: 'Retour', siguiente: 'Suivant', fin: 'Terminé !', mostrarTrad: 'Afficher la traduction', leerPagina: 'Lire la page', detener: 'Arrêter', vocabulario: 'Vocabulaire', preguntas: 'Questions', juego: 'Jeu', volverALeer: 'Relire', biblioteca: 'Bibliothèque', pregunta: 'Question', de2: 'sur', bien: 'Très bien ! 🎉', mal: 'Réessaie 💪', puntaje: 'Score', jugarDeNuevo: 'Rejouer', empareja: 'Touche un mot et sa traduction', movidas: 'Coups', felicidades: 'Félicitations ! Tu as fini l\'histoire 🏆', leeOtraVez: 'Relis pour apprendre plus', perfecto: 'Parfait ! Tu es un génie !', ganaste: 'Tu as gagné en', bienVoz: 'Très bien !', malVoz: 'Réessaie', leerEn: 'Lire en', traducirA: 'Traduire en' },
    de: { pag: 'Seite', de: 'von', atras: 'Zurück', siguiente: 'Weiter', fin: 'Fertig!', mostrarTrad: 'Übersetzung anzeigen', leerPagina: 'Seite vorlesen', detener: 'Stopp', vocabulario: 'Wortschatz', preguntas: 'Fragen', juego: 'Spiel', volverALeer: 'Weiterlesen', biblioteca: 'Bibliothek', pregunta: 'Frage', de2: 'von', bien: 'Sehr gut! 🎉', mal: 'Versuch es nochmal 💪', puntaje: 'Punktzahl', jugarDeNuevo: 'Nochmal spielen', empareja: 'Tippe ein Wort und seine Übersetzung an', movidas: 'Züge', felicidades: 'Glückwunsch! Du hast die Geschichte beendet 🏆', leeOtraVez: 'Lies nochmal, um mehr zu lernen', perfecto: 'Perfekt! Du bist ein Genie!', ganaste: 'Du hast gewonnen in', bienVoz: 'Sehr gut!', malVoz: 'Versuch es nochmal', leerEn: 'Lesen in', traducirA: 'Übersetzen nach' }
  };
  function t(k) { var lang = (st && st.lang) || 'es'; return (TXT[lang] || TXT.es)[k] || TXT.es[k]; }

  // Opciones de <select> de idiomas
  function opcionesIdiomas(seleccionado) {
    var html = '';
    var lista = (st && st.idiomas) || IDIOMAS_DEFAULT;
    lista.forEach(function (i) {
      html += '<option value="' + i.codigo + '"' + (i.codigo === seleccionado ? ' selected' : '') + '>' + i.bandera + ' ' + i.codigo.toUpperCase() + '</option>';
    });
    return html;
  }

  /* ================= LECTOR: vista de lectura ================= */
  function renderLectura() {
    var c = st.cuento, pag = c.paginas[st.pagina] || c.paginas[0] || { oraciones: [] };
    var total = c.paginas.length;
    var cont = st.contenedor;
    var primario = st.lang;          // idioma de lectura
    var secundario = st.langSec;     // idioma de traducción

    var oracionesHtml = '';
    (pag.oraciones || []).forEach(function (o, i) {
      var textoP = txtMulti(o, primario);
      var textoS = txtMulti(o, secundario);
      oracionesHtml +=
        '<div class="sb-sentence" data-sent="' + i + '">' +
          '<button class="sb-speak-btn" data-speak="' + i + '" data-lang="' + primario + '" title="' + primario.toUpperCase() + '">🔊</button>' +
          '<div class="sb-sentence-text">' + escapar(textoP) +
            (st.mostrarTrad ? '<span class="sb-sentence-translation">' + escapar(textoS) + '</span>' : '') +
          '</div>' +
          '<button class="sb-speak-btn secondary" data-speak="' + i + '" data-lang="' + secundario + '" title="' + secundario.toUpperCase() + '">🌐</button>' +
        '</div>';
    });

    // Selector de idioma de traducción (solo visible si se muestra la traducción)
    var selectorTrad = st.mostrarTrad
      ? '<label style="font-size:12px;opacity:.8;display:flex;align-items:center;gap:6px;">' + escapar(t('traducirA')) +
        '<select class="sb-toggle" data-rdr-langsec style="height:34px;border-radius:17px;padding:0 8px;font-size:13px;">' + opcionesIdiomas(secundario) + '</select></label>'
      : '';

    cont.innerHTML =
      '<div class="sb-root sb-page-enter">' +
        '<div class="sb-header">' +
          '<button class="sb-btn-back" data-rdr-volver title="biblioteca">←</button>' +
          '<div><h2 class="sb-title">' + escapar(txtMulti(c.titulo, primario)) + '</h2>' +
          '<p class="sb-subtitle">' + escapar(t('pag')) + ' ' + (st.pagina + 1) + ' ' + escapar(t('de')) + ' ' + total + '</p></div>' +
          '<label style="font-size:12px;opacity:.8;display:flex;align-items:center;gap:6px;">' + escapar(t('leerEn')) +
          '<select class="sb-toggle" data-rdr-lang style="height:44px;border-radius:22px;padding:0 10px;font-weight:700;">' + opcionesIdiomas(primario) + '</select></label>' +
        '</div>' +
        '<div class="sb-reader">' +
          '<div class="sb-page-illustration" style="background:' + escapar(pag.fondo || '#FFE8CC') + ';">' + ilustracionHTML(pag.ilustracion) + '</div>' +
          '<div class="sb-page-text">' + oracionesHtml + '</div>' +
          '<div class="sb-toggle-row">' +
            '<button class="sb-toggle' + (st.mostrarTrad ? ' on' : '') + '" data-rdr-trad>' + (st.mostrarTrad ? '👁️ ' : '🙈 ') + escapar(t('mostrarTrad')) + '</button>' +
            selectorTrad +
            '<button class="sb-toggle" data-rdr-readpage>▶️ ' + escapar(t('leerPagina')) + '</button>' +
            '<button class="sb-toggle" data-rdr-stop>⏹️ ' + escapar(t('detener')) + '</button>' +
          '</div>' +
          '<div class="sb-reader-controls">' +
            '<button class="sb-nav-btn prev" data-rdr-prev' + (st.pagina === 0 ? ' disabled' : '') + '>← ' + escapar(t('atras')) + '</button>' +
            '<div class="sb-page-indicator">' + (st.pagina + 1) + ' / ' + total + '</div>' +
            '<button class="sb-nav-btn next" data-rdr-next>' + (st.pagina === total - 1 ? '🏁 ' + escapar(t('fin')) : escapar(t('siguiente')) + ' →') + '</button>' +
          '</div>' +
        '</div>' +
        '<div class="sb-action-row" style="margin-top:14px;">' +
          '<button class="sb-action-btn secondary" data-rdr-vista="vocabulario">📝 ' + escapar(t('vocabulario')) + '</button>' +
          '<button class="sb-action-btn accent" data-rdr-vista="preguntas">❓ ' + escapar(t('preguntas')) + '</button>' +
          '<button class="sb-action-btn ghost" data-rdr-vista="juego">🎮 ' + escapar(t('juego')) + '</button>' +
        '</div>' +
      '</div>';

    // Eventos
    cont.querySelector('[data-rdr-volver]').addEventListener('click', function () {
      st.opts.detenerAudio();
      st.opts.onCerrar();
    });
    var selLang = cont.querySelector('[data-rdr-lang]');
    if (selLang) selLang.addEventListener('change', function () {
      st.lang = selLang.value;
      if (st.lang === st.langSec) st.langSec = langSecPorDefecto(st.lang);
      renderLectura();
    });
    var selLangSec = cont.querySelector('[data-rdr-langsec]');
    if (selLangSec) selLangSec.addEventListener('change', function () {
      st.langSec = selLangSec.value;
      if (st.langSec === st.lang) st.langSec = langSecPorDefecto(st.lang);
      renderLectura();
    });
    cont.querySelector('[data-rdr-trad]').addEventListener('click', function () {
      st.mostrarTrad = !st.mostrarTrad;
      renderLectura();
    });
    cont.querySelector('[data-rdr-stop]').addEventListener('click', function () { st.opts.detenerAudio(); });
    cont.querySelector('[data-rdr-readpage]').addEventListener('click', function () { leerPaginaCompleta(); });
    var prev = cont.querySelector('[data-rdr-prev]');
    if (!prev.disabled) prev.addEventListener('click', function () {
      st.opts.detenerAudio();
      if (st.pagina > 0) { st.pagina--; st.opts.setProgreso(st.cuento.id, st.pagina + 1); renderLectura(); }
    });
    cont.querySelector('[data-rdr-next]').addEventListener('click', function () {
      st.opts.detenerAudio();
      if (st.pagina < total - 1) {
        st.pagina++;
        st.opts.setProgreso(st.cuento.id, st.pagina + 1);
        renderLectura();
      } else {
        st.opts.onTerminado();
        st.vista = 'fin';
        renderFin();
      }
    });
    cont.querySelectorAll('[data-speak]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var i = parseInt(b.getAttribute('data-speak'), 10);
        var lg = b.getAttribute('data-lang');
        hablarOracion(i, lg);
      });
    });
    cont.querySelectorAll('.sb-sentence').forEach(function (row) {
      row.addEventListener('click', function () {
        var i = parseInt(row.getAttribute('data-sent'), 10);
        hablarOracion(i, primario);
      });
    });
  }

  function hablarOracion(i, lang) {
    var pag = st.cuento.paginas[st.pagina] || { oraciones: [] };
    var o = (pag.oraciones || [])[i];
    if (!o) return;
    var texto = txtMulti(o, lang);
    var row = st.contenedor.querySelector('.sb-sentence[data-sent="' + i + '"]');
    if (row) {
      st.contenedor.querySelectorAll('.sb-sentence.playing').forEach(function (r) { r.classList.remove('playing'); });
      row.classList.add('playing');
    }
    st.opts.hablar(texto, lang, function () {
      if (row) row.classList.remove('playing');
    });
  }

  function leerPaginaCompleta() {
    var pag = st.cuento.paginas[st.pagina] || { oraciones: [] };
    var oraciones = pag.oraciones || [];
    var i = 0;
    function siguiente() {
      if (i >= oraciones.length || !st || st.vista !== 'lectura') return;
      var idx = i; i++;
      var texto = txtMulti(oraciones[idx], st.lang);
      var row = st.contenedor.querySelector('.sb-sentence[data-sent="' + idx + '"]');
      if (row) {
        st.contenedor.querySelectorAll('.sb-sentence.playing').forEach(function (r) { r.classList.remove('playing'); });
        row.classList.add('playing');
      }
      st.opts.hablar(texto, st.lang, function () {
        if (row) row.classList.remove('playing');
        setTimeout(siguiente, 350);
      });
    }
    siguiente();
  }

  /* ================= VOCABULARIO ================= */
  function renderVocabulario() {
    var c = st.cuento, cont = st.contenedor;
    var items = c.vocabulario || [];
    var html = '';
    items.forEach(function (v, i) {
      html +=
        '<div class="sb-vocab-card">' +
          '<span class="sb-vocab-img">' + escapar(v.img || '🔤') + '</span>' +
          '<div class="sb-vocab-words">' +
            '<div class="sb-vocab-es">' + escapar(txtMulti(v, st.langSec)) + '</div>' +
            '<div class="sb-vocab-en">' + escapar(txtMulti(v, st.lang)) + '</div>' +
          '</div>' +
          '<button class="sb-vocab-speak" data-voc="' + i + '" data-lang="' + st.langSec + '" title="' + st.langSec.toUpperCase() + '">🌐</button>' +
          '<button class="sb-vocab-speak" data-voc="' + i + '" data-lang="' + st.lang + '" title="' + st.lang.toUpperCase() + '" style="background:var(--sb-secondary);">🔊</button>' +
        '</div>';
    });
    cont.innerHTML =
      '<div class="sb-root sb-page-enter">' +
        '<div class="sb-header">' +
          '<button class="sb-btn-back" data-rdr-volver>←</button>' +
          '<div><h2 class="sb-title">📝 ' + escapar(t('vocabulario')) + '</h2>' +
          '<p class="sb-subtitle">' + escapar(txtMulti(c.titulo, st.lang)) + '</p></div>' +
        '</div>' +
        '<div class="sb-reader"><div class="sb-vocab-grid" style="grid-template-columns:1fr;padding-top:14px;">' + html + '</div></div>' +
        '<div class="sb-action-row" style="margin-top:14px;"><button class="sb-action-btn primary" data-rdr-vista="lectura">📖 ' + escapar(t('volverALeer')) + '</button></div>' +
      '</div>';
    cont.querySelector('[data-rdr-volver]').addEventListener('click', function () { st.opts.detenerAudio(); st.vista = 'lectura'; renderLectura(); });
    cont.querySelector('[data-rdr-vista="lectura"]').addEventListener('click', function () { st.opts.detenerAudio(); st.vista = 'lectura'; renderLectura(); });
    cont.querySelectorAll('[data-voc]').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = parseInt(b.getAttribute('data-voc'), 10);
        var lg = b.getAttribute('data-lang');
        var v = items[i];
        if (v) st.opts.hablar(txtMulti(v, lg), lg);
      });
    });
  }

  /* ================= PREGUNTAS DE COMPRENSIÓN ================= */
  function renderPreguntas() {
    var c = st.cuento, cont = st.contenedor;
    var preguntas = c.preguntas || [];
    if (!preguntas.length) { st.vista = 'lectura'; renderLectura(); return; }
    if (st.quizIdx >= preguntas.length) { renderQuizResultado(); return; }
    var p = preguntas[st.quizIdx];
    var opciones = (p.opciones && (p.opciones[st.lang] || p.opciones.es) || []).slice();
    var html = '';
    opciones.forEach(function (op, i) {
      html += '<button class="sb-quiz-opt" data-opt="' + i + '">' + escapar(op) + '</button>';
    });
    cont.innerHTML =
      '<div class="sb-root sb-page-enter">' +
        '<div class="sb-header">' +
          '<button class="sb-btn-back" data-rdr-volver>←</button>' +
          '<div><h2 class="sb-title">❓ ' + escapar(t('preguntas')) + '</h2>' +
          '<p class="sb-subtitle">' + escapar(t('pregunta')) + ' ' + (st.quizIdx + 1) + ' ' + escapar(t('de2')) + ' ' + preguntas.length + ' · ' + escapar(t('puntaje')) + ': ' + st.quizScore + '</p></div>' +
        '</div>' +
        '<div class="sb-reader"><div class="sb-quiz">' +
          '<div class="sb-quiz-q">' + escapar(txtMulti(p, st.lang)) +
            ' <button class="sb-speak-btn" data-quiz-speak style="width:36px;height:36px;font-size:14px;vertical-align:middle;">🔊</button></div>' +
          '<div class="sb-quiz-options">' + html + '</div>' +
          '<div class="sb-quiz-feedback" id="sb-quiz-fb"></div>' +
        '</div></div>' +
      '</div>';
    cont.querySelector('[data-rdr-volver]').addEventListener('click', function () { st.opts.detenerAudio(); st.vista = 'lectura'; renderLectura(); });
    cont.querySelector('[data-quiz-speak]').addEventListener('click', function () {
      st.opts.hablar(txtMulti(p, st.lang), st.lang);
    });
    cont.querySelectorAll('.sb-quiz-opt').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = parseInt(b.getAttribute('data-opt'), 10);
        var correcta = p.correcta;
        var fb = cont.querySelector('#sb-quiz-fb');
        cont.querySelectorAll('.sb-quiz-opt').forEach(function (x) { x.disabled = true; });
        if (i === correcta) {
          b.classList.add('correct');
          st.quizScore++;
          fb.textContent = t('bien');
          fb.style.color = 'var(--sb-accent)';
          st.opts.hablar(t('bienVoz'), st.lang);
        } else {
          b.classList.add('wrong');
          var cb = cont.querySelector('.sb-quiz-opt[data-opt="' + correcta + '"]');
          if (cb) cb.classList.add('correct');
          fb.textContent = t('mal');
          fb.style.color = '#FA5252';
          st.opts.hablar(t('malVoz'), st.lang);
        }
        setTimeout(function () { st.quizIdx++; renderPreguntas(); }, 1600);
      });
    });
  }

  function renderQuizResultado() {
    var cont = st.contenedor;
    var total = (st.cuento.preguntas || []).length;
    cont.innerHTML =
      '<div class="sb-root"><div class="sb-finish">' +
        '<span class="trophy">🏆</span>' +
        '<h3>' + escapar(t('puntaje')) + ': ' + st.quizScore + ' / ' + total + '</h3>' +
        '<p>' + (st.quizScore === total ? '🌟 ' + escapar(t('perfecto')) : '📖 ' + escapar(t('leeOtraVez'))) + '</p>' +
        '<div class="sb-action-row">' +
          '<button class="sb-action-btn primary" data-rdr-quiz-again>🔄 ' + escapar(t('jugarDeNuevo')) + '</button>' +
          '<button class="sb-action-btn ghost" data-rdr-vista="lectura">📖 ' + escapar(t('volverALeer')) + '</button>' +
        '</div>' +
      '</div></div>';
    cont.querySelector('[data-rdr-quiz-again]').addEventListener('click', function () {
      st.quizIdx = 0; st.quizScore = 0; renderPreguntas();
    });
    cont.querySelector('[data-rdr-vista="lectura"]').addEventListener('click', function () {
      st.vista = 'lectura'; renderLectura();
    });
  }

  /* ================= JUEGO DE EMPAREJAR =================
     Tarjeta A = imagen + palabra en idioma nativo (langSec).
     Tarjeta B = palabra en idioma de lectura (lang). */
  function renderJuego() {
    var c = st.cuento, cont = st.contenedor;
    var vocab = (c.vocabulario || []).slice(0, 6);
    var cartas = [];
    vocab.forEach(function (v, i) {
      cartas.push({ id: i, tipo: 'A', img: v.img, texto: txtMulti(v, st.langSec), match: i });
      cartas.push({ id: i, tipo: 'B', img: '', texto: txtMulti(v, st.lang), match: i });
    });
    st.match = { cartas: barajar(cartas), seleccionada: null, movidas: 0, encontradas: 0, total: vocab.length, bloqueado: false };

    cont.innerHTML =
      '<div class="sb-root sb-page-enter">' +
        '<div class="sb-header">' +
          '<button class="sb-btn-back" data-rdr-volver>←</button>' +
          '<div><h2 class="sb-title">🎮 ' + escapar(t('juego')) + '</h2>' +
          '<p class="sb-subtitle">' + escapar(t('empareja')) + '</p></div>' +
        '</div>' +
        '<div class="sb-match-hud">' + escapar(t('movidas')) + ': <span id="sb-moves">0</span> · ' + (st.match.total) + ' pares</div>' +
        '<div class="sb-reader"><div class="sb-match-grid" id="sb-match-grid"></div></div>' +
      '</div>';
    cont.querySelector('[data-rdr-volver]').addEventListener('click', function () { st.opts.detenerAudio(); st.vista = 'lectura'; renderLectura(); });
    renderMatchGrid();
  }

  function renderMatchGrid() {
    var grid = st.contenedor.querySelector('#sb-match-grid');
    if (!grid) return;
    grid.innerHTML = '';
    st.match.cartas.forEach(function (carta, pos) {
      var el = document.createElement('button');
      el.className = 'sb-match-card';
      el.setAttribute('data-pos', pos);
      if (carta.matched) { el.classList.add('matched'); el.disabled = true; }
      if (carta.revelada || carta.matched) {
        el.innerHTML = carta.tipo === 'A'
          ? '<div><div style="font-size:28px;">' + escapar(carta.img || '🔤') + '</div><div style="font-size:12px;">' + escapar(carta.texto) + '</div></div>'
          : '<div style="font-size:13px;">' + escapar(carta.texto) + '</div>';
      } else {
        el.textContent = '❓';
        el.style.background = 'var(--sb-gold)';
      }
      el.addEventListener('click', function () { tocarCarta(pos, el); });
      grid.appendChild(el);
    });
    var mv = st.contenedor.querySelector('#sb-moves');
    if (mv) mv.textContent = st.match.movidas;
  }

  function tocarCarta(pos, el) {
    var m = st.match;
    if (m.bloqueado) return;
    var carta = m.cartas[pos];
    if (carta.matched || carta.revelada) return;
    carta.revelada = true;
    renderMatchGrid();
    if (m.seleccionada === null) {
      m.seleccionada = pos;
      return;
    }
    m.movidas++;
    var primera = m.cartas[m.seleccionada];
    if (primera.match === carta.match) {
      primera.matched = true; carta.matched = true;
      m.encontradas++;
      m.seleccionada = null;
      st.opts.hablar(t('bienVoz'), st.lang);
      renderMatchGrid();
      if (m.encontradas >= m.total) {
        setTimeout(function () {
          var frase = t('ganaste') + ' ' + m.movidas + ' ' + t('movidas') + '!';
          st.contenedor.querySelector('.sb-match-hud').innerHTML = '🎉 ' + frase + ' 🎉';
          st.opts.hablar(frase, st.lang);
        }, 400);
      }
    } else {
      m.bloqueado = true;
      var pos1 = m.seleccionada;
      m.seleccionada = null;
      setTimeout(function () {
        m.cartas[pos1].revelada = false;
        carta.revelada = false;
        m.bloqueado = false;
        renderMatchGrid();
      }, 900);
    }
    var mv = st.contenedor.querySelector('#sb-moves');
    if (mv) mv.textContent = m.movidas;
  }

  /* ================= FIN DEL CUENTO ================= */
  function renderFin() {
    var cont = st.contenedor, c = st.cuento;
    cont.innerHTML =
      '<div class="sb-root"><div class="sb-finish">' +
        '<span class="trophy">🏆</span>' +
        '<h3>' + escapar(t('felicidades')) + '</h3>' +
        '<p>📖 ' + escapar(txtMulti(c.titulo, st.lang)) + '</p>' +
        '<div class="sb-action-row">' +
          '<button class="sb-action-btn primary" data-rdr-releer>🔄 ' + escapar(t('volverALeer')) + '</button>' +
          '<button class="sb-action-btn secondary" data-rdr-vista="vocabulario">📝 ' + escapar(t('vocabulario')) + '</button>' +
          '<button class="sb-action-btn accent" data-rdr-vista="preguntas">❓ ' + escapar(t('preguntas')) + '</button>' +
          '<button class="sb-action-btn ghost" data-rdr-vista="juego">🎮 ' + escapar(t('juego')) + '</button>' +
          '<button class="sb-action-btn ghost" data-rdr-biblio>📚 ' + escapar(t('biblioteca')) + '</button>' +
        '</div>' +
      '</div></div>';
    cont.querySelector('[data-rdr-releer]').addEventListener('click', function () {
      st.pagina = 0; st.vista = 'lectura'; renderLectura();
    });
    cont.querySelector('[data-rdr-biblio]').addEventListener('click', function () { st.opts.detenerAudio(); st.opts.onCerrar(); });
    cont.querySelectorAll('[data-rdr-vista]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-rdr-vista');
        st.vista = v;
        if (v === 'vocabulario') renderVocabulario();
        else if (v === 'preguntas') { st.quizIdx = 0; st.quizScore = 0; renderPreguntas(); }
        else if (v === 'juego') renderJuego();
        else { st.vista = 'lectura'; renderLectura(); }
      });
    });
  }

  /* ================= API pública ================= */
  function abrir(cuento, meta, contenedor, opts) {
    opts = opts || {};
    var lectura = opts.lang || 'es';
    st = {
      cuento: cuento,
      meta: meta,
      contenedor: contenedor,
      opts: opts,
      idiomas: Array.isArray(opts.idiomas) && opts.idiomas.length ? opts.idiomas : IDIOMAS_DEFAULT,
      lang: lectura,
      langSec: opts.langSec || langSecPorDefecto(lectura),
      pagina: 0,
      mostrarTrad: true,
      vista: 'lectura',
      quizIdx: 0,
      quizScore: 0,
      match: null
    };
    if (st.langSec === st.lang) st.langSec = langSecPorDefecto(st.lang);
    var prog = opts.getProgreso ? opts.getProgreso(cuento.id) : null;
    var totalPag = (cuento.paginas || []).length;
    if (prog && prog.pagina > 0 && prog.pagina < totalPag && !prog.terminado) {
      st.pagina = Math.min(prog.pagina, totalPag - 1);
    }
    renderLectura();
  }

  EK.StorybooksReader = { abrir: abrir };
})();
