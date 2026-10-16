/* ============================================================
   STORYBOOKS BILINGÜES — VERSIÓN SUPER PREMIUM (30 cuentos) (todo incluido)
   Reemplaza a storybooks-final.js / storybooks.js + reader.
   Subir SOLO este archivo. Incluye CSS premium inyectado.
   Cargar: <script src="storybooks-premium.js"></script>
   Novedades: +20 cuentos nuevos (30 total) · Voz narrador latino (es-MX) · Micrófono con SpeechRecognition (repetir inglés + aprobación) · Sección Super Premium: Abecedario · Verbos · Oraciones · Narración · Confeti · Estrellas · Juego de Sílabas ·
   Formar Palabras · Confeti · Efectos de sonido · Logros ·
   Modo sílabas mejorado · Animaciones premium · Progreso/racha.
   ============================================================ */

/* ============================================================
   1) CATÁLOGO + CUENTOS (ampliado: 10 cuentos, más largos)
   ============================================================ */
var SB_CATALOGO = {"version": 2, "rutaBase": "storybooks/", "categorias": [
  {"id":"animales","nombre":{"es":"Animales","en":"Animals"},"icono":"🐾"},
  {"id":"naturaleza","nombre":{"es":"Naturaleza","en":"Nature"},"icono":"🌿"},
  {"id":"aventura","nombre":{"es":"Aventura","en":"Adventure"},"icono":"🗺️"},
  {"id":"ciencia","nombre":{"es":"Ciencia","en":"Science"},"icono":"🔬"},
  {"id":"amigos","nombre":{"es":"Amistad","en":"Friendship"},"icono":"🤝"},
  {"id":"humor","nombre":{"es":"Humor","en":"Funny"},"icono":"😂"},
  {"id":"mar","nombre":{"es":"Mar","en":"Sea"},"icono":"🐋"}
], "niveles": [
  {"id":"inicial","nombre":{"es":"Inicial 3-5 años","en":"Early 3-5 yo"}},
  {"id":"primario","nombre":{"es":"Primario 6-9 años","en":"Primary 6-9 yo"}}
], "cuentos": []};

var SB_CUENTOS = {};

/* ---------- helper para registrar cuentos ---------- */
function SB_registrar(meta, cuento) {
  SB_CATALOGO.cuentos.push(meta);
  SB_CUENTOS[meta.id] = cuento;
}

/* ============================================================
   CUENTO 1: El Perrito que Quería Jugar (6 pág) — conservado
   ============================================================ */
SB_registrar(
 {id:"el-perrito-que-queria-jugar",archivo:"",titulo:{es:"El Perrito que Quería Jugar",en:"The Puppy Who Wanted to Play"},categoria:"animales",nivel:"inicial",paginas:6,portada:"🐶",color:"#FF9F43",destacado:true},
 {id:"el-perrito-que-queria-jugar",titulo:{es:"El Perrito que Quería Jugar",en:"The Puppy Who Wanted to Play"},categoria:"animales",nivel:"inicial",color:"#FF9F43",portada:"🐶",
  paginas:[
   {ilustracion:"🐶🏡☀️",fondo:"linear-gradient(160deg,#FFE8CC 0%,#FFD43B 100%)",oraciones:[
    {es:"Había una vez un perrito llamado Toby.",en:"Once there was a puppy named Toby."},
    {es:"Vivía en una casa con un gran jardín.",en:"He lived in a house with a big garden."},
    {es:"Toby tenía mucha energía y quería jugar.",en:"Toby had lots of energy and wanted to play."}]},
   {ilustracion:"🐶🐱",fondo:"linear-gradient(160deg,#FFD6A5 0%,#FFADAD 100%)",oraciones:[
    {es:"Toby fue a buscar a su amigo el gato.",en:"Toby went to find his friend the cat."},
    {es:"—¿Querés jugar conmigo?— le preguntó.",en:"\"Do you want to play with me?\" he asked."},
    {es:"El gato dijo que no, que quería dormir.",en:"The cat said no, he wanted to sleep."}]},
   {ilustracion:"🐦🌳",fondo:"linear-gradient(160deg,#CAFFBF 0%,#9BF6FF 100%)",oraciones:[
    {es:"Toby corrió hacia el árbol del jardín.",en:"Toby ran to the tree in the garden."},
    {es:"Allí vio a un pájaro de colores hermosos.",en:"There he saw a bird with beautiful colors."},
    {es:"El pájaro cantaba una canción muy alegre.",en:"The bird sang a very happy song."}]},
   {ilustracion:"🐶🎾",fondo:"linear-gradient(160deg,#A0C4FF 0%,#BDB2FF 100%)",oraciones:[
    {es:"Toby encontró su pelota roja favorita.",en:"Toby found his favorite red ball."},
    {es:"La olfateó y movió la cola con alegría.",en:"He sniffed it and wagged his tail happily."},
    {es:"—¡Jugaré solo!— pensó Toby.",en:"\"I will play alone!\" thought Toby."}]},
   {ilustracion:"🐶🧒🎾",fondo:"linear-gradient(160deg,#FFC6FF 0%,#FFADAD 100%)",oraciones:[
    {es:"De pronto, llegó el niño de la casa.",en:"Suddenly, the boy from the house arrived."},
    {es:"—¡Toby, vení a jugar!— le gritó.",en:"\"Toby, come play!\" he shouted."},
    {es:"Toby corrió muy feliz hacia su amigo.",en:"Toby ran very happily toward his friend."}]},
   {ilustracion:"🧒🐶❤️",fondo:"linear-gradient(160deg,#FDFFB6 0%,#FFD6A5 100%)",oraciones:[
    {es:"Jugaron toda la tarde con la pelota.",en:"They played all afternoon with the ball."},
    {es:"Toby comprendió que compartir es más divertido.",en:"Toby learned that sharing is more fun."},
    {es:"Y desde ese día, siempre jugaron juntos.",en:"And from that day, they always played together."}]}],
  vocabulario:[{es:"perrito",en:"puppy",img:"🐶"},{es:"jugar",en:"to play",img:"🎾"},{es:"gato",en:"cat",img:"🐱"},{es:"pájaro",en:"bird",img:"🐦"},{es:"pelota",en:"ball",img:"⚽"},{es:"jardín",en:"garden",img:"🌳"},{es:"amigo",en:"friend",img:"🧒"},{es:"feliz",en:"happy",img:"😊"}],
  preguntas:[
   {es:"¿Cómo se llamaba el perrito?",en:"What was the puppy's name?",opciones:{es:["Toby","Max","Luna","Rocky"],en:["Toby","Max","Luna","Rocky"]},correcta:0},
   {es:"¿Qué quería hacer el gato cuando Toby lo buscó?",en:"What did the cat want to do when Toby found him?",opciones:{es:["Dormir","Jugar","Comer","Correr"],en:["Sleep","Play","Eat","Run"]},correcta:0},
   {es:"¿De qué color era la pelota de Toby?",en:"What color was Toby's ball?",opciones:{es:["Roja","Azul","Verde","Amarilla"],en:["Red","Blue","Green","Yellow"]},correcta:0},
   {es:"¿Qué aprendió Toby al final del cuento?",en:"What did Toby learn at the end?",opciones:{es:["Compartir es más divertido","Los gatos son malos","Jugar solo es mejor","Las pelotas son aburridas"],en:["Sharing is more fun","Cats are mean","Playing alone is better","Balls are boring"]},correcta:0}]}
);

/* ============================================================
   CUENTO 2: La Luna y el Gatito (6 pág) — conservado
   ============================================================ */
SB_registrar(
 {id:"la-luna-y-el-gatito",archivo:"",titulo:{es:"La Luna y el Gatito",en:"The Moon and the Kitten"},categoria:"naturaleza",nivel:"inicial",paginas:6,portada:"🌙",color:"#6C5CE7",destacado:true},
 {id:"la-luna-y-el-gatito",titulo:{es:"La Luna y el Gatito",en:"The Moon and the Kitten"},categoria:"naturaleza",nivel:"inicial",color:"#6C5CE7",portada:"🌙",
  paginas:[
   {ilustracion:"🐱🏠🌙",fondo:"linear-gradient(160deg,#2D1B69 0%,#6C5CE7 100%)",oraciones:[
    {es:"Era una noche tranquila y estrellada.",en:"It was a quiet, starry night."},
    {es:"Una gatita llamada Mimi miraba por la ventana.",en:"A kitten named Mimi looked out the window."},
    {es:"La luna brillaba grande y redonda en el cielo.",en:"The moon shone big and round in the sky."}]},
   {ilustracion:"🐱⭐",fondo:"linear-gradient(160deg,#1A1A40 0%,#494D8E 100%)",oraciones:[
    {es:"—¿Será la luna un plato de leche?— pensó Mimi.",en:"\"Is the moon a bowl of milk?\" thought Mimi."},
    {es:"Tenía muchísima curiosidad por tocarla.",en:"She was very curious to touch it."},
    {es:"Las estrellas parpadeaban como luciérnagas.",en:"The stars twinkled like fireflies."}]},
   {ilustracion:"🐱🌳",fondo:"linear-gradient(160deg,#2D3561 0%,#5C7CFA 100%)",oraciones:[
    {es:"Mimi salió al jardín y trepó un árbol alto.",en:"Mimi went to the garden and climbed a tall tree."},
    {es:"Quería estar más cerca de la luna brillante.",en:"She wanted to be closer to the bright moon."},
    {es:"Pero la luna seguía muy, muy lejos.",en:"But the moon was still very, very far away."}]},
   {ilustracion:"🦉🐱",fondo:"linear-gradient(160deg,#3E2C6B 0%,#845EC2 100%)",oraciones:[
    {es:"Un búho sabio la vio desde su rama.",en:"A wise owl saw her from his branch."},
    {es:"—La luna está lejos, pequeña gatita— le dijo.",en:"\"The moon is far away, little kitten,\" he told her."},
    {es:"—Pero su luz siempre te acompañará—.",en:"\"But its light will always be with you.\""}]},
   {ilustracion:"🐱💧🌙",fondo:"linear-gradient(160deg,#1F3A5F 0%,#45B7D1 100%)",oraciones:[
    {es:"Mimi bajó del árbol y encontró un charquito.",en:"Mimi climbed down and found a small puddle."},
    {es:"¡La luna se reflejaba en el agua clara!",en:"The moon was reflected in the clear water!"},
    {es:"Tocó el agua y la luna se rió en ondas.",en:"She touched the water and the moon laughed in ripples."}]},
   {ilustracion:"🐱😴🌙",fondo:"linear-gradient(160deg,#2D1B69 0%,#FF8FA3 100%)",oraciones:[
    {es:"Mimi volvió a casa contenta y cansada.",en:"Mimi returned home happy and tired."},
    {es:"Soñó que volaba entre las estrellas con la luna.",en:"She dreamed she flew among the stars with the moon."},
    {es:"Y la luna la cuidó durante toda la noche.",en:"And the moon watched over her all night long."}]}],
  vocabulario:[{es:"luna",en:"moon",img:"🌙"},{es:"gatito",en:"kitten",img:"🐱"},{es:"estrellas",en:"stars",img:"⭐"},{es:"noche",en:"night",img:"🌃"},{es:"búho",en:"owl",img:"🦉"},{es:"árbol",en:"tree",img:"🌳"},{es:"charco",en:"puddle",img:"💧"},{es:"brillar",en:"to shine",img:"✨"}],
  preguntas:[
   {es:"¿Cómo se llamaba la gatita?",en:"What was the kitten's name?",opciones:{es:["Mimi","Luna","Nube","Sol"],en:["Mimi","Luna","Nube","Sol"]},correcta:0},
   {es:"¿Qué pensó Mimi que era la luna?",en:"What did Mimi think the moon was?",opciones:{es:["Un plato de leche","Un queso","Una pelota","Un ojo"],en:["A bowl of milk","A cheese","A ball","An eye"]},correcta:0},
   {es:"¿Quién le habló a Mimi en el árbol?",en:"Who spoke to Mimi in the tree?",opciones:{es:["Un búho","Un pájaro","Un perro","Una mariposa"],en:["An owl","A bird","A dog","A butterfly"]},correcta:0},
   {es:"¿Dónde vio Mimi la luna reflejada?",en:"Where did Mimi see the moon reflected?",opciones:{es:["En un charco de agua","En un espejo","En la ventana","En el río"],en:["In a puddle of water","In a mirror","In the window","In the river"]},correcta:0}]}
);

/* ============================================================
   CUENTO 3: El Dinosaurio Curioso (7 pág) — conservado
   ============================================================ */
SB_registrar(
 {id:"el-dinosaurio-curioso",archivo:"",titulo:{es:"El Dinosaurio Curioso",en:"The Curious Dinosaur"},categoria:"ciencia",nivel:"primario",paginas:7,portada:"🦕",color:"#00B894",destacado:true},
 {id:"el-dinosaurio-curioso",titulo:{es:"El Dinosaurio Curioso",en:"The Curious Dinosaur"},categoria:"ciencia",nivel:"primario",color:"#00B894",portada:"🦕",
  paginas:[
   {ilustracion:"🦕🌋🌿",fondo:"linear-gradient(160deg,#00B894 0%,#FFE066 100%)",oraciones:[
    {es:"Hace millones de años, vivía un dinosaurio llamado Dino.",en:"Millions of years ago, a dinosaur named Dino lived."},
    {es:"Era un braquiosaurio de cuello largo y ojos curiosos.",en:"He was a brachiosaurus with a long neck and curious eyes."},
    {es:"Siempre se preguntaba qué había más allá de las montañas.",en:"He always wondered what lay beyond the mountains."}]},
   {ilustracion:"🦕🌿🦖",fondo:"linear-gradient(160deg,#94D82D 0%,#20C997 100%)",oraciones:[
    {es:"Un día, Dino decidió emprender un gran viaje.",en:"One day, Dino decided to go on a great journey."},
    {es:"Sus amigos le advirtieron que había peligros afuera.",en:"His friends warned him there were dangers outside."},
    {es:"Pero Dino quería descubrir el mundo por sí mismo.",en:"But Dino wanted to discover the world for himself."}]},
   {ilustracion:"🌋🔥",fondo:"linear-gradient(160deg,#FA5252 0%,#FF922B 100%)",oraciones:[
    {es:"Caminó hasta llegar a un volcán que echaba humo.",en:"He walked until he reached a volcano that smoked."},
    {es:"Aprendió que la tierra a veces se calienta mucho.",en:"He learned that the earth sometimes gets very hot."},
    {es:"Dino observó desde lejos, sin acercarse demasiado.",en:"Dino watched from afar, without getting too close."}]},
   {ilustracion:"🌊🐟🦕",fondo:"linear-gradient(160deg,#4D96FF 0%,#9BF6FF 100%)",oraciones:[
    {es:"Llegó a un mar enorme y de un azul profundo.",en:"He reached an enormous sea of deep blue."},
    {es:"Vio peces de todos los colores y formas nadar.",en:"He saw fish of every color and shape swimming."},
    {es:"—¡Cuántas cosas nuevas!— pensó Dino asombrado.",en:"\"So many new things!\" thought Dino, amazed."}]},
   {ilustracion:"❄️🏔️🦕",fondo:"linear-gradient(160deg,#74C0FC 0%,#E7F5FF 100%)",oraciones:[
    {es:"Después subió a montañas cubiertas de nieve.",en:"Then he climbed mountains covered in snow."},
    {es:"Hacía mucho frío, pero Dino estaba muy emocionado.",en:"It was very cold, but Dino was very excited."},
    {es:"Desde arriba vio todo el mundo a sus pies.",en:"From the top he saw the whole world at his feet."}]},
   {ilustracion:"🦕🌠",fondo:"linear-gradient(160deg,#2D1B69 0%,#845EC2 100%)",oraciones:[
    {es:"En el camino de regreso, vio estrellas fugaces cruzar el cielo.",en:"On the way back, he saw shooting stars cross the sky."},
    {es:"Dino comprendió que el mundo era enorme y maravilloso.",en:"Dino understood the world was enormous and wonderful."},
    {es:"Y que siempre habría algo nuevo por descubrir.",en:"And that there would always be something new to discover."}]},
   {ilustracion:"🦕🦕🦕❤️",fondo:"linear-gradient(160deg,#00B894 0%,#FFE066 100%)",oraciones:[
    {es:"Cuando volvió, les contó todas sus aventuras a sus amigos.",en:"When he returned, he told all his adventures to his friends."},
    {es:"Los dinosaurios escucharon asombrados sus historias.",en:"The dinosaurs listened amazed to his stories."},
    {es:"Desde entonces, Dino enseñó que la curiosidad nos hace crecer.",en:"Since then, Dino taught that curiosity makes us grow."}]}],
  vocabulario:[{es:"dinosaurio",en:"dinosaur",img:"🦕"},{es:"curioso",en:"curious",img:"🤔"},{es:"volcán",en:"volcano",img:"🌋"},{es:"mar",en:"sea",img:"🌊"},{es:"montaña",en:"mountain",img:"🏔️"},{es:"nieve",en:"snow",img:"❄️"},{es:"descubrir",en:"to discover",img:"🔍"},{es:"viaje",en:"journey",img:"🧭"},{es:"estrella",en:"star",img:"⭐"},{es:"aventura",en:"adventure",img:"🗺️"}],
  preguntas:[
   {es:"¿Qué tipo de dinosaurio era Dino?",en:"What kind of dinosaur was Dino?",opciones:{es:["Braquiosaurio","Tiranosaurio","Triceratops","Pterodáctilo"],en:["Brachiosaurus","Tyrannosaurus","Triceratops","Pterodactyl"]},correcta:0},
   {es:"¿Qué vio Dino echar humo durante su viaje?",en:"What did Dino see smoking during his journey?",opciones:{es:["Un volcán","Una fogata","Un barco","Una nube"],en:["A volcano","A campfire","A boat","A cloud"]},correcta:0},
   {es:"¿Qué había en la cima de las montañas?",en:"What was on top of the mountains?",opciones:{es:["Nieve","Arena","Flores","Agua"],en:["Snow","Sand","Flowers","Water"]},correcta:0},
   {es:"¿Qué enseñó Dino a sus amigos al volver?",en:"What did Dino teach his friends when he returned?",opciones:{es:["Que la curiosidad nos hace crecer","Que no hay que viajar","Que los volcanes son seguros","Que el mar es pequeño"],en:["That curiosity makes us grow","That one should not travel","That volcanoes are safe","That the sea is small"]},correcta:0},
   {es:"¿Qué vio cruzar el cielo de regreso?",en:"What did he see cross the sky on the way back?",opciones:{es:["Estrellas fugaces","Pájaros","Aviones","Nubes grises"],en:["Shooting stars","Birds","Airplanes","Gray clouds"]},correcta:0}]}
);

/* ============================================================
   CUENTO 4: La Semilla Valiente (5 pág) — conservado
   ============================================================ */
SB_registrar(
 {id:"la-semilla-valiente",archivo:"",titulo:{es:"La Semilla Valiente",en:"The Brave Seed"},categoria:"naturaleza",nivel:"inicial",paginas:5,portada:"🌱",color:"#6BCB77",destacado:true},
 {id:"la-semilla-valiente",titulo:{es:"La Semilla Valiente",en:"The Brave Seed"},categoria:"naturaleza",nivel:"inicial",color:"#6BCB77",portada:"🌱",
  paginas:[
   {ilustracion:"🌰🌰🌰",fondo:"linear-gradient(160deg,#D8F3DC,#95D5B2)",oraciones:[
    {es:"Había una vez una semilla muy pequeña.",en:"Once there was a very tiny seed."},
    {es:"Todas las semillas querían crecer en el jardín.",en:"All the seeds wanted to grow in the garden."},
    {es:"Pero la semillita tenía miedo de la tierra oscura.",en:"But the little seed was afraid of the dark earth."}]},
   {ilustracion:"🌱💧☀️",fondo:"linear-gradient(160deg,#B7E4C7,#74C69D)",oraciones:[
    {es:"Un día, la lluvia la llamó suavemente.",en:"One day, the rain called softly to her."},
    {es:"—Salí, pequeña semilla, el sol te espera—.",en:"\"Come out, little seed, the sun is waiting.\""},
    {es:"La semilla respiró hondo y se animó.",en:"The seed took a deep breath and dared."}]},
   {ilustracion:"🌿🐛",fondo:"linear-gradient(160deg,#95D5B2,#52B788)",oraciones:[
    {es:"Empujó la tierra con todas sus fuerzas.",en:"She pushed the earth with all her strength."},
    {es:"Un gusano la ayudó a abrirse camino.",en:"A worm helped her make her way."},
    {es:"Poco a poco, un brotecito verde asomó.",en:"Little by little, a green sprout peeked out."}]},
   {ilustracion:"🌻🦋☀️",fondo:"linear-gradient(160deg,#FFE066,#FFD43B)",oraciones:[
    {es:"El sol la acarició y creció muy deprisa.",en:"The sun caressed her and she grew fast."},
    {es:"Se convirtió en un girasol altísimo y dorado.",en:"She became a tall, golden sunflower."},
    {es:"Las mariposas venían a visitarla todas las mañanas.",en:"Butterflies came to visit her every morning."}]},
   {ilustracion:"🌻🌻🌻❤️",fondo:"linear-gradient(160deg,#FFD43B,#FF9F43)",oraciones:[
    {es:"La semilla comprendió que el miedo era normal.",en:"The seed understood that fear is normal."},
    {es:"Que hay que atreverse para crecer y ser feliz.",en:"That you must dare to grow and be happy."},
    {es:"Y ahora sus propias semillas vuelan al viento.",en:"And now her own seeds fly in the wind."}]}],
  vocabulario:[{es:"semilla",en:"seed",img:"🌰"},{es:"crecer",en:"to grow",img:"🌱"},{es:"tierra",en:"earth",img:"🪴"},{es:"sol",en:"sun",img:"☀️"},{es:"girasol",en:"sunflower",img:"🌻"},{es:"valiente",en:"brave",img:"💪"}],
  preguntas:[
   {es:"¿De qué tenía miedo la semilla?",en:"What was the seed afraid of?",opciones:{es:["La tierra oscura","El sol","La lluvia","Las mariposas"],en:["The dark earth","The sun","The rain","Butterflies"]},correcta:0},
   {es:"¿Quién ayudó a la semilla?",en:"Who helped the seed?",opciones:{es:["Un gusano","Un pájaro","Una mariposa","El viento"],en:["A worm","A bird","A butterfly","The wind"]},correcta:0},
   {es:"¿En qué se convirtió?",en:"What did she become?",opciones:{es:["Un girasol","Un árbol","Una rosa","Un cactus"],en:["A sunflower","A tree","A rose","A cactus"]},correcta:0}]}
);

/* ============================================================
   CUENTO 5: El Cohete que Quería Volar (5 pág) — conservado
   ============================================================ */
SB_registrar(
 {id:"el-cohete-que-queria-volar",archivo:"",titulo:{es:"El Cohete que Quería Volar",en:"The Rocket Who Wanted to Fly"},categoria:"ciencia",nivel:"primario",paginas:5,portada:"🚀",color:"#4D96FF",destacado:true},
 {id:"el-cohete-que-queria-volar",titulo:{es:"El Cohete que Quería Volar",en:"The Rocket Who Wanted to Fly"},categoria:"ciencia",nivel:"primario",color:"#4D96FF",portada:"🚀",
  paginas:[
   {ilustracion:"🚀🏭⭐",fondo:"linear-gradient(160deg,#A0C4FF,#BDB2FF)",oraciones:[
    {es:"En un taller vivía un cohete pequeño llamado Rocco.",en:"In a workshop lived a small rocket named Rocco."},
    {es:"Soñaba con volar muy alto, entre las estrellas.",en:"He dreamed of flying high, among the stars."},
    {es:"Pero los cohetes grandes decían que era muy chico.",en:"But the big rockets said he was too small."}]},
   {ilustracion:"🔧👨‍🚀",fondo:"linear-gradient(160deg,#FFD6A5,#FFB4A2)",oraciones:[
    {es:"Un ingeniero lo revisó pieza por pieza.",en:"An engineer checked him piece by piece."},
    {es:"—Tienes un corazón grande, Rocco— le dijo.",en:"\"You have a big heart, Rocco,\" he told him."},
    {es:"Le puso un motor nuevo y una ventana redonda.",en:"He put a new engine and a round window on him."}]},
   {ilustracion:"🚀🔥☁️",fondo:"linear-gradient(160deg,#FFADAD,#FF6B6B)",oraciones:[
    {es:"Llegó el día del gran lanzamiento.",en:"The day of the big launch arrived."},
    {es:"Rocco encendió sus motores con valentía.",en:"Rocco fired his engines bravely."},
    {es:"Subió más rápido que ningún otro cohete.",en:"He climbed faster than any other rocket."}]},
   {ilustracion:"🌍🚀🌙",fondo:"linear-gradient(160deg,#2D1B69,#4D96FF)",oraciones:[
    {es:"Vio la Tierra desde arriba, azul y hermosa.",en:"He saw the Earth from above, blue and beautiful."},
    {es:"Tocó la luna con la punta de su nariz.",en:"He touched the moon with the tip of his nose."},
    {es:"Las estrellas le dieron la bienvenida riendo.",en:"The stars welcomed him with laughter."}]},
   {ilustracion:"🚀⭐❤️",fondo:"linear-gradient(160deg,#4D96FF,#6C5CE7)",oraciones:[
    {es:"Rocco comprendió que el tamaño no importa.",en:"Rocco understood that size doesn't matter."},
    {es:"Lo que importa es querer volar muy alto.",en:"What matters is wanting to fly high."},
    {es:"Ahora él ayuda a otros cohetes chicos a creer.",en:"Now he helps other small rockets believe."}]}],
  vocabulario:[{es:"cohete",en:"rocket",img:"🚀"},{es:"volar",en:"to fly",img:"✈️"},{es:"estrella",en:"star",img:"⭐"},{es:"ingeniero",en:"engineer",img:"👨‍🔧"},{es:"luna",en:"moon",img:"🌙"},{es:"valiente",en:"brave",img:"💪"}],
  preguntas:[
   {es:"¿Cómo se llamaba el cohete?",en:"What was the rocket's name?",opciones:{es:["Rocco","Luna","Tito","Nube"],en:["Rocco","Luna","Tito","Nube"]},correcta:0},
   {es:"¿Qué le puso el ingeniero?",en:"What did the engineer put on him?",opciones:{es:["Un motor nuevo","Un sombrero","Unas alas","Un espejo"],en:["A new engine","A hat","Wings","A mirror"]},correcta:0},
   {es:"¿Qué comprendió al final?",en:"What did he understand at the end?",opciones:{es:["Que el tamaño no importa","Que los grandes son mejores","Que no debe volar","Que la luna es fría"],en:["That size doesn't matter","That big ones are better","That he should not fly","That the moon is cold"]},correcta:0}]}
);

/* ============================================================
   CUENTO 6: La Ballena y el Farolito (5 pág) — conservado
   ============================================================ */
SB_registrar(
 {id:"la-ballena-y-el-farolito",archivo:"",titulo:{es:"La Ballena y el Farolito",en:"The Whale and the Little Lantern"},categoria:"mar",nivel:"primario",paginas:5,portada:"🐋",color:"#45B7D1",destacado:true},
 {id:"la-ballena-y-el-farolito",titulo:{es:"La Ballena y el Farolito",en:"The Whale and the Little Lantern"},categoria:"mar",nivel:"primario",color:"#45B7D1",portada:"🐋",
  paginas:[
   {ilustracion:"🐋🌊🌑",fondo:"linear-gradient(160deg,#023E8A,#0077B6)",oraciones:[
    {es:"En el fondo del mar vivía una ballena azul.",en:"At the bottom of the sea lived a blue whale."},
    {es:"Era tan grande que todos le tenían miedo.",en:"She was so big that everyone was afraid of her."},
    {es:"Pero ella era muy sola y quería un amigo.",en:"But she was very lonely and wanted a friend."}]},
   {ilustracion:"🏮🐠✨",fondo:"linear-gradient(160deg,#0077B6,#00B4D8)",oraciones:[
    {es:"Una noche encontró un farolito encendido.",en:"One night she found a little lantern lit."},
    {es:"Flotaba suavemente entre los peces de colores.",en:"It floated softly among the colorful fish."},
    {es:"—¿Quién eres?— preguntó la ballena.",en:"\"Who are you?\" asked the whale."}]},
   {ilustracion:"🐋🏮❤️",fondo:"linear-gradient(160deg,#00B4D8,#90E0EF)",oraciones:[
    {es:"—Soy la luz que guía a los perdidos— respondió.",en:"\"I am the light that guides the lost,\" it answered."},
    {es:"La ballena lo llevó pegado a su frente.",en:"The whale carried it on her forehead."},
    {es:"Juntos nadaron por el mar oscuro y profundo.",en:"Together they swam the dark, deep sea."}]},
   {ilustracion:"🐋🏮🐙🦀",fondo:"linear-gradient(160deg,#90E0EF,#CAF0F8)",oraciones:[
    {es:"Ayudaron a un pulpo a encontrar su cueva.",en:"They helped an octopus find his cave."},
    {es:"Guiaron a unos cangrejos de regreso a casa.",en:"They guided some crabs back home."},
    {es:"Todos los animales querían ser sus amigos.",en:"All the animals wanted to be their friends."}]},
   {ilustracion:"🐋🏮⭐🌊",fondo:"linear-gradient(160deg,#48CAE4,#0096C7)",oraciones:[
    {es:"La ballena comprendió que no hay que tener miedo.",en:"The whale understood that one must not be afraid."},
    {es:"Que la amabilidad es la luz más brillante.",en:"That kindness is the brightest light."},
    {es:"Y desde entonces, el farolito nunca se apagó.",en:"And since then, the little lantern never went out."}]}],
  vocabulario:[{es:"ballena",en:"whale",img:"🐋"},{es:"mar",en:"sea",img:"🌊"},{es:"luz",en:"light",img:"💡"},{es:"amigo",en:"friend",img:"🤝"},{es:"pez",en:"fish",img:"🐠"},{es:"nadar",en:"to swim",img:"🏊"}],
  preguntas:[
   {es:"¿Por qué tenían miedo de la ballena?",en:"Why were they afraid of the whale?",opciones:{es:["Era muy grande","Era mala","Era rápida","Era oscura"],en:["She was very big","She was mean","She was fast","She was dark"]},correcta:0},
   {es:"¿Qué encontró la ballena?",en:"What did the whale find?",opciones:{es:["Un farolito encendido","Un tesoro","Un barco","Una isla"],en:["A lit little lantern","A treasure","A ship","An island"]},correcta:0},
   {es:"¿Qué comprendió?",en:"What did she understand?",opciones:{es:["Que la amabilidad es la luz más brillante","Que los peces son tontos","Que el mar es frío","Que debe estar sola"],en:["That kindness is the brightest light","That fish are silly","That the sea is cold","That she should be alone"]},correcta:0}]}
);

/* ============================================================
   CUENTO 7 (NUEVO, LARGO Y DIVERTIDO): El Dragón que Tenía Miedo al Fuego — 8 pág
   ============================================================ */
