/* ============================================================
   mundos-storybooks.js — Registro STANDALONE del mundo
   "Storybooks Bilingües". Usar SOLO si no querés depender del
   auto-registro que ya hace storybooks.js.
   Cargar DESPUÉS de mundos.js y ANTES de que el engine renderice
   el menú de mundos:
     <script src="mundos.js"></script>
     <script src="mundos-storybooks.js"></script>
   ============================================================ */
(function () {
  'use strict';
  var MUNDO = {
    id: 'storybooks',
    nombre: 'Storybooks Bilingües',
    emoji: '📚',
    color: '#FF9F43',
    tipo: 'storybooks',
    nivel: 'todos',
    desc: 'Cuentos en español e inglés con audio, vocabulario y juegos'
  };
  function agregar() {
    var listas = [];
    try {
      window.EK = window.EK || {};
      if (Array.isArray(window.EK.Mundos)) listas.push(window.EK.Mundos);
      if (window.EK.Mundos && Array.isArray(window.EK.Mundos.MUNDOS)) listas.push(window.EK.Mundos.MUNDOS);
      if (window.EK.Mundos && Array.isArray(window.EK.Mundos.mundos)) listas.push(window.EK.Mundos.mundos);
      if (Array.isArray(window.MUNDOS)) listas.push(window.MUNDOS);
    } catch (e) {}
    listas.forEach(function (lista) {
      if (!lista.some(function (m) { return m && m.id === 'storybooks'; })) lista.push(MUNDO);
    });
  }
  agregar();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', agregar);
  window.EK = window.EK || {};
  window.EK.StorybooksMundo = MUNDO;
})();
