/* ============================================================
   mundos.js — Datos de los mundos educativos (v2, 10 niveles)
   Todo el contenido vive AQUÍ, separado del motor. Para agregar
   100/500/1000 preguntas solo editás este archivo.
   ============================================================ */
(function () {
  'use strict';

  var rand = function (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };
  var barajar = EK.Engine.barajar;

  function opcionesNumericas(correcta) {
    var paso = correcta > 200 ? 50 : correcta > 50 ? 10 : correcta > 10 ? 2 : 1;
    var set = {}; set[correcta] = true;
    var intentos = 0;
    while (Object.keys(set).length < 3 && intentos < 60) {
      intentos++;
      var delta = rand(1, 3) * paso * (Math.random() < 0.5 ? -1 : 1);
      var cand = correcta + delta;
      if (cand >= 0) set[cand] = true;
    }
    return barajar(Object.keys(set).map(Number));
  }
  function q(p, c, opts, emoji) { return { pregunta: p, opciones: opts || opcionesNumericas(c), correcta: String(c), emojiPregunta: emoji }; }
  function qf(p, c, opts) { return { pregunta: p, opciones: barajar(opts.map(String)), correcta: String(c) }; }
  function qc(p, c, opts) { return { pregunta: p, opciones: barajar(opts.map(String)), correcta: String(c) }; }

  var MUNDOS = [
    { id: 'idiomas',     nombre: 'Idiomas',     emoji: '🌎', color: '#4ECDC4', tipo: 'idiomas',     desc: 'Inglés, Portugués y Francés' },
    { id: 'matematicas', nombre: 'Matemáticas', emoji: '🔢', color: '#FF9F43', tipo: 'niveles',     desc: 'Contar, sumar, multiplicar' },
    { id: 'ciencia',     nombre: 'Ciencia',     emoji: '🔬', color: '#A55EEA', tipo: 'categorias',  desc: 'Animales, espacio y más' },
    { id: 'juegos',      nombre: 'Juegos',      emoji: '🎮', color: '#EE5A6F', tipo: 'juegos',      desc: 'Memoria, laberinto y retos' },
    { id: 'creatividad', nombre: 'Creatividad', emoji: '🎨', color: '#F368E0', tipo: 'creatividad', desc: 'Dibujar, formas y crear' },
    { id: 'dinero',      nombre: 'Dinero',      emoji: '💰', color: '#2ECC71', tipo: 'niveles',     desc: 'Ahorrar, comprar y presupuesto' },
    { id: 'verde',       nombre: 'Mundo Verde', emoji: '🌱', color: '#6BCB77', tipo: 'niveles',     desc: 'Reciclaje y cuidado del planeta' },
    { id: 'geografia',   nombre: 'Geografía',   emoji: '🗺️', color: '#4D96FF', tipo: 'categorias',  desc: 'Argentina y el mundo' },
    { id: 'lengua',      nombre: 'Lengua',      emoji: '📖', color: '#FF6B9D', tipo: 'categorias',  desc: 'Letras, sílabas y oraciones' },
    { id: 'sociales',    nombre: 'Sociales',    emoji: '🏛️', color: '#845EC2', tipo: 'categorias',  desc: 'Comunidad y Argentina' },
    { id: 'ia',          nombre: 'IA',          emoji: '🤖', color: '#6C5CE7', tipo: 'escuela',     desc: 'Inteligencia Artificial' },
    { id: 'programacion',nombre: 'Programación',emoji: '💻', color: '#00B894', tipo: 'escuela',     desc: 'Programación y Videojuegos' },
    { id: 'robotica',    nombre: 'Robótica',    emoji: '⚙️', color: '#E17055', tipo: 'escuela',     desc: 'Robótica e Inventos' }
  ];

  /* ================= MATEMÁTICAS — 10 NIVELES ================= */
  var EMO = ['🍎', '🍌', '⭐', '🎈', '🐶', '🌸', '🚗', '⚽'];
  function genMate(nivel) {
    var P = [], i, a, b, c, em, nn, mm, nums;
    if (nivel === 1) { // reconocer números
      var n1 = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'];
      for (i = 0; i < 6; i++) { a = rand(1, 9); P.push(qf('¿Qué número es?  ' + n1[a-1], a, barajar([a, a+rand(1,3), Math.max(1,a-rand(1,3))].map(String)))); }
      for (i = 0; i < 4; i++) { nums = barajar([rand(1,9), rand(1,9), rand(1,9)].map(String)); P.push(qf('Tocá el número ' + nums[0], nums[0], nums)); }
    } else if (nivel === 2) { // contar objetos
      for (i = 0; i < 8; i++) { c = rand(2, 10); em = EMO[rand(0, EMO.length-1)]; P.push(q('¿Cuántos ' + em + ' hay?', c, opcionesNumericas(c), em.repeat(c))); }
    } else if (nivel === 3) { // sumas hasta 10
      for (i = 0; i < 8; i++) { a = rand(1,5); b = rand(1,5); P.push(q('¿Cuánto es ' + a + ' + ' + b + '?', a+b)); }
    } else if (nivel === 4) { // restas
      for (i = 0; i < 5; i++) { a = rand(3,9); b = rand(1,a-1); P.push(q('¿Cuánto es ' + a + ' − ' + b + '?', a-b)); }
      for (i = 0; i < 3; i++) { a = rand(5,12); b = rand(1,5); P.push(q('¿Cuánto es ' + a + ' − ' + b + '?', a-b)); }
    } else if (nivel === 5) { // mayor y menor
      for (i = 0; i < 5; i++) { nn = [rand(10,99), rand(10,99), rand(10,99)]; mm = Math.max.apply(null, nn); P.push(qf('¿Cuál es el MAYOR?  ' + nn.join(' · '), mm, barajar(nn.map(String)))); }
      for (i = 0; i < 5; i++) { nn = [rand(10,99), rand(10,99), rand(10,99)]; mm = Math.min.apply(null, nn); P.push(qf('¿Cuál es el MENOR?  ' + nn.join(' · '), mm, barajar(nn.map(String)))); }
    } else if (nivel === 6) { // multiplicación
      for (i = 0; i < 6; i++) { a = rand(2,5); b = [2,5,10][rand(0,2)]; P.push(q('¿Cuánto es ' + a + ' × ' + b + '?', a*b)); }
      for (i = 0; i < 4; i++) { a = rand(2,9); b = rand(2,5); P.push(q('¿Cuánto es ' + a + ' × ' + b + '?', a*b)); }
    } else if (nivel === 7) { // división
      for (i = 0; i < 8; i++) { b = rand(2,9); c = rand(2,9); a = b*c; P.push(q('¿Cuánto es ' + a + ' ÷ ' + b + '?', c)); }
    } else if (nivel === 8) { // series
      var series = [[2,4,6,8,10],[1,3,5,7,9],[5,10,15,20,25],[3,6,9,12,15],[10,20,30,40,50],[1,2,4,8,16],[2,6,10,14,18],[4,8,12,16,20]];
      barajar(series).slice(0,6).forEach(function(s){ P.push(qf('¿Qué número sigue?  ' + s.slice(0,4).join(' · ') + ' · ?', s[4], opcionesNumericas(s[4]))); });
      for (i = 0; i < 4; i++) { a = rand(2,9); b = rand(2,9); P.push(q('¿Cuánto es ' + a + ' × ' + b + '?', a*b)); }
    } else if (nivel === 9) { // problemas
      var probs = [
        {p:'Tenés 5 manzanas y te dan 7 más. ¿Cuántas tenés?',c:12},
        {p:'Hay 15 pájaros y vuelan 6. ¿Cuántos quedan?',c:9},
        {p:'Un lápiz cuesta $10. ¿Cuánto cuestan 4?',c:40},
        {p:'Repartiste 24 caramelos entre 3 amigos. ¿Cuánto le toca a cada uno?',c:8},
        {p:'Tenés $50 y gastás $27. ¿Cuánto te queda?',c:23},
        {p:'Una caja tiene 6 huevos. ¿Cuántos en 5 cajas?',c:30},
        {p:'3 docenas de medialunas. ¿Cuántas son?',c:36}
      ];
      barajar(probs).slice(0,6).forEach(function(pr){ P.push(q(pr.p, pr.c)); });
      for (i = 0; i < 4; i++) { a = rand(3,9); b = rand(3,9); P.push(q('¿Cuánto es ' + a + ' × ' + b + '?', a*b)); }
    } else { // nivel 10: desafío final
      var d;
      for (i = 0; i < 5; i++) { a = rand(2,9); b = rand(2,9); d = rand(2,5); P.push(q('¿Cuánto es ' + a + ' × ' + b + ' + ' + d + '?', a*b+d)); }
      for (i = 0; i < 3; i++) { b = rand(2,9); c = rand(2,9); a = b*c; d = rand(1,5); P.push(q('¿Cuánto es ' + a + ' ÷ ' + b + ' − ' + d + '?', c-d)); }
      [{p:'3 cajas con 6 lápices. Usaste 5. ¿Cuántos quedan?',c:13},{p:'80 páginas, leés 12 por día 5 días. ¿Cuántas faltan?',c:20}].forEach(function(pr){ P.push(q(pr.p, pr.c)); });
    }
    return P;
  }

  /* ================= DINERO — 10 NIVELES ================= */
  function genDinero(nivel) {
    var P = [], i, a, b, tot, g1, g2, queda;
    if (nivel <= 2) {
      var v1 = [
        {p:'¿Cuánto vale una moneda de $10?',c:10,opts:[5,10,50]},
        {p:'¿Cuál billete vale más?',c:'$1000',opts:['$100','$500','$1000']},
        {p:'¿Qué usamos para comprar?',c:'Dinero',opts:['Dinero','Piedras','Hojas']},
        {p:'Si ahorrás, tu dinero...',c:'Aumenta',opts:['Aumenta','Desaparece','Se gasta solo']},
        {p:'Moneda de $5 + moneda de $5 =',c:'$10',opts:['$5','$10','$20']},
        {p:'¿Qué es un deseo?',c:'Algo que querés pero no necesitás',opts:['Algo que querés pero no necesitás','Agua','Un techo']},
        {p:'¿Qué es una necesidad?',c:'Algo que necesitás para vivir',opts:['Algo que necesitás para vivir','Un juguete','Un helado']}
      ];
      barajar(v1).slice(0,8).forEach(function(x){ P.push(qf(x.p, x.c, x.opts)); });
    } else if (nivel <= 4) {
      for (i = 0; i < 6; i++) { a = rand(2,9)*10; b = rand(2,9)*10; P.push(q('Manzana $' + a + ' + leche $' + b + '. ¿Total?', a+b)); }
      for (i = 0; i < 3; i++) { tot = rand(5,20)*50; g1 = rand(1, Math.floor(tot/50)-1)*50; P.push(q('Pagás con $' + tot + ' algo de $' + g1 + '. ¿Vuelto?', tot-g1)); }
    } else if (nivel <= 6) {
      for (i = 0; i < 8; i++) { tot = rand(5,20)*100; g1 = rand(1, Math.floor(tot/100)-1)*100; P.push(q('Pagás $' + tot + ' por algo de $' + g1 + '. ¿Cuánto te devuelven?', tot-g1)); }
    } else if (nivel <= 8) {
      var v4 = [
        {p:'Juguete de $500, ahorrás $100/semana. ¿Cuántas semanas?',c:5,opts:[3,5,10]},
        {p:'¿Mejor: gastar todo o ahorrar una parte?',c:'Ahorrar una parte',opts:['Gastar todo','Ahorrar una parte','Tirarlo']},
        {p:'$200 y lápiz de $30. ¿Cuántos lápices comprás?',c:6,opts:[4,6,10]},
        {p:'¿Qué es un presupuesto?',c:'Un plan para tu dinero',opts:['Un plan para tu dinero','Una moneda','Un juguete']},
        {p:'¿Qué es una meta de ahorro?',c:'Juntar para algo que querés',opts:['Juntar para algo que querés','Gastar hoy','Regalar dinero']}
      ];
      barajar(v4).slice(0,5).forEach(function(x){ P.push(qf(x.p, x.c, x.opts)); });
      for (i = 0; i < 4; i++) { tot = rand(10,40)*100; g1 = rand(2,8)*100; g2 = rand(2,8)*100; queda = tot-g1-g2; if (queda>0) P.push(q('Presupuesto $' + tot + '. Gastás $' + g1 + ' y $' + g2 + '. ¿Cuánto queda?', queda)); }
    } else {
      for (i = 0; i < 6; i++) { a = rand(1,9)*50; b = rand(1,9)*50; var c2 = rand(1,9)*50; P.push(q('🍎$' + a + ' 🥛$' + b + ' 🍞$' + c2 + '. ¿Total?', a+b+c2)); }
      for (i = 0; i < 4; i++) { tot = rand(10,50)*100; g1 = rand(1,6)*100; g2 = rand(1,6)*100; queda = tot-g1-g2; if (queda>0) P.push(q('Tenés $' + tot + '. Comprás por $' + (g1+g2) + '. ¿Cuánto te queda?', queda)); }
    }
    return P;
  }

  /* ================= MUNDO VERDE — 10 NIVELES ================= */
  var VERDES = [
    [ {p:'¿Dónde ponés una botella de plástico?',c:'♻️ Reciclaje',opts:['♻️ Reciclaje','🗑️ Basura','🚽 Inodoro']},
      {p:'¿De qué color es el contenedor de papel?',c:'Azul',opts:['Azul','Rojo','Negro']},
      {p:'¿Qué hacemos con el papel usado?',c:'Lo reciclamos',opts:['Lo reciclamos','Lo tiramos','Lo quemamos']},
      {p:'Cáscara de banana →',c:'Orgánico / compost',opts:['Orgánico / compost','Plástico','Vidrio']},
      {p:'¿Apagamos la luz al salir?',c:'Sí, ahorramos energía',opts:['Sí, ahorramos energía','No, da igual','Solo de noche']},
      {p:'¿Qué contamina más el aire?',c:'Los autos con nafta',opts:['Los autos con nafta','Las bicicletas','Los árboles']} ],
    [ {p:'¿Cuánta agua dulce hay para tomar?',c:'Poca, hay que cuidarla',opts:['Poca, hay que cuidarla','Toda','Ninguna']},
      {p:'¿Cepillarse con la canilla abierta?',c:'No, hay que cerrarla',opts:['No, hay que cerrarla','Sí, siempre','Solo si hace calor']},
      {p:'¿Energía que viene del sol?',c:'Energía solar',opts:['Energía solar','Carbón','Petróleo']},
      {p:'¿Qué limpia el aire?',c:'Los árboles',opts:['Los árboles','Los cigarrillos','Los incendios']},
      {p:'Ducha corta ayuda a...',c:'Ahorrar agua',opts:['Ahorrar agua','Gastar luz','Nada']} ],
    [ {p:'¿Qué necesitan las plantas?',c:'Agua, sol y tierra',opts:['Agua, sol y tierra','Solo sombra','Caramelo']},
      {p:'¿Quién produce miel?',c:'La abeja',opts:['La abeja','La hormiga','El pez']},
      {p:'Las abejas...',c:'Polinizan las plantas',opts:['Polinizan las plantas','Dan miedo','No sirven']},
      {p:'¿Especie en peligro?',c:'Puede desaparecer',opts:['Puede desaparecer','Es muy común','Es de juguete']},
      {p:'Las plantas dan...',c:'Oxígeno',opts:['Oxígeno','Dióxido','Nada']} ],
    [ {p:'¿Qué es la contaminación?',c:'Sucio que daña el planeta',opts:['Sucio que daña el planeta','Una planta','Un juego']},
      {p:'¿Mejor para el planeta?',c:'Reutilizar las cosas',opts:['Reutilizar las cosas','Tirar y comprar nuevo','Usar una sola vez']},
      {p:'Las 3 R son...',c:'Reducir, Reutilizar, Reciclar',opts:['Reducir, Reutilizar, Reciclar','Correr, Saltar, Jugar','Comer, Dormir, Estudiar']},
      {p:'Plástico al mar →',c:'Daña peces y animales',opts:['Daña peces y animales','Desaparece solo','Vira arena']},
      {p:'¿Cómo ayudás al comprar?',c:'Con tu propia bolsa',opts:['Con tu propia bolsa','Muchas bolsas','No comprando nunca']} ],
    [ {p:'Botella de vidrio → contenedor',c:'Verde (vidrio)',opts:['Verde (vidrio)','Amarillo','Azul']},
      {p:'Lata de gaseosa →',c:'Amarillo (metal/plástico)',opts:['Amarillo (metal/plástico)','Azul','Orgánico']},
      {p:'¿Qué es el cambio climático?',c:'La Tierra se calienta',opts:['La Tierra se calienta','Las estaciones','Un cuento']},
      {p:'¿Qué contamina menos?',c:'La bicicleta',opts:['La bicicleta','El auto','El avión']},
      {p:'¿Por qué plantar árboles?',c:'Dan oxígeno y sombra',opts:['Dan oxígeno y sombra','Tapan el sol','No sirven']} ]
  ];
  function genVerde(nivel) {
    var banco = VERDES[Math.min(nivel - 1, VERDES.length - 1)];
    return barajar(banco).slice(0, 8).map(function (x) { return qf(x.p, x.c, x.opts); });
  }

  /* ================= CIENCIA — categorías (ampliado) ================= */
  var CIENCIA = {
    '🐶 Animales': [
      qc('¿Qué animal es el mejor amigo del hombre?','Perro',['Perro','Gato','León']),
      qc('¿Qué animal hace "miau"?','Gato',['Gato','Vaca','Pato']),
      qc('¿Animal más grande del mundo?','Ballena azul',['Ballena azul','Elefante','Jirafa']),
      qc('¿Qué animal tiene trompa?','Elefante',['Elefante','Rinoceronte','Hipopótamo']),
      qc('Las abejas producen...','Miel',['Miel','Leche','Lana']),
      qc('¿Qué animal cambia de color?','Camaleón',['Camaleón','Perro','Caballo']),
      qc('¿Qué animal vuela de noche?','Murciélago',['Murciélago','Gorrión','Pollo']),
      qc('Los peces respiran por...','Branquias',['Branquias','Pulmones','Orejas']),
      qc('¿Verdadero? Los perros nacen de huevos.','Falso',['Verdadero','Falso'])
    ],
    '🪐 Sistema solar': [
      qc('¿Cuál es el planeta rojo?','Marte',['Marte','Venus','Júpiter']),
      qc('¿En qué planeta vivimos?','Tierra',['Tierra','Marte','La Luna']),
      qc('¿Qué estrella nos da luz y calor?','El Sol',['El Sol','La Luna','Júpiter']),
      qc('¿Cuántas lunas tiene la Tierra?','1',['1','2','0']),
      qc('¿Qué planeta tiene anillos?','Saturno',['Saturno','Marte','Mercurio']),
      qc('¿Cómo se llama nuestra galaxia?','Vía Láctea',['Vía Láctea','Andrómeda','Solaris']),
      qc('¿Verdadero? El Sol es una estrella.','Verdadero',['Verdadero','Falso']),
      qc('¿Planeta más cercano al Sol?','Mercurio',['Mercurio','Venus','Tierra'])
    ],
    '🦖 Dinosaurios': [
      qc('¿Dinosaurio carnívoro más famoso?','Tiranosaurio Rex',['Tiranosaurio Rex','Triceratops','Diplodocus']),
      qc('¿Cuál tenía tres cuernos?','Triceratops',['Triceratops','T-Rex','Velociraptor']),
      qc('Se extinguieron por...','Un meteorito y el clima',['Un meteorito y el clima','Se fueron de viaje','Se volvieron piedra']),
      qc('¿Pariente actual de los dinosaurios?','Las aves',['Las aves','Los peces','Los gatos']),
      qc('¿Quién estudia los dinosaurios?','Paleontólogo',['Paleontólogo','Astrónomo','Cocinero']),
      qc('¿Verdadero? Los dinosaurios ponían huevos.','Verdadero',['Verdadero','Falso']),
      qc('¿El dinosaurio más largo?','Diplodocus',['Diplodocus','T-Rex','Pterodáctilo'])
    ],
    '🫀 Cuerpo humano': [
      qc('¿Qué órgano bombea sangre?','El corazón',['El corazón','El pulmón','El estómago']),
      qc('¿Con qué oímos?','Los oídos',['Los oídos','Los ojos','La nariz']),
      qc('¿Cuántos huesos tiene un adulto?','206',['206','100','500']),
      qc('¿Con qué respiramos?','Pulmones',['Pulmones','Hígado','Riñones']),
      qc('¿Qué controla todo el cuerpo?','El cerebro',['El cerebro','El pie','La mano']),
      qc('¿Con qué sentimos los sabores?','La lengua',['La lengua','La nariz','Los ojos']),
      qc('¿Verdadero? El corazón late siempre.','Verdadero',['Verdadero','Falso'])
    ],
    '🌱 Plantas': [
      qc('¿Qué necesitan las plantas?','Agua, luz y tierra',['Agua, luz y tierra','Solo agua','Carne']),
      qc('¿Qué parte está bajo tierra?','La raíz',['La raíz','La hoja','La flor']),
      qc('Las plantas producen...','Oxígeno',['Oxígeno','Dióxido','Nada']),
      qc('¿Qué se convierte en fruto?','La flor',['La flor','La raíz','El tallo']),
      qc('¿Qué gas toman las plantas?','Dióxido de carbono',['Dióxido de carbono','Oxígeno','Helio']),
      qc('¿Verdadero? Todas las plantas tienen flores.','Falso',['Verdadero','Falso'])
    ],
    '🌊 Océanos': [
      qc('¿Océano más grande?','Pacífico',['Pacífico','Atlántico','Índico']),
      qc('¿Qué animal tiene ocho brazos?','Pulpo',['Pulpo','Tiburón','Delfín']),
      qc('El agua del mar es...','Salada',['Salada','Dulce','De jugo']),
      qc('Los corales son...','Animales',['Animales','Piedras','Plantas']),
      qc('¿Verdadero? Los delfines son peces.','Falso',['Verdadero','Falso'])
    ],
    '🌋 Tierra': [
      qc('¿Cuántos continentes hay?','7',['7','5','10']),
      qc('¿En qué continente está Argentina?','América del Sur',['América del Sur','Europa','África']),
      qc('¿Qué es un volcán?','Expulsa lava',['Expulsa lava','Un río','Una nube']),
      qc('¿Qué cubre más la Tierra?','Agua',['Agua','Tierra','Hielo']),
      qc('¿Qué es un terremoto?','Movimiento de la tierra',['Movimiento de la tierra','Viento fuerte','Lluvia']),
      qc('¿Verdadero? La Tierra es plana.','Falso',['Verdadero','Falso'])
    ],
    '🌈 Clima': [
      qc('¿Qué cae cuando llueve?','Agua',['Agua','Arena','Fuego']),
      qc('¿Qué es un arcoíris?','Luz en gotas de agua',['Luz en gotas de agua','Un puente','Una nube']),
      qc('¿En qué estación nieva?','Invierno',['Invierno','Verano','Primavera']),
      qc('¿Verdadero? El trueno se ve antes que el rayo.','Falso',['Verdadero','Falso']),
      qc('¿Qué nube trae tormenta?','Nube oscura',['Nube oscura','Nube blanca','Nube de algodón'])
    ],
    '🌌 Universo': [
      qc('¿Qué es una estrella fugaz?','Un meteoro',['Un meteoro','Una estrella que camina','Un avión']),
      qc('¿La Tierra tarda cuánto en orbitar el Sol?','1 año',['1 año','1 mes','1 día']),
      qc('¿Qué es la Luna?','Un satélite',['Un satélite','Un planeta','Una estrella']),
      qc('¿Verdadero? En el espacio no hay aire.','Verdadero',['Verdadero','Falso'])
    ],
    '🔬 Ciencia': [
      qc('¿Qué estado tiene el hielo?','Sólido',['Sólido','Líquido','Gaseoso']),
      qc('¿El agua hierve a cuántos grados?','100°C',['100°C','50°C','200°C']),
      qc('¿Qué atraen los imanes?','El metal',['El metal','La madera','El plástico']),
      qc('¿Verdadero? La luz viaja más rápido que el sonido.','Verdadero',['Verdadero','Falso']),
      qc('¿Qué necesita el fuego para arder?','Oxígeno',['Oxígeno','Agua','Hielo'])
    ]
  };

  /* ================= IDIOMAS (vocabulario ampliado, 3 idiomas) ================= */
  function v(es, tr, emoji) { return { es: es, tr: tr, emoji: emoji }; }
  var PALABRAS = [
    {es:'Uno',en:'One',pt:'Um',fr:'Un',emoji:'1️⃣'},{es:'Dos',en:'Two',pt:'Dois',fr:'Deux',emoji:'2️⃣'},
    {es:'Tres',en:'Three',pt:'Três',fr:'Trois',emoji:'3️⃣'},{es:'Cuatro',en:'Four',pt:'Quatro',fr:'Quatre',emoji:'4️⃣'},
    {es:'Cinco',en:'Five',pt:'Cinco',fr:'Cinq',emoji:'5️⃣'},{es:'Diez',en:'Ten',pt:'Dez',fr:'Dix',emoji:'🔟'},
    {es:'Rojo',en:'Red',pt:'Vermelho',fr:'Rouge',emoji:'🔴'},{es:'Azul',en:'Blue',pt:'Azul',fr:'Bleu',emoji:'🔵'},
    {es:'Verde',en:'Green',pt:'Verde',fr:'Vert',emoji:'🟢'},{es:'Amarillo',en:'Yellow',pt:'Amarelo',fr:'Jaune',emoji:'🟡'},
    {es:'Perro',en:'Dog',pt:'Cachorro',fr:'Chien',emoji:'🐶'},{es:'Gato',en:'Cat',pt:'Gato',fr:'Chat',emoji:'🐱'},
    {es:'Pájaro',en:'Bird',pt:'Pássaro',fr:'Oiseau',emoji:'🐦'},{es:'Pez',en:'Fish',pt:'Peixe',fr:'Poisson',emoji:'🐟'},
    {es:'Mamá',en:'Mom',pt:'Mãe',fr:'Maman',emoji:'👩'},{es:'Papá',en:'Dad',pt:'Pai',fr:'Papa',emoji:'👨'},
    {es:'Hermano',en:'Brother',pt:'Irmão',fr:'Frère',emoji:'👦'},{es:'Hermana',en:'Sister',pt:'Irmã',fr:'Sœur',emoji:'👧'},
    {es:'Manzana',en:'Apple',pt:'Maçã',fr:'Pomme',emoji:'🍎'},{es:'Pan',en:'Bread',pt:'Pão',fr:'Pain',emoji:'🍞'},
    {es:'Leche',en:'Milk',pt:'Leite',fr:'Lait',emoji:'🥛'},{es:'Agua',en:'Water',pt:'Água',fr:'Eau',emoji:'💧'},
    {es:'Casa',en:'House',pt:'Casa',fr:'Maison',emoji:'🏠'},{es:'Escuela',en:'School',pt:'Escola',fr:'École',emoji:'🏫'},
    {es:'Libro',en:'Book',pt:'Livro',fr:'Livre',emoji:'📚'},{es:'Pelota',en:'Ball',pt:'Bola',fr:'Ballon',emoji:'⚽'},
    {es:'Sol',en:'Sun',pt:'Sol',fr:'Soleil',emoji:'☀️'},{es:'Luna',en:'Moon',pt:'Lua',fr:'Lune',emoji:'🌙'},
    {es:'Árbol',en:'Tree',pt:'Árvore',fr:'Arbre',emoji:'🌳'},{es:'Flor',en:'Flower',pt:'Flor',fr:'Fleur',emoji:'🌸'},
    {es:'Comer',en:'Eat',pt:'Comer',fr:'Manger',emoji:'🍽️'},{es:'Beber',en:'Drink',pt:'Beber',fr:'Boire',emoji:'🥤'},
    {es:'Correr',en:'Run',pt:'Correr',fr:'Courir',emoji:'🏃'},{es:'Jugar',en:'Play',pt:'Brincar',fr:'Jouer',emoji:'🎮'}
  ];
  var SALUDOS = {
    ingles: [v('Hola','Hello','👋'),v('Buenos días','Good morning','🌅'),v('Buenas noches','Good night','🌙'),v('Adiós','Goodbye','👋'),v('Gracias','Thank you','🙏'),v('Por favor','Please','🤲')],
    portugues: [v('Hola','Olá','👋'),v('Buenos días','Bom dia','🌅'),v('Buenas noches','Boa noite','🌙'),v('Adiós','Adeus','👋'),v('Gracias','Obrigado','🙏'),v('Por favor','Por favor','🤲')],
    frances: [v('Hola','Bonjour','👋'),v('Buenas noches','Bonne nuit','🌙'),v('Adiós','Au revoir','👋'),v('Gracias','Merci','🙏'),v('Por favor',"S'il vous plaît",'🤲'),v('Sí','Oui','✅')]
  };
  function porIdioma(lang) {
    var key = { ingles: 'en', portugues: 'pt', frances: 'fr' }[lang];
    return PALABRAS.map(function (p) { return v(p.es, p[key], p.emoji); });
  }
  function armarIdioma(lang, nombre, bandera, code) {
    var base = porIdioma(lang);
    return {
      nombre: nombre, bandera: bandera, lang: code,
      categorias: {
        '👋 Saludos': SALUDOS[lang],
        '🔢 Números': base.slice(0, 6),
        '🎨 Colores': base.slice(6, 10),
        '🐶 Animales': base.slice(10, 14),
        '👨‍👩‍👧 Familia': base.slice(14, 18),
        '🍎 Comida': base.slice(18, 22),
        '🏠 Casa y objetos': base.slice(22, 26),
        '🌳 Naturaleza': base.slice(26, 30),
        '🏃 Verbos': base.slice(30, 34)
      }
    };
  }
  var IDIOMAS = {
    ingles: armarIdioma('ingles', 'Inglés', '🇬🇧', 'en-US'),
    portugues: armarIdioma('portugues', 'Portugués', '🇧🇷', 'pt-BR'),
    frances: armarIdioma('frances', 'Francés', '🇫🇷', 'fr-FR')
  };

  function genQuizIdioma(vocabList, langNombre) {
    return barajar(vocabList).slice(0, Math.min(8, vocabList.length)).map(function (v) {
      var otras = barajar(vocabList.filter(function (x) { return x.tr !== v.tr; })).slice(0, 2).map(function (x) { return x.tr; });
      return { pregunta: '¿Cómo se dice "' + v.es + '" en ' + langNombre + '?', emojiPregunta: v.emoji, opciones: barajar([v.tr].concat(otras)), correcta: v.tr };
    });
  }
  /* Modo escuchar: se reproduce la palabra y se elige la traducción */
  function genQuizEscuchar(vocabList, langCode) {
    return barajar(vocabList).slice(0, Math.min(8, vocabList.length)).map(function (v) {
      var otras = barajar(vocabList.filter(function (x) { return x.tr !== v.tr; })).slice(0, 2).map(function (x) { return x.tr; });
      return { pregunta: '🔊 Escuchá y elegí la palabra correcta', emojiPregunta: '👂', audio: { texto: v.tr, lang: langCode }, opciones: barajar([v.tr].concat(otras)), correcta: v.tr };
    });
  }

  EK.DATOS = EK.DATOS || {};
  EK.DATOS.ciencia = CIENCIA;

  var Mundos = {
    MUNDOS: MUNDOS, genMate: genMate, genDinero: genDinero, genVerde: genVerde,
    CIENCIA: CIENCIA, IDIOMAS: IDIOMAS, genQuizIdioma: genQuizIdioma, genQuizEscuchar: genQuizEscuchar,
    barajar: barajar, opcionesNumericas: opcionesNumericas
  };
  window.EK = window.EK || {};
  window.EK.Mundos = Mundos;
})();