SB_registrar(
 {id:"el-dragon-miedo-al-fuego",archivo:"",titulo:{es:"El Dragón que Tenía Miedo al Fuego",en:"The Dragon Who Was Afraid of Fire"},categoria:"humor",nivel:"primario",paginas:8,portada:"🐲",color:"#FF6B6B",destacado:true},
 {id:"el-dragon-miedo-al-fuego",titulo:{es:"El Dragón que Tenía Miedo al Fuego",en:"The Dragon Who Was Afraid of Fire"},categoria:"humor",nivel:"primario",color:"#FF6B6B",portada:"🐲",
  paginas:[
   {ilustracion:"🐲🏔️🔥",fondo:"linear-gradient(160deg,#FF6B6B,#FFD93D)",oraciones:[
    {es:"En una montaña vivía un dragón llamado Fogoncio.",en:"On a mountain lived a dragon named Blaze."},
    {es:"Era rojo, escamoso y tenía unos dientes enormes.",en:"He was red, scaly, and had enormous teeth."},
    {es:"Pero tenía un secreto: ¡le tenía pánico al fuego!",en:"But he had a secret: he was terrified of fire!"}]},
   {ilustracion:"🐲😱🕯️",fondo:"linear-gradient(160deg,#FF8E72,#FFB4A2)",oraciones:[
    {es:"Cuando soplaba, salía una llamita chiquita.",en:"When he blew, a tiny little flame came out."},
    {es:"Y él salía corriendo gritando: —¡Ay, que me quemo!—.",en:"And he ran away screaming: \"Ouch, I'm burning!\""},
    {es:"Los otros dragones se reían muchísimo de él.",en:"The other dragons laughed a lot at him."}]},
   {ilustracion:"🐲🐉😂",fondo:"linear-gradient(160deg,#E07A5F,#F2CC8F)",oraciones:[
    {es:"—¡Un dragón con miedo al fuego no es dragón!— decían.",en:"\"A dragon afraid of fire is no dragon!\" they said."},
    {es:"Fogoncio se escondió en una cueva muy triste.",en:"Blaze hid in a cave, very sad."},
    {es:"Pensaba que nunca sería un dragón de verdad.",en:"He thought he would never be a real dragon."}]},
   {ilustracion:"🧒🔥🏠",fondo:"linear-gradient(160deg,#FF9F43,#FF6B6B)",oraciones:[
    {es:"Un día, escuchó unos gritos de auxilio desde el pueblo.",en:"One day, he heard cries for help from the village."},
    {es:"¡La panadería del pueblo se estaba incendiando!",en:"The village bakery was on fire!"},
    {es:"El panadero y su familia estaban atrapados arriba.",en:"The baker and his family were trapped upstairs."}]},
   {ilustracion:"🐲💨🚒",fondo:"linear-gradient(160deg,#4D96FF,#90E0EF)",oraciones:[
    {es:"Los bomberos no podían llegar por las escaleras.",en:"The firefighters couldn't reach up the stairs."},
    {es:"Fogoncio pensó: —¡Yo puedo volar hasta el techo!—.",en:"Blaze thought: \"I can fly up to the roof!\""},
    {es:"Voló muy rápido, a pesar de su miedo al fuego.",en:"He flew very fast, despite his fear of fire."}]},
   {ilustracion:"🐲🧒👨‍🍳❤️",fondo:"linear-gradient(160deg,#00B894,#9BF6FF)",oraciones:[
    {es:"Rescató al panadero, a su esposa y a sus tres hijos.",en:"He rescued the baker, his wife, and their three kids."},
    {es:"Los llevó a todos sanos y salvos al suelo.",en:"He carried them all safely to the ground."},
    {es:"¡Todo el pueblo aplaudió y vitoreó a Fogoncio!",en:"The whole village cheered and applauded Blaze!"}]},
   {ilustracion:"🐲🍞🎁",fondo:"linear-gradient(160deg,#FFD43B,#FF9F43)",oraciones:[
    {es:"El panadero le regaló una torre de pan dulce.",en:"The baker gave him a tower of sweet bread."},
    {es:"—¡Gracias, héroe!— dijo el pueblo entero.",en:"\"Thank you, hero!\" said the whole village."},
    {es:"Fogoncio comprendió que ser valiente no es no tener miedo.",en:"Blaze understood that being brave isn't having no fear."}]},
   {ilustracion:"🐲🐉❤️🎉",fondo:"linear-gradient(160deg,#FF6B6B,#FFD93D)",oraciones:[
    {es:"Es hacer lo correcto aunque tengas miedo.",en:"It's doing the right thing even when you're afraid."},
    {es:"Los otros dragones dejaron de reírse y lo admiraron.",en:"The other dragons stopped laughing and admired him."},
    {es:"Y desde entonces, Fogoncio fue el dragón más querido.",en:"And ever since, Blaze was the most beloved dragon."}]}],
  vocabulario:[{es:"dragón",en:"dragon",img:"🐲"},{es:"fuego",en:"fire",img:"🔥"},{es:"miedo",en:"fear",img:"😱"},{es:"valiente",en:"brave",img:"💪"},{es:"volar",en:"to fly",img:"🪽"},{es:"pueblo",en:"village",img:"🏘️"},{es:"héroe",en:"hero",img:"🦸"},{es:"panadero",en:"baker",img:"👨‍🍳"}],
  preguntas:[
   {es:"¿Cómo se llamaba el dragón?",en:"What was the dragon's name?",opciones:{es:["Fogoncio","LLamas","Draco","Fuego"],en:["Blaze","Flame","Draco","Fire"],},correcta:0},
   {es:"¿De qué tenía miedo el dragón?",en:"What was the dragon afraid of?",opciones:{es:["Del fuego","Del agua","De los niños","De las montañas"],en:["Fire","Water","Children","Mountains"]},correcta:0},
   {es:"¿Qué lugar se incendió en el pueblo?",en:"What place caught fire in the village?",opciones:{es:["La panadería","La escuela","La iglesia","El mercado"],en:["The bakery","The school","The church","The market"]},correcta:0},
   {es:"¿Qué comprendió Fogoncio al final?",en:"What did Blaze understand at the end?",opciones:{es:["Ser valiente es hacer lo correcto con miedo","El fuego no existe","Los dragones no ayudan","Mejor esconderse siempre"],en:["Being brave is doing right despite fear","Fire doesn't exist","Dragons don't help","Always hide"]},correcta:0}]}
);

/* ============================================================
   CUENTO 8 (NUEVO, LARGO Y DIVERTIDO): El Pirata que No le Gustaba el Mar — 8 pág
   ============================================================ */
SB_registrar(
 {id:"el-pirata-no-le-gustaba-el-mar",archivo:"",titulo:{es:"El Pirata que No le Gustaba el Mar",en:"The Pirate Who Didn't Like the Sea"},categoria:"humor",nivel:"primario",paginas:8,portada:"🏴‍☠️",color:"#3D5A80",destacado:true},
 {id:"el-pirata-no-le-gustaba-el-mar",titulo:{es:"El Pirata que No le Gustaba el Mar",en:"The Pirate Who Didn't Like the Sea"},categoria:"humor",nivel:"primario",color:"#3D5A80",portada:"🏴‍☠️",
  paginas:[
   {ilustracion:"🏴‍☠️🚢🌊",fondo:"linear-gradient(160deg,#3D5A80,#98C1D9)",oraciones:[
    {es:"Había una vez un pirata llamado Patricio Parche.",en:"Once there was a pirate named Patrick Patch."},
    {es:"Tenía barba larga, loro verde y un sombrero enorme.",en:"He had a long beard, green parrot, and huge hat."},
    {es:"Pero había un problema: ¡odiaba el mar!",en:"But there was a problem: he hated the sea!"}]},
   {ilustracion:"🏴‍☠️🤢🌊",fondo:"linear-gradient(160deg,#293241,#EE6C4D)",oraciones:[
    {es:"Se mareaba con solo mirar una ola pequeña.",en:"He got seasick just looking at a small wave."},
    {es:"El agua salada le parecía asquerosa.",en:"Salt water seemed disgusting to him."},
    {es:"Y los peces le daban mucho, mucho asco.",en:"And fish grossed him out a lot, a lot."}]},
   {ilustracion:"🏴‍☠️🏠🧁",fondo:"linear-gradient(160deg,#E0FBFC,#98C1D9)",oraciones:[
    {es:"Lo que realmente amaba era hornear muffins.",en:"What he really loved was baking muffins."},
    {es:"En su cocina hacía muffins de arándano y chocolate.",en:"In his kitchen he made blueberry and chocolate muffins."},
    {es:"—¡Prefiero un horno a un barco!— decía siempre.",en:"\"I'd rather have an oven than a ship!\" he always said."}]},
   {ilustracion:"🦜🗺️🏴‍☠️",fondo:"linear-gradient(160deg,#EE6C4D,#F4A261)",oraciones:[
    {es:"Un día, su loro encontró un mapa del tesoro.",en:"One day, his parrot found a treasure map."},
    {es:"—¡Tienes que navegar hasta la Isla del Cacao!— graznó.",en:"\"You must sail to Cocoa Island!\" squawked."},
    {es:"Patricio suspiró y preparó su barco con pena.",en:"Patrick sighed and sadly prepared his ship."}]},
   {ilustracion:"🚢🌊🤢",fondo:"linear-gradient(160deg,#457B9D,#A8DADC)",oraciones:[
    {es:"En el mar, Patricio se mareó muchísimo.",en:"At sea, Patrick got very, very seasick."},
    {es:"—¡Nunca más vuelvo a navegar!— gritó verde.",en:"\"I'll never sail again!\" he screamed, green."},
    {es:"Pero el loro le daba ánimos con sus galletas.",en:"But the parrot encouraged him with crackers."}]},
   {ilustracion:"🏝️🍫🗝️",fondo:"linear-gradient(160deg,#F4A261,#E9C46A)",oraciones:[
    {es:"Llegaron a la Isla del Cacao, todo chocolate.",en:"They reached Cocoa Island, all made of chocolate."},
    {es:"El tesoro era una fábrica de muffins gigante.",en:"The treasure was a giant muffin factory."},
    {es:"¡Patricio no podía creer su suerte!",en:"Patrick couldn't believe his luck!"}]},
   {ilustracion:"🏴‍☠️🧁👨‍🍳",fondo:"linear-gradient(160deg,#FFD6A5,#FFADAD)",oraciones:[
    {es:"Se quedó allí horneando muffins para todos los piratas.",en:"He stayed there baking muffins for all the pirates."},
    {es:"Nadie se atrevía a robar porque él era el jefe.",en:"Nobody dared steal because he was the boss."},
    {es:"Su barco lo usaba solo para entregar pedidos.",en:"He used his ship only to deliver orders."}]},
   {ilustracion:"🏴‍☠️🧁❤️🎉",fondo:"linear-gradient(160deg,#3D5A80,#EE6C4D)",oraciones:[
    {es:"Patricio comprendió que cada uno tiene su tesoro.",en:"Patrick understood everyone has their own treasure."},
    {es:"El suyo no era el oro, sino los muffins calentitos.",en:"His wasn't gold, but warm muffins."},
    {es:"Y fue el pirata más feliz de todos los mares.",en:"And he was the happiest pirate of all the seas."}]}],
  vocabulario:[{es:"pirata",en:"pirate",img:"🏴‍☠️"},{es:"mar",en:"sea",img:"🌊"},{es:"barco",en:"ship",img:"🚢"},{es:"tesoro",en:"treasure",img:"💰"},{es:"mapa",en:"map",img:"🗺️"},{es:"muffin",en:"muffin",img:"🧁"},{es:"loro",en:"parrot",img:"🦜"},{es:"isla",en:"island",img:"🏝️"}],
  preguntas:[
   {es:"¿Cómo se llamaba el pirata?",en:"What was the pirate's name?",opciones:{es:["Patricio Parche","Jack Barbosa","Negro Barbón","Capitán Garfio"],en:["Patrick Patch","Jack Barbosa","Blackbeard","Captain Hook"],},correcta:0},
   {es:"¿Qué odiaba el pirata?",en:"What did the pirate hate?",opciones:{es:["El mar","El oro","Los mapas","Los loros"],en:["The sea","Gold","Maps","Parrots"]},correcta:0},
   {es:"¿Qué amaba hacer realmente?",en:"What did he really love to do?",opciones:{es:["Hornear muffins","Pelear espadas","Navegar","Cavar"],en:["Bake muffins","Sword fight","Sail","Dig"]},correcta:0},
   {es:"¿Qué era el tesoro de la Isla del Cacao?",en:"What was the treasure on Cocoa Island?",opciones:{es:["Una fábrica de muffins","Oro y joyas","Un barco nuevo","Un loro gigante"],en:["A muffin factory","Gold and jewels","A new ship","A giant parrot"],},correcta:0}]}
);

/* ============================================================
   CUENTO 9 (NUEVO): La Pulga que Quería ser Gigante — 7 pág
   ============================================================ */
SB_registrar(
 {id:"la-pulga-queria-ser-gigante",archivo:"",titulo:{es:"La Pulga que Quería ser Gigante",en:"The Flea Who Wanted to Be Giant"},categoria:"humor",nivel:"inicial",paginas:7,portada:"🦟",color:"#A66CFF",destacado:false},
 {id:"la-pulga-queria-ser-gigante",titulo:{es:"La Pulga que Quería ser Gigante",en:"The Flea Who Wanted to Be Giant"},categoria:"humor",nivel:"inicial",color:"#A66CFF",portada:"🦟",
  paginas:[
   {ilustracion:"🦟🐕",fondo:"linear-gradient(160deg,#A66CFF,#D4B5FF)",oraciones:[
    {es:"En un perro vivía una pulga llamada Saltarina.",en:"On a dog lived a flea named Jumpy."},
    {es:"Era tan chiquita que nadie la veía nunca.",en:"She was so tiny nobody ever saw her."},
    {es:"Ella soñaba con ser gigante, como un elefante.",en:"She dreamed of being giant, like an elephant."}]},
   {ilustracion:"🦟🧙‍♀️✨",fondo:"linear-gradient(160deg,#845EC2,#FF9671)",oraciones:[
    {es:"Buscó a una bruja mariposa en el jardín.",en:"She sought a butterfly witch in the garden."},
    {es:"—¡Hazme enorme, por favor!— le pidió saltando.",en:"\"Make me huge, please!\" she asked, jumping."},
    {es:"La bruja la miró y sonrió con malicia.",en:"The witch looked at her and smiled mischievously."}]},
   {ilustracion:"🦟💥🐘",fondo:"linear-gradient(160deg,#FF9671,#FFC75F)",oraciones:[
    {es:"—PUM— Saltarina creció y creció hasta ser enorme.",en:"\"POOF\" Jumpy grew and grew until enormous."},
    {es:"Era más grande que una casa y más alta que un árbol.",en:"She was bigger than a house and taller than a tree."},
    {es:"—¡Soy gigante!— gritó de felicidad.",en:"\"I'm giant!\" she shouted happily."}]},
   {ilustracion:"🦟🏚️😱",fondo:"linear-gradient(160deg,#FFC75F,#F9F871)",oraciones:[
    {es:"Pero al moverse, derribó un gallinero sin querer.",en:"But moving, she accidentally knocked down a henhouse."},
    {es:"Las gallinas salieron corriendo muy asustadas.",en:"The chickens ran out very scared."},
    {es:"Y no podía entrar a ninguna parte, ¡era demasiado grande!",en:"And she couldn't fit anywhere, she was too big!"}]},
   {ilustracion:"🦟😢🐜",fondo:"linear-gradient(160deg,#D4B5FF,#A66CFF)",oraciones:[
    {es:"Se sentó a llorar en el campo, muy triste.",en:"She sat crying in the field, very sad."},
    {es:"Una hormiga amiga se acercó a consolarla.",en:"A friendly ant came to comfort her."},
    {es:"—Ser chico tiene sus ventajas— le dijo la hormiga.",en:"\"Being small has its advantages,\" said the ant."}]},
   {ilustracion:"🦟🔍✨",fondo:"linear-gradient(160deg,#9BF6FF,#A0C4FF)",oraciones:[
    {es:"Saltarina pidió volver a su tamaño normal.",en:"Jumpy asked to return to her normal size."},
    {es:"La bruja la encogió con un movimiento de varita.",en:"The witch shrank her with a wave of her wand."},
    {es:"¡De nuevo chiquita, se sintió libre y feliz!",en:"Tiny again, she felt free and happy!"}]},
   {ilustracion:"🦟🐕❤️",fondo:"linear-gradient(160deg,#A66CFF,#FF9671)",oraciones:[
    {es:"Comprendió que lo importante no es el tamaño.",en:"She understood size isn't what matters."},
    {es:"Ella podía saltar 100 veces su altura.",en:"She could jump 100 times her own height."},
    {es:"Y eso la hacía única y especial.",en:"And that made her unique and special."}]}],
  vocabulario:[{es:"pulga",en:"flea",img:"🦟"},{es:"gigante",en:"giant",img:"🦕"},{es:"saltar",en:"to jump",img:"🤸"},{es:"bruja",en:"witch",img:"🧙‍♀️"},{es:"hormiga",en:"ant",img:"🐜"},{es:"chico",en:"small",img:"🐜"},{es:"feliz",en:"happy",img:"😊"}],
  preguntas:[
   {es:"¿Cómo se llamaba la pulga?",en:"What was the flea's name?",opciones:{es:["Saltarina","Pega","Chiqui","Nube"],en:["Jumpy","Sticky","Tiny","Cloud"]},correcta:0},
   {es:"¿Qué quería ser?",en:"What did she want to be?",opciones:{es:["Gigante","Invisible","Rápida","Rica"],en:["Giant","Invisible","Fast","Rich"]},correcta:0},
   {es:"¿Quién la consoló cuando estaba triste?",en:"Who comforted her when she was sad?",opciones:{es:["Una hormiga","Un perro","La bruja","Un pájaro"],en:["An ant","A dog","The witch","A bird"]},correcta:0},
   {es:"¿Qué comprendió al final?",en:"What did she understand at the end?",opciones:{es:["Lo importante no es el tamaño","Hay que ser grande siempre","Las brujas son malas","Saltar es malo"],en:["Size isn't what matters","Always be big","Witches are mean","Jumping is bad"],},correcta:0}]}
);

/* ============================================================
   CUENTO 10 (NUEVO): El Unicornio que Perdió su Brillo — 7 pág
   ============================================================ */
SB_registrar(
 {id:"el-unicornio-perdio-su-brillo",archivo:"",titulo:{es:"El Unicornio que Perdió su Brillo",en:"The Unicorn Who Lost Her Sparkle"},categoria:"amigos",nivel:"inicial",paginas:7,portada:"🦄",color:"#FF6B9D",destacado:false},
 {id:"el-unicornio-perdio-su-brillo",titulo:{es:"El Unicornio que Perdió su Brillo",en:"The Unicorn Who Lost Her Sparkle"},categoria:"amigos",nivel:"inicial",color:"#FF6B9D",portada:"🦄",
  paginas:[
   {ilustracion:"🦄🌈✨",fondo:"linear-gradient(160deg,#FF6B9D,#FFC6FF)",oraciones:[
    {es:"En el Bosque Arcoíris vivía Luna, un unicornio.",en:"In Rainbow Forest lived Luna, a unicorn."},
    {es:"Su cuerno brillaba con luces de todos los colores.",en:"Her horn glowed with lights of every color."},
    {es:"Todos los animales venían a ver su brillo mágico.",en:"All animals came to see her magic sparkle."}]},
   {ilustracion:"🦄😢🌫️",fondo:"linear-gradient(160deg,#B8B8D1,#5B5F97)",oraciones:[
    {es:"Una mañana, Luna despertó y su cuerno no brillaba.",en:"One morning, Luna woke and her horn didn't glow."},
    {es:"Estaba opaco, gris y sin ningún color.",en:"It was dull, gray, and without any color."},
    {es:"—¡He perdido mi magia!— lloró desconsolada.",en:"\"I've lost my magic!\" she cried heartbroken."}]},
   {ilustracion:"🦄🐿️❤️",fondo:"linear-gradient(160deg,#FFC6FF,#BDB2FF)",oraciones:[
    {es:"Su amiga la ardilla la encontró llorando.",en:"Her friend the squirrel found her crying."},
    {es:"—Vamos a buscar tu brillo juntas— le dijo.",en:"\"Let's find your sparkle together,\" she said."},
    {es:"Salieron al bosque con una canasta de frutas.",en:"They went into the forest with a fruit basket."}]},
   {ilustracion:"🦄🦋🌸",fondo:"linear-gradient(160deg,#CAFFBF,#9BF6FF)",oraciones:[
    {es:"Preguntaron a las flores, a los ríos y al viento.",en:"They asked flowers, rivers, and the wind."},
    {es:"Nadie sabía dónde había ido el brillo de Luna.",en:"Nobody knew where Luna's sparkle had gone."},
    {es:"Pero todos le decían lo mucho que la querían.",en:"But everyone told her how much they loved her."}]},
   {ilustracion:"🦄🎂🎉",fondo:"linear-gradient(160deg,#FDFFB6,#FFD6A5)",oraciones:[
    {es:"Al volver, todos los animales prepararon una fiesta.",en:"Back home, all animals had prepared a party."},
    {es:"Había pastel, velas y regalos para Luna.",en:"There was cake, candles, and gifts for Luna."},
    {es:"—¡Te queremos con o sin brillo!— gritaron todos.",en:"\"We love you with or without sparkle!\" they all shouted."}]},
   {ilustracion:"🦄✨🌈",fondo:"linear-gradient(160deg,#FF6B9D,#FFD43B)",oraciones:[
    {es:"Luna sonrió tanto que su corazón se llenó de luz.",en:"Luna smiled so much her heart filled with light."},
    {es:"Y de repente, ¡su cuerno volvió a brillar más que nunca!",en:"And suddenly, her horn glowed brighter than ever!"},
    {es:"El brillo venía del amor de sus amigos.",en:"The sparkle came from her friends' love."}]},
   {ilustracion:"🦄🌈❤️",fondo:"linear-gradient(160deg,#A0C4FF,#FFC6FF)",oraciones:[
    {es:"Luna comprendió que la verdadera magia es la amistad.",en:"Luna understood true magic is friendship."},
    {es:"Y que sus amigos la querían por cómo era.",en:"And that her friends loved her for who she was."},
    {es:"Desde entonces, el bosque brilló todos los días.",en:"Ever since, the forest sparkled every single day."}]}],
  vocabulario:[{es:"unicornio",en:"unicorn",img:"🦄"},{es:"brillo",en:"sparkle",img:"✨"},{es:"arcoíris",en:"rainbow",img:"🌈"},{es:"amigo",en:"friend",img:"🤝"},{es:"fiesta",en:"party",img:"🎉"},{es:"amor",en:"love",img:"❤️"},{es:"magia",en:"magic",img:"🪄"}],
  preguntas:[
   {es:"¿Cómo se llamaba el unicornio?",en:"What was the unicorn's name?",opciones:{es:["Luna","Estrella","Rosa","Nube"],en:["Luna","Star","Rose","Cloud"]},correcta:0},
   {es:"¿Qué le pasó a su cuerno?",en:"What happened to her horn?",opciones:{es:["Dejó de brillar","Se cayó","Se puso azul","Se rompió"],en:["It stopped glowing","It fell off","It turned blue","It broke"],},correcta:0},
   {es:"¿Quién la ayudó a buscar su brillo?",en:"Who helped her find her sparkle?",opciones:{es:["La ardilla","El búho","El dragón","El viento"],en:["The squirrel","The owl","The dragon","The wind"],},correcta:0},
   {es:"¿De dónde venía realmente el brillo?",en:"Where did the sparkle really come from?",opciones:{es:["Del amor de sus amigos","De una poción","Del sol","De la luna"],en:["Her friends' love","A potion","The sun","The moon"],},correcta:0}]}
);


/* ============================================================
   +20 CUENTOS NUEVOS (Super Premium) — catálogo ampliado a 30
   ============================================================ */

SB_registrar(
 {id:"el-elefante-miedo-al-agua",archivo:"",titulo:{es:"El Elefante que Tenía Miedo al Agua",en:"The Elephant Who Was Afraid of Water"},categoria:"animales",nivel:"inicial",paginas:5,portada:"🐘",color:"#74B9FF",destacado:true},
 {id:"el-elefante-miedo-al-agua",titulo:{es:"El Elefante que Tenía Miedo al Agua",en:"The Elephant Who Was Afraid of Water"},categoria:"animales",nivel:"inicial",color:"#74B9FF",portada:"🐘",
  paginas:[
   {ilustracion:"🐘🌴",fondo:"linear-gradient(160deg,#74B9FF,#A8E6CF)",oraciones:[{es:"Había una vez un elefante llamado Tito.",en:"Once there was an elephant named Tito."},{es:"Era grande y gris, con orejas enormes.",en:"He was big and gray, with huge ears."},{es:"Pero le tenía mucho miedo al agua.",en:"But he was very afraid of water."}]},
   {ilustracion:"🐘💦😱",fondo:"linear-gradient(160deg,#81ECEC,#74B9FF)",oraciones:[{es:"Sus amigos querían bañarse en el río.",en:"His friends wanted to bathe in the river."},{es:"Tito se escondía detrás de un árbol.",en:"Tito hid behind a tree."},{es:"¿No querés venir? le gritaban.",en:"Don't you want to come? they shouted."}]},
   {ilustracion:"🐒🐘",fondo:"linear-gradient(160deg,#FFEAA7,#FAB1A0)",oraciones:[{es:"Un mono sabio se acercó a Tito.",en:"A wise monkey approached Tito."},{es:"El agua es amiga, no te hará daño, le dijo.",en:"Water is a friend, it won't hurt you, he said."},{es:"Poné solo la trompa primero.",en:"Just put your trunk in first."}]},
   {ilustracion:"🐘💦😊",fondo:"linear-gradient(160deg,#A8E6CF,#81ECEC)",oraciones:[{es:"Tito metió la trompa y salpicó un poco.",en:"Tito put his trunk in and splashed a little."},{es:"¡Está tibia y divertida! gritó feliz.",en:"It's warm and fun! he shouted happily."},{es:"Pronto se bañaba con todos sus amigos.",en:"Soon he was bathing with all his friends."}]},
   {ilustracion:"🐘❤️🌴",fondo:"linear-gradient(160deg,#74B9FF,#DFE6E9)",oraciones:[{es:"Tito comprendió que el miedo se va probando.",en:"Tito learned that fear goes away by trying."},{es:"Ahora es el primero en entrar al río.",en:"Now he is the first to jump into the river."},{es:"Y salpica a todos con su trompa grande.",en:"And he splashes everyone with his big trunk."}]}
],
  vocabulario:[{es:"elefante",en:"elephant",img:"🐘"},{es:"agua",en:"water",img:"💧"},{es:"río",en:"river",img:"🏞️"},{es:"miedo",en:"fear",img:"😱"},{es:"trompa",en:"trunk",img:"🐘"},{es:"bañarse",en:"to bathe",img:"🛁"}],
  preguntas:[
   {es:"¿Cómo se llamaba el elefante?",en:"What was the elephant's name?",opciones:{es:["Tito","Max","Luna","Pablo"],en:["Tito","Max","Luna","Pablo"]},correcta:0},
   {es:"¿De qué tenía miedo?",en:"What was he afraid of?",opciones:{es:["Del agua","Del fuego","De los monos","De las alturas"],en:["Water","Fire","Monkeys","Heights"]},correcta:0},
   {es:"¿Quién lo ayudó?",en:"Who helped him?",opciones:{es:["Un mono","Un león","Un pez","Un pájaro"],en:["A monkey","A lion","A fish","A bird"]},correcta:0}
]});

SB_registrar(
 {id:"la-abeja-no-queria-trabajar",archivo:"",titulo:{es:"La Abeja que No Quería Trabajar",en:"The Bee Who Didn't Want to Work"},categoria:"naturaleza",nivel:"inicial",paginas:5,portada:"🐝",color:"#FDCB6E",destacado:true},
 {id:"la-abeja-no-queria-trabajar",titulo:{es:"La Abeja que No Quería Trabajar",en:"The Bee Who Didn't Want to Work"},categoria:"naturaleza",nivel:"inicial",color:"#FDCB6E",portada:"🐝",
  paginas:[
   {ilustracion:"🐝🌸☀️",fondo:"linear-gradient(160deg,#FDCB6E,#FFEAA7)",oraciones:[{es:"En un panal vivía una abeja llamada Maya.",en:"In a hive lived a bee named Maya."},{es:"Todas las abejas trabajaban todo el día.",en:"All the bees worked all day long."},{es:"Pero Maya prefería oler las flores.",en:"But Maya preferred to smell the flowers."}]},
   {ilustracion:"🐝😴🌸",fondo:"linear-gradient(160deg,#FFEAA7,#FAB1A0)",oraciones:[{es:"¿Por qué no juntás néctar? le preguntaron.",en:"Why don't you gather nectar? they asked."},{es:"Mañana lo hago, respondía Maya dormida.",en:"I'll do it tomorrow, sleepy Maya answered."},{es:"Las flores la miraban sorprendidas.",en:"The flowers looked at her in surprise."}]},
   {ilustracion:"🍯❄️",fondo:"linear-gradient(160deg,#DFE6E9,#A29BFE)",oraciones:[{es:"Llegó el invierno y hacía mucho frío.",en:"Winter came and it was very cold."},{es:"No había flores ni néctar que juntar.",en:"There were no flowers or nectar to gather."},{es:"El panal tenía poca miel guardada.",en:"The hive had little honey stored."}]},
   {ilustracion:"🐝🍯❤️",fondo:"linear-gradient(160deg,#FDCB6E,#FF7675)",oraciones:[{es:"Maya se sintió muy triste y avergonzada.",en:"Maya felt very sad and ashamed."},{es:"Desde mañana trabajo con todas, dijo.",en:"From tomorrow I work with everyone, she said."},{es:"Y ayudó a repartir la poca miel.",en:"And helped share the little honey they had."}]},
   {ilustracion:"🐝🌸🍯",fondo:"linear-gradient(160deg,#A8E6CF,#FDCB6E)",oraciones:[{es:"Cuando llegó la primavera, Maya fue la primera.",en:"When spring came, Maya was the first."},{es:"Juntaba más néctar que ninguna otra abeja.",en:"She gathered more nectar than any other bee."},{es:"Comprendió que el trabajo nos hace felices.",en:"She learned that work makes us happy."}]}
],
  vocabulario:[{es:"abeja",en:"bee",img:"🐝"},{es:"miel",en:"honey",img:"🍯"},{es:"flor",en:"flower",img:"🌸"},{es:"trabajar",en:"to work",img:"💪"},{es:"panal",en:"hive",img:"🏠"},{es:"invierno",en:"winter",img:"❄️"}],
  preguntas:[
   {es:"¿Cómo se llamaba la abeja?",en:"What was the bee's name?",opciones:{es:["Maya","Lola","Nube","Sol"],en:["Maya","Lola","Cloud","Sun"]},correcta:0},
   {es:"¿Qué prefería hacer?",en:"What did she prefer to do?",opciones:{es:["Oler flores","Trabajar","Dormir","Volar"],en:["Smell flowers","Work","Sleep","Fly"]},correcta:0},
   {es:"¿Qué comprendió al final?",en:"What did she learn at the end?",opciones:{es:["El trabajo nos hace felices","Las flores son tontas","La miel es mala","No hay que trabajar"],en:["Work makes us happy","Flowers are silly","Honey is bad","Don't work"]},correcta:0}
]});

SB_registrar(
 {id:"el-nino-perdio-su-sonrisa",archivo:"",titulo:{es:"El Niño que Perdió su Sonrisa",en:"The Boy Who Lost His Smile"},categoria:"amigos",nivel:"inicial",paginas:4,portada:"😊",color:"#FF7675",destacado:true},
 {id:"el-nino-perdio-su-sonrisa",titulo:{es:"El Niño que Perdió su Sonrisa",en:"The Boy Who Lost His Smile"},categoria:"amigos",nivel:"inicial",color:"#FF7675",portada:"😊",
  paginas:[
   {ilustracion:"🧒😔🏠",fondo:"linear-gradient(160deg,#FFEAA7,#FAB1A0)",oraciones:[{es:"Había un niño llamado Lucas que no sonreía.",en:"There was a boy named Lucas who didn't smile."},{es:"Había perdido su sonrisa en alguna parte.",en:"He had lost his smile somewhere."},{es:"Nada lo hacía reír ni estar contento.",en:"Nothing made him laugh or feel happy."}]},
   {ilustracion:"🧒🐶🎈",fondo:"linear-gradient(160deg,#74B9FF,#A8E6CF)",oraciones:[{es:"Su perrito le trajo su pelota favorita.",en:"His puppy brought him his favorite ball."},{es:"Su amiga le regaló un globo de colores.",en:"His friend gave him a colorful balloon."},{es:"Pero Lucas seguía muy serio y triste.",en:"But Lucas still looked serious and sad."}]},
   {ilustracion:"🧒👵🍪",fondo:"linear-gradient(160deg,#FDCB6E,#FFEAA7)",oraciones:[{es:"La abuela le hizo galletas de chocolate.",en:"Grandma made him chocolate cookies."},{es:"¿Dónde creés que está tu sonrisa? le preguntó.",en:"Where do you think your smile is? she asked."},{es:"No sé, dijo Lucas con los ojos bajos.",en:"I don't know, said Lucas with downcast eyes."}]},
   {ilustracion:"🧒😊❤️🎉",fondo:"linear-gradient(160deg,#FF7675,#FDCB6E)",oraciones:[{es:"La abuela lo abrazó muy fuerte y le hizo cosquillas.",en:"Grandma hugged him tight and tickled him."},{es:"Lucas empezó a reír a carcajadas.",en:"Lucas began to laugh out loud."},{es:"¡Encontré mi sonrisa! gritó feliz.",en:"I found my smile! he shouted happily."}]}
],
  vocabulario:[{es:"sonrisa",en:"smile",img:"😊"},{es:"niño",en:"boy",img:"🧒"},{es:"amigo",en:"friend",img:"🤝"},{es:"abuela",en:"grandma",img:"👵"},{es:"galleta",en:"cookie",img:"🍪"},{es:"feliz",en:"happy",img:"😄"}],
  preguntas:[
   {es:"¿Cómo se llamaba el niño?",en:"What was the boy's name?",opciones:{es:["Lucas","Toby","Pablo","Diego"],en:["Lucas","Toby","Pablo","Diego"]},correcta:0},
   {es:"¿Qué le hizo la abuela?",en:"What did grandma do?",opciones:{es:["Lo abrazó y le hizo cosquillas","Lo regañó","Le dio dinero","Se fue"],en:["Hugged and tickled him","Scolded him","Gave him money","Left"]},correcta:0},
   {es:"¿Qué encontró al final?",en:"What did he find at the end?",opciones:{es:["Su sonrisa","Su juguete","Su perro","Su casa"],en:["His smile","His toy","His dog","His house"]},correcta:0}
]});

