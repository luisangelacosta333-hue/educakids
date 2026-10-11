/* ============================================================
   lengua-sociales.js — Mundos de Lengua y Ciencias Sociales
   VERSIÓN ULTRA PREMIUM (Primaria y Secundaria)
   ------------------------------------------------------------
   Mantiene 100% la API original:
     - EK.DATOS.lengua   -> { "Categoría": [ {pregunta, opciones, correcta}, ... ] }
     - EK.DATOS.sociales -> idem
     - correcta es SIEMPRE un string idéntico a una de las opciones.
   EXTRA (nuevo, aditivo, no rompe el engine):
     - EK.LECCIONES -> { clave: { titulo, texto } } listo para narrar con voz.js
   ============================================================ */
(function () {
  'use strict';

  var q = function (p, c, opts) {
    return {
      pregunta: p,
      opciones: opts.slice().sort(function () { return Math.random() - 0.5; }),
      correcta: String(c)
    };
  };

  /* ============================================================
     LENGUA — 22 categorías, ~10 preguntas cada una
     ============================================================ */
  var LENGUA = {

    '🔤 Vocales, Consonantes y Abecedario': [
      q('¿Cuántas vocales hay en el abecedario español?','5',['5','3','7']),
      q('¿Cuál de estas letras es una vocal?','A',['A','B','C']),
      q('¿Cuál de estas letras NO es una vocal?','M',['M','A','O']),
      q('¿Con qué letra empieza la palabra "casa"?','C',['C','S','K']),
      q('¿Cuántas letras tiene el abecedario español?','27',['27','24','30']),
      q('¿Qué letra viene después de la "M" en el abecedario?','N',['N','L','O']),
      q('¿Cuál es la última letra del abecedario?','Z',['Z','X','Y']),
      q('¿Cómo se llama la letra "Ñ" (con virgulilla)?','Eñe',['Eñe','Ene con acento','I griega']),
      q('¿Cuántas consonantes hay en el abecedario español?','22',['22','27','5']),
      q('¿Qué letra hay entre la "P" y la "R"?','Q',['Q','O','S']),
      q('¿Cuál de estas palabras empieza con consonante?','Sol',['Sol','Agua','Elefante']),
      q('¿Cómo se llama el conjunto ordenado de todas las letras?','Abecedario o alfabeto',['Abecedario o alfabeto','Silabario','Diccionario'])
    ],

    '✂️ Sílabas y Clasificación': [
      q('¿Cuántas sílabas tiene la palabra "casa"?','2 (ca-sa)',['2 (ca-sa)','3','4']),
      q('¿Cómo se separa en sílabas "pelota"?','pe-lo-ta',['pe-lo-ta','pel-ota','pelo-ta']),
      q('¿Cómo se llama una palabra de una sola sílaba (ej: sol)?','Monosílaba',['Monosílaba','Bisílaba','Polisílaba']),
      q('¿Cómo se llama una palabra de dos sílabas (ej: mesa)?','Bisílaba',['Bisílaba','Monosílaba','Trisílaba']),
      q('¿Cómo se separa "computadora"?','com-pu-ta-do-ra',['com-pu-ta-do-ra','compu-tadora','co-mpu-ta-dor-a']),
      q('¿Qué es la sílaba tónica?','La que suena más fuerte',['La que suena más fuerte','La primera sílaba','La última sílaba']),
      q('¿Qué es una palabra polisílaba?','Tiene cuatro o más sílabas',['Tiene cuatro o más sílabas','Tiene una sola sílaba','Tiene exactamente tres sílabas']),
      q('¿Cuántas sílabas tiene "sol"?','1',['1','2','3']),
      q('¿Cómo se separa la palabra "helado"?','he-la-do',['he-la-do','he-lado','hel-a-do']),
      q('¿Qué nombre recibe la sílaba que NO suena fuerte?','Sílaba átona',['Sílaba átona','Sílaba tónica','Sílaba muda']),
      q('¿Cómo se separa "árbol"?','ár-bol',['ár-bol','a-rbol','ar-ból']),
      q('Una palabra de tres sílabas (ej: zapato) se llama...','Trisílaba',['Trisílaba','Bisílaba','Monosílaba'])
    ],

    '✏️ Acentuación y Reglas Ortográficas': [
      q('¿Dónde lleva la sílaba tónica la palabra "café"?','En la última sílaba (es aguda)',['En la última sílaba (es aguda)','En la penúltima','No tiene sílaba tónica']),
      q('Las palabras agudas llevan tilde cuando terminan en...','N, S o vocal',['N, S o vocal','Cualquier consonante','M o P']),
      q('¿Qué tipo de palabra es "árbol"?','Grave (llana)',['Grave (llana)','Aguda','Esdrújula']),
      q('¿Qué tipo de palabra es "música"?','Esdrújula',['Esdrújula','Aguda','Grave']),
      q('¿Las palabras esdrújulas llevan tilde?','Sí, SIEMPRE llevan tilde',['Sí, SIEMPRE llevan tilde','A veces','Nunca llevan tilde']),
      q('¿Por qué "corazón" lleva tilde?','Porque es aguda y termina en N',['Porque es aguda y termina en N','Porque es grave','Porque es muy larga']),
      q('¿Cuál está escrita correctamente?','Hielo',['Hielo','Ielo','Yelo']),
      q('Las palabras graves (llanas) llevan tilde cuando...','NO terminan en N, S o vocal',['NO terminan en N, S o vocal','Terminan en N, S o vocal','Siempre llevan tilde']),
      q('¿Qué tipo de palabra es "teléfono"?','Esdrújula',['Esdrújula','Aguda','Grave']),
      q('¿Cuál de estas palabras es aguda?','Camión',['Camión','Lápiz','Médico']),
      q('¿Qué es la tilde?','El acento escrito ( ´ ) sobre una vocal',['El acento escrito ( ´ ) sobre una vocal','Un signo de interrogación','La sílaba más fuerte']),
      q('¿Qué palabra está bien acentuada?','Pájaro',['Pájaro','Pajaro','Pajáro'])
    ],

    '🧱 Sustantivos y Adjetivos': [
      q('¿Qué es un sustantivo?','La palabra que nombra personas, animales, cosas o lugares',['La palabra que nombra personas, animales, cosas o lugares','La palabra que indica acción','La palabra que describe']),
      q('¿Qué es un adjetivo?','La palabra que describe cómo es el sustantivo',['La palabra que describe cómo es el sustantivo','Una acción','Un lugar']),
      q('En "El perro negro", ¿cuál es el adjetivo?','negro',['negro','perro','El']),
      q('¿Qué tipo de sustantivo son "Juan" o "Argentina"?','Sustantivo propio',['Sustantivo propio','Sustantivo común','Sustantivo colectivo']),
      q('En "La casa es muy grande", ¿cuál es el sustantivo?','casa',['casa','grande','La']),
      q('¿Qué género y número tiene "las niñas"?','Femenino y plural',['Femenino y plural','Femenino y singular','Masculino y plural']),
      q('¿Qué es un sustantivo colectivo?','Nombra un grupo (ej: manada, rebaño, flota)',['Nombra un grupo (ej: manada, rebaño, flota)','Nombra una persona','Nombra un lugar']),
      q('¿Cuál es el plural de "flor"?','Flores',['Flores','Floras','Florces']),
      q('¿Cuál de estos es un adjetivo?','Alto',['Alto','Árbol','Correr']),
      q('¿Qué sustantivo es común (no propio)?','perro',['perro','Rex','Buenos Aires']),
      q('El aumentativo de "casa" es...','Casona',['Casona','Casita','Casucha']),
      q('El diminutivo de "perro" es...','Perrito',['Perrito','Perrote','Perrazo'])
    ],

    '🏃 Verbos y Tiempos Verbales': [
      q('¿Qué es un verbo?','La palabra que indica acción, movimiento o estado',['La palabra que indica acción, movimiento o estado','Un nombre propio','Un color']),
      q('En "El gato salta alto", ¿cuál es el verbo?','salta',['salta','gato','alto']),
      q('¿En qué tiempo está "Yo comí"?','Pasado (pretérito perfecto simple)',['Pasado (pretérito perfecto simple)','Presente','Futuro']),
      q('¿En qué tiempo está "Ellos jugarán"?','Futuro',['Futuro','Presente','Pasado']),
      q('¿Cuál es el infinitivo de "corriendo"?','Correr',['Correr','Corrí','Correrá']),
      q('¿Cuáles son las terminaciones de los verbos en infinitivo?','-ar, -er, -ir',['-ar, -er, -ir','-ando, -iendo','-ado, -ido']),
      q('¿Qué terminación tiene el gerundio?','-ando (verbos en -ar) y -iendo (-er/-ir)',['-ando (verbos en -ar) y -iendo (-er/-ir)','-ado, -ido','-é, -iste, -ió']),
      q('¿Qué terminación tiene el participio?','-ado (verbos en -ar) e -ido (-er/-ir)',['-ado (verbos en -ar) e -ido (-er/-ir)','-ando, -iendo','-o, -as, -a']),
      q('¿En qué tiempo está "Nosotros cantamos"?','Presente (o pretérito, según contexto)',['Presente (o pretérito, según contexto)','Futuro','Imposible']),
      q('¿Cuál es la persona "yo" del verbo "hablar" en presente?','Hablo',['Hablo','Hablas','Habla']),
      q('¿Qué verbo está en futuro?','Comeré',['Comeré','Como','Comí']),
      q('¿Qué tiempo expresa una acción que está pasando AHORA?','Presente',['Presente','Futuro','Pretérito'])
    ],

    '📝 Oraciones y Puntuación': [
      q('¿Con qué debe empezar SIEMPRE una oración?','Con letra mayúscula',['Con letra mayúscula','Con minúscula','Con una coma']),
      q('¿Cómo termina una oración afirmativa o negativa?','Con un punto',['Con un punto','Con una coma','Sin ningún signo']),
      q('¿Qué signos se usan para una pregunta?','¿ ?',['¿ ?','¡ !','. ,']),
      q('¿Qué signos muestran alegría, sorpresa o emoción?','¡ !',['¡ !','¿ ?','- -']),
      q('¿Para qué sirve la coma ( , )?','Para hacer una pausa breve',['Para hacer una pausa breve','Para terminar el texto','Para gritar']),
      q('Identifica el sujeto en: "El pájaro canta en la rama".','El pájaro',['El pájaro','canta','en la rama']),
      q('¿Qué signo se usa antes de una enumeración o una cita?','Dos puntos ( : )',['Dos puntos ( : )','Punto y coma ( ; )','Guion ( - )']),
      q('¿Qué indican los puntos suspensivos ( ... )?','Una pausa larga o que algo queda sin decir',['Una pausa larga o que algo queda sin decir','Que el texto terminó bien','Una pregunta']),
      q('¿Qué signo separa oraciones relacionadas sin usar el punto?','Punto y coma ( ; )',['Punto y coma ( ; )','Coma ( , )','Interrogación ( ? )']),
      q('¿Cuándo se usan mayúsculas en los nombres?','En nombres propios de personas, países o ciudades',['En nombres propios de personas, países o ciudades','En cualquier sustantivo','Nunca se usan mayúsculas']),
      q('¿Qué falta en: "maría fue al parque"?','Mayúscula inicial en María',['Mayúscula inicial en María','Un punto al final','Una coma']),
      q('¿Qué signo encierra una aclaración dentro de una oración?','Paréntesis ( )',['Paréntesis ( )','Dos puntos :','Raya —'])
    ],

    '🔄 Sinónimos, Antónimos y Homónimos': [
      q('¿Qué es un sinónimo?','Palabras que significan lo mismo o casi lo mismo',['Palabras que significan lo mismo o casi lo mismo','Palabras que significan lo contrario','Palabras que suenan igual']),
      q('¿Cuál es un sinónimo de "feliz"?','Contento',['Contento','Triste','Enojado']),
      q('¿Qué es un antónimo?','Palabra que significa lo contrario',['Palabra que significa lo contrario','Palabra igual','Palabra en otro idioma']),
      q('¿Cuál es el antónimo de "rápido"?','Lento',['Lento','Veloz','Correr']),
      q('¿Cuál es el antónimo de "oscuro"?','Claro',['Claro','Negro','Noche']),
      q('¿Qué son palabras homónimas?','Se pronuncian o escriben igual pero distinto significado',['Se pronuncian o escriben igual pero distinto significado','Son sinónimos','Son antónimos']),
      q('"Banco" (asiento) y "banco" (de dinero) son...','Palabras polisémicas (varios significados)',['Palabras polisémicas (varios significados)','Sinónimos','Antónimos']),
      q('¿Cuál es sinónimo de "grande"?','Enorme',['Enorme','Pequeño','Chico']),
      q('¿Cuál es antónimo de "subir"?','Bajar',['Bajar','Ascender','Trepar']),
      q('¿Qué son palabras parónimas?','Se parecen en sonido pero significan algo distinto (ej: afectar/efectar)',['Se parecen en sonido pero significan algo distinto (ej: afectar/efectar)','Significan lo mismo','Son siempre verbos']),
      q('"Hola" y "ola" (del mar) se pronuncian igual. Son...','Homófonas',['Homófonas','Sinónimas','Antónimas']),
      q('¿Cuál es sinónimo de "niño"?','Chico / infante',['Chico / infante','Adulto','Viejo'])
    ],

    '🎵 Rimas y Poesía': [
      q('¿Qué palabra rima con "casa"?','Masa',['Masa','Perro','Árbol']),
      q('¿Qué palabra rima con "corazón"?','Canción',['Canción','Luna','Mar']),
      q('¿Qué palabra rima con "flor"?','Color',['Color','Piedra','Río']),
      q('¿Qué es una estrofa?','Un grupo de versos en un poema',['Un grupo de versos en un poema','Un cuento largo','Una noticia']),
      q('Si "gato" rima con "zapato", es porque terminan en...','-ato',['-ato','-ga','-to']),
      q('¿Qué es un verso?','Cada línea de un poema',['Cada línea de un poema','Un grupo de estrofas','La rima final']),
      q('¿Qué es la rima?','La repetición de sonidos al final de los versos',['La repetición de sonidos al final de los versos','El título del poema','El autor del poema']),
      q('¿Cómo se llama la poesía que no rima?','Verso libre',['Verso libre','Prosa','Fábula']),
      q('¿Cuál de estas palabras rima con "luz"?','Cruz',['Cruz','Luna','Sol']),
      q('¿Qué es un poeta?','La persona que escribe poemas',['La persona que escribe poemas','La persona que pinta','La persona que canta'])
    ],

    '📖 Narración: Cuentos, Fábulas y Leyendas': [
      q('¿Qué es una narración?','Un texto que cuenta una historia con personajes y hechos',['Un texto que cuenta una historia con personajes y hechos','Una lista de palabras','Una descripción de un paisaje']),
      q('¿Cuáles son las tres partes de toda narración?','Planteamiento, nudo y desenlace',['Planteamiento, nudo y desenlace','Título, autor y editorial','Introducción, resumen y final']),
      q('¿En qué parte se presenta el conflicto o problema principal?','En el nudo (desarrollo)',['En el nudo (desarrollo)','En el planteamiento','En el desenlace']),
      q('¿Cómo se llama el personaje principal de la historia?','Protagonista',['Protagonista','Antagonista','Narrador']),
      q('¿Cómo se llama el personaje que se opone al protagonista?','Antagonista',['Antagonista','Narrador','Autor']),
      q('¿Qué es el narrador?','La persona que cuenta la historia',['La persona que cuenta la historia','El personaje malo','El lugar donde pasa todo']),
      q('Si el narrador es un personaje y dice "yo", cuenta en...','Primera persona',['Primera persona','Tercera persona','Segunda persona']),
      q('Si el narrador lo sabe todo (hasta lo que piensan los personajes), es...','Omnisciente',['Omnisciente','Testigo','Protagonista']),
      q('¿Qué es una fábula?','Un cuento corto con animales que termina con una moraleja',['Un cuento corto con animales que termina con una moraleja','Una noticia real','Un poema largo']),
      q('¿Qué es la moraleja de una fábula?','La enseñanza que deja la historia',['La enseñanza que deja la historia','El nombre del autor','El lugar donde ocurre']),
      q('¿Qué es una leyenda?','Un relato tradicional con elementos fantásticos, basado en algo real',['Un relato tradicional con elementos fantásticos, basado en algo real','Un hecho científico','Una receta de cocina']),
      q('¿En qué se diferencia un cuento de una novela?','El cuento es breve y con pocos personajes; la novela es larga',['El cuento es breve y con pocos personajes; la novela es larga','El cuento siempre es de miedo','La novela no tiene final'])
    ],

    '🎨 Descripción y Adjetivos Sensoriales': [
      q('¿Qué es una descripción?','Decir cómo es algo o alguien usando detalles',['Decir cómo es algo o alguien usando detalles','Contar una historia','Hacer una lista de compras']),
      q('¿Qué tipo de palabras son fundamentales para describir?','Los adjetivos',['Los adjetivos','Los verbos','Los artículos']),
      q('¿Cómo se llama la descripción del cuerpo de una persona?','Prosopografía',['Prosopografía','Etopeya','Topografía']),
      q('¿Cómo se llama la descripción del carácter o personalidad?','Etopeya',['Etopeya','Prosopografía','Cronografía']),
      q('¿Qué es el "retrato" en una descripción?','Mezcla de lo físico y el carácter de una persona',['Mezcla de lo físico y el carácter de una persona','Solo describir el pelo','Describir un paisaje']),
      q('¿Cómo se llama la descripción de un lugar o paisaje?','Topografía',['Topografía','Etopeya','Prosopografía']),
      q('¿Qué sentidos se usan en una descripción sensorial?','Vista, oído, olfato, gusto y tacto',['Vista, oído, olfato, gusto y tacto','Solo la vista','Solo el oído']),
      q('"El sol brillante calentaba la arena suave y se oían las olas..." ¿qué tipo de texto es?','Descriptivo',['Descriptivo','Narrativo','Instructivo']),
      q('Una descripción técnica o científica se caracteriza por ser...','Objetiva y precisa, sin opiniones',['Objetiva y precisa, sin opiniones','Muy emotiva y colorida','Siempre en rima']),
      q('¿Cuál de estos adjetivos describe un sabor?','Dulce',['Dulce','Ruidoso','Rugoso']),
      q('¿Cuál de estos adjetivos describe el tacto?','Suave',['Suave','Amargo','Brillante']),
      q('¿Cuál describe un sonido?','Estridente',['Estridente','Ácido','Ovalado'])
    ],

    '📚 Tipos de Textos': [
      q('¿Qué tipo de texto cuenta hechos reales o ficticios con personajes?','Narrativo',['Narrativo','Descriptivo','Instructivo']),
      q('¿Qué tipo de texto explica cómo es algo o alguien?','Descriptivo',['Descriptivo','Narrativo','Poético']),
      q('¿Qué tipo de texto da pasos para hacer algo (ej: una receta)?','Instructivo o explicativo',['Instructivo o explicativo','Poético','Narrativo']),
      q('¿Qué tipo de texto informa sobre un hecho actual y real?','Noticia (informativo)',['Noticia (informativo)','Fábula','Poema']),
      q('¿Qué tipo de texto defiende una opinión con razones?','Argumentativo',['Argumentativo','Descriptivo','Carta']),
      q('¿Qué tipo de texto se escribe en verso y busca la belleza?','Poético',['Poético','Instructivo','Noticia']),
      q('Una receta de cocina es un texto...','Instructivo',['Instructivo','Poético','Argumentativo']),
      q('Un cuento de hadas es un texto...','Narrativo literario',['Narrativo literario','Informativo','Instructivo']),
      q('Una carta o un correo electrónico personal es un texto...','Epistolar (de comunicación entre personas)',['Epistolar (de comunicación entre personas)','Científico','Publicitario']),
      q('Un aviso que intenta vender un producto es un texto...','Publicitario',['Publicitario','Poético','Científico']),
      q('Un texto de un libro de Ciencias que explica el agua es...','Expositivo (informativo)',['Expositivo (informativo)','Narrativo','Poético']),
      q('¿Qué texto usa diálogos y se representa en un teatro?','Obra de teatro (dramático)',['Obra de teatro (dramático)','Receta','Noticia'])
    ],

    '🔍 Comprensión Lectora': [
      q('¿Qué debes hacer ANTES de leer un texto?','Mirar el título, las imágenes y predecir de qué trata',['Mirar el título, las imágenes y predecir de qué trata','Empezar a leer sin mirar nada','Saltar hasta el final']),
      q('¿Qué es la idea principal de un texto?','Lo más importante que dice el autor',['Lo más importante que dice el autor','El primer detalle','La última palabra']),
      q('¿Qué son las ideas secundarias?','Detalles que apoyan o explican la idea principal',['Detalles que apoyan o explican la idea principal','Lo más importante del texto','Los dibujos']),
      q('Si no entiendes una palabra, ¿qué puedes hacer?','Buscarla en el diccionario o seguir leyendo para adivinar por el contexto',['Buscarla en el diccionario o seguir leyendo para adivinar por el contexto','Dejar de leer para siempre','Borrar esa palabra']),
      q('¿Qué es leer de forma "literal"?','Entender exactamente lo que dice el texto',['Entender exactamente lo que dice el texto','Inventar lo que no dice','Solo mirar los dibujos']),
      q('¿Qué es "inferir" al leer?','Deducir algo que el texto no dice directamente, pero se entiende',['Deducir algo que el texto no dice directamente, pero se entiende','Copiar el texto','Memorizar nombres']),
      q('¿Qué estrategia ayuda a recordar lo leído?','Hacer un resumen o resumen con tus propias palabras',['Hacer un resumen o resumen con tus propias palabras','Leer lo más rápido posible','No parar nunca']),
      q('Si un texto dice "el cielo se puso gris y soplaba viento frío", puedes inferir que...','Va a llover',['Va a llover','Hace mucho calor','Es de noche']),
      q('¿Qué es un resumen?','Contar lo más importante con pocas palabras',['Contar lo más importante con pocas palabras','Copiar todo el texto','Escribir una opinión']),
      q('¿Qué pregunta NO te ayuda a comprender un cuento?','¿De qué color es la hoja del libro?',['¿De qué color es la hoja del libro?','¿Quién es el protagonista?','¿Qué problema tuvo?'])
    ],

    '🏷️ Artículos y Determinantes': [
      q('¿Qué es un artículo?','La palabra que va antes del sustantivo y señala género y número',['La palabra que va antes del sustantivo y señala género y número','Una acción','Un adjetivo']),
      q('¿Cuáles son los artículos determinados?','El, la, los, las, lo',['El, la, los, las, lo','Un, una, unos, unas','Mi, tu, su']),
      q('¿Cuáles son los artículos indeterminados?','Un, una, unos, unas',['Un, una, unos, unas','El, la, los, las','Este, ese, aquel']),
      q('En "la casa", ¿cuál es el artículo?','la',['la','casa','no hay artículo']),
      q('¿Qué artículo concuerda con "niños" (masculino plural)?','los',['los','la','una']),
      q('¿Qué artículo indeterminado concuerda con "manzana"?','una',['una','unos','el']),
      q('¿Qué son los demostrativos (este, ese, aquel)?','Determinantes que indican distancia o cercanía',['Determinantes que indican distancia o cercanía','Verbos','Adverbios']),
      q('¿Cuál de estos es un posesivo?','mi (mi casa)',['mi (mi casa)','el','un']),
      q('"Este libro" indica que el libro está...','Cerca de quien habla',['Cerca de quien habla','Muy lejos','En otro país']),
      q('"Aquel edificio" indica que está...','Muy lejos',['Muy lejos','Cerca','Aquí mismo']),
      q('¿Qué artículo usamos delante de "agua" (aunque es femenina)?','el (el agua)',['el (el agua)','la','los']),
      q('¿Cuál es el artículo neutro?','lo',['lo','la','unos'])
    ],

    '👤 Pronombres': [
      q('¿Qué es un pronombre?','La palabra que reemplaza al sustantivo para no repetirlo',['La palabra que reemplaza al sustantivo para no repetirlo','Una acción','Un adjetivo']),
      q('¿Cuál de estos es un pronombre personal?','Yo',['Yo','Casa','Grande']),
      q('¿Qué pronombre reemplaza a "María y Juan"?','Ellos',['Ellos','Él','Yo']),
      q('¿Qué pronombre reemplaza a "la pelota"?','la (la tengo)',['la (la tengo)','él','ellos']),
      q('¿Cuáles son pronombres posesivos?','mío, tuyo, suyo, nuestro',['mío, tuyo, suyo, nuestro','yo, tú, él','este, ese, aquel']),
      q('¿Cuáles son pronombres demostrativos?','este, ese, aquel',['este, ese, aquel','yo, tú, él','mío, tuyo']),
      q('¿Qué pronombre interrogativo usamos para preguntar por una persona?','¿quién?',['¿quién?','¿dónde?','¿cuándo?']),
      q('¿Qué pronombre interrogativo pregunta por un lugar?','¿dónde?',['¿dónde?','¿quién?','¿por qué?']),
      q('¿Qué pronombre relativo une oraciones (ej: el chico QUE vino)?','que',['que','muy','siempre']),
      q('¿Cuál es un pronombre indefinido?','alguien / algo / nadie',['alguien / algo / nadie','yo','este']),
      q('En Argentina es común usar "vos" en lugar de "tú". Esto se llama...','Voseo',['Voseo','Imperativo','Gerundio']),
      q('¿Qué pronombre de primera persona del plural reemplaza a "mi familia y yo"?','Nosotros',['Nosotros','Ellos','Vosotros'])
    ],

    '🔗 Conectores y Preposiciones': [
      q('¿Qué son los conectores?','Palabras que unen oraciones o ideas (y, pero, porque...)',['Palabras que unen oraciones o ideas (y, pero, porque...)','Los nombres de las cosas','Los verbos en futuro']),
      q('¿Qué conector suma ideas?','y / además',['y / además','pero','porque']),
      q('¿Qué conector indica contraste u oposición?','pero / sin embargo',['pero / sin embargo','y','también']),
      q('¿Qué conector indica causa o motivo?','porque / ya que',['porque / ya que','pero','o']),
      q('¿Qué conector indica finalidad (para qué)?','para / a fin de',['para / a fin de','y','pero']),
      q('¿Qué conector indica tiempo?','cuando / mientras / después',['cuando / mientras / después','porque','aunque']),
      q('¿Qué conector indica consecuencia?','por eso / por tanto / entonces',['por eso / por tanto / entonces','aunque','ni']),
      q('¿Qué es una preposición?','Palabra que relaciona dos términos (a, de, en, con, por...)',['Palabra que relaciona dos términos (a, de, en, con, por...)','Un tipo de verbo','Un signo de puntuación']),
      q('¿Cuál de estas es una preposición?','en',['en','bonito','correr']),
      q('"Voy A la escuela CON mi amigo" — las palabras en mayúscula son...','Preposiciones',['Preposiciones','Verbos','Adjetivos']),
      q('¿Qué conector indica una alternativa?','o / u',['o / u','y','porque']),
      q('¿Qué conector explica lo anterior con otras palabras?','es decir / o sea',['es decir / o sea','pero','ni'])
    ],

    '💬 Adverbios': [
      q('¿Qué es un adverbio?','La palabra que modifica al verbo, al adjetivo o a otro adverbio',['La palabra que modifica al verbo, al adjetivo o a otro adverbio','Un nombre','Un artículo']),
      q('¿Qué indica un adverbio de lugar?','Dónde ocurre la acción (aquí, cerca, lejos)',['Dónde ocurre la acción (aquí, cerca, lejos)','Cuándo ocurre','Cómo es el sustantivo']),
      q('¿Qué indica un adverbio de tiempo?','Cuándo ocurre (ayer, hoy, mañana, siempre)',['Cuándo ocurre (ayer, hoy, mañana, siempre)','Dónde ocurre','Cuánto hay']),
      q('¿Qué indica un adverbio de modo?','Cómo se hace la acción (bien, mal, así, despacio)',['Cómo se hace la acción (bien, mal, así, despacio)','Dónde','Cuándo']),
      q('¿Qué indica un adverbio de cantidad?','Cuánto (muy, poco, mucho, bastante)',['Cuánto (muy, poco, mucho, bastante)','Dónde','Cuándo']),
      q('¿Cuál de estos es un adverbio de negación?','no / nunca / tampoco',['no / nunca / tampoco','sí / también','quizás']),
      q('¿Cuál es un adverbio de duda?','quizás / probablemente',['quizás / probablemente','sí','nunca']),
      q('Muchos adverbios de modo terminan en...','-mente (rápidamente, felizmente)',['-mente (rápidamente, felizmente)','-ando','-ado']),
      q('En "María canta bien", ¿cuál es el adverbio?','bien',['bien','canta','María']),
      q('En "Vamos mañana al parque", ¿cuál es el adverbio?','mañana',['mañana','vamos','parque']),
      q('¿Cuál de estos es un adverbio de lugar?','allí',['allí','ayer','muy']),
      q('¿Cuál es un adverbio de afirmación?','sí / efectivamente',['sí / efectivamente','no','quizás'])
    ],

    '🕐 Verbos: Regulares e Irregulares': [
      q('¿Qué es un verbo regular?','Sigue las reglas normales de conjugación sin cambiar la raíz',['Sigue las reglas normales de conjugación sin cambiar la raíz','Cambia todo de forma loca','No existe']),
      q('¿Cuál de estos verbos es regular?','Cantar',['Cantar','Ser','Ir']),
      q('¿Cuál de estos verbos es irregular?','Ir (voy, vas, va...)',['Ir (voy, vas, va...)','Hablar','Comer']),
      q('¿Cómo se conjuga "yo" del verbo "tener" en presente?','Tengo',['Tengo','Teno','Tengo con g']),
      q('¿Cómo se dice "yo" de "hacer" en presente?','Hago',['Hago','Haco','Hazo']),
      q('¿Cuál es el verbo "ser" en presente para "yo"?','Soy',['Soy','Era','Seré']),
      q('¿Cuál es "estar" para "él" en presente?','Está',['Está','Es','Estará']),
      q('¿Qué verbo irregular significa "movimiento a un lugar"?','Ir',['Ir','Comer','Vivir']),
      q('¿Cómo se dice "nosotros" de "ir" en presente?','Vamos',['Vamos','Vamos con b','Iremos']),
      q('¿Cuál es el pretérito (pasado) de "yo fui"? Puede ser de...','Ir o ser (ambos comparten "fui")',['Ir o ser (ambos comparten "fui")','Solo de cantar','Solo de vivir']),
      q('¿Cómo se conjuga "tú" de "hablar" en presente?','Hablas',['Hablas','Habla','Hablo']),
      q('¿Qué tiempo verbal usa "haber" + participio (he comido)?','Pretérito perfecto compuesto',['Pretérito perfecto compuesto','Futuro simple','Gerundio'])
    ],

    '🧩 Sujeto, Predicado y Complementos': [
      q('¿Qué es el sujeto de una oración?','De quién o qué se dice algo (realiza la acción)',['De quién o qué se dice algo (realiza la acción)','La acción misma','El lugar']),
      q('¿Qué es el predicado?','Lo que se dice del sujeto; su núcleo es el verbo',['Lo que se dice del sujeto; su núcleo es el verbo','El nombre propio','El artículo']),
      q('En "Los niños juegan en el parque", el sujeto es...','Los niños',['Los niños','juegan','en el parque']),
      q('En esa misma oración, el predicado es...','juegan en el parque',['juegan en el parque','Los niños','parque']),
      q('¿Qué es el núcleo del sujeto?','El sustantivo o pronombre principal (sin adjetivos)',['El sustantivo o pronombre principal (sin adjetivos)','El verbo','El artículo']),
      q('¿Qué es el núcleo del predicado?','El verbo',['El verbo','El sustantivo','El adjetivo']),
      q('¿Qué es un sujeto tácito?','Está omitido pero se entiende por el verbo (ej: "Canto" = yo)',['Está omitido pero se entiende por el verbo (ej: "Canto" = yo)','Un sujeto muy grande','Un sujeto que no existe']),
      q('¿Qué es una oración unimembre?','No se puede separar en sujeto y predicado (ej: "Llueve")',['No se puede separar en sujeto y predicado (ej: "Llueve")','Tiene dos verbos','Tiene dos sujetos']),
      q('¿Qué complemento responde a "¿qué?" o "¿a quién?" (recibe la acción)?','Complemento directo',['Complemento directo','Complemento indirecto','Complemento circunstancial']),
      q('¿Qué complemento responde a "¿a quién / para quién?" (le/les)?','Complemento indirecto',['Complemento indirecto','Complemento directo','Atributo']),
      q('¿Qué complemento indica lugar, tiempo o modo?','Complemento circunstancial',['Complemento circunstancial','Complemento directo','Sujeto']),
      q('En "María es alta", "alta" funciona como...','Atributo (con verbos ser, estar, parecer)',['Atributo (con verbos ser, estar, parecer)','Complemento directo','Sujeto'])
    ],

    '✍️ Ortografía: B/V, G/J, LL/Y, H': [
      q('¿Cuál se escribe correctamente?','Abuelo (con b)',['Abuelo (con b)','Avuelo (con v)','Abuello (con ll)']),
      q('Después de M siempre se escribe...','B (ej: también, hombro, ambos)',['B (ej: también, hombro, ambos)','V','H']),
      q('¿Cuál es correcto?','Uva (con v)',['Uva (con v)','Uba (con b)','Uhua (con h)']),
      q('Los verbos terminados en -bir se escriben con...','B (escribir, recibir, subir)',['B (escribir, recibir, subir)','V','J']),
      q('¿Cómo se escribe correctamente la fruta?','Banana (con b)',['Banana (con b)','Vanana (con v)','Bananna doble n']),
      q('¿Cuál es correcto?','Gente (con g, suena como j)',['Gente (con g, suena como j)','Jente (con j)','Jente con h']),
      q('¿Cómo se escribe el animal jirafa?','Con j',['Con j','Con g (girafa)','Con h']),
      q('¿Cuál es correcto?','Lluvia (con ll)',['Lluvia (con ll)','Yuvia (con y)','Luvia (una l)']),
      q('¿Cómo suena la letra H en español?','Es muda (no suena)',['Es muda (no suena)','Siempre suena fuerte','Solo suena al final']),
      q('¿Cuál es correcto?','Hielo (con h)',['Hielo (con h)','Ielo (sin h)','Yelo (con y)']),
      q('¿Cómo se escribe el sonido z ante a, o, u?','Z (zapato, zona, zumo)',['Z (zapato, zona, zumo)','C (capato, cona, cumo)','S (sapato)']),
      q('¿Cómo se escribe el sonido /z/ ante e, i?','C (cine, cena)',['C (cine, cena)','Z (zine, zena)','S (sine)'])
    ],

    '🗣️ Diptongos, Hiatos y Acento': [
      q('¿Qué es un diptongo?','Dos vocales juntas en la MISMA sílaba',['Dos vocales juntas en la MISMA sílaba','Dos vocales en distinta sílaba','Una sola vocal']),
      q('¿Qué es un hiato?','Dos vocales juntas que se separan en DISTINTAS sílabas',['Dos vocales juntas que se separan en DISTINTAS sílabas','Dos consonantes juntas','Una vocal con tilde']),
      q('¿Cuál de estas palabras tiene diptongo?','Aire (ai-re)',['Aire (ai-re)','María (Ma-rí-a)','Raíz (ra-íz)']),
      q('¿Cuál de estas tiene hiato?','María (Ma-rí-a)',['María (Ma-rí-a)','Aire','Ciudad']),
      q('Las vocales fuertes son...','a, e, o',['a, e, o','i, u','solo la a']),
      q('Las vocales débiles (cerradas) son...','i, u',['i, u','a, e, o','solo la e']),
      q('¿Por qué "María" tiene hiato?','La tilde en la "í" (vocal débil) rompe el diptongo',['La tilde en la "í" (vocal débil) rompe el diptongo','Porque tiene tres vocales','Porque es aguda']),
      q('¿Cuál palabra tiene diptongo?','Ruido (rui-do)',['Ruido (rui-do)','Reír (re-ír)','Poesía (po-e-sí-a)']),
      q('Un diptongo se forma con...','Una vocal fuerte + una débil, o dos débiles (i+u / u+i)',['Una vocal fuerte + una débil, o dos débiles (i+u / u+i)','Dos vocales fuertes','Una sola vocal']),
      q('¿Qué ocurre con la h intermedia entre vocales (ej: ahumar)?','No impide el diptongo; las vocales forman diptongo igual',['No impide el diptongo; las vocales forman diptongo igual','Siempre hay hiato','La palabra se divide en dos'])
    ],

    '🌱 Palabras: Primitivas, Derivadas y Compuestas': [
      q('¿Qué es una palabra primitiva?','No viene de otra palabra (ej: flor, pan, mar)',['No viene de otra palabra (ej: flor, pan, mar)','Viene de otra más larga','Tiene dos raíces']),
      q('¿Qué es una palabra derivada?','Se forma a partir de otra con prefijos o sufijos (ej: florería)',['Se forma a partir de otra con prefijos o sufijos (ej: florería)','No viene de ninguna','Tiene dos raíces unidas']),
      q('¿Qué es una palabra compuesta?','Une dos o más palabras (ej: sacapuntas, cumpleaños)',['Une dos o más palabras (ej: sacapuntas, cumpleaños)','Viene del latín','Tiene prefijo']),
      q('¿De qué palabra primitiva viene "florero"?','Flor',['Flor','Flores','Florecer']),
      q('¿Qué es un prefijo?','Se pone ANTES de la raíz (re-, des-, in-, pre-)',['Se pone ANTES de la raíz (re-, des-, in-, pre-)','Se pone DESPUÉS de la raíz','Es una palabra compuesta']),
      q('¿Qué es un sufijo?','Se pone DESPUÉS de la raíz (-ito, -ero, -mente, -oso)',['Se pone DESPUÉS de la raíz (-ito, -ero, -mente, -oso)','Se pone ANTES','Es un verbo']),
      q('¿Cuál de estas es una palabra compuesta?','Lavaplatos',['Lavaplatos','Casita','Panadero']),
      q('¿Cuál lleva prefijo?','Descontento (des- + contento)',['Descontento (des- + contento)','Pan','Flor']),
      q('¿Qué es la familia léxica?','Todas las palabras que vienen de la misma raíz (amor: amar, amoroso...)',['Todas las palabras que vienen de la misma raíz (amor: amar, amoroso...)','Las palabras que riman','Los sinónimos']),
      q('¿Cuál lleva sufijo diminutivo?','Casita (-ita)',['Casita (-ita)','Casón','Casona'])
    ],

    '🎭 Literatura Infantil y Fábulas': [
      q('¿Quién escribió "Martín Fierro", el poema gauchesco argentino?','José Hernández',['José Hernández','Borges','San Martín']),
      q('¿Qué personaje es un gaucho protagonista de un poema argentino?','Martín Fierro',['Martín Fierro','Don Quijote','Pinocho']),
      q('¿En qué país vivían las aventuras de "Don Quijote de la Mancha"?','España',['España','Argentina','México']),
      q('¿Quién escribió "Don Quijote"?','Miguel de Cervantes',['Miguel de Cervantes','Shakespeare','Garcilaso']),
      q('¿Qué fábula enseña que "la constancia vence"?','La liebre y la tortuga',['La liebre y la tortuga','La cigarra y la hormiga','El león y el ratón']),
      q('¿Qué fábula enseña a prevenir y trabajar antes que divertirse?','La cigarra y la hormiga',['La cigarra y la hormiga','El patito feo','Caperucita Roja']),
      q('¿Qué personaje de cuento visita a su abuelita y se encuentra con un lobo?','Caperucita Roja',['Caperucita Roja','Blancanieves','Cenicienta']),
      q('¿Quién escribió muchos cuentos infantiles como "El patito feo"?','Hans Christian Andersen',['Hans Christian Andersen','Los hermanos Grimm','Esopo']),
      q('Los hermanos Grimm escribieron...','Cuentos como Blancanieves, Caperucita y Cenicienta',['Cuentos como Blancanieves, Caperucita y Cenicienta','Martín Fierro','El Quijote']),
      q('¿Qué es una moraleja?','La enseñanza final de una fábula',['La enseñanza final de una fábula','El autor','El personaje principal'])
    ]

  };

  /* ============================================================
     SOCIALES — 14 categorías, ~10 preguntas cada una
     ============================================================ */
  var SOCIALES = {

    '👷 Oficios y Profesiones': [
      q('¿Quién cura a los enfermos y trabaja en un hospital?','El médico',['El médico','El carpintero','El policía']),
      q('¿Quién enseña en la escuela a los alumnos?','El docente o maestro',['El docente o maestro','El panadero','El piloto']),
      q('¿Quién cuida la seguridad de los ciudadanos?','El policía',['El policía','El músico','El pintor']),
      q('¿Quién amasa y cocina el pan?','El panadero',['El panadero','El carnicero','El pescador']),
      q('¿Quién construye casas con ladrillos y cemento?','El albañil',['El albañil','El doctor','El profesor']),
      q('¿Quién apaga incendios y rescata personas?','El bombero',['El bombero','El cartero','El cocinero']),
      q('¿Quién cultiva la tierra y cría animales?','El agricultor / ganadero',['El agricultor / ganadero','El mecánico','El dentista']),
      q('¿Quién repara autos y motores?','El mecánico',['El mecánico','El pescador','El sastre']),
      q('¿Quién corta el pelo y peina?','El peluquero',['El peluquero','El zapatero','El cartero']),
      q('¿Quién entrega cartas y paquetes en las casas?','El cartero',['El cartero','El bombero','El panadero']),
      q('¿Quién cuida los dientes?','El dentista',['El dentista','El podólogo','El veterinario']),
      q('¿Quién cuida a los animales enfermos?','El veterinario',['El veterinario','El médico de personas','El carnicero'])
    ],

    '🏘️ Mi Comunidad y Normas': [
      q('¿Qué es una comunidad?','Un grupo de personas que conviven en un mismo lugar',['Un grupo de personas que conviven en un mismo lugar','Un edificio vacío','Una persona sola']),
      q('¿Qué debemos hacer para vivir bien en comunidad?','Respetar a los demás y ayudar',['Respetar a los demás y ayudar','Pelear','No hablar con nadie']),
      q('¿Quiénes forman la comunidad escolar?','Alumnos, docentes, directivos y familias',['Alumnos, docentes, directivos y familias','Solo los alumnos','Solo el director']),
      q('¿Qué es una norma o regla de convivencia?','Un acuerdo para respetarnos y organizarnos',['Un acuerdo para respetarnos y organizarnos','Un castigo','Un juego de mesa']),
      q('¿Qué significa reciclar?','Separar la basura para reutilizar materiales',['Separar la basura para reutilizar materiales','Tirar basura a la calle','Quemar la basura']),
      q('¿Qué son las "3 R" del cuidado del ambiente?','Reducir, reutilizar, reciclar',['Reducir, reutilizar, reciclar','Robar, romper, regalar','Correr, saltar, jugar']),
      q('Si ves que alguien necesita ayuda en la comunidad, ¿qué haces?','Ayudo o aviso a un adulto responsable',['Ayudo o aviso a un adulto responsable','Me hago el distraído','Me río de esa persona']),
      q('¿Qué lugar de la comunidad sirve para leer libros en forma gratuita?','La biblioteca',['La biblioteca','La panadería','La estación de servicio']),
      q('¿Qué espacio verde de la comunidad usamos para jugar y descansar?','La plaza o parque',['La plaza o parque','El hospital','La comisaría']),
      q('¿Qué debemos hacer con la basura en la calle?','Tirarla en el cesto o tacho de basura',['Tirarla en el cesto o tacho de basura','Dejarla en el suelo','Esconderla en un arbusto']),
      q('¿Qué es un vecino?','Una persona que vive cerca de mi casa',['Una persona que vive cerca de mi casa','Un familiar lejano','El dueño del supermercado']),
      q('¿Por qué es importante respetar turnos y filas?','Para que todos seamos tratados con justicia y orden',['Para que todos seamos tratados con justicia y orden','Para ir más rápido nosotros','Para molestar a los demás'])
    ],

    '🇦🇷 Símbolos Nacionales': [
      q('¿Cuáles son los colores de la bandera argentina?','Celeste y blanco',['Celeste y blanco','Rojo y azul','Verde y amarillo']),
      q('¿Qué dibujo tiene en el centro la bandera de ceremonia?','El Sol de Mayo',['El Sol de Mayo','Una estrella','Un escudo']),
      q('¿Qué flor es símbolo nacional de Argentina?','El Ceibo',['El Ceibo','La rosa','El girasol']),
      q('¿Qué es la escarapela?','Un distintivo celeste y blanco que se lleva en el pecho',['Un distintivo celeste y blanco que se lleva en el pecho','Una moneda','Un baile típico']),
      q('¿Quién escribió la letra del Himno Nacional Argentino?','Vicente López y Planes',['Vicente López y Planes','San Martín','Belgrano']),
      q('¿Quién compuso la música del Himno Nacional?','Blas Parera',['Blas Parera','Carlos Gardel','Atahualpa Yupanqui']),
      q('En el Escudo Nacional, ¿qué sostienen las manos entrelazadas?','Una pica con un gorro frigio (de la libertad)',['Una pica con un gorro frigio (de la libertad)','Una espada','Un sol de oro']),
      q('¿Quién creó la bandera argentina?','Manuel Belgrano',['Manuel Belgrano','José de San Martín','Domingo F. Sarmiento']),
      q('¿Dónde se creó la bandera por primera vez?','En Rosario, a orillas del Río Paraná (1812)',['En Rosario, a orillas del Río Paraná (1812)','En Ushuaia','En Córdoba']),
      q('¿Qué representa el Sol de Mayo?','La libertad y la independencia; recuerda el sol del 25 de Mayo de 1810',['La libertad y la independencia; recuerda el sol del 25 de Mayo de 1810','Un eclipse','El invierno']),
      q('¿Cuántos rayos tiene el Sol de Mayo?','32 (16 rectos y 16 flamígeros/ondulados)',['32 (16 rectos y 16 flamígeros/ondulados)','10','50']),
      q('¿Qué ave fue declarada ave nacional de Argentina?','El hornero',['El hornero','El cóndor','El flamenco'])
    ],

    '⭐ Fechas Patrias e Historia': [
      q('¿Qué ocurrió el 25 de Mayo de 1810?','La Revolución de Mayo: se forma el Primer Gobierno Patrio',['La Revolución de Mayo: se forma el Primer Gobierno Patrio','La Independencia','La creación de la bandera']),
      q('¿Qué celebramos el 9 de Julio?','La Declaración de la Independencia (1816)',['La Declaración de la Independencia (1816)','La Revolución de Mayo','El Día del Niño']),
      q('¿Dónde se firmó la Declaración de la Independencia?','En la Casa Histórica de Tucumán',['En la Casa Histórica de Tucumán','En el Cabildo de Buenos Aires','En Córdoba']),
      q('¿Qué prócer cruzó la Cordillera de los Andes para liberar Chile y Perú?','José de San Martín',['José de San Martín','Martín Miguel de Güemes','Mariano Moreno']),
      q('¿Qué se celebra el 20 de Junio?','El Día de la Bandera (fallecimiento de Belgrano)',['El Día de la Bandera (fallecimiento de Belgrano)','Día de la Independencia','Día del Maestro']),
      q('¿Qué se celebra el 11 de Septiembre?','El Día del Maestro (fallecimiento de Sarmiento)',['El Día del Maestro (fallecimiento de Sarmiento)','Día de la Bandera','Día de la Primavera']),
      q('¿Qué general defendió el norte con gauchos (guerra de guerrillas)?','Martín Miguel de Güemes',['Martín Miguel de Güemes','Belgrano','Rivadavia']),
      q('¿Quién fue "la Madre de la Patria", que luchó como soldado en la independencia?','María Remedios del Valle',['María Remedios del Valle','Juana Azurduy','Eva Perón']),
      q('¿Qué heroína luchó en el norte junto a Güemes?','Juana Azurduy de Padilla',['Juana Azurduy de Padilla','Eva Perón','Victoria Ocampo']),
      q('¿Qué presidente impulsó la educación pública y es llamado "el gran educador"?','Domingo Faustino Sarmiento',['Domingo Faustino Sarmiento','Juan Manuel de Rosas','Julio Argentino Roca']),
      q('¿Qué era el Cabildo en la colonia?','El gobierno de la ciudad; ahí se reunió el Cabildo Abierto de 1810',['El gobierno de la ciudad; ahí se reunió el Cabildo Abierto de 1810','Un mercado','Una escuela']),
      q('¿Quién fue la primera presidenta de Argentina?','Cristina Fernández de Kirchner (elegida por el voto)',['Cristina Fernández de Kirchner (elegida por el voto)','Isabel Martínez de Perón (vicepresidenta que asumió)','Eva Perón'])
    ],

    '⚖️ Derechos de los Niños': [
      q('¿A qué tienen derecho TODOS los niños del mundo?','A jugar, ir a la escuela y tener salud',['A jugar, ir a la escuela y tener salud','A trabajar en fábricas','A vivir solos en la calle']),
      q('Los niños deben ser respetados sin importar...','Su origen, color de piel, religión o género',['Su origen, color de piel, religión o género','Solo su nombre','Su altura y peso']),
      q('¿Quiénes deben cuidar y proteger a los niños?','Los adultos: familia, maestros y el Estado',['Los adultos: familia, maestros y el Estado','Solo ellos mismos','Nadie, se cuidan solos']),
      q('¿Qué derecho te protege si te enfermas?','El derecho a recibir atención médica y vacunas',['El derecho a recibir atención médica y vacunas','El derecho a jugar','El derecho a un nombre']),
      q('Si alguien le hace daño a un niño, ¿qué debe hacer?','Contarle inmediatamente a un adulto de confianza',['Contarle inmediatamente a un adulto de confianza','Guardar el secreto','Llorar a solas']),
      q('¿Qué derecho permite expresar lo que pensamos?','El derecho a la libertad de expresión',['El derecho a la libertad de expresión','El derecho a comer dulces','El derecho a no bañarse']),
      q('¿Qué documento legal del mundo protege los derechos de la infancia?','La Convención sobre los Derechos del Niño (1989)',['La Convención sobre los Derechos del Niño (1989)','El reglamento del colegio','Una receta médica']),
      q('¿El trabajo infantil está permitido?','No, está prohibido y es un delito',['No, está prohibido y es un delito','Sí, desde los 5 años','Solo los domingos']),
      q('¿Qué es el acoso escolar o "bullying"?','Cuando un niño molesta, golpea o humilla a otro repetidamente',['Cuando un niño molesta, golpea o humilla a otro repetidamente','Un juego entre amigos','Una materia del colegio']),
      q('Si ves bullying, ¿qué debes hacer?','No quedarte callado: contarlo a un docente o adulto',['No quedarte callado: contarlo a un docente o adulto','Reírte junto al agresor','Hacerte el distraído']),
      q('¿Todos los niños tienen derecho a un nombre y una nacionalidad?','Sí, desde que nacen',['Sí, desde que nacen','Solo a los 18 años','Solo si tienen documento']),
      q('¿Qué derecho te permite descansar, jugar y hacer actividades artísticas?','El derecho al descanso, el juego y la cultura',['El derecho al descanso, el juego y la cultura','El derecho a trabajar','El derecho a mirar televisión todo el día'])
    ],

    '🗺️ Geografía de Argentina: Provincias y Regiones': [
      q('¿Cuántas provincias tiene Argentina?','23 provincias + la Ciudad Autónoma de Buenos Aires',['23 provincias + la Ciudad Autónoma de Buenos Aires','15 provincias','50 provincias']),
      q('¿Cuál es la capital de Argentina?','Buenos Aires (Ciudad Autónoma)',['Buenos Aires (Ciudad Autónoma)','Córdoba','Rosario']),
      q('¿Cuál es la provincia más poblada?','Buenos Aires',['Buenos Aires','Tierra del Fuego','Santa Cruz']),
      q('¿Qué montaña es la más alta de América y está en Mendoza?','El Aconcagua',['El Aconcagua','El Everest','El Kilimanjaro']),
      q('¿Cuál es el río más largo de Argentina?','El Paraná',['El Paraná','El Río de la Plata','El Colorado']),
      q('¿En qué provincia están las Cataratas del Iguazú?','Misiones',['Misiones','Mendoza','Chubut']),
      q('¿En qué provincia está el glaciar Perito Moreno?','Santa Cruz (Patagonia)',['Santa Cruz (Patagonia)','Buenos Aires','Jujuy']),
      q('¿Qué ciudad es la más austral del mundo (capital de Tierra del Fuego)?','Ushuaia',['Ushuaia','La Plata','Rawson']),
      q('¿Cuál es la capital de la provincia de Buenos Aires?','La Plata',['La Plata','Mar del Plata','Bahía Blanca']),
      q('¿Qué región es famosa por sus viñedos y el vino?','Cuyo (Mendoza, San Juan, San Luis)',['Cuyo (Mendoza, San Juan, San Luis)','La Patagonia','El NOA']),
      q('¿Qué región del norte tiene colores en la Quebrada de Humahuaca?','NOA (Noroeste Argentino: Jujuy, Salta...)',['NOA (Noroeste Argentino: Jujuy, Salta...)','Patagonia','Mesopotamia']),
      q('¿Qué región incluye Misiones, Corrientes y Entre Ríos?','NEA / Mesopotamia (entre ríos Paraná y Uruguay)',['NEA / Mesopotamia (entre ríos Paraná y Uruguay)','Cuyo','Patagonia']),
      q('¿Qué océano baña las costas de Argentina?','El Océano Atlántico',['El Océano Atlántico','El Océano Pacífico','El Mar Mediterráneo']),
      q('¿Qué archipiélago del Atlántico Sur reclama Argentina como territorio propio?','Las Islas Malvinas',['Las Islas Malvinas','Las Islas Canarias','La Isla de Pascua'])
    ],

    '🌍 Planisferio: Continentes, Océanos y Puntos Cardinales': [
      q('¿En qué continente está Argentina?','América del Sur',['América del Sur','Europa','África']),
      q('¿Cuántos continentes hay (modelo más usado en la escuela)?','7: América, Europa, Asia, África, Oceanía, Antártida...',['7: América, Europa, Asia, África, Oceanía, Antártida...','5','10']),
      q('¿Cuál es el continente más grande y poblado?','Asia',['Asia','América','Europa']),
      q('¿Cuál es el continente más pequeño?','Oceanía',['Oceanía','Europa','Antártida']),
      q('¿Cuántos océanos hay en el mundo?','5: Pacífico, Atlántico, Índico, Ártico y Antártico',['5: Pacífico, Atlántico, Índico, Ártico y Antártico','2','7']),
      q('¿Cuál es el océano más grande?','El Pacífico',['El Pacífico','El Atlántico','El Índico']),
      q('¿Cuáles son los cuatro puntos cardinales?','Norte, Sur, Este y Oeste',['Norte, Sur, Este y Oeste','Arriba, abajo, izquierda, derecha','Sol, luna, estrella, cometa']),
      q('Si mi sombra apunta al norte al mediodía, el sol está al...','Sur',['Sur','Este','Oeste']),
      q('¿Qué país limita con Argentina al Oeste (separado por los Andes)?','Chile',['Chile','Brasil','Uruguay']),
      q('¿Cuántos países limitan con Argentina?','5: Chile, Bolivia, Paraguay, Brasil y Uruguay',['5: Chile, Bolivia, Paraguay, Brasil y Uruguay','2','10']),
      q('¿Qué línea imaginaria divide la Tierra en hemisferio Norte y Sur?','El Ecuador (línea equinoccial)',['El Ecuador (línea equinoccial)','El Trópico de Cáncer','El meridiano de Greenwich']),
      q('¿Qué representa la rosa de los vientos en un mapa?','Los puntos cardinales e intermedios',['Los puntos cardinales e intermedios','La cantidad de habitantes','Los ríos'])
    ],

    '🏛️ Gobierno y Poderes del Estado': [
      q('¿Qué forma de gobierno tiene Argentina?','Una democracia representativa y republicana',['Una democracia representativa y republicana','Una monarquía','Una dictadura']),
      q('¿Quién es la autoridad del Poder Ejecutivo Nacional?','El Presidente de la Nación',['El Presidente de la Nación','El Gobernador','El Juez']),
      q('¿Qué poder hace las leyes?','El Poder Legislativo (Congreso: Diputados y Senadores)',['El Poder Legislativo (Congreso: Diputados y Senadores)','El Poder Ejecutivo','El Poder Judicial']),
      q('¿Qué poder se encarga de juzgar y hacer cumplir la justicia?','El Poder Judicial (jueces y la Corte Suprema)',['El Poder Judicial (jueces y la Corte Suprema)','El Poder Ejecutivo','El Poder Legislativo']),
      q('¿Cómo se llama la reunión de Diputados y Senadores?','El Congreso de la Nación',['El Congreso de la Nación','El Cabildo','El Senado solo']),
      q('¿Cuántos años dura el mandato de un presidente argentino?','4 años (con posibilidad de una reelección)',['4 años (con posibilidad de una reelección)','2 años','10 años']),
      q('¿Quién elige al presidente en democracia?','El pueblo, mediante el voto',['El pueblo, mediante el voto','Los jueces','Los militares']),
      q('¿A qué edad se puede votar en Argentina (obligatorio)?','Desde los 16 años (opcional) y desde los 18 obligatorio',['Desde los 16 años (opcional) y desde los 18 obligatorio','Desde los 10 años','Desde los 25 años']),
      q('¿Qué ley fundamental rige a Argentina (la "madre de todas las leyes")?','La Constitución Nacional (1853, con reformas)',['La Constitución Nacional (1853, con reformas)','El reglamento escolar','Una ordenanza municipal']),
      q('¿Quién gobierna cada provincia?','Un gobernador, con su propia constitución y legislatura',['Un gobernador, con su propia constitución y legislatura','El presidente directamente','Los vecinos en asamblea']),
      q('¿Qué documento de identidad usamos en Argentina?','El DNI (Documento Nacional de Identidad)',['El DNI (Documento Nacional de Identidad)','El pasaporte solamente','La libreta de matrimonio']),
      q('¿Qué significa "república"?','El pueblo elige a sus representantes y el poder no es hereditario',['El pueblo elige a sus representantes y el poder no es hereditario','Manda un rey','Manda un solo partido'])
    ],

    '🗿 Pueblos Originarios': [
      q('¿Quiénes habitaban Argentina antes de la llegada de los españoles?','Los pueblos originarios (muchos pueblos distintos)',['Los pueblos originarios (muchos pueblos distintos)','Los romanos','Los incas solamente']),
      q('¿Qué pueblo originario vive principalmente en la Patagonia y habla mapudungun?','El pueblo Mapuche',['El pueblo Mapuche','El pueblo Guaraní','El pueblo Inca']),
      q('¿Qué pueblo originario vive en Misiones y el noreste, y habla guaraní?','El pueblo Guaraní (Mbyá)',['El pueblo Guaraní (Mbyá)','El pueblo Tehuelche','El pueblo Diaguita']),
      q('¿Qué pueblo del Chaco (Formosa, Chaco, Salta) habla qom?','El pueblo Qom (antes llamados "tobas")',['El pueblo Qom (antes llamados "tobas")','El pueblo Mapuche','El pueblo Guaraní']),
      q('¿Qué pueblo andino del NOA (Jujuy, Salta) habla quechua o aymara?','El pueblo Kolla',['El pueblo Kolla','El pueblo Ranquel','El pueblo Selk\'nam']),
      q('¿Qué pueblo originario vivía como nómade en la Patagonia?','Los Tehuelches',['Los Tehuelches','Los Guaraníes','Los Diaguitas']),
      q('¿Qué lengua originaria es oficial en la provincia de Corrientes?','El Guaraní',['El Guaraní','El Latín','El Inglés']),
      q('¿Qué sitio arqueológico de la Puna (Jujuy) fue declarado Patrimonio de la Humanidad?','Pucará de Tilcara',['Pucará de Tilcara','El Obelisco','La Casa Rosada']),
      q('¿Qué es un "pucará"?','Una fortaleza o pueblo fortificado de piedra de los pueblos andinos',['Una fortaleza o pueblo fortificado de piedra de los pueblos andinos','Un río','Un baile']),
      q('¿Por qué es importante conocer a los pueblos originarios?','Porque son parte de nuestra identidad y cultura, con derechos que debemos respetar',['Porque son parte de nuestra identidad y cultura, con derechos que debemos respetar','Porque ya no existen','Porque son un cuento'])
    ],

    '🎶 Cultura y Tradiciones Argentinas': [
      q('¿Qué infusión se toma con bombilla y es símbolo argentino?','El mate',['El mate','El café','El chocolate']),
      q('¿Qué comida típica se cocina a la parrilla?','El asado',['El asado','El sushi','La pizza napolitana']),
      q('¿Qué baile y música nació en los barrios de Buenos Aires (La Boca)?','El tango',['El tango','La chacarera','El rock']),
      q('¿Quién fue el cantante de tango más famoso ("el Zorzal Criollo")?','Carlos Gardel',['Carlos Gardel','Atahualpa Yupanqui','Luis Alberto Spinetta']),
      q('¿Qué música folklórica es típica del litoral (Corrientes, Misiones)?','El chamamé',['El chamamé','El tango','El reggae']),
      q('¿Qué baile folklórico argentino se baila con pañuelo?','La zamba (y la chacarera)',['La zamba (y la chacarera)','El hip hop','La salsa']),
      q('¿Qué plato se come especialmente el 25 de Mayo?','El locro (con empanadas)',['El locro (con empanadas)','El sushi','La hamburguesa']),
      q('¿Qué dulce típico se usa para rellenar alfajores?','El dulce de leche',['El dulce de leche','La miel pura','El chocolate amargo']),
      q('¿Qué personaje gauchesco es el protagonista del poema de José Hernández?','Martín Fierro',['Martín Fierro','Don Segundo Sombra','El Zorro']),
      q('¿Qué deporte es el más popular y pasión de muchos argentinos?','El fútbol',['El fútbol','El golf','El cricket']),
      q('¿Qué fiesta se celebra con disfraces y desfiles, sobre todo en Gualeguaychú?','El Carnaval',['El Carnaval','La Navidad','El Día del Niño']),
      q('¿Qué provincia es famosa por sus bodegas y el Malbec?','Mendoza',['Mendoza','Tierra del Fuego','Formosa'])
    ],

    '🌱 Medio Ambiente y Recursos': [
      q('¿Qué es el medio ambiente?','El conjunto de aire, agua, suelo, plantas y animales que nos rodean',['El conjunto de aire, agua, suelo, plantas y animales que nos rodean','Solo las ciudades','Solo los ríos']),
      q('¿Cuáles son las "3 R" para cuidar el planeta?','Reducir, reutilizar y reciclar',['Reducir, reutilizar y reciclar','Romper, robar, regalar','Correr, saltar, gritar']),
      q('¿Qué contamina el aire?','El humo de fábricas y autos, y los incendios',['El humo de fábricas y autos, y los incendios','Las plantas verdes','El viento']),
      q('¿Qué ocurre si tiramos basura al río?','Se contamina el agua y mueren los peces',['Se contamina el agua y mueren los peces','El agua se pone más limpia','Nada, el río lo limpia solo']),
      q('¿Qué energía se obtiene del sol?','Energía solar (renovable)',['Energía solar (renovable)','Energía de carbón','Energía de petróleo']),
      q('¿Qué energía se obtiene del viento?','Energía eólica (renovable)',['Energía eólica (renovable)','Energía nuclear','Energía de gas']),
      q('¿Cuál de estos es un recurso NO renovable?','El petróleo (se acaba)',['El petróleo (se acaba)','La luz del sol','El viento']),
      q('¿Qué es el ciclo del agua?','Evaporación, condensación y precipitación (lluvia/nieve)',['Evaporación, condensación y precipitación (lluvia/nieve)','Solo el agua de la canilla','Un juego de agua']),
      q('¿Qué ecosistema argentino está en Misiones y es una selva tropical?','La Selva Misionera (Selva Paranaense)',['La Selva Misionera (Selva Paranaense)','La Antártida','El desierto de Atacama']),
      q('¿Qué podemos hacer para ahorrar agua?','Cerrar la canilla mientras nos cepillamos los dientes',['Cerrar la canilla mientras nos cepillamos los dientes','Dejar la canilla abierta todo el día','Regar el jardín al mediodía']),
      q('¿Qué animal marino se ve en Península Valdés (Chubut)?','La ballena franca austral',['La ballena franca austral','El pingüino emperador','El león africano']),
      q('¿Por qué es importante cuidar los árboles?','Dan oxígeno, sombra, refugio a animales y limpian el aire',['Dan oxígeno, sombra, refugio a animales y limpian el aire','Porque son de madera para muebles solamente','No son importantes'])
    ],

    '🤝 Convivencia, Valores y Servicios Públicos': [
      q('¿Qué es el respeto?','Tratar a los demás como querés que te traten a vos',['Tratar a los demás como querés que te traten a vos','Gritar para tener razón','Imponer mi opinión']),
      q('¿Qué es la solidaridad?','Ayudar a quienes lo necesitan sin esperar nada a cambio',['Ayudar a quienes lo necesitan sin esperar nada a cambio','Competir para ganar siempre','No mirar a los lados']),
      q('¿Qué servicio público atiende emergencias médicas?','El hospital / SAME (ambulancia)',['El hospital / SAME (ambulancia)','La panadería','La biblioteca']),
      q('¿A qué número llamamos en Argentina ante una emergencia?','911',['911','100','411']),
      q('¿Qué servicio reparte cartas y paquetes?','El correo (Correo Argentino)',['El correo (Correo Argentino)','La comisaría','El colegio']),
      q('¿Qué transporte público subterráneo hay en Buenos Aires?','El subte',['El subte','El avión','El barco']),
      q('¿Qué servicio cuida la seguridad y previene el delito?','La policía',['La policía','El cartero','El panadero']),
      q('¿Qué servicio apaga incendios y rescata?','Los bomberos',['Los bomberos','Los maestros','Los dentistas']),
      q('¿Qué lugar de la comunidad brinda educación gratuita?','La escuela pública',['La escuela pública','El supermercado','La estación de servicio']),
      q('¿Qué es la tolerancia?','Aceptar y respetar las diferencias de los demás',['Aceptar y respetar las diferencias de los demás','No hablar con nadie','Reírse de los distintos']),
      q('¿Qué es la empatía?','Ponerse en el lugar del otro y entender lo que siente',['Ponerse en el lugar del otro y entender lo que siente','No importarme el otro','Gritar más fuerte']),
      q('Si hay un incendio, ¿qué número de emergencia llamamos?','911 (bomberos)',['911 (bomberos)','Al delivery','Al profesor'])
    ],

    '📜 Historia Argentina: Épocas': [
      q('¿Quiénes habitaban el territorio antes de 1492?','Los pueblos originarios',['Los pueblos originarios','Los españoles','Los romanos']),
      q('¿Qué llegó en 1492 desde Europa?','Cristóbal Colón a América (inicia la conquista)',['Cristóbal Colón a América (inicia la conquista)','La independencia','La Revolución de Mayo']),
      q('¿Quién fundó Buenos Aires por segunda vez en 1580?','Juan de Garay',['Juan de Garay','Pedro de Mendoza (primera fundación, 1536)','Belgrano']),
      q('¿Qué era el Virreinato del Río de la Plata (creado en 1776)?','El gobierno español en esta región, con capital en Buenos Aires',['El gobierno español en esta región, con capital en Buenos Aires','Un club de fútbol','Una escuela']),
      q('¿Qué invasiones resistieron los porteños en 1806 y 1807?','Las Invasiones Inglesas (reconquista y defensa)',['Las Invasiones Inglesas (reconquista y defensa)','La llegada de Colón','La independencia']),
      q('¿Qué pasó en 1810?','La Revolución de Mayo: se destituye al virrey y se forma la Primera Junta',['La Revolución de Mayo: se destituye al virrey y se forma la Primera Junta','Se firma la Constitución','Llega el ferrocarril']),
      q('¿En qué año se declaró la Independencia?','1816 (9 de Julio, en Tucumán)',['1816 (9 de Julio, en Tucumán)','1492','1930']),
      q('¿Qué año se sancionó la Constitución Nacional?','1853',['1853','1810','1910']),
      q('¿En qué año se aprobó el voto femenino en Argentina (impulsado por Evita)?','1947',['1947','1816','2001']),
      q('¿Qué fecha recuperamos la democracia definitivamente (1983)?','10 de Diciembre de 1983 (asume Alfonsín)',['10 de Diciembre de 1983 (asume Alfonsín)','25 de Mayo de 1810','9 de Julio de 1816']),
      q('¿Qué se celebra el 12 de Octubre en Argentina hoy?','El Día del Respeto a la Diversidad Cultural',['El Día del Respeto a la Diversidad Cultural','El Día de la Primavera','El Día del Maestro']),
      q('¿Quiénes eran los "gauchos"?','Hombres libres del campo, campeones de la pampa, símbolo de nuestra tradición',['Hombres libres del campo, campeones de la pampa, símbolo de nuestra tradición','Piratas del Caribe','Reyes de España'])
    ],

    '🚦 Trabajo, Economía y Consumo': [
      q('¿Qué es el trabajo?','El esfuerzo que hacemos para producir bienes o servicios y ganar un ingreso',['El esfuerzo que hacemos para producir bienes o servicios y ganar un ingreso','Jugar todo el día','Dormir']),
      q('¿Qué es un bien?','Algo material que se produce y se vende (ej: un pan, una silla)',['Algo material que se produce y se vende (ej: un pan, una silla)','Un corte de pelo','Una clase']),
      q('¿Qué es un servicio?','Una actividad que alguien hace por otro (ej: el médico, el colectivo)',['Una actividad que alguien hace por otro (ej: el médico, el colectivo)','Una manzana','Un lápiz']),
      q('¿Cuál es la moneda de Argentina?','El peso argentino',['El peso argentino','El dólar','El euro']),
      q('¿Qué cultiva mucho Argentina y exporta (soja, trigo, maíz)?','Productos agrícolas (sector primario)',['Productos agrícolas (sector primario)','Solo celulares','Solo películas']),
      q('¿Qué sector transforma materias primas en productos (fábricas)?','La industria (sector secundario)',['La industria (sector secundario)','La agricultura','Los servicios']),
      q('¿Qué sector incluye comercio, transporte, educación y salud?','Los servicios (sector terciario)',['Los servicios (sector terciario)','La minería','La ganadería']),
      q('¿Qué es un consumidor?','La persona que compra o usa bienes y servicios',['La persona que compra o usa bienes y servicios','El que fabrica todo','El presidente']),
      q('¿Qué derecho tenemos como consumidores?','A que nos vendan productos seguros y con información clara',['A que nos vendan productos seguros y con información clara','A que nos den todo gratis','A robar sin que pase nada']),
      q('¿Qué es el ahorro?','Guardar parte del dinero para después, en vez de gastarlo todo ahora',['Guardar parte del dinero para después, en vez de gastarlo todo ahora','Gastar todo en dulces','Pedir prestado sin devolver'])
    ]

  };

  /* ============================================================
     LECCIONES NARRADAS — listas para voz.js (text-to-speech)
     Estructura: EK.LECCIONES = { clave: { titulo, texto } }
     El engine puede ignorarlas; son un agregado opcional.
     ============================================================ */
  var LECCIONES = {
    la_acentuacion: {
      titulo: 'La Acentuación',
      texto: 'La sílaba tónica es la que pronunciamos con más fuerza. Si la fuerza cae en la última sílaba, la palabra es aguda: café, corazón. Las agudas llevan tilde si terminan en n, s o vocal. Si la fuerza está en la penúltima sílaba, es grave o llana: árbol, lápiz. Las graves llevan tilde si NO terminan en n, s o vocal. Si la fuerza está en la antepenúltima, es esdrújula: música, médico. Las palabras esdrújulas siempre, siempre llevan tilde. ¡Practica y lo dominarás!'
    },
    la_oracion: {
      titulo: 'La Oración',
      texto: 'Toda oración empieza con mayúscula y termina con punto. Tiene dos partes: el sujeto, de quien se dice algo, y el predicado, lo que se dice del sujeto. El núcleo del predicado es siempre un verbo. Si la oración no se puede separar en sujeto y predicado, es unimembre, como llueve. Si el sujeto no aparece pero se entiende por el verbo, es un sujeto tácito: canto, significa yo canto.'
    },
    el_verbo: {
      titulo: 'El Verbo',
      texto: 'El verbo indica acción, movimiento o estado. En infinitivo termina en ar, er o ir: cantar, comer, vivir. El gerundio termina en ando o iendo y expresa acción en curso: cantando, comiendo. El participio termina en ado o ido y se usa con haber: he comido. Los tiempos principales son presente, pasado o pretérito, y futuro. Algunos verbos son irregulares y cambian de raíz: ser, estar, ir, tener, hacer.'
    },
    la_narracion: {
      titulo: 'La Narración',
      texto: 'Una narración cuenta una historia. Tiene tres partes: planteamiento, donde se presentan los personajes y el lugar; nudo, donde aparece el conflicto o problema; y desenlace, donde se resuelve la historia. El personaje principal es el protagonista, y quien se opone es el antagonista. El narrador puede estar en primera persona, si es un personaje, o en tercera persona, si es un observador o un ser que todo lo sabe, llamado omnisciente.'
    },
    la_descripcion: {
      titulo: 'La Descripción',
      texto: 'Describir es decir cómo es algo o alguien. Para ello usamos adjetivos y los cinco sentidos: vista, oído, olfato, gusto y tacto. Si describimos el cuerpo de una persona, es prosopografía. Si describimos su carácter, es etopeya. Si juntamos ambas, hacemos un retrato. Si describimos un paisaje, es topografía. Una buena descripción permite que el lector imagine todo como si estuviera ahí.'
    },
    sujeto_predicado: {
      titulo: 'Sujeto y Predicado',
      texto: 'Para analizar una oración, primero buscamos el verbo. Luego preguntamos ¿quién? o ¿qué? realizan la acción: esa es el sujeto. Todo lo demás es el predicado. El núcleo del sujeto es un sustantivo o pronombre. El núcleo del predicado es el verbo. El complemento directo responde ¿qué? o ¿a quién?. El complemento indirecto responde ¿a quién? o ¿para quién? y va precedido de le o les. Los complementos circunstanciales indican lugar, tiempo, modo o cantidad.'
    },
    fechas_patrias: {
      titulo: 'Fechas Patrias Argentinas',
      texto: 'El 25 de Mayo de 1810 se produjo la Revolución de Mayo y se formó el Primer Gobierno Patrio. El 9 de Julio de 1816, en Tucumán, se declaró la Independencia. Manuel Belgrano creó la bandera en 1812, en Rosario, y por eso el 20 de Junio celebramos el Día de la Bandera. José de San Martín cruzó los Andes y liberó Chile y Perú. Domingo Faustino Sarmiento impulsó la educación pública, y el 11 de Septiembre, día de su muerte, celebramos el Día del Maestro.'
    },
    cuidado_ambiente: {
      titulo: 'Cuidado del Medio Ambiente',
      texto: 'Para cuidar el planeta recordamos las tres erres: reducir, usar menos; reutilizar, darle otra vida a las cosas; y reciclar, separar papel, plástico, vidrio y metal. El agua es un recurso vital: cerrá la canilla mientras te cepillas los dientes. La luz del sol y el viento son energías limpias y no se agotan. El petróleo y el carbón son recursos no renovables y contaminan. Cada acción pequeña, suma mucho.'
    }
  };

  /* ---- Registro en el objeto global EK ---- */
  window.EK = window.EK || {};
  EK.DATOS = EK.DATOS || {};
  EK.DATOS.lengua = LENGUA;
  EK.DATOS.sociales = SOCIALES;
  EK.LECCIONES = LECCIONES;

})();
