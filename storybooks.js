/* ============================================================
   STORYBOOKS BILINGÜES — archivo único todo-incluido
   Subir SOLO este archivo + storybooks.css. No necesita carpetas ni JSON.
   Cargar en index.html: <script src="storybooks-final.js"></script>
   ============================================================ */

var SB_CATALOGO = {"version": 1, "rutaBase": "storybooks/", "categorias": [{"id": "animales", "nombre": {"es": "Animales", "en": "Animals"}, "icono": "🐾"}, {"id": "naturaleza", "nombre": {"es": "Naturaleza", "en": "Nature"}, "icono": "🌿"}, {"id": "aventura", "nombre": {"es": "Aventura", "en": "Adventure"}, "icono": "🗺️"}, {"id": "ciencia", "nombre": {"es": "Ciencia", "en": "Science"}, "icono": "🔬"}, {"id": "amigos", "nombre": {"es": "Amistad", "en": "Friendship"}, "icono": "🤝"}], "niveles": [{"id": "inicial", "nombre": {"es": "Inicial 3-5 años", "en": "Early 3-5 yo"}}, {"id": "primario", "nombre": {"es": "Primario 6-9 años", "en": "Primary 6-9 yo"}}], "cuentos": [{"id": "el-perrito-que-queria-jugar", "archivo": "cuentos/el-perrito-que-queria-jugar.json", "titulo": {"es": "El Perrito que Quería Jugar", "en": "The Puppy Who Wanted to Play"}, "categoria": "animales", "nivel": "inicial", "paginas": 6, "portada": "🐶", "color": "#FF9F43", "destacado": true}, {"id": "la-luna-y-el-gatito", "archivo": "cuentos/la-luna-y-el-gatito.json", "titulo": {"es": "La Luna y el Gatito", "en": "The Moon and the Kitten"}, "categoria": "naturaleza", "nivel": "inicial", "paginas": 6, "portada": "🌙", "color": "#6C5CE7", "destacado": true}, {"id": "el-dinosaurio-curioso", "archivo": "cuentos/el-dinosaurio-curioso.json", "titulo": {"es": "El Dinosaurio Curioso", "en": "The Curious Dinosaur"}, "categoria": "ciencia", "nivel": "primario", "paginas": 7, "portada": "🦕", "color": "#00B894", "destacado": true}]};
var SB_CUENTOS = {"el-perrito-que-queria-jugar": {"id": "el-perrito-que-queria-jugar", "titulo": {"es": "El Perrito que Quería Jugar", "en": "The Puppy Who Wanted to Play"}, "categoria": "animales", "nivel": "inicial", "color": "#FF9F43", "portada": "🐶", "paginas": [{"ilustracion": "🐶🏡☀️", "fondo": "linear-gradient(160deg,#FFE8CC 0%,#FFD43B 100%)", "oraciones": [{"es": "Había una vez un perrito llamado Toby.", "en": "Once there was a puppy named Toby."}, {"es": "Vivía en una casa con un gran jardín.", "en": "He lived in a house with a big garden."}, {"es": "Toby tenía mucha energía y quería jugar.", "en": "Toby had lots of energy and wanted to play."}]}, {"ilustracion": "🐶🐱", "fondo": "linear-gradient(160deg,#FFD6A5 0%,#FFADAD 100%)", "oraciones": [{"es": "Toby fue a buscar a su amigo el gato.", "en": "Toby went to find his friend the cat."}, {"es": "—¿Querés jugar conmigo?— le preguntó.", "en": "\"Do you want to play with me?\" he asked."}, {"es": "El gato dijo que no, que quería dormir.", "en": "The cat said no, he wanted to sleep."}]}, {"ilustracion": "🐦🌳", "fondo": "linear-gradient(160deg,#CAFFBF 0%,#9BF6FF 100%)", "oraciones": [{"es": "Toby corrió hacia el árbol del jardín.", "en": "Toby ran to the tree in the garden."}, {"es": "Allí vio a un pájaro de colores hermosos.", "en": "There he saw a bird with beautiful colors."}, {"es": "El pájaro cantaba una canción muy alegre.", "en": "The bird sang a very happy song."}]}, {"ilustracion": "🐶🎾", "fondo": "linear-gradient(160deg,#A0C4FF 0%,#BDB2FF 100%)", "oraciones": [{"es": "Toby encontró su pelota roja favorita.", "en": "Toby found his favorite red ball."}, {"es": "La olfateó y movió la cola con alegría.", "en": "He sniffed it and wagged his tail happily."}, {"es": "—¡Jugaré solo!— pensó Toby.", "en": "\"I will play alone!\" thought Toby."}]}, {"ilustracion": "🐶🧒🎾", "fondo": "linear-gradient(160deg,#FFC6FF 0%,#FFADAD 100%)", "oraciones": [{"es": "De pronto, llegó el niño de la casa.", "en": "Suddenly, the boy from the house arrived."}, {"es": "—¡Toby, vení a jugar!— le gritó.", "en": "\"Toby, come play!\" he shouted."}, {"es": "Toby corrió muy feliz hacia su amigo.", "en": "Toby ran very happily toward his friend."}]}, {"ilustracion": "🧒🐶❤️", "fondo": "linear-gradient(160deg,#FDFFB6 0%,#FFD6A5 100%)", "oraciones": [{"es": "Jugaron toda la tarde con la pelota.", "en": "They played all afternoon with the ball."}, {"es": "Toby comprendió que compartir es más divertido.", "en": "Toby learned that sharing is more fun."}, {"es": "Y desde ese día, siempre jugaron juntos.", "en": "And from that day, they always played together."}]}], "vocabulario": [{"es": "perrito", "en": "puppy", "img": "🐶"}, {"es": "jugar", "en": "to play", "img": "🎾"}, {"es": "gato", "en": "cat", "img": "🐱"}, {"es": "pájaro", "en": "bird", "img": "🐦"}, {"es": "pelota", "en": "ball", "img": "⚽"}, {"es": "jardín", "en": "garden", "img": "🌳"}, {"es": "amigo", "en": "friend", "img": "🧒"}, {"es": "feliz", "en": "happy", "img": "😊"}], "preguntas": [{"es": "¿Cómo se llamaba el perrito?", "en": "What was the puppy's name?", "opciones": {"es": ["Toby", "Max", "Luna", "Rocky"], "en": ["Toby", "Max", "Luna", "Rocky"]}, "correcta": 0}, {"es": "¿Qué quería hacer el gato cuando Toby lo buscó?", "en": "What did the cat want to do when Toby found him?", "opciones": {"es": ["Dormir", "Jugar", "Comer", "Correr"], "en": ["Sleep", "Play", "Eat", "Run"]}, "correcta": 0}, {"es": "¿De qué color era la pelota de Toby?", "en": "What color was Toby's ball?", "opciones": {"es": ["Roja", "Azul", "Verde", "Amarilla"], "en": ["Red", "Blue", "Green", "Yellow"]}, "correcta": 0}, {"es": "¿Qué aprendió Toby al final del cuento?", "en": "What did Toby learn at the end of the story?", "opciones": {"es": ["Compartir es más divertido", "Los gatos son malos", "Jugar solo es mejor", "Las pelotas son aburridas"], "en": ["Sharing is more fun", "Cats are mean", "Playing alone is better", "Balls are boring"]}, "correcta": 0}]}, "la-luna-y-el-gatito": {"id": "la-luna-y-el-gatito", "titulo": {"es": "La Luna y el Gatito", "en": "The Moon and the Kitten"}, "categoria": "naturaleza", "nivel": "inicial", "color": "#6C5CE7", "portada": "🌙", "paginas": [{"ilustracion": "🐱🏠🌙", "fondo": "linear-gradient(160deg,#2D1B69 0%,#6C5CE7 100%)", "oraciones": [{"es": "Era una noche tranquila y estrellada.", "en": "It was a quiet, starry night."}, {"es": "Una gatita llamada Mimi miraba por la ventana.", "en": "A kitten named Mimi looked out the window."}, {"es": "La luna brillaba grande y redonda en el cielo.", "en": "The moon shone big and round in the sky."}]}, {"ilustracion": "🐱⭐", "fondo": "linear-gradient(160deg,#1A1A40 0%,#494D8E 100%)", "oraciones": [{"es": "—¿Será la luna un plato de leche?— pensó Mimi.", "en": "\"Is the moon a bowl of milk?\" thought Mimi."}, {"es": "Tenía muchísima curiosidad por tocarla.", "en": "She was very curious to touch it."}, {"es": "Las estrellas parpadeaban como luciérnagas.", "en": "The stars twinkled like fireflies."}]}, {"ilustracion": "🐱🌳", "fondo": "linear-gradient(160deg,#2D3561 0%,#5C7CFA 100%)", "oraciones": [{"es": "Mimi salió al jardín y trepó un árbol alto.", "en": "Mimi went to the garden and climbed a tall tree."}, {"es": "Quería estar más cerca de la luna brillante.", "en": "She wanted to be closer to the bright moon."}, {"es": "Pero la luna seguía muy, muy lejos.", "en": "But the moon was still very, very far away."}]}, {"ilustracion": "🦉🐱", "fondo": "linear-gradient(160deg,#3E2C6B 0%,#845EC2 100%)", "oraciones": [{"es": "Un búho sabio la vio desde su rama.", "en": "A wise owl saw her from his branch."}, {"es": "—La luna está lejos, pequeña gatita— le dijo.", "en": "\"The moon is far away, little kitten,\" he told her."}, {"es": "—Pero su luz siempre te acompañará—.", "en": "\"But its light will always be with you.\""}]}, {"ilustracion": "🐱💧🌙", "fondo": "linear-gradient(160deg,#1F3A5F 0%,#45B7D1 100%)", "oraciones": [{"es": "Mimi bajó del árbol y encontró un charquito.", "en": "Mimi climbed down and found a small puddle."}, {"es": "¡La luna se reflejaba en el agua clara!", "en": "The moon was reflected in the clear water!"}, {"es": "Tocó el agua y la luna se rió en ondas.", "en": "She touched the water and the moon laughed in ripples."}]}, {"ilustracion": "🐱😴🌙", "fondo": "linear-gradient(160deg,#2D1B69 0%,#FF8FA3 100%)", "oraciones": [{"es": "Mimi volvió a casa contenta y cansada.", "en": "Mimi returned home happy and tired."}, {"es": "Soñó que volaba entre las estrellas con la luna.", "en": "She dreamed she flew among the stars with the moon."}, {"es": "Y la luna la cuidó durante toda la noche.", "en": "And the moon watched over her all night long."}]}], "vocabulario": [{"es": "luna", "en": "moon", "img": "🌙"}, {"es": "gatito", "en": "kitten", "img": "🐱"}, {"es": "estrellas", "en": "stars", "img": "⭐"}, {"es": "noche", "en": "night", "img": "🌃"}, {"es": "búho", "en": "owl", "img": "🦉"}, {"es": "árbol", "en": "tree", "img": "🌳"}, {"es": "charco", "en": "puddle", "img": "💧"}, {"es": "brillar", "en": "to shine", "img": "✨"}], "preguntas": [{"es": "¿Cómo se llamaba la gatita?", "en": "What was the kitten's name?", "opciones": {"es": ["Mimi", "Luna", "Nube", "Sol"], "en": ["Mimi", "Luna", "Nube", "Sol"]}, "correcta": 0}, {"es": "¿Qué pensó Mimi que era la luna?", "en": "What did Mimi think the moon was?", "opciones": {"es": ["Un plato de leche", "Un queso", "Una pelota", "Un ojo"], "en": ["A bowl of milk", "A cheese", "A ball", "An eye"]}, "correcta": 0}, {"es": "¿Quién le habló a Mimi en el árbol?", "en": "Who spoke to Mimi in the tree?", "opciones": {"es": ["Un búho", "Un pájaro", "Un perro", "Una mariposa"], "en": ["An owl", "A bird", "A dog", "A butterfly"]}, "correcta": 0}, {"es": "¿Dónde vio Mimi la luna reflejada?", "en": "Where did Mimi see the moon reflected?", "opciones": {"es": ["En un charco de agua", "En un espejo", "En la ventana", "En el río"], "en": ["In a puddle of water", "In a mirror", "In the window", "In the river"]}, "correcta": 0}]}, "el-dinosaurio-curioso": {"id": "el-dinosaurio-curioso", "titulo": {"es": "El Dinosaurio Curioso", "en": "The Curious Dinosaur"}, "categoria": "ciencia", "nivel": "primario", "color": "#00B894", "portada": "🦕", "paginas": [{"ilustracion": "🦕🌋🌿", "fondo": "linear-gradient(160deg,#00B894 0%,#FFE066 100%)", "oraciones": [{"es": "Hace millones de años, vivía un dinosaurio llamado Dino.", "en": "Millions of years ago, a dinosaur named Dino lived."}, {"es": "Era un braquiosaurio de cuello largo y ojos curiosos.", "en": "He was a brachiosaurus with a long neck and curious eyes."}, {"es": "Siempre se preguntaba qué había más allá de las montañas.", "en": "He always wondered what lay beyond the mountains."}]}, {"ilustracion": "🦕🌿🦖", "fondo": "linear-gradient(160deg,#94D82D 0%,#20C997 100%)", "oraciones": [{"es": "Un día, Dino decidió emprender un gran viaje.", "en": "One day, Dino decided to go on a great journey."}, {"es": "Sus amigos le advirtieron que había peligros afuera.", "en": "His friends warned him there were dangers outside."}, {"es": "Pero Dino quería descubrir el mundo por sí mismo.", "en": "But Dino wanted to discover the world for himself."}]}, {"ilustracion": "🌋🔥", "fondo": "linear-gradient(160deg,#FA5252 0%,#FF922B 100%)", "oraciones": [{"es": "Caminó hasta llegar a un volcán que echaba humo.", "en": "He walked until he reached a volcano that smoked."}, {"es": "Aprendió que la tierra a veces se calienta mucho.", "en": "He learned that the earth sometimes gets very hot."}, {"es": "Dino observó desde lejos, sin acercarse demasiado.", "en": "Dino watched from afar, without getting too close."}]}, {"ilustracion": "🌊🐟🦕", "fondo": "linear-gradient(160deg,#4D96FF 0%,#9BF6FF 100%)", "oraciones": [{"es": "Llegó a un mar enorme y de un azul profundo.", "en": "He reached an enormous sea of deep blue."}, {"es": "Vio peces de todos los colores y formas nadar.", "en": "He saw fish of every color and shape swimming."}, {"es": "—¡Cuántas cosas nuevas!— pensó Dino asombrado.", "en": "\"So many new things!\" thought Dino, amazed."}]}, {"ilustracion": "❄️🏔️🦕", "fondo": "linear-gradient(160deg,#74C0FC 0%,#E7F5FF 100%)", "oraciones": [{"es": "Después subió a montañas cubiertas de nieve.", "en": "Then he climbed mountains covered in snow."}, {"es": "Hacía mucho frío, pero Dino estaba muy emocionado.", "en": "It was very cold, but Dino was very excited."}, {"es": "Desde arriba vio todo el mundo a sus pies.", "en": "From the top he saw the whole world at his feet."}]}, {"ilustracion": "🦕🌠", "fondo": "linear-gradient(160deg,#2D1B69 0%,#845EC2 100%)", "oraciones": [{"es": "En el camino de regreso, vio estrellas fugaces cruzar el cielo.", "en": "On the way back, he saw shooting stars cross the sky."}, {"es": "Dino comprendió que el mundo era enorme y maravilloso.", "en": "Dino understood the world was enormous and wonderful."}, {"es": "Y que siempre habría algo nuevo por descubrir.", "en": "And that there would always be something new to discover."}]}, {"ilustracion": "🦕🦕🦕❤️", "fondo": "linear-gradient(160deg,#00B894 0%,#FFE066 100%)", "oraciones": [{"es": "Cuando volvió, les contó todas sus aventuras a sus amigos.", "en": "When he returned, he told all his adventures to his friends."}, {"es": "Los dinosaurios escucharon asombrados sus historias.", "en": "The dinosaurs listened amazed to his stories."}, {"es": "Desde entonces, Dino enseñó que la curiosidad nos hace crecer.", "en": "Since then, Dino taught that curiosity makes us grow."}]}], "vocabulario": [{"es": "dinosaurio", "en": "dinosaur", "img": "🦕"}, {"es": "curioso", "en": "curious", "img": "🤔"}, {"es": "volcán", "en": "volcano", "img": "🌋"}, {"es": "mar", "en": "sea", "img": "🌊"}, {"es": "montaña", "en": "mountain", "img": "🏔️"}, {"es": "nieve", "en": "snow", "img": "❄️"}, {"es": "descubrir", "en": "to discover", "img": "🔍"}, {"es": "viaje", "en": "journey", "img": "🧭"}, {"es": "estrella", "en": "star", "img": "⭐"}, {"es": "aventura", "en": "adventure", "img": "🗺️"}], "preguntas": [{"es": "¿Qué tipo de dinosaurio era Dino?", "en": "What kind of dinosaur was Dino?", "opciones": {"es": ["Braquiosaurio", "Tiranosaurio", "Triceratops", "Pterodáctilo"], "en": ["Brachiosaurus", "Tyrannosaurus", "Triceratops", "Pterodactyl"]}, "correcta": 0}, {"es": "¿Qué vio Dino echar humo durante su viaje?", "en": "What did Dino see smoking during his journey?", "opciones": {"es": ["Un volcán", "Una fogata", "Un barco", "Una nube"], "en": ["A volcano", "A campfire", "A boat", "A cloud"]}, "correcta": 0}, {"es": "¿Qué había en la cima de las montañas?", "en": "What was on top of the mountains?", "opciones": {"es": ["Nieve", "Arena", "Flores", "Agua"], "en": ["Snow", "Sand", "Flowers", "Water"]}, "correcta": 0}, {"es": "¿Qué enseñó Dino a sus amigos al volver?", "en": "What did Dino teach his friends when he returned?", "opciones": {"es": ["Que la curiosidad nos hace crecer", "Que no hay que viajar", "Que los volcanes son seguros", "Que el mar es pequeño"], "en": ["That curiosity makes us grow", "That one should not travel", "That volcanoes are safe", "That the sea is small"]}, "correcta": 0}, {"es": "¿Qué vio cruzar el cielo de regreso?", "en": "What did he see cross the sky on the way back?", "opciones": {"es": ["Estrellas fugaces", "Pájaros", "Aviones", "Nubes grises"], "en": ["Shooting stars", "Birds", "Airplanes", "Gray clouds"]}, "correcta": 0}]}};