SB_registrar(
 {id:"la-tortuga-queria-correr",archivo:"",titulo:{es:"La Tortuga que Quería Correr",en:"The Turtle Who Wanted to Run"},categoria:"animales",nivel:"primario",paginas:5,portada:"🐢",color:"#00B894",destacado:true},
 {id:"la-tortuga-queria-correr",titulo:{es:"La Tortuga que Quería Correr",en:"The Turtle Who Wanted to Run"},categoria:"animales",nivel:"primario",color:"#00B894",portada:"🐢",
  paginas:[
   {ilustracion:"🐢🌳",fondo:"linear-gradient(160deg,#55EFC4,#81ECEC)",oraciones:[{es:"Una tortuga llamada Shelly miraba a los conejos correr.",en:"A turtle named Shelly watched the rabbits run."},{es:"Yo también quiero correr muy rápido, decía.",en:"I want to run fast too, she said."},{es:"Pero sus patitas eran cortas y su caparazón pesado.",en:"But her legs were short and her shell heavy."}]},
   {ilustracion:"🐢🏃",fondo:"linear-gradient(160deg,#FFEAA7,#FAB1A0)",oraciones:[{es:"Todos los días entrenaba en el bosque.",en:"Every day she trained in the forest."},{es:"Caminaba deprisa, subía piedras, nadaba en el arroyo.",en:"She walked fast, climbed stones, swam in the stream."},{es:"Los animales se reían: ¡una tortuga corriendo!",en:"The animals laughed: A turtle running!"}]},
   {ilustracion:"🏁🐢🐰",fondo:"linear-gradient(160deg,#74B9FF,#A29BFE)",oraciones:[{es:"Llegó el día de la gran carrera del bosque.",en:"The day of the great forest race arrived."},{es:"El conejo rápido se burlaba de Shelly.",en:"The fast rabbit made fun of Shelly."},{es:"¡Te ganaré fácil! decía riendo.",en:"I'll beat you easily! he said laughing."}]},
   {ilustracion:"🐰😴🐢🏁",fondo:"linear-gradient(160deg,#FDCB6E,#55EFC4)",oraciones:[{es:"El conejo corrió tanto que se durmió bajo un árbol.",en:"The rabbit ran so much he fell asleep under a tree."},{es:"Shelly siguió caminando sin parar, paso a paso.",en:"Shelly kept walking without stopping, step by step."},{es:"Cuando el conejo despertó, ¡ya era tarde!",en:"When the rabbit woke up, it was too late!"}]},
   {ilustracion:"🐢🏆❤️",fondo:"linear-gradient(160deg,#FFD43B,#FF9F43)",oraciones:[{es:"Shelly cruzó la meta primero y ganó la carrera.",en:"Shelly crossed the finish line first and won the race."},{es:"Todos los animales aplaudieron con asombro.",en:"All the animals applauded in amazement."},{es:"Comprendieron que la constancia vence a la rapidez.",en:"They learned that perseverance beats speed."}]}
],
  vocabulario:[{es:"tortuga",en:"turtle",img:"🐢"},{es:"correr",en:"to run",img:"🏃"},{es:"carrera",en:"race",img:"🏁"},{es:"constancia",en:"perseverance",img:"💪"},{es:"conejo",en:"rabbit",img:"🐰"},{es:"ganar",en:"to win",img:"🏆"}],
  preguntas:[
   {es:"¿Cómo se llamaba la tortuga?",en:"What was the turtle's name?",opciones:{es:["Shelly","Luna","Mimi","Nube"],en:["Shelly","Luna","Mimi","Cloud"]},correcta:0},
   {es:"¿Qué hizo el conejo en la carrera?",en:"What did the rabbit do in the race?",opciones:{es:["Se durmió","Ganó","Se lastimó","Se fue"],en:["Fell asleep","Won","Got hurt","Left"]},correcta:0},
   {es:"¿Qué enseñó la historia?",en:"What did the story teach?",opciones:{es:["La constancia vence a la rapidez","Las tortugas son rápidas","Los conejos son tontos","No hay que competir"],en:["Perseverance beats speed","Turtles are fast","Rabbits are silly","Don't compete"]},correcta:0}
]});

SB_registrar(
 {id:"el-arbol-hablaba-con-el-viento",archivo:"",titulo:{es:"El Árbol que Hablaba con el Viento",en:"The Tree That Talked to the Wind"},categoria:"naturaleza",nivel:"primario",paginas:5,portada:"🌳",color:"#6BCB77",destacado:true},
 {id:"el-arbol-hablaba-con-el-viento",titulo:{es:"El Árbol que Hablaba con el Viento",en:"The Tree That Talked to the Wind"},categoria:"naturaleza",nivel:"primario",color:"#6BCB77",portada:"🌳",
  paginas:[
   {ilustracion:"🌳💨🌿",fondo:"linear-gradient(160deg,#95D5B2,#D8F3DC)",oraciones:[{es:"En lo alto de una colina vivía un árbol viejo.",en:"On top of a hill lived an old tree."},{es:"Sus hojas susurraban cuando pasaba el viento.",en:"His leaves whispered when the wind passed by."},{es:"Los niños del pueblo creían que hablaba.",en:"The village children believed he could talk."}]},
   {ilustracion:"🌳💬🌬️",fondo:"linear-gradient(160deg,#B7E4C7,#74C69D)",oraciones:[{es:"Viento, ¿de dónde venís? preguntaba el árbol.",en:"Wind, where do you come from? asked the tree."},{es:"Vengo del mar, traigo barcos y sal, respondía.",en:"I come from the sea, I bring ships and salt, he answered."},{es:"Y el árbol movía sus ramas emocionado.",en:"And the tree moved his branches with excitement."}]},
   {ilustracion:"🌳❄️💨",fondo:"linear-gradient(160deg,#74C0FC,#E7F5FF)",oraciones:[{es:"En invierno, el viento traía nieve y frío.",en:"In winter, the wind brought snow and cold."},{es:"Árbol, dormí, que la primavera volverá, decía.",en:"Tree, sleep, spring will return, he said."},{es:"El árbol perdía sus hojas y descansaba.",en:"The tree lost his leaves and rested."}]},
   {ilustracion:"🌳🌸☀️",fondo:"linear-gradient(160deg,#FFE066,#FFD6A5)",oraciones:[{es:"Cuando volvía el calor, el árbol florecía.",en:"When the warmth returned, the tree blossomed."},{es:"Los niños venían a jugar bajo su sombra.",en:"The children came to play in his shade."},{es:"El viento les contaba historias lejanas.",en:"The wind told them faraway stories."}]},
   {ilustracion:"🌳❤️🌬️",fondo:"linear-gradient(160deg,#6BCB77,#FFE066)",oraciones:[{es:"El árbol comprendió que todo cambia y vuelve.",en:"The tree understood that everything changes and returns."},{es:"Que el viento es amigo que viaja por el mundo.",en:"That the wind is a friend who travels the world."},{es:"Y que esperar con paciencia trae hermosas flores.",en:"And that waiting patiently brings beautiful flowers."}]}
],
  vocabulario:[{es:"árbol",en:"tree",img:"🌳"},{es:"viento",en:"wind",img:"💨"},{es:"hojas",en:"leaves",img:"🍃"},{es:"primavera",en:"spring",img:"🌸"},{es:"invierno",en:"winter",img:"❄️"},{es:"paciencia",en:"patience",img:"⏳"}],
  preguntas:[
   {es:"¿De dónde venía el viento?",en:"Where did the wind come from?",opciones:{es:["Del mar","De la montaña","Del pueblo","Del desierto"],en:["From the sea","From the mountain","From the village","From the desert"]},correcta:0},
   {es:"¿Qué hacía el árbol en invierno?",en:"What did the tree do in winter?",opciones:{es:["Perdía hojas y descansaba","Corría","Florecía","Jugaba"],en:["Lost leaves and rested","Ran","Blossomed","Played"]},correcta:0},
   {es:"¿Qué comprendió el árbol?",en:"What did the tree understand?",opciones:{es:["Todo cambia y vuelve","El viento es malo","Los niños son ruidosos","La nieve es divertida"],en:["Everything changes and returns","Wind is bad","Children are noisy","Snow is fun"]},correcta:0}
]});

SB_registrar(
 {id:"la-nube-que-lloraba",archivo:"",titulo:{es:"La Nube que Lloraba Mucho",en:"The Cloud Who Cried a Lot"},categoria:"naturaleza",nivel:"inicial",paginas:4,portada:"☁️",color:"#A29BFE",destacado:true},
 {id:"la-nube-que-lloraba",titulo:{es:"La Nube que Lloraba Mucho",en:"The Cloud Who Cried a Lot"},categoria:"naturaleza",nivel:"inicial",color:"#A29BFE",portada:"☁️",
  paginas:[
   {ilustracion:"☁️😢🌧️",fondo:"linear-gradient(160deg,#DFE6E9,#A29BFE)",oraciones:[{es:"Había una nube llamada Lluvia que lloraba siempre.",en:"There was a cloud named Rain who always cried."},{es:"Lloraba por todo, incluso por las cosas bonitas.",en:"She cried about everything, even beautiful things."},{es:"Las otras nubes no entendían por qué.",en:"The other clouds didn't understand why."}]},
   {ilustracion:"☁️💧🌻",fondo:"linear-gradient(160deg,#A29BFE,#74B9FF)",oraciones:[{es:"Sus lágrimas caían sobre un campo de girasoles.",en:"Her tears fell on a field of sunflowers."},{es:"Los girasoles crecían más y más cada día.",en:"The sunflowers grew taller every day."},{es:"¡Gracias, nube! gritaban felices.",en:"Thank you, cloud! they shouted happily."}]},
   {ilustracion:"☁️🌈☀️",fondo:"linear-gradient(160deg,#74B9FF,#FDCB6E)",oraciones:[{es:"Un día salió el sol entre sus lágrimas.",en:"One day the sun came out between her tears."},{es:"Se formó un arcoíris enorme y colorido.",en:"A huge colorful rainbow formed."},{es:"Todos los niños miraban al cielo asombrados.",en:"All the children looked at the sky in amazement."}]},
   {ilustracion:"☁️😊❤️",fondo:"linear-gradient(160deg,#FFEAA7,#A8E6CF)",oraciones:[{es:"Lluvia comprendió que sus lágrimas eran útiles.",en:"Rain understood that her tears were useful."},{es:"Que llorar a veces ayuda a crecer.",en:"That crying sometimes helps things grow."},{es:"Y ahora llora solo cuando el campo tiene sed.",en:"And now she cries only when the fields are thirsty."}]}
],
  vocabulario:[{es:"nube",en:"cloud",img:"☁️"},{es:"lluvia",en:"rain",img:"🌧️"},{es:"girasol",en:"sunflower",img:"🌻"},{es:"arcoíris",en:"rainbow",img:"🌈"},{es:"sol",en:"sun",img:"☀️"},{es:"lágrimas",en:"tears",img:"💧"}],
  preguntas:[
   {es:"¿Cómo se llamaba la nube?",en:"What was the cloud's name?",opciones:{es:["Lluvia","Nube","Blanca","Sol"],en:["Rain","Cloud","White","Sun"]},correcta:0},
   {es:"¿Qué crecía con sus lágrimas?",en:"What grew with her tears?",opciones:{es:["Girasoles","Árboles","Casas","Peces"],en:["Sunflowers","Trees","Houses","Fish"]},correcta:0},
   {es:"¿Qué se formó con el sol y la lluvia?",en:"What formed with sun and rain?",opciones:{es:["Un arcoíris","Una tormenta","Un río","Un volcán"],en:["A rainbow","A storm","A river","A volcano"]},correcta:0}
]});

SB_registrar(
 {id:"el-robot-queria-ser-de-verdad",archivo:"",titulo:{es:"El Robot que Quería ser de Verdad",en:"The Robot Who Wanted to Be Real"},categoria:"ciencia",nivel:"primario",paginas:6,portada:"🤖",color:"#6C5CE7",destacado:true},
 {id:"el-robot-queria-ser-de-verdad",titulo:{es:"El Robot que Quería ser de Verdad",en:"The Robot Who Wanted to Be Real"},categoria:"ciencia",nivel:"primario",color:"#6C5CE7",portada:"🤖",
  paginas:[
   {ilustracion:"🤖🏭⚡",fondo:"linear-gradient(160deg,#6C5CE7,#A29BFE)",oraciones:[{es:"En un laboratorio crearon a Robi, un robot pequeño.",en:"In a lab they created Robi, a small robot."},{es:"Podía caminar, hablar y resolver cuentas.",en:"He could walk, talk, and solve math."},{es:"Pero quería sentir: alegría, miedo, amor.",en:"But he wanted to feel: joy, fear, love."}]},
   {ilustracion:"🤖🧒",fondo:"linear-gradient(160deg,#74B9FF,#81ECEC)",oraciones:[{es:"Un día conoció a Sofi, una niña del barrio.",en:"One day he met Sofi, a girl from the neighborhood."},{es:"¿Querés ser mi amigo? le preguntó ella.",en:"Do you want to be my friend? she asked."},{es:"Robi asintió con su cabeza metálica.",en:"Robi nodded his metallic head."}]},
   {ilustracion:"🤖🎈😢",fondo:"linear-gradient(160deg,#FF7675,#FAB1A0)",oraciones:[{es:"Un día se le rompió el globo a Sofi y ella lloró.",en:"One day Sofi's balloon broke and she cried."},{es:"Robi sintió algo raro en su circuito central.",en:"Robi felt something strange in his central circuit."},{es:"¿Esto es tristeza? se preguntó.",en:"Is this sadness? he wondered."}]},
   {ilustracion:"🤖🎁😊",fondo:"linear-gradient(160deg,#FDCB6E,#FFEAA7)",oraciones:[{es:"Robi fue a la tienda y compró otro globo.",en:"Robi went to the store and bought another balloon."},{es:"Se lo regaló a Sofi con sus manos frías.",en:"He gave it to Sofi with his cold hands."},{es:"Ella sonrió y lo abrazó fuerte.",en:"She smiled and hugged him tightly."}]},
   {ilustracion:"🤖❤️⚡",fondo:"linear-gradient(160deg,#FF7675,#FDCB6E)",oraciones:[{es:"En ese momento, el corazón de Robi brilló mucho.",en:"At that moment, Robi's heart glowed brightly."},{es:"¡Siento alegría! gritó emocionado.",en:"I feel joy! he shouted excitedly."},{es:"Había aprendido que amar nos hace reales.",en:"He had learned that loving makes us real."}]},
   {ilustracion:"🤖🧒❤️",fondo:"linear-gradient(160deg,#A29BFE,#FFEAA7)",oraciones:[{es:"Desde entonces, Robi fue el mejor amigo de Sofi.",en:"Ever since, Robi was Sofi's best friend."},{es:"Reía, lloraba y jugaba como un niño más.",en:"He laughed, cried, and played like any other child."},{es:"Y su corazón de metal nunca dejó de brillar.",en:"And his metal heart never stopped shining."}]}
],
  vocabulario:[{es:"robot",en:"robot",img:"🤖"},{es:"amigo",en:"friend",img:"🤝"},{es:"alegría",en:"joy",img:"😄"},{es:"tristeza",en:"sadness",img:"😢"},{es:"amor",en:"love",img:"❤️"},{es:"corazón",en:"heart",img:"💖"}],
  preguntas:[
   {es:"¿Cómo se llamaba el robot?",en:"What was the robot's name?",opciones:{es:["Robi","Tito","Max","Rocco"],en:["Robi","Tito","Max","Rocco"]},correcta:0},
   {es:"¿Qué quería sentir?",en:"What did he want to feel?",opciones:{es:["Alegría, miedo y amor","Solo frío","Dolor","Nada"],en:["Joy, fear and love","Only cold","Pain","Nothing"]},correcta:0},
   {es:"¿Qué le regaló a Sofi?",en:"What did he give Sofi?",opciones:{es:["Un globo","Un juguete","Un helado","Un libro"],en:["A balloon","A toy","Ice cream","A book"]},correcta:0},
   {es:"¿Qué aprendió?",en:"What did he learn?",opciones:{es:["Amar nos hace reales","Los robots no sienten","Los globos son caros","Mejor estar solo"],en:["Loving makes us real","Robots don't feel","Balloons are expensive","Better alone"]},correcta:0}
]});

SB_registrar(
 {id:"la-cebra-un-solo-color",archivo:"",titulo:{es:"La Cebra que Quería ser de un Solo Color",en:"The Zebra Who Wanted to Be One Color"},categoria:"animales",nivel:"inicial",paginas:4,portada:"🦓",color:"#636E72",destacado:true},
 {id:"la-cebra-un-solo-color",titulo:{es:"La Cebra que Quería ser de un Solo Color",en:"The Zebra Who Wanted to Be One Color"},categoria:"animales",nivel:"inicial",color:"#636E72",portada:"🦓",
  paginas:[
   {ilustracion:"🦓🌿",fondo:"linear-gradient(160deg,#DFE6E9,#B2BEC3)",oraciones:[{es:"Una cebra llamada Rayas no quería ser rayada.",en:"A zebra named Stripes didn't want to be striped."},{es:"Quiero ser toda de un solo color, decía.",en:"I want to be all one color, she said."},{es:"Todos los animales la miraban extrañados.",en:"All the animals looked at her strangely."}]},
   {ilustracion:"🦓🎨",fondo:"linear-gradient(160deg,#FF7675,#FDCB6E)",oraciones:[{es:"Se revolcó en barro rojo para ser toda roja.",en:"She rolled in red mud to be all red."},{es:"Pero al secarse, las rayas volvieron a aparecer.",en:"But when it dried, the stripes appeared again."},{es:"Probó con hojas verdes y con polvo amarillo.",en:"She tried green leaves and yellow dust."}]},
   {ilustracion:"🦓🦁🌾",fondo:"linear-gradient(160deg,#FDCB6E,#FAB1A0)",oraciones:[{es:"Un león la vio entre la hierba alta.",en:"A lion saw her among the tall grass."},{es:"Las rayas de la cebra la confundían con el pasto.",en:"The zebra's stripes confused her with the grass."},{es:"El león no pudo verla bien y se fue.",en:"The lion couldn't see her well and left."}]},
   {ilustracion:"🦓😊❤️",fondo:"linear-gradient(160deg,#A8E6CF,#81ECEC)",oraciones:[{es:"Rayas comprendió que sus rayas la protegían.",en:"Stripes understood that her stripes protected her."},{es:"Que cada uno es especial como es.",en:"That everyone is special just as they are."},{es:"Y desde entonces, corre feliz por la sabana.",en:"And ever since, she runs happily across the savanna."}]}
],
  vocabulario:[{es:"cebra",en:"zebra",img:"🦓"},{es:"rayas",en:"stripes",img:"📏"},{es:"color",en:"color",img:"🎨"},{es:"león",en:"lion",img:"🦁"},{es:"especial",en:"special",img:"⭐"},{es:"sabana",en:"savanna",img:"🌾"}],
  preguntas:[
   {es:"¿Cómo se llamaba la cebra?",en:"What was the zebra's name?",opciones:{es:["Rayas","Luna","Mimi","Nube"],en:["Stripes","Luna","Mimi","Cloud"]},correcta:0},
   {es:"¿Qué quería ser?",en:"What did she want to be?",opciones:{es:["De un solo color","Más grande","Más rápida","Un león"],en:["One color","Bigger","Faster","A lion"]},correcta:0},
   {es:"¿Qué la protegió del león?",en:"What protected her from the lion?",opciones:{es:["Sus rayas","Su velocidad","Su amigo","El barro"],en:["Her stripes","Her speed","Her friend","The mud"]},correcta:0}
]});

SB_registrar(
 {id:"el-sombrero-magico-de-la-abuela",archivo:"",titulo:{es:"El Sombrero Mágico de la Abuela",en:"Grandma's Magic Hat"},categoria:"aventura",nivel:"primario",paginas:6,portada:"🎩",color:"#E17055",destacado:true},
 {id:"el-sombrero-magico-de-la-abuela",titulo:{es:"El Sombrero Mágico de la Abuela",en:"Grandma's Magic Hat"},categoria:"aventura",nivel:"primario",color:"#E17055",portada:"🎩",
  paginas:[
   {ilustracion:"👵🎩🧒",fondo:"linear-gradient(160deg,#E17055,#FDCB6E)",oraciones:[{es:"La abuela le regaló a Mateo un sombrero viejo.",en:"Grandma gave Mateo an old hat."},{es:"Es mágico, le dijo al oído. Ponte lo y pedí un deseo.",en:"It's magic, she whispered. Wear it and make a wish."},{es:"Mateo no lo creía, pero se lo puso igual.",en:"Mateo didn't believe it, but he put it on anyway."}]},
   {ilustracion:"🧒🎩🐘",fondo:"linear-gradient(160deg,#74B9FF,#A8E6CF)",oraciones:[{es:"Desearía ver un elefante de verdad, pidió.",en:"I wish I could see a real elephant, he wished."},{es:"De pronto, un elefante asomó la trompa por la ventana.",en:"Suddenly, an elephant poked its trunk through the window."},{es:"Mateo se quedó con la boca abierta.",en:"Mateo's mouth dropped open in surprise."}]},
   {ilustracion:"🧒🎩🌋",fondo:"linear-gradient(160deg,#FA5252,#FF922B)",oraciones:[{es:"¡Quiero ver un volcán! gritó emocionado.",en:"I want to see a volcano! he shouted excitedly."},{es:"Al instante estaba en una isla con un volcán humeante.",en:"In an instant he was on an island with a smoking volcano."},{es:"¡Esto es increíble! pensó.",en:"This is amazing! he thought."}]},
   {ilustracion:"🧒🎩🏠😢",fondo:"linear-gradient(160deg,#A29BFE,#DFE6E9)",oraciones:[{es:"Después de muchos viajes, Mateo se sintió solo.",en:"After many trips, Mateo felt lonely."},{es:"Extrañaba su casa, a sus amigos y a la abuela.",en:"He missed his home, his friends, and grandma."},{es:"Quiero volver, deseó con el sombrero.",en:"I want to go back, he wished with the hat."}]},
   {ilustracion:"🧒👵❤️🎩",fondo:"linear-gradient(160deg,#FDCB6E,#FFEAA7)",oraciones:[{es:"Estaba de nuevo en casa, con la abuela sonriendo.",en:"He was home again, with grandma smiling."},{es:"¿Viste que el sombrero es mágico? le dijo ella.",en:"See, the hat is magic? she told him."},{es:"Sí, pero lo mejor es estar con vos, respondió.",en:"Yes, but the best thing is being with you, he answered."}]},
   {ilustracion:"🧒🎩❤️",fondo:"linear-gradient(160deg,#E17055,#FDCB6E)",oraciones:[{es:"Mateo guardó el sombrero en un cajón especial.",en:"Mateo kept the hat in a special drawer."},{es:"A veces lo usa para viajar con la abuela.",en:"Sometimes he wears it to travel with grandma."},{es:"Porque la magia es más linda cuando se comparte.",en:"Because magic is lovelier when shared."}]}
],
  vocabulario:[{es:"sombrero",en:"hat",img:"🎩"},{es:"magia",en:"magic",img:"🪄"},{es:"deseo",en:"wish",img:"⭐"},{es:"abuela",en:"grandma",img:"👵"},{es:"viaje",en:"journey",img:"🧭"},{es:"amor",en:"love",img:"❤️"}],
  preguntas:[
   {es:"¿Quién le regaló el sombrero?",en:"Who gave him the hat?",opciones:{es:["Su abuela","Su mamá","Su amigo","Un mago"],en:["His grandma","His mom","His friend","A wizard"]},correcta:0},
   {es:"¿Qué deseó primero?",en:"What did he wish for first?",opciones:{es:["Ver un elefante","Ver un volcán","Volver a casa","Ser grande"],en:["See an elephant","See a volcano","Go home","Be big"]},correcta:0},
   {es:"¿Por qué quiso volver?",en:"Why did he want to go back?",opciones:{es:["Se sentía solo","Tenía miedo","Tení hambre","Se perdió"],en:["He felt lonely","He was scared","He was hungry","He was lost"]},correcta:0},
   {es:"¿Qué aprendió?",en:"What did he learn?",opciones:{es:["La magia es más linda compartida","Los sombreros son viejos","No hay que viajar","Los volcanes son feos"],en:["Magic is lovelier shared","Hats are old","Don't travel","Volcanoes are ugly"]},correcta:0}
]});

SB_registrar(
 {id:"el-pinguino-queria-volar",archivo:"",titulo:{es:"El Pingüino que Quería Volar",en:"The Penguin Who Wanted to Fly"},categoria:"animales",nivel:"inicial",paginas:4,portada:"🐧",color:"#0984E3",destacado:true},
 {id:"el-pinguino-queria-volar",titulo:{es:"El Pingüino que Quería Volar",en:"The Penguin Who Wanted to Fly"},categoria:"animales",nivel:"inicial",color:"#0984E3",portada:"🐧",
  paginas:[
   {ilustracion:"🐧❄️🐦",fondo:"linear-gradient(160deg,#74C0FC,#E7F5FF)",oraciones:[{es:"En la Antártida vivía un pingüino llamado Pipo.",en:"In Antarctica lived a penguin named Pipo."},{es:"Miraba a las gaviotas volar y suspiraba.",en:"He watched the seagulls fly and sighed."},{es:"Yo también quiero volar por el cielo, decía.",en:"I want to fly through the sky too, he said."}]},
   {ilustracion:"🐧🍂😅",fondo:"linear-gradient(160deg,#A29BFE,#74B9FF)",oraciones:[{es:"Se hizo alas con hojas grandes y corrió saltando.",en:"He made wings from big leaves and ran jumping."},{es:"Saltó de una roca y plop, cayó en la nieve.",en:"He jumped from a rock and plop, fell in the snow."},{es:"Lo intentó muchas veces sin éxito.",en:"He tried many times without success."}]},
   {ilustracion:"🐧🌊🐟",fondo:"linear-gradient(160deg,#0984E3,#81ECEC)",oraciones:[{es:"Un día, persiguiendo un pez, se metió al mar.",en:"One day, chasing a fish, he dove into the sea."},{es:"Nadó tan rápido que parecía volar bajo el agua.",en:"He swam so fast he seemed to fly underwater."},{es:"¡Estoy volando! gritó feliz entre las olas.",en:"I'm flying! he shouted happily among the waves."}]},
   {ilustracion:"🐧😊❤️",fondo:"linear-gradient(160deg,#81ECEC,#A8E6CF)",oraciones:[{es:"Pipo comprendió que cada uno vuela a su manera.",en:"Pipo understood that everyone flies in their own way."},{es:"Que el mar era su cielo y las aletas sus alas.",en:"That the sea was his sky and his flippers his wings."},{es:"Y ahora nada más rápido que cualquier pez.",en:"And now he swims faster than any fish."}]}
],
  vocabulario:[{es:"pingüino",en:"penguin",img:"🐧"},{es:"volar",en:"to fly",img:"🪽"},{es:"mar",en:"sea",img:"🌊"},{es:"nieve",en:"snow",img:"❄️"},{es:"aleta",en:"flipper",img:"🐟"},{es:"nadar",en:"to swim",img:"🏊"}],
  preguntas:[
   {es:"¿Cómo se llamaba el pingüino?",en:"What was the penguin's name?",opciones:{es:["Pipo","Tito","Nube","Luna"],en:["Pipo","Tito","Cloud","Luna"]},correcta:0},
   {es:"¿Con qué se hizo alas?",en:"What did he make wings from?",opciones:{es:["Hojas","Papel","Plumas","Hielo"],en:["Leaves","Paper","Feathers","Ice"]},correcta:0},
   {es:"¿Dónde voló al final?",en:"Where did he fly at the end?",opciones:{es:["Bajo el mar","En el cielo","En la nieve","En un árbol"],en:["Under the sea","In the sky","In the snow","In a tree"]},correcta:0}
]});

SB_registrar(
 {id:"la-estrella-que-cayo-del-cielo",archivo:"",titulo:{es:"La Estrella que Cayó del Cielo",en:"The Star That Fell From the Sky"},categoria:"naturaleza",nivel:"primario",paginas:5,portada:"⭐",color:"#FDCB6E",destacado:true},
 {id:"la-estrella-que-cayo-del-cielo",titulo:{es:"La Estrella que Cayó del Cielo",en:"The Star That Fell From the Sky"},categoria:"naturaleza",nivel:"primario",color:"#FDCB6E",portada:"⭐",
  paginas:[
   {ilustracion:"⭐🌙✨",fondo:"linear-gradient(160deg,#2D1B69,#6C5CE7)",oraciones:[{es:"Una noche, una estrellita se cayó del cielo.",en:"One night, a little star fell from the sky."},{es:"Se llamaba Centella y brillaba muy poquito.",en:"Her name was Sparkle and she shone very dimly."},{es:"Quería volver arriba con sus hermanas.",en:"She wanted to go back up with her sisters."}]},
   {ilustracion:"⭐🧒🏠",fondo:"linear-gradient(160deg,#4D96FF,#9BF6FF)",oraciones:[{es:"Un niño llamado Leo la encontró en el jardín.",en:"A boy named Leo found her in the garden."},{es:"¿Estás bien? le preguntó con cuidado.",en:"Are you okay? he asked carefully."},{es:"Me caí y no puedo volar sola, respondió ella.",en:"I fell and can't fly alone, she answered."}]},
   {ilustracion:"⭐🧒🪁",fondo:"linear-gradient(160deg,#FF9F43,#FFD43B)",oraciones:[{es:"Leo la ató a un cometa para lanzarla al cielo.",en:"Leo tied her to a kite to launch her into the sky."},{es:"Corrió por el parque con el hilo en la mano.",en:"He ran through the park with the string in his hand."},{es:"Pero el viento no era suficiente esa noche.",en:"But the wind wasn't strong enough that night."}]},
   {ilustracion:"⭐🧒❤️🌙",fondo:"linear-gradient(160deg,#6C5CE7,#FF8FA3)",oraciones:[{es:"Leo la subió a lo más alto de un árbol.",en:"Leo carried her to the top of a tall tree."},{es:"Desde ahí, Centella vio a la luna cerca.",en:"From there, Sparkle saw the moon close by."},{es:"La luna la tomó de la mano y la ayudó a subir.",en:"The moon took her hand and helped her up."}]},
   {ilustracion:"⭐✨❤️",fondo:"linear-gradient(160deg,#2D1B69,#FDCB6E)",oraciones:[{es:"Centella volvió a brillar entre sus hermanas.",en:"Sparkle shone again among her sisters."},{es:"Cada noche saluda a Leo desde el cielo.",en:"Every night she waves to Leo from the sky."},{es:"Y Leo sabe que una estrella es su amiga.",en:"And Leo knows that one star is his friend."}]}
],
  vocabulario:[{es:"estrella",en:"star",img:"⭐"},{es:"cielo",en:"sky",img:"🌌"},{es:"luna",en:"moon",img:"🌙"},{es:"niño",en:"boy",img:"🧒"},{es:"cometa",en:"kite",img:"🪁"},{es:"amigo",en:"friend",img:"🤝"}],
  preguntas:[
   {es:"¿Cómo se llamaba la estrella?",en:"What was the star's name?",opciones:{es:["Centella","Luna","Sol","Nube"],en:["Sparkle","Luna","Sun","Cloud"]},correcta:0},
   {es:"¿Quién la encontró?",en:"Who found her?",opciones:{es:["Leo","Toby","Mimi","La abuela"],en:["Leo","Toby","Mimi","Grandma"]},correcta:0},
   {es:"¿Quién la ayudó a subir?",en:"Who helped her go up?",opciones:{es:["La luna","El viento","El árbol","El cometa"],en:["The moon","The wind","The tree","The kite"]},correcta:0}
]});

