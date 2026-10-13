# Integración de STORYBOOKS BILINGÜES en BuggyIA

No se modifica ningún módulo de otros mundos. Solo se **agregan archivos** y se hacen **3 cambios mínimos** en archivos existentes.

---

## 1) Archivos NUEVOS a subir (raíz del repo)

```
storybooks.css                  ← estilos propios (prefijo .sb-, no choca con style.css)
storybooks.js                   ← módulo biblioteca (auto-registra el mundo)
storybooks-reader.js            ← módulo lector (audio, vocabulario, preguntas, juego)
storybooks/catalogo.json        ← catálogo (metadata de todos los cuentos)
storybooks/cuentos/*.json       ← un JSON por cuento (3 de demo incluidos)
```

(Opcional) `mundos-storybooks.js` — si preferís registrar el mundo en un archivo separado.

---

## 2) Cambio en `index.html` (2 líneas)

Agregar DESPUÉS de los scripts existentes (mundos.js, engine.js, voz.js, minijuegos.js):

```html
<!-- Storybooks Bilingües -->
<link rel="stylesheet" href="storybooks.css">
<script src="storybooks.js"></script>
<script src="storybooks-reader.js"></script>
```

> Importante: cargar `storybooks.js` DESPUÉS de `mundos.js` para que auto-registre el mundo.
> Si el orden es distinto, igual funciona: usa `mundos-storybooks.js` (ver paso 3b).

---

## 3) Registro del mundo (una de estas dos opciones)

### Opción A — Automática (recomendada, no toca mundos.js)
`storybooks.js` ya detecta `EK.Mundos` / `window.MUNDOS` y le agrega el mundo al cargar.
No hace falta tocar `mundos.js`. El mundo agregado es:

```js
{ id: 'storybooks', nombre: 'Storybooks Bilingües', emoji: '📚',
  color: '#FF9F43', tipo: 'storybooks', nivel: 'todos',
  desc: 'Cuentos en español e inglés con audio, vocabulario y juegos' }
```

### Opción B — Manual (si querés verlo en mundos.js)
Agregar al array `MUNDOS` de `mundos.js`:

```js
{ id: 'storybooks', nombre: 'Storybooks Bilingües', emoji: '📚', color: '#FF9F43', tipo: 'storybooks', nivel: 'todos', desc: 'Cuentos en español e inglés con audio, vocabulario y juegos' },
```

---

## 4) Enrutado en el engine (1 línea, OPCIONAL pero recomendada)

El engine tiene un switch/if según `mundo.tipo`. Agregar un caso:

```js
case 'storybooks':
  EK.Storybooks.abrir(contenedor);   // contenedor = el elemento donde renderiza la app (#app, #main, etc.)
  break;
```

Además, para que el botón "← Volver" de la biblioteca regrese al menú de mundos,
el engine puede setear (una sola vez, después de cargar storybooks.js):

```js
EK.Storybooks.onVolver = function(contenedor) { /* tu función que muestra el menú de mundos */ };
```

### Si no querés tocar el engine:
`storybooks.js` incluye **click-intercepción automática** (fase capture). Si la tarjeta
del mundo tiene `data-mundo="storybooks"`, `data-id="storybooks"` o `data-sb-abrir`,
se abre la biblioteca sola. Si no, agregá ese atributo a la tarjeta:

```html
<div class="mundo-card" data-mundo="storybooks"> ... </div>
```

---

## 5) Verificación (antes de subir)

1. Abrí `demo-storybooks.html` en el navegador (misma carpeta) → debe abrir la biblioteca.
2. Probá los 3 cuentos: lectura, botones 🔊 (ES) y 🌐 (EN), traducción, cambio de página.
3. Probá Vocabulario, Preguntas y Juego.
4. Favoritos (🤍/❤️) y Progreso deben persistir al recargar (localStorage).
5. En móvil: botones grandes, scroll vertical, sin overflow horizontal.

---

## 6) Cómo agregar MÁS cuentos (cientos, sin tocar el motor)

1. Creá `storybooks/cuentos/mi-cuento.json` (copiar la estructura de uno existente).
2. Agregá una entrada en `storybooks/catalogo.json` → array `cuentos`:
   ```json
   { "id": "mi-cuento", "archivo": "cuentos/mi-cuento.json",
     "titulo": {"es":"...", "en":"..."}, "categoria": "animales",
     "nivel": "inicial", "paginas": 8, "portada": "🦁", "color": "#FF6B9D" }
   ```
3. Subí ambos archivos. Listo. El cuento carga solo cuando el niño lo abre (lazy).

Para ilustraciones con imágenes reales: en cada página del JSON, `ilustracion` puede ser
una URL de imagen (ej. `"ilustracion": "img/cuentos/mi-cuento/pag1.jpg"`). El lector la
detecta automáticamente si empieza con `http` o contiene `/`. Las imágenes se cargan por
página, no todas juntas.

---

## Notas técnicas

- **Audio**: reutiliza `EK.Voz.hablar()` de `voz.js` (Web Speech TTS). Si no existe, hace
  fallback a `speechSynthesis` nativo. No hay archivos de audio pre-cargados.
- **Idiomas**: español (es-AR) e inglés (en-US). El selector 🇪🇸/🇬🇧 recuerda la elección.
- **Persistencia**: `localStorage` clave `buggyia.storybooks` → `{favoritos:[], progreso:{}}`.
- **Ruta de JSON**: se detecta automáticamente desde la ubicación de `storybooks.js`.
  Si la app está en un subdirectorio, definir `window.SB_RUTA_BASE = 'ruta/a/storybooks/';`
  ANTES de cargar storybooks.js.
- **Sin dependencias**: no requiere librerías externas. Funciona offline (PWA) si los JSON
  se agregan al cache de `sw.js`.
