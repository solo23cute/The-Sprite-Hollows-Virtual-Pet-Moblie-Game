/* Medical-TV wing: Grey's Anatomy across all 23 seasons and Scrubs across all
   nine. Every entry is an original Hollow collectible with procedural art. */

const MEDICAL_SHOWS = {
  greys: {
    label: "Grey's Anatomy", icon: '🩺', price: 220, partner: 'soul', suffix: 'Case',
    homes: ['neon', 'crystal', 'grove'], likes: 'Coffee',
    primary: '#3f6f8a', light: '#e6f4fb', deep: '#122a38', accent: '#e05a6f',
    gene: ['Surgical Precision', '🩺', 'Night games pay +5 coins and all needs fade 10% slower.', { nightCoins: 5, decay: 0.9 }],
    trait: 'Hospital-forged — keeps a steady hand when the room starts moving fast.',
    blurb: 'A Grey Sloan signature with a lab coat, a badge, and a chart that never quite ends.',
    greetings: [
      'Somebody page me. I was almost asleep.',
      'It is a beautiful day to save lives. Also, I need coffee.',
      'The patient is stable. The interns are not.',
    ],
    note: 'A Seattle surgical drama of attendings, residents, interns, and the families they build between shifts.',
  },
  scrubs: {
    label: 'Scrubs', icon: '🧑‍⚕️', price: 185, partner: 'bloom', suffix: 'Shift',
    homes: ['sugar', 'grove', 'neon'], likes: 'Cereal Bowl',
    primary: '#6b8f4f', light: '#efffe0', deep: '#263b1a', accent: '#5aa9c9',
    gene: ['Sacred Heart', '💚', 'Chats pay +3 coins, pets pay +2 coins, and check-ins pay +2 bonus coins.', { chatCoins: 3, petCoins: 2, checkinCoins: 2 }],
    trait: 'Shift-tested — finds the joke, the diagnosis, and the exit at roughly the same time.',
    blurb: 'A Sacred Heart signature in soft scrubs, with a stethoscope and a daydream already in progress.',
    greetings: [
      'I am not saying this is a bad day. I am saying it has a laugh track.',
      'The chart says one thing. The patient says another. I am holding the pen.',
      'Somebody get me a coffee and a sensible plan. In that order.',
    ],
    note: 'A teaching-hospital comedy about interns, mentors, janitors, and the small absurdities that keep a ward alive.',
  },
};
const MEDICAL_SHOW_ORDER = ['greys', 'scrubs'];
const MEDICAL_SEASONS = Array.from({ length: 23 }, (_, index) => index + 1);
const SCRUBS_SEASONS = Array.from({ length: 9 }, (_, index) => index + 1);
const MEDICAL_ACCENTS = ['#e05a6f', '#e8b04a', '#5aa9c9', '#8a6bd9', '#6bbf8a', '#d979b8', '#d97b4f', '#7f9fd9'];