SB_registrar(
 {id:"el-monstruo-miedo-a-los-ninos",archivo:"",titulo:{es:"El Monstruo que Tenía Miedo a los Niños",en:"The Monster Who Was Afraid of Children"},categoria:"humor",nivel:"primario",paginas:6,portada:"👾",color:"#A29BFE",destacado:true},
 {id:"el-monstruo-miedo-a-los-ninos",titulo:{es:"El Monstruo que Tenía Miedo a los Niños",en:"The Monster Who Was Afraid of Children"},categoria:"humor",nivel:"primario",color:"#A29BFE",portada:"👾",
  paginas:[
   {ilustracion:"👾🏚️😱",fondo:"linear-gradient(160deg,#6C5CE7,#2D3436)",oraciones:[{es:"En una casa vieja vivía un monstruo llamado Peluso.",en:"In an old house lived a monster named Fluffy."},{es:"Era peludo, grande y tenía dientes enormes.",en:"He was furry, big, and had enormous teeth."},{es:"Pero le tenía pánico a los niños.",en:"But he was terrified of children."}]},
   {ilustracion:"👾🧒🎈",fondo:"linear-gradient(160deg,#A29BFE,#74B9FF)",oraciones:[{es:"Unos niños se mudaron a la casa de al lado.",en:"Some children moved into the house next door."},{es:"Peluso se escondía en el clóset todo el día.",en:"Fluffy hid in the closet all day."},{es:"Si escuchaba risas, temblaba de miedo.",en:"If he heard laughter, he trembled with fear."}]},
   {ilustracion:"👾🧸🧒",fondo:"linear-gradient(160deg,#FF7675,#FDCB6E)",oraciones:[{es:"Una niña perdió su osito de peluche.",en:"A little girl lost her teddy bear."},{es:"Estaba en el jardín de Peluso, bajo un arbusto.",en:"It was in Fluffy's garden, under a bush."},{es:"Peluso lo vio y quiso devolvérselo.",en:"Fluffy saw it and wanted to return it."}]},
   {ilustracion:"👾🧒❤️",fondo:"linear-gradient(160deg,#55EFC4,#81ECEC)",oraciones:[{es:"Con mucho miedo, se acercó a la niña.",en:"Very afraid, he approached the girl."},{es:"La niña lo miró y sonrió: ¡qué peludo tan lindo!",en:"The girl looked at him and smiled: What a cute furry!"},{es:"No tenía miedo, al contrario, le hizo cariño.",en:"She wasn't afraid, on the contrary, she petted him."}]},
   {ilustracion:"👾🧒🎉🎂",fondo:"linear-gradient(160deg,#FDCB6E,#FF9F43)",oraciones:[{es:"Los niños lo invitaron a su fiesta de cumpleaños.",en:"The children invited him to their birthday party."},{es:"Peluso comió torta y jugó a las escondidas.",en:"Fluffy ate cake and played hide and seek."},{es:"Se rió tanto que sus dientes brillaban.",en:"He laughed so much his teeth shone."}]},
   {ilustracion:"👾❤️🧒",fondo:"linear-gradient(160deg,#A29BFE,#FFEAA7)",oraciones:[{es:"Peluso comprendió que los niños no son malos.",en:"Fluffy understood that children aren't bad."},{es:"Que el miedo muchas veces es solo desconocimiento.",en:"That fear is often just not knowing."},{es:"Y ahora es el monstruo más querido del barrio.",en:"And now he is the most beloved monster in the neighborhood."}]}
],
  vocabulario:[{es:"monstruo",en:"monster",img:"👾"},{es:"miedo",en:"fear",img:"😱"},{es:"niños",en:"children",img:"🧒"},{es:"peluche",en:"stuffed toy",img:"🧸"},{es:"fiesta",en:"party",img:"🎉"},{es:"amigo",en:"friend",img:"🤝"}],
  preguntas:[
   {es:"¿Cómo se llamaba el monstruo?",en:"What was the monster's name?",opciones:{es:["Peluso","Diente","Terror","Sombra"],en:["Fluffy","Tooth","Terror","Shadow"]},correcta:0},
   {es:"¿De qué tenía miedo?",en:"What was he afraid of?",opciones:{es:["De los niños","De la oscuridad","De los perros","Del agua"],en:["Of children","Of the dark","Of dogs","Of water"]},correcta:0},
   {es:"¿Qué devolvió a la niña?",en:"What did he return to the girl?",opciones:{es:["Su osito de peluche","Un pastel","Un globo","Un libro"],en:["Her teddy bear","A cake","A balloon","A book"]},correcta:0},
   {es:"¿Qué comprendió?",en:"What did he understand?",opciones:{es:["El miedo es desconocimiento","Los niños son malos","Mejor esconderse","Las fiestas son aburridas"],en:["Fear is not knowing","Children are bad","Better hide","Parties are boring"]},correcta:0}
]});

SB_registrar(
 {id:"la-flor-del-desierto",archivo:"",titulo:{es:"La Flor que Crecía en el Desierto",en:"The Flower That Grew in the Desert"},categoria:"naturaleza",nivel:"inicial",paginas:4,portada:"🌵",color:"#E17055",destacado:true},
 {id:"la-flor-del-desierto",titulo:{es:"La Flor que Crecía en el Desierto",en:"The Flower That Grew in the Desert"},categoria:"naturaleza",nivel:"inicial",color:"#E17055",portada:"🌵",
  paginas:[
   {ilustracion:"🌵☀️🏜️",fondo:"linear-gradient(160deg,#FDCB6E,#E17055)",oraciones:[{es:"En medio del desierto, una semilla esperaba.",en:"In the middle of the desert, a seed waited."},{es:"Hacía mucho calor y casi no llovía nunca.",en:"It was very hot and it almost never rained."},{es:"Todos decían que nada podía crecer ahí.",en:"Everyone said nothing could grow there."}]},
   {ilustracion:"🌵💧🌱",fondo:"linear-gradient(160deg,#81ECEC,#55EFC4)",oraciones:[{es:"Una mañana cayó una sola gota de lluvia.",en:"One morning a single drop of rain fell."},{es:"La semilla la absorbió con toda su fuerza.",en:"The seed absorbed it with all its strength."},{es:"Poco a poco, un brote verde asomó de la arena.",en:"Little by little, a green sprout peeked from the sand."}]},
   {ilustracion:"🌵🌸🦋",fondo:"linear-gradient(160deg,#FF7675,#FDCB6E)",oraciones:[{es:"Creció despacio, guardando agua en su tallo.",en:"It grew slowly, storing water in its stem."},{es:"Un día abrió una flor rosa muy hermosa.",en:"One day it opened a beautiful pink flower."},{es:"Una mariposa viajera se detuvo a admirarla.",en:"A traveling butterfly stopped to admire it."}]},
   {ilustracion:"🌵❤️🌸",fondo:"linear-gradient(160deg,#E17055,#FFEAA7)",oraciones:[{es:"La flor comprendió que no hay lugar imposible.",en:"The flower understood there is no impossible place."},{es:"Que con paciencia, todo puede florecer.",en:"That with patience, everything can bloom."},{es:"Y cada primavera, el desierto se llena de color.",en:"And every spring, the desert fills with color."}]}
],
  vocabulario:[{es:"flor",en:"flower",img:"🌸"},{es:"desierto",en:"desert",img:"🏜️"},{es:"semilla",en:"seed",img:"🌰"},{es:"agua",en:"water",img:"💧"},{es:"paciencia",en:"patience",img:"⏳"},{es:"mariposa",en:"butterfly",img:"🦋"}],
  preguntas:[
   {es:"¿Dónde crecía la flor?",en:"Where did the flower grow?",opciones:{es:["En el desierto","En un jardín","En la montaña","En el mar"],en:["In the desert","In a garden","On the mountain","In the sea"]},correcta:0},
   {es:"¿Qué cayó una mañana?",en:"What fell one morning?",opciones:{es:["Una gota de lluvia","Una piedra","Un pájaro","Una semilla"],en:["A drop of rain","A stone","A bird","A seed"]},correcta:0},
   {es:"¿Qué aprendió?",en:"What did she learn?",opciones:{es:["Con paciencia todo florece","El desierto es feo","No hay que crecer","Las flores son débiles"],en:["With patience everything blooms","The desert is ugly","Don't grow","Flowers are weak"]},correcta:0}
]});

SB_registrar(
 {id:"el-barco-de-papel",archivo:"",titulo:{es:"El Barco de Papel que Cruzó el Océano",en:"The Paper Boat That Crossed the Ocean"},categoria:"aventura",nivel:"primario",paginas:5,portada:"⛵",color:"#0984E3",destacado:true},
 {id:"el-barco-de-papel",titulo:{es:"El Barco de Papel que Cruzó el Océano",en:"The Paper Boat That Crossed the Ocean"},categoria:"aventura",nivel:"primario",color:"#0984E3",portada:"⛵",
  paginas:[
   {ilustracion:"⛵🧒🌊",fondo:"linear-gradient(160deg,#74B9FF,#9BF6FF)",oraciones:[{es:"Un niño hizo un barco de papel azul.",en:"A boy made a blue paper boat."},{es:"Lo puso en el río y lo vio navegar.",en:"He put it in the river and watched it sail."},{es:"El barco se llamaba Viento y quería viajar.",en:"The boat was named Wind and wanted to travel."}]},
   {ilustracion:"⛵🌊🐟",fondo:"linear-gradient(160deg,#0984E3,#00B4D8)",oraciones:[{es:"El río lo llevó hasta el gran océano.",en:"The river carried it to the great ocean."},{es:"Vio ballenas, delfines y peces de colores.",en:"It saw whales, dolphins, and colorful fish."},{es:"Las olas lo mecían como una cuna.",en:"The waves rocked it like a cradle."}]},
   {ilustracion:"⛵🌪️😰",fondo:"linear-gradient(160deg,#636E72,#2D3436)",oraciones:[{es:"Una tormenta grande sacudió el mar.",en:"A big storm shook the sea."},{es:"Viento se dobló pero no se rompió.",en:"Wind bent but didn't break."},{es:"Su papel resistió porque era fuerte y delgado.",en:"Its paper held on because it was strong and thin."}]},
   {ilustracion:"⛵🏝️☀️",fondo:"linear-gradient(160deg,#FDCB6E,#55EFC4)",oraciones:[{es:"Después de la tormenta, llegó a una isla.",en:"After the storm, it reached an island."},{es:"Una niña lo encontró en la arena blanca.",en:"A girl found it in the white sand."},{es:"Dentro había una carta del niño que lo hizo.",en:"Inside was a letter from the boy who made it."}]},
   {ilustracion:"⛵❤️🌍",fondo:"linear-gradient(160deg,#0984E3,#FDCB6E)",oraciones:[{es:"La niña respondió la carta y envió otro barco.",en:"The girl answered the letter and sent another boat."},{es:"Así empezó una amistad entre dos continentes.",en:"Thus began a friendship between two continents."},{es:"Viento comprendió que los viajes unen corazones.",en:"Wind understood that journeys unite hearts."}]}
],
  vocabulario:[{es:"barco",en:"boat",img:"⛵"},{es:"papel",en:"paper",img:"📄"},{es:"océano",en:"ocean",img:"🌊"},{es:"viaje",en:"journey",img:"🧭"},{es:"amistad",en:"friendship",img:"🤝"},{es:"isla",en:"island",img:"🏝️"}],
  preguntas:[
   {es:"¿Cómo se llamaba el barco?",en:"What was the boat's name?",opciones:{es:["Viento","Azul","Río","Ola"],en:["Wind","Blue","River","Wave"]},correcta:0},
   {es:"¿Qué encontró dentro?",en:"What was found inside?",opciones:{es:["Una carta","Un tesoro","Una moneda","Una flor"],en:["A letter","A treasure","A coin","A flower"]},correcta:0},
   {es:"¿Qué comprendió?",en:"What did he understand?",opciones:{es:["Los viajes unen corazones","El papel es débil","El mar es peligroso","No hay que navegar"],en:["Journeys unite hearts","Paper is weak","The sea is dangerous","Don't sail"]},correcta:0}
]});

SB_registrar(
 {id:"el-gato-que-usaba-botas",archivo:"",titulo:{es:"El Gato que Usaba Botas",en:"The Cat Who Wore Boots"},categoria:"humor",nivel:"inicial",paginas:5,portada:"🐱",color:"#E84393",destacado:true},
 {id:"el-gato-que-usaba-botas",titulo:{es:"El Gato que Usaba Botas",en:"The Cat Who Wore Boots"},categoria:"humor",nivel:"inicial",color:"#E84393",portada:"🐱",
  paginas:[
   {ilustracion:"🐱👢🏠",fondo:"linear-gradient(160deg,#E84393,#FDCB6E)",oraciones:[{es:"Había un gato llamado Mishi que usaba botas.",en:"There was a cat named Mishi who wore boots."},{es:"Eran rojas, brillantes y le quedaban grandes.",en:"They were red, shiny, and too big for him."},{es:"Las usaba siempre, incluso para dormir.",en:"He wore them always, even to sleep."}]},
   {ilustracion:"🐱👢💃",fondo:"linear-gradient(160deg,#74B9FF,#A8E6CF)",oraciones:[{es:"Con las botas, Mishi bailaba muy bien.",en:"With the boots, Mishi danced very well."},{es:"Hacía piruetas en el jardín del vecino.",en:"He did pirouettes in the neighbor's garden."},{es:"Los pájaros lo miraban asombrados.",en:"The birds watched him in amazement."}]},
   {ilustracion:"🐱👢😿",fondo:"linear-gradient(160deg,#A29BFE,#DFE6E9)",oraciones:[{es:"Un día las botas se rompieron de tanto bailar.",en:"One day the boots broke from so much dancing."},{es:"Mishi se puso muy triste y no quiso salir.",en:"Mishi became very sad and didn't want to go out."},{es:"Pensaba que sin botas no podía bailar.",en:"He thought without boots he couldn't dance."}]},
   {ilustracion:"🐱😊💃",fondo:"linear-gradient(160deg,#55EFC4,#81ECEC)",oraciones:[{es:"Su amiga la gata lo invitó a bailar igual.",en:"His friend the cat invited him to dance anyway."},{es:"Mishi bailó sin botas y lo hizo genial.",en:"Mishi danced without boots and did great."},{es:"Comprendió que el talento está en él, no en las botas.",en:"He understood the talent is in him, not the boots."}]}
],
  vocabulario:[{es:"gato",en:"cat",img:"🐱"},{es:"botas",en:"boots",img:"👢"},{es:"bailar",en:"to dance",img:"💃"},{es:"talento",en:"talent",img:"⭐"},{es:"amigo",en:"friend",img:"🤝"},{es:"triste",en:"sad",img:"😿"}],
  preguntas:[
   {es:"¿Cómo se llamaba el gato?",en:"What was the cat's name?",opciones:{es:["Mishi","Toby","Luna","Nube"],en:["Mishi","Toby","Luna","Cloud"]},correcta:0},
   {es:"¿De qué color eran las botas?",en:"What color were the boots?",opciones:{es:["Rojas","Azules","Verdes","Amarillas"],en:["Red","Blue","Green","Yellow"]},correcta:0},
   {es:"¿Qué comprendió?",en:"What did he understand?",opciones:{es:["El talento está en él","Las botas son mágicas","No hay que bailar","Los gatos no bailan"],en:["The talent is in him","Boots are magic","Don't dance","Cats don't dance"]},correcta:0}
]});

SB_registrar(
 {id:"la-hormiga-gigante",archivo:"",titulo:{es:"La Hormiga que Quería ser Gigante",en:"The Ant Who Wanted to Be Giant"},categoria:"animales",nivel:"primario",paginas:5,portada:"🐜",color:"#00B894",destacado:true},
 {id:"la-hormiga-gigante",titulo:{es:"La Hormiga que Quería ser Gigante",en:"The Ant Who Wanted to Be Giant"},categoria:"animales",nivel:"primario",color:"#00B894",portada:"🐜",
  paginas:[
   {ilustracion:"🐜🌱👣",fondo:"linear-gradient(160deg,#55EFC4,#95D5B2)",oraciones:[{es:"Una hormiga llamada Chiqui quería ser gigante.",en:"An ant named Tiny wanted to be giant."},{es:"Todo le parecía enorme y ella muy pequeña.",en:"Everything seemed huge and she very small."},{es:"Soñaba con tocar las nubes con sus patas.",en:"She dreamed of touching the clouds with her legs."}]},
   {ilustracion:"🐜💪🍂",fondo:"linear-gradient(160deg,#FDCB6E,#FFEAA7)",oraciones:[{es:"Un día, una hoja enorme cayó sobre el hormiguero.",en:"One day, a huge leaf fell on the anthill."},{es:"Las otras hormigas no podían moverla.",en:"The other ants couldn't move it."},{es:"Chiqui organizó a todas en fila.",en:"Tiny organized all of them in a line."}]},
   {ilustracion:"🐜🐜🐜💪",fondo:"linear-gradient(160deg,#00B894,#55EFC4)",oraciones:[{es:"Juntas empujaron la hoja con mucha fuerza.",en:"Together they pushed the leaf with great force."},{es:"¡Lograron moverla y salvar el hormiguero!",en:"They managed to move it and save the anthill!"},{es:"Todas celebraron bajo tierra.",en:"They all celebrated underground."}]},
   {ilustracion:"🐜❤️😊",fondo:"linear-gradient(160deg,#95D5B2,#FDCB6E)",oraciones:[{es:"Chiqui comprendió que no hace falta ser grande.",en:"Tiny understood that you don't need to be big."},{es:"Que unidos, somos más fuertes que cualquier gigante.",en:"That united, we are stronger than any giant."},{es:"Y ahora es la líder más querida del hormiguero.",en:"And now she is the most beloved leader of the anthill."}]}
],
  vocabulario:[{es:"hormiga",en:"ant",img:"🐜"},{es:"grande",en:"big",img:"🐘"},{es:"unión",en:"unity",img:"🤝"},{es:"fuerza",en:"strength",img:"💪"},{es:"hoja",en:"leaf",img:"🍃"},{es:"líder",en:"leader",img:"👑"}],
  preguntas:[
   {es:"¿Cómo se llamaba la hormiga?",en:"What was the ant's name?",opciones:{es:["Chiqui","Gigante","Fuerte","Reina"],en:["Tiny","Giant","Strong","Queen"]},correcta:0},
   {es:"¿Qué cayó sobre el hormiguero?",en:"What fell on the anthill?",opciones:{es:["Una hoja enorme","Una piedra","Un zapato","Un palo"],en:["A huge leaf","A stone","A shoe","A stick"]},correcta:0},
   {es:"¿Qué aprendió?",en:"What did she learn?",opciones:{es:["Unidos somos más fuertes","Hay que ser grande","Las hojas son pesadas","Los gigantes existen"],en:["United we are stronger","You must be big","Leaves are heavy","Giants exist"]},correcta:0}
]});

SB_registrar(
 {id:"el-zapato-perdido",archivo:"",titulo:{es:"El Zapato que Perdió a su Pareja",en:"The Shoe Who Lost Its Partner"},categoria:"humor",nivel:"inicial",paginas:4,portada:"👟",color:"#0984E3",destacado:true},
 {id:"el-zapato-perdido",titulo:{es:"El Zapato que Perdió a su Pareja",en:"The Shoe Who Lost Its Partner"},categoria:"humor",nivel:"inicial",color:"#0984E3",portada:"👟",
  paginas:[
   {ilustracion:"👟👟🏠",fondo:"linear-gradient(160deg,#74B9FF,#DFE6E9)",oraciones:[{es:"En un ropero vivían dos zapatos iguales.",en:"In a closet lived two identical shoes."},{es:"Eran inseparables, iban a todos lados juntos.",en:"They were inseparable, went everywhere together."},{es:"Se llamaban Izquierdo y Derecho.",en:"They were called Left and Right."}]},
   {ilustracion:"👟😢🔍",fondo:"linear-gradient(160deg,#A29BFE,#74B9FF)",oraciones:[{es:"Un día, Derecho desapareció de la caja.",en:"One day, Right disappeared from the box."},{es:"Izquierdo lo buscó por toda la casa.",en:"Left searched the whole house for him."},{es:"Debajo de la cama, atrás del sofá, en el baño.",en:"Under the bed, behind the sofa, in the bathroom."}]},
   {ilustracion:"👟🐶🦴",fondo:"linear-gradient(160deg,#FDCB6E,#FF7675)",oraciones:[{es:"Lo encontró en el jardín, con el perro.",en:"He found him in the garden, with the dog."},{es:"El perro lo usaba como juguete para morder.",en:"The dog was using him as a chew toy."},{es:"¡Socorro! gritaba Derecho asustado.",en:"Help! shouted Right, scared."}]},
   {ilustracion:"👟👟❤️",fondo:"linear-gradient(160deg,#55EFC4,#81ECEC)",oraciones:[{es:"Izquierdo lo rescató y volvieron juntos.",en:"Left rescued him and they were together again."},{es:"Desde entonces duermen abrazados en la caja.",en:"Ever since they sleep hugging in the box."},{es:"Y el perro tiene su propio hueso para morder.",en:"And the dog has his own bone to chew."}]}
],
  vocabulario:[{es:"zapato",en:"shoe",img:"👟"},{es:"pareja",en:"pair",img:"👟"},{es:"perro",en:"dog",img:"🐶"},{es:"buscar",en:"to search",img:"🔍"},{es:"juntos",en:"together",img:"🤝"},{es:"hogar",en:"home",img:"🏠"}],
  preguntas:[
   {es:"¿Cómo se llamaban los zapatos?",en:"What were the shoes called?",opciones:{es:["Izquierdo y Derecho","Grande y Chico","Rojo y Azul","Arriba y Abajo"],en:["Left and Right","Big and Small","Red and Blue","Up and Down"]},correcta:0},
   {es:"¿Dónde encontró al otro?",en:"Where did he find the other?",opciones:{es:["En el jardín con el perro","En la cocina","En el baño","En el techo"],en:["In the garden with the dog","In the kitchen","In the bathroom","On the roof"]},correcta:0},
   {es:"¿Qué usaba el perro?",en:"What was the dog using?",opciones:{es:["El zapato como juguete","Un hueso","Una pelota","Un pan"],en:["The shoe as a toy","A bone","A ball","Bread"]},correcta:0}
]});

SB_registrar(
 {id:"la-biblioteca-magica",archivo:"",titulo:{es:"La Biblioteca Mágica",en:"The Magic Library"},categoria:"aventura",nivel:"primario",paginas:6,portada:"📚",color:"#6C5CE7",destacado:true},
 {id:"la-biblioteca-magica",titulo:{es:"La Biblioteca Mágica",en:"The Magic Library"},categoria:"aventura",nivel:"primario",color:"#6C5CE7",portada:"📚",
  paginas:[
   {ilustracion:"📚🧒🔮",fondo:"linear-gradient(160deg,#6C5CE7,#A29BFE)",oraciones:[{es:"Sofía encontró una biblioteca escondida en el parque.",en:"Sofia found a hidden library in the park."},{es:"La puerta era de madera vieja con letras doradas.",en:"The door was old wood with golden letters."},{es:"Al entrar, los libros volaban solos por el aire.",en:"Inside, books flew through the air by themselves."}]},
   {ilustracion:"📚🐉✨",fondo:"linear-gradient(160deg,#E17055,#FDCB6E)",oraciones:[{es:"Abrió un libro de dragones y uno salió de las páginas.",en:"She opened a book of dragons and one came out of the pages."},{es:"No era feroz, al contrario, era muy tierno.",en:"He wasn't fierce, on the contrary, he was very tender."},{es:"La invitó a volar sobre los estantes.",en:"He invited her to fly over the shelves."}]},
   {ilustracion:"📚🚀🌌",fondo:"linear-gradient(160deg,#2D1B69,#4D96FF)",oraciones:[{es:"Después abrió un libro del espacio.",en:"Then she opened a book about space."},{es:"Viajó a Saturno y bailó con sus anillos.",en:"She traveled to Saturn and danced with its rings."},{es:"Los aliens le regalaron una piedra brillante.",en:"The aliens gave her a shiny stone."}]},
   {ilustracion:"📚⏰😮",fondo:"linear-gradient(160deg,#FF7675,#FDCB6E)",oraciones:[{es:"Un reloj mágico le avisó que era tarde.",en:"A magic clock warned her it was late."},{es:"Volvió a casa justo antes de la cena.",en:"She returned home just before dinner."},{es:"Guardó la piedra brillante bajo la almohada.",en:"She kept the shiny stone under her pillow."}]},
   {ilustracion:"📚❤️🧒",fondo:"linear-gradient(160deg,#A29BFE,#FFEAA7)",oraciones:[{es:"Cada tarde, Sofía vuelve a la biblioteca.",en:"Every afternoon, Sofia returns to the library."},{es:"Lee un libro nuevo y vive una aventura.",en:"She reads a new book and lives an adventure."},{es:"Comprendió que los libros son puertas mágicas.",en:"She learned that books are magic doors."}]}
],
  vocabulario:[{es:"libro",en:"book",img:"📚"},{es:"biblioteca",en:"library",img:"🏛️"},{es:"magia",en:"magic",img:"🪄"},{es:"aventura",en:"adventure",img:"🗺️"},{es:"dragón",en:"dragon",img:"🐉"},{es:"leer",en:"to read",img:"📖"}],
  preguntas:[
   {es:"¿Cómo se llamaba la niña?",en:"What was the girl's name?",opciones:{es:["Sofía","Maya","Luna","Mimi"],en:["Sofia","Maya","Luna","Mimi"]},correcta:0},
   {es:"¿Qué salió del primer libro?",en:"What came out of the first book?",opciones:{es:["Un dragón tierno","Un monstruo","Un pirata","Un robot"],en:["A tender dragon","A monster","A pirate","A robot"]},correcta:0},
   {es:"¿A dónde viajó con el segundo libro?",en:"Where did she travel with the second book?",opciones:{es:["A Saturno","A la luna","Al mar","Al desierto"],en:["To Saturn","To the moon","To the sea","To the desert"]},correcta:0},
   {es:"¿Qué comprendió?",en:"What did she understand?",opciones:{es:["Los libros son puertas mágicas","Las bibliotecas son aburridas","Los dragones son malos","No hay que leer"],en:["Books are magic doors","Libraries are boring","Dragons are bad","Don't read"]},correcta:0}
]});

SB_registrar(
 {id:"el-perdon-de-los-amigos",archivo:"",titulo:{es:"El Perdón de los Amigos",en:"The Forgiveness of Friends"},categoria:"amigos",nivel:"inicial",paginas:4,portada:"🤝",color:"#00CEC9",destacado:true},
 {id:"el-perdon-de-los-amigos",titulo:{es:"El Perdón de los Amigos",en:"The Forgiveness of Friends"},categoria:"amigos",nivel:"inicial",color:"#00CEC9",portada:"🤝",
  paginas:[
   {ilustracion:"🧒🧒🎈❤️",fondo:"linear-gradient(160deg,#55EFC4,#81ECEC)",oraciones:[{es:"Tomás y Benito eran mejores amigos del mundo.",en:"Tomas and Benito were best friends in the world."},{es:"Jugaban todos los días en el parque.",en:"They played every day in the park."},{es:"Se turnaban el globo rojo que querían los dos.",en:"They took turns with the red balloon they both wanted."}]},
   {ilustracion:"🧒😡🧒💔",fondo:"linear-gradient(160deg,#FF7675,#FAB1A0)",oraciones:[{es:"Un día, el globo se rompió y se pelearon.",en:"One day, the balloon broke and they fought."},{es:"Cada uno culpaba al otro del accidente.",en:"Each blamed the other for the accident."},{es:"No se hablaron durante toda una semana.",en:"They didn't speak for a whole week."}]},
   {ilustracion:"🧒🍪❤️🧒",fondo:"linear-gradient(160deg,#FDCB6E,#FFEAA7)",oraciones:[{es:"Tomás hizo una tarjeta con dibujos y galletas.",en:"Tomas made a card with drawings and cookies."},{es:"Se la llevó a Benito para pedirle perdón.",en:"He brought it to Benito to ask for forgiveness."},{es:"Benito también tenía un regalo para Tomás.",en:"Benito also had a gift for Tomas."}]},
   {ilustracion:"🧒🧒🎈❤️",fondo:"linear-gradient(160deg,#00CEC9,#55EFC4)",oraciones:[{es:"Se abrazaron y se perdonaron muy fuerte.",en:"They hugged and forgave each other tightly."},{es:"Compraron un globo nuevo entre los dos.",en:"They bought a new balloon together."},{es:"Comprendieron que la amistad vale más que un globo.",en:"They learned that friendship is worth more than a balloon."}]}
],
  vocabulario:[{es:"amigo",en:"friend",img:"🤝"},{es:"perdón",en:"forgiveness",img:"❤️"},{es:"pelea",en:"fight",img:"😡"},{es:"amistad",en:"friendship",img:"💖"},{es:"globos",en:"balloons",img:"🎈"},{es:"abrazo",en:"hug",img:"🤗"}],
  preguntas:[
   {es:"¿Cómo se llamaban los amigos?",en:"What were the friends' names?",opciones:{es:["Tomás y Benito","Leo y Max","Lucas y Toby","Pipo y Tito"],en:["Tomas and Benito","Leo and Max","Lucas and Toby","Pipo and Tito"]},correcta:0},
   {es:"¿Por qué se pelearon?",en:"Why did they fight?",opciones:{es:["Se rompió el globo","Por un juguete","Por un helado","Por un libro"],en:["The balloon broke","Over a toy","Over ice cream","Over a book"]},correcta:0},
   {es:"¿Qué hicieron al final?",en:"What did they do at the end?",opciones:{es:["Se perdonaron y abrazaron","Se fueron enojados","No se hablaron más","Lloraron"],en:["They forgave and hugged","Left angry","Never spoke again","Cried"]},correcta:0}
]});

SB_registrar(
 {id:"el-arcoiris-perdio-colores",archivo:"",titulo:{es:"El Arcoíris que Perdió sus Colores",en:"The Rainbow Who Lost Its Colors"},categoria:"naturaleza",nivel:"primario",paginas:5,portada:"🌈",color:"#E84393",destacado:true},
 {id:"el-arcoiris-perdio-colores",titulo:{es:"El Arcoíris que Perdió sus Colores",en:"The Rainbow Who Lost Its Colors"},categoria:"naturaleza",nivel:"primario",color:"#E84393",portada:"🌈",
  paginas:[
   {ilustracion:"🌈😢☁️",fondo:"linear-gradient(160deg,#DFE6E9,#B2BEC3)",oraciones:[{es:"Después de la lluvia, el arcoíris salió pálido.",en:"After the rain, the rainbow came out pale."},{es:"Había perdido todos sus colores brillantes.",en:"It had lost all its bright colors."},{es:"Estaba gris y triste en el cielo.",en:"It was gray and sad in the sky."}]},
   {ilustracion:"🌻☀️💛",fondo:"linear-gradient(160deg,#FDCB6E,#FFEAA7)",oraciones:[{es:"El sol le dio un poco de amarillo dorado.",en:"The sun gave it a little golden yellow."},{es:"Las flores le dieron rojo y rosa intenso.",en:"The flowers gave it red and bright pink."},{es:"El mar le prestó su azul más profundo.",en:"The sea lent it its deepest blue."}]},
   {ilustracion:"🌿🍃💚",fondo:"linear-gradient(160deg,#55EFC4,#95D5B2)",oraciones:[{es:"Los árboles le dieron verde para el medio.",en:"The trees gave it green for the middle."},{es:"Las uvas del viñedo le dieron violeta.",en:"The grapes from the vineyard gave it violet."},{es:"Las naranjas maduras le dieron naranja.",en:"Ripe oranges gave it orange."}]},
   {ilustracion:"🌈✨❤️",fondo:"linear-gradient(160deg,#E84393,#FDCB6E)",oraciones:[{es:"Poco a poco, el arcoíris recuperó sus colores.",en:"Little by little, the rainbow got its colors back."},{es:"Brillaba más hermoso que nunca en el cielo.",en:"It shone more beautifully than ever in the sky."},{es:"Todos los niños salieron a mirarlo felices.",en:"All the children came out to look at it happily."}]},
   {ilustracion:"🌈❤️🌍",fondo:"linear-gradient(160deg,#6C5CE7,#FF7675)",oraciones:[{es:"El arcoíris comprendió que los colores vienen de la naturaleza.",en:"The rainbow learned that colors come from nature."},{es:"Que todos juntos formamos algo hermoso.",en:"That all together we form something beautiful."},{es:"Y cada lluvia trae un nuevo arcoíris de colores.",en:"And every rain brings a new rainbow of colors."}]}
],
  vocabulario:[{es:"arcoíris",en:"rainbow",img:"🌈"},{es:"colores",en:"colors",img:"🎨"},{es:"sol",en:"sun",img:"☀️"},{es:"naturaleza",en:"nature",img:"🌿"},{es:"mar",en:"sea",img:"🌊"},{es:"flores",en:"flowers",img:"🌸"}],
  preguntas:[
   {es:"¿Qué le pasó al arcoíris?",en:"What happened to the rainbow?",opciones:{es:["Perdió sus colores","Se rompió","Se cayó","Se escondió"],en:["Lost its colors","Broke","Fell","Hid"]},correcta:0},
   {es:"¿Quién le dio amarillo?",en:"Who gave it yellow?",opciones:{es:["El sol","Las flores","El mar","Los árboles"],en:["The sun","Flowers","The sea","Trees"]},correcta:0},
   {es:"¿Qué le dio el mar?",en:"What did the sea give?",opciones:{es:["Azul profundo","Verde","Rojo","Violeta"],en:["Deep blue","Green","Red","Violet"]},correcta:0},
   {es:"¿Qué comprendió?",en:"What did he learn?",opciones:{es:["Los colores vienen de la naturaleza","Los arcoíris son feos","No hay que llover","Los colores no importan"],en:["Colors come from nature","Rainbows are ugly","Don't rain","Colors don't matter"]},correcta:0}
]});

