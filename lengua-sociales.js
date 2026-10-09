/* ============================================================
   lengua-sociales.js — Mundos de Lengua y Ciencias Sociales
   VERSIÓN ULTRA PREMIUM (Primaria y Secundaria)
   Abarca ortografía, gramática (verbos, adjetivos, oraciones), 
   comprensión y todo el contenido de Sociales (profesiones y patriotas).
   ============================================================ */
(function () {
  'use strict';
  var q = function (p, c, opts) { return { pregunta: p, opciones: opts.slice().sort(function(){return Math.random()-0.5;}), correcta: String(c) }; };

  var LENGUA = {
    '🔤 Vocales, Consonantes y Abecedario': [
      q('¿Cuántas vocales hay en el abecedario?','5',['5','3','7']),
      q('¿Cuál de estas es una vocal?','A',['A','B','C']),
      q('¿Con qué letra empieza la palabra "casa"?','C',['C','S','K']),
      q('¿Cuál de estas letras NO es una vocal?','M',['M','A','O']),
      q('¿Cuántas letras tiene el abecedario español?','27',['27','24','30']),
      q('¿Qué letra viene después de la "M" en el abecedario?','N',['N','L','O']),
      q('¿Cuál es la última letra del abecedario?','Z',['Z','X','Y'])
    ],
    '✂️ Sílabas y Clasificación': [
      q('¿Cuántas sílabas tiene la palabra "casa"?','2 (ca-sa)',['2 (ca-sa)','3','4']),
      q('¿Cómo se separa en sílabas "pelota"?','pe-lo-ta',['pe-lo-ta','pel-ota','pelo-ta']),
      q('¿Cómo se llama una palabra que tiene una sola sílaba (ej: sol)?','Monosílaba',['Monosílaba','Bisílaba','Polisílaba']),
      q('¿Cómo se llama una palabra de dos sílabas (ej: mesa)?','Bisílaba',['Bisílaba','Monosílaba','Trisílaba']),
      q('¿Cómo se separa la palabra "computadora"?','com-pu-ta-do-ra',['com-pu-ta-do-ra','compu-tadora','co-mpu-ta-dor-a']),
      q('¿Qué es la sílaba tónica?','La que suena más fuerte',['La que suena más fuerte','La primera sílaba','La última sílaba'])
    ],
    '✏️ Acentuación y Reglas Ortográficas': [
      q('¿Dónde lleva el acento (sílaba tónica) la palabra "café"?','En la última sílaba (aguda)',['En la última sílaba (aguda)','En la penúltima','No lleva']),
      q('Las palabras agudas llevan tilde (acento escrito) cuando terminan en...','N, S o Vocal',['N, S o Vocal','Cualquier consonante','M o P']),
      q('¿Qué tipo de palabra es "Árbol"?','Grave',['Grave','Aguda','Esdrújula']),
      q('¿Qué tipo de palabra es "Música"?','Esdrújula',['Esdrújula','Aguda','Grave']),
      q('¿Las palabras esdrújulas llevan tilde?','Sí, SIEMPRE llevan tilde',['Sí, SIEMPRE llevan tilde','A veces','Nunca llevan']),
      q('¿Por qué "corazón" lleva tilde?','Porque es aguda y termina en N',['Porque es aguda y termina en N','Porque es grave','Porque es larga']),
      q('¿Cuál está escrita correctamente?','Hielo',['Hielo','Ielo','Hielo con y'])
    ],
    '🧱 Sustantivos y Adjetivos': [
      q('¿Qué es un Sustantivo?','Una palabra que nombra cosas, animales o personas',['Una palabra que nombra cosas, animales o personas','Una palabra que indica acción','Una palabra que describe']),
      q('¿Qué es un Adjetivo?','Una palabra que describe cómo es el sustantivo',['Una palabra que describe cómo es el sustantivo','Una acción','Un lugar']),
      q('En "El perro negro", ¿cuál es el Adjetivo?','negro',['negro','perro','El']),
      q('¿Qué tipo de sustantivo es "Juan" o "Argentina"?','Sustantivo Propio',['Sustantivo Propio','Sustantivo Común','Sustantivo Colectivo']),
      q('En "La casa es muy grande", ¿cuál es el sustantivo?','casa',['casa','grande','La']),
      q('¿Qué género y número tiene "Las niñas"?','Femenino y Plural',['Femenino y Plural','Femenino y Singular','Masculino y Plural'])
    ],
    '🏃 Verbos y Tiempos Verbales': [
      q('¿Qué es un Verbo?','Una palabra que indica acción o estado',['Una palabra que indica acción o estado','Un nombre propio','Un color']),
      q('En la oración "El gato salta alto", ¿cuál es el verbo?','salta',['salta','gato','alto']),
      q('¿En qué tiempo está el verbo "Yo comí"?','Pasado (Pretérito)',['Pasado (Pretérito)','Presente','Futuro']),
      q('¿En qué tiempo está el verbo "Ellos jugarán"?','Futuro',['Futuro','Presente','Pasado']),
      q('¿Cuál es el infinitivo del verbo "corriendo"?','Correr',['Correr','Corrí','Correrá']),
      q('¿Cuáles son las terminaciones de los verbos en infinitivo?','-ar, -er, -ir',['-ar, -er, -ir','-ando, -iendo','-ado, -ido'])
    ],
    '📝 Oraciones y Puntuación': [
      q('¿Cómo debe empezar SIEMPRE una oración?','Con letra Mayúscula',['Con letra Mayúscula','Con minúscula','Con una coma']),
      q('¿Cómo termina SIEMPRE una oración afirmativa o negativa?','Con un Punto',['Con un Punto','Con una Coma','Sin nada']),
      q('¿Qué signos se usan para hacer una pregunta?','¿ ?',['¿ ?','¡ !','. ,']),
      q('¿Qué signos muestran emoción, alegría o sorpresa?','¡ !',['¡ !','¿ ?','- -']),
      q('¿Para qué sirve la Coma ( , )?','Para hacer una pausa breve en la lectura',['Para hacer una pausa breve en la lectura','Para terminar el texto','Para gritar']),
      q('Identifica el sujeto en: "El pájaro canta en la rama".','El pájaro',['El pájaro','canta','en la rama'])
    ],
    '🔄 Sinónimos, Antónimos y Homónimos': [
      q('¿Qué es un Sinónimo?','Palabras que significan lo mismo o parecido',['Palabras que significan lo mismo o parecido','Palabras que significan lo contrario','Palabras que suenan igual']),
      q('¿Cuál es un Sinónimo de "feliz"?','Contento',['Contento','Triste','Enojado']),
      q('¿Qué es un Antónimo?','Palabras que significan lo contrario',['Palabras que significan lo contrario','Palabras iguales','Palabras en otro idioma']),
      q('¿Cuál es el Antónimo de "rápido"?','Lento',['Lento','Veloz','Correr']),
      q('¿Cuál es el Antónimo de "oscuro"?','Claro / Luminoso',['Claro / Luminoso','Negro','Tarde']),
      q('¿Qué significa "banco" (asiento) y "banco" (de dinero)?','Son palabras homónimas (se escriben igual, distinto significado)',['Son palabras homónimas (se escriben igual, distinto significado)','Son sinónimos','Son antónimos'])
    ],
    '🎵 Rimas y Poesía': [
      q('¿Qué palabra rima con "casa"?','Masa',['Masa','Perro','Árbol']),
      q('¿Qué palabra rima con "corazón"?','Canción',['Canción','Luna','Mar']),
      q('¿Qué palabra rima con "flor"?','Color',['Color','Piedra','Río']),
      q('¿Qué es una estrofa?','Un grupo de versos en un poema',['Un grupo de versos en un poema','Un cuento largo','Una noticia']),
      q('Si "gato" rima con "zapato", es porque terminan en...','-ato',['-ato','-ga','-to'])
    ]
  };

  var SOCIALES = {
    '👷 Oficios y Profesiones': [
      q('¿Quién cura a los enfermos y trabaja en un hospital?','El Médico',['El Médico','El Carpintero','El Policía']),
      q('¿Quién enseña en la escuela a los alumnos?','El Docente / Maestro',['El Docente / Maestro','El Panadero','El Piloto']),
      q('¿Quién cuida la seguridad de los ciudadanos en la calle?','El Policía',['El Policía','El Músico','El Pintor']),
      q('¿Quién amasa y cocina el pan?','El Panadero',['El Panadero','El Carnicero','El Pescador']),
      q('¿Quién construye casas con ladrillos y cemento?','El Albañil',['El Albañil','El Doctor','El Profesor']),
      q('¿Quién apaga incendios y rescata personas?','El Bombero',['El Bombero','El Cartero','El Cocinero'])
    ],
    '🏘️ Mi Comunidad y Normas': [
      q('¿Qué es una comunidad?','Un grupo de personas que conviven en un mismo lugar',['Un grupo de personas que conviven en un mismo lugar','Un edificio vacío','Una persona sola']),
      q('¿Qué debemos hacer para vivir bien en comunidad?','Respetar a los demás y ayudar',['Respetar a los demás y ayudar','Pelear','No hablar con nadie']),
      q('¿Quiénes forman la comunidad escolar?','Alumnos, docentes, directivos y familias',['Alumnos, docentes, directivos y familias','Solo los alumnos','Solo el director']),
      q('¿Qué es una norma o regla de convivencia?','Un acuerdo para respetarnos y organizarnos',['Un acuerdo para respetarnos y organizarnos','Un castigo','Un juego de mesa']),
      q('¿Qué significa reciclar en nuestra comunidad?','Separar la basura para reutilizar materiales',['Separar la basura para reutilizar materiales','Tirar basura a la calle','Quemar la basura'])
    ],
    '🇦🇷 Símbolos Nacionales': [
      q('¿Cuáles son los colores de la bandera argentina?','Celeste y blanco',['Celeste y blanco','Rojo y azul','Verde y amarillo']),
      q('¿Qué dibujo tiene en el centro la bandera de ceremonia?','El Sol de Mayo',['El Sol de Mayo','Una estrella','Un escudo']),
      q('¿Qué flor es considerada nuestro símbolo nacional?','El Ceibo',['El Ceibo','La Rosa','El Girasol']),
      q('¿Qué es la escarapela?','Un distintivo celeste y blanco que se lleva en el pecho',['Un distintivo celeste y blanco que se lleva en el pecho','Una moneda','Un baile típico']),
      q('¿Quién escribió la letra del Himno Nacional Argentino?','Vicente López y Planes',['Vicente López y Planes','San Martín','Belgrano']),
      q('En el Escudo Nacional, ¿qué sostienen las manos entrelazadas?','Una pica con un gorro frigio',['Una pica con un gorro frigio','Una espada','Un sol de oro'])
    ],
    '⭐ Fechas Patrias e Historia': [
      q('¿Qué gran evento ocurrió el 25 de Mayo de 1810?','La Revolución de Mayo (Primer Gobierno Patrio)',['La Revolución de Mayo (Primer Gobierno Patrio)','La Independencia','La creación de la bandera']),
      q('¿Qué celebramos el 9 de Julio?','La Declaración de la Independencia (1816)',['La Declaración de la Independencia (1816)','La Revolución de Mayo','El día del niño']),
      q('¿Dónde se firmó la Declaración de la Independencia?','En la Casa Histórica de Tucumán',['En la Casa Histórica de Tucumán','En el Cabildo de Buenos Aires','En Córdoba']),
      q('¿Quién creó la bandera argentina a orillas del Río Paraná?','Manuel Belgrano',['Manuel Belgrano','José de San Martín','Domingo F. Sarmiento']),
      q('¿Qué se celebra el 20 de Junio?','El Día de la Bandera (fallecimiento de Belgrano)',['El Día de la Bandera (fallecimiento de Belgrano)','Día de la Independencia','Día del Maestro']),
      q('¿Qué prócer cruzó la Cordillera de los Andes para liberar tres países?','José de San Martín',['José de San Martín','Martín Miguel de Güemes','Mariano Moreno'])
    ],
    '⚖️ Derechos de los Niños': [
      q('¿A qué tienen derecho TODOS los niños del mundo?','A jugar, ir a la escuela y tener salud',['A jugar, ir a la escuela y tener salud','A trabajar en fábricas','A vivir solos en la calle']),
      q('¿Los niños deben ser respetados sin importar...','Su origen, color de piel, religión o género',['Su origen, color de piel, religión o género','Solo su nombre','Su altura y peso']),
      q('¿Quiénes son los principales encargados de cuidar y proteger a los niños?','Los adultos (familia, maestros y el Estado)',['Los adultos (familia, maestros y el Estado)','Solo ellos mismos','Nadie, se cuidan solos']),
      q('¿Qué derecho te protege si te enfermas?','El derecho a recibir atención médica y vacunas',['El derecho a recibir atención médica y vacunas','El derecho a jugar','El derecho a un nombre']),
      q('Si alguien le hace daño a un niño (física o emocionalmente), ¿qué debe hacer?','Contarle inmediatamente a un adulto de confianza',['Contarle inmediatamente a un adulto de confianza','Guardar el secreto','Llorar a solas'])
    ]
  };

  window.EK = window.EK || {};
  EK.DATOS = EK.DATOS || {};
  EK.DATOS.lengua = LENGUA;
  EK.DATOS.sociales = SOCIALES;
})();
