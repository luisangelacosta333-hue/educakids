/* ============================================================
   store.js — Guardado, puntos, niveles, medallas, racha y tiempo
   Toda la persistencia usa localStorage. Un solo lugar de verdad.
   AMPLIADO v2: racha, tiempo de uso, desafío diario, rueda,
   anti-farm (bonus solo la primera vez), mundo completado +100.
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'educakids_v2';
  var MUNDOS_IDS = ['matematicas', 'ciencia', 'idiomas', 'dinero', 'verde', 'juegos', 'creatividad', 'geografia', 'lengua', 'sociales'];
  var NIVELES_POR_MUNDO = 10; // ampliado de 5 a 10

  function hoyStr() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function ayerStr() {
    var d = new Date(); d.setDate(d.getDate() - 1);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function estadoDefault() {
    var mundos = {};
    MUNDOS_IDS.forEach(function (id) { mundos[id] = { nivel: 1 }; });
    return {
      nombre: 'Explorador',
      avatar: 0,
      estrellas: 0,
      correctas: 0,
      actividades: 0,
      juegosGanados: 0,
      dibujos: 0,
      medallas: [],
      mundos: mundos,
      nivelesCompletados: {},   // "mundo:nivel" → true (anti-farm)
      mundosCompletados: [],    // ids de mundos terminados
      racha: 0,                 // días consecutivos
      ultimoDia: '',            // YYYY-MM-DD
      tiempoHoy: 0,             // segundos de hoy
      tiempoTotal: 0,           // segundos totales
      tiempoDia: '',            // día al que corresponde tiempoHoy
      desafioDia: '',           // día en que se completó el desafío
      ruedaDia: '',             // día en que se usó la rueda
      idiomasCompletados: []    // lecciones de idiomas completadas (id idioma)
    };
  }

  function cargar() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return estadoDefault();
      var parsed = JSON.parse(raw);
      var def = estadoDefault();
      var merged = Object.assign({}, def, parsed);
      merged.mundos = Object.assign({}, def.mundos, parsed.mundos || {});
      merged.nivelesCompletados = parsed.nivelesCompletados || {};
      merged.mundosCompletados = parsed.mundosCompletados || [];
      merged.idiomasCompletados = parsed.idiomasCompletados || [];
      return merged;
    } catch (e) { return estadoDefault(); }
  }

  var estado = cargar();

  function guardar() {
    try { localStorage.setItem(KEY, JSON.stringify(estado)); } catch (e) {}
  }

  /* ---------- catálogo de medallas (ampliado) ---------- */
  var MEDALLAS = [
    { id: 'primera',   nombre: 'Primer paso',            emoji: '🏅', desc: 'Completaste tu primera actividad' },
    { id: 'diez',      nombre: '10 Aciertos',            emoji: '⭐', desc: '10 respuestas correctas' },
    { id: 'cincuenta', nombre: '50 Aciertos',            emoji: '🌟', desc: '50 respuestas correctas' },
    { id: 'cien',      nombre: '100 Aciertos',           emoji: '💫', desc: '100 respuestas correctas' },
    { id: 'mundo1',    nombre: 'Primer mundo',           emoji: '🌍', desc: 'Completaste un mundo entero' },
    { id: 'mates',     nombre: 'Maestro de Matemáticas', emoji: '🧮', desc: 'Llegaste al nivel 5 de Matemáticas' },
    { id: 'ciencia',   nombre: 'Explorador Científico',  emoji: '🔬', desc: 'Llegaste al nivel 5 de Ciencia' },
    { id: 'idiomas',   nombre: 'Experto en Idiomas',     emoji: '🌎', desc: 'Completaste una lección de un idioma' },
    { id: 'poliglota', nombre: 'Políglota',              emoji: '🗣️', desc: 'Completaste lecciones de los 3 idiomas' },
    { id: 'planeta',   nombre: 'Amigo del Planeta',      emoji: '🌍', desc: 'Llegaste al nivel 5 de Mundo Verde' },
    { id: 'ahorrador', nombre: 'Gran Ahorrador',         emoji: '💰', desc: 'Llegaste al nivel 5 de Dinero' },
    { id: 'juegos',    nombre: 'Maestro de los Juegos',  emoji: '🎮', desc: 'Ganaste 10 minijuegos' },
    { id: 'artista',   nombre: 'Artista Creativo',       emoji: '🎨', desc: 'Creaste tu primer dibujo' },
    { id: 'racha3',    nombre: 'Constante',              emoji: '🔥', desc: 'Racha de 3 días aprendiendo' },
    { id: 'racha7',    nombre: 'Impresionante',          emoji: '🚀', desc: 'Racha de 7 días aprendiendo' },
    { id: 'desafio',   nombre: 'Desafío diario',         emoji: '🎯', desc: 'Completaste el desafío del día' }
  ];

  function revisarMedallas() {
    var nuevas = [];
    var tiene = function (id) { return estado.medallas.indexOf(id) !== -1; };
    var dar = function (id) {
      if (!tiene(id)) {
        estado.medallas.push(id);
        var m = MEDALLAS.find(function (x) { return x.id === id; });
        if (m) nuevas.push(m);
      }
    };
    if (estado.actividades >= 1) dar('primera');
    if (estado.correctas >= 10) dar('diez');
    if (estado.correctas >= 50) dar('cincuenta');
    if (estado.correctas >= 100) dar('cien');
    if (estado.mundosCompletados.length >= 1) dar('mundo1');
    if (estado.mundos.matematicas && estado.mundos.matematicas.nivel >= 5) dar('mates');
    if (estado.mundos.ciencia && estado.mundos.ciencia.nivel >= 5) dar('ciencia');
    if (estado.mundos.verde && estado.mundos.verde.nivel >= 5) dar('planeta');
    if (estado.mundos.dinero && estado.mundos.dinero.nivel >= 5) dar('ahorrador');
    if (estado.juegosGanados >= 10) dar('juegos');
    if (estado.dibujos >= 1) dar('artista');
    if (estado.racha >= 3) dar('racha3');
    if (estado.racha >= 7) dar('racha7');
    if (estado.idiomasCompletados.length >= 1) dar('idiomas');
    if (estado.idiomasCompletados.length >= 3) dar('poliglota');
    if (estado.desafioDia === hoyStr()) dar('desafio');
    if (nuevas.length) guardar();
    return nuevas;
  }

  var Store = {
    MUNDOS_IDS: MUNDOS_IDS,
    NIVELES_POR_MUNDO: NIVELES_POR_MUNDO,
    MEDALLAS: MEDALLAS,
    hoyStr: hoyStr,
    get estado() { return estado; },
    setNombre: function (n) { estado.nombre = (n || 'Explorador').trim().slice(0, 20) || 'Explorador'; guardar(); },
    setAvatar: function (i) { estado.avatar = i; guardar(); },
    addEstrellas: function (n) { estado.estrellas += n; guardar(); return estado.estrellas; },
    addCorrecta: function () { estado.correctas += 1; guardar(); },
    addActividad: function () { estado.actividades += 1; guardar(); },
    addJuegoGanado: function () { estado.juegosGanados += 1; guardar(); },
    addDibujo: function () { estado.dibujos += 1; guardar(); },
    nivel: function (mundoId) { return (estado.mundos[mundoId] && estado.mundos[mundoId].nivel) || 1; },
    desbloquearSiguiente: function (mundoId) {
      var m = estado.mundos[mundoId];
      if (!m) return false;
      if (m.nivel < NIVELES_POR_MUNDO) { m.nivel += 1; guardar(); return true; }
      return false;
    },
    /* Anti-farm: devuelve true si es la PRIMERA vez que se completa este nivel */
    esNivelCompletado: function (mundoId, nivel) { return !!estado.nivelesCompletados[mundoId + ':' + nivel]; },
    marcarNivelCompletado: function (mundoId, nivel) {
      var k = mundoId + ':' + nivel;
      if (estado.nivelesCompletados[k]) return false;
      estado.nivelesCompletados[k] = true;
      guardar();
      return true;
    },
    /* ¿Completó todos los niveles de un mundo? */
    mundoCompleto: function (mundoId) {
      for (var n = 1; n <= NIVELES_POR_MUNDO; n++) {
        if (!estado.nivelesCompletados[mundoId + ':' + n]) return false;
      }
      if (estado.mundosCompletados.indexOf(mundoId) === -1) {
        estado.mundosCompletados.push(mundoId);
        guardar();
        return true; // recién completado
      }
      return false;
    },
    marcarIdiomaCompletado: function (idiomaId) {
      if (estado.idiomasCompletados.indexOf(idiomaId) === -1) {
        estado.idiomasCompletados.push(idiomaId); guardar();
      }
    },
    progresoMundo: function (mundoId) {
      var n = this.nivel(mundoId);
      return Math.min(100, Math.round(((n - 1) / (NIVELES_POR_MUNDO - 1)) * 100));
    },
    nivelGeneral: function () { return Math.floor(estado.estrellas / 100) + 1; },

    /* ---------- RACHA ---------- */
    registrarDia: function () {
      var hoy = hoyStr();
      if (estado.ultimoDia === hoy) return;
      if (estado.ultimoDia === ayerStr()) estado.racha += 1;
      else estado.racha = 1; // nuevo comienzo
      estado.ultimoDia = hoy;
      guardar();
    },
    get racha() { return estado.racha; },

    /* ---------- TIEMPO DE USO ---------- */
    addTiempo: function (seg) {
      var hoy = hoyStr();
      if (estado.tiempoDia !== hoy) { estado.tiempoHoy = 0; estado.tiempoDia = hoy; }
      estado.tiempoHoy += seg; estado.tiempoTotal += seg; guardar();
    },
    tiempoHoyMin: function () { return Math.round(estado.tiempoHoy / 60); },
    tiempoTotalMin: function () { return Math.round(estado.tiempoTotal / 60); },

    /* ---------- DESAFÍO DIARIO ---------- */
    desafioDisponible: function () { return estado.desafioDia !== hoyStr(); },
    marcarDesafio: function () { estado.desafioDia = hoyStr(); guardar(); },

    /* ---------- RUEDA DE PREMIOS ---------- */
    ruedaDisponible: function () { return estado.ruedaDia !== hoyStr(); },
    marcarRueda: function () { estado.ruedaDia = hoyStr(); guardar(); },

    revisarMedallas: revisarMedallas,
    reset: function () { estado = estadoDefault(); guardar(); }
  };

  window.EK = window.EK || {};
  window.EK.Store = Store;
})();