/* ============================================================
   2) CSS PREMIUM INYECTADO (reemplaza storybooks.css)
   ============================================================ */
(function(){
  if (window.__SB_CSS_PREMIUM) return; window.__SB_CSS_PREMIUM = true;
  var css = `
  :root{
    --sb-bg:#FFF7ED; --sb-bg2:#FFEDD5; --sb-card:#FFFFFF;
    --sb-text:#3D2C1E; --sb-muted:#8B7355; --sb-accent:#FF9F43;
    --sb-accent2:#FF6B9D; --sb-secondary:#4D96FF; --sb-gold:#FFD43B;
    --sb-green:#00B894; --sb-red:#FA5252; --sb-purple:#6C5CE7;
    --sb-radius:22px; --sb-shadow:0 10px 30px rgba(61,44,30,.12);
    --sb-shadow-hover:0 18px 40px rgba(61,44,30,.2);
    --sb-font:'Nunito','Baloo 2','Comic Sans MS',system-ui,sans-serif;
  }
  .sb-root{font-family:var(--sb-font);color:var(--sb-text);background:
    radial-gradient(1200px 600px at 10% -10%,#FFE8CC 0%,transparent 60%),
    radial-gradient(1000px 500px at 110% 10%,#FFD6E8 0%,transparent 55%),
    linear-gradient(180deg,var(--sb-bg) 0%,var(--sb-bg2) 100%);
    min-height:100%;padding:18px 16px 40px;box-sizing:border-box;border-radius:24px;}
  /* Header */
  .sb-header{display:flex;align-items:center;gap:12px;margin-bottom:16px;}
  .sb-title{font-size:24px;font-weight:900;margin:0;line-height:1.1;
    background:linear-gradient(90deg,#FF6B9D,#FF9F43,#FFD43B);
    -webkit-background-clip:text;background-clip:text;color:transparent;}
  .sb-subtitle{margin:2px 0 0;font-size:13px;color:var(--sb-muted);font-weight:700;}
  .sb-btn-back{width:46px;height:46px;border:none;border-radius:50%;background:#fff;
    font-size:20px;font-weight:900;color:var(--sb-text);cursor:pointer;flex:0 0 auto;
    box-shadow:var(--sb-shadow);transition:transform .2s,box-shadow .2s;}
  .sb-btn-back:hover{transform:translateX(-3px) scale(1.05);box-shadow:var(--sb-shadow-hover);}
  .sb-toggle{border:none;border-radius:999px;padding:8px 16px;font-weight:800;font-size:13px;
    cursor:pointer;background:#fff;color:var(--sb-text);box-shadow:0 4px 12px rgba(0,0,0,.08);
    transition:all .2s;font-family:var(--sb-font);}
  .sb-toggle.on{background:linear-gradient(135deg,var(--sb-accent),var(--sb-accent2));color:#fff;
    box-shadow:0 6px 16px rgba(255,107,157,.4);}
  .sb-toggle:active{transform:scale(.94);}
  /* Tabs */
  .sb-tabs{display:flex;gap:8px;background:rgba(255,255,255,.7);padding:6px;border-radius:18px;
    margin-bottom:14px;backdrop-filter:blur(8px);box-shadow:inset 0 2px 6px rgba(0,0,0,.05);}
  .sb-tab{flex:1;border:none;background:transparent;padding:10px 6px;border-radius:14px;
    font-weight:800;font-size:13px;color:var(--sb-muted);cursor:pointer;font-family:var(--sb-font);
    transition:all .25s;}
  .sb-tab.active{background:#fff;color:var(--sb-text);box-shadow:0 4px 12px rgba(0,0,0,.1);
    transform:translateY(-1px);}
  /* Search */
  .sb-search-wrap{position:relative;margin-bottom:14px;}
  .sb-search-icon{position:absolute;left:16px;top:50%;transform:translateY(-50%);font-size:16px;opacity:.5;}
  .sb-search{width:100%;box-sizing:border-box;padding:14px 16px 14px 44px;border-radius:18px;
    border:2px solid transparent;background:#fff;font-size:15px;font-weight:700;font-family:var(--sb-font);
    box-shadow:var(--sb-shadow);transition:all .2s;color:var(--sb-text);}
  .sb-search:focus{outline:none;border-color:var(--sb-accent);box-shadow:0 0 0 4px rgba(255,159,67,.2);}
  /* Chips categorías */
  .sb-chips{display:flex;gap:8px;overflow-x:auto;padding-bottom:8px;margin-bottom:14px;scrollbar-width:none;}
  .sb-chips::-webkit-scrollbar{display:none;}
  .sb-chip{flex:0 0 auto;border:none;padding:9px 16px;border-radius:999px;background:#fff;
    font-weight:800;font-size:13px;color:var(--sb-text);cursor:pointer;font-family:var(--sb-font);
    box-shadow:0 3px 10px rgba(0,0,0,.08);transition:all .2s;white-space:nowrap;}
  .sb-chip.active{background:linear-gradient(135deg,var(--sb-secondary),var(--sb-purple));color:#fff;
    transform:scale(1.05);box-shadow:0 6px 16px rgba(77,150,255,.4);}
  /* Grid de libros */
  .sb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px;}
  .sb-book-card{position:relative;background:var(--sb-card);border-radius:var(--sb-radius);
    overflow:hidden;cursor:pointer;box-shadow:var(--sb-shadow);transition:all .3s cubic-bezier(.34,1.56,.64,1);
    border:3px solid transparent;}
  .sb-book-card:hover{transform:translateY(-6px) scale(1.02);box-shadow:var(--sb-shadow-hover);
    border-color:var(--sb-accent);}
  .sb-fav-btn{position:absolute;top:8px;right:8px;z-index:2;width:36px;height:36px;border:none;
    border-radius:50%;background:rgba(255,255,255,.9);font-size:16px;cursor:pointer;
    box-shadow:0 3px 8px rgba(0,0,0,.15);transition:transform .2s;}
  .sb-fav-btn:active{transform:scale(1.3);}
  .sb-book-cover{height:130px;display:flex;align-items:center;justify-content:center;font-size:64px;
    position:relative;overflow:hidden;}
  .sb-book-cover::after{content:'';position:absolute;inset:0;
    background:linear-gradient(180deg,transparent 60%,rgba(0,0,0,.08));}
  .sb-book-info{padding:10px 12px 14px;}
  .sb-book-title{font-size:14px;font-weight:900;margin:0 0 6px;line-height:1.2;
    display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:34px;}
  .sb-book-meta{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:700;color:var(--sb-muted);
    margin-bottom:8px;flex-wrap:wrap;}
  .sb-badge{padding:2px 8px;border-radius:999px;color:#fff;font-size:10px;font-weight:800;}
  .sb-progress-bar{height:8px;background:#F0E6D8;border-radius:99px;overflow:hidden;}
  .sb-progress-fill{height:100%;background:linear-gradient(90deg,var(--sb-green),var(--sb-gold));
    border-radius:99px;transition:width .5s cubic-bezier(.34,1.56,.64,1);}
  /* Estados vacíos / loader */
  .sb-empty{text-align:center;padding:40px 20px;color:var(--sb-muted);font-weight:800;font-size:15px;}
  .sb-empty .big{font-size:56px;display:block;margin-bottom:12px;animation:sb-bounce 2s infinite;}
  @keyframes sb-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  .sb-loader{text-align:center;padding:50px;font-weight:800;color:var(--sb-muted);}
  .sb-spinner{width:50px;height:50px;border:5px solid #FFE8CC;border-top-color:var(--sb-accent);
    border-radius:50%;margin:0 auto 16px;animation:sb-spin 1s linear infinite;}
  @keyframes sb-spin{to{transform:rotate(360deg)}}
  .sb-action-btn{border:none;padding:12px 20px;border-radius:16px;font-weight:900;font-size:14px;
    cursor:pointer;font-family:var(--sb-font);transition:all .2s;box-shadow:0 6px 14px rgba(0,0,0,.12);}
  .sb-action-btn:active{transform:scale(.95);}
  .sb-action-btn.primary{background:linear-gradient(135deg,var(--sb-accent),#FF6B35);color:#fff;}
  .sb-action-btn.secondary{background:linear-gradient(135deg,var(--sb-secondary),var(--sb-purple));color:#fff;}
  .sb-action-btn.accent{background:linear-gradient(135deg,var(--sb-accent2),#FF8FA3);color:#fff;}
  .sb-action-btn.ghost{background:#fff;color:var(--sb-text);}
  .sb-action-row{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;}
  /* Toast */
  .sb-toast{position:fixed;left:50%;bottom:30px;transform:translateX(-50%) translateY(100px);
    background:linear-gradient(135deg,#3D2C1E,#5B4636);color:#fff;padding:14px 24px;border-radius:999px;
    font-weight:800;font-size:14px;z-index:9999;box-shadow:0 10px 30px rgba(0,0,0,.3);
    animation:sb-toast-in .3s forwards;font-family:var(--sb-font);}
  @keyframes sb-toast-in{to{transform:translateX(-50%) translateY(0)}}
  /* Lector */
  .sb-reader{background:rgba(255,255,255,.85);backdrop-filter:blur(10px);border-radius:var(--sb-radius);
    padding:16px;box-shadow:var(--sb-shadow);margin-bottom:14px;}
  .sb-page-illustration{height:180px;border-radius:18px;display:flex;align-items:center;justify-content:center;
    font-size:80px;margin-bottom:14px;position:relative;overflow:hidden;
    box-shadow:inset 0 2px 10px rgba(0,0,0,.1);animation:sb-fadein .6s;}
  @keyframes sb-fadein{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
  .sb-page-text{display:flex;flex-direction:column;gap:10px;margin-bottom:14px;}
  .sb-sentence{display:flex;align-items:center;gap:8px;background:#fff;border-radius:16px;padding:12px 14px;
    box-shadow:0 3px 10px rgba(0,0,0,.06);transition:all .25s;cursor:pointer;border:2px solid transparent;}
  .sb-sentence:hover{border-color:var(--sb-accent);transform:translateX(4px);}
  .sb-sentence.playing{border-color:var(--sb-accent2);background:#FFF0F5;
    box-shadow:0 0 0 4px rgba(255,107,157,.15);transform:scale(1.01);}
  .sb-sentence-text{flex:1;font-size:17px;font-weight:700;line-height:1.5;}
  .sb-sentence-translation{display:block;font-size:13px;color:var(--sb-muted);font-weight:600;margin-top:4px;
    font-style:italic;}
  .sb-speak-btn{flex:0 0 auto;width:38px;height:38px;border:none;border-radius:50%;
    background:linear-gradient(135deg,var(--sb-accent),#FF6B35);color:#fff;font-size:15px;cursor:pointer;
    box-shadow:0 4px 10px rgba(255,159,67,.4);transition:transform .15s;}
  .sb-speak-btn.secondary{background:linear-gradient(135deg,var(--sb-secondary),var(--sb-purple));
    box-shadow:0 4px 10px rgba(77,150,255,.4);}
  .sb-speak-btn:active{transform:scale(.85);}
  .sb-mic-btn{flex:0 0 auto;width:38px;height:38px;border:none;border-radius:50%;
    background:linear-gradient(135deg,var(--sb-green),#00D9A8);color:#fff;font-size:15px;cursor:pointer;
    box-shadow:0 4px 10px rgba(0,184,148,.4);transition:transform .15s;display:flex;align-items:center;justify-content:center;}
  .sb-mic-btn:active{transform:scale(.85);}
  .sb-word{cursor:pointer;border-radius:6px;padding:0 2px;transition:background .2s,transform .2s;
    display:inline-block;}
  .sb-word:hover{background:#FFF1DE;transform:translateY(-1px);}
  .sb-word.hl{background:var(--sb-gold);color:#7c2d12;border-radius:6px;
    box-shadow:0 0 0 3px rgba(255,212,59,.4);animation:sb-pulse .5s;}
  @keyframes sb-pulse{0%{transform:scale(1)}50%{transform:scale(1.15)}100%{transform:scale(1)}}
  .sb-sil{font-weight:900;}
  .sb-hint{background:linear-gradient(135deg,#FFF1DE,#FFE8CC);border:2px dashed var(--sb-accent);
    border-radius:14px;padding:10px 14px;margin-bottom:10px;font-size:14px;font-weight:800;text-align:center;
    color:#E8892C;animation:sb-shake 2s infinite;}
  @keyframes sb-shake{0%,100%{transform:rotate(0)}25%{transform:rotate(-1deg)}75%{transform:rotate(1deg)}}
  .sb-toggle-row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:14px;}
  .sb-reader-controls{display:flex;align-items:center;gap:10px;justify-content:space-between;}
  .sb-nav-btn{border:none;padding:12px 20px;border-radius:16px;font-weight:900;font-size:14px;cursor:pointer;
    font-family:var(--sb-font);transition:all .2s;box-shadow:0 6px 14px rgba(0,0,0,.12);}
  .sb-nav-btn.prev{background:#fff;color:var(--sb-text);}
  .sb-nav-btn.next{background:linear-gradient(135deg,var(--sb-accent),var(--sb-accent2));color:#fff;}
  .sb-nav-btn:disabled{opacity:.4;cursor:not-allowed;}
  .sb-nav-btn:active:not(:disabled){transform:scale(.95);}
  .sb-page-indicator{font-weight:900;font-size:14px;color:var(--sb-muted);background:#fff;padding:6px 14px;
    border-radius:99px;box-shadow:0 3px 8px rgba(0,0,0,.08);}
  .sb-page-enter{animation:sb-page-enter .4s cubic-bezier(.34,1.56,.64,1);}
  @keyframes sb-page-enter{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
  /* Vocabulario */
  .sb-vocab-grid{display:grid;gap:10px;}
  .sb-vocab-card{display:flex;align-items:center;gap:12px;background:#fff;border-radius:16px;padding:12px 14px;
    box-shadow:0 3px 10px rgba(0,0,0,.06);transition:transform .2s;}
  .sb-vocab-card:hover{transform:translateX(4px);}
  .sb-vocab-img{font-size:36px;flex:0 0 auto;width:56px;height:56px;display:flex;align-items:center;justify-content:center;
    background:linear-gradient(135deg,#FFF1DE,#FFE8CC);border-radius:14px;}
  .sb-vocab-words{flex:1;}
  .sb-vocab-es{font-weight:900;font-size:16px;}
  .sb-vocab-en{font-size:13px;color:var(--sb-muted);font-weight:700;}
  .sb-vocab-speak{width:38px;height:38px;border:none;border-radius:50%;
    background:linear-gradient(135deg,var(--sb-accent),#FF6B35);color:#fff;font-size:15px;cursor:pointer;
    box-shadow:0 4px 10px rgba(255,159,67,.4);}
  /* Quiz */
  .sb-quiz{padding:10px 0;}
  .sb-quiz-q{font-size:18px;font-weight:900;margin-bottom:16px;line-height:1.4;text-align:center;}
  .sb-quiz-options{display:grid;gap:10px;}
  .sb-quiz-opt{border:none;background:#fff;padding:16px;border-radius:16px;font-weight:800;font-size:15px;
    cursor:pointer;font-family:var(--sb-font);box-shadow:0 4px 12px rgba(0,0,0,.08);transition:all .2s;
    text-align:left;color:var(--sb-text);border:3px solid transparent;}
  .sb-quiz-opt:hover:not(:disabled){transform:translateX(6px);border-color:var(--sb-secondary);}
  .sb-quiz-opt.correct{background:linear-gradient(135deg,var(--sb-green),#00D9A8);color:#fff;
    animation:sb-correct .5s;}
  .sb-quiz-opt.wrong{background:linear-gradient(135deg,var(--sb-red),#FF8787);color:#fff;
    animation:sb-wrong .4s;}
  @keyframes sb-correct{0%{transform:scale(1)}50%{transform:scale(1.05)}100%{transform:scale(1)}}
  @keyframes sb-wrong{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}
  .sb-quiz-feedback{text-align:center;font-weight:900;font-size:16px;margin-top:14px;min-height:24px;}
  /* Match / memoria */
  .sb-match-hud{text-align:center;font-weight:900;font-size:14px;color:var(--sb-muted);margin-bottom:12px;
    background:#fff;padding:8px 16px;border-radius:99px;display:inline-block;box-shadow:0 3px 8px rgba(0,0,0,.08);}
  .sb-match-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
  .sb-match-card{aspect-ratio:1;border:none;border-radius:16px;font-size:28px;font-weight:900;cursor:pointer;
    font-family:var(--sb-font);background:linear-gradient(135deg,var(--sb-gold),#FFB84D);color:#fff;
    box-shadow:0 4px 12px rgba(0,0,0,.12);transition:all .3s;display:flex;align-items:center;justify-content:center;
    padding:6px;}
  .sb-match-card:not(.matched):not(:disabled):hover{transform:scale(1.05) rotate(-2deg);}
  .sb-match-card.revelada{background:#fff;color:var(--sb-text);}
  .sb-match-card.matched{background:linear-gradient(135deg,var(--sb-green),#00D9A8);color:#fff;
    animation:sb-match-pop .5s;}
  @keyframes sb-match-pop{0%{transform:scale(.8)}50%{transform:scale(1.1)}100%{transform:scale(1)}}
  /* Fin / trophy */
  .sb-finish{text-align:center;padding:30px 20px;background:rgba(255,255,255,.9);border-radius:var(--sb-radius);
    box-shadow:var(--sb-shadow);}
  .sb-finish .trophy{font-size:72px;display:block;margin-bottom:12px;animation:sb-trophy 1.5s infinite;}
  @keyframes sb-trophy{0%,100%{transform:rotate(-5deg) scale(1)}50%{transform:rotate(5deg) scale(1.1)}}
  .sb-finish h3{font-size:22px;font-weight:900;margin:0 0 8px;color:var(--sb-text);}
  .sb-finish p{color:var(--sb-muted);font-weight:700;margin:0 0 18px;}
  /* Ordenar */
  .sb-order-card{min-height:52px;padding:14px 16px;border:3px solid #F0E2CC;border-radius:16px;background:#fff;
    font-size:14px;font-weight:800;margin-bottom:10px;cursor:pointer;text-align:left;width:100%;
    font-family:var(--sb-font);transition:all .2s;box-shadow:0 3px 8px rgba(0,0,0,.06);color:var(--sb-text);}
  .sb-order-card:hover:not(.done){border-color:var(--sb-secondary);transform:translateX(4px);}
  .sb-order-card.done{background:linear-gradient(135deg,#D3F9D8,#B2F2BB);border-color:var(--sb-green);
    opacity:.8;}
  /* Certificado */
  .sb-cert{background:linear-gradient(135deg,#FFF8EE,#FFE066);border:5px solid #FFD43B;border-radius:24px;
    padding:30px 24px;text-align:center;margin:10px;box-shadow:var(--sb-shadow);position:relative;overflow:hidden;}
  .sb-cert::before{content:'★★★';position:absolute;top:8px;left:50%;transform:translateX(-50%);
    color:#FFD43B;font-size:20px;letter-spacing:8px;}
  .sb-cert h3{color:#E8892C;font-size:24px;margin:12px 0 8px;font-weight:900;letter-spacing:2px;}
  .sb-cert .big-emoji{font-size:64px;display:block;margin-bottom:8px;animation:sb-trophy 2s infinite;}
  /* Modo noche */
  .sb-bedtime{background:linear-gradient(180deg,#0F0C29,#302B63,#24243E) !important;color:#eee !important;}
  .sb-bedtime .sb-reader{background:rgba(30,25,60,.85) !important;}
  .sb-bedtime .sb-sentence{background:#2A2450 !important;color:#eee;border-color:transparent;}
  .sb-bedtime .sb-sentence-translation{color:#999 !important;}
  .sb-bedtime .sb-title{background:linear-gradient(90deg,#A78BFA,#F472B6);-webkit-background-clip:text;background-clip:text;color:transparent;}
  .sb-bedtime .sb-subtitle,.sb-bedtime .sb-muted{color:#aaa !important;}
  .sb-bedtime .sb-page-illustration{filter:brightness(.75) saturate(.8);}
  .sb-bedtime .sb-nav-btn.prev{background:#3A3470;color:#eee;}
  .sb-bedtime .sb-toggle{background:#3A3470;color:#eee;}
  /* Confeti */
  .sb-confetti{position:fixed;top:-10px;width:10px;height:14px;z-index:10000;pointer-events:none;
    animation:sb-confetti-fall linear forwards;border-radius:2px;}
  @keyframes sb-confetti-fall{to{transform:translateY(110vh) rotate(720deg);opacity:0;}}
  /* Stats bar (biblioteca) */
  .sb-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px;}
  .sb-stat{background:#fff;border-radius:16px;padding:10px;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,.08);}
  .sb-stat .num{font-size:22px;font-weight:900;color:var(--sb-accent);}
  .sb-stat .lbl{font-size:11px;font-weight:800;color:var(--sb-muted);}
  /* Juego sílabas */
  .sb-sil-target{text-align:center;font-size:48px;margin:10px 0;animation:sb-bounce 2s infinite;}
  .sb-sil-word{text-align:center;font-size:26px;font-weight:900;letter-spacing:2px;margin-bottom:6px;
    color:var(--sb-purple);}
  .sb-sil-hint{text-align:center;font-weight:800;color:var(--sb-muted);font-size:13px;margin-bottom:16px;}
  .sb-sil-slots{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:16px;min-height:56px;}
  .sb-sil-slot{min-width:56px;height:56px;border:3px dashed #D4C5A9;border-radius:14px;display:flex;
    align-items:center;justify-content:center;font-weight:900;font-size:18px;background:#FAF3E7;
    transition:all .2s;}
  .sb-sil-slot.filled{border-style:solid;border-color:var(--sb-green);background:#D3F9D8;
    animation:sb-correct .4s;}
  .sb-sil-tiles{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;}
  .sb-sil-tile{padding:12px 20px;border:none;border-radius:14px;font-weight:900;font-size:18px;cursor:pointer;
    font-family:var(--sb-font);background:linear-gradient(135deg,var(--sb-secondary),var(--sb-purple));
    color:#fff;box-shadow:0 6px 14px rgba(108,92,231,.4);transition:all .2s;}
  .sb-sil-tile:hover:not(:disabled){transform:translateY(-3px) scale(1.05);}
  .sb-sil-tile:disabled{opacity:.3;transform:scale(.9);}
  .sb-sil-tile.wrong{animation:sb-wrong .4s;background:linear-gradient(135deg,var(--sb-red),#FF8787)!important;}
  /* Formar palabras */
  .sb-letter-tile{width:52px;height:52px;border:none;border-radius:14px;font-weight:900;font-size:22px;
    cursor:pointer;font-family:var(--sb-font);background:linear-gradient(135deg,var(--sb-accent),#FF6B35);
    color:#fff;box-shadow:0 6px 14px rgba(255,159,67,.4);transition:all .2s;text-transform:uppercase;}
  .sb-letter-tile:hover:not(:disabled){transform:translateY(-3px) rotate(-3deg);}
  .sb-letter-tile:disabled{opacity:.25;}
  /* Logros banner */
  .sb-achievement{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-120px);
    background:linear-gradient(135deg,#FFD43B,#FF9F43);color:#5B3A00;padding:14px 24px;border-radius:18px;
    font-weight:900;font-size:15px;z-index:10001;box-shadow:0 10px 30px rgba(255,159,67,.5);
    transition:transform .5s cubic-bezier(.34,1.56,.64,1);font-family:var(--sb-font);text-align:center;}
  .sb-achievement.show{transform:translateX(-50%) translateY(0);}
  @media (max-width:480px){.sb-match-grid{grid-template-columns:repeat(3,1fr);}
    .sb-grid{grid-template-columns:repeat(2,1fr);}
    .sb-title{font-size:20px;}
    .sb-page-illustration{height:140px;font-size:60px;}}
  /* ===== SUPER PREMIUM EXTRAS ===== */
  .sb-mic-btn.listening{background:#FF6B6B!important;animation:sb-pulse 1s infinite;}
  @keyframes sb-pulse{0%{box-shadow:0 0 0 0 rgba(255,107,107,.7);}70%{box-shadow:0 0 0 14px rgba(255,107,107,0);}100%{box-shadow:0 0 0 0 rgba(255,107,107,0);}}
  .sb-mic-result{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%) scale(.8);background:#fff;border-radius:28px;padding:28px 36px;
    box-shadow:0 20px 60px rgba(0,0,0,.3);z-index:10002;text-align:center;opacity:0;pointer-events:none;transition:all .35s cubic-bezier(.34,1.56,.64,1);font-family:var(--sb-font);max-width:90vw;}
  .sb-mic-result.show{opacity:1;transform:translate(-50%,-50%) scale(1);pointer-events:auto;}
  .sb-mic-result .stars{font-size:42px;letter-spacing:6px;margin:8px 0;}
  .sb-mic-result .msg{font-size:20px;font-weight:900;color:var(--sb-text);margin:6px 0;}
  .sb-mic-result .pct{font-size:15px;color:var(--sb-muted);font-weight:700;}
  .sb-mic-result .heard{font-size:13px;color:#999;margin-top:8px;font-style:italic;max-width:280px;}
  .sb-mic-result button{margin-top:14px;background:linear-gradient(135deg,#FF9F43,#FF6B9D);color:#fff;border:none;border-radius:999px;padding:10px 26px;font-weight:900;font-size:15px;cursor:pointer;font-family:var(--sb-font);}
  .sb-sentence.approved{background:linear-gradient(90deg,#D4FCF4,#E8FFF9)!important;border-left:4px solid #00B894;}
  .sb-sentence.approved::after{content:'✓';position:absolute;right:10px;top:50%;transform:translateY(-50%);color:#00B894;font-weight:900;font-size:18px;}
  .sb-super-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-top:16px;}
  .sb-super-card{background:#fff;border-radius:20px;padding:20px 14px;text-align:center;cursor:pointer;box-shadow:var(--sb-shadow);transition:transform .2s,box-shadow .2s;border:none;font-family:var(--sb-font);}
  .sb-super-card:hover{transform:translateY(-4px) scale(1.03);box-shadow:var(--sb-shadow-hover);}
  .sb-super-card .ico{font-size:44px;display:block;margin-bottom:8px;}
  .sb-super-card .tit{font-weight:900;font-size:15px;color:var(--sb-text);display:block;}
  .sb-super-card .sub{font-size:11px;color:var(--sb-muted);font-weight:700;display:block;margin-top:3px;}
  .sb-abc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(54px,1fr));gap:8px;margin-top:14px;}
  .sb-abc-letter{background:linear-gradient(135deg,#FF9F43,#FF6B9D);color:#fff;border:none;border-radius:14px;padding:12px 0;font-size:22px;font-weight:900;cursor:pointer;font-family:var(--sb-font);box-shadow:0 4px 10px rgba(0,0,0,.12);transition:transform .15s;}
  .sb-abc-letter:active{transform:scale(.9);}
  .sb-verb-row{display:flex;align-items:center;gap:10px;background:#fff;border-radius:14px;padding:10px 14px;margin-bottom:8px;box-shadow:0 2px 8px rgba(0,0,0,.06);}
  .sb-verb-row .v{font-weight:900;font-size:16px;color:var(--sb-accent2);min-width:80px;}
  .sb-verb-row .c{font-size:13px;color:var(--sb-text);flex:1;}
  .sb-verb-row button{background:var(--sb-secondary);color:#fff;border:none;border-radius:50%;width:34px;height:34px;font-size:16px;cursor:pointer;flex:0 0 auto;}
  .sb-orac-word{display:inline-block;background:#fff;border:2px solid var(--sb-secondary);border-radius:12px;padding:8px 14px;margin:4px;font-weight:800;font-size:15px;cursor:pointer;font-family:var(--sb-font);color:var(--sb-text);transition:all .15s;}
  .sb-orac-word:active{transform:scale(.92);}
  .sb-orac-word.used{opacity:.3;pointer-events:none;}
  .sb-orac-slot{min-height:44px;background:#F7F3EE;border-radius:14px;padding:8px;margin:10px 0;border:2px dashed #D4C5B5;}
  .sb-confetti{position:fixed;width:10px;height:10px;top:-10px;z-index:10003;pointer-events:none;border-radius:2px;}
  @keyframes sb-confetti-fall{to{transform:translateY(110vh) rotate(720deg);opacity:0;}}
  .sb-badge-super{background:linear-gradient(135deg,#FFD43B,#FF9F43);color:#5B3A00;font-size:10px;font-weight:900;padding:2px 8px;border-radius:999px;margin-left:6px;vertical-align:middle;}

  `;
  var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
})();

/* ============================================================
   3) UTILIDADES COMPARTIDAS: sonidos + confeti + logros
   ============================================================ */
(function(){
  'use strict';
  window.EK = window.EK || {};
  var ctx = null;
  function audioCtx(){
    try{ if(!ctx) ctx = new (window.AudioContext||window.webkitAudioContext)(); return ctx; }catch(e){ return null; }
  }
  function tono(freq, dur, type, vol, delay){
    var ac = audioCtx(); if(!ac) return;
    try{
      var o = ac.createOscillator(), g = ac.createGain();
      o.type = type||'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, ac.currentTime + (delay||0));
      g.gain.exponentialRampToValueAtTime(vol||0.15, ac.currentTime + (delay||0) + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + (delay||0) + (dur||0.2));
      o.connect(g); g.connect(ac.destination);
      o.start(ac.currentTime + (delay||0)); o.stop(ac.currentTime + (delay||0) + (dur||0.2) + 0.05);
    }catch(e){}
  }
  EK.SB = EK.SB || {};
  EK.SB.sonido = {
    correcto: function(){ tono(523,0.12,'sine',0.18,0); tono(659,0.12,'sine',0.18,0.1); tono(784,0.2,'sine',0.2,0.2); },
    incorrecto: function(){ tono(220,0.2,'sawtooth',0.1,0); tono(180,0.25,'sawtooth',0.1,0.15); },
    click: function(){ tono(800,0.06,'square',0.06,0); },
    victoria: function(){ [523,659,784,1047,784,1047].forEach(function(f,i){ tono(f,0.18,'triangle',0.2,i*0.12); }); },
    estrella: function(){ tono(1200,0.08,'sine',0.12,0); tono(1600,0.12,'sine',0.12,0.08); }
  };
  EK.SB.confeti = function(n){
    n = n||60;
    var colores = ['#FF6B9D','#FF9F43','#FFD43B','#00B894','#4D96FF','#6C5CE7','#FF6B6B'];
    for(var i=0;i<n;i++){
      var el = document.createElement('div');
      el.className = 'sb-confetti';
      el.style.left = Math.random()*100 + 'vw';
      el.style.background = colores[Math.floor(Math.random()*colores.length)];
      el.style.animationDuration = (2 + Math.random()*2) + 's';
      el.style.animationDelay = (Math.random()*0.5) + 's';
      el.style.width = (6+Math.random()*8)+'px';
      el.style.height = (10+Math.random()*10)+'px';
      if(Math.random()>0.5) el.style.borderRadius = '50%';
      document.body.appendChild(el);
      (function(e){ setTimeout(function(){ e.remove(); }, 4500); })(el);
    }
  };
  EK.SB.logro = function(titulo, emoji){
    var el = document.createElement('div');
    el.className = 'sb-achievement';
    el.innerHTML = (emoji||'🏆') + ' ' + titulo;
    document.body.appendChild(el);
    setTimeout(function(){ el.classList.add('show'); }, 50);
    setTimeout(function(){ el.classList.remove('show'); setTimeout(function(){ el.remove(); }, 600); }, 3200);
  };
})();

