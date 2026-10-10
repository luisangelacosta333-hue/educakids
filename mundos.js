/* ============================================================
   mundos.js — Datos de los mundos educativos (VERSIÓN 3.0 MEGA ULTRA PREMIUM)
   + CONTENIDO X2: más de 30 mundos, 20 niveles por materia, cientos de preguntas
   + Niveles educativos: INICIAL (3-5) / PRIMARIO (6-12) / SECUNDARIO (13-17)
   + Sistema SUPERPREMIO: XP, monedas, gemas, tienda, mascotas, stickers,
     fondos, avatares, logros, misiones diarias/semanales, rachas con
     multiplicador, cofres misteriosos, ruleta diaria, combos, torneos
     semanales, certificados/diplomas, ranking y estrellas por nivel (1-3)
   + Nuevos tipos de pregunta: V/F, emparejar, ordenar, completar hueco,
     audio nativo, memoria, sopa de letras, ahorcado, quiz relámpago
   + Modos de juego: Historia, Supervivencia, Relámpago (contra reloj),
     Duelo 2 jugadores, Desafío diario, Modo sin errores
   + Idiomas ULTRA (5): Inglés, Portugués, Francés, Italiano y Alemán
     (150+ palabras + saludos + frases avanzadas de restaurante/escuela/viaje)
   + Todos los bancos completos: Ciencia (10 categorías), Geografía, Lengua,
     Sociales, IA, Programación, Robótica, Música, Historia, Lógica,
     Emociones, Deportes, Salud, Arte, Mitología, Profesiones, Cocina,
     Astronomía, Ajedrez, Seguridad Vial, Primeros Auxilios, ODS/Derechos,
     Filosofía para niños, Danza, Cine, Arquitectura, Huerta, Energías
   + Eventos temáticos: Día del Niño, Navidad, Halloween, Verano, Invierno
   ============================================================ */
