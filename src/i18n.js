/* Language support for the Studio settings and the induction tour.
   English, Spanish, and French cover the app chrome, settings, and all tour steps. */

const I18N_LANGUAGES = {
  en: { label: 'English', native: 'English', tag: 'en-US' },
  es: { label: 'Español', native: 'Español', tag: 'es-ES' },
  fr: { label: 'Français', native: 'Français', tag: 'fr-FR' },
};
const I18N_LANGUAGE_ORDER = ['en', 'es', 'fr'];

const I18N = {
  en: {
    'tab.hollow': 'Home', 'tab.collection': 'Sprites', 'tab.codex': 'Types', 'tab.nest': 'Nest',
    'tab.play': 'Play', 'tab.today': 'Today', 'tab.settings': 'Settings',
    'settings.language': 'Language', 'settings.languageNote': 'Applies to the app navigation, settings, captions, and the induction tour.',
    'settings.captions': 'Closed captions (CC)', 'settings.captionsNote': 'Shows sound descriptions and spoken lines on screen for the hearing impaired.',
    'tour.title': '🧭 Induction tour', 'tour.sub': 'narrated steps to your first legendary.',
    'tour.subReplay': 'A refresher on how the Hollow works. Voice and read-along included.',
    'tour.read': '🔊 Read aloud', 'tour.stop': '⏹ Stop reading', 'tour.voiceOff': 'Voice is off in Studio. Tap Read aloud to hear this tour.',
    'tour.voiceUnavailable': 'Voice is unavailable on this device.', 'tour.reading': 'Reading aloud — follow the yellow highlight.',
    'tour.tap': 'Tap to hear this step and follow along.', 'tour.skip': 'Skip tour', 'tour.close': 'Close',
    'tour.next': 'Next', 'tour.back': 'Back', 'tour.start': 'Start exploring', 'tour.firstSecret': 'First secret: complete the tour.',
  },
  es: {
    'tab.hollow': 'Hogar', 'tab.collection': 'Sprites', 'tab.codex': 'Tipos', 'tab.nest': 'Nido',
    'tab.play': 'Jugar', 'tab.today': 'Hoy', 'tab.settings': 'Ajustes',
    'settings.language': 'Idioma', 'settings.languageNote': 'Se aplica a la navegación, los ajustes, los subtítulos y el tour de inducción.',
    'settings.captions': 'Subtítulos (CC)', 'settings.captionsNote': 'Muestra descripciones de sonidos y líneas habladas en pantalla para personas con discapacidad auditiva.',
    'tour.title': '🧭 Tour de inducción', 'tour.sub': 'pasos narrados hasta tu primera leyenda.',
    'tour.subReplay': 'Un repaso de cómo funciona el Hogar. Incluye voz y lectura.',
    'tour.read': '🔊 Leer en voz alta', 'tour.stop': '⏹ Detener lectura', 'tour.voiceOff': 'La voz está desactivada. Pulsa Leer en voz alta para escuchar el tour.',
    'tour.voiceUnavailable': 'La voz no está disponible en este dispositivo.', 'tour.reading': 'Leyendo en voz alta: sigue el resaltado amarillo.',
    'tour.tap': 'Pulsa para escuchar este paso y seguir la lectura.', 'tour.skip': 'Saltar tour', 'tour.close': 'Cerrar',
    'tour.next': 'Siguiente', 'tour.back': 'Atrás', 'tour.start': 'Empezar a explorar', 'tour.firstSecret': 'Primer secreto: completa el tour.',
  },
  fr: {
    'tab.hollow': 'Foyer', 'tab.collection': 'Sprites', 'tab.codex': 'Types', 'tab.nest': 'Nid',
    'tab.play': 'Jouer', 'tab.today': 'Aujourd’hui', 'tab.settings': 'Réglages',
    'settings.language': 'Langue', 'settings.languageNote': 'S’applique à la navigation, aux réglages, aux sous-titres et à la visite guidée.',
    'settings.captions': 'Sous-titres (CC)', 'settings.captionsNote': 'Affiche les descriptions sonores et les paroles à l’écran pour les personnes sourdes ou malentendantes.',
    'tour.title': '🧭 Visite guidée', 'tour.sub': 'étapes narrées jusqu’à votre première légende.',
    'tour.subReplay': 'Un rappel du fonctionnement du Foyer. Voix et lecture incluses.',
    'tour.read': '🔊 Lire à voix haute', 'tour.stop': '⏹ Arrêter la lecture', 'tour.voiceOff': 'La voix est désactivée. Appuyez sur Lire à voix haute pour écouter la visite.',
    'tour.voiceUnavailable': 'La voix n’est pas disponible sur cet appareil.', 'tour.reading': 'Lecture en cours — suivez le surlignage jaune.',
    'tour.tap': 'Appuyez pour écouter cette étape et suivre la lecture.', 'tour.skip': 'Passer la visite', 'tour.close': 'Fermer',
    'tour.next': 'Suivant', 'tour.back': 'Retour', 'tour.start': 'Commencer l’exploration', 'tour.firstSecret': 'Premier secret : terminez la visite.',
  },
};

