/* ============================================================
   dibujo-super-premium.js — Mundo Creativo (SUPER PREMIUM)
   REEMPLAZA a dibujo.js. Subir SOLO este archivo.
   Mantiene API: window.EK.Dibujo.iniciar()  /  .bocetos
   MEJORAS (bugs fixeados + funciones nuevas):
   ✅ Lienzo SIEMPRE en blanco (fix: rAF + ResizeObserver, no 1×1px)
   ✅ Todas las funciones andan (EK.* defensivos con try/catch)
   ✅ Pointer capture protegido (no rompe en touch)
   ✅ +7 tipos de pincel: pincel, marcador, crayón, aerosol, neón, glitter, arcoíris
   ✅ Formas: línea, rectángulo, círculo, estrella, corazón
   ✅ Stickers/emojis para pegar · Herramienta de texto
   ✅ Modo espejo (simetría horizontal/vertical)
   ✅ 32 colores + selector de color personalizado + colores recientes
   ✅ Slider opacidad · Fondos: blanco, puntos, líneas, cuadrícula, noche
   ✅ +30 bocetos nuevos (76 total) · Descargar PNG · Compartir
   ✅ Confeti + sonidos · Limpiar con confirmación · Voltear lienzo
   ✅ Undo/Redo con 30 estados · Tamaño hasta 80px
   ============================================================ */
