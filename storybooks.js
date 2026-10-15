/* ============================================================
   STORYBOOKS BILINGÜES — VERSIÓN PREMIUM (todo incluido)
   Reemplaza a storybooks-final.js / storybooks.js + reader.
   Subir SOLO este archivo. Incluye CSS premium inyectado.
   Cargar: <script src="storybooks-premium.js"></script>
   Novedades: +4 cuentos largos y divertidos · Juego de Sílabas ·
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
      todas:'Todos', tabBiblio:'Biblioteca', tabFav:'Favoritos', tabProg:'Progreso', paginas:'páginas',
      leido:'Leído', vacioFav:'Aún no tenés favoritos. Tocá el corazón en un cuento.',
      vacioProg:'Aún no empezaste ningún cuento. ¡Elegí uno!', vacioBusq:'No encontramos cuentos con esa búsqueda.',
      cargando:'Cargando biblioteca...', error:'No se pudo cargar la biblioteca.', reintentar:'Reintentar',
      empezar:'Empezar', continuar:'Continuar', terminado:'Terminado',
      estrellas:'Estrellas', leidos:'Leídos', racha:'Días seguidos', meta:'Meta diaria' },
    en:{ titulo:'Bilingual Storybooks', subtitulo:'Stories in Spanish and English', buscar:'Search story...',
      todas:'All', tabBiblio:'Library', tabFav:'Favorites', tabProg:'Progress', paginas:'pages',
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
      return (v.lang||'').toLowerCase().startsWith(codigoIdioma.toLowerCase());
    });
    if(!vocesDelIdioma.length) return null;
    var preferida = vocesDelIdioma.find(function(v){
      var n = (v.name||'').toLowerCase();
      return n.indexOf('natural')>=0 || n.indexOf('male')>=0 || n.indexOf('hombre')>=0 ||
             n.indexOf('jorge')>=0 || n.indexOf('alvaro')>=0 || n.indexOf('google')>=0 ||
             n.indexOf('microsoft')>=0 || n.indexOf('samantha')>=0;
    });
    return preferida || vocesDelIdioma[0];
  }
  function hablar(texto, lang, onend){
    try{
      if(EK.Voz && typeof EK.Voz.hablar==='function'){
        EK.Voz.hablar(texto, { lang:lang==='en'?'en-US':'es-ES', rate:0.92, pitch:0.85, onend:onend }); return true;
      }
      if('speechSynthesis' in window){
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(texto);
        u.lang = lang==='en'?'en-US':'es-ES';
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

  function practicarPronunciacion(sentIdx){
    var pag = st.cuento.paginas[st.pagina], o = (pag.oraciones||[])[sentIdx]; if(!o) return;
    var texto = o[st.lang]||o.es, langCode = st.lang==='en'?'en-US':'es-AR';
    if(EK.Voz && typeof EK.Voz.escucharYComparar==='function'){
      var row = st.contenedor.querySelector('.sb-sentence[data-sent="'+sentIdx+'"]');
      if(row) row.classList.add('playing');
      EK.Voz.escucharYComparar(texto, langCode, function(res){
        if(row) row.classList.remove('playing');
        if(res && res.exito){ if(st.opts.sumarEstrellas) st.opts.sumarEstrellas(1); EK.SB.sonido.estrella(); st.opts.toast('⭐ ¡Perfecto! +1 estrella'); }
        else if(res && res.soportado===false) st.opts.toast('🎤 Micrófono no disponible');
        else st.opts.toast('💪 Casi, escuchá de nuevo');
      });
    } else st.opts.toast('🎤 Función micrófono no disponible');
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
