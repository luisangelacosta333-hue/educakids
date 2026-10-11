/* ============================================================
   geografia.js — Mundo Geografía (VERSIÓN ULTRA PREMIUM)
   Foco ARGENTINA + AMÉRICA + MUNDO. Primaria y Secundaria.
   Más de 200 preguntas: Regiones (Mesopotamia, Sierras, Pampas,
   Cuyo, NOA, NEA, Patagonia, Antártida), relieve, provincias y
   capitales, hidrografía, climas, océanos y mares, países y
   capitales, banderas, biodiversidad, volcanes, coordenadas,
   economía, cultura y curiosidades.
   ------------------------------------------------------------
   API idéntica a la original (reemplazo directo):
     EK.DATOS.geografia = { "Categoría": [ {pregunta, opciones, correcta} ] }
   EXTRA aditivo: agrega lecciones a EK.LECCIONES (sin pisar las
   de lengua-sociales.js, usa el patrón merge).
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

  var GEOGRAFIA = {

    '🇦🇷 Símbolos y Fechas Patrias': [
      q('¿Quién creó la Bandera Nacional Argentina?','Manuel Belgrano',['Manuel Belgrano','José de San Martín','Domingo F. Sarmiento']),
      q('¿Qué colores tiene la bandera argentina?','Celeste y blanco, con el Sol de Mayo en el centro',['Celeste y blanco, con el Sol de Mayo en el centro','Azul, blanco y rojo','Verde, blanco y rojo']),
      q('¿En qué ciudad se declaró la Independencia el 9 de Julio de 1816?','San Miguel de Tucumán',['San Miguel de Tucumán','Buenos Aires','Córdoba']),
      q('¿Qué símbolo patrio nos ponemos en el pecho el 25 de Mayo?','La escarapela',['La escarapela','Una medalla','Una flor de ceibo']),
      q('¿Cuál es la flor nacional de Argentina?','El ceibo',['El ceibo','La rosa','El girasol']),
      q('¿Cuál es el ave nacional de Argentina?','El hornero',['El hornero','El cóndor','El pingüino']),
      q('¿Quién compuso la música del Himno Nacional Argentino?','Blas Parera',['Blas Parera','Vicente López y Planes','Carlos Gardel']),
      q('¿Quién escribió la letra del Himno Nacional?','Vicente López y Planes',['Vicente López y Planes','Manuel Belgrano','José Hernández']),
      q('¿Qué se celebra el 25 de Mayo en Argentina?','La Revolución de Mayo (Primer Gobierno Patrio)',['La Revolución de Mayo (Primer Gobierno Patrio)','El Día de la Bandera','La Independencia']),
      q('¿Qué prócer cruzó los Andes para liberar Chile y Perú?','José de San Martín',['José de San Martín','Manuel Belgrano','Martín Miguel de Güemes']),
      q('¿Cuántos rayos tiene el Sol de Mayo?','32 (16 rectos y 16 flamígeros)',['32 (16 rectos y 16 flamígeros)','12','50']),
      q('¿En qué ciudad se alza el Monumento Nacional a la Bandera?','Rosario (Santa Fe)',['Rosario (Santa Fe)','Ushuaia','Mendoza'])
    ],

    '🧉 Cultura y Tradiciones': [
      q('¿Cuál es la infusión más popular que toman los argentinos?','El mate',['El mate','El té negro','El café con leche']),
      q('¿Qué baile es símbolo de Buenos Aires y famoso en el mundo?','El tango',['El tango','El cuarteto','La chacarera']),
      q('¿Qué danza folclórica tradicional se baila zapateando con bombos?','El malambo',['El malambo','El tango','La cumbia']),
      q('¿Qué comida tradicional se suele comer el 25 de Mayo?','El locro (con empanadas)',['El locro (con empanadas)','Pizza','Sushi']),
      q('¿Cómo se llama al hombre de campo que montaba a caballo en las pampas?','Gaucho',['Gaucho','Charro','Cowboy']),
      q('¿Qué dulce se usa muchísimo en alfajores y postres argentinos?','Dulce de leche',['Dulce de leche','Chocolate','Crema pastelera']),
      q('¿Qué deporte es el más popular en Argentina?','El fútbol',['El fútbol','El básquet','El tenis']),
      q('¿Qué celebración llena de colores el noroeste (Jujuy) en febrero?','El Carnaval de la Quebrada',['El Carnaval de la Quebrada','La Fiesta de la Vendimia','La Fiesta de la Nieve']),
      q('¿Qué libro escribió José Hernández sobre la vida del gaucho?','El Martín Fierro',['El Martín Fierro','El Principito','Don Segundo Sombra']),
      q('¿En qué pueblo patagónico (Chubut) se habla galés por los colonos de 1865?','Gaiman (y Trelew, Trevelin)',['Gaiman (y Trelew, Trevelin)','Bariloche','Mar del Plata']),
      q('¿Qué fiesta de la vendimia (cosecha de uva) se celebra en Mendoza?','Fiesta Nacional de la Vendimia',['Fiesta Nacional de la Vendimia','Carnaval de Gualeguaychú','Oktoberfest']),
      q('¿Qué música típica del litoral (Corrientes, Misiones) se toca con acordeón?','El chamamé',['El chamamé','El tango','El rock'])
    ],

    '🏔️ Relieve y Paisajes': [
      q('¿Qué región es una extensa llanura cubierta de pastizales?','La Pampa',['La Pampa','Los Andes','La Patagonia']),
      q('¿En qué región están las Sierras de Córdoba?','Sierras Pampeanas',['Sierras Pampeanas','Mesopotamia','Tierra del Fuego']),
      q('¿Qué gran cordillera separa Argentina de Chile?','La cordillera de los Andes',['La cordillera de los Andes','La cordillera Cantábrica','Los Alpes']),
      q('¿Cómo es el relieve de la Patagonia?','Mesetas y cañadones escalonados',['Mesetas y cañadones escalonados','Delta e islas','Altas cumbres nevadas']),
      q('¿En qué región está el Aconcagua, la montaña más alta de América?','Cuyo (Mendoza)',['Cuyo (Mendoza)','Mesopotamia','Pampa']),
      q('¿Dónde está la famosa Quebrada de Humahuaca (Patrimonio de la Humanidad)?','Jujuy (NOA)',['Jujuy (NOA)','Patagonia','Buenos Aires']),
      q('¿Qué es la Puna?','Un altiplano (meseta alta) de más de 3.000 m en el NOA',['Un altiplano (meseta alta) de más de 3.000 m en el NOA','Una selva tropical','Una isla del sur']),
      q('¿Cómo se llama el gran desierto de sal de Jujuy y Salta?','Salinas Grandes',['Salinas Grandes','Salar de Uyuni','Desierto del Sahara']),
      q('¿Qué punto más bajo de América está en Santa Cruz (-105 m)?','Laguna del Carbón (Gran Bajo de San Julián)',['Laguna del Carbón (Gran Bajo de San Julián)','Mar Chiquita','El Caribe']),
      q('¿Qué valle árido de La Rioja tiene fósiles de dinosaurios y es Patrimonio de la Humanidad?','Talampaya',['Talampaya','Iguazú','Nahuel Huapi']),
      q('¿Qué "tren" sube a la Puna salteña y es uno de los más altos del mundo?','El Tren a las Nubes',['El Tren a las Nubes','El Transcantábrico','El Eurotúnel']),
      q('¿Qué cerro de los Siete Colores está en Purmamarca (Jujuy)?','El Cerro de los Siete Colores (Purmamarca)',['El Cerro de los Siete Colores (Purmamarca)','El Aconcagua','El Fitz Roy'])
    ],

    '🦕 Dinosaurios y Parques Nacionales': [
      q('¿Qué dinosaurio gigante, uno de los más grandes del mundo, fue hallado en Neuquén?','Argentinosaurus',['Argentinosaurus','Tiranosaurio Rex','Velociraptor']),
      q('¿En qué región de Argentina se encuentran más fósiles de dinosaurios?','La Patagonia',['La Patagonia','La Mesopotamia','La Pampa']),
      q('¿Qué famoso Parque Nacional protege a los glaciares en Santa Cruz?','Parque Nacional Los Glaciares',['Parque Nacional Los Glaciares','Parque Nacional Iguazú','Parque Nacional Talampaya']),
      q('¿Dónde queda el Valle de la Luna (Ischigualasto), famoso por sus fósiles?','San Juan',['San Juan','Mendoza','Tierra del Fuego']),
      q('¿Qué protegen los Parques Nacionales?','La flora, fauna y paisajes naturales',['La flora, fauna y paisajes naturales','Ciudades y edificios','Rutas y autopistas']),
      q('¿En qué provincias está el Parque Nacional Nahuel Huapi?','Río Negro y Neuquén (Bariloche)',['Río Negro y Neuquén (Bariloche)','Mendoza','Tierra del Fuego']),
      q('¿Qué parque nacional de Misiones protege las famosas cataratas?','Parque Nacional Iguazú',['Parque Nacional Iguazú','Parque Nacional Lanín','Parque Nacional El Palmar']),
      q('¿Qué parque nacional de Chubut protege alerces milenarios?','Parque Nacional Los Alerces',['Parque Nacional Los Alerces','Parque Nacional Tierra del Fuego','Parque Nacional Pre-Delta']),
      q('¿Qué enorme humedal de Corrientes es uno de los más grandes del mundo?','Los Esteros del Iberá',['Los Esteros del Iberá','El Delta del Paraná','El Pantanal']),
      q('¿Qué parque nacional está en el "Fin del Mundo", cerca de Ushuaia?','Parque Nacional Tierra del Fuego',['Parque Nacional Tierra del Fuego','Parque Nacional Iguazú','Parque Nacional Quebrada de Condorito']),
      q('¿Qué gran dinosaurio herbívoro se halló en Chubut (Patagonia)?','Patagotitan mayorum',['Patagotitan mayorum','Triceratops','Mamut']),
      q('¿Qué península de Chubut es Patrimonio de la Humanidad por las ballenas?','Península Valdés',['Península Valdés','Punta del Este','Cabo de Hornos'])
    ],

    '🏛️ Provincias y Capitales': [
      q('¿Cuál es la capital de la República Argentina?','Ciudad Autónoma de Buenos Aires (CABA)',['Ciudad Autónoma de Buenos Aires (CABA)','Córdoba','Rosario']),
      q('¿A qué provincia se la conoce como "El Jardín de la República"?','Tucumán',['Tucumán','Mendoza','Salta']),
      q('¿Cuál es la provincia más austral, conocida como el "Fin del Mundo"?','Tierra del Fuego (Antártida e Islas del Atlántico Sur)',['Tierra del Fuego (Antártida e Islas del Atlántico Sur)','Chubut','Santa Cruz']),
      q('¿Cuál es la provincia más chica (en territorio) de Argentina?','Tucumán',['Tucumán','Tierra del Fuego','Jujuy']),
      q('¿Capital de la provincia de Córdoba?','Córdoba',['Córdoba','Río Cuarto','Carlos Paz']),
      q('¿Capital de Santa Fe?','Santa Fe',['Santa Fe','Rosario','Rafaela']),
      q('¿Capital de Misiones?','Posadas',['Posadas','Puerto Iguazú','Oberá']),
      q('¿Capital de Entre Ríos?','Paraná',['Paraná','Concordia','Gualeguaychú']),
      q('¿Capital de Chaco?','Resistencia',['Resistencia','Formosa','Corrientes']),
      q('¿Cuántas provincias tiene Argentina?','23 (más la Ciudad Autónoma de Buenos Aires)',['23 (más la Ciudad Autónoma de Buenos Aires)','24','20']),
      q('¿Capital de Mendoza?','Mendoza',['Mendoza','San Rafael','Godoy Cruz']),
      q('¿Capital de Chubut?','Rawson',['Rawson','Comodoro Rivadavia','Puerto Madryn']),
      q('¿Capital de Tierra del Fuego?','Ushuaia',['Ushuaia','Río Gallegos','Viedma']),
      q('¿Capital de la provincia de Buenos Aires?','La Plata',['La Plata','Mar del Plata','Bahía Blanca']),
      q('¿Cuál es la provincia más poblada?','Buenos Aires',['Buenos Aires','Córdoba','Santa Fe'])
    ],

    '💧 Hidrografía: Ríos, Lagos y Mares': [
      q('¿Cuál es el río más importante y caudaloso del noreste argentino?','Río Paraná',['Río Paraná','Río de la Plata','Río Colorado']),
      q('¿Qué dos ríos se unen para formar el Río de la Plata?','Paraná y Uruguay',['Paraná y Uruguay','Bermejo y Pilcomayo','Negro y Colorado']),
      q('¿En qué provincia están las Cataratas del Iguazú (275 saltos)?','Misiones',['Misiones','Corrientes','Entre Ríos']),
      q('¿Qué glaciar famoso avanza y se rompe sobre el Lago Argentino?','Glaciar Perito Moreno',['Glaciar Perito Moreno','Glaciar Viedma','Glaciar Upsala']),
      q('¿Qué mar baña las costas del este de Argentina?','Mar Argentino (Océano Atlántico)',['Mar Argentino (Océano Atlántico)','Océano Pacífico','Mar Mediterráneo']),
      q('¿Qué enorme reserva de agua dulce subterránea comparte Argentina con Brasil, Paraguay y Uruguay?','Acuífero Guaraní',['Acuífero Guaraní','Río de la Plata','Lago Nahuel Huapi']),
      q('¿Cómo se llama la laguna salada gigante de Córdoba?','Mar Chiquita (Ansenuza)',['Mar Chiquita (Ansenuza)','Laguna de Chascomús','Lago Fagnano']),
      q('¿Qué río es el segundo más largo de Argentina y atraviesa la Patagonia?','Río Negro (se forma con Neuquén y Limay)',['Río Negro (se forma con Neuquén y Limay)','Río Paraná','Río Pilcomayo']),
      q('¿Qué lago patagónico está junto a Bariloche?','Lago Nahuel Huapi',['Lago Nahuel Huapi','Lago Titicaca','Lago Superior']),
      q('¿Qué río forma el delta de islas cerca de Buenos Aires (Tigre)?','Río Paraná (Delta del Paraná)',['Río Paraná (Delta del Paraná)','Río de la Plata','Río Uruguay']),
      q('¿Qué estrecho separa la Tierra del Fuego del continente?','Estrecho de Magallanes',['Estrecho de Magallanes','Canal Beagle','Estrecho de Gibraltar']),
      q('¿Qué canal separa la Isla Grande de Tierra del Fuego de las islas al sur?','Canal Beagle',['Canal Beagle','Estrecho de Bering','Canal de Panamá'])
    ],

    '🌎 América y el Mundo': [
      q('¿En qué continente y hemisferio está Argentina?','América del Sur, Hemisferio Sur y Occidental',['América del Sur, Hemisferio Sur y Occidental','América del Norte, Hemisferio Norte','Europa, Hemisferio Sur']),
      q('¿Qué cinco países limitan con Argentina?','Chile, Bolivia, Paraguay, Brasil, Uruguay',['Chile, Bolivia, Paraguay, Brasil, Uruguay','México, Perú, Colombia, Chile, Brasil','Uruguay, Brasil, Perú, Ecuador, Chile']),
      q('¿Cuál es el país más grande de América del Sur?','Brasil',['Brasil','Argentina','Colombia']),
      q('¿Qué bloque económico integra Argentina junto a Brasil, Paraguay y Uruguay?','Mercosur',['Mercosur','Unión Europea','TLCAN/NAFTA']),
      q('¿Qué océano está al oeste de Chile?','Océano Pacífico',['Océano Pacífico','Océano Atlántico','Océano Ártico']),
      q('¿Qué continente de hielo reclama Argentina en un sector?','La Antártida',['La Antártida','El Ártico','Groenlandia']),
      q('¿Cuántos países hay en América del Sur?','12 (más la Guayana Francesa, que es francesa)',['12 (más la Guayana Francesa, que es francesa)','5','20']),
      q('¿Qué país sudamericano tiene como idioma oficial el portugués?','Brasil',['Brasil','Argentina','Chile']),
      q('¿En qué país andino el quechua y el aimara son idiomas oficiales?','Bolivia (y Perú)',['Bolivia (y Perú)','Uruguay','Chile']),
      q('¿Qué país sudamericano tiene el guaraní como idioma oficial junto al español?','Paraguay',['Paraguay','Brasil','Venezuela']),
      q('¿Qué país de América del Norte es el segundo más grande del mundo?','Canadá',['Canadá','México','Estados Unidos']),
      q('¿Qué canal une el Océano Atlántico con el Pacífico en Centroamérica?','Canal de Panamá',['Canal de Panamá','Canal de Suez','Estrecho de Magallanes'])
    ],

    '🌪️ Clima, Vientos y Naturaleza': [
      q('¿Cómo es el clima del noreste argentino (NEA, Misiones)?','Cálido y húmedo (subtropical sin estación seca)',['Cálido y húmedo (subtropical sin estación seca)','Frío y seco','Helado todo el año']),
      q('¿Cómo es el clima de la Patagonia?','Frío, seco y muy ventoso',['Frío, seco y muy ventoso','Tropical','Desértico cálido']),
      q('¿Cómo se llama el viento cálido y seco que baja de los Andes en Cuyo?','Viento Zonda',['Viento Zonda','Pampero','Sudestada']),
      q('¿Cómo se llama el viento frío del sur que limpia el cielo en la Pampa?','El Pampero',['El Pampero','El Zonda','El Norte']),
      q('¿Qué animal autóctono es pariente de la llama y vive en la Patagonia?','Guanaco',['Guanaco','León','Oso polar']),
      q('¿Qué mamífero marino viene a Península Valdés (Chubut) a tener sus crías?','Ballena Franca Austral',['Ballena Franca Austral','Delfín rosado','Tiburón blanco']),
      q('¿Qué gran ave voladora es típica de la cordillera de los Andes?','El cóndor andino',['El cóndor andino','El águila calva','El ñandú']),
      q('¿Qué ave no voladora, parecida al avestruz, vive en la Patagonia?','El ñandú (choique)',['El ñandú (choique)','El pingüino','El flamenco']),
      q('¿Qué pingüino viene a anidar a Punta Tombo (Chubut)?','Pingüino de Magallanes',['Pingüino de Magallanes','Pingüino emperador','Pingüino azul']),
      q('¿Qué fenómeno climático del Pacífico ecuatorial altera las lluvias en Argentina?','El Niño (y La Niña)',['El Niño (y La Niña)','Un huracán','Un tsunami']),
      q('¿Qué clima tiene la región pampeana?','Templado, con lluvias regulares',['Templado, con lluvias regulares','Desértico','Polar']),
      q('¿Qué clima seco y cálido hay en Cuyo y en el "Monte"?','Semiárido / árido',['Semiárido / árido','Selvático','Tundra'])
    ],

    '💎 Recursos y Economía': [
      q('¿Qué región es ideal para el cultivo de la vid (uva para vino)?','Cuyo (Mendoza y San Juan)',['Cuyo (Mendoza y San Juan)','Tierra del Fuego','El Chaco']),
      q('¿Qué gran yacimiento de petróleo y gas no convencional está en Neuquén?','Vaca Muerta',['Vaca Muerta','Cerro Dragón','Yacyretá']),
      q('¿Qué mineral, llamado "oro blanco" para baterías, se extrae en el NOA (Jujuy, Salta, Catamarca)?','El litio',['El litio','El oro','El carbón']),
      q('¿Qué grano es uno de los principales productos de exportación de la región pampeana?','La soja',['La soja','El cacao','El café']),
      q('¿Qué provincia se destaca por la producción de yerba mate?','Misiones (y Corrientes)',['Misiones (y Corrientes)','Santa Cruz','San Luis']),
      q('¿Qué provincia es la principal productora de azúcar (caña de azúcar)?','Tucumán',['Tucumán','Tierra del Fuego','Chubut']),
      q('¿Qué tres países forman el "Triángulo del Litio"?','Argentina, Bolivia y Chile',['Argentina, Bolivia y Chile','Brasil, Uruguay, Paraguay','EE.UU., Canadá, México']),
      q('¿Qué represas hidroeléctricas compartidas tiene Argentina?','Yacyretá (con Paraguay) y Salto Grande (con Uruguay)',['Yacyretá (con Paraguay) y Salto Grande (con Uruguay)','Itaipú (con Brasil)','Las Tres Gargantas (China)']),
      q('¿Qué puerto patagónico es importante por el petróleo?','Comodoro Rivadavia (Chubut)',['Comodoro Rivadavia (Chubut)','Ushuaia','Tigre']),
      q('¿Qué puerto fluvial del Paraná es clave para exportar cereales?','Rosario (y San Lorenzo-Santa Fe)',['Rosario (y San Lorenzo-Santa Fe)','Ushuaia','Bariloche'])
    ],

    '🗺️ Curiosidades Argentinas': [
      q('¿Cómo se llama la ruta legendaria que cruza Argentina de norte a sur bordeando los Andes?','Ruta 40',['Ruta 40','Ruta 3','Ruta 66']),
      q('¿Qué ciudad argentina es conocida como "la ciudad del fin del mundo"?','Ushuaia',['Ushuaia','Bariloche','Salta']),
      q('¿Cómo se llama la avenida de Buenos Aires conocida como "la más ancha del mundo"?','Avenida 9 de Julio',['Avenida 9 de Julio','Avenida Corrientes','Avenida Rivadavia']),
      q('¿Qué provincia se dice que tiene forma de bota en el mapa?','Santa Fe',['Santa Fe','Córdoba','La Pampa']),
      q('¿Qué ciudad balnearia es famosa por sus lobos marinos y alfajores?','Mar del Plata',['Mar del Plata','Villa Carlos Paz','Las Leñas']),
      q('¿A qué ciudad se la llama "la Suiza argentina" por sus lagos y montañas?','Bariloche (San Carlos de Bariloche)',['Bariloche (San Carlos de Bariloche)','Mar del Plata','Resistencia']),
      q('¿A qué provincia se la conoce como "tierra del sol y del buen vino"?','Mendoza',['Mendoza','Tierra del Fuego','Formosa']),
      q('¿Qué ciudad cordobesa tiene la universidad más antigua del país (1613)?','Córdoba ("La Docta")',['Córdoba ("La Docta")','Buenos Aires','Rosario']),
      q('¿Qué base argentina en la Antártida es la más antigua del mundo (1904)?','Base Orcadas (Islas Orcadas del Sur)',['Base Orcadas (Islas Orcadas del Sur)','Base Marambio','Base Esperanza']),
      q('¿Qué montaña patagónica (Santa Cruz) es famosa por los escaladores?','El Fitz Roy (Chaltén)',['El Fitz Roy (Chaltén)','El Aconcagua','El Pan de Azúcar'])
    ],

    '🗺️ Regiones Geográficas Argentinas': [
      q('¿Qué provincias integran la región del NOA (Noroeste)?','Jujuy, Salta, Tucumán, Catamarca, La Rioja y Santiago del Estero',['Jujuy, Salta, Tucumán, Catamarca, La Rioja y Santiago del Estero','Mendoza, San Juan, San Luis','Buenos Aires y La Pampa']),
      q('¿Qué provincias integran Cuyo?','Mendoza, San Juan y San Luis',['Mendoza, San Juan y San Luis','Jujuy y Salta','Chubut y Santa Cruz']),
      q('¿Qué provincias integran la Patagonia?','Neuquén, Río Negro, Chubut, Santa Cruz y Tierra del Fuego',['Neuquén, Río Negro, Chubut, Santa Cruz y Tierra del Fuego','Misiones y Corrientes','Buenos Aires y Córdoba']),
      q('¿Qué región es la llanura fértil donde se cultiva soja, trigo y maíz?','La Pampa (región pampeana)',['La Pampa (región pampeana)','La Patagonia','La Puna']),
      q('¿Qué región incluye las provincias de Chaco, Formosa, Corrientes y Misiones?','El NEA (Noreste Argentino)',['El NEA (Noreste Argentino)','Cuyo','Patagonia']),
      q('¿Qué sector antártico reclama Argentina como propio?','Entre los meridianos 25° y 74° Oeste (Antártida Argentina)',['Entre los meridianos 25° y 74° Oeste (Antártida Argentina)','El Polo Norte','Groenlandia']),
      q('¿Qué provincia incluye en su territorio a la Antártida y las Islas Malvinas (según Argentina)?','Tierra del Fuego (Antártida e Islas del Atlántico Sur)',['Tierra del Fuego (Antártida e Islas del Atlántico Sur)','Buenos Aires','Mendoza']),
      q('¿Qué región es la más árida y seca, con el Desierto del Monte?','Cuyo y el Monte (San Juan, La Rioja, San Luis, La Pampa)',['Cuyo y el Monte (San Juan, La Rioja, San Luis, La Pampa)','Misiones','Tierra del Fuego']),
      q('¿Qué región argentina tiene selvas tropicales (Yungas y Selva Misionera)?','El NOA y el NEA (norte)',['El NOA y el NEA (norte)','La Patagonia','Cuyo']),
      q('¿Qué región es famosa por sus mesetas escalonadas y el viento constante?','La Patagonia',['La Patagonia','La Pampa','Mesopotamia']),
      q('¿Qué región es la más poblada y tiene las mayores ciudades?','La región pampeana (Buenos Aires, Córdoba, Santa Fe, Rosario)',['La región pampeana (Buenos Aires, Córdoba, Santa Fe, Rosario)','Tierra del Fuego','La Puna']),
      q('¿Qué región es la más alta y fría del norte, con salares y volcanes?','La Puna (NOA)',['La Puna (NOA)','El Delta','La costa atlántica'])
    ],

    '🌾 Mesopotamia, Sierras Pampeanas y Pampa': [
      q('¿Por qué se llama "Mesopotamia" a esa región argentina?','Porque está entre dos ríos: Paraná y Uruguay (como la Mesopotamia asiática)',['Porque está entre dos ríos: Paraná y Uruguay (como la Mesopotamia asiática)','Porque tiene muchas montañas','Porque es un desierto']),
      q('¿Qué provincias integran la Mesopotamia argentina?','Entre Ríos, Corrientes y Misiones',['Entre Ríos, Corrientes y Misiones','Mendoza y San Juan','Chubut y Santa Cruz']),
      q('¿Qué famoso paisaje de selva y cascadas está en Mesopotamia?','Las Cataratas del Iguazú (Misiones)',['Las Cataratas del Iguazú (Misiones)','El Perito Moreno','El Aconcagua']),
      q('¿Qué producto típico se cultiva mucho en Misiones?','Yerba mate (y té)',['Yerba mate (y té)','Vid para vino','Petróleo']),
      q('¿Qué son las Sierras Pampeanas?','Cadenas de montañas viejas y bajas del centro (Córdoba, San Luis, La Rioja, Catamarca)',['Cadenas de montañas viejas y bajas del centro (Córdoba, San Luis, La Rioja, Catamarca)','Volcanes activos del sur','Islas del delta']),
      q('¿En qué provincia están las Sierras de Córdoba (Punilla, Traslasierra)?','Córdoba',['Córdoba','Misiones','Tierra del Fuego']),
      q('¿Qué cerro es el más alto de las Sierras de Córdoba?','Cerro Champaquí (2.884 m)',['Cerro Champaquí (2.884 m)','Aconcagua','Fitz Roy']),
      q('¿Qué pueblo de las Sierras de Córdoba es famoso por el festival de folklore?','Cosquín (Valle de Punilla)',['Cosquín (Valle de Punilla)','Bariloche','Ushuaia']),
      q('¿Qué tipo de suelo hace fértil a la Pampa?','El loess (suelo fino arrastrado por el viento)',['El loess (suelo fino arrastrado por el viento)','La arena del desierto','El hielo eterno']),
      q('¿Qué actividad económica domina en la Pampa húmeda?','Agricultura (soja, trigo, maíz) y ganadería (vacas)',['Agricultura (soja, trigo, maíz) y ganadería (vacas)','Minería de litio','Pesca en hielo']),
      q('¿Qué provincia forma parte de la Pampa y se llama igual que la región?','La Pampa (capital Santa Rosa)',['La Pampa (capital Santa Rosa)','Misiones','Jujuy']),
      q('¿Qué río limita al este con la Mesopotamia y la separa de Uruguay?','Río Uruguay',['Río Uruguay','Río Colorado','Río Limay'])
    ],

    '🌡️ Climas del Mundo y de América': [
      q('¿Qué clima lluvioso y cálido todo el año tiene la Amazonía?','Ecuatorial (selvático)',['Ecuatorial (selvático)','Polar','Desértico']),
      q('¿Qué clima tiene una estación seca y otra lluviosa, con sabanas?','Tropical',['Tropical','Mediterráneo','Tundra']),
      q('¿Qué desierto de Chile es el más seco del mundo?','Atacama',['Atacama','Sahara','Gobi']),
      q('¿Qué clima tiene verano seco y cálido e invierno lluvioso (centro de Chile, California)?','Mediterráneo',['Mediterráneo','Ecuatorial','Polar']),
      q('¿Qué clima tiene la Pampa argentina y gran parte de Europa?','Templado',['Templado','Desértico','Selvático']),
      q('¿Qué clima extremo frío tiene la Antártida y el Ártico?','Polar (hielo perpetuo)',['Polar (hielo perpetuo)','Tropical','Mediterráneo']),
      q('¿Cómo cambia el clima en la montaña a mayor altura?','Hace más frío y baja la presión (clima de altura/nival)',['Hace más frío y baja la presión (clima de altura/nival)','Hace más calor','No cambia nada']),
      q('¿Qué clima monzónico tiene el sudeste asiático (lluvias torrenciales en verano)?','Monzónico',['Monzónico','Desértico','Continental']),
      q('¿Qué clima frío con inviernos largos hay en Canadá y Siberia?','Continental / boreal (taiga)',['Continental / boreal (taiga)','Ecuatorial','Mediterráneo']),
      q('¿Qué región de Argentina tiene clima tropical sin estación seca?','Misiones (Selva Misionera)',['Misiones (Selva Misionera)','Mendoza','Patagonia']),
      q('¿Qué ocurre con la temperatura cada 1000 m de altura en la montaña?','Desciende unos 6 °C (gradiente térmico)',['Desciende unos 6 °C (gradiente térmico)','Aumenta 10 °C','No varía']),
      q('¿Qué fenómeno enfría las aguas del Pacífico ecuatorial (lo opuesto a El Niño)?','La Niña',['La Niña','El Niño','Un huracán'])
    ],

    '🌊 Océanos, Mares, Estrechos y Canales': [
      q('¿Cuántos océanos hay en el mundo?','5: Pacífico, Atlántico, Índico, Ártico y Antártico',['5: Pacífico, Atlántico, Índico, Ártico y Antártico','3','7']),
      q('¿Cuál es el océano más grande y profundo?','El Pacífico',['El Pacífico','El Atlántico','El Índico']),
      q('¿Qué mar está entre Europa, África y Asia?','El Mar Mediterráneo',['El Mar Mediterráneo','El Mar Rojo','El Mar Caribe']),
      q('¿Qué estrecho separa Europa (España) de África (Marruecos)?','Estrecho de Gibraltar',['Estrecho de Gibraltar','Estrecho de Magallanes','Estrecho de Bering']),
      q('¿Qué canal une el Mar Mediterráneo con el Mar Rojo (y el Océano Índico)?','Canal de Suez (Egipto)',['Canal de Suez (Egipto)','Canal de Panamá','Canal Beagle']),
      q('¿Qué mar es en realidad un lago salado, el más grande del mundo?','El Mar Caspio',['El Mar Caspio','El Mar Mediterráneo','El Mar Rojo']),
      q('¿Qué lago más salado y más bajo de la Tierra está entre Israel y Jordania?','El Mar Muerto',['El Mar Muerto','El Mar Caspio','El Lago Superior']),
      q('¿Qué estrecho separa Asia de América (Rusia de Alaska)?','Estrecho de Bering',['Estrecho de Bering','Estrecho de Gibraltar','Canal de Panamá']),
      q('¿Qué mar del Caribe baña las costas de México, Centroamérica y las Antillas?','Mar Caribe',['Mar Caribe','Mar del Norte','Mar Báltico']),
      q('¿Qué golfo patagónico es famoso por las ballenas (Península Valdés)?','Golfo Nuevo (y Golfo San José)',['Golfo Nuevo (y Golfo San José)','Golfo de México','Golfo Pérsico']),
      q('¿Qué océano baña las costas orientales de América del Sur?','El Atlántico',['El Atlántico','El Pacífico','El Índico']),
      q('¿Qué mar rodea la Antártida (también llamado Austral)?','Océano Antártico (o Mar de Hoces / Pasaje de Drake)',['Océano Antártico (o Mar de Hoces / Pasaje de Drake)','Mar Mediterráneo','Mar Rojo'])
    ],

    '🚩 Banderas y Países de América': [
      q('¿Qué bandera es celeste y blanco con un Sol de Mayo (igual que la argentina, pero con 9 rayas)?','Uruguay',['Uruguay','Chile','Brasil']),
      q('¿Qué bandera tiene una franja azul arriba con una estrella blanca, y abajo blanco y rojo?','Chile',['Chile','Paraguay','Perú']),
      q('¿Qué bandera es verde con un rombo amarillo y un círculo azul con estrellas?','Brasil',['Brasil','México','Colombia']),
      q('¿Qué bandera es verde, blanco y rojo con un águila devorando una serpiente?','México',['México','Italia','Irlanda']),
      q('¿Qué bandera tiene una gran hoja de arce roja en el centro?','Canadá',['Canadá','Estados Unidos','Cuba']),
      q('¿Qué bandera es roja, amarilla y verde (horizontal) con el escudo andino?','Bolivia',['Bolivia','España','Uruguay']),
      q('¿Qué bandera es amarillo, azul y rojo (con el amarillo el doble de ancho)?','Colombia (y Ecuador, con escudo distinto)',['Colombia (y Ecuador, con escudo distinto)','Argentina','Chile']),
      q('¿Qué bandera caribeña tiene cinco franjas azules y blancas y un triángulo rojo con estrella?','Cuba',['Cuba','Brasil','Canadá']),
      q('¿Qué bandera de América del Sur es roja, blanca y roja (vertical) con el escudo?','Perú',['Perú','Italia','Francia']),
      q('¿Qué bandera es azul con estrellas blancas y rojas y barras (stars and stripes)?','Estados Unidos',['Estados Unidos','Reino Unido','Australia']),
      q('¿Qué bandera europea es roja-amarillo-roja (horizontal) con escudo?','España',['España','Italia','Francia'])
    ],

    '🏙️ Capitales del Mundo y de América': [
      q('¿Cuál es la capital de Brasil?','Brasilia',['Brasilia','Río de Janeiro','São Paulo']),
      q('¿Cuál es la capital de Chile?','Santiago',['Santiago','Valparaíso','Lima']),
      q('¿Cuál es la capital de Perú?','Lima',['Lima','Cusco','Quito']),
      q('¿Cuál es la capital de Colombia?','Bogotá',['Bogotá','Medellín','Cartagena']),
      q('¿Cuál es la capital de Paraguay?','Asunción',['Asunción','Montevideo','Brasilia']),
      q('¿Cuál es la capital de Uruguay?','Montevideo',['Montevideo','Asunción','Punta del Este']),
      q('¿Qué ciudad es sede de gobierno de Bolivia (y cuál es la capital constitucional)?','La Paz (sede de gobierno); Sucre (capital constitucional)',['La Paz (sede de gobierno); Sucre (capital constitucional)','Solo Lima','Solo Santiago']),
      q('¿Cuál es la capital de Venezuela?','Caracas',['Caracas','Bogotá','Quito']),
      q('¿Cuál es la capital de México?','Ciudad de México',['Ciudad de México','Guadalajara','Monterrey']),
      q('¿Cuál es la capital de Estados Unidos?','Washington D.C.',['Washington D.C.','Nueva York','Los Ángeles']),
      q('¿Cuál es la capital de Canadá?','Ottawa',['Ottawa','Toronto','Vancouver']),
      q('¿Cuál es la capital de España (país europeo)?','Madrid',['Madrid','Barcelona','Lisboa'])
    ],

    '🐆 Biodiversidad y Ecorregiones Argentinas': [
      q('¿Qué gran felino, el más grande de América, vive en el norte argentino (Misiones, Chaco)?','El yaguareté (jaguar)',['El yaguareté (jaguar)','El puma','El guanaco']),
      q('¿Qué roedor, el más grande del mundo, vive en los esteros y bañados?','El carpincho (capibara)',['El carpincho (capibara)','El ratón','El coipo']),
      q('¿Qué selva misionera es una de las más biodiversas del país?','La Selva Paranaense (Misiones)',['La Selva Paranaense (Misiones)','La estepa patagónica','El desierto del Monte']),
      q('¿Qué bosque de altura del NOA (Tucumán, Salta, Jujuy) es llamado "yungas"?','Las Yungas (selva de montaña)',['Las Yungas (selva de montaña)','La Patagonia','El Delta']),
      q('¿Qué árbol del Chaco tiene la madera muy dura y da tanino?','El quebracho colorado',['El quebracho colorado','El pino','El ceibo']),
      q('¿Qué árbol milenario de la Patagonia (Neuquén) es sagrado para los mapuches?','La araucaria (pehuén)',['La araucaria (pehuén)','El ceibo','El quebracho']),
      q('¿Qué arbusto patagónico da un fruto negro dulce (dice la leyenda que quien lo come vuelve)?','El calafate',['El calafate','El ceibo','El cardón']),
      q('¿Qué ciervo andino patagónico está en peligro de extinción?','El huemul',['El huemul','El guanaco','El carpincho']),
      q('¿Qué cactus gigante crece en la Puna y el NOA?','El cardón (cactus de los andes)',['El cardón (cactus de los andes)','El roble','El palmar']),
      q('¿Qué ecorregión es la llanura cubierta de pastizales del centro-este?','La Pampa (pastizal pampeano)',['La Pampa (pastizal pampeano)','La selva misionera','El hielo antártico']),
      q('¿Qué ecorregión patagónica es una estepa fría y seca de arbustos bajos?','La estepa patagónica',['La estepa patagónica','La selva tropical','El manglar']),
      q('¿Qué flamenco de colores vive en las lagunas saladas de la Puna y la Patagonia?','El flamenco austral (y andino)',['El flamenco austral (y andino)','El pingüino','El hornero'])
    ],

    '🧭 Coordenadas, Mapas y Orientación': [
      q('¿Qué línea imaginaria divide la Tierra en hemisferio Norte y Sur?','El Ecuador (línea equinoccial, 0° de latitud)',['El Ecuador (línea equinoccial, 0° de latitud)','El Trópico de Cáncer','El meridiano de Greenwich']),
      q('¿Qué línea es 0° de longitud y pasa por Greenwich (Londres)?','Meridiano de Greenwich',['Meridiano de Greenwich','El Ecuador','El Trópico de Capricornio']),
      q('¿Qué trópico cruza el norte de Argentina (Salta, Chaco, Formosa)?','Trópico de Capricornio (23,5° Sur)',['Trópico de Capricornio (23,5° Sur)','Trópico de Cáncer','Círculo Polar Ártico']),
      q('¿En qué hemisferios está Argentina?','Sur y Occidental',['Sur y Occidental','Norte y Oriental','Norte y Occidental']),
      q('¿Qué huso horario usa Argentina (UTC)?','UTC -3 (tres horas menos que Greenwich)',['UTC -3 (tres horas menos que Greenwich)','UTC +1','UTC -8']),
      q('¿Qué es la escala de un mapa?','La relación entre la distancia en el mapa y la real',['La relación entre la distancia en el mapa y la real','El título del mapa','El color del mar']),
      q('¿Qué explica los símbolos y colores de un mapa?','La leyenda',['La leyenda','La rosa de los vientos','La escala']),
      q('¿Qué indica la rosa de los vientos?','Los puntos cardinales (N, S, E, O) e intermedios',['Los puntos cardinales (N, S, E, O) e intermedios','La cantidad de habitantes','La profundidad del mar']),
      q('¿Cómo se llaman las líneas imaginarias paralelas al Ecuador?','Paralelos (miden latitud, de 0° a 90°)',['Paralelos (miden latitud, de 0° a 90°)','Meridianos','Ecuador']),
      q('¿Cómo se llaman las líneas que van de polo a polo (miden longitud)?','Meridianos',['Meridianos','Paralelos','Trópicos']),
      q('¿Qué círculo polar está cerca de la Antártida?','Círculo Polar Antártico (66,5° Sur)',['Círculo Polar Antártico (66,5° Sur)','Círculo Polar Ártico','Trópico de Cáncer']),
      q('¿Qué es un planisferio?','Un mapa plano de todo el mundo',['Un mapa plano de todo el mundo','Un globo terráqueo','Una foto satelital'])
    ],

    '🌋 Volcanes, Terremotos y Cinturón de Fuego': [
      q('¿Qué volcán, en la frontera Argentina-Chile, es el más alto del mundo?','Ojos del Salado (6.893 m, Catamarca)',['Ojos del Salado (6.893 m, Catamarca)','Aconcagua','Everest']),
      q('¿Cómo se llama la zona del Pacífico con muchos volcanes y terremotos?','El Cinturón de Fuego del Pacífico',['El Cinturón de Fuego del Pacífico','El Triángulo de las Bermudas','La Fosa de las Marianas']),
      q('¿Por qué hay tantos terremotos y volcanes en Chile y el oeste argentino?','Porque chocan las placas tectónicas (Nazca contra Sudamericana)',['Porque chocan las placas tectónicas (Nazca contra Sudamericana)','Por el viento','Por la luna']),
      q('¿Qué volcán activo está en Neuquén, cerca de Villa Pehuenia?','Volcán Lanín',['Volcán Lanín','Popocatépetl','Vesubio']),
      q('¿Qué instrumento mide la fuerza de los terremotos?','El sismógrafo (escala Richter o magnitud momento)',['El sismógrafo (escala Richter o magnitud momento)','El termómetro','El barómetro']),
      q('¿Qué gran ola puede producir un terremoto en el mar?','Un tsunami (maremoto)',['Un tsunami (maremoto)','Un huracán','Un tornado']),
      q('¿Qué volcán chileno, muy activo, está cerca de Bariloche?','Villarrica',['Villarrica','Everest','Kilimanjaro']),
      q('¿Qué provincia argentina tiene muchos volcanes en la Puna?','Catamarca y Salta (Ojos del Salado, Llullaillaco, Tuzgle)',['Catamarca y Salta (Ojos del Salado, Llullaillaco, Tuzgle)','Buenos Aires','Misiones']),
      q('¿Qué ciudad argentina suele sentir más terremotos por estar cerca de los Andes?','Mendoza (y San Juan)',['Mendoza (y San Juan)','Mar del Plata','Rosario']),
      q('¿Qué tipo de montaña es el Aconcagua? No es volcán, es...','Un pico rocoso (no volcánico) de los Andes',['Un pico rocoso (no volcánico) de los Andes','Un volcán activo','Una meseta'])
    ],

    '🏔️ Accidentes Geográficos del Mundo': [
      q('¿Cuál es la cordillera más larga del mundo (recorre América del Sur)?','Los Andes (~7.000 km)',['Los Andes (~7.000 km)','Los Himalaya','Los Alpes']),
      q('¿Cuál es el río más caudaloso del mundo (y debate del más largo)?','El Amazonas',['El Amazonas','El Nilo','El Misisipi']),
      q('¿Cuál es el desierto cálido más grande del mundo?','El Sahara (África)',['El Sahara (África)','La Antártida','El Gobi']),
      q('¿Cuál es el lago de agua dulce más grande del mundo por superficie?','Lago Superior (EE.UU.-Canadá)',['Lago Superior (EE.UU.-Canadá)','Mar Caspio','Lago Titicaca']),
      q('¿Cuál es el lago más profundo y con más agua dulce del mundo (Siberia)?','Lago Baikal',['Lago Baikal','Lago Superior','Mar Muerto']),
      q('¿Qué lago navegable más alto del mundo está entre Perú y Bolivia?','Lago Titicaca',['Lago Titicaca','Lago Nahuel Huapi','Lago Baikal']),
      q('¿Cuál es la cascada más alta del mundo (Venezuela)?','Salto Ángel (Angel Falls)',['Salto Ángel (Angel Falls)','Cataratas del Iguazú','Cataratas del Niágara']),
      q('¿Cuál es la montaña más alta del mundo (Asia, Himalaya)?','El Everest (8.848 m)',['El Everest (8.848 m)','El Aconcagua','El Kilimanjaro']),
      q('¿Qué gran llanura inundable está entre Brasil, Paraguay y Bolivia?','El Pantanal',['El Pantanal','La Pampa','El Sahara']),
      q('¿Qué selva es la más grande del mundo?','La Amazonía',['La Amazonía','La Selva Misionera','El Congo']),
      q('¿Qué río es el más largo de Europa (Rusia)?','El Volga',['El Volga','El Danubio','El Sena']),
      q('¿Qué país es el más grande del mundo por superficie?','Rusia',['Rusia','Canadá','China'])
    ]

  };

  /* ---- Lecciones narradas extra (merge, no pisa las de lengua) ---- */
  var LECCIONES_GEO = {
    geo_regiones: {
      titulo: 'Las Regiones de Argentina',
      texto: 'Argentina se divide en grandes regiones geográficas. El Noroeste, o NOA, tiene montañas, quebradas coloridas y la Puna, un altiplano frío y salado. El Noreste, o NEA, es cálido y húmedo, con selvas, esteros como Iberá y las Cataratas del Iguazú. La Mesopotamia, entre los ríos Paraná y Uruguay, la forman Entre Ríos, Corrientes y Misiones. Cuyo, con Mendoza, San Juan y San Luis, es tierra de sol, viñedos y el Aconcagua. La región pampeana es la llanura fértil del centro, con Buenos Aires, Córdoba y Santa Fe. La Patagonia, al sur, es de mesetas, viento, glaciares y mar. Y más al sur, Argentina reclama un sector de la Antártida.'
    },
    geo_climas: {
      titulo: 'Los Climas',
      texto: 'El clima depende de la latitud, la altura y la cercanía al mar. Cerca del Ecuador hace calor y llueve mucho: clima ecuatorial, como la Amazonía. Más al norte o al sur, el clima tropical tiene una estación seca y otra lluviosa. En zonas como el desierto de Atacama llueve casi nunca. El clima mediterráneo, como en el centro de Chile o California, tiene verano seco e invierno lluvioso. El clima templado, como la Pampa argentina, tiene estaciones marcadas. En las cumbres y en la Antártida el clima es frío o polar, con hielo. Y en la montaña, cada mil metros de altura la temperatura baja unos seis grados.'
    },
    geo_america: {
      titulo: 'América',
      texto: 'América es un continente muy largo que va desde el Ártico hasta la Antártida. Se divide en América del Norte, con Canadá, Estados Unidos y México; América Central, con siete países pequeños; y América del Sur, con doce países. Argentina está en América del Sur, en el hemisferio sur. La cordillera de los Andes recorre todo el oeste y es la más larga del mundo. El río Amazonas, en Brasil, es el más caudaloso. En América se hablan español, portugués en Brasil, inglés, francés y neerlandés, además de lenguas originarias como el quechua, el aimara y el guaraní.'
    }
  };

  /* ---- Registro en el objeto global EK ---- */
  window.EK = window.EK || {};
  EK.DATOS = EK.DATOS || {};
  EK.DATOS.geografia = GEOGRAFIA;
  EK.LECCIONES = EK.LECCIONES || {};
  for (var k in LECCIONES_GEO) { EK.LECCIONES[k] = LECCIONES_GEO[k]; }

})();