/* ============================================================
   4) BIBLIOTECA (storybooks.js) — versión premium
   ============================================================ */
(function () {
  'use strict';
  window.EK = window.EK || {};
  var MUNDO_STORYBOOKS = { id:'storybooks', nombre:'Storybooks Bilingües', emoji:'📚', color:'#FF9F43',
    tipo:'storybooks', nivel:'todos', desc:'Cuentos en español e inglés con audio, vocabulario y juegos' };
  function registrarMundo(){
    try{
      var lista = null;
      if (Array.isArray(EK.Mundos)) lista = EK.Mundos;
      else if (EK.Mundos && Array.isArray(EK.Mundos.MUNDOS)) lista = EK.Mundos.MUNDOS;
      else if (EK.Mundos && Array.isArray(EK.Mundos.mundos)) lista = EK.Mundos.mundos;
      else if (window.MUNDOS && Array.isArray(window.MUNDOS)) lista = window.MUNDOS;
      if (lista && !lista.some(function(m){ return m && m.id==='storybooks'; })) lista.push(MUNDO_STORYBOOKS);
    }catch(e){}
  }
  registrarMundo();
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', registrarMundo);

  var estado = { lang:(localStorage.getItem('buggyia.lang')||'es').slice(0,2), tab:'biblioteca',
    categoria:'todas', busqueda:'', catalogo:SB_CATALOGO, contenedor:null };

  var TXT = {
    es:{ titulo:'Storybooks Bilingües', subtitulo:'Cuentos en español e inglés', buscar:'Buscar cuento...',
      todas:'Todos', tabBiblio:'Biblioteca', tabFav:'Favoritos', tabProg:'Progreso', tabSuper:'Super Premium', paginas:'páginas',
      leido:'Leído', vacioFav:'Aún no tenés favoritos. Tocá el corazón en un cuento.',
      vacioProg:'Aún no empezaste ningún cuento. ¡Elegí uno!', vacioBusq:'No encontramos cuentos con esa búsqueda.',
      cargando:'Cargando biblioteca...', error:'No se pudo cargar la biblioteca.', reintentar:'Reintentar',
      empezar:'Empezar', continuar:'Continuar', terminado:'Terminado',
      estrellas:'Estrellas', leidos:'Leídos', racha:'Días seguidos', meta:'Meta diaria' },
    en:{ titulo:'Bilingual Storybooks', subtitulo:'Stories in Spanish and English', buscar:'Search story...',
      todas:'All', tabBiblio:'Library', tabFav:'Favorites', tabProg:'Progress', tabSuper:'Super Premium', paginas:'pages',
      leido:'Read', vacioFav:'No favorites yet. Tap the heart on a story.',
      vacioProg:'No stories started yet. Pick one!', vacioBusq:'No stories match that search.',
      cargando:'Loading library...', error:'Could not load library.', reintentar:'Retry',
      empezar:'Start', continuar:'Continue', terminado:'Finished',
      estrellas:'Stars', leidos:'Read', racha:'Day streak', meta:'Daily goal' }
  };
  function t(k){ return (TXT[estado.lang]||TXT.es)[k]||TXT.es[k]; }

  var CLAVE = 'buggyia.storybooks';
  function cargarStore(){
    try{ var raw = localStorage.getItem(CLAVE); if(raw){ var o=JSON.parse(raw); return o&&typeof o==='object'?o:{}; } }catch(e){}
    return { favoritos:[], progreso:{}, estrellas:0, racha:{}, ultimoDia:null };
  }
  function guardarStore(s){ try{ localStorage.setItem(CLAVE, JSON.stringify(s)); }catch(e){} }
  var store = cargarStore();
  if(!Array.isArray(store.favoritos)) store.favoritos = [];
  if(!store.progreso || typeof store.progreso!=='object') store.progreso = {};
  if(typeof store.estrellas!=='number') store.estrellas = 0;
  if(!store.racha || typeof store.racha!=='object') store.racha = {};

  function esFavorito(id){ return store.favoritos.indexOf(id)>=0; }
  function toggleFavorito(id){
    var i = store.favoritos.indexOf(id);
    if(i>=0) store.favoritos.splice(i,1); else store.favoritos.push(id);
    guardarStore(store); return esFavorito(id);
  }
  function getProgreso(id){ return store.progreso[id]||{pagina:0,terminado:false}; }
  function setProgreso(id, pagina, terminado){
    var p = store.progreso[id]||{pagina:0,terminado:false};
    p.pagina = Math.max(p.pagina||0, pagina||0);
    if(terminado) p.terminado = true;
    p.fecha = new Date().toISOString();
    store.progreso[id] = p; guardarStore(store);
  }
  function sumarEstrellas(n){
    store.estrellas = (store.estrellas||0) + n; guardarStore(store);
    try{ var el=document.getElementById('stat-estrellas'); if(el){var b=el.querySelector('b'); if(b) b.textContent=parseInt(b.textContent||'0',10)+n;} }catch(e){}
    try{ localStorage.setItem('buggyia.storybooks.estrellas', String(store.estrellas)); }catch(e){}
  }
  function registrarLecturaHoy(){
    var hoy = new Date().toISOString().slice(0,10);
    if(store.ultimoDia !== hoy){
      store.ultimoDia = hoy;
      store.racha[hoy] = true;
      guardarStore(store);
    }
  }
  function contarRacha(){
    var dias = Object.keys(store.racha||{}).sort();
    if(!dias.length) return 0;
    var n = 0, ahora = new Date();
    for(var i=dias.length-1; i>=0; i--){
      var d = new Date(dias[i]+'T00:00:00');
      var diff = Math.round((ahora - d)/86400000);
      if(diff === n) n++; else break;
    }
    return n;
  }
  function contarLeidos(){
    var n = 0; for(var k in store.progreso) if(store.progreso[k]&&store.progreso[k].terminado) n++; return n;
  }

  /* ---------- VOZ DE NARRADOR (motor nativo, tono grave de locutor) ---------- */
  var vocesDisponibles = [];
  function cargarVoces(){ try{ vocesDisponibles = window.speechSynthesis.getVoices() || []; }catch(e){} }
  if('speechSynthesis' in window){
    window.speechSynthesis.onvoiceschanged = cargarVoces;
    cargarVoces();
    setTimeout(cargarVoces, 500); setTimeout(cargarVoces, 1500);
  }
  function elegirVoz(codigoIdioma){
    if(!vocesDisponibles.length) cargarVoces();
    var vocesDelIdioma = vocesDisponibles.filter(function(v){
      var l=(v.lang||'').toLowerCase(); return l.startsWith(codigoIdioma.toLowerCase()) || (codigoIdioma==='es' && l.startsWith('es'));
    });
    if(!vocesDelIdioma.length) return null;
    var preferida = vocesDelIdioma.find(function(v){
      var n = (v.name||'').toLowerCase();
      return n.indexOf('microsoft sabrina')>=0 || n.indexOf('microsoft laura')>=0 ||
             n.indexOf('google espa')>=0 || n.indexOf('google espan')>=0 ||
             n.indexOf('monica')>=0 || n.indexOf('juan')>=0 || n.indexOf('salma')>=0 ||
             n.indexOf('natural')>=0 || n.indexOf('microsoft')>=0 || n.indexOf('google')>=0;
    });
    return preferida || vocesDelIdioma[0];
  }
  function hablar(texto, lang, onend){
    try{
      if(EK.Voz && typeof EK.Voz.hablar==='function'){
        EK.Voz.hablar(texto, { lang:lang==='en'?'en-US':'es-MX', rate:0.92, pitch:0.85, onend:onend }); return true;
      }
      if('speechSynthesis' in window){
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(texto);
        u.lang = lang==='en'?'en-US':'es-MX';
        u.rate = 0.92;   // pausado, estilo narrador
        u.pitch = 0.85;  // tono grave y cálido (no infantil)
        u.volume = 1;
        var voz = elegirVoz(lang==='en'?'en':'es');
        if(voz) u.voice = voz;
        if(onend) u.onend = onend;
        window.speechSynthesis.speak(u); return true;
      }
    }catch(e){}
    return false;
  }
  function detenerAudio(){
    try{ if(EK.Voz && EK.Voz.detener) EK.Voz.detener(); }catch(e){}
    try{ if('speechSynthesis' in window) window.speechSynthesis.cancel(); }catch(e){}
  }
  function toast(msg){
    var el = document.createElement('div'); el.className='sb-toast'; el.textContent=msg;
    document.body.appendChild(el); setTimeout(function(){ el.remove(); }, 2200);
  }
  function escapar(s){
    return String(s==null?'':s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; });
  }
  function esImagenURL(v){ if(!v||typeof v!=='string') return false; return /^https?:\/\//i.test(v)||/\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(v); }
  function portadaHTML(v){
    if(esImagenURL(v)) return '<img src="'+escapar(v)+'" alt="" style="width:100%;height:100%;object-fit:cover;display:block;">';
    return escapar(v||'📖');
  }
  function filtrarCuentos(cat){
    var q = estado.busqueda.trim().toLowerCase();
    return (cat.cuentos||[]).filter(function(c){
      if(estado.categoria!=='todas' && c.categoria!==estado.categoria) return false;
      if(estado.tab==='favoritos' && !esFavorito(c.id)) return false;
      if(estado.tab==='progreso'){ var p=getProgreso(c.id); if(!(p.pagina>0||p.terminado)) return false; }
      if(q){
        var hit = (c.titulo.es||'').toLowerCase().indexOf(q)>=0 || (c.titulo.en||'').toLowerCase().indexOf(q)>=0 || (c.id||'').toLowerCase().indexOf(q)>=0;
        if(!hit) return false;
      }
      return true;
    });
  }

  function renderBiblioteca(){
    if(estado.tab==='super'){ renderSuperPremium(); return; }
    var cont = estado.contenedor, cat = estado.catalogo, txt = t;
    var cats = cat.categorias||[];
    var cuentos = filtrarCuentos(cat);

    var stats = '<div class="sb-stats">'+
      '<div class="sb-stat"><div class="num">⭐ '+(store.estrellas||0)+'</div><div class="lbl">'+escapar(txt('estrellas'))+'</div></div>'+
      '<div class="sb-stat"><div class="num">📖 '+contarLeidos()+'</div><div class="lbl">'+escapar(txt('leidos'))+'</div></div>'+
      '<div class="sb-stat"><div class="num">🔥 '+contarRacha()+'</div><div class="lbl">'+escapar(txt('racha'))+'</div></div>'+
      '</div>';

    var chips = '<div class="sb-chips">';
    chips += '<button class="sb-chip'+(estado.categoria==='todas'?' active':'')+'" data-cat="todas">📖 '+escapar(txt('todas'))+'</button>';
    cats.forEach(function(c){
      var activo = estado.categoria===c.id?' active':'';
      chips += '<button class="sb-chip'+activo+'" data-cat="'+escapar(c.id)+'">'+escapar(c.icono||'📁')+' '+escapar((c.nombre[estado.lang]||c.nombre.es))+'</button>';
    });
    chips += '</div>';

    var grid = '';
    if(!cuentos.length){
      var msj = estado.tab==='favoritos'?txt('vacioFav'):(estado.tab==='progreso'?txt('vacioProg'):txt('vacioBusq'));
      grid = '<div class="sb-empty"><span class="big">🔍</span>'+escapar(msj)+'</div>';
    } else {
      grid = '<div class="sb-grid">';
      cuentos.forEach(function(c){
        var prog = getProgreso(c.id);
        var porcentaje = c.paginas ? Math.min(100, Math.round((prog.pagina/c.paginas)*100)) : 0;
        if(prog.terminado) porcentaje = 100;
        var catMeta = cats.filter(function(x){ return x.id===c.categoria; })[0]||{};
        var catNombre = catMeta.nombre ? (catMeta.nombre[estado.lang]||catMeta.nombre.es) : c.categoria;
        grid += '<div class="sb-book-card" data-cuento="'+escapar(c.id)+'">'+
          '<button class="sb-fav-btn" data-fav="'+escapar(c.id)+'" aria-label="favorito">'+(esFavorito(c.id)?'❤️':'🤍')+'</button>'+
          '<div class="sb-book-cover" style="background:'+escapar(c.color||'#FF9F43')+'22;">'+portadaHTML(c.portada)+'</div>'+
          '<div class="sb-book-info">'+
            '<h4 class="sb-book-title">'+escapar(c.titulo[estado.lang]||c.titulo.es)+'</h4>'+
            '<div class="sb-book-meta">'+
              '<span class="sb-badge" style="background:'+escapar(c.color||'#FF9F43')+';">'+escapar(catNombre)+'</span>'+
              '<span>📄 '+c.paginas+' '+escapar(txt('paginas'))+'</span>'+
              (prog.terminado?'<span>✅</span>':'')+
            '</div>'+
            '<div class="sb-progress-bar"><div class="sb-progress-fill" style="width:'+porcentaje+'%"></div></div>'+
          '</div>'+
        '</div>';
      });
      grid += '</div>';
    }

    cont.innerHTML =
      '<div class="sb-root">'+
        '<div class="sb-header">'+
          '<button class="sb-btn-back" data-sb-volver title="volver">←</button>'+
          '<div style="flex:1;"><h2 class="sb-title">📚 '+escapar(txt('titulo'))+'</h2>'+
          '<p class="sb-subtitle">'+escapar(txt('subtitulo'))+'</p></div>'+
          '<button class="sb-toggle'+(estado.lang==='en'?' on':'')+'" data-sb-lang>'+(estado.lang==='en'?'🇬🇧 EN':'🇪🇸 ES')+'</button>'+
        '</div>'+
        stats+
        '<div class="sb-tabs">'+
          '<button class="sb-tab'+(estado.tab==='biblioteca'?' active':'')+'" data-tab="biblioteca">📖 '+escapar(txt('tabBiblio'))+'</button>'+
          '<button class="sb-tab'+(estado.tab==='favoritos'?' active':'')+'" data-tab="favoritos">❤️ '+escapar(txt('tabFav'))+'</button>'+
          '<button class="sb-tab'+(estado.tab==='progreso'?' active':'')+'" data-tab="progreso">📊 '+escapar(txt('tabProg'))+'</button>'+
          '<button class="sb-tab'+(estado.tab==='super'?' active':'')+'" data-tab="super">🌟 '+escapar(txt('tabSuper'))+'</button>'+
        '</div>'+
        '<div class="sb-search-wrap"><span class="sb-search-icon">🔍</span>'+
          '<input class="sb-search" type="search" placeholder="'+escapar(txt('buscar'))+'" value="'+escapar(estado.busqueda)+'">'+
        '</div>'+
        chips + grid +
      '</div>';

    cont.querySelector('[data-sb-volver]').addEventListener('click', function(){
      detenerAudio();
      if(typeof EK.Storybooks.onVolver==='function') EK.Storybooks.onVolver(cont);
      else if(typeof window.sbVolver==='function') window.sbVolver(cont);
      else { cont.innerHTML=''; }
    });
    cont.querySelector('[data-sb-lang]').addEventListener('click', function(){
      estado.lang = estado.lang==='es'?'en':'es';
      localStorage.setItem('buggyia.lang', estado.lang);
      renderBiblioteca();
    });
    cont.querySelectorAll('.sb-tab').forEach(function(b){
      b.addEventListener('click', function(){ estado.tab=b.getAttribute('data-tab'); renderBiblioteca(); });
    });
    cont.querySelectorAll('.sb-chip').forEach(function(b){
      b.addEventListener('click', function(){ estado.categoria=b.getAttribute('data-cat'); renderBiblioteca(); });
    });
    var inp = cont.querySelector('.sb-search');
    inp.addEventListener('input', function(){
      estado.busqueda = inp.value;
      var pos = inp.selectionStart;
      renderBiblioteca();
      var ni = estado.contenedor.querySelector('.sb-search');
      if(ni){ ni.focus(); try{ ni.setSelectionRange(pos,pos); }catch(e){} }
    });
    cont.querySelectorAll('.sb-fav-btn').forEach(function(b){
      b.addEventListener('click', function(e){
        e.stopPropagation();
        var id = b.getAttribute('data-fav');
        var ahora = toggleFavorito(id);
        b.textContent = ahora?'❤️':'🤍';
        if(ahora){ EK.SB.sonido.estrella(); toast('⭐ ¡Agregado a favoritos!'); }
        else toast('💔 Quitado de favoritos');
        if(estado.tab==='favoritos') setTimeout(renderBiblioteca, 300);
      });
    });
    cont.querySelectorAll('.sb-book-card').forEach(function(card){
      card.addEventListener('click', function(e){
        if(e.target.closest('.sb-fav-btn')) return;
        abrirCuento(card.getAttribute('data-cuento'));
      });
    });
  }

  function renderCargando(msg){
    estado.contenedor.innerHTML = '<div class="sb-root"><div class="sb-loader"><div class="sb-spinner"></div>'+escapar(msg||t('cargando'))+'</div></div>';
  }
  function abrirCuento(id){
    var meta = (estado.catalogo.cuentos||[]).filter(function(c){ return c.id===id; })[0];
    if(!meta){ toast('❌ Cuento no encontrado'); return; }
    renderCargando('📖 '+(meta.titulo[estado.lang]||meta.titulo.es));
    detenerAudio();
    registrarLecturaHoy();
    var cuento = SB_CUENTOS[meta.id];
    if(EK.StorybooksReader && typeof EK.StorybooksReader.abrir==='function'){
      EK.StorybooksReader.abrir(cuento, meta, estado.contenedor, {
        lang: estado.lang,
        setProgreso: setProgreso, getProgreso: getProgreso,
        hablar: hablar, detenerAudio: detenerAudio, toast: toast,
        sumarEstrellas: sumarEstrellas,
        onCerrar: function(){ renderBiblioteca(); },
        onTerminado: function(){
          setProgreso(cuento.id, (cuento.paginas||[]).length, true);
          sumarEstrellas(5);
          EK.SB.sonido.victoria();
          EK.SB.confeti(80);
          var leidos = contarLeidos();
          if(leidos===1) EK.SB.logro(estado.lang==='en'?'First story finished!':'¡Primer cuento terminado!','🎉');
          else if(leidos===3) EK.SB.logro(estado.lang==='en'?'3 stories! Amazing!':'¡3 cuentos! Increíble','🏅');
          else if(leidos===5) EK.SB.logro(estado.lang==='en'?'Reading champion!':'¡Campeón de lectura!','👑');
        }
      });
    } else {
      estado.contenedor.innerHTML = '<div class="sb-root"><div class="sb-empty"><span class="big">⚠️</span>Error interno</div></div>';
    }
  }

  function abrir(contenedor){
    if(!contenedor) contenedor = document.getElementById('app')||document.getElementById('main')||document.querySelector('main')||document.body;
    estado.contenedor = contenedor;
    renderCargando();
    setTimeout(renderBiblioteca, 50);
  }

  document.addEventListener('click', function(e){
    var el = e.target.closest('[data-mundo="storybooks"],[data-id="storybooks"],[data-world="storybooks"],[data-sb-abrir]');
    if(el){ e.preventDefault(); e.stopPropagation(); abrir(); }
  }, true);


  /* ============================================================
     SUPER PREMIUM: Aprendizaje integral (abecedario, verbos, oraciones, narración)
     ============================================================ */
  var SP = { vista:'hub', letraActual:'', verboIdx:0, oracIdx:0, oracUsados:[], oracSlots:[] };
  var SP_TXT = {
    es:{ hubTit:'🌟 Super Premium', hubSub:'Aprendé lectura, narración, verbos, sílabas y abecedario',
         abc:'Abecedario', abcSub:'A-Z con audio', verb:'Verbos', verbSub:'Conjugación y audio',
         orac:'Oraciones', oracSub:'Armá oraciones', narr:'Narración', narrSub:'Leé y grabá tu voz',
         escuchar:'Escuchar', volver:'← Volver', tocaLetra:'Tocá una letra para escucharla',
         eligeVerbo:'Verbos en presente (tocá 🔊 para escuchar)',
         armaOrac:'Tocá las palabras en orden para armar la oración',
         bien:'¡Muy bien! ✅', mal:'No es correcto, intentá de nuevo',
         narrInstr:'Escuchá la oración y luego repetila con el micrófono 🎤' },
    en:{ hubTit:'🌟 Super Premium', hubSub:'Learn reading, narration, verbs, syllables & alphabet',
         abc:'Alphabet', abcSub:'A-Z with audio', verb:'Verbs', verbSub:'Conjugation & audio',
         orac:'Sentences', oracSub:'Build sentences', narr:'Narration', narrSub:'Read & record your voice',
         escuchar:'Listen', volver:'← Back', tocaLetra:'Tap a letter to hear it',
         eligeVerbo:'Verbs in present (tap 🔊 to listen)',
         armaOrac:'Tap words in order to build the sentence',
         bien:'Well done! ✅', mal:'Not right, try again',
         narrInstr:'Listen to the sentence then repeat with the mic 🎤' }
  };
  function spt(k){ var l=estado.lang==='en'?'en':'es'; return SP_TXT[l][k]||SP_TXT.es[k]; }
  function spHablar(texto, lang){
    try{
      if('speechSynthesis' in window){
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(texto);
        u.lang = lang==='en'?'en-US':'es-MX'; u.rate=0.9; u.pitch=0.9; u.volume=1;
        var vs = window.speechSynthesis.getVoices()||[];
        var pref = vs.filter(function(v){return (v.lang||'').toLowerCase().indexOf(lang)==0;});
        if(pref.length) u.voice = pref[0];
        window.speechSynthesis.speak(u);
      }
    }catch(e){}
  }
  var SP_VERBOS = [
    {es:'ser', en:'to be', conj:'yo soy / tú eres / él es / nosotros somos'},
    {es:'tener', en:'to have', conj:'yo tengo / tú tienes / él tiene / nosotros tenemos'},
    {es:'ir', en:'to go', conj:'yo voy / tú vas / él va / nosotros vamos'},
    {es:'comer', en:'to eat', conj:'yo como / tú comes / él come / nosotros comemos'},
    {es:'jugar', en:'to play', conj:'yo juego / tú juegas / él juega / nosotros jugamos'},
    {es:'querer', en:'to want', conj:'yo quiero / tú quieres / él quiere / nosotros queremos'},
    {es:'ver', en:'to see', conj:'yo veo / tú ves / él ve / nosotros vemos'},
    {es:'hablar', en:'to speak', conj:'yo hablo / tú hablas / él habla / nosotros hablamos'},
    {es:'leer', en:'to read', conj:'yo leo / tú lees / él lee / nosotros leemos'},
    {es:'vivir', en:'to live', conj:'yo vivo / tú vives / él vive / nosotros vivimos'}
  ];
  var SP_ORACIONES = [
    {es:'El perro juega en el parque', en:'The dog plays in the park', palabras:['El','perro','juega','en','el','parque']},
    {es:'La niña come una manzana roja', en:'The girl eats a red apple', palabras:['La','niña','come','una','manzana','roja']},
    {es:'Mi abuela lee un libro bonito', en:'My grandma reads a nice book', palabras:['Mi','abuela','lee','un','libro','bonito']},
    {es:'Los pájaros cantan en el árbol', en:'The birds sing in the tree', palabras:['Los','pájaros','cantan','en','el','árbol']},
    {es:'El sol brilla en el cielo azul', en:'The sun shines in the blue sky', palabras:['El','sol','brilla','en','el','cielo','azul']}
  ];
  var SP_NARRACION = [
    {es:'Había una vez un dragón que vivía en una montaña.', en:'Once upon a time a dragon lived on a mountain.'},
    {es:'Un día, el dragón decidió viajar para conocer el mundo.', en:'One day, the dragon decided to travel to see the world.'},
    {es:'Conoció muchos animales y aprendió cosas nuevas.', en:'He met many animals and learned new things.'},
    {es:'Al final, comprendió que la amistad es el mayor tesoro.', en:'In the end, he understood that friendship is the greatest treasure.'}
  ];
  function barajarArr(a){ var b=a.slice(); for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t;} return b; }
  function renderSuperPremium(){
    var cont = estado.contenedor;
    if(SP.vista==='hub'){ renderSPHub(cont); return; }
    if(SP.vista==='abc'){ renderSPAbc(cont); return; }
    if(SP.vista==='verb'){ renderSPVerb(cont); return; }
    if(SP.vista==='orac'){ renderSPOrac(cont); return; }
    if(SP.vista==='narr'){ renderSPNarr(cont); return; }
  }
  function renderSPHub(cont){
    var html = '<div class="sb-root sb-page-enter">'+
      '<div class="sb-header"><button class="sb-btn-back" data-sp-volver>←</button>'+
      '<div><h1 class="sb-title">'+spt('hubTit')+' <span class="sb-badge-super">NEW</span></h1>'+
      '<p class="sb-subtitle">'+spt('hubSub')+'</p></div></div>'+
      '<div class="sb-super-grid">'+
      '<button class="sb-super-card" data-sp-go="abc"><span class="ico">🔤</span><span class="tit">'+spt('abc')+'</span><span class="sub">'+spt('abcSub')+'</span></button>'+
      '<button class="sb-super-card" data-sp-go="verb"><span class="ico">⚡</span><span class="tit">'+spt('verb')+'</span><span class="sub">'+spt('verbSub')+'</span></button>'+
      '<button class="sb-super-card" data-sp-go="orac"><span class="ico">📝</span><span class="tit">'+spt('orac')+'</span><span class="sub">'+spt('oracSub')+'</span></button>'+
      '<button class="sb-super-card" data-sp-go="narr"><span class="ico">🎙️</span><span class="tit">'+spt('narr')+'</span><span class="sub">'+spt('narrSub')+'</span></button>'+
      '</div></div>';
    cont.innerHTML = html;
    cont.querySelector('[data-sp-volver]').addEventListener('click', function(){ estado.tab='biblioteca'; renderBiblioteca(); });
    cont.querySelectorAll('[data-sp-go]').forEach(function(b){
      b.addEventListener('click', function(){ SP.vista=b.getAttribute('data-sp-go'); renderSuperPremium(); });
    });
  }
  function spVolverHub(cont){ SP.vista='hub'; renderSuperPremium(); }
  function renderSPAbc(cont){
    var letras='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    var html='<div class="sb-root sb-page-enter"><div class="sb-header"><button class="sb-btn-back" data-sp-volver>←</button>'+
      '<div><h1 class="sb-title">🔤 '+spt('abc')+'</h1><p class="sb-subtitle">'+spt('tocaLetra')+'</p></div></div>'+
      '<div class="sb-abc-grid">';
    letras.forEach(function(L){
      html+='<button class="sb-abc-letter" data-letra="'+L+'">'+L+'</button>';
    });
    html+='</div><div style="text-align:center;margin-top:20px;font-size:18px;font-weight:800;color:var(--sb-accent2);" id="sp-abc-actual">🔊</div></div>';
    cont.innerHTML=html;
    cont.querySelector('[data-sp-volver]').addEventListener('click', spVolverHub);
    cont.querySelectorAll('[data-letra]').forEach(function(b){
      b.addEventListener('click', function(){
        var L=b.getAttribute('data-letra');
        document.getElementById('sp-abc-actual').textContent=L+' — '+L.toLowerCase();
        spHablar(L, estado.lang==='en'?'en':'es');
        setTimeout(function(){ spHablar(L+' como '+ (estado.lang==='en'?'apple':'árbol'), estado.lang==='en'?'en':'es'); }, 700);
      });
    });
  }
  function renderSPVerb(cont){
    var html='<div class="sb-root sb-page-enter"><div class="sb-header"><button class="sb-btn-back" data-sp-volver>←</button>'+
      '<div><h1 class="sb-title">⚡ '+spt('verb')+'</h1><p class="sb-subtitle">'+spt('eligeVerbo')+'</p></div></div>';
    SP_VERBOS.forEach(function(v, i){
      html+='<div class="sb-verb-row"><span class="v">'+v.es+'<br><small style="color:#999;font-weight:600;">'+v.en+'</small></span>'+
        '<span class="c">'+v.conj+'</span><button data-verb-esc="'+i+'">🔊</button></div>';
    });
    html+='</div>';
    cont.innerHTML=html;
    cont.querySelector('[data-sp-volver]').addEventListener('click', spVolverHub);
    cont.querySelectorAll('[data-verb-esc]').forEach(function(b){
      b.addEventListener('click', function(){
        var v=SP_VERBOS[parseInt(b.getAttribute('data-verb-esc'),10)];
        spHablar(v.es+' — '+v.conj, 'es');
      });
    });
  }
  function renderSPOrac(cont){
    var ora = SP_ORACIONES[SP.oracIdx % SP_ORACIONES.length];
    var desorden = barajarArr(ora.palabras.slice());
    SP.oracSlots = []; SP.oracUsados = [];
    var html='<div class="sb-root sb-page-enter"><div class="sb-header"><button class="sb-btn-back" data-sp-volver>←</button>'+
      '<div><h1 class="sb-title">📝 '+spt('orac')+'</h1><p class="sb-subtitle">'+spt('armaOrac')+' ('+(SP.oracIdx+1)+'/'+SP_ORACIONES.length+')</p></div></div>'+
      '<div style="background:#fff;border-radius:16px;padding:14px;margin-bottom:12px;font-weight:800;color:var(--sb-secondary);">🇬🇧 '+ora.en+'</div>'+
      '<div class="sb-orac-slot" id="sp-orac-slot"></div>'+
      '<div id="sp-orac-palabras">';
    desorden.forEach(function(p, i){ html+='<span class="sb-orac-word" data-pal="'+i+'">'+p+'</span>'; });
    html+='</div><div style="margin-top:14px;display:flex;gap:10px;">'+
      '<button class="sb-action-btn ghost" id="sp-orac-check" style="flex:1;">✅ Check</button>'+
      '<button class="sb-action-btn ghost" id="sp-orac-reset" style="flex:1;">↺ Reset</button>'+
      '<button class="sb-action-btn primary" id="sp-orac-next" style="flex:1;">→ Next</button></div>'+
      '<div id="sp-orac-feedback" style="text-align:center;margin-top:12px;font-weight:900;font-size:18px;"></div></div>';
    cont.innerHTML=html;
    cont.querySelector('[data-sp-volver]').addEventListener('click', spVolverHub);
    var slot=cont.querySelector('#sp-orac-slot');
    cont.querySelectorAll('[data-pal]').forEach(function(b){
      b.addEventListener('click', function(){
        if(b.classList.contains('used')) return;
        b.classList.add('used'); SP.oracSlots.push(b.textContent);
        var s=document.createElement('span'); s.className='sb-orac-word'; s.style.background='#E8F5E9'; s.style.borderColor='#00B894';
        s.textContent=b.textContent; slot.appendChild(s);
      });
    });
    cont.querySelector('#sp-orac-reset').addEventListener('click', function(){ renderSPOrac(cont); });
    cont.querySelector('#sp-orac-next').addEventListener('click', function(){ SP.oracIdx++; renderSPOrac(cont); });
    cont.querySelector('#sp-orac-check').addEventListener('click', function(){
      var fb=cont.querySelector('#sp-orac-feedback');
      if(SP.oracSlots.join(' ')===ora.palabras.join(' ')){
        fb.textContent='🎉 '+spt('bien'); fb.style.color='#00B894';
        spHablar(ora.es, 'es'); setTimeout(function(){ spHablar(ora.en,'en'); }, 1500);
        lanzarConfetiGlobal(); if(estado.sumarEstrellas) estado.sumarEstrellas(2);
      } else { fb.textContent='❌ '+spt('mal'); fb.style.color='#FA5252'; }
    });
  }
  function lanzarConfetiGlobal(){
    try{
      var colores=['#FF9F43','#FF6B9D','#4D96FF','#00B894','#FFD43B'];
      for(var i=0;i<30;i++){
        var c=document.createElement('div'); c.className='sb-confeti';
        c.style.left=(Math.random()*100)+'vw'; c.style.background=colores[i%colores.length];
        c.style.animation='sb-confetti-fall '+(1.5+Math.random())+'s linear forwards';
        document.body.appendChild(c); (function(el){setTimeout(function(){el.remove();},3000);})(c);
      }
    }catch(e){}
  }
  function renderSPNarr(cont){
    var idx = SP.oracIdx % SP_NARRACION.length;
    var ora = SP_NARRACION[idx];
    var html='<div class="sb-root sb-page-enter"><div class="sb-header"><button class="sb-btn-back" data-sp-volver>←</button>'+
      '<div><h1 class="sb-title">🎙️ '+spt('narr')+'</h1><p class="sb-subtitle">'+spt('narrInstr')+' ('+(idx+1)+'/'+SP_NARRACION.length+')</p></div></div>'+
      '<div style="background:linear-gradient(135deg,#FFF3E0,#FFE0B2);border-radius:20px;padding:20px;margin:14px 0;font-size:18px;font-weight:800;color:var(--sb-text);line-height:1.5;">'+
      '🇪🇸 '+ora.es+'<br><br><span style="color:var(--sb-secondary);">🇬🇧 '+ora.en+'</span></div>'+
      '<div style="display:flex;gap:10px;flex-wrap:wrap;">'+
      '<button class="sb-action-btn primary" id="sp-narr-esc" style="flex:1;">🔊 '+spt('escuchar')+' ES</button>'+
      '<button class="sb-action-btn secondary" id="sp-narr-escen" style="flex:1;">🔊 Listen EN</button>'+
      '<button class="sb-action-btn" id="sp-narr-mic" style="flex:1;background:linear-gradient(135deg,#FF6B6B,#FF9F43);color:#fff;">🎤 Repetir EN</button>'+
      '<button class="sb-action-btn ghost" id="sp-narr-next" style="flex:1;">→ Siguiente</button></div>'+
      '<div id="sp-narr-feedback" style="text-align:center;margin-top:16px;font-weight:900;"></div></div>';
    cont.innerHTML=html;
    cont.querySelector('[data-sp-volver]').addEventListener('click', spVolverHub);
    cont.querySelector('#sp-narr-esc').addEventListener('click', function(){ spHablar(ora.es,'es'); });
    cont.querySelector('#sp-narr-escen').addEventListener('click', function(){ spHablar(ora.en,'en'); });
    cont.querySelector('#sp-narr-next').addEventListener('click', function(){ SP.oracIdx++; renderSPNarr(cont); });
    cont.querySelector('#sp-narr-mic').addEventListener('click', function(){
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      var fb=cont.querySelector('#sp-narr-feedback');
      if(!SR){ fb.textContent='🎤 No soportado (usá Chrome)'; fb.style.color='#FA5252'; return; }
      try{
        var rec=new SR(); rec.lang='en-US'; rec.interimResults=false; rec.maxAlternatives=3;
        var btn=cont.querySelector('#sp-narr-mic'); btn.textContent='🎙️ Escuchando...'; btn.style.animation='sb-pulse 1s infinite';
        rec.onresult=function(e){
          var mejorPct=0, mejorTxt='';
          for(var a=0;a<e.results[0].length;a++){
            var t=e.results[0][a].transcript; var pct=compararTextosGlobal(ora.en, t);
            if(pct>mejorPct){mejorPct=pct;mejorTxt=t;}
          }
          var pctF=mejorPct||compararTextosGlobal(ora.en, e.results[0][0].transcript);
          var est=pctF>=80?3:(pctF>=60?2:(pctF>=40?1:0));
          fb.innerHTML=(est>0?'⭐'.repeat(est):'☆☆☆')+' '+pctF+'%<br><small style="font-weight:600;color:#999;">Escuchado: "'+(mejorTxt||e.results[0][0].transcript)+'"</small>';
          fb.style.color=est>=2?'#00B894':'#FA5252';
          if(est>=2) lanzarConfetiGlobal();
        };
        rec.onerror=function(e){ fb.textContent='🎤 Error: '+e.error; fb.style.color='#FA5252'; };
        rec.onend=function(){ btn.textContent='🎤 Repetir EN'; btn.style.animation=''; };
        setTimeout(function(){ try{rec.start();}catch(e){} },100);
      }catch(err){ fb.textContent='🎤 Error al iniciar'; }
    });
  }
  function compararTextosGlobal(objetivo, reconocido){
    var norm=function(s){return (s||'').toLowerCase().replace(/[.,!?¡¿;:()"'-]/g,' ').replace(/\s+/g,' ').trim();};
    var a=norm(objetivo).split(' ').filter(Boolean), b=norm(reconocido).split(' ').filter(Boolean);
    if(!a.length) return 0; var c=0, usado={};
    for(var i=0;i<a.length;i++) for(var j=0;j<b.length;j++){
      if(!usado[j] && (a[i]===b[j] || (a[i].length>3 && b[j].indexOf(a[i].slice(0,3))===0))){c++;usado[j]=1;break;}
    }
    return Math.round(c/a.length*100);
  }

  EK.Storybooks = {
    MUNDO: MUNDO_STORYBOOKS, abrir: abrir, abrirCuento: abrirCuento,
    esFavorito: esFavorito, toggleFavorito: toggleFavorito,
    getProgreso: getProgreso, setProgreso: setProgreso,
    sumarEstrellas: sumarEstrellas, hablar: hablar, detenerAudio: detenerAudio,
    setLang: function(l){ estado.lang = l==='en'?'en':'es'; },
    getLang: function(){ return estado.lang; },
    onVolver: null, _estado: estado, _store: store
  };
})();

/* ============================================================
   5) LECTOR PREMIUM (storybooks-reader.js) + JUEGOS NUEVOS
   ============================================================ */
(function () {
  'use strict';
  window.EK = window.EK || {};
  var st = null;

  function escapar(s){
    return String(s==null?'':s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; });
  }
  function barajar(arr){
    var a = arr.slice();
    for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; }
    return a;
  }
  function esImagenURL(v){ if(!v||typeof v!=='string') return false; return /^https?:\/\//i.test(v)||/\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(v); }
  function ilustracionHTML(v){
    if(esImagenURL(v)) return '<img src="'+escapar(v)+'" alt="" style="width:100%;height:100%;object-fit:cover;display:block;">';
    return escapar(v||'📖');
  }

  var TXT = {
    es:{ pag:'Página', de:'de', atras:'Atrás', siguiente:'Siguiente', fin:'¡Terminé!',
      mostrarTrad:'Mostrar traducción', leerPagina:'Leer página', detener:'Detener',
      vocabulario:'Vocabulario', preguntas:'Preguntas', juego:'Juego', volverALeer:'Volver a leer',
      biblioteca:'Biblioteca', pregunta:'Pregunta', de2:'de', bien:'¡Muy bien! 🎉', mal:'Intentá de nuevo 💪',
      puntaje:'Puntaje', jugarDeNuevo:'Jugar de nuevo', empareja:'Tocá una palabra y su traducción',
      movidas:'Movidas', felicidades:'¡Felicidades! Terminaste el cuento 🏆', leeOtraVez:'Leé otra vez para aprender más',
      escuchar:'Escuchar', silabas:'Sílabas', formarPalabras:'Formar Palabras', ordenar:'Ordenar',
      completar:'Completar', certificado:'Certificado', tocaSilabas:'Tocá las sílabas en orden',
      formaPalabra:'Formá la palabra con las letras', noche:'Noche', velocidad:'Velocidad', karaoke:'Leer conmigo' },
    en:{ pag:'Page', de:'of', atras:'Back', siguiente:'Next', fin:'I\'m done!',
      mostrarTrad:'Show translation', leerPagina:'Read page', detener:'Stop',
      vocabulario:'Vocabulary', preguntas:'Questions', juego:'Game', volverALeer:'Read again',
      biblioteca:'Library', pregunta:'Question', de2:'of', bien:'Great job! 🎉', mal:'Try again 💪',
      puntaje:'Score', jugarDeNuevo:'Play again', empareja:'Tap a word and its translation',
      movidas:'Moves', felicidades:'Congratulations! You finished the story 🏆', leeOtraVez:'Read again to learn more',
      escuchar:'Listen', silabas:'Syllables', formarPalabras:'Build Words', ordenar:'Order',
      completar:'Fill in', certificado:'Certificate', tocaSilabas:'Tap the syllables in order',
      formaPalabra:'Build the word with letters', noche:'Bedtime', velocidad:'Speed', karaoke:'Read along' }
  };
  function t(k){ var lang = (st&&st.lang)||'es'; return (TXT[lang]||TXT.es)[k]||TXT.es[k]; }

  /* ---------- Sílabas (mejorado, con hiato/diptongo básico) ---------- */
  function separarSilabas(palabra){
    var s = String(palabra||'').toLowerCase().replace(/[^a-záéíóúüñ]/g,'');
    if(!s) return [palabra];
    var vocales = 'aeiouáéíóúü';
    var debiles = 'iuü';
    var partes = [], actual = '', i = 0;
    // Regla simple: corte entre consonante+vocal, agrupando consonantes comunes (bl,br,cl,cr,dr,fl,fr,gl,gr,pl,pr,tr)
    var gruposCons = ['bl','br','cl','cr','dr','fl','fr','gl','gr','pl','pr','tr','ch','ll','rr','qu','gu','gü'];
    while(i < s.length){
      actual += s[i];
      var esVocal = vocales.indexOf(s[i])>=0;
      if(esVocal && i < s.length-1){
        var prox = s[i+1];
        var esVocalProx = vocales.indexOf(prox)>=0;
        if(!esVocalProx){
          // consonante después de vocal: ver si es inicio de grupo consonántico
          var resto = s.slice(i+1, i+3);
          var esGrupo = gruposCons.indexOf(resto)>=0;
          if(esGrupo && i+3 < s.length && vocales.indexOf(s[i+3])>=0){
            // no cortar, el grupo va con la siguiente sílaba
            partes.push(actual); actual = ''; i++; continue;
          }
          if(i+2 < s.length && vocales.indexOf(s[i+2])>=0){
            // una sola consonante entre vocales: va con la siguiente sílaba
            partes.push(actual); actual = ''; i++; continue;
          }
          // dos consonantes: primera con sílaba actual, segunda con siguiente
          if(i+2 < s.length && vocales.indexOf(s[i+2])<0){
            actual += s[i+1]; i++;
            partes.push(actual); actual = ''; i++; continue;
          }
          partes.push(actual); actual = '';
        } else {
          // dos vocales juntas: diptongo si una es débil, hiato si ambas fuertes
          var debilActual = debiles.indexOf(s[i])>=0;
          var debilProx = debiles.indexOf(prox)>=0;
          if(debilActual || debilProx){
            // diptongo: quedan juntas, seguir
          } else {
            // hiato: cortar
            partes.push(actual); actual = '';
          }
        }
      }
      i++;
    }
    if(actual) partes.push(actual);
    return partes.length ? partes : [s];
  }
  var COLORES_SIL = ['#FF6B6B','#4D96FF','#00B894','#FF9F43','#6C5CE7','#FF6B9D','#20C997','#F59F00'];

  function palabrasHTML(texto, sentIdx, lang){
    var palabras = String(texto||'').split(/(\s+)/);
    var html = '', wi = 0;
    palabras.forEach(function(p){
      if(/^\s+$/.test(p)){ html += p; return; }
      var interior = escapar(p);
      if(st && st.silabas){
        var limpia = p.replace(/[.,!?;:¿¡""]/g,'');
        var sil = separarSilabas(limpia);
        interior = sil.map(function(si,ci){
          return '<span class="sb-sil" style="color:'+COLORES_SIL[ci%COLORES_SIL.length]+';">'+escapar(si)+'</span>';
        }).join('<span style="color:#ccc;">·</span>');
        var punt = p.match(/[.,!?;:¿¡""]+$/); if(punt) interior += escapar(punt[0]);
      }
      html += '<span class="sb-word" data-word="'+wi+'" data-sent="'+sentIdx+'" data-lang="'+lang+'">'+interior+'</span>';
      wi++;
    });
    return html;
  }

  /* ================= LECTOR ================= */
  function renderLectura(){
    var c = st.cuento, pag = c.paginas[st.pagina]||c.paginas[0];
    var total = c.paginas.length, cont = st.contenedor;
    var primario = st.lang, secundario = primario==='es'?'en':'es';

    var palabrasTexto = (pag.oraciones||[]).map(function(o){return (o[primario]||o.es).toLowerCase();}).join(' ');
    var vocabDisp = (c.vocabulario||[]).filter(function(v){ return palabrasTexto.indexOf((v[primario]||v.es||'').toLowerCase())>=0; });
    st.palabraOculta = vocabDisp.length ? (vocabDisp[Math.floor(Math.random()*vocabDisp.length)][primario]||vocabDisp[0].es) : null;
    var txtToca = st.lang==='en'?'Touch the word':'Tocá la palabra';
    var pistaOculta = st.palabraOculta ? ('<div class="sb-hint" id="sb-hint">🔍 '+txtToca+': <b>'+escapar(st.palabraOculta)+'</b></div>') : '';

    var oracionesHtml = '';
    (pag.oraciones||[]).forEach(function(o, i){
      var textoP = o[primario]||o.es, textoS = o[secundario]||o.en;
      oracionesHtml +=
        '<div class="sb-sentence" data-sent="'+i+'">'+
          '<button class="sb-speak-btn" data-speak="'+i+'" data-lang="'+primario+'" title="ES">🔊</button>'+
          '<div class="sb-sentence-text">'+palabrasHTML(textoP, i, primario)+
            (st.mostrarTrad?'<span class="sb-sentence-translation">'+escapar(textoS)+'</span>':'')+
          '</div>'+
          '<button class="sb-speak-btn secondary" data-speak="'+i+'" data-lang="'+secundario+'" title="EN">🌐</button>'+
          '<button class="sb-mic-btn" data-mic="'+i+'" title="Practicar">🎤</button>'+
        '</div>';
    });
    oracionesHtml = pistaOculta + oracionesHtml;

    var velLabel = st.velocidad<=0.6 ? (st.lang==='en'?'Slow':'Lento') : (st.velocidad>=1.2 ? (st.lang==='en'?'Fast':'Rápido') : (st.lang==='en'?'Normal':'Normal'));

    cont.innerHTML =
      '<div class="sb-root sb-page-enter'+(st.bedtime?' sb-bedtime':'')+'">'+
        '<div class="sb-header">'+
          '<button class="sb-btn-back" data-rdr-volver title="biblioteca">←</button>'+
          '<div style="flex:1;"><h2 class="sb-title">'+escapar(c.titulo[primario]||c.titulo.es)+'</h2>'+
          '<p class="sb-subtitle">'+escapar(t('pag'))+' '+(st.pagina+1)+' '+escapar(t('de'))+' '+total+'</p></div>'+
          '<button class="sb-toggle'+(st.lang==='en'?' on':'')+'" data-rdr-lang>'+(st.lang==='en'?'🇬🇧':'🇪🇸')+'</button>'+
        '</div>'+
        '<div class="sb-reader">'+
          '<div class="sb-page-illustration" style="background:'+escapar(pag.fondo||'#FFE8CC')+';">'+ilustracionHTML(pag.ilustracion)+'</div>'+
          '<div class="sb-page-text">'+oracionesHtml+'</div>'+
          '<div class="sb-toggle-row">'+
            '<button class="sb-toggle'+(st.mostrarTrad?' on':'')+'" data-rdr-trad>'+(st.mostrarTrad?'👁️':'🙈')+' '+escapar(t('mostrarTrad'))+'</button>'+
            '<button class="sb-toggle'+(st.karaoke?' on':'')+'" data-rdr-karaoke>🎤 '+escapar(t('karaoke'))+'</button>'+
            '<button class="sb-toggle'+(st.bedtime?' on':'')+'" data-rdr-bedtime>🌙 '+escapar(t('noche'))+'</button>'+
            '<button class="sb-toggle'+(st.silabas?' on':'')+'" data-rdr-silabas>🔤 '+escapar(t('silabas'))+'</button>'+
            '<button class="sb-toggle" data-rdr-velocidad>⚡ '+velLabel+'</button>'+
            '<button class="sb-toggle" data-rdr-readpage>▶️ '+escapar(t('leerPagina'))+'</button>'+
            '<button class="sb-toggle" data-rdr-stop>⏹️ '+escapar(t('detener'))+'</button>'+
          '</div>'+
          '<div class="sb-reader-controls">'+
            '<button class="sb-nav-btn prev" data-rdr-prev'+(st.pagina===0?' disabled':'')+'>← '+escapar(t('atras'))+'</button>'+
            '<div class="sb-page-indicator">'+(st.pagina+1)+' / '+total+'</div>'+
            '<button class="sb-nav-btn next" data-rdr-next>'+(st.pagina===total-1?'🏁 '+escapar(t('fin')):escapar(t('siguiente'))+' →')+'</button>'+
          '</div>'+
        '</div>'+
        '<div class="sb-action-row" style="margin-top:14px;">'+
          '<button class="sb-action-btn secondary" data-rdr-vista="vocabulario">📝 '+escapar(t('vocabulario'))+'</button>'+
          '<button class="sb-action-btn accent" data-rdr-vista="preguntas">❓ '+escapar(t('preguntas'))+'</button>'+
          '<button class="sb-action-btn ghost" data-rdr-vista="juego">🎮 '+escapar(t('juego'))+'</button>'+
          '<button class="sb-action-btn primary" data-rdr-vista="silabas">🔤 '+escapar(t('silabas'))+'</button>'+
          '<button class="sb-action-btn secondary" data-rdr-vista="formar">🧩 '+escapar(t('formarPalabras'))+'</button>'+
        '</div>'+
      '</div>';

    cont.querySelector('[data-rdr-volver]').addEventListener('click', function(){ st.opts.detenerAudio(); st.opts.onCerrar(); });
    cont.querySelector('[data-rdr-lang]').addEventListener('click', function(){ st.lang = st.lang==='es'?'en':'es'; renderLectura(); });
    cont.querySelector('[data-rdr-trad]').addEventListener('click', function(){ st.mostrarTrad = !st.mostrarTrad; renderLectura(); });
    cont.querySelector('[data-rdr-stop]').addEventListener('click', function(){ st.opts.detenerAudio(); });
    cont.querySelector('[data-rdr-karaoke]').addEventListener('click', function(){ st.karaoke = !st.karaoke; renderLectura(); });
    cont.querySelector('[data-rdr-bedtime]').addEventListener('click', function(){ st.bedtime = !st.bedtime; renderLectura(); });
    cont.querySelector('[data-rdr-silabas]').addEventListener('click', function(){ st.silabas = !st.silabas; renderLectura(); });
    cont.querySelector('[data-rdr-velocidad]').addEventListener('click', function(){
      st.velocidad = st.velocidad<=0.6 ? 0.9 : (st.velocidad>=1.2 ? 0.6 : 1.2); renderLectura();
    });
    cont.querySelectorAll('.sb-word').forEach(function(w){
      w.addEventListener('click', function(e){
        e.stopPropagation();
        var palabra = w.textContent.replace(/·/g,'');
        var lang = w.getAttribute('data-lang');
        st.opts.hablar(palabra.replace(/[.,!?;:]/g,''), lang);
        w.classList.add('hl'); setTimeout(function(){ w.classList.remove('hl'); }, 600);
        if(st.palabraOculta && palabra.toLowerCase().indexOf(st.palabraOculta.toLowerCase().slice(0,4))>=0){
          var hint = cont.querySelector('#sb-hint');
          if(hint){ hint.innerHTML = '✅ ¡'+escapar(palabra)+'! +1 ⭐'; hint.style.color = '#00B894'; }
          if(st.opts.sumarEstrellas) st.opts.sumarEstrellas(1);
          EK.SB.sonido.estrella();
          st.palabraOculta = null;
          setTimeout(function(){ var h2=cont.querySelector('#sb-hint'); if(h2) h2.style.display='none'; }, 1500);
        }
      });
    });
    cont.querySelectorAll('.sb-mic-btn').forEach(function(b){
      b.addEventListener('click', function(e){ e.stopPropagation(); practicarPronunciacion(parseInt(b.getAttribute('data-mic'),10)); });
    });
    cont.querySelector('[data-rdr-readpage]').addEventListener('click', function(){ leerPaginaCompleta(); });
    var prev = cont.querySelector('[data-rdr-prev]');
    if(!prev.disabled) prev.addEventListener('click', function(){
      st.opts.detenerAudio();
      if(st.pagina>0){ st.pagina--; st.opts.setProgreso(st.cuento.id, st.pagina+1); renderLectura(); }
    });
    cont.querySelector('[data-rdr-next]').addEventListener('click', function(){
      st.opts.detenerAudio();
      if(st.pagina < total-1){ st.pagina++; st.opts.setProgreso(st.cuento.id, st.pagina+1); renderLectura(); }
      else { st.opts.onTerminado(); st.vista='fin'; renderFin(); }
    });
    cont.querySelectorAll('[data-speak]').forEach(function(b){
      b.addEventListener('click', function(e){
        e.stopPropagation(); hablarOracion(parseInt(b.getAttribute('data-speak'),10), b.getAttribute('data-lang'));
      });
    });
    cont.querySelectorAll('.sb-sentence').forEach(function(row){
      row.addEventListener('click', function(){ hablarOracion(parseInt(row.getAttribute('data-sent'),10), primario); });
    });
    // botones de juegos
    cont.querySelectorAll('[data-rdr-vista]').forEach(function(b){
      b.addEventListener('click', function(){ abrirVista(b.getAttribute('data-rdr-vista')); });
    });
  }

  function abrirVista(v){
    st.opts.detenerAudio();
    st.vista = v;
    if(v==='vocabulario') renderVocabulario();
    else if(v==='preguntas'){ st.quizIdx=0; st.quizScore=0; renderPreguntas(); }
    else if(v==='juego') renderJuego();
    else if(v==='silabas') renderJuegoSilabas();
    else if(v==='formar') renderJuegoFormar();
    else if(v==='ordenar') renderOrdenar();
    else if(v==='completar') renderCompletar();
    else { st.vista='lectura'; renderLectura(); }
  }

  function hablarOracion(i, lang){
    var pag = st.cuento.paginas[st.pagina], o = (pag.oraciones||[])[i]; if(!o) return;
    var texto = o[lang]||o.es;
    var row = st.contenedor.querySelector('.sb-sentence[data-sent="'+i+'"]');
    if(row){ st.contenedor.querySelectorAll('.sb-sentence.playing').forEach(function(r){ r.classList.remove('playing'); }); row.classList.add('playing'); }
    st.opts.hablar(texto, lang, function(){ if(row) row.classList.remove('playing'); });
  }

  function leerPaginaCompleta(){
    var pag = st.cuento.paginas[st.pagina], oraciones = pag.oraciones||[];
    var i = 0;
    function siguiente(){
      if(i>=oraciones.length || !st || st.vista!=='lectura') return;
      var idx = i; i++;
      var texto = oraciones[idx][st.lang]||oraciones[idx].es;
      var row = st.contenedor.querySelector('.sb-sentence[data-sent="'+idx+'"]');
      if(row){ st.contenedor.querySelectorAll('.sb-sentence.playing').forEach(function(r){ r.classList.remove('playing'); }); row.classList.add('playing'); }
      var rate = st.bedtime ? 0.7 : st.velocidad;
      if('speechSynthesis' in window){
        try{ window.speechSynthesis.cancel(); }catch(e){}
        var u = new SpeechSynthesisUtterance(texto);
        u.lang = st.lang==='en'?'en-US':'es-ES'; u.rate=rate; u.pitch=0.85; u.volume=1;
        try{
          var vs = window.speechSynthesis.getVoices()||[];
          var vi = vs.filter(function(v){ return (v.lang||'').toLowerCase().startsWith(st.lang); })
                     .find(function(v){ var n=(v.name||'').toLowerCase(); return n.indexOf('natural')>=0||n.indexOf('male')>=0||n.indexOf('hombre')>=0||n.indexOf('google')>=0||n.indexOf('microsoft')>=0; });
          if(vi) u.voice = vi;
        }catch(e){}
        var palabrasRow = row ? row.querySelectorAll('.sb-word') : [];
        u.onboundary = function(ev){
          if(!row) return;
          var ci = ev.charIndex||0, acum = 0, target = 0;
          for(var k=0;k<palabrasRow.length;k++){ acum += palabrasRow[k].textContent.replace(/·/g,'').length+1; target=k; if(acum>ci) break; }
          row.querySelectorAll('.sb-word.hl').forEach(function(w){ w.classList.remove('hl'); });
          if(palabrasRow[target]) palabrasRow[target].classList.add('hl');
        };
        u.onend = function(){
          if(row){ row.classList.remove('playing'); row.querySelectorAll('.sb-word.hl').forEach(function(w){ w.classList.remove('hl'); }); }
          setTimeout(siguiente, st.karaoke?600:350);
        };
        window.speechSynthesis.speak(u);
      } else {
        st.opts.hablar(texto, st.lang, function(){ if(row) row.classList.remove('playing'); setTimeout(siguiente, 350); });
      }
    }
    siguiente();
  }

  function normalizarTexto(s){ return (s||'').toLowerCase().replace(/[.,!?¡¿;:()"'-]/g,' ').replace(/\s+/g,' ').trim(); }
  function compararTextos(objetivo, reconocido){
    var a = normalizarTexto(objetivo).split(' ').filter(Boolean);
    var b = normalizarTexto(reconocido).split(' ').filter(Boolean);
    if(!a.length) return 0;
    var coinciden = 0;
    var bUsado = {};
    for(var i=0;i<a.length;i++){
      for(var j=0;j<b.length;j++){
        if(!bUsado[j] && (a[i]===b[j] || (a[i].length>3 && b[j].indexOf(a[i].slice(0,3))===0) || (b[j].length>3 && a[i].indexOf(b[j].slice(0,3))===0))){
          coinciden++; bUsado[j]=true; break;
        }
      }
    }
    return Math.round(coinciden/a.length*100);
  }
  function lanzarConfeti(){
    var colores=['#FF9F43','#FF6B9D','#4D96FF','#00B894','#FFD43B','#6C5CE7'];
    for(var i=0;i<40;i++){
      var c=document.createElement('div'); c.className='sb-confeti';
      c.style.left=(Math.random()*100)+'vw'; c.style.background=colores[i%colores.length];
      c.style.animation='sb-confetti-fall '+(1.5+Math.random()*1.5)+'s linear forwards';
      c.style.animationDelay=(Math.random()*0.5)+'s';
      document.body.appendChild(c); (function(el){setTimeout(function(){el.remove();},3500);})(c);
    }
  }
  function mostrarResultadoMic(pct, escuchado, objetivo){
    var v = (st&&st.lang)||'es';
    var estrellas = pct>=80?3:(pct>=60?2:(pct>=40?1:0));
    var msg = estrellas===3?(v==='en'?'Excellent! Perfect pronunciation!':'¡Excelente! Pronunciación perfecta')
             : estrellas===2?(v==='en'?'Very good! Keep it up!':'¡Muy bien! Seguí así')
             : estrellas===1?(v==='en'?'Good try! Practice more.':'¡Buen intento! Practicá más')
             : (v==='en'?'Try again! Listen first.':'Intentá de nuevo, escuchá primero');
    var starStr = estrellas>0 ? '⭐'.repeat(estrellas)+'☆'.repeat(3-estrellas) : '☆☆☆';
    var el = document.createElement('div'); el.className='sb-mic-result';
    el.innerHTML = '<div class="stars">'+starStr+'</div><div class="msg">'+msg+'</div>'+
      '<div class="pct">'+pct+'% '+ (v==='en'?'correct':'de precisión') +'</div>'+
      (escuchado?'<div class="heard">'+(v==='en'?'Heard:':'Escuchado:')+' "'+escuchado+'"</div>':'')+
      '<button onclick="this.parentElement.classList.remove(\'show\');setTimeout(function(){this.parentElement.remove();}.bind(this),400);">'+(v==='en'?'Close':'Cerrar')+'</button>';
    document.body.appendChild(el);
    setTimeout(function(){ el.classList.add('show'); }, 50);
    if(estrellas>=2){ lanzarConfeti(); if(st.opts && st.opts.sumarEstrellas) st.opts.sumarEstrellas(estrellas); }
    return estrellas;
  }
  function practicarPronunciacion(sentIdx){
    var pag = st.cuento.paginas[st.pagina], o = (pag.oraciones||[])[sentIdx]; if(!o) return;
    var row = st.contenedor.querySelector('.sb-sentence[data-sent="'+sentIdx+'"]');
    var objetivo = o.en || o.es; // el niño repite SIEMPRE en inglés
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SR){
      if(st.opts && st.opts.toast) st.opts.toast('🎤 Micrófono no soportado en este navegador (usá Chrome)');
      else alert('Tu navegador no soporta reconocimiento de voz. Usá Google Chrome.');
      return;
    }
    try{
      var rec = new SR();
      rec.lang = 'en-US'; rec.interimResults = false; rec.maxAlternatives = 3;
      if(row){ row.classList.add('playing'); var btn = row.querySelector('.sb-mic-btn'); if(btn) btn.classList.add('listening'); }
      if(st.opts && st.opts.toast) st.opts.toast('🎤 Repetí en inglés: '+objetivo);
      var finalizado = false;
      rec.onresult = function(e){
        finalizado = true;
        var transcript = '';
        var mejorPct = 0, mejorTxt = '';
        for(var a=0; a<e.results[0].length; a++){
          var t = e.results[0][a].transcript;
          var pct = compararTextos(objetivo, t);
          if(pct>mejorPct){ mejorPct=pct; mejorTxt=t; }
        }
        transcript = mejorTxt || e.results[0][0].transcript;
        var pctFinal = mejorPct || compararTextos(objetivo, transcript);
        var est = mostrarResultadoMic(pctFinal, transcript, objetivo);
        if(est>=2 && row) row.classList.add('approved');
        if(st.opts && st.opts.guardarProgreso) st.opts.guardarProgreso('mic_'+sentIdx, pctFinal);
      };
      rec.onerror = function(e){
        finalizado = true;
        if(st.opts && st.opts.toast){
          if(e.error==='not-allowed') st.opts.toast('🔒 Permiso de micrófono denegado. Habilitalo en el navegador.');
          else if(e.error==='no-speech') st.opts.toast('🤫 No escuché nada, hablá más fuerte.');
          else st.opts.toast('🎤 Error: '+e.error);
        }
      };
      rec.onend = function(){
        if(row){ row.classList.remove('playing'); var b2 = row.querySelector('.sb-mic-btn'); if(b2) b2.classList.remove('listening'); }
        if(!finalizado && st.opts && st.opts.toast) st.opts.toast('🎤 Intento finalizado, probá de nuevo.');
      };
      setTimeout(function(){ try{ rec.start(); }catch(e){} }, 100);
    }catch(err){ if(st.opts && st.opts.toast) st.opts.toast('🎤 Error al iniciar micrófono'); }
  }

  /* ================= VOCABULARIO ================= */
  function renderVocabulario(){
    var c = st.cuento, cont = st.contenedor, items = c.vocabulario||[];
    var html = '';
    items.forEach(function(v, i){
      html += '<div class="sb-vocab-card">'+
        '<span class="sb-vocab-img">'+escapar(v.img||'🔤')+'</span>'+
        '<div class="sb-vocab-words"><div class="sb-vocab-es">'+escapar(v.es)+'</div><div class="sb-vocab-en">'+escapar(v.en)+'</div></div>'+
        '<button class="sb-vocab-speak" data-voc="'+i+'" data-lang="es" title="ES">🔊</button>'+
        '<button class="sb-vocab-speak" data-voc="'+i+'" data-lang="en" title="EN" style="background:linear-gradient(135deg,#4D96FF,#6C5CE7);box-shadow:0 4px 10px rgba(77,150,255,.4);">🌐</button>'+
        '</div>';
    });
    cont.innerHTML = '<div class="sb-root sb-page-enter">'+
      '<div class="sb-header"><button class="sb-btn-back" data-rdr-volver>←</button>'+
      '<div style="flex:1;"><h2 class="sb-title">📝 '+escapar(t('vocabulario'))+'</h2><p class="sb-subtitle">'+escapar(c.titulo[st.lang]||c.titulo.es)+'</p></div></div>'+
      '<div class="sb-reader"><div class="sb-vocab-grid" style="padding-top:6px;">'+html+'</div></div>'+
      '<div class="sb-action-row" style="margin-top:14px;"><button class="sb-action-btn primary" data-rdr-back>📖 '+escapar(t('volverALeer'))+'</button></div>'+
      '</div>';
    cont.querySelector('[data-rdr-volver]').addEventListener('click', volverALectura);
    cont.querySelector('[data-rdr-back]').addEventListener('click', volverALectura);
    cont.querySelectorAll('[data-voc]').forEach(function(b){
      b.addEventListener('click', function(){
        var v = items[parseInt(b.getAttribute('data-voc'),10)], lg = b.getAttribute('data-lang');
        if(v) st.opts.hablar(v[lg], lg);
      });
    });
  }
  function volverALectura(){ st.opts.detenerAudio(); st.vista='lectura'; renderLectura(); }

  /* ================= PREGUNTAS ================= */
  function renderPreguntas(){
    var c = st.cuento, cont = st.contenedor, preguntas = c.preguntas||[];
    if(!preguntas.length){ volverALectura(); return; }
    if(st.quizIdx >= preguntas.length){ renderQuizResultado(); return; }
    var p = preguntas[st.quizIdx];
    var opciones = (p.opciones[st.lang]||p.opciones.es||[]).slice();
    var html = '';
    opciones.forEach(function(op, i){ html += '<button class="sb-quiz-opt" data-opt="'+i+'">'+escapar(op)+'</button>'; });
    cont.innerHTML = '<div class="sb-root sb-page-enter">'+
      '<div class="sb-header"><button class="sb-btn-back" data-rdr-volver>←</button>'+
      '<div style="flex:1;"><h2 class="sb-title">❓ '+escapar(t('preguntas'))+'</h2>'+
      '<p class="sb-subtitle">'+escapar(t('pregunta'))+' '+(st.quizIdx+1)+' '+escapar(t('de2'))+' '+preguntas.length+' · '+escapar(t('puntaje'))+': '+st.quizScore+'</p></div></div>'+
      '<div class="sb-reader"><div class="sb-quiz">'+
        '<div class="sb-quiz-q">'+escapar(p[st.lang]||p.es)+' <button class="sb-speak-btn" data-quiz-speak style="width:36px;height:36px;font-size:14px;vertical-align:middle;">🔊</button></div>'+
        '<div class="sb-quiz-options">'+html+'</div>'+
        '<div class="sb-quiz-feedback" id="sb-quiz-fb"></div>'+
      '</div></div></div>';
    cont.querySelector('[data-rdr-volver]').addEventListener('click', volverALectura);
    cont.querySelector('[data-quiz-speak]').addEventListener('click', function(){ st.opts.hablar(p[st.lang]||p.es, st.lang); });
    cont.querySelectorAll('.sb-quiz-opt').forEach(function(b){
      b.addEventListener('click', function(){
        var i = parseInt(b.getAttribute('data-opt'),10), correcta = p.correcta;
        var fb = cont.querySelector('#sb-quiz-fb');
        cont.querySelectorAll('.sb-quiz-opt').forEach(function(x){ x.disabled = true; });
        if(i===correcta){
          b.classList.add('correct'); st.quizScore++; fb.textContent = t('bien'); fb.style.color = 'var(--sb-green)';
          EK.SB.sonido.correcto(); if(st.opts.sumarEstrellas) st.opts.sumarEstrellas(1);
          st.opts.hablar(st.lang==='es'?'¡Muy bien!':'Great job!', st.lang);
        } else {
          b.classList.add('wrong'); EK.SB.sonido.incorrecto();
          var cb = cont.querySelector('.sb-quiz-opt[data-opt="'+correcta+'"]'); if(cb) cb.classList.add('correct');
          fb.textContent = t('mal'); fb.style.color = 'var(--sb-red)';
          st.opts.hablar(st.lang==='es'?'Intentá de nuevo':'Try again', st.lang);
        }
        setTimeout(function(){ st.quizIdx++; renderPreguntas(); }, 1600);
      });
    });
  }
  function renderQuizResultado(){
    var cont = st.contenedor, total = (st.cuento.preguntas||[]).length;
    if(st.quizScore === total){ EK.SB.confeti(50); EK.SB.sonido.victoria(); }
    cont.innerHTML = '<div class="sb-root"><div class="sb-finish">'+
      '<span class="trophy">🏆</span>'+
      '<h3>'+escapar(t('puntaje'))+': '+st.quizScore+' / '+total+'</h3>'+
      '<p>'+(st.quizScore===total?'🌟 ¡Perfecto! ¡Sos un genio!':'📖 '+escapar(t('leeOtraVez')))+'</p>'+
      '<div class="sb-action-row">'+
        '<button class="sb-action-btn primary" data-rdr-quiz-again>🔄 '+escapar(t('jugarDeNuevo'))+'</button>'+
        '<button class="sb-action-btn ghost" data-rdr-back>📖 '+escapar(t('volverALeer'))+'</button>'+
      '</div></div></div>';
    cont.querySelector('[data-rdr-quiz-again]').addEventListener('click', function(){ st.quizIdx=0; st.quizScore=0; renderPreguntas(); });
    cont.querySelector('[data-rdr-back]').addEventListener('click', volverALectura);
  }

  /* ================= MEMORIA / EMPAREJAR (mejorado) ================= */
  function renderJuego(){
    var c = st.cuento, cont = st.contenedor;
    var vocab = (c.vocabulario||[]).slice(0,6);
    var cartas = [];
    vocab.forEach(function(v, i){
      cartas.push({id:i, tipo:'A', img:v.img, texto:v.es, match:i});
      cartas.push({id:i, tipo:'B', img:'', texto:v.en, match:i});
    });
    st.match = { cartas: barajar(cartas), seleccionada:null, movidas:0, encontradas:0, total:vocab.length, bloqueado:false };
    cont.innerHTML = '<div class="sb-root sb-page-enter">'+
      '<div class="sb-header"><button class="sb-btn-back" data-rdr-volver>←</button>'+
      '<div style="flex:1;"><h2 class="sb-title">🎮 '+escapar(t('juego'))+'</h2><p class="sb-subtitle">'+escapar(t('empareja'))+'</p></div></div>'+
      '<div style="text-align:center;margin-bottom:12px;"><span class="sb-match-hud">'+escapar(t('movidas'))+': <span id="sb-moves">0</span> · '+st.match.total+' pares</span></div>'+
      '<div class="sb-reader"><div class="sb-match-grid" id="sb-match-grid"></div></div></div>';
    cont.querySelector('[data-rdr-volver]').addEventListener('click', volverALectura);
    renderMatchGrid();
  }
  function renderMatchGrid(){
    var grid = st.contenedor.querySelector('#sb-match-grid'); if(!grid) return;
    grid.innerHTML = '';
    st.match.cartas.forEach(function(carta, pos){
      var el = document.createElement('button');
      el.className = 'sb-match-card';
      el.setAttribute('data-pos', pos);
      if(carta.matched){ el.classList.add('matched'); el.disabled = true; }
      if(carta.revelada || carta.matched){
        el.classList.add('revelada');
        el.innerHTML = carta.tipo==='A'
          ? '<div><div style="font-size:30px;">'+escapar(carta.img||'🔤')+'</div><div style="font-size:12px;font-weight:900;">'+escapar(carta.texto)+'</div></div>'
          : '<div style="font-size:14px;font-weight:900;">'+escapar(carta.texto)+'</div>';
      } else {
        el.textContent = '❓';
      }
      el.addEventListener('click', function(){ tocarCarta(pos); });
      grid.appendChild(el);
    });
    var mv = st.contenedor.querySelector('#sb-moves'); if(mv) mv.textContent = st.match.movidas;
  }
  function tocarCarta(pos){
    var m = st.match; if(m.bloqueado) return;
    var carta = m.cartas[pos];
    if(carta.matched || carta.revelada) return;
    carta.revelada = true; EK.SB.sonido.click(); renderMatchGrid();
    if(m.seleccionada === null){ m.seleccionada = pos; return; }
    m.movidas++;
    var primera = m.cartas[m.seleccionada];
    if(primera.match === carta.match){
      primera.matched = true; carta.matched = true; m.encontradas++; m.seleccionada = null;
      EK.SB.sonido.correcto(); if(st.opts.sumarEstrellas) st.opts.sumarEstrellas(1);
      renderMatchGrid();
      if(m.encontradas >= m.total){
        setTimeout(function(){
          EK.SB.confeti(70); EK.SB.sonido.victoria();
          var hud = st.contenedor.querySelector('.sb-match-hud');
          if(hud) hud.innerHTML = '🎉 ¡Ganaste en '+m.movidas+' movidas! +⭐';
          st.opts.hablar(st.lang==='es'?'¡Felicidades, ganaste!':'Congratulations, you won!', st.lang);
        }, 400);
      }
    } else {
      m.bloqueado = true; EK.SB.sonido.incorrecto();
      var pos1 = m.seleccionada; m.seleccionada = null;
      setTimeout(function(){ m.cartas[pos1].revelada = false; carta.revelada = false; m.bloqueado = false; renderMatchGrid(); }, 900);
    }
    var mv = st.contenedor.querySelector('#sb-moves'); if(mv) mv.textContent = m.movidas;
  }

  /* ================= JUEGO NUEVO: SÍLABAS (tocar en orden) ================= */
  function renderJuegoSilabas(){
    var c = st.cuento, cont = st.contenedor;
    var vocab = (c.vocabulario||[]).filter(function(v){ return (v[st.lang]||v.es||'').length >= 4; });
    if(!vocab.length){ vocab = c.vocabulario||[]; }
    st.silGame = { lista: barajar(vocab).slice(0,5), idx:0, bien:0 };
    function renderUna(){
      var item = st.silGame.lista[st.silGame.idx];
      var palabra = (item[st.lang]||item.es).toLowerCase().replace(/[^a-záéíóúüñ]/g,'');
      var silabas = separarSilabas(palabra);
      st.silGame.actual = { silabas: silabas, tileIdx: 0, palabra: palabra, item: item };
      var tiles = barajar(silabas.slice());
      var slotsHtml = '', tilesHtml = '';
      for(var s=0; s<silabas.length; s++){
        slotsHtml += '<div class="sb-sil-slot" data-slot="'+s+'">?</div>';
      }
      tiles.forEach(function(si, ti){
        tilesHtml += '<button class="sb-sil-tile" data-tile="'+ti+'" data-sil="'+escapar(si)+'">'+escapar(si)+'</button>';
      });
      cont.querySelector('#sb-sil-body').innerHTML =
        '<div class="sb-sil-target">'+escapar(item.img||'🔤')+'</div>'+
        '<div class="sb-sil-word">'+escapar(palabra)+'</div>'+
        '<div class="sb-sil-hint">'+escapar(t('tocaSilabas'))+' ('+silabas.length+' '+escapar(t('silabas')).toLowerCase()+')</div>'+
        '<div class="sb-sil-slots">'+slotsHtml+'</div>'+
        '<div class="sb-sil-tiles">'+tilesHtml+'</div>'+
        '<div class="sb-quiz-feedback" id="sb-sil-fb"></div>';
      cont.querySelectorAll('.sb-sil-tile').forEach(function(b){
        b.addEventListener('click', function(){
          var sil = b.getAttribute('data-sil');
          var esperado = st.silGame.actual.silabas[st.silGame.actual.tileIdx];
          var fb = cont.querySelector('#sb-sil-fb');
          if(sil === esperado){
            b.disabled = true;
            var slot = cont.querySelector('.sb-sil-slot[data-slot="'+st.silGame.actual.tileIdx+'"]');
            if(slot){ slot.textContent = sil; slot.classList.add('filled'); }
            st.silGame.actual.tileIdx++;
            EK.SB.sonido.correcto();
            st.opts.hablar(sil, st.lang);
            if(st.silGame.actual.tileIdx >= st.silGame.actual.silabas.length){
              if(st.opts.sumarEstrellas) st.opts.sumarEstrellas(2);
              fb.textContent = '✅ ¡'+escapar(palabra)+'! +2 ⭐'; fb.style.color = 'var(--sb-green)';
              EK.SB.sonido.victoria(); st.silGame.bien++;
              st.opts.hablar(palabra, st.lang);
              setTimeout(function(){
                st.silGame.idx++;
                if(st.silGame.idx < st.silGame.lista.length) renderUna();
                else {
                  cont.querySelector('#sb-sil-body').innerHTML = '<div class="sb-finish"><span class="trophy">🔤</span>'+
                    '<h3>'+escapar(t('puntaje'))+': '+st.silGame.bien+' / '+st.silGame.lista.length+'</h3>'+
                    '<div class="sb-action-row" style="margin-top:16px;">'+
                    '<button class="sb-action-btn primary" data-rdr-sil-again>🔄 '+escapar(t('jugarDeNuevo'))+'</button>'+
                    '<button class="sb-action-btn ghost" data-rdr-back>📖 '+escapar(t('volverALeer'))+'</button></div></div>';
                  EK.SB.confeti(60);
                  cont.querySelector('[data-rdr-sil-again]').addEventListener('click', renderJuegoSilabas);
                  cont.querySelector('[data-rdr-back]').addEventListener('click', volverALectura);
                }
              }, 1400);
            }
          } else {
            b.classList.add('wrong'); EK.SB.sonido.incorrecto();
            fb.textContent = st.lang==='en'?'Not that one, try again!':'No, esa no es. Intentá de nuevo 💪';
            fb.style.color = 'var(--sb-red)';
            setTimeout(function(){ b.classList.remove('wrong'); }, 500);
          }
        });
      });
    }
    cont.innerHTML = '<div class="sb-root sb-page-enter">'+
      '<div class="sb-header"><button class="sb-btn-back" data-rdr-volver>←</button>'+
      '<div style="flex:1;"><h2 class="sb-title">🔤 '+escapar(t('silabas'))+'</h2>'+
      '<p class="sb-subtitle">'+escapar(t('tocaSilabas'))+'</p></div></div>'+
      '<div class="sb-reader"><div id="sb-sil-body"></div></div></div>';
    cont.querySelector('[data-rdr-volver]').addEventListener('click', volverALectura);
    renderUna();
  }

  /* ================= JUEGO NUEVO: FORMAR PALABRAS (letras) ================= */
  function renderJuegoFormar(){
    var c = st.cuento, cont = st.contenedor;
    var vocab = (c.vocabulario||[]).filter(function(v){ var p=(v[st.lang]||v.es||''); return p.length>=3 && p.length<=7; });
    if(!vocab.length){ vocab = c.vocabulario||[]; }
    st.formGame = { lista: barajar(vocab).slice(0,5), idx:0, bien:0 };
    function renderUna(){
      var item = st.formGame.lista[st.formGame.idx];
      var palabra = (item[st.lang]||item.es).toLowerCase().replace(/[^a-záéíóúüñ]/g,'');
      var letras = palabra.split('');
      // agregar letras distractoras
      var todasLetras = 'abcdefghijklmnopqrstuvwxyz';
      var extra = [];
      while(extra.length < Math.min(3, 8-letras.length)){
        var l = todasLetras[Math.floor(Math.random()*todasLetras.length)];
        if(letras.indexOf(l)<0 && extra.indexOf(l)<0) extra.push(l);
      }
      var tiles = barajar(letras.concat(extra));
      st.formGame.actual = { palabra: palabra, letras: letras, construida: [], item: item };
      var slotsHtml = '', tilesHtml = '';
      for(var s=0; s<letras.length; s++){
        slotsHtml += '<div class="sb-sil-slot" data-slot="'+s+'" style="min-width:48px;height:52px;font-size:22px;text-transform:uppercase;">_</div>';
      }
      tiles.forEach(function(le, ti){
        tilesHtml += '<button class="sb-letter-tile" data-tile="'+ti+'" data-letra="'+escapar(le)+'">'+escapar(le)+'</button>';
      });
      cont.querySelector('#sb-form-body').innerHTML =
        '<div class="sb-sil-target">'+escapar(item.img||'🔤')+'</div>'+
        '<div class="sb-sil-hint">'+escapar(t('formaPalabra'))+' ('+letras.length+' letras)</div>'+
        '<div class="sb-sil-slots" id="sb-form-slots">'+slotsHtml+'</div>'+
        '<div class="sb-sil-tiles">'+tilesHtml+'</div>'+
        '<div class="sb-quiz-feedback" id="sb-form-fb"></div>'+
        '<div style="text-align:center;margin-top:10px;"><button class="sb-toggle" data-form-clear>↺ '+(st.lang==='en'?'Clear':'Borrar')+'</button></div>';
      function actualizarSlots(){
        var slots = cont.querySelectorAll('#sb-form-slots .sb-sil-slot');
        slots.forEach(function(sl, i){
          if(st.formGame.actual.construida[i]){ sl.textContent = st.formGame.actual.construida[i]; sl.classList.add('filled'); }
          else { sl.textContent = '_'; sl.classList.remove('filled'); }
        });
      }
      cont.querySelectorAll('.sb-letter-tile').forEach(function(b){
        b.addEventListener('click', function(){
          if(b.disabled) return;
          var le = b.getAttribute('data-letra');
          if(st.formGame.actual.construida.length >= st.formGame.actual.letras.length) return;
          st.formGame.actual.construida.push(le);
          b.disabled = true; b.style.opacity = '.25';
          EK.SB.sonido.click();
          actualizarSlots();
          if(st.formGame.actual.construida.length === st.formGame.actual.letras.length){
            var formada = st.formGame.actual.construida.join('');
            var fb = cont.querySelector('#sb-form-fb');
            if(formada === st.formGame.actual.palabra){
              fb.textContent = '✅ ¡'+escapar(formada)+'! +2 ⭐'; fb.style.color = 'var(--sb-green)';
              EK.SB.sonido.victoria(); if(st.opts.sumarEstrellas) st.opts.sumarEstrellas(2);
              st.formGame.bien++; st.opts.hablar(formada, st.lang); EK.SB.confeti(30);
              setTimeout(function(){
                st.formGame.idx++;
                if(st.formGame.idx < st.formGame.lista.length) renderUna();
                else {
                  cont.querySelector('#sb-form-body').innerHTML = '<div class="sb-finish"><span class="trophy">🧩</span>'+
                    '<h3>'+escapar(t('puntaje'))+': '+st.formGame.bien+' / '+st.formGame.lista.length+'</h3>'+
                    '<div class="sb-action-row" style="margin-top:16px;">'+
                    '<button class="sb-action-btn primary" data-rdr-form-again>🔄 '+escapar(t('jugarDeNuevo'))+'</button>'+
                    '<button class="sb-action-btn ghost" data-rdr-back>📖 '+escapar(t('volverALeer'))+'</button></div></div>';
                  EK.SB.confeti(60);
                  cont.querySelector('[data-rdr-form-again]').addEventListener('click', renderJuegoFormar);
                  cont.querySelector('[data-rdr-back]').addEventListener('click', volverALectura);
                }
              }, 1400);
            } else {
              fb.textContent = st.lang==='en'?'Not quite, clear and try again!':'No es así, borrá e intentá de nuevo 💪';
              fb.style.color = 'var(--sb-red)'; EK.SB.sonido.incorrecto();
            }
          }
        });
      });
      cont.querySelector('[data-form-clear]').addEventListener('click', function(){
        st.formGame.actual.construida = [];
        cont.querySelectorAll('.sb-letter-tile').forEach(function(b){ b.disabled = false; b.style.opacity='1'; });
        actualizarSlots();
        var fb = cont.querySelector('#sb-form-fb'); if(fb) fb.textContent='';
      });
    }
    cont.innerHTML = '<div class="sb-root sb-page-enter">'+
      '<div class="sb-header"><button class="sb-btn-back" data-rdr-volver>←</button>'+
      '<div style="flex:1;"><h2 class="sb-title">🧩 '+escapar(t('formarPalabras'))+'</h2>'+
      '<p class="sb-subtitle">'+escapar(t('formaPalabra'))+'</p></div></div>'+
      '<div class="sb-reader"><div id="sb-form-body"></div></div></div>';
    cont.querySelector('[data-rdr-volver]').addEventListener('click', volverALectura);
    renderUna();
  }

  /* ================= ORDENAR HISTORIA ================= */
  function renderOrdenar(){
    var c = st.cuento, cont = st.contenedor;
    var eventos = (c.paginas||[]).map(function(p,i){ return { idx:i, texto:(p.oraciones[0][st.lang]||p.oraciones[0].es) }; });
    var paso = Math.max(1, Math.floor(eventos.length/4));
    var sel = [];
    for(var k=0; k<eventos.length && sel.length<4; k+=paso) sel.push(eventos[k]);
    while(sel.length<4 && eventos.length) sel.push(eventos[eventos.length-1]);
    sel = sel.slice(0,4);
    var ordenCorrecto = sel.map(function(e){ return e.idx; });
    var desorden = barajar(sel.slice());
    st.orden = { sel: desorden, ordenCorrecto: ordenCorrecto, contador: 0 };
    var html = '';
    desorden.forEach(function(e,i){ html += '<button class="sb-order-card" data-ord="'+i+'">'+(i+1)+'. '+escapar(e.texto)+'</button>'; });
    cont.innerHTML = '<div class="sb-root sb-page-enter"><div class="sb-header"><button class="sb-btn-back" data-rdr-volver>←</button>'+
      '<div style="flex:1;"><h2 class="sb-title">📋 '+(st.lang==='en'?'Order the story':'Ordená la historia')+'</h2>'+
      '<p class="sb-subtitle">'+(st.lang==='en'?'Tap in the correct order':'Tocá en el orden correcto')+'</p></div></div>'+
      '<div class="sb-reader"><div class="sb-quiz" id="sb-ord-wrap">'+html+'</div><div class="sb-quiz-feedback" id="sb-ord-fb"></div></div></div>';
    cont.querySelector('[data-rdr-volver]').addEventListener('click', function(){ st.vista='fin'; renderFin(); });
    cont.querySelectorAll('.sb-order-card').forEach(function(b){
      b.addEventListener('click', function(){
        var idx = parseInt(b.getAttribute('data-ord'),10), ord = st.orden;
        if(b.classList.contains('done')) return;
        var esperado = ord.ordenCorrecto[ord.contador];
        if(ord.sel[idx].idx === esperado){
          b.classList.add('done'); b.disabled = true; ord.contador++;
          EK.SB.sonido.correcto(); if(st.opts.sumarEstrellas) st.opts.sumarEstrellas(1);
          if(ord.contador >= ord.ordenCorrecto.length){
            var f = cont.querySelector('#sb-ord-fb');
            if(f){ f.textContent = (st.lang==='en'?'🎉 Perfect! + stars':'🎉 ¡Perfecto! Sumaste estrellas'); f.style.color='var(--sb-green)'; }
            EK.SB.confeti(50); EK.SB.sonido.victoria();
          }
        } else {
          b.style.background='#FFE3E3'; EK.SB.sonido.incorrecto();
          setTimeout(function(){ b.style.background=''; }, 400);
          var f2 = cont.querySelector('#sb-ord-fb');
          if(f2){ f2.textContent=(st.lang==='en'?'Try again 💪':'No, intentá de nuevo 💪'); f2.style.color='var(--sb-red)'; }
        }
      });
    });
  }

  /* ================= COMPLETAR ORACIÓN ================= */
  function renderCompletar(){
    var c = st.cuento, cont = st.contenedor;
    var vocab = c.vocabulario||[];
    var preguntas = [];
    (c.paginas||[]).forEach(function(p){
      (p.oraciones||[]).forEach(function(o){
        var txt = o[st.lang]||o.es;
        for(var v=0; v<vocab.length; v++){
          var palabra = vocab[v][st.lang]||vocab[v].es;
          if(txt.toLowerCase().indexOf(palabra.toLowerCase())>=0 && preguntas.length<3){
            var otras = vocab.filter(function(x,j){ return j!==v; }).slice(0,2).map(function(x){ return x[st.lang]||x.es; });
            preguntas.push({ texto: txt, palabra: palabra, opciones: barajar([palabra].concat(otras)) });
            return;
          }
        }
      });
    });
    if(!preguntas.length){ st.vista='fin'; renderFin(); return; }
    st.comp = { lista: preguntas, idx:0, bien:0 };
    function renderUna(){
      var p = st.comp.lista[st.comp.idx];
      var txtMostrar = p.texto.replace(new RegExp(p.palabra,'i'), '_____');
      var opts = '';
      p.opciones.forEach(function(op,i){ opts += '<button class="sb-quiz-opt" data-comp="'+i+'">'+escapar(op)+'</button>'; });
      cont.querySelector('#sb-comp-body').innerHTML = '<div class="sb-quiz-q">'+escapar(txtMostrar)+'</div><div class="sb-quiz-options">'+opts+'</div><div class="sb-quiz-feedback" id="sb-comp-fb"></div>';
      cont.querySelectorAll('.sb-quiz-opt').forEach(function(b){
        b.addEventListener('click', function(){
          var elegida = p.opciones[parseInt(b.getAttribute('data-comp'),10)];
          cont.querySelectorAll('.sb-quiz-opt').forEach(function(x){ x.disabled=true; });
          if(elegida.toLowerCase() === p.palabra.toLowerCase()){
            b.classList.add('correct'); st.comp.bien++; EK.SB.sonido.correcto();
            if(st.opts.sumarEstrellas) st.opts.sumarEstrellas(1);
            var f=cont.querySelector('#sb-comp-fb'); if(f){ f.textContent=(st.lang==='en'?'Great! 🎉':'¡Muy bien! 🎉'); f.style.color='var(--sb-green)'; }
          } else {
            b.classList.add('wrong'); EK.SB.sonido.incorrecto();
            cont.querySelectorAll('.sb-quiz-opt').forEach(function(x){ if(p.opciones[parseInt(x.getAttribute('data-comp'),10)].toLowerCase()===p.palabra.toLowerCase()) x.classList.add('correct'); });
            var f2=cont.querySelector('#sb-comp-fb'); if(f2){ f2.textContent=(st.lang==='en'?'It was: '+p.palabra:'Era: '+p.palabra); f2.style.color='var(--sb-red)'; }
          }
          setTimeout(function(){
            st.comp.idx++;
            if(st.comp.idx < st.comp.lista.length) renderUna();
            else {
              cont.querySelector('#sb-comp-body').innerHTML = '<div class="sb-finish"><span class="trophy">🏆</span><h3>'+(st.lang==='en'?'Score: ':'Puntaje: ')+st.comp.bien+'/'+st.comp.lista.length+'</h3><button class="sb-action-btn primary" data-rdr-fin style="margin-top:16px;">📚 '+(st.lang==='en'?'Back':'Volver')+'</button></div>';
              if(st.comp.bien === st.comp.lista.length){ EK.SB.confeti(50); EK.SB.sonido.victoria(); }
              cont.querySelector('[data-rdr-fin]').addEventListener('click', function(){ st.vista='fin'; renderFin(); });
            }
          }, 1500);
        });
      });
    }
    cont.innerHTML = '<div class="sb-root sb-page-enter"><div class="sb-header"><button class="sb-btn-back" data-rdr-volver>←</button>'+
      '<div style="flex:1;"><h2 class="sb-title">✏️ '+(st.lang==='en'?'Fill in the blank':'Completá la oración')+'</h2></div></div>'+
      '<div class="sb-reader"><div class="sb-quiz" id="sb-comp-body"></div></div></div>';
    cont.querySelector('[data-rdr-volver]').addEventListener('click', function(){ st.vista='fin'; renderFin(); });
    renderUna();
  }

  /* ================= FIN DEL CUENTO ================= */
  function renderFin(){
    var cont = st.contenedor, c = st.cuento;
    cont.innerHTML = '<div class="sb-root"><div class="sb-finish">'+
      '<span class="trophy">🏆</span>'+
      '<h3>'+escapar(t('felicidades'))+'</h3>'+
      '<p>📖 '+escapar(c.titulo[st.lang]||c.titulo.es)+'</p>'+
      '<div class="sb-action-row">'+
        '<button class="sb-action-btn primary" data-rdr-releer>🔄 '+escapar(t('volverALeer'))+'</button>'+
        '<button class="sb-action-btn secondary" data-rdr-vista="vocabulario">📝 '+escapar(t('vocabulario'))+'</button>'+
        '<button class="sb-action-btn accent" data-rdr-vista="preguntas">❓ '+escapar(t('preguntas'))+'</button>'+
        '<button class="sb-action-btn ghost" data-rdr-vista="juego">🎮 '+escapar(t('juego'))+'</button>'+
        '<button class="sb-action-btn primary" data-rdr-vista="silabas">🔤 '+escapar(t('silabas'))+'</button>'+
        '<button class="sb-action-btn secondary" data-rdr-vista="formar">🧩 '+escapar(t('formarPalabras'))+'</button>'+
        '<button class="sb-action-btn accent" data-rdr-vista="ordenar">📋 '+escapar(t('ordenar'))+'</button>'+
        '<button class="sb-action-btn ghost" data-rdr-vista="completar">✏️ '+escapar(t('completar'))+'</button>'+
        '<button class="sb-action-btn ghost" data-rdr-biblio>📚 '+escapar(t('biblioteca'))+'</button>'+
        '<button class="sb-action-btn accent" data-rdr-cert>🏅 '+escapar(t('certificado'))+'</button>'+
      '</div></div></div>';
    cont.querySelector('[data-rdr-releer]').addEventListener('click', function(){ st.pagina=0; st.vista='lectura'; renderLectura(); });
    cont.querySelector('[data-rdr-biblio]').addEventListener('click', function(){ st.opts.detenerAudio(); st.opts.onCerrar(); });
    cont.querySelector('[data-rdr-cert]').addEventListener('click', renderCertificado);
    cont.querySelectorAll('[data-rdr-vista]').forEach(function(b){
      b.addEventListener('click', function(){ abrirVista(b.getAttribute('data-rdr-vista')); });
    });
  }

  /* ================= CERTIFICADO ================= */
  function renderCertificado(){
    var c = st.cuento, cont = st.contenedor;
    var estrellas = 0;
    try{ estrellas = parseInt(localStorage.getItem('buggyia.storybooks.estrellas')||'0',10); }catch(e){}
    if(EK.Storybooks && EK.Storybooks._store) estrellas = EK.Storybooks._store.estrellas||estrellas;
    var fecha = new Date().toLocaleDateString();
    cont.innerHTML = '<div class="sb-root"><div class="sb-cert">'+
      '<span class="big-emoji">🏅</span>'+
      '<h3>'+(st.lang==='en'?'READER CERTIFICATE':'CERTIFICADO DE LECTOR')+'</h3>'+
      '<p style="font-size:16px;font-weight:700;margin:4px 0;">'+(st.lang==='en'?'You finished:':'Terminaste:')+'</p>'+
      '<p style="font-size:18px;font-weight:900;color:#6C5CE7;margin:4px 0 12px;">📖 '+escapar(c.titulo[st.lang]||c.titulo.es)+'</p>'+
      '<p style="font-size:14px;color:#7A6A5A;">⭐ '+(st.lang==='en'?'Stars earned: ':'Estrellas ganadas: ')+estrellas+'</p>'+
      '<p style="font-size:13px;color:#7A6A5A;margin-top:12px;">📅 '+fecha+'</p>'+
      '<div class="sb-action-row" style="margin-top:16px;"><button class="sb-action-btn primary" data-rdr-fin>← '+(st.lang==='en'?'Back':'Volver')+'</button></div>'+
      '</div></div>';
    EK.SB.confeti(40);
    cont.querySelector('[data-rdr-fin]').addEventListener('click', function(){ st.vista='fin'; renderFin(); });
  }

  /* ================= API pública ================= */
  function abrir(cuento, meta, contenedor, opts){
    st = {
      cuento: cuento, meta: meta, contenedor: contenedor, opts: opts||{},
      lang: (opts&&opts.lang)||'es', pagina: 0, mostrarTrad: true, vista: 'lectura',
      quizIdx: 0, quizScore: 0, match: null, karaoke: false, bedtime: false,
      palabraOculta: null, silabas: false, velocidad: 0.9
    };
    var prog = opts && opts.getProgreso ? opts.getProgreso(cuento.id) : null;
    var totalPag = (cuento.paginas||[]).length;
    if(prog && prog.pagina>0 && prog.pagina<totalPag && !prog.terminado){
      st.pagina = Math.min(prog.pagina, totalPag-1);
    }
    renderLectura();
  }

  EK.StorybooksReader = { abrir: abrir, separarSilabas: separarSilabas };
})();