function uiLang() {
  const key = typeof state !== 'undefined' && state.theme ? state.theme.language : 'en';
  return I18N[key] ? key : 'en';
}

function t(key) {
  const lang = uiLang();
  return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
}

function applyLanguage() {
  const lang = uiLang();
  if (typeof document !== 'undefined') document.documentElement.lang = lang;
  document.querySelectorAll('[data-tab]').forEach((button) => {
    const label = button.querySelector('span:not(.tab-badge)');
    if (label) label.textContent = t(`tab.${button.dataset.tab}`);
  });
  const settings = document.querySelector('[data-settings-btn] span');
  if (settings) settings.textContent = t('tab.settings');
}

/* Full tour translations. Each entry mirrors TOUR_STEPS by index. */
const TOUR_I18N = {
  es: [
    {
      kicker: 'TU HOGAR', title: 'Esta es tu base',
      text: 'Esta es tu base. Toca tu sprite activo para acariciarlo y usa la barra de cuidados para Alimentar, Jugar, Pasear, Frotar la barriga, Lanzar la pelota, Jugar a atrapar, Bañar, Dormir, Cama y Hablar. Comida, Descanso, Alegría y Limpieza bajan en tiempo real, incluso con la app cerrada.',
      points: ['Un mensaje verde de “prospera aquí” significa que el hábitat actual da más XP.', 'Cuando una necesidad baja, el sprite pide el cuidado correspondiente.'],
      tip: 'Toca primero al sprite. Acariciarlo es gratis, sube el vínculo y tiene un breve tiempo de espera.',
    },
    {
      kicker: 'CUIDADOS Y RUTAS', title: 'Primero cuidar, luego explorar',
      text: 'Cuidar es el ciclo diario: Alimentar, Jugar, Pasear, Frotar la barriga, Lanzar la pelota, Jugar a atrapar, Bañar, Dormir, Cama y Hablar. Las caricias suben Alegría y vínculo. Lanzar y atrapar abren un juego de cinco capturas que paga monedas, XP, vínculo y llena el medidor de Paquete de Cuidado. Cama abre el dormitorio para arropar y ver el diario de sueños. Pasear lleva a tu sprite a Trotar, Correr y todas las rutas. Actividades tiene Canasta y Gol.',
      points: ['Pulsa Pasear, elige una ruta y toca las huellas brillantes. Las monedas y regalos dan pasos extra; los charcos te frenan.', 'Cada paseo paga monedas y XP, recupera Alegría y da vínculo extra. Cada tercera salida abre un Regalo de Ruta.', 'Paseo del Hogar y Trote del Amanecer están abiertos. Paseo Lunar a los 3 paseos, Sprint del Viento a los 5 y Ascenso a la Cima a los 8.', 'Canasta y Gol están en Actividades: mide el tiro o supera al portero y gana comida de despensa y un regalo cada dos partidas.', 'Las salidas gastan algo de Comida y Descanso. Da un tentempié y una siesta después; acariciar y hablar son gratis.'],
      tip: 'Si una necesidad está por debajo de 20, atiéndela antes de moverte. Trotar y Correr son más rápidos y pagan más.',
    },
    {
      kicker: 'EL NIDO', title: 'Calienta, eclosiona y fusiona',
      text: 'Abre el Nido para eclosionar, fusionar o visitar la Bóveda Secreta. Toca un huevo para calentarlo hasta que la cáscara se rompa y eclosiona al bebé en tu colección. Los huevos de tipo siempre dan una especie elegida; los salvajes eligen un elemento al azar. La Bóveda muestra cada secreto desbloqueado y sus posibles crías.',
      points: ['Fusiona dos sprites de nivel 3 o más para mezclar elementos, colores, patrones y personalidad en un huevo nuevo.', 'Fusionar cuesta 70 monedas más 25 por generación de los padres, y ambos descansan 60 segundos.', 'Los sprites retirados sirven como padres y cualquier tipo puede fusionarse. La Bóveda muestra combinaciones y una vista previa.'],
      tip: 'Empieza con un Huevo Salvaje de 45 monedas o ahorra para un huevo de tipo cuando quieras una especie exacta.',
    },
    {
      kicker: 'SPRITES Y CRECIMIENTO', title: 'Llévalos al nivel 30',
      text: 'Todo lo que hacéis juntos da XP. Comer, juegos, charlas, baños, siestas y caricias cuentan, y el hábitat adecuado multiplica la ganancia. Los sprites crecen en los niveles 1, 5, 10 y 20, y se detienen en el 30.',
      points: ['Alimentar sube las afinidades de dieta Corazón, Dulce, Espeluznante y Salvaje.', 'Al nivel 10, doce puntos en una dieta desbloquean una evolución permanente.', 'Al nivel 30 un sprite se retira. Una Comida de Renacimiento lo devuelve a un huevo con bonificaciones permanentes.'],
      tip: 'Los sprites retirados cuentan para la Bóveda y pueden fusionarse. La Comida de Renacimiento empieza su siguiente vida con ventajas.',
    },
    {
      kicker: 'COLECCIÓN Y COMIDA', title: 'Cada especie y cada bocado',
      text: 'La Colección guarda cada especie que has conocido, y Tipos es la enciclopedia completa con huevos, rareza, genes y Titanes. Comida y Tentempiés muestra el mercado, la despensa, los bocados y cada efecto de dieta.',
      points: ['Compra comida en el mercado y sírvela desde la despensa para subir necesidades y una ruta de dieta.', 'La Cocina del Mundo, la Cocina Anime y la despensa Entrenador son guías buscables.', 'Diez dulces añaden Azúcar. Con tres de Azúcar, el sprite se transforma en una especie de caramelo.', 'Una colección Disney de 60 personajes abarca Mickey, clásicos, princesas, Pixar, villanos y favoritos modernos en la Wiki.', 'Una colección de 32 Ositos Cariñositos añade los clásicos, primos y 15 favoritos de la familia extendida. Cada 3 actividades entregan un Paquete de Cuidado.', 'El legado de Fortnite añade 60 sprites y la WWE suma 60 superestrellas. La nueva ala de animación de Netflix añade 60 personajes de 20 series, con filtros por serie.', 'Un catálogo de 600 sprites añade PBS Kids, Monster Jam, Nickelodeon, Nick Jr., Nicktoons, Discovery, películas animadas, cómics, Disney Jr., Disney XD y todos los géneros de videojuegos.'],
      tip: 'Usa la búsqueda en Tipos para encontrar una especie y abre su tarjeta para ver huevo, hábitat e híbridos.',
    },
    {
      kicker: 'JUEGOS DE CUIDADO', title: 'Frota, lanza y atrapa',
      text: 'La barra de cuidados tiene tres formas más de conectar. Frotar la barriga sube Alegría y vínculo con un breve tiempo de espera. Lanzar la pelota y Jugar a atrapar abren un juego de cinco capturas: toca la pelota en movimiento, llena el medidor y termina para ganar monedas, XP, vínculo y crédito para juegos y Paquetes de Cuidado. Pasear sigue siendo el botón de rutas y Jugar abre el centro de Actividades.',
      points: ['Frotar la barriga es gratis y tiene un breve tiempo de espera; perfecto cuando baja la Alegría.', 'Lanzar y atrapar cuentan como juegos para tareas diarias, semanales y mensuales.', 'El juego de atrapar usa el sprite activo, así que las ventajas de ponis y tareas siguen activas.'],
      tip: 'Si la pelota va muy rápido, busca el brillo amarillo y toca la pelota. Cada captura la pausa un momento.',
    },
    {
      kicker: 'NUEVAS COLECCIONES', title: 'Ponis, TV, reinos y Llaves Espada',
      text: 'Cuatro colecciones nuevas viven en el Nido: 92 amigos de My Little Pony, 100 Leyendas de TV, 90 sprites de horror/luz/oscuridad y 90 personajes de Kingdom Hearts. La nueva ola añade ponis de fondo, líderes reales, Ositos Cariñositos extendidos, repartos completos de TV y los mundos Disney de Kingdom Hearts. El ala de animación de Netflix suma 60 personajes de 20 series, en Netflix Anime y Netflix Toons. Todos tienen gen, Titán, huevo de tipo, hábitat, híbrido, artículo de Wiki y arte procedural original.',
      points: ['Los ponis dan monedas extra en registros y tareas completadas mientras están activos.', 'Las Leyendas de TV crean repartos completos de drama, sitcom, ciencia ficción, fantasía y animación, con etiqueta de serie.', 'Horror, Horror Oscuro, Luz y Oscuridad tienen su propia familia de ocho sprites y aura de reino.', 'Kingdom Hearts cubre las Islas del Destino, toda la Organización XIII, los Wayfinders, los Buscadores y 50 personajes de mundos Disney.', 'Filtra el ala de Netflix por Netflix Anime, Netflix Toons y cada una de las 20 series, con progreso de propiedad.'],
      tip: 'Abre el navegador de Reparto en la Wiki para filtrar ponis por familia, TV por serie y Keyblade por mundo. Cada tarjeta abre su ficha.',
    },
    {
      kicker: 'BIOMAS DE TIPO', title: 'Dieciocho hogares para dieciocho tipos',
      text: 'Cada uno de los dieciocho tipos estándar tiene un bioma con su propio cielo, suelo, clima y guardián. Las especies compatibles ganan un 50% más de XP allí, y los visitantes reciben una pequeña bonificación.',
      points: ['Abre Tipos y luego Atlas de Biomas, o elige un escenario en Studio.', 'El Estudio de Biomas crea hábitats personalizados ilimitados con tus colores, emoji y bonus de XP.', 'Los biomas personalizados aceptan a todos los sprites crecidos sin límite de residentes.'],
      tip: 'Cambiar de hábitat y clima es gratis. Prueba un hogar nuevo cuando quieras.',
    },
    {
      kicker: 'JUEGOS CLÁSICOS', title: 'Diecinueve juegos, cinco rutas y dos deportes',
      text: 'Jugar tiene diecinueve juegos táctiles: nueve clásicos del Hogar, tres desafíos Arcade, cinco actividades de ruta y dos deportes: Canasta y Gol. Cuatro clásicos están abiertos desde el inicio; Trotar está abierto y las rutas rápidas se desbloquean al pasear. Cada juego completado paga monedas y XP al sprite activo, además de alegría y vínculo. Las rutas pueden dar comida y los deportes siempre la dan.',
      points: ['Atrapa Golosinas: toca dulces que caen y evita piedras durante veinte segundos.', 'Pulso Perfecto: toca cuando el anillo móvil se alinee con el objetivo.', 'Sprite Dice: mira los paneles iluminarse y repite el patrón.', 'Cava Monedas: toca monedas y gemas enterradas, pero evita las bombas.', 'Canasta y Gol pagan comida y crean un regalo deportivo cada dos partidas.'],
      tip: 'Los juegos pagan más con un sprite raro activo. Las rutas dan vínculo extra y un Regalo de Ruta cada tres salidas.',
    },
    {
      kicker: 'DESAFÍOS ARCADE', title: 'Tres juegos con una pista extra',
      text: 'Los otros tres juegos son desafíos Arcade. Siempre están abiertos y sus monedas llenan regalos extra y el premio mensual además de tu cartera.',
      points: ['Runa Deslizante: iguala la tira de orden y desliza una runa junto al hueco. Termina tres tableros en dos minutos.', 'Asedio Zombi: toca zombis antes de que lleguen al farol. Tienes tres corazones y treinta segundos.', 'Duelo del Hogar: pulsa Golpe en el centro verde y Guardia antes del ataque del bruto.'],
      tip: 'Cada 5.000 monedas Arcade llena un regalo extra. Cada tercer regalo y los niveles altos incluyen un Festín Starpath.',
    },
    {
      kicker: 'HOY Y CLIMA', title: 'Registra, completa y recoge',
      text: 'Hoy lleva el calendario del Hogar. Regístrate en las ventanas de mañana, tarde, noche y madrugada para monedas, bocados y rachas. Las misiones y metas pagan extra por lo que ya haces.',
      points: ['La caja mensual paga monedas, llena la despensa y desbloquea un plato nuevo.', 'Las pistas semanal y mensual añaden hitos mayores y un premio mítico anual.', 'El clima sigue la fecha real. El frío o la lluvia gastan más necesidades, así que usa el armario.'],
      tip: 'El primer registro del día mantiene la racha y llena un alimento de despensa.',
    },
    {
      kicker: 'HÉROES Y VILLANOS', title: 'Sesenta y un firmas de ambos multiversos',
      text: 'Una ola de sesenta y un héroes vive en el Nido: veintiocho héroes, veintiún villanos y doce antihéroes, repartidos en treinta y dos Marvel, veintidós DC y siete más allá de Marvel y DC. Deadpool y Gwenpool están en el set Marvel, junto al Spider-Man clásico.',
      points: ['Cada firma tiene su gen, Titán, huevo de tipo, hábitat e híbrido con nombre.', 'Abre la Wiki y busca Marvel o DC para filtrar el reparto.', 'La guía Héroes, villanos y antihéroes agrupa a todos por editorial, con rol.'],
      tip: 'Las fichas muestran Editorial y Rol en el infobox, además de un botón para volver a la guía.',
    },
    {
      kicker: 'SECRETOS Y EXÓTICOS', title: 'Algunas puertas no están en el Nido',
      text: 'Los sprites secretos no se venden en el Nido. Abre la Bóveda para ver cada guardián desbloqueado, sus tipos padres, híbridos y una vista previa. Hay puertas de hitos, doce guardianes mensuales y ocho relevos dos veces por semana. Los guardianes exóticos son distintos: pueden eclosionar de sus huevos de tipo.',
      points: ['Termina este tour para ganar el primer secreto, el Guía del Hogar.', 'Alcanza el nivel 30, visita los dieciocho biomas, llega a 100 de vínculo, eclosiona 25 huevos y descifra el nombre Maestro.', 'Abre la Bóveda durante una ventana mensual o de lunes a miércoles / jueves a domingo, y reclama al guardián antes de que rote.', 'Los sprites retirados cuentan para la Bóveda y sirven como padres.'],
      tip: 'La bóveda guarda cada pista, así que ábrela cuando un hito esté cerca.',
    },
    {
      kicker: 'ESTUDIO', title: 'Haz tuyo el Hogar',
      text: 'El Studio cambia el tema de la interfaz, el clima, el escenario, el cuerpo, los colores, los patrones, los accesorios, la voz, el idioma, los subtítulos y el nombre del Hogar. El Armario guarda conjuntos con nombre ilimitados y el Estudio de Biomas crea hábitats personalizados ilimitados.',
      points: ['Aplica o quita un conjunto cuando quieras; edítalo o bórralo después.', 'Los biomas personalizados tienen sus propios colores, emoji, nombre de hábitat y bonus de XP.', 'La fila de saltos rápidos de la Wiki llega a dibujos, cómics, géneros, variantes, la Bóveda y el criador en un toque.', 'Shortcut es una especie real con su gen, hábitats e híbrido con nombre.', 'Puedes repetir este tour o empezar de cero desde Studio.'],
      tip: 'Los conjuntos y biomas personalizados son gratis de crear, editar y aplicar, sin límite.',
    },
    {
      kicker: 'LISTO', title: 'Ese es todo el Hogar',
      text: 'Ese es todo el Hogar. Eclosiona un sprite, mantén sus necesidades felices, pasea o juega deportes, frota una barriga o juega a atrapar, juega los minijuegos, visita la Bóveda, regístrate a diario y llena la enciclopedia. La Wiki guarda cada regla y cada ficha si olvidas un detalle.',
      points: ['Empieza con la barra de cuidados, un Huevo Salvaje en el Nido o una ruta desde Pasear.', 'El tour de inducción se puede repetir desde Studio cuando quieras.'],
      tip: 'Terminar este paso da el primer secreto y abre el resto de pistas de la Bóveda.',
    },
  ],
  fr: [
    {
      kicker: 'VOTRE FOYER', title: 'Voici votre base',
      text: 'Voici votre base. Touchez votre sprite actif pour le caresser, puis utilisez la barre de soins pour Nourrir, Jouer, Promener, Frotter le ventre, Lancer la balle, Jouer à attraper, Laver, Dormir, Lit et Parler. Nourriture, Repos, Joie et Propreté baissent en temps réel, même application fermée.',
      points: ['Un message vert « s’épanouit ici » signifie que l’habitat actuel booste l’XP.', 'Quand un besoin baisse, le sprite réclame le soin correspondant.'],
      tip: 'Touchez d’abord le sprite. Le caresser est gratuit, renforce le lien et a un court délai.',
    },
    {
      kicker: 'SOINS ET SENTIERS', title: 'D’abord les soins, ensuite l’aventure',
      text: 'Les soins forment la boucle quotidienne : Nourrir, Jouer, Promener, Frotter le ventre, Lancer la balle, Jouer à attraper, Laver, Dormir, Lit et Parler. Les caresses du ventre montent Joie et lien. Lancer et Attraper ouvrent un jeu de cinq prises qui paie pièces, XP, lien et remplit le compteur de Colis de Soin. Le Lit ouvre la chambre pour border et lire le journal des rêves. Promener mène vers Trotter, Courir et tous les sentiers. Activités propose Panier et But.',
      points: ['Touchez Promener, choisissez un sentier, puis les empreintes lumineuses. Pièces et cadeaux donnent des pas; les flaques freinent.', 'Chaque sortie paie pièces et XP, rend de la Joie et donne du lien. Toutes les trois sorties, un Cadeau de Sentier apparaît.', 'Promenade du Foyer et Trot de l’Aube sont ouverts. Promenade Lunaire à 3 sorties, Sprint du Vent à 5, Ascension au Sommet à 8.', 'Panier et But sont dans Activités : dosez le tir ou dépassez le gardien, avec nourriture garantie et cadeau tous les deux matchs.', 'Les sorties coûtent un peu de Nourriture et de Repos. Offrez un en-cas et une sieste après; caresses et discussions sont gratuites.'],
      tip: 'Si un besoin est sous 20, occupez-vous-en avant de bouger. Trotter et Courir sont plus rapides et paient plus.',
    },
    {
      kicker: 'LE NID', title: 'Réchauffez, éclosez et fusionnez',
      text: 'Ouvrez le Nid pour éclore, fusionner ou visiter le Coffre Secret. Touchez un œuf pour le réchauffer jusqu’à la fissure, puis faites éclore le bébé dans votre collection. Les œufs de type donnent toujours l’espèce choisie; les œufs sauvages tirent un élément au hasard. Le Coffre montre chaque secret débloqué et ses enfants possibles.',
      points: ['Fusionnez deux sprites de niveau 3 ou plus pour mêler éléments, couleurs, motifs et personnalité dans un nouvel œuf.', 'La fusion coûte 70 pièces plus 25 par génération des parents; les deux parents se reposent 60 secondes.', 'Les sprites retraités restent des parents valables et tous les types peuvent fusionner. Le Coffre montre les combinaisons et un aperçu.'],
      tip: 'Commencez avec un Œuf Sauvage à 45 pièces, ou économisez pour un œuf de type quand vous voulez une espèce précise.',
    },
    {
      kicker: 'SPRITES ET CROISSANCE', title: 'Élevez-les jusqu’au niveau 30',
      text: 'Tout ce que vous faites ensemble donne de l’XP. Nourrir, jouer, discuter, laver, dormir et caresser comptent, et l’habitat correspondant multiplie le gain. Les sprites grandissent aux niveaux 1, 5, 10 et 20, puis s’arrêtent au 30.',
      points: ['Nourrir développe les affinités Copieux, Sucré, Étrange et Sauvage.', 'Au niveau 10, douze points dans une voie débloquent une évolution permanente.', 'Au niveau 30, un sprite prend sa retraite. Un Repas de Renaissance le ramène à l’œuf avec des bonus permanents.'],
      tip: 'Les sprites retraités comptent pour le Coffre et peuvent fusionner. Le Repas de Renaissance offre une nouvelle vie boostée.',
    },
    {
      kicker: 'COLLECTION ET NOURRITURE', title: 'Chaque espèce, chaque en-cas',
      text: 'La Collection garde chaque espèce rencontrée, et Types est l’encyclopédie complète avec œufs, rareté, gènes et Titans. Nourriture et En-cas présente le marché, le garde-manger, les en-cas et chaque effet de régime.',
      points: ['Achetez au marché puis servez depuis le garde-manger pour remonter les besoins et une voie alimentaire.', 'La Cuisine du Monde, la Cuisine Animée et le garde-manger Dresseur sont des guides consultables.', 'Dix bonbons ajoutent du Sucre. À trois Sucres, le sprite devient une espèce bonbon.', 'Une collection Disney de 60 personnages couvre Mickey, les classiques, les princesses, Pixar, les méchants et les favoris modernes dans le Wiki.', 'Une collection de 32 Bisounours ajoute les classiques, les cousins et 15 favoris de la famille élargie. Toutes les 3 activités, un Colis de Soin arrive.', 'L’héritage Fortnite ajoute 60 sprites et la WWE 60 superstars. La nouvelle aile animation Netflix ajoute 60 personnages de 20 séries, avec filtres par série.', 'Un catalogue de 600 sprites ajoute PBS Kids, Monster Jam, Nickelodeon, Nick Jr., Nicktoons, Discovery, films animés, comics, Disney Jr., Disney XD et tous les genres de jeux.'],
      tip: 'Utilisez la recherche dans Types pour trouver une espèce, puis ouvrez sa fiche pour l’œuf, l’habitat et les hybrides.',
    },
    {
      kicker: 'JEUX DE SOIN', title: 'Frottez, lancez et attrapez',
      text: 'La barre de soins propose trois façons de plus de créer du lien. Frotter le ventre monte Joie et lien avec un court délai. Lancer la balle et Jouer à attraper ouvrent un jeu de cinq prises : touchez la balle en mouvement, remplissez la jauge et terminez pour gagner pièces, XP, lien et crédit pour les jeux et Colis de Soin. Promener reste le bouton des sentiers et Jouer ouvre le centre d’Activités.',
      points: ['Frotter le ventre est gratuit avec un court délai; parfait quand la Joie est basse.', 'Lancer et attraper comptent comme des jeux pour les tâches quotidiennes, hebdomadaires et mensuelles.', 'Le jeu d’attraper utilise le sprite actif, donc les bonus de poney et de tâches restent actifs.'],
      tip: 'Si la balle va trop vite, repérez la lueur jaune et touchez la balle. Chaque prise la met en pause un instant.',
    },
    {
      kicker: 'NOUVELLES COLLECTIONS', title: 'Poneys, télé, royaumes et Keyblades',
      text: 'Quatre nouvelles collections vivent dans le Nid : 92 amis My Little Pony, 100 Légendes TV, 90 sprites horreur/lumière/obscurité et 90 personnages Kingdom Hearts. La nouvelle vague ajoute des poneys secondaires, des dirigeants royaux, des Bisounours étendus, des distributions TV complètes et les mondes Disney de Kingdom Hearts. L’aile animation Netflix ajoute 60 personnages de 20 séries, en Netflix Anime et Netflix Toons. Chacun a un gène, un Titan, un œuf de type, un habitat, un hybride, un article Wiki et un art procédural original.',
      points: ['Les poneys donnent des pièces bonus aux check-ins et aux tâches terminées quand ils sont actifs.', 'Les Légendes TV forment des distributions complètes de drame, sitcom, science-fiction, fantasy et animation, avec étiquette de série.', 'Horreur, Horreur Sombre, Lumière et Obscurité ont chacune huit sprites et une aura de royaume.', 'Kingdom Hearts couvre les Îles du Destin, toute l’Organisation XIII, les Wayfinders, les Chercheurs et 50 personnages de mondes Disney.', 'Filtrez l’aile Netflix par Netflix Anime, Netflix Toons et chacune des 20 séries, avec progression de possession.'],
      tip: 'Ouvrez le navigateur de Distribution dans le Wiki pour filtrer les poneys par famille, la TV par série et les Keyblades par monde. Chaque carte ouvre sa fiche.',
    },
    {
      kicker: 'BIOMES DE TYPE', title: 'Dix-huit foyers pour dix-huit types',
      text: 'Chacun des dix-huit types standards possède un biome avec son ciel, son sol, son climat et son gardien. Les espèces adaptées y gagnent 50 % d’XP en plus, et les visiteurs reçoivent un petit bonus.',
      points: ['Ouvrez Types puis Atlas des Biomes, ou choisissez un décor dans Studio.', 'Le Studio de Biomes crée des habitats personnalisés illimités avec vos couleurs, emoji et bonus d’XP.', 'Les biomes personnalisés accueillent tous les sprites adultes sans limite de résidents.'],
      tip: 'Changer d’habitat et de climat est gratuit. Essayez un nouveau foyer quand vous voulez.',
    },
    {
      kicker: 'JEUX CLASSIQUES', title: 'Dix-neuf jeux, cinq sentiers et deux sports',
      text: 'Jouer propose dix-neuf jeux tactiles : neuf classiques du Foyer, trois défis Arcade, cinq activités de sentier et deux sports — Panier et But. Quatre classiques sont ouverts dès le départ; Trotter est ouvert et les sentiers rapides se débloquent en marchant. Chaque jeu terminé paie pièces et XP au sprite actif, plus joie et lien. Les sentiers peuvent donner de la nourriture, et les sports en donnent toujours.',
      points: ['Attrape-Gourmandises : touchez les friandises qui tombent et évitez les cailloux pendant vingt secondes.', 'Pulse Parfait : touchez quand l’anneau mobile s’aligne sur la cible.', 'Sprite Dit : regardez les panneaux s’allumer puis répétez le motif.', 'Creuse-Pièces : touchez pièces et gemmes enfouies, mais évitez les bombes.', 'Panier et But paient de la nourriture et créent un cadeau sportif tous les deux matchs.'],
      tip: 'Les jeux paient plus avec un sprite rare actif. Les sentiers ajoutent du lien et un Cadeau de Sentier tous les trois sorties.',
    },
    {
      kicker: 'DÉFIS ARCADE', title: 'Trois jeux et une piste bonus',
      text: 'Les trois autres jeux sont des défis Arcade. Ils sont toujours ouverts, et leurs pièces remplissent des cadeaux bonus et le prix mensuel en plus de votre bourse.',
      points: ['Rune Coulissante : alignez la bande d’ordre et faites glisser une rune près du vide. Terminez trois plateaux en deux minutes.', 'Siège Zombie : touchez les zombies avant la lanterne. Trois cœurs et trente secondes.', 'Duel du Foyer : appuyez sur Frappe dans le centre vert et Garde avant l’attaque du brute.'],
      tip: 'Toutes les 5 000 pièces Arcade remplissent un cadeau bonus. Chaque troisième cadeau et les hauts paliers incluent un Festin Starpath.',
    },
    {
      kicker: 'AUJOURD’HUI ET CLIMAT', title: 'Pointez, accomplissez, récoltez',
      text: 'Aujourd’hui gère le calendrier du Foyer. Pointez aux fenêtres matin, après-midi, soir et nuit pour des pièces, en-cas et séries. Quêtes et objectifs paient plus pour ce que vous faites déjà.',
      points: ['La caisse mensuelle paie des pièces, remplit le garde-manger et débloque un nouveau plat.', 'Les pistes hebdomadaire et mensuelle ajoutent de grands paliers et une récompense mythique annuelle.', 'Le climat suit la date réelle. Le froid ou la pluie usent plus vite les besoins; utilisez la garde-robe.'],
      tip: 'Le premier pointage du jour maintient la série et remplit un aliment du garde-manger.',
    },
    {
      kicker: 'HÉROS ET MÉCHANTS', title: 'Soixante et une signatures des deux multivers',
      text: 'Une vague de soixante et un héros vit dans le Nid : vingt-huit héros, vingt et un méchants et douze antihéros, répartis en trente-deux Marvel, vingt-deux DC et sept au-delà de Marvel et DC. Deadpool et Gwenpool sont dans le set Marvel, aux côtés du Spider-Man classique.',
      points: ['Chaque signature a son gène, Titan, œuf de type, habitat et hybride nommé.', 'Ouvrez le Wiki et cherchez Marvel ou DC pour filtrer la distribution.', 'Le guide Héros, méchants et antihéros regroupe tout le monde par éditeur, avec rôle.'],
      tip: 'Les fiches affichent Éditeur et Rôle dans l’infobox, plus un bouton pour revenir au guide.',
    },
    {
      kicker: 'SECRETS ET EXOTIQUES', title: 'Certaines portes ne sont pas dans le Nid',
      text: 'Les sprites secrets ne sont pas vendus dans le Nid. Ouvrez le Coffre pour voir chaque gardien débloqué, ses types parents, ses hybrides et un aperçu. Il y a des portes de paliers, douze gardiens mensuels et huit relais deux fois par semaine. Les gardiens exotiques sont différents : ils peuvent éclore de leurs œufs de type.',
      points: ['Terminez cette visite pour gagner le premier secret, le Guide du Foyer.', 'Atteignez le niveau 30, visitez les dix-huit biomes, 100 de lien, éclosez 25 œufs et déchiffrez le nom Maître.', 'Ouvrez le Coffre pendant une fenêtre mensuelle ou du lundi au mercredi / jeudi au dimanche, et réclamez le gardien avant la rotation.', 'Les sprites retraités comptent pour le Coffre et servent de parents.'],
      tip: 'Le coffre garde chaque indice; ouvrez-le quand un palier approche.',
    },
    {
      kicker: 'STUDIO', title: 'Faites vôtre le Foyer',
      text: 'Le Studio change le thème de l’interface, le climat, le décor, le corps, les couleurs, les motifs, les accessoires, la voix, la langue, les sous-titres et le nom du Foyer. La Garde-robe garde des tenues nommées illimitées et le Studio de Biomes crée des habitats personnalisés illimités.',
      points: ['Appliquez ou retirez une tenue à tout moment, puis modifiez-la ou supprimez-la.', 'Les biomes personnalisés ont leurs couleurs, emoji, nom d’habitat et bonus d’XP.', 'La rangée de raccourcis du Wiki atteint dessins animés, comics, genres, variantes, le Coffre et l’éleveur en un geste.', 'Shortcut est une vraie espèce avec gène, habitats et hybride nommé.', 'Vous pouvez rejouer cette visite ou repartir de zéro depuis Studio.'],
      tip: 'Tenues et biomes personnalisés sont gratuits à créer, modifier et appliquer, sans limite.',
    },
    {
      kicker: 'PRÊT', title: 'Voilà tout le Foyer',
      text: 'Voilà tout le Foyer. Faites éclore un sprite, gardez ses besoins heureux, promenez-le ou jouez au sport, frottez un ventre ou jouez à attraper, jouez aux mini-jeux, visitez le Coffre, pointez chaque jour et remplissez l’encyclopédie. Le Wiki garde chaque règle et chaque fiche si un détail vous échappe.',
      points: ['Commencez par la barre de soins, un Œuf Sauvage dans le Nid ou un sentier depuis Promener.', 'La visite guidée peut être rejouée depuis Studio à tout moment.'],
      tip: 'Terminer cette étape donne le premier secret et ouvre les autres indices du Coffre.',
    },
  ],
};

function tourStepText(step, index) {
  const lang = uiLang();
  const local = TOUR_I18N[lang] && TOUR_I18N[lang][index];
  if (!local) return step;
  return { ...step, ...local, points: local.points || step.points };
}
