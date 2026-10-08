/* ============================================================
   dibujo.js — Mundo Creativo: tablero de dibujo con Canvas
   Elegir color, tamaño de pincel, borrar y limpiar.
   ============================================================ */
(function () {
  'use strict';
  var colores = ['#000000', '#EE5A6F', '#FF9F43', '#FFD93D', '#6BCB77', '#4ECDC4', '#4D96FF', '#A55EEA', '#F368E0', '#8B5A2B', '#FFFFFF'];
  var pintando = false, color = '#EE5A6F', tamano = 8, goma = false, premioDado = false;
  var canvas, ctx;

  function pos(e) {
    var rect = canvas.getBoundingClientRect();
    var x, y;
    if (e.touches && e.touches[0]) { x = e.touches[0].clientX; y = e.touches[0].clientY; }
    else { x = e.clientX; y = e.clientY; }
    return { x: (x - rect.left) * (canvas.width / rect.width), y: (y - rect.top) * (canvas.height / rect.height) };
  }

  function iniciar() {
    premioDado = false;
    var app = document.getElementById('app');
    app.innerHTML =
      '<div class="screen dibujo-screen">' +
        '<div class="quiz-head"><button class="back-btn" data-act="volver">←</button><div class="quiz-title">🎨 Creatividad</div><button class="top-btn" data-act="listo" title="Terminé">✅</button></div>' +
        '<div class="dibujo-controles">' +
          '<div class="paleta" id="paleta">' + colores.map(function (c) { return '<button class="color-swatch" data-c="' + c + '" style="background:' + c + '"></button>'; }).join('') + '</div>' +
          '<div class="controles-row">' +
            '<button class="ctrl-btn" data-act="goma" title="Borrar">🧽</button>' +
            '<input type="range" id="tamano" min="2" max="40" value="8" />' +
            '<button class="ctrl-btn" data-act="limpiar" title="Limpiar">🗑️</button>' +
            '<button class="ctrl-btn" data-act="guardar" title="Guardar">💾</button>' +
          '</div>' +
        '</div>' +
        '<div class="canvas-wrap"><canvas id="lienzo"></canvas></div>' +
      '</div>';

    canvas = document.getElementById('lienzo');
    ctx = canvas.getContext('2d');
    var wrap = canvas.parentElement;
    function ajustar() {
      var w = wrap.clientWidth, h = Math.min(420, window.innerHeight - 260);
      canvas.width = w * 2; canvas.height = h * 2;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    }
    ajustar();

    function empezar(e) { e.preventDefault(); pintando = true; var p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); }
    function mover(e) {
      if (!pintando) return; e.preventDefault();
      var p = pos(e);
      ctx.strokeStyle = goma ? '#ffffff' : color;
      ctx.lineWidth = (goma ? tamano * 3 : tamano) * 2;
      ctx.lineTo(p.x, p.y); ctx.stroke();
    }
    function terminar() { pintando = false; }

    canvas.addEventListener('mousedown', empezar);
    canvas.addEventListener('mousemove', mover);
    window.addEventListener('mouseup', terminar);
    canvas.addEventListener('touchstart', empezar, { passive: false });
    canvas.addEventListener('touchmove', mover, { passive: false });
    canvas.addEventListener('touchend', terminar);

    app.querySelectorAll('.color-swatch').forEach(function (b) {
      b.addEventListener('click', function () { EK.Audio.click(); color = b.dataset.c; goma = false; b.parentElement.querySelectorAll('.color-swatch').forEach(function (x) { x.classList.remove('sel'); }); b.classList.add('sel'); });
    });
    app.querySelector('[data-act="goma"]').addEventListener('click', function () { EK.Audio.click(); goma = !goma; this.classList.toggle('sel', goma); });
    app.querySelector('[data-act="limpiar"]').addEventListener('click', function () { EK.Audio.click(); ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height); });
    app.querySelector('[data-act="guardar"]').addEventListener('click', function () {
      EK.Audio.click();
      try { localStorage.setItem('educakids_dibujo', canvas.toDataURL()); EK.App.mostrarAviso('💾 ¡Dibujo guardado!'); }
      catch (e) { EK.App.mostrarAviso('No se pudo guardar el dibujo'); }
    });
    document.getElementById('tamano').addEventListener('input', function () { tamano = Number(this.value); });
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
  }

  window.EK = window.EK || {};
  window.EK.Dibujo = { iniciar: iniciar };
})();