SB_CATALOGO.categorias.push(
  { id: 'crecimiento', nombre: { es: 'Crecimiento', en: 'Growing' }, icono: '🌱' },
  { id: 'mar',        nombre: { es: 'Mar',        en: 'Sea' },     icono: '🐋' }
);
SB_CATALOGO.cuentos.push(
  { id:'la-semilla-valiente', archivo:'', titulo:{es:'La Semilla Valiente',en:'The Brave Seed'}, categoria:'naturaleza', nivel:'inicial', paginas:5, portada:'🌱', color:'#6BCB77', destacado:true },
  { id:'el-cohete-que-queria-volar', archivo:'', titulo:{es:'El Cohete que Quería Volar',en:'The Rocket Who Wanted to Fly'}, categoria:'ciencia', nivel:'primario', paginas:5, portada:'🚀', color:'#4D96FF', destacado:true },
  { id:'la-ballena-y-el-farolito', archivo:'', titulo:{es:'La Ballena y el Farolito',en:'The Whale and the Little Lantern'}, categoria:'mar', nivel:'primario', paginas:5, portada:'🐋', color:'#45B7D1', destacado:true }
);
SB_CUENTOS['la-semilla-valiente'] = {
  id:'la-semilla-valiente', titulo:{es:'La Semilla Valiente',en:'The Brave Seed'}, categoria:'naturaleza', nivel:'inicial', color:'#6BCB77', portada:'🌱',
  paginas:[
    { ilustracion:'🌰🌰🌰', fondo:'linear-gradient(160deg,#D8F3DC,#95D5B2)', oraciones:[
      {es:'Había una vez una semilla muy pequeña.',en:'Once there was a very tiny seed.'},
      {es:'Todas las semillas querían crecer en el jardín.',en:'All the seeds wanted to grow in the garden.'},
      {es:'Pero la semillita tenía miedo de la tierra oscura.',en:'But the little seed was afraid of the dark earth.'} ]},
    { ilustracion:'🌱💧☀️', fondo:'linear-gradient(160deg,#B7E4C7,#74C69D)', oraciones:[
      {es:'Un día, la lluvia la llamó suavemente.',en:'One day, the rain called softly to her.'},
      {es:'—Salí, pequeña semilla, el sol te espera—.',en:'"Come out, little seed, the sun is waiting."'},
      {es:'La semilla respiró hondo y se animó.',en:'The seed took a deep breath and dared.'} ]},
    { ilustracion:'🌿🐛', fondo:'linear-gradient(160deg,#95D5B2,#52B788)', oraciones:[
      {es:'Empujó la tierra con todas sus fuerzas.',en:'She pushed the earth with all her strength.'},
      {es:'Un gusano la ayudó a abrirse camino.',en:'A worm helped her make her way.'},
      {es:'Poco a poco, un brotecito verde asomó.',en:'Little by little, a green sprout peeked out.'} ]},
    { ilustracion:'🌻🦋☀️', fondo:'linear-gradient(160deg,#FFE066,#FFD43B)', oraciones:[
      {es:'El sol la acarició y creció muy deprisa.',en:'The sun caressed her and she grew fast.'},
      {es:'Se convirtió en un girasol altísimo y dorado.',en:'She became a tall, golden sunflower.'},
      {es:'Las mariposas venían a visitarla todas las mañanas.',en:'Butterflies came to visit her every morning.'} ]},
    { ilustracion:'🌻🌻🌻❤️', fondo:'linear-gradient(160deg,#FFD43B,#FF9F43)', oraciones:[
      {es:'La semilla comprendió que el miedo era normal.',en:'The seed understood that fear is normal.'},
      {es:'Que hay que atreverse para crecer y ser feliz.',en:'That you must dare to grow and be happy.'},
      {es:'Y ahora sus propias semillas vuelan al viento.',en:'And now her own seeds fly in the wind.'} ]}
  ],
  vocabulario:[
    {es:'semilla',en:'seed',img:'🌰'},{es:'crecer',en:'to grow',img:'🌱'},{es:'tierra',en:'earth',img:'🪴'},
    {es:'sol',en:'sun',img:'☀️'},{es:'girasol',en:'sunflower',img:'🌻'},{es:'valiente',en:'brave',img:'💪'}
  ],
  preguntas:[
    {es:'¿De qué tenía miedo la semilla?',en:'What was the seed afraid of?',opciones:{es:['La tierra oscura','El sol','La lluvia','Las mariposas'],en:['The dark earth','The sun','The rain','Butterflies']},correcta:0},
    {es:'¿Quién ayudó a la semilla?',en:'Who helped the seed?',opciones:{es:['Un gusano','Un pájaro','Una mariposa','El viento'],en:['A worm','A bird','A butterfly','The wind']},correcta:0},
    {es:'¿En qué se convirtió?',en:'What did she become?',opciones:{es:['Un girasol','Un árbol','Una rosa','Un cactus'],en:['A sunflower','A tree','A rose','A cactus']},correcta:0}
  ]
};
SB_CUENTOS['el-cohete-que-queria-volar'] = {
  id:'el-cohete-que-queria-volar', titulo:{es:'El Cohete que Quería Volar',en:'The Rocket Who Wanted to Fly'}, categoria:'ciencia', nivel:'primario', color:'#4D96FF', portada:'🚀',
  paginas:[
    { ilustracion:'🚀🏭⭐', fondo:'linear-gradient(160deg,#A0C4FF,#BDB2FF)', oraciones:[
      {es:'En un taller vivía un cohete pequeño llamado Rocco.',en:'In a workshop lived a small rocket named Rocco.'},
      {es:'Soñaba con volar muy alto, entre las estrellas.',en:'He dreamed of flying high, among the stars.'},
      {es:'Pero los cohetes grandes decían que era muy chico.',en:'But the big rockets said he was too small.'} ]},
    { ilustracion:'🔧👨‍🚀', fondo:'linear-gradient(160deg,#FFD6A5,#FFB4A2)', oraciones:[
      {es:'Un ingeniero lo revisó pieza por pieza.',en:'An engineer checked him piece by piece.'},
      {es:'—Tienes un corazón grande, Rocco— le dijo.',en:'"You have a big heart, Rocco," he told him.'},
      {es:'Le puso un motor nuevo y una ventana redonda.',en:'He put a new engine and a round window on him.'} ]},
    { ilustracion:'🚀🔥☁️', fondo:'linear-gradient(160deg,#FFADAD,#FF6B6B)', oraciones:[
      {es:'Llegó el día del gran lanzamiento.',en:'The day of the big launch arrived.'},
      {es:'Rocco encendió sus motores con valentía.',en:'Rocco fired his engines bravely.'},
      {es:'Subió más rápido que ningún otro cohete.',en:'He climbed faster than any other rocket.'} ]},
    { ilustracion:'🌍🚀🌙', fondo:'linear-gradient(160deg,#2D1B69,#4D96FF)', oraciones:[
      {es:'Vio la Tierra desde arriba, azul y hermosa.',en:'He saw the Earth from above, blue and beautiful.'},
      {es:'Tocó la luna con la punta de su nariz.',en:'He touched the moon with the tip of his nose.'},
      {es:'Las estrellas le dieron la bienvenida riendo.',en:'The stars welcomed him with laughter.'} ]},
    { ilustracion:'🚀⭐❤️', fondo:'linear-gradient(160deg,#4D96FF,#6C5CE7)', oraciones:[
      {es:'Rocco comprendió que el tamaño no importa.',en:"Rocco understood that size doesn't matter."},
      {es:'Lo que importa es querer volar muy alto.',en:'What matters is wanting to fly high.'},
      {es:'Ahora él ayuda a otros cohetes chicos a creer.',en:'Now he helps other small rockets believe.'} ]}
  ],
  vocabulario:[
    {es:'cohete',en:'rocket',img:'🚀'},{es:'volar',en:'to fly',img:'✈️'},{es:'estrella',en:'star',img:'⭐'},
    {es:'ingeniero',en:'engineer',img:'👨‍🔧'},{es:'luna',en:'moon',img:'🌙'},{es:'valiente',en:'brave',img:'💪'}
  ],
  preguntas:[
    {es:'¿Cómo se llamaba el cohete?',en:"What was the rocket's name?",opciones:{es:['Rocco','Luna','Tito','Nube'],en:['Rocco','Luna','Tito','Nube']},correcta:0},
    {es:'¿Qué le puso el ingeniero?',en:'What did the engineer put on him?',opciones:{es:['Un motor nuevo','Un sombrero','Unas alas','Un espejo'],en:['A new engine','A hat','Wings','A mirror']},correcta:0},
    {es:'¿Qué comprendió al final?',en:'What did he understand at the end?',opciones:{es:['Que el tamaño no importa','Que los grandes son mejores','Que no debe volar','Que la luna es fría'],en:["That size doesn't matter",'That big ones are better','That he should not fly','That the moon is cold']},correcta:0}
  ]
};
SB_CUENTOS['la-ballena-y-el-farolito'] = {
  id:'la-ballena-y-el-farolito', titulo:{es:'La Ballena y el Farolito',en:'The Whale and the Little Lantern'}, categoria:'mar', nivel:'primario', color:'#45B7D1', portada:'🐋',
  paginas:[
    { ilustracion:'🐋🌊🌑', fondo:'linear-gradient(160deg,#023E8A,#0077B6)', oraciones:[
      {es:'En el fondo del mar vivía una ballena azul.',en:'At the bottom of the sea lived a blue whale.'},
      {es:'Era tan grande que todos le tenían miedo.',en:'She was so big that everyone was afraid of her.'},
      {es:'Pero ella era muy sola y quería un amigo.',en:'But she was very lonely and wanted a friend.'} ]},
    { ilustracion:'🏮🐠✨', fondo:'linear-gradient(160deg,#0077B6,#00B4D8)', oraciones:[
      {es:'Una noche encontró un farolito encendido.',en:'One night she found a little lantern lit.'},
      {es:'Flotaba suavemente entre los peces de colores.',en:'It floated softly among the colorful fish.'},
      {es:'—¿Quién eres?— preguntó la ballena.',en:'"Who are you?" asked the whale.'} ]},
    { ilustracion:'🐋🏮❤️', fondo:'linear-gradient(160deg,#00B4D8,#90E0EF)', oraciones:[
      {es:'—Soy la luz que guía a los perdidos— respondió.',en:'"I am the light that guides the lost," it answered.'},
      {es:'La ballena lo llevó pegado a su frente.',en:'The whale carried it on her forehead.'},
      {es:'Juntos nadaron por el mar oscuro y profundo.',en:'Together they swam the dark, deep sea.'} ]},
    { ilustracion:'🐋🏮🐙🦀', fondo:'linear-gradient(160deg,#90E0EF,#CAF0F8)', oraciones:[
      {es:'Ayudaron a un pulpo a encontrar su cueva.',en:'They helped an octopus find his cave.'},
      {es:'Guiaron a unos cangrejos de regreso a casa.',en:'They guided some crabs back home.'},
      {es:'Todos los animales querían ser sus amigos.',en:'All the animals wanted to be their friends.'} ]},
    { ilustracion:'🐋🏮⭐🌊', fondo:'linear-gradient(160deg,#48CAE4,#0096C7)', oraciones:[
      {es:'La ballena comprendió que no hay que tener miedo.',en:'The whale understood that one must not be afraid.'},
      {es:'Que la amabilidad es la luz más brillante.',en:'That kindness is the brightest light.'},
      {es:'Y desde entonces, el farolito nunca se apagó.',en:'And since then, the little lantern never went out.'} ]}
  ],
  vocabulario:[
    {es:'ballena',en:'whale',img:'🐋'},{es:'mar',en:'sea',img:'🌊'},{es:'luz',en:'light',img:'💡'},
    {es:'amigo',en:'friend',img:'🤝'},{es:'pez',en:'fish',img:'🐠'},{es:'nadar',en:'to swim',img:'🏊'}
  ],
  preguntas:[
    {es:'¿Por qué tenían miedo de la ballena?',en:'Why were they afraid of the whale?',opciones:{es:['Era muy grande','Era mala','Era rápida','Era oscura'],en:['She was very big','She was mean','She was fast','She was dark']},correcta:0},
    {es:'¿Qué encontró la ballena?',en:'What did the whale find?',opciones:{es:['Un farolito encendido','Un tesoro','Un barco','Una isla'],en:['A lit little lantern','A treasure','A ship','An island']},correcta:0},
    {es:'¿Qué comprendió?',en:'What did she understand?',opciones:{es:['Que la amabilidad es la luz más brillante','Que los peces son tontos','Que el mar es frío','Que debe estar sola'],en:['That kindness is the brightest light','That fish are silly','That the sea is cold','That she should be alone']},correcta:0}
  ]
};

