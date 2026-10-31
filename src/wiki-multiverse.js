/* Wiki guide for metahumans, robots, aliens, Multiversus, and the Space Kitchen. */

function multiverseGuideBody() {
  const ids = Object.keys(MULTIVERSE_GROUPS);
  const spaceFoods = FOOD_KEYS.filter((key) => FOODS[key].cat === 'space');
  return catalogGuideBody(ids, `The multiverse has opened. This wave adds <b>${ids.reduce((total, id) => total + (CATALOG_BY_GROUP[id] || []).length, 0)} species</b>: eighteen meta-human variants, eighteen robots, eighteen aliens, and twenty-four <b>Multiversus</b> fighters.`) +
    `<h3>🌈 Prismatic rule</h3>
     <p>Every meta-human, robot, and alien is <b>always shiny</b> from birth. Their eggs carry the prismatic glow before hatching, and their Codex card carries the 🌈 <b>Prismatic</b> badge. Use the <b>Prismatic</b> filter in Types to see the whole family.</p>
     <h3>🚀 Space Kitchen</h3>
     <p>The market now stocks <b>${spaceFoods.length} space foods</b> in a dedicated 🚀 Space Kitchen category. Meteor Meatball, Nebula Noodles, Lunar Loaf, Galaxy Dumpling, Rocket Ramen, Cosmic Curry, and more all use the normal feeding, pantry, and diet systems.</p>
     <div class="wiki-hybrid-list">${spaceFoods.map((key) => `<button class="wiki-link" data-world-food="${key}"><b>${FOODS[key].emoji} ${esc(FOODS[key].name)}</b><span>${esc(FOODS[key].desc)}</span></button>`).join('')}</div>
     <div class="wiki-footnote">96 new species · 18 new space dishes · all in the Codex, Wiki, breeder, and type eggs.</div>`;
}

WIKI_GUIDES.push({
  id: 'multiversewave', icon: '🌀', title: 'Multiverse, robots & space food',
  summary: 'Prismatic meta-humans, robots, aliens, 24 Multiversus fighters, and the Space Kitchen.',
  body: multiverseGuideBody,
});
