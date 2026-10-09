/* ============================================================
   geografia.js — Mundo Geografía (foco ARGENTINA, nivel secundario)
   Regiones, relieve, Mesopotamia, provincias y capitales,
   hidrografía, clima y América. Se registra en EK.DATOS.
   ============================================================ */
(function () {
  'use strict';
  var q = function (p, c, opts) { return { pregunta: p, opciones: opts.slice().sort(function(){return Math.random()-0.5;}), correcta: String(c) }; };

  var GEOGRAFIA = {
    '🏔️ Relieve argentino': [
      q('¿Qué región es una extensa llanura cubierta de pastizales?','La Pampa',['La Pampa','Los Andes','La Patagonia']),
      q('¿En qué región están las Sierras de Córdoba?','Sierras Pampeanas',['Sierras Pampeanas','Mesopotamia','Tierra del Fuego']),
      q('¿Qué cordillera separa Argentina de Chile?','Los Andes',['Los Andes','La Costa','El Tandil']),
      q('¿Cómo es el relieve de la Patagonia?','Mesetas y cañadones',['Mesetas y cañadones','Delta y islas','Altas cumbres nevadas']),
      q('¿En qué región está el Aconcagua?','Cuyo / Andes',['Cuyo / Andes','Mesopotamia','Pampa']),
      q('¿Qué región tiene sierras, quebradas y valles?','NOA (Noroeste)',['NOA (Noroeste)','Patagonia','Buenos Aires']),
      q('Verdadero: La Mesopotamia es una llanura entre dos ríos.','Verdadero',['Verdadero','Falso'])
    ],
    '🌊 Mesopotamia': [
      q('¿Qué provincias integran la Mesopotamia?','Entre Ríos, Corrientes y Misiones',['Entre Ríos, Corrientes y Misiones','Mendoza, San Juan y San Luis','Chubut, Santa Cruz y Tierra del Fuego']),
      q('¿Entre qué dos ríos está la Mesopotamia?','Paraná y Uruguay',['Paraná y Uruguay','Bermejo y Pilcomayo','Colorado y Negro']),
      q('¿Qué famosas cataratas están en Misiones?','Cataratas del Iguazú',['Cataratas del Iguazú','Cataratas del Niágara','Cataratas del Victoria']),
      q('¿Qué producto típico se cultiva mucho en Misiones?','Yerba mate',['Yerba mate','Vid','Manzana']),
      q('¿Cómo es el clima de Mesopotamia?','Cálido y húmedo',['Cálido y húmedo','Frío y seco','Nevado todo el año']),
      q('¿Qué selva está en el norte de Misiones?','Selva misionera',['Selva misionera','Selva amazónica','Desierto']),
      q('¿Qué río forma el límite con Uruguay?','Río Uruguay',['Río Uruguay','Río Paraná','Río de la Plata'])
    ],
    '🗺️ Regiones argentinas': [
      q('¿Cuántas regiones geográficas tiene Argentina?','6',['6','4','10']),
      q('¿Qué región es la más grande y fría del sur?','Patagonia',['Patagonia','Pampa','NOA']),
      q('¿Qué región incluye Mendoza, San Juan y San Luis?','Cuyo',['Cuyo','NEA','Patagonia']),
      q('¿Qué región incluye Jujuy, Salta y Tucumán?','NOA (Noroeste)',['NOA (Noroeste)','Cuyo','Pampeana']),
      q('¿Qué región incluye Chaco, Formosa, Corrientes y Misiones?','NEA (Nordeste)',['NEA (Nordeste)','Cuyo','Patagonia']),
      q('¿En qué región está Buenos Aires y La Pampa?','Pampeana',['Pampeana','Patagonia','NOA']),
      q('¿Qué provincia es la más grande de Argentina?','Buenos Aires',['Buenos Aires','Santa Cruz','Córdoba'])
    ],
    '🏛️ Provincias y capitales': [
      q('¿Cuál es la capital de Argentina?','Buenos Aires',['Buenos Aires','Córdoba','Rosario']),
      q('¿Capital de Córdoba?','Córdoba',['Córdoba','Río Cuarto','Villa María']),
      q('¿Capital de Santa Fe?','Santa Fe',['Santa Fe','Rosario','Rafaela']),
      q('¿Capital de Misiones?','Posadas',['Posadas','Iguazú','Oberá']),
      q('¿Capital de Mendoza?','Mendoza',['Mendoza','San Rafael','Godoy Cruz']),
      q('¿Capital de Chubut?','Rawson',['Rawson','Trelew','Comodoro Rivadavia']),
      q('¿Cuántas provincias tiene Argentina?','23',['23','24','20']),
      q('¿Qué ciudad es autónoma (no provincia)?','Ciudad Autónoma de Buenos Aires',['Ciudad Autónoma de Buenos Aires','Mar del Plata','La Plata'])
    ],
    '💧 Hidrografía': [
      q('¿Cuál es el río más importante de Argentina?','Río Paraná',['Río Paraná','Río de la Plata','Río Colorado']),
      q('¿Qué río forma el Río de la Plata al unirse?','Paraná y Uruguay',['Paraná y Uruguay','Bermejo y Pilcomayo','Negro y Colorado']),
      q('¿En qué provincia están las Cataratas del Iguazú?','Misiones',['Misiones','Corrientes','Entre Ríos']),
      q('¿Qué lago/región tiene muchos glaciares?','Santa Cruz / Patagonia',['Santa Cruz / Patagonia','Misiones','Buenos Aires']),
      q('¿Qué río separa Argentina de Paraguay y Brasil al norte?','Paraná',['Paraná','Uruguay','Colorado']),
      q('¿Qué río está al lado de la ciudad de Buenos Aires?','Río de la Plata',['Río de la Plata','Río Paraná','Río Uruguay'])
    ],
    '🌎 América y el mundo': [
      q('¿En qué continente está Argentina?','América del Sur',['América del Sur','América del Norte','Europa']),
      q('¿Qué países limitan con Argentina?','Chile, Bolivia, Paraguay, Brasil, Uruguay',['Chile, Bolivia, Paraguay, Brasil, Uruguay','México, Perú, Colombia','España, Italia, Francia']),
      q('¿Cuál es el país más grande de América del Sur?','Brasil',['Brasil','Argentina','Perú']),
      q('¿Qué océano está al este de Argentina?','Atlántico',['Atlántico','Pacífico','Índico']),
      q('¿Qué océano está al oeste de Chile?','Pacífico',['Pacífico','Atlántico','Ártico']),
      q('¿Cuál es la capital de Brasil?','Brasilia',['Brasilia','Río de Janeiro','São Paulo']),
      q('¿Qué cordillera recorre América del Sur por el oeste?','Los Andes',['Los Andes','Los Alpes','El Himalaya'])
    ],
    '🌤️ Clima y biodiversidad': [
      q('¿Cómo es el clima del norte argentino (NEA)?','Cálido y húmedo',['Cálido y húmedo','Frío y seco','Hielado']),
      q('¿Cómo es el clima de la Patagonia?','Frío, seco y ventoso',['Frío, seco y ventoso','Tropical','Desértico cálido']),
      q('¿Qué animal típico de la Patagonia?','Guuanaco / choique',['Guuanaco / choique','Yaguareté','Mono']),
      q('¿Qué animal vive en el norte (selva)?','Yaguareté',['Yaguareté','Pingüino','Lobo marino']),
      q('¿Qué provincia tiene glaciares como Perito Moreno?','Santa Cruz',['Santa Cruz','Misiones','Buenos Aires']),
      q('¿Qué región es ideal para el vino (vid)?','Cuyo (Mendoza)',['Cuyo (Mendoza)','Tierra del Fuego','Chaco'])
    ]
  };

  window.EK = window.EK || {};
  EK.DATOS = EK.DATOS || {};
  EK.DATOS.geografia = GEOGRAFIA;
})();
