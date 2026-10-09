/* ============================================================
   lengua-sociales.js — Mundos de Lengua y Ciencias Sociales
   Se registran en EK.DATOS.lengua y EK.DATOS.sociales.
   ============================================================ */
(function () {
  'use strict';
  var q = function (p, c, opts) { return { pregunta: p, opciones: opts.slice().sort(function(){return Math.random()-0.5;}), correcta: String(c) }; };

  var LENGUA = {
    '🔤 Vocales y letras': [
      q('¿Cuántas vocales hay?','5',['5','3','7']),
      q('¿Cuál de estas es una vocal?','A',['A','B','C']),
      q('¿Con qué letra empieza "casa"?','C',['C','S','K']),
      q('¿Con qué letra empieza "sol"?','S',['S','C','Z']),
      q('¿Cuál NO es una vocal?','M',['M','A','O']),
      q('¿Con qué letra termina "casa"?','A',['A','O','S'])
    ],
    '✂️ Sílabas': [
      q('¿Cuántas sílabas tiene "casa"?','2',['2','3','4']),
      q('¿Cuántas sílabas tiene "pelota"?','3',['3','2','4']),
      q('¿Cómo se separa "ca-sa"?','ca-sa',['ca-sa','cas-a','c-asa']),
      q('¿Cuántas sílabas tiene "zapato"?','3',['3','2','4']),
      q('¿Una palabra de una sílaba se llama...','Monosílaba',['Monosílaba','Polisílaba','Larga']),
      q('¿Cuántas sílabas tiene "mariposa"?','4',['4','3','5'])
    ],
    '✏️ Acentuación': [
      q('¿Dónde lleva el acento "café"?','En la última sílaba (aguda)',['En la última sílaba (aguda)','En la penúltima','No lleva']),
      q('¿"Árbol" es una palabra...','Esdrújula',['Esdrújula','Aguda','Grave']),
      q('¿Las palabras agudas llevan tilde cuando terminan en...','n, s o vocal',['n, s o vocal','consonante fuerte','siempre']),
      q('¿"Cantó" lleva tilde? ¿Por qué?','Sí, es aguda terminada en vocal',['Sí, es aguda terminada en vocal','No lleva','Es esdrújula']),
      q('¿"Música" es...','Esdrújula',['Esdrújula','Aguda','Grave sin tilde'])
    ],
    '📝 Oraciones': [
      q('¿Cómo empieza una oración?','Con mayúscula',['Con mayúscula','Con coma','Con punto']),
      q('¿Cómo termina una oración?','Con punto',['Con punto','Con coma','Con dos puntos']),
      q('¿Qué signo se usa en una pregunta?','¿ ?',['¿ ?','¡ !','. ,']),
      q('¿Qué signo muestra alegría o sorpresa?','¡ !',['¡ !','¿ ?','. .']),
      q('¿Una oración debe tener siempre...','Un verbo y sentido completo',['Un verbo y sentido completo','Solo sustantivos','Muchas comas'])
    ],
    '🔄 Sinónimos y antónimos': [
      q('Sinónimo de "grande"','Enorme',['Enorme','Chico','Mediano']),
      q('Antónimo de "grande"','Chico',['Chico','Enorme','Alto']),
      q('Sinónimo de "feliz"','Contento',['Contento','Triste','Enojado']),
      q('Antónimo de "feliz"','Triste',['Triste','Contento','Alegre']),
      q('Sinónimo de "rápido"','Veloz',['Veloz','Lento','Parado']),
      q('Antónimo de "claro" (difícil de entender)','Oscuro / confuso',['Oscuro / confuso','Transparente','Luminoso'])
    ],
    '🎵 Rimas': [
      q('¿Qué palabra rima con "casa"?','Raza',['Raza','Perro','Árbol']),
      q('¿Qué palabra rima con "sol"?','Col',['Col','Luna','Mar']),
      q('¿Qué palabra rima con "flor"?','Color',['Color','Piedra','Río']),
      q('¿Riman "gato" y "pato"?','Sí, riman',['Sí, riman','No riman','Son iguales'])
    ]
  };

  var SOCIALES = {
    '👷 Oficios y profesiones': [
      q('¿Quién cura a los enfermos?','Médico',['Médico','Carpintero','Policía']),
      q('¿Quién enseña en la escuela?','Docente / Maestro',['Docente / Maestro','Panadero','Piloto']),
      q('¿Quién cuida la seguridad y el orden?','Policía',['Policía','Músico','Pintor']),
      q('¿Quién cocina el pan?','Panadero',['Panadero','Carnicero','Pescador']),
      q('¿Quién construye casas?','Carpintero / albañil',['Carpintero / albañil','Doctor','Profesor']),
      q('¿Quién apaga incendios y rescata?','Bombero',['Bombero','Cartero','Cocinero'])
    ],
    '🏘️ Comunidad': [
      q('¿Qué es una comunidad?','Un grupo de personas que comparten lugar',['Un grupo de personas que comparten lugar','Un solo edificio','Un país entero']),
      q('¿Qué debemos hacer en comunidad?','Respetar y ayudar',['Respetar y ayudar','Solo cuidar lo nuestro','No hablar con nadie']),
      q('¿Quiénes forman una comunidad escolar?','Alumnos, docentes y familias',['Alumnos, docentes y familias','Solo los alumnos','Solo el director']),
      q('¿Qué es una norma?','Una regla que todos cumplimos',['Una regla que todos cumplimos','Un castigo','Un juego'])
    ],
    '🇦🇷 Símbolos nacionales': [
      q('¿Cuáles son los colores de la bandera argentina?','Celeste y blanco',['Celeste y blanco','Rojo y azul','Verde y amarillo']),
      q('¿Qué hay en el centro de la bandera?','El Sol de Mayo',['El Sol de Mayo','Una estrella','Un escudo']),
      q('¿Qué flor es el símbolo nacional?','Ceibo',['Ceibo','Rosa','Girasol']),
      q('¿Qué animal está en el escudo?','No hay animal (gorro frigio y brazos)',['No hay animal (gorro frigio y brazos)','Un león','Un águila']),
      q('¿Qué es la escarapela?','Distintivo celeste y blanco',['Distintivo celeste y blanco','Una moneda','Un baile']),
      q('¿Quién escribió el Himno Nacional?','Vicente López y Planes (letra)',['Vicente López y Planes (letra)','San Martín','Belgrano'])
    ],
    '⭐ Fechas patrias': [
      q('¿Qué se celebra el 25 de Mayo?','La Revolución de Mayo',['La Revolución de Mayo','La Independencia','La bandera']),
      q('¿Qué se celebra el 9 de Julio?','La Independencia',['La Independencia','La Revolución de Mayo','El día del niño']),
      q('¿En qué año se declaró la Independencia?','1816',['1816','1810','1900']),
      q('¿Quién creó la bandera argentina?','Manuel Belgrano',['Manuel Belgrano','San Martín','Sarmiento']),
      q('¿Dónde se declaró la Independencia?','Tucumán',['Tucumán','Buenos Aires','Córdoba']),
      q('¿Qué se celebra el 20 de Junio?','Día de la Bandera',['Día de la Bandera','Día de la Independencia','Día del Maestro'])
    ],
    '⚖️ Derechos de los niños': [
      q('¿Todos los niños tienen derecho a...','Estudiar',['Estudiar','Trabajar','No jugar']),
      q('¿Los niños deben ser respetados sin importar...','Su origen, color o religión',['Su origen, color o religión','Solo su nombre','Su altura']),
      q('¿Qué derecho tienen todos los niños?','A la salud y la educación',['A la salud y la educación','A no estudiar','A hacer lo que quieran sin reglas']),
      q('¿Quiénes deben cuidar a los niños?','Adultos responsables (familia, estado)',['Adultos responsables (familia, estado)','Solo ellos mismos','Nadie'])
    ]
  };

  window.EK = window.EK || {};
  EK.DATOS = EK.DATOS || {};
  EK.DATOS.lengua = LENGUA;
  EK.DATOS.sociales = SOCIALES;
})();
