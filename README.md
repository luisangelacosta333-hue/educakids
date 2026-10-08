# 🌟 EducaKids — "Aprendé jugando"

Aplicación educativa infantil con **7 mundos** y **un solo motor reutilizable**.
Desarrollada con HTML, CSS y JavaScript puro (sin frameworks). Instalable como PWA.

## 🚀 Cómo ejecutarla

Por el service worker, lo ideal es servirla con un servidor web local:

```bash
cd educakids
python3 -m http.server 8000
# luego abrí http://localhost:8000 en el navegador
```

También funciona abriendo `index.html` directamente (el service worker se ignora en `file://`).

### Instalar como app (PWA)
1. Servila por http o subila a cualquier hosting.
2. En Chrome/Edge: menú → "Instalar aplicación". En Android: "Agregar a pantalla de inicio".
3. Funciona offline una vez cargada.

## 📁 Estructura

```
educakids/
├── index.html          # shell único (todo se renderiza en #app por JS)
├── manifest.json       # configuración PWA
├── sw.js               # service worker (cache-first, offline)
├── css/style.css       # estilos infantiles, responsive, animaciones
├── icons/              # íconos 192/512/1024 + svg
└── js/
    ├── store.js        # estado, localStorage, puntos, niveles, medallas
    ├── audio.js        # efectos WebAudio + pronunciación (SpeechSynthesis)
    ├── engine.js       # MOTOR DE PREGUNTAS reutilizable (único!)
    ├── mundos.js       # datos de los 7 mundos + generadores de preguntas
    ├── minijuegos.js   # memoria, secuencias, el diferente, cálculo rápido
    ├── dibujo.js       # tablero de dibujo (Canvas)
    └── app.js          # navegación y pantallas (router)
```

## 🌎 Los 7 mundos

| Mundo | Tipo | Contenido |
|---|---|---|
| 🌎 Idiomas | especial | Inglés 🇬🇧 / Portugués 🇧🇷 / Francés 🇫🇷 — flashcards con audio + quiz |
| 🔢 Matemáticas | 5 niveles | contar, sumar, restar, multiplicar, dividir, problemas, series |
| 🔬 Ciencia | 8 categorías | animales, espacio, dinosaurios, cuerpo, plantas, océanos, tierra, naturaleza |
| 🎮 Juegos | 4 minijuegos | memoria, secuencias, el diferente, cálculo rápido |
| 🎨 Creatividad | canvas | dibujar, colores, grosor de pincel, borrar, limpiar |
| 💰 Dinero | 5 niveles | monedas, comprar, vuelto, ahorrar, presupuesto, necesidades/deseos |
| 🌱 Mundo Verde | 5 niveles | reciclaje, agua, energía, plantas, contaminación |

## ⭐ Sistema de recompensas

- Respuesta correcta: **+10 ⭐** · Completar nivel: **+50 ⭐** · Ganar minijuego: **+20 ⭐**
- 11 medallas desbloqueables (visibles en el perfil 👤)
- Niveles desbloqueables con 60% de aciertos
- Todo se guarda en `localStorage`

## 🔧 Cómo agregar contenido nuevo

**Agregar preguntas a un mundo existente:** editá los bancos/generadores en `js/mundos.js`.
**Agregar un mundo nuevo:** agregalo al array `MUNDOS` en `mundos.js` y su fuente de preguntas. No hay que tocar el motor ni la navegación.
**Agregar un minijuego:** creá una función en `minijuegos.js`, agregalo a `LISTA` y llamalo desde `iniciar()`. Usa `ganarJuego(nombre, emoji)` para la celebración y los puntos.

## 🔊 Sonidos

Efectos generados con WebAudio (sin archivos). Pronunciación de idiomas con la voz del sistema. Botón 🔊 en la barra superior para silenciar.
