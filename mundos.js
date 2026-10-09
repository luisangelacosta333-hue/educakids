/* ============================================================
   mundos.js — Datos de los mundos educativos (VERSIÓN SUPER APP)
   Idiomas ULTRA PREMIUM: Cientos de traducciones y audios nativos 
   en Inglés, Portugués y Francés.
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
    if (nivel === 1) { 
      var n1 = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'];
      for (i = 0; i < 6; i++) { a = rand(1, 9); P.push(qf('¿Qué número es?  ' + n1[a-1], a, barajar([a, a+rand(1,3), Math.max(1,a-rand(1,3))].map(String)))); }
      for (i = 0; i < 4; i++) { nums = barajar([rand(1,9), rand(1,9), rand(1,9)].map(String)); P.push(qf('Tocá el número ' + nums[0], nums[0], nums)); }
    } else if (nivel === 2) { 
      for (i = 0; i < 8; i++) { c = rand(2, 10); em = EMO[rand(0, EMO.length-1)]; P.push(q('¿Cuántos ' + em + ' hay?', c, opcionesNumericas(c), em.repeat(c))); }
    } else if (nivel === 3) { 
      for (i = 0; i < 8; i++) { a = rand(1,5); b = rand(1,5); P.push(q('¿Cuánto es ' + a + ' + ' + b + '?', a+b)); }
    } else if (nivel === 4) { 
      for (i = 0; i < 5; i++) { a = rand(3,9); b = rand(1,a-1); P.push(q('¿Cuánto es ' + a + ' − ' + b + '?', a-b)); }
      for (i = 0; i < 3; i++) { a = rand(5,12); b = rand(1,5); P.push(q('¿Cuánto es ' + a + ' − ' + b + '?', a-b)); }
    } else if (nivel === 5) { 
      for (i = 0; i < 5; i++) { nn = [rand(10,99), rand(10,99), rand(10,99)]; mm = Math.max.apply(null, nn); P.push(qf('¿Cuál es el MAYOR?  ' + nn.join(' · '), mm, barajar(nn.map(String)))); }
      for (i = 0; i < 5; i++) { nn = [rand(10,99), rand(10,99), rand(10,99)]; mm = Math.min.apply(null, nn); P.push(qf('¿Cuál es el MENOR?  ' + nn.join(' · '), mm, barajar(nn.map(String)))); }
    } else if (nivel === 6) { 
      for (i = 0; i < 6; i++) { a = rand(2,5); b = [2,5,10][rand(0,2)]; P.push(q('¿Cuánto es ' + a + ' × ' + b + '?', a*b)); }
      for (i = 0; i < 4; i++) { a = rand(2,9); b = rand(2,5); P.push(q('¿Cuánto es ' + a + ' × ' + b + '?', a*b)); }
    } else if (nivel === 7) { 
      for (i = 0; i < 8; i++) { b = rand(2,9); c = rand(2,9); a = b*c; P.push(q('¿Cuánto es ' + a + ' ÷ ' + b + '?', c)); }
    } else if (nivel === 8) { 
      var series = [[2,4,6,8,10],[1,3,5,7,9],[5,10,15,20,25],[3,6,9,12,15],[10,20,30,40,50],[1,2,4,8,16],[2,6,10,14,18],[4,8,12,16,20]];
      barajar(series).slice(0,6).forEach(function(s){ P.push(qf('¿Qué número sigue?  ' + s.slice(0,4).join(' · ') + ' · ?', s[4], opcionesNumericas(s[4]))); });
      for (i = 0; i < 4; i++) { a = rand(2,9); b = rand(2,9); P.push(q('¿Cuánto es ' + a + ' × ' + b + '?', a*b)); }
    } else if (nivel === 9) { 
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
    } else { 
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
    ]
  };

  /* ================= IDIOMAS ULTRA PREMIUM (133 Palabras + Frases) ================= */
  function v(es, tr, emoji) { return { es: es, tr: tr, emoji: emoji }; }
  
  // Base de datos de palabras masiva, estructurada ordenadamente para usar indices
  var PALABRAS = [
    // 0-11: Números (12)
    {es:'Cero',en:'Zero',pt:'Zero',fr:'Zéro',emoji:'0️⃣'}, {es:'Uno',en:'One',pt:'Um',fr:'Un',emoji:'1️⃣'}, {es:'Dos',en:'Two',pt:'Dois',fr:'Deux',emoji:'2️⃣'}, {es:'Tres',en:'Three',pt:'Três',fr:'Trois',emoji:'3️⃣'}, {es:'Cuatro',en:'Four',pt:'Quatro',fr:'Quatre',emoji:'4️⃣'}, {es:'Cinco',en:'Five',pt:'Cinco',fr:'Cinq',emoji:'5️⃣'}, {es:'Seis',en:'Six',pt:'Seis',fr:'Six',emoji:'6️⃣'}, {es:'Siete',en:'Seven',pt:'Sete',fr:'Sept',emoji:'7️⃣'}, {es:'Ocho',en:'Eight',pt:'Oito',fr:'Huit',emoji:'8️⃣'}, {es:'Nueve',en:'Nine',pt:'Nove',fr:'Neuf',emoji:'9️⃣'}, {es:'Diez',en:'Ten',pt:'Dez',fr:'Dix',emoji:'🔟'}, {es:'Cien',en:'One hundred',pt:'Cem',fr:'Cent',emoji:'💯'},

    // 12-23: Colores (12)
    {es:'Rojo',en:'Red',pt:'Vermelho',fr:'Rouge',emoji:'🔴'}, {es:'Azul',en:'Blue',pt:'Azul',fr:'Bleu',emoji:'🔵'}, {es:'Verde',en:'Green',pt:'Verde',fr:'Vert',emoji:'🟢'}, {es:'Amarillo',en:'Yellow',pt:'Amarelo',fr:'Jaune',emoji:'🟡'}, {es:'Naranja',en:'Orange',pt:'Laranja',fr:'Orange',emoji:'🟠'}, {es:'Morado',en:'Purple',pt:'Roxo',fr:'Violet',emoji:'🟣'}, {es:'Rosa',en:'Pink',pt:'Rosa',fr:'Rose',emoji:'🌸'}, {es:'Marrón',en:'Brown',pt:'Marrom',fr:'Marron',emoji:'🟤'}, {es:'Negro',en:'Black',pt:'Preto',fr:'Noir',emoji:'⚫'}, {es:'Blanco',en:'White',pt:'Branco',fr:'Blanc',emoji:'⚪'}, {es:'Gris',en:'Gray',pt:'Cinza',fr:'Gris',emoji:'🐘'}, {es:'Celeste',en:'Light blue',pt:'Azul claro',fr:'Bleu clair',emoji:'💧'},

    // 24-38: Animales (15)
    {es:'Perro',en:'Dog',pt:'Cachorro',fr:'Chien',emoji:'🐶'}, {es:'Gato',en:'Cat',pt:'Gato',fr:'Chat',emoji:'🐱'}, {es:'Pájaro',en:'Bird',pt:'Pássaro',fr:'Oiseau',emoji:'🐦'}, {es:'Pez',en:'Fish',pt:'Peixe',fr:'Poisson',emoji:'🐟'}, {es:'Caballo',en:'Horse',pt:'Cavalo',fr:'Cheval',emoji:'🐴'}, {es:'Vaca',en:'Cow',pt:'Vaca',fr:'Vache',emoji:'🐮'}, {es:'Cerdo',en:'Pig',pt:'Porco',fr:'Cochon',emoji:'🐷'}, {es:'Oveja',en:'Sheep',pt:'Ovelha',fr:'Mouton',emoji:'🐑'}, {es:'León',en:'Lion',pt:'Leão',fr:'Lion',emoji:'🦁'}, {es:'Tigre',en:'Tiger',pt:'Tigre',fr:'Tigre',emoji:'🐯'}, {es:'Mono',en:'Monkey',pt:'Macaco',fr:'Singe',emoji:'🐵'}, {es:'Elefante',en:'Elephant',pt:'Elefante',fr:'Éléphant',emoji:'🐘'}, {es:'Oso',en:'Bear',pt:'Urso',fr:'Ours',emoji:'🐻'}, {es:'Ratón',en:'Mouse',pt:'Rato',fr:'Souris',emoji:'🐭'}, {es:'Pato',en:'Duck',pt:'Pato',fr:'Canard',emoji:'🦆'},

    // 39-48: Familia (10)
    {es:'Mamá',en:'Mom',pt:'Mãe',fr:'Maman',emoji:'👩'}, {es:'Papá',en:'Dad',pt:'Pai',fr:'Papa',emoji:'👨'}, {es:'Hermano',en:'Brother',pt:'Irmão',fr:'Frère',emoji:'👦'}, {es:'Hermana',en:'Sister',pt:'Irmã',fr:'Sœur',emoji:'👧'}, {es:'Bebé',en:'Baby',pt:'Bebê',fr:'Bébé',emoji:'👶'}, {es:'Abuelo',en:'Grandpa',pt:'Avô',fr:'Grand-père',emoji:'👴'}, {es:'Abuela',en:'Grandma',pt:'Avó',fr:'Grand-mère',emoji:'👵'}, {es:'Tío',en:'Uncle',pt:'Tio',fr:'Oncle',emoji:'🧔'}, {es:'Tía',en:'Aunt',pt:'Tia',fr:'Tante',emoji:'👩‍🦰'}, {es:'Primo',en:'Cousin',pt:'Primo',fr:'Cousin',emoji:'👦'},

    // 49-63: Comida (15)
    {es:'Manzana',en:'Apple',pt:'Maçã',fr:'Pomme',emoji:'🍎'}, {es:'Pan',en:'Bread',pt:'Pão',fr:'Pain',emoji:'🍞'}, {es:'Leche',en:'Milk',pt:'Leite',fr:'Lait',emoji:'🥛'}, {es:'Agua',en:'Water',pt:'Água',fr:'Eau',emoji:'💧'}, {es:'Queso',en:'Cheese',pt:'Queijo',fr:'Fromage',emoji:'🧀'}, {es:'Carne',en:'Meat',pt:'Carne',fr:'Viande',emoji:'🥩'}, {es:'Pollo',en:'Chicken',pt:'Frango',fr:'Poulet',emoji:'🍗'}, {es:'Pescado',en:'Fish',pt:'Peixe',fr:'Poisson',emoji:'🐠'}, {es:'Arroz',en:'Rice',pt:'Arroz',fr:'Riz',emoji:'🍚'}, {es:'Huevo',en:'Egg',pt:'Ovo',fr:'Œuf',emoji:'🥚'}, {es:'Fruta',en:'Fruit',pt:'Fruta',fr:'Fruit',emoji:'🍓'}, {es:'Verdura',en:'Vegetable',pt:'Vegetal',fr:'Légume',emoji:'🥦'}, {es:'Pizza',en:'Pizza',pt:'Pizza',fr:'Pizza',emoji:'🍕'}, {es:'Torta',en:'Cake',pt:'Bolo',fr:'Gâteau',emoji:'🎂'}, {es:'Helado',en:'Ice cream',pt:'Sorvete',fr:'Glace',emoji:'🍦'},

    // 64-77: Casa y Escuela (14)
    {es:'Casa',en:'House',pt:'Casa',fr:'Maison',emoji:'🏠'}, {es:'Escuela',en:'School',pt:'Escola',fr:'École',emoji:'🏫'}, {es:'Libro',en:'Book',pt:'Livro',fr:'Livre',emoji:'📚'}, {es:'Pelota',en:'Ball',pt:'Bola',fr:'Ballon',emoji:'⚽'}, {es:'Lápiz',en:'Pencil',pt:'Lápis',fr:'Crayon',emoji:'✏️'}, {es:'Mesa',en:'Table',pt:'Mesa',fr:'Table',emoji:'🪑'}, {es:'Silla',en:'Chair',pt:'Cadeira',fr:'Chaise',emoji:'🪑'}, {es:'Cama',en:'Bed',pt:'Cama',fr:'Lit',emoji:'🛏️'}, {es:'Puerta',en:'Door',pt:'Porta',fr:'Porte',emoji:'🚪'}, {es:'Ventana',en:'Window',pt:'Janela',fr:'Fenêtre',emoji:'🪟'}, {es:'Baño',en:'Bathroom',pt:'Banheiro',fr:'Salle de bain',emoji:'🚽'}, {es:'Cocina',en:'Kitchen',pt:'Cozinha',fr:'Cuisine',emoji:'🍳'}, {es:'Juguete',en:'Toy',pt:'Brinquedo',fr:'Jouet',emoji:'🧸'}, {es:'Computadora',en:'Computer',pt:'Computador',fr:'Ordinateur',emoji:'💻'},

    // 78-87: Naturaleza y Clima (10)
    {es:'Sol',en:'Sun',pt:'Sol',fr:'Soleil',emoji:'☀️'}, {es:'Luna',en:'Moon',pt:'Lua',fr:'Lune',emoji:'🌙'}, {es:'Estrella',en:'Star',pt:'Estrela',fr:'Étoile',emoji:'⭐'}, {es:'Árbol',en:'Tree',pt:'Árvore',fr:'Arbre',emoji:'🌳'}, {es:'Flor',en:'Flower',pt:'Flor',fr:'Fleur',emoji:'🌸'}, {es:'Lluvia',en:'Rain',pt:'Chuva',fr:'Pluie',emoji:'🌧️'}, {es:'Nieve',en:'Snow',pt:'Neve',fr:'Neige',emoji:'❄️'}, {es:'Fuego',en:'Fire',pt:'Fogo',fr:'Feu',emoji:'🔥'}, {es:'Montaña',en:'Mountain',pt:'Montanha',fr:'Montagne',emoji:'⛰️'}, {es:'Río',en:'River',pt:'Rio',fr:'Rivière',emoji:'🏞️'},

    // 88-97: Cuerpo Humano (10)
    {es:'Cabeza',en:'Head',pt:'Cabeça',fr:'Tête',emoji:'👤'}, {es:'Mano',en:'Hand',pt:'Mão',fr:'Main',emoji:'🖐️'}, {es:'Pie',en:'Foot',pt:'Pé',fr:'Pied',emoji:'🦶'}, {es:'Ojo',en:'Eye',pt:'Olho',fr:'Œil',emoji:'👁️'}, {es:'Oreja',en:'Ear',pt:'Orelha',fr:'Oreille',emoji:'👂'}, {es:'Boca',en:'Mouth',pt:'Boca',fr:'Bouche',emoji:'👄'}, {es:'Nariz',en:'Nose',pt:'Nariz',fr:'Nez',emoji:'👃'}, {es:'Brazo',en:'Arm',pt:'Braço',fr:'Bras',emoji:'💪'}, {es:'Pierna',en:'Leg',pt:'Perna',fr:'Jambe',emoji:'🦵'}, {es:'Diente',en:'Tooth',pt:'Dente',fr:'Dent',emoji:'🦷'},

    // 98-105: Transporte y Ciudad (8)
    {es:'Auto',en:'Car',pt:'Carro',fr:'Voiture',emoji:'🚗'}, {es:'Autobús',en:'Bus',pt:'Ônibus',fr:'Bus',emoji:'🚌'}, {es:'Tren',en:'Train',pt:'Trem',fr:'Train',emoji:'🚆'}, {es:'Avión',en:'Plane',pt:'Avião',fr:'Avion',emoji:'✈️'}, {es:'Bicicleta',en:'Bike',pt:'Bicicleta',fr:'Vélo',emoji:'🚲'}, {es:'Barco',en:'Boat',pt:'Barco',fr:'Bateau',emoji:'⛵'}, {es:'Calle',en:'Street',pt:'Rua',fr:'Rue',emoji:'🛣️'}, {es:'Ciudad',en:'City',pt:'Cidade',fr:'Ville',emoji:'🏙️'},

    // 106-117: Adjetivos y Emociones (12)
    {es:'Feliz',en:'Happy',pt:'Feliz',fr:'Heureux',emoji:'😊'}, {es:'Triste',en:'Sad',pt:'Triste',fr:'Triste',emoji:'😢'}, {es:'Enojado',en:'Angry',pt:'Bravo',fr:'En colère',emoji:'😡'}, {es:'Asustado',en:'Scared',pt:'Assustado',fr:'Effrayé',emoji:'😨'}, {es:'Grande',en:'Big',pt:'Grande',fr:'Grand',emoji:'🐘'}, {es:'Pequeño',en:'Small',pt:'Pequeno',fr:'Petit',emoji:'🐜'}, {es:'Rápido',en:'Fast',pt:'Rápido',fr:'Rapide',emoji:'🐇'}, {es:'Lento',en:'Slow',pt:'Lento',fr:'Lent',emoji:'🐢'}, {es:'Bueno',en:'Good',pt:'Bom',fr:'Bon',emoji:'👍'}, {es:'Malo',en:'Bad',pt:'Ruim',fr:'Mauvais',emoji:'👎'}, {es:'Caliente',en:'Hot',pt:'Quente',fr:'Chaud',emoji:'🔥'}, {es:'Frío',en:'Cold',pt:'Frio',fr:'Froid',emoji:'❄️'},

    // 118-132: Verbos y Acciones (15)
    {es:'Comer',en:'Eat',pt:'Comer',fr:'Manger',emoji:'🍽️'}, {es:'Beber',en:'Drink',pt:'Beber',fr:'Boire',emoji:'🥤'}, {es:'Correr',en:'Run',pt:'Correr',fr:'Courir',emoji:'🏃'}, {es:'Jugar',en:'Play',pt:'Brincar',fr:'Jouer',emoji:'🎮'}, {es:'Leer',en:'Read',pt:'Ler',fr:'Lire',emoji:'📖'}, {es:'Escribir',en:'Write',pt:'Escrever',fr:'Écrire',emoji:'✍️'}, {es:'Dormir',en:'Sleep',pt:'Dormir',fr:'Dormir',emoji:'😴'}, {es:'Caminar',en:'Walk',pt:'Andar',fr:'Marcher',emoji:'🚶'}, {es:'Saltar',en:'Jump',pt:'Pular',fr:'Sauter',emoji:'🦘'}, {es:'Escuchar',en:'Listen',pt:'Ouvir',fr:'Écouter',emoji:'🎧'}, {es:'Hablar',en:'Speak',pt:'Falar',fr:'Parler',emoji:'🗣️'}, {es:'Ver',en:'See',pt:'Ver',fr:'Voir',emoji:'👀'}, {es:'Cantar',en:'Sing',pt:'Cantar',fr:'Chanter',emoji:'🎤'}, {es:'Bailar',en:'Dance',pt:'Dançar',fr:'Danser',emoji:'💃'}, {es:'Reír',en:'Laugh',pt:'Rir',fr:'Rire',emoji:'😂'}
  ];

  // Frases de comunicación estructuradas (Super útiles)
  var SALUDOS = {
    ingles: [
      v('Hola','Hello','👋'), v('Adiós','Goodbye','👋'),
      v('Buenos días','Good morning','🌅'), v('Buenas tardes','Good afternoon','🌇'), v('Buenas noches','Good night','🌙'),
      v('Gracias','Thank you','🙏'), v('Por favor','Please','🤲'), v('De nada',"You're welcome",'🙌'),
      v('Sí','Yes','✅'), v('No','No','❌'), v('Perdón','Sorry','🥺'), v('Disculpe','Excuse me','🙋'),
      v('¿Cómo estás?','How are you?','❓'), v('Estoy bien','I am fine','😊'), 
      v('¿Cómo te llamas?','What is your name?','📛'), v('Me llamo...','My name is...','👤')
    ],
    portugues: [
      v('Hola','Olá','👋'), v('Adiós','Tchau','👋'),
      v('Buenos días','Bom dia','🌅'), v('Buenas tardes','Boa tarde','🌇'), v('Buenas noches','Boa noite','🌙'),
      v('Gracias','Obrigado','🙏'), v('Por favor','Por favor','🤲'), v('De nada','De nada','🙌'),
      v('Sí','Sim','✅'), v('No','Não','❌'), v('Perdón','Desculpe','🥺'), v('Disculpe','Com licença','🙋'),
      v('¿Cómo estás?','Como vai você?','❓'), v('Estoy bien','Eu estou bem','😊'), 
      v('¿Cómo te llamas?','Qual é o seu nome?','📛'), v('Me llamo...','Meu nome é...','👤')
    ],
    frances: [
      v('Hola','Bonjour','👋'), v('Adiós','Au revoir','👋'),
      v('Buenos días','Bonjour','🌅'), v('Buenas tardes','Bon après-midi','🌇'), v('Buenas noches','Bonne nuit','🌙'),
      v('Gracias','Merci','🙏'), v('Por favor',"S'il vous plaît",'🤲'), v('De nada','De rien','🙌'),
      v('Sí','Oui','✅'), v('No','Non','❌'), v('Perdón','Désolé','🥺'), v('Disculpe','Excusez-moi','🙋'),
      v('¿Cómo estás?','Comment ça va ?','❓'), v('Estoy bien','Je vais bien','😊'), 
      v('¿Cómo te llamas?','Comment tu t\'appelles ?','📛'), v('Me llamo...','Je m\'appelle...','👤')
    ]
  };

  function porIdioma(lang) {
    var key = { ingles: 'en', portugues: 'pt', frances: 'fr' }[lang];
    return PALABRAS.map(function (p) { return v(p.es, p[key], p.emoji); });
  }

  // Ahora 'armarIdioma' procesa las 12 categorías sin tocar la lógica del motor
  function armarIdioma(lang, nombre, bandera, code) {
    var base = porIdioma(lang);
    return {
      nombre: nombre, bandera: bandera, lang: code,
      categorias: {
        '💬 Saludos y Frases': SALUDOS[lang],
        '🔢 Números': base.slice(0, 12),
        '🎨 Colores': base.slice(12, 24),
        '🐶 Animales': base.slice(24, 39),
        '👨‍👩‍👧 Familia': base.slice(39, 49),
        '🍎 Comida': base.slice(49, 64),
        '🏫 Casa y Escuela': base.slice(64, 78),
        '🌳 Naturaleza y Clima': base.slice(78, 88),
        '👤 Cuerpo Humano': base.slice(88, 98),
        '🚗 Transporte y Ciudad': base.slice(98, 106),
        '😊 Adjetivos y Emociones': base.slice(106, 118),
        '🏃 Verbos y Acciones': base.slice(118, 133)
      }
    };
  }

  var IDIOMAS = {
    ingles: armarIdioma('ingles', 'Inglés', '🇬🇧', 'en-US'),
    portugues: armarIdioma('portugues', 'Portugués', '🇧🇷', 'pt-BR'),
    frances: armarIdioma('frances', 'Francés', '🇫🇷', 'fr-FR')
  };

  // El motor de juego utilizará estas cientos de palabras automáticamente
  function genQuizIdioma(vocabList, langNombre) {
    return barajar(vocabList).slice(0, Math.min(8, vocabList.length)).map(function (v) {
      var otras = barajar(vocabList.filter(function (x) { return x.tr !== v.tr; })).slice(0, 2).map(function (x) { return x.tr; });
      return { pregunta: '¿Cómo se dice "' + v.es + '" en ' + langNombre + '?', emojiPregunta: v.emoji, opciones: barajar([v.tr].concat(otras)), correcta: v.tr };
    });
  }

  /* Modo escuchar (¡Aprenderán a hablar escuchando!): se reproduce la palabra nativa y se elige la traducción */
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