(function () {
  'use strict';

  /* ---------- utilidades defensivas (no rompen si EK no existe) ---------- */
  function snd(nombre) {
    try {
      if (window.EK && EK.Audio && typeof EK.Audio[nombre] === 'function') EK.Audio[nombre]();
      else if (window.EK && EK.Audio && typeof EK.Audio.click === 'function') EK.Audio.click();
    } catch (e) { /* silencioso */ }
  }
  function aviso(msg) {
    try { if (window.EK && EK.App && EK.App.mostrarAviso) { EK.App.mostrarAviso(msg); return; } } catch (e) {}
    /* fallback: toast nativo */
    var t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;left:50%;top:20px;transform:translateX(-50%);background:#333;color:#fff;padding:10px 20px;border-radius:999px;z-index:99999;font-family:sans-serif;font-size:14px;box-shadow:0 4px 16px rgba(0,0,0,.3);opacity:0;transition:opacity .3s;';
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.style.opacity = '1'; });
    setTimeout(function () { t.style.opacity = '0'; setTimeout(function () { t.remove(); }, 300); }, 2200);
  }
  function sumarEstrellas(n) {
    try { if (window.EK && EK.Store && EK.Store.addEstrellas) EK.Store.addEstrellas(n); } catch (e) {}
  }
  function actualizarTopbar() {
    try { if (window.EK && EK.App && EK.App.actualizarTopbar) EK.App.actualizarTopbar(); } catch (e) {}
  }
  function irInicio() {
    try { if (window.EK && EK.App && EK.App.ir) { EK.App.ir('inicio'); return; } } catch (e) {}
    aviso('← Volver');
  }

  /* ---------- 1. CSS PREMIUM inyectado ---------- */
  function inyectarCSS() {
    if (document.getElementById('dibujo-css-premium')) return;
    var st = document.createElement('style');
    st.id = 'dibujo-css-premium';
    st.textContent = [
      '.dibujo-screen{display:flex;flex-direction:column;height:100%;min-height:0;background:linear-gradient(160deg,#eef3ff 0%,#f6f0ff 100%);font-family:"Comic Sans MS","Segoe UI",system-ui,sans-serif;}',
      '.dibujo-head{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#fff;border-bottom:2px solid #e6ebf5;box-shadow:0 2px 8px rgba(60,80,140,.08);}',
      '.dibujo-title{font-weight:900;color:#4D96FF;font-size:18px;display:flex;align-items:center;gap:6px;}',
      '.dibujo-btn-top{border:none;background:linear-gradient(135deg,#FF9F43,#FF6B9D);color:#fff;border-radius:14px;padding:8px 14px;font-size:16px;cursor:pointer;font-weight:800;box-shadow:0 3px 10px rgba(255,107,157,.4);transition:transform .15s;}',
      '.dibujo-btn-top:active{transform:scale(.92);}',
      '.dibujo-back{border:none;background:#eef2fb;color:#445;border-radius:12px;padding:8px 12px;font-size:18px;cursor:pointer;font-weight:900;}',
      '.dibujo-tools{padding:6px 10px;background:#fff;border-bottom:2px solid #e6ebf5;box-shadow:0 2px 6px rgba(60,80,140,.06);}',
      '.dibujo-paleta{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;margin-bottom:6px;align-items:center;}',
      '.dibujo-color{width:26px;height:26px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 2px #cfd6e6;cursor:pointer;padding:0;flex:0 0 auto;transition:transform .15s;}',
      '.dibujo-color.sel{box-shadow:0 0 0 3px #4D96FF;transform:scale(1.2);}',
      '.dibujo-color-custom{width:26px;height:26px;border-radius:50%;border:3px dashed #A55EEA;cursor:pointer;padding:0;background:conic-gradient(red,yellow,lime,cyan,blue,magenta,red);flex:0 0 auto;}',
      '.dibujo-barra{display:flex;align-items:center;gap:5px;justify-content:center;flex-wrap:wrap;}',
      '.dibujo-btn{border:none;background:#eef2fb;color:#334;border-radius:12px;padding:7px 9px;font-size:17px;cursor:pointer;min-width:38px;transition:all .15s;position:relative;}',
      '.dibujo-btn:active{transform:scale(.9);}',
      '.dibujo-btn.sel{background:linear-gradient(135deg,#4D96FF,#A55EEA);color:#fff;box-shadow:0 3px 10px rgba(77,150,255,.4);}',
      '.dibujo-btn .tip{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);background:#333;color:#fff;font-size:10px;padding:3px 7px;border-radius:6px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s;margin-bottom:4px;font-weight:700;}',
      '.dibujo-btn:hover .tip{opacity:1;}',
      '.dibujo-rango{flex:1;max-width:120px;accent-color:#4D96FF;height:4px;}',
      '.dibujo-rango-label{font-size:11px;font-weight:800;color:#667;min-width:30px;text-align:center;}',
      '.dibujo-sep{width:2px;height:24px;background:#e0e6f0;margin:0 3px;border-radius:2px;}',
      '.dibujo-canvas-wrap{position:relative;flex:1;min-height:200px;margin:10px;border-radius:18px;overflow:hidden;box-shadow:0 8px 24px rgba(60,80,140,.2);background:#fff;border:3px solid #fff;}',
      '.dibujo-canvas-wrap canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none;}',
      '#dibujoBoceto{pointer-events:none;z-index:2;}',
      '#dibujoPintura{z-index:1;}',
      '.dibujo-bg-dots{background-image:radial-gradient(#e0e6f0 1.5px,transparent 1.5px);background-size:18px 18px;}',
      '.dibujo-bg-lines{background-image:linear-gradient(#e0e6f0 1px,transparent 1px);background-size:100% 24px;}',
      '.dibujo-bg-grid{background-image:linear-gradient(#e0e6f0 1px,transparent 1px),linear-gradient(90deg,#e0e6f0 1px,transparent 1px);background-size:24px 24px;}',
      '.dibujo-bg-night{background:#1a1a2e!important;}',
      '.dibujo-modal{position:fixed;inset:0;background:rgba(20,28,60,.6);z-index:500;display:flex;flex-direction:column;backdrop-filter:blur(4px);}',
      '.dibujo-modal-head{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#fff;border-radius:18px 18px 0 0;}',
      '.dibujo-modal-title{font-weight:900;color:#4D96FF;font-size:18px;}',
      '.dibujo-modal-close{border:none;background:#FF6B9D;color:#fff;border-radius:50%;width:34px;height:34px;font-size:16px;cursor:pointer;font-weight:900;}',
      '.dibujo-cats{display:flex;gap:6px;overflow-x:auto;padding:8px 12px;background:#fff;border-top:1px solid #eef1f8;}',
      '.dibujo-cat{border:none;background:#eef2fb;color:#445;border-radius:20px;padding:6px 14px;white-space:nowrap;cursor:pointer;font-size:13px;font-weight:700;transition:all .15s;}',
      '.dibujo-cat.sel{background:linear-gradient(135deg,#A55EEA,#FF6B9D);color:#fff;box-shadow:0 3px 8px rgba(165,94,234,.4);}',
      '.dibujo-grid{flex:1;overflow-y:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:10px;padding:12px;background:#f4f7ff;align-content:start;border-radius:0 0 18px 18px;}',
      '.dibujo-card{background:#fff;border-radius:14px;padding:6px;cursor:pointer;text-align:center;box-shadow:0 2px 8px rgba(60,80,140,.12);transition:transform .15s;border:2px solid transparent;}',
      '.dibujo-card:hover{transform:translateY(-3px);border-color:#4D96FF;}',
      '.dibujo-card:active{transform:scale(.95);}',
      '.dibujo-card canvas{width:100%;height:85px;background:#fff;border-radius:10px;}',
      '.dibujo-card span{display:block;font-size:11px;color:#445;margin-top:4px;font-weight:700;}',
      '.dibujo-sticker-panel{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);background:#fff;border-radius:16px;padding:8px 12px;box-shadow:0 6px 20px rgba(0,0,0,.2);display:flex;gap:6px;z-index:10;flex-wrap:wrap;max-width:90%;justify-content:center;}',
      '.dibujo-sticker{border:none;background:#f0f3ff;border-radius:10px;font-size:22px;cursor:pointer;padding:4px 8px;transition:transform .15s;}',
      '.dibujo-sticker:active{transform:scale(1.3);}',
      '.dibujo-text-input{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:20;background:#fff;padding:14px;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.3);display:flex;gap:8px;align-items:center;}',
      '.dibujo-text-input input{border:2px solid #4D96FF;border-radius:10px;padding:8px 12px;font-size:16px;font-weight:700;outline:none;width:180px;}',
      '.dibujo-text-input button{border:none;background:linear-gradient(135deg,#4D96FF,#A55EEA);color:#fff;border-radius:10px;padding:8px 14px;font-weight:800;cursor:pointer;}',
      '@keyframes dibujo-pulse{0%{box-shadow:0 0 0 0 rgba(255,107,157,.6);}70%{box-shadow:0 0 0 12px rgba(255,107,157,0);}100%{box-shadow:0 0 0 0 rgba(255,107,157,0);}}',
      '.dibujo-btn.recording{animation:dibujo-pulse 1s infinite;background:linear-gradient(135deg,#FF6B6B,#FF9F43)!important;color:#fff!important;}',
      '.dibujo-confetti{position:fixed;width:8px;height:8px;top:-10px;z-index:99998;pointer-events:none;border-radius:2px;}',
      '@keyframes dibujo-conf-fall{to{transform:translateY(105vh) rotate(720deg);opacity:0;}}',
      '.dibujo-size-preview{display:inline-block;width:20px;height:20px;border-radius:50%;background:currentColor;vertical-align:middle;}',
      '.dibujo-confirm{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:600;display:flex;align-items:center;justify-content:center;}',
      '.dibujo-confirm-box{background:#fff;border-radius:20px;padding:24px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.3);max-width:300px;}',
      '.dibujo-confirm-box h3{margin:0 0 12px;color:#334;font-size:18px;}',
      '.dibujo-confirm-box button{margin:4px;border:none;border-radius:12px;padding:10px 20px;font-weight:800;cursor:pointer;font-size:14px;}',
      '.dibujo-confirm-yes{background:linear-gradient(135deg,#FF6B6B,#FF9F43);color:#fff;}',
      '.dibujo-confirm-no{background:#eef2fb;color:#445;}',
      '@media (max-width:480px){.dibujo-grid{grid-template-columns:repeat(3,1fr);}.dibujo-btn{min-width:34px;padding:6px 7px;font-size:15px;}.dibujo-rango{max-width:80px;}}'
    ].join('');
    document.head.appendChild(st);
  }

  /* ---------- 2. Mini-DSL de trazos vectoriales ---------- */
  var RE_TOK = /[MLQCZOER]|-?\d+(\.\d+)?/g;
  function trazar(ctx, d) {
    var t = d.match(RE_TOK), i = 0, n = t.length, x = 0, y = 0;
    ctx.beginPath();
    while (i < n) {
      var c = t[i++];
      if (c === 'M') { x = +t[i++]; y = +t[i++]; ctx.moveTo(x, y); }
      else if (c === 'L') { x = +t[i++]; y = +t[i++]; ctx.lineTo(x, y); }
      else if (c === 'Q') { var qx = +t[i++], qy = +t[i++]; x = +t[i++]; y = +t[i++]; ctx.quadraticCurveTo(qx, qy, x, y); }
      else if (c === 'C') { var c1x = +t[i++], c1y = +t[i++], c2x = +t[i++], c2y = +t[i++]; x = +t[i++]; y = +t[i++]; ctx.bezierCurveTo(c1x, c1y, c2x, c2y, x, y); }
      else if (c === 'Z') { ctx.closePath(); }
      else if (c === 'O') { var ox = +t[i++], oy = +t[i++], or = +t[i++]; ctx.moveTo(ox + or, oy); ctx.arc(ox, oy, or, 0, Math.PI * 2); }
      else if (c === 'E') { var ex = +t[i++], ey = +t[i++], erx = +t[i++], ery = +t[i++], erot = (+t[i++]) * Math.PI / 180; ctx.moveTo(ex + erx, ey); ctx.ellipse(ex, ey, erx, ery, erot, 0, Math.PI * 2); }
      else if (c === 'R') {
        var rx = +t[i++], ry = +t[i++], rw = +t[i++], rh = +t[i++], rr = 0;
        if (i < n && /^-?\d/.test(t[i])) rr = +t[i++];
        if (rr > 0) {
          rr = Math.min(rr, rw / 2, rh / 2);
          ctx.moveTo(rx + rr, ry); ctx.lineTo(rx + rw - rr, ry); ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + rr);
          ctx.lineTo(rx + rw, ry + rh - rr); ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - rr, ry + rh);
          ctx.lineTo(rx + rr, ry + rh); ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - rr);
          ctx.lineTo(rx, ry + rr); ctx.quadraticCurveTo(rx, ry, rx + rr, ry);
        } else { ctx.rect(rx, ry, rw, rh); }
      }
    }
    ctx.stroke();
  }

  /* ---------- 3. Biblioteca de bocetos (76) ---------- */
  var BOCETOS = [
    /* ---- Naturaleza ---- */
    { c: 'Naturaleza', e: '☀️', n: 'Sol feliz', p: ["O 50 50 16", "M50 26 L50 12", "M50 74 L50 88", "M26 50 L12 50", "M74 50 L88 50", "M33 33 L23 23", "M67 33 L77 23", "M33 67 L23 77", "M67 67 L77 77", "O 44 47 2", "O 56 47 2", "M44 55 Q50 60 56 55"] },
    { c: 'Naturaleza', e: '🌙', n: 'Luna y estrellas', p: ["M42 18 Q66 50 42 82", "M42 18 Q20 50 42 82", "O 70 24 2", "O 79 44 1.5", "O 66 60 2", "O 80 72 1.5", "O 72 84 1.5"] },
    { c: 'Naturaleza', e: '🌸', n: 'Flor', p: ["E 50 28 9 14 0", "E 50 72 9 14 0", "E 28 50 14 9 0", "E 72 50 14 9 0", "E 34 34 11 9 45", "E 66 66 11 9 45", "E 34 66 11 9 -45", "E 66 34 11 9 -45", "O 50 50 7", "M50 57 L50 92", "M50 76 Q38 72 34 64", "M50 76 Q62 72 66 64"] },
    { c: 'Naturaleza', e: '🌳', n: 'Árbol frutal', p: ["R 45 60 10 32", "O 50 36 20", "O 30 46 12", "O 70 46 12", "O 50 20 11", "O 42 38 2.5", "O 58 44 2.5", "O 50 54 2.5", "O 38 56 2"] },
    { c: 'Naturaleza', e: '🌈', n: 'Arcoíris con nubes', p: ["M16 82 Q50 10 84 82", "M24 82 Q50 22 76 82", "M32 82 Q50 34 68 82", "M40 82 Q50 46 60 82", "O 18 82 8", "O 27 80 7", "O 12 80 6", "O 82 82 8", "O 73 80 7", "O 88 80 6"] },
    { c: 'Naturaleza', e: '🍄', n: 'Hongo', p: ["M28 50 Q50 16 72 50 Z", "M28 50 L72 50", "R 40 50 20 34", "O 40 38 4", "O 55 30 5", "O 63 44 3.5", "O 46 62 1.8", "O 55 67 1.8", "M46 72 Q50 75 54 72"] },
    { c: 'Naturaleza', e: '🌵', n: 'Cactus con flor', p: ["R 44 30 12 60 6", "R 28 45 10 20 5", "R 62 40 10 24 5", "M33 45 L33 55", "M67 40 L67 52", "O 50 24 5", "O 46 22 1.5", "O 54 22 1.5", "R 40 88 20 6 3"] },
    { c: 'Naturaleza', e: '🍂', n: 'Hoja de otoño', p: ["M50 90 L50 50", "M50 50 Q20 45 25 20 Q40 15 50 30 Q60 15 75 20 Q80 45 50 50", "M50 50 L38 38", "M50 50 L62 38", "M50 62 L38 56", "M50 62 L62 56", "M50 74 L40 70", "M50 74 L60 70"] },
    { c: 'Naturaleza', e: '❄️', n: 'Copo de nieve', p: ["M50 10 L50 90", "M15 30 L85 70", "M85 30 L15 70", "O 50 50 4", "M50 10 L45 18 L50 14 L55 18", "M50 90 L45 82 L50 86 L55 82", "M15 30 L23 32 L19 27", "M85 70 L77 68 L81 73"] },
    { c: 'Naturaleza', e: '🌋', n: 'Volcán', p: ["M10 85 L40 35 L60 35 L90 85 Z", "M40 35 Q50 20 60 35", "M45 30 L42 20", "M55 30 L58 18", "M50 25 L50 12", "O 50 10 3", "M30 60 L25 55", "M70 60 L75 55", "M50 70 L45 65", "M50 70 L55 65"] },

    /* ---- Bichos ---- */
    { c: 'Bichos', e: '🦋', n: 'Mariposa', p: ["E 50 52 3.5 20 0", "O 50 30 5", "M48 26 Q44 16 40 14", "M52 26 Q56 16 60 14", "E 34 42 17 13 -25", "E 66 42 17 13 25", "E 36 64 12 10 25", "E 64 64 12 10 -25", "O 34 42 4", "O 66 42 4", "O 36 64 3", "O 64 64 3"] },
    { c: 'Bichos', e: '🐛', n: 'Oruga', p: ["O 22 62 9", "O 36 58 9", "O 50 55 9", "O 64 52 9", "O 76 50 10", "O 73 47 2", "M76 40 L76 32", "M80 41 L85 34", "M72 53 Q76 56 80 53", "M22 71 L20 78", "M36 67 L34 74", "M50 64 L48 71", "M64 61 L62 68"] },
    { c: 'Bichos', e: '🐝', n: 'Abeja', p: ["E 50 56 15 19 0", "M37 48 L63 48", "M36 58 L64 58", "O 50 32 8", "E 38 30 11 6 -30", "E 62 30 11 6 30", "M47 26 Q44 18 40 16", "M53 26 Q56 18 60 16", "O 47 30 1.5", "O 53 30 1.5", "M47 35 Q50 38 53 35"] },
    { c: 'Bichos', e: '🐞', n: 'Mariquita', p: ["E 50 55 22 24 0", "M50 31 L50 79", "M28 55 L72 55", "O 50 28 7", "O 40 45 3", "O 60 45 3", "O 36 62 3", "O 64 62 3", "O 47 26 1.5", "O 53 26 1.5", "M42 22 L38 14", "M58 22 L62 14"] },
    { c: 'Bichos', e: '🕷️', n: 'Araña', p: ["O 50 50 14", "O 50 34 8", "O 46 32 1.5", "O 54 32 1.5", "M36 42 L18 30", "M36 48 L16 48", "M36 54 L18 66", "M36 60 L24 78", "M64 42 L82 30", "M64 48 L84 48", "M64 54 L82 66", "M64 60 L76 78"] },
    { c: 'Bichos', e: '🦗', n: 'Saltamontes', p: ["E 50 55 22 10 0", "O 72 48 8", "O 75 46 1.5", "M78 44 L84 38", "M78 50 L86 52", "M30 50 L18 40", "M30 58 L16 64", "M40 62 L36 76", "M56 62 L60 76", "M28 55 Q20 58 18 66"] },

    /* ---- Animales ---- */
    { c: 'Animales', e: '🐠', n: 'Pez', p: ["E 44 52 22 14 0", "M66 52 L84 38 L84 66 Z", "O 34 48 2.5", "M40 60 Q44 64 48 60", "M52 44 Q56 48 52 52", "M56 56 Q60 60 56 64"] },
    { c: 'Animales', e: '🐳', n: 'Ballena', p: ["E 42 58 30 17 0", "M70 52 Q84 40 82 32 Q76 44 68 48", "O 30 52 2.5", "M20 62 Q28 68 36 66", "M50 42 L50 34 Q52 30 54 34", "O 54 28 1.5", "O 59 22 1", "O 50 20 1.2"] },
    { c: 'Animales', e: '🐶', n: 'Perro', p: ["O 50 42 18", "E 32 36 7 13 -20", "E 68 36 7 13 20", "O 43 40 2.5", "O 57 40 2.5", "O 50 50 3.5", "M50 54 Q46 59 42 57", "M50 54 Q54 59 58 57", "E 50 74 20 12 0", "M40 84 L40 92", "M60 84 L60 92"] },
    { c: 'Animales', e: '🐱', n: 'Gato', p: ["O 50 45 17", "M36 34 L32 18 L46 28 Z", "M64 34 L68 18 L54 28 Z", "O 43 43 2.5", "O 57 43 2.5", "O 50 52 3", "M50 55 Q46 60 42 58", "M50 55 Q54 60 58 58", "M38 50 L30 48", "M38 53 L30 54", "M62 50 L70 48", "M62 53 L70 54", "E 50 78 18 11 0"] },
    { c: 'Animales', e: '🐰', n: 'Conejo', p: ["E 40 22 5 14 -10", "E 60 22 5 14 10", "O 50 50 18", "O 43 47 2.5", "O 57 47 2.5", "O 50 56 3", "M50 59 Q46 63 43 61", "M50 59 Q54 63 57 61", "E 50 80 16 10 0", "O 72 82 6"] },
    { c: 'Animales', e: '🐻', n: 'Oso', p: ["O 50 45 19", "O 34 30 6", "O 66 30 6", "O 43 43 2.5", "O 57 43 2.5", "O 50 53 4", "M46 58 Q50 62 54 58", "E 50 78 20 12 0", "O 32 76 6", "O 68 76 6"] },
    { c: 'Animales', e: '🦁', n: 'León', p: ["O 50 48 22", "O 50 48 14", "O 44 45 2", "O 56 45 2", "O 50 53 3", "M46 58 Q50 62 54 58", "M30 30 L24 22", "M70 30 L76 22", "M28 48 L20 48", "M72 48 L80 48", "M32 64 L24 70", "M68 64 L76 70", "M40 26 L36 18", "M60 26 L64 18"] },
    { c: 'Animales', e: '🦒', n: 'Jirafa', p: ["R 46 50 8 40", "O 50 30 10", "M46 22 L44 14", "M54 22 L56 14", "O 44 13 2", "O 56 13 2", "O 46 28 2", "O 54 28 2", "M48 34 Q50 37 52 34", "E 50 92 16 8 0", "O 46 58 2", "O 54 66 2", "O 48 76 2", "M42 90 L40 98", "M58 90 L60 98"] },
    { c: 'Animales', e: '🐢', n: 'Tortuga', p: ["E 50 55 26 18 0", "M30 55 Q50 38 70 55", "M40 45 L40 65", "M50 42 L50 68", "M60 45 L60 65", "O 78 55 7", "O 80 53 1.5", "M24 68 L18 74", "M34 72 L30 80", "M66 72 L70 80", "M82 62 L88 60"] },
    { c: 'Animales', e: '🦕', n: 'Dinosaurio', p: ["M20 70 Q20 45 45 45 Q60 45 62 35 Q64 28 72 30 Q70 40 78 44 Q90 48 88 60 L88 70 Z", "M62 35 L66 24 L70 32", "M56 40 L58 30 L62 38", "O 78 40 2", "M82 48 Q86 50 84 54", "M30 70 L28 82", "M45 70 L44 82", "M70 70 L72 82", "M82 70 L84 82"] },
    { c: 'Animales', e: '🐧', n: 'Pingüino', p: ["E 50 55 18 26 0", "E 50 60 11 18 0", "O 44 42 2.5", "O 56 42 2.5", "M46 50 L50 55 L54 50 Z", "E 34 55 6 12 20", "E 66 55 6 12 -20", "M42 80 L38 86", "M58 80 L62 86"] },
    { c: 'Animales', e: '🦉', n: 'Búho', p: ["E 50 52 22 28 0", "O 42 42 7", "O 58 42 7", "O 42 42 2.5", "O 58 42 2.5", "M46 52 L50 58 L54 52", "M38 24 L34 14", "M62 24 L66 14", "M36 60 L28 66", "M64 60 L72 66", "M40 70 L36 78", "M60 70 L64 78"] },
    { c: 'Animales', e: '🐼', n: 'Panda', p: ["O 50 46 19", "O 34 30 6", "O 66 30 6", "O 42 42 5", "O 58 42 5", "O 42 42 2", "O 58 42 2", "O 50 52 3", "M46 57 Q50 60 54 57", "E 50 80 18 10 0"] },
    { c: 'Animales', e: '🦊', n: 'Zorro', p: ["O 50 48 17", "M36 36 L28 18 L46 30 Z", "M64 36 L72 18 L54 30 Z", "O 43 46 2.5", "O 57 46 2.5", "O 50 54 3.5", "M50 58 Q46 62 42 60", "M50 58 Q54 62 58 60", "E 50 78 18 10 0", "M70 74 L82 78", "O 82 78 4"] },
    { c: 'Animales', e: '🐸', n: 'Rana', p: ["O 38 30 8", "O 62 30 8", "O 38 30 3.5", "O 62 30 3.5", "E 50 58 26 20 0", "O 44 50 2", "O 56 50 2", "M44 62 Q50 68 56 62", "M30 70 L22 76", "M70 70 L78 76"] },
    { c: 'Animales', e: '🐙', n: 'Pulpo', p: ["E 50 42 20 18 0", "M30 55 Q26 75 20 82", "M38 58 Q34 78 30 86", "M46 60 Q44 80 42 88", "M54 60 Q56 80 58 88", "M62 58 Q66 78 70 86", "M70 55 Q74 75 80 82", "O 43 40 2.5", "O 57 40 2.5", "M45 50 Q50 54 55 50"] },

    /* ---- Vehículos ---- */
    { c: 'Vehículos', e: '🚗', n: 'Auto deportivo', p: ["R 14 48 72 20 6", "M24 48 Q30 32 48 32 L66 32 Q78 32 82 48", "O 30 70 9", "O 70 70 9", "O 30 70 3.5", "O 70 70 3.5", "R 36 36 14 10 3", "R 54 36 14 10 3", "M86 55 L92 55"] },
    { c: 'Vehículos', e: '🚚', n: 'Camión', p: ["R 10 40 40 30", "R 50 52 38 18", "R 16 46 12 10", "O 22 72 8", "O 62 72 8", "O 80 72 8", "O 22 72 3", "O 62 72 3", "O 80 72 3"] },
    { c: 'Vehículos', e: '🚌', n: 'Autobús', p: ["R 12 30 76 42 6", "R 20 38 12 12 2", "R 36 38 12 12 2", "R 52 38 12 12 2", "R 68 38 12 12 2", "R 20 56 20 14 3", "O 28 74 8", "O 72 74 8", "O 28 74 3", "O 72 74 3"] },
    { c: 'Vehículos', e: '✈️', n: 'Avión', p: ["E 50 50 34 7 0", "M50 50 L20 30 L26 50 L20 70 Z", "M60 50 L80 34 L76 50 L80 66 Z", "O 78 50 3", "M40 50 L36 62 L44 50 Z", "M40 50 L36 38 L44 50 Z"] },
    { c: 'Vehículos', e: '🚀', n: 'Cohete', p: ["M50 12 Q66 30 66 55 L66 72 L34 72 L34 55 Q34 30 50 12 Z", "O 50 40 6", "M34 60 L20 76 L34 70", "M66 60 L80 76 L66 70", "M42 72 L40 84", "M50 72 L50 88", "M58 72 L60 84", "O 50 22 2"] },
    { c: 'Vehículos', e: '⛵', n: 'Barco de vela', p: ["M14 62 L86 62 L76 78 L24 78 Z", "M50 62 L50 20", "M50 24 L72 52 L50 52 Z", "M50 30 L30 52 L50 52 Z", "O 50 18 2"] },
    { c: 'Vehículos', e: '🚂', n: 'Tren', p: ["R 14 40 40 32", "R 58 48 28 24", "O 26 74 7", "O 42 74 7", "O 66 74 7", "O 80 74 7", "R 20 46 10 10", "R 34 46 10 10", "R 64 54 8 8", "M14 40 L14 32 L22 32"] },
    { c: 'Vehículos', e: '🚁', n: 'Helicóptero', p: ["E 50 55 18 12 0", "R 46 40 8 14", "O 56 52 2", "M50 40 L50 20", "M20 20 L80 20", "O 20 20 2", "O 80 20 2", "M32 62 L22 68", "M68 62 L78 68", "M40 67 L36 78", "M60 67 L64 78"] },
    { c: 'Vehículos', e: '🚲', n: 'Bicicleta', p: ["O 28 70 12", "O 72 70 12", "M28 70 L46 40", "M46 40 L60 40 L72 70", "M46 40 L52 70", "M52 70 L72 70", "M52 70 L46 40", "O 46 36 4", "M60 40 L66 32"] },
    { c: 'Vehículos', e: '🛸', n: 'OVNI', p: ["E 50 56 34 10 0", "E 50 42 16 12 0", "O 44 40 2", "O 56 40 2", "O 30 56 2.5", "O 50 58 2.5", "O 70 56 2.5", "O 20 72 2", "O 50 78 2", "O 80 72 2"] },

    /* ---- Casas ---- */
    { c: 'Casas', e: '🏠', n: 'Casa', p: ["R 22 48 56 40", "M14 50 L50 18 L86 50 Z", "R 42 62 16 26", "R 28 56 10 10", "R 62 56 10 10", "R 64 24 8 14", "O 54 75 1.5"] },
    { c: 'Casas', e: '🏰', n: 'Castillo', p: ["R 18 44 14 44", "R 68 44 14 44", "R 32 56 36 32", "M18 44 L18 36 L24 36 L24 44 L28 44 L28 36 L32 36 L32 44", "M68 44 L68 36 L74 36 L74 44 L78 44 L78 36 L82 36 L82 44", "R 44 64 12 24", "O 25 54 3", "O 75 54 3", "M50 30 L50 18", "M50 18 L62 22 L50 26 Z"] },
    { c: 'Casas', e: '🛖', n: 'Cabaña de troncos', p: ["R 24 50 52 38", "M16 52 L50 22 L84 52 Z", "M24 58 L76 58", "M24 66 L76 66", "M24 74 L76 74", "R 44 62 12 26", "R 30 56 8 8", "O 50 30 2"] },
    { c: 'Casas', e: '⛺', n: 'Carpa', p: ["M10 85 L50 20 L90 85 Z", "M50 20 L50 85", "M40 85 Q45 65 50 65 Q55 65 60 85", "O 50 20 3", "M14 85 L8 92", "M86 85 L92 92"] },
    { c: 'Casas', e: '🗼', n: 'Torre Eiffel', p: ["M35 90 L42 50 L50 15 L58 50 L65 90", "M38 70 L62 70", "M41 50 L59 50", "M44 35 L56 35", "M35 90 L30 92", "M65 90 L70 92"] },
    { c: 'Casas', e: '🎡', n: 'Noria', p: ["O 50 45 26", "O 50 45 3", "M50 71 L30 92", "M50 71 L70 92", "M50 19 L50 71", "M24 45 L76 45", "M32 27 L68 63", "M68 27 L32 63", "O 50 19 3", "O 76 45 3", "O 50 71 3", "O 24 45 3"] },

    /* ---- Princesas ---- */
    { c: 'Princesas', e: '👸', n: 'Princesa', p: ["O 50 28 12", "M40 20 Q50 10 60 20", "M44 16 L46 10", "M50 14 L50 8", "M56 16 L54 10", "O 46 27 1.8", "O 54 27 1.8", "M46 33 Q50 36 54 33", "M40 40 Q30 60 22 88 L78 88 Q70 60 60 40 Z", "M30 50 L20 66", "M70 50 L80 66", "M40 60 L34 74", "M60 60 L66 74"] },
    { c: 'Princesas', e: '🧚', n: 'Hada', p: ["O 50 26 10", "O 46 25 1.5", "O 54 25 1.5", "M46 31 Q50 34 54 31", "E 30 42 14 8 -30", "E 70 42 14 8 30", "E 30 54 12 7 30", "E 70 54 12 7 -30", "M44 36 Q42 60 40 84 L60 84 Q58 60 56 36 Z", "M50 84 L48 94", "M54 84 L56 94", "M80 22 L88 14", "O 89 13 2"] },
    { c: 'Princesas', e: '🧜‍♀️', n: 'Sirena', p: ["O 50 24 11", "O 46 23 1.5", "O 54 23 1.5", "M46 29 Q50 32 54 29", "M40 20 Q30 30 34 42", "M60 20 Q70 30 66 42", "M42 34 Q36 52 40 64 Q44 72 50 68 Q56 72 60 64 Q64 52 58 34 Z", "M50 68 Q46 80 38 84", "M50 68 Q54 80 62 84", "M38 84 Q44 88 50 84 Q56 88 62 84"] },
    { c: 'Princesas', e: '👑', n: 'Corona real', p: ["M20 70 L20 30 L35 50 L50 20 L65 50 L80 30 L80 70 Z", "M20 70 L80 70", "O 20 28 3", "O 50 18 3", "O 80 28 3", "O 35 48 2", "O 65 48 2", "R 20 70 60 8 3"] },
    { c: 'Princesas', e: '🦄', n: 'Unicornio', p: ["E 46 60 24 16 0", "O 68 44 11", "M74 36 L80 20", "M70 38 L72 30", "O 72 42 1.5", "M66 48 Q62 52 64 54", "M56 34 Q50 28 44 34 Q50 38 56 34", "M30 72 L28 84", "M40 74 L38 86", "M56 74 L58 86", "M66 72 L68 84", "M24 58 L14 54"] },
    { c: 'Princesas', e: '🐸', n: 'Príncipe rana', p: ["O 38 30 8", "O 62 30 8", "O 38 30 3.5", "O 62 30 3.5", "E 50 58 26 20 0", "O 44 50 2", "O 56 50 2", "M44 62 Q50 68 56 62", "O 50 42 4", "M50 46 L50 52"] },

    /* ---- Héroes ---- */
    { c: 'Héroes', e: '🦸', n: 'Superhéroe', p: ["O 50 24 11", "M40 20 Q50 12 60 20", "M38 26 L44 30", "M56 30 L62 26", "O 46 27 1.5", "O 54 27 1.5", "M46 33 Q50 36 54 33", "M36 40 L20 78 L40 72 L44 52", "M64 40 L80 78 L60 72 L56 52", "R 40 38 20 26", "O 50 50 4", "M40 64 L38 88", "M60 64 L62 88"] },
    { c: 'Héroes', e: '🤖', n: 'Robot', p: ["R 34 20 32 26 4", "O 42 30 3", "O 58 30 3", "R 44 37 12 4", "M50 20 L50 12", "O 50 10 2", "R 28 50 44 34 4", "R 36 58 10 10", "R 54 58 10 10", "R 18 52 8 22", "R 74 52 8 22", "R 36 84 10 10", "R 54 84 10 10"] },
    { c: 'Héroes', e: '🥷', n: 'Ninja', p: ["O 50 28 12", "M38 28 Q50 20 62 28 L62 34 L38 34 Z", "O 44 29 2", "O 56 29 2", "M44 34 L44 40", "M56 34 L56 40", "R 38 40 24 34", "M38 48 L20 60", "M62 48 L80 40", "M40 74 L38 88", "M60 74 L62 88", "M50 52 L66 66", "M66 66 L74 60"] },
    { c: 'Héroes', e: '👨‍🚀', n: 'Astronauta', p: ["O 50 28 14", "O 50 30 9", "O 46 28 1.5", "O 54 28 1.5", "R 36 42 28 30 6", "O 50 54 4", "R 22 46 10 20 4", "R 68 46 10 20 4", "R 36 72 10 16", "R 54 72 10 16", "O 26 20 2", "O 74 20 2", "O 50 10 1.5"] },
    { c: 'Héroes', e: '🧙', n: 'Mago', p: ["O 50 42 12", "O 46 40 1.8", "O 54 40 1.8", "M46 46 Q50 50 54 46", "M50 30 L30 10 L70 10 Z", "O 50 8 3", "M38 54 Q30 70 26 88 L74 88 Q70 70 62 54 Z", "M26 60 L14 50", "O 14 50 4", "M74 60 L86 70", "O 86 70 3"] },
    { c: 'Héroes', e: '🦹', n: 'Villano', p: ["O 50 30 12", "M38 22 L30 8 L46 18 Z", "M62 22 L70 8 L54 18 Z", "O 45 29 2", "O 55 29 2", "M45 36 L50 34 L55 36", "R 38 42 24 32", "M38 50 L20 44", "M62 50 L80 56", "O 20 44 4", "O 80 56 4"] },

    /* ---- Dulces ---- */
    { c: 'Dulces', e: '🍦', n: 'Helado triple', p: ["M34 50 L50 88 L66 50 Z", "M34 50 Q50 42 66 50", "E 50 40 18 14 0", "E 38 30 10 8 -20", "E 62 30 10 8 20", "O 50 22 6", "M42 58 L58 58", "M46 66 L54 66"] },
    { c: 'Dulces', e: '🎂', n: 'Pastel de cumpleaños', p: ["R 22 58 56 24 4", "R 30 40 40 20 4", "R 38 26 24 16 4", "M50 26 L50 14", "O 50 12 2", "M28 58 Q32 52 36 58", "M44 58 Q48 52 52 58", "M60 58 Q64 52 68 58", "M34 40 Q38 34 42 40", "M54 40 Q58 34 62 40"] },
    { c: 'Dulces', e: '🎈', n: 'Globos', p: ["E 34 34 12 15 0", "E 58 28 12 15 10", "E 74 42 12 15 -10", "O 34 49 1.5", "O 58 43 1.5", "O 74 57 1.5", "M34 50 Q40 66 30 80", "M58 44 Q52 64 62 82", "M74 58 Q70 72 78 84", "M20 88 L80 88"] },
    { c: 'Dulces', e: '❤️', n: 'Corazón feliz', p: ["M50 78 Q20 56 22 38 Q24 24 38 24 Q46 24 50 32 Q54 24 62 24 Q76 24 78 38 Q80 56 50 78 Z", "O 38 38 2", "O 60 38 2", "M42 50 Q50 56 58 50"] },
    { c: 'Dulces', e: '🍩', n: 'Dona', p: ["O 50 50 30", "O 50 50 10", "M24 40 Q30 28 42 26", "M58 24 Q70 28 76 40", "O 34 30 3", "O 66 32 3", "O 50 26 3", "O 74 48 3"] },
    { c: 'Dulces', e: '🍕', n: 'Pizza', p: ["M50 15 L15 85 L85 85 Z", "M50 15 Q30 50 15 85", "M50 15 Q70 50 85 85", "O 40 50 5", "O 58 60 5", "O 50 72 4", "O 35 68 3", "O 62 45 3"] },
    { c: 'Dulces', e: '🍭', n: 'Chupetín', p: ["O 50 40 22", "M50 18 Q66 30 50 42 Q34 30 50 18", "M34 42 Q42 54 50 50 Q58 54 66 42", "M50 62 L50 90", "O 50 40 6", "M46 36 L54 44", "M54 36 L46 44"] },
    { c: 'Dulces', e: '🧁', n: 'Cupcake', p: ["R 30 55 40 30 4", "M30 55 Q34 40 50 40 Q66 40 70 55", "O 42 36 4", "O 58 38 4", "O 50 30 5", "M50 30 L50 20", "O 50 18 2", "M36 65 L34 85", "M50 65 L50 85", "M64 65 L66 85"] },

    /* ---- Objetos ---- */
    { c: 'Objetos', e: '🎸', n: 'Guitarra', p: ["E 50 65 18 14 0", "O 50 65 5", "R 46 20 8 40 4", "O 50 16 5", "M44 65 L44 24", "M50 65 L50 24", "M56 65 L56 24", "M30 55 L22 48", "M70 55 L78 48"] },
    { c: 'Objetos', e: '⚽', n: 'Pelota de fútbol', p: ["O 50 50 30", "O 50 50 8", "M50 20 L58 36", "M50 20 L42 36", "M28 38 L42 44", "M72 38 L58 44", "M32 64 L44 56", "M68 64 L56 56", "M50 80 L54 64", "M50 80 L46 64"] },
    { c: 'Objetos', e: '🎁', n: 'Regalo', p: ["R 22 45 56 40 4", "R 46 45 8 40", "M22 58 L78 58", "M50 45 Q40 30 34 32 Q30 36 40 42", "M50 45 Q60 30 66 32 Q70 36 60 42", "O 50 30 4"] },
    { c: 'Objetos', e: '⌚', n: 'Reloj', p: ["R 40 10 20 14 3", "R 40 76 20 14 3", "O 50 45 22", "O 50 45 16", "M50 45 L50 32", "M50 45 L60 50", "O 50 45 2", "M42 24 L40 10", "M58 24 L60 10", "M42 66 L40 76", "M58 66 L60 76"] },
    { c: 'Objetos', e: '🎧', n: 'Auriculares', p: ["M20 50 Q20 20 50 20 Q80 20 80 50", "E 20 58 8 12 0", "E 80 58 8 12 0", "R 14 50 12 20 6", "R 74 50 12 20 6", "O 50 20 3", "M20 70 L18 80", "M80 70 L82 80"] },
    { c: 'Objetos', e: '📚', n: 'Libros', p: ["R 20 40 14 45 2", "R 36 35 14 50 2", "R 52 45 14 40 2", "R 68 38 14 47 2", "M20 50 L34 50", "M36 45 L50 45", "M52 55 L66 55", "M68 48 L82 48", "O 27 38 2", "O 43 33 2", "O 59 43 2", "O 75 36 2"] },
    { c: 'Objetos', e: '🎈', n: 'Globo único', p: ["E 50 40 18 22 0", "O 50 62 2", "M50 62 Q46 74 54 82 Q58 88 50 92", "O 44 36 3", "M50 18 L50 10", "O 50 8 2"] },
    { c: 'Objetos', e: '🌻', n: 'Girasol', p: ["E 50 20 6 10 0", "E 50 80 6 10 0", "E 20 50 10 6 0", "E 80 50 10 6 0", "E 28 28 8 6 45", "E 72 72 8 6 45", "E 28 72 8 6 -45", "E 72 28 8 6 -45", "O 50 50 10", "M50 60 L50 92", "M50 78 Q40 74 36 66"] }
  ];

  var CATEGORIAS = ['Todos'];
  BOCETOS.forEach(function (b) { if (CATEGORIAS.indexOf(b.c) === -1) CATEGORIAS.push(b.c); });

  /* ---------- 4. Estado ---------- */
  var PALETA = ['#000000', '#EE5A6F', '#FF6B9D', '#F368E0', '#A55EEA', '#7C5CFC', '#4D96FF', '#0984E3', '#4ECDC4', '#21C39A', '#6BCB77', '#9BE15D', '#FFD93D', '#FF9F43', '#E17055', '#8B5A2B', '#F2C6A0', '#C68863', '#FFFFFF', '#9AA5B1', '#636E72', '#2D3436', '#FF7675', '#FD79A8', '#FDCB6E', '#E84393', '#00B894', '#55EFC4', '#81ECEC', '#74B9FF', '#A29BFE', '#D63031'];
  var STICKERS = ['⭐', '❤️', '🌟', '🎈', '🌸', '🦋', '🌈', '☀️', '🐱', '🐶', '🎂', '🍦', '🎁', '👑', '💎', '🍀', '🎵', '🐝', '🌙', '⚡'];
  var lienzoP, lienzoB, ctxP, ctxB, wrap;
  var pintando = false, herramienta = 'pincel', color = '#EE5A6F', tamano = 14, opacidad = 1;
  var ultimo = null, formaInicio = null, formaPreview = null;
  var undoStack = [], redoStack = [], bocetoActual = null, fondoActual = 'blanco';
  var premioDado = false, modoEspejo = null, stickerPanel = null, textoInput = null;
  var coloresRecientes = [];
  var arcoirisHue = 0;

  /* ---------- 10. EXTRA: +20 bocetos adicionales ---------- */
  var BOCETOS_EXTRA = [
    { c: 'Naturaleza', e: '🍎', n: 'Manzana', p: ["O 50 55 22", "M50 33 L50 22", "M50 24 Q60 14 68 20", "O 44 48 3", "M40 62 Q46 68 52 64"] },
    { c: 'Naturaleza', e: '🍌', n: 'Banana', p: ["M20 30 Q30 70 70 78 Q80 76 82 68 Q50 66 30 34 Q24 28 20 30 Z", "M28 32 L24 24", "O 72 72 2"] },
    { c: 'Animales', e: '🐷', n: 'Cerdito', p: ["O 50 50 22", "O 50 56 8", "O 47 55 1.5", "O 53 55 1.5", "O 42 44 2.5", "O 58 44 2.5", "E 32 32 6 8 -20", "E 68 32 6 8 20", "M40 66 Q50 72 60 66", "E 50 84 16 8 0"] },
    { c: 'Animales', e: '🐭', n: 'Ratón', p: ["O 50 52 16", "O 36 34 9", "O 64 34 9", "O 36 34 4", "O 64 34 4", "O 44 50 2", "O 56 50 2", "O 50 58 3", "M50 61 L50 66", "M66 58 L80 54", "O 82 54 3", "M42 68 L40 78", "M58 68 L60 78"] },
    { c: 'Animales', e: '🐴', n: 'Caballo', p: ["O 58 36 12", "M50 28 L46 16", "M62 28 L66 16", "O 54 34 2", "M56 42 Q60 46 64 42", "E 42 62 20 14 0", "M28 68 L26 86", "M38 72 L36 90", "M52 72 L54 90", "M60 68 L62 86", "M24 56 L14 50"] },
    { c: 'Vehículos', e: '🏍️', n: 'Moto', p: ["O 26 70 12", "O 74 70 12", "M26 70 L40 46 L60 46 L74 70", "M40 46 L36 34 L50 34", "O 26 70 4", "O 74 70 4", "M60 46 L68 38"] },
    { c: 'Vehículos', e: '🚤', n: 'Lancha', p: ["M14 60 L86 60 L74 78 L26 78 Z", "M50 60 L50 28", "M50 32 L72 52 L50 52 Z", "M30 60 L30 44 L46 44", "O 50 26 2"] },
    { c: 'Casas', e: '🗽', n: 'Estatua de la libertad', p: ["O 50 20 8", "R 44 28 12 30", "M38 40 L26 50", "M62 40 L74 28", "O 76 26 3", "R 36 58 28 8 2", "R 30 66 40 6 2", "M50 12 L50 4", "O 50 3 2"] },
    { c: 'Princesas', e: '🏰', n: 'Castillo de princesa', p: ["R 16 50 12 38", "R 72 50 12 38", "R 34 40 32 48", "M16 50 L16 42 L20 42 L20 50 L24 50 L24 42 L28 42 L28 50", "M72 50 L72 42 L76 42 L76 50 L80 50 L80 42 L84 42 L84 50", "R 44 60 12 28", "O 22 58 3", "O 78 58 3", "O 50 30 4", "M50 26 L50 16", "O 50 14 2"] },
    { c: 'Héroes', e: '🦹‍♀️', n: 'Superheroína', p: ["O 50 24 11", "M40 20 Q50 12 60 20", "O 46 27 1.5", "O 54 27 1.5", "M46 33 Q50 36 54 33", "M36 40 L22 78 L42 72 L44 52", "M64 40 L78 78 L58 72 L56 52", "R 40 38 20 26", "O 50 50 4", "M40 64 L38 88", "M60 64 L62 88"] },
    { c: 'Dulces', e: '🍫', n: 'Chocolate', p: ["R 28 30 44 50 6", "M28 46 L72 46", "M28 62 L72 62", "M43 30 L43 80", "M57 30 L57 80", "O 35 38 2", "O 50 38 2", "O 65 38 2", "O 35 54 2", "O 65 54 2", "O 35 70 2", "O 50 70 2", "O 65 70 2"] },
    { c: 'Dulces', e: '🍉', n: 'Sandía', p: ["M14 50 Q50 90 86 50 Z", "M14 50 L86 50", "M14 50 Q50 58 86 50", "O 35 60 2.5", "O 50 64 2.5", "O 65 60 2.5", "O 42 70 2.5", "O 58 70 2.5"] },
    { c: 'Objetos', e: '🎨', n: 'Paleta de pintor', p: ["O 50 50 30", "O 50 50 22", "M70 50 Q78 50 78 58 Q78 64 72 64", "O 38 40 4", "O 52 36 4", "O 64 42 4", "O 36 56 4", "O 60 60 4", "O 46 66 4"] },
    { c: 'Objetos', e: '✏️', n: 'Lápiz', p: ["M20 80 L60 40 L70 50 L30 90 Z", "M60 40 L70 30 L80 40 L70 50", "M70 30 L80 20 L86 26 L76 36", "M20 80 L30 90", "O 25 85 2", "M40 60 L50 70"] },
    { c: 'Objetos', e: '🎯', n: 'Blanco de dardos', p: ["O 50 50 36", "O 50 50 28", "O 50 50 20", "O 50 50 12", "O 50 50 4", "M50 14 L50 86", "M14 50 L86 50"] },
    { c: 'Bichos', e: '🐌', n: 'Caracol', p: ["O 50 50 16", "O 50 50 10", "O 50 50 4", "M34 58 L20 78 L80 78 L80 70", "M70 50 L74 38", "M76 50 L80 40", "O 74 36 2", "O 80 38 2", "M20 78 L18 86", "M80 78 L82 86"] },
    { c: 'Naturaleza', e: '🏔️', n: 'Montañas con nieve', p: ["M10 80 L35 30 L50 55 L65 25 L90 80 Z", "M35 30 L28 42 L42 42 Z", "M65 25 L58 38 L72 38 Z", "O 78 20 4", "O 84 14 2", "O 20 18 2", "M10 80 L90 80"] },
    { c: 'Animales', e: '🦜', n: 'Loro', p: ["E 50 55 16 22 0", "O 50 32 10", "M60 32 L72 36 L60 40 Z", "O 46 30 2", "E 36 52 10 16 -20", "M42 72 L40 84", "M54 72 L56 84", "O 50 46 3", "M44 58 Q50 62 56 58"] },
    { c: 'Vehículos', e: '🚜', n: 'Tractor', p: ["R 40 36 28 26 4", "R 14 52 22 20 4", "O 24 72 12", "O 66 72 8", "O 24 72 4", "O 66 72 3", "R 46 42 10 10", "M14 52 L10 48", "R 68 46 8 14"] },
    { c: 'Objetos', e: '🎪', n: 'Carpita de circo', p: ["M14 70 L50 20 L86 70 Z", "M50 20 L50 12", "O 50 10 3", "M26 70 Q38 50 50 70", "M50 70 Q62 50 74 70", "M14 70 L10 78", "M86 70 L90 78", "M10 78 L90 78", "O 50 50 3"] }
  ];
  BOCETOS_EXTRA.forEach(function (b) { BOCETOS.push(b); if (CATEGORIAS.indexOf(b.c) === -1) CATEGORIAS.push(b.c); });

  /* ---------- 11. EXTRA: Galería de Mis Dibujos Guardados ---------- */
  function guardarDibujo(nombre) {
    try {
      var tmp = document.createElement('canvas');
      tmp.width = lienzoP.width; tmp.height = lienzoP.height;
      var tctx = tmp.getContext('2d');
      tctx.fillStyle = fondoActual === 'noche' ? '#1a1a2e' : '#ffffff';
      tctx.fillRect(0, 0, tmp.width, tmp.height);
      tctx.drawImage(lienzoP, 0, 0);
      tctx.drawImage(lienzoB, 0, 0);
      var galeria = JSON.parse(localStorage.getItem('educakids_galeria') || '[]');
      galeria.unshift({ nombre: nombre || 'Dibujo ' + (galeria.length + 1), data: tmp.toDataURL(), fecha: Date.now() });
      if (galeria.length > 12) galeria.pop();
      localStorage.setItem('educakids_galeria', JSON.stringify(galeria));
      return true;
    } catch (e) { return false; }
  }
  function abrirGaleriaDibujos() {
    try {
      var galeria = JSON.parse(localStorage.getItem('educakids_galeria') || '[]');
    } catch (e) { var galeria = []; }
    var modal = document.createElement('div');
    modal.className = 'dibujo-modal';
    modal.innerHTML = '<div class="dibujo-modal-head"><div class="dibujo-modal-title">🖼️ Mis Dibujos (' + galeria.length + ')</div><button class="dibujo-modal-close" data-cerrar>✕</button></div>' +
      '<div class="dibujo-grid" id="dibujoMisGrid"></div>';
    document.body.appendChild(modal);
    var grid = document.getElementById('dibujoMisGrid');
    if (!galeria.length) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:#99a;font-weight:700;">Todavía no guardaste dibujos. ¡Creá uno y tocá 💾!</div>';
    }
    galeria.forEach(function (d, i) {
      var card = document.createElement('div');
      card.className = 'dibujo-card';
      card.innerHTML = '<canvas width="180" height="180" style="width:100%;height:85px;background:#fff;border-radius:10px;"></canvas><span>' + d.nombre + '</span>';
      var cv = card.querySelector('canvas');
      var img = new Image();
      img.onload = function () { cv.getContext('2d').drawImage(img, 0, 0, 180, 180); };
      img.src = d.data;
      card.addEventListener('click', function () {
        snd('click');
        pushUndo();
        var img2 = new Image();
        img2.onload = function () {
          ctxP.globalAlpha = 1;
          ctxP.fillStyle = '#ffffff';
          ctxP.fillRect(0, 0, lienzoP.width, lienzoP.height);
          ctxP.drawImage(img2, 0, 0, lienzoP.width, lienzoP.height);
          bocetoActual = null;
          ctxB.clearRect(0, 0, lienzoB.width, lienzoB.height);
          document.body.removeChild(modal);
          aviso('🎨 Dibujo cargado');
        };
        img2.src = d.data;
      });
      grid.appendChild(card);
    });
    modal.querySelector('[data-cerrar]').addEventListener('click', function () { snd('click'); document.body.removeChild(modal); });
    modal.addEventListener('click', function (e) { if (e.target === modal) document.body.removeChild(modal); });
  }

  /* ---------- 12. EXTRA: Varita mágica (colorear área con gradiente) ---------- */
  function varitaMagica(x, y) {
    pushUndo();
    var colores = ['#FF9F43', '#FF6B9D', '#4D96FF', '#00B894', '#FFD43B', '#A55EEA'];
    var W = lienzoP.width, H = lienzoP.height;
    x = Math.max(0, Math.min(W - 1, x | 0)); y = Math.max(0, Math.min(H - 1, y | 0));
    var imgP = ctxP.getImageData(0, 0, W, H);
    var imgB = ctxB.getImageData(0, 0, W, H);
    var d = imgP.data, b = imgB.data;
    var u32 = new Uint32Array(imgP.data.buffer);
    var i0 = (y * W + x) * 4;
    var sr = d[i0], sg = d[i0 + 1], sb = d[i0 + 2];
    var tol = 40, visitados = new Set(), stack = [y * W + x];
    var cIdx = 0;
    while (stack.length) {
      var p = stack.pop();
      if (visitados.has(p)) continue;
      visitados.add(p);
      var px = p % W, py = (p / W) | 0;
      var j = p * 4;
      if (b[j + 3] > 100) continue;
      if (Math.abs(d[j] - sr) > tol || Math.abs(d[j + 1] - sg) > tol || Math.abs(d[j + 2] - sb) > tol) continue;
      var tc = hexRgb(colores[(px + py) % colores.length]);
      u32[p] = (255 << 24) | (tc.b << 16) | (tc.g << 8) | tc.r;
      cIdx++;
      if (px > 0) stack.push(p - 1);
      if (px < W - 1) stack.push(p + 1);
      if (py > 0) stack.push(p - W);
      if (py < H - 1) stack.push(p + W);
    }
    ctxP.putImageData(imgP, 0, 0);
    lanzarConfeti();
  }

  /* ---------- 13. EXTRA: Compartir (Web Share API) ---------- */
  function compartirDibujo() {
    try {
      var tmp = document.createElement('canvas');
      tmp.width = lienzoP.width; tmp.height = lienzoP.height;
      var tctx = tmp.getContext('2d');
      tctx.fillStyle = fondoActual === 'noche' ? '#1a1a2e' : '#ffffff';
      tctx.fillRect(0, 0, tmp.width, tmp.height);
      tctx.drawImage(lienzoP, 0, 0);
      tctx.drawImage(lienzoB, 0, 0);
      tmp.toBlob(function (blob) {
        if (navigator.share && blob) {
          var file = new File([blob], 'mi-dibujo.png', { type: 'image/png' });
          navigator.share({ files: [file], title: 'Mi dibujo', text: '¡Mirá mi dibujo!' }).catch(function () { });
        } else {
          aviso('📤 Guardado en galería');
          guardarDibujo('Compartido');
        }
      }, 'image/png');
    } catch (e) { aviso('❌ No se pudo compartir'); }
  }

  /* ---------- 5. Helpers ---------- */
  function hexRgb(h) {
    h = h.replace('#', '');
    if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    return { r: parseInt(h.substr(0, 2), 16), g: parseInt(h.substr(2, 2), 16), b: parseInt(h.substr(4, 2), 16) };
  }
  function lanzarConfeti() {
    var colores = ['#FF9F43', '#FF6B9D', '#4D96FF', '#00B894', '#FFD43B', '#A55EEA'];
    for (var i = 0; i < 50; i++) {
      var c = document.createElement('div');
      c.className = 'dibujo-confetti';
      c.style.left = (Math.random() * 100) + 'vw';
      c.style.background = colores[i % colores.length];
      c.style.animation = 'dibujo-conf-fall ' + (1.5 + Math.random() * 1.5) + 's linear forwards';
      c.style.animationDelay = (Math.random() * 0.6) + 's';
      document.body.appendChild(c);
      (function (el) { setTimeout(function () { el.remove(); }, 3500); })(c);
    }
  }
  function dibujarBocetoEn(ctx, idx, W, H) {
    ctx.clearRect(0, 0, W, H);
    var b = BOCETOS[idx]; if (!b) return;
    var s = Math.min(W, H) / 108, cx = W / 2, cy = H / 2;
    ctx.save();
    ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-50, -50);
    ctx.lineWidth = 0.9; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = fondoActual === 'noche' ? '#e0e0f0' : '#2a2a38';
    for (var i = 0; i < b.p.length; i++) trazar(ctx, b.p[i]);
    ctx.restore();
  }
  function pushUndo() {
    try {
      undoStack.push(lienzoP.toDataURL());
      if (undoStack.length > 30) undoStack.shift();
      redoStack.length = 0;
    } catch (e) { }
  }
  function restaurar(dataURL, cb) {
    var img = new Image();
    img.onload = function () {
      ctxP.globalAlpha = 1;
      ctxP.fillStyle = fondoActual === 'noche' ? '#1a1a2e' : '#ffffff';
      ctxP.fillRect(0, 0, lienzoP.width, lienzoP.height);
      ctxP.drawImage(img, 0, 0, lienzoP.width, lienzoP.height);
      if (cb) cb();
    };
    img.src = dataURL;
  }
  function deshacer() {
    if (!undoStack.length) { aviso('↩️ Nada para deshacer'); return; }
    redoStack.push(lienzoP.toDataURL());
    restaurar(undoStack.pop());
    snd('click');
  }
  function rehacer() {
    if (!redoStack.length) { aviso('↪️ Nada para rehacer'); return; }
    undoStack.push(lienzoP.toDataURL());
    restaurar(redoStack.pop());
    snd('click');
  }
  function aplicarFondo(tipo) {
    fondoActual = tipo;
    wrap.classList.remove('dibujo-bg-dots', 'dibujo-bg-lines', 'dibujo-bg-grid', 'dibujo-bg-night');
    if (tipo === 'puntos') wrap.classList.add('dibujo-bg-dots');
    else if (tipo === 'lineas') wrap.classList.add('dibujo-bg-lines');
    else if (tipo === 'cuadricula') wrap.classList.add('dibujo-bg-grid');
    else if (tipo === 'noche') wrap.classList.add('dibujo-bg-night');
    /* repintar lienzo */
    pushUndo();
    ctxP.globalAlpha = 1;
    ctxP.fillStyle = tipo === 'noche' ? '#1a1a2e' : '#ffffff';
    ctxP.fillRect(0, 0, lienzoP.width, lienzoP.height);
    if (bocetoActual !== null) dibujarBocetoEn(ctxB, bocetoActual, lienzoB.width, lienzoB.height);
    else ctxB.clearRect(0, 0, lienzoB.width, lienzoB.height);
  }

  /* ---------- 6. Relleno (bote de pintura) ---------- */
  function rellenar(x, y) {
    var W = lienzoP.width, H = lienzoP.height;
    x = Math.max(0, Math.min(W - 1, x | 0)); y = Math.max(0, Math.min(H - 1, y | 0));
    var imgP = ctxP.getImageData(0, 0, W, H);
    var imgB = ctxB.getImageData(0, 0, W, H);
    var d = imgP.data, b = imgB.data;
    var u32 = new Uint32Array(imgP.data.buffer);
    var i0 = (y * W + x) * 4;
    var sr = d[i0], sg = d[i0 + 1], sb = d[i0 + 2];
    var tc = hexRgb(color);
    if (Math.abs(sr - tc.r) < 4 && Math.abs(sg - tc.g) < 4 && Math.abs(sb - tc.b) < 4) return;
    var packed = (255 << 24) | (tc.b << 16) | (tc.g << 8) | tc.r;
    var tol = 40;
    function match(px) {
      var j = px * 4;
      if (b[j + 3] > 100) return false;
      return Math.abs(d[j] - sr) <= tol && Math.abs(d[j + 1] - sg) <= tol && Math.abs(d[j + 2] - sb) <= tol;
    }
    var stack = [y * W + x];
    u32[y * W + x] = packed;
    while (stack.length) {
      var p = stack.pop(), px = p % W, py = (p / W) | 0;
      if (px > 0) { var l = p - 1; if (match(l)) { u32[l] = packed; stack.push(l); } }
      if (px < W - 1) { var r = p + 1; if (match(r)) { u32[r] = packed; stack.push(r); } }
      if (py > 0) { var u = p - W; if (match(u)) { u32[u] = packed; stack.push(u); } }
      if (py < H - 1) { var dn = p + W; if (match(dn)) { u32[dn] = packed; stack.push(dn); } }
    }
    ctxP.putImageData(imgP, 0, 0);
  }

  /* ---------- 7. Pinceles especiales ---------- */
  function strokePunto(p, colorStroke, ancho) {
    ctxP.globalAlpha = opacidad;
    ctxP.strokeStyle = colorStroke;
    ctxP.fillStyle = colorStroke;
    ctxP.lineWidth = ancho;
    if (herramienta === 'aerosol') {
      for (var i = 0; i < 12; i++) {
        var ang = Math.random() * Math.PI * 2, rad = Math.random() * ancho;
        ctxP.beginPath();
        ctxP.arc(p.x + Math.cos(ang) * rad, p.y + Math.sin(ang) * rad, 1, 0, Math.PI * 2);
        ctxP.fill();
      }
    } else if (herramienta === 'neon') {
      ctxP.shadowBlur = ancho * 1.5;
      ctxP.shadowColor = colorStroke;
      ctxP.beginPath(); ctxP.arc(p.x, p.y, ancho / 3, 0, Math.PI * 2); ctxP.fill();
      ctxP.shadowBlur = 0;
    } else if (herramienta === 'glitter') {
      for (var g = 0; g < 6; g++) {
        var ga = Math.random() * Math.PI * 2, gr = Math.random() * ancho * 0.7;
        ctxP.globalAlpha = opacidad * (0.4 + Math.random() * 0.6);
        ctxP.beginPath();
        ctxP.arc(p.x + Math.cos(ga) * gr, p.y + Math.sin(ga) * gr, 1.5, 0, Math.PI * 2);
        ctxP.fill();
      }
      ctxP.globalAlpha = opacidad;
    } else if (herramienta === 'arcoiris') {
      arcoirisHue = (arcoirisHue + 8) % 360;
      var rc = 'hsl(' + arcoirisHue + ',90%,60%)';
      ctxP.strokeStyle = rc; ctxP.fillStyle = rc;
      ctxP.beginPath(); ctxP.arc(p.x, p.y, ancho / 2, 0, Math.PI * 2); ctxP.fill();
    } else if (herramienta === 'crayon') {
      ctxP.globalAlpha = opacidad * 0.7;
      for (var c = 0; c < 4; c++) {
        ctxP.beginPath();
        ctxP.arc(p.x + (Math.random() - 0.5) * ancho * 0.6, p.y + (Math.random() - 0.5) * ancho * 0.6, ancho / 3, 0, Math.PI * 2);
        ctxP.fill();
      }
      ctxP.globalAlpha = opacidad;
    } else if (herramienta === 'marcador') {
      ctxP.globalAlpha = opacidad * 0.5;
      ctxP.beginPath(); ctxP.arc(p.x, p.y, ancho / 2, 0, Math.PI * 2); ctxP.fill();
      ctxP.globalAlpha = opacidad;
    } else {
      ctxP.beginPath(); ctxP.arc(p.x, p.y, ancho / 2, 0, Math.PI * 2); ctxP.fill();
    }
    ctxP.globalAlpha = 1;
    ctxP.shadowBlur = 0;
  }
  function espejoPuntos(p) {
    var pts = [p];
    var W = lienzoP.width, H = lienzoP.height;
    if (modoEspejo === 'horizontal') pts.push({ x: W - p.x, y: p.y });
    else if (modoEspejo === 'vertical') pts.push({ x: p.x, y: H - p.y });
    else if (modoEspejo === 'ambos') pts.push({ x: W - p.x, y: p.y }, { x: p.x, y: H - p.y }, { x: W - p.x, y: H - p.y });
    return pts;
  }

  /* ---------- 8. Formas ---------- */
  function dibujarForma(inicio, fin, preview) {
    if (preview) { restaurar(formaPreview); }
    var x = Math.min(inicio.x, fin.x), y = Math.min(inicio.y, fin.y);
    var w = Math.abs(fin.x - inicio.x), h = Math.abs(fin.y - inicio.y);
    ctxP.globalAlpha = opacidad;
    ctxP.strokeStyle = herramienta === 'goma' ? '#ffffff' : color;
    ctxP.fillStyle = ctxP.strokeStyle;
    ctxP.lineWidth = tamano * (lienzoP.width / wrap.clientWidth);
    ctxP.lineCap = 'round'; ctxP.lineJoin = 'round';
    if (herramienta === 'forma-linea') {
      ctxP.beginPath(); ctxP.moveTo(inicio.x, inicio.y); ctxP.lineTo(fin.x, fin.y); ctxP.stroke();
    } else if (herramienta === 'forma-rect') {
      ctxP.strokeRect(x, y, w, h);
    } else if (herramienta === 'forma-circulo') {
      var r = Math.max(w, h) / 2;
      ctxP.beginPath(); ctxP.arc((inicio.x + fin.x) / 2, (inicio.y + fin.y) / 2, r, 0, Math.PI * 2); ctxP.stroke();
    } else if (herramienta === 'forma-estrella') {
      var cx = (inicio.x + fin.x) / 2, cy = (inicio.y + fin.y) / 2;
      var R = Math.max(w, h) / 2, r2 = R * 0.4;
      ctxP.beginPath();
      for (var i = 0; i < 10; i++) {
        var rad = i % 2 === 0 ? R : r2;
        var ang = (Math.PI / 5) * i - Math.PI / 2;
        var px = cx + Math.cos(ang) * rad, py = cy + Math.sin(ang) * rad;
        if (i === 0) ctxP.moveTo(px, py); else ctxP.lineTo(px, py);
      }
      ctxP.closePath(); ctxP.stroke();
    } else if (herramienta === 'forma-corazon') {
      var hcx = (inicio.x + fin.x) / 2, hcy = (inicio.y + fin.y) / 2;
      var hs = Math.max(w, h) / 40;
      ctxP.beginPath();
      ctxP.moveTo(hcx, hcy + 12 * hs);
      ctxP.bezierCurveTo(hcx - 20 * hs, hcy - 4 * hs, hcx - 10 * hs, hcy - 18 * hs, hcx, hcy - 8 * hs);
      ctxP.bezierCurveTo(hcx + 10 * hs, hcy - 18 * hs, hcx + 20 * hs, hcy - 4 * hs, hcx, hcy + 12 * hs);
      ctxP.stroke();
    }
    ctxP.globalAlpha = 1;
  }

  /* ---------- 9. UI ---------- */
  function iniciar() {
    inyectarCSS();
    premioDado = false;
    undoStack = []; redoStack = []; bocetoActual = null; fondoActual = 'blanco'; modoEspejo = null;
    var app = document.getElementById('app') || document.body;

    var herramientas = [
      { id: 'pincel', icon: '🖌️', tip: 'Pincel' },
      { id: 'marcador', icon: '🖊️', tip: 'Marcador' },
      { id: 'crayon', icon: '🖍️', tip: 'Crayón' },
      { id: 'aerosol', icon: '💨', tip: 'Aerosol' },
      { id: 'neon', icon: '✨', tip: 'Neón' },
      { id: 'glitter', icon: '💎', tip: 'Glitter' },
      { id: 'arcoiris', icon: '🌈', tip: 'Arcoíris' },
      { id: 'goma', icon: '🧽', tip: 'Goma' },
      { id: 'bote', icon: '🪣', tip: 'Bote de pintura' }
    ];
    var formas = [
      { id: 'forma-linea', icon: '📏', tip: 'Línea' },
      { id: 'forma-rect', icon: '▭', tip: 'Rectángulo' },
      { id: 'forma-circulo', icon: '⭕', tip: 'Círculo' },
      { id: 'forma-estrella', icon: '⭐', tip: 'Estrella' },
      { id: 'forma-corazon', icon: '❤️', tip: 'Corazón' }
    ];
    var fondos = [
      { id: 'blanco', icon: '⬜', tip: 'Blanco' },
      { id: 'puntos', icon: '⚪', tip: 'Puntos' },
      { id: 'lineas', icon: '➖', tip: 'Líneas' },
      { id: 'cuadricula', icon: '🔲', tip: 'Cuadrícula' },
      { id: 'noche', icon: '🌙', tip: 'Noche' }
    ];

    var paletaHTML = PALETA.map(function (c) {
      return '<button class="dibujo-color" data-c="' + c + '" style="background:' + c + '"></button>';
    }).join('') + '<button class="dibujo-color-custom" id="dibujoColorCustom" title="Color personalizado"></button>';

    var herramientasHTML = herramientas.map(function (h) {
      return '<button class="dibujo-btn' + (h.id === 'pincel' ? ' sel' : '') + '" data-herramienta="' + h.id + '">' + h.icon + '<span class="tip">' + h.tip + '</span></button>';
    }).join('');

    var formasHTML = formas.map(function (f) {
      return '<button class="dibujo-btn" data-herramienta="' + f.id + '">' + f.icon + '<span class="tip">' + f.tip + '</span></button>';
    }).join('');

    var fondosHTML = fondos.map(function (f) {
      return '<button class="dibujo-btn" data-fondo="' + f.id + '">' + f.icon + '<span class="tip">' + f.tip + '</span></button>';
    }).join('');

    app.innerHTML =
      '<div class="screen dibujo-screen">' +
        '<div class="dibujo-head">' +
          '<button class="dibujo-back" data-act="volver">←</button>' +
          '<div class="dibujo-title">🎨 Mundo Creativo <span style="font-size:11px;background:linear-gradient(135deg,#FFD43B,#FF9F43);color:#5B3A00;padding:2px 8px;border-radius:999px;">SUPER PREMIUM</span></div>' +
          '<button class="dibujo-btn-top" data-act="listo">✅ Listo</button>' +
        '</div>' +
        '<div class="dibujo-tools">' +
          '<div class="dibujo-paleta" id="dibujoPaleta">' + paletaHTML + '</div>' +
          '<div class="dibujo-barra">' +
            herramientasHTML +
            '<div class="dibujo-sep"></div>' +
            formasHTML +
            '<div class="dibujo-sep"></div>' +
            fondosHTML +
            '<div class="dibujo-sep"></div>' +
            '<button class="dibujo-btn" data-act="stickers" title="Stickers">😊<span class="tip">Stickers</span></button>' +
            '<button class="dibujo-btn" data-act="texto" title="Texto">🔤<span class="tip">Texto</span></button>' +
            '<button class="dibujo-btn" data-act="espejo" title="Modo espejo">🪞<span class="tip">Espejo</span></button>' +
            '<div class="dibujo-sep"></div>' +
            '<span class="dibujo-rango-label" id="dibujoTamanoLbl">14</span>' +
            '<input type="range" class="dibujo-rango" id="dibujoTamano" min="2" max="80" value="14" />' +
            '<span class="dibujo-rango-label" id="dibujoOpLbl">100%</span>' +
            '<input type="range" class="dibujo-rango" id="dibujoOpacidad" min="10" max="100" value="100" />' +
            '<div class="dibujo-sep"></div>' +
            '<button class="dibujo-btn" data-act="undo" title="Deshacer">↩️<span class="tip">Deshacer</span></button>' +
            '<button class="dibujo-btn" data-act="redo" title="Rehacer">↪️<span class="tip">Rehacer</span></button>' +
            '<button class="dibujo-btn" data-act="limpiar" title="Limpiar">🗑️<span class="tip">Limpiar</span></button>' +
            '<button class="dibujo-btn" data-act="voltear" title="Voltear">🔄<span class="tip">Voltear</span></button>' +
            '<button class="dibujo-btn" data-act="bocetos" title="Bocetos">🖼️<span class="tip">Bocetos</span></button>' +
            '<button class="dibujo-btn" data-act="varita" title="Varita mágica">🪄<span class="tip">Varita mágica</span></button>' +
            '<button class="dibujo-btn" data-act="misdibujos" title="Mis dibujos">🗂️<span class="tip">Mis dibujos</span></button>' +
            '<button class="dibujo-btn" data-act="compartir" title="Compartir">📤<span class="tip">Compartir</span></button>' +
            '<button class="dibujo-btn" data-act="guardar" title="Guardar en galería">⭐<span class="tip">Guardar</span></button>' +
            '<button class="dibujo-btn" data-act="descargar" title="Descargar PNG">💾<span class="tip">Descargar</span></button>' +
          '</div>' +
        '</div>' +
        '<div class="dibujo-canvas-wrap" id="dibujoWrap">' +
          '<canvas id="dibujoPintura"></canvas>' +
          '<canvas id="dibujoBoceto"></canvas>' +
        '</div>' +
      '</div>';

    lienzoP = document.getElementById('dibujoPintura');
    lienzoB = document.getElementById('dibujoBoceto');
    ctxP = lienzoP.getContext('2d');
    ctxB = lienzoB.getContext('2d');
    wrap = document.getElementById('dibujoWrap');

    /* FIX CRÍTICO: esperar a que el layout tenga dimensiones antes de dimensionar el canvas */
    function ajustar() {
      var previa = null;
      try { previa = lienzoP.width > 1 ? lienzoP.toDataURL() : null; } catch (e) { previa = null; }
      var w = wrap.clientWidth, h = wrap.clientHeight;
      if (w < 10 || h < 10) { requestAnimationFrame(ajustar); return; } /* reintentar hasta tener tamaño real */
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      [lienzoP, lienzoB].forEach(function (c) { c.width = Math.max(1, w * dpr); c.height = Math.max(1, h * dpr); });
      ctxP.globalAlpha = 1;
      ctxP.fillStyle = fondoActual === 'noche' ? '#1a1a2e' : '#ffffff';
      ctxP.fillRect(0, 0, lienzoP.width, lienzoP.height);
      ctxP.lineCap = 'round'; ctxP.lineJoin = 'round';
      if (previa) restaurar(previa);
      if (bocetoActual !== null) dibujarBocetoEn(ctxB, bocetoActual, lienzoB.width, lienzoB.height);
      else ctxB.clearRect(0, 0, lienzoB.width, lienzoB.height);
    }
    /* FIX: usar rAF + ResizeObserver para asegurar dimensiones correctas */
    requestAnimationFrame(function () { requestAnimationFrame(ajustar); });
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(function () { clearTimeout(ro._t); ro._t = setTimeout(ajustar, 150); });
      ro.observe(wrap);
    }
    window.addEventListener('resize', function () { clearTimeout(window._dibujoRt); window._dibujoRt = setTimeout(ajustar, 150); });

    function pos(e) {
      var rect = lienzoP.getBoundingClientRect();
      var cx = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      var cy = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      return { x: (cx - rect.left) * (lienzoP.width / rect.width), y: (cy - rect.top) * (lienzoP.height / rect.height) };
    }

    function empezar(e) {
      e.preventDefault();
      var p = pos(e);
      if (herramienta === 'bote') { pushUndo(); rellenar(p.x, p.y); snd('click'); return; }
      if (herramienta === 'sticker') return; /* se maneja por click */
      if (herramienta === 'texto') return;
      pushUndo();
      if (herramienta.indexOf('forma-') === 0) {
        formaInicio = p;
        try { formaPreview = lienzoP.toDataURL(); } catch (e2) { formaPreview = null; }
        pintando = true; ultimo = p;
      } else {
        pintando = true; ultimo = p;
        var ancho = (herramienta === 'goma' ? tamano * 2.5 : tamano) * (lienzoP.width / wrap.clientWidth);
        var colorStroke = herramienta === 'goma' ? (fondoActual === 'noche' ? '#1a1a2e' : '#ffffff') : color;
        var pts = espejoPuntos(p);
        for (var i = 0; i < pts.length; i++) strokePunto(pts[i], colorStroke, ancho);
      }
      /* FIX: proteger setPointerCapture */
      try { if (e.pointerId !== undefined) lienzoP.setPointerCapture(e.pointerId); } catch (err) { /* ignorar */ }
    }
    function mover(e) {
      if (!pintando) return;
      e.preventDefault();
      var p = pos(e);
      if (herramienta.indexOf('forma-') === 0) {
        if (formaPreview) dibujarForma(formaInicio, p, true);
        ultimo = p; return;
      }
      var ancho = (herramienta === 'goma' ? tamano * 2.5 : tamano) * (lienzoP.width / wrap.clientWidth);
      var colorStroke = herramienta === 'goma' ? (fondoActual === 'noche' ? '#1a1a2e' : '#ffffff') : color;
      ctxP.globalAlpha = opacidad;
      ctxP.strokeStyle = colorStroke;
      ctxP.lineWidth = ancho;
      ctxP.lineCap = 'round'; ctxP.lineJoin = 'round';
      ctxP.shadowBlur = herramienta === 'neon' ? ancho * 1.5 : 0;
      ctxP.shadowColor = colorStroke;
      var mx = (ultimo.x + p.x) / 2, my = (ultimo.y + p.y) / 2;
      var pts = espejoPuntos({ x: mx, y: my });
      var ults = espejoPuntos(ultimo);
      for (var i = 0; i < pts.length; i++) {
        if (herramienta === 'aerosol' || herramienta === 'glitter' || herramienta === 'crayon' || herramienta === 'arcoiris') {
          strokePunto(pts[i], colorStroke, ancho);
        } else {
          ctxP.beginPath();
          ctxP.moveTo(ults[i].x, ults[i].y);
          ctxP.quadraticCurveTo(ults[i].x, ults[i].y, pts[i].x, pts[i].y);
          ctxP.stroke();
        }
      }
      ctxP.shadowBlur = 0;
      ctxP.globalAlpha = 1;
      ultimo = p;
    }
    function terminar(e) {
      if (!pintando) return;
      if (herramienta.indexOf('forma-') === 0 && formaInicio) {
        var p = pos(e || { clientX: ultimo.x, clientY: ultimo.y });
        dibujarForma(formaInicio, p, false);
        formaInicio = null; formaPreview = null;
      }
      pintando = false; ultimo = null;
      try { if (e && e.pointerId !== undefined) lienzoP.releasePointerCapture(e.pointerId); } catch (err) { }
    }

    lienzoP.addEventListener('pointerdown', empezar);
    lienzoP.addEventListener('pointermove', mover);
    lienzoP.addEventListener('pointerup', terminar);
    lienzoP.addEventListener('pointercancel', terminar);

    /* colores */
    function seleccionarColor(c) {
      color = c;
      herramienta = 'pincel';
      app.querySelectorAll('.dibujo-color').forEach(function (x) { x.classList.toggle('sel', x.dataset.c === c); });
      app.querySelectorAll('[data-herramienta]').forEach(function (x) { x.classList.toggle('sel', x.dataset.herramienta === 'pincel'); });
      if (coloresRecientes.indexOf(c) === -1) { coloresRecientes.unshift(c); if (coloresRecientes.length > 6) coloresRecientes.pop(); }
    }
    app.querySelectorAll('.dibujo-color').forEach(function (b) {
      b.addEventListener('click', function () { snd('click'); seleccionarColor(b.dataset.c); });
    });
    var customBtn = document.getElementById('dibujoColorCustom');
    customBtn.addEventListener('click', function () {
      snd('click');
      var inp = document.createElement('input');
      inp.type = 'color'; inp.value = color;
      inp.style.position = 'fixed'; inp.style.opacity = '0';
      document.body.appendChild(inp);
      inp.addEventListener('input', function () { seleccionarColor(inp.value); });
      inp.addEventListener('change', function () { setTimeout(function () { inp.remove(); }, 500); });
      inp.click();
    });

    /* herramientas */
    app.querySelectorAll('[data-herramienta]').forEach(function (b) {
      b.addEventListener('click', function () {
        snd('click');
        herramienta = b.dataset.herramienta;
        app.querySelectorAll('[data-herramienta]').forEach(function (x) { x.classList.toggle('sel', x === b); });
        cerrarStickers(); cerrarTexto();
      });
    });

    /* fondos */
    app.querySelectorAll('[data-fondo]').forEach(function (b) {
      b.addEventListener('click', function () { snd('click'); aplicarFondo(b.dataset.fondo); });
    });

    /* sliders */
    document.getElementById('dibujoTamano').addEventListener('input', function () {
      tamano = Number(this.value);
      document.getElementById('dibujoTamanoLbl').textContent = tamano;
    });
    document.getElementById('dibujoOpacidad').addEventListener('input', function () {
      opacidad = Number(this.value) / 100;
      document.getElementById('dibujoOpLbl').textContent = this.value + '%';
    });

    /* acciones */
    app.querySelector('[data-act="undo"]').addEventListener('click', deshacer);
    app.querySelector('[data-act="redo"]').addEventListener('click', rehacer);
    app.querySelector('[data-act="limpiar"]').addEventListener('click', function () {
      snd('click');
      var box = document.createElement('div');
      box.className = 'dibujo-confirm';
      box.innerHTML = '<div class="dibujo-confirm-box"><h3>¿Borrar todo el dibujo?</h3><button class="dibujo-confirm-yes" data-si>Sí, borrar</button><button class="dibujo-confirm-no" data-no>Cancelar</button></div>';
      document.body.appendChild(box);
      box.querySelector('[data-si]').addEventListener('click', function () {
        pushUndo();
        ctxP.globalAlpha = 1;
        ctxP.fillStyle = fondoActual === 'noche' ? '#1a1a2e' : '#ffffff';
        ctxP.fillRect(0, 0, lienzoP.width, lienzoP.height);
        box.remove();
        aviso('🗑️ Lienzo limpio');
      });
      box.querySelector('[data-no]').addEventListener('click', function () { box.remove(); });
      box.addEventListener('click', function (e) { if (e.target === box) box.remove(); });
    });
    app.querySelector('[data-act="voltear"]').addEventListener('click', function () {
      snd('click'); pushUndo();
      var tmp = document.createElement('canvas');
      tmp.width = lienzoP.width; tmp.height = lienzoP.height;
      tmp.getContext('2d').drawImage(lienzoP, 0, 0);
      ctxP.globalAlpha = 1;
      ctxP.fillStyle = fondoActual === 'noche' ? '#1a1a2e' : '#ffffff';
      ctxP.fillRect(0, 0, lienzoP.width, lienzoP.height);
      ctxP.translate(lienzoP.width, 0); ctxP.scale(-1, 1);
      ctxP.drawImage(tmp, 0, 0);
      ctxP.setTransform(1, 0, 0, 1, 0, 0);
      aviso('🔄 Volteado');
    });
    app.querySelector('[data-act="descargar"]').addEventListener('click', function () {
      snd('click');
      try {
        var tmp = document.createElement('canvas');
        tmp.width = lienzoP.width; tmp.height = lienzoP.height;
        var tctx = tmp.getContext('2d');
        tctx.fillStyle = fondoActual === 'noche' ? '#1a1a2e' : '#ffffff';
        tctx.fillRect(0, 0, tmp.width, tmp.height);
        tctx.drawImage(lienzoP, 0, 0);
        tctx.drawImage(lienzoB, 0, 0);
        var a = document.createElement('a');
        a.download = 'mi-dibujo-' + Date.now() + '.png';
        a.href = tmp.toDataURL('image/png');
        a.click();
        lanzarConfeti();
        aviso('💾 ¡Descargado!');
      } catch (e) { aviso('❌ No se pudo descargar'); }
    });
    app.querySelector('[data-act="volver"]').addEventListener('click', function () { snd('click'); irInicio(); });
    app.querySelector('[data-act="listo"]').addEventListener('click', function () {
      snd('click');
      if (!premioDado) {
        premioDado = true;
        sumarEstrellas(5);
        try { if (window.EK && EK.Store) { EK.Store.addDibujo && EK.Store.addDibujo(); EK.Store.addActividad && EK.Store.addActividad(); var n = EK.Store.revisarMedallas && EK.Store.revisarMedallas(); if (n && n.length) snd('medalla'); } } catch (e) { }
        actualizarTopbar();
        lanzarConfeti();
        aviso('¡Qué artista! +5 ⭐');
      } else {
        lanzarConfeti();
        aviso('🎨 ¡Gran trabajo!');
      }
    });

    /* stickers */
    function cerrarStickers() { if (stickerPanel) { stickerPanel.remove(); stickerPanel = null; } }
    app.querySelector('[data-act="stickers"]').addEventListener('click', function () {
      snd('click');
      if (stickerPanel) { cerrarStickers(); return; }
      herramienta = 'sticker';
      stickerPanel = document.createElement('div');
      stickerPanel.className = 'dibujo-sticker-panel';
      stickerPanel.innerHTML = STICKERS.map(function (s) { return '<button class="dibujo-sticker">' + s + '</button>'; }).join('') + '<button class="dibujo-sticker" style="background:#FFE0E0;" data-cerrar-sticker>✕</button>';
      wrap.appendChild(stickerPanel);
      stickerPanel.querySelectorAll('.dibujo-sticker').forEach(function (b) {
        b.addEventListener('click', function (ev) {
          ev.stopPropagation();
          if (b.dataset.cerrarSticker) { cerrarStickers(); herramienta = 'pincel'; return; }
          snd('click');
          var stk = b.textContent;
          var rect = lienzoP.getBoundingClientRect();
          var cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
          pushUndo();
          ctxP.globalAlpha = opacidad;
          var fs = Math.min(lienzoP.width, lienzoP.height) * 0.15;
          ctxP.font = fs + 'px serif';
          ctxP.textAlign = 'center'; ctxP.textBaseline = 'middle';
          ctxP.fillText(stk, lienzoP.width / 2, lienzoP.height / 2);
          ctxP.globalAlpha = 1;
          lanzarConfeti();
        });
      });
    });

    /* texto */
    function cerrarTexto() { if (textoInput) { textoInput.remove(); textoInput = null; } }
    app.querySelector('[data-act="texto"]').addEventListener('click', function () {
      snd('click');
      if (textoInput) { cerrarTexto(); return; }
      herramienta = 'texto';
      cerrarStickers();
      textoInput = document.createElement('div');
      textoInput.className = 'dibujo-text-input';
      textoInput.innerHTML = '<input type="text" id="dibujoTextoInp" placeholder="Escribí algo..." maxlength="30" /><button data-aceptar-texto">✅</button><button data-cerrar-texto>✕</button>';
      wrap.appendChild(textoInput);
      var inp = textoInput.querySelector('#dibujoTextoInp');
      setTimeout(function () { inp.focus(); }, 100);
      textoInput.querySelector('[data-aceptar-texto]').addEventListener('click', function () {
        var txt = inp.value.trim();
        if (txt) {
          pushUndo();
          ctxP.globalAlpha = opacidad;
          ctxP.fillStyle = color;
          var fs = Math.min(lienzoP.width, lienzoP.height) * 0.08;
          ctxP.font = 'bold ' + fs + 'px "Comic Sans MS", sans-serif';
          ctxP.textAlign = 'center'; ctxP.textBaseline = 'middle';
          ctxP.fillText(txt, lienzoP.width / 2, lienzoP.height / 2);
          ctxP.globalAlpha = 1;
          snd('click');
        }
        cerrarTexto(); herramienta = 'pincel';
      });
      textoInput.querySelector('[data-cerrar-texto]').addEventListener('click', function () { cerrarTexto(); herramienta = 'pincel'; });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') textoInput.querySelector('[data-aceptar-texto]').click(); });
    });

    /* modo espejo */
    app.querySelector('[data-act="espejo"]').addEventListener('click', function () {
      snd('click');
      var modos = [null, 'horizontal', 'vertical', 'ambos'];
      var idx = modos.indexOf(modoEspejo);
      modoEspejo = modos[(idx + 1) % modos.length];
      var btn = app.querySelector('[data-act="espejo"]');
      btn.classList.toggle('sel', modoEspejo !== null);
      aviso(modoEspejo ? '🪞 Espejo: ' + modoEspejo : '🪞 Espejo desactivado');
    });

    /* galería de bocetos */
    app.querySelector('[data-act="bocetos"]').addEventListener('click', function () { snd('click'); abrirGaleria(); });

    function abrirGaleria() {
      var catActiva = 'Todos';
      var modal = document.createElement('div');
      modal.className = 'dibujo-modal';
      modal.innerHTML =
        '<div class="dibujo-modal-head">' +
          '<div class="dibujo-modal-title">🖼️ ' + BOCETOS.length + ' dibujos para colorear</div>' +
          '<button class="dibujo-modal-close" data-cerrar>✕</button>' +
        '</div>' +
        '<div class="dibujo-cats" id="dibujoCats"></div>' +
        '<div class="dibujo-grid" id="dibujoGrid"></div>';
      document.body.appendChild(modal);

      var cats = document.getElementById('dibujoCats');
      var grid = document.getElementById('dibujoGrid');

      function renderCats() {
        cats.innerHTML = CATEGORIAS.map(function (c) {
          return '<button class="dibujo-cat' + (c === catActiva ? ' sel' : '') + '">' + c + '</button>';
        }).join('');
        cats.querySelectorAll('.dibujo-cat').forEach(function (b, i) {
          b.addEventListener('click', function () { snd('click'); catActiva = CATEGORIAS[i]; renderCats(); renderGrid(); });
        });
      }
      function renderGrid() {
        var items = [];
        items.push({ blanco: true });
        BOCETOS.forEach(function (b, i) { if (catActiva === 'Todos' || b.c === catActiva) items.push({ idx: i, b: b }); });
        grid.innerHTML = '';
        items.forEach(function (it) {
          var card = document.createElement('div');
          card.className = 'dibujo-card';
          var cv = document.createElement('canvas');
          cv.width = 180; cv.height = 180;
          var sp = cv.getContext('2d');
          sp.fillStyle = '#ffffff'; sp.fillRect(0, 0, 180, 180);
          var nombre;
          if (it.blanco) {
            sp.strokeStyle = '#b8c0d4'; sp.lineWidth = 3;
            sp.beginPath(); sp.moveTo(40, 140); sp.lineTo(140, 40); sp.stroke();
            sp.beginPath(); sp.arc(140, 40, 10, 0, Math.PI * 2); sp.stroke();
            nombre = '📄 Lienzo en blanco';
          } else {
            dibujarBocetoEn(sp, it.idx, 180, 180);
            nombre = it.b.e + ' ' + it.b.n;
          }
          var lbl = document.createElement('span'); lbl.textContent = nombre;
          card.appendChild(cv); card.appendChild(lbl);
          card.addEventListener('click', function () {
            snd('click');
            pushUndo();
            ctxP.globalAlpha = 1;
            ctxP.fillStyle = fondoActual === 'noche' ? '#1a1a2e' : '#ffffff';
            ctxP.fillRect(0, 0, lienzoP.width, lienzoP.height);
            if (it.blanco) { bocetoActual = null; ctxB.clearRect(0, 0, lienzoB.width, lienzoB.height); }
            else { bocetoActual = it.idx; dibujarBocetoEn(ctxB, it.idx, lienzoB.width, lienzoB.height); }
            document.body.removeChild(modal);
            aviso(it.blanco ? '📄 Lienzo en blanco' : '🎨 ¡A colorear!');
          });
          grid.appendChild(card);
        });
      }
      renderCats(); renderGrid();
      modal.querySelector('[data-cerrar]').addEventListener('click', function () { snd('click'); document.body.removeChild(modal); });
      modal.addEventListener('click', function (e) { if (e.target === modal) document.body.removeChild(modal); });
    }

    /* varita mágica, mis dibujos, compartir, guardar */
    app.querySelector('[data-act="varita"]').addEventListener('click', function () {
      snd('click'); herramienta = 'varita';
      app.querySelectorAll('[data-herramienta]').forEach(function (x) { x.classList.remove('sel'); });
      aviso('🪄 Tocá una zona para colorearla con magia');
      var handler = function (e) {
        if (herramienta !== 'varita') { lienzoP.removeEventListener('pointerdown', handler); return; }
        e.preventDefault(); e.stopPropagation();
        var p = pos(e);
        varitaMagica(p.x, p.y);
        herramienta = 'pincel';
        lienzoP.removeEventListener('pointerdown', handler);
      };
      lienzoP.addEventListener('pointerdown', handler);
    });
    app.querySelector('[data-act="misdibujos"]').addEventListener('click', function () { snd('click'); abrirGaleriaDibujos(); });
    app.querySelector('[data-act="compartir"]').addEventListener('click', function () { snd('click'); compartirDibujo(); });
    app.querySelector('[data-act="guardar"]').addEventListener('click', function () {
      snd('click');
      if (guardarDibujo()) { lanzarConfeti(); aviso('⭐ ¡Guardado en Mis Dibujos! +3 ⭐'); sumarEstrellas(3); }
      else aviso('❌ No se pudo guardar');
    });

    /* guardar automático en localStorage */
    setInterval(function () {
      try {
        var tmp = document.createElement('canvas');
        tmp.width = lienzoP.width; tmp.height = lienzoP.height;
        var tctx = tmp.getContext('2d');
        tctx.drawImage(lienzoP, 0, 0);
        tctx.drawImage(lienzoB, 0, 0);
        localStorage.setItem('educakids_dibujo', tmp.toDataURL());
      } catch (e) { }
    }, 10000);
  }

  window.EK = window.EK || {};
  window.EK.Dibujo = { iniciar: iniciar, bocetos: BOCETOS, version: 'SUPER-PREMIUM' };
})();
