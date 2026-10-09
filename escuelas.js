/* ============================================================
   escuelas.js — 3 ESCUELAS DEL FUTURO (IA, Programación, Robótica)
   Cada escuela tiene 5 niveles (Explorador → Experto) y 10
   actividades reales: quiz, ordenar secuencias, clasificar y
   construir/ensamblar. Al completar los 5 niveles → certificado.
   ============================================================ */
(function () {
  'use strict';
  var esc = EK.Engine.escapeHtml;
  var barajar = EK.Engine.barajar;
  var timers = [];
  function limpiarTimers() { timers.forEach(clearTimeout); timers = []; }
  function despues(ms, fn) { var t = setTimeout(fn, ms); timers.push(t); return t; }

  var NIVELES_NOMBRES = ['Explorador', 'Aprendiz', 'Creador', 'Inventor', 'Experto'];
  var NIVELES_EMOJIS = ['🔍', '📘', '🎨', '💡', '🏆'];

  function qz(p, c, opts) { return { pregunta: p, opciones: barajar(opts.map(String)), correcta: String(c) }; }

  /* ==================== DATOS DE LAS 3 ESCUELAS ==================== */
  var ESCUELAS = {
    ia: {
      nombre: 'Inteligencia Artificial', emoji: '🤖', color: '#6C5CE7',
      niveles: [
        { nombre: NIVELES_NOMBRES[0], actividades: [
          { tipo: 'quiz', nombre: 'Conocé la IA', emoji: '🤖', preguntas: [
            qz('¿Qué es la inteligencia artificial?','Una computadora que aprende',['Una computadora que aprende','Un robot que come','Un juguete de plástico']),
            qz('¿Cuál de estos usa IA?','Un asistente de voz como Siri',['Un asistente de voz como Siri','Un lápiz','Una pelota']),
            qz('¿Puede la IA equivocarse?','Sí, hay que verificar',['Sí, hay que verificar','No, siempre acierta','Nunca se equivoca']),
            qz('¿Qué aprende una IA?','De ejemplos y datos',['De ejemplos y datos','De la nada','Solo de libros'])
          ]},
          { tipo: 'clasificar', nombre: 'Detective de imágenes', emoji: '🔍', instruccion: 'Tocá SOLO los ANIMALES 🐾', items: [
            { t: '🐶 Perro', ok: true }, { t: '🚗 Auto', ok: false }, { t: '🐱 Gato', ok: true },
            { t: '🍎 Manzana', ok: false }, { t: '🐦 Pájaro', ok: true }, { t: '⚽ Pelota', ok: false }, { t: '🐟 Pez', ok: true }
          ]}
        ]},
        { nombre: NIVELES_NOMBRES[1], actividades: [
          { tipo: 'clasificar', nombre: 'Entrená a tu robot', emoji: '🎓', instruccion: 'Enseñale al robot: tocá SOLO las FRUTAS 🍎', items: [
            { t: '🍌 Banana', ok: true }, { t: '👟 Zapatilla', ok: false }, { t: '🍓 Frutilla', ok: true },
            { t: '📚 Libro', ok: false }, { t: '🍇 Uvas', ok: true }, { t: '🪑 Silla', ok: false }, { t: '🍉 Sandía', ok: true }
          ]},
          { tipo: 'quiz', nombre: 'Adiviná el objeto', emoji: '❓', preguntas: [
            qz('Pista: tiene pantalla y te comunicás. ¿Qué es?','Un celular',['Un celular','Una mesa','Una piedra']),
            qz('Pista: vuela y lleva personas. ¿Qué es?','Un avión',['Un avión','Un barco','Un auto']),
            qz('Pista: enfría los alimentos. ¿Qué es?','Una heladera',['Una heladera','Una cama','Una lámpara']),
            qz('Pista: sirve para escribir en papel. ¿Qué es?','Un lápiz',['Un lápiz','Una pelota','Un zapato'])
          ]}
        ]},
        { nombre: NIVELES_NOMBRES[2], actividades: [
          { tipo: 'ordenar', nombre: 'Robot obediente', emoji: '🦾', instruccion: 'Ordená los pasos para hacer un sándwich 🥪', pasos: ['1️⃣ Agarrar el pan','2️⃣ Untar queso','3️⃣ Poner el jamón','4️⃣ Cerrar el sándwich'] },
          { tipo: 'construir', nombre: 'Creá tu personaje', emoji: '🧑‍🚀', instruccion: 'Construí tu personaje en orden', partes: ['🟦 Cuerpo','😀 Cabeza','👀 Ojos','🎩 Accesorio'], final: '✨ ¡Personaje creado!' }
        ]},
        { nombre: NIVELES_NOMBRES[3], actividades: [
          { tipo: 'quiz', nombre: 'Verdadero o falso', emoji: '✅', preguntas: [
            qz('¿La IA siempre dice la verdad?','Falso: hay que verificar',['Falso: hay que verificar','Verdadero: nunca se equivoca']),
            qz('¿Debo compartir mi contraseña con una IA?','No, es privada',['No, es privada','Sí, a cualquiera','Solo si me pide']),
            qz('¿Una foto falsa (deepfake) puede engañar?','Sí, hay que dudar',['Sí, hay que dudar','No, se nota siempre','Son siempre reales']),
            qz('¿Está bien que una IA use mis datos sin permiso?','No, hay que pedir permiso',['No, hay que pedir permiso','Sí, puede usar todo','No importa'])
          ]},
          { tipo: 'quiz', nombre: 'Misión inteligente', emoji: '🧠', preguntas: [
            qz('Si llueve, ¿qué hacés?','Llevas paraguas',['Llevas paraguas','Salís sin nada','Te olvidás']),
            qz('Para encontrar un objeto perdido, primero...','Pensás dónde lo viste',['Pensás dónde lo viste','Tirás todo','Llorás']),
            qz('Si una IA te da una respuesta, debés...','Verificarla con otra fuente',['Verificarla con otra fuente','Creerla ciegamente','Ignorarla siempre']),
            qz('¿Qué es mejor para decidir?','Pensar y verificar',['Pensar y verificar','Hacerlo al azar','No hacer nada'])
          ]}
        ]},
        { nombre: NIVELES_NOMBRES[4], actividades: [
          { tipo: 'quiz', nombre: 'Cuidá tus datos', emoji: '🔒', preguntas: [
            qz('¿Cuál dato NO debés dar online?','Tu dirección y contraseña',['Tu dirección y contraseña','Tu color favorito','Tu juego preferido']),
            qz('Si un desconocido te pide fotos, ¿qué hacés?','Decirle que no y contarle a un adulto',['Decirle que no y contarle a un adulto','Enviarlas','Bloquearlo sin decir nada']),
            qz('¿Qué es una contraseña segura?','Larga y con números y letras',['Larga y con números y letras','1234','Tu nombre']),
            qz('¿Está bien copiar todo lo que dice una IA?','No, hay que pensar y verificar',['No, hay que pensar y verificar','Sí, siempre','Solo en matemáticas'])
          ]},
          { tipo: 'quiz', nombre: 'Desafío final de IA', emoji: '🏆', preguntas: [
            qz('¿Qué hace una IA?','Aprende de ejemplos',['Aprende de ejemplos','Come pasto','Vuela']),
            qz('Antes de creer una información, hay que...','Verificarla',['Verificarla','Compartirla','Borrarla']),
            qz('¿Quién controla el uso de la IA?','Las personas que la programan',['Las personas que la programan','Los animales','La luna']),
            qz('¿La IA puede ayudar a los médicos?','Sí, como herramienta',['Sí, como herramienta','No, nunca','Solo a los maestros'])
          ]}
        ]}
      ]
    },
    programacion: {
      nombre: 'Programación y Videojuegos', emoji: '💻', color: '#00B894',
      niveles: [
        { nombre: NIVELES_NOMBRES[0], actividades: [
          { tipo: 'ordenar', nombre: 'Programá al robot', emoji: '🤖', instruccion: 'Ordená las instrucciones para que el robot llegue a la meta 🏁', pasos: ['⬆️ Avanzar','➡️ Girar a la derecha','⬆️ Avanzar','🏁 Llegar a la meta'] },
          { tipo: 'quiz', nombre: 'Detecta el error', emoji: '🐛', preguntas: [
            qz('Para avanzar 3 veces, ¿cuál está bien?','Avanzar, Avanzar, Avanzar',['Avanzar, Avanzar, Avanzar','Saltar, Saltar','Girar, Parar']),
            qz('¿Qué es un error (bug)?','Una instrucción que no funciona',['Una instrucción que no funciona','Un insecto de verdad','Un premio']),
            qz('Si el robot no se mueve, primero...','Revisás las instrucciones',['Revisás las instrucciones','Lo rompés','Te vas']),
            qz('¿Qué es una instrucción?','Una orden para la computadora',['Una orden para la computadora','Un juego','Un color'])
          ]}
        ]},
        { nombre: NIVELES_NOMBRES[1], actividades: [
          { tipo: 'ordenar', nombre: 'Laberinto programado', emoji: '🌀', instruccion: 'Ordená los movimientos para salir del laberinto', pasos: ['➡️ Derecha','⬆️ Arriba','➡️ Derecha','⬇️ Abajo','🏁 Salida'] },
          { tipo: 'quiz', nombre: 'Aprendé los bucles', emoji: '🔁', preguntas: [
            qz('¿Qué es un bucle?','Repetir una acción varias veces',['Repetir una acción varias veces','Un tipo de comida','Un error']),
            qz('Para saltar 5 veces, usás...','Un bucle con "saltar"',['Un bucle con "saltar"','Escribir "saltar" 100 veces','No hacer nada']),
            qz('¿Repetir "avanzar" 3 veces es más corto con...','Un bucle',['Un bucle','Escribirlo 3 veces','Borrarlo']),
            qz('¿Un bucle infinito es...','Uno que no termina nunca',['Uno que no termina nunca','Muy rápido','Un premio'])
          ]}
        ]},
        { nombre: NIVELES_NOMBRES[2], actividades: [
          { tipo: 'quiz', nombre: 'Si ocurre esto...', emoji: '❓', preguntas: [
            qz('SI llueve, ENTONCES...','Llevas paraguas',['Llevas paraguas','Salís en ojotas','No salís nunca']),
            qz('SI te tocás un obstáculo, SINO...','Saltás o girás',['Saltás o girás','Seguís de largo','Te dormís']),
            qz('¿Qué es una condición?','Una pregunta con sí o no',['Una pregunta con sí o no','Un número','Un color']),
            qz('SI tenés 0 vidas, ENTONCES...','Perdés el nivel',['Perdés el nivel','Ganás','Seguís jugando para siempre'])
          ]},
          { tipo: 'clasificar', nombre: 'Cazador de errores', emoji: '🔍', instruccion: 'Tocá SOLO las instrucciones CORRECTAS ✅', items: [
            { t: '✅ Avanzar', ok: true }, { t: '❌ Flotar en el aire', ok: false }, { t: '✅ Girar', ok: true },
            { t: '❌ Convertirse en mago', ok: false }, { t: '✅ Saltar', ok: true }, { t: '❌ Leer la mente', ok: false }, { t: '✅ Parar', ok: true }
          ]}
        ]},
        { nombre: NIVELES_NOMBRES[3], actividades: [
          { tipo: 'ordenar', nombre: 'Saltos y obstáculos', emoji: '🦘', instruccion: 'Ordená: superá los obstáculos hasta la meta', pasos: ['⬆️ Avanzar','🦘 Saltar el pozo','⬆️ Avanzar','🦘 Saltar la pared','🏁 Meta'] },
          { tipo: 'construir', nombre: 'Creá una historia', emoji: '📖', instruccion: 'Armá tu historia en orden', partes: ['🦸 Personaje','🏰 Escenario','⚔️ Acción','🎉 Final feliz'], final: '📖 ¡Historia creada!' }
        ]},
        { nombre: NIVELES_NOMBRES[4], actividades: [
          { tipo: 'quiz', nombre: 'Fábrica de videojuegos', emoji: '🎮', preguntas: [
            qz('Todo juego necesita...','Un objetivo y reglas',['Un objetivo y reglas','Solo colores','Muchos botones sin sentido']),
            qz('¿Qué es un nivel?','Una parte del juego con un reto',['Una parte del juego con un reto','Un personaje','Un sonido']),
            qz('¿Qué hace divertido a un juego?','Un reto que se puede superar',['Un reto que se puede superar','Que sea imposible','Que no haya meta']),
            qz('¿Qué probás antes de publicar un juego?','Que funcione bien',['Que funcione bien','Nada','Solo los colores'])
          ]},
          { tipo: 'construir', nombre: 'Proyecto final: tu juego', emoji: '🏆', instruccion: 'Diseñá tu videojuego en orden', partes: ['🦸 Personaje','🎯 Meta','🧱 Obstáculos','⭐ Premio','🎮 ¡A jugar!'], final: '🎮 ¡Tu videojuego está listo!' }
        ]}
      ]
    },
    robotica: {
      nombre: 'Robótica e Inventos', emoji: '⚙️', color: '#E17055',
      niveles: [
        { nombre: NIVELES_NOMBRES[0], actividades: [
          { tipo: 'construir', nombre: 'Construí tu robot', emoji: '🤖', instruccion: 'Ensamblá tu robot en orden', partes: ['⬜ Base','🛞 Ruedas','📦 Cuerpo','🔋 Batería','🤖 Cabeza'], final: '🤖 ¡Robot ensamblado!' },
          { tipo: 'construir', nombre: 'Circuito luminoso', emoji: '💡', instruccion: 'Armá el circuito para encender la luz', partes: ['🔋 Batería','🔌 Cable','🔘 Interruptor','💡 Bombilla'], final: '💡 ¡La luz se encendió!' }
        ]},
        { nombre: NIVELES_NOMBRES[1], actividades: [
          { tipo: 'quiz', nombre: 'Sensores inteligentes', emoji: '📡', preguntas: [
            qz('¿Qué detecta un sensor de distancia?','Un objeto cercano',['Un objeto cercano','El sabor','La música']),
            qz('¿Para qué sirve un sensor?','Para que el robot "sienta" el entorno',['Para que el robot "sienta" el entorno','Para que coma','Para que duerma']),
            qz('Si un robot ve un obstáculo, debe...','Esquivarlo o parar',['Esquivarlo o parar','Chocar contra él','Ignorarlo']),
            qz('¿Qué sensor detecta la luz?','Un sensor de luz',['Un sensor de luz','Un motor','Una rueda'])
          ]},
          { tipo: 'quiz', nombre: 'Energía y movimiento', emoji: '⚡', preguntas: [
            qz('¿Qué da energía a un robot?','Una batería',['Una batería','Una piedra','Un papel']),
            qz('¿Qué hace girar las ruedas?','Un motor',['Un motor','Un sensor','Una luz']),
            qz('¿Qué energía usa el sol?','Energía solar',['Energía solar','Energía de viento','Energía de comida']),
            qz('Un engranaje sirve para...','Transmitir movimiento',['Transmitir movimiento','Hacer ruido','Guardar agua'])
          ]}
        ]},
        { nombre: NIVELES_NOMBRES[2], actividades: [
          { tipo: 'ordenar', nombre: 'Robot explorador', emoji: '🗺️', instruccion: 'Ordená: explorá evitando los obstáculos', pasos: ['📡 Encender sensor','⬆️ Avanzar','🚧 Detectar obstáculo','↩️ Esquivar','🏁 Llegar al objetivo'] },
          { tipo: 'construir', nombre: 'Ingenieros: puente', emoji: '🌉', instruccion: 'Construí un puente en orden', partes: ['🪨 Columnas','🪵 Vigas','🛤️ Riel','🚶 Probar el puente'], final: '🌉 ¡Puente listo para cruzar!' }
        ]},
        { nombre: NIVELES_NOMBRES[3], actividades: [
          { tipo: 'ordenar', nombre: 'Fábrica automática', emoji: '🏭', instruccion: 'Ordená las máquinas para fabricar un juguete', pasos: ['📦 Materia prima','🔨 Máquina de armar','🎨 Máquina de pintar','📦 Empaquetar','🛒 ¡Listo para vender!'] },
          { tipo: 'quiz', nombre: 'Inventos útiles', emoji: '💡', preguntas: [
            qz('Si no querés olvidar las llaves, inventarías...','Un lugar fijo para guardarlas',['Un lugar fijo para guardarlas','Un helado','Un zapato']),
            qz('Para regar plantas cuando no estás, sirve...','Un riego automático',['Un riego automático','Un televisor','Una almohada']),
            qz('Un buen invento resuelve...','Un problema real',['Un problema real','Nada','Un problema imaginario']),
            qz('Para probar un invento, primero...','Lo probás y lo mejorás',['Lo probás y lo mejorás','Lo vendés sin probar','Lo tirás'])
          ]}
        ]},
        { nombre: NIVELES_NOMBRES[4], actividades: [
          { tipo: 'ordenar', nombre: 'Misión de rescate', emoji: '🚁', instruccion: 'Ordená el rescate del gatito atrapado 🐱', pasos: ['🚁 Ir al lugar','🔦 Buscar al gatito','🪜 Subir con cuidado','🤗 Rescatar al gatito','🏠 Llevarlo a casa'] },
          { tipo: 'construir', nombre: 'Proyecto final: tu invento', emoji: '🏆', instruccion: 'Diseñá tu gran invento en orden', partes: ['💡 Idea','📐 Diseño','🔧 Construcción','🧪 Prueba','🎉 ¡Invento terminado!'], final: '🎉 ¡Sos un inventor!' }
        ]}
      ]
    }
  };

  /* ==================== PROGRESO Y CERTIFICADOS ==================== */
  function actKey(escId, n, a) { return escId + ':N' + n + ':A' + a; }
  function actCompletada(escId, n, a) { return EK.Store.esNivelCompletado(actKey(escId, n, a), 1); }
  function marcarAct(escId, n, a) { return EK.Store.marcarNivelCompletado(actKey(escId, n, a), 1); }
  function nivelCompletado(escId, n) {
    var esc = ESCUELAS[escId];
    for (var a = 0; a < esc.niveles[n].actividades.length; a++) {
      if (!actCompletada(escId, n, a)) return false;
    }
    return true;
  }
  function nivelDesbloqueado(escId) {
    var desb = 1;
    for (var n = 0; n < 4; n++) { if (nivelCompletado(escId, n)) desb = n + 2; else break; }
    return desb;
  }
  function progreso(escId) {
    var total = 0, hechas = 0;
    ESCUELAS[escId].niveles.forEach(function (nv, n) {
      nv.actividades.forEach(function (_, a) { total++; if (actCompletada(escId, n, a)) hechas++; });
    });
    return Math.round(hechas / total * 100);
  }
  function escuelaCompleta(escId) { return progreso(escId) === 100; }
  function certificados() {
    try { return JSON.parse(localStorage.getItem('educakids_certificados') || '[]'); } catch (e) { return []; }
  }
  function darCertificado(escId) {
    var c = certificados();
    if (c.indexOf(escId) !== -1) return false;
    c.push(escId);
    try { localStorage.setItem('educakids_certificados', JSON.stringify(c)); } catch (e) {}
    return true;
  }

  /* ==================== GANAR / CERTIFICADO ==================== */
  function ganar(escId, n, a, nombreAct, emoji) {
    limpiarTimers();
    var primera = marcarAct(escId, n, a);
    if (primera) EK.Store.addEstrellas(20);
    EK.Store.addActividad();
    var nuevas = EK.Store.revisarMedallas();
    if (nuevas.length) EK.Audio.medalla(); else EK.Audio.nivel();
    if (EK.Mascota) EK.Mascota.reaccionar('bien');
    EK.App.actualizarTopbar();
    var app = document.getElementById('app');
    var certHtml = '';
    if (escuelaCompleta(escId) && darCertificado(escId)) {
      var e = ESCUELAS[escId];
      var fecha = new Date().toLocaleDateString('es-AR');
      certHtml = '<div class="certificado pop" style="border-color:' + e.color + '">' +
        '<div style="font-size:40px">🎓</div><h3>¡CERTIFICADO!</h3>' +
        '<p>Otorgado a <b>' + esc(EK.Store.estado.nombre) + '</b></p>' +
        '<p>por completar la escuela de <b style="color:' + e.color + '">' + esc(e.nombre) + '</b> ' + e.emoji + '</p>' +
        '<p style="font-size:11px;color:#888">Certificado educativo de EducaKids. No es un título oficial ni habilitación profesional.</p>' +
        '<p style="font-size:11px">Fecha: ' + fecha + '</p></div>';
    }
    app.innerHTML = '<div class="screen premio-screen"><div class="premio-card pop">' +
      '<div class="premio-emoji">' + emoji + '</div><h2>¡Actividad completada! 🎉</h2>' +
      '<div class="premio-stats"><div class="premio-stat"><span class="big">+' + (primera ? 20 : 0) + '</span><span>estrellas ⭐</span></div></div>' +
      certHtml +
      '<div class="premio-btns"><button class="btn-sec" data-act="volver">🏠 Volver a la escuela</button></div></div></div>';
    app.querySelector('[data-act="volver"]').addEventListener('click', function () { EK.Audio.click(); EK.App.ir('mundo', { id: escId }); });
  }

  function header(t, e, c, color) {
    return '<div class="quiz-head" style="--acento:' + (color || '#6C5CE7') + '"><button class="back-btn" data-act="volver">←</button><div class="quiz-title">' + e + ' ' + esc(t) + '</div><div class="quiz-counter">' + (c || '') + '</div></div>';
  }
  function bindVolver(app, escId) {
    app.querySelector('[data-act="volver"]').addEventListener('click', function () { limpiarTimers(); EK.Audio.click(); EK.App.ir('mundo', { id: escId }); });
  }

  /* ==================== TIPOS DE ACTIVIDADES ==================== */
  function jugarQuiz(escId, n, a, act) {
    var e = ESCUELAS[escId];
    EK.Engine.iniciar({
      mundoId: actKey(escId, n, a), titulo: act.nombre, emoji: act.emoji, color: e.color, nivel: 1,
      bonus: 0, preguntas: act.preguntas,
      onRepetir: function () { jugarQuiz(escId, n, a, act); },
      onVolver: function () { EK.App.ir('mundo', { id: escId }); },
      onFinish: function (s) { if (s.aprobo) ganar(escId, n, a, act.nombre, act.emoji); }
    });
  }

  function jugarOrdenar(escId, n, a, act) {
    var app = document.getElementById('app');
    var e = ESCUELAS[escId];
    var orden = barajar(act.pasos.map(function (p, i) { return { t: p, i: i }; }));
    var elegido = [];
    function render() {
      app.innerHTML = '<div class="screen juego-screen">' + header(act.nombre, act.emoji, (elegido.length + '/' + act.pasos.length), e.color) +
        '<p class="hint">' + esc(act.instruccion) + '</p>' +
        '<div class="secuencia-elegida" id="elegida">' + elegido.map(function (x) { return '<span class="paso-ok">' + esc(x.t) + '</span>'; }).join('') + '</div>' +
        '<div class="bloques-grid">' + orden.map(function (p) {
          return '<button class="bloque-btn ' + (elegido.indexOf(p) !== -1 ? 'usado' : '') + '" data-i="' + p.i + '" ' + (elegido.indexOf(p) !== -1 ? 'disabled' : '') + ' style="--acento:' + e.color + '">' + esc(p.t) + '</button>';
        }).join('') + '</div><div class="feedback" id="feedback"></div></div>';
      bindVolver(app, escId);
      app.querySelectorAll('.bloque-btn:not(.usado)').forEach(function (b) {
        b.addEventListener('click', function () {
          var paso = orden.find(function (p) { return p.i === Number(b.dataset.i); });
          if (Number(b.dataset.i) === elegido.length) {
            EK.Audio.correcto(); elegido.push(paso);
            if (elegido.length === act.pasos.length) { despues(500, function () { ganar(escId, n, a, act.nombre, act.emoji); }); }
            else render();
          } else {
            EK.Audio.error(); if (EK.Mascota) EK.Mascota.reaccionar('mal');
            b.classList.add('mal'); document.getElementById('feedback').innerHTML = '<div class="fb-msg mal">¡No! El paso correcto es el número ' + (elegido.length + 1) + '</div>';
            despues(1200, function () { elegido = []; render(); });
          }
        });
      });
    }
    render();
  }

  function jugarClasificar(escId, n, a, act) {
    var app = document.getElementById('app');
    var e = ESCUELAS[escId];
    var items = barajar(act.items.map(function (it, i) { return { t: it.t, ok: it.ok, i: i }; }));
    var correctas = items.filter(function (it) { return it.ok; }).length;
    var encontradas = 0, errores = 0, lock = false;
    app.innerHTML = '<div class="screen juego-screen">' + header(act.nombre, act.emoji, (encontradas + '/' + correctas), e.color) +
      '<p class="hint">' + esc(act.instruccion) + '</p>' +
      '<div class="clasificar-grid">' + items.map(function (it) { return '<button class="clasif-btn" data-i="' + it.i + '" style="--acento:' + e.color + '">' + esc(it.t) + '</button>'; }).join('') + '</div>' +
      '<div class="feedback" id="feedback"></div></div>';
    bindVolver(app, escId);
    app.querySelectorAll('.clasif-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        if (lock || b.disabled) return;
        var it = items.find(function (x) { return x.i === Number(b.dataset.i); });
        b.disabled = true;
        if (it.ok) {
          encontradas++; EK.Audio.correcto(); b.classList.add('ok');
          document.querySelector('.quiz-counter').textContent = encontradas + '/' + correctas;
          if (encontradas === correctas) { lock = true; despues(600, function () { ganar(escId, n, a, act.nombre, act.emoji); }); }
        } else {
          errores++; EK.Audio.error(); if (EK.Mascota) EK.Mascota.reaccionar('mal');
          b.classList.add('mal');
          document.getElementById('feedback').innerHTML = '<div class="fb-msg mal">¡Ese no va! Errores: ' + errores + '</div>';
          if (errores >= 3) { lock = true; document.getElementById('feedback').innerHTML = '<div class="fb-msg mal">¡Ups! Volvé a intentarlo 💪</div>'; despues(1500, function () { jugarClasificar(escId, n, a, act); }); }
        }
      });
    });
  }

  function jugarConstruir(escId, n, a, act) {
    var app = document.getElementById('app');
    var e = ESCUELAS[escId];
    var partes = barajar(act.partes.map(function (p, i) { return { t: p, i: i }; }));
    var armado = [];
    function render() {
      app.innerHTML = '<div class="screen juego-screen">' + header(act.nombre, act.emoji, (armado.length + '/' + act.partes.length), e.color) +
        '<p class="hint">' + esc(act.instruccion) + '</p>' +
        '<div class="ensamblado" id="ensamblado">' + armado.map(function (x) { return '<div class="parte-ok pop">' + esc(x.t) + '</div>'; }).join('') + '</div>' +
        '<div class="bloques-grid">' + partes.map(function (p) {
          return '<button class="bloque-btn ' + (armado.indexOf(p) !== -1 ? 'usado' : '') + '" data-i="' + p.i + '" ' + (armado.indexOf(p) !== -1 ? 'disabled' : '') + ' style="--acento:' + e.color + '">' + esc(p.t) + '</button>';
        }).join('') + '</div><div class="feedback" id="feedback"></div></div>';
      bindVolver(app, escId);
      app.querySelectorAll('.bloque-btn:not(.usado)').forEach(function (b) {
        b.addEventListener('click', function () {
          var parte = partes.find(function (p) { return p.i === Number(b.dataset.i); });
          if (Number(b.dataset.i) === armado.length) {
            EK.Audio.correcto(); armado.push(parte);
            if (armado.length === act.partes.length) {
              document.getElementById('ensamblado').innerHTML += '<div class="parte-final pop">' + esc(act.final || '¡Listo!') + '</div>';
              despues(1200, function () { ganar(escId, n, a, act.nombre, act.emoji); });
            } else render();
          } else {
            EK.Audio.error(); if (EK.Mascota) EK.Mascota.reaccionar('mal');
            b.classList.add('mal'); document.getElementById('feedback').innerHTML = '<div class="fb-msg mal">¡No! Primero va la parte ' + (armado.length + 1) + '</div>';
            despues(1200, render);
          }
        });
      });
    }
    render();
  }

  function iniciarActividad(escId, n, a) {
    limpiarTimers();
    var act = ESCUELAS[escId].niveles[n].actividades[a];
    if (act.tipo === 'quiz') jugarQuiz(escId, n, a, act);
    else if (act.tipo === 'ordenar') jugarOrdenar(escId, n, a, act);
    else if (act.tipo === 'clasificar') jugarClasificar(escId, n, a, act);
    else if (act.tipo === 'construir') jugarConstruir(escId, n, a, act);
  }

  var Escuelas = {
    ESCUELAS: ESCUELAS, NIVELES_NOMBRES: NIVELES_NOMBRES, NIVELES_EMOJIS: NIVELES_EMOJIS,
    iniciarActividad: iniciarActividad, nivelDesbloqueado: nivelDesbloqueado,
    nivelCompletado: nivelCompletado, actCompletada: actCompletada,
    progreso: progreso, escuelaCompleta: escuelaCompleta, certificados: certificados
  };
  window.EK.Escuelas = Escuelas;
})();
