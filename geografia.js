/* ============================================================
   geografia.js — Mundo Geografía (VERSIÓN ULTRA PREMIUM)
   Foco ARGENTINA: Primaria y Secundaria.
   Más de 80 preguntas: Regiones, relieve, provincias, cultura, 
   historia, biodiversidad, símbolos patrios, curiosidades y economía.
   ============================================================ */
(function () {
  'use strict';
  // Función para crear preguntas barajando las opciones automáticamente
  var q = function (p, c, opts) { return { pregunta: p, opciones: opts.slice().sort(function(){return Math.random()-0.5;}), correcta: String(c) }; };

  var GEOGRAFIA = {
    '🇦🇷 Símbolos y Fechas Patrias': [
      q('¿Quién creó la Bandera Nacional Argentina?','Manuel Belgrano',['Manuel Belgrano','José de San Martín','Domingo F. Sarmiento']),
      q('¿Qué colores tiene la bandera argentina?','Celeste, blanco y un sol amarillo',['Celeste, blanco y un sol amarillo','Azul, blanco y rojo','Verde, blanco y rojo']),
      q('¿En qué ciudad se declaró la Independencia el 9 de Julio de 1816?','San Miguel de Tucumán',['San Miguel de Tucumán','Buenos Aires','Córdoba']),
      q('¿Qué símbolo patrio nos ponemos en el pecho durante la Semana de Mayo?','La Escarapela',['La Escarapela','Una medalla','Una flor de ceibo']),
      q('¿Cuál es la Flor Nacional de Argentina?','El Ceibo',['El Ceibo','La Rosa','El Girasol']),
      q('¿Cuál es el Ave Nacional de Argentina?','El Hornero',['El Hornero','El Cóndor','El Pingüino']),
      q('¿Quién compuso la música del Himno Nacional Argentino?','Blas Parera',['Blas Parera','Vicente López y Planes','Carlos Gardel']),
      q('¿Quién escribió la letra del Himno Nacional?','Vicente López y Planes',['Vicente López y Planes','Manuel Belgrano','José Hernández']),
      q('¿Qué se celebra el 25 de Mayo en Argentina?','La Revolución de Mayo (Primer Gobierno Patrio)',['La Revolución de Mayo (Primer Gobierno Patrio)','El Día de la Bandera','La Independencia']),
      q('¿Qué prócer cruzó Los Andes para liberar Chile y Perú?','José de San Martín',['José de San Martín','Manuel Belgrano','Martín Miguel de Güemes'])
    ],
    '🧉 Cultura y Tradiciones': [
      q('¿Cuál es la infusión más popular que toman los argentinos?','El mate',['El mate','El té negro','El café con leche']),
      q('¿Qué baile es un símbolo de Buenos Aires y es famoso en el mundo?','El Tango',['El Tango','El Cuarteto','La Chacarera']),
      q('¿Qué danza folclórica tradicional se baila zapateando con bombos?','El Malambo',['El Malambo','El Tango','La Cumbia']),
      q('¿Qué comida tradicional se suele comer el 25 de Mayo?','El Locro',['El Locro','Pizza','Sushi']),
      q('¿Cómo se llama al hombre de campo que montaba a caballo en las pampas?','Gaucho',['Gaucho','Charro','Cowboy']),
      q('¿Qué dulce se usa muchísimo en alfajores y postres argentinos?','Dulce de leche',['Dulce de leche','Chocolate','Crema pastelera']),
      q('¿Qué deporte es el más popular en Argentina?','Fútbol',['Fútbol','Básquet','Tenis']),
      q('¿Qué celebración de febrero llena de colores el norte argentino (Jujuy)?','El Carnaval de la Quebrada',['El Carnaval de la Quebrada','La Fiesta de la Vendimia','La Fiesta de la Nieve']),
      q('¿Qué libro escribió José Hernández sobre la vida del gaucho?','El Martín Fierro',['El Martín Fierro','El Principito','Don Segundo Sombra'])
    ],
    '🏔️ Relieve y Paisajes': [
      q('¿Qué región es una extensa llanura cubierta de pastizales?','La Pampa',['La Pampa','Los Andes','La Patagonia']),
      q('¿En qué región están las Sierras de Córdoba?','Sierras Pampeanas',['Sierras Pampeanas','Mesopotamia','Tierra del Fuego']),
      q('¿Qué gran cordillera separa Argentina de Chile?','Cordillera de Los Andes',['Cordillera de Los Andes','Cordillera Cantábrica','Los Alpes']),
      q('¿Cómo es el relieve de la Patagonia?','Mesetas y cañadones',['Mesetas y cañadones','Delta e islas','Altas cumbres nevadas']),
      q('¿En qué región está el Aconcagua, la montaña más alta de América?','Cuyo (Mendoza)',['Cuyo (Mendoza)','Mesopotamia','Pampa']),
      q('¿Dónde se encuentra la famosa Quebrada de Humahuaca?','Jujuy (NOA)',['Jujuy (NOA)','Patagonia','Buenos Aires']),
      q('¿Qué es la Puna?','Un altiplano a gran altura',['Un altiplano a gran altura','Una selva tropical','Una isla del sur']),
      q('¿Cómo se llama el gran desierto de sal ubicado en Jujuy y Salta?','Salinas Grandes',['Salinas Grandes','Salar de Uyuni','Desierto del Sahara'])
    ],
    '🦕 Dinosaurios y Parques Nacionales': [
      q('¿Qué dinosaurio gigante, uno de los más grandes del mundo, fue hallado en Neuquén?','Argentinosaurus',['Argentinosaurus','Tiranosaurio Rex','Velociraptor']),
      q('¿En qué región de Argentina se encuentran más fósiles de dinosaurios?','La Patagonia',['La Patagonia','La Mesopotamia','La Pampa']),
      q('¿Qué famoso Parque Nacional protege a los glaciares en Santa Cruz?','Parque Nacional Los Glaciares',['Parque Nacional Los Glaciares','Parque Nacional Iguazú','Parque Nacional Talampaya']),
      q('¿Dónde queda el Valle de la Luna (Ischigualasto), famoso por sus fósiles?','San Juan',['San Juan','Mendoza','Tierra del Fuego']),
      q('¿Qué protegen los Parques Nacionales?','La flora, fauna y paisajes naturales',['La flora, fauna y paisajes naturales','Ciudades y edificios','Rutas y autopistas']),
      q('¿En qué provincia se encuentra el Parque Nacional Nahuel Huapi?','Río Negro y Neuquén',['Río Negro y Neuquén','Mendoza','Tierra del Fuego']),
      q('¿Qué parque nacional en Misiones protege las famosas cataratas?','Parque Nacional Iguazú',['Parque Nacional Iguazú','Parque Nacional Lanín','Parque Nacional El Palmar'])
    ],
    '🏛️ Provincias y Capitales': [
      q('¿Cuál es la capital de la República Argentina?','Ciudad Autónoma de Buenos Aires',['Ciudad Autónoma de Buenos Aires','Córdoba','Rosario']),
      q('¿A qué provincia se la conoce como "El Jardín de la República"?','Tucumán',['Tucumán','Mendoza','Salta']),
      q('¿Cuál es la provincia más austral (al sur) del país, conocida como el "Fin del Mundo"?','Tierra del Fuego',['Tierra del Fuego','Chubut','Santa Cruz']),
      q('¿Cuál es la provincia más pequeña (en territorio) de Argentina?','Tucumán',['Tucumán','Tierra del Fuego','Jujuy']),
      q('¿Capital de la provincia de Córdoba?','Córdoba',['Córdoba','Río Cuarto','Carlos Paz']),
      q('¿Capital de Santa Fe?','Santa Fe',['Santa Fe','Rosario','Rafaela']),
      q('¿Capital de Misiones?','Posadas',['Posadas','Iguazú','Oberá']),
      q('¿Capital de Entre Ríos?','Paraná',['Paraná','Concordia','Gualeguaychú']),
      q('¿Capital de Chaco?','Resistencia',['Resistencia','Formosa','Corrientes']),
      q('¿Cuántas provincias tiene Argentina en total?','23',['23','24','20'])
    ],
    '💧 Hidrografía (Ríos y Lagos)': [
      q('¿Cuál es el río más importante y caudaloso del noreste argentino?','Río Paraná',['Río Paraná','Río de la Plata','Río Colorado']),
      q('¿Qué dos ríos se unen para formar el Río de la Plata?','Paraná y Uruguay',['Paraná y Uruguay','Bermejo y Pilcomayo','Negro y Colorado']),
      q('¿En qué provincia están las Cataratas del Iguazú?','Misiones',['Misiones','Corrientes','Entre Ríos']),
      q('¿Qué gran glaciar avanza y rompe sobre el Lago Argentino?','Glaciar Perito Moreno',['Glaciar Perito Moreno','Glaciar Viedma','Glaciar Upsala']),
      q('¿Qué mar baña las costas del este de Argentina?','Mar Argentino (Océano Atlántico)',['Mar Argentino (Océano Atlántico)','Océano Pacífico','Mar Mediterráneo']),
      q('¿Qué enorme reserva de agua dulce subterránea comparte Argentina con Brasil, Paraguay y Uruguay?','Acuífero Guaraní',['Acuífero Guaraní','Río de la Plata','Lago Nahuel Huapi']),
      q('¿Cómo se llama la laguna salada gigante ubicada en la provincia de Córdoba?','Mar Chiquita (Ansenuza)',['Mar Chiquita (Ansenuza)','Laguna de Chascomús','Lago Fagnano'])
    ],
    '🌎 América y el mundo': [
      q('¿En qué continente y hemisferio está Argentina?','América del Sur, Hemisferio Sur',['América del Sur, Hemisferio Sur','América del Norte, Hemisferio Norte','Europa, Hemisferio Sur']),
      q('¿Qué cinco países limitan con Argentina?','Chile, Bolivia, Paraguay, Brasil, Uruguay',['Chile, Bolivia, Paraguay, Brasil, Uruguay','México, Perú, Colombia, Chile, Brasil','Uruguay, Brasil, Perú, Ecuador, Chile']),
      q('¿Cuál es el país más grande de América del Sur?','Brasil',['Brasil','Argentina','Colombia']),
      q('¿Qué bloque económico integra Argentina junto a Brasil, Paraguay y Uruguay?','Mercosur',['Mercosur','Unión Europea','Nafta']),
      q('¿Qué océano está al oeste de Chile?','Océano Pacífico',['Océano Pacífico','Océano Atlántico','Océano Ártico']),
      q('¿Qué continente de hielo reclama Argentina en una porción de su territorio?','La Antártida',['La Antártida','El Ártico','Groenlandia'])
    ],
    '🌪️ Clima, Vientos y Naturaleza': [
      q('¿Cómo es el clima del norte argentino (NEA)?','Cálido y húmedo',['Cálido y húmedo','Frío y seco','Helado todo el año']),
      q('¿Cómo es el clima de la Patagonia?','Frío, seco y ventoso',['Frío, seco y ventoso','Tropical','Desértico cálido']),
      q('¿Cómo se llama el viento cálido y muy seco que sopla en Cuyo (Mendoza/San Juan)?','Viento Zonda',['Viento Zonda','Pampero','Sudestada']),
      q('¿Cómo se llama el viento frío y fuerte que viene del sur y limpia el cielo en la Pampa?','El Pampero',['El Pampero','El Zonda','El Norte']),
      q('¿Qué animal autóctono sudamericano es pariente de la llama y vive en la Patagonia?','Guanaco',['Guanaco','León','Oso polar']),
      q('¿Qué mamífero marino viene a las costas de Península Valdés (Chubut) a tener sus crías?','Ballena Franca Austral',['Ballena Franca Austral','Delfín rosado','Tiburón blanco']),
      q('¿Qué gran ave voladora es típica de la Cordillera de Los Andes?','El Cóndor Andino',['El Cóndor Andino','El Águila Calva','El Ñandú'])
    ],
    '💎 Recursos y Economía': [
      q('¿Qué región es ideal para el cultivo de la vid (uvas para hacer vino)?','Cuyo (Mendoza y San Juan)',['Cuyo (Mendoza y San Juan)','Tierra del Fuego','El Chaco']),
      q('¿Qué gran yacimiento de petróleo y gas no convencional se encuentra en Neuquén?','Vaca Muerta',['Vaca Muerta','Cerro Dragón','Yacyretá']),
      q('¿Qué mineral muy buscado para hacer baterías (oro blanco) se extrae en el Norte (Jujuy, Salta, Catamarca)?','El Litio',['El Litio','El Oro','El Carbón']),
      q('¿Qué grano es uno de los principales productos de exportación de la región Pampeana?','La Soja',['La Soja','El Cacao','El Café']),
      q('¿Qué provincia se destaca por la producción de Yerba Mate?','Misiones',['Misiones','Santa Cruz','San Luis'])
    ],
    '🗺️ Curiosidades Argentinas': [
      q('¿Cómo se llama la ruta legendaria que cruza Argentina de norte a sur bordeando Los Andes?','Ruta 40',['Ruta 40','Ruta 3','Ruta 66']),
      q('¿Qué ciudad argentina es conocida como "La ciudad del fin del mundo"?','Ushuaia',['Ushuaia','Bariloche','Salta']),
      q('¿Cómo se llama la avenida de Buenos Aires conocida por ser "la más ancha del mundo"?','Avenida 9 de Julio',['Avenida 9 de Julio','Avenida Corrientes','Avenida Rivadavia']),
      q('¿Qué provincia tiene la forma exacta de una bota en el mapa?','Santa Fe',['Santa Fe','Córdoba','La Pampa']),
      q('¿Qué ciudad balnearia es famosa por sus lobos marinos y alfajores?','Mar del Plata',['Mar del Plata','Villa Carlos Paz','Las Leñas'])
    ]
  };

  window.EK = window.EK || {};
  EK.DATOS = EK.DATOS || {};
  EK.DATOS.geografia = GEOGRAFIA;
})();
