/* ============================================================
   storybooks.js — Mundo "Cuentos del Mundo" para BuggyIA
   v4.0 MULTILENGUAJE: antes "Bilingüe" (es/en), ahora soporta
   muchos idiomas (es, en, pt, it, fr, de, ...).
   Módulo BIBLIOTECA: catálogo, búsqueda, categorías, favoritos,
   progreso de lectura y carga diferida (lazy) de JSON.
   Se apoya en voz.js (EK.Voz.hablar) cuando existe.
   Cargar DESPUÉS de mundos.js, engine.js y voz.js:
     <script src="storybooks.js"></script>
     <script src="storybooks-reader.js"></script>
   ARQUITECTURA ESPERADA:
     tu-proyecto/
     ├── index.html
     ├── storybooks.js
     ├── voz.js
     └── storybooks/
         ├── catalogo.json
         ├── tortuga.json
         ├── zorro.json
         └── leon.json
   ============================================================ */
(function () {
  'use strict';
  window.EK = window.EK || {};

  /* ---------- Idiomas soportados (fácil de extender) ----------
     Para agregar un idioma: agregá un objeto acá, sus textos en TXT,
     y las traducciones en cada cuento JSON. Listo. */
  var IDIOMAS = [
    { codigo: 'es', nombre: 'Español',   bandera: '🇪🇸', voz: 'es-AR' },
    { codigo: 'en', nombre: 'English',   bandera: '🇬🇧', voz: 'en-US' },
    { codigo: 'pt', nombre: 'Português', bandera: '🇧🇷', voz: 'pt-BR' },
    { codigo: 'it', nombre: 'Italiano',  bandera: '🇮🇹', voz: 'it-IT' },
    { codigo: 'fr', nombre: 'Français',  bandera: '🇫🇷', voz: 'fr-FR' },
    { codigo: 'de', nombre: 'Deutsch',   bandera: '🇩🇪', voz: 'de-DE' }
  ];
  var CODIGOS_VALIDOS = {};
  IDIOMAS.forEach(function (i) { CODIGOS_VALIDOS[i.codigo] = true; });

  function idiomaObj(codigo) {
    for (var i = 0; i < IDIOMAS.length; i++) { if (IDIOMAS[i].codigo === codigo) return IDIOMAS[i]; }
    return IDIOMAS[0];
  }
  function codigoVoz(codigo) { return idiomaObj(codigo).voz; }

  /* ---------- Definición del mundo (auto-registro) ---------- */
  var MUNDO_STORYBOOKS = {
    id: 'storybooks',
    nombre: 'Cuentos del Mundo',
    emoji: '🌍',
    color: '#FF9F43',
    tipo: 'storybooks',
    nivel: 'todos',
    desc: 'Cuentos ilustrados en muchos idiomas con audio y juegos'
  };

  function registrarMundo() {
    try {
      var lista = null;
      if (Array.isArray(EK.Mundos)) lista = EK.Mundos;
      else if (EK.Mundos && Array.isArray(EK.Mundos.MUNDOS)) lista = EK.Mundos.MUNDOS;
      else if (EK.Mundos && Array.isArray(EK.Mundos.mundos)) lista = EK.Mundos.mundos;
      else if (window.MUNDOS && Array.isArray(window.MUNDOS)) lista = window.MUNDOS;
      if (lista && !lista.some(function (m) { return m && m.id === 'storybooks'; })) {
        lista.push(MUNDO_STORYBOOKS);
      }
    } catch (e) { /* silencioso */ }
  }
  registrarMundo();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registrarMundo);
  }

  /* ---------- Ruta base (detecta desde el propio script) ---------- */
  function detectarRutaBase() {
    if (window.SB_RUTA_BASE) return window.SB_RUTA_BASE;
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src || '';
      if (src.indexOf('storybooks.js') >= 0) {
        return src.replace(/[^/]*storybooks\.js.*$/, '') + 'storybooks/';
      }
    }
    return 'storybooks/';
  }
  var RUTA_BASE = detectarRutaBase();

  /* ---------- Catálogo embebido de respaldo (si falla el fetch) ----------
     Archivos: tortuga.json / zorro.json / leon.json (arquitectura nueva) */
  var CATALOGO_EMBEBIDO = {
    idiomas: ['es', 'en', 'pt', 'it', 'fr', 'de'],
    categorias: [
      { id: 'clasicos', nombre: { es: 'Clásicos', en: 'Classics', pt: 'Clássicos', it: 'Classici', fr: 'Classiques', de: 'Klassiker' }, icono: '🏆' },
      { id: 'animales', nombre: { es: 'Animales', en: 'Animals', pt: 'Animais', it: 'Animali', fr: 'Animaux', de: 'Tiere' }, icono: '🐾' },
      { id: 'aprender', nombre: { es: 'Valores', en: 'Values', pt: 'Valores', it: 'Valori', fr: 'Valeurs', de: 'Werte' }, icono: '🌟' }
    ],
    cuentos: [
      { id: 'tortuga-liebre', titulo: { es: 'La Tortuga y la Liebre', en: 'The Tortoise and the Hare', pt: 'A Tartaruga e a Lebre', it: 'La Tartaruga e la Lepre', fr: 'La Tortue et le Lièvre', de: 'Die Schildkröte und der Hase' }, categoria: 'clasicos', paginas: 4, color: '#4ECDC4', portada: '🐢', archivo: 'tortuga.json' },
      { id: 'zorro-cuervo',   titulo: { es: 'El Zorro y el Cuervo', en: 'The Fox and the Crow', pt: 'A Raposa e o Corvo', it: 'La Volpe e il Corvo', fr: 'Le Renard et le Corbeau', de: 'Der Fuchs und der Rabe' }, categoria: 'animales', paginas: 4, color: '#FF9F43', portada: '🦊', archivo: 'zorro.json' },
      { id: 'leon-raton',     titulo: { es: 'El León y el Ratón', en: 'The Lion and the Mouse', pt: 'O Leão e o Rato', it: 'Il Leone e il Topo', fr: 'Le Lion et la Souris', de: 'Der Löwe und die Maus' }, categoria: 'aprender', paginas: 4, color: '#A55EEA', portada: '🦁', archivo: 'leon.json' }
    ]
  };

  var CUENTOS_EMBEBIDOS = {
    'tortuga-liebre': {
      id: 'tortuga-liebre',
      titulo: { es: 'La Tortuga y la Liebre', en: 'The Tortoise and the Hare' },
      paginas: [
        { es: 'Había una liebre muy rápida que se reía de la tortuga por ser lenta.', en: 'There was a very fast hare who laughed at the tortoise for being slow.', imagen: '🐰', vocabulario: [{ es: 'liebre', en: 'hare' }, { es: 'tortuga', en: 'tortoise' }, { es: 'rápida', en: 'fast' }] },
        { es: '— ¿Querés una carrera? — dijo la liebre riendo. La tortuga aceptó.', en: '“Want to race?” said the hare, laughing. The tortoise accepted.', imagen: '🏁', vocabulario: [{ es: 'carrera', en: 'race' }, { es: 'riendo', en: 'laughing' }] },
        { es: 'La liebre corrió mucho y se durmió debajo de un árbol. La tortuga siguió caminando sin parar.', en: 'The hare ran fast and fell asleep under a tree. The tortoise kept walking without stopping.', imagen: '🌳', vocabulario: [{ es: 'durmió', en: 'slept' }, { es: 'árbol', en: 'tree' }, { es: 'caminando', en: 'walking' }] },
        { es: 'Cuando la liebre se despertó, la tortuga ya había ganado. La constancia vence a la velocidad.', en: 'When the hare woke up, the tortoise had already won. Perseverance beats speed.', imagen: '🏆', vocabulario: [{ es: 'ganó', en: 'won' }, { es: 'constancia', en: 'perseverance' }] }
      ]
    },
    'zorro-cuervo': {
      id: 'zorro-cuervo',
      titulo: { es: 'El Zorro y el Cuervo', en: 'The Fox and the Crow' },
      paginas: [
        { es: 'Un cuervo tenía un queso en el pico y estaba parado en una rama.', en: 'A crow had a piece of cheese in its beak and stood on a branch.', imagen: '🐦‍⬛', vocabulario: [{ es: 'cuervo', en: 'crow' }, { es: 'queso', en: 'cheese' }, { es: 'rama', en: 'branch' }] },
        { es: 'El zorro, que tenía hambre, quiso robarle el queso con halagos.', en: 'The fox, who was hungry, wanted to steal the cheese with flattery.', imagen: '🦊', vocabulario: [{ es: 'zorro', en: 'fox' }, { es: 'hambre', en: 'hungry' }, { es: 'halagos', en: 'flattery' }] },
        { es: '— ¡Qué canto más lindo tenés! Cantame una canción — dijo el zorro.', en: '“What a beautiful voice you have! Sing me a song,” said the fox.', imagen: '🎵', vocabulario: [{ es: 'canto', en: 'singing voice' }, { es: 'canción', en: 'song' }] },
        { es: 'Al cantar, el cuervo soltó el queso. El zorro lo agarró y se fue. No te dejes engañar por los halagos.', en: 'When he sang, the crow dropped the cheese. The fox grabbed it and left. Don\'t be fooled by flattery.', imagen: '🧀', vocabulario: [{ es: 'soltó', en: 'dropped' }, { es: 'engañar', en: 'fool' }] }
      ]
    },
    'leon-raton': {
      id: 'leon-raton',
      titulo: { es: 'El León y el Ratón', en: 'The Lion and the Mouse' },
      paginas: [
        { es: 'Un ratón despertó a un león que dormía. El león se enojó y lo atrapó.', en: 'A mouse woke a sleeping lion. The lion got angry and caught him.', imagen: '🦁', vocabulario: [{ es: 'león', en: 'lion' }, { es: 'ratón', en: 'mouse' }, { es: 'dormía', en: 'slept' }] },
        { es: '— Perdoname, un día te ayudaré — dijo el ratón. El león se rió y lo dejó ir.', en: '“Forgive me, one day I will help you,” said the mouse. The lion laughed and let him go.', imagen: '🐭', vocabulario: [{ es: 'perdón', en: 'forgive' }, { es: 'ayudaré', en: 'I will help' }, { es: 'rió', en: 'laughed' }] },
        { es: 'Tiempo después, el león quedó atrapado en una red de cazadores.', en: 'Some time later, the lion got trapped in a hunter\'s net.', imagen: '🕸️', vocabulario: [{ es: 'atrapado', en: 'trapped' }, { es: 'red', en: 'net' }, { es: 'cazadores', en: 'hunters' }] },
        { es: 'El ratón royó la red y liberó al león. Los más chicos también pueden ayudar a los más grandes.', en: 'The mouse gnawed the net and freed the lion. Even the small can help the great.', imagen: '❤️', vocabulario: [{ es: 'liberó', en: 'freed' }, { es: 'chicos', en: 'small ones' }] }
      ]
    }
  };

  /* ---------- Estado ---------- */
  var langGuardado = (localStorage.getItem('buggyia.lang') || 'es').slice(0, 2);
  var estado = {
    lang: CODIGOS_VALIDOS[langGuardado] ? langGuardado : 'es',
    tab: 'biblioteca',
    categoria: 'todas',
    busqueda: '',
    catalogo: null,
    contenedor: null
  };

  /* ---------- Textos de la UI (todos los idiomas) ---------- */
  var TXT = {
    es: {
      titulo: 'Cuentos del Mundo', subtitulo: 'Cuentos ilustrados en muchos idiomas',
      buscar: 'Buscar cuento...', todas: 'Todos',
      tabBiblio: 'Biblioteca', tabFav: 'Favoritos', tabProg: 'Progreso',
      paginas: 'páginas', leido: 'Leído',
      vacioFav: 'Aún no tenés favoritos. Tocá el corazón en un cuento.',
      vacioProg: 'Aún no empezaste ningún cuento. ¡Elegí uno!',
      vacioBusq: 'No encontramos cuentos con esa búsqueda.',
      cargando: 'Cargando biblioteca...',
      error: 'No se pudo cargar la biblioteca. Revisá la conexión.',
      reintentar: 'Reintentar', empezar: 'Empezar', continuar: 'Continuar', terminado: 'Terminado',
      idioma: 'Idioma'
    },
    en: {
      titulo: 'Stories of the World', subtitulo: 'Illustrated stories in many languages',
      buscar: 'Search story...', todas: 'All',
      tabBiblio: 'Library', tabFav: 'Favorites', tabProg: 'Progress',
      paginas: 'pages', leido: 'Read',
      vacioFav: 'No favorites yet. Tap the heart on a story.',
      vacioProg: 'No stories started yet. Pick one!',
      vacioBusq: 'No stories match that search.',
      cargando: 'Loading library...',
      error: 'Could not load library. Check connection.',
      reintentar: 'Retry', empezar: 'Start', continuar: 'Continue', terminado: 'Finished',
      idioma: 'Language'
    },
    pt: {
      titulo: 'Histórias do Mundo', subtitulo: 'Histórias ilustradas em muitos idiomas',
      buscar: 'Buscar história...', todas: 'Todos',
      tabBiblio: 'Biblioteca', tabFav: 'Favoritos', tabProg: 'Progresso',
      paginas: 'páginas', leido: 'Lido',
      vacioFav: 'Sem favoritos ainda. Toque no coração de uma história.',
      vacioProg: 'Nenhuma história começada. Escolha uma!',
      vacioBusq: 'Nenhuma história corresponde à busca.',
      cargando: 'Carregando biblioteca...',
      error: 'Não foi possível carregar a biblioteca. Verifique a conexão.',
      reintentar: 'Tentar novamente', empezar: 'Começar', continuar: 'Continuar', terminado: 'Concluído',
      idioma: 'Idioma'
    },
    it: {
      titulo: 'Storie del Mondo', subtitulo: 'Storie illustrate in molte lingue',
      buscar: 'Cerca storia...', todas: 'Tutti',
      tabBiblio: 'Libreria', tabFav: 'Preferiti', tabProg: 'Progresso',
      paginas: 'pagine', leido: 'Letto',
      vacioFav: 'Nessun preferito. Tocca il cuore su una storia.',
      vacioProg: 'Nessuna storia iniziata. Scegline una!',
      vacioBusq: 'Nessuna storia corrisponde alla ricerca.',
      cargando: 'Caricamento libreria...',
      error: 'Impossibile caricare la libreria. Controlla la connessione.',
      reintentar: 'Riprova', empezar: 'Inizia', continuar: 'Continua', terminado: 'Finito',
      idioma: 'Lingua'
    },
    fr: {
      titulo: 'Histoires du Monde', subtitulo: 'Histoires illustrées en plusieurs langues',
      buscar: 'Rechercher une histoire...', todas: 'Tous',
      tabBiblio: 'Bibliothèque', tabFav: 'Favoris', tabProg: 'Progrès',
      paginas: 'pages', leido: 'Lu',
      vacioFav: 'Pas encore de favoris. Touchez le cœur sur une histoire.',
      vacioProg: 'Aucune histoire commencée. Choisissez-en une !',
      vacioBusq: 'Aucune histoire ne correspond à la recherche.',
      cargando: 'Chargement de la bibliothèque...',
      error: 'Impossible de charger la bibliothèque. Vérifiez la connexion.',
      reintentar: 'Réessayer', empezar: 'Commencer', continuar: 'Continuer', terminado: 'Terminé',
      idioma: 'Langue'
    },
    de: {
      titulo: 'Geschichten der Welt', subtitulo: 'Illustrierte Geschichten in vielen Sprachen',
      buscar: 'Geschichte suchen...', todas: 'Alle',
      tabBiblio: 'Bibliothek', tabFav: 'Favoriten', tabProg: 'Fortschritt',
      paginas: 'Seiten', leido: 'Gelesen',
      vacioFav: 'Noch keine Favoriten. Tippe auf das Herz einer Geschichte.',
      vacioProg: 'Noch keine Geschichte begonnen. Such dir eine aus!',
      vacioBusq: 'Keine Geschichte entspricht der Suche.',
      cargando: 'Bibliothek wird geladen...',
      error: 'Bibliothek konnte nicht geladen werden. Verbindung prüfen.',
      reintentar: 'Erneut versuchen', empezar: 'Starten', continuar: 'Weiterlesen', terminado: 'Fertig',
      idioma: 'Sprache'
    }
  };
  function t(k) { return (TXT[estado.lang] || TXT.es)[k] || TXT.es[k]; }

  /* ---------- Persistencia (favoritos + progreso) ---------- */
  var CLAVE = 'buggyia.storybooks';
  function cargarStore() {
    try {
      var raw = localStorage.getItem(CLAVE);
      if (raw) { var o = JSON.parse(raw); return o && typeof o === 'object' ? o : {}; }
    } catch (e) {}
    return { favoritos: [], progreso: {} };
  }
  function guardarStore(s) {
    try { localStorage.setItem(CLAVE, JSON.stringify(s)); } catch (e) {}
  }
  var store = cargarStore();
  if (!Array.isArray(store.favoritos)) store.favoritos = [];
  if (!store.progreso || typeof store.progreso !== 'object') store.progreso = {};

  function esFavorito(id) { return store.favoritos.indexOf(id) >= 0; }
  function toggleFavorito(id) {
    var i = store.favoritos.indexOf(id);
    if (i >= 0) store.favoritos.splice(i, 1); else store.favoritos.push(id);
    guardarStore(store);
    return esFavorito(id);
  }
  function getProgreso(id) { return store.progreso[id] || { pagina: 0, terminado: false }; }
  function setProgreso(id, pagina, terminado) {
    var p = store.progreso[id] || { pagina: 0, terminado: false };
    p.pagina = Math.max(p.pagina || 0, pagina || 0);
    if (terminado) p.terminado = true;
    p.fecha = new Date().toISOString();
    store.progreso[id] = p;
    guardarStore(store);
  }

  /* ---------- Normalización (a prueba de JSON roto) ----------
     Si el catalogo.json viene mal formado, no revienta el render. */
  function normalizarCatalogo(cat) {
    if (!cat || typeof cat !== 'object') cat = {};
    if (!Array.isArray(cat.idiomas)) cat.idiomas = CATALOGO_EMBEBIDO.idiomas.slice();
    if (!Array.isArray(cat.categorias)) cat.categorias = CATALOGO_EMBEBIDO.categorias.slice();
    if (!Array.isArray(cat.cuentos)) cat.cuentos = CATALOGO_EMBEBIDO.cuentos.slice();
    return cat;
  }

  /* ---------- Carga diferida del catálogo (JSON) ---------- */
  function cargarCatalogo() {
    if (estado.catalogo) return Promise.resolve(estado.catalogo);
    return fetch(RUTA_BASE + 'catalogo.json')
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .then(function (cat) { estado.catalogo = normalizarCatalogo(cat); return estado.catalogo; })
      .catch(function () { estado.catalogo = normalizarCatalogo(CATALOGO_EMBEBIDO); return estado.catalogo; });
  }
  function cargarCuento(meta) {
    return fetch(RUTA_BASE + meta.archivo)
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .catch(function () {
        if (CUENTOS_EMBEBIDOS[meta.id]) return CUENTOS_EMBEBIDOS[meta.id];
        var placeholder = {};
        IDIOMAS.forEach(function (i) { placeholder[i.codigo] = (i.codigo === 'es') ? 'Este cuento se está preparando.' : 'This story is coming soon.'; });
        return { id: meta.id, titulo: meta.titulo, paginas: [Object.assign(placeholder, { imagen: '📖', vocabulario: [] })] };
      });
  }

  /* ---------- Audio (reutiliza voz.js si existe) ----------
     Ahora usa el código de voz del idioma seleccionado. */
  function hablar(texto, lang, onend) {
    try {
      var vozLang = codigoVoz(lang || estado.lang);
      if (EK.Voz && typeof EK.Voz.hablar === 'function') {
        EK.Voz.hablar(texto, vozLang, 0.9, 1.1);
        if (onend) {
          var ms = Math.min(15000, Math.max(2500, String(texto).length * 110));
          setTimeout(onend, ms);
        }
        return true;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(texto);
        u.lang = vozLang;
        u.rate = 0.9; u.pitch = 1.1;
        if (onend) u.onend = onend;
        window.speechSynthesis.speak(u);
        return true;
      }
    } catch (e) {}
    return false;
  }
  function detenerAudio() {
    try { if (EK.Voz && EK.Voz.callar) EK.Voz.callar(); } catch (e) {}
    try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
  }

  /* ---------- Toast ---------- */
  function toast(msg) {
    var el = document.createElement('div');
    el.className = 'sb-toast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 2200);
  }

  /* ---------- CSS inyectado (selector de idioma + menú) ---------- */
  var _cssInyectado = false;
  function inyectarCSS() {
    if (_cssInyectado) return;
    _cssInyectado = true;
    var s = document.createElement('style');
    s.textContent =
      '.sb-lang-wrap{position:relative;}' +
      '.sb-lang-btn{height:44px;border-radius:22px;padding:0 14px;border:none;background:#fff;font-weight:700;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.15);font-size:14px;display:flex;align-items:center;gap:6px;}' +
      '.sb-lang-menu{position:absolute;top:52px;right:0;background:#fff;border-radius:14px;padding:8px;box-shadow:0 8px 24px rgba(0,0,0,.2);z-index:50;display:grid;grid-template-columns:1fr 1fr;gap:4px;min-width:170px;}' +
      '.sb-lang-option{display:flex;align-items:center;gap:8px;padding:8px 10px;border:none;background:transparent;border-radius:10px;cursor:pointer;font-size:14px;text-align:left;width:100%;}' +
      '.sb-lang-option:hover{background:#f0f0f0;}' +
      '.sb-lang-option.active{background:#FF9F4333;font-weight:700;}';
    document.head.appendChild(s);
  }

  /* ---------- Helpers render ---------- */
  function escapar(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function esImagenURL(v) {
    if (!v || typeof v !== 'string') return false;
    return /^https?:\/\//i.test(v) || /\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(v);
  }
  function portadaHTML(v) {
    if (esImagenURL(v)) {
      return '<img src="' + escapar(v) + '" alt="" style="width:100%;height:100%;object-fit:cover;display:block;">';
    }
    return escapar(v || '📖');
  }
  // Texto de un objeto multidioma: { es:"...", en:"...", ... }
  function txtMulti(obj) {
    if (!obj || typeof obj !== 'object') return String(obj || '');
    return obj[estado.lang] || obj.es || obj.en || Object.values(obj)[0] || '';
  }

  function filtrarCuentos(cat) {
    var q = estado.busqueda.trim().toLowerCase();
    return (cat.cuentos || []).filter(function (c) {
      if (estado.categoria !== 'todas' && c.categoria !== estado.categoria) return false;
      if (estado.tab === 'favoritos' && !esFavorito(c.id)) return false;
      if (estado.tab === 'progreso') {
        var p = getProgreso(c.id);
        if (!(p.pagina > 0 || p.terminado)) return false;
      }
      if (q) {
        // Busca en TODOS los idiomas del título + id
        var hit = (c.id || '').toLowerCase().indexOf(q) >= 0;
        if (!hit && c.titulo && typeof c.titulo === 'object') {
          hit = Object.keys(c.titulo).some(function (k) {
            return String(c.titulo[k] || '').toLowerCase().indexOf(q) >= 0;
          });
        }
        if (!hit) return false;
      }
      return true;
    });
  }

  /* ---------- Render: biblioteca ---------- */
  var _cerrarMenuHandler = null;
  function limpiarMenuLang() {
    if (_cerrarMenuHandler) {
      try { document.removeEventListener('click', _cerrarMenuHandler); } catch (e) {}
      _cerrarMenuHandler = null;
    }
  }

  function renderBiblioteca() {
    limpiarMenuLang();
    inyectarCSS();
    var cont = estado.contenedor;
    var cat = estado.catalogo;
    var txt = t;
    var cats = cat.categorias || [];
    var cuentos = filtrarCuentos(cat);
    var idiomaActual = idiomaObj(estado.lang);

    // Chips de categorías
    var chips = '<div class="sb-chips">';
    chips += '<button class="sb-chip' + (estado.categoria === 'todas' ? ' active' : '') + '" data-cat="todas">📖 ' + escapar(txt('todas')) + '</button>';
    cats.forEach(function (c) {
      var activo = estado.categoria === c.id ? ' active' : '';
      chips += '<button class="sb-chip' + activo + '" data-cat="' + escapar(c.id) + '">' +
               escapar(c.icono || '📁') + ' ' + escapar(txtMulti(c.nombre)) + '</button>';
    });
    chips += '</div>';

    // Selector de idioma (botón + menú desplegable con todos los idiomas)
    var opciones = '';
    IDIOMAS.forEach(function (i) {
      opciones += '<button class="sb-lang-option' + (i.codigo === estado.lang ? ' active' : '') + '" data-lang="' + i.codigo + '">' +
                  '<span>' + i.bandera + '</span><span>' + escapar(i.nombre) + '</span></button>';
    });
    var selectorLang =
      '<div class="sb-lang-wrap">' +
        '<button class="sb-lang-btn" data-sb-lang-menu title="' + escapar(txt('idioma')) + '">' +
          idiomaActual.bandera + ' ' + estado.lang.toUpperCase() + ' ▾' +
        '</button>' +
        '<div class="sb-lang-menu" hidden>' + opciones + '</div>' +
      '</div>';

    // Grid de cuentos
    var grid = '';
    if (!cuentos.length) {
      var msj = estado.tab === 'favoritos' ? txt('vacioFav') : (estado.tab === 'progreso' ? txt('vacioProg') : txt('vacioBusq'));
      grid = '<div class="sb-empty"><span class="big">🔍</span>' + escapar(msj) + '</div>';
    } else {
      grid = '<div class="sb-grid">';
      cuentos.forEach(function (c) {
        var prog = getProgreso(c.id);
        var porcentaje = c.paginas ? Math.min(100, Math.round((prog.pagina / c.paginas) * 100)) : 0;
        if (prog.terminado) porcentaje = 100;
        var catMeta = cats.filter(function (x) { return x.id === c.categoria; })[0] || {};
        var catNombre = catMeta.nombre ? txtMulti(catMeta.nombre) : c.categoria;
        var btnLabel = prog.terminado ? '↻ ' + escapar(txt('leido')) : (prog.pagina > 0 ? '▶ ' + escapar(txt('continuar')) : '▶ ' + escapar(txt('empezar')));
        grid += '<div class="sb-book-card" data-cuento="' + escapar(c.id) + '">' +
          '<button class="sb-fav-btn" data-fav="' + escapar(c.id) + '" aria-label="favorito">' + (esFavorito(c.id) ? '❤️' : '🤍') + '</button>' +
          '<div class="sb-book-cover" style="background:' + escapar(c.color || '#FF9F43') + '22;">' + portadaHTML(c.portada) + '</div>' +
          '<div class="sb-book-info">' +
            '<h4 class="sb-book-title">' + escapar(txtMulti(c.titulo)) + '</h4>' +
            '<div class="sb-book-meta">' +
              '<span class="sb-badge" style="background:' + escapar(c.color || '#FF9F43') + ';">' + escapar(catNombre) + '</span>' +
              '<span>📄 ' + c.paginas + ' ' + escapar(txt('paginas')) + '</span>' +
            '</div>' +
            '<div class="sb-progress-bar"><div class="sb-progress-fill" style="width:' + porcentaje + '%"></div></div>' +
          '</div>' +
        '</div>';
      });
      grid += '</div>';
    }

    cont.innerHTML =
      '<div class="sb-root">' +
        '<div class="sb-header">' +
          '<button class="sb-btn-back" data-sb-volver title="volver">←</button>' +
          '<div><h2 class="sb-title">🌍 ' + escapar(txt('titulo')) + '</h2>' +
          '<p class="sb-subtitle">' + escapar(txt('subtitulo')) + '</p></div>' +
          selectorLang +
        '</div>' +
        '<div class="sb-tabs">' +
          '<button class="sb-tab' + (estado.tab === 'biblioteca' ? ' active' : '') + '" data-tab="biblioteca">📖 ' + escapar(txt('tabBiblio')) + '</button>' +
          '<button class="sb-tab' + (estado.tab === 'favoritos' ? ' active' : '') + '" data-tab="favoritos">❤️ ' + escapar(txt('tabFav')) + '</button>' +
          '<button class="sb-tab' + (estado.tab === 'progreso' ? ' active' : '') + '" data-tab="progreso">📊 ' + escapar(txt('tabProg')) + '</button>' +
        '</div>' +
        '<div class="sb-search-wrap"><span class="sb-search-icon">🔍</span>' +
          '<input class="sb-search" type="search" placeholder="' + escapar(txt('buscar')) + '" value="' + escapar(estado.busqueda) + '">' +
        '</div>' +
        chips +
        grid +
      '</div>';

    // --- Eventos ---
    cont.querySelector('[data-sb-volver]').addEventListener('click', function () {
      detenerAudio();
      if (typeof EK.Storybooks.onVolver === 'function') EK.Storybooks.onVolver(cont);
      else if (typeof window.sbVolver === 'function') window.sbVolver(cont);
      else { cont.innerHTML = ''; toast('←'); }
    });

    // Selector de idioma (menú desplegable)
    var btnLang = cont.querySelector('[data-sb-lang-menu]');
    var menuLang = cont.querySelector('.sb-lang-menu');
    if (btnLang && menuLang) {
      _cerrarMenuHandler = function (e) {
        if (!menuLang.contains(e.target) && e.target !== btnLang) {
          menuLang.hidden = true;
          limpiarMenuLang();
        }
      };
      btnLang.addEventListener('click', function (e) {
        e.stopPropagation();
        if (menuLang.hidden) {
          menuLang.hidden = false;
          document.addEventListener('click', _cerrarMenuHandler);
        } else {
          menuLang.hidden = true;
          limpiarMenuLang();
        }
      });
      menuLang.addEventListener('click', function (e) { e.stopPropagation(); });
      cont.querySelectorAll('.sb-lang-option').forEach(function (b) {
        b.addEventListener('click', function () {
          var l = b.getAttribute('data-lang');
          if (CODIGOS_VALIDOS[l]) {
            estado.lang = l;
            localStorage.setItem('buggyia.lang', l);
          }
          renderBiblioteca();
        });
      });
    }

    cont.querySelectorAll('.sb-tab').forEach(function (b) {
      b.addEventListener('click', function () { estado.tab = b.getAttribute('data-tab'); renderBiblioteca(); });
    });
    cont.querySelectorAll('.sb-chip').forEach(function (b) {
      b.addEventListener('click', function () { estado.categoria = b.getAttribute('data-cat'); renderBiblioteca(); });
    });
    var inp = cont.querySelector('.sb-search');
    inp.addEventListener('input', function () {
      estado.busqueda = inp.value;
      var pos = inp.selectionStart;
      renderBiblioteca();
      var ni = estado.contenedor.querySelector('.sb-search');
      if (ni) { ni.focus(); try { ni.setSelectionRange(pos, pos); } catch (e) {} }
    });
    cont.querySelectorAll('.sb-fav-btn').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var id = b.getAttribute('data-fav');
        var ahora = toggleFavorito(id);
        b.textContent = ahora ? '❤️' : '🤍';
        toast(ahora ? '⭐ ¡Agregado a favoritos!' : '💔 Quitado de favoritos');
        if (estado.tab === 'favoritos') setTimeout(renderBiblioteca, 300);
      });
    });
    cont.querySelectorAll('.sb-book-card').forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('.sb-fav-btn')) return;
        var id = card.getAttribute('data-cuento');
        abrirCuento(id);
      });
    });
  }

  function renderCargando(msg) {
    estado.contenedor.innerHTML = '<div class="sb-root"><div class="sb-loader">' +
      '<div class="sb-spinner"></div>' + escapar(msg || t('cargando')) + '</div></div>';
  }
  function renderError() {
    estado.contenedor.innerHTML = '<div class="sb-root"><div class="sb-empty">' +
      '<span class="big">📡</span>' + escapar(t('error')) +
      '<div style="margin-top:16px;"><button class="sb-action-btn primary" data-sb-retry>' + escapar(t('reintentar')) + '</button></div>' +
      '</div></div>';
    var b = estado.contenedor.querySelector('[data-sb-retry]');
    if (b) b.addEventListener('click', function () { abrir(estado.contenedor); });
  }

  /* ---------- Abrir un cuento (delega en el lector) ---------- */
  function abrirCuento(id) {
    var cat = estado.catalogo;
    var meta = (cat.cuentos || []).filter(function (c) { return c.id === id; })[0];
    if (!meta) { toast('❌ Cuento no encontrado'); return; }
    renderCargando('📖 ' + escapar(txtMulti(meta.titulo)));
    detenerAudio();
    cargarCuento(meta).then(function (cuento) {
      if (EK.StorybooksReader && typeof EK.StorybooksReader.abrir === 'function') {
        EK.StorybooksReader.abrir(cuento, meta, estado.contenedor, {
          lang: estado.lang,
          idiomas: IDIOMAS,
          codigoVoz: codigoVoz,
          txtMulti: txtMulti,
          setProgreso: setProgreso,
          getProgreso: getProgreso,
          hablar: hablar,
          detenerAudio: detenerAudio,
          toast: toast,
          onCerrar: function () { renderBiblioteca(); },
          onTerminado: function () { setProgreso(cuento.id, (cuento.paginas || []).length, true); }
        });
      } else {
        estado.contenedor.innerHTML = '<div class="sb-root"><div class="sb-empty"><span class="big">⚠️</span>Falta cargar storybooks-reader.js</div></div>';
      }
    }).catch(function () { renderError(); });
  }

  /* ---------- API pública ---------- */
  function abrir(contenedor) {
    if (!contenedor) contenedor = document.getElementById('app') || document.getElementById('main') || document.querySelector('main') || document.body;
    estado.contenedor = contenedor;
    renderCargando();
    cargarCatalogo().then(function () {
      try { renderBiblioteca(); }
      catch (e) {
        // Si el render falla por un JSON roto, forzamos el catálogo embebido
        try {
          estado.catalogo = normalizarCatalogo(CATALOGO_EMBEBIDO);
          renderBiblioteca();
        } catch (e2) { renderError(); }
      }
    }).catch(renderError);
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-mundo="storybooks"], [data-id="storybooks"], [data-world="storybooks"], [data-sb-abrir]');
    if (el) {
      e.preventDefault(); e.stopPropagation();
      abrir();
    }
  }, true);

  EK.Storybooks = {
    MUNDO: MUNDO_STORYBOOKS,
    abrir: abrir,
    abrirCuento: abrirCuento,
    cargarCatalogo: cargarCatalogo,
    cargarCuento: cargarCuento,
    esFavorito: esFavorito,
    toggleFavorito: toggleFavorito,
    getProgreso: getProgreso,
    setProgreso: setProgreso,
    hablar: hablar,
    detenerAudio: detenerAudio,
    setLang: function (l) { if (CODIGOS_VALIDOS[l]) { estado.lang = l; localStorage.setItem('buggyia.lang', l); } },
    getLang: function () { return estado.lang; },
    getIdiomas: function () { return IDIOMAS.slice(); },
    idiomaActual: function () { return idiomaObj(estado.lang); },
    codigoVoz: codigoVoz,
    txtMulti: txtMulti,
    onVolver: null,
    RUTA_BASE: RUTA_BASE,
    _estado: estado
  };
})();