(function () {
  'use strict';

  var rand = function (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };
  var elegir = function (arr) { return arr[rand(0, arr.length - 1)]; };
  var barajar = (typeof EK !== 'undefined' && EK.Engine && EK.Engine.barajar) ? EK.Engine.barajar : function (arr) {
    var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = rand(0, i); var t = a[i]; a[i] = a[j]; a[j] = t; } return a;
  };

  /* ---------- Helpers de preguntas (compatibilidad total + nuevos tipos) ---------- */
  function opcionesNumericas(correcta) {
    var paso = correcta > 500 ? 100 : correcta > 200 ? 50 : correcta > 50 ? 10 : correcta > 10 ? 2 : 1;
    var set = {}; set[correcta] = true;
    var intentos = 0;
    while (Object.keys(set).length < 4 && intentos < 80) {
      intentos++;
      var delta = rand(1, 4) * paso * (Math.random() < 0.5 ? -1 : 1);
      var cand = correcta + delta;
      if (cand >= 0) set[cand] = true;
    }
    return barajar(Object.keys(set).map(Number));
  }
  // Pregunta numérica (opciones auto-generadas) — 4 opciones
  function q(p, c, opts, emoji) { return { pregunta: p, opciones: opts || opcionesNumericas(c), correcta: String(c), emojiPregunta: emoji || '❓' }; }
  // Pregunta con opciones fijas (texto)
  function qf(p, c, opts) { return { pregunta: p, opciones: barajar(opts.map(String)), correcta: String(c), emojiPregunta: '❓' }; }
  function qc(p, c, opts) { return { pregunta: p, opciones: barajar(opts.map(String)), correcta: String(c), emojiPregunta: '❓' }; }
  // Verdadero / Falso
  function qv(p, esVerdadero, emoji) { return { pregunta: p, opciones: ['Verdadero', 'Falso'], correcta: esVerdadero ? 'Verdadero' : 'Falso', tipo: 'vf', emojiPregunta: emoji || '🤔' }; }
  // Completar hueco
  function qh(p, c, opts, emoji) { return { pregunta: p, opciones: barajar(opts.map(String)), correcta: String(c), tipo: 'hueco', emojiPregunta: emoji || '✏️' }; }
  // Ordenar secuencia
  function qo(p, secuencia, emoji) { return { pregunta: p, opciones: barajar(secuencia.map(String)), correcta: secuencia.map(String).join('|'), tipo: 'ordenar', emojiPregunta: emoji || '🔢' }; }
  // Emparejar (pares)
  function qemp(p, pares, emoji) { return { pregunta: p, pares: pares, tipo: 'emparejar', emojiPregunta: emoji || '🔗' }; }
  // Audio nativo
  function qa(p, texto, lang, opts, c, emoji) { return { pregunta: p, audio: { texto: texto, lang: lang }, opciones: barajar(opts.map(String)), correcta: String(c), emojiPregunta: emoji || '🔊' }; }
  // Ahorcado (palabra a adivinar + pista)
  function qah(pista, palabra, emoji) { return { pregunta: pista, palabra: palabra, tipo: 'ahorcado', correcta: palabra, emojiPregunta: emoji || '😵' }; }
  // Memoria (pares de tarjetas)
  function qmem(titulo, pares, emoji) { return { pregunta: titulo, pares: pares, tipo: 'memoria', emojiPregunta: emoji || '🃏' }; }
  // Sopa de letras (palabras a encontrar)
  function qsopa(titulo, palabras, tamano, emoji) { return { pregunta: titulo, palabras: palabras, tamano: tamano || 8, tipo: 'sopa', emojiPregunta: emoji || '🔤' }; }
  // Transformar banco {p,c,opts} en preguntas qf
  function banco(items, n) { return barajar(items).slice(0, n || 8).map(function (x) { return qf(x.p, x.c, x.opts); }); }

  /* ============================================================
     NIVELES EDUCATIVOS (INICIAL / PRIMARIO / SECUNDARIO)
     ============================================================ */
  var NIVELES_EDAD = {
    inicial:    { rango: '3 a 5 años',  grados: 'Sala de 3, 4 y 5',     mundos: ['creatividad','emociones','profesiones','idiomas','matematicas','juegos','cocina','musica','salud'] },
    primario:   { rango: '6 a 12 años', grados: '1° a 7° grado',        mundos: ['matematicas','lengua','ciencia','geografia','sociales','dinero','verde','idiomas','historia','deportes','arte','mitologia','logica','programacion','robotica','musica','cocina','salud','juegos'] },
    secundario: { rango: '13 a 17 años',grados: 'Ciclo básico y orientado', mundos: ['matematicas','lengua','ciencia','geografia','sociales','historia','ia','programacion','robotica','filosofia','dinero','logica','arte','astronomia','ods','seguridad','primerosauxilios','idiomas'] }
  };

  /* ============================================================
     MUNDOS — 30+ mundos (más del doble que la versión original)
     ============================================================ */
  var MUNDOS = [
    { id: 'idiomas',      nombre: 'Idiomas',        emoji: '🌎', color: '#4ECDC4', tipo: 'idiomas',      nivel: 'todos',      desc: 'Inglés, Portugués, Francés, Italiano y Alemán' },
    { id: 'matematicas',  nombre: 'Matemáticas',    emoji: '🔢', color: '#FF9F43', tipo: 'niveles',      nivel: 'todos',      desc: 'Contar, sumar, fracciones, ecuaciones y más' },
    { id: 'ciencia',      nombre: 'Ciencia',        emoji: '🔬', color: '#A55EEA', tipo: 'categorias',   nivel: 'todos',      desc: 'Animales, espacio, cuerpo, química, física' },
    { id: 'juegos',       nombre: 'Juegos',         emoji: '🎮', color: '#EE5A6F', tipo: 'juegos',       nivel: 'todos',      desc: 'Memoria, laberinto, puzzles y retos' },
    { id: 'creatividad',  nombre: 'Creatividad',    emoji: '🎨', color: '#F368E0', tipo: 'creatividad',  nivel: 'inicial',    desc: 'Dibujar, formas y crear' },
    { id: 'dinero',       nombre: 'Dinero',         emoji: '💰', color: '#2ECC71', tipo: 'niveles',      nivel: 'todos',      desc: 'Ahorrar, comprar, presupuesto e inversión' },
    { id: 'verde',        nombre: 'Mundo Verde',    emoji: '🌱', color: '#6BCB77', tipo: 'niveles',      nivel: 'todos',      desc: 'Reciclaje, ecología y cuidado del planeta' },
    { id: 'geografia',    nombre: 'Geografía',      emoji: '🗺️', color: '#4D96FF', tipo: 'categorias',   nivel: 'primario',   desc: 'Argentina, América y el mundo' },
    { id: 'lengua',       nombre: 'Lengua',         emoji: '📖', color: '#FF6B9D', tipo: 'categorias',   nivel: 'todos',      desc: 'Letras, sílabas, oraciones, gramática' },
    { id: 'sociales',     nombre: 'Sociales',       emoji: '🏛️', color: '#845EC2', tipo: 'categorias',   nivel: 'primario',   desc: 'Comunidad, derechos y cultura argentina' },
    { id: 'ia',           nombre: 'IA',             emoji: '🤖', color: '#6C5CE7', tipo: 'escuela',      nivel: 'secundario', desc: 'Inteligencia Artificial y sus usos' },
    { id: 'programacion', nombre: 'Programación',   emoji: '💻', color: '#00B894', tipo: 'escuela',      nivel: 'todos',      desc: 'Programación, algoritmos y videojuegos' },
    { id: 'robotica',     nombre: 'Robótica',       emoji: '⚙️', color: '#E17055', tipo: 'escuela',      nivel: 'todos',      desc: 'Robótica, sensores e inventos' },
    // ---- MUNDOS NUEVOS (SUPER PREMIUM) ----
    { id: 'musica',       nombre: 'Música',         emoji: '🎵', color: '#FF6B6B', tipo: 'categorias',   nivel: 'todos',      desc: 'Notas, instrumentos, ritmos y composición' },
    { id: 'historia',     nombre: 'Historia',       emoji: '📜', color: '#D4A574', tipo: 'categorias',   nivel: 'primario',   desc: 'Prehistoria, Egipto, Edad Media, Argentina' },
    { id: 'logica',       nombre: 'Lógica',         emoji: '🧩', color: '#45B7D1', tipo: 'niveles',      nivel: 'todos',      desc: 'Acertijos, patrones, razonamiento y puzzles' },
    { id: 'emociones',    nombre: 'Emociones',      emoji: '❤️', color: '#FF8FA3', tipo: 'categorias',   nivel: 'inicial',    desc: 'Sentimientos, valores y convivencia' },
    { id: 'deportes',     nombre: 'Deportes',       emoji: '⚽', color: '#51CF66', tipo: 'categorias',   nivel: 'todos',      desc: 'Fútbol, olimpiadas, reglas y salud deportiva' },
    { id: 'salud',        nombre: 'Salud',          emoji: '🩺', color: '#FF8787', tipo: 'categorias',   nivel: 'todos',      desc: 'Cuerpo, alimentación, higiene y primeros auxilios' },
    { id: 'arte',         nombre: 'Arte',           emoji: '🖼️', color: '#DA77F2', tipo: 'categorias',   nivel: 'todos',      desc: 'Pintores, escultura, colores y museos' },
    { id: 'mitologia',    nombre: 'Mitología',      emoji: '🐉', color: '#FFA94D', tipo: 'categorias',   nivel: 'primario',   desc: 'Dioses, héroes y leyendas del mundo' },
    { id: 'profesiones',  nombre: 'Profesiones',    emoji: '👨‍🚀', color: '#74C0FC', tipo: 'categorias',   nivel: 'inicial',    desc: 'Oficios, profesiones y soñar en grande' },
    { id: 'cocina',       nombre: 'Cocina',         emoji: '🍳', color: '#FFD43B', tipo: 'categorias',   nivel: 'todos',      desc: 'Alimentos, recetas y nutrición divertida' },
    // ---- MUNDOS NUEVOS v3.0 (MEGA) ----
    { id: 'astronomia',   nombre: 'Astronomía',     emoji: '🔭', color: '#5C7CFA', tipo: 'categorias',   nivel: 'secundario', desc: 'Estrellas, galaxias, telescopios y cosmología' },
    { id: 'ajedrez',      nombre: 'Ajedrez',        emoji: '♟️', color: '#495057', tipo: 'categorias',   nivel: 'todos',      desc: 'Piezas, movimientos, aperturas y estrategia' },
    { id: 'seguridad',    nombre: 'Seguridad Vial', emoji: '🚦', color: '#FCC419', tipo: 'categorias',   nivel: 'todos',      desc: 'Semáforos, señales y cómo circular seguro' },
    { id: 'primerosauxilios', nombre: 'Primeros Auxilios', emoji: '🚑', color: '#FA5252', tipo: 'categorias', nivel: 'todos',  desc: 'Qué hacer ante una emergencia' },
    { id: 'ods',          nombre: 'ODS y Derechos', emoji: '🌍', color: '#20C997', tipo: 'categorias',   nivel: 'secundario', desc: 'Derechos de niños y Objetivos del Milenio' },
    { id: 'filosofia',    nombre: 'Filosofía',      emoji: '🤔', color: '#9775FA', tipo: 'categorias',   nivel: 'secundario', desc: 'Pensar, preguntar y grandes ideas' },
    { id: 'danza',        nombre: 'Danza',          emoji: '💃', color: '#F783AC', tipo: 'categorias',   nivel: 'todos',      desc: 'Ritmos, estilos y coreografías del mundo' },
    { id: 'cine',         nombre: 'Cine',           emoji: '🎬', color: '#868E96', tipo: 'categorias',   nivel: 'todos',      desc: 'Películas, géneros, animación y rodaje' },
    { id: 'arquitectura', nombre: 'Arquitectura',   emoji: '🏗️', color: '#ADB5BD', tipo: 'categorias',   nivel: 'primario',   desc: 'Edificios, monumentos y cómo se construye' },
    { id: 'huerta',       nombre: 'Huerta',         emoji: '🥕', color: '#94D82D', tipo: 'categorias',   nivel: 'todos',      desc: 'Plantas, semillas, cultivo y alimentos' },
    { id: 'energias',     nombre: 'Energías',       emoji: '⚡', color: '#FFE066', tipo: 'categorias',   nivel: 'secundario', desc: 'Solar, eólica, nuclear y el futuro energético' }
  ];

  /* ============================================================
     MATEMÁTICAS — 20 NIVELES
     Inicial (1-3) | Primario (4-12) | Secundario (13-20)
     ============================================================ */
  var EMO = ['🍎','🍌','⭐','🎈','🐶','🌸','🚗','⚽','🦄','🍪','🐱','🌈','🍓','🐸','🎁','🌻'];
  function genMate(nivel) {
    var P = [], i, a, b, c, d, em, nn, mm, nums, den, num, x, y, base, exp, lado, n, suma;
    if (nivel === 1) {
      var n1 = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];
      for (i = 0; i < 6; i++) { a = rand(1, 10); P.push(qf('¿Qué número es?  ' + n1[a-1], a, barajar([a, a+rand(1,3), Math.max(1,a-rand(1,3)), a+rand(2,5)].map(String)))); }
      for (i = 0; i < 4; i++) { nums = barajar([rand(1,9), rand(1,9), rand(1,9), rand(1,9)].map(String)); P.push(qf('Tocá el número ' + nums[0], nums[0], nums)); }
    } else if (nivel === 2) {
      for (i = 0; i < 8; i++) { c = rand(2, 12); em = elegir(EMO); P.push(q('¿Cuántos ' + em + ' hay?', c, opcionesNumericas(c), em.repeat(c))); }
      for (i = 0; i < 2; i++) { nn = [rand(1,5), rand(1,5), rand(1,5)]; P.push(qf('Ordená de menor a mayor: ' + nn.join(' · '), nn.slice().sort(function(x,y){return x-y;}).join(' · '), nn.map(String))); }
    } else if (nivel === 3) {
      for (i = 0; i < 6; i++) { a = rand(1,5); b = rand(1,5); P.push(q(a + ' + ' + b + ' = ?', a+b)); }
      for (i = 0; i < 2; i++) { a = rand(1,3); b = rand(1,3); c = rand(1,3); P.push(q(a + ' + ' + b + ' + ' + c + ' = ?', a+b+c)); }
      for (i = 0; i < 2; i++) { nn = [rand(1,20), rand(1,20), rand(1,20), rand(1,20)]; mm = Math.max.apply(null, nn); P.push(qf('¿Cuál es el MAYOR?  ' + nn.join(' · '), mm, barajar(nn.map(String)))); }
    } else if (nivel === 4) {
      for (i = 0; i < 5; i++) { a = rand(3,10); b = rand(1,a-1); P.push(q(a + ' − ' + b + ' = ?', a-b)); }
      for (i = 0; i < 3; i++) { a = rand(5,15); b = rand(1,5); P.push(q(a + ' − ' + b + ' = ?', a-b)); }
      for (i = 0; i < 2; i++) { a = rand(2,10); b = rand(2,10); P.push(q(a + ' + ' + b + ' = ?', a+b)); }
    } else if (nivel === 5) {
      for (i = 0; i < 4; i++) { nn = [rand(10,99), rand(10,99), rand(10,99), rand(10,99)]; mm = Math.max.apply(null, nn); P.push(qf('¿Cuál es el MAYOR?  ' + nn.join(' · '), mm, barajar(nn.map(String)))); }
      for (i = 0; i < 4; i++) { nn = [rand(10,99), rand(10,99), rand(10,99), rand(10,99)]; mm = Math.min.apply(null, nn); P.push(qf('¿Cuál es el MENOR?  ' + nn.join(' · '), mm, barajar(nn.map(String)))); }
      for (i = 0; i < 2; i++) { a = rand(10,50); b = rand(10,50); P.push(q(a + ' + ' + b + ' = ?', a+b)); }
    } else if (nivel === 6) {
      for (i = 0; i < 5; i++) { a = rand(2,5); b = [2,5,10][rand(0,2)]; P.push(q(a + ' × ' + b + ' = ?', a*b)); }
      for (i = 0; i < 3; i++) { a = rand(2,9); b = rand(2,5); P.push(q(a + ' × ' + b + ' = ?', a*b)); }
      for (i = 0; i < 2; i++) { a = rand(10,99); b = rand(1,9); P.push(q(a + ' + ' + b + ' = ?', a+b)); }
    } else if (nivel === 7) {
      for (i = 0; i < 6; i++) { b = rand(2,9); c = rand(2,9); a = b*c; P.push(q(a + ' ÷ ' + b + ' = ?', c)); }
      for (i = 0; i < 2; i++) { a = rand(2,9); b = rand(2,9); P.push(q(a + ' × ' + b + ' = ?', a*b)); }
      for (i = 0; i < 2; i++) { a = rand(20,100); b = rand(10,50); P.push(q(a + ' − ' + b + ' = ?', a-b)); }
    } else if (nivel === 8) {
      var series = [[2,4,6,8,10],[1,3,5,7,9],[5,10,15,20,25],[3,6,9,12,15],[10,20,30,40,50],[1,2,4,8,16],[2,6,10,14,18],[4,8,12,16,20],[1,4,9,16,25],[3,9,27,81,243]];
      barajar(series).slice(0,5).forEach(function(s){ P.push(qf('¿Qué número sigue?  ' + s.slice(0,4).join(' · ') + ' · ?', s[4], opcionesNumericas(s[4]))); });
      for (i = 0; i < 3; i++) { a = rand(2,9); b = rand(2,9); P.push(q(a + ' × ' + b + ' = ?', a*b)); }
      for (i = 0; i < 2; i++) { a = rand(100,500); b = rand(50,200); P.push(q(a + ' + ' + b + ' = ?', a+b)); }
    } else if (nivel === 9) {
      var probs = [
        {p:'Tenés 5 manzanas y te dan 7 más. ¿Cuántas tenés?',c:12},{p:'Hay 15 pájaros y vuelan 6. ¿Cuántos quedan?',c:9},
        {p:'Un lápiz cuesta $10. ¿Cuánto cuestan 4?',c:40},{p:'Repartiste 24 caramelos entre 3 amigos. ¿Cuánto le toca a cada uno?',c:8},
        {p:'Tenés $50 y gastás $27. ¿Cuánto te queda?',c:23},{p:'Una caja tiene 6 huevos. ¿Cuántos en 5 cajas?',c:30},
        {p:'3 docenas de medialunas. ¿Cuántas son?',c:36},{p:'Un paquete tiene 12 galletitas. ¿Cuántas en 7 paquetes?',c:84},
        {p:'Hay 48 chicos y 6 equipos. ¿Cuántos por equipo?',c:8},{p:'Compraste 3 libros de $250. ¿Cuánto pagaste?',c:750}
      ];
      barajar(probs).slice(0,6).forEach(function(pr){ P.push(q(pr.p, pr.c)); });
      for (i = 0; i < 4; i++) { a = rand(3,9); b = rand(3,9); P.push(q(a + ' × ' + b + ' = ?', a*b)); }
    } else if (nivel === 10) {
      for (i = 0; i < 4; i++) { den = [2,3,4,5,8,10][rand(0,5)]; var mult = rand(2,6); P.push(qf('¿Cuánto es 1/' + den + ' de ' + (den*mult) + '?', mult, opcionesNumericas(mult))); }
      for (i = 0; i < 3; i++) { a = rand(2,9); b = rand(2,9); d = rand(2,5); P.push(q(a + ' × ' + b + ' + ' + d + ' = ?', a*b+d)); }
      for (i = 0; i < 3; i++) { b = rand(2,9); c = rand(2,9); a = b*c; d = rand(1,5); P.push(q(a + ' ÷ ' + b + ' − ' + d + ' = ?', c-d)); }
      [{p:'3 cajas con 6 lápices. Usaste 5. ¿Cuántos quedan?',c:13},{p:'80 páginas, leés 12 por día 5 días. ¿Cuántas faltan?',c:20},{p:'Un rectángulo de 4 cm × 6 cm. ¿Área?',c:24},{p:'Un cuadrado de 5 cm de lado. ¿Perímetro?',c:20}].forEach(function(pr){ P.push(q(pr.p, pr.c)); });
    } else if (nivel === 11) {
      for (i = 0; i < 3; i++) { var porc = [10,25,50,20][rand(0,3)]; var tot = [100,200,40,80,60][rand(0,4)]; P.push(q('¿Cuánto es el ' + porc + '% de ' + tot + '?', Math.round(tot*porc/100))); }
      for (i = 0; i < 3; i++) { lado = rand(2,12); P.push(q('Área de un cuadrado de lado ' + lado + ' cm', lado*lado)); }
      for (i = 0; i < 2; i++) { a = rand(2,10); b = rand(2,10); P.push(q('Área de un rectángulo ' + a + '×' + b + ' cm', a*b)); }
      for (i = 0; i < 2; i++) { base = rand(2,10); exp = rand(2,3); P.push(q(base + ' elevado a ' + exp + ' = ?', Math.pow(base, exp))); }
    } else if (nivel === 12) {
      for (i = 0; i < 4; i++) { x = rand(2,9); b = rand(1,10); a = rand(2,5); P.push(qf('Si ' + a + 'x + ' + b + ' = ' + (a*x+b) + ', ¿cuánto vale x?', x, opcionesNumericas(x))); }
      for (i = 0; i < 3; i++) { nn = [rand(1,10), rand(1,10), rand(1,10)]; mm = Math.round((nn[0]+nn[1]+nn[2])/3); P.push(q('Promedio de ' + nn.join(', ') + ' (entero cercano)', mm)); }
      for (i = 0; i < 3; i++) { a = rand(3,12); b = rand(4,12); P.push(q('Hipotenusa de triángulo rectángulo de catetos ' + a + ' y ' + b + ' (entero cercano)', Math.round(Math.sqrt(a*a+b*b)))); }
    } else if (nivel === 13) {
      for (i = 0; i < 3; i++) { a = rand(2,5); b = rand(10,50); c = rand(2,5)*a; P.push(q('Si ' + a + ' kg cuestan $' + b + ', ¿cuánto cuestan ' + c + ' kg?', Math.round(b*c/a))); }
      for (i = 0; i < 3; i++) { var cap = rand(1,5)*1000; var tas = rand(2,10); var tiempo = rand(1,5); P.push(q('Interés simple: $' + cap + ' al ' + tas + '% anual por ' + tiempo + ' años', Math.round(cap*tas*tiempo/100))); }
      P.push(qf('Probabilidad de sacar un número PAR en un dado (de 6 caras)', '1/2', ['1/2','1/3','1/6','2/3']));
      P.push(qf('Probabilidad de sacar cara al tirar una moneda', '1/2', ['1/2','1/4','1/3','2/3']));
    } else if (nivel === 14) {
      for (i = 0; i < 3; i++) { a = rand(2,8); b = rand(2,8); c = rand(2,8); P.push(q('Volumen de prisma ' + a + '×' + b + '×' + c + ' cm', a*b*c)); }
      for (i = 0; i < 3; i++) { var precio = rand(1,10)*100; var desc = [10,20,25,50][rand(0,3)]; P.push(q('Descuento del ' + desc + '% en $' + precio + '. ¿Precio final?', precio - Math.round(precio*desc/100))); }
      for (i = 0; i < 2; i++) { base = rand(2,5); exp = rand(2,4); P.push(q(base + '^' + exp + ' = ?', Math.pow(base, exp))); }
      for (i = 0; i < 2; i++) { a = rand(10,50); b = rand(10,50); P.push(q('MCD de ' + a + ' y ' + b, (function gcd(x,y){return y?gcd(y,x%y):x;})(a,b))); }
    } else if (nivel === 15) {
      for (i = 0; i < 3; i++) { x = rand(2,9); a = rand(2,5); b = rand(1,10); c = a*x + b; P.push(qf('Resolver: ' + a + 'x + ' + b + ' = ' + c + '. x = ?', x, opcionesNumericas(x))); }
      for (i = 0; i < 3; i++) { a = rand(3,10); b = rand(4,10); P.push(q('Hipotenusa entera de catetos ' + a + ' y ' + b + ' (redondeada)', Math.round(Math.sqrt(a*a+b*b)))); }
      for (i = 0; i < 2; i++) { n = rand(3,6); P.push(q('¿Cuánto es ' + n + '! (factorial)?', (function f(x){return x<=1?1:x*f(x-1);})(n))); }
      for (i = 0; i < 2; i++) { nn = [rand(1,20), rand(1,20), rand(1,20), rand(1,20)]; suma = nn[0]+nn[1]+nn[2]+nn[3]; P.push(q('Suma de ' + nn.join('+') + ' = ?', suma)); }
    } else if (nivel === 16) {
      // Números negativos y valor absoluto
      for (i = 0; i < 3; i++) { a = rand(1,9); b = rand(1,9); P.push(q(a + ' + (−' + b + ') = ?', a-b)); }
      for (i = 0; i < 3; i++) { a = rand(1,9); b = rand(1,9); P.push(q('(−' + a + ') × ' + b + ' = ?', -a*b, opcionesNumericas(a*b).concat([-a*b]).slice(0,4))); }
      for (i = 0; i < 2; i++) { a = rand(5,20); P.push(q('|−' + a + '| = ?', a)); }
      P.push(qf('¿Cuál es mayor?', '−2', ['−5','−2','−10','−20']));
    } else if (nivel === 17) {
      // Sistemas de ecuaciones 2x2 sencillos y funciones lineales
      for (i = 0; i < 3; i++) { x = rand(2,6); y = rand(2,6); a = rand(1,3); b = rand(1,3); P.push(qf('x + y = ' + (x+y) + '  y  x − y = ' + (x-y) + '. ¿x?', x, opcionesNumericas(x))); }
      for (i = 0; i < 3; i++) { a = rand(1,5); b = rand(1,5); x = rand(1,5); P.push(q('f(x) = ' + a + 'x + ' + b + '. f(' + x + ') = ?', a*x+b)); }
      P.push(qf('Pendiente de y = 3x + 2', '3', ['3','2','5','6']));
    } else if (nivel === 18) {
      // Estadística: mediana, moda, rango; trigonometría básica
      for (i = 0; i < 3; i++) { nn = [rand(1,10), rand(1,10), rand(1,10), rand(1,10), rand(1,10)]; var orden = nn.slice().sort(function(x,y){return x-y;}); P.push(q('Mediana de ' + nn.join(', ') + ' (5 números)', orden[2])); }
      for (i = 0; i < 2; i++) { nn = [rand(1,10), rand(1,10), rand(1,10), rand(1,10)]; mm = Math.max.apply(null, nn) - Math.min.apply(null, nn); P.push(q('Rango de ' + nn.join(', '), mm)); }
      P.push(qf('En un triángulo rectángulo, ¿sen(30°)?', '1/2', ['1/2','1','√2/2','√3/2']));
      P.push(qf('¿Cuántos grados suman los ángulos de un triángulo?', '180°', ['90°','180°','360°','270°']));
    } else if (nivel === 19) {
      // Notación científica, raíces, logaritmos básicos, probabilidad combinada
      for (i = 0; i < 3; i++) { base = [2,3,5][rand(0,2)]; exp = rand(2,4); P.push(q('√' + (base*base*exp*exp) + ' = ?', base*exp)); }
      for (i = 0; i < 2; i++) { a = rand(1,9); P.push(qf(a + ' × 10³ = ?', a*1000, [a*100, a*1000, a*10000, a*10])); }
      P.push(qf('log₁₀(1000) = ?', '3', ['2','3','10','100']));
      P.push(qf('Probabilidad de sacar dos veces seguidas cara en una moneda', '1/4', ['1/2','1/4','1/3','2/3']));
    } else {
      // Nivel 20: secundario avanzado (cálculo básico, geometría analítica, matrices)
      for (i = 0; i < 3; i++) { a = rand(2,6); b = rand(1,5); x = rand(1,5); P.push(q('Derivada de f(x)=' + a + 'x²+' + b + 'x en x=' + x + ' vale', 2*a*x+b)); }
      for (i = 0; i < 2; i++) { a = rand(1,4); b = rand(1,4); c = rand(1,4); d = rand(1,4); P.push(q('Determinante de |' + a + ' ' + b + '; ' + c + ' ' + d + '|', a*d - b*c)); }
      P.push(qf('¿Qué representa la derivada de una función?', 'La pendiente en un punto', ['El área bajo la curva','La pendiente en un punto','El valor máximo','La integral']));
      P.push(qf('Distancia entre (0,0) y (3,4)', '5', ['5','7','25','12']));
    }
    return P;
  }

  /* ============================================================
     DINERO — 15 NIVELES (Inicial, Primario, Secundario con inversión)
     ============================================================ */
  function genDinero(nivel) {
    var P = [], i, a, b, c2, tot, g1, g2, queda, semanas, precio, ahorro;
    if (nivel <= 2) {
      var v1 = [
        {p:'¿Cuánto vale una moneda de $10?',c:10,opts:[5,10,50,100]},
        {p:'¿Cuál billete vale más?',c:'$1000',opts:['$100','$500','$1000','$200']},
        {p:'¿Qué usamos para comprar?',c:'Dinero',opts:['Dinero','Piedras','Hojas','Palos']},
        {p:'Si ahorrás, tu dinero...',c:'Aumenta',opts:['Aumenta','Desaparece','Se gasta solo','Se vuelve papel']},
        {p:'Moneda de $5 + moneda de $5 =',c:'$10',opts:['$5','$10','$20','$15']},
        {p:'¿Qué es un deseo?',c:'Algo que querés pero no necesitás',opts:['Algo que querés pero no necesitás','Agua','Un techo','Comida']},
        {p:'¿Qué es una necesidad?',c:'Algo que necesitás para vivir',opts:['Algo que necesitás para vivir','Un juguete','Un helado','Un videojuego']},
        {p:'¿Qué conviene más: $10 hoy o $15 mañana?',c:'$15 mañana (si podés esperar)',opts:['$10 hoy','$15 mañana (si podés esperar)','Igual','Tirar los dos']}
      ];
      P = banco(v1, 8);
    } else if (nivel <= 4) {
      for (i = 0; i < 6; i++) { a = rand(2,9)*10; b = rand(2,9)*10; P.push(q('Manzana $' + a + ' + leche $' + b + '. ¿Total?', a+b)); }
      for (i = 0; i < 3; i++) { tot = rand(5,20)*50; g1 = rand(1, Math.floor(tot/50)-1)*50; P.push(q('Pagás con $' + tot + ' algo de $' + g1 + '. ¿Vuelto?', tot-g1)); }
    } else if (nivel <= 6) {
      for (i = 0; i < 8; i++) { tot = rand(5,20)*100; g1 = rand(1, Math.floor(tot/100)-1)*100; P.push(q('Pagás $' + tot + ' por algo de $' + g1 + '. ¿Cuánto te devuelven?', tot-g1)); }
    } else if (nivel <= 8) {
      var v4 = [
        {p:'Juguete de $500, ahorrás $100/semana. ¿Cuántas semanas?',c:5,opts:[3,5,10,8]},
        {p:'¿Mejor: gastar todo o ahorrar una parte?',c:'Ahorrar una parte',opts:['Gastar todo','Ahorrar una parte','Tirarlo','Regalarlo']},
        {p:'$200 y lápiz de $30. ¿Cuántos lápices comprás?',c:6,opts:[4,6,10,2]},
        {p:'¿Qué es un presupuesto?',c:'Un plan para tu dinero',opts:['Un plan para tu dinero','Una moneda','Un juguete','Un billete']},
        {p:'¿Qué es una meta de ahorro?',c:'Juntar para algo que querés',opts:['Juntar para algo que querés','Gastar hoy','Regalar dinero','Comprar sin pensar']},
        {p:'¿Qué es el interés?',c:'Dinero que paga el banco por ahorrar',opts:['Dinero que paga el banco por ahorrar','Una multa','Un impuesto','Un regalo']}
      ];
      P = banco(v4, 5);
      for (i = 0; i < 4; i++) { tot = rand(10,40)*100; g1 = rand(2,8)*100; g2 = rand(2,8)*100; queda = tot-g1-g2; if (queda>0) P.push(q('Presupuesto $' + tot + '. Gastás $' + g1 + ' y $' + g2 + '. ¿Cuánto queda?', queda)); }
    } else if (nivel <= 10) {
      for (i = 0; i < 6; i++) { a = rand(1,9)*50; b = rand(1,9)*50; c2 = rand(1,9)*50; P.push(q('🍎$' + a + ' 🥛$' + b + ' 🍞$' + c2 + '. ¿Total?', a+b+c2)); }
      for (i = 0; i < 4; i++) { tot = rand(10,50)*100; g1 = rand(1,6)*100; g2 = rand(1,6)*100; queda = tot-g1-g2; if (queda>0) P.push(q('Tenés $' + tot + '. Comprás por $' + (g1+g2) + '. ¿Cuánto te queda?', queda)); }
    } else if (nivel <= 12) {
      // Interés compuesto, inflación, tarjetas
      for (i = 0; i < 3; i++) { cap = rand(1,5)*1000; tas = rand(5,15); tiempo = rand(1,3); P.push(q('Interés simple: $' + cap + ' al ' + tas + '% por ' + tiempo + ' años', Math.round(cap*tas*tiempo/100))); }
      var v5 = [
        {p:'¿Qué es la inflación?',c:'Los precios suben y el dinero vale menos',opts:['Los precios suben y el dinero vale menos','Los precios bajan','El banco regala dinero','Sube el sueldo siempre']},
        {p:'¿Qué pasa si no pagás la tarjeta de crédito?',c:'Cobran intereses muy altos',opts:['Cobran intereses muy altos','Nada','Te regalan cosas','Se borra la deuda']},
        {p:'¿Qué es un plazo fijo?',c:'Dejas tu dinero en el banco y te pagan interés',opts:['Dejas tu dinero en el banco y te pagan interés','Comprar un electrodoméstico','Una multa','Un préstamo']},
        {p:'¿Conviene comprar en cuotas sin interés?',c:'Sí, si lo necesitás y podés pagar',opts:['Sí, si lo necesitás y podés pagar','Nunca','Siempre, aunque no lo necesites','Solo si es más caro']}
      ];
      P = P.concat(banco(v5, 4));
    } else {
      // Niveles 13-15: inversión en acciones, cripto (conceptual), impuestos, banca online
      var v6 = [
        {p:'¿Qué es una acción?',c:'Una parte pequeña de una empresa',opts:['Una parte pequeña de una empresa','Un billete','Un impuesto','Un juguete']},
        {p:'Si una acción sube de precio, el que la tiene...',c:'Gana dinero si la vende',opts:['Gana dinero si la vende','Pierde siempre','No le afecta','Debe impuestos dobles']},
        {p:'¿Qué es diversificar?',c:'No poner todo el dinero en un solo lugar',opts:['No poner todo el dinero en un solo lugar','Comprar solo una cosa','Gastar todo','Ahorrar solo en efectivo']},
        {p:'¿Qué es el IVA?',c:'Un impuesto que pagás al comprar',opts:['Un impuesto que pagás al comprar','Un regalo del estado','Un descuento','Un interés del banco']},
        {p:'¿Qué es una criptomoneda (concepto)?',c:'Dinero digital descentralizado',opts:['Dinero digital descentralizado','Un videojuego','Una tarjeta de crédito','Un billete de papel']},
        {p:'¿Invertir en acciones tiene riesgo?',c:'Sí, puede subir o bajar',opts:['Sí, puede subir o bajar','No, siempre sube','No, siempre baja','Solo sube si es de bancos']},
        {p:'¿Qué es un fondo común de inversión?',c:'Muchas personas juntan su dinero para invertir',opts:['Muchas personas juntan su dinero para invertir','Una cuenta bancaria','Un préstamo','Una multa']}
      ];
      P = banco(v6, 8);
      for (i = 0; i < 2; i++) { precio = rand(10,100)*10; a = rand(1,5); P.push(q('Compraste ' + a + ' acciones a $' + precio + '. ¿Invertiste?', a*precio)); }
    }
    return P;
  }

  /* ============================================================
     MUNDO VERDE — 8 BANCOS (más del doble)
     ============================================================ */
  var VERDES = [
    [ {p:'¿Dónde ponés una botella de plástico?',c:'♻️ Reciclaje',opts:['♻️ Reciclaje','🗑️ Basura','🚽 Inodoro','🌊 Mar']},
      {p:'¿De qué color es el contenedor de papel?',c:'Azul',opts:['Azul','Rojo','Negro','Verde']},
      {p:'¿Qué hacemos con el papel usado?',c:'Lo reciclamos',opts:['Lo reciclamos','Lo tiramos','Lo quemamos','Lo enterramos']},
      {p:'Cáscara de banana →',c:'Orgánico / compost',opts:['Orgánico / compost','Plástico','Vidrio','Metal']},
      {p:'¿Apagamos la luz al salir?',c:'Sí, ahorramos energía',opts:['Sí, ahorramos energía','No, da igual','Solo de noche','Solo si llueve']},
      {p:'¿Qué contamina más el aire?',c:'Los autos con nafta',opts:['Los autos con nafta','Las bicicletas','Los árboles','Los molinos de viento']} ],
    [ {p:'¿Cuánta agua dulce hay para tomar?',c:'Poca, hay que cuidarla',opts:['Poca, hay que cuidarla','Toda','Ninguna','Mucha, no hay que cuidar']},
      {p:'¿Cepillarse con la canilla abierta?',c:'No, hay que cerrarla',opts:['No, hay que cerrarla','Sí, siempre','Solo si hace calor','Mejor bañarse con ella']},
      {p:'¿Energía que viene del sol?',c:'Energía solar',opts:['Energía solar','Carbón','Petróleo','Gas']},
      {p:'¿Qué limpia el aire?',c:'Los árboles',opts:['Los árboles','Los cigarrillos','Los incendios','Los plásticos']},
      {p:'Ducha corta ayuda a...',c:'Ahorrar agua',opts:['Ahorrar agua','Gastar luz','Nada','Contaminar más']} ],
    [ {p:'¿Qué necesitan las plantas?',c:'Agua, sol y tierra',opts:['Agua, sol y tierra','Solo sombra','Caramelo','Solo agua']},
      {p:'¿Quién produce miel?',c:'La abeja',opts:['La abeja','La hormiga','El pez','El perro']},
      {p:'Las abejas...',c:'Polinizan las plantas',opts:['Polinizan las plantas','Dan miedo','No sirven','Comen plástico']},
      {p:'¿Especie en peligro?',c:'Puede desaparecer',opts:['Puede desaparecer','Es muy común','Es de juguete','No existe']},
      {p:'Las plantas dan...',c:'Oxígeno',opts:['Oxígeno','Dióxido','Nada','Plástico']} ],
    [ {p:'¿Qué es la contaminación?',c:'Sucio que daña el planeta',opts:['Sucio que daña el planeta','Una planta','Un juego','Un animal']},
      {p:'¿Mejor para el planeta?',c:'Reutilizar las cosas',opts:['Reutilizar las cosas','Tirar y comprar nuevo','Usar una sola vez','Quemar todo']},
      {p:'Las 3 R son...',c:'Reducir, Reutilizar, Reciclar',opts:['Reducir, Reutilizar, Reciclar','Correr, Saltar, Jugar','Comer, Dormir, Estudiar','Gritar, Correr, Jugar']},
      {p:'Plástico al mar →',c:'Daña peces y animales',opts:['Daña peces y animales','Desaparece solo','Vira arena','Se convierte en pez']},
      {p:'¿Cómo ayudás al comprar?',c:'Con tu propia bolsa',opts:['Con tu propia bolsa','Muchas bolsas','No comprando nunca','Comprando todo empaquetado']} ],
    [ {p:'Botella de vidrio → contenedor',c:'Verde (vidrio)',opts:['Verde (vidrio)','Amarillo','Azul','Rojo']},
      {p:'Lata de gaseosa →',c:'Amarillo (metal/plástico)',opts:['Amarillo (metal/plástico)','Azul','Orgánico','Verde']},
      {p:'¿Qué es el cambio climático?',c:'La Tierra se calienta',opts:['La Tierra se calienta','Las estaciones','Un cuento','Sube el mar solo']},
      {p:'¿Qué contamina menos?',c:'La bicicleta',opts:['La bicicleta','El auto','El avión','La moto']},
      {p:'¿Por qué plantar árboles?',c:'Dan oxígeno y sombra',opts:['Dan oxígeno y sombra','Tapan el sol','No sirven','Dan plástico']} ],
    [ {p:'¿Qué es un bosque?',c:'Muchos árboles juntos',opts:['Muchos árboles juntos','Un desierto','Una ciudad','Un río']},
      {p:'¿Qué animal vive en el hielo polar?',c:'Oso polar',opts:['Oso polar','León','Mono','Camello']},
      {p:'¿Qué es la capa de ozono?',c:'Protege la Tierra del sol',opts:['Protege la Tierra del sol','Una nube','Un océano','Un continente']},
      {p:'¿Qué es la energía eólica?',c:'Viento que genera electricidad',opts:['Viento que genera electricidad','Sol','Agua','Carbón']},
      {p:'¿Qué es la energía hidráulica?',c:'Agua que genera electricidad',opts:['Agua que genera electricidad','Viento','Sol','Petróleo']} ],
    [ {p:'¿Qué es un ecosistema?',c:'Seres vivos + su entorno',opts:['Seres vivos + su entorno','Solo animales','Solo plantas','Un zoológico']},
      {p:'¿Qué es la biodiversidad?',c:'Muchas especies diferentes',opts:['Muchas especies diferentes','Una sola especie','Solo plantas','Solo bacterias']},
      {p:'¿Qué es un recurso renovable?',c:'Se repone solo (sol, viento, agua)',opts:['Se repone solo (sol, viento, agua)','Se acaba','Es de plástico','No existe']},
      {p:'¿Qué es un recurso no renovable?',c:'Se acaba (petróleo, carbón)',opts:['Se acaba (petróleo, carbón)','Sol','Viento','Agua']},
      {p:'¿Qué es la huella de carbono?',c:'Cuánto CO₂ generás con tus acciones',opts:['Cuánto CO₂ generás con tus acciones','Una marca de zapato','Un tipo de árbol','Un impuesto']} ],
    [ {p:'¿Qué es el reciclaje de electrónicos?',c:'Recuperar metales de celulares/computadoras',opts:['Recuperar metales de celulares/computadoras','Tirarlos a la basura','Quemarlos','Enterrarlos']},
      {p:'¿Qué es la sobrepesca?',c:'Pescar más de lo que se reproduce',opts:['Pescar más de lo que se reproduce','Pescar poco','No pescar','Pescar solo de día']},
      {p:'¿Qué es la reforestación?',c:'Plantar árboles donde se cortaron',opts:['Plantar árboles donde se cortaron','Cortar árboles','Quemar bosques','Construir casas']},
      {p:'¿Qué es un parque nacional?',c:'Lugar protegido para la naturaleza',opts:['Lugar protegido para la naturaleza','Un shopping','Un estadio','Una fábrica']},
      {p:'¿Qué es el compost?',c:'Restos de comida que viran abono',opts:['Restos de comida que viran abono','Plástico','Metal','Vidrio']} ]
  ];
  function genVerde(nivel) { return banco(VERDES[Math.min(nivel - 1, VERDES.length - 1)], 8); }

  /* ============================================================
     CIENCIA — 10 CATEGORÍAS (más del doble)
     ============================================================ */
  var CIENCIA = {
    '🐶 Animales': [
      qc('¿Qué animal es el mejor amigo del hombre?','Perro',['Perro','Gato','León','Tigre']),
      qc('¿Qué animal hace "miau"?','Gato',['Gato','Vaca','Pato','Perro']),
      qc('¿Animal más grande del mundo?','Ballena azul',['Ballena azul','Elefante','Jirafa','Tiburón']),
      qc('¿Qué animal tiene trompa?','Elefante',['Elefante','Rinoceronte','Hipopótamo','Jirafa']),
      qc('Las abejas producen...','Miel',['Miel','Leche','Lana','Seda']),
      qc('¿Qué animal cambia de color?','Camaleón',['Camaleón','Perro','Caballo','Vaca']),
      qc('¿Qué animal vuela de noche?','Murciélago',['Murciélago','Gorrión','Pollo','Pato']),
      qc('Los peces respiran por...','Branquias',['Branquias','Pulmones','Orejas','Piel']),
      qv('Los perros nacen de huevos.', false),
      qc('¿Qué animal es ovíparo (nace de huevo)?','Gallina',['Gallina','Vaca','Perro','Gato'])
    ],
    '🪐 Sistema solar': [
      qc('¿Cuál es el planeta rojo?','Marte',['Marte','Venus','Júpiter','Saturno']),
      qc('¿En qué planeta vivimos?','Tierra',['Tierra','Marte','La Luna','Venus']),
      qc('¿Qué estrella nos da luz y calor?','El Sol',['El Sol','La Luna','Júpiter','Sirio']),
      qc('¿Cuántas lunas tiene la Tierra?','1',['1','2','0','3']),
      qc('¿Qué planeta tiene anillos?','Saturno',['Saturno','Marte','Mercurio','Venus']),
      qc('¿Cómo se llama nuestra galaxia?','Vía Láctea',['Vía Láctea','Andrómeda','Solaris','Orión']),
      qv('El Sol es una estrella.', true),
      qc('¿Planeta más cercano al Sol?','Mercurio',['Mercurio','Venus','Tierra','Marte']),
      qc('¿Planeta más grande?','Júpiter',['Júpiter','Saturno','Tierra','Neptuno'])
    ],
    '🦖 Dinosaurios': [
      qc('¿Dinosaurio carnívoro más famoso?','Tiranosaurio Rex',['Tiranosaurio Rex','Triceratops','Diplodocus','Stegosaurus']),
      qc('¿Cuál tenía tres cuernos?','Triceratops',['Triceratops','T-Rex','Velociraptor','Diplodocus']),
      qc('Se extinguieron por...','Un meteorito y el clima',['Un meteorito y el clima','Se fueron de viaje','Se volvieron piedra','Se fueron a otro planeta']),
      qc('¿Pariente actual de los dinosaurios?','Las aves',['Las aves','Los peces','Los gatos','Las vacas']),
      qc('¿Quién estudia los dinosaurios?','Paleontólogo',['Paleontólogo','Astrónomo','Cocinero','Médico']),
      qv('Los dinosaurios ponían huevos.', true),
      qc('¿El dinosaurio más largo?','Diplodocus',['Diplodocus','T-Rex','Pterodáctilo','Velociraptor']),
      qc('¿Qué dinosaurio volaba?','Pterodáctilo',['Pterodáctilo','T-Rex','Triceratops','Diplodocus'])
    ],
    '🫀 Cuerpo humano': [
      qc('¿Qué órgano bombea sangre?','El corazón',['El corazón','El pulmón','El estómago','El hígado']),
      qc('¿Con qué oímos?','Los oídos',['Los oídos','Los ojos','La nariz','La piel']),
      qc('¿Cuántos huesos tiene un adulto?','206',['206','100','500','300']),
      qc('¿Con qué respiramos?','Pulmones',['Pulmones','Hígado','Riñones','Corazón']),
      qc('¿Qué controla todo el cuerpo?','El cerebro',['El cerebro','El pie','La mano','El estómago']),
      qc('¿Con qué sentimos los sabores?','La lengua',['La lengua','La nariz','Los ojos','Los oídos']),
      qv('El corazón late siempre.', true),
      qc('¿Cuántos pulmones tenemos?','2',['2','1','3','4']),
      qc('¿Qué sistema digiere la comida?','Digestivo',['Digestivo','Nervioso','Circulatorio','Óseo'])
    ],
    '🌱 Plantas': [
      qc('¿Qué necesitan las plantas?','Agua, luz y tierra',['Agua, luz y tierra','Solo agua','Carne','Solo sombra']),
      qc('¿Qué parte está bajo tierra?','La raíz',['La raíz','La hoja','La flor','El tallo']),
      qc('Las plantas producen...','Oxígeno',['Oxígeno','Dióxido','Nada','Plástico']),
      qc('¿Qué se convierte en fruto?','La flor',['La flor','La raíz','El tallo','La hoja']),
      qc('¿Qué gas toman las plantas?','Dióxido de carbono',['Dióxido de carbono','Oxígeno','Helio','Hidrógeno']),
      qv('Todas las plantas tienen flores.', false),
      qc('¿Qué hace la fotosíntesis?','Producir alimento con luz',['Producir alimento con luz','Dormir','Comer insectos','Nada'])
    ],
    '⚗️ Química básica': [
      qc('¿De qué está hecha el agua?','Hidrógeno y oxígeno (H₂O)',['Hidrógeno y oxígeno (H₂O)','Solo oxígeno','Solo hidrógeno','Sodio y cloro']),
      qc('¿Qué gas respiramos?','Oxígeno',['Oxígeno','Dióxido de carbono','Helio','Hidrógeno']),
      qc('¿Qué es un átomo?','La parte más chica de la materia',['La parte más chica de la materia','Una célula','Un planeta','Un órgano']),
      qc('¿Qué pasa al mezclar agua y aceite?','No se mezclan', ['No se mezclan','Se vuelven sólidos','Desaparecen','Se vuelven fuego']),
      qc('¿Qué es el oxígeno?','Gas que respiramos',['Gas que respiramos','Un metal','Un líquido','Un vegetal']),
      qv('El agua hierve a 100°C.', true),
      qc('¿Qué elemento tiene símbolo "O"?','Oxígeno',['Oxígeno','Oro','Osmio','Oxido'])
    ],
    '🚀 Física básica': [
      qc('¿Qué nos mantiene en el suelo?','La gravedad',['La gravedad','El viento','El magnetismo','La electricidad']),
      qc('¿Qué hace que un imán atraiga metal?','Magnetismo',['Magnetismo','Gravedad','Electricidad','Fricción']),
      qc('¿Qué es la energía?','Capacidad de hacer trabajo',['Capacidad de hacer trabajo','Un objeto','Un sonido','Un color']),
      qc('¿Qué es más rápido?','La luz',['La luz','El sonido','Un auto','Un avión']),
      qv('El sonido viaja más rápido que la luz.', false),
      qc('¿Qué es la fricción?','Fuerza que frena al rozar',['Fuerza que frena al rozar','Tipo de energía','Un metal','Un gas']),
      qc('¿Qué mide un termómetro?','Temperatura',['Temperatura','Velocidad','Peso','Altura'])
    ],
    '🌋 Geología': [
      qc('¿Qué es un volcán?','Abertura por donde sale magma',['Abertura por donde sale magma','Una montaña normal','Un río','Un desierto']),
      qc('¿Qué es un terremoto?','Movimiento de la corteza terrestre',['Movimiento de la corteza terrestre','Un viento fuerte','Una lluvia','Un rayo']),
      qc('¿Qué es una roca ígnea?','Roca de magma enfriado',['Roca de magma enfriado','Roca de río','Roca de mar','Roca de vidrio']),
      qc('¿Qué es el núcleo de la Tierra?','Centro muy caliente',['Centro muy caliente','La superficie','El mar','La atmósfera']),
      qv('La Tierra es plana.', false),
      qc('¿Qué es un fósil?','Restos de seres vivos antiguos',['Restos de seres vivos antiguos','Una roca brillante','Un metal','Un juguete'])
    ],
    '🌦️ Meteorología': [
      qc('¿Qué es un rayo?','Descarga eléctrica en la tormenta',['Descarga eléctrica en la tormenta','Un sol','Una nube','Un viento']),
      qc('¿Qué es un huracán?','Viento muy fuerte y lluvia',['Viento muy fuerte y lluvia','Un sol','Una nieve','Un terremoto']),
      qc('¿Qué mide el anemómetro?','Velocidad del viento',['Velocidad del viento','Temperatura','Lluvia','Presión']),
      qc('¿De qué está hecha una nube?','Gotitas de agua',['Gotitas de agua','Algodón','Humo','Plástico']),
      qv('El arcoíris sale cuando llueve y hay sol.', true),
      qc('¿Qué es la evaporación?','Agua que pasa a gas',['Agua que pasa a gas','Hielo que se derrite','Lluvia','Nieve'])
    ],
    '🐠 Biología marina': [
      qc('¿Qué animal es el más grande del océano?','Ballena azul',['Ballena azul','Tiburón blanco','Pulpo','Delfín']),
      qc('¿Qué pez tiene luz propia?','Pez abisal (anglerfish)',['Pez abisal (anglerfish)','Sardina','Atún','Payaso']),
      qc('¿Qué es un arrecife de coral?','Ecosistema de coral',['Ecosistema de coral','Una roca','Un barco','Una playa']),
      qc('¿Qué animal tiene 8 brazos?','Pulpo',['Pulpo','Estrella de mar','Caballito de mar','Tiburón']),
      qv('Los delfines son peces.', false),
      qc('¿Qué es el plancton?','Seres microscópicos del mar',['Seres microscópicos del mar','Un pez grande','Una planta','Una roca'])
    ]
  };

  /* ============================================================
     IDIOMAS ULTRA — 5 idiomas, 150+ palabras, saludos y frases avanzadas
     ============================================================ */
  function v(es, tr, emoji) { return { es: es, tr: tr, emoji: emoji }; }

  // Base de datos de palabras (150) con 5 idiomas: en, pt, fr, it, de
  var PALABRAS = [
    // 0-11: Números (12)
    {es:'Cero',en:'Zero',pt:'Zero',fr:'Zéro',it:'Zero',de:'Null',emoji:'0️⃣'},
    {es:'Uno',en:'One',pt:'Um',fr:'Un',it:'Uno',de:'Eins',emoji:'1️⃣'},
    {es:'Dos',en:'Two',pt:'Dois',fr:'Deux',it:'Due',de:'Zwei',emoji:'2️⃣'},
    {es:'Tres',en:'Three',pt:'Três',fr:'Trois',it:'Tre',de:'Drei',emoji:'3️⃣'},
    {es:'Cuatro',en:'Four',pt:'Quatro',fr:'Quatre',it:'Quattro',de:'Vier',emoji:'4️⃣'},
    {es:'Cinco',en:'Five',pt:'Cinco',fr:'Cinq',it:'Cinque',de:'Fünf',emoji:'5️⃣'},
    {es:'Seis',en:'Six',pt:'Seis',fr:'Six',it:'Sei',de:'Sechs',emoji:'6️⃣'},
    {es:'Siete',en:'Seven',pt:'Sete',fr:'Sept',it:'Sette',de:'Sieben',emoji:'7️⃣'},
    {es:'Ocho',en:'Eight',pt:'Oito',fr:'Huit',it:'Otto',de:'Acht',emoji:'8️⃣'},
    {es:'Nueve',en:'Nine',pt:'Nove',fr:'Neuf',it:'Nove',de:'Neun',emoji:'9️⃣'},
    {es:'Diez',en:'Ten',pt:'Dez',fr:'Dix',it:'Dieci',de:'Zehn',emoji:'🔟'},
    {es:'Cien',en:'One hundred',pt:'Cem',fr:'Cent',it:'Cento',de:'Hundert',emoji:'💯'},
    // 12-23: Colores (12)
    {es:'Rojo',en:'Red',pt:'Vermelho',fr:'Rouge',it:'Rosso',de:'Rot',emoji:'🔴'},
    {es:'Azul',en:'Blue',pt:'Azul',fr:'Bleu',it:'Blu',de:'Blau',emoji:'🔵'},
    {es:'Verde',en:'Green',pt:'Verde',fr:'Vert',it:'Verde',de:'Grün',emoji:'🟢'},
    {es:'Amarillo',en:'Yellow',pt:'Amarelo',fr:'Jaune',it:'Giallo',de:'Gelb',emoji:'🟡'},
    {es:'Naranja',en:'Orange',pt:'Laranja',fr:'Orange',it:'Arancione',de:'Orange',emoji:'🟠'},
    {es:'Morado',en:'Purple',pt:'Roxo',fr:'Violet',it:'Viola',de:'Lila',emoji:'🟣'},
    {es:'Rosa',en:'Pink',pt:'Rosa',fr:'Rose',it:'Rosa',de:'Rosa',emoji:'🌸'},
    {es:'Marrón',en:'Brown',pt:'Marrom',fr:'Marron',it:'Marrone',de:'Braun',emoji:'🟤'},
    {es:'Negro',en:'Black',pt:'Preto',fr:'Noir',it:'Nero',de:'Schwarz',emoji:'⚫'},
    {es:'Blanco',en:'White',pt:'Branco',fr:'Blanc',it:'Bianco',de:'Weiß',emoji:'⚪'},
    {es:'Gris',en:'Gray',pt:'Cinza',fr:'Gris',it:'Grigio',de:'Grau',emoji:'🐘'},
    {es:'Celeste',en:'Light blue',pt:'Azul claro',fr:'Bleu clair',it:'Azzurro',de:'Hellblau',emoji:'💧'},
    // 24-38: Animales (15)
    {es:'Perro',en:'Dog',pt:'Cachorro',fr:'Chien',it:'Cane',de:'Hund',emoji:'🐶'},
    {es:'Gato',en:'Cat',pt:'Gato',fr:'Chat',it:'Gatto',de:'Katze',emoji:'🐱'},
    {es:'Pájaro',en:'Bird',pt:'Pássaro',fr:'Oiseau',it:'Uccello',de:'Vogel',emoji:'🐦'},
    {es:'Pez',en:'Fish',pt:'Peixe',fr:'Poisson',it:'Pesce',de:'Fisch',emoji:'🐟'},
    {es:'Caballo',en:'Horse',pt:'Cavalo',fr:'Cheval',it:'Cavallo',de:'Pferd',emoji:'🐴'},
    {es:'Vaca',en:'Cow',pt:'Vaca',fr:'Vache',it:'Mucca',de:'Kuh',emoji:'🐮'},
    {es:'Cerdo',en:'Pig',pt:'Porco',fr:'Cochon',it:'Maiale',de:'Schwein',emoji:'🐷'},
    {es:'Oveja',en:'Sheep',pt:'Ovelha',fr:'Mouton',it:'Pecora',de:'Schaf',emoji:'🐑'},
    {es:'León',en:'Lion',pt:'Leão',fr:'Lion',it:'Leone',de:'Löwe',emoji:'🦁'},
    {es:'Tigre',en:'Tiger',pt:'Tigre',fr:'Tigre',it:'Tigre',de:'Tiger',emoji:'🐯'},
    {es:'Mono',en:'Monkey',pt:'Macaco',fr:'Singe',it:'Scimmia',de:'Affe',emoji:'🐵'},
    {es:'Elefante',en:'Elephant',pt:'Elefante',fr:'Éléphant',it:'Elefante',de:'Elefant',emoji:'🐘'},
    {es:'Oso',en:'Bear',pt:'Urso',fr:'Ours',it:'Orso',de:'Bär',emoji:'🐻'},
    {es:'Ratón',en:'Mouse',pt:'Rato',fr:'Souris',it:'Topo',de:'Maus',emoji:'🐭'},
    {es:'Pato',en:'Duck',pt:'Pato',fr:'Canard',it:'Anatra',de:'Ente',emoji:'🦆'},
    // 39-48: Familia (10)
    {es:'Mamá',en:'Mom',pt:'Mãe',fr:'Maman',it:'Mamma',de:'Mama',emoji:'👩'},
    {es:'Papá',en:'Dad',pt:'Pai',fr:'Papa',it:'Papà',de:'Papa',emoji:'👨'},
    {es:'Hermano',en:'Brother',pt:'Irmão',fr:'Frère',it:'Fratello',de:'Bruder',emoji:'👦'},
    {es:'Hermana',en:'Sister',pt:'Irmã',fr:'Sœur',it:'Sorella',de:'Schwester',emoji:'👧'},
    {es:'Bebé',en:'Baby',pt:'Bebê',fr:'Bébé',it:'Bambino',de:'Baby',emoji:'👶'},
    {es:'Abuelo',en:'Grandpa',pt:'Avô',fr:'Grand-père',it:'Nonno',de:'Opa',emoji:'👴'},
    {es:'Abuela',en:'Grandma',pt:'Avó',fr:'Grand-mère',it:'Nonna',de:'Oma',emoji:'👵'},
    {es:'Tío',en:'Uncle',pt:'Tio',fr:'Oncle',it:'Zio',de:'Onkel',emoji:'🧔'},
    {es:'Tía',en:'Aunt',pt:'Tia',fr:'Tante',it:'Zia',de:'Tante',emoji:'👩‍🦰'},
    {es:'Primo',en:'Cousin',pt:'Primo',fr:'Cousin',it:'Cugino',de:'Cousin',emoji:'👦'},
    // 49-63: Comida (15)
    {es:'Manzana',en:'Apple',pt:'Maçã',fr:'Pomme',it:'Mela',de:'Apfel',emoji:'🍎'},
    {es:'Pan',en:'Bread',pt:'Pão',fr:'Pain',it:'Pane',de:'Brot',emoji:'🍞'},
    {es:'Leche',en:'Milk',pt:'Leite',fr:'Lait',it:'Latte',de:'Milch',emoji:'🥛'},
    {es:'Agua',en:'Water',pt:'Água',fr:'Eau',it:'Acqua',de:'Wasser',emoji:'💧'},
    {es:'Queso',en:'Cheese',pt:'Queijo',fr:'Fromage',it:'Formaggio',de:'Käse',emoji:'🧀'},
    {es:'Carne',en:'Meat',pt:'Carne',fr:'Viande',it:'Carne',de:'Fleisch',emoji:'🥩'},
    {es:'Pollo',en:'Chicken',pt:'Frango',fr:'Poulet',it:'Pollo',de:'Hähnchen',emoji:'🍗'},
    {es:'Pescado',en:'Fish',pt:'Peixe',fr:'Poisson',it:'Pesce',de:'Fisch',emoji:'🐠'},
    {es:'Arroz',en:'Rice',pt:'Arroz',fr:'Riz',it:'Riso',de:'Reis',emoji:'🍚'},
    {es:'Huevo',en:'Egg',pt:'Ovo',fr:'Œuf',it:'Uovo',de:'Ei',emoji:'🥚'},
    {es:'Fruta',en:'Fruit',pt:'Fruta',fr:'Fruit',it:'Frutta',de:'Obst',emoji:'🍓'},
    {es:'Verdura',en:'Vegetable',pt:'Vegetal',fr:'Légume',it:'Verdura',de:'Gemüse',emoji:'🥦'},
    {es:'Pizza',en:'Pizza',pt:'Pizza',fr:'Pizza',it:'Pizza',de:'Pizza',emoji:'🍕'},
    {es:'Torta',en:'Cake',pt:'Bolo',fr:'Gâteau',it:'Torta',de:'Kuchen',emoji:'🎂'},
    {es:'Helado',en:'Ice cream',pt:'Sorvete',fr:'Glace',it:'Gelato',de:'Eis',emoji:'🍦'},
    // 64-77: Casa y Escuela (14)
    {es:'Casa',en:'House',pt:'Casa',fr:'Maison',it:'Casa',de:'Haus',emoji:'🏠'},
    {es:'Escuela',en:'School',pt:'Escola',fr:'École',it:'Scuola',de:'Schule',emoji:'🏫'},
    {es:'Libro',en:'Book',pt:'Livro',fr:'Livre',it:'Libro',de:'Buch',emoji:'📚'},
    {es:'Pelota',en:'Ball',pt:'Bola',fr:'Ballon',it:'Palla',de:'Ball',emoji:'⚽'},
    {es:'Lápiz',en:'Pencil',pt:'Lápiz',fr:'Crayon',it:'Matita',de:'Bleistift',emoji:'✏️'},
    {es:'Mesa',en:'Table',pt:'Mesa',fr:'Table',it:'Tavolo',de:'Tisch',emoji:'🪑'},
    {es:'Silla',en:'Chair',pt:'Silla',fr:'Chaise',it:'Sedia',de:'Stuhl',emoji:'🪑'},
    {es:'Cama',en:'Bed',pt:'Cama',fr:'Lit',it:'Letto',de:'Bett',emoji:'🛏️'},
    {es:'Puerta',en:'Door',pt:'Puerta',fr:'Porte',it:'Porta',de:'Tür',emoji:'🚪'},
    {es:'Ventana',en:'Window',pt:'Ventana',fr:'Fenêtre',it:'Finestra',de:'Fenster',emoji:'🪟'},
    {es:'Baño',en:'Bathroom',pt:'Baño',fr:'Salle de bain',it:'Bagno',de:'Bad',emoji:'🚽'},
    {es:'Cocina',en:'Kitchen',pt:'Cocina',fr:'Cuisine',it:'Cucina',de:'Küche',emoji:'🍳'},
    {es:'Juguete',en:'Toy',pt:'Juguete',fr:'Jouet',it:'Giocattolo',de:'Spielzeug',emoji:'🧸'},
    {es:'Computadora',en:'Computer',pt:'Computadora',fr:'Ordinateur',it:'Computer',de:'Computer',emoji:'💻'},
    // 78-87: Naturaleza y Clima (10)
    {es:'Sol',en:'Sun',pt:'Sol',fr:'Soleil',it:'Sole',de:'Sonne',emoji:'☀️'},
    {es:'Luna',en:'Moon',pt:'Luna',fr:'Lune',it:'Luna',de:'Mond',emoji:'🌙'},
    {es:'Estrella',en:'Star',pt:'Estrella',fr:'Étoile',it:'Stella',de:'Stern',emoji:'⭐'},
    {es:'Árbol',en:'Tree',pt:'Árbol',fr:'Arbre',it:'Albero',de:'Baum',emoji:'🌳'},
    {es:'Flor',en:'Flower',pt:'Flor',fr:'Fleur',it:'Fiore',de:'Blume',emoji:'🌸'},
    {es:'Lluvia',en:'Rain',pt:'Lluvia',fr:'Pluie',it:'Pioggia',de:'Regen',emoji:'🌧️'},
    {es:'Nieve',en:'Snow',pt:'Nieve',fr:'Neige',it:'Neve',de:'Schnee',emoji:'❄️'},
    {es:'Fuego',en:'Fire',pt:'Fuego',fr:'Feu',it:'Fuoco',de:'Feuer',emoji:'🔥'},
    {es:'Montaña',en:'Mountain',pt:'Montaña',fr:'Montagne',it:'Montagna',de:'Berg',emoji:'⛰️'},
    {es:'Río',en:'River',pt:'Río',fr:'Rivière',it:'Fiume',de:'Fluss',emoji:'🏞️'},
    // 88-97: Cuerpo Humano (10)
    {es:'Cabeza',en:'Head',pt:'Cabeza',fr:'Tête',it:'Testa',de:'Kopf',emoji:'👤'},
    {es:'Mano',en:'Hand',pt:'Mano',fr:'Main',it:'Mano',de:'Hand',emoji:'🖐️'},
    {es:'Pie',en:'Foot',pt:'Pie',fr:'Pied',it:'Piede',de:'Fuß',emoji:'🦶'},
    {es:'Ojo',en:'Eye',pt:'Ojo',fr:'Œil',it:'Occhio',de:'Auge',emoji:'👁️'},
    {es:'Oreja',en:'Ear',pt:'Oreja',fr:'Oreille',it:'Orecchio',de:'Ohr',emoji:'👂'},
    {es:'Boca',en:'Mouth',pt:'Boca',fr:'Bouche',it:'Bocca',de:'Mund',emoji:'👄'},
    {es:'Nariz',en:'Nose',pt:'Nariz',fr:'Nez',it:'Naso',de:'Nase',emoji:'👃'},
    {es:'Brazo',en:'Arm',pt:'Brazo',fr:'Bras',it:'Braccio',de:'Arm',emoji:'💪'},
    {es:'Pierna',en:'Leg',pt:'Pierna',fr:'Jambe',it:'Gamba',de:'Bein',emoji:'🦵'},
    {es:'Diente',en:'Tooth',pt:'Diente',fr:'Dent',it:'Dente',de:'Zahn',emoji:'🦷'},
    // 98-105: Transporte y Ciudad (8)
    {es:'Auto',en:'Car',pt:'Auto',fr:'Voiture',it:'Auto',de:'Auto',emoji:'🚗'},
    {es:'Autobús',en:'Bus',pt:'Autobús',fr:'Bus',it:'Autobus',de:'Bus',emoji:'🚌'},
    {es:'Tren',en:'Train',pt:'Tren',fr:'Train',it:'Treno',de:'Zug',emoji:'🚆'},
    {es:'Avión',en:'Plane',pt:'Avión',fr:'Avion',it:'Aereo',de:'Flugzeug',emoji:'✈️'},
    {es:'Bicicleta',en:'Bike',pt:'Bicicleta',fr:'Vélo',it:'Bicicletta',de:'Fahrrad',emoji:'🚲'},
    {es:'Barco',en:'Boat',pt:'Barco',fr:'Bateau',it:'Barca',de:'Boot',emoji:'⛵'},
    {es:'Calle',en:'Street',pt:'Calle',fr:'Rue',it:'Strada',de:'Straße',emoji:'🛣️'},
    {es:'Ciudad',en:'City',pt:'Ciudad',fr:'Ville',it:'Città',de:'Stadt',emoji:'🏙️'},
    // 106-117: Adjetivos y Emociones (12)
    {es:'Feliz',en:'Happy',pt:'Feliz',fr:'Heureux',it:'Felice',de:'Glücklich',emoji:'😊'},
    {es:'Triste',en:'Sad',pt:'Triste',fr:'Triste',it:'Triste',de:'Traurig',emoji:'😢'},
    {es:'Enojado',en:'Angry',pt:'Enojado',fr:'En colère',it:'Arrabbiato',de:'Wütend',emoji:'😡'},
    {es:'Asustado',en:'Scared',pt:'Asustado',fr:'Effrayé',it:'Spaventato',de:'Ängstlich',emoji:'😨'},
    {es:'Grande',en:'Big',pt:'Grande',fr:'Grand',it:'Grande',de:'Groß',emoji:'🐘'},
    {es:'Pequeño',en:'Small',pt:'Pequeño',fr:'Petit',it:'Piccolo',de:'Klein',emoji:'🐜'},
    {es:'Rápido',en:'Fast',pt:'Rápido',fr:'Rapide',it:'Veloce',de:'Schnell',emoji:'🐇'},
    {es:'Lento',en:'Slow',pt:'Lento',fr:'Lent',it:'Lento',de:'Langsam',emoji:'🐢'},
    {es:'Bueno',en:'Good',pt:'Bueno',fr:'Bon',it:'Buono',de:'Gut',emoji:'👍'},
    {es:'Malo',en:'Bad',pt:'Malo',fr:'Mauvais',it:'Cattivo',de:'Schlecht',emoji:'👎'},
    {es:'Caliente',en:'Hot',pt:'Caliente',fr:'Chaud',it:'Caldo',de:'Heiß',emoji:'🔥'},
    {es:'Frío',en:'Cold',pt:'Frío',fr:'Froid',it:'Freddo',de:'Kalt',emoji:'❄️'},
    // 118-132: Verbos y Acciones (15)
    {es:'Comer',en:'Eat',pt:'Comer',fr:'Manger',it:'Mangiare',de:'Essen',emoji:'🍽️'},
    {es:'Beber',en:'Drink',pt:'Beber',fr:'Boire',it:'Bere',de:'Trinken',emoji:'🥤'},
    {es:'Correr',en:'Run',pt:'Correr',fr:'Courir',it:'Correre',de:'Laufen',emoji:'🏃'},
    {es:'Jugar',en:'Play',pt:'Jugar',fr:'Jouer',it:'Giocare',de:'Spielen',emoji:'🎮'},
    {es:'Leer',en:'Read',pt:'Leer',fr:'Lire',it:'Leggere',de:'Lesen',emoji:'📖'},
    {es:'Escribir',en:'Write',pt:'Escribir',fr:'Écrire',it:'Scrivere',de:'Schreiben',emoji:'✍️'},
    {es:'Dormir',en:'Sleep',pt:'Dormir',fr:'Dormir',it:'Dormire',de:'Schlafen',emoji:'😴'},
    {es:'Caminar',en:'Walk',pt:'Caminar',fr:'Marcher',it:'Camminare',de:'Gehen',emoji:'🚶'},
    {es:'Saltar',en:'Jump',pt:'Saltar',fr:'Sauter',it:'Saltare',de:'Springen',emoji:'🦘'},
    {es:'Escuchar',en:'Listen',pt:'Escuchar',fr:'Écouter',it:'Ascoltare',de:'Hören',emoji:'🎧'},
    {es:'Hablar',en:'Speak',pt:'Hablar',fr:'Parler',it:'Parlare',de:'Sprechen',emoji:'🗣️'},
    {es:'Ver',en:'See',pt:'Ver',fr:'Voir',it:'Vedere',de:'Sehen',emoji:'👀'},
    {es:'Cantar',en:'Sing',pt:'Cantar',fr:'Chanter',it:'Cantare',de:'Singen',emoji:'🎤'},
    {es:'Bailar',en:'Dance',pt:'Bailar',fr:'Danser',it:'Ballare',de:'Tanzen',emoji:'💃'},
    {es:'Reír',en:'Laugh',pt:'Reír',fr:'Rire',it:'Ridere',de:'Lachen',emoji:'😂'},
    // 133-149: EXTRA (ropa, tiempo, lugares) — 17 palabras nuevas
    {es:'Camisa',en:'Shirt',pt:'Camisa',fr:'Chemise',it:'Camicia',de:'Hemd',emoji:'👕'},
    {es:'Pantalón',en:'Pants',pt:'Pantalón',fr:'Pantalon',it:'Pantaloni',de:'Hose',emoji:'👖'},
    {es:'Zapato',en:'Shoe',pt:'Zapato',fr:'Chaussure',it:'Scarpa',de:'Schuh',emoji:'👟'},
    {es:'Sombrero',en:'Hat',pt:'Sombrero',fr:'Chapeau',it:'Cappello',de:'Hut',emoji:'🎩'},
    {es:'Abrigo',en:'Coat',pt:'Abrigo',fr:'Manteau',it:'Cappotto',de:'Mantel',emoji:'🧥'},
    {es:'Lunes',en:'Monday',pt:'Lunes',fr:'Lundi',it:'Lunedì',de:'Montag',emoji:'📅'},
    {es:'Martes',en:'Tuesday',pt:'Martes',fr:'Mardi',it:'Martedì',de:'Dienstag',emoji:'📅'},
    {es:'Domingo',en:'Sunday',pt:'Domingo',fr:'Dimanche',it:'Domenica',de:'Sonntag',emoji:'📅'},
    {es:'Mañana',en:'Tomorrow',pt:'Mañana',fr:'Demain',it:'Domani',de:'Morgen',emoji:'🌅'},
    {es:'Ayer',en:'Yesterday',pt:'Ayer',fr:'Hier',it:'Ieri',de:'Gestern',emoji:'📆'},
    {es:'Parque',en:'Park',pt:'Parque',fr:'Parc',it:'Parco',de:'Park',emoji:'🌳'},
    {es:'Playa',en:'Beach',pt:'Playa',fr:'Plage',it:'Spiaggia',de:'Strand',emoji:'🏖️'},
    {es:'Bosque',en:'Forest',pt:'Bosque',fr:'Forêt',it:'Bosco',de:'Wald',emoji:'🌲'},
    {es:'Desierto',en:'Desert',pt:'Desierto',fr:'Désert',it:'Deserto',de:'Wüste',emoji:'🏜️'},
    {es:'Isla',en:'Island',pt:'Isla',fr:'Île',it:'Isola',de:'Insel',emoji:'🏝️'},
    {es:'Amigo',en:'Friend',pt:'Amigo',fr:'Ami',it:'Amico',de:'Freund',emoji:'🤝'},
    {es:'Mochila',en:'Backpack',pt:'Mochila',fr:'Sac à dos',it:'Zaino',de:'Rucksack',emoji:'🎒'}
  ];

  // Saludos y frases básicas (16) para cada idioma
  function saludosDe(lang) {
    var base = [
      ['Hola','Hello','Olá','Bonjour','Ciao','Hallo'],
      ['Adiós','Goodbye','Tchau','Au revoir','Arrivederci','Tschüss'],
      ['Buenos días','Good morning','Bom dia','Bonjour','Buongiorno','Guten Morgen'],
      ['Buenas tardes','Good afternoon','Boa tarde','Bon après-midi','Buon pomeriggio','Guten Tag'],
      ['Buenas noches','Good night','Boa noite','Bonne nuit','Buonanotte','Gute Nacht'],
      ['Gracias','Thank you','Obrigado','Merci','Grazie','Danke'],
      ['Por favor','Please','Por favor',"S'il vous plaît",'Per favore','Bitte'],
      ['De nada',"You're welcome",'De nada','De rien','Prego','Bitte'],
      ['Sí','Yes','Sim','Oui','Sì','Ja'],
      ['No','No','Não','Non','No','Nein'],
      ['Perdón','Sorry','Desculpe','Désolé','Scusa','Entschuldigung'],
      ['Disculpe','Excuse me','Com licença','Excusez-moi','Mi scusi','Entschuldigen Sie'],
      ['¿Cómo estás?','How are you?','Como vai você?','Comment ça va ?','Come stai?','Wie geht es dir?'],
      ['Estoy bien','I am fine','Eu estou bem','Je vais bien','Sto bene','Mir geht es gut'],
      ['¿Cómo te llamas?','What is your name?','Qual é o seu nome?','Comment tu t\'appelles ?','Come ti chiami?','Wie heißt du?'],
      ['Me llamo...','My name is...','Meu nome é...','Je m\'appelle...','Mi chiamo...','Ich heiße...']
    ];
    var idx = { en:1, pt:2, fr:3, it:4, de:5 }[lang];
    var emojis = ['👋','👋','🌅','🌇','🌙','🙏','🤲','🙌','✅','❌','🥺','🙋','❓','😊','📛','👤'];
    return base.map(function (fila, i) { return v(fila[0], fila[idx], emojis[i]); });
  }

  // Frases avanzadas: restaurante, escuela, viaje, emergencias
  var FRASES_AVANZADAS = {
    '🍽️ Restaurante': [
      ['Quisiera una pizza, por favor','I would like a pizza, please','Eu queria uma pizza, por favor','Je voudrais une pizza, s\'il vous plaît','Vorrei una pizza, per favore','Ich möchte eine Pizza, bitte'],
      ['La cuenta, por favor','The bill, please','A conta, por favor','L\'addition, s\'il vous plaît','Il conto, per favore','Die Rechnung, bitte'],
      ['¿Tienen menú vegetariano?','Do you have a vegetarian menu?','Tem menu vegetariano?','Avez-vous un menu végétarien ?','Avete un menu vegetariano?','Haben Sie ein vegetarisches Menü?'],
      ['Me gusta mucho','I like it very much','Gosto muito','J\'aime beaucoup','Mi piace molto','Es gefällt mir sehr'],
      ['Delicioso','Delicious','Delicioso','Délicieux','Delizioso','Köstlich']
    ],
    '🏫 Escuela': [
      ['¿Puedo ir al baño?','May I go to the bathroom?','Posso ir ao banheiro?','Puis-je aller aux toilettes ?','Posso andare in bagno?','Darf ich auf die Toilette gehen?'],
      ['No entendí','I didn\'t understand','Não entendi','Je n\'ai pas compris','Non ho capito','Ich habe nicht verstanden'],
      ['¿Me ayudás?','Can you help me?','Você me ajuda?','Pouvez-vous m\'aider ?','Puoi aiutarmi?','Können Sie mir helfen?'],
      ['Hoy tengo examen','I have an exam today','Hoje tenho prova','J\'ai un examen aujourd\'hui','Oggi ho un esame','Heute habe ich eine Prüfung'],
      ['Me gusta aprender','I like to learn','Gosto de aprender','J\'aime apprendre','Mi piace imparare','Ich lerne gern']
    ],
    '✈️ Viaje': [
      ['¿Dónde está el aeropuerto?','Where is the airport?','Onde fica o aeroporto?','Où est l\'aéroport ?','Dov\'è l\'aeroporto?','Wo ist der Flughafen?'],
      ['Necesito un hotel','I need a hotel','Preciso de um hotel','J\'ai besoin d\'un hôtel','Ho bisogno di un hotel','Ich brauche ein Hotel'],
      ['¿Cuánto cuesta?','How much does it cost?','Quanto custa?','Combien ça coûte ?','Quanto costa?','Wie viel kostet das?'],
      ['Estoy perdido','I am lost','Estou perdido','Je suis perdu','Sono perso','Ich bin verloren'],
      ['Una foto, por favor','A photo, please','Uma foto, por favor','Une photo, s\'il vous plaît','Una foto, per favore','Ein Foto, bitte']
    ],
    '🚑 Emergencias': [
      ['¡Ayuda!','Help!','Socorro!','Au secours !','Aiuto!','Hilfe!'],
      ['Llame a una ambulancia','Call an ambulance','Ligue uma ambulância','Appelez une ambulance','Chiama un\'ambulanza','Rufen Sie einen Krankenwagen'],
      ['Me lastimé','I hurt myself','Eu me machuquei','Je me suis fait mal','Mi sono fatto male','Ich habe mich verletzt'],
      ['Necesito un médico','I need a doctor','Preciso de um médico','J\'ai besoin d\'un médecin','Ho bisogno di un dottore','Ich brauche einen Arzt'],
      ['¿Dónde está el hospital?','Where is the hospital?','Onde fica o hospital?','Où est l\'hôpital ?','Dov\'è l\'ospedale?','Wo ist das Krankenhaus?']
    ]
  };

  function porIdioma(lang) {
    var key = { ingles: 'en', portugues: 'pt', frances: 'fr', italiano: 'it', aleman: 'de' }[lang];
    return PALABRAS.map(function (p) { return v(p.es, p[key], p.emoji); });
  }

  function frasesAvanzadasDe(lang) {
    var idx = { ingles: 1, portugues: 2, frances: 3, italiano: 4, aleman: 5 }[lang];
    var emojis = { '🍽️ Restaurante':'🍽️', '🏫 Escuela':'🏫', '✈️ Viaje':'✈️', '🚑 Emergencias':'🚑' };
    var out = {};
    Object.keys(FRASES_AVANZADAS).forEach(function (cat) {
      out[cat] = FRASES_AVANZADAS[cat].map(function (fila) { return v(fila[0], fila[idx], emojis[cat]); });
    });
    return out;
  }

  function armarIdioma(lang, nombre, bandera, code) {
    var base = porIdioma(lang);
    var key2 = { ingles:'en', portugues:'pt', frances:'fr', italiano:'it', aleman:'de' }[lang];
    var cats = { '💬 Saludos y Frases': saludosDe(key2) };
    Object.keys(frasesAvanzadasDe(lang)).forEach(function (k) { cats[k] = frasesAvanzadasDe(lang)[k]; });
    cats['🔢 Números'] = base.slice(0, 12);
    cats['🎨 Colores'] = base.slice(12, 24);
    cats['🐶 Animales'] = base.slice(24, 39);
    cats['👨‍👩‍👧 Familia'] = base.slice(39, 49);
    cats['🍎 Comida'] = base.slice(49, 64);
    cats['🏫 Casa y Escuela'] = base.slice(64, 78);
    cats['🌳 Naturaleza y Clima'] = base.slice(78, 88);
    cats['👤 Cuerpo Humano'] = base.slice(88, 98);
    cats['🚗 Transporte y Ciudad'] = base.slice(98, 106);
    cats['😊 Adjetivos y Emociones'] = base.slice(106, 118);
    cats['🏃 Verbos y Acciones'] = base.slice(118, 133);
    cats['👕 Ropa y Tiempo'] = base.slice(133, 142);
    cats['🌍 Lugares y Amigos'] = base.slice(142, 150);
    return { nombre: nombre, bandera: bandera, lang: code, categorias: cats };
  }

  var IDIOMAS = {
    ingles:   armarIdioma('ingles',   'Inglés',   '🇬🇧', 'en-US'),
    portugues:armarIdioma('portugues','Portugués','🇧🇷', 'pt-BR'),
    frances:  armarIdioma('frances',  'Francés',  '🇫🇷', 'fr-FR'),
    italiano: armarIdioma('italiano', 'Italiano', '🇮🇹', 'it-IT'),
    aleman:   armarIdioma('aleman',   'Alemán',   '🇩🇪', 'de-DE')
  };

  function genQuizIdioma(vocabList, langNombre) {
    return barajar(vocabList).slice(0, Math.min(8, vocabList.length)).map(function (v) {
      var otras = barajar(vocabList.filter(function (x) { return x.tr !== v.tr; })).slice(0, 3).map(function (x) { return x.tr; });
      return { pregunta: '¿Cómo se dice "' + v.es + '" en ' + langNombre + '?', emojiPregunta: v.emoji, opciones: barajar([v.tr].concat(otras)), correcta: v.tr };
    });
  }
  function genQuizEscuchar(vocabList, langCode) {
    return barajar(vocabList).slice(0, Math.min(8, vocabList.length)).map(function (v) {
      var otras = barajar(vocabList.filter(function (x) { return x.tr !== v.tr; })).slice(0, 3).map(function (x) { return x.tr; });
      return { pregunta: '🔊 Escuchá y elegí la palabra correcta', emojiPregunta: '👂', audio: { texto: v.tr, lang: langCode }, opciones: barajar([v.tr].concat(otras)), correcta: v.tr };
    });
  }

  /* ============================================================
     BANCOS COMPLETOS — Geografía, Lengua, Sociales, Música, Historia,
     Lógica, Emociones, Deportes, Salud, Arte, Mitología, Profesiones,
     Cocina, Astronomía, Ajedrez, Seguridad, Primeros Auxilios, ODS,
     Filosofía, Danza, Cine, Arquitectura, Huerta, Energías
     ============================================================ */
  var GEOGRAFIA = {
    '🇦🇷 Argentina': banco([
      {p:'¿Cuál es la capital de Argentina?',c:'Buenos Aires',opts:['Buenos Aires','Córdoba','Rosario','Mendoza']},
      {p:'¿Qué montaña es la más alta de América?',c:'Aconcagua',opts:['Aconcagua','Everest','Kilimanjaro','Ojos del Salado']},
      {p:'¿Qué baña la costa argentina?',c:'Océano Atlántico',opts:['Océano Atlántico','Océano Pacífico','Mar Caribe','Golfo de México']},
      {p:'¿Cuántas provincias tiene Argentina?',c:'23',opts:['23','20','15','30']},
      {p:'¿Qué región es conocida por el perito Moreno?',c:'Patagonia',opts:['Patagonia','Pampa','Cuyo','NOA']},
      {p:'¿Qué río es limítrofe con Uruguay?',c:'Río de la Plata',opts:['Río de la Plata','Río Paraná','Río Uruguay','Río Negro']},
      {p:'¿Qué caída de agua está en Misiones?',c:'Iguazú',opts:['Iguazú','Niagara','Victoria','Ángel']},
      {p:'¿Qué país está al oeste de Argentina?',c:'Chile',opts:['Chile','Brasil','Uruguay','Paraguay']}
    ], 8),
    '🌎 América y el Mundo': banco([
      {p:'¿Cuál es el continente más grande?',c:'Asia',opts:['Asia','África','América','Europa']},
      {p:'¿Cuál es el océano más grande?',c:'Pacífico',opts:['Pacífico','Atlántico','Índico','Ártico']},
      {p:'¿Cuál es la capital de Francia?',c:'París',opts:['París','Londres','Roma','Madrid']},
      {p:'¿En qué continente está Egipto?',c:'África',opts:['África','Asia','Europa','Oceanía']},
      {p:'¿Cuál es el río más largo del mundo?',c:'Nilo',opts:['Nilo','Amazonas','Misisipi','Yangtsé']},
      {p:'¿Cuál es el desierto más grande?',c:'Sahara',opts:['Sahara','Gobi','Atacama','Kalahari']},
      {p:'¿Cuántos continentes hay?',c:'5 o 7 (según criterio)',opts:['5 o 7 (según criterio)','3','10','12']},
      {p:'¿Qué país tiene forma de bota?',c:'Italia',opts:['Italia','Francia','España','Grecia']}
    ], 8),
    '🏳️ Banderas y Capitales': banco([
      {p:'Capital de Brasil',c:'Brasilia',opts:['Brasilia','Río de Janeiro','São Paulo','Salvador']},
      {p:'Capital de Chile',c:'Santiago',opts:['Santiago','Valparaíso','Lima','Bogotá']},
      {p:'Capital de España',c:'Madrid',opts:['Madrid','Barcelona','Sevilla','Lisboa']},
      {p:'Capital de Japón',c:'Tokio',opts:['Tokio','Osaka','Kioto','Pekín']},
      {p:'Bandera con una hoja de arce',c:'Canadá',opts:['Canadá','EE.UU.','México','Brasil']},
      {p:'Capital de Australia',c:'Canberra',opts:['Canberra','Sídney','Melbourne','Perth']},
      {p:'Capital de México',c:'Ciudad de México',opts:['Ciudad de México','Guadalajara','Monterrey','Cancún']},
      {p:'Bandera celeste y blanca con sol',c:'Argentina/Uruguay',opts:['Argentina/Uruguay','Chile','Perú','Colombia']}
    ], 8)
  };

  var LENGUA = {
    '🔤 Letras y Sílabas': banco([
      {p:'¿Con qué letra empieza "casa"?',c:'C',opts:['C','K','S','Z']},
      {p:'¿Cuántas sílabas tiene "mariposa"?',c:'4',opts:['4','3','5','2']},
      {p:'¿Qué letra suena igual que "ll"?',c:'Y',opts:['Y','V','H','J']},
      {p:'¿Cuál es una vocal?',c:'A',opts:['A','B','C','D']},
      {p:'¿Qué palabra rima con "sol"?',c:'Col',opts:['Col','Luna','Mar','Flor']},
      {p:'¿Cuántas letras tiene el abecedario (sin ll ni ch)?',c:'27',opts:['27','20','30','24']},
      {p:'¿Con qué letra termina "corazón"?',c:'N',opts:['N','M','S','L']},
      {p:'¿Qué es una sílaba?',c:'Pedazo de palabra con un sonido',opts:['Pedazo de palabra con un sonido','Una letra','Una oración','Un signo']}
    ], 8),
    '📝 Gramática y Ortografía': banco([
      {p:'¿Cuál es un sustantivo?',c:'Casa',opts:['Casa','Correr','Grande','Rápidamente']},
      {p:'¿Cuál es un verbo?',c:'Comer',opts:['Comer','Perro','Feliz','Ahora']},
      {p:'¿Cuál es un adjetivo?',c:'Grande',opts:['Grande','Mesa','Saltar','Hoy']},
      {p:'¿Qué signo cierra una pregunta?',c:'?',opts:['?','!','.',';']},
      {p:'¿Qué palabra está bien escrita?',c:'Casa',opts:['Casa','Kasa','Caza','Cassa']},
      {p:'¿Qué es un sinónimo de "feliz"?',c:'Contento',opts:['Contento','Triste','Enojado','Cansado']},
      {p:'¿Qué es un antónimo de "grande"?',c:'Chico',opts:['Chico','Enorme','Gigante','Alto']},
      {p:'¿Qué es un adverbio?',c:'Rápidamente',opts:['Rápidamente','Perro','Comer','Bonito']}
    ], 8),
    '📚 Literatura y Lectura': banco([
      {p:'¿Quién escribió Don Quijote?',c:'Cervantes',opts:['Cervantes','Shakespeare','Borges','Dante']},
      {p:'¿Personaje de un libro con capa y espada?',c:'El Zorro',opts:['El Zorro','Caperucita','Blancanieves','Peter Pan']},
      {p:'¿Quién escribió "El principito"?',c:'Saint-Exupéry',opts:['Saint-Exupéry','Cervantes','García Márquez','Borges']},
      {p:'¿Qué es una fábula?',c:'Cuento con animales y enseñanza',opts:['Cuento con animales y enseñanza','Un poema','Una noticia','Una receta']},
      {p:'¿Quién escribió "Martín Fierro"?',c:'José Hernández',opts:['José Hernández','Borges','Alfonsina','Sarmiento']},
      {p:'¿Qué es un poema?',c:'Texto con ritmo y rima',opts:['Texto con ritmo y rima','Una receta','Una noticia','Un cuento largo']},
      {p:'¿Personaje que vive en Neverland?',c:'Peter Pan',opts:['Peter Pan','Harry Potter','Matilda','Pinocho']},
      {p:'¿Qué es un cuento?',c:'Historia corta con personajes',opts:['Historia corta con personajes','Un diccionario','Una enciclopedia','Un mapa']}
    ], 8)
  };

  var SOCIALES = {
    '🏛️ Comunidad y Gobierno': banco([
      {p:'¿Quién elige al presidente en Argentina?',c:'El pueblo vota',opts:['El pueblo vota','Lo elige el ejército','Lo elige la reina','Nadie']},
      {p:'¿Qué es una ley?',c:'Regla que todos debemos cumplir',opts:['Regla que todos debemos cumplir','Un cuento','Un juego','Una canción']},
      {p:'¿Qué hace un juez?',c:'Hace cumplir las leyes',opts:['Hace cumplir las leyes','Cura enfermos','Enseña','Cocina']},
      {p:'¿Qué es la democracia?',c:'Gobierno elegido por el pueblo',opts:['Gobierno elegido por el pueblo','Rey que manda','Ejército que manda','Nadie manda']},
      {p:'¿Qué es un ciudadano?',c:'Persona que vive en un país y tiene derechos',opts:['Persona que vive en un país y tiene derechos','Un turista','Un animal','Un edificio']},
      {p:'¿Qué es un impuesto?',c:'Dinero que pagamos para servicios públicos',opts:['Dinero que pagamos para servicios públicos','Un regalo','Una multa','Un préstamo']},
      {p:'¿Qué es el Congreso?',c:'Lugar donde se hacen las leyes',opts:['Lugar donde se hacen las leyes','Un hospital','Una escuela','Un estadio']},
      {p:'¿Cuál es la Casa Rosada?',c:'Casa de gobierno argentina',opts:['Casa de gobierno argentina','Un museo','Un teatro','Un hospital']}
    ], 8),
    '🤝 Derechos y Valores': banco([
      {p:'¿Todos los niños tienen derecho a...?',c:'Estudiar',opts:['Estudiar','Trabajar','No jugar','No comer']},
      {p:'¿Qué es la igualdad?',c:'Todos valemos lo mismo',opts:['Todos valemos lo mismo','Unos valen más','Solo los grandes mandan','Solo los chicos mandan']},
      {p:'¿Qué es la solidaridad?',c:'Ayudar a los demás',opts:['Ayudar a los demás','Pensar solo en uno','No ayudar','Gritar']},
      {p:'¿Qué es el respeto?',c:'Tratar bien a los demás',opts:['Tratar bien a los demás','Insultar','Pegar','Ignorar']},
      {p:'¿Qué es la libertad?',c:'Poder elegir sin dañar',opts:['Poder elegir sin dañar','Hacer lo que quieras siempre','No hacer nada','Mandar a todos']},
      {p:'¿Qué es la tolerancia?',c:'Aceptar a los diferentes',opts:['Aceptar a los diferentes','Rechazar a los diferentes','Gritar','Pelear']},
      {p:'¿Qué es la justicia?',c:'Dar a cada uno lo que le corresponde',opts:['Dar a cada uno lo que le corresponde','Robar','Mentir','Tratar mal']},
      {p:'¿Qué es la paz?',c:'Vivir sin violencia',opts:['Vivir sin violencia','Guerra','Peleas','Gritos']}
    ], 8),
    '🇦🇷 Cultura Argentina': banco([
      {p:'¿Qué es el tango?',c:'Música y baile de Buenos Aires',opts:['Música y baile de Buenos Aires','Un deporte','Una comida','Un idioma']},
      {p:'¿Qué es el asado?',c:'Carne a la parrilla',opts:['Carne a la parrilla','Una bebida','Un baile','Un deporte']},
      {p:'¿Qué es la empanada?',c:'Tapa rellena horneada o frita',opts:['Tapa rellena horneada o frita','Una bebida','Un postre','Una fruta']},
      {p:'¿Quién fue San Martín?',c:'Libertador de Argentina',opts:['Libertador de Argentina','Un rey','Un músico','Un deportista']},
      {p:'¿Qué es el mate?',c:'Bebida tradicional con yerba',opts:['Bebida tradicional con yerba','Una comida','Un deporte','Un baile']},
      {p:'¿Qué es el dulce de leche?',c:'Dulce de leche tradicional',opts:['Dulce de leche tradicional','Una fruta','Una verdura','Una bebida']},
      {p:'¿Qué es la fiesta de la primavera?',c:'21 de septiembre',opts:['21 de septiembre','25 de mayo','9 de julio','1 de enero']},
      {p:'¿Qué es el gaucho?',c:'Campesino argentino de la pampa',opts:['Campesino argentino de la pampa','Un rey','Un pirata','Un astronauta']}
    ], 8)
  };

  var MUSICA = {
    '🎵 Notas y Ritmo': banco([
      {p:'¿Cuántas notas musicales hay?',c:'7',opts:['7','5','10','12']},
      {p:'¿Cuál es la primera nota?',c:'Do',opts:['Do','Re','Mi','Sol']},
      {p:'¿Qué nota viene después de Do?',c:'Re',opts:['Re','Mi','Fa','Si']},
      {p:'¿Qué es un compás?',c:'Grupo de tiempos',opts:['Grupo de tiempos','Una nota','Un instrumento','Una canción']},
      {p:'¿Qué es el ritmo?',c:'Patrón de sonidos en el tiempo',opts:['Patrón de sonidos en el tiempo','Un color','Un olor','Una textura']},
      {p:'¿Qué es una escala?',c:'Notas en orden ascendente',opts:['Notas en orden ascendente','Un instrumento','Una canción','Un baile']},
      {p:'¿Qué nota es la más aguda?',c:'Si',opts:['Si','Do','Mi','Sol']},
      {p:'¿Qué es un silencio en música?',c:'Momento sin sonido',opts:['Momento sin sonido','Una nota alta','Un instrumento','Una canción']}
    ], 8),
    '🎺 Instrumentos': banco([
      {p:'¿Cuál es de cuerda?',c:'Guitarra',opts:['Guitarra','Flauta','Trompeta','Batería']},
      {p:'¿Cuál es de viento?',c:'Flauta',opts:['Flauta','Violín','Piano','Batería']},
      {p:'¿Cuál es de percusión?',c:'Batería',opts:['Batería','Guitarra','Violín','Flauta']},
      {p:'¿Qué instrumento tiene teclas blancas y negras?',c:'Piano',opts:['Piano','Guitarra','Violín','Trompeta']},
      {p:'¿Qué instrumento se toca con arco?',c:'Violín',opts:['Violín','Piano','Flauta','Batería']},
      {p:'¿Cuál es el instrumento nacional argentino?',c:'Bandoneón (tango)',opts:['Bandoneón (tango)','Guitarra','Piano','Flauta']},
      {p:'¿Qué instrumento es de metal?',c:'Trompeta',opts:['Trompeta','Guitarra','Violín','Piano']},
      {p:'¿Qué instrumento tiene 6 cuerdas?',c:'Guitarra',opts:['Guitarra','Violín','Bajo','Arpa']}
    ], 8),
    '🎼 Compositores y Géneros': banco([
      {p:'¿Quién fue Mozart?',c:'Compositor austriaco niño prodigio',opts:['Compositor austriaco niño prodigio','Un rey','Un pintor','Un atleta']},
      {p:'¿Quién fue Beethoven?',c:'Compositor alemán sordo',opts:['Compositor alemán sordo','Un pintor','Un científico','Un rey']},
      {p:'¿Qué género nació en Nueva Orleans?',c:'Jazz',opts:['Jazz','Tango','Rock','Clásica']},
      {p:'¿Qué género es argentino?',c:'Tango',opts:['Tango','Salsa','Reggae','Rock']},
      {p:'¿Qué género usa guitarra eléctrica y batería fuerte?',c:'Rock',opts:['Rock','Clásica','Jazz','Tango']},
      {p:'¿Quién compuso "Las cuatro estaciones"?',c:'Vivaldi',opts:['Vivaldi','Mozart','Beethoven','Bach']},
      {p:'¿Qué es una orquesta?',c:'Grupo de muchos instrumentos',opts:['Grupo de muchos instrumentos','Un solo músico','Un teatro','Un estadio']},
      {p:'¿Qué es un coro?',c:'Grupo de personas que cantan juntas',opts:['Grupo de personas que cantan juntas','Un instrumento','Un baile','Un pintor']}
    ], 8)
  };

  var HISTORIA = {
    '🦴 Prehistoria': banco([
      {p:'¿Cómo se llaman los primeros humanos?',c:'Hominidos',opts:['Hominidos','Romanos','Egipcios','Griegos']},
      {p:'¿Qué usaban para cazar?',c:'Piedras y palos',opts:['Piedras y palos','Espadas','Pistolas','Arcos de metal']},
      {p:'¿Qué descubrieron con el fuego?',c:'Cocinar la comida',opts:['Cocinar la comida','Nada','Construir autos','Escribir']},
      {p:'¿Qué es una cueva con pinturas?',c:'Cueva de Altamira/Lascaux',opts:['Cueva de Altamira/Lascaux','Un museo','Un castillo','Una pirámide']},
      {p:'¿Qué eran los dinosaurios para ellos?',c:'No existían con los humanos',opts:['No existían con los humanos','Los montaban','Los domesticaban','Los comían siempre']},
      {p:'¿Qué era la Edad de Piedra?',c:'Usaban herramientas de piedra',opts:['Usaban herramientas de piedra','Usaban metal','Usaban plástico','Usaban electricidad']},
      {p:'¿Qué es un fósil?',c:'Restos de seres antiguos',opts:['Restos de seres antiguos','Una joya','Una moneda','Un libro']},
      {p:'¿Cómo se llamaba el hombre de Neandertal?',c:'Neandertal',opts:['Neandertal','Romano','Egipcio','Griego']}
    ], 8),
    '🏛️ Antigüedad (Egipto, Grecia, Roma)': banco([
      {p:'¿Dónde están las pirámides?',c:'Egipto',opts:['Egipto','Grecia','Roma','China']},
      {p:'¿Qué era un faraón?',c:'Rey de Egipto',opts:['Rey de Egipto','Un dios griego','Un emperador romano','Un filósofo']},
      {p:'¿Quién era Zeus?',c:'Rey de los dioses griegos',opts:['Rey de los dioses griegos','Un faraón','Un emperador romano','Un científico']},
      {p:'¿Qué era el Coliseo?',c:'Anfiteatro romano',opts:['Anfiteatro romano','Un templo griego','Una pirámide','Un castillo']},
      {p:'¿Quién escribió la Ilíada?',c:'Homero',opts:['Homero','Platón','Aristóteles','César']},
      {p:'¿Qué era una momia?',c:'Cuerpo egipcio preservado',opts:['Cuerpo egipcio preservado','Un dios','Un emperador','Un filósofo']},
      {p:'¿Qué ciudad tenía la Acrópolis?',c:'Atenas',opts:['Atenas','Roma','Alejandría','Esparta']},
      {p:'¿Quién fue Julio César?',c:'Emperador romano',opts:['Emperador romano','Un faraón','Un dios griego','Un filósofo']}
    ], 8),
    '⚔️ Edad Media': banco([
      {p:'¿Quiénes vivían en castillos?',c:'Reyes y nobles',opts:['Reyes y nobles','Campesinos','Esclavos','Animales']},
      {p:'¿Qué era un caballero?',c:'Guerrero con armadura',opts:['Guerrero con armadura','Un rey','Un campesino','Un sacerdote']},
      {p:'¿Qué eran las Cruzadas?',c:'Guerras por Tierra Santa',opts:['Guerras por Tierra Santa','Fiestas','Juegos','Viajes de placer']},
      {p:'¿Qué fue la Peste Negra?',c:'Enfermedad que mató a muchos',opts:['Enfermedad que mató a muchos','Una fiesta','Un juego','Un libro']},
      {p:'¿Qué era un siervo?',c:'Campesino atado a la tierra',opts:['Campesino atado a la tierra','Un rey','Un caballero','Un sacerdote']},
      {p:'¿Qué era un monasterio?',c:'Lugar de monjes',opts:['Lugar de monjes','Un castillo','Una tienda','Un estadio']},
      {p:'¿Qué era un gremio?',c:'Asociación de oficios',opts:['Asociación de oficios','Un ejército','Un rey','Un castillo']},
      {p:'¿Quién fue Carlomagno?',c:'Emperador del Sacro Imperio',opts:['Emperador del Sacro Imperio','Un faraón','Un dios griego','Un científico']}
    ], 8),
    '🇦🇷 Historia Argentina': banco([
      {p:'¿Qué pasó el 25 de mayo de 1810?',c:'Primera Junta de Gobierno',opts:['Primera Junta de Gobierno','Independencia','Batalla de San Lorenzo','Creación de bandera']},
      {p:'¿Qué pasó el 9 de julio de 1816?',c:'Declaración de Independencia',opts:['Declaración de Independencia','25 de mayo','Llegada de Colón','Creación de bandera']},
      {p:'¿Quién creó la bandera argentina?',c:'Belgrano',opts:['Belgrano','San Martín','Sarmiento','Rivadavia']},
      {p:'¿Quién fue el Libertador?',c:'San Martín',opts:['San Martín','Belgrano','Sarmiento','Rosas']},
      {p:'¿Qué fue la Conquista del Desierto?',c:'Campaña a la Patagonia',opts:['Campaña a la Patagonia','Independencia','Guerra con Brasil','Revolución de mayo']},
      {p:'¿Quién fue Sarmiento?',c:'Presidente que impulsó la educación',opts:['Presidente que impulsó la educación','Un militar','Un científico','Un pintor']},
      {p:'¿Qué fue la Generación del 80?',c:'Época de inmigración',opts:['Época de inmigración','Prehistoria','Edad Media','Antigüedad']},
      {p:'¿Qué se celebra el 21 de septiembre?',c:'Primavera y día del estudiante',opts:['Primavera y día del estudiante','Independencia','25 de mayo','9 de julio']}
    ], 8)
  };

  var LOGICA_BANCO = {
    1: [qc('¿Qué sigue? 🔴🔵🔴🔵?','🔴',['🔴','🔵','🟢','🟡']), qc('¿Qué sigue? 🍎🍎🍌🍎🍎?','🍌',['🍌','🍎','🍇','🍊']), qc('¿Cuál es diferente? 🐶🐶🐱🐶','🐱',['🐱','🐶','🐶','🐶']), qc('2,4,6,? ¿qué sigue?','8',['8','7','9','10']), qc('Si tengo 3 manzanas y como 1, ¿cuántas quedan?','2',['2','3','1','4']), qc('¿Cuál pesa más? 1 kg de plumas o 1 kg de piedras','Igual',['Igual','Plumas','Piedras','No sé'])],
    2: [qc('¿Qué se moja al secar?','Una toalla',['Una toalla','El sol','El fuego','Una piedra']), qc('¿Qué tiene cuello pero no cabeza?','Una botella',['Una botella','Un perro','Un árbol','Una mesa']), qc('¿Cuántos meses tienen 28 días?','Todos',['Todos','1','2','Ninguno']), qc('¿Qué sube pero no baja?','La edad',['La edad','Un ascensor','Una pelota','Un pájaro']), qc('Si 5 máquinas hacen 5 artículos en 5 min, 100 máquinas hacen 100 en?','5 min',['5 min','100 min','20 min','50 min']), qc('¿Cuánto es la mitad de 2 más 2?','3',['3','2','4','5'])],
    3: [qc('Tres gatos en 3 min atrapan 3 ratones. ¿Cuántos para 100 ratones en 100 min?','3',['3','100','33','10']), qc('¿Qué número multiplicado por sí mismo da 49?','7',['7','6','8','9']), qc('¿Cuál es el próximo? 1,1,2,3,5,8,?','13',['13','10','11','12']), qc('¿Qué es lógicamente imposible?','Un cuadrado redondo',['Un cuadrado redondo','Un perro negro','Un día lluvioso','Un gato blanco']), qc('Si todos los gatos son animales y algunos animales vuelan, ¿algunos gatos vuelan?','No se puede saber',['No se puede saber','Sí','No','Ninguno']), qc('¿Qué es un silogismo?','Razonamiento de dos premisas',['Razonamiento de dos premisas','Un error','Un premio','Un juego'])]
  };
  function genLogica(nivel) { return barajar(LOGICA_BANCO[Math.min(nivel, 3)]).slice(0, 8); }

  var EMOCIONES = {
    '😊 Sentimientos': banco([
      {p:'¿Qué sentís cuando ganás un juego?',c:'Alegría',opts:['Alegría','Tristeza','Miedo','Enojo']},
      {p:'¿Qué sentís cuando perdés un ser querido?',c:'Tristeza',opts:['Tristeza','Alegría','Sorpresa','Calma']},
      {p:'¿Qué sentís antes de un examen?',c:'Nervios',opts:['Nervios','Alegría','Calma','Aburrimiento']},
      {p:'¿Qué sentís cuando alguien te ayuda?',c:'Gratitud',opts:['Gratitud','Enojo','Tristeza','Miedo']},
      {p:'¿Qué sentís en la oscuridad?',c:'Miedo (a veces)',opts:['Miedo (a veces)','Alegría','Calma','Aburrimiento']},
      {p:'¿Qué sentís cuando cumplís un objetivo?',c:'Satisfacción',opts:['Satisfacción','Tristeza','Miedo','Enojo']},
      {p:'¿Qué es la empatía?',c:'Ponerte en el lugar del otro',opts:['Ponerte en el lugar del otro','Gritar','Pegar','Ignorar']},
      {p:'¿Qué es la autoestima?',c:'Quererte a vos mismo',opts:['Quererte a vos mismo','Odiarte','No comer','No jugar']}
    ], 8),
    '🤝 Valores y Convivencia': banco([
      {p:'¿Qué hacés si un amigo está triste?',c:'Lo acompañás',opts:['Lo acompañás','Te reís de él','Lo ignorás','Te vas']},
      {p:'¿Qué es la amistad?',c:'Querer y respetar a un amigo',opts:['Querer y respetar a un amigo','Pelear siempre','Robar sus cosas','Ignorarlo']},
      {p:'¿Qué es el perdón?',c:'Dejar de guardar rencor',opts:['Dejar de guardar rencor','Pegar','Gritar','No hablar más']},
      {p:'¿Qué es la honestidad?',c:'Decir la verdad',opts:['Decir la verdad','Mentir','Robar','Trampa']},
      {p:'¿Qué es la generosidad?',c:'Compartir con los demás',opts:['Compartir con los demás','Guardar todo','No compartir','Robar']},
      {p:'¿Qué es la paciencia?',c:'Esperar sin enojarse',opts:['Esperar sin enojarse','Gritar','Llorar','Pegar']},
      {p:'¿Qué es el esfuerzo?',c:'Trabajar para lograr algo',opts:['Trabajar para lograr algo','No hacer nada','Tirar todo','Mentir']},
      {p:'¿Qué es la humildad?',c:'No creerte mejor que nadie',opts:['No creerte mejor que nadie','Creer que sos el mejor','Menospreciar','Gritar']}
    ], 8)
  };

  var DEPORTES = {
    '⚽ Fútbol': banco([
      {p:'¿Cuántos jugadores por equipo en cancha?',c:'11',opts:['11','10','9','12']},
      {p:'¿Cuánto dura un partido (dos tiempos)?',c:'90 minutos',opts:['90 minutos','60','45','120']},
      {p:'¿Qué jugador no puede tocar la pelota con la mano?',c:'Todos menos el arquero',opts:['Todos menos el arquero','El arquero','El capitán','Nadie']},
      {p:'¿Qué es un penal?',c:'Falta dentro del área',opts:['Falta dentro del área','Un gol','Un saque','Un cambio']},
      {p:'¿Qué es fuera de juego?',c:'Jugador más cerca del arco que el defensor',opts:['Jugador más cerca del arco que el defensor','Un gol','Un penal','Un cambio']},
      {p:'¿Quién ganó el Mundial 2022?',c:'Argentina',opts:['Argentina','Francia','Brasil','Alemania']},
      {p:'¿Qué es un hat-trick?',c:'3 goles en un partido',opts:['3 goles en un partido','1 gol','2 goles','5 goles']},
      {p:'¿Qué país inventó el fútbol moderno?',c:'Inglaterra',opts:['Inglaterra','Brasil','Argentina','Italia']}
    ], 8),
    '🏅 Olimpiadas y Deportes': banco([
      {p:'¿Cada cuántos años son los Juegos Olímpicos?',c:'4',opts:['4','2','5','10']},
      {p:'¿Qué deporte usa red y raqueta en cancha de césped?',c:'Tenis',opts:['Tenis','Fútbol','Básquet','Natación']},
      {p:'¿En qué deporte se clava en una piscina?',c:'Natación/clavados',opts:['Natación/clavados','Fútbol','Tenis','Ajedrez']},
      {p:'¿Qué deporte encesta en un aro alto?',c:'Básquet',opts:['Básquet','Fútbol','Tenis','Golf']},
      {p:'¿Qué deporte se juega con balón ovalado?',c:'Rugby',opts:['Rugby','Fútbol','Tenis','Vóley']},
      {p:'¿Qué deporte se juega en el hielo con palos?',c:'Hockey sobre hielo',opts:['Hockey sobre hielo','Fútbol','Tenis','Natación']},
      {p:'¿Qué es un maratón?',c:'Carrera de 42 km',opts:['Carrera de 42 km','Una natación','Un partido','Un torneo']},
      {p:'¿Qué es el atletismo?',c:'Carreras, saltos y lanzamientos',opts:['Carreras, saltos y lanzamientos','Un deporte de pelota','Un juego de mesa','Natación solo']}
    ], 8)
  };

  var SALUD = {
    '🍎 Alimentación': banco([
      {p:'¿Qué es más sano?',c:'Fruta',opts:['Fruta','Golosinas','Gaseosa','Papas fritas']},
      {p:'¿Cuántos vasos de agua tomar al día?',c:'6 a 8',opts:['6 a 8','1','20','0']},
      {p:'¿Qué alimento tiene calcio para los huesos?',c:'Leche y yogur',opts:['Leche y yogur','Gaseosa','Caramelo','Papas fritas']},
      {p:'¿Qué es la pirámide nutricional?',c:'Guía de qué comer',opts:['Guía de qué comer','Un edificio','Un juego','Un deporte']},
      {p:'¿Qué verdura es naranja y buena para la vista?',c:'Zanahoria',opts:['Zanahoria','Papa','Cebolla','Lechuga']},
      {p:'¿Qué es mejor para desayunar?',c:'Lácteos + cereales + fruta',opts:['Lácteos + cereales + fruta','Solo gaseosa','Solo golosinas','Nada']},
      {p:'¿Qué alimento tiene proteína?',c:'Carne, huevo, legumbres',opts:['Carne, huevo, legumbres','Azúcar','Gaseosa','Agua']},
      {p:'¿Qué es la obesidad infantil?',c:'Exceso de peso por mala alimentación',opts:['Exceso de peso por mala alimentación','Estar delgado','Ser alto','Ser fuerte']}
    ], 8),
    '🦷 Higiene y Cuerpo': banco([
      {p:'¿Cuántas veces cepillarse los dientes al día?',c:'3 (después de cada comida)',opts:['3 (después de cada comida)','1','0','10']},
      {p:'¿Cuánto dura un cepillado?',c:'2-3 minutos',opts:['2-3 minutos','10 segundos','10 minutos','1 hora']},
      {p:'¿Cuándo lavarse las manos?',c:'Antes de comer y después del baño',opts:['Antes de comer y después del baño','Nunca','Solo de noche','Solo si están sucias a la vista']},
      {p:'¿Cuántas horas debe dormir un niño?',c:'9 a 11',opts:['9 a 11','4','20','5']},
      {p:'¿Qué es un microbio?',c:'Ser microscópico que puede enfermar',opts:['Ser microscópico que puede enfermar','Un animal grande','Una planta','Un juguete']},
      {p:'¿Qué hace una vacuna?',c:'Previene enfermedades',opts:['Previene enfermedades','Enferma','No hace nada','Cura todo al instante']},
      {p:'¿Qué es la fiebre?',c:'Defensa del cuerpo ante infección',opts:['Defensa del cuerpo ante infección','Una fruta','Un juego','Un deporte']},
      {p:'¿Qué hacer si te quemás?',c:'Agua fría y avisar a un adulto',opts:['Agua fría y avisar a un adulto','Untar mantequilla','No hacer nada','Rompés la ampolla']}
    ], 8)
  };

  var ARTE = {
    '🎨 Colores y Técnicas': banco([
      {p:'¿Cuáles son los colores primarios?',c:'Rojo, amarillo, azul',opts:['Rojo, amarillo, azul','Verde, naranja, violeta','Blanco, negro, gris','Rosa, celeste, marrón']},
      {p:'¿Qué color da rojo + amarillo?',c:'Naranja',opts:['Naranja','Verde','Violeta','Marrón']},
      {p:'¿Qué color da azul + amarillo?',c:'Verde',opts:['Verde','Naranja','Violeta','Rosa']},
      {p:'¿Qué es una escultura?',c:'Arte en 3 dimensiones',opts:['Arte en 3 dimensiones','Una pintura','Un dibujo','Una foto']},
      {p:'¿Qué es un mural?',c:'Pintura en pared grande',opts:['Pintura en pared grande','Un cuadro chico','Un dibujo en papel','Una foto']},
      {p:'¿Qué es la acuarela?',c:'Pintura con agua',opts:['Pintura con agua','Pintura con aceite','Pintura con crayón','Escultura']},
      {p:'¿Qué es el óleo?',c:'Pintura con aceite',opts:['Pintura con aceite','Pintura con agua','Dibujo con lápiz','Fotografía']},
      {p:'¿Qué es un boceto?',c:'Dibujo rápido y preliminar',opts:['Dibujo rápido y preliminar','Una pintura terminada','Una escultura','Una foto']}
    ], 8),
    '🖼️ Pintores y Obras': banco([
      {p:'¿Quién pintó la Gioconda (Mona Lisa)?',c:'Leonardo da Vinci',opts:['Leonardo da Vinci','Van Gogh','Picasso','Dalí']},
      {p:'¿Quién pintó "La noche estrellada"?',c:'Van Gogh',opts:['Van Gogh','Da Vinci','Picasso','Miró']},
      {p:'¿Quién pintó "Guernica"?',c:'Picasso',opts:['Picasso','Van Gogh','Da Vinci','Dalí']},
      {p:'¿Quién pintó los relojes blandos?',c:'Dalí',opts:['Dalí','Picasso','Van Gogh','Da Vinci']},
      {p:'¿Qué estilo es de Picasso?',c:'Cubismo',opts:['Cubismo','Impresionismo','Surrealismo','Renacimiento']},
      {p:'¿Qué estilo es de Dalí?',c:'Surrealismo',opts:['Surrealismo','Cubismo','Impresionismo','Renacimiento']},
      {p:'¿Qué estilo es de Monet?',c:'Impresionismo',opts:['Impresionismo','Cubismo','Surrealismo','Renacimiento']},
      {p:'¿Quién fue Miguel Ángel?',c:'Escultor y pintor del Renacimiento',opts:['Escultor y pintor del Renacimiento','Un rey','Un científico','Un músico']}
    ], 8)
  };

  var MITOLOGIA = {
    '🏛️ Griega y Romana': banco([
      {p:'¿Rey de los dioses griegos?',c:'Zeus',opts:['Zeus','Apolo','Ares','Hermes']},
      {p:'¿Diosa del amor?',c:'Afrodita',opts:['Afrodita','Atenea','Artemisa','Hera']},
      {p:'¿Dios del mar?',c:'Poseidón',opts:['Poseidón','Zeus','Hades','Apolo']},
      {p:'¿Dios del inframundo?',c:'Hades',opts:['Hades','Zeus','Poseidón','Ares']},
      {p:'¿Héroe que mató al Minotauro?',c:'Teseo',opts:['Teseo','Hércules','Perseo','Aquiles']},
      {p:'¿Héroe con 12 trabajos?',c:'Hércules',opts:['Hércules','Teseo','Perseo','Odiseo']},
      {p:'¿Caballo alado?',c:'Pegaso',opts:['Pegaso','Centauro','Minotauro','Quimera']},
      {p:'¿Mujer con serpientes en el pelo?',c:'Medusa',opts:['Medusa','Afrodita','Atenea','Artemisa']}
    ], 8),
    '🐉 Otras Mitologías': banco([
      {p:'¿Dios egipcio del sol?',c:'Ra',opts:['Ra','Osiris','Anubis','Horus']},
      {p:'¿Dios egipcio de los muertos?',c:'Anubis',opts:['Anubis','Ra','Osiris','Isis']},
      {p:'¿Dios nórdico del trueno?',c:'Thor',opts:['Thor','Odín','Loki','Frey']},
      {p:'¿Rey de los dioses nórdicos?',c:'Odín',opts:['Odín','Thor','Loki','Tyr']},
      {p:'¿Serpiente emplumada azteca?',c:'Quetzalcóatl',opts:['Quetzalcóatl','Huitzilopochtli','Tlaloc','Tezcatlipoca']},
      {p:'¿Ciudad perdida incas?',c:'Machu Picchu',opts:['Machu Picchu','Teotihuacán','Chichén Itzá','Tikal']},
      {p:'¿Pirámide maya de Chichén Itzá dedicada a?',c:'Kukulkán',opts:['Kukulkán','Ra','Zeus','Odín']},
      {p:'¿Monstruo escandinavo del fin del mundo?',c:'Jörmundgander (serpiente)',opts:['Jörmundgander (serpiente)','Minotauro','Medusa','Cíclope']}
    ], 8)
  };

  var PROFESIONES = {
    '👨‍🚀 Profesiones': banco([
      {p:'¿Quién cura enfermos?',c:'Médico',opts:['Médico','Policía','Carpintero','Panadero']},
      {p:'¿Quién enseña en la escuela?',c:'Maestro',opts:['Maestro','Médico','Bombero','Pescador']},
      {p:'¿Quién apaga incendios?',c:'Bombero',opts:['Bombero','Policía','Médico','Cocinero']},
      {p:'¿Quién cuida la seguridad?',c:'Policía',opts:['Policía','Panadero','Carpintero','Músico']},
      {p:'¿Quién hace pan?',c:'Panadero',opts:['Panadero','Carnicero','Pescador','Florista']},
      {p:'¿Quién repara cañerías?',c:'Plomero',opts:['Plomero','Electricista','Carpintero','Albañil']},
      {p:'¿Quién repara cables de luz?',c:'Electricista',opts:['Electricista','Plomero','Carpintero','Panadero']},
      {p:'¿Quién va al espacio?',c:'Astronauta',opts:['Astronauta','Piloto','Marinero','Científico']}
    ], 8),
    '🌟 Profesiones del Futuro': banco([
      {p:'¿Quién programa robots?',c:'Ingeniero robótico',opts:['Ingeniero robótico','Panadero','Carpintero','Plomero']},
      {p:'¿Quién crea videojuegos?',c:'Desarrollador de juegos',opts:['Desarrollador de juegos','Panadero','Carnicero','Florista']},
      {p:'¿Quién diseña casas?',c:'Arquitecto',opts:['Arquitecto','Plomero','Electricista','Panadero']},
      {p:'¿Quién estudia el clima?',c:'Meteorólogo',opts:['Meteorólogo','Panadero','Carpintero','Pescador']},
      {p:'¿Quién protege datos en internet?',c:'Experto en ciberseguridad',opts:['Experto en ciberseguridad','Panadero','Carnicero','Florista']},
      {p:'¿Quién crea inteligencia artificial?',c:'Científico de IA',opts:['Científico de IA','Panadero','Plomero','Electricista']},
      {p:'¿Quién diseña ropa?',c:'Diseñador de moda',opts:['Diseñador de moda','Panadero','Carpintero','Pescador']},
      {p:'¿Quién hace películas animadas?',c:'Animador 3D',opts:['Animador 3D','Panadero','Plomero','Carnicero']}
    ], 8)
  };

  var COCINA = {
    '🍳 Alimentos y Utensilios': banco([
      {p:'¿De dónde viene la leche?',c:'De la vaca (u otros animales)',opts:['De la vaca (u otros animales)','Del árbol','De la piedra','Del agua']},
      {p:'¿Qué utensilio corta?',c:'Cuchillo',opts:['Cuchillo','Cuchara','Tenedor','Plato']},
      {p:'¿Qué utensilio mezcla?',c:'Cuchara',opts:['Cuchara','Cuchillo','Tenedor','Plato']},
      {p:'¿Qué electrodoméstico enfría?',c:'Heladera',opts:['Heladera','Horno','Microondas','Cocina']},
      {p:'¿Qué electrodoméstico calienta rápido?',c:'Microondas',opts:['Microondas','Heladera','Freezer','Lavarropas']},
      {p:'¿Qué es un horno?',c:'Aparato para cocinar con calor',opts:['Aparato para cocinar con calor','Un refrigerador','Una cuchara','Un plato']},
      {p:'¿Qué alimento es un cereal?',c:'Trigo/arroz/maíz',opts:['Trigo/arroz/maíz','Leche','Carne','Agua']},
      {p:'¿Qué es una receta?',c:'Instrucciones para cocinar',opts:['Instrucciones para cocinar','Un juego','Un deporte','Una canción']}
    ], 8),
    '🥘 Recetas y Nutrición': banco([
      {p:'¿Qué lleva una ensalada básica?',c:'Lechuga, tomate, zanahoria',opts:['Lechuga, tomate, zanahoria','Caramelo, gaseosa, chocolate','Piedras, palos, tierra','Papel, plástico, vidrio']},
      {p:'¿Qué es un pastel?',c:'Harina, huevos, azúcar horneados',opts:['Harina, huevos, azúcar horneados','Agua y sal','Carne y papas','Solo leche']},
      {p:'¿Qué es un puré de papas?',c:'Papas hervidas pisadas',opts:['Papas hervidas pisadas','Papas fritas','Papas crudas','Papas dulces']},
      {p:'¿Qué es una tortilla?',c:'Huevos batidos cocinados',opts:['Huevos batidos cocinados','Un pan dulce','Una gaseosa','Un caramelo']},
      {p:'¿Qué es el desayuno?',c:'Primera comida del día',opts:['Primera comida del día','Última comida','No comer','Solo agua']},
      {p:'¿Qué es la merienda?',c:'Comida de la tarde',opts:['Comida de la tarde','Desayuno','Almuerzo','Cena']},
      {p:'¿Qué es la cena?',c:'Última comida del día',opts:['Última comida del día','Desayuno','Almuerzo','Merienda']},
      {p:'¿Qué es un ingrediente?',c:'Cada cosa que lleva una receta',opts:['Cada cosa que lleva una receta','Un utensilio','Un electrodoméstico','Un juego']}
    ], 8)
  };

  var ASTRONOMIA = {
    '🔭 Estrellas y Galaxias': banco([
      {p:'¿Qué es una estrella?',c:'Bola de gas muy caliente',opts:['Bola de gas muy caliente','Un planeta','Una luna','Un cometa']},
      {p:'¿Qué galaxia habitamos?',c:'Vía Láctea',opts:['Vía Láctea','Andrómeda','Sombrero','Triángulo']},
      {p:'¿Qué es un agujero negro?',c:'Lugar donde nada escapa, ni la luz',opts:['Lugar donde nada escapa, ni la luz','Una estrella','Un planeta','Una luna']},
      {p:'¿Qué es una constelación?',c:'Grupo de estrellas con forma',opts:['Grupo de estrellas con forma','Un planeta','Un cometa','Una luna']},
      {p:'¿Qué es un año luz?',c:'Distancia que recorre la luz en un año',opts:['Distancia que recorre la luz en un año','Un año en otro planeta','Un año en el sol','Un mes']},
      {p:'¿Qué es un cometa?',c:'Bola de hielo y roca con cola',opts:['Bola de hielo y roca con cola','Una estrella','Un planeta','Una luna']},
      {p:'¿Qué es un meteoro?',c:'Roca que se quema al entrar a la atmósfera',opts:['Roca que se quema al entrar a la atmósfera','Un planeta','Una estrella','Una luna']},
      {p:'¿Qué es la luz que vemos de las estrellas?',c:'Luz de hace años',opts:['Luz de hace años','Luz de ahora','Luz del sol','Luz de la luna']}
    ], 8),
    '🚀 Exploración Espacial': banco([
      {p:'¿Primer hombre en la luna?',c:'Neil Armstrong',opts:['Neil Armstrong','Buzz Aldrin','Yuri Gagarin','Elon Musk']},
      {p:'¿Primer ser humano en el espacio?',c:'Yuri Gagarin',opts:['Yuri Gagarin','Neil Armstrong','Buzz Aldrin','John Glenn']},
      {p:'¿Qué telescopio espacial famoso?',c:'Hubble',opts:['Hubble','Kepler','Galileo','Newton']},
      {p:'¿Qué planeta ya no es planeta?',c:'Plutón',opts:['Plutón','Marte','Venus','Mercurio']},
      {p:'¿Qué rover explora Marte?',c:'Perseverance/Curiosity',opts:['Perseverance/Curiosity','Hubble','Apolo','Sputnik']},
      {p:'¿Qué fue el Sputnik?',c:'Primer satélite artificial',opts:['Primer satélite artificial','Un cohete tripulado','Un telescopio','Un rover']},
      {p:'¿Qué es la Estación Espacial Internacional?',c:'Laboratorio en órbita',opts:['Laboratorio en órbita','Un cohete','Un planeta','Una luna']},
      {p:'¿Qué empresa quiere ir a Marte?',c:'SpaceX',opts:['SpaceX','NASA','ESA','Roscosmos']}
    ], 8)
  };

  var AJEDREZ = {
    '♟️ Piezas y Movimientos': banco([
      {p:'¿Qué pieza vale más (no se puede perder)?',c:'Rey',opts:['Rey','Reina','Torre','Caballo']},
      {p:'¿Qué pieza se mueve en L?',c:'Caballo',opts:['Caballo','Torre','Alfil','Peón']},
      {p:'¿Qué pieza se mueve en diagonal?',c:'Alfil',opts:['Alfil','Torre','Caballo','Peón']},
      {p:'¿Qué pieza se mueve en línea recta?',c:'Torre',opts:['Torre','Alfil','Caballo','Peón']},
      {p:'¿Qué pieza es la más poderosa?',c:'Reina',opts:['Reina','Rey','Torre','Caballo']},
      {p:'¿Cuántas casillas tiene un tablero?',c:'64',opts:['64','32','100','49']},
      {p:'¿Qué pieza empieza en la esquina?',c:'Torre',opts:['Torre','Caballo','Alfil','Reina']},
      {p:'¿Qué es un jaque mate?',c:'Rey atrapado, fin del juego',opts:['Rey atrapado, fin del juego','Un empate','Una jugada','Un cambio']}
    ], 8)
  };

  var SEGURIDAD = {
    '🚦 Seguridad Vial': banco([
      {p:'¿Qué significa luz roja?',c:'Parar',opts:['Parar','Seguir','Acelerar','Girar']},
      {p:'¿Qué significa luz verde?',c:'Pasar',opts:['Pasar','Parar','Esperar','Retroceder']},
      {p:'¿Qué significa luz amarilla?',c:'Precaución, va a cambiar',opts:['Precaución, va a cambiar','Pasar rápido','Parar de golpe','No significa nada']},
      {p:'¿Por dónde cruzar?',c:'Por la senda peatonal',opts:['Por la senda peatonal','En cualquier lugar','Entre autos','En la ruta']},
      {p:'¿Qué mirar antes de cruzar?',c:'Izquierda, derecha, izquierda',opts:['Izquierda, derecha, izquierda','Solo arriba','Solo abajo','No mirar']},
      {p:'¿Qué usar en auto?',c:'Cinturón de seguridad',opts:['Cinturón de seguridad','Nada','Pararse en el asiento','Dormir en el piso']},
      {p:'¿Qué es una senda peatonal?',c:'Rayas blancas para cruzar',opts:['Rayas blancas para cruzar','Una calle','Un auto','Una bicicleta']},
      {p:'¿Qué es un semáforo?',c:'Señal de luces para regular tránsito',opts:['Señal de luces para regular tránsito','Un auto','Una calle','Un edificio']}
    ], 8)
  };

  var PRIMEROS_AUXILIOS = {
    '🚑 Emergencias': banco([
      {p:'¿Qué número de emergencia en Argentina?',c:'911',opts:['911','100','112','999']},
      {p:'¿Qué hacer si alguien se corta y sangra?',c:'Presionar con paño limpio y avisar adulto',opts:['Presionar con paño limpio y avisar adulto','No hacer nada','Lamer la herida','Poner tierra']},
      {p:'¿Qué hacer si alguien se quema?',c:'Agua fría, no hielo, avisar adulto',opts:['Agua fría, no hielo, avisar adulto','Untar mantequilla','Rompés la ampolla','No hacer nada']},
      {p:'¿Qué hacer si alguien se atraganta?',c:'Pedir ayuda y maniobra de Heimlich (adulto)',opts:['Pedir ayuda y maniobra de Heimlich (adulto)','Dar agua','Dar de comer','Golpear la espalda fuerte']},
      {p:'¿Qué hacer ante un desmayo?',c:'Avisar adulto y llamar 911',opts:['Avisar adulto y llamar 911','Dar de comer','Dar de beber','Moverlo bruscamente']},
      {p:'¿Qué es un botiquín?',c:'Caja con curitas y medicamentos básicos',opts:['Caja con curitas y medicamentos básicos','Un juguete','Un libro','Un alimento']},
      {p:'¿Qué hacer si te caés y duele mucho?',c:'No moverse y avisar a un adulto',opts:['No moverse y avisar a un adulto','Seguir corriendo','No decir nada','Comer']},
      {p:'¿Qué hacer si hay un incendio?',c:'Salir bajo, cubrir nariz, llamar 911',opts:['Salir bajo, cubrir nariz, llamar 911','Esconderte en el ropero','Abrir ventanas','Regar con aceite']}
    ], 8)
  };

  var ODS = {
    '🌍 Objetivos y Derechos': banco([
      {p:'¿Cuántos ODS hay?',c:'17',opts:['17','10','5','20']},
      {p:'¿Qué es el ODS 1?',c:'Fin de la pobreza',opts:['Fin de la pobreza','Educación','Igualdad de género','Agua']},
      {p:'¿Qué es el ODS 4?',c:'Educación de calidad',opts:['Educación de calidad','Pobreza','Hambre','Energía']},
      {p:'¿Qué es el ODS 5?',c:'Igualdad de género',opts:['Igualdad de género','Educación','Agua','Pobreza']},
      {p:'¿Qué es el ODS 13?',c:'Acción por el clima',opts:['Acción por el clima','Educación','Pobreza','Hambre']},
      {p:'¿Qué es la ONU?',c:'Organización de Naciones Unidas',opts:['Organización de Naciones Unidas','Un país','Un juego','Un deporte']},
      {p:'¿Qué es la Declaración de Derechos del Niño?',c:'Leyes que protegen a los niños',opts:['Leyes que protegen a los niños','Un cuento','Un juego','Un deporte']},
      {p:'¿Qué es la igualdad de género?',c:'Mismos derechos para niños y niñas',opts:['Mismos derechos para niños y niñas','Solo mandan los niños','Solo mandan las niñas','No hay derechos']}
    ], 8)
  };

  var FILOSOFIA = {
    '🤔 Grandes Preguntas': banco([
      {p:'¿Qué es la verdad?',c:'Lo que se puede comprobar o acordar',opts:['Lo que se puede comprobar o acordar','Una mentira','Un cuento','Un juego']},
      {p:'¿Qué es la libertad?',c:'Poder elegir sin dañar a otros',opts:['Poder elegir sin dañar a otros','Hacer lo que quieras siempre','No hacer nada','Mandar a todos']},
      {p:'¿Qué es la justicia?',c:'Dar a cada uno lo que le corresponde',opts:['Dar a cada uno lo que le corresponde','Robar','Mentir','Tratar mal']},
      {p:'¿Qué es la felicidad?',c:'Estado de bienestar y plenitud',opts:['Estado de bienestar y plenitud','Tener mucho dinero','Tener muchos juguetes','No hacer nada']},
      {p:'¿Qué es el bien y el mal?',c:'Conceptos morales sobre lo correcto',opts:['Conceptos morales sobre lo correcto','Colores','Sabores','Juegos']},
      {p:'¿Quién fue Sócrates?',c:'Filósofo griego que preguntaba todo',opts:['Filósofo griego que preguntaba todo','Un rey','Un científico','Un pintor']},
      {p:'¿Quién fue Platón?',c:'Filósofo griego, alumno de Sócrates',opts:['Filósofo griego, alumno de Sócrates','Un rey','Un científico','Un músico']},
      {p:'¿Quién fue Aristóteles?',c:'Filósofo griego, maestro de Alejandro Magno',opts:['Filósofo griego, maestro de Alejandro Magno','Un faraón','Un dios','Un científico moderno']}
    ], 8)
  };

  var DANZA = {
    '💃 Ritmos del Mundo': banco([
      {p:'¿Qué baile es argentino?',c:'Tango',opts:['Tango','Salsa','Samba','Flamenco']},
      {p:'¿Qué baile es brasileño?',c:'Samba',opts:['Samba','Tango','Flamenco','Salsa']},
      {p:'¿Qué baile es español?',c:'Flamenco',opts:['Flamenco','Tango','Samba','Salsa']},
      {p:'¿Qué baile es caribeño?',c:'Salsa',opts:['Salsa','Tango','Flamenco','Samba']},
      {p:'¿Qué baile clásico usa puntas?',c:'Ballet',opts:['Ballet','Tango','Salsa','Hip hop']},
      {p:'¿Qué baile callejero usa break?',c:'Hip hop',opts:['Hip hop','Ballet','Tango','Flamenco']},
      {p:'¿Qué es coreografía?',c:'Pasos de baile organizados',opts:['Pasos de baile organizados','Una canción','Un instrumento','Un pintor']},
      {p:'¿Qué es un bailarín principal?',c:'El que baila el papel más importante',opts:['El que baila el papel más importante','El que toca música','El que canta','El que dirige']}
    ], 8)
  };

  var CINE = {
    '🎬 Cine y Animación': banco([
      {p:'¿Qué es un director de cine?',c:'El que dirige la película',opts:['El que dirige la película','El que actúa','El que canta','El que cocina']},
      {p:'¿Qué es un actor?',c:'El que interpreta un personaje',opts:['El que interpreta un personaje','El que dirige','El que graba','El que escribe']},
      {p:'¿Qué es un guion?',c:'Texto de la película',opts:['Texto de la película','Una pintura','Una canción','Un juego']},
      {p:'¿Qué estudio hace Toy Story?',c:'Pixar',opts:['Pixar','Disney','DreamWorks','Warner']},
      {p:'¿Qué es un Oscar?',c:'Premio del cine',opts:['Premio del cine','Un deporte','Un juego','Un libro']},
      {p:'¿Qué es un doblaje?',c:'Voz en otro idioma',opts:['Voz en otro idioma','Una canción','Un baile','Una pintura']},
      {p:'¿Qué es un CGI?',c:'Efectos por computadora',opts:['Efectos por computadora','Un actor','Un director','Un guion']},
      {p:'¿Qué es un cortometraje?',c:'Película corta',opts:['Película corta','Película larga','Un documental','Una serie']}
    ], 8)
  };

  var ARQUITECTURA = {
    '🏗️ Edificios y Monumentos': banco([
      {p:'¿Qué monumento está en Río de Janeiro?',c:'Cristo Redentor',opts:['Cristo Redentor','Torre Eiffel','Estatua de la Libertad','Coliseo']},
      {p:'¿Qué monumento está en París?',c:'Torre Eiffel',opts:['Torre Eiffel','Cristo Redentor','Coliseo','Big Ben']},
      {p:'¿Qué monumento está en Nueva York?',c:'Estatua de la Libertad',opts:['Estatua de la Libertad','Torre Eiffel','Coliseo','Cristo Redentor']},
      {p:'¿Qué monumento está en Roma?',c:'Coliseo',opts:['Coliseo','Torre Eiffel','Cristo Redentor','Big Ben']},
      {p:'¿Qué es un rascacielos?',c:'Edificio muy alto',opts:['Edificio muy alto','Edificio chico','Una casa','Un puente']},
      {p:'¿Qué es un puente?',c:'Construcción para cruzar',opts:['Construcción para cruzar','Un edificio','Una casa','Un túnel']},
      {p:'¿Quién diseña edificios?',c:'Arquitecto',opts:['Arquitecto','Carpintero','Plomero','Electricista']},
      {p:'¿Qué es la Sagrada Familia?',c:'Iglesia de Gaudí en Barcelona',opts:['Iglesia de Gaudí en Barcelona','Un museo','Un estadio','Un puente']}
    ], 8)
  };

  var HUERTA = {
    '🥕 Cultivo y Alimentos': banco([
      {p:'¿Qué necesita una semilla para brotar?',c:'Agua, tierra y sol',opts:['Agua, tierra y sol','Solo sombra','Caramelo','Solo agua']},
      {p:'¿Qué verdura es naranja?',c:'Zanahoria',opts:['Zanahoria','Papa','Cebolla','Lechuga']},
      {p:'¿Qué verdura es verde y de hoja?',c:'Lechuga',opts:['Lechuga','Zanahoria','Papa','Cebolla']},
      {p:'¿Qué es un abono?',c:'Nutriente para las plantas',opts:['Nutriente para las plantas','Un veneno','Un plástico','Un metal']},
      {p:'¿Qué es una plaga?',c:'Insecto que daña las plantas',opts:['Insecto que daña las plantas','Una abeja','Una mariposa','Un pájaro']},
      {p:'¿Qué es el compost?',c:'Restos orgánicos que viran abono',opts:['Restos orgánicos que viran abono','Plástico','Metal','Vidrio']},
      {p:'¿Qué fruta es roja y tiene semillas afuera?',c:'Frutilla',opts:['Frutilla','Manzana','Banana','Naranja']},
      {p:'¿Qué es un invernadero?',c:'Lugar cerrado para cultivar',opts:['Lugar cerrado para cultivar','Un estadio','Un museo','Un cine']}
    ], 8)
  };

  var ENERGIAS = {
    '⚡ Tipos de Energía': banco([
      {p:'¿Qué energía viene del sol?',c:'Solar',opts:['Solar','Eólica','Hidráulica','Nuclear']},
      {p:'¿Qué energía viene del viento?',c:'Eólica',opts:['Eólica','Solar','Hidráulica','Carbón']},
      {p:'¿Qué energía viene del agua?',c:'Hidráulica',opts:['Hidráulica','Solar','Eólica','Petróleo']},
      {p:'¿Qué energía contamina más?',c:'Petróleo/carbón',opts:['Petróleo/carbón','Solar','Eólica','Hidráulica']},
      {p:'¿Qué es la energía nuclear?',c:'Energía del átomo',opts:['Energía del átomo','Energía del sol','Energía del viento','Energía del agua']},
      {p:'¿Qué es una energía renovable?',c:'No se acaba (sol, viento, agua)',opts:['No se acaba (sol, viento, agua)','Petróleo','Carbón','Gas']},
      {p:'¿Qué es una energía no renovable?',c:'Se acaba (petróleo, carbón)',opts:['Se acaba (petróleo, carbón)','Solar','Eólica','Hidráulica']},
      {p:'¿Qué es la biomasa?',c:'Energía de materia orgánica',opts:['Energía de materia orgánica','Energía del sol','Energía del viento','Energía nuclear']}
    ], 8)
  };

  /* ============================================================
     PROGRAMACIÓN, IA y ROBÓTICA — por niveles
     ============================================================ */
  function genProgramacion(nivel) {
    if (nivel <= 3) return banco([
      {p:'¿Qué es un algoritmo?',c:'Pasos para resolver algo',opts:['Pasos para resolver algo','Un juego','Un dibujo','Un animal']},
      {p:'¿Qué es un bucle?',c:'Repetir algo muchas veces',opts:['Repetir algo muchas veces','Una sola vez','Nunca','Un color']},
      {p:'¿Qué es un condicional?',c:'Si pasa esto, hacé esto',opts:['Si pasa esto, hacé esto','Siempre lo mismo','Nada','Un número']},
      {p:'¿Qué es Scratch?',c:'Programación con bloques',opts:['Programación con bloques','Un videojuego','Un robot','Un idioma']},
      {p:'¿Qué es un bug?',c:'Error en el programa',opts:['Error en el programa','Un insecto de verdad','Un premio','Un nivel']},
      {p:'¿Qué es un pixel?',c:'Punto más chico de la pantalla',opts:['Punto más chico de la pantalla','Un robot','Un juego','Un color']},
      {p:'¿Qué hace "mover 10 pasos"?',c:'El personaje se mueve',opts:['El personaje se mueve','Nada','Se borra','Se duplica']},
      {p:'¿Qué es un sprite?',c:'Personaje en Scratch',opts:['Personaje en Scratch','Un fondo','Un sonido','Un color']}
    ], 8);
    if (nivel <= 7) return banco([
      {p:'¿Qué es una variable?',c:'Caja para guardar un dato',opts:['Caja para guardar un dato','Un número','Un texto','Un color']},
      {p:'¿Qué es una función?',c:'Bloque de código reutilizable',opts:['Bloque de código reutilizable','Un número','Un texto','Un juego']},
      {p:'¿Qué es HTML?',c:'Lenguaje de páginas web',opts:['Lenguaje de páginas web','Un juego','Un robot','Un idioma hablado']},
      {p:'¿Qué es Python?',c:'Lenguaje de programación',opts:['Lenguaje de programación','Un animal','Un juego','Un robot']},
      {p:'¿Qué es un array/lista?',c:'Conjunto de datos ordenados',opts:['Conjunto de datos ordenados','Un solo número','Un texto','Un color']},
      {p:'¿Qué es un string?',c:'Texto entre comillas',opts:['Texto entre comillas','Un número','Un booleano','Una lista']},
      {p:'¿Qué es un booleano?',c:'Verdadero o falso',opts:['Verdadero o falso','Un número','Un texto','Una lista']},
      {p:'¿Qué es un comentario?',c:'Nota que no ejecuta el programa',opts:['Nota que no ejecuta el programa','Un error','Un premio','Un nivel']}
    ], 8);
    return banco([
      {p:'¿Qué es un algoritmo de búsqueda?',c:'Encontrar un dato rápido',opts:['Encontrar un dato rápido','Un juego','Un dibujo','Un número']},
      {p:'¿Qué es la complejidad O(n)?',c:'Tiempo proporcional a los datos',opts:['Tiempo proporcional a los datos','Tiempo fijo','Tiempo infinito','Nada']},
      {p:'¿Qué es una API?',c:'Interfaz entre programas',opts:['Interfaz entre programas','Un juego','Un robot','Un idioma']},
      {p:'¿Qué es una base de datos?',c:'Lugar para guardar mucha info',opts:['Lugar para guardar mucha info','Un solo archivo','Un juego','Un dibujo']},
      {p:'¿Qué es recursividad?',c:'Función que se llama a sí misma',opts:['Función que se llama a sí misma','Un bucle infinito','Un error','Un premio']},
      {p:'¿Qué es Git?',c:'Sistema de versiones de código',opts:['Sistema de versiones de código','Un lenguaje','Un robot','Un juego']},
      {p:'¿Qué es un framework?',c:'Herramienta para programar más rápido',opts:['Herramienta para programar más rápido','Un lenguaje','Un robot','Un juego']},
      {p:'¿Qué es machine learning?',c:'Programas que aprenden solos',opts:['Programas que aprenden solos','Programas fijos','Juegos','Robots']}
    ], 8);
  }

  function genIA(nivel) {
    if (nivel <= 4) return banco([
      {p:'¿Qué es la inteligencia artificial?',c:'Máquinas que piensan como humanos',opts:['Máquinas que piensan como humanos','Un robot de juguete','Un videojuego','Un idioma']},
      {p:'¿Qué es un robot?',c:'Máquina que hace tareas',opts:['Máquina que hace tareas','Un humano','Un animal','Un juguete de peluche']},
      {p:'¿Qué es un asistente virtual?',c:'Programa que responde (Siri, Alexa)',opts:['Programa que responde (Siri, Alexa)','Un humano','Un animal','Un libro']},
      {p:'¿Qué es un algoritmo de recomendación?',c:'Te sugiere videos/compras',opts:['Te sugiere videos/compras','Un error','Un premio','Un nivel']},
      {p:'¿La IA tiene sentimientos?',c:'No, solo simula',opts:['No, solo simula','Sí, como humanos','Sí, pero menos','No existe']},
      {p:'¿Qué es un chatbot?',c:'Programa que chatea',opts:['Programa que chatea','Un humano','Un animal','Un libro']},
      {p:'¿Qué es reconocimiento de voz?',c:'La máquina entiende lo que decís',opts:['La máquina entiende lo que decís','Un error','Un premio','Un nivel']},
      {p:'¿Qué es reconocimiento facial?',c:'La máquina reconoce caras',opts:['La máquina reconoce caras','Un error','Un premio','Un nivel']}
    ], 8);
    return banco([
      {p:'¿Qué es una red neuronal?',c:'Modelo inspirado en el cerebro',opts:['Modelo inspirado en el cerebro','Un robot','Un juego','Un idioma']},
      {p:'¿Qué es entrenar un modelo?',c:'Darle muchos datos para que aprenda',opts:['Darle muchos datos para que aprenda','Un error','Un premio','Un nivel']},
      {p:'¿Qué es overfitting?',c:'El modelo memoriza en vez de aprender',opts:['El modelo memoriza en vez de aprender','Un premio','Un nivel','Un juego']},
      {p:'¿Qué es deep learning?',c:'Redes neuronales profundas',opts:['Redes neuronales profundas','Un robot','Un juego','Un idioma']},
      {p:'¿Qué es un dataset?',c:'Conjunto de datos para entrenar',opts:['Conjunto de datos para entrenar','Un solo número','Un texto','Un color']},
      {p:'¿Qué es el Test de Turing?',c:'Prueba si una máquina parece humana',opts:['Prueba si una máquina parece humana','Un juego','Un robot','Un idioma']},
      {p:'¿Qué es IA generativa?',c:'Crea texto/imágenes/video nuevos',opts:['Crea texto/imágenes/video nuevos','Solo clasifica','Solo juega','No existe']},
      {p:'¿Qué es un sesgo en IA?',c:'El modelo discrimina por datos malos',opts:['El modelo discrimina por datos malos','Un premio','Un nivel','Un juego']}
    ], 8);
  }

  function genRobotica(nivel) {
    if (nivel <= 4) return banco([
      {p:'¿Qué es un sensor?',c:'Detecta luz, sonido, distancia',opts:['Detecta luz, sonido, distancia','Un motor','Una batería','Un engranaje']},
      {p:'¿Qué hace un motor?',c:'Mueve al robot',opts:['Mueve al robot','Detecta luz','Piensa','Da energía']},
      {p:'¿Qué da energía al robot?',c:'Batería',opts:['Batería','Motor','Sensor','Engranaje']},
      {p:'¿Qué es un engranaje?',c:'Rueda con dientes que transmite movimiento',opts:['Rueda con dientes que transmite movimiento','Un sensor','Un motor','Una batería']},
      {p:'¿Qué robot limpia pisos?',c:'Roomba',opts:['Roomba','Un robot industrial','Un drone','Un robot humanoide']},
      {p:'¿Qué es un drone?',c:'Robot volador sin piloto',opts:['Robot volador sin piloto','Un auto','Un barco','Un sensor']},
      {p:'¿Qué es un robot humanoide?',c:'Robot con forma humana',opts:['Robot con forma humana','Un drone','Un Roomba','Un sensor']},
      {p:'¿Qué es Lego Mindstorms?',c:'Kit de robótica para armar',opts:['Kit de robótica para armar','Un videojuego','Un libro','Un dibujo']}
    ], 8);
    return banco([
      {p:'¿Qué es un servo?',c:'Motor que gira un ángulo exacto',opts:['Motor que gira un ángulo exacto','Un sensor','Una batería','Un engranaje']},
      {p:'¿Qué es Arduino?',c:'Placa para programar electrónica',opts:['Placa para programar electrónica','Un robot','Un juego','Un idioma']},
      {p:'¿Qué es Raspberry Pi?',c:'Computadora chica para proyectos',opts:['Computadora chica para proyectos','Un sensor','Un motor','Una batería']},
      {p:'¿Qué es un actuador?',c:'Parte que mueve algo',opts:['Parte que mueve algo','Un sensor','Una batería','Un engranaje']},
      {p:'¿Qué es un giroscopio?',c:'Sensor de orientación',opts:['Sensor de orientación','Un motor','Una batería','Un engranaje']},
      {p:'¿Qué es un acelerómetro?',c:'Sensor de movimiento',opts:['Sensor de movimiento','Un motor','Una batería','Un engranaje']},
      {p:'¿Qué es un robot industrial?',c:'Brazo que fabrica en fábricas',opts:['Brazo que fabrica en fábricas','Un drone','Un Roomba','Un sensor']},
      {p:'¿Qué es la cinemática?',c:'Estudio del movimiento de robots',opts:['Estudio del movimiento de robots','Un sensor','Un motor','Una batería']}
    ], 8);
  }

  /* ============================================================
     SISTEMA SUPERPREMIO — XP, monedas, gemas, niveles de cuenta,
     tienda, mascotas, stickers, fondos, avatares, logros, misiones,
     cofres, ruleta, rachas, combos, torneos, certificados, ranking
     ============================================================ */
  var SUPERPREMIO = {
    config: {
      xpPorCorrecta: 10,
      xpPorNivelCompletado: 50,
      xpPorMundoCompletado: 500,
      monedasPorCorrecta: 5,
      monedasPorNivel: 25,
      gemasPorNivelPerfecto: 1,
      comboMultiplicador: [1, 1.5, 2, 3, 5], // 0,3,5,8,10 aciertos seguidos
      rachaDiasMultiplicador: [1, 1.1, 1.25, 1.5, 2] // 0,3,5,7,10 días
    },
    // Niveles de cuenta (1-20) con título y XP necesario
    nivelesCuenta: [
      {nivel:1, titulo:'Aprendiz',      xp:0,      emoji:'🌱'},
      {nivel:2, titulo:'Explorador',    xp:200,    emoji:'🔍'},
      {nivel:3, titulo:'Descubridor',   xp:500,    emoji:'✨'},
      {nivel:4, titulo:'Estudiante',    xp:1000,   emoji:'📚'},
      {nivel:5, titulo:'Sabio Jr.',     xp:2000,   emoji:'🎓'},
      {nivel:6, titulo:'Genio',         xp:3500,   emoji:'🧠'},
      {nivel:7, titulo:'Mago',          xp:5500,   emoji:'🧙'},
      {nivel:8, titulo:'Inventor',      xp:8000,   emoji:'💡'},
      {nivel:9, titulo:'Científico',    xp:11000,  emoji:'🔬'},
      {nivel:10,titulo:'Maestro',       xp:15000,  emoji:'🏆'},
      {nivel:11,titulo:'Gran Maestro',  xp:20000,  emoji:'👑'},
      {nivel:12,titulo:'Leyenda',       xp:26000,  emoji:'⭐'},
      {nivel:13,titulo:'Mítico',        xp:33000,  emoji:'🐉'},
      {nivel:14,titulo:'Cósmico',       xp:41000,  emoji:'🚀'},
      {nivel:15,titulo:'Galáctico',     xp:50000,  emoji:'🌌'},
      {nivel:16,titulo:'Universal',     xp:60000,  emoji:'🌍'},
      {nivel:17,titulo:'Dios del Saber',xp:72000,  emoji:'⚡'},
      {nivel:18,titulo:'Supremo',       xp:85000,  emoji:'💎'},
      {nivel:19,titulo:'Inmortal',      xp:100000, emoji:'♾️'},
      {nivel:20,titulo:'Leyenda Eterna',xp:120000, emoji:'🏛️'}
    ],
    // Tienda de recompensas (se compran con monedas o gemas)
    tienda: {
      mascotas: [
        {id:'perro',   nombre:'Perro Fido',   emoji:'🐶', precio:100,  moneda:'monedas', nivel:1},
        {id:'gato',    nombre:'Gato Mishi',   emoji:'🐱', precio:100,  moneda:'monedas', nivel:1},
        {id:'conejo',  nombre:'Conejo Saltarín',emoji:'🐰',precio:200,moneda:'monedas', nivel:2},
        {id:'panda',   nombre:'Panda Bambú',  emoji:'🐼', precio:500,  moneda:'monedas', nivel:3},
        {id:'unicornio',nombre:'Unicornio Arcoíris',emoji:'🦄',precio:5,moneda:'gemas',  nivel:5},
        {id:'dragon',  nombre:'Dragón Fuego', emoji:'🐲', precio:10,   moneda:'gemas',   nivel:8},
        {id:'alien',   nombre:'Alien Zippy',  emoji:'👽', precio:15,   moneda:'gemas',   nivel:10},
        {id:'robot',   nombre:'Robot Bit',    emoji:'🤖', precio:20,   moneda:'gemas',   nivel:12},
        {id:'fenix',   nombre:'Fénix Sol',    emoji:'🦅', precio:30,   moneda:'gemas',   nivel:15},
        {id:'fantasma',nombre:'Fantasma Boo', emoji:'👻', precio:8,    moneda:'gemas',   nivel:6},
        {id:'pulpo',   nombre:'Pulpo Coco',   emoji:'🐙', precio:400,  moneda:'monedas', nivel:4},
        {id:'leon',    nombre:'León Rey',     emoji:'🦁', precio:800,  moneda:'monedas', nivel:7}
      ],
      stickers: [
        {id:'estrella',nombre:'Estrella Dorada',emoji:'⭐',precio:50, moneda:'monedas'},
        {id:'corazon', nombre:'Corazón',        emoji:'❤️',precio:50, moneda:'monedas'},
        {id:'arcoiris',nombre:'Arcoíris',       emoji:'🌈',precio:80, moneda:'monedas'},
        {id:'fuego',   nombre:'Fuego',          emoji:'🔥',precio:80, moneda:'monedas'},
        {id:'hielo',   nombre:'Hielo',          emoji:'❄️',precio:80, moneda:'monedas'},
        {id:'rayo',    nombre:'Rayo',           emoji:'⚡',precio:100,moneda:'monedas'},
        {id:'crown',   nombre:'Corona',         emoji:'👑',precio:3,  moneda:'gemas'},
        {id:'diamond', nombre:'Diamante',       emoji:'💎',precio:5,  moneda:'gemas'},
        {id:'rocket',  nombre:'Cohete',         emoji:'🚀',precio:4,  moneda:'gemas'},
        {id:'trophy',  nombre:'Trofeo',         emoji:'🏆',precio:6,  moneda:'gemas'}
      ],
      fondos: [
        {id:'cielo',   nombre:'Cielo Azul',     emoji:'🌤️',precio:150, moneda:'monedas'},
        {id:'espacio', nombre:'Espacio',        emoji:'🌌',precio:8,   moneda:'gemas'},
        {id:'selva',   nombre:'Selva',          emoji:'🌴',precio:200, moneda:'monedas'},
        {id:'oceano',  nombre:'Océano',         emoji:'🌊',precio:200, moneda:'monedas'},
        {id:'desierto',nombre:'Desierto',       emoji:'🏜️',precio:250, moneda:'monedas'},
        {id:'galaxia', nombre:'Galaxia',        emoji:'✨',precio:10,  moneda:'gemas'},
        {id:'candy',   nombre:'Mundo Caramelo', emoji:'🍭',precio:300, moneda:'monedas'},
        {id:'navidad', nombre:'Navidad',        emoji:'🎄',precio:5,   moneda:'gemas'}
      ],
      avatares: [
        {id:'ninio',   nombre:'Niño',           emoji:'👦',precio:0,   moneda:'monedas'},
        {id:'ninia',   nombre:'Niña',           emoji:'👧',precio:0,   moneda:'monedas'},
        {id:'astronauta',nombre:'Astronauta',   emoji:'👨‍🚀',precio:500,moneda:'monedas'},
        {id:'pirata',  nombre:'Pirata',         emoji:'🏴‍☠️',precio:600,moneda:'monedas'},
        {id:'princesa',nombre:'Princesa',       emoji:'👸',precio:700, moneda:'monedas'},
        {id:'principe',nombre:'Príncipe',       emoji:'🤴',precio:700, moneda:'monedas'},
        {id:'mago',    nombre:'Mago',           emoji:'🧙',precio:8,   moneda:'gemas'},
        {id:'superheroe',nombre:'Superhéroe',   emoji:'🦸',precio:10,  moneda:'gemas'},
        {id:'vampiro', nombre:'Vampiro',        emoji:'🧛',precio:12,  moneda:'gemas'},
        {id:'robotavatar',nombre:'Robot',       emoji:'🤖',precio:15,  moneda:'gemas'}
      ],
      marcos: [
        {id:'oro',     nombre:'Marco de Oro',   emoji:'🟨',precio:1000,moneda:'monedas'},
        {id:'plata',   nombre:'Marco de Plata', emoji:'⬜',precio:500, moneda:'monedas'},
        {id:'bronce',  nombre:'Marco Bronce',   emoji:'🟫',precio:200, moneda:'monedas'},
        {id:'diamante',nombre:'Marco Diamante', emoji:'💎',precio:20,  moneda:'gemas'},
        {id:'arcoiris2',nombre:'Marco Arcoíris',emoji:'🌈',precio:25,  moneda:'gemas'}
      ]
    },
    // Niveles de mascota (cada mascota sube de nivel con XP)
    mascotaNiveles: [
      {nivel:1, nombre:'Cachorro',  xp:0},
      {nivel:2, nombre:'Joven',     xp:100},
      {nivel:3, nombre:'Adulto',    xp:300},
      {nivel:4, nombre:'Experto',   xp:700},
      {nivel:5, nombre:'Legendario',xp:1500}
    ],
    // Logros (30+)
    logros: [
      {id:'primera_correcta', nombre:'Primer Acierto',      emoji:'🎯', desc:'Respondé una pregunta bien',   xp:50,  monedas:20},
      {id:'10_correctas',     nombre:'Racha de 10',         emoji:'🔥', desc:'10 respuestas correctas seguidas',xp:100, monedas:50},
      {id:'50_correctas',     nombre:'Máquina de Aciertos', emoji:'⚡', desc:'50 respuestas correctas en total',xp:200, monedas:100},
      {id:'100_correctas',    nombre:'Centenario',          emoji:'💯', desc:'100 respuestas correctas',       xp:500, monedas:200, gemas:2},
      {id:'primer_mundo',     nombre:'Explorador de Mundo', emoji:'🌍', desc:'Completá un mundo entero',       xp:300, monedas:150},
      {id:'5_mundos',         nombre:'Viajero Universal',   emoji:'✈️', desc:'Completá 5 mundos',              xp:800, monedas:400, gemas:3},
      {id:'todos_mundos',     nombre:'Maestro de Mundos',   emoji:'🏆', desc:'Completá TODOS los mundos',      xp:5000,monedas:2000,gemas:20},
      {id:'nivel_perfecto',   nombre:'Nivel Perfecto',      emoji:'⭐', desc:'Terminá un nivel sin errores',   xp:150, monedas:75, gemas:1},
      {id:'racha_3_dias',     nombre:'Constante',           emoji:'📅', desc:'Jugá 3 días seguidos',           xp:200, monedas:100},
      {id:'racha_7_dias',     nombre:'Inquebrantable',      emoji:'💪', desc:'Jugá 7 días seguidos',           xp:500, monedas:250, gemas:2},
      {id:'racha_30_dias',    nombre:'Leyenda de la Racha', emoji:'🏅', desc:'Jugá 30 días seguidos',          xp:3000,monedas:1500,gemas:10},
      {id:'idioma_1',         nombre:'Políglota Jr.',       emoji:'🗣️', desc:'Aprendé 50 palabras en un idioma',xp:300,monedas:150},
      {id:'idioma_5',         nombre:'Políglota Total',     emoji:'🌐', desc:'Los 5 idiomas',                  xp:2000,monedas:1000,gemas:10},
      {id:'mate_10',          nombre:'Genio de las Mate',   emoji:'🔢', desc:'Llegá al nivel 10 de matemáticas',xp:400,monedas:200},
      {id:'mate_20',          nombre:'Dios de las Mate',    emoji:'🧮', desc:'Llegá al nivel 20',              xp:3000,monedas:1500,gemas:15},
      {id:'cofre_legendario', nombre:'Cofre Legendario',    emoji:'🎁', desc:'Abrí un cofre legendario',       xp:1000,monedas:500, gemas:5},
      {id:'ruleta',           nombre:'Girador de Suerte',   emoji:'🎡', desc:'Girá la ruleta 10 veces',        xp:200, monedas:100},
      {id:'mascota_1',        nombre:'Mejor Amigo',         emoji:'🐶', desc:'Adoptá tu primera mascota',      xp:150, monedas:75},
      {id:'mascota_5',        nombre:'Cuidador de Animales',emoji:'🐾', desc:'Adoptá 5 mascotas',              xp:600, monedas:300, gemas:2},
      {id:'duelo_ganado',     nombre:'Campeón de Duelos',   emoji:'⚔️', desc:'Ganá un duelo 2 jugadores',      xp:250, monedas:125},
      {id:'torneo_top10',     nombre:'Top 10 del Torneo',   emoji:'🏅', desc:'Quedá top 10 en un torneo',      xp:1000,monedas:500, gemas:5},
      {id:'sin_errores_5',    nombre:'Impecable',           emoji:'✨', desc:'5 niveles perfectos',            xp:500, monedas:250, gemas:2},
      {id:'pregunta_audio',   nombre:'Oído Fino',           emoji:'👂', desc:'Acertá una pregunta de audio',   xp:100, monedas:50},
      {id:'emparejar',        nombre:'Emparejador Experto', emoji:'🔗', desc:'Ganá un juego de emparejar',     xp:150, monedas:75},
      {id:'memoria',          nombre:'Memoria de Elefante', emoji:'🐘', desc:'Ganá memoria en menos de 30s',   xp:200, monedas:100},
      {id:'ahorcado',         nombre:'Ahorcado Perfecto',   emoji:'😵', desc:'Ganá el ahorcado sin errores',   xp:150, monedas:75},
      {id:'sopa',             nombre:'Cazador de Palabras', emoji:'🔤', desc:'Encontrá todas en sopa de letras',xp:150,monedas:75},
      {id:'mision_diaria',    nombre:'Misionero Diario',    emoji:'📋', desc:'Completá una misión diaria',     xp:100, monedas:50},
      {id:'mision_semanal',   nombre:'Misionero Semanal',   emoji:'🗓️', desc:'Completá una misión semanal',    xp:300, monedas:150, gemas:1},
      {id:'certificado_1',    nombre:'Primer Diploma',      emoji:'📜', desc:'Obtené tu primer certificado',   xp:500, monedas:250, gemas:2}
    ],
    // Misiones diarias (5, rotan cada día)
    misionesDiarias: [
      {id:'md1', desc:'Respondé 10 preguntas bien',        meta:10, recompensa:{monedas:50, xp:100}},
      {id:'md2', desc:'Jugá 15 minutos',                   meta:900, recompensa:{monedas:40, xp:80}},
      {id:'md3', desc:'Completá un nivel de cualquier mundo',meta:1, recompensa:{monedas:60, xp:120}},
      {id:'md4', desc:'Aprendé 5 palabras nuevas en un idioma',meta:5,recompensa:{monedas:70, xp:150, gemas:1}},
      {id:'md5', desc:'Girá la ruleta una vez',            meta:1,  recompensa:{monedas:30, xp:50}}
    ],
    // Misiones semanales (3)
    misionesSemanales: [
      {id:'ms1', desc:'Completá 3 mundos parcialmente',    meta:3,  recompensa:{monedas:300, xp:500, gemas:2}},
      {id:'ms2', desc:'Respondé 100 preguntas bien',       meta:100,recompensa:{monedas:400, xp:700, gemas:3}},
      {id:'ms3', desc:'Jugá 5 días de la semana',          meta:5,  recompensa:{monedas:500, xp:1000,gemas:5}}
    ],
    // Cofres misteriosos
    cofres: [
      {id:'madera',    nombre:'Cofre de Madera',    emoji:'🟫', precio:{monedas:100},  probGema:0.05, rangoMonedas:[20,80]},
      {id:'plata',     nombre:'Cofre de Plata',     emoji:'⬜', precio:{monedas:300},  probGema:0.15, rangoMonedas:[50,200]},
      {id:'oro',       nombre:'Cofre de Oro',       emoji:'🟨', precio:{gemas:2},      probGema:0.40, rangoMonedas:[100,500]},
      {id:'legendario',nombre:'Cofre Legendario',   emoji:'🎁', precio:{gemas:10},     probGema:1.0,  rangoMonedas:[500,2000], incluyeMascota:true}
    ],
    // Ruleta diaria (premios)
    ruleta: [
      {id:'r1', premio:{monedas:10},  prob:0.30, emoji:'🪙'},
      {id:'r2', premio:{monedas:25},  prob:0.20, emoji:'🪙'},
      {id:'r3', premio:{monedas:50},  prob:0.15, emoji:'🪙'},
      {id:'r4', premio:{xp:50},       prob:0.15, emoji:'⭐'},
      {id:'r5', premio:{gemas:1},     prob:0.10, emoji:'💎'},
      {id:'r6', premio:{gemas:2},     prob:0.05, emoji:'💎'},
      {id:'r7', premio:{cofre:'madera'}, prob:0.03, emoji:'🎁'},
      {id:'r8', premio:{cofre:'oro'},    prob:0.02, emoji:'🎁'}
    ],
    // Torneos semanales
    torneos: {
      duracionDias: 7,
      premios: [
        {puesto:1,  recompensa:{gemas:50, monedas:5000, emoji:'🥇'}},
        {puesto:2,  recompensa:{gemas:30, monedas:3000, emoji:'🥈'}},
        {puesto:3,  recompensa:{gemas:20, monedas:2000, emoji:'🥉'}},
        {puesto:10, recompensa:{gemas:5,  monedas:500,  emoji:'🏅'}},
        {puesto:50, recompensa:{gemas:1,  monedas:100,  emoji:'🎖️'}}
      ]
    },
    // Certificados por mundo completado
    certificados: MUNDOS.map(function(m){ return {id:'cert_'+m.id, mundo:m.id, nombre:'Diplomado en '+m.nombre, emoji:m.emoji, xp:500, gemas:2}; }),
    // Estrellas por nivel (1-3 según errores)
    estrellas: { 3:{errores:0, texto:'¡Perfecto!'}, 2:{errores:1, texto:'¡Muy bien!'}, 1:{errores:99, texto:'¡Bien hecho!'} },
    // Ranking de amigos (simulado)
    rankingAmigos: [
      {nombre:'Lucas',   xp:15000, emoji:'🧑'},
      {nombre:'Sofía',   xp:12000, emoji:'👧'},
      {nombre:'Mateo',   xp:9000,  emoji:'👦'},
      {nombre:'Valentina',xp:7000, emoji:'👧'},
      {nombre:'Benjamín',xp:5000,  emoji:'👦'}
    ]
  };

  /* ============================================================
     MODOS DE JUEGO — Historia, Supervivencia, Relámpago, Duelo,
     Desafío Diario, Modo Sin Errores
     ============================================================ */
  var MODOS_JUEGO = [
    {id:'historia',    nombre:'Modo Historia',    emoji:'📖', desc:'Aventura narrativa por mundos, desbloqueando niveles', nivelRecomendado:'todos'},
    {id:'supervivencia',nombre:'Supervivencia',   emoji:'❤️', desc:'3 vidas, preguntas infinitas hasta equivocarte', nivelRecomendado:'todos'},
    {id:'relampago',   nombre:'Relámpago',        emoji:'⚡', desc:'60 segundos, máxima cantidad de respuestas correctas', nivelRecomendado:'todos'},
    {id:'duelo',       nombre:'Duelo 2 Jugadores',emoji:'⚔️', desc:'Turnos en el mismo dispositivo, el que más acierta gana', nivelRecomendado:'todos'},
    {id:'desafio',     nombre:'Desafío Diario',   emoji:'🎯', desc:'Preguntas especiales del día, premio extra', nivelRecomendado:'todos'},
    {id:'sinerrores',  nombre:'Modo Sin Errores', emoji:'✨', desc:'Un solo error y volvés a empezar. Premio x3', nivelRecomendado:'avanzado'},
    {id:'practica',    nombre:'Práctica Libre',   emoji:'🎓', desc:'Sin presión, elegí tema y practicá', nivelRecomendado:'todos'},
    {id:'examen',      nombre:'Examen Final',     emoji:'📝', desc:'20 preguntas por mundo para obtener certificado', nivelRecomendado:'avanzado'}
  ];

  /* ============================================================
     EVENTOS TEMÁTICOS — preguntas especiales por fecha
     ============================================================ */
  var EVENTOS = {
    'diadelniño': {nombre:'Día del Niño', emoji:'🎈', fecha:'08-17', preguntas: banco([
      {p:'¿Qué juguete tiene ruedas y pedales?',c:'Bicicleta',opts:['Bicicleta','Muñeca','Pelota','Rompecabezas']},
      {p:'¿Qué es un cumpleaños sin...?',c:'Torta',opts:['Torta','Libro','Lápiz','Mochila']},
      {p:'¿Qué juego se juega con un balón y arcos?',c:'Fútbol',opts:['Fútbol','Ajedrez','Damas','Rompecabezas']},
      {p:'¿Qué es un piñata?',c:'Objeto con dulces que se rompe',opts:['Objeto con dulces que se rompe','Un juguete','Un libro','Una comida']}
    ], 4)},
    'navidad': {nombre:'Navidad', emoji:'🎄', fecha:'12-25', preguntas: banco([
      {p:'¿Qué personaje trae regalos en Navidad?',c:'Papá Noel',opts:['Papá Noel','Reyes Magos','El Ratón Pérez','Un mago']},
      {p:'¿Qué se cuelga en la puerta?',c:'Corona',opts:['Corona','Una pelota','Un zapato','Un libro']},
      {p:'¿Qué comida es típica en Navidad?',c:'Vitel toné / asado',opts:['Vitel toné / asado','Sushi','Tacos','Pizza']},
      {p:'¿Qué villano de Navidad odia la Navidad?',c:'El Grinch',opts:['El Grinch','Dracula','Frankenstein','Un lobo']}
    ], 4)},
    'halloween': {nombre:'Halloween', emoji:'🎃', fecha:'10-31', preguntas: banco([
      {p:'¿Qué calabaza se usa en Halloween?',c:'Jack-o\'-lantern',opts:['Jack-o\'-lantern','Manzana','Pera','Banana']},
      {p:'¿Qué se dice al pedir dulces?',c:'Truco o trato',opts:['Truco o trato','Hola','Chau','Por favor']},
      {p:'¿Qué disfraz es clásico de Halloween?',c:'Fantasma',opts:['Fantasma','Princesa','Astronauta','Médico']},
      {p:'¿Qué animal negro es de mala suerte?',c:'Gato negro',opts:['Gato negro','Perro blanco','Pájaro azul','Pez dorado']}
    ], 4)},
    'verano': {nombre:'Verano', emoji:'🏖️', fecha:'01-01', preguntas: banco([
      {p:'¿Qué protector usamos en el sol?',c:'Protector solar',opts:['Protector solar','Aceite','Nada','Harina']},
      {p:'¿Qué deporte se hace en el agua?',c:'Natación',opts:['Natación','Fútbol','Ajedrez','Tenis de mesa']},
      {p:'¿Qué fruta es típica del verano?',c:'Sandía',opts:['Sandía','Manzana','Banana','Naranja']},
      {p:'¿Qué es una pileta?',c:'Lugar para nadar en casa',opts:['Lugar para nadar en casa','Un libro','Un juguete','Una comida']}
    ], 4)},
    'invierno': {nombre:'Invierno', emoji:'❄️', fecha:'06-21', preguntas: banco([
      {p:'¿Qué abrigo usamos en invierno?',c:'Abrigo grueso',opts:['Abrigo grueso','Remera corta','Traje de baño','Nada']},
      {p:'¿Qué bebida caliente es típica?',c:'Chocolate caliente',opts:['Chocolate caliente','Gaseosa fría','Agua helada','Jugo frío']},
      {p:'¿Qué es una estufa?',c:'Aparato para calentar',opts:['Aparato para calentar','Un ventilador','Un aire acondicionado','Una heladera']},
      {p:'¿Qué deporte de nieve hay?',c:'Esquí',opts:['Esquí','Natación','Surf','Vóley de playa']}
    ], 4)}
  };

  /* ============================================================
     FRASES DE ÁNIMO — para respuestas correctas/incorrectas
     ============================================================ */
  var FRASES_ANIMO = {
    correcta: ['¡Excelente! 🌟','¡Muy bien! 🎉','¡Correcto! ⭐','¡Sos un genio! 🧠','¡Increíble! 💪','¡Bravo! 👏','¡Perfecto! ✨','¡Seguí así! 🚀','¡Eso es! 🎯','¡Genial! 🌈'],
    incorrecta: ['¡Casi! 💪','¡No te rindas! 🌟','¡La próxima es! 🎯','¡Aprendemos de los errores! 📚','¡Vamos, vos podés! 💪','¡Otra vez! 🔄','¡Casi lo lográs! ✨','¡No pasa nada! 🌈'],
    combo: ['¡Racha de fuego! 🔥','¡Increíble racha! ⚡','¡Imparable! 💨','¡Maestro! 🏆','¡Dios del saber! ⚡']
  };

  /* ============================================================
     EXPORT FINAL — todo disponible en EK.Mundos y EK.DATOS
     ============================================================ */
  EK.DATOS = EK.DATOS || {};
  EK.DATOS.ciencia = CIENCIA;
  EK.DATOS.geografia = GEOGRAFIA;
  EK.DATOS.lengua = LENGUA;
  EK.DATOS.sociales = SOCIALES;
  EK.DATOS.musica = MUSICA;
  EK.DATOS.historia = HISTORIA;
  EK.DATOS.emociones = EMOCIONES;
  EK.DATOS.deportes = DEPORTES;
  EK.DATOS.salud = SALUD;
  EK.DATOS.arte = ARTE;
  EK.DATOS.mitologia = MITOLOGIA;
  EK.DATOS.profesiones = PROFESIONES;
  EK.DATOS.cocina = COCINA;
  EK.DATOS.astronomia = ASTRONOMIA;
  EK.DATOS.ajedrez = AJEDREZ;
  EK.DATOS.seguridad = SEGURIDAD;
  EK.DATOS.primerosauxilios = PRIMEROS_AUXILIOS;
  EK.DATOS.ods = ODS;
  EK.DATOS.filosofia = FILOSOFIA;
  EK.DATOS.danza = DANZA;
  EK.DATOS.cine = CINE;
  EK.DATOS.arquitectura = ARQUITECTURA;
  EK.DATOS.huerta = HUERTA;
  EK.DATOS.energias = ENERGIAS;

  var Mundos = {
    version: '3.0 MEGA ULTRA PREMIUM',
    MUNDOS: MUNDOS,
    NIVELES_EDAD: NIVELES_EDAD,
    genMate: genMate, genDinero: genDinero, genVerde: genVerde,
    genLogica: genLogica, genProgramacion: genProgramacion, genIA: genIA, genRobotica: genRobotica,
    CIENCIA: CIENCIA, GEOGRAFIA: GEOGRAFIA, LENGUA: LENGUA, SOCIALES: SOCIALES,
    MUSICA: MUSICA, HISTORIA: HISTORIA, EMOCIONES: EMOCIONES, DEPORTES: DEPORTES,
    SALUD: SALUD, ARTE: ARTE, MITOLOGIA: MITOLOGIA, PROFESIONES: PROFESIONES,
    COCINA: COCINA, ASTRONOMIA: ASTRONOMIA, AJEDREZ: AJEDREZ, SEGURIDAD: SEGURIDAD,
    PRIMEROS_AUXILIOS: PRIMEROS_AUXILIOS, ODS: ODS, FILOSOFIA: FILOSOFIA,
    DANZA: DANZA, CINE: CINE, ARQUITECTURA: ARQUITECTURA, HUERTA: HUERTA, ENERGIAS: ENERGIAS,
    IDIOMAS: IDIOMAS, PALABRAS: PALABRAS, FRASES_AVANZADAS: FRASES_AVANZADAS,
    genQuizIdioma: genQuizIdioma, genQuizEscuchar: genQuizEscuchar,
    SUPERPREMIO: SUPERPREMIO, MODOS_JUEGO: MODOS_JUEGO, EVENTOS: EVENTOS,
    FRASES_ANIMO: FRASES_ANIMO,
    barajar: barajar, opcionesNumericas: opcionesNumericas,
    q: q, qf: qf, qc: qc, qv: qv, qh: qh, qo: qo, qemp: qemp, qa: qa, qah: qah, qmem: qmem, qsopa: qsopa,
    banco: banco
  };
  window.EK = window.EK || {};
  window.EK.Mundos = Mundos;
})();

