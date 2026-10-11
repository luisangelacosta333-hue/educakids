/* ============================================================
   dibujo.js — Mundo Creativo (versión PREMIUM)
   - Lienzo grande a pantalla completa
   - Pincel (1 tipo, grosor regulable) + Goma de borrar + Bote de pintura
   - Deshacer / Rehacer
   - +40 bocetos para colorear (vectoriales, 0 KB de imagen, nítidos)
   - Categorías: Princesas, Superhéroes, Animales, Vehículos, Casas,
     Mariposas, Naturaleza, Dulces
   - El boceto queda en una capa superior: se pinta debajo y la
     goma NUNCA borra el contorno.
   - Guarda el dibujo (con boceto incluido) en localStorage.
   Mantiene la API: window.EK.Dibujo.iniciar()
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. CSS inyectado (no toca style.css) ---------- */
  function inyectarCSS() {
    if (document.getElementById('dibujo-css')) return;
    var st = document.createElement('style');
    st.id = 'dibujo-css';
    st.textContent =
      '.dibujo-screen{display:flex;flex-direction:column;height:100%;background:#f4f7ff;}' +
      '.dibujo-tools{padding:6px 10px;background:#fff;border-bottom:2px solid #e6ebf5;}' +
      '.dibujo-paleta{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:6px;}' +
      '.dibujo-color{width:26px;height:26px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 2px #cfd6e6;cursor:pointer;padding:0;flex:0 0 auto;}' +
      '.dibujo-color.sel{box-shadow:0 0 0 3px #4D96FF;transform:scale(1.15);}' +
      '.dibujo-barra{display:flex;align-items:center;gap:6px;justify-content:center;flex-wrap:wrap;}' +
      '.dibujo-btn{border:none;background:#eef2fb;color:#334;border-radius:12px;padding:8px 10px;font-size:18px;cursor:pointer;min-width:42px;}' +
      '.dibujo-btn:active{transform:scale(.93);}' +
      '.dibujo-btn.sel{background:#4D96FF;color:#fff;}' +
      '.dibujo-rango{flex:1;max-width:160px;accent-color:#4D96FF;}' +
      '.dibujo-canvas-wrap{position:relative;flex:1;min-height:0;margin:10px;border-radius:16px;overflow:hidden;box-shadow:0 6px 18px rgba(60,80,140,.18);background:#fff;}' +
      '.dibujo-canvas-wrap canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none;}' +
      '#dibujoBoceto{pointer-events:none;}' +
      '.dibujo-modal{position:fixed;inset:0;background:rgba(20,28,60,.55);z-index:50;display:flex;flex-direction:column;}' +
      '.dibujo-modal-head{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;background:#fff;}' +
      '.dibujo-modal-title{font-weight:700;color:#334;font-size:18px;}' +
      '.dibujo-cats{display:flex;gap:6px;overflow-x:auto;padding:8px 12px;background:#fff;border-top:1px solid #eef1f8;}' +
      '.dibujo-cat{border:none;background:#eef2fb;color:#445;border-radius:20px;padding:6px 14px;white-space:nowrap;cursor:pointer;font-size:14px;}' +
      '.dibujo-cat.sel{background:#A55EEA;color:#fff;}' +
      '.dibujo-grid{flex:1;overflow-y:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:10px;padding:12px;background:#f4f7ff;align-content:start;}' +
      '.dibujo-card{background:#fff;border-radius:14px;padding:6px;cursor:pointer;text-align:center;box-shadow:0 2px 8px rgba(60,80,140,.12);}' +
      '.dibujo-card:active{transform:scale(.96);}' +
      '.dibujo-card canvas{width:100%;height:90px;background:#fff;border-radius:10px;}' +
      '.dibujo-card span{display:block;font-size:12px;color:#445;margin-top:4px;font-weight:600;}';
    document.head.appendChild(st);
  }

  /* ---------- 2. Mini-DSL de trazos vectoriales ---------- */
  /* Comandos: M x y | L x y | Q cx cy x y | C c1x c1y c2x c2y x y | Z
              O cx cy r (círculo) | E cx cy rx ry rotº (elipse) | R x y w h (rect) */
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
          ctx.moveTo(rx + rr, ry);
          ctx.lineTo(rx + rw - rr, ry); ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + rr);
          ctx.lineTo(rx + rw, ry + rh - rr); ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - rr, ry + rh);
          ctx.lineTo(rx + rr, ry + rh); ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - rr);
          ctx.lineTo(rx, ry + rr); ctx.quadraticCurveTo(rx, ry, rx + rr, ry);
        } else {
          ctx.rect(rx, ry, rw, rh);
        }
      }
    }
    ctx.stroke();
  }

  /* ---------- 3. Biblioteca de bocetos (46) ---------- */
  /* Coordenadas normalizadas 0..100. c = categoría, e = emoji, n = nombre, p = trazos */
  var BOCETOS = [
    /* ---- Naturaleza ---- */
    { c: 'Naturaleza', e: '☀️', n: 'Sol feliz', p: ["O 50 50 16", "M50 26 L50 12", "M50 74 L50 88", "M26 50 L12 50", "M74 50 L88 50", "M33 33 L23 23", "M67 33 L77 23", "M33 67 L23 77", "M67 67 L77 77", "O 44 47 2", "O 56 47 2", "M44 55 Q50 60 56 55"] },
    { c: 'Naturaleza', e: '🌙', n: 'Luna y estrellas', p: ["M42 18 Q66 50 42 82", "M42 18 Q20 50 42 82", "O 70 24 2", "O 79 44 1.5", "O 66 60 2", "O 80 72 1.5", "O 72 84 1.5"] },
    { c: 'Naturaleza', e: '🌸', n: 'Flor', p: ["E 50 28 9 14 0", "E 50 72 9 14 0", "E 28 50 14 9 0", "E 72 50 14 9 0", "E 34 34 11 9 45", "E 66 66 11 9 45", "E 34 66 11 9 -45", "E 66 34 11 9 -45", "O 50 50 7", "M50 57 L50 92", "M50 76 Q38 72 34 64", "M50 76 Q62 72 66 64"] },
    { c: 'Naturaleza', e: '🌳', n: 'Árbol frutal', p: ["R 45 60 10 32", "O 50 36 20", "O 30 46 12", "O 70 46 12", "O 50 20 11", "O 42 38 2.5", "O 58 44 2.5", "O 50 54 2.5", "O 38 56 2"] },
    { c: 'Naturaleza', e: '🌈', n: 'Arcoíris con nubes', p: ["M16 82 Q50 10 84 82", "M24 82 Q50 22 76 82", "M32 82 Q50 34 68 82", "M40 82 Q50 46 60 82", "O 18 82 8", "O 27 80 7", "O 12 80 6", "O 82 82 8", "O 73 80 7", "O 88 80 6"] },
    { c: 'Naturaleza', e: '🍄', n: 'Hongo', p: ["M28 50 Q50 16 72 50 Z", "M28 50 L72 50", "R 40 50 20 34", "O 40 38 4", "O 55 30 5", "O 63 44 3.5", "O 46 62 1.8", "O 55 67 1.8", "M46 72 Q50 75 54 72"] },

    /* ---- Mariposas e insectos ---- */
    { c: 'Bichos', e: '🦋', n: 'Mariposa', p: ["E 50 52 3.5 20 0", "O 50 30 5", "M48 26 Q44 16 40 14", "M52 26 Q56 16 60 14", "E 34 42 17 13 -25", "E 66 42 17 13 25", "E 36 64 12 10 25", "E 64 64 12 10 -25", "O 34 42 4", "O 66 42 4", "O 36 64 3", "O 64 64 3"] },
    { c: 'Bichos', e: '🐛', n: 'Oruga', p: ["O 22 62 9", "O 36 58 9", "O 50 55 9", "O 64 52 9", "O 76 50 10", "O 73 47 2", "M76 40 L76 32", "M80 41 L85 34", "M72 53 Q76 56 80 53", "M22 71 L20 78", "M36 67 L34 74", "M50 64 L48 71", "M64 61 L62 68"] },
    { c: 'Bichos', e: '🪰', n: 'Libélula', p: ["E 50 58 3 24 0", "O 50 30 6", "E 32 42 20 6 35", "E 68 42 20 6 -35", "E 33 56 18 6 -35", "E 67 56 18 6 35", "O 48 28 1.5", "O 52 28 1.5"] },
    { c: 'Bichos', e: '🐝', n: 'Abeja', p: ["E 50 56 15 19 0", "M37 48 L63 48", "M36 58 L64 58", "O 50 32 8", "E 38 30 11 6 -30", "E 62 30 11 6 30", "M47 26 Q44 18 40 16", "M53 26 Q56 18 60 16", "O 47 30 1.5", "O 53 30 1.5", "M47 35 Q50 38 53 35"] },

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
    { c: 'Animales', e: '🐦', n: 'Pájaro', p: ["E 45 50 20 16 0", "O 62 42 9", "M70 42 L80 46 L70 50 Z", "O 60 40 2", "E 30 48 14 8 -20", "E 30 58 12 7 20", "M40 66 L38 76", "M50 66 L52 76"] },
    { c: 'Animales', e: '🐧', n: 'Pingüino', p: ["E 50 55 18 26 0", "E 50 60 11 18 0", "O 44 42 2.5", "O 56 42 2.5", "M46 50 L50 55 L54 50 Z", "E 34 55 6 12 20", "E 66 55 6 12 -20", "M42 80 L38 86", "M58 80 L62 86"] },

    /* ---- Vehículos ---- */
    { c: 'Vehículos', e: '🚗', n: 'Auto deportivo', p: ["R 14 48 72 20 6", "M24 48 Q30 32 48 32 L66 32 Q78 32 82 48", "O 30 70 9", "O 70 70 9", "O 30 70 3.5", "O 70 70 3.5", "R 36 36 14 10 3", "R 54 36 14 10 3", "M86 55 L92 55"] },
    { c: 'Vehículos', e: '🚚', n: 'Camión', p: ["R 10 40 40 30", "R 50 52 38 18", "R 16 46 12 10", "O 22 72 8", "O 62 72 8", "O 80 72 8", "O 22 72 3", "O 62 72 3", "O 80 72 3"] },
    { c: 'Vehículos', e: '🚌', n: 'Autobús', p: ["R 12 30 76 42 6", "R 20 38 12 12 2", "R 36 38 12 12 2", "R 52 38 12 12 2", "R 68 38 12 12 2", "R 20 56 20 14 3", "O 28 74 8", "O 72 74 8", "O 28 74 3", "O 72 74 3"] },
    { c: 'Vehículos', e: '✈️', n: 'Avión', p: ["E 50 50 34 7 0", "M50 50 L20 30 L26 50 L20 70 Z", "M60 50 L80 34 L76 50 L80 66 Z", "O 78 50 3", "M40 50 L36 62 L44 50 Z", "M40 50 L36 38 L44 50 Z"] },
    { c: 'Vehículos', e: '🚀', n: 'Cohete', p: ["M50 12 Q66 30 66 55 L66 72 L34 72 L34 55 Q34 30 50 12 Z", "O 50 40 6", "M34 60 L20 76 L34 70", "M66 60 L80 76 L66 70", "M42 72 L40 84", "M50 72 L50 88", "M58 72 L60 84", "O 50 22 2"] },
    { c: 'Vehículos', e: '⛵', n: 'Barco de vela', p: ["M14 62 L86 62 L76 78 L24 78 Z", "M50 62 L50 20", "M50 24 L72 52 L50 52 Z", "M50 30 L30 52 L50 52 Z", "O 50 18 2"] },
    { c: 'Vehículos', e: '🚂', n: 'Tren', p: ["R 14 40 40 32", "R 58 48 28 24", "O 26 74 7", "O 42 74 7", "O 66 74 7", "O 80 74 7", "R 20 46 10 10", "R 34 46 10 10", "R 64 54 8 8", "M14 40 L14 32 L22 32"] },

    /* ---- Casas ---- */
    { c: 'Casas', e: '🏠', n: 'Casa', p: ["R 22 48 56 40", "M14 50 L50 18 L86 50 Z", "R 42 62 16 26", "R 28 56 10 10", "R 62 56 10 10", "R 64 24 8 14", "O 54 75 1.5"] },
    { c: 'Casas', e: '🏰', n: 'Castillo', p: ["R 18 44 14 44", "R 68 44 14 44", "R 32 56 36 32", "M18 44 L18 36 L24 36 L24 44 L28 44 L28 36 L32 36 L32 44", "M68 44 L68 36 L74 36 L74 44 L78 44 L78 36 L82 36 L82 44", "R 44 64 12 24", "O 25 54 3", "O 75 54 3", "M50 30 L50 18", "M50 18 L62 22 L50 26 Z"] },
    { c: 'Casas', e: '🛖', n: 'Cabaña de troncos', p: ["R 24 50 52 38", "M16 52 L50 22 L84 52 Z", "M24 58 L76 58", "M24 66 L76 66", "M24 74 L76 74", "R 44 62 12 26", "R 30 56 8 8", "O 50 30 2"] },
    { c: 'Casas', e: '☀️', n: 'Casa con panel solar', p: ["R 22 50 56 38", "M18 52 L50 24 L82 52 Z", "R 30 26 20 12 2", "M32 28 L48 36", "M48 28 L32 36", "R 42 64 16 24", "R 28 56 10 10", "R 62 56 10 10", "O 82 20 6"] },

    /* ---- Princesas y fantasía ---- */
    { c: 'Princesas', e: '👸', n: 'Princesa', p: ["O 50 28 12", "M40 20 Q50 10 60 20", "M44 16 L46 10", "M50 14 L50 8", "M56 16 L54 10", "O 46 27 1.8", "O 54 27 1.8", "M46 33 Q50 36 54 33", "M40 40 Q30 60 22 88 L78 88 Q70 60 60 40 Z", "M30 50 L20 66", "M70 50 L80 66", "M40 60 L34 74", "M60 60 L66 74"] },
    { c: 'Princesas', e: '🧚', n: 'Hada', p: ["O 50 26 10", "O 46 25 1.5", "O 54 25 1.5", "M46 31 Q50 34 54 31", "E 30 42 14 8 -30", "E 70 42 14 8 30", "E 30 54 12 7 30", "E 70 54 12 7 -30", "M44 36 Q42 60 40 84 L60 84 Q58 60 56 36 Z", "M50 84 L48 94", "M54 84 L56 94", "M80 22 L88 14", "O 89 13 2"] },
    { c: 'Princesas', e: '🧜‍♀️', n: 'Sirena', p: ["O 50 24 11", "O 46 23 1.5", "O 54 23 1.5", "M46 29 Q50 32 54 29", "M40 20 Q30 30 34 42", "M60 20 Q70 30 66 42", "M42 34 Q36 52 40 64 Q44 72 50 68 Q56 72 60 64 Q64 52 58 34 Z", "M50 68 Q46 80 38 84", "M50 68 Q54 80 62 84", "M38 84 Q44 88 50 84 Q56 88 62 84"] },
    { c: 'Princesas', e: '👑', n: 'Reina', p: ["O 50 30 13", "M38 22 L40 12 L46 18 L50 10 L54 18 L60 12 L62 22", "O 40 12 2", "O 50 10 2", "O 60 12 2", "O 46 29 1.8", "O 54 29 1.8", "M46 35 Q50 38 54 35", "M38 42 Q28 62 20 90 L80 90 Q72 62 62 42 Z", "O 50 55 3"] },
    { c: 'Princesas', e: '🦄', n: 'Unicornio', p: ["E 46 60 24 16 0", "O 68 44 11", "M74 36 L80 20", "M70 38 L72 30", "O 72 42 1.5", "M66 48 Q62 52 64 54", "M56 34 Q50 28 44 34 Q50 38 56 34", "M30 72 L28 84", "M40 74 L38 86", "M56 74 L58 86", "M66 72 L68 84", "M24 58 L14 54"] },

    /* ---- Superhéroes ---- */
    { c: 'Héroes', e: '🦸', n: 'Superhéroe', p: ["O 50 24 11", "M40 20 Q50 12 60 20", "M38 26 L44 30", "M56 30 L62 26", "O 46 27 1.5", "O 54 27 1.5", "M46 33 Q50 36 54 33", "M36 40 L20 78 L40 72 L44 52", "M64 40 L80 78 L60 72 L56 52", "R 40 38 20 26", "O 50 50 4", "M40 64 L38 88", "M60 64 L62 88"] },
    { c: 'Héroes', e: '🤖', n: 'Robot', p: ["R 34 20 32 26 4", "O 42 30 3", "O 58 30 3", "R 44 37 12 4", "M50 20 L50 12", "O 50 10 2", "R 28 50 44 34 4", "R 36 58 10 10", "R 54 58 10 10", "R 18 52 8 22", "R 74 52 8 22", "R 36 84 10 10", "R 54 84 10 10"] },
    { c: 'Héroes', e: '🥷', n: 'Ninja', p: ["O 50 28 12", "M38 28 Q50 20 62 28 L62 34 L38 34 Z", "O 44 29 2", "O 56 29 2", "M44 34 L44 40", "M56 34 L56 40", "R 38 40 24 34", "M38 48 L20 60", "M62 48 L80 40", "M40 74 L38 88", "M60 74 L62 88", "M50 52 L66 66", "M66 66 L74 60"] },
    { c: 'Héroes', e: '👨‍🚀', n: 'Astronauta', p: ["O 50 28 14", "O 50 30 9", "O 46 28 1.5", "O 54 28 1.5", "R 36 42 28 30 6", "O 50 54 4", "R 22 46 10 20 4", "R 68 46 10 20 4", "R 36 72 10 16", "R 54 72 10 16", "O 26 20 2", "O 74 20 2", "O 50 10 1.5", "O 18 60 1.5", "O 84 70 1.5"] },

    /* ---- Dulces y objetos ---- */
    { c: 'Dulces', e: '🍦', n: 'Helado triple', p: ["M34 50 L50 88 L66 50 Z", "M34 50 Q50 42 66 50", "E 50 40 18 14 0", "E 38 30 10 8 -20", "E 62 30 10 8 20", "O 50 22 6", "M42 58 L58 58", "M46 66 L54 66"] },
    { c: 'Dulces', e: '🎂', n: 'Pastel de cumpleaños', p: ["R 22 58 56 24 4", "R 30 40 40 20 4", "R 38 26 24 16 4", "M50 26 L50 14", "O 50 12 2", "M28 58 Q32 52 36 58", "M44 58 Q48 52 52 58", "M60 58 Q64 52 68 58", "M34 40 Q38 34 42 40", "M54 40 Q58 34 62 40"] },
    { c: 'Dulces', e: '🎈', n: 'Globos', p: ["E 34 34 12 15 0", "E 58 28 12 15 10", "E 74 42 12 15 -10", "O 34 49 1.5", "O 58 43 1.5", "O 74 57 1.5", "M34 50 Q40 66 30 80", "M58 44 Q52 64 62 82", "M74 58 Q70 72 78 84", "M20 88 L80 88"] },
    { c: 'Dulces', e: '❤️', n: 'Corazón feliz', p: ["M50 78 Q20 56 22 38 Q24 24 38 24 Q46 24 50 32 Q54 24 62 24 Q76 24 78 38 Q80 56 50 78 Z", "O 38 38 2", "O 60 38 2", "M42 50 Q50 56 58 50"] }
  ];

  var CATEGORIAS = ['Todos'];
  BOCETOS.forEach(function (b) { if (CATEGORIAS.indexOf(b.c) === -1) CATEGORIAS.push(b.c); });

  /* ---------- 4. Estado ---------- */
  var PALETA = ['#000000', '#EE5A6F', '#F368E0', '#A55EEA', '#4D96FF', '#4ECDC4', '#6BCB77', '#9BE15D', '#FFD93D', '#FF9F43', '#8B5A2B', '#F2C6A0', '#C68863', '#FFFFFF', '#9AA5B1', '#7C5CFC', '#FF6B9D', '#21C39A'];
  var lienzoP, lienzoB, ctxP, ctxB, wrap;
  var pintando = false, herramienta = 'pincel', color = '#EE5A6F', tamano = 14;
  var ultimo = null;
  var undoStack = [], redoStack = [], bocetoActual = null;
  var premioDado = false;

  function hexRgb(h) {
    h = h.replace('#', '');
    return { r: parseInt(h.substr(0, 2), 16), g: parseInt(h.substr(2, 2), 16), b: parseInt(h.substr(4, 2), 16) };
  }

  function dibujarBocetoEn(ctx, idx, W, H) {
    ctx.clearRect(0, 0, W, H);
    var b = BOCETOS[idx]; if (!b) return;
    var s = Math.min(W, H) / 108, cx = W / 2, cy = H / 2;
    ctx.save();
    ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-50, -50);
    ctx.lineWidth = 0.9; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = '#2a2a38';
    for (var i = 0; i < b.p.length; i++) trazar(ctx, b.p[i]);
    ctx.restore();
  }

  function pushUndo() {
    try {
      undoStack.push(lienzoP.toDataURL());
      if (undoStack.length > 20) undoStack.shift();
      redoStack.length = 0;
    } catch (e) { }
  }

  function restaurar(dataURL, cb) {
    var img = new Image();
    img.onload = function () {
      ctxP.fillStyle = '#ffffff'; ctxP.fillRect(0, 0, lienzoP.width, lienzoP.height);
      ctxP.drawImage(img, 0, 0, lienzoP.width, lienzoP.height);
      if (cb) cb();
    };
    img.src = dataURL;
  }

  function deshacer() {
    if (!undoStack.length) return;
    redoStack.push(lienzoP.toDataURL());
    restaurar(undoStack.pop());
  }
  function rehacer() {
    if (!redoStack.length) return;
    undoStack.push(lienzoP.toDataURL());
    restaurar(redoStack.pop());
  }

  /* Relleno (bote de pintura): usa el boceto como pared para que no se fugue el color */
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
      if (b[j + 3] > 100) return false; // línea del boceto = pared
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

  /* ---------- 5. UI ---------- */
  function iniciar() {
    inyectarCSS();
    premioDado = false;
    undoStack = []; redoStack = []; bocetoActual = null;
    var app = document.getElementById('app');

    app.innerHTML =
      '<div class="screen dibujo-screen">' +
        '<div class="quiz-head">' +
          '<button class="back-btn" data-act="volver">←</button>' +
          '<div class="quiz-title">🎨 Creatividad</div>' +
          '<button class="top-btn" data-act="listo" title="Terminé">✅</button>' +
        '</div>' +
        '<div class="dibujo-tools">' +
          '<div class="dibujo-paleta" id="dibujoPaleta">' +
            PALETA.map(function (c) { return '<button class="dibujo-color" data-c="' + c + '" style="background:' + c + '"></button>'; }).join('') +
          '</div>' +
          '<div class="dibujo-barra">' +
            '<button class="dibujo-btn sel" data-herramienta="pincel" title="Pincel">🖌️</button>' +
            '<button class="dibujo-btn" data-herramienta="goma" title="Goma de borrar">🧽</button>' +
            '<button class="dibujo-btn" data-herramienta="bote" title="Bote de pintura">🪣</button>' +
            '<input type="range" class="dibujo-rango" id="dibujoTamano" min="4" max="60" value="14" />' +
            '<button class="dibujo-btn" data-act="undo" title="Deshacer">↩️</button>' +
            '<button class="dibujo-btn" data-act="redo" title="Rehacer">↪️</button>' +
            '<button class="dibujo-btn" data-act="limpiar" title="Limpiar">🗑️</button>' +
            '<button class="dibujo-btn" data-act="bocetos" title="Bocetos para colorear">🖼️</button>' +
            '<button class="dibujo-btn" data-act="guardar" title="Guardar">💾</button>' +
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

    function ajustar() {
      var previa = null;
      try { previa = lienzoP.width ? lienzoP.toDataURL() : null; } catch (e) { previa = null; }
      var w = wrap.clientWidth, h = wrap.clientHeight;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      [lienzoP, lienzoB].forEach(function (c) { c.width = Math.max(1, w * dpr); c.height = Math.max(1, h * dpr); });
      ctxP.fillStyle = '#ffffff'; ctxP.fillRect(0, 0, lienzoP.width, lienzoP.height);
      ctxP.lineCap = 'round'; ctxP.lineJoin = 'round';
      if (previa) restaurar(previa);
      if (bocetoActual !== null) dibujarBocetoEn(ctxB, bocetoActual, lienzoB.width, lienzoB.height);
      else ctxB.clearRect(0, 0, lienzoB.width, lienzoB.height);
    }
    ajustar();
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(ajustar, 150); });

    function pos(e) {
      var rect = lienzoP.getBoundingClientRect();
      var cx = e.clientX, cy = e.clientY;
      return {
        x: (cx - rect.left) * (lienzoP.width / rect.width),
        y: (cy - rect.top) * (lienzoP.height / rect.height)
      };
    }

    function empezar(e) {
      e.preventDefault();
      var p = pos(e);
      if (herramienta === 'bote') { pushUndo(); rellenar(p.x, p.y); return; }
      pushUndo();
      pintando = true; ultimo = p;
      ctxP.strokeStyle = herramienta === 'goma' ? '#ffffff' : color;
      ctxP.lineWidth = (herramienta === 'goma' ? tamano * 2.5 : tamano) * (lienzoP.width / wrap.clientWidth);
      ctxP.beginPath();
      ctxP.arc(p.x, p.y, ctxP.lineWidth / 2, 0, Math.PI * 2);
      ctxP.fillStyle = ctxP.strokeStyle; ctxP.fill();
      ctxP.beginPath(); ctxP.moveTo(p.x, p.y);
      lienzoP.setPointerCapture(e.pointerId);
    }
    function mover(e) {
      if (!pintando) return;
      e.preventDefault();
      var p = pos(e);
      var mx = (ultimo.x + p.x) / 2, my = (ultimo.y + p.y) / 2;
      ctxP.quadraticCurveTo(ultimo.x, ultimo.y, mx, my);
      ctxP.stroke();
      ultimo = p;
    }
    function terminar() { pintando = false; ultimo = null; }

    lienzoP.addEventListener('pointerdown', empezar);
    lienzoP.addEventListener('pointermove', mover);
    lienzoP.addEventListener('pointerup', terminar);
    lienzoP.addEventListener('pointercancel', terminar);

    /* colores */
    app.querySelectorAll('.dibujo-color').forEach(function (b) {
      b.addEventListener('click', function () {
        EK.Audio.click();
        color = b.dataset.c; herramienta = 'pincel';
        app.querySelectorAll('.dibujo-color').forEach(function (x) { x.classList.remove('sel'); });
        b.classList.add('sel');
        app.querySelectorAll('[data-herramienta]').forEach(function (x) { x.classList.toggle('sel', x.dataset.herramienta === 'pincel'); });
      });
    });

    /* herramientas */
    app.querySelectorAll('[data-herramienta]').forEach(function (b) {
      b.addEventListener('click', function () {
        EK.Audio.click();
        herramienta = b.dataset.herramienta;
        app.querySelectorAll('[data-herramienta]').forEach(function (x) { x.classList.toggle('sel', x === b); });
      });
    });

    document.getElementById('dibujoTamano').addEventListener('input', function () { tamano = Number(this.value); });

    /* acciones */
    app.querySelector('[data-act="undo"]').addEventListener('click', function () { EK.Audio.click(); deshacer(); });
    app.querySelector('[data-act="redo"]').addEventListener('click', function () { EK.Audio.click(); rehacer(); });
    app.querySelector('[data-act="limpiar"]').addEventListener('click', function () {
      EK.Audio.click(); pushUndo();
      ctxP.fillStyle = '#ffffff'; ctxP.fillRect(0, 0, lienzoP.width, lienzoP.height);
    });
    app.querySelector('[data-act="guardar"]').addEventListener('click', function () {
      EK.Audio.click();
      try {
        var tmp = document.createElement('canvas');
        tmp.width = lienzoP.width; tmp.height = lienzoP.height;
        var tctx = tmp.getContext('2d');
        tctx.drawImage(lienzoP, 0, 0);
        tctx.drawImage(lienzoB, 0, 0);
        localStorage.setItem('educakids_dibujo', tmp.toDataURL());
        EK.App.mostrarAviso('💾 ¡Dibujo guardado!');
      } catch (e) { EK.App.mostrarAviso('No se pudo guardar el dibujo'); }
    });
    app.querySelector('[data-act="volver"]').addEventListener('click', function () { EK.Audio.click(); EK.App.ir('inicio'); });
    app.querySelector('[data-act="listo"]').addEventListener('click', function () {
      EK.Audio.click();
      if (!premioDado) {
        premioDado = true;
        EK.Store.addEstrellas(5);
        EK.Store.addDibujo();
        EK.Store.addActividad();
        var nuevas = EK.Store.revisarMedallas();
        if (nuevas.length) EK.Audio.medalla();
        EK.App.actualizarTopbar();
        EK.App.mostrarAviso('¡Qué artista! +5 ⭐' + (nuevas.length ? ' 🏅 ' + nuevas[0].nombre : ''));
      }
    });

    /* ---- Galería de bocetos ---- */
    app.querySelector('[data-act="bocetos"]').addEventListener('click', function () {
      EK.Audio.click();
      abrirGaleria();
    });

    function abrirGaleria() {
      var catActiva = 'Todos';
      var modal = document.createElement('div');
      modal.className = 'dibujo-modal';
      modal.innerHTML =
        '<div class="dibujo-modal-head">' +
          '<div class="dibujo-modal-title">🖼️ Elegí un dibujo para colorear</div>' +
          '<button class="dibujo-btn" data-cerrar>✕</button>' +
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
          b.addEventListener('click', function () { EK.Audio.click(); catActiva = CATEGORIAS[i]; renderCats(); renderGrid(); });
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
            EK.Audio.click();
            pushUndo();
            ctxP.fillStyle = '#ffffff'; ctxP.fillRect(0, 0, lienzoP.width, lienzoP.height);
            if (it.blanco) { bocetoActual = null; ctxB.clearRect(0, 0, lienzoB.width, lienzoB.height); }
            else { bocetoActual = it.idx; dibujarBocetoEn(ctxB, it.idx, lienzoB.width, lienzoB.height); }
            document.body.removeChild(modal);
          });
          grid.appendChild(card);
        });
      }
      renderCats(); renderGrid();
      modal.querySelector('[data-cerrar]').addEventListener('click', function () { EK.Audio.click(); document.body.removeChild(modal); });
      modal.addEventListener('click', function (e) { if (e.target === modal) document.body.removeChild(modal); });
    }
  }

  window.EK = window.EK || {};
  window.EK.Dibujo = { iniciar: iniciar, bocetos: BOCETOS };
})();