/* ============================================================
   storybooks-final.js — MUNDO COMPLETO "Storybooks Bilingües" para BuggyIA
   TODO EN UN SOLO ARCHIVO: biblioteca + lector + catálogo + 3 cuentos embebidos.
   Sin JSON externos, sin carpetas, sin fetch. Subir este archivo SOLAMENTE.: catálogo, búsqueda, categorías, favoritos,
   progreso de lectura y carga diferida (lazy) de JSON.
   Se apoya en voz.js (EK.Voz.hablar) cuando existe.
   Cargar DESPUÉS de mundos.js, engine.js y voz.js:
     <script src="storybooks.js"></script>
     <script src="storybooks-reader.js"></script>
   ============================================================ */
(function () {
  'use strict';
  window.EK = window.EK || {};

  /* ---------- Definición del mundo (auto-registro) ---------- */
  var MUNDO_STORYBOOKS = {
    id: 'storybooks',
    nombre: 'Storybooks Bilingües',
    emoji: '📚',
    color: '#FF9F43',
    tipo: 'storybooks',
    nivel: 'todos',
    desc: 'Cuentos en español e inglés con audio, vocabulario y juegos'
  };

  // Si mundos.js ya expuso la lista, agregamos el mundo sin tocar mundos.js
  function registrarMundo() {
    try {
      var lista = null;
      if (Array.isArray(EK.Mundos)) lista = EK.Mundos;
      else if (EK.Mundos && Array.isArray(EK.Mundos.MUNDOS)) lista = EK.Mundos.MUNDOS;
      else if (EK.Mundos && Array.isArray(EK.Mundos.mundos)) lista = EK.Mundos.mundos;
      else if (window.MUNDOS && Array.isArray(window.MUNDOS)) lista = window.MUNDOS;
      if (lista && !lista.some(function (m) { return m && m.id === 'storybooks'; })) {
        lista.push(MUNDO_STORYBOOKS);
      }
    } catch (e) { /* silencioso: se registra vía INTEGRACIÓN si hace falta */ }
  }
  registrarMundo();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registrarMundo);
  }

  /* ---------- Ruta base (detecta desde el propio script) ---------- */
  function detectarRutaBase() {
    if (window.SB_RUTA_BASE) return window.SB_RUTA_BASE;
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src || '';
      if (src.indexOf('storybooks.js') >= 0) {
        return src.replace(/[^/]*storybooks\.js.*$/, '') + 'storybooks/';
      }
    }
    return 'storybooks/';
  }
  var RUTA_BASE = detectarRutaBase();

  /* ---------- Estado ---------- */
  var estado = {
    lang: (localStorage.getItem('buggyia.lang') || 'es').slice(0, 2),
    tab: 'biblioteca',          // biblioteca | favoritos | progreso
    categoria: 'todas',
    busqueda: '',
    catalogo: null,
    contenedor: null
  };

  var TXT = {
    es: {
      titulo: 'Storybooks Bilingües',
      subtitulo: 'Cuentos en español e inglés',
      buscar: 'Buscar cuento...',
      todas: 'Todos',
      tabBiblio: 'Biblioteca',
      tabFav: 'Favoritos',
      tabProg: 'Progreso',
      paginas: 'páginas',
      leido: 'Leído',
      vacioFav: 'Aún no tenés favoritos. Tocá el corazón en un cuento.',
      vacioProg: 'Aún no empezaste ningún cuento. ¡Elegí uno!',
      vacioBusq: 'No encontramos cuentos con esa búsqueda.',
      cargando: 'Cargando biblioteca...',
      error: 'No se pudo cargar la biblioteca. Revisá la conexión.',
      reintentar: 'Reintentar',
      empezar: 'Empezar',
      continuar: 'Continuar',
      terminado: 'Terminado'
    },
    en: {
      titulo: 'Bilingual Storybooks',
      subtitulo: 'Stories in Spanish and English',
      buscar: 'Search story...',
      todas: 'All',
      tabBiblio: 'Library',
      tabFav: 'Favorites',
      tabProg: 'Progress',
      paginas: 'pages',
      leido: 'Read',
      vacioFav: 'No favorites yet. Tap the heart on a story.',
      vacioProg: 'No stories started yet. Pick one!',
      vacioBusq: 'No stories match that search.',
      cargando: 'Loading library...',
      error: 'Could not load library. Check connection.',
      reintentar: 'Retry',
      empezar: 'Start',
      continuar: 'Continue',
      terminado: 'Finished'
    }
  };
  function t(k) { return (TXT[estado.lang] || TXT.es)[k] || TXT.es[k]; }

  /* ---------- Persistencia (favoritos + progreso) ---------- */
  var CLAVE = 'buggyia.storybooks';
  function cargarStore() {
    try {
      var raw = localStorage.getItem(CLAVE);
      if (raw) { var o = JSON.parse(raw); return o && typeof o === 'object' ? o : {}; }
    } catch (e) {}
    return { favoritos: [], progreso: {} };
  }
  function guardarStore(s) {
    try { localStorage.setItem(CLAVE, JSON.stringify(s)); } catch (e) {}
  }
  var store = cargarStore();
  if (!Array.isArray(store.favoritos)) store.favoritos = [];
  if (!store.progreso || typeof store.progreso !== 'object') store.progreso = {};

  function esFavorito(id) { return store.favoritos.indexOf(id) >= 0; }
  function toggleFavorito(id) {
    var i = store.favoritos.indexOf(id);
    if (i >= 0) store.favoritos.splice(i, 1); else store.favoritos.push(id);
    guardarStore(store);
    return esFavorito(id);
  }
  function getProgreso(id) { return store.progreso[id] || { pagina: 0, terminado: false }; }
  function setProgreso(id, pagina, terminado) {
    var p = store.progreso[id] || { pagina: 0, terminado: false };
    p.pagina = Math.max(p.pagina || 0, pagina || 0);
    if (terminado) p.terminado = true;
    p.fecha = new Date().toISOString();
    store.progreso[id] = p;
    guardarStore(store);
  }

  /* ---------- Carga diferida del catálogo (JSON) ---------- */
  function cargarCatalogo() {
    if (estado.catalogo) return Promise.resolve(estado.catalogo);
    estado.catalogo = SB_CATALOGO;
    return Promise.resolve(SB_CATALOGO);
  }
  function cargarCuento(meta) {
    return Promise.resolve(SB_CUENTOS[meta.id]);
  }

  /* ---------- Audio (reutiliza voz.js si existe) ---------- */
  function hablar(texto, lang, onend) {
    try {
      if (EK.Voz && typeof EK.Voz.hablar === 'function') {
        EK.Voz.hablar(texto, { lang: lang === 'en' ? 'en-US' : 'es-AR', rate: 0.9, onend: onend });
        return true;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(texto);
        u.lang = lang === 'en' ? 'en-US' : 'es-AR';
        u.rate = 0.9; u.pitch = 1.1;
        if (onend) u.onend = onend;
        window.speechSynthesis.speak(u);
        return true;
      }
    } catch (e) {}
    return false;
  }
  function detenerAudio() {
    try { if (EK.Voz && EK.Voz.detener) EK.Voz.detener(); } catch (e) {}
    try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
  }

  /* ---------- Toast ---------- */
  function toast(msg) {
    var el = document.createElement('div');
    el.className = 'sb-toast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 2200);
  }

  /* ---------- Render: biblioteca ---------- */
  function escapar(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // Portada/ilustración: si es URL de imagen se usa <img>, sino emoji/texto.
  function esImagenURL(v) {
    if (!v || typeof v !== 'string') return false;
    return /^https?:\/\//i.test(v) || /\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(v);
  }
  function portadaHTML(v) {
    if (esImagenURL(v)) {
      return '<img src="' + escapar(v) + '" alt="" style="width:100%;height:100%;object-fit:cover;display:block;">';
    }
    return escapar(v || '📖');
  }

  function filtrarCuentos(cat) {
    var q = estado.busqueda.trim().toLowerCase();
    return (cat.cuentos || []).filter(function (c) {
      if (estado.categoria !== 'todas' && c.categoria !== estado.categoria) return false;
      if (estado.tab === 'favoritos' && !esFavorito(c.id)) return false;
      if (estado.tab === 'progreso') {
        var p = getProgreso(c.id);
        if (!(p.pagina > 0 || p.terminado)) return false;
      }
      if (q) {
        var hit = (c.titulo.es || '').toLowerCase().indexOf(q) >= 0 ||
                  (c.titulo.en || '').toLowerCase().indexOf(q) >= 0 ||
                  (c.id || '').toLowerCase().indexOf(q) >= 0;
        if (!hit) return false;
      }
      return true;
    });
  }

  function renderBiblioteca() {
    var cont = estado.contenedor;
    var cat = estado.catalogo;
    var txt = t;
    var cats = cat.categorias || [];
    var cuentos = filtrarCuentos(cat);

    var chips = '<div class="sb-chips">';
    chips += '<button class="sb-chip' + (estado.categoria === 'todas' ? ' active' : '') + '" data-cat="todas">📖 ' + escapar(txt('todas')) + '</button>';
    cats.forEach(function (c) {
      var activo = estado.categoria === c.id ? ' active' : '';
      chips += '<button class="sb-chip' + activo + '" data-cat="' + escapar(c.id) + '">' +
               escapar(c.icono || '📁') + ' ' + escapar((c.nombre[estado.lang] || c.nombre.es)) + '</button>';
    });
    chips += '</div>';

    var grid = '';
    if (!cuentos.length) {
      var msj = estado.tab === 'favoritos' ? txt('vacioFav') : (estado.tab === 'progreso' ? txt('vacioProg') : txt('vacioBusq'));
      grid = '<div class="sb-empty"><span class="big">🔍</span>' + escapar(msj) + '</div>';
    } else {
      grid = '<div class="sb-grid">';
      cuentos.forEach(function (c) {
        var prog = getProgreso(c.id);
        var porcentaje = c.paginas ? Math.min(100, Math.round((prog.pagina / c.paginas) * 100)) : 0;
        if (prog.terminado) porcentaje = 100;
        var catMeta = cats.filter(function (x) { return x.id === c.categoria; })[0] || {};
        var catNombre = catMeta.nombre ? (catMeta.nombre[estado.lang] || catMeta.nombre.es) : c.categoria;
        var btnLabel = prog.terminado ? '↻ ' + escapar(txt('leido')) : (prog.pagina > 0 ? '▶ ' + escapar(txt('continuar')) : '▶ ' + escapar(txt('empezar')));
        grid += '<div class="sb-book-card" data-cuento="' + escapar(c.id) + '">' +
          '<button class="sb-fav-btn" data-fav="' + escapar(c.id) + '" aria-label="favorito">' + (esFavorito(c.id) ? '❤️' : '🤍') + '</button>' +
          '<div class="sb-book-cover" style="background:' + escapar(c.color || '#FF9F43') + '22;">' + portadaHTML(c.portada) + '</div>' +
          '<div class="sb-book-info">' +
            '<h4 class="sb-book-title">' + escapar(c.titulo[estado.lang] || c.titulo.es) + '</h4>' +
            '<div class="sb-book-meta">' +
              '<span class="sb-badge" style="background:' + escapar(c.color || '#FF9F43') + ';">' + escapar(catNombre) + '</span>' +
              '<span>📄 ' + c.paginas + ' ' + escapar(txt('paginas')) + '</span>' +
            '</div>' +
            '<div class="sb-progress-bar"><div class="sb-progress-fill" style="width:' + porcentaje + '%"></div></div>' +
          '</div>' +
        '</div>';
      });
      grid += '</div>';
    }

    cont.innerHTML =
      '<div class="sb-root">' +
        '<div class="sb-header">' +
          '<button class="sb-btn-back" data-sb-volver title="volver">←</button>' +
          '<div><h2 class="sb-title">📚 ' + escapar(txt('titulo')) + '</h2>' +
          '<p class="sb-subtitle">' + escapar(txt('subtitulo')) + '</p></div>' +
          '<button class="sb-toggle' + (estado.lang === 'en' ? ' on' : '') + '" data-sb-lang style="height:44px;border-radius:22px;">' +
            (estado.lang === 'en' ? '🇬🇧 EN' : '🇪🇸 ES') + '</button>' +
        '</div>' +
        '<div class="sb-tabs">' +
          '<button class="sb-tab' + (estado.tab === 'biblioteca' ? ' active' : '') + '" data-tab="biblioteca">📖 ' + escapar(txt('tabBiblio')) + '</button>' +
          '<button class="sb-tab' + (estado.tab === 'favoritos' ? ' active' : '') + '" data-tab="favoritos">❤️ ' + escapar(txt('tabFav')) + '</button>' +
          '<button class="sb-tab' + (estado.tab === 'progreso' ? ' active' : '') + '" data-tab="progreso">📊 ' + escapar(txt('tabProg')) + '</button>' +
        '</div>' +
        '<div class="sb-search-wrap"><span class="sb-search-icon">🔍</span>' +
          '<input class="sb-search" type="search" placeholder="' + escapar(txt('buscar')) + '" value="' + escapar(estado.busqueda) + '">' +
        '</div>' +
        chips +
        grid +
      '</div>';

    // Eventos
    cont.querySelector('[data-sb-volver]').addEventListener('click', function () {
      detenerAudio();
      if (typeof EK.Storybooks.onVolver === 'function') EK.Storybooks.onVolver(cont);
      else if (typeof window.sbVolver === 'function') window.sbVolver(cont);
      else { cont.innerHTML = ''; toast('←'); } // fallback: el engine vuelve al menú
    });
    cont.querySelector('[data-sb-lang]').addEventListener('click', function () {
      estado.lang = estado.lang === 'es' ? 'en' : 'es';
      localStorage.setItem('buggyia.lang', estado.lang);
      renderBiblioteca();
    });
    cont.querySelectorAll('.sb-tab').forEach(function (b) {
      b.addEventListener('click', function () { estado.tab = b.getAttribute('data-tab'); renderBiblioteca(); });
    });
    cont.querySelectorAll('.sb-chip').forEach(function (b) {
      b.addEventListener('click', function () { estado.categoria = b.getAttribute('data-cat'); renderBiblioteca(); });
    });
    var inp = cont.querySelector('.sb-search');
    inp.addEventListener('input', function () {
      estado.busqueda = inp.value;
      // re-render solo del grid para no perder foco: simple, re-render completo y restaurar foco
      var pos = inp.selectionStart;
      renderBiblioteca();
      var ni = estado.contenedor.querySelector('.sb-search');
      if (ni) { ni.focus(); try { ni.setSelectionRange(pos, pos); } catch (e) {} }
    });
    cont.querySelectorAll('.sb-fav-btn').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var id = b.getAttribute('data-fav');
        var ahora = toggleFavorito(id);
        b.textContent = ahora ? '❤️' : '🤍';
        toast(ahora ? '⭐ ¡Agregado a favoritos!' : '💔 Quitado de favoritos');
        if (estado.tab === 'favoritos') setTimeout(renderBiblioteca, 300);
      });
    });
    cont.querySelectorAll('.sb-book-card').forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('.sb-fav-btn')) return;
        var id = card.getAttribute('data-cuento');
        abrirCuento(id);
      });
    });
  }

  function renderCargando(msg) {
    estado.contenedor.innerHTML = '<div class="sb-root"><div class="sb-loader">' +
      '<div class="sb-spinner"></div>' + escapar(msg || t('cargando')) + '</div></div>';
  }
  function renderError() {
    estado.contenedor.innerHTML = '<div class="sb-root"><div class="sb-empty">' +
      '<span class="big">📡</span>' + escapar(t('error')) +
      '<div style="margin-top:16px;"><button class="sb-action-btn primary" data-sb-retry>' + escapar(t('reintentar')) + '</button></div>' +
      '</div></div>';
    var b = estado.contenedor.querySelector('[data-sb-retry]');
    if (b) b.addEventListener('click', function () { abrir(estado.contenedor); });
  }

  /* ---------- Abrir un cuento (delega en el lector) ---------- */
  function abrirCuento(id) {
    var cat = estado.catalogo;
    var meta = (cat.cuentos || []).filter(function (c) { return c.id === id; })[0];
    if (!meta) { toast('❌ Cuento no encontrado'); return; }
    renderCargando('📖 ' + escapar(meta.titulo[estado.lang] || meta.titulo.es));
    detenerAudio();
    cargarCuento(meta).then(function (cuento) {
      if (EK.StorybooksReader && typeof EK.StorybooksReader.abrir === 'function') {
        EK.StorybooksReader.abrir(cuento, meta, estado.contenedor, {
          lang: estado.lang,
          setProgreso: setProgreso,
          getProgreso: getProgreso,
          hablar: hablar,
          detenerAudio: detenerAudio,
          toast: toast,
          onCerrar: function () { renderBiblioteca(); },
          onTerminado: function () {
            setProgreso(cuento.id, (cuento.paginas || []).length, true);
            try {
              var el = document.getElementById('stat-estrellas');
              if (el) { var b = el.querySelector('b'); if (b) b.textContent = parseInt(b.textContent||'0',10) + 5; }
            } catch(e){}
            try { localStorage.setItem('buggyia.storybooks.estrellas', String(parseInt(localStorage.getItem('buggyia.storybooks.estrellas')||'0',10)+5)); } catch(e){}
          }
        });
      } else {
        estado.contenedor.innerHTML = '<div class="sb-root"><div class="sb-empty"><span class="big">⚠️</span>Falta cargar storybooks-reader.js</div></div>';
      }
    }).catch(function () { renderError(); });
  }

  /* ---------- API pública ---------- */
  function abrir(contenedor) {
    if (!contenedor) contenedor = document.getElementById('app') || document.getElementById('main') || document.querySelector('main') || document.body;
    estado.contenedor = contenedor;
    renderCargando();
    cargarCatalogo().then(renderBiblioteca).catch(renderError);
  }

  // Click-intercepción: si el engine no enruta tipo:'storybooks', esto lo abre igual.
  // Detecta tarjetas de mundo con data-mundo/data-id="storybooks" o texto del nombre.
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-mundo="storybooks"], [data-id="storybooks"], [data-world="storybooks"], [data-sb-abrir]');
    if (el) {
      e.preventDefault(); e.stopPropagation();
      abrir();
    }
  }, true);

  EK.Storybooks = {
    MUNDO: MUNDO_STORYBOOKS,
    abrir: abrir,
    abrirCuento: abrirCuento,
    cargarCatalogo: cargarCatalogo,
    cargarCuento: cargarCuento,
    esFavorito: esFavorito,
    toggleFavorito: toggleFavorito,
    getProgreso: getProgreso,
    setProgreso: setProgreso,
    hablar: hablar,
    detenerAudio: detenerAudio,
    setLang: function (l) { estado.lang = l === 'en' ? 'en' : 'es'; },
    getLang: function () { return estado.lang; },
    onVolver: null,   // el engine puede setear EK.Storybooks.onVolver = fn(container)
    RUTA_BASE: RUTA_BASE,
    _estado: estado
  };
})();


