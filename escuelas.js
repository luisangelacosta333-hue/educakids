/* ============================================================
   escuelas-super-premium.js — 6 ESCUELAS DEL FUTURO (SUPER PREMIUM)
   REEMPLAZA a escuelas.js. Subir SOLO este archivo.
   MANTIENE API: window.EK.Escuelas.iniciarActividad(esc,n,a) / .ESCUELAS
   NUEVO SUPER PREMIUM:
   ✅ 6 escuelas (IA, Programación, Robótica + Ciencias, Matemáticas, Espacio)
   ✅ 4 tipos de actividades NUEVOS: emparejar, completar hueco,
      verdadero/falso, contar. Total 6 tipos.
   ✅ +100 preguntas y items nuevos. Cada escuela: 5 niveles × 2 act.
   ✅ CSS premium con animaciones (pop, flotar, shake, confeti)
   ✅ Confeti al ganar · Voz latina es-MX · EK.* defensivos
   ✅ Progreso por escuela · Certificados · Estrellas por actividad
   ✅ Frases motivadoras · Feedback con sonido · Barra de progreso
   ============================================================ */
(function () {
  'use strict';

  /* ---------- helpers defensivos ---------- */
  function esc(s) {
    if (window.EK && EK.Engine && typeof EK.Engine.escapeHtml === 'function') return EK.Engine.escapeHtml(s);
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function barajar(arr) {
    if (window.EK && EK.Engine && typeof EK.Engine.barajar === 'function') return EK.Engine.barajar(arr);
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function snd(nombre) {
    try { if (window.EK && EK.Audio && typeof EK.Audio[nombre] === 'function') EK.Audio[nombre](); else if (window.EK && EK.Audio && typeof EK.Audio.click === 'function') EK.Audio.click(); } catch (e) { }
  }
  function hablar(texto) {
    try {
      var limpio = String(texto).replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '').trim();
      if (window.EK && EK.Voz) {
        if (typeof EK.Voz.leer === 'function') { EK.Voz.leer(limpio); return; }
        if (typeof EK.Voz.hablar === 'function') { EK.Voz.hablar(limpio); return; }
      }
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(limpio);
        u.lang = 'es-MX'; u.rate = 0.95; u.pitch = 1.05;
        var vs = speechSynthesis.getVoices() || [];
        var pref = vs.filter(function (v) { return (v.lang || '').toLowerCase().indexOf('es') === 0; });
        if (pref.length) u.voice = pref[0];
        speechSynthesis.speak(u);
      }
    } catch (e) { }
  }
  function aviso(msg) {
    try { if (window.EK && EK.App && EK.App.mostrarAviso) { EK.App.mostrarAviso(msg); return; } } catch (e) { }
    var t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;left:50%;top:18px;transform:translateX(-50%);background:linear-gradient(135deg,#4D96FF,#A55EEA);color:#fff;padding:10px 22px;border-radius:999px;z-index:99999;font-family:sans-serif;font-size:14px;font-weight:800;box-shadow:0 6px 20px rgba(77,150,255,.4);opacity:0;transition:opacity .3s;';
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.style.opacity = '1'; });
    setTimeout(function () { t.style.opacity = '0'; setTimeout(function () { t.remove(); }, 300); }, 2000);
  }
  function lanzarConfeti() {
    var colores = ['#FF9F43', '#FF6B9D', '#4D96FF', '#00B894', '#FFD43B', '#A55EEA', '#21C39A'];
    for (var i = 0; i < 60; i++) {
      var c = document.createElement('div');
      c.style.cssText = 'position:fixed;width:8px;height:8px;top:-10px;left:' + (Math.random() * 100) + 'vw;background:' + colores[i % colores.length] + ';border-radius:2px;z-index:99998;pointer-events:none;animation:esc-conf-fall ' + (1.5 + Math.random() * 1.5) + 's linear forwards;animation-delay:' + (Math.random() * 0.5) + 's;';
      document.body.appendChild(c);
      (function (el) { setTimeout(function () { el.remove(); }, 3500); })(c);
    }
  }

  var timers = [];
  function limpiarTimers() { timers.forEach(clearTimeout); timers = []; }
  function despues(ms, fn) { var t = setTimeout(fn, ms); timers.push(t); return t; }

  var frasesError = ['¡Ups! Intenta de nuevo.', '¡Casi! Sigue buscando.', '¡No te rindas! Tú puedes.', 'Ese no es, fíjate bien.', '¡Vamos, probá otra vez!'];
  var frasesAcierto = ['¡Muy bien!', '¡Genial!', '¡Excelente!', '¡Perfecto!', '¡Sigue así!', '¡Increíble!', '¡Bravo!'];
  function randomAcierto() { return frasesAcierto[Math.floor(Math.random() * frasesAcierto.length)]; }
  function randomError() { return frasesError[Math.floor(Math.random() * frasesError.length)]; }

  /* ---------- CSS premium inyectado ---------- */
  (function () {
    if (document.getElementById('esc-css-premium')) return;
    var st = document.createElement('style');
    st.id = 'esc-css-premium';
    st.textContent = [
      '@keyframes esc-conf-fall{to{transform:translateY(105vh) rotate(720deg);opacity:0;}}',
      '@keyframes esc-pop{0%{transform:scale(.5);opacity:0;}60%{transform:scale(1.1);}100%{transform:scale(1);opacity:1;}}',
      '@keyframes esc-flotar{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}',
      '@keyframes esc-shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-6px);}75%{transform:translateX(6px);}}',
      '@keyframes esc-bounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-14px);}}',
      '@keyframes esc-glow{0%,100%{box-shadow:0 0 10px rgba(108,92,231,.4);}50%{box-shadow:0 0 25px rgba(108,92,231,.8);}}',
      '.esc-screen{display:flex;flex-direction:column;height:100%;background:linear-gradient(160deg,#eef3ff 0%,#f6f0ff 50%,#fff0f6 100%);font-family:"Comic Sans MS","Segoe UI",system-ui,sans-serif;overflow-y:auto;}',
      '.esc-head{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#fff;border-bottom:2px solid #e6ebf5;box-shadow:0 2px 8px rgba(60,80,140,.08);}',
      '.esc-title{font-weight:900;font-size:17px;display:flex;align-items:center;gap:6px;}',
      '.esc-counter{font-weight:900;color:#fff;padding:5px 12px;border-radius:999px;font-size:13px;}',
      '.esc-back{border:none;background:#eef2fb;color:#445;border-radius:12px;padding:8px 12px;font-size:17px;cursor:pointer;font-weight:900;}',
      '.esc-hint{text-align:center;font-size:16px;font-weight:800;color:#445;margin:12px;padding:0 10px;}',
      '.esc-grid-act{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;padding:14px;}',
      '.esc-card-act{background:#fff;border-radius:18px;padding:16px 10px;text-align:center;cursor:pointer;box-shadow:0 4px 14px rgba(60,80,140,.12);transition:all .2s;border:3px solid transparent;position:relative;}',
      '.esc-card-act:hover{transform:translateY(-4px) scale(1.03);box-shadow:0 8px 24px rgba(108,92,231,.3);}',
      '.esc-card-act:active{transform:scale(.95);}',
      '.esc-card-act .emoji{font-size:38px;display:block;animation:esc-flotar 3s infinite;}',
      '.esc-card-act .nombre{font-weight:900;color:#334;font-size:14px;margin-top:6px;display:block;}',
      '.esc-card-act .hecho{position:absolute;top:6px;right:6px;background:linear-gradient(135deg,#00B894,#55EFC4);color:#fff;font-size:16px;padding:2px 8px;border-radius:999px;}',
      '.esc-card-act.bloqueado{opacity:.5;cursor:not-allowed;}',
      '.esc-opcion{border:none;background:#fff;border-radius:16px;padding:16px 12px;font-size:15px;font-weight:800;color:#334;cursor:pointer;box-shadow:0 4px 12px rgba(60,80,140,.12);transition:all .15s;font-family:inherit;width:100%;text-align:left;}',
      '.esc-opcion:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(108,92,231,.3);}',
      '.esc-opcion:active{transform:scale(.97);}',
      '.esc-opcion.ok{background:linear-gradient(135deg,#00B894,#55EFC4)!important;color:#fff!important;animation:esc-pop .3s ease;}',
      '.esc-opcion.mal{background:linear-gradient(135deg,#FA5252,#FF6B6B)!important;color:#fff!important;animation:esc-shake .4s ease;}',
      '.esc-opcion:disabled{opacity:.6;cursor:default;}',
      '.esc-opciones{display:flex;flex-direction:column;gap:10px;padding:0 14px;}',
      '.esc-feedback{text-align:center;margin:12px;font-weight:900;font-size:17px;min-height:26px;}',
      '.esc-feedback.ok{color:#00B894;animation:esc-pop .3s ease;}',
      '.esc-feedback.mal{color:#FA5252;}',
      '.esc-pregunta-card{background:#fff;border-radius:22px;padding:20px;margin:14px;text-align:center;box-shadow:0 6px 20px rgba(60,80,140,.15);animation:esc-pop .4s ease;}',
      '.esc-pregunta-texto{font-size:19px;font-weight:900;color:#334;}',
      '.esc-bloque{border:none;border-radius:14px;padding:14px;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;transition:all .15s;box-shadow:0 3px 10px rgba(60,80,140,.15);color:#fff;}',
      '.esc-bloque:active{transform:scale(.95);}',
      '.esc-bloque.usado{opacity:.3;cursor:default;}',
      '.esc-bloque.mal{animation:esc-shake .4s ease;}',
      '.esc-bloques-grid{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;padding:0 14px;}',
      '.esc-elegida{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;padding:10px;min-height:40px;}',
      '.esc-paso-ok{background:linear-gradient(135deg,#6C5CE7,#A29BFE);color:#fff;padding:8px 14px;border-radius:12px;font-weight:800;font-size:13px;animation:esc-pop .3s ease;}',
      '.esc-clasif-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;padding:0 14px;}',
      '.esc-clasif-btn{border:none;background:#fff;border-radius:14px;padding:14px 8px;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit;box-shadow:0 3px 10px rgba(60,80,140,.12);transition:all .15s;}',
      '.esc-clasif-btn.ok{background:linear-gradient(135deg,#00B894,#55EFC4);color:#fff;animation:esc-pop .3s ease;}',
      '.esc-clasif-btn.mal{background:linear-gradient(135deg,#FA5252,#FF6B6B);color:#fff;animation:esc-shake .4s ease;}',
      '.esc-clasif-btn:disabled{opacity:.6;cursor:default;}',
      '.esc-ensamblado{background:#f9f9f9;padding:15px;border-radius:15px;border:2px dashed #6C5CE7;margin:0 14px;text-align:center;min-height:60px;}',
      '.esc-parte-ok{color:#6C5CE7;font-weight:900;font-size:1.1rem;animation:esc-pop .3s ease;margin:4px 0;}',
      '.esc-parte-final{background:linear-gradient(135deg,#6C5CE7,#A29BFE);color:#fff;padding:10px;border-radius:10px;margin-top:10px;font-size:1.2rem;font-weight:900;animation:esc-pop .4s ease;}',
      '.esc-empareja-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:0 14px;max-width:400px;margin:0 auto;}',
      '.esc-empareja-btn{border:none;background:#fff;border-radius:12px;padding:12px 6px;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit;box-shadow:0 3px 10px rgba(60,80,140,.12);transition:all .15s;}',
      '.esc-empareja-btn.sel{background:linear-gradient(135deg,#FFD43B,#FF9F43);color:#5B3A00;transform:scale(1.05);}',
      '.esc-empareja-btn.ok{background:linear-gradient(135deg,#00B894,#55EFC4);color:#fff;}',
      '.esc-empareja-btn.mal{animation:esc-shake .4s ease;}',
      '.esc-completar-input{border:3px solid #6C5CE7;border-radius:12px;padding:10px 14px;font-size:16px;font-weight:800;font-family:inherit;outline:none;width:80%;max-width:300px;text-align:center;}',
      '.esc-contar-grid{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;padding:10px;font-size:28px;}',
      '.esc-vof-btns{display:flex;gap:10px;justify-content:center;padding:0 14px;}',
      '.esc-vof-btn{flex:1;max-width:160px;border:none;border-radius:16px;padding:18px;font-size:18px;font-weight:900;cursor:pointer;font-family:inherit;color:#fff;transition:all .15s;}',
      '.esc-vof-btn:active{transform:scale(.95);}',
      '.esc-progreso{height:10px;background:#e0e6f0;border-radius:999px;margin:0 14px;overflow:hidden;}',
      '.esc-progreso-fill{height:100%;background:linear-gradient(90deg,#6C5CE7,#A29BFE,#FF6B9D);border-radius:999px;transition:width .4s ease;}',
      '.esc-certificado{border:4px dashed #6C5CE7;background:linear-gradient(135deg,#ffffff,#f0f4ff);border-radius:20px;padding:20px;margin:15px auto;max-width:340px;text-align:center;animation:esc-pop .5s ease;box-shadow:0 10px 30px rgba(108,92,231,.3);}',
      '.esc-certificado h3{color:#6C5CE7;font-size:22px;margin:5px 0;}',
      '.esc-premio-card{background:#fff;border-radius:24px;padding:28px;text-align:center;max-width:340px;margin:30px auto;box-shadow:0 20px 60px rgba(0,0,0,.2);animation:esc-pop .5s ease;}',
      '.esc-premio-emoji{font-size:72px;animation:esc-bounce 1s infinite;}',
      '.esc-btn-pri{border:none;background:linear-gradient(135deg,#6C5CE7,#A29BFE);color:#fff;border-radius:14px;padding:12px 24px;font-weight:900;font-size:15px;cursor:pointer;font-family:inherit;box-shadow:0 4px 14px rgba(108,92,231,.4);}',
      '.esc-btn-sec{border:none;background:#eef2fb;color:#445;border-radius:14px;padding:12px 24px;font-weight:900;font-size:15px;cursor:pointer;font-family:inherit;}',
      '.esc-btn-pri:active,.esc-btn-sec:active{transform:scale(.95);}',
      '.esc-escuelas-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px;padding:14px;}',
      '.esc-escuela-card{border-radius:20px;padding:20px 12px;text-align:center;cursor:pointer;color:#fff;transition:all .2s;position:relative;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,.15);}',
      '.esc-escuela-card:hover{transform:translateY(-4px) scale(1.03);}',
      '.esc-escuela-card .e-emoji{font-size:44px;display:block;animation:esc-flotar 3s infinite;}',
      '.esc-escuela-card .e-nombre{font-weight:900;font-size:15px;margin-top:8px;display:block;}',
      '.esc-escuela-card .e-prog{font-size:11px;font-weight:800;opacity:.9;margin-top:4px;display:block;}',
      '.esc-escuela-card .e-cert{position:absolute;top:6px;right:6px;font-size:18px;}',
      '@media (max-width:480px){.esc-empareja-grid{grid-template-columns:repeat(2,1fr);}.esc-pregunta-texto{font-size:16px;}}'
    ].join('');
    document.head.appendChild(st);
  })();

  var NIVELES_NOMBRES = ['Explorador', 'Aprendiz', 'Creador', 'Inventor', 'Experto'];
  var NIVELES_EMOJIS = ['🔍', '📘', '🎨', '💡', '🏆'];
  function qz(p, c, opts) { return { pregunta: p, opciones: barajar(opts.map(String)), correcta: String(c) }; }

  /* ==================== DATOS DE LAS 6 ESCUELAS ==================== */
  var ESCUELAS = {
    ia: {
      nombre: 'Inteligencia Artificial', emoji: '🤖', color: '#6C5CE7',
      niveles: [
        { nombre: NIVELES_NOMBRES[0], actividades: [
          { tipo: 'quiz', nombre: 'Conocé la IA', emoji: '🤖', preguntas: [
            qz('¿Qué es la inteligencia artificial?', 'Una computadora que aprende', ['Una computadora que aprende', 'Un robot que come', 'Un juguete de plástico', 'Un libro mágico']),
            qz('¿Cuál de estos usa IA?', 'Un asistente de voz como Siri', ['Un asistente de voz como Siri', 'Un lápiz', 'Una pelota', 'Una silla']),
            qz('¿Puede la IA equivocarse?', 'Sí, hay que verificar', ['Sí, hay que verificar', 'No, siempre acierta', 'Nunca se equivoca', 'Solo los martes']),
            qz('¿De qué aprende una IA?', 'De ejemplos y datos', ['De ejemplos y datos', 'De la nada', 'Solo de libros', 'De los sueños']),
            qz('¿Quién programa la IA?', 'Las personas', ['Las personas', 'Los animales', 'La luna', 'Los árboles'])
          ]},
          { tipo: 'clasificar', nombre: 'Detective de imágenes', emoji: '🔍', instruccion: 'Tocá SOLO los ANIMALES', items: [
            { t: '🐶 Perro', ok: true }, { t: '🚗 Auto', ok: false }, { t: '🐱 Gato', ok: true },
            { t: '🍎 Manzana', ok: false }, { t: '🐦 Pájaro', ok: true }, { t: '⚽ Pelota', ok: false },
            { t: '🐟 Pez', ok: true }, { t: '📱 Celular', ok: false }, { t: '🦁 León', ok: true }
          ]}
        ]},
        { nombre: NIVELES_NOMBRES[1], actividades: [
          { tipo: 'clasificar', nombre: 'Entrená a tu robot', emoji: '🎓', instruccion: 'Enseñale al robot: tocá SOLO las FRUTAS', items: [
            { t: '🍌 Banana', ok: true }, { t: '👟 Zapatilla', ok: false }, { t: '🍓 Frutilla', ok: true },
            { t: '📚 Libro', ok: false }, { t: '🍇 Uvas', ok: true }, { t: '🪑 Silla', ok: false },
            { t: '🍉 Sandía', ok: true }, { t: '🔑 Llave', ok: false }, { t: '🍊 Naranja', ok: true }
          ]},
          { tipo: 'emparejar', nombre: 'Asociá objetos', emoji: '🔗', instruccion: 'Tocá un objeto y luego su uso', pares: [
            { a: '📱 Celular', b: '📞 Llamar' }, { a: '🍎 Manzana', b: '🍴 Comer' },
            { a: '✏️ Lápiz', b: '📝 Escribir' }, { a: '🎧 Auriculares', b: '🎵 Escuchar música' }
          ]}
        ]},
        { nombre: NIVELES_NOMBRES[2], actividades: [
          { tipo: 'ordenar', nombre: 'Robot obediente', emoji: '🦾', instruccion: 'Ordená los pasos para hacer un sándwich', pasos: ['1️⃣ Agarrar el pan', '2️⃣ Untar queso', '3️⃣ Poner el jamón', '4️⃣ Cerrar el sándwich', '5️⃣ ¡A comer!'] },
          { tipo: 'construir', nombre: 'Creá tu personaje', emoji: '🧑‍🚀', instruccion: 'Construí tu personaje en orden', partes: ['🟦 Cuerpo', '😀 Cabeza', '👀 Ojos', '🎩 Accesorio', '🦶 Pies'], final: '✨ ¡Personaje creado!' }
        ]},
        { nombre: NIVELES_NOMBRES[3], actividades: [
          { tipo: 'vof', nombre: 'Verdadero o Falso', emoji: '✅', preguntas: [
            { p: 'La IA siempre dice la verdad.', ok: false },
            { p: 'Debo compartir mi contraseña con una IA.', ok: false },
            { p: 'Una foto falsa (deepfake) puede engañar.', ok: true },
            { p: 'Está bien que una IA use mis datos sin permiso.', ok: false },
            { p: 'Hay que verificar lo que dice una IA.', ok: true }
          ]},
          { tipo: 'completar', nombre: 'Completá la frase', emoji: '💬', preguntas: [
            { p: 'Antes de creer una información, hay que ________.', resp: ['verificarla', 'verificar', 'comprobarla', 'comprobar'] },
            { p: 'Una IA aprende de ________.', resp: ['ejemplos', 'datos', 'los ejemplos', 'los datos'] },
            { p: 'Mi contraseña debe ser ________.', resp: ['secreta', 'privada', 'larga', 'segura'] }
          ]}
        ]},
        { nombre: NIVELES_NOMBRES[4], actividades: [
          { tipo: 'quiz', nombre: 'Cuidá tus datos', emoji: '🔒', preguntas: [
            qz('¿Cuál dato NO debés dar online?', 'Tu dirección y contraseña', ['Tu dirección y contraseña', 'Tu color favorito', 'Tu juego preferido', 'Tu animal favorito']),
            qz('Si un desconocido te pide fotos, ¿qué hacés?', 'Decirle que no y contarle a un adulto', ['Decirle que no y contarle a un adulto', 'Enviarlas', 'Bloquearlo sin decir nada', 'Darle tu dirección']),
            qz('¿Qué es una contraseña segura?', 'Larga y con números y letras', ['Larga y con números y letras', '1234', 'Tu nombre', 'Tu fecha de nacimiento']),
            qz('¿Está bien copiar todo lo que dice una IA?', 'No, hay que pensar y verificar', ['No, hay que pensar y verificar', 'Sí, siempre', 'Solo en matemáticas', 'Solo si es divertido']),
            qz('¿La IA puede ayudar a los médicos?', 'Sí, como herramienta', ['Sí, como herramienta', 'No, nunca', 'Solo a los maestros', 'Solo a los bomberos'])
          ]},
          { tipo: 'quiz', nombre: 'Desafío final de IA', emoji: '🏆', preguntas: [
            qz('¿Qué hace una IA?', 'Aprende de ejemplos', ['Aprende de ejemplos', 'Come pasto', 'Vuela', 'Duerme todo el día']),
            qz('Antes de creer una información, hay que...', 'Verificarla', ['Verificarla', 'Compartirla', 'Borrarla', 'Ignorarla']),
            qz('¿Quién controla el uso de la IA?', 'Las personas que la programan', ['Las personas que la programan', 'Los animales', 'La luna', 'Los robots solos']),
            qz('¿La IA tiene sentimientos?', 'No, es una herramienta', ['No, es una herramienta', 'Sí, llora', 'Sí, se enoja', 'Solo los domingos'])
          ]}
        ]}
      ]
    },
    programacion: {
      nombre: 'Programación y Videojuegos', emoji: '💻', color: '#00B894',
      niveles: [
        { nombre: NIVELES_NOMBRES[0], actividades: [
          { tipo: 'ordenar', nombre: 'Programá al robot', emoji: '🤖', instruccion: 'Ordená las instrucciones para que el robot llegue a la meta', pasos: ['⬆️ Avanzar', '➡️ Girar a la derecha', '⬆️ Avanzar', '🏁 Llegar a la meta'] },
          { tipo: 'quiz', nombre: 'Detecta el error', emoji: '🐛', preguntas: [
            qz('Para avanzar 3 veces, ¿cuál está bien?', 'Avanzar, Avanzar, Avanzar', ['Avanzar, Avanzar, Avanzar', 'Saltar, Saltar', 'Girar, Parar', 'Dormir, Comer']),
            qz('¿Qué es un error (bug)?', 'Una instrucción que no funciona', ['Una instrucción que no funciona', 'Un insecto de verdad', 'Un premio', 'Un color']),
            qz('Si el robot no se mueve, primero...', 'Revisás las instrucciones', ['Revisás las instrucciones', 'Lo rompés', 'Te vas', 'Llorás']),
            qz('¿Qué es una instrucción?', 'Una orden para la computadora', ['Una orden para la computadora', 'Un juego', 'Un color', 'Una comida']),
            qz('¿Qué hace un programador?', 'Escribe instrucciones', ['Escribe instrucciones', 'Come pizza', 'Duerme', 'Juga todo el día'])
          ]}
        ]},
        { nombre: NIVELES_NOMBRES[1], actividades: [
          { tipo: 'ordenar', nombre: 'Laberinto programado', emoji: '🌀', instruccion: 'Ordená los movimientos para salir del laberinto', pasos: ['➡️ Derecha', '⬆️ Arriba', '➡️ Derecha', '⬇️ Abajo', '🏁 Salida'] },
          { tipo: 'quiz', nombre: 'Aprendé los bucles', emoji: '🔁', preguntas: [
            qz('¿Qué es un bucle?', 'Repetir una acción varias veces', ['Repetir una acción varias veces', 'Un tipo de comida', 'Un error', 'Un personaje']),
            qz('Para saltar 5 veces, usás...', 'Un bucle con "saltar"', ['Un bucle con "saltar"', 'Escribir "saltar" 100 veces', 'No hacer nada', 'Gritar']),
            qz('¿Repetir "avanzar" 3 veces es más corto con...', 'Un bucle', ['Un bucle', 'Escribirlo 3 veces', 'Borrarlo', 'Dibujarlo']),
            qz('¿Un bucle infinito es...', 'Uno que no termina nunca', ['Uno que no termina nunca', 'Muy rápido', 'Un premio', 'Muy corto'])
          ]}
        ]},
        { nombre: NIVELES_NOMBRES[2], actividades: [
          { tipo: 'quiz', nombre: 'Si ocurre esto...', emoji: '❓', preguntas: [
            qz('SI llueve, ENTONCES...', 'Llevas paraguas', ['Llevas paraguas', 'Salís en ojotas', 'No salís nunca', 'Te bañas']),
            qz('SI te tocás un obstáculo, SINO...', 'Saltás o girás', ['Saltás o girás', 'Seguís de largo', 'Te dormís', 'Gritás']),
            qz('¿Qué es una condición?', 'Una pregunta con sí o no', ['Una pregunta con sí o no', 'Un número', 'Un color', 'Un juego']),
            qz('SI tenés 0 vidas, ENTONCES...', 'Perdés el nivel', ['Perdés el nivel', 'Ganás', 'Seguís jugando para siempre', 'Te dormís'])
          ]},
          { tipo: 'clasificar', nombre: 'Cazador de errores', emoji: '🔍', instruccion: 'Tocá SOLO las instrucciones CORRECTAS', items: [
            { t: '✅ Avanzar', ok: true }, { t: '❌ Flotar en el aire', ok: false }, { t: '✅ Girar', ok: true },
            { t: '❌ Convertirse en mago', ok: false }, { t: '✅ Saltar', ok: true }, { t: '❌ Leer la mente', ok: false },
            { t: '✅ Parar', ok: true }, { t: '❌ Hacer magia', ok: false }
          ]}
        ]},
        { nombre: NIVELES_NOMBRES[3], actividades: [
          { tipo: 'ordenar', nombre: 'Saltos y obstáculos', emoji: '🦘', instruccion: 'Ordená: superá los obstáculos hasta la meta', pasos: ['⬆️ Avanzar', '🦘 Saltar el pozo', '⬆️ Avanzar', '🦘 Saltar la pared', '🏁 Meta'] },
          { tipo: 'emparejar', nombre: 'Asociá conceptos', emoji: '🔗', instruccion: 'Tocá un concepto y su significado', pares: [
            { a: '🔁 Bucle', b: '🔄 Repetir' }, { a: '❓ Condición', b: '🤔 Si/Sino' },
            { a: '🐛 Bug', b: '❌ Error' }, { a: '🎮 Nivel', b: '🏁 Un reto del juego' }
          ]}
        ]},
        { nombre: NIVELES_NOMBRES[4], actividades: [
          { tipo: 'quiz', nombre: 'Fábrica de videojuegos', emoji: '🎮', preguntas: [
            qz('Todo juego necesita...', 'Un objetivo y reglas', ['Un objetivo y reglas', 'Solo colores', 'Muchos botones sin sentido', 'Música sola']),
            qz('¿Qué es un nivel?', 'Una parte del juego con un reto', ['Una parte del juego con un reto', 'Un personaje', 'Un sonido', 'Un color']),
            qz('¿Qué hace divertido a un juego?', 'Un reto que se puede superar', ['Un reto que se puede superar', 'Que sea imposible', 'Que no haya meta', 'Que no haya reglas']),
            qz('¿Qué probás antes de publicar un juego?', 'Que funcione bien', ['Que funcione bien', 'Nada', 'Solo los colores', 'Solo la música'])
          ]},
          { tipo: 'construir', nombre: 'Proyecto final: tu juego', emoji: '🏆', instruccion: 'Diseñá tu videojuego en orden', partes: ['🦸 Personaje', '🎯 Meta', '🧱 Obstáculos', '⭐ Premio', '🎮 ¡A jugar!'], final: '🎮 ¡Tu videojuego está listo!' }
        ]}
      ]
    },
    robotica: {
      nombre: 'Robótica e Inventos', emoji: '⚙️', color: '#E17055',
      niveles: [
        { nombre: NIVELES_NOMBRES[0], actividades: [
          { tipo: 'construir', nombre: 'Construí tu robot', emoji: '🤖', instruccion: 'Ensamblá tu robot en orden', partes: ['⬜ Base', '🛞 Ruedas', '📦 Cuerpo', '🔋 Batería', '🤖 Cabeza'], final: '🤖 ¡Robot ensamblado!' },
          { tipo: 'construir', nombre: 'Circuito luminoso', emoji: '💡', instruccion: 'Armá el circuito para encender la luz', partes: ['🔋 Batería', '🔌 Cable', '🔘 Interruptor', '💡 Bombilla'], final: '💡 ¡La luz se encendió!' }
        ]},
        { nombre: NIVELES_NOMBRES[1], actividades: [
          { tipo: 'quiz', nombre: 'Sensores inteligentes', emoji: '📡', preguntas: [
            qz('¿Qué detecta un sensor de distancia?', 'Un objeto cercano', ['Un objeto cercano', 'El sabor', 'La música', 'El olor']),
            qz('¿Para qué sirve un sensor?', 'Para que el robot "sienta" el entorno', ['Para que el robot "sienta" el entorno', 'Para que coma', 'Para que duerma', 'Para que baile']),
            qz('Si un robot ve un obstáculo, debe...', 'Esquivarlo o parar', ['Esquivarlo o parar', 'Chocar contra él', 'Ignorarlo', 'Dormir']),
            qz('¿Qué sensor detecta la luz?', 'Un sensor de luz', ['Un sensor de luz', 'Un motor', 'Una rueda', 'Un tornillo'])
          ]},
          { tipo: 'emparejar', nombre: 'Asociá piezas', emoji: '🔗', instruccion: 'Tocá una pieza y su función', pares: [
            { a: '🔋 Batería', b: '⚡ Da energía' }, { a: '🛞 Rueda', b: '🏃 Se mueve' },
            { a: '⚙️ Motor', b: '🔄 Hace girar' }, { a: '📡 Sensor', b: '👀 Detecta' }
          ]}
        ]},
        { nombre: NIVELES_NOMBRES[2], actividades: [
          { tipo: 'ordenar', nombre: 'Robot explorador', emoji: '🗺️', instruccion: 'Ordená: explorá evitando los obstáculos', pasos: ['📡 Encender sensor', '⬆️ Avanzar', '🚧 Detectar obstáculo', '↩️ Esquivar', '🏁 Llegar al objetivo'] },
          { tipo: 'construir', nombre: 'Ingenieros: puente', emoji: '🌉', instruccion: 'Construí un puente en orden', partes: ['🪨 Columnas', '🪵 Vigas', '🛤️ Riel', '🚶 Probar el puente'], final: '🌉 ¡Puente listo para cruzar!' }
        ]},
        { nombre: NIVELES_NOMBRES[3], actividades: [
          { tipo: 'ordenar', nombre: 'Fábrica automática', emoji: '🏭', instruccion: 'Ordená las máquinas para fabricar un juguete', pasos: ['📦 Materia prima', '🔨 Máquina de armar', '🎨 Máquina de pintar', '📦 Empaquetar', '🛒 ¡Listo para vender!'] },
          { tipo: 'quiz', nombre: 'Inventos útiles', emoji: '💡', preguntas: [
            qz('Si no querés olvidar las llaves, inventarías...', 'Un lugar fijo para guardarlas', ['Un lugar fijo para guardarlas', 'Un helado', 'Un zapato', 'Un payaso']),
            qz('Para regar plantas cuando no estás, sirve...', 'Un riego automático', ['Un riego automático', 'Un televisor', 'Una almohada', 'Un balde de agua']),
            qz('Un buen invento resuelve...', 'Un problema real', ['Un problema real', 'Nada', 'Un problema imaginario', 'Un chiste']),
            qz('Para probar un invento, primero...', 'Lo probás y lo mejorás', ['Lo probás y lo mejorás', 'Lo vendés sin probar', 'Lo tirás', 'Lo escondés'])
          ]}
        ]},
        { nombre: NIVELES_NOMBRES[4], actividades: [
          { tipo: 'ordenar', nombre: 'Misión de rescate', emoji: '🚁', instruccion: 'Ordená el rescate del gatito atrapado', pasos: ['🚁 Ir al lugar', '🔦 Buscar al gatito', '🪜 Subir con cuidado', '🤗 Rescatar al gatito', '🏠 Llevarlo a casa'] },
          { tipo: 'construir', nombre: 'Proyecto final: tu invento', emoji: '🏆', instruccion: 'Diseñá tu gran invento en orden', partes: ['💡 Idea', '📐 Diseño', '🔧 Construcción', '🧪 Prueba', '🎉 ¡Invento terminado!'], final: '🎉 ¡Sos un inventor!' }
        ]}
      ]
    }
  };

  /* ---------- 7ma ESCUELA: Arte y Música ---------- */
  ESCUELAS.arte = {
    nombre: 'Arte y Música', emoji: '🎨', color: '#FF6B9D',
    niveles: [
      { nombre: NIVELES_NOMBRES[0], actividades: [
        { tipo: 'clasificar', nombre: 'Instrumentos', emoji: '🎵', instruccion: 'Tocá SOLO los INSTRUMENTOS MUSICALES', items: [
          { t: '🎸 Guitarra', ok: true }, { t: '🍎 Manzana', ok: false }, { t: '🥁 Batería', ok: true },
          { t: '⚽ Pelota', ok: false }, { t: '🎹 Teclado', ok: true }, { t: '🪑 Silla', ok: false },
          { t: '🎺 Trompeta', ok: true }, { t: '📚 Libro', ok: false }, { t: '🎻 Violín', ok: true }
        ]},
        { tipo: 'quiz', nombre: 'Colores primarios', emoji: '🌈', preguntas: [
          qz('¿Cuáles son los colores primarios?', 'Rojo, amarillo y azul', ['Rojo, amarillo y azul', 'Verde, rosa y negro', 'Blanco y negro', 'Naranja y violeta']),
          qz('¿Qué color se hace mezclando azul y amarillo?', 'Verde', ['Verde', 'Rosa', 'Naranja', 'Marrón']),
          qz('¿Qué color es el cielo despejado?', 'Azul', ['Azul', 'Rojo', 'Verde', 'Negro']),
          qz('¿Qué instrumento tiene teclas blancas y negras?', 'El piano', ['El piano', 'La guitarra', 'La batería', 'La flauta']),
          qz('¿Con qué dibujamos en papel?', 'Lápices y crayones', ['Lápices y crayones', 'Martillos', 'Peluotas', 'Tenedores'])
        ]}
      ]},
      { nombre: NIVELES_NOMBRES[1], actividades: [
        { tipo: 'emparejar', nombre: 'Instrumento y sonido', emoji: '🔗', instruccion: 'Tocá el instrumento y cómo suena', pares: [
          { a: '🎸 Guitarra', b: '🎶 Tac-tac' }, { a: '🥁 Batería', b: '💥 Boom-boom' },
          { a: '🎺 Trompeta', b: '📯 Tu-tu' }, { a: '🎹 Piano', b: '🎵 Plin-plin' }
        ]},
        { tipo: 'contar', nombre: 'Contá las notas', emoji: '🎵', instruccion: 'Contá las notas musicales', items: [
          { emoji: '🎵', cant: 3, opts: ['2', '3', '4', '5'] },
          { emoji: '🎶', cant: 5, opts: ['4', '5', '6', '7'] },
          { emoji: '🎨', cant: 2, opts: ['1', '2', '3', '4'] },
          { emoji: '🖌️', cant: 4, opts: ['3', '4', '5', '6'] }
        ]}
      ]},
      { nombre: NIVELES_NOMBRES[2], actividades: [
        { tipo: 'ordenar', nombre: 'Pintá un cuadro', emoji: '🖼️', instruccion: 'Ordená los pasos para pintar', pasos: ['📄 Agarrar el papel', '🖌️ Elegir pincel', '🎨 Elegir colores', '🖌️ Pintar', '🖼️ ¡Cuadro listo!'] },
        { tipo: 'quiz', nombre: 'Formas en el arte', emoji: '🔷', preguntas: [
          qz('¿Qué forma tiene una pelota?', 'Círculo', ['Círculo', 'Cuadrado', 'Triángulo', 'Rectángulo']),
          qz('¿Cuántos lados tiene un triángulo?', '3', ['3', '4', '5', '6']),
          qz('¿Qué forma tiene una ventana?', 'Cuadrada', ['Cuadrada', 'Redonda', 'Triangular', 'En forma de estrella']),
          qz('¿Qué color se hace mezclando rojo y blanco?', 'Rosa', ['Rosa', 'Verde', 'Azul', 'Negro']),
          qz('¿Qué usamos para pegar papeles?', 'Pegamento', ['Pegamento', 'Tijera', 'Lápiz', 'Goma'])
        ]}
      ]},
      { nombre: NIVELES_NOMBRES[3], actividades: [
        { tipo: 'vof', nombre: '¿Verdadero o Falso?', emoji: '✅', preguntas: [
          { p: 'La guitarra tiene cuerdas.', ok: true },
          { p: 'El piano es un instrumento de viento.', ok: false },
          { p: 'Mezclando rojo y amarillo sale naranja.', ok: true },
          { p: 'Un cuadrado tiene 3 lados.', ok: false },
          { p: 'La música se escucha con los oídos.', ok: true }
        ]},
        { tipo: 'completar', nombre: 'Completá el arte', emoji: '🎨', preguntas: [
          { p: 'Usamos ________ para pintar.', resp: ['pincel', 'pinceles', 'crayones', 'lápices'] },
          { p: 'El ________ tiene teclas blancas y negras.', resp: ['piano', 'teclado'] },
          { p: 'Mezclando azul y rojo sale ________.', resp: ['violeta', 'morado', 'púrpura'] },
          { p: 'La ________ se toca con arco.', resp: ['violin', 'violín', 'guitarra'] }
        ]}
      ]},
      { nombre: NIVELES_NOMBRES[4], actividades: [
        { tipo: 'quiz', nombre: 'Grandes artistas', emoji: '🏆', preguntas: [
          qz('¿Qué animal pintó Dalí con relojes blandos?', 'Ninguno, eran relojes', ['Ninguno, eran relojes', 'Un elefante', 'Un perro', 'Un gato']),
          qz('¿De qué color es la Mona Lisa?', 'Muchos colores', ['Muchos colores', 'Solo rojo', 'Solo azul', 'Blanco y negro']),
          qz('¿Qué instrumento tiene 6 cuerdas?', 'La guitarra', ['La guitarra', 'El piano', 'La batería', 'La flauta']),
          qz('¿Qué forma tiene un arcoíris?', 'Media luna curva', ['Media luna curva', 'Cuadrada', 'Triangular', 'Recta']),
          qz('¿Qué necesitamos para hacer música?', 'Un instrumento o la voz', ['Un instrumento o la voz', 'Una pelota', 'Un martillo', 'Una piedra'])
        ]},
        { tipo: 'construir', nombre: 'Tu obra maestra', emoji: '🏆', instruccion: 'Creá tu obra de arte en orden', partes: ['💡 Idea', '🎨 Elegir colores', '🖌️ Pintar', '✨ Detalles', '🖼️ ¡Obra maestra!'], final: '🎨 ¡Artista completado!' }
      ]}
    ]
  };

  /* ---------- 3 ESCUELAS NUEVAS ---------- */
  ESCUELAS.ciencias = {
    nombre: 'Ciencias y Naturaleza', emoji: '🔬', color: '#00B894',
    niveles: [
      { nombre: NIVELES_NOMBRES[0], actividades: [
        { tipo: 'clasificar', nombre: 'Vivo o no vivo', emoji: '🌱', instruccion: 'Tocá SOLO los seres VIVOS', items: [
          { t: '🌳 Árbol', ok: true }, { t: '🪨 Piedra', ok: false }, { t: '🐶 Perro', ok: true },
          { t: '⚽ Pelota', ok: false }, { t: '🌸 Flor', ok: true }, { t: '🚗 Auto', ok: false },
          { t: '🐟 Pez', ok: true }, { t: '📚 Libro', ok: false }, { t: '🦋 Mariposa', ok: true }
        ]},
        { tipo: 'quiz', nombre: 'Los animales', emoji: '🦁', preguntas: [
          qz('¿Qué animal tiene trompa?', 'El elefante', ['El elefante', 'El león', 'El pez', 'El gato']),
          qz('¿Qué animal hace "miau"?', 'El gato', ['El gato', 'El perro', 'La vaca', 'El pato']),
          qz('¿Qué animal vuela?', 'El pájaro', ['El pájaro', 'El pez', 'La tortuga', 'El gusano']),
          qz('¿Qué animal vive en el agua?', 'El pez', ['El pez', 'El león', 'El mono', 'La jirafa']),
          qz('¿Qué animal es el rey de la selva?', 'El león', ['El león', 'El ratón', 'El conejo', 'La hormiga'])
        ]}
      ]},
      { nombre: NIVELES_NOMBRES[1], actividades: [
        { tipo: 'contar', nombre: 'Contá los objetos', emoji: '🔢', instruccion: 'Contá y elegí la respuesta correcta', items: [
          { emoji: '🍎', cant: 3, opts: ['2', '3', '4', '5'] },
          { emoji: '⭐', cant: 5, opts: ['3', '4', '5', '6'] },
          { emoji: '🐶', cant: 2, opts: ['1', '2', '3', '4'] },
          { emoji: '🌸', cant: 4, opts: ['3', '4', '5', '6'] }
        ]},
        { tipo: 'emparejar', nombre: 'Animal y su casa', emoji: '🏠', instruccion: 'Tocá un animal y su casa', pares: [
          { a: '🐶 Perro', b: '🏠 Casa' }, { a: '🐟 Pez', b: '🌊 Agua' },
          { a: '🐦 Pájaro', b: '🌳 Árbol' }, { a: '🐝 Abeja', b: '🍯 Colmena' }
        ]}
      ]},
      { nombre: NIVELES_NOMBRES[2], actividades: [
        { tipo: 'ordenar', nombre: 'Ciclo del agua', emoji: '💧', instruccion: 'Ordená el ciclo del agua', pasos: ['☀️ El sol calienta', '💧 Se evapora', '☁️ Se forman nubes', '🌧️ Llueve', '🌊 Vuelve al mar'] },
        { tipo: 'quiz', nombre: 'El cuerpo humano', emoji: '🧍', preguntas: [
          qz('¿Con qué vemos?', 'Los ojos', ['Los ojos', 'Los oídos', 'La nariz', 'Las manos']),
          qz('¿Con qué escuchamos?', 'Los oídos', ['Los oídos', 'Los ojos', 'La boca', 'Los pies']),
          qz('¿Con qué olemos?', 'La nariz', ['La nariz', 'Los ojos', 'Las orejas', 'Los dedos']),
          qz('¿Cuántos dedos tiene una mano?', '5', ['5', '3', '10', '4']),
          qz('¿Qué órgano late en el pecho?', 'El corazón', ['El corazón', 'El estómago', 'El pulmón', 'El cerebro'])
        ]}
      ]},
      { nombre: NIVELES_NOMBRES[3], actividades: [
        { tipo: 'vof', nombre: '¿Verdadero o Falso?', emoji: '✅', preguntas: [
          { p: 'Los peces vuelan por el cielo.', ok: false },
          { p: 'Las plantas necesitan agua y sol.', ok: true },
          { p: 'Los seres humanos somos animales.', ok: true },
          { p: 'La luna tiene luz propia.', ok: false },
          { p: 'El agua hierve a 100 grados.', ok: true }
        ]},
        { tipo: 'completar', nombre: 'Completá la ciencia', emoji: '🔬', preguntas: [
          { p: 'Las plantas necesitan ________ para crecer.', resp: ['agua', 'sol', 'luz', 'agua y sol'] },
          { p: 'El ________ late en nuestro pecho.', resp: ['corazón'] },
          { p: 'Los peces respiran por las ________.', resp: ['branquias', 'agallas'] },
          { p: 'La tierra gira alrededor del ________.', resp: ['sol', 'el sol'] }
        ]}
      ]},
      { nombre: NIVELES_NOMBRES[4], actividades: [
        { tipo: 'quiz', nombre: 'Desafío científico', emoji: '🏆', preguntas: [
          qz('¿Qué planeta vivimos?', 'La Tierra', ['La Tierra', 'Marte', 'Júpiter', 'Venus']),
          qz('¿Qué gas respiramos?', 'Oxígeno', ['Oxígeno', 'Dióxido de carbono', 'Helio', 'Hidrógeno']),
          qz('¿Cuántos planetas hay?', '8', ['8', '5', '10', '3']),
          qz('¿Qué hace una semilla con agua y sol?', 'Crece y se convierte en planta', ['Crece y se convierte en planta', 'Se convierte en piedra', 'Desaparece', 'Se vuelve un animal']),
          qz('¿Qué animal pone huevos?', 'La gallina', ['La gallina', 'El perro', 'El gato', 'La vaca'])
        ]},
        { tipo: 'construir', nombre: 'Mi experimento', emoji: '🧪', instruccion: 'Ordená los pasos de un experimento', partes: ['💡 Pregunta', '📝 Hipótesis', '🧪 Experimento', '📊 Observar', '🏆 Conclusión'], final: '🔬 ¡Científico completado!' }
      ]}
    ]
  };

  ESCUELAS.matematicas = {
    nombre: 'Matemáticas Divertidas', emoji: '➕', color: '#FF9F43',
    niveles: [
      { nombre: NIVELES_NOMBRES[0], actividades: [
        { tipo: 'contar', nombre: 'Contá y elegí', emoji: '🔢', instruccion: 'Contá los objetos y elegí el número', items: [
          { emoji: '🍓', cant: 2, opts: ['1', '2', '3', '4'] },
          { emoji: '🎈', cant: 4, opts: ['3', '4', '5', '6'] },
          { emoji: '🦋', cant: 1, opts: ['1', '2', '3', '4'] },
          { emoji: '⚽', cant: 6, opts: ['4', '5', '6', '7'] }
        ]},
        { tipo: 'quiz', nombre: 'Los números', emoji: '🔟', preguntas: [
          qz('¿Qué número viene después del 3?', '4', ['4', '2', '5', '6']),
          qz('¿Cuánto es 2 + 1?', '3', ['3', '2', '4', '5']),
          qz('¿Qué número es mayor?', '5', ['5', '2', '3', '1']),
          qz('¿Cuántas patas tiene un perro?', '4', ['4', '2', '6', '8']),
          qz('¿Qué número falta: 1, 2, __, 4?', '3', ['3', '5', '6', '0'])
        ]}
      ]},
      { nombre: NIVELES_NOMBRES[1], actividades: [
        { tipo: 'quiz', nombre: 'Sumas fáciles', emoji: '➕', preguntas: [
          qz('2 + 3 = ?', '5', ['5', '4', '6', '3']),
          qz('4 + 4 = ?', '8', ['8', '7', '9', '6']),
          qz('1 + 5 = ?', '6', ['6', '5', '7', '4']),
          qz('3 + 3 = ?', '6', ['6', '5', '7', '8']),
          qz('0 + 7 = ?', '7', ['7', '0', '6', '8'])
        ]},
        { tipo: 'emparejar', nombre: 'Número y cantidad', emoji: '🔗', instruccion: 'Tocá el número y su cantidad', pares: [
          { a: '2️⃣ Dos', b: '🍎🍎' }, { a: '3️⃣ Tres', b: '⭐⭐⭐' },
          { a: '4️⃣ Cuatro', b: '🎈🎈🎈🎈' }, { a: '1️⃣ Uno', b: '🐶' }
        ]}
      ]},
      { nombre: NIVELES_NOMBRES[2], actividades: [
        { tipo: 'quiz', nombre: 'Restas', emoji: '➖', preguntas: [
          qz('5 - 2 = ?', '3', ['3', '4', '2', '7']),
          qz('8 - 3 = ?', '5', ['5', '4', '6', '11']),
          qz('10 - 4 = ?', '6', ['6', '5', '7', '14']),
          qz('7 - 7 = ?', '0', ['0', '7', '14', '1']),
          qz('9 - 1 = ?', '8', ['8', '9', '10', '7'])
        ]},
        { tipo: 'ordenar', nombre: 'Ordená los números', emoji: '📊', instruccion: 'Ordená de menor a mayor', pasos: ['1️⃣ Uno', '3️⃣ Tres', '5️⃣ Cinco', '7️⃣ Siete', '9️⃣ Nueve'] }
      ]},
      { nombre: NIVELES_NOMBRES[3], actividades: [
        { tipo: 'vof', nombre: '¿Verdadero o Falso?', emoji: '✅', preguntas: [
          { p: '2 + 2 = 5', ok: false },
          { p: '5 es mayor que 3', ok: true },
          { p: '10 - 5 = 4', ok: false },
          { p: 'Un triángulo tiene 3 lados', ok: true },
          { p: 'Un cuadrado tiene 5 lados', ok: false }
        ]},
        { tipo: 'completar', nombre: 'Completá la cuenta', emoji: '🧮', preguntas: [
          { p: '3 + ___ = 7', resp: ['4', 'cuatro'] },
          { p: '10 - ___ = 6', resp: ['4', 'cuatro'] },
          { p: '5 + 5 = ___', resp: ['10', 'diez'] },
          { p: '8 - ___ = 3', resp: ['5', 'cinco'] }
        ]}
      ]},
      { nombre: NIVELES_NOMBRES[4], actividades: [
        { tipo: 'quiz', nombre: 'Multiplicación', emoji: '✖️', preguntas: [
          qz('2 × 3 = ?', '6', ['6', '5', '7', '8']),
          qz('3 × 3 = ?', '9', ['9', '6', '12', '8']),
          qz('2 × 5 = ?', '10', ['10', '7', '8', '12']),
          qz('4 × 2 = ?', '8', ['8', '6', '10', '7']),
          qz('1 × 9 = ?', '9', ['9', '1', '10', '8'])
        ]},
        { tipo: 'construir', nombre: 'Proyecto matemático', emoji: '🏆', instruccion: 'Ordená para resolver un problema', partes: ['📖 Leer el problema', '🤔 Pensar', '✏️ Hacer la cuenta', '✅ Verificar', '🎉 ¡Resuelto!'], final: '🏆 ¡Matemático experto!' }
      ]}
    ]
  };

  ESCUELAS.espacio = {
    nombre: 'Espacio y Planetas', emoji: '🚀', color: '#4D96FF',
    niveles: [
      { nombre: NIVELES_NOMBRES[0], actividades: [
        { tipo: 'clasificar', nombre: '¿Está en el espacio?', emoji: '🌌', instruccion: 'Tocá SOLO lo que está en el ESPACIO', items: [
          { t: '🌍 Tierra', ok: true }, { t: '🐶 Perro', ok: false }, { t: '🌙 Luna', ok: true },
          { t: '🍕 Pizza', ok: false }, { t: '☀️ Sol', ok: true }, { t: '🪑 Silla', ok: false },
          { t: '🪐 Saturno', ok: true }, { t: '⚽ Pelota', ok: false }, { t: '⭐ Estrella', ok: true }
        ]},
        { tipo: 'quiz', nombre: 'Conocé el espacio', emoji: '🌟', preguntas: [
          qz('¿Qué es el sol?', 'Una estrella', ['Una estrella', 'Un planeta', 'Una luna', 'Un cohete']),
          qz('¿En qué planeta vivimos?', 'La Tierra', ['La Tierra', 'Marte', 'Júpiter', 'Venus']),
          qz('¿Qué gira alrededor de la Tierra?', 'La luna', ['La luna', 'El sol', 'Marte', 'Un cometa']),
          qz('¿Qué usamos para ir al espacio?', 'Un cohete', ['Un cohete', 'Un auto', 'Un barco', 'Un avión']),
          qz('¿Qué hay en el espacio?', 'Estrellas y planetas', ['Estrellas y planetas', 'Océanos', 'Bosques', 'Ciudades'])
        ]}
      ]},
      { nombre: NIVELES_NOMBRES[1], actividades: [
        { tipo: 'emparejar', nombre: 'Planeta y su color', emoji: '🪐', instruccion: 'Tocá el planeta y su característica', pares: [
          { a: '🌍 Tierra', b: '💧 Tiene agua' }, { a: '🔴 Marte', b: '🏜️ Es rojo' },
          { a: '🪐 Saturno', b: '💍 Tiene anillos' }, { a: '☀️ Sol', b: '🔥 Es muy caliente' }
        ]},
        { tipo: 'contar', nombre: 'Contá las estrellas', emoji: '⭐', instruccion: 'Contá las estrellas y elegí el número', items: [
          { emoji: '⭐', cant: 3, opts: ['2', '3', '4', '5'] },
          { emoji: '🌟', cant: 5, opts: ['4', '5', '6', '7'] },
          { emoji: '🚀', cant: 2, opts: ['1', '2', '3', '4'] },
          { emoji: '🪐', cant: 4, opts: ['3', '4', '5', '6'] }
        ]}
      ]},
      { nombre: NIVELES_NOMBRES[2], actividades: [
        { tipo: 'ordenar', nombre: 'Viaje a la luna', emoji: '🌙', instruccion: 'Ordená los pasos del viaje espacial', pasos: ['🚀 Despegar', '🌌 Viajar por el espacio', '🌙 Llegar a la luna', '👨‍🚀 Caminar en la luna', '🏠 Volver a casa'] },
        { tipo: 'quiz', nombre: 'Los planetas', emoji: '🪐', preguntas: [
          qz('¿Cuál es el planeta más cercano al sol?', 'Mercurio', ['Mercurio', 'Tierra', 'Júpiter', 'Neptuno']),
          qz('¿Cuál es el planeta más grande?', 'Júpiter', ['Júpiter', 'Tierra', 'Marte', 'Venus']),
          qz('¿Qué planeta tiene anillos?', 'Saturno', ['Saturno', 'Marte', 'Tierra', 'Mercurio']),
          qz('¿De qué color es el sol?', 'Amarillo', ['Amarillo', 'Azul', 'Verde', 'Rosa']),
          qz('¿Cuántas lunas tiene la Tierra?', '1', ['1', '2', '3', '0'])
        ]}
      ]},
      { nombre: NIVELES_NOMBRES[3], actividades: [
        { tipo: 'vof', nombre: '¿Verdadero o Falso?', emoji: '✅', preguntas: [
          { p: 'El sol es una estrella.', ok: true },
          { p: 'Podemos respirar en la luna sin traje.', ok: false },
          { p: 'La tierra es plana.', ok: false },
          { p: 'Hay 8 planetas en el sistema solar.', ok: true },
          { p: 'Un astronauta flota en el espacio.', ok: true }
        ]},
        { tipo: 'completar', nombre: 'Completá el espacio', emoji: '🌌', preguntas: [
          { p: 'El ________ es la estrella más cercana.', resp: ['sol', 'el sol'] },
          { p: 'La ________ gira alrededor de la Tierra.', resp: ['luna', 'la luna'] },
          { p: 'Los ________ van al espacio en cohetes.', resp: ['astronautas', 'astronauta'] },
          { p: 'Vivimos en el planeta ________.', resp: ['tierra', 'la tierra'] }
        ]}
      ]},
      { nombre: NIVELES_NOMBRES[4], actividades: [
        { tipo: 'quiz', nombre: 'Desafío espacial', emoji: '🏆', preguntas: [
          qz('¿Qué fue lo primero que pisó el hombre en el espacio?', 'La luna', ['La luna', 'Marte', 'El sol', 'Júpiter']),
          qz('¿Qué planeta es conocido como el planeta rojo?', 'Marte', ['Marte', 'Venus', 'Tierra', 'Saturno']),
          qz('¿Qué es una galaxia?', 'Un montón de estrellas', ['Un montón de estrellas', 'Un planeta', 'Una luna', 'Un cohete']),
          qz('¿Cuánto tarda la luz del sol en llegar?', '8 minutos', ['8 minutos', '1 segundo', '1 hora', '1 día']),
          qz('¿Qué hay entre las estrellas?', 'Espacio vacío', ['Espacio vacío', 'Océanos', 'Bosques', 'Ciudades'])
        ]},
        { tipo: 'construir', nombre: 'Mi cohete espacial', emoji: '🚀', instruccion: 'Construí tu cohete en orden', partes: ['🔩 Base', '🛢️ Cuerpo', '🔥 Motores', '👨‍🚀 Cabina', '🚀 ¡Despegue!'], final: '🚀 ¡Astronauta completado!' }
      ]}
    ]
  };

  /* ==================== PROGRESO Y CERTIFICADOS ==================== */
  function actKey(escId, n, a) { return escId + ':N' + n + ':A' + a; }
  function actCompletada(escId, n, a) {
    try { if (window.EK && EK.Store && EK.Store.esNivelCompletado) return EK.Store.esNivelCompletado(actKey(escId, n, a), 1); } catch (e) { }
    try { return localStorage.getItem('esc_act_' + actKey(escId, n, a)) === '1'; } catch (e2) { return false; }
  }
  function marcarAct(escId, n, a) {
    try { if (window.EK && EK.Store && EK.Store.marcarNivelCompletado) return EK.Store.marcarNivelCompletado(actKey(escId, n, a), 1); } catch (e) { }
    try { localStorage.setItem('esc_act_' + actKey(escId, n, a), '1'); return true; } catch (e2) { return false; }
  }
  function nivelCompletado(escId, n) {
    var esc = ESCUELAS[escId];
    for (var a = 0; a < esc.niveles[n].actividades.length; a++) { if (!actCompletada(escId, n, a)) return false; }
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
    try { localStorage.setItem('educakids_certificados', JSON.stringify(c)); } catch (e) { }
    return true;
  }

  /* ==================== GANAR / CERTIFICADO ==================== */
  function ganar(escId, n, a, nombreAct, emoji) {
    limpiarTimers();
    var primera = marcarAct(escId, n, a);
    try { if (window.EK && EK.Store) { if (primera) EK.Store.addEstrellas && EK.Store.addEstrellas(20); EK.Store.addActividad && EK.Store.addActividad(); var nuevas = EK.Store.revisarMedallas && EK.Store.revisarMedallas(); if (nuevas && nuevas.length) snd('medalla'); else snd('nivel'); } } catch (e) { }
    try { if (window.EK && EK.App) EK.App.actualizarTopbar && EK.App.actualizarTopbar(); } catch (e) { }
    lanzarConfeti();
    hablar(randomAcierto() + ' Completaste la actividad.');
    var app = document.getElementById('app');
    var e = ESCUELAS[escId];
    var certHtml = '';
    if (escuelaCompleta(escId) && darCertificado(escId)) {
      var fecha = new Date().toLocaleDateString('es-AR');
      var nombreNino = 'Campeón';
      try { if (window.EK && EK.Store && EK.Store.estado && EK.Store.estado.nombre) nombreNino = EK.Store.estado.nombre; } catch (err) { }
      certHtml = '<div class="esc-certificado" style="border-color:' + e.color + ';">' +
        '<div style="font-size:50px;">🏅</div><h3 style="color:' + e.color + ';">¡CERTIFICADO DE EXCELENCIA!</h3>' +
        '<p style="font-size:16px;">Otorgado con honor a:<br><b style="font-size:20px;color:#333;">' + esc(nombreNino) + '</b></p>' +
        '<p>por graduarse en la escuela de<br><b style="color:' + e.color + ';font-size:18px;">' + esc(e.nombre) + '</b> ' + e.emoji + '</p>' +
        '<p style="font-size:11px;color:#666;margin-top:12px;border-top:1px solid #ccc;padding-top:6px;">Firma de Luna 🦊 · Fecha: ' + fecha + '</p></div>';
    }
    app.innerHTML = '<div class="esc-screen"><div class="esc-premio-card">' +
      '<div class="esc-premio-emoji">' + emoji + '</div>' +
      '<h2 style="color:' + e.color + ';margin:8px 0;">¡Misión Cumplida! 🎉</h2>' +
      '<div style="font-weight:800;color:#667;margin:8px 0;">⭐ +' + (primera ? 20 : 0) + ' estrellas</div>' +
      certHtml +
      '<button class="esc-btn-pri" data-act="volver" style="margin-top:16px;">🏠 Siguiente Desafío</button></div></div>';
    app.querySelector('[data-act="volver"]').addEventListener('click', function () { snd('click'); try { if (window.EK && EK.App && EK.App.ir) EK.App.ir('mundo', { id: escId }); else mostrarEscuelas(); } catch (err) { mostrarEscuelas(); } });
  }

  function header(t, e, c, color) {
    return '<div class="esc-head"><button class="esc-back" data-act="volver">←</button>' +
      '<div class="esc-title" style="color:' + (color || '#6C5CE7') + ';">' + e + ' ' + esc(t) + '</div>' +
      '<div class="esc-counter" style="background:' + (color || '#6C5CE7') + ';">' + (c || '') + '</div></div>';
  }
  function bindVolver(app, escId) {
    var b = app.querySelector('[data-act="volver"]');
    if (b) b.addEventListener('click', function () { limpiarTimers(); snd('click'); try { if (window.EK && EK.App && EK.App.ir) EK.App.ir('mundo', { id: escId }); else mostrarEscuelas(); } catch (e) { mostrarEscuelas(); } });
  }

  /* ==================== TIPOS DE ACTIVIDADES (6) ==================== */

  /* 1) QUIZ */
  function jugarQuiz(escId, n, a, act) {
    var e = ESCUELAS[escId];
    var ronda = 0, total = act.preguntas.length, lock = false;
    var app = document.getElementById('app');
    hablar(act.nombre);
    function render() {
      if (ronda >= total) { ganar(escId, n, a, act.nombre, act.emoji); return; }
      var q = act.preguntas[ronda];
      lock = false;
      app.innerHTML = '<div class="esc-screen">' + header(act.nombre, act.emoji, (ronda + 1) + '/' + total, e.color) +
        '<div class="esc-progreso"><div class="esc-progreso-fill" style="width:' + (ronda / total * 100) + '%;"></div></div>' +
        '<div class="esc-pregunta-card"><div class="esc-pregunta-texto">' + esc(q.pregunta) + '</div></div>' +
        '<div class="esc-opciones">' + q.opciones.map(function (o) { return '<button class="esc-opcion">' + esc(o) + '</button>'; }).join('') + '</div>' +
        '<div class="esc-feedback" id="esc-fb"></div></div>';
      bindVolver(app, escId);
      app.querySelectorAll('.esc-opcion').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          hablar(b.textContent);
          var ok = b.textContent === q.correcta;
          app.querySelectorAll('.esc-opcion').forEach(function (x) { x.disabled = true; if (x.textContent === q.correcta) x.classList.add('ok'); else if (x === b) x.classList.add('mal'); });
          var fb = document.getElementById('esc-fb');
          if (ok) { snd('correcto'); fb.innerHTML = '<span class="esc-feedback ok">' + randomAcierto() + ' ⭐</span>'; }
          else { snd('error'); fb.innerHTML = '<span class="esc-feedback mal">Era: ' + esc(q.correcta) + '</span>'; hablar(randomError()); }
          ronda++; despues(1400, render);
        });
      });
    }
    render();
  }

  /* 2) ORDENAR */
  function jugarOrdenar(escId, n, a, act) {
    var app = document.getElementById('app');
    var e = ESCUELAS[escId];
    var orden = barajar(act.pasos.map(function (p, i) { return { t: p, i: i }; }));
    var elegido = [];
    hablar(act.instruccion);
    function render() {
      app.innerHTML = '<div class="esc-screen">' + header(act.nombre, act.emoji, (elegido.length + '/' + act.pasos.length), e.color) +
        '<p class="esc-hint">' + esc(act.instruccion) + '</p>' +
        '<div class="esc-elegida">' + elegido.map(function (x) { return '<span class="esc-paso-ok" style="background:linear-gradient(135deg,' + e.color + ',#A29BFE);">' + esc(x.t) + '</span>'; }).join('') + '</div>' +
        '<div class="esc-bloques-grid">' + orden.map(function (p) {
          var usado = elegido.indexOf(p) !== -1;
          return '<button class="esc-bloque ' + (usado ? 'usado' : '') + '" data-i="' + p.i + '" ' + (usado ? 'disabled' : '') + ' style="background:linear-gradient(135deg,' + e.color + ',#A29BFE);">' + esc(p.t) + '</button>';
        }).join('') + '</div><div class="esc-feedback" id="esc-fb"></div></div>';
      bindVolver(app, escId);
      app.querySelectorAll('.esc-bloque:not(.usado)').forEach(function (b) {
        b.addEventListener('click', function () {
          var paso = orden.find(function (p) { return p.i === Number(b.dataset.i); });
          if (Number(b.dataset.i) === elegido.length) {
            snd('correcto'); elegido.push(paso); hablar(paso.t);
            if (elegido.length === act.pasos.length) { despues(500, function () { ganar(escId, n, a, act.nombre, act.emoji); }); }
            else despues(200, render);
          } else {
            snd('error'); hablar(randomError());
            b.classList.add('mal');
            document.getElementById('esc-fb').innerHTML = '<span class="esc-feedback mal">¡No! El paso correcto es el número ' + (elegido.length + 1) + '</span>';
            despues(1200, function () { elegido = []; render(); });
          }
        });
      });
    }
    render();
  }

  /* 3) CLASIFICAR */
  function jugarClasificar(escId, n, a, act) {
    var app = document.getElementById('app');
    var e = ESCUELAS[escId];
    var items = barajar(act.items.map(function (it, i) { return { t: it.t, ok: it.ok, i: i }; }));
    var correctas = items.filter(function (it) { return it.ok; }).length;
    var encontradas = 0, errores = 0, lock = false;
    hablar(act.instruccion);
    app.innerHTML = '<div class="esc-screen">' + header(act.nombre, act.emoji, (encontradas + '/' + correctas), e.color) +
      '<p class="esc-hint">' + esc(act.instruccion) + '</p>' +
      '<div class="esc-clasif-grid">' + items.map(function (it) { return '<button class="esc-clasif-btn" data-i="' + it.i + '">' + esc(it.t) + '</button>'; }).join('') + '</div>' +
      '<div class="esc-feedback" id="esc-fb"></div></div>';
    bindVolver(app, escId);
    app.querySelectorAll('.esc-clasif-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        if (lock || b.disabled) return;
        var it = items.find(function (x) { return x.i === Number(b.dataset.i); });
        b.disabled = true; hablar(it.t);
        if (it.ok) {
          encontradas++; snd('correcto'); b.classList.add('ok');
          app.querySelector('.esc-counter').textContent = encontradas + '/' + correctas;
          if (encontradas === correctas) { lock = true; despues(600, function () { ganar(escId, n, a, act.nombre, act.emoji); }); }
        } else {
          errores++; snd('error'); b.classList.add('mal'); hablar(randomError());
          document.getElementById('esc-fb').innerHTML = '<span class="esc-feedback mal">¡Ese no va! Errores: ' + errores + '</span>';
          if (errores >= 3) { lock = true; document.getElementById('esc-fb').innerHTML = '<span class="esc-feedback mal">¡Ups! Volvé a intentarlo 💪</span>'; despues(1500, function () { jugarClasificar(escId, n, a, act); }); }
        }
      });
    });
  }

  /* 4) CONSTRUIR */
  function jugarConstruir(escId, n, a, act) {
    var app = document.getElementById('app');
    var e = ESCUELAS[escId];
    var partes = barajar(act.partes.map(function (p, i) { return { t: p, i: i }; }));
    var armado = [];
    hablar(act.instruccion);
    function render() {
      app.innerHTML = '<div class="esc-screen">' + header(act.nombre, act.emoji, (armado.length + '/' + act.partes.length), e.color) +
        '<p class="esc-hint">' + esc(act.instruccion) + '</p>' +
        '<div class="esc-ensamblado" style="border-color:' + e.color + ';" id="ensamblado">' + armado.map(function (x) { return '<div class="esc-parte-ok" style="color:' + e.color + ';">' + esc(x.t) + '</div>'; }).join('') + '</div>' +
        '<div class="esc-bloques-grid">' + partes.map(function (p) {
          var usado = armado.indexOf(p) !== -1;
          return '<button class="esc-bloque ' + (usado ? 'usado' : '') + '" data-i="' + p.i + '" ' + (usado ? 'disabled' : '') + ' style="background:linear-gradient(135deg,' + e.color + ',#A29BFE);">' + esc(p.t) + '</button>';
        }).join('') + '</div><div class="esc-feedback" id="esc-fb"></div></div>';
      bindVolver(app, escId);
      app.querySelectorAll('.esc-bloque:not(.usado)').forEach(function (b) {
        b.addEventListener('click', function () {
          var parte = partes.find(function (p) { return p.i === Number(b.dataset.i); });
          if (Number(b.dataset.i) === armado.length) {
            snd('correcto'); armado.push(parte); hablar(parte.t);
            if (armado.length === act.partes.length) {
              document.getElementById('ensamblado').innerHTML += '<div class="esc-parte-final" style="background:linear-gradient(135deg,' + e.color + ',#A29BFE);">' + esc(act.final || '¡Listo!') + '</div>';
              despues(1200, function () { ganar(escId, n, a, act.nombre, act.emoji); });
            } else despues(200, render);
          } else {
            snd('error'); hablar(randomError());
            b.classList.add('mal');
            document.getElementById('esc-fb').innerHTML = '<span class="esc-feedback mal">¡No! Primero va la parte ' + (armado.length + 1) + '</span>';
            despues(1200, render);
          }
        });
      });
    }
    render();
  }

  /* 5) EMPAREJAR (nuevo) */
  function jugarEmparejar(escId, n, a, act) {
    var app = document.getElementById('app');
    var e = ESCUELAS[escId];
    var todos = [];
    act.pares.forEach(function (p, i) { todos.push({ t: p.a, par: i, lado: 'a' }); todos.push({ t: p.b, par: i, lado: 'b' }); });
    todos = barajar(todos);
    var sel = null, encontrados = 0, lock = false;
    hablar(act.instruccion);
    function render() {
      app.innerHTML = '<div class="esc-screen">' + header(act.nombre, act.emoji, (encontrados + '/' + act.pares.length), e.color) +
        '<p class="esc-hint">' + esc(act.instruccion) + '</p>' +
        '<div class="esc-empareja-grid">' + todos.map(function (it, i) {
          return '<button class="esc-empareja-btn" data-i="' + i + '" data-par="' + it.par + '">' + esc(it.t) + '</button>';
        }).join('') + '</div><div class="esc-feedback" id="esc-fb"></div></div>';
      bindVolver(app, escId);
      app.querySelectorAll('.esc-empareja-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock || b.classList.contains('ok')) return;
          snd('click'); hablar(b.textContent);
          if (!sel) { sel = b; b.classList.add('sel'); return; }
          if (sel === b) { b.classList.remove('sel'); sel = null; return; }
          if (sel.dataset.par === b.dataset.par) {
            sel.classList.remove('sel'); sel.classList.add('ok'); b.classList.add('ok');
            encontrados++; snd('correcto');
            app.querySelector('.esc-counter').textContent = encontrados + '/' + act.pares.length;
            sel = null;
            if (encontrados === act.pares.length) { despues(600, function () { ganar(escId, n, a, act.nombre, act.emoji); }); }
          } else {
            lock = true;
            b.classList.add('mal'); sel.classList.add('mal'); snd('error'); hablar(randomError());
            var s1 = sel, s2 = b;
            despues(800, function () { s1.classList.remove('sel', 'mal'); s2.classList.remove('mal'); sel = null; lock = false; });
          }
        });
      });
    }
    render();
  }

  /* 6) COMPLETAR (nuevo) */
  function jugarCompletar(escId, n, a, act) {
    var app = document.getElementById('app');
    var e = ESCUELAS[escId];
    var ronda = 0, total = act.preguntas.length;
    hablar(act.nombre);
    function render() {
      if (ronda >= total) { ganar(escId, n, a, act.nombre, act.emoji); return; }
      var q = act.preguntas[ronda];
      app.innerHTML = '<div class="esc-screen">' + header(act.nombre, act.emoji, (ronda + 1) + '/' + total, e.color) +
        '<div class="esc-pregunta-card"><div class="esc-pregunta-texto">' + esc(q.p) + '</div>' +
        '<input type="text" class="esc-completar-input" id="esc-inp" placeholder="Escribí la respuesta..." autocomplete="off" /></div>' +
        '<button class="esc-btn-pri" id="esc-ok" style="display:block;margin:10px auto;">✅ Verificar</button>' +
        '<div class="esc-feedback" id="esc-fb"></div></div>';
      bindVolver(app, escId);
      var inp = document.getElementById('esc-inp');
      setTimeout(function () { inp.focus(); }, 100);
      function verificar() {
        var val = inp.value.trim().toLowerCase();
        if (!val) return;
        hablar(val);
        var ok = q.resp.some(function (r) { return r.toLowerCase() === val; });
        var fb = document.getElementById('esc-fb');
        if (ok) { snd('correcto'); fb.innerHTML = '<span class="esc-feedback ok">' + randomAcierto() + ' ⭐</span>'; ronda++; despues(1200, render); }
        else { snd('error'); fb.innerHTML = '<span class="esc-feedback mal">¡Casi! Era: ' + esc(q.resp[0]) + '</span>'; hablar(randomError()); ronda++; despues(1500, render); }
      }
      document.getElementById('esc-ok').addEventListener('click', verificar);
      inp.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') verificar(); });
    }
    render();
  }

  /* 7) VERDADERO/FALSO (nuevo) */
  function jugarVof(escId, n, a, act) {
    var app = document.getElementById('app');
    var e = ESCUELAS[escId];
    var ronda = 0, total = act.preguntas.length, lock = false;
    hablar(act.nombre);
    function render() {
      if (ronda >= total) { ganar(escId, n, a, act.nombre, act.emoji); return; }
      var q = act.preguntas[ronda];
      lock = false;
      app.innerHTML = '<div class="esc-screen">' + header(act.nombre, act.emoji, (ronda + 1) + '/' + total, e.color) +
        '<div class="esc-progreso"><div class="esc-progreso-fill" style="width:' + (ronda / total * 100) + '%;"></div></div>' +
        '<div class="esc-pregunta-card"><div class="esc-pregunta-texto" style="font-size:20px;">' + esc(q.p) + '</div></div>' +
        '<div class="esc-vof-btns">' +
        '<button class="esc-vof-btn" data-v="true" style="background:linear-gradient(135deg,#00B894,#55EFC4);">✅ Verdadero</button>' +
        '<button class="esc-vof-btn" data-v="false" style="background:linear-gradient(135deg,#FA5252,#FF6B6B);">❌ Falso</button>' +
        '</div><div class="esc-feedback" id="esc-fb"></div></div>';
      bindVolver(app, escId);
      app.querySelectorAll('.esc-vof-btn').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          var resp = b.dataset.v === 'true';
          var ok = resp === q.ok;
          var fb = document.getElementById('esc-fb');
          if (ok) { snd('correcto'); b.style.transform = 'scale(1.1)'; fb.innerHTML = '<span class="esc-feedback ok">' + randomAcierto() + ' ⭐</span>'; }
          else { snd('error'); b.classList.add('mal'); fb.innerHTML = '<span class="esc-feedback mal">¡Era ' + (q.ok ? 'Verdadero ✅' : 'Falso ❌') + '!</span>'; hablar(randomError()); }
          ronda++; despues(1300, render);
        });
      });
    }
    render();
  }

  /* 8) CONTAR (nuevo) */
  function jugarContar(escId, n, a, act) {
    var app = document.getElementById('app');
    var e = ESCUELAS[escId];
    var ronda = 0, total = act.items.length, lock = false;
    hablar(act.instruccion);
    function render() {
      if (ronda >= total) { ganar(escId, n, a, act.nombre, act.emoji); return; }
      var it = act.items[ronda];
      var opts = barajar(it.opts);
      lock = false;
      var emojis = '';
      for (var i = 0; i < it.cant; i++) emojis += it.emoji + ' ';
      app.innerHTML = '<div class="esc-screen">' + header(act.nombre, act.emoji, (ronda + 1) + '/' + total, e.color) +
        '<div class="esc-pregunta-card"><div class="esc-pregunta-texto">¿Cuántos hay?</div>' +
        '<div class="esc-contar-grid">' + emojis + '</div></div>' +
        '<div class="esc-opciones">' + opts.map(function (o) { return '<button class="esc-opcion" style="text-align:center;font-size:22px;">' + o + '</button>'; }).join('') + '</div>' +
        '<div class="esc-feedback" id="esc-fb"></div></div>';
      bindVolver(app, escId);
      app.querySelectorAll('.esc-opcion').forEach(function (b) {
        b.addEventListener('click', function () {
          if (lock) return; lock = true;
          hablar(b.textContent);
          var ok = Number(b.textContent) === it.cant;
          app.querySelectorAll('.esc-opcion').forEach(function (x) { x.disabled = true; if (Number(x.textContent) === it.cant) x.classList.add('ok'); else if (x === b) x.classList.add('mal'); });
          var fb = document.getElementById('esc-fb');
          if (ok) { snd('correcto'); fb.innerHTML = '<span class="esc-feedback ok">' + randomAcierto() + ' ⭐</span>'; }
          else { snd('error'); fb.innerHTML = '<span class="esc-feedback mal">Era: ' + it.cant + '</span>'; hablar(randomError()); }
          ronda++; despues(1300, render);
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
    else if (act.tipo === 'emparejar') jugarEmparejar(escId, n, a, act);
    else if (act.tipo === 'completar') jugarCompletar(escId, n, a, act);
    else if (act.tipo === 'vof') jugarVof(escId, n, a, act);
    else if (act.tipo === 'contar') jugarContar(escId, n, a, act);
  }

  /* ==================== MENÚ DE ESCUELAS ==================== */
  function mostrarEscuelas() {
    var app = document.getElementById('app');
    var ids = Object.keys(ESCUELAS);
    var certs = certificados();
    app.innerHTML = '<div class="esc-screen">' +
      '<div class="esc-head"><div class="esc-title" style="color:#6C5CE7;font-size:20px;">🎓 Escuelas del Futuro</div>' +
      '<div style="font-weight:800;color:#667;font-size:12px;">' + ids.length + ' escuelas · Certificados: ' + certs.length + '/' + ids.length + '</div></div>' +
      '<div style="text-align:center;padding:6px;font-weight:800;color:#667;font-size:13px;">¡Elegí una escuela y aprendé jugando!</div>' +
      '<div class="esc-escuelas-grid">' + ids.map(function (id) {
        var e = ESCUELAS[id]; var p = progreso(id); var tieneCert = certs.indexOf(id) !== -1;
        return '<div class="esc-escuela-card" data-esc="' + id + '" style="background:linear-gradient(135deg,' + e.color + ',#A29BFE);">' +
          (tieneCert ? '<span class="e-cert">🏅</span>' : '') +
          '<span class="e-emoji">' + e.emoji + '</span>' +
          '<span class="e-nombre">' + esc(e.nombre) + '</span>' +
          '<span class="e-prog">' + p + '% completado</span></div>';
      }).join('') + '</div></div>';
    app.querySelectorAll('.esc-escuela-card').forEach(function (c) {
      c.addEventListener('click', function () { snd('click'); var id = c.dataset.esc; var e = ESCUELAS[id]; hablar(e.nombre); mostrarNiveles(id); });
    });
  }

  function mostrarNiveles(escId) {
    var app = document.getElementById('app');
    var e = ESCUELAS[escId];
    var desb = nivelDesbloqueado(escId);
    app.innerHTML = '<div class="esc-screen">' +
      '<div class="esc-head"><button class="esc-back" data-act="volver">←</button>' +
      '<div class="esc-title" style="color:' + e.color + ';">' + e.emoji + ' ' + esc(e.nombre) + '</div>' +
      '<div class="esc-counter" style="background:' + e.color + ';">' + progreso(escId) + '%</div></div>' +
      '<div class="esc-progreso" style="margin:10px 14px;"><div class="esc-progreso-fill" style="width:' + progreso(escId) + '%;"></div></div>' +
      '<div class="esc-grid-act">' + e.niveles.map(function (nv, n) {
        var bloqueado = n >= desb;
        return '<div class="esc-card-act ' + (bloqueado ? 'bloqueado' : '') + '" data-nivel="' + n + '">' +
          '<span class="emoji">' + NIVELES_EMOJIS[n] + '</span>' +
          '<span class="nombre">Nivel ' + (n + 1) + ': ' + esc(nv.nombre) + '</span>' +
          (bloqueado ? '<span style="font-size:11px;color:#999;font-weight:700;">🔒 Completá el nivel anterior</span>' :
            '<span style="font-size:11px;color:#00B894;font-weight:700;">' + nv.actividades.length + ' actividades</span>') +
          (nivelCompletado(escId, n) ? '<span class="hecho">✓</span>' : '') +
          '</div>';
      }).join('') + '</div></div>';
    app.querySelector('[data-act="volver"]').addEventListener('click', function () { snd('click'); mostrarEscuelas(); });
    app.querySelectorAll('.esc-card-act:not(.bloqueado)').forEach(function (c) {
      c.addEventListener('click', function () { snd('click'); mostrarActividades(escId, Number(c.dataset.nivel)); });
    });
  }

  function mostrarActividades(escId, n) {
    var app = document.getElementById('app');
    var e = ESCUELAS[escId];
    var nv = e.niveles[n];
    app.innerHTML = '<div class="esc-screen">' +
      '<div class="esc-head"><button class="esc-back" data-act="volver">←</button>' +
      '<div class="esc-title" style="color:' + e.color + ';">' + NIVELES_EMOJIS[n] + ' Nivel ' + (n + 1) + '</div></div>' +
      '<div style="text-align:center;padding:8px;font-weight:800;color:#667;">' + esc(nv.nombre) + '</div>' +
      '<div class="esc-grid-act">' + nv.actividades.map(function (act, a) {
        var hecho = actCompletada(escId, n, a);
        return '<div class="esc-card-act" data-act-idx="' + a + '">' +
          '<span class="emoji">' + act.emoji + '</span>' +
          '<span class="nombre">' + esc(act.nombre) + '</span>' +
          '<span style="font-size:10px;color:#889;font-weight:700;text-transform:uppercase;">' + act.tipo + '</span>' +
          (hecho ? '<span class="hecho">✓</span>' : '') + '</div>';
      }).join('') + '</div></div>';
    app.querySelector('[data-act="volver"]').addEventListener('click', function () { snd('click'); mostrarNiveles(escId); });
    app.querySelectorAll('.esc-card-act').forEach(function (c) {
      c.addEventListener('click', function () { snd('click'); iniciarActividad(escId, n, Number(c.dataset.actIdx)); });
    });
  }

  var Escuelas = {
    ESCUELAS: ESCUELAS, NIVELES_NOMBRES: NIVELES_NOMBRES, NIVELES_EMOJIS: NIVELES_EMOJIS,
    iniciarActividad: iniciarActividad, nivelDesbloqueado: nivelDesbloqueado,
    nivelCompletado: nivelCompletado, actCompletada: actCompletada,
    progreso: progreso, escuelaCompleta: escuelaCompleta, certificados: certificados,
    mostrarEscuelas: mostrarEscuelas, mostrarNiveles: mostrarNiveles, mostrarActividades: mostrarActividades
  };
  window.EK = window.EK || {};
  window.EK.Escuelas = Escuelas;
  try { if (!window.EK.App || !window.EK.App.ir) { if (document.getElementById('app')) mostrarEscuelas(); } } catch (e) { }
})();
