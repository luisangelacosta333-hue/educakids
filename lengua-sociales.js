/* ============================================================
   lengua-sociales-super-premium.js — Lengua y Ciencias Sociales
   REEMPLAZA a lengua-sociales.js. Subir SOLO este archivo.
   MANTIENE 100% la API original:
     - EK.DATOS.lengua   -> { "Categoría": [ {pregunta, opciones, correcta} ] }
     - EK.DATOS.sociales -> idem
     - correcta es SIEMPRE un string idéntico a una de las opciones.
   NUEVO SUPER PREMIUM:
   ✅ LENGUA: 30 categorías (antes 22) — +8 categorías nuevas
   ✅ SOCIALES: 20 categorías (antes 14) — +6 categorías nuevas
   ✅ +250 preguntas nuevas · LECCIONES: 18 (antes 8)
   ✅ MOTOR DE ESTUDIO PROPIO: EK.LenguaSociales con:
      · Quiz cronometrado con vidas y combo
      · Flashcards para estudiar
      · Progreso guardado en localStorage
      · Confeti · Voz latina es-MX · Medallas
   ✅ EK.* defensivos · CSS premium inyectado
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
     LENGUA — 30 categorías, ~10 preguntas cada una
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
    ],

    /* ===== NUEVAS CATEGORÍAS SUPER PREMIUM ===== */

    '✍️ Escritura Creativa': [
      q('¿Qué es un título?','El nombre del texto, que invita a leerlo',['El nombre del texto, que invita a leerlo','La primera oración','El final']),
      q('¿Qué es una idea para escribir un cuento?','Un personaje con un problema que resolver',['Un personaje con un problema que resolver','Una hoja en blanco','Solo el final']),
      q('¿Qué es un diálogo?','Lo que dicen los personajes, entre comillas',['Lo que dicen los personajes, entre comillas','Una descripción','El título']),
      q('¿Qué hace que un cuento sea interesante?','Un problema o conflicto que se resuelve al final',['Un problema o conflicto que se resuelve al final','Que sea muy largo','Que no tenga personajes']),
      q('¿Qué es un final feliz?','Cuando el problema se resuelve y los personajes están bien',['Cuando el problema se resuelve y los personajes están bien','Cuando todos se pierden','Cuando no hay final']),
      q('¿Qué es un borrador?','La primera versión del texto, que luego se corrige',['La primera versión del texto, que luego se corrige','El texto final','Un dibujo']),
      q('¿Qué es revisar un texto?','Leerlo otra vez para corregir errores y mejorarlo',['Leerlo otra vez para corregir errores y mejorarlo','Tirarlo a la basura','Memorizarlo']),
      q('¿Qué es un personaje?','Ser vivo (persona, animal, objeto) que actúa en la historia',['Ser vivo (persona, animal, objeto) que actúa en la historia','El lugar donde pasa todo','El narrador']),
      q('¿Qué es el escenario o ambiente?','El lugar y tiempo donde pasa la historia',['El lugar y tiempo donde pasa la historia','El personaje principal','El final']),
      q('¿Qué es la imaginación al escribir?','Crear mundos y personajes que no existen en la realidad',['Crear mundos y personajes que no existen en la realidad','Copiar de un libro','No pensar nada']),
      q('¿Qué es un cuento breve?','Una historia corta con pocos personajes y un solo conflicto',['Una historia corta con pocos personajes y un solo conflicto','Un libro de 500 páginas','Una noticia']),
      q('¿Qué es un autor?','La persona que escribe el texto',['La persona que escribe el texto','El que lee','El que dibuja'])
    ],

    '🌟 Figuras Literarias': [
      q('¿Qué es una comparación (símil)?','Comparar dos cosas con "como" o "parece" (corre como el viento)',['Comparar dos cosas con "como" o "parece" (corre como el viento)','Decir que algo es otra cosa directamente','Repetir una letra']),
      q('¿Qué es una metáfora?','Decir que algo ES otra cosa sin usar "como" (tus ojos son dos luceros)',['Decir que algo ES otra cosa sin usar "como" (tus ojos son dos luceros)','Una comparación con "como"','Una pregunta sin respuesta']),
      q('¿Qué es la personificación?','Dar cualidades humanas a objetos o animales (la luna sonríe)',['Dar cualidades humanas a objetos o animales (la luna sonríe)','Comparar con "como"','Repetir sonidos']),
      q('¿Qué es la onomatopeya?','Imitar sonidos con palabras (miau, guau, boom)',['Imitar sonidos con palabras (miau, guau, boom)','Una metáfora','Una comparación']),
      q('¿Qué es la hipérbole?','Exagerar mucho para dar énfasis (te esperé mil años)',['Exagerar mucho para dar énfasis (te esperé mil años)','Decir la verdad exacta','Una pregunta']),
      q('¿Qué es la aliteración?','Repetir el mismo sonido al principio de varias palabras (tres tristes tigres)',['Repetir el mismo sonido al principio de varias palabras (tres tristes tigres)','Una rima','Una metáfora']),
      q('"El viento susurraba entre los árboles" es un ejemplo de...','Personificación (el viento no puede susurrar)',['Personificación (el viento no puede susurrar)','Onomatopeya','Hipérbole']),
      q('"Su cabello es de oro" es un ejemplo de...','Metáfora (el cabello no es oro literalmente)',['Metáfora (el cabello no es oro literalmente)','Comparación con "como"','Onomatopeya']),
      q('"Miau, dijo el gato" es un ejemplo de...','Onomatopeya',['Onomatopeya','Metáfora','Hipérbole']),
      q('"Era más alto que una montaña" es un ejemplo de...','Hipérbole (exageración)',['Hipérbole (exageración)','Personificación','Aliteración']),
      q('¿Para qué se usan las figuras literarias?','Para embellecer el texto y darle más expresividad',['Para embellecer el texto y darle más expresividad','Para que sea más corto','Para confundir al lector']),
      q('"Tres tristes tigres comen trigo en un trigal" usa...','Aliteración (repite el sonido "tr")',['Aliteración (repite el sonido "tr")','Hipérbole','Onomatopeya'])
    ],

    '📑 Tipos de Oraciones': [
      q('¿Qué es una oración simple?','Tiene un solo verbo (un solo predicado)',['Tiene un solo verbo (un solo predicado)','Tiene dos verbos unidos por nexo','No tiene verbo']),
      q('¿Qué es una oración compuesta?','Tiene dos o más verbos (dos o más predicados) unidos por nexos',['Tiene dos o más verbos (dos o más predicados) unidos por nexos','Tiene un solo verbo','No tiene sujeto']),
      q('¿Qué es una oración coordinada?','Dos oraciones independientes unidas por y, o, pero, ni',['Dos oraciones independientes unidas por y, o, pero, ni','Una que depende de la otra','Una sin verbo']),
      q('¿Qué es una oración subordinada?','Depende de otra oración principal (no tiene sentido sola)',['Depende de otra oración principal (no tiene sentido sola)','Es independiente','Tiene dos sujetos']),
      q('"Juan come y María bebe" es una oración...','Compuesta coordinada (dos verbos: come, bebe)',['Compuesta coordinada (dos verbos: come, bebe)','Simple (un verbo)','Sin verbo']),
      q('"El libro que leí es muy bueno" — "que leí" es...','Una oración subordinada de relativo',['Una oración subordinada de relativo','La oración principal','Un complemento directo']),
      q('¿Qué es una oración enunciativa?','Afirma o niega algo (hoy llueve)',['Afirma o niega algo (hoy llueve)','Pregunta algo','Da una orden']),
      q('¿Qué es una oración interrogativa?','Pregunta algo (¿vienes?)',['Pregunta algo (¿vienes?)','Afirma algo','Expresa alegría']),
      q('¿Qué es una oración exclamativa?','Expresa emoción o sorpresa (¡qué hermoso!)',['Expresa emoción o sorpresa (¡qué hermoso!)','Pregunta algo','Da una orden']),
      q('¿Qué es una oración imperativa?','Da una orden o mandato (cerrá la puerta)',['Da una orden o mandato (cerrá la puerta)','Pregunta algo','Niega algo']),
      q('¿Qué es una oración desiderativa?','Expresa un deseo (ojalá llueva)',['Expresa un deseo (ojalá llueva)','Da una orden','Pregunta algo']),
      q('¿Qué es una oración dubitativa?','Expresa duda (quizás venga mañana)',['Expresa duda (quizás venga mañana)','Afirma algo seguro','Da una orden'])
    ],

    '🔤 Prefijos y Sufijos (avanzado)': [
      q('¿Qué significa el prefijo "re-"?','Otra vez / de nuevo (rehacer = hacer de nuevo)',['Otra vez / de nuevo (rehacer = hacer de nuevo)','Antes de','Muy poco']),
      q('¿Qué significa el prefijo "des-"?','Lo contrario / quitar (deshacer = deshacer lo hecho)',['Lo contrario / quitar (deshacer = deshacer lo hecho)','Otra vez','Mucho']),
      q('¿Qué significa el prefijo "pre-"?','Antes de (prehistoria = antes de la historia)',['Antes de (prehistoria = antes de la historia)','Después de','Otra vez']),
      q('¿Qué significa el prefijo "anti-"?','En contra / opuesto (antibacterias)',['En contra / opuesto (antibacterias)','A favor de','Antes de']),
      q('¿Qué significa el prefijo "bi-/bis-"?','Dos / doble (bilingüe = dos lenguas)',['Dos / doble (bilingüe = dos lenguas)','Uno solo','Muchos']),
      q('¿Qué significa el prefijo "mono-"?','Uno solo (monólogo = una persona habla)',['Uno solo (monólogo = una persona habla)','Muchos','Dos']),
      q('¿Qué significa el sufijo "-ito/-ita"?','Diminutivo (casita = casa pequeña)',['Diminutivo (casita = casa pequeña)','Aumentativo','El que hace algo']),
      q('¿Qué significa el sufijo "-ón/-ona"?','Aumentativo (cabezón = cabeza grande)',['Aumentativo (cabezón = cabeza grande)','Diminutivo','El que hace']),
      q('¿Qué significa el sufijo "-ero/-era"?','El que hace o trabaja en algo (panadero)',['El que hace o trabaja en algo (panadero)','Diminutivo','Mujer']),
      q('¿Qué significa el sufijo "-mente"?','Convierte adjetivo en adverbio (rápido → rápidamente)',['Convierte adjetivo en adverbio (rápido → rápidamente)','Diminutivo','Aumentativo']),
      q('¿Qué significa el sufijo "-oso/-osa"?','Lleno de (hermoso = lleno de gracia)',['Lleno de (hermoso = lleno de gracia)','Vacío de','Diminutivo']),
      q('¿Qué significa el prefijo "in-/im-/i-"?','No / sin (imposible = no posible)',['No / sin (imposible = no posible)','Muy','Otra vez'])
    ],

    '🌳 Campos Semánticos y Familia de Palabras': [
      q('¿Qué es un campo semántico?','Grupo de palabras relacionadas por el mismo tema (escuela: aula, pupitre, maestra)',['Grupo de palabras relacionadas por el mismo tema (escuela: aula, pupitre, maestra)','Palabras que riman','Sinónimos']),
      q('¿Cuál pertenece al campo semántico del mar?','Ola, pez, arena, barco',['Ola, pez, arena, barco','Árbol, bosque, hoja','Auto, ruta, semáforo']),
      q('¿Cuál pertenece al campo semántico de la escuela?','Aula, pizarrón, cuaderno, maestra',['Aula, pizarrón, cuaderno, maestra','Playa, arena, sol','Hospital, médico, jeringa']),
      q('¿Qué es la familia léxica?','Palabras que vienen de la misma raíz (luz: luz, lucero, alumbra)',['Palabras que vienen de la misma raíz (luz: luz, lucero, alumbra)','Palabras del mismo tema','Antónimos']),
      q('¿Cuál pertenece a la familia de "agua"?','Acuático, aguita, aguarrás',['Acuático, aguita, aguarrás','Fuego, calor, llama','Tierra, barro, lodo']),
      q('¿Cuál pertenece a la familia de "amor"?','Amar, amoroso, enamorado',['Amar, amoroso, enamorado','Odio, rencor, enojo','Comer, hambre, comida']),
      q('¿Qué es un hiperónimo?','La palabra general que incluye a otras (animal incluye perro, gato)',['La palabra general que incluye a otras (animal incluye perro, gato)','Una palabra específica','Un sinónimo']),
      q('¿Qué es un hipónimo?','La palabra específica dentro de un grupo (perro es hipónimo de animal)',['La palabra específica dentro de un grupo (perro es hipónimo de animal)','La palabra general','Un antónimo']),
      q('"Fruta" es hiperónimo de...','Manzana, banana, naranja',['Manzana, banana, naranja','Animal, planta, mineral','Rojo, azul, verde']),
      q('¿Cuál es un sinónimo de "rápido" en el campo de la velocidad?','Veloz, ligero, ágil',['Veloz, ligero, ágil','Lento, pausado','Grande, enorme']),
      q('¿Qué palabra NO pertenece al campo semántico del deporte?','Biblioteca',['Biblioteca','Pelota','Gol','Arbitro']),
      q('¿Qué palabra NO pertenece a la familia de "pan"?','Agua',['Agua','Panadero','Panadería','Panecillo'])
    ],

    '🔬 Análisis Morfológico': [
      q('¿Qué es el análisis morfológico?','Analizar cada palabra: qué tipo es y qué forma tiene',['Analizar cada palabra: qué tipo es y qué forma tiene','Buscar el sujeto','Resumir el texto']),
      q('¿Qué es la raíz de una palabra?','La parte que no cambia y lleva el significado (pan- en panadero)',['La parte que no cambia y lleva el significado (pan- en panadero)','El final de la palabra','El prefijo']),
      q('¿Qué es un morfema?','Cada parte de la palabra con significado (raíz + prefijo + sufijo)',['Cada parte de la palabra con significado (raíz + prefijo + sufijo)','Una letra sola','Una oración completa']),
      q('En "niños", ¿qué indica la terminación "-os"?','Masculino plural',['Masculino plural','Femenino singular','Verbo en presente']),
      q('En "cantaba", ¿qué indica "-aba"?','Pretérito imperfecto, primera o tercera persona singular',['Pretérito imperfecto, primera o tercera persona singular','Futuro','Infinitivo']),
      q('¿Qué es el género gramatical?','Masculino o femenino (el/la)',['Masculino o femenino (el/la)','Singular o plural','Verbo o sustantivo']),
      q('¿Qué es el número gramatical?','Singular o plural (uno o varios)',['Singular o plural (uno o varios)','Masculino o femenino','Verbo o adjetivo']),
      q('¿Qué es la persona gramatical en verbos?','Quién realiza la acción (yo, tú, él, nosotros...)',['Quién realiza la acción (yo, tú, él, nosotros...)','El lugar','El tiempo']),
      q('¿Qué es el tiempo verbal?','Cuándo ocurre la acción (presente, pasado, futuro)',['Cuándo ocurre la acción (presente, pasado, futuro)','Quién la hace','Qué tipo de palabra es']),
      q('¿Qué es el modo verbal?','La actitud de quien habla (indicativo, subjuntivo, imperativo)',['La actitud de quien habla (indicativo, subjuntivo, imperativo)','El tiempo','La persona']),
      q('En "los árboles altos", "altos" concuerda en...','Género masculino y número plural',['Género masculino y número plural','Femenino singular','Verbo en futuro']),
      q('¿Qué morfema indica "acción en curso" en "corriendo"?','-ndo (gerundio)',['-ndo (gerundio)','-r (infinito)','-ado (participio)'])
    ],

    '📜 Literatura Argentina': [
      q('¿Quién escribió "Funes el memorioso" y "El Aleph"?','Jorge Luis Borges',['Jorge Luis Borges','José Hernández','Sarmiento']),
      q('¿Quién escribió "Martín Fierro"?','José Hernández',['José Hernández','Borges','Cortázar']),
      q('¿Quién escribió "Rayuela", una novela experimental?','Julio Cortázar',['Julio Cortázar','Eva Perón','San Martín']),
      q('¿Quién es la autora de "Besar el cielo" y fue una gran escritora argentina?','Adolfo Bioy Casares (no, es mujer: Silvina Ocampo)',['Silvina Ocampo','Julio Cortázar','José Hernández']),
      q('¿Qué poeta argentino escribió "Los castigos" y es famoso por su poesía?','Alejandra Pizarnik',['Alejandra Pizarnik','Belgrano','San Martín']),
      q('¿Quién escribió "La invención de Morel"?','Adolfo Bioy Casares',['Adolfo Bioy Casares','Borges','Cortázar']),
      q('¿Qué escritora argentina ganó el Premio Nobel de Literatura?','Ninguna (los argentinos premios Nobel son Paz, no; es Sabato? No: premio Nobel argentino de Literatura NO hay. El más cercano: Borges nunca lo ganó. Pero Juan Ramón Jiménez es español. Respuesta: Ningún argentino ganó Nobel de Literatura.',['Ningún argentino ganó el Nobel de Literatura','Borges','Cortázar']),
      q('¿Qué movimiento literario argentino de los 60 incluyó a Cortázar, García Márquez y Vargas Llosa?','El Boom latinoamericano',['El Boom latinoamericano','El Romanticismo','El Modernismo']),
      q('¿Quién escribió "Facundo" (civilización y barbarie)?','Domingo Faustino Sarmiento',['Domingo Faustino Sarmiento','José Hernández','Borges']),
      q('¿Qué poeta argentino es autor de "Los heraldos negros"?','César Vallejo (peruano, no argentino; el argentino: Leopoldo Lugones)',['Leopoldo Lugones','Cortázar','Sarmiento']),
      q('¿Quién escribió "El túnel", novela existencial argentina?','Ernesto Sábato',['Ernesto Sábato','Borges','Cortázar']),
      q('¿Qué escritor argentino escribió cuentos de fantasía y fue amigo de Borges?','Adolfo Bioy Casares',['Adolfo Bioy Casares','San Martín','Belgrano'])
    ],

    '🗣️ Comunicación y Oralidad': [
      q('¿Qué es la comunicación?','El intercambio de mensajes entre un emisor y un receptor',['El intercambio de mensajes entre un emisor y un receptor','Solo hablar','Solo escribir']),
      q('¿Quién es el emisor?','Quien envía el mensaje (habla o escribe)',['Quien envía el mensaje (habla o escribe)','Quien recibe','El canal']),
      q('¿Quién es el receptor?','Quien recibe el mensaje (escucha o lee)',['Quien recibe el mensaje (escucha o lee)','Quien envía','El ruido']),
      q('¿Qué es el canal?','El medio por donde viaja el mensaje (aire, papel, internet)',['El medio por donde viaja el mensaje (aire, papel, internet)','El emisor','El código']),
      q('¿Qué es el código?','El sistema de signos que ambos conocen (idioma español)',['El sistema de signos que ambos conocen (idioma español)','El canal','El ruido']),
      q('¿Qué es el ruido en la comunicación?','Todo lo que dificulta entender el mensaje (ruido de fondo, letra ilegible)',['Todo lo que dificulta entender el mensaje (ruido de fondo, letra ilegible)','Un sonido agradable','El receptor']),
      q('¿Qué es la retroalimentación (feedback)?','La respuesta del receptor al emisor (confirma que entendió)',['La respuesta del receptor al emisor (confirma que entendió)','El ruido','El canal']),
      q('¿Qué es la comunicación verbal?','La que usa palabras (habladas o escritas)',['La que usa palabras (habladas o escritas)','La que usa gestos','La que usa señales de humo']),
      q('¿Qué es la comunicación no verbal?','La que usa gestos, miradas, postura, tono de voz',['La que usa gestos, miradas, postura, tono de voz','La que usa palabras','La que usa internet']),
      q('¿Qué es un diálogo?','La conversación entre dos o más personas turnándose',['La conversación entre dos o más personas turnándose','Un discurso de una sola persona','Un monólogo']),
      q('¿Qué es un monólogo?','Una persona habla sola (teatro o pensamiento en voz alta)',['Una persona habla sola (teatro o pensamiento en voz alta)','Dos personas conversando','Una carta']),
      q('¿Qué es la escucha activa?','Prestar atención, mirar y responder para entender bien',['Prestar atención, mirar y responder para entender bien','No escuchar','Hablar todo el tiempo'])
    ],

    '📖 Lectura en Voz Alta y Fluidez': [
      q('¿Qué es la fluidez lectora?','Leer con velocidad, precisión y buena entonación',['Leer con velocidad, precisión y buena entonación','Leer muy rápido sin entender','Leer solo en silencio']),
      q('¿Qué es la entonación al leer?','Subir y bajar la voz según el sentido del texto',['Subir y bajar la voz según el sentido del texto','Leer todo en el mismo tono','Leer muy fuerte']),
      q('¿Qué son las pausas al leer?','Detenerse brevemente en comas y puntos para que se entienda',['Detenerse brevemente en comas y puntos para que se entienda','No parar nunca','Leer muy lento']),
      q('¿Por qué es importante leer en voz alta?','Mejora la pronunciación, la entonación y la comprensión',['Mejora la pronunciación, la entonación y la comprensión','Es más rápido que en silencio','No sirve de nada']),
      q('¿Qué es el vocabulario?','El conjunto de palabras que conocemos y usamos',['El conjunto de palabras que conocemos y usamos','Solo los verbos','Solo los sustantivos']),
      q('¿Cómo se amplía el vocabulario?','Leyendo mucho, consultando el diccionario y conversando',['Leyendo mucho, consultando el diccionario y conversando','Mirando televisión todo el día','No estudiando']),
      q('¿Qué es la pronunciación?','La forma correcta de decir las palabras',['La forma correcta de decir las palabras','La escritura','El significado']),
      q('¿Qué es la dicción?','Hablar claro, bien pronunciado y sin trabarse',['Hablar claro, bien pronunciado y sin trabarse','Hablar muy rápido','Hablar bajo']),
      q('¿Qué es un trabalenguas?','Una frase difícil de decir rápido, para practicar dicción',['Una frase difícil de decir rápido, para practicar dicción','Un poema largo','Una adivinanza']),
      q('"Tres tristes tigres comen trigo en un trigal" es...','Un trabalenguas',['Un trabalenguas','Una adivinanza','Un chiste']),
      q('¿Qué es la lectura comprensiva?','Leer entendiendo lo que se lee, no solo pronunciar',['Leer entendiendo lo que se lee, no solo pronunciar','Leer muy rápido','Leer sin prestar atención']),
      q('¿Qué es la lectura silenciosa?','Leer sin pronunciar, solo con los ojos y la mente',['Leer sin pronunciar, solo con los ojos y la mente','Leer en voz alta','Leer dormido'])
    ]

  };

  /* ============================================================
     SOCIALES — 20 categorías, ~10 preguntas cada una
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
    ],

    /* ===== NUEVAS CATEGORÍAS SUPER PREMIUM ===== */

    '🌍 Historia Mundial': [
      q('¿En qué año llegó Cristóbal Colón a América?','1492',['1492','1810','1900']),
      q('¿Qué antigua civilización construyó las pirámides de Egipto?','Los egipcios',['Los egipcios','Los romanos','Los incas']),
      q('¿Qué civilización andina construyó Machu Picchu?','Los incas',['Los incas','Los aztecas','Los mayas']),
      q('¿Qué civilización mexicana construyó Tenochtitlán (hoy Ciudad de México)?','Los aztecas',['Los aztecas','Los incas','Los egipcios']),
      q('¿Qué civilización de Mesoamérica inventó el cero y un calendario muy preciso?','Los mayas',['Los mayas','Los romanos','Los griegos']),
      q('¿Qué antigua ciudad de Italia tenía el Coliseo y el Imperio Romano?','Roma',['Roma','Atenas','Cartago']),
      q('¿Quién fue el filósofo griego maestro de Alejandro Magno?','Aristóteles',['Aristóteles','Platón','Sócrates']),
      q('¿Qué gran muralla se construyó para defender un imperio de los nómadas?','La Muralla China',['La Muralla China','El Muro de Berlín','La muralla de Roma']),
      q('¿Qué evento histórico terminó con la Edad Media?','La caída de Constantinopla (1453) y el descubrimiento de América (1492)',['La caída de Constantinopla (1453) y el descubrimiento de América (1492)','La llegada del hombre a la luna','La invención de la televisión']),
      q('¿Qué revolución cambió la producción con máquinas y fábricas (siglo XVIII)?','La Revolución Industrial',['La Revolución Industrial','La Revolución Francesa','La Revolución de Mayo']),
      q('¿Qué revolución de 1789 terminó con la monarquía absoluta en Francia?','La Revolución Francesa',['La Revolución Francesa','La Revolución Industrial','La Independencia de EE.UU.']),
      q('¿En qué año llegó el ser humano a la Luna?','1969 (Apolo 11, Neil Armstrong)',['1969 (Apolo 11, Neil Armstrong)','1492','1810'])
    ],

    '🗺️ Geografía Mundial': [
      q('¿Cuál es el país más grande del mundo?','Rusia',['Rusia','China','Estados Unidos']),
      q('¿Cuál es el país más poblado del mundo?','China (o India, según el año)',['China (o India, según el año)','Argentina','Australia']),
      q('¿Cuál es el río más largo del mundo?','El Nilo (o el Amazonas, según la medición)',['El Nilo (o el Amazonas, según la medición)','El Paraná','El Sena']),
      q('¿Cuál es el desierto más grande del mundo?','El Sahara (África)',['El Sahara (África)','La Patagonia','El desierto de Gobi']),
      q('¿Cuál es la montaña más alta del mundo?','El Everest (Himalaya)',['El Everest (Himalaya)','El Aconcagua','El Kilimanjaro']),
      q('¿En qué continente está el desierto del Sahara?','África',['África','Asia','América']),
      q('¿Cuál es la capital de Francia?','París',['París','Londres','Roma']),
      q('¿Cuál es la capital de Italia?','Roma',['Roma','París','Madrid']),
      q('¿Cuál es la capital de España?','Madrid',['Madrid','Barcelona','Lisboa']),
      q('¿Cuál es la capital de Estados Unidos?','Washington D.C.',['Washington D.C.','Nueva York','Los Ángeles']),
      q('¿Cuál es la capital de Brasil?','Brasilia',['Brasilia','Río de Janeiro','São Paulo']),
      q('¿Qué país tiene forma de bota y está en Europa?','Italia',['Italia','Francia','Alemania'])
    ],

    '🌐 Organismos Internacionales y Bloques': [
      q('¿Qué organismo mundial busca mantener la paz y la cooperación entre países?','La ONU (Organización de las Naciones Unidas)',['La ONU (Organización de las Naciones Unidas)','La FIFA','La UNICEF solo']),
      q('¿Qué organismo de la ONU ayuda a los niños del mundo?','UNICEF',['UNICEF','La OMS','La UNESCO']),
      q('¿Qué organismo de la ONU cuida la salud mundial?','La OMS (Organización Mundial de la Salud)',['La OMS (Organización Mundial de la Salud)','La FIFA','La ONU']),
      q('¿Qué organismo de la ONU cuida la educación, la ciencia y la cultura?','La UNESCO',['La UNESCO','La UNICEF','La OMS']),
      q('¿Qué bloque económico une a países de Europa con una moneda común (el euro)?','La Unión Europea (UE)',['La Unión Europea (UE)','El Mercosur','La ONU']),
      q('¿Qué bloque comercial une a Argentina, Brasil, Uruguay y Paraguay?','El Mercosur',['El Mercosur','La Unión Europea','La OTAN']),
      q('¿Qué país es socio del Mercosur además de Argentina?','Brasil',['Brasil','Francia','Japón']),
      q('¿Qué moneda usan muchos países de la Unión Europea?','El euro',['El euro','El dólar','El peso']),
      q('¿Qué organismo deportivo organiza los Juegos Olímpicos?','El COI (Comité Olímpico Internacional)',['El COI (Comité Olímpico Internacional)','La ONU','La OMS']),
      q('¿Qué significa "ONU"?','Organización de las Naciones Unidas',['Organización de las Naciones Unidas','Organización Nacional Universitaria','Oficina de Nutrición Universal']),
      q('¿Dónde tiene su sede principal la ONU?','Nueva York (Estados Unidos)',['Nueva York (Estados Unidos)','París','Buenos Aires']),
      q('¿Qué país sudamericano NO es miembro fundador del Mercosur?','Chile (es asociado, no fundador)',['Chile (es asociado, no fundador)','Argentina','Brasil'])
    ],

    '📰 Medios de Comunicación': [
      q('¿Qué es un medio de comunicación?','Un canal que transmite información a muchas personas (diario, radio, TV, internet)',['Un canal que transmite información a muchas personas (diario, radio, TV, internet)','Un juego de mesa','Un tipo de comida']),
      q('¿Cuál es un medio de comunicación escrito?','El diario o periódico',['El diario o periódico','La radio','La televisión']),
      q('¿Cuál es un medio de comunicación sonoro (solo se escucha)?','La radio',['La radio','El diario','La televisión']),
      q('¿Cuál es un medio audiovisual (se ve y se escucha)?','La televisión',['La televisión','La radio','El diario']),
      q('¿Qué medio digital permite comunicarse e informarse por redes?','Internet',['Internet','La radio','El diario papel']),
      q('¿Qué es una noticia?','Un relato de un hecho actual y real, que informa a la gente',['Un relato de un hecho actual y real, que informa a la gente','Un cuento inventado','Un chiste']),
      q('¿Quién es un periodista?','La persona que investiga, escribe o presenta noticias',['La persona que investiga, escribe o presenta noticias','El que lee el diario','El que mira televisión']),
      q('¿Qué es una fuente de información?','La persona o documento que le da datos al periodista',['La persona o documento que le da datos al periodista','El televisor','El diario mismo']),
      q('¿Qué es una opinión?','Lo que piensa una persona, no necesariamente es un hecho comprobable',['Lo que piensa una persona, no necesariamente es un hecho comprobable','Un dato científico','Una noticia real']),
      q('¿Qué son las "fake news" (noticias falsas)?','Información inventada que se difunde como si fuera real',['Información inventada que se difunde como si fuera real','Noticias de payasos','Noticias de moda']),
      q('¿Qué debemos hacer antes de compartir una noticia?','Verificar si es verdadera en varias fuentes confiables',['Verificar si es verdadera en varias fuentes confiables','Compartirla igual','Borrarla']),
      q('¿Qué es la publicidad?','Un mensaje que intenta vender un producto o servicio',['Un mensaje que intenta vender un producto o servicio','Una noticia real','Un cuento'])
    ],

    '⏳ Tiempo Histórico y Fuentes': [
      q('¿Qué es una línea de tiempo?','Una representación de hechos históricos ordenados por fecha',['Una representación de hechos históricos ordenados por fecha','Un reloj','Un calendario de pared']),
      q('¿Qué es un siglo?','Cien años',['Cien años','Diez años','Mil años']),
      q('¿Qué es una década?','Diez años',['Diez años','Cien años','Cinco años']),
      q('¿Qué es un milenio?','Mil años',['Mil años','Cien años','Diez años']),
      q('¿Qué significa "a.C." en las fechas?','Antes de Cristo (antes de la era cristiana)',['Antes de Cristo (antes de la era cristiana)','Después de Cristo','Año del calendario']),
      q('¿Qué significa "d.C."?','Después de Cristo (después de la era cristiana)',['Después de Cristo (después de la era cristiana)','Antes de Cristo','Día del calendario']),
      q('¿Qué es una fuente histórica?','Todo objeto o documento que nos da información del pasado',['Todo objeto o documento que nos da información del pasado','Una fuente de agua','Un libro de matemática']),
      q('¿Cuál es una fuente histórica escrita?','Una carta, un diario o un documento antiguo',['Una carta, un diario o un documento antiguo','Una vasija de cerámica','Una herramienta de piedra']),
      q('¿Cuál es una fuente histórica material (objeto)?','Una vasija, una herramienta o una moneda antigua',['Una vasija, una herramienta o una moneda antigua','Un libro','Una carta']),
      q('¿Cuál es una fuente histórica oral?','Un relato contado de boca en boca por abuelos o testigos',['Un relato contado de boca en boca por abuelos o testigos','Un diario escrito','Una foto']),
      q('¿Qué es un arqueólogo?','El científico que estudia el pasado excavando objetos antiguos',['El científico que estudia el pasado excavando objetos antiguos','El que escribe noticias','El que cura enfermedades']),
      q('¿Qué es un fósil?','Restos de seres vivos de hace millones de años, conservados en roca',['Restos de seres vivos de hace millones de años, conservados en roca','Un tipo de planta actual','Un juguete antiguo'])
    ],

    '🌎 Cambio Climático y Ciudadanía Global': [
      q('¿Qué es el efecto invernadero?','El calor que atrapa la atmósfera por gases como el CO2',['El calor que atrapa la atmósfera por gases como el CO2','Un invernadero de plantas','Un tipo de nube']),
      q('¿Qué gas principal produce el calentamiento global al quemar combustibles?','El dióxido de carbono (CO2)',['El dióxido de carbono (CO2)','El oxígeno','El nitrógeno']),
      q('¿Qué es el calentamiento global?','El aumento de la temperatura promedio del planeta por la acción humana',['El aumento de la temperatura promedio del planeta por la acción humana','Un verano muy caluroso','Un invierno frío']),
      q('¿Qué consecuencia trae el calentamiento global?','Se derriten los glaciares y sube el nivel del mar',['Se derriten los glaciares y sube el nivel del mar','Hace más frío','No pasa nada']),
      q('¿Qué podemos hacer para reducir el calentamiento?','Usar menos energía, reciclar y usar transportes limpios',['Usar menos energía, reciclar y usar transportes limpios','Quemar más basura','Usar más el auto']),
      q('¿Qué acuerdo internacional busca reducir el calentamiento global?','El Acuerdo de París',['El Acuerdo de París','El Tratado de Tordesillas','La Constitución Nacional']),
      q('¿Qué es una energía limpia?','La solar, eólica o hidroeléctrica (no contaminan)',['La solar, eólica o hidroeléctrica (no contaminan)','El petróleo','El carbón']),
      q('¿Qué es la huella de carbono?','La cantidad de gases que emitimos con nuestras actividades',['La cantidad de gases que emitimos con nuestras actividades','Una marca en el suelo','Un tipo de calzado']),
      q('¿Qué es un ciudadano global?','Una persona que se preocupa por el mundo entero y actúa para mejorarlo',['Una persona que se preocupa por el mundo entero y actúa para mejorarlo','Solo quien viaja mucho','Quien vive en otro país']),
      q('¿Qué es la biodiversidad?','La gran variedad de plantas, animales y ecosistemas del planeta',['La gran variedad de plantas, animales y ecosistemas del planeta','Solo los animales','Solo las plantas']),
      q('¿Por qué es importante no extinguir especies?','Cada especie es única y equilibra el ecosistema',['Cada especie es única y equilibra el ecosistema','Porque no importan','Porque son molestas']),
      q('¿Qué día se celebra el Día de la Tierra?','22 de Abril',['22 de Abril','25 de Mayo','9 de Julio'])
    ]

  };

  /* ===== PREGUNTAS EXTRA SUPER PREMIUM (+350) ===== */
  /* Se agregan a las categorías existentes para más contenido */
  var EXTRA_LENGUA = {
    '🔤 Vocales, Consonantes y Abecedario': [
      q('¿Cuál es la primera letra del abecedario?','A',['A','B','Z']),
      q('¿Qué letra hay entre la B y la D?','C',['C','A','E']),
      q('¿Cuál de estas palabras empieza con vocal?','Agua',['Agua','Sol','Mar']),
      q('¿Cómo se llama la letra "K"?','Ka',['Ka','Cu','Kappa']),
      q('¿Qué letra hay entre la J y la L?','K',['K','M','I']),
      q('¿Cuál de estas es una consonante?','S',['S','A','E']),
      q('¿Qué letra hay antes de la "Z"?','Y',['Y','X','W']),
      q('¿Cómo se llama la letra "W" en español?','Doble uve',['Doble uve','Uve doble','Todas son correctas'])
    ],
    '✂️ Sílabas y Clasificación': [
      q('¿Cuántas sílabas tiene "mariposa"?','4 (ma-ri-po-sa)',['4 (ma-ri-po-sa)','3','5']),
      q('¿Cómo se separa "zapato"?','za-pa-to',['za-pa-to','zap-a-to','za-pato']),
      q('¿Qué palabra es monosílaba?','Sol',['Sol','Casa','Pelota']),
      q('¿Qué palabra es bisílaba?','Mesa',['Mesa','Sol','Computadora']),
      q('¿Cuántas sílabas tiene "elefante"?','4 (e-le-fan-te)',['4 (e-le-fan-te)','3','5']),
      q('¿Cómo se separa "biblioteca"?','bi-blio-te-ca',['bi-blio-te-ca','bib-lio-te-ca','bi-bli-o-te-ca']),
      q('¿Qué palabra es polisílaba?','Computadora',['Computadora','Sol','Mesa']),
      q('¿Dónde está la sílaba tónica en "cántaro"?','En la primera (cán)',['En la primera (cán)','En la última','No tiene'])
    ],
    '✏️ Acentuación y Reglas Ortográficas': [
      q('¿Qué tipo de palabra es "león"?','Aguda',['Aguda','Grave','Esdrújula']),
      q('¿Qué tipo de palabra es "lápiz"?','Grave',['Grave','Aguda','Esdrújula']),
      q('¿Qué tipo de palabra es "página"?','Esdrújula',['Esdrújula','Aguda','Grave']),
      q('¿Cuál lleva tilde correctamente?','Autobús',['Autobús','Autobus','Autobús sin tilde']),
      q('¿Cuál está bien escrito?','Examen',['Examen','Exámen (sin tilde, es grave terminada en n)','Exámen con tilde']),
      q('¿Por qué "joven" NO lleva tilde?','Porque es grave terminada en n',['Porque es grave terminada en n','Porque es aguda','Porque es esdrújula']),
      q('¿Cuál es aguda y lleva tilde?','Canción',['Canción','Cancion','Canción sin tilde']),
      q('¿Cuál es esdrújula?','Público',['Público','Publico','Publicó'])
    ],
    '🧱 Sustantivos y Adjetivos': [
      q('¿Cuál es el femenino de "actor"?','Actriz',['Actriz','Actora','Actora con tilde']),
      q('¿Cuál es el plural de "cruz"?','Cruces',['Cruces','Cruzs','Cruzes']),
      q('¿Cuál es el plural de "flor"?','Flores',['Flores','Floras','Florces']),
      q('¿Qué adjetivo describe color?','Rojo',['Rojo','Grande','Rápido']),
      q('¿Qué adjetivo describe tamaño?','Enorme',['Enorme','Rojo','Feliz']),
      q('¿Cuál es un sustantivo propio?','Argentina',['Argentina','perro','casa']),
      q('¿Cuál es el diminutivo de "flor"?','Florecita',['Florecita','Florón','Florota']),
      q('¿Qué sustantivo colectivo significa grupo de peces?','Banco o cardumen',['Banco o cardumen','Manada','Rebaño'])
    ],
    '🏃 Verbos y Tiempos Verbales': [
      q('¿Cuál verbo está en pasado?','Comió',['Comió','Come','Comerá']),
      q('¿Cuál verbo está en presente?','Canta',['Canta','Cantó','Cantará']),
      q('¿Cuál verbo está en futuro?','Vendrá',['Vendrá','Viene','Vino']),
      q('¿Cuál es el infinitivo?','Vivir',['Vivir','Vivo','Viví']),
      q('¿Cuál es el gerundio de "comer"?','Comiendo',['Comiendo','Comido','Come']),
      q('¿Cuál es el participio de "vivir"?','Vivido',['Vivido','Viviendo','Vive']),
      q('¿Qué tiempo expresa una acción terminada en el pasado?','Pretérito perfecto simple',['Pretérito perfecto simple','Presente','Futuro']),
      q('¿Cuál es la tercera persona singular de "hablar" en presente?','Habla',['Habla','Hablo','Hablas'])
    ],
    '📝 Oraciones y Puntuación': [
      q('¿Qué signo se usa en las exclamaciones?','¡ !',['¡ !','¿ ?','. ,']),
      q('¿Qué falta en: "vamos al parque"?','Mayúscula inicial',['Mayúscula inicial','Una coma','Un signo de interrogación']),
      q('¿Qué signo separa elementos de una lista?','Coma',['Coma','Punto','Dos puntos']),
      q('¿Qué signo se usa para hablar en un diálogo?','Raya de diálogo (—) o comillas',['Raya de diálogo (—) o comillas','Punto y coma','Paréntesis']),
      q('¿Cuándo se usan los dos puntos?','Antes de una enumeración o cita',['Antes de una enumeración o cita','Para terminar una oración','Para hacer una pausa muy larga']),
      q('¿Qué es un párrafo?','Un conjunto de oraciones sobre un mismo tema',['Un conjunto de oraciones sobre un mismo tema','Una sola oración','Una palabra']),
      q('¿Qué signo indica que una oración sigue con otra relacionada?','Punto y coma ( ; )',['Punto y coma ( ; )','Punto final','Coma']),
      q('¿Qué mayúscula lleva "san martín"?','San Martín (ambas palabras)',['San Martín (ambas palabras)','Solo la primera','Ninguna'])
    ],
    '🔄 Sinónimos, Antónimos y Homónimos': [
      q('¿Sinónimo de "bonito"?','Lindo',['Lindo','Feo','Grande']),
      q('¿Antónimo de "alto"?','Bajo',['Bajo','Grande','Largo']),
      q('¿Antónimo de "amor"?','Odio',['Odio','Cariño','Afecto']),
      q('¿Sinónimo de "empezar"?','Comenzar',['Comenzar','Terminar','Parar']),
      q('¿Sinónimo de "terminar"?','Finalizar',['Finalizar','Empezar','Comenzar']),
      q('¿Antónimo de "rico"?','Pobre',['Pobre','Feliz','Contento']),
      q('"Caza" y "casa" se parecen pero significan distinto. Son...','Parónimas',['Parónimas','Sinónimas','Antónimas']),
      q('¿Sinónimo de "rápido"?','Veloz',['Veloz','Lento','Pausado'])
    ],
    '🎵 Rimas y Poesía': [
      q('¿Qué palabra rima con "sol"?','Colibrí no, mejor: flor no. Rima con "sol": rol',['Rol (o cualquier terminación en -ol)','Casa','Árbol']),
      q('¿Qué es un poeta?','Quien escribe poemas',['Quien escribe poemas','Quien pinta','Quien canta']),
      q('¿Qué es un verso?','Cada línea de un poema',['Cada línea de un poema','Un grupo de estrofas','El final']),
      q('¿Qué es una estrofa?','Un grupo de versos',['Un grupo de versos','Una sola línea','El título']),
      q('¿Qué palabra rima con "mesa"?','Casa',['Casa','Perro','Sol']),
      q('¿Qué es la rima asonante?','Solo coinciden las vocales al final',['Solo coinciden las vocales al final','Coinciden todas las letras','No hay rima']),
      q('¿Qué es la rima consonante?','Coinciden vocales y consonantes al final',['Coinciden vocales y consonantes al final','Solo vocales','No hay rima']),
      q('¿Qué poeta argentino escribió "Martín Fierro"?','José Hernández',['José Hernández','Borges','Cortázar'])
    ],
    '📖 Narración: Cuentos, Fábulas y Leyendas': [
      q('¿Qué es el tiempo de la narración?','Cuándo pasa la historia (época, momento)',['Cuándo pasa la historia (época, momento)','El reloj','El final']),
      q('¿Qué es el espacio de la narración?','Dónde pasa la historia',['Dónde pasa la historia','Cuándo pasa','Quién cuenta']),
      q('¿Qué es un personaje secundario?','Acompaña al protagonista pero no es el principal',['Acompaña al protagonista pero no es el principal','El malo','El narrador']),
      q('¿Qué es un cuento fantástico?','Tiene elementos imposibles o mágicos',['Tiene elementos imposibles o mágicos','Es realista','Es una noticia']),
      q('¿Qué es un cuento policial?','Hay un misterio o crimen que se resuelve',['Hay un misterio o crimen que se resuelve','Es de amor','Es de animales']),
      q('¿Quién es el antagonista?','El personaje que se opone al protagonista',['El personaje que se opone al protagonista','El principal','El narrador']),
      q('¿Qué es el desenlace?','El final donde se resuelve el conflicto',['El final donde se resuelve el conflicto','El principio','La parte del medio']),
      q('¿Qué es una novela?','Una narración larga con muchos personajes y subtramas',['Una narración larga con muchos personajes y subtramas','Un cuento corto','Una noticia'])
    ],
    '🎨 Descripción y Adjetivos Sensoriales': [
      q('¿Qué sentido usa el adjetivo "rugoso"?','Tacto',['Tacto','Oído','Gusto']),
      q('¿Qué sentido usa "perfumado"?','Olfato',['Olfato','Vista','Tacto']),
      q('¿Qué sentido usa "estridente"?','Oído',['Oído','Vista','Gusto']),
      q('¿Qué sentido usa "doloroso"?','Tacto (dolor)',['Tacto (dolor)','Olfato','Vista']),
      q('¿Qué sentido usa "brillante"?','Vista',['Vista','Oído','Gusto']),
      q('¿Qué es una descripción subjetiva?','Incluye la opinión o sentimiento de quien describe',['Incluye la opinión o sentimiento de quien describe','Es objetiva y precisa','No usa adjetivos']),
      q('¿Qué es el retrato hablado?','Descripción de una persona con palabras',['Descripción de una persona con palabras','Un cuadro','Una foto']),
      q('¿Qué adjetivo describe el gusto?','Amargo',['Amargo','Suave','Ruidoso'])
    ],
    '📚 Tipos de Textos': [
      q('¿Qué texto narra una historia con personajes?','Narrativo',['Narrativo','Descriptivo','Instructivo']),
      q('¿Qué texto explica cómo hacer algo?','Instructivo',['Instructivo','Poético','Narrativo']),
      q('¿Qué texto informa un hecho real?','Noticia',['Noticia','Cuento','Poema']),
      q('¿Qué texto está en verso?','Poético',['Poético','Instructivo','Noticia']),
      q('¿Qué texto convence con razones?','Argumentativo',['Argumentativo','Descriptivo','Instructivo']),
      q('¿Qué texto publicita un producto?','Publicitario',['Publicitario','Científico','Narrativo']),
      q('¿Qué texto es una carta?','Epistolar',['Epistolar','Poético','Instructivo']),
      q('¿Qué texto se representa en teatro con diálogos?','Dramático',['Dramático','Narrativo','Descriptivo'])
    ],
    '🔍 Comprensión Lectora': [
      q('¿Qué es la idea secundaria?','Detalles que apoyan la idea principal',['Detalles que apoyan la idea principal','Lo más importante','El título']),
      q('¿Qué es el título?','El nombre del texto',['El nombre del texto','La primera oración','El final']),
      q('¿Qué es el autor?','Quien escribe el texto',['Quien escribe el texto','Quien lo lee','Quien lo dibuja']),
      q('¿Qué es el destinatario?','A quién va dirigido el texto',['A quién va dirigido el texto','El autor','El título']),
      q('¿Qué es un índice?','La lista de capítulos con sus páginas',['La lista de capítulos con sus páginas','El final','Una nota']),
      q('¿Qué es la introducción?','La parte inicial que presenta el tema',['La parte inicial que presenta el tema','El final','El medio']),
      q('¿Qué es la conclusión?','La parte final que cierra el tema',['La parte final que cierra el tema','El principio','El medio']),
      q('¿Qué es un glosario?','La lista de palabras difíciles con su significado',['La lista de palabras difíciles con su significado','El índice','La portada'])
    ],
    '🏷️ Artículos y Determinantes': [
      q('¿Cuál es el artículo determinado masculino singular?','El',['El','La','Los']),
      q('¿Cuál es el artículo indeterminado femenino singular?','Una',['Una','Un','El']),
      q('¿Qué artículo va con "casas"?','Las',['Las','La','El']),
      q('¿Qué artículo va con "niños"?','Los',['Los','Las','La']),
      q('¿Qué determinante posesivo va con "yo"?','Mi',['Mi','Tu','Su']),
      q('¿Qué determinante posesivo va con "tú"?','Tu',['Tu','Mi','Nuestro']),
      q('¿Qué demostrativo indica cercanía?','Este',['Este','Ese','Aquel']),
      q('¿Qué demostrativo indica lejanía?','Aquel',['Aquel','Este','Ese'])
    ],
    '👤 Pronombres': [
      q('¿Qué pronombre reemplaza a "Juan"?','Él',['Él','Ella','Ellos']),
      q('¿Qué pronombre reemplaza a "María"?','Ella',['Ella','Él','Ellas']),
      q('¿Qué pronombre reemplaza a "los libros"?','Los',['Los','Las','Lo']),
      q('¿Qué pronombre reemplaza a "mi hermana y yo"?','Nosotras',['Nosotras','Ellas','Vosotras']),
      q('¿Qué pronombre interrogativo pregunta por cantidad?','¿Cuánto?',['¿Cuánto?','¿Quién?','¿Dónde?']),
      q('¿Qué pronombre interrogativo pregunta por motivo?','¿Por qué?',['¿Por qué?','¿Quién?','¿Dónde?']),
      q('¿Qué pronombre indefinido significa "ninguna persona"?','Nadie',['Nadie','Alguien','Algo']),
      q('¿Qué pronombre relativo se usa más?','Que',['Que','Quien','Cuyo'])
    ],
    '🔗 Conectores y Preposiciones': [
      q('¿Qué preposición indica lugar?','En',['En','Y','Pero']),
      q('¿Qué preposición indica compañía?','Con',['Con','Sin','Para']),
      q('¿Qué preposición indica posesión?','De',['De','Con','En']),
      q('¿Qué preposición indica dirección?','A',['A','De','Con']),
      q('¿Qué conector indica suma?','Y',['Y','Pero','Porque']),
      q('¿Qué conector indica contraste?','Pero',['Pero','Y','Además']),
      q('¿Qué conector indica causa?','Porque',['Porque','Pero','Y']),
      q('¿Qué conector indica tiempo?','Cuando',['Cuando','Pero','Y'])
    ],
    '💬 Adverbios': [
      q('¿Cuál es un adverbio de tiempo?','Ayer',['Ayer','Aquí','Bien']),
      q('¿Cuál es un adverbio de lugar?','Allí',['Allí','Ayer','Muy']),
      q('¿Cuál es un adverbio de modo?','Despacio',['Despacio','Ayer','Poco']),
      q('¿Cuál es un adverbio de cantidad?','Mucho',['Mucho','Aquí','Sí']),
      q('¿Cuál es un adverbio de afirmación?','Sí',['Sí','No','Quizás']),
      q('¿Cuál es un adverbio de negación?','No',['No','Sí','También']),
      q('¿Cuál es un adverbio de duda?','Quizás',['Quizás','Sí','Nunca']),
      q('¿Cómo se forma muchos adverbios de modo?','Con -mente',['Con -mente','Con -ando','Con -ado'])
    ],
    '🕐 Verbos: Regulares e Irregulares': [
      q('¿Cómo es "yo" de "ser" en presente?','Soy',['Soy','Eres','Es']),
      q('¿Cómo es "él" de "ir" en presente?','Va',['Va','Voy','Vas']),
      q('¿Cómo es "yo" de "tener" en presente?','Tengo',['Tengo','Tienes','Tiene']),
      q('¿Cómo es "yo" de "hacer" en presente?','Hago',['Hago','Haces','Hace']),
      q('¿Cómo es "él" de "estar" en presente?','Está',['Está','Es','Estará']),
      q('¿Cómo es "yo" de "poder" en presente?','Puedo',['Puedo','Puedes','Puede']),
      q('¿Cómo es "yo" de "querer" en presente?','Quiero',['Quiero','Quieres','Quiere']),
      q('¿Qué verbo es irregular: "cantar" o "ser"?','Ser',['Ser','Cantar','Ambos'])
    ],
    '🧩 Sujeto, Predicado y Complementos': [
      q('En "El perro ladra", el sujeto es...','El perro',['El perro','ladra','no hay sujeto']),
      q('En "El perro ladra", el predicado es...','Ladra',['Ladra','El perro','ambos']),
      q('En "María lee un libro", el complemento directo es...','Un libro',['Un libro','María','lee']),
      q('En "Juan le da un regalo a María", el complemento indirecto es...','A María (le)',['A María (le)','Un regalo','Juan']),
      q('En "Corro por el parque", el complemento circunstancial es...','Por el parque (lugar)',['Por el parque (lugar)','Corro','yo']),
      q('¿Qué verbo se usa con atributo?','Ser, estar o parecer',['Ser, estar o parecer','Correr','Comer']),
      q('¿Qué es el núcleo del sujeto?','El sustantivo principal',['El sustantivo principal','El verbo','El adjetivo']),
      q('¿Qué es el núcleo del predicado?','El verbo',['El verbo','El sustantivo','El adjetivo'])
    ],
    '✍️ Ortografía: B/V, G/J, LL/Y, H': [
      q('¿Cuál es correcto?','Bailar (con b)',['Bailar (con b)','Vailar (con v)','Baylar con y']),
      q('¿Cuál es correcto?','Vaca (con v)',['Vaca (con v)','Baca (con b)','Bacca doble c']),
      q('¿Cuál es correcto?','Gente (con g)',['Gente (con g)','Jente (con j)','Hente con h']),
      q('¿Cuál es correcto?','Jirafa (con j)',['Jirafa (con j)','Girafa (con g)','Hirafa con h']),
      q('¿Cuál es correcto?','Llave (con ll)',['Llave (con ll)','Yave (con y)','Lave con una l']),
      q('¿Cuál es correcto?','Hoy (con h)',['Hoy (con h)','Oy (sin h)','Yoy con y']),
      q('Después de N se escribe...','V (ej: enviar, invierno, envidia)',['V (ej: enviar, invierno, envidia)','B','H']),
      q('¿Cuál es correcto?','Zapato (con z)',['Zapato (con z)','Capato (con c)','Sapato (con s)'])
    ],
    '🗣️ Diptongos, Hiatos y Acento': [
      q('¿Cuál tiene diptongo?','Ciudad (cui-dad)',['Ciudad (cui-dad)','María','Raíz']),
      q('¿Cuál tiene hiato?','Raíz (ra-íz)',['Raíz (ra-íz)','Aire','Ruido']),
      q('¿Cuál es vocal fuerte?','A',['A','I','U']),
      q('¿Cuál es vocal débil?','I',['I','A','E']),
      q('¿Qué pasa si una vocal débil acentuada está junto a una fuerte?','Se forma hiato (se separan)',['Se forma hiato (se separan)','Se forma diptongo','Nada']),
      q('¿Cuál tiene diptongo?','Reina (rei-na)',['Reina (rei-na)','Reír','Poeta']),
      q('¿Cuál tiene triptongo?','Miau (miau, tres vocales)',['Miau (miau, tres vocales)','Aire','María']),
      q('¿Qué es un hiato?','Dos vocales juntas en sílabas distintas',['Dos vocales juntas en sílabas distintas','Dos vocales en la misma sílaba','Una sola vocal'])
    ],
    '🌱 Palabras: Primitivas, Derivadas y Compuestas': [
      q('¿Cuál es primitiva?','Pan',['Pan','Panadero','Panadería']),
      q('¿Cuál es derivada?','Panadero (de pan)',['Panadero (de pan)','Pan','Sol']),
      q('¿Cuál es compuesta?','Sacapuntas (saca + puntas)',['Sacapuntas (saca + puntas)','Flor','Mar']),
      q('¿Qué prefijo significa "antes"?','Pre-',['Pre-','Re-','Des-']),
      q('¿Qué prefijo significa "otra vez"?','Re-',['Re-','Pre-','Anti-']),
      q('¿Qué sufijo significa "el que hace"?','-ero (panadero)',['-ero (panadero)','-ito','-ón']),
      q('¿Qué sufijo es diminutivo?','-ito',['-ito','-ero','-ón']),
      q('¿Qué familia léxica pertenece a "agua"?','Acuático, aguarrás, agüita',['Acuático, aguarrás, agüita','Fuego, fueguito','Tierra, terrón'])
    ],
    '🎭 Literatura Infantil y Fábulas': [
      q('¿Qué fábula enseña que "la unión hace la fuerza"?','El león y el ratón (o los cuatro bueyes)',['El león y el ratón (o los cuatro bueyes)','La liebre y la tortuga','Caperucita']),
      q('¿Quién escribió fábulas en la antigüedad griega?','Esopo',['Esopo','Shakespeare','Cervantes']),
      q('¿Qué personaje tiene una nariz que crece cuando miente?','Pinocho',['Pinocho','Cenicienta','Blancanieves']),
      q('¿Qué cuento tiene una manzana envenenada?','Blancanieves',['Blancanieves','Cenicienta','Caperucita']),
      q('¿Qué cuento tiene una zapatilla de cristal?','Cenicienta',['Cenicienta','Blancanieves','La Bella y la Bestia']),
      q('¿Quién escribió "El principito"?','Antoine de Saint-Exupéry',['Antoine de Saint-Exupéry','Los hermanos Grimm','Andersen']),
      q('¿Qué autor argentino escribió cuentos para niños como "Fabulas"?','No hay uno solo; pero María Elena Walsh escribió canciones infantiles',['María Elena Walsh (canciones y libros infantiles)','Borges','Cortázar']),
      q('¿Qué es una moraleja?','La enseñanza de la fábula',['La enseñanza de la fábula','El título','El personaje'])
    ],
    '✍️ Escritura Creativa': [
      q('¿Qué es un conflicto en un cuento?','El problema que debe resolver el personaje',['El problema que debe resolver el personaje','El final feliz','El lugar']),
      q('¿Qué es el clímax?','El momento de mayor tensión de la historia',['El momento de mayor tensión de la historia','El principio','El final']),
      q('¿Qué es la resolución?','Cómo se soluciona el conflicto al final',['Cómo se soluciona el conflicto al final','El problema','El personaje']),
      q('¿Qué es la primera persona narrativa?','El narrador dice "yo"',['El narrador dice "yo"','El narrador dice "él"','El narrador no existe']),
      q('¿Qué es la tercera persona?','El narrador dice "él/ella"',['El narrador dice "él/ella"','El narrador dice "yo"','No hay narrador']),
      q('¿Qué es un cuento realista?','Podría pasar en la vida real',['Podría pasar en la vida real','Tiene magia','Tiene monstruos']),
      q('¿Qué es un cuento de ciencia ficción?','Tiene tecnología, robots o viajes en el tiempo',['Tiene tecnología, robots o viajes en el tiempo','Es de animales que hablan','Es realista']),
      q('¿Qué es la trama?','El orden de los sucesos de la historia',['El orden de los sucesos de la historia','El personaje','El lugar'])
    ],
    '🌟 Figuras Literarias': [
      q('"Tus ojos son estrellas" es...','Metáfora',['Metáfora','Comparación con como','Onomatopeya']),
      q('"Corre como el viento" es...','Comparación o símil (usa como)',['Comparación o símil (usa como)','Metáfora','Hipérbole']),
      q('"El río cantaba" es...','Personificación',['Personificación','Metáfora','Onomatopeya']),
      q('"Toc, toc, la puerta" es...','Onomatopeya',['Onomatopeya','Metáfora','Hipérbole']),
      q('"Te quiero un montón" es...','Hipérbole (exageración)',['Hipérbole (exageración)','Metáfora','Onomatopeya']),
      q('"Pablito clavó un clavito" usa...','Aliteración (repite el sonido cl)',['Aliteración (repite el sonido cl)','Hipérbole','Onomatopeya']),
      q('¿Qué figura usa "como" o "parece"?','Símil o comparación',['Símil o comparación','Metáfora','Personificación']),
      q('¿Qué figura dice que algo ES otra cosa?','Metáfora',['Metáfora','Símil','Onomatopeya'])
    ],
    '📑 Tipos de Oraciones': [
      q('"Juan come y María bebe" tiene dos verbos. Es...','Compuesta',['Compuesta','Simple','Unimembre']),
      q('"Llueve" no tiene sujeto. Es...','Unimembre',['Unimembre','Bimembre','Compuesta']),
      q('"Yo canto" tiene sujeto tácito. El sujeto es...','Yo (sobreentendido)',['Yo (sobreentendido)','No hay sujeto','Canto']),
      q('"¿Vienes?" es una oración...','Interrogativa',['Interrogativa','Enunciativa','Exclamativa']),
      q('"¡Qué hermoso!" es...','Exclamativa',['Exclamativa','Interrogativa','Enunciativa']),
      q('"Cerrá la puerta" es...','Imperativa (orden)',['Imperativa (orden)','Enunciativa','Interrogativa']),
      q('"Ojalá llueva" es...','Desiderativa (deseo)',['Desiderativa (deseo)','Imperativa','Enunciativa']),
      q('"Quizás venga" es...','Dubitativa (duda)',['Dubitativa (duda)','Afirmativa','Negativa'])
    ],
    '🔤 Prefijos y Sufijos (avanzado)': [
      q('¿Qué significa "ex-"?','Antiguo / que ya no (exnovio, exalumno)',['Antiguo / que ya no (exnovio, exalumno)','Otra vez','Antes de']),
      q('¿Qué significa "super-"?','Muy / por encima (supermercado, superhombre)',['Muy / por encima (supermercado, superhombre)','Muy poco','Antes de']),
      q('¿Qué significa "inter-"?','Entre (internacional, interurbano)',['Entre (internacional, interurbano)','Dentro de','Fuera de']),
      q('¿Qué significa "sub-"?','Debajo / inferior (subterráneo, subrayar)',['Debajo / inferior (subterráneo, subrayar)','Encima de','Muy grande']),
      q('¿Qué significa "trans-"?','A través de (transatlántico, transportar)',['A través de (transatlántico, transportar)','Dentro de','Antes de']),
      q('¿Qué sufijo forma sustantivos de acción?','-ción (canción, narración)',['-ción (canción, narración)','-ito','-oso']),
      q('¿Qué sufijo forma adjetivos de "lleno de"?','-oso (hermoso, peligroso)',['-oso (hermoso, peligroso)','-ito','-ero']),
      q('¿Qué significa "multi-"?','Muchos (multicolor, multiuso)',['Muchos (multicolor, multiuso)','Uno solo','Dos'])
    ],
    '🌳 Campos Semánticos y Familia de Palabras': [
      q('¿Cuál pertenece al campo de la cocina?','Cuchara, olla, fogón',['Cuchara, olla, fogón','Martillo, clavo, serrucho','Pelota, arco, gol']),
      q('¿Cuál pertenece al campo del fútbol?','Arco, pelota, gol',['Arco, pelota, gol','Cuchara, olla, plato','Martillo, serrucho, clavo']),
      q('¿Cuál pertenece al campo de la carpintería?','Martillo, serrucho, clavo',['Martillo, serrucho, clavo','Pelota, arco, gol','Cuchara, olla, plato']),
      q('¿Cuál es hiperónimo de "perro, gato, pez"?','Animal',['Animal','Planta','Mineral']),
      q('¿Cuál es hipónimo de "flor"?','Rosa',['Rosa','Árbol','Piedra']),
      q('¿Qué familia léxica de "luz"?','Lucero, alumbra, trasluz',['Lucero, alumbra, trasluz','Agua, acuático','Pan, panadero']),
      q('¿Qué familia léxica de "mar"?','Marino, marea, submarino',['Marino, marea, submarino','Tierra, terrón','Sol, solar']),
      q('¿Qué palabra NO pertenece al campo del colegio?','Martillo',['Martillo','Aula','Pizarrón','Cuaderno'])
    ],
    '🔬 Análisis Morfológico': [
      q('En "niños", el morfema de número es...','-s (plural)',['-s (plural)','niñ-','o']),
      q('En "cantaba", la raíz es...','cant-',['cant-','-aba','cantaba']),
      q('En "cantaba", el morfema de tiempo es...','-aba (pretérito imperfecto)',['-aba (pretérito imperfecto)','cant-','-a']),
      q('¿Qué morfema indica femenino?','-a (niña, alta)',['-a (niña, alta)','-o','-s']),
      q('¿Qué morfema indica masculino?','-o (niño, alto)',['-o (niño, alto)','-a','-s']),
      q('En "los árboles", "los" es...','Artículo determinado masculino plural',['Artículo determinado masculino plural','Sustantivo','Adjetivo']),
      q('En "hermoso", "-oso" es un sufijo que significa...','Lleno de',['Lleno de','Diminutivo','El que hace']),
      q('¿Qué tipo de palabra es "rápidamente"?','Adverbio (termina en -mente)',['Adverbio (termina en -mente)','Adjetivo','Sustantivo'])
    ],
    '📜 Literatura Argentina': [
      q('¿Quién escribió "El Aleph"?','Jorge Luis Borges',['Jorge Luis Borges','Cortázar','Sábato']),
      q('¿Quién escribió "Rayuela"?','Julio Cortázar',['Julio Cortázar','Borges','Bioy Casares']),
      q('¿Quién escribió "El túnel"?','Ernesto Sábato',['Ernesto Sábato','Borges','Cortázar']),
      q('¿Quién escribió "La invención de Morel"?','Adolfo Bioy Casares',['Adolfo Bioy Casares','Borges','Sábato']),
      q('¿Quién escribió "Facundo"?','Domingo Faustino Sarmiento',['Domingo Faustino Sarmiento','José Hernández','Borges']),
      q('¿Quién escribió "Martín Fierro"?','José Hernández',['José Hernández','Sarmiento','Borges']),
      q('¿Qué escritora argentina es famosa por sus cuentos y era hermana de Victoria Ocampo?','Silvina Ocampo',['Silvina Ocampo','Alejandra Pizarnik','Alfonsina Storni']),
      q('¿Qué poeta argentino escribió "Rama cráter"?','Alejandra Pizarnik (o Alfonsina Storni, pero la más conocida: Alfonsina Storni)',['Alfonsina Storni (poetisa argentina)','Borges','Cortázar'])
    ],
    '🗣️ Comunicación y Oralidad': [
      q('¿Qué es el mensaje?','Lo que se quiere comunicar',['Lo que se quiere comunicar','El emisor','El canal']),
      q('¿Qué es el código?','El idioma o sistema de signos',['El idioma o sistema de signos','El canal','El ruido']),
      q('¿Qué es el contexto?','La situación en que se produce la comunicación',['La situación en que se produce la comunicación','El mensaje','El canal']),
      q('¿Qué es la comunicación asertiva?','Decir lo que pensamos respetando al otro',['Decir lo que pensamos respetando al otro','Gritar','Callarse siempre']),
      q('¿Qué es la comunicación agresiva?','Imponer sin respetar',['Imponer sin respetar','Hablar claro','Escuchar']),
      q('¿Qué es la comunicación pasiva?','Callarse y no expresar lo que se piensa',['Callarse y no expresar lo que se piensa','Hablar claro','Gritar']),
      q('¿Qué es el feedback?','La respuesta del receptor',['La respuesta del receptor','El ruido','El canal']),
      q('¿Qué es un gesto?','Comunicación no verbal con las manos o la cara',['Comunicación no verbal con las manos o la cara','Una palabra','Una carta'])
    ],
    '📖 Lectura en Voz Alta y Fluidez': [
      q('¿Qué es la velocidad lectora?','Cuántas palabras se leen por minuto',['Cuántas palabras se leen por minuto','Cuánto se entiende','La voz']),
      q('¿Qué es la comprensión lectora?','Entender lo que se lee',['Entender lo que se lee','Leer rápido','Leer en voz alta']),
      q('¿Qué es la entonación?','Subir y bajar la voz al leer',['Subir y bajar la voz al leer','Leer rápido','Leer en silencio']),
      q('¿Qué es la pausa?','Detenerse brevemente al leer',['Detenerse brevemente al leer','No parar nunca','Leer muy rápido']),
      q('¿Qué es el diccionario?','El libro donde se busca el significado de las palabras',['El libro donde se busca el significado de las palabras','Un cuaderno','Una novela']),
      q('¿Qué es la enciclopedia?','El libro donde se busca información sobre temas',['El libro donde se busca información sobre temas','Un diccionario','Una novela']),
      q('¿Qué es un sinónimo en el diccionario?','Palabra de significado parecido',['Palabra de significado parecido','Lo contrario','Una palabra igual']),
      q('¿Qué es el abecedario en el diccionario?','El orden alfabético para buscar palabras',['El orden alfabético para buscar palabras','El orden de los colores','El orden numérico'])
    ]
  };

  Object.keys(EXTRA_LENGUA).forEach(function (cat) {
    if (LENGUA[cat]) { EXTRA_LENGUA[cat].forEach(function (preg) { LENGUA[cat].push(preg); }); }
  });

  var EXTRA_SOCIALES = {
    '👷 Oficios y Profesiones': [
      q('¿Quién diseña edificios y casas?','El arquitecto',['El arquitecto','El albañil','El carpintero']),
      q('¿Quién repara tuberías y cañerías?','El plomero',['El plomero','El electricista','El carpintero']),
      q('¿Quién repara instalaciones eléctricas?','El electricista',['El electricista','El plomero','El pintor']),
      q('¿Quién cose y arregla ropa?','El sastre o modista',['El sastre o modista','El zapatero','El panadero']),
      q('¿Quién repara zapatos?','El zapatero',['El zapatero','El sastre','El plomero']),
      q('¿Quién investiga crímenes?','El detective o policía de investigación',['El detective o policía de investigación','El panadero','El cartero']),
      q('¿Quién guía un avión?','El piloto',['El piloto','El capitán de barco','El conductor']),
      q('¿Quién cuida los niños en la escuela infantil?','La maestra jardinera',['La maestra jardinera','La dentista','La veterinaria'])
    ],
    '🏘️ Mi Comunidad y Normas': [
      q('¿Qué es un semáforo?','Señal de tránsito con luces roja, amarilla y verde',['Señal de tránsito con luces roja, amarilla y verde','Un tipo de árbol','Un juego']),
      q('¿Qué significa la luz roja del semáforo?','Parar',['Parar','Seguir','Acelerar']),
      q('¿Qué significa la luz verde?','Pasar',['Pasar','Parar','Esperar']),
      q('¿Qué es una senda peatonal?','El lugar por donde cruzan los peatones (rayas blancas)',['El lugar por donde cruzan los peatones (rayas blancas)','La calle para autos','La bicicleta']),
      q('¿Qué es un hospital?','Lugar donde curan a los enfermos',['Lugar donde curan a los enfermos','Donde se compra pan','Donde se estudia']),
      q('¿Qué es una comisaría?','Lugar donde trabajan los policías',['Lugar donde trabajan los policías','El hospital','La escuela']),
      q('¿Qué es una plaza?','Espacio público con juegos y bancos',['Espacio público con juegos y bancos','Una tienda','Una escuela']),
      q('¿Qué es el transporte público?','Colectivos, trenes y subtes que usa cualquiera',['Colectivos, trenes y subtes que usa cualquiera','El auto particular','La bicicleta'])
    ],
    '🇦🇷 Símbolos Nacionales': [
      q('¿Qué colores tiene la escarapela?','Celeste y blanco',['Celeste y blanco','Rojo y azul','Verde y amarillo']),
      q('¿Qué es el Sol de Mayo?','El sol en el centro de la bandera',['El sol en el centro de la bandera','Una estrella','Una luna']),
      q('¿Qué es el himno nacional?','La canción oficial del país',['La canción oficial del país','Un baile','Una comida']),
      q('¿Qué es el escudo nacional?','El emblema que representa al país',['El emblema que representa al país','La bandera','El himno']),
      q('¿Qué flor es nacional?','El ceibo',['El ceibo','La rosa','El tulipán']),
      q('¿Qué ave es nacional?','El hornero',['El hornero','El cóndor','El pingüino']),
      q('¿Qué piedra es símbolo de la Patagonia?','No hay piedra nacional, pero el lapacho es árbol nacional',['El lapacho (árbol nacional de flor rosada)','El ceibo','El roble']),
      q('¿Qué animal está en el escudo?','No hay animal; hay manos, pica y gorro frigio',['Manos entrelazadas, pica y gorro frigio (libertad)','Un león','Un águila'])
    ],
    '⭐ Fechas Patrias e Historia': [
      q('¿Qué se celebra el 1 de Mayo?','Día del Trabajador',['Día del Trabajador','Día de la Primavera','Día del Niño']),
      q('¿Qué se celebra el 21 de Septiembre?','Día de la Primavera y del Estudiante',['Día de la Primavera y del Estudiante','Día del Trabajo','Día de la Bandera']),
      q('¿Qué se celebra el 2 de Abril?','Día del Veterano y de los Caídos en Malvinas',['Día del Veterano y de los Caídos en Malvinas','Día de la Independencia','Día del Maestro']),
      q('¿Qué se celebra el 17 de Agosto?','Muerte de José de San Martín (paso a la inmortalidad)',['Muerte de José de San Martín (paso a la inmortalidad)','Día de la Bandera','Día del Maestro']),
      q('¿Qué se celebra el 11 de Septiembre?','Día del Maestro (muerte de Sarmiento)',['Día del Maestro (muerte de Sarmiento)','Día de la Primavera','Día del Trabajo']),
      q('¿Qué se celebra el 20 de Junio?','Día de la Bandera (muerte de Belgrano)',['Día de la Bandera (muerte de Belgrano)','Día de la Independencia','Día del Maestro']),
      q('¿Qué se celebra el 25 de Mayo?','Revolución de Mayo (1810)',['Revolución de Mayo (1810)','Independencia','Día del Niño']),
      q('¿Qué se celebra el 9 de Julio?','Independencia (1816)',['Independencia (1816)','Revolución de Mayo','Día de la Bandera'])
    ],
    '⚖️ Derechos de los Niños': [
      q('¿Qué derecho te permite tener un nombre?','Derecho a la identidad',['Derecho a la identidad','Derecho a jugar','Derecho a comer']),
      q('¿Qué derecho te protege del trabajo infantil?','Derecho a no trabajar (prohibido)',['Derecho a no trabajar (prohibido)','Derecho a trabajar','Derecho a jugar']),
      q('¿Qué derecho te permite tener una familia?','Derecho a vivir en familia',['Derecho a vivir en familia','Derecho a vivir solo','Derecho a trabajar']),
      q('¿Qué derecho te protege de la violencia?','Derecho a la protección integral',['Derecho a la protección integral','Derecho a jugar','Derecho a comer']),
      q('¿Qué derecho te permite expresarte?','Derecho a la libertad de expresión',['Derecho a la libertad de expresión','Derecho a callar','Derecho a trabajar']),
      q('¿Qué derecho te permite tener acceso a la cultura?','Derecho a la cultura y el arte',['Derecho a la cultura y el arte','Derecho a trabajar','Derecho a no estudiar']),
      q('¿Qué derecho te permite tener un documento?','Derecho a la identidad (DNI)',['Derecho a la identidad (DNI)','Derecho a jugar','Derecho a comer']),
      q('¿Qué organismo internacional protege los derechos del niño?','UNICEF (y la ONU)',['UNICEF (y la ONU)','La FIFA','La OMS'])
    ],
    '🗺️ Geografía de Argentina: Provincias y Regiones': [
      q('¿Cuál es la provincia más grande?','Buenos Aires (o Santa Cruz, según área; la más extensa es Buenos Aires)',['Buenos Aires (la más extensa en superficie)','Tierra del Fuego','Misiones']),
      q('¿Cuál es la provincia más chica?','Tierra del Fuego (o Ciudad Autónoma de Buenos Aires)',['Tierra del Fuego (la más chica en superficie)','Buenos Aires','Santa Fe']),
      q('¿Qué provincia tiene las Cataratas del Iguazú?','Misiones',['Misiones','Mendoza','Jujuy']),
      q('¿Qué provincia tiene el Aconcagua?','Mendoza',['Mendoza','Jujuy','Salta']),
      q('¿Qué provincia tiene Ushuaia?','Tierra del Fuego',['Tierra del Fuego','Santa Cruz','Chubut']),
      q('¿Qué provincia tiene Bariloche?','Río Negro (Patagonia)',['Río Negro (Patagonia)','Mendoza','Buenos Aires']),
      q('¿Qué provincia tiene la Quebrada de Humahuaca?','Jujuy',['Jujuy','Salta','Mendoza']),
      q('¿Qué provincia tiene el glaciar Perito Moreno?','Santa Cruz',['Santa Cruz','Tierra del Fuego','Chubut'])
    ],
    '🌍 Planisferio: Continentes, Océanos y Puntos Cardinales': [
      q('¿En qué continente está Egipto?','África',['África','Asia','Europa']),
      q('¿En qué continente está Japón?','Asia',['Asia','Europa','África']),
      q('¿En qué continente está Australia?','Oceanía',['Oceanía','Asia','Europa']),
      q('¿En qué continente está Canadá?','América del Norte',['América del Norte','América del Sur','Europa']),
      q('¿Qué océano está entre América y Europa?','Atlántico',['Atlántico','Pacífico','Índico']),
      q('¿Qué océano está entre América y Asia?','Pacífico',['Pacífico','Atlántico','Índico']),
      q('¿Qué punto cardinal indica donde sale el sol?','Este (oriente)',['Este (oriente)','Oeste','Norte']),
      q('¿Qué punto cardinal indica donde se oculta el sol?','Oeste (poniente)',['Oeste (poniente)','Este','Sur'])
    ],
    '🏛️ Gobierno y Poderes del Estado': [
      q('¿Qué poder ejerce el presidente?','Ejecutivo',['Ejecutivo','Legislativo','Judicial']),
      q('¿Qué poder ejercen los diputados?','Legislativo',['Legislativo','Ejecutivo','Judicial']),
      q('¿Qué poder ejercen los jueces?','Judicial',['Judicial','Ejecutivo','Legislativo']),
      q('¿Cuántos años dura un mandato de diputado?','4 años',['4 años','2 años','6 años']),
      q('¿Cuántos años dura un mandato de senador?','6 años',['6 años','4 años','2 años']),
      q('¿Qué es la Corte Suprema?','El máximo tribunal del país',['El máximo tribunal del país','El congreso','La presidencia']),
      q('¿Qué es la democracia?','El gobierno del pueblo, por el pueblo y para el pueblo',['El gobierno del pueblo, por el pueblo y para el pueblo','El gobierno de un rey','El gobierno de los militares']),
      q('¿Qué es el voto?','La forma de elegir autoridades en democracia',['La forma de elegir autoridades en democracia','Un impuesto','Un castigo'])
    ],
    '🗿 Pueblos Originarios': [
      q('¿Qué pueblo originario vive en la Puna (Jujuy, Salta)?','Kolla (o Atacama)',['Kolla (o Atacama)','Mapuche','Guaraní']),
      q('¿Qué pueblo originario vive en el Chaco?','Qom, Wichi y Mocoví',['Qom, Wichi y Mocoví','Mapuche','Guaraní']),
      q('¿Qué pueblo originario vive en Misiones?','Guaraní (Mbyá)',['Guaraní (Mbyá)','Mapuche','Tehuelche']),
      q('¿Qué pueblo originario vivía en la Patagonia?','Tehuelche, Mapuche y Selk\'nam (Onas)',['Tehuelche, Mapuche y Selk\'nam (Onas)','Guaraní','Kolla']),
      q('¿Qué lengua hablan los mapuches?','Mapudungun',['Mapudungun','Guaraní','Quechua']),
      q('¿Qué lengua hablan los guaraníes?','Guaraní',['Guaraní','Mapudungun','Quechua']),
      q('¿Qué lengua hablan los kollas?','Quechua o aymara',['Quechua o aymara','Guaraní','Mapudungun']),
      q('¿Qué derecho tienen los pueblos originarios en la Constitución?','Reconocimiento étnica y cultural, y derechos sobre sus tierras',['Reconocimiento étnica y cultural, y derechos sobre sus tierras','Ningún derecho','Solo el derecho a votar'])
    ],
    '🎶 Cultura y Tradiciones Argentinas': [
      q('¿Qué es el chamamé?','Música del litoral (Corrientes, Misiones, Entre Ríos)',['Música del litoral (Corrientes, Misiones, Entre Ríos)','Música de Buenos Aires','Música de la Patagonia']),
      q('¿Qué es la zamba?','Baile folklórico con pañuelo',['Baile folklórico con pañuelo','Música de tango','Un género de rock']),
      q('¿Qué es la chacarera?','Baile folklórico del centro y noroeste',['Baile folklórico del centro y noroeste','Un tango','Una cumbia']),
      q('¿Qué es el tango?','Música y baile de Buenos Aires (Montevideo también)',['Música y baile de Buenos Aires (Montevideo también)','Música del litoral','Música de la Patagonia']),
      q('¿Qué es el mate?','Infusión de yerba con bombilla',['Infusión de yerba con bombilla','Un café','Un té']),
      q('¿Qué es el asado?','Carne a la parrilla',['Carne a la parrilla','Un guiso','Una empanada']),
      q('¿Qué son las empanadas?','Masas rellenas de carne, jamón y queso, etc.',['Masas rellenas de carne, jamón y queso, etc.','Unas galletas','Unas frutas']),
      q('¿Qué es el dulce de leche?','Dulce de leche cocido, típico argentino',['Dulce de leche cocido, típico argentino','Una miel','Un chocolate'])
    ],
    '🌱 Medio Ambiente y Recursos': [
      q('¿Qué es un recurso renovable?','Se regenera (sol, viento, agua)',['Se regenera (sol, viento, agua)','Se acaba (petróleo)','No existe']),
      q('¿Qué es un recurso no renovable?','Se acaba (petróleo, carbón, gas)',['Se acaba (petróleo, carbón, gas)','Se regenera','Es infinito']),
      q('¿Qué es la biodiversidad?','Variedad de seres vivos',['Variedad de seres vivos','Solo los animales','Solo las plantas']),
      q('¿Qué es un ecosistema?','Conjunto de seres vivos y su medio',['Conjunto de seres vivos y su medio','Solo los animales','Solo el agua']),
      q('¿Qué es la contaminación?','Sustancias dañinas en el aire, agua o suelo',['Sustancias dañinas en el aire, agua o suelo','Aire puro','Agua limpia']),
      q('¿Qué es el reciclaje?','Transformar residuos en nuevos productos',['Transformar residuos en nuevos productos','Tirar todo','Quemar basura']),
      q('¿Qué es la reutilización?','Usar algo varias veces',['Usar algo varias veces','Tirar después de un uso','Comprar nuevo siempre']),
      q('¿Qué es la reducción?','Generar menos basura',['Generar menos basura','Generar más basura','No hacer nada'])
    ],
    '🤝 Convivencia, Valores y Servicios Públicos': [
      q('¿Qué es la honestidad?','Decir la verdad y no robar',['Decir la verdad y no robar','Mentir','Robar']),
      q('¿Qué es la responsabilidad?','Cumplir con lo que se debe',['Cumplir con lo que se debe','No hacer nada','Olvidarse']),
      q('¿Qué es la amistad?','Querer y respetar a un amigo',['Querer y respetar a un amigo','Pelear','Ignorar']),
      q('¿Qué es la justicia?','Dar a cada uno lo que le corresponde',['Dar a cada uno lo que le corresponde','Dar todo a uno','No dar nada']),
      q('¿Qué es la libertad?','Poder elegir sin dañar a otros',['Poder elegir sin dañar a otros','Hacer lo que quieras aunque dañes','No poder elegir']),
      q('¿Qué es la igualdad?','Todos tienen los mismos derechos',['Todos tienen los mismos derechos','Unos tienen más que otros','Solo los ricos tienen derechos']),
      q('¿Qué es la fraternidad?','Tratar a todos como hermanos',['Tratar a todos como hermanos','Pelear con todos','Ignorar a los demás']),
      q('¿Qué es el diálogo?','Hablar y escuchar para entenderse',['Hablar y escuchar para entenderse','Gritar','Callarse'])
    ],
    '📜 Historia Argentina: Épocas': [
      q('¿Qué fue la Conquista?','Los españoles tomaron el territorio de los pueblos originarios',['Los españoles tomaron el territorio de los pueblos originarios','La independencia','La democracia']),
      q('¿Qué fue la Colonia?','Época en que Argentina dependía de España (1580-1810)',['Época en que Argentina dependía de España (1580-1810)','La independencia','La democracia']),
      q('¿Qué fue la Independencia?','Cuando se declaró libre de España (1816)',['Cuando se declaró libre de España (1816)','La conquista','La colonia']),
      q('¿Qué fue la Generación del 80?','Época de gobierno oligárquico (1880-1916)',['Época de gobierno oligárquico (1880-1916)','La independencia','La colonia']),
      q('¿Qué fue el peronismo?','Movimiento político de Juan Domingo Perón (1946)',['Movimiento político de Juan Domingo Perón (1946)','La independencia','La colonia']),
      q('¿Qué fue la dictadura de 1976?','Gobierno militar que reprimió y desapareció personas',['Gobierno militar que reprimió y desapareció personas','Una democracia','Una monarquía']),
      q('¿Qué fue la vuelta de la democracia?','En 1983, con Alfonsín, volvimos a elegir autoridades',['En 1983, con Alfonsín, volvimos a elegir autoridades','La dictadura','La colonia']),
      q('¿Qué fue la crisis de 2001?','Crisis económica y social con corralito',['Crisis económica y social con corralito','La independencia','La colonia'])
    ],
    '🚦 Trabajo, Economía y Consumo': [
      q('¿Qué es el salario?','El dinero que se gana por trabajar',['El dinero que se gana por trabajar','Un impuesto','Un regalo']),
      q('¿Qué es el empleador?','Quien contrata trabajadores',['Quien contrata trabajadores','El trabajador','El cliente']),
      q('¿Qué es el trabajador?','Quien trabaja a cambio de un salario',['Quien trabaja a cambio de un salario','El empleador','El cliente']),
      q('¿Qué es el comercio?','Compra y venta de productos',['Compra y venta de productos','La agricultura','La industria']),
      q('¿Qué es la industria?','Transformación de materias primas en fábricas',['Transformación de materias primas en fábricas','La agricultura','El comercio']),
      q('¿Qué es la agricultura?','Cultivo de la tierra',['Cultivo de la tierra','La industria','El comercio']),
      q('¿Qué es la ganadería?','Cría de animales',['Cría de animales','La agricultura','La industria']),
      q('¿Qué es la exportación?','Vender productos a otros países',['Vender productos a otros países','Comprar de otros países','Vender solo en el país'])
    ],
    '🌍 Historia Mundial': [
      q('¿Qué civilización construyó los acueductos y las carreteras?','Los romanos',['Los romanos','Los egipcios','Los griegos']),
      q('¿Qué civilización inventó la democracia?','Los griegos (Atenas)',['Los griegos (Atenas)','Los romanos','Los egipcios']),
      q('¿Qué fue la Edad Media?','Época entre la caída de Roma y el Renacimiento (siglos V-XV)',['Época entre la caída de Roma y el Renacimiento (siglos V-XV)','La antigüedad','La edad moderna']),
      q('¿Qué fue el Renacimiento?','Época de arte y ciencia (siglos XV-XVI): Leonardo, Miguel Ángel',['Época de arte y ciencia (siglos XV-XVI): Leonardo, Miguel Ángel','La Edad Media','La Prehistoria']),
      q('¿Qué fue la Revolución Francesa?','En 1789, el pueblo se rebeló contra el rey',['En 1789, el pueblo se rebeló contra el rey','La independencia de EE.UU.','La Revolución Industrial']),
      q('¿Qué fue la Revolución Industrial?','Máquinas de vapor y fábricas (siglo XVIII)',['Máquinas de vapor y fábricas (siglo XVIII)','La Revolución Francesa','La Edad Media']),
      q('¿Qué fue la Primera Guerra Mundial?','1914-1918, potencias europeas en guerra',['1914-1918, potencias europeas en guerra','1939-1945','1789']),
      q('¿Qué fue la Segunda Guerra Mundial?','1939-1945, Hitler y los nazis contra los aliados',['1939-1945, Hitler y los nazis contra los aliados','1914-1918','1789'])
    ],
    '🗺️ Geografía Mundial': [
      q('¿Cuál es la capital de Rusia?','Moscú',['Moscú','San Petersburgo','Kiev']),
      q('¿Cuál es la capital de China?','Pekín (Beijing)',['Pekín (Beijing)','Shanghái','Tokio']),
      q('¿Cuál es la capital de Japón?','Tokio',['Tokio','Pekín','Seúl']),
      q('¿Cuál es la capital de Inglaterra (Reino Unido)?','Londres',['Londres','París','Madrid']),
      q('¿Cuál es la capital de Alemania?','Berlín',['Berlín','Múnich','Hamburgo']),
      q('¿Cuál es el río más largo de África?','El Nilo',['El Nilo','El Amazonas','El Congo']),
      q('¿Cuál es el desierto más grande del mundo?','El Sahara',['El Sahara','El Gobi','El Kalahari']),
      q('¿Cuál es el país más pequeño del mundo?','El Vaticano',['El Vaticano','Mónaco','San Marino'])
    ],
    '🌐 Organismos Internacionales y Bloques': [
      q('¿Qué organismo mundial coordina la salud?','OMS (Organización Mundial de la Salud)',['OMS (Organización Mundial de la Salud)','UNICEF','UNESCO']),
      q('¿Qué organismo ayuda a los niños?','UNICEF',['UNICEF','OMS','FIFA']),
      q('¿Qué organismo cuida la educación y cultura?','UNESCO',['UNESCO','OMS','UNICEF']),
      q('¿Qué organismo mantiene la paz mundial?','ONU',['ONU','FIFA','OMS']),
      q('¿Qué bloque une a países europeos?','Unión Europea (UE)',['Unión Europea (UE)','Mercosur','ONU']),
      q('¿Qué bloque une a Argentina, Brasil, Uruguay, Paraguay?','Mercosur',['Mercosur','Unión Europea','OTAN']),
      q('¿Qué moneda usa la Unión Europea?','Euro',['Euro','Dólar','Peso']),
      q('¿Qué organismo organiza el Mundial de Fútbol?','FIFA',['FIFA','ONU','OMS'])
    ],
    '📰 Medios de Comunicación': [
      q('¿Qué es un diario impreso?','Noticias en papel',['Noticias en papel','Noticias en radio','Noticias en TV']),
      q('¿Qué es la radio?','Noticias y música por ondas de sonido',['Noticias y música por ondas de sonido','Un diario','Una revista']),
      q('¿Qué es la televisión?','Imágenes y sonido por antena o cable',['Imágenes y sonido por antena o cable','La radio','El diario']),
      q('¿Qué es internet?','Red mundial de computadoras conectadas',['Red mundial de computadoras conectadas','La radio','La televisión']),
      q('¿Qué son las redes sociales?','Plataformas para compartir (Facebook, Instagram, X)',['Plataformas para compartir (Facebook, Instagram, X)','La radio','El diario']),
      q('¿Qué es un periodista?','Quien investiga y escribe noticias',['Quien investiga y escribe noticias','El lector','El publicista']),
      q('¿Qué es una fuente confiable?','Un medio o persona que dice la verdad y verifica',['Un medio o persona que dice la verdad y verifica','Un rumor','Una fake news']),
      q('¿Qué es el periodismo?','La profesión de informar con verdad y ética',['La profesión de informar con verdad y ética','La publicidad','La literatura'])
    ],
    '⏳ Tiempo Histórico y Fuentes': [
      q('¿Cuántos años tiene un siglo?','100',['100','10','1000']),
      q('¿Cuántos años tiene una década?','10',['10','100','1000']),
      q('¿Cuántos años tiene un milenio?','1000',['1000','100','10']),
      q('¿Qué siglo es el año 2024?','Siglo XXI (21)',['Siglo XXI (21)','Siglo XX (20)','Siglo XIX (19)']),
      q('¿Qué siglo es el año 1810?','Siglo XIX (19)',['Siglo XIX (19)','Siglo XVIII (18)','Siglo XX (20)']),
      q('¿Qué es una fuente primaria?','Un documento o objeto de la época (carta, foto, moneda)',['Un documento o objeto de la época (carta, foto, moneda)','Un libro de historia escrito después','Una película']),
      q('¿Qué es una fuente secundaria?','Un libro que cuenta lo que pasó (escrito después)',['Un libro que cuenta lo que pasó (escrito después)','Una carta original','Una moneda antigua']),
      q('¿Qué es la prehistoria?','Época antes de la escritura (no hay documentos escritos)',['Época antes de la escritura (no hay documentos escritos)','La Edad Media','La Edad Moderna'])
    ],
    '🌎 Cambio Climático y Ciudadanía Global': [
      q('¿Qué es el efecto invernadero?','Gases atrapan calor en la atmósfera',['Gases atrapan calor en la atmósfera','Un invernadero de plantas','El frío polar']),
      q('¿Qué gas produce el calentamiento?','CO2 (dióxido de carbono)',['CO2 (dióxido de carbono)','Oxígeno','Nitrógeno']),
      q('¿Qué es la energía solar?','Energía del sol (limpia y renovable)',['Energía del sol (limpia y renovable)','Energía del petróleo','Energía del carbón']),
      q('¿Qué es la energía eólica?','Energía del viento (limpia)',['Energía del viento (limpia)','Energía del carbón','Energía del petróleo']),
      q('¿Qué es la energía hidroeléctrica?','Energía del agua (represas)',['Energía del agua (represas)','Energía del sol','Energía del viento']),
      q('¿Qué es la huella de carbono?','Gases que emitimos con nuestras actividades',['Gases que emitimos con nuestras actividades','Una marca en el suelo','Un tipo de zapato']),
      q('¿Qué es el reciclaje de plástico?','Transformar botellas en nuevos productos',['Transformar botellas en nuevos productos','Tirar botellas','Quemar botellas']),
      q('¿Qué es la ciudadanía global?','Preocuparse por el mundo entero',['Preocuparse por el mundo entero','Solo por mi país','Solo por mi barrio'])
    ]
  };

  Object.keys(EXTRA_SOCIALES).forEach(function (cat) {
    if (SOCIALES[cat]) { EXTRA_SOCIALES[cat].forEach(function (preg) { SOCIALES[cat].push(preg); }); }
  });

  /* ============================================================
     LECCIONES NARRADAS — 18 lecciones (antes 8)
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
    },
    los_conectores: {
      titulo: 'Los Conectores',
      texto: 'Los conectores son palabras que unen oraciones e ideas. Y, además y también suman ideas. Pero, sin embargo y aunque indican contraste. Porque y ya que indican causa. Para y a fin de indican finalidad. Cuando, mientras y después indican tiempo. Por eso, por tanto y entonces indican consecuencia. O y u indican alternativa. Es decir y o sea explican lo anterior. Usar bien los conectores hace que tus textos queden claros y bien unidos.'
    },
    los_pronombres: {
      titulo: 'Los Pronombres',
      texto: 'Los pronombres reemplazan al sustantivo para no repetirlo. Los personales son yo, tú, él, nosotros, vosotros, ellos, y sus formas me, te, lo, la, nos, os, los, las. Los posesivos indican pertenencia: mío, tuyo, suyo, nuestro. Los demostrativos señalan distancia: este, ese, aquel. Los interrogativos preguntan: quién, qué, dónde, cuándo, por qué. Los relativos unen oraciones: que, quien, cuyo, donde. En Argentina usamos voseo: vos, en lugar de tú.'
    },
    la_tilde_diacritica: {
      titulo: 'La Tilde Diacrítica',
      texto: 'La tilde diacrítica sirve para distinguir dos palabras que se escriben igual pero tienen distinto significado. Por ejemplo: tú (pronombre) lleva tilde, pero tu (posesivo) no. Él (pronombre) lleva tilde, pero el (artículo) no. Sí (afirmación) lleva tilde, pero si (condicional) no. Sé (verbo ser o saber) lleva tilde, pero se (pronombre) no. Más (cantidad) lleva tilde, pero mas (pero) no. ¡Atención con estas palabras!'
    },
    la_carta_formal: {
      titulo: 'La Carta Formal',
      texto: 'La carta formal se escribe a una institución o persona desconocida. Empieza con lugar y fecha. Luego el destinatario: su nombre y cargo. Después el saludo formal: Estimado señor o Distinguida señora. Luego el cuerpo, donde se explica el motivo con claridad y respeto. Se cierra con una despedida formal: Atentamente o Saluda cordialmente. Finalmente la firma y el nombre completo. Hoy en día muchas cartas formales se envían por correo electrónico.'
    },
    la_noticia: {
      titulo: 'La Noticia',
      texto: 'La noticia informa sobre un hecho actual y real. Tiene un titular grande que resume lo más importante. La bajada o epígrafe amplía el titular. La entrada o lead responde las preguntas clave: qué pasó, quiénes, cuándo, dónde, por qué y cómo. El cuerpo desarrolla los detalles. Las noticias deben ser objetivas, basadas en fuentes confiables. Hay que distinguir la noticia de la opinión y de las noticias falsas o fake news.'
    },
    la_biografia: {
      titulo: 'La Biografía',
      texto: 'La biografía cuenta la vida de una persona. Si la escribe la propia persona, se llama autobiografía. Empieza por los datos de nacimiento: fecha y lugar. Luego cuenta su infancia, estudios, logros y momentos importantes. Termina con su muerte o, si está viva, con su actualidad. Se basa en hechos reales y fuentes confiables. Una biografía bien escrita permite conocer cómo era la época y los desafíos que superó esa persona.'
    },
    revolucion_de_mayo: {
      titulo: 'La Revolución de Mayo',
      texto: 'En 1810, Napoleón invadió España y capturó al rey. En Buenos Aires, los vecinos se reunieron en un Cabildo Abierto y decidieron formar su propio gobierno, porque el rey no podía gobernar. El 25 de Mayo se formó la Primera Junta, con Cornelio Saavedra como presidente. Fue el primer paso hacia la independencia, que se declaró seis años después, en 1816. Por eso el 25 de Mayo es una fecha tan importante para los argentinos.'
    },
    pueblos_originarios: {
      titulo: 'Los Pueblos Originarios',
      texto: 'Antes de la llegada de los españoles, muchos pueblos habitaban lo que hoy es Argentina. Los mapuches en la Patagonia, los guaraníes en Misiones y el litoral, los qom en el Chaco, los kollas en el NOA andino, los tehuelches como nómades de la Patagonia. Cada uno tenía su lengua, su cultura y su forma de vida. Hoy sus descendientes siguen luchando por sus derechos y por que se respete su cultura. Son parte fundamental de nuestra identidad.'
    },
    la_constitucion: {
      titulo: 'La Constitución Nacional',
      texto: 'La Constitución Nacional es la ley más importante de Argentina. Se sancionó en 1853 en Santa Fe, con la idea de organizar el país después de la independencia. Declara que Argentina es una nación representativa, republicana y federal. Garantiza derechos como la libertad, la igualdad ante la ley, la educación y la propiedad. Todas las demás leyes deben respetarla. Se puede reformar, pero con un procedimiento especial y con acuerdo de muchas provincias.'
    },
    derechos_humanos: {
      titulo: 'Los Derechos Humanos',
      texto: 'Los derechos humanos son los derechos que tenemos todas las personas por el simple hecho de nacer. Incluyen el derecho a la vida, a la libertad, a la educación, a la salud, a la justicia y a no ser torturado ni discriminado. Después de la Segunda Guerra Mundial, en 1948, las Naciones Unidas aprobaron la Declaración Universal de los Derechos Humanos. En Argentina, después de la dictadura de 1976, se reivindicaron con fuerza. Los derechos humanos son para todos, sin excepción.'
    }
  };

  /* ============================================================
     MOTOR DE ESTUDIO SUPER PREMIUM — EK.LenguaSociales
     (aditivo, no rompe el engine original)
     ============================================================ */
  (function () {
    if (document.getElementById('ls-css-premium')) return;
    var st = document.createElement('style');
    st.id = 'ls-css-premium';
    st.textContent = [
      '@keyframes ls-pop{0%{transform:scale(.5);opacity:0;}60%{transform:scale(1.1);}100%{transform:scale(1);opacity:1;}}',
      '@keyframes ls-flotar{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}',
      '@keyframes ls-shake{0%,100%{transform:translateX(0);}25%{transform:translateX(-6px);}75%{transform:translateX(6px);}}',
      '@keyframes ls-conf-fall{to{transform:translateY(105vh) rotate(720deg);opacity:0;}}',
      '.ls-screen{display:flex;flex-direction:column;min-height:100%;background:linear-gradient(160deg,#eef3ff,#f6f0ff,#fff0f6);font-family:"Comic Sans MS","Segoe UI",system-ui,sans-serif;overflow-y:auto;}',
      '.ls-head{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#fff;border-bottom:2px solid #e6ebf5;box-shadow:0 2px 8px rgba(60,80,140,.08);}',
      '.ls-title{font-weight:900;font-size:16px;color:#6C5CE7;}',
      '.ls-back{border:none;background:#eef2fb;color:#445;border-radius:12px;padding:8px 12px;font-size:16px;cursor:pointer;font-weight:900;}',
      '.ls-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;padding:12px;}',
      '.ls-card{background:#fff;border-radius:16px;padding:14px 10px;text-align:center;cursor:pointer;box-shadow:0 4px 12px rgba(60,80,140,.12);transition:all .15s;border:3px solid transparent;}',
      '.ls-card:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 6px 18px rgba(108,92,231,.3);}',
      '.ls-card .emoji{font-size:32px;display:block;animation:ls-flotar 3s infinite;}',
      '.ls-card .nombre{font-weight:800;color:#334;font-size:12px;margin-top:4px;display:block;}',
      '.ls-card .prog{font-size:10px;color:#889;font-weight:700;margin-top:2px;display:block;}',
      '.ls-pregunta{background:#fff;border-radius:20px;padding:18px;margin:12px;text-align:center;box-shadow:0 6px 20px rgba(60,80,140,.15);animation:ls-pop .3s ease;}',
      '.ls-pregunta-txt{font-size:17px;font-weight:900;color:#334;}',
      '.ls-opciones{display:flex;flex-direction:column;gap:8px;padding:0 12px;}',
      '.ls-opcion{border:none;background:#fff;border-radius:14px;padding:14px;font-size:14px;font-weight:800;color:#334;cursor:pointer;box-shadow:0 3px 10px rgba(60,80,140,.12);transition:all .15s;font-family:inherit;text-align:left;}',
      '.ls-opcion:hover{transform:translateY(-2px);}',
      '.ls-opcion.ok{background:linear-gradient(135deg,#00B894,#55EFC4)!important;color:#fff!important;animation:ls-pop .3s ease;}',
      '.ls-opcion.mal{background:linear-gradient(135deg,#FA5252,#FF6B6B)!important;color:#fff!important;animation:ls-shake .4s ease;}',
      '.ls-opcion:disabled{opacity:.6;cursor:default;}',
      '.ls-feedback{text-align:center;margin:10px;font-weight:900;font-size:16px;min-height:24px;}',
      '.ls-progreso{height:8px;background:#e0e6f0;border-radius:999px;margin:8px 12px;overflow:hidden;}',
      '.ls-progreso-fill{height:100%;background:linear-gradient(90deg,#6C5CE7,#FF6B9D);border-radius:999px;transition:width .4s;}',
      '.ls-flashcard{background:#fff;border-radius:20px;padding:30px 20px;margin:20px auto;max-width:340px;text-align:center;box-shadow:0 10px 30px rgba(108,92,231,.25);cursor:pointer;min-height:140px;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:#334;animation:ls-pop .3s ease;}',
      '.ls-flashcard .resp{color:#00B894;font-size:16px;margin-top:10px;display:block;}',
      '.ls-btn{border:none;border-radius:14px;padding:12px 22px;font-weight:900;font-size:14px;cursor:pointer;font-family:inherit;margin:4px;}',
      '.ls-btn-pri{background:linear-gradient(135deg,#6C5CE7,#A29BFE);color:#fff;box-shadow:0 4px 14px rgba(108,92,231,.4);}',
      '.ls-btn-sec{background:#eef2fb;color:#445;}',
      '.ls-vidas{font-size:18px;letter-spacing:2px;}',
      '.ls-combo{font-weight:900;color:#FF9F43;font-size:14px;}',
      '.ls-premio{background:#fff;border-radius:24px;padding:24px;text-align:center;max-width:340px;margin:30px auto;box-shadow:0 20px 60px rgba(0,0,0,.2);animation:ls-pop .4s ease;}',
      '.ls-premio .emoji{font-size:60px;animation:ls-flotar 2s infinite;display:block;}'
    ].join('');
    document.head.appendChild(st);
  })();

  function lsHablar(texto) {
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
  function lsSnd(nombre) { try { if (window.EK && EK.Audio && typeof EK.Audio[nombre] === 'function') EK.Audio[nombre](); } catch (e) { } }
  function lsConfeti() {
    var colores = ['#FF9F43', '#FF6B9D', '#4D96FF', '#00B894', '#FFD43B', '#A55EEA'];
    for (var i = 0; i < 50; i++) {
      var c = document.createElement('div');
      c.style.cssText = 'position:fixed;width:8px;height:8px;top:-10px;left:' + (Math.random() * 100) + 'vw;background:' + colores[i % colores.length] + ';border-radius:2px;z-index:99998;pointer-events:none;animation:ls-conf-fall ' + (1.5 + Math.random() * 1.5) + 's linear forwards;animation-delay:' + (Math.random() * 0.5) + 's;';
      document.body.appendChild(c);
      (function (el) { setTimeout(function () { el.remove(); }, 3500); })(c);
    }
  }
  function lsProgresoCat(catNombre) {
    try { return parseInt(localStorage.getItem('ls_prog_' + catNombre) || '0', 10); } catch (e) { return 0; }
  }
  function lsGuardarProgreso(catNombre, pts) {
    try { var actual = lsProgresoCat(catNombre); if (pts > actual) localStorage.setItem('ls_prog_' + catNombre, String(pts)); } catch (e) { }
  }
  function lsEstrellasTotal() {
    try { return parseInt(localStorage.getItem('ls_estrellas') || '0', 10); } catch (e) { return 0; }
  }
  function lsSumarEstrellas(n) {
    try { localStorage.setItem('ls_estrellas', String(lsEstrellasTotal() + n)); } catch (e) { }
  }

  var frasesAcierto = ['¡Muy bien!', '¡Genial!', '¡Excelente!', '¡Perfecto!', '¡Sigue así!', '¡Bravo!'];
  var frasesError = ['¡Ups! Intenta de nuevo.', '¡Casi! Sigue buscando.', '¡No te rindas!', 'Ese no es, fijate bien.'];

  var LS = {
    version: 'SUPER-PREMIUM',
    iniciar: function (modo) {
      var app = document.getElementById('app');
      if (!app) return;
      if (modo === 'quiz') this.mostrarCategorias('quiz');
      else if (modo === 'flashcards') this.mostrarCategorias('flashcards');
      else if (modo === 'lecciones') this.mostrarLecciones();
      else this.mostrarMenu();
    },
    mostrarMenu: function () {
      var app = document.getElementById('app');
      var totalEst = lsEstrellasTotal();
      app.innerHTML = '<div class="ls-screen">' +
        '<div class="ls-head"><div class="ls-title" style="font-size:19px;">📚 Lengua y Sociales</div>' +
        '<div style="font-weight:900;color:#FF9F43;">⭐ ' + totalEst + '</div></div>' +
        '<div style="text-align:center;padding:10px;font-weight:800;color:#667;font-size:13px;">¡Elegí cómo querés estudiar!</div>' +
        '<div class="ls-grid">' +
        '<div class="ls-card" data-modo="quiz"><span class="emoji">❓</span><span class="nombre">Quiz con Vidas</span><span class="prog">Preguntas y combo</span></div>' +
        '<div class="ls-card" data-modo="flashcards"><span class="emoji">🃏</span><span class="nombre">Flashcards</span><span class="prog">Estudiá y memorizá</span></div>' +
        '<div class="ls-card" data-modo="lecciones"><span class="emoji">🎧</span><span class="nombre">Lecciones con Voz</span><span class="prog">Escuchá y aprendé</span></div>' +
        '</div></div>';
      app.querySelectorAll('.ls-card').forEach(function (c) {
        c.addEventListener('click', function () {
          lsSnd('click');
          var m = c.dataset.modo;
          if (m === 'lecciones') LS.mostrarLecciones();
          else LS.mostrarCategorias(m);
        });
      });
    },
    mostrarCategorias: function (modo) {
      var app = document.getElementById('app');
      var fuente = (modo === 'quiz' && false) ? {} : LENGUA;
      var todas = {};
      Object.keys(LENGUA).forEach(function (k) { todas[k] = { fuente: 'lengua', cat: k }; });
      Object.keys(SOCIALES).forEach(function (k) { todas[k] = { fuente: 'sociales', cat: k }; });
      var titulo = modo === 'quiz' ? '❓ Quiz — Elegí categoría' : '🃏 Flashcards — Elegí categoría';
      app.innerHTML = '<div class="ls-screen">' +
        '<div class="ls-head"><button class="ls-back" data-act="volver">←</button><div class="ls-title">' + titulo + '</div></div>' +
        '<div class="ls-grid">' + Object.keys(todas).map(function (k) {
          var prog = lsProgresoCat(k);
          return '<div class="ls-card" data-cat="' + encodeURIComponent(k) + '" data-fuente="' + todas[k].fuente + '">' +
            '<span class="emoji">' + (todas[k].fuente === 'lengua' ? '📖' : '🌍') + '</span>' +
            '<span class="nombre">' + k.replace(/^[^\w]+\s*/, '') + '</span>' +
            '<span class="prog">' + (prog > 0 ? '⭐ ' + prog : 'Sin jugar') + '</span></div>';
        }).join('') + '</div></div>';
      app.querySelector('[data-act="volver"]').addEventListener('click', function () { lsSnd('click'); LS.mostrarMenu(); });
      app.querySelectorAll('.ls-card').forEach(function (c) {
        c.addEventListener('click', function () {
          lsSnd('click');
          var cat = decodeURIComponent(c.dataset.cat);
          var fuente = c.dataset.fuente;
          var preguntas = (fuente === 'lengua' ? LENGUA : SOCIALES)[cat];
          if (modo === 'quiz') LS.jugarQuiz(cat, preguntas);
          else LS.jugarFlashcards(cat, preguntas);
        });
      });
    },
    jugarQuiz: function (catNombre, preguntas) {
      var app = document.getElementById('app');
      var ronda = 0, total = Math.min(10, preguntas.length), vidas = 3, combo = 0, pts = 0, lock = false;
      var lista = preguntas.slice().sort(function () { return Math.random() - 0.5; }).slice(0, total);
      lsHablar('Quiz de ' + catNombre.replace(/^[^\w]+\s*/, '') + '. ¡Empecemos!');
      function render() {
        if (ronda >= total || vidas <= 0) { LS.finQuiz(catNombre, pts, ronda, total, vidas); return; }
        var q = lista[ronda]; lock = false;
        var comboTxt = combo >= 3 ? '<span class="ls-combo">🔥 Combo x' + (combo >= 8 ? 4 : combo >= 5 ? 3 : 2) + '</span>' : '';
        app.innerHTML = '<div class="ls-screen">' +
          '<div class="ls-head"><button class="ls-back" data-act="volver">←</button>' +
          '<div class="ls-title">' + (ronda + 1) + '/' + total + '</div>' +
          '<div class="ls-vidas">' + '❤️'.repeat(Math.max(0, vidas)) + '</div></div>' +
          '<div class="ls-progreso"><div class="ls-progreso-fill" style="width:' + (ronda / total * 100) + '%;"></div></div>' +
          '<div style="text-align:center;margin:4px;">' + comboTxt + ' <span style="font-weight:900;color:#6C5CE7;">⭐ ' + pts + '</span></div>' +
          '<div class="ls-pregunta"><div class="ls-pregunta-txt">' + q.pregunta + '</div></div>' +
          '<div class="ls-opciones">' + q.opciones.map(function (o) { return '<button class="ls-opcion">' + o + '</button>'; }).join('') + '</div>' +
          '<div class="ls-feedback" id="ls-fb"></div></div>';
        app.querySelector('[data-act="volver"]').addEventListener('click', function () { lsSnd('click'); LS.mostrarCategorias('quiz'); });
        app.querySelectorAll('.ls-opcion').forEach(function (b) {
          b.addEventListener('click', function () {
            if (lock) return; lock = true;
            lsHablar(b.textContent);
            var ok = b.textContent === q.correcta;
            app.querySelectorAll('.ls-opcion').forEach(function (x) { x.disabled = true; if (x.textContent === q.correcta) x.classList.add('ok'); else if (x === b) x.classList.add('mal'); });
            var fb = document.getElementById('ls-fb');
            if (ok) {
              combo++; var mult = combo >= 8 ? 4 : combo >= 5 ? 3 : combo >= 3 ? 2 : 1;
              pts += 10 * mult; lsSnd('correcto');
              fb.innerHTML = '<span style="color:#00B894;">' + frasesAcierto[Math.floor(Math.random() * frasesAcierto.length)] + ' +' + (10 * mult) + '⭐</span>';
            } else {
              combo = 0; vidas--; lsSnd('error'); lsHablar(frasesError[Math.floor(Math.random() * frasesError.length)]);
              fb.innerHTML = '<span style="color:#FA5252;">Era: ' + q.correcta + '</span>';
            }
            ronda++; setTimeout(render, 1400);
          });
        });
      }
      render();
    },
    finQuiz: function (catNombre, pts, ronda, total, vidas) {
      var app = document.getElementById('app');
      lsGuardarProgreso(catNombre, pts);
      lsSumarEstrellas(pts);
      var gano = ronda >= total && vidas > 0;
      if (gano) { lsConfeti(); lsSnd('nivel'); }
      var emoji = pts >= 80 ? '🏆' : pts >= 50 ? '🥇' : pts >= 30 ? '🥈' : '🥉';
      app.innerHTML = '<div class="ls-screen"><div class="ls-premio">' +
        '<span class="emoji">' + emoji + '</span>' +
        '<h2 style="color:#6C5CE7;margin:8px 0;">' + (gano ? '¡Quiz Completado!' : '¡Fin del Quiz!') + '</h2>' +
        '<div style="font-weight:800;color:#667;margin:8px 0;">Puntaje: ⭐ ' + pts + '</div>' +
        '<div style="font-weight:800;color:#667;">Aciertos: ' + Math.min(ronda, total) + '/' + total + '</div>' +
        '<div style="margin-top:14px;">' +
        '<button class="ls-btn ls-btn-pri" data-act="otra">🔄 Otra vez</button>' +
        '<button class="ls-btn ls-btn-sec" data-act="menu">🏠 Menú</button></div></div></div>';
      app.querySelector('[data-act="otra"]').addEventListener('click', function () { lsSnd('click'); LS.jugarQuiz(catNombre, (LENGUA[catNombre] || SOCIALES[catNombre])); });
      app.querySelector('[data-act="menu"]').addEventListener('click', function () { lsSnd('click'); LS.mostrarMenu(); });
    },
    jugarFlashcards: function (catNombre, preguntas) {
      var app = document.getElementById('app');
      var lista = preguntas.slice().sort(function () { return Math.random() - 0.5; });
      var idx = 0, mostrando = false;
      function render() {
        if (idx >= lista.length) {
          lsConfeti(); lsSnd('nivel');
          app.innerHTML = '<div class="ls-screen"><div class="ls-premio"><span class="emoji">🃏</span><h2 style="color:#6C5CE7;">¡Flashcards completadas!</h2><button class="ls-btn ls-btn-pri" data-act="menu">🏠 Menú</button></div></div>';
          app.querySelector('[data-act="menu"]').addEventListener('click', function () { lsSnd('click'); LS.mostrarMenu(); });
          return;
        }
        var q = lista[idx];
        app.innerHTML = '<div class="ls-screen">' +
          '<div class="ls-head"><button class="ls-back" data-act="volver">←</button><div class="ls-title">🃏 ' + (idx + 1) + '/' + lista.length + '</div></div>' +
          '<div class="ls-flashcard" id="ls-card">' +
            (mostrando ? '<div><div style="color:#6C5CE7;">' + q.pregunta + '</div><span class="resp">✅ ' + q.correcta + '</span></div>' : '<div>❓ ' + q.pregunta + '<br><span style="font-size:12px;color:#999;font-weight:700;">Tocá para ver la respuesta</span></div>') +
          '</div>' +
          '<div style="text-align:center;margin-top:10px;">' +
          '<button class="ls-btn ls-btn-sec" data-act="voz">🔊 Leer</button>' +
          '<button class="ls-btn ls-btn-pri" data-act="sig">Siguiente →</button></div></div>';
        app.querySelector('[data-act="volver"]').addEventListener('click', function () { lsSnd('click'); LS.mostrarCategorias('flashcards'); });
        app.getElementById('ls-card').addEventListener('click', function () { lsSnd('click'); mostrando = !mostrando; render(); });
        app.querySelector('[data-act="voz"]').addEventListener('click', function () { lsSnd('click'); lsHablar(q.pregunta + '. Respuesta: ' + q.correcta); });
        app.querySelector('[data-act="sig"]').addEventListener('click', function () { lsSnd('click'); idx++; mostrando = false; render(); });
      }
      render();
    },
    mostrarLecciones: function () {
      var app = document.getElementById('app');
      app.innerHTML = '<div class="ls-screen">' +
        '<div class="ls-head"><button class="ls-back" data-act="volver">←</button><div class="ls-title">🎧 Lecciones con Voz</div></div>' +
        '<div class="ls-grid">' + Object.keys(LECCIONES).map(function (k) {
          return '<div class="ls-card" data-leccion="' + k + '"><span class="emoji">🎧</span><span class="nombre">' + LECCIONES[k].titulo + '</span></div>';
        }).join('') + '</div></div>';
      app.querySelector('[data-act="volver"]').addEventListener('click', function () { lsSnd('click'); LS.mostrarMenu(); });
      app.querySelectorAll('.ls-card').forEach(function (c) {
        c.addEventListener('click', function () {
          lsSnd('click');
          var k = c.dataset.leccion;
          var lec = LECCIONES[k];
          lsHablar(lec.titulo + '. ' + lec.texto);
          var app2 = document.getElementById('app');
          app2.innerHTML = '<div class="ls-screen">' +
            '<div class="ls-head"><button class="ls-back" data-act="volver">←</button><div class="ls-title">🎧 ' + lec.titulo + '</div></div>' +
            '<div class="ls-pregunta" style="text-align:left;line-height:1.6;"><div style="font-size:15px;color:#445;">' + lec.texto + '</div></div>' +
            '<div style="text-align:center;"><button class="ls-btn ls-btn-pri" data-act="releer">🔊 Repetir</button>' +
            '<button class="ls-btn ls-btn-sec" data-act="volver2">← Volver</button></div></div>';
          app2.querySelector('[data-act="volver"]').addEventListener('click', function () { lsSnd('click'); try { speechSynthesis.cancel(); } catch (e) { } LS.mostrarLecciones(); });
          app2.querySelector('[data-act="volver2"]').addEventListener('click', function () { lsSnd('click'); try { speechSynthesis.cancel(); } catch (e) { } LS.mostrarLecciones(); });
          app2.querySelector('[data-act="releer"]').addEventListener('click', function () { lsSnd('click'); lsHablar(lec.titulo + '. ' + lec.texto); });
        });
      });
    }
  };

  /* ---- Registro en el objeto global EK ---- */
  window.EK = window.EK || {};
  EK.DATOS = EK.DATOS || {};
  EK.DATOS.lengua = LENGUA;
  EK.DATOS.sociales = SOCIALES;
  EK.LECCIONES = LECCIONES;
  EK.LenguaSociales = LS;

  /* Si no hay engine que lo consuma, mostramos el menú automáticamente */
  try {
    if (document.getElementById('app') && !window.EK.App) {
      // no hacemos nada automático; el engine lo invocará
    }
  } catch (e) { }

})();