/* [show, key, name, art, role, first season, last season] */
const MEDICAL_DEFS = [
  ['greys', 'grey_meredith', 'Meredith Grey', 'lead', 'Surgical resident', 1, 23],
  ['greys', 'grey_derek', 'Derek Shepherd', 'neuro', 'Neurosurgeon', 1, 17],
  ['greys', 'grey_cristina', 'Cristina Yang', 'cardio', 'Cardio surgeon', 1, 10],
  ['greys', 'grey_alex', 'Alex Karev', 'pediatric', 'Pediatric surgeon', 1, 16],
  ['greys', 'grey_izzie', 'Izzie Stevens', 'surgeon', 'Surgical resident', 1, 6],
  ['greys', 'grey_george', 'George O’Malley', 'intern', 'Surgical intern', 1, 6],
  ['greys', 'grey_bailey', 'Miranda Bailey', 'chief', 'Chief of surgery', 1, 23],
  ['greys', 'grey_webber', 'Richard Webber', 'mentor', 'Attending surgeon', 1, 23],
  ['greys', 'grey_burke', 'Preston Burke', 'cardio', 'Cardio surgeon', 1, 3],
  ['greys', 'grey_addison', 'Addison Montgomery', 'ob', 'OB/GYN surgeon', 1, 7],
  ['greys', 'grey_callie', 'Callie Torres', 'ortho', 'Orthopedic surgeon', 2, 12],
  ['greys', 'grey_denny', 'Denny Duquette', 'patient', 'Heart patient', 2, 3],
  ['greys', 'grey_ellis', 'Ellis Grey', 'mentor', 'Legendary surgeon', 2, 3],
  ['greys', 'grey_thatcher', 'Thatcher Grey', 'patient', 'Family', 2, 6],
  ['greys', 'grey_mark', 'Mark Sloan', 'plastic', 'Plastic surgeon', 2, 9],
  ['greys', 'grey_hahn', 'Erica Hahn', 'cardio', 'Cardio surgeon', 2, 5],
  ['greys', 'grey_adele', 'Adele Webber', 'patient', 'Family', 2, 7],
  ['greys', 'grey_sydney', 'Sydney Heron', 'resident', 'Surgical resident', 2, 4],
  ['greys', 'grey_lexie', 'Lexie Grey', 'resident', 'Surgical resident', 4, 8],
  ['greys', 'grey_sadie', 'Sadie Harris', 'intern', 'Surgical intern', 5, 5],
  ['greys', 'grey_rebecca', 'Rebecca Pope', 'patient', 'Patient', 4, 5],
  ['greys', 'grey_owen', 'Owen Hunt', 'trauma', 'Trauma surgeon', 5, 23],
  ['greys', 'grey_arizona', 'Arizona Robbins', 'pediatric', 'Pediatric surgeon', 5, 14],
  ['greys', 'grey_teddy', 'Teddy Altman', 'cardio', 'Cardio surgeon', 6, 23],
  ['greys', 'grey_jackson', 'Jackson Avery', 'plastic', 'Plastic surgeon', 6, 17],
  ['greys', 'grey_april', 'April Kepner', 'trauma', 'Trauma surgeon', 6, 14],
  ['greys', 'grey_reed', 'Reed Adamson', 'resident', 'Surgical resident', 6, 6],
  ['greys', 'grey_charles', 'Charles Percy', 'resident', 'Surgical resident', 6, 6],
  ['greys', 'grey_ben', 'Ben Warren', 'anesthesiologist', 'Anesthesiologist', 6, 23],
  ['greys', 'grey_jo', 'Jo Wilson', 'resident', 'Surgical resident', 9, 23],
  ['greys', 'grey_stephanie', 'Stephanie Edwards', 'resident', 'Surgical resident', 9, 13],
  ['greys', 'grey_leah', 'Leah Murphy', 'resident', 'Surgical resident', 9, 13],
  ['greys', 'grey_shane', 'Shane Ross', 'resident', 'Surgical resident', 9, 11],
  ['greys', 'grey_heather', 'Heather Brooks', 'intern', 'Surgical intern', 9, 9],
  ['greys', 'grey_henry', 'Henry Burton', 'patient', 'Patient', 7, 8],
  ['greys', 'grey_herman', 'Nicole Herman', 'neuro', 'Neurosurgeon', 10, 14],
  ['greys', 'grey_maggie', 'Maggie Pierce', 'cardio', 'Cardio surgeon', 10, 23],
  ['greys', 'grey_amelia', 'Amelia Shepherd', 'neuro', 'Neurosurgeon', 10, 23],
  ['greys', 'grey_deluca', 'Andrew DeLuca', 'resident', 'Surgical resident', 11, 17],
  ['greys', 'grey_penny', 'Penny Blake', 'resident', 'Surgical resident', 11, 12],
  ['greys', 'grey_riggs', 'Nathan Riggs', 'trauma', 'Trauma surgeon', 11, 14],
  ['greys', 'grey_minnick', 'Eliza Minnick', 'admin', 'Surgical educator', 13, 13],
  ['greys', 'grey_carina', 'Carina DeLuca', 'ob', 'OB/GYN researcher', 12, 23],
  ['greys', 'grey_koracick', 'Tom Koracick', 'neuro', 'Neurosurgeon', 13, 17],
  ['greys', 'grey_levi', 'Levi Schmitt', 'intern2', 'Surgical intern', 14, 20],
  ['greys', 'grey_nico', 'Nico Kim', 'surgeon', 'Orthopedic surgeon', 14, 18],
  ['greys', 'grey_helm', 'Taryn Helm', 'resident', 'Surgical resident', 14, 23],
  ['greys', 'grey_qadri', 'Dahlia Qadri', 'resident', 'Surgical resident', 14, 16],
  ['greys', 'grey_roy', 'Vikram Roy', 'intern2', 'Surgical intern', 14, 15],
  ['greys', 'grey_link', 'Atticus Lincoln', 'ortho', 'Orthopedic surgeon', 14, 23],
  ['greys', 'grey_hayes', 'Cormac Hayes', 'pediatric', 'Pediatric surgeon', 15, 17],
  ['greys', 'grey_winston', 'Winston Ndugu', 'cardio', 'Cardio surgeon', 16, 23],
  ['greys', 'grey_nick', 'Nick Marsh', 'transplant', 'Transplant surgeon', 17, 23],
  ['greys', 'grey_kai', 'Kai Bartley', 'neuro', 'Neuroscientist', 18, 19],
  ['greys', 'grey_hamilton', 'David Hamilton', 'neuro', 'Neurosurgeon', 18, 18],
  ['greys', 'grey_jules', 'Jules Millin', 'intern2', 'Surgical intern', 19, 23],
  ['greys', 'grey_benson', 'Benson Kwan', 'intern2', 'Surgical intern', 19, 23],
  ['greys', 'grey_simone', 'Simone Griffith', 'intern2', 'Surgical intern', 19, 23],
  ['greys', 'grey_lucas', 'Lucas Adams', 'intern2', 'Surgical intern', 19, 23],
  ['greys', 'grey_mika', 'Mika Yasuda', 'intern2', 'Surgical intern', 19, 23],
  ['greys', 'grey_blue', 'Blue', 'intern2', 'Surgical intern', 19, 23],
  ['greys', 'grey_monica', 'Monica Beltran', 'pediatric', 'Pediatric surgeon', 20, 23],
  ['greys', 'grey_dorian', 'Dorian Crenshaw', 'intern2', 'Surgical intern', 19, 23],
  ['greys', 'grey_catherine', 'Catherine Fox', 'admin', 'Hospital founder', 3, 23],
  ['greys', 'grey_finn', 'Finn Dandridge', 'vet', 'Veterinarian', 2, 3],
  ['greys', 'grey_dylan', 'Dylan Young', 'bomb', 'Bomb squad', 2, 3],
  ['greys', 'grey_megan', 'Megan Hunt', 'military', 'Trauma surgeon', 11, 14],
  ['greys', 'grey_casey', 'Casey Parker', 'intern2', 'Surgical intern', 14, 16],
  ['greys', 'grey_bokhee', 'Bokhee', 'scrubnurse', 'Scrub nurse', 1, 23],
  ['greys', 'grey_oliver', 'Oliver Lebackes', 'intern', 'Surgical intern', 2, 4],
  ['greys', 'grey_nelson', 'Dr. Nelson', 'surgeon', 'Attending surgeon', 6, 8],
  ['greys', 'grey_perkins', 'Dr. Perkins', 'surgeon', 'Attending surgeon', 7, 8],
  ['greys', 'grey_stark', 'Dr. Stark', 'pediatric', 'Pediatric surgeon', 6, 7],
  ['greys', 'grey_boswell', 'Lauren Boswell', 'surgeon', 'Fetal surgeon', 9, 9],
  ['greys', 'grey_cahill', 'Alana Cahill', 'admin', 'Hospital consultant', 9, 9],
  ['greys', 'grey_marling', 'Emma Marling', 'resident', 'Surgical resident', 9, 9],

  ['scrubs', 'scrubs_jd', 'John Dorian', 'lead', 'Intern', 1, 9],
  ['scrubs', 'scrubs_turk', 'Chris Turk', 'surgeon', 'Surgical resident', 1, 9],
  ['scrubs', 'scrubs_elliot', 'Elliot Reid', 'resident', 'Medical resident', 1, 9],
  ['scrubs', 'scrubs_carla', 'Carla Espinosa', 'nurse', 'Head nurse', 1, 9],
  ['scrubs', 'scrubs_cox', 'Perry Cox', 'mentor', 'Attending physician', 1, 9],
  ['scrubs', 'scrubs_kelso', 'Bob Kelso', 'chief', 'Chief of medicine', 1, 9],
  ['scrubs', 'scrubs_janitor', 'The Janitor', 'janitor', 'Janitor', 1, 9],
  ['scrubs', 'scrubs_jordan', 'Jordan Sullivan', 'admin', 'Board member', 1, 9],
  ['scrubs', 'scrubs_ted', 'Ted Buckland', 'admin', 'Hospital lawyer', 1, 9],
  ['scrubs', 'scrubs_todd', 'Todd Quinlan', 'surgeon', 'Surgical resident', 1, 9],
  ['scrubs', 'scrubs_doug', 'Doug Murphy', 'resident', 'Medical resident', 1, 9],
  ['scrubs', 'scrubs_laverne', 'Laverne Roberts', 'nurse', 'Nurse', 1, 8],
  ['scrubs', 'scrubs_mickhead', 'Dr. Mickhead', 'resident', 'Medical resident', 1, 9],
  ['scrubs', 'scrubs_beardface', 'Dr. Beardfacé', 'surgeon', 'Attending surgeon', 1, 9],
  ['scrubs', 'scrubs_wen', 'Dr. Wen', 'resident', 'Medical resident', 1, 9],
  ['scrubs', 'scrubs_zeltzer', 'Dr. Zeltzer', 'resident', 'Medical resident', 1, 9],
  ['scrubs', 'scrubs_maddox', 'Dr. Maddox', 'admin', 'Chief of medicine', 5, 6],
  ['scrubs', 'scrubs_denise', 'Denise Mahoney', 'intern2', 'Intern', 8, 9],
  ['scrubs', 'scrubs_lucy', 'Lucy Bennett', 'intern2', 'Intern', 9, 9],
  ['scrubs', 'scrubs_drew', 'Drew Suffin', 'intern2', 'Intern', 9, 9],
  ['scrubs', 'scrubs_cole', 'Cole Aaronson', 'intern2', 'Intern', 9, 9],
  ['scrubs', 'scrubs_trang', 'Trang', 'intern2', 'Intern', 9, 9],
  ['scrubs', 'scrubs_katie', 'Katie Collins', 'patient', 'Patient', 8, 8],
  ['scrubs', 'scrubs_sean', 'Sean Kelly', 'patient', 'Patient', 8, 8],
  ['scrubs', 'scrubs_ben', 'Ben Sullivan', 'patient', 'Patient', 3, 3],
  ['scrubs', 'scrubs_shirley', 'Nurse Shirley', 'nurse2', 'Nurse', 1, 9],
  ['scrubs', 'scrubs_matthews', 'Dr. Matthews', 'surgeon', 'Attending surgeon', 1, 9],
  ['scrubs', 'scrubs_vaughn', 'Dr. Vaughn', 'resident', 'Medical resident', 1, 9],
  ['scrubs', 'scrubs_miller', 'Dr. Miller', 'resident', 'Medical resident', 1, 9],
  ['scrubs', 'scrubs_hooch', 'Dr. Hooch', 'mentor', 'Attending physician', 2, 8],
];