/* ============================================================
   storybooks-reader.js — LECTOR de Storybooks Bilingües
   Lectura en ES/EN con traducción, audio por oración (reutiliza
   voz.js), vocabulario, preguntas de comprensión y juego de
   emparejar (palabra ↔ imagen ↔ traducción).
   Depende de storybooks.js (cargar antes). No toca otros mundos.
   ============================================================ */
(function () {
  'use strict';
  window.EK = window.EK || {};

  var st = null; // estado interno del lector actual
  var _cssInyectado = false;
  function injectarCSSExtra() {
    if (_cssInyectado) return; _cssInyectado = true;
    var css = '.sb-word{cursor:pointer;border-radius:6px;padding:0 2px;transition:background .2s;}' +
      '.sb-word.hl{background:#FFD54A;color:#7c2d12;border-radius:6px;}' +
      '.sb-word:hover{background:#FFF1DE;}' +
      '.sb-mic-btn{flex:0 0 auto;width:44px;height:44px;border:none;border-radius:50%;background:#FF6B9D;color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(255,107,157,.4);margin-left:4px;}' +
      '.sb-mic-btn:active{transform:scale(.9);}' +
      '.sb-hint{background:#FFF1DE;border:2px dashed #FF9F43;border-radius:14px;padding:10px 14px;margin-bottom:10px;font-size:15px;font-weight:700;text-align:center;color:#E8892C;}' +
      '.sb-bedtime{background:#1a1040 !important;color:#eee !important;}' +
      '.sb-bedtime .sb-reader{background:#2a1f55 !important;}' +
      '.sb-bedtime .sb-sentence{background:#352a66 !important;color:#eee;}' +
      '.sb-bedtime .sb-sentence-translation{color:#bbb !important;}' +
      '.sb-bedtime .sb-page-illustration{filter:brightness(.7);}.sb-sil{font-weight:800;}.sb-cert{background:linear-gradient(135deg,#FFF8EE,#FFE066);border:4px solid #FFD43B;border-radius:20px;padding:24px;text-align:center;margin:10px;}.sb-cert h3{color:#E8892C;font-size:22px;margin:0 0 8px;}.sb-cert .big-emoji{font-size:56px;display:block;margin-bottom:8px;}.sb-order-card{min-height:52px;padding:12px;border:3px solid #F0E2CC;border-radius:14px;background:#fff;font-size:14px;font-weight:700;margin-bottom:8px;cursor:pointer;text-align:left;width:100%;}.sb-order-card.done{background:#D3F9D8;border-color:#00B894;opacity:.7;}';
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  function escapar(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function barajar(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  // Ilustración: si es URL (http o extensión de imagen) se usa <img>, sino emoji/texto.
  function esImagenURL(v) {
    if (!v || typeof v !== 'string') return false;
    return /^https?:\/\//i.test(v) || /\.(png|jpe?g|gif|webp|svg|avif)(\?|$)/i.test(v);
  }
  function ilustracionHTML(v) {
    if (esImagenURL(v)) {
      return '<img src="' + escapar(v) + '" alt="" style="width:100%;height:100%;object-fit:cover;display:block;">';
    }
    return escapar(v || '📖');
  }

  var TXT = {
    es: {
      pag: 'Página', de: 'de', atras: 'Atrás', siguiente: 'Siguiente', fin: '¡Terminé!',
      mostrarTrad: 'Mostrar traducción', soloIdioma: 'Solo un idioma',
      leerPagina: 'Leer página', detener: 'Detener',
      vocabulario: 'Vocabulario', preguntas: 'Preguntas', juego: 'Juego',
      volverALeer: 'Volver a leer', biblioteca: 'Biblioteca',
      pregunta: 'Pregunta', de2: 'de', bien: '¡Muy bien! 🎉', mal: 'Intentá de nuevo 💪',
      puntaje: 'Puntaje', jugarDeNuevo: 'Jugar de nuevo',
      empareja: 'Tocá una palabra y su traducción',
      movidas: 'Movidas', felicidades: '¡Felicidades! Terminaste el cuento 🏆',
      leeOtraVez: 'Leé otra vez para aprender más',
      escuchar: 'Escuchar'
    },
    en: {
      pag: 'Page', de: 'of', atras: 'Back', siguiente: 'Next', fin: 'I\'m done!',
      mostrarTrad: 'Show translation', soloIdioma: 'One language',
      leerPagina: 'Read page', detener: 'Stop',
      vocabulario: 'Vocabulary', preguntas: 'Questions', juego: 'Game',
      volverALeer: 'Read again', biblioteca: 'Library',
      pregunta: 'Question', de2: 'of', bien: 'Great job! 🎉', mal: 'Try again 💪',
      puntaje: 'Score', jugarDeNuevo: 'Play again',
      empareja: 'Tap a word and its translation',
      movidas: 'Moves', felicidades: 'Congratulations! You finished the story 🏆',
      leeOtraVez: 'Read again to learn more',
      escuchar: 'Listen'
    }
  };
  function t(k) { var lang = (st && st.lang) || 'es'; return (TXT[lang] || TXT.es)[k] || TXT.es[k]; }

  /* ================= LECTOR: vista de lectura ================= */
  function renderLectura() {
    var c = st.cuento, pag = c.paginas[st.pagina] || c.paginas[0];
    var total = c.paginas.length;
    var cont = st.contenedor;
    var primario = st.lang;                    // idioma principal
    var secundario = primario === 'es' ? 'en' : 'es';

    var palabrasTexto = (pag.oraciones || []).map(function(o){return (o[primario]||o.es).toLowerCase();}).join(' ');
    var vocabDisp = (c.vocabulario||[]).filter(function(v){ return palabrasTexto.indexOf((v[primario]||v.es||'').toLowerCase())>=0; });
    st.palabraOculta = vocabDisp.length ? (vocabDisp[Math.floor(Math.random()*vocabDisp.length)][primario]||vocabDisp[0].es) : null;
    var txtToca = st.lang==='en'?'Touch the word':'Tocá la palabra';
    var pistaOculta = st.palabraOculta ? ('<div class="sb-hint" id="sb-hint">🔍 '+txtToca+': <b>'+escapar(st.palabraOculta)+'</b></div>') : '';
    var oracionesHtml = '';
    (pag.oraciones || []).forEach(function (o, i) {
      var textoP = o[primario] || o.es;
      var textoS = o[secundario] || o.en;
      oracionesHtml +=
        '<div class="sb-sentence" data-sent="' + i + '">' +
          '<button class="sb-speak-btn" data-speak="' + i + '" data-lang="' + primario + '" title="ES">🔊</button>' +
          '<div class="sb-sentence-text">' + palabrasHTML(textoP, i, primario) +
            (st.mostrarTrad ? '<span class="sb-sentence-translation">' + escapar(textoS) + '</span>' : '') +
          '</div>' +
          '<button class="sb-speak-btn secondary" data-speak="' + i + '" data-lang="' + secundario + '" title="EN">🌐</button>' +
          '<button class="sb-mic-btn" data-mic="' + i + '" title="Practicar">🎤</button>' +
        '</div>';
    });
    oracionesHtml = pistaOculta + oracionesHtml;

    cont.innerHTML =
      '<div class="sb-root sb-page-enter">' +
        '<div class="sb-header">' +
          '<button class="sb-btn-back" data-rdr-volver title="biblioteca">←</button>' +
          '<div><h2 class="sb-title">' + escapar(c.titulo[primario] || c.titulo.es) + '</h2>' +
          '<p class="sb-subtitle">' + escapar(t('pag')) + ' ' + (st.pagina + 1) + ' ' + escapar(t('de')) + ' ' + total + '</p></div>' +
          '<button class="sb-toggle' + (st.lang === 'en' ? ' on' : '') + '" data-rdr-lang style="height:44px;border-radius:22px;">' +
            (st.lang === 'en' ? '🇬🇧' : '🇪🇸') + '</button>' +
        '</div>' +
        '<div class="sb-reader">' +
          '<div class="sb-page-illustration" style="background:' + escapar(pag.fondo || '#FFE8CC') + ';">' + ilustracionHTML(pag.ilustracion) + '</div>' +
          '<div class="sb-page-text">' + oracionesHtml + '</div>' +
          '<div class="sb-toggle-row">' +
            '<button class="sb-toggle' + (st.mostrarTrad ? ' on' : '') + '" data-rdr-trad>' + (st.mostrarTrad ? '👁️ ' : '🙈 ') + escapar(t('mostrarTrad')) + '</button>' +
            '<button class="sb-toggle' + (st.karaoke ? ' on' : '') + '" data-rdr-karaoke>🎤 ' + (st.lang==='en'?'Read along':'Leer conmigo') + '</button>' +
            '<button class="sb-toggle' + (st.bedtime ? ' on' : '') + '" data-rdr-bedtime>🌙 ' + (st.lang==='en'?'Bedtime':'Noche') + '</button>' +
            '<button class="sb-toggle' + (st.silabas ? ' on' : '') + '" data-rdr-silabas>🔤 ' + (st.lang==='en'?'Syllables':'Sílabas') + '</button>' +
            '<button class="sb-toggle" data-rdr-velocidad>⚡ ' + (st.velocidad<=0.6?(st.lang==='en'?'Slow':'Lento'):(st.velocidad>=1.2?(st.lang==='en'?'Fast':'Rápido'):(st.lang==='en'?'Normal':'Normal'))) + '</button>' +
            '<button class="sb-toggle" data-rdr-readpage>▶️ ' + escapar(t('leerPagina')) + '</button>' +
            '<button class="sb-toggle" data-rdr-stop>⏹️ ' + escapar(t('detener')) + '</button>' +
          '</div>' +
          '<div class="sb-reader-controls">' +
            '<button class="sb-nav-btn prev" data-rdr-prev' + (st.pagina === 0 ? ' disabled' : '') + '>← ' + escapar(t('atras')) + '</button>' +
            '<div class="sb-page-indicator">' + (st.pagina + 1) + ' / ' + total + '</div>' +
            '<button class="sb-nav-btn next" data-rdr-next>' + (st.pagina === total - 1 ? '🏁 ' + escapar(t('fin')) : escapar(t('siguiente')) + ' →') + '</button>' +
          '</div>' +
        '</div>' +
        '<div class="sb-action-row" style="margin-top:14px;">' +
          '<button class="sb-action-btn secondary" data-rdr-vista="vocabulario">📝 ' + escapar(t('vocabulario')) + '</button>' +
          '<button class="sb-action-btn accent" data-rdr-vista="preguntas">❓ ' + escapar(t('preguntas')) + '</button>' +
          '<button class="sb-action-btn ghost" data-rdr-vista="juego">🎮 ' + escapar(t('juego')) + '</button>' +
        '</div>' +
      '</div>';

    // Eventos
    cont.querySelector('[data-rdr-volver]').addEventListener('click', function () {
      st.opts.detenerAudio();
      st.opts.onCerrar();
    });
    cont.querySelector('[data-rdr-lang]').addEventListener('click', function () {
      st.lang = st.lang === 'es' ? 'en' : 'es';
      renderLectura();
    });
    cont.querySelector('[data-rdr-trad]').addEventListener('click', function () {
      st.mostrarTrad = !st.mostrarTrad;
      renderLectura();
    });
    cont.querySelector('[data-rdr-stop]').addEventListener('click', function () { st.opts.detenerAudio(); });
    var btnK = cont.querySelector('[data-rdr-karaoke]');
    if (btnK) btnK.addEventListener('click', function () { st.karaoke = !st.karaoke; renderLectura(); });
    var btnB = cont.querySelector('[data-rdr-bedtime]');
    if (btnB) btnB.addEventListener('click', function () {
      st.bedtime = !st.bedtime;
      renderLectura();
      var root = cont.querySelector('.sb-root');
      if (root && st.bedtime) root.classList.add('sb-bedtime');
    });
    var btnS = cont.querySelector('[data-rdr-silabas]');
    if (btnS) btnS.addEventListener('click', function () { st.silabas = !st.silabas; renderLectura(); });
    var btnV = cont.querySelector('[data-rdr-velocidad]');
    if (btnV) btnV.addEventListener('click', function () {
      st.velocidad = st.velocidad <= 0.6 ? 0.9 : (st.velocidad >= 1.2 ? 0.6 : 1.2);
      renderLectura();
    });
    cont.querySelectorAll('.sb-word').forEach(function (w) {
      w.addEventListener('click', function (e) {
        e.stopPropagation();
        var palabra = w.textContent;
        var lang = w.getAttribute('data-lang');
        st.opts.hablar(palabra.replace(/[.,!?;:]/g,''), lang);
        w.classList.add('hl');
        setTimeout(function(){ w.classList.remove('hl'); }, 600);
        if (st.palabraOculta && palabra.toLowerCase().indexOf(st.palabraOculta.toLowerCase().slice(0,4)) >= 0) {
          var hint = cont.querySelector('#sb-hint');
          if (hint) { hint.innerHTML = '✅ ¡'+escapar(palabra)+'! +1 ⭐'; hint.style.color = 'var(--sb-accent)'; }
          sumarEstrellas(1);
          st.palabraOculta = null;
          setTimeout(function(){ var h2 = cont.querySelector('#sb-hint'); if (h2) h2.style.display='none'; }, 1500);
        }
      });
    });
    cont.querySelectorAll('.sb-mic-btn').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        practicarPronunciacion(parseInt(b.getAttribute('data-mic'),10));
      });
    });
    cont.querySelector('[data-rdr-readpage]').addEventListener('click', function () { leerPaginaCompleta(); });
    var prev = cont.querySelector('[data-rdr-prev]');
    if (!prev.disabled) prev.addEventListener('click', function () {
      st.opts.detenerAudio();
      if (st.pagina > 0) { st.pagina--; st.opts.setProgreso(st.cuento.id, st.pagina + 1); renderLectura(); }
    });
    cont.querySelector('[data-rdr-next]').addEventListener('click', function () {
      st.opts.detenerAudio();
      if (st.pagina < total - 1) {
        st.pagina++;
        st.opts.setProgreso(st.cuento.id, st.pagina + 1);
        renderLectura();
      } else {
        st.opts.onTerminado();
        st.vista = 'fin';
        renderFin();
      }
    });
    // Audio por oración
    cont.querySelectorAll('[data-speak]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var i = parseInt(b.getAttribute('data-speak'), 10);
        var lg = b.getAttribute('data-lang');
        hablarOracion(i, lg);
      });
    });
    cont.querySelectorAll('.sb-sentence').forEach(function (row) {
      row.addEventListener('click', function () {
        var i = parseInt(row.getAttribute('data-sent'), 10);
        hablarOracion(i, primario);
      });
    });
  }

  function hablarOracion(i, lang) {
    var pag = st.cuento.paginas[st.pagina];
    var o = (pag.oraciones || [])[i];
    if (!o) return;
    var texto = o[lang] || o.es;
    var row = st.contenedor.querySelector('.sb-sentence[data-sent="' + i + '"]');
    if (row) {
      st.contenedor.querySelectorAll('.sb-sentence.playing').forEach(function (r) { r.classList.remove('playing'); });
      row.classList.add('playing');
    }
    st.opts.hablar(texto, lang, function () {
      if (row) row.classList.remove('playing');
    });
  }

  function separarSilabas(palabra) {
    var vocales = 'aeiouáéíóúAEIOUÁÉÍÓÚ';
    var s = String(palabra||'');
    var partes = [], actual = '';
    for (var i = 0; i < s.length; i++) {
      actual += s[i];
      if (vocales.indexOf(s[i]) >= 0 && i < s.length-1 && vocales.indexOf(s[i+1]) < 0) {
        if (i+2 < s.length && vocales.indexOf(s[i+2]) < 0) { actual += s[i+1]; i++; }
        partes.push(actual); actual = '';
      }
    }
    if (actual) partes.push(actual);
    return partes.length ? partes : [s];
  }
  var COLORES_SIL = ['#FF6B6B','#4D96FF','#00B894','#FF9F43','#6C5CE7','#FF6B9D'];
  function palabrasHTML(texto, sentIdx, lang) {
    var palabras = String(texto||'').split(/(\s+)/);
    var html = '', wi = 0;
    palabras.forEach(function (p) {
      if (/^\s+$/.test(p)) { html += p; return; }
      var interior = escapar(p);
      if (st && st.silabas) {
        var sil = separarSilabas(p.replace(/[.,!?;:]/g,''));
        interior = sil.map(function(si,ci){ return '<span class="sb-sil" style="color:'+COLORES_SIL[ci%COLORES_SIL.length]+';">'+escapar(si)+'</span>'; }).join('·');
        var punt = p.match(/[.,!?;:]+$/); if (punt) interior += escapar(punt[0]);
      }
      html += '<span class="sb-word" data-word="'+wi+'" data-sent="'+sentIdx+'" data-lang="'+lang+'">'+interior+'</span>';
      wi++;
    });
    return html;
  }
  function sumarEstrellas(n) {
    try {
      var el = document.getElementById('stat-estrellas');
      if (el) { var b = el.querySelector('b'); if (b) b.textContent = parseInt(b.textContent||'0',10) + n; }
    } catch(e){}
    try {
      var clave = 'buggyia.storybooks.estrellas';
      localStorage.setItem(clave, String(parseInt(localStorage.getItem(clave)||'0',10) + n));
    } catch(e){}
  }
  function leerPaginaCompleta() {
    var pag = st.cuento.paginas[st.pagina];
    var oraciones = pag.oraciones || [];
    var i = 0;
    function siguiente() {
      if (i >= oraciones.length || !st || st.vista !== 'lectura') return;
      var idx = i; i++;
      var texto = oraciones[idx][st.lang] || oraciones[idx].es;
      var row = st.contenedor.querySelector('.sb-sentence[data-sent="' + idx + '"]');
      if (row) {
        st.contenedor.querySelectorAll('.sb-sentence.playing').forEach(function (r) { r.classList.remove('playing'); });
        row.classList.add('playing');
      }
      var rate = st.bedtime ? 0.7 : st.velocidad;
      if ('speechSynthesis' in window) {
        try { window.speechSynthesis.cancel(); } catch(e){}
        var u = new SpeechSynthesisUtterance(texto);
        u.lang = st.lang === 'en' ? 'en-US' : 'es-AR';
        u.rate = rate; u.pitch = 1.1;
        var palabrasRow = row ? row.querySelectorAll('.sb-word') : [];
        u.onboundary = function(ev) {
          if (!row) return;
          var ci = ev.charIndex || 0, acum = 0, target = 0;
          for (var k = 0; k < palabrasRow.length; k++) {
            acum += palabrasRow[k].textContent.length + 1;
            target = k; if (acum > ci) break;
          }
          row.querySelectorAll('.sb-word.hl').forEach(function(w){w.classList.remove('hl');});
          if (palabrasRow[target]) palabrasRow[target].classList.add('hl');
        };
        u.onend = function () {
          if (row) { row.classList.remove('playing'); row.querySelectorAll('.sb-word.hl').forEach(function(w){w.classList.remove('hl');}); }
          setTimeout(siguiente, st.karaoke ? 600 : 350);
        };
        window.speechSynthesis.speak(u);
      } else {
        st.opts.hablar(texto, st.lang, function () {
          if (row) row.classList.remove('playing');
          setTimeout(siguiente, 350);
        });
      }
    }
    siguiente();
  }
  function practicarPronunciacion(sentIdx) {
    var pag = st.cuento.paginas[st.pagina];
    var o = (pag.oraciones||[])[sentIdx]; if (!o) return;
    var texto = o[st.lang] || o.es;
    var langCode = st.lang === 'en' ? 'en-US' : 'es-AR';
    if (EK.Voz && typeof EK.Voz.escucharYComparar === 'function') {
      var row = st.contenedor.querySelector('.sb-sentence[data-sent="'+sentIdx+'"]');
      if (row) row.classList.add('playing');
      EK.Voz.escucharYComparar(texto, langCode, function(res) {
        if (row) row.classList.remove('playing');
        if (res && res.exito) {
          sumarEstrellas(1);
          if (st.opts.toast) st.opts.toast('⭐ ¡Perfecto! +1 estrella');
        } else if (res && res.soportado === false) {
          if (st.opts.toast) st.opts.toast('🎤 Micrófono no disponible');
        } else {
          if (st.opts.toast) st.opts.toast('💪 Casi, escuchá de nuevo');
        }
      });
    } else {
      if (st.opts.toast) st.opts.toast('🎤 Función micrófono no disponible en voz.js');
    }
  }

  /* ================= VOCABULARIO ================= */
  function renderVocabulario() {
    var c = st.cuento, cont = st.contenedor;
    var items = c.vocabulario || [];
    var html = '';
    items.forEach(function (v, i) {
      html +=
        '<div class="sb-vocab-card">' +
          '<span class="sb-vocab-img">' + escapar(v.img || '🔤') + '</span>' +
          '<div class="sb-vocab-words">' +
            '<div class="sb-vocab-es">' + escapar(v.es) + '</div>' +
            '<div class="sb-vocab-en">' + escapar(v.en) + '</div>' +
          '</div>' +
          '<button class="sb-vocab-speak" data-voc="' + i + '" data-lang="es" title="ES">🔊</button>' +
          '<button class="sb-vocab-speak" data-voc="' + i + '" data-lang="en" title="EN" style="background:var(--sb-secondary);">🌐</button>' +
        '</div>';
    });
    cont.innerHTML =
      '<div class="sb-root sb-page-enter">' +
        '<div class="sb-header">' +
          '<button class="sb-btn-back" data-rdr-volver>←</button>' +
          '<div><h2 class="sb-title">📝 ' + escapar(t('vocabulario')) + '</h2>' +
          '<p class="sb-subtitle">' + escapar(c.titulo[st.lang] || c.titulo.es) + '</p></div>' +
        '</div>' +
        '<div class="sb-reader"><div class="sb-vocab-grid" style="grid-template-columns:1fr;padding-top:14px;">' + html + '</div></div>' +
        '<div class="sb-action-row" style="margin-top:14px;"><button class="sb-action-btn primary" data-rdr-vista="lectura">📖 ' + escapar(t('volverALeer')) + '</button></div>' +
      '</div>';
    cont.querySelector('[data-rdr-volver]').addEventListener('click', function () { st.opts.detenerAudio(); st.vista = 'lectura'; renderLectura(); });
    cont.querySelector('[data-rdr-vista="lectura"]').addEventListener('click', function () { st.opts.detenerAudio(); st.vista = 'lectura'; renderLectura(); });
    cont.querySelectorAll('[data-voc]').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = parseInt(b.getAttribute('data-voc'), 10);
        var lg = b.getAttribute('data-lang');
        var v = items[i];
        if (v) st.opts.hablar(v[lg], lg);
      });
    });
  }

  /* ================= PREGUNTAS DE COMPRENSIÓN ================= */
  function renderPreguntas() {
    var c = st.cuento, cont = st.contenedor;
    var preguntas = c.preguntas || [];
    if (!preguntas.length) { st.vista = 'lectura'; renderLectura(); return; }
    if (st.quizIdx >= preguntas.length) { renderQuizResultado(); return; }
    var p = preguntas[st.quizIdx];
    var opciones = (p.opciones[st.lang] || p.opciones.es || []).slice();
    var html = '';
    opciones.forEach(function (op, i) {
      html += '<button class="sb-quiz-opt" data-opt="' + i + '">' + escapar(op) + '</button>';
    });
    cont.innerHTML =
      '<div class="sb-root sb-page-enter">' +
        '<div class="sb-header">' +
          '<button class="sb-btn-back" data-rdr-volver>←</button>' +
          '<div><h2 class="sb-title">❓ ' + escapar(t('preguntas')) + '</h2>' +
          '<p class="sb-subtitle">' + escapar(t('pregunta')) + ' ' + (st.quizIdx + 1) + ' ' + escapar(t('de2')) + ' ' + preguntas.length + ' · ' + escapar(t('puntaje')) + ': ' + st.quizScore + '</p></div>' +
        '</div>' +
        '<div class="sb-reader"><div class="sb-quiz">' +
          '<div class="sb-quiz-q">' + escapar(p[st.lang] || p.es) +
            ' <button class="sb-speak-btn" data-quiz-speak style="width:36px;height:36px;font-size:14px;vertical-align:middle;">🔊</button></div>' +
          '<div class="sb-quiz-options">' + html + '</div>' +
          '<div class="sb-quiz-feedback" id="sb-quiz-fb"></div>' +
        '</div></div>' +
      '</div>';
    cont.querySelector('[data-rdr-volver]').addEventListener('click', function () { st.opts.detenerAudio(); st.vista = 'lectura'; renderLectura(); });
    cont.querySelector('[data-quiz-speak]').addEventListener('click', function () {
      st.opts.hablar(p[st.lang] || p.es, st.lang);
    });
    cont.querySelectorAll('.sb-quiz-opt').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = parseInt(b.getAttribute('data-opt'), 10);
        var correcta = p.correcta;
        var fb = cont.querySelector('#sb-quiz-fb');
        cont.querySelectorAll('.sb-quiz-opt').forEach(function (x) { x.disabled = true; });
        if (i === correcta) {
          b.classList.add('correct');
          st.quizScore++;
          fb.textContent = t('bien');
          fb.style.color = 'var(--sb-accent)';
          st.opts.hablar(st.lang === 'es' ? '¡Muy bien!' : 'Great job!', st.lang);
        } else {
          b.classList.add('wrong');
          var cb = cont.querySelector('.sb-quiz-opt[data-opt="' + correcta + '"]');
          if (cb) cb.classList.add('correct');
          fb.textContent = t('mal');
          fb.style.color = '#FA5252';
          st.opts.hablar(st.lang === 'es' ? 'Intentá de nuevo' : 'Try again', st.lang);
        }
        setTimeout(function () { st.quizIdx++; renderPreguntas(); }, 1600);
      });
    });
  }

  function renderQuizResultado() {
    var cont = st.contenedor;
    var total = (st.cuento.preguntas || []).length;
    cont.innerHTML =
      '<div class="sb-root"><div class="sb-finish">' +
        '<span class="trophy">🏆</span>' +
        '<h3>' + escapar(t('puntaje')) + ': ' + st.quizScore + ' / ' + total + '</h3>' +
        '<p>' + (st.quizScore === total ? '🌟 ¡Perfecto! ¡Sos un genio!' : '📖 ' + escapar(t('leeOtraVez'))) + '</p>' +
        '<div class="sb-action-row">' +
          '<button class="sb-action-btn primary" data-rdr-quiz-again>🔄 ' + escapar(t('jugarDeNuevo')) + '</button>' +
          '<button class="sb-action-btn ghost" data-rdr-vista="lectura">📖 ' + escapar(t('volverALeer')) + '</button>' +
        '</div>' +
      '</div></div>';
    cont.querySelector('[data-rdr-quiz-again]').addEventListener('click', function () {
      st.quizIdx = 0; st.quizScore = 0; renderPreguntas();
    });
    cont.querySelector('[data-rdr-vista="lectura"]').addEventListener('click', function () {
      st.vista = 'lectura'; renderLectura();
    });
  }

  /* ================= JUEGO DE EMPAREJAR ================= */
  function renderJuego() {
    var c = st.cuento, cont = st.contenedor;
    var vocab = (c.vocabulario || []).slice(0, 6); // hasta 6 pares = 12 tarjetas
    // Cada par: tarjeta A = imagen + palabra en ES, tarjeta B = palabra en EN
    var cartas = [];
    vocab.forEach(function (v, i) {
      cartas.push({ id: i, tipo: 'A', img: v.img, texto: v.es, match: i });
      cartas.push({ id: i, tipo: 'B', img: '', texto: v.en, match: i });
    });
    st.match = { cartas: barajar(cartas), seleccionada: null, movidas: 0, encontradas: 0, total: vocab.length, bloqueado: false };

    cont.innerHTML =
      '<div class="sb-root sb-page-enter">' +
        '<div class="sb-header">' +
          '<button class="sb-btn-back" data-rdr-volver>←</button>' +
          '<div><h2 class="sb-title">🎮 ' + escapar(t('juego')) + '</h2>' +
          '<p class="sb-subtitle">' + escapar(t('empareja')) + '</p></div>' +
        '</div>' +
        '<div class="sb-match-hud">' + escapar(t('movidas')) + ': <span id="sb-moves">0</span> · ' + (st.match.total) + ' pares</div>' +
        '<div class="sb-reader"><div class="sb-match-grid" id="sb-match-grid"></div></div>' +
      '</div>';
    cont.querySelector('[data-rdr-volver]').addEventListener('click', function () { st.opts.detenerAudio(); st.vista = 'lectura'; renderLectura(); });
    renderMatchGrid();
  }

  function renderMatchGrid() {
    var grid = st.contenedor.querySelector('#sb-match-grid');
    if (!grid) return;
    grid.innerHTML = '';
    st.match.cartas.forEach(function (carta, pos) {
      var el = document.createElement('button');
      el.className = 'sb-match-card';
      el.setAttribute('data-pos', pos);
      if (carta.matched) { el.classList.add('matched'); el.disabled = true; }
      if (carta.revelada || carta.matched) {
        el.innerHTML = carta.tipo === 'A'
          ? '<div><div style="font-size:28px;">' + escapar(carta.img || '🔤') + '</div><div style="font-size:12px;">' + escapar(carta.texto) + '</div></div>'
          : '<div style="font-size:13px;">' + escapar(carta.texto) + '</div>';
      } else {
        el.textContent = '❓';
        el.style.background = 'var(--sb-gold)';
      }
      el.addEventListener('click', function () { tocarCarta(pos, el); });
      grid.appendChild(el);
    });
    var mv = st.contenedor.querySelector('#sb-moves');
    if (mv) mv.textContent = st.match.movidas;
  }

  function tocarCarta(pos, el) {
    var m = st.match;
    if (m.bloqueado) return;
    var carta = m.cartas[pos];
    if (carta.matched || carta.revelada) return;
    carta.revelada = true;
    renderMatchGrid();
    if (m.seleccionada === null) {
      m.seleccionada = pos;
      return;
    }
    // segunda carta
    m.movidas++;
    var primera = m.cartas[m.seleccionada];
    if (primera.match === carta.match) {
      primera.matched = true; carta.matched = true;
      m.encontradas++;
      m.seleccionada = null;
      st.opts.hablar(st.lang === 'es' ? '¡Muy bien!' : 'Great!', st.lang);
      renderMatchGrid();
      if (m.encontradas >= m.total) {
        setTimeout(function () {
          st.contenedor.querySelector('.sb-match-hud').innerHTML = '🎉 ¡Ganaste en ' + m.movidas + ' movidas! 🎉';
          st.opts.hablar(st.lang === 'es' ? '¡Felicidades, ganaste!' : 'Congratulations, you won!', st.lang);
        }, 400);
      }
    } else {
      m.bloqueado = true;
      var pos1 = m.seleccionada;
      m.seleccionada = null;
      setTimeout(function () {
        m.cartas[pos1].revelada = false;
        carta.revelada = false;
        m.bloqueado = false;
        renderMatchGrid();
      }, 900);
    }
    var mv = st.contenedor.querySelector('#sb-moves');
    if (mv) mv.textContent = m.movidas;
  }

  /* ================= FIN DEL CUENTO ================= */
  function renderFin() {
    var cont = st.contenedor, c = st.cuento;
    cont.innerHTML =
      '<div class="sb-root"><div class="sb-finish">' +
        '<span class="trophy">🏆</span>' +
        '<h3>' + escapar(t('felicidades')) + '</h3>' +
        '<p>📖 ' + escapar(c.titulo[st.lang] || c.titulo.es) + '</p>' +
        '<div class="sb-action-row">' +
          '<button class="sb-action-btn primary" data-rdr-releer>🔄 ' + escapar(t('volverALeer')) + '</button>' +
          '<button class="sb-action-btn secondary" data-rdr-vista="vocabulario">📝 ' + escapar(t('vocabulario')) + '</button>' +
          '<button class="sb-action-btn accent" data-rdr-vista="preguntas">❓ ' + escapar(t('preguntas')) + '</button>' +
          '<button class="sb-action-btn ghost" data-rdr-vista="juego">🎮 ' + escapar(t('juego')) + '</button>' +
          '<button class="sb-action-btn ghost" data-rdr-biblio>📚 ' + escapar(t('biblioteca')) + '</button>' +
          '<button class="sb-action-btn accent" data-rdr-vista="ordenar">📋 ' + (st.lang==='en'?'Order':'Ordenar') + '</button>' +
          '<button class="sb-action-btn secondary" data-rdr-vista="completar">✏️ ' + (st.lang==='en'?'Fill':'Completar') + '</button>' +
          '<button class="sb-action-btn primary" data-rdr-cert>🏅 ' + (st.lang==='en'?'Certificate':'Certificado') + '</button>' +
        '</div>' +
      '</div></div>';
    cont.querySelector('[data-rdr-releer]').addEventListener('click', function () {
      st.pagina = 0; st.vista = 'lectura'; renderLectura();
    });
    cont.querySelector('[data-rdr-biblio]').addEventListener('click', function () { st.opts.detenerAudio(); st.opts.onCerrar(); });
    cont.querySelectorAll('[data-rdr-vista]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-rdr-vista');
        st.vista = v;
        if (v === 'vocabulario') renderVocabulario();
        else if (v === 'preguntas') { st.quizIdx = 0; st.quizScore = 0; renderPreguntas(); }
        else if (v === 'juego') renderJuego();
        else if (v === 'ordenar') renderOrdenar();
        else if (v === 'completar') renderCompletar();
        else { st.vista = 'lectura'; renderLectura(); }
      });
    });
  }

  /* ================= API pública ================= */
  function abrir(cuento, meta, contenedor, opts) {
    st = {
      cuento: cuento,
      meta: meta,
      contenedor: contenedor,
      opts: opts || {},
      lang: (opts && opts.lang) || 'es',
      pagina: 0,
      mostrarTrad: true,
      vista: 'lectura',
      quizIdx: 0,
      quizScore: 0,
      match: null,
      karaoke: false,
      bedtime: false,
      palabraOculta: null,
      silabas: false,
      velocidad: 0.9
    };
    injectarCSSExtra();
    // Continuar desde donde quedó
    var prog = opts && opts.getProgreso ? opts.getProgreso(cuento.id) : null;
    var totalPag = (cuento.paginas || []).length;
    if (prog && prog.pagina > 0 && prog.pagina < totalPag && !prog.terminado) {
      st.pagina = Math.min(prog.pagina, totalPag - 1); // 0-indexed: continúa en la primera sin leer
    }
    renderLectura();
  }


  function renderOrdenar() {
    var c = st.cuento, cont = st.contenedor;
    var eventos = (c.paginas||[]).map(function(p,i){ return { idx:i, texto:(p.oraciones[0][st.lang]||p.oraciones[0].es) }; });
    var paso = Math.max(1, Math.floor(eventos.length/4));
    var sel = [];
    for (var k=0; k<eventos.length && sel.length<4; k+=paso) sel.push(eventos[k]);
    while (sel.length<4 && eventos.length) sel.push(eventos[eventos.length-1]);
    sel = sel.slice(0,4);
    var ordenCorrecto = sel.map(function(e){return e.idx;});
    var desorden = barajar(sel.slice());
    st.orden = { sel: desorden, ordenCorrecto: ordenCorrecto, contador: 0 };
    var html = '';
    desorden.forEach(function(e,i){ html += '<button class="sb-order-card" data-ord="'+i+'">'+(i+1)+'. '+escapar(e.texto)+'</button>'; });
    cont.innerHTML = '<div class="sb-root sb-page-enter"><div class="sb-header"><button class="sb-btn-back" data-rdr-volver>←</button><div><h2 class="sb-title">📋 '+(st.lang==='en'?'Order the story':'Ordená la historia')+'</h2><p class="sb-subtitle">'+(st.lang==='en'?'Tap in the correct order':'Tocá en el orden correcto')+'</p></div></div><div class="sb-reader"><div class="sb-quiz" id="sb-ord-wrap">'+html+'</div><div class="sb-quiz-feedback" id="sb-ord-fb"></div></div></div>';
    cont.querySelector('[data-rdr-volver]').addEventListener('click', function(){ st.vista='fin'; renderFin(); });
    cont.querySelectorAll('.sb-order-card').forEach(function(b){
      b.addEventListener('click', function(){
        var idx = parseInt(b.getAttribute('data-ord'),10);
        var ord = st.orden;
        if (b.classList.contains('done')) return;
        var esperado = ord.ordenCorrecto[ord.contador];
        if (ord.sel[idx].idx === esperado) {
          b.classList.add('done'); b.disabled = true; ord.contador++; sumarEstrellas(1);
          if (ord.contador >= ord.ordenCorrecto.length) {
            var f = cont.querySelector('#sb-ord-fb'); if(f){ f.textContent = (st.lang==='en'?'🎉 Perfect! + stars':'🎉 ¡Perfecto! Sumaste estrellas'); f.style.color='var(--sb-accent)'; }
          }
        } else {
          b.style.background='#FFE3E3'; setTimeout(function(){ b.style.background=''; }, 400);
          var f2 = cont.querySelector('#sb-ord-fb'); if(f2){ f2.textContent=(st.lang==='en'?'Try again 💪':'No, intentá de nuevo 💪'); f2.style.color='#FA5252'; }
        }
      });
    });
  }
  function renderCompletar() {
    var c = st.cuento, cont = st.contenedor;
    var vocab = c.vocabulario || [];
    var preguntas = [];
    (c.paginas||[]).forEach(function(p){
      (p.oraciones||[]).forEach(function(o){
        var txt = o[st.lang]||o.es;
        for (var v=0; v<vocab.length; v++) {
          var palabra = vocab[v][st.lang]||vocab[v].es;
          if (txt.toLowerCase().indexOf(palabra.toLowerCase())>=0 && preguntas.length<3) {
            var otras = vocab.filter(function(x,j){return j!==v;}).slice(0,2).map(function(x){return x[st.lang]||x.es;});
            preguntas.push({ texto: txt, palabra: palabra, opciones: barajar([palabra].concat(otras)) });
            return;
          }
        }
      });
    });
    if (!preguntas.length) { st.vista='fin'; renderFin(); return; }
    st.comp = { lista: preguntas, idx:0, bien:0 };
    function renderUna() {
      var p = st.comp.lista[st.comp.idx];
      var txtMostrar = p.texto.replace(new RegExp(p.palabra,'i'), '_____');
      var opts = '';
      p.opciones.forEach(function(op,i){ opts += '<button class="sb-quiz-opt" data-comp="'+i+'">'+escapar(op)+'</button>'; });
      cont.querySelector('#sb-comp-body').innerHTML = '<div class="sb-quiz-q">'+escapar(txtMostrar)+'</div><div class="sb-quiz-options">'+opts+'</div><div class="sb-quiz-feedback" id="sb-comp-fb"></div>';
      cont.querySelectorAll('.sb-quiz-opt').forEach(function(b){
        b.addEventListener('click', function(){
          var elegida = p.opciones[parseInt(b.getAttribute('data-comp'),10)];
          cont.querySelectorAll('.sb-quiz-opt').forEach(function(x){x.disabled=true;});
          if (elegida.toLowerCase() === p.palabra.toLowerCase()) {
            b.classList.add('correct'); st.comp.bien++; sumarEstrellas(1);
            var f=cont.querySelector('#sb-comp-fb'); if(f){f.textContent=(st.lang==='en'?'Great! 🎉':'¡Muy bien! 🎉'); f.style.color='var(--sb-accent)';}
          } else {
            b.classList.add('wrong');
            cont.querySelectorAll('.sb-quiz-opt').forEach(function(x){ if(p.opciones[parseInt(x.getAttribute('data-comp'),10)].toLowerCase()===p.palabra.toLowerCase()) x.classList.add('correct'); });
            var f2=cont.querySelector('#sb-comp-fb'); if(f2){f2.textContent=(st.lang==='en'?'It was: '+p.palabra:'Era: '+p.palabra); f2.style.color='#FA5252';}
          }
          setTimeout(function(){
            st.comp.idx++;
            if (st.comp.idx < st.comp.lista.length) { renderUna(); }
            else {
              cont.querySelector('#sb-comp-body').innerHTML = '<div class="sb-finish"><span class="trophy">🏆</span><h3>'+(st.lang==='en'?'Score: ':'Puntaje: ')+st.comp.bien+'/'+st.comp.lista.length+'</h3><button class="sb-action-btn primary" data-rdr-fin>📚 '+(st.lang==='en'?'Back':'Volver')+'</button></div>';
              cont.querySelector('[data-rdr-fin]').addEventListener('click',function(){st.vista='fin';renderFin();});
            }
          }, 1500);
        });
      });
    }
    cont.innerHTML = '<div class="sb-root sb-page-enter"><div class="sb-header"><button class="sb-btn-back" data-rdr-volver>←</button><div><h2 class="sb-title">✏️ '+(st.lang==='en'?'Fill in the blank':'Completá la oración')+'</h2></div></div><div class="sb-reader"><div class="sb-quiz" id="sb-comp-body"></div></div></div>';
    cont.querySelector('[data-rdr-volver]').addEventListener('click', function(){ st.vista='fin'; renderFin(); });
    renderUna();
  }
  function renderCertificado() {
    var c = st.cuento, cont = st.contenedor;
    var estrellas = 0;
    try { estrellas = parseInt(localStorage.getItem('buggyia.storybooks.estrellas')||'0',10); } catch(e){}
    var fecha = new Date().toLocaleDateString();
    cont.innerHTML = '<div class="sb-root"><div class="sb-cert"><span class="big-emoji">🏅</span><h3>'+(st.lang==='en'?'READER CERTIFICATE':'CERTIFICADO DE LECTOR')+'</h3><p style="font-size:16px;font-weight:700;margin:4px 0;">'+(st.lang==='en'?'You finished:':'Terminaste:')+'</p><p style="font-size:18px;font-weight:800;color:#6C5CE7;margin:4px 0 12px;">📖 '+escapar(c.titulo[st.lang]||c.titulo.es)+'</p><p style="font-size:14px;color:#7A6A5A;">⭐ '+(st.lang==='en'?'Stars earned: ':'Estrellas ganadas: ')+estrellas+'</p><p style="font-size:13px;color:#7A6A5A;margin-top:12px;">📅 '+fecha+'</p><div class="sb-action-row" style="margin-top:16px;"><button class="sb-action-btn primary" data-rdr-fin>← '+(st.lang==='en'?'Back':'Volver')+'</button></div></div></div>';
    cont.querySelector('[data-rdr-fin]').addEventListener('click', function(){ st.vista='fin'; renderFin(); });
  }

  EK.StorybooksReader = { abrir: abrir };
})();