const MEDICAL_SPECIES = [];
const MEDICAL_BY_SHOW = { greys: [], scrubs: [] };
const MEDICAL_BY_SEASON = { greys: {}, scrubs: {} };
MEDICAL_SEASONS.forEach((season) => { MEDICAL_BY_SEASON.greys[season] = []; });
SCRUBS_SEASONS.forEach((season) => { MEDICAL_BY_SEASON.scrubs[season] = []; });

MEDICAL_DEFS.forEach(([showKey, key, name, art, role, firstSeason, lastSeason], index) => {
  const show = MEDICAL_SHOWS[showKey];
  if (!show || ELEMENTS[key]) return;
  const seasons = [];
  for (let season = firstSeason; season <= lastSeason; season += 1) seasons.push(season);
  ELEMENTS[key] = {
    name,
    primary: show.primary,
    light: show.light,
    deep: show.deep,
    accent: MEDICAL_ACCENTS[index % MEDICAL_ACCENTS.length],
    trait: `${show.trait} ${name} brings ${role.toLowerCase()} energy to every shift.`,
    blurb: `${name} is a ${role.toLowerCase()} signature from ${show.label}, part of the Hollow’s medical-TV wing.`,
    greeting: show.greetings[index % show.greetings.length],
    likes: show.likes,
    parentTypes: ['TV Legends', show.label],
    medicalTV: true,
    medicalShow: show.label,
    medicalShowKey: showKey,
    medicalArt: art,
    medicalRole: role,
    medicalSeasons: seasons,
    medicalArticle: `${name} belongs to ${show.label}, ${show.note} This original Hollow study follows the character’s ${role.toLowerCase()} role across season${seasons.length === 1 ? '' : 's'} ${firstSeason}${lastSeason === firstSeason ? '' : `–${lastSeason}`}.`,
    catalogType: `Medical TV · ${show.label}`,
  };
  GENE_POWERS[key] = {
    name: show.gene[0], icon: show.gene[1], desc: show.gene[2], effect: show.gene[3],
  };
  TITAN_NAMES[key] = `${name} Titan`;
  TYPE_EGG_BASE_PRICE[key] = show.price + (index % 5) * 4;
  TYPE_EGG_PRICE[key] = discountedEggPrice(TYPE_EGG_BASE_PRICE[key]);
  if (ELEMENTS[show.partner]) HYBRID_NAMES[pairKey(key, show.partner)] = `${name} ${show.suffix}`;
  NAME_START[key] = [...new Set([name.split(' ')[0], 'Medical', show.label.split(' ')[0], 'Chart'])];
  show.homes.forEach((scene) => {
    if (SCENES[scene] && !SCENES[scene].species.includes(key)) SCENES[scene].species.push(key);
  });
  MEDICAL_SPECIES.push(key);
  MEDICAL_BY_SHOW[showKey].push(key);
  seasons.forEach((season) => {
    if (MEDICAL_BY_SEASON[showKey][season]) MEDICAL_BY_SEASON[showKey][season].push(key);
  });
});

ELEMENT_KEYS.push(...MEDICAL_SPECIES);
const MEDICAL_TOTAL = MEDICAL_SPECIES.length;
const GREYS_TOTAL = MEDICAL_BY_SHOW.greys.length;
const SCRUBS_TOTAL = MEDICAL_BY_SHOW.scrubs.length;

if (typeof registerCollectionWave === 'function') {
  registerCollectionWave({
    key: 'greys', label: "Grey's Anatomy", icon: '🩺', group: 'TV & film',
    note: 'Every season from intern year to the current surgical staff, with original procedural portraits.',
    count: () => GREYS_TOTAL,
  });
  registerCollectionWave({
    key: 'scrubs', label: 'Scrubs', icon: '🧑‍⚕️', group: 'TV & film',
    note: 'All nine seasons of Sacred Heart, from interns to janitor, with original procedural portraits.',
    count: () => SCRUBS_TOTAL,
  });
}
