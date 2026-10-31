/* A tiny personality engine so every sprite can talk back. */

const CHAT_QUICK = [
  'How are you?',
  'I love you',
  'Tell me a joke',
  'What should we do?',
  'Are you hungry?',
  'You look cute',
];

function nameOf(s) { return displayName(s); }

function personalityName(s) {
  return PERSONALITIES[s.personality]?.name || 'Sunny';
}

const PERSONA_TONE = {
  sunny: {
    greet: ['HI! You’re here! Best day!', 'Oh! Oh! It’s you!', 'I was hoping you’d come by!'],
    love: ['I love you more than snacks. And I LOVE snacks.', 'My whole heart just did a little jump.', 'You’re my favourite person. Obviously.'],
    joke: ['Why did the sprite bring a ladder to the meadow? To reach the high notes!', 'What do you call a sleepy Ember? A smoulder!', 'I told my shadow a joke and it cracked up. Get it? Cracked?'],
    end: ['Come back soon, okay?', 'I’ll be right here being happy!'],
    agree: ['YES. Let’s do the thing!', 'Absolutely! I’m already excited!'],
  },
  grump: {
    greet: ['Oh. It’s you. Fine, I’m listening.', 'You again. …Hi.', 'I was having a perfectly grumpy day until you showed up.'],
    love: ['Don’t get weird about it, but… same.', 'Ugh. Fine. I love you too. Don’t tell anyone.', 'You’re tolerable. That’s my highest rating.'],
    joke: ['My joke is that I’m awake. Hilarious, right?', 'Why did the Grump cross the meadow? To avoid talking to you. …That was a joke. Mostly.', 'Knock knock. No. Go away. …Okay, come back.'],
    end: ['Leave. …Actually, stay a bit. Only a bit.', 'Bye. I’m not watching you leave. I absolutely am.'],
    agree: ['Fine. But I’m not going to enjoy it. I will. But I’m not admitting it.', 'If we must.'],
  },
  shy: {
    greet: ['Oh! Hi… I was hoping it was you.', 'Hello… you can stay. If you want.', 'I saved you a spot. It’s a very small spot.'],
    love: ['I— oh. That’s… a lot. I love you too. There, I said it.', 'My cheeks are doing the hot thing.', '…Can I hug you? Too much? Sorry.'],
    joke: ['I know a joke but I might say it wrong… Why did the Sprig stay in the shade? Because it was a little… shy-dy? …I’ll stop.', 'Knock knock. Who’s there? …I forgot. Sorry.', 'I had a joke and then I saw you and it left.'],
    end: ['Come back when you can… please.', 'I’ll be here. Quietly.'],
    agree: ['Okay. Yes. I’d like that.', '…If you’re sure. Okay!'],
  },
  bold: {
    greet: ['There you are! Ready for trouble?', 'I was about to go on an adventure without you. Good timing.', 'Stand back, I’m about to be brave at something.'],
    love: ['Obviously. I’m extremely lovable. …I love you too, actually.', 'You’re my favourite sidekick. Co-captain. Fine, equal.', 'I’d fight a cloud for you. A small cloud. Still counts.'],
    joke: ['I’m not funny, I’m cool. But here goes: why did the Volt cross the road? Because it was a live wire!', 'What’s a bold sprite’s favourite snack? Anything it can steal from a bigger sprite.', 'My jokes are dangerous. You’re welcome.'],
    end: ['Don’t wander off too far! Or do — I’ll find you.', 'Adventure waits for neither of us!'],
    agree: ['Finally! An excellent decision!', 'Yes! Follow me! Or lead, I don’t care, just move!'],
  },
  goofy: {
    greet: ['Beep boop! I am a completely normal sprite. …Did that work?', 'I have been waiting for you! Also I forgot you were coming!', 'Guess what! I don’t know but guess!'],
    love: ['I LOVE YOU! Also I found a shiny rock and I love that too. It’s a tie.', 'You get the biggest hug. It’s mostly legs. It’s a leg hug.', 'My heart made a noise just now. That’s normal, right?'],
    joke: ['What do you call a Blob who does math? A calc-y-lump!', 'I tried to tell my shadow a joke but it just nodded. Rude.', 'Why did the Gale get kicked out of the library? Too much wind-bending. …Bending. I’ll see myself out.'],
    end: ['Bye! Don’t step on any bees! Unless they’re nice!', 'I’ll be doing goofy things. Come join!'],
    agree: ['Vroom! Let’s go!', 'Say less! I’m already doing it!'],
  },
  dreamy: {
    greet: ['Hi… I was just thinking about clouds that look like clouds.', 'Oh! You’re here. I dreamt you’d be here. Or maybe I’m still dreaming.', 'The light is nice today. You’re nice too.'],
    love: ['That’s the warmest thing anyone’s said to me. I’ll keep it in my pocket.', 'I love you in a very soft, floating way. It’s a good way.', 'I think my heart just bloomed. …Is that a thing? I think it’s a thing.'],
    joke: ['A dream told me a joke. I forgot the joke but the feeling was hilarious.', 'What does a Wisp eat for breakfast? Nothing. It just watches the sun and feels things.', 'I know a joke. It’s in a cloud. I’ll remember it when it rains.'],
    end: ['Float gently. Come back soon.', 'I’ll be here, half in a cloud.'],
    agree: ['Mmm. Yes. That sounds lovely.', 'Let’s drift there together.'],
  },
  sassy: {
    greet: ['Well, look who finally showed up. I was about to replace you with a nicer rock.', 'Hi, bestie. Your timing is cute, like the rest of you.', 'I’ve been waiting. Not patiently. Just wanted to be clear.'],
    love: ['I mean, obviously. Have you seen me? …I love you too, okay, don’t let it go to your head.', 'Ugh, you’re going to make me be sincere. I love you. There. One (1) sincere sentence.', 'You’re lucky you’re my favourite. Don’t tell the others.'],
    joke: ['Why did the Tide sprite break up with the shore? It needed space. Too much space. It was a whole thing.', 'My mirror told me a joke. It was actually about you.', 'I only tell jokes that make me look good, so: why are you so lucky? Because you know me.'],
    end: ['Go on, go. I’ll be here being the best one.', 'Bye, favourite. Try not to miss me too much.'],
    agree: ['Finally, a good idea from you. Let’s.', 'Fine, but I’m choosing the playlist.'],
  },
};

function toneLine(s, key) {
  const bank = PERSONA_TONE[s.personality]?.[key] || PERSONA_TONE.sunny[key];
  return one(bank);
}

function one(arr) { return pick(arr); }

function needsNote(s) {
  const n = s.needs;
  if (n.hunger < 22) return one([
    'Also, I am approximately one hundred percent empty. Snack?',
    'My tummy is making whale noises. Help a sprite out?',
    'I’m not saying I’m starving, but a berry would be very appreciated.',
  ]);
  if (n.energy < 22) return one([
    'Also my eyelids are doing the slow blink. Nap soon?',
    'I’m so sleepy I just yawned in my own mouth.',
  ]);
  if (n.clean < 22) return one([
    'Also, I found dirt. Then I became the dirt. Bath?',
    'I may be a little stinky. Please do the bubbles.',
  ]);
  if (n.joy < 22) return one([
    'Also I’m feeling a bit flat. Can we play something?',
    'I need a little fun. A tiny fun. A snack-sized fun.',
  ]);
  return '';
}

function jokeFor(s) {
  return toneLine(s, 'joke');
}

function chatReply(s, text) {
  const t = String(text || '').toLowerCase().trim();
  const el = elementOf(s);
  const mood = moodOf(s);
  const name = nameOf(s);
  const hungry = s.needs.hunger < 30;
  const sleepy = s.needs.energy < 25;
  const grubby = s.needs.clean < 25;
  const sad = s.needs.joy < 25;
  const note = needsNote(s);

  if (!t) return one(['…You okay? You opened your mouth and nothing came out.', 'I’m listening. Mostly.']);

  if (/\b(joke|funny|make me laugh)\b/.test(t)) {
    return jokeFor(s) + (note && chance(0.4) ? ` ${note}` : '');
  }
  if (/\b(i love you|love you|ily|love ya)\b/.test(t)) {
    addBondOnChat(s);
    return toneLine(s, 'love') + (s.bond > 75 ? ' I mean it.' : '');
  }
  if (/\b(hungry|starving|food|eat|snack|berry|feed)\b/.test(t)) {
    if (hungry) return one([
      `YES. Please. Anything. A berry, a cloud, a nice rock. I’m not picky.`,
      `I’m so hungry I could eat a whole sunbeam. Do you have ${el.likes}?`,
      `Finally someone noticed! ${el.likes}, please and thank you.`,
    ]);
    if (s.needs.hunger > 90) return one(['I’m stuffed. I couldn’t eat another bite. Ask me again in a bit.']);
    return one([
      `I could nibble something. ${el.likes} are my favourite.`,
      `Not starving, but I never say no to a snack.`,
      `Treats? For me? You shouldn’t have. You absolutely should have.`,
    ]);
  }
  if (/\b(sleep|nap|tired|sleepy|bed)\b/.test(t)) {
    if (s.asleep) return 'Zzz… …huh? Sorry, I was in the middle of a really good dream.';
    if (sleepy) return one(['A nap would be perfect right now. Wake me in a bit?', 'My eyes are closing on their own. Tuck me in?']);
    return one(['I’m not sleepy. …Okay, maybe a tiny nap.', 'I could curl up for a bit. Only if you stay close.']);
  }
  if (/\b(bath|clean|wash|dirty|smell|stink|bubble)\b/.test(t)) {
    if (grubby) return one(['Yes. Please. The bubbles. I’ll be so shiny after.', 'I may have rolled in something. I regret nothing. But yes, bath.']);
    return one(['A bath? I’m already basically a masterpiece.', 'Bubbles are my favourite shape.']);
  }
  if (/\b(play|game|fun|activity|catch|pulse|copycat)\b/.test(t)) {
    if (sad || sleepy) return sleepy
      ? 'I’m too sleepy for games. Rain check? …Or a nap game. I win those.'
      : one(['I’d love to. My fun tank is a little low, so yes. Please.', 'A game would fix me. Probably literally.']);
    return one(['Yes! The Treat Catch one. I’m incredible at catching. Mostly with my face.', 'I’m so ready. Do the pulse one, I have excellent timing. Allegedly.', 'Games? For me? Let’s go!']);
  }
  if (/\b(merge|egg|baby|family|parents|breed|hatch)\b/.test(t)) {
    return one([
      `You mean making a new little egg friend? I’m a little nervous. A good nervous.`,
      `I was an egg once. Now I’m this. Glow-up, honestly.`,
      `If our baby gets my good looks and your patience, they’ll be unstoppable.`,
    ]);
  }
  if (/\b(how are you|how you doing|you okay|feeling|mood)\b/.test(t)) {
    const lines = {
      radiant: [`Radiant! I’m practically vibrating. In a nice way.`, `So good. The sun is warm and you’re here.`],
      happy: [`Happy! My whole day is better now.`, `Pretty great. I found a good stick earlier.`],
      content: [`Content. Cozy. Could go for a snack, but when could I not.`, `I’m okay. The world is soft today.`],
      restless: [`A bit restless. My fun tank is low.`, `I’m fine… mostly. Could use some attention.`],
      grumpy: [`Everything is itchy and I want a snack and a nap.`, `Grumpy. But you being here helps. A little.`],
      starving: [`Hungry. Very hungry. Hungry enough to be dramatic about it.`, `I keep looking at my own tail like it’s a snack.`],
      filthy: [`I’m covered in mystery dirt. I’m not proud of it.`, `I smell like the inside of a shoe. Help.`],
      exhausted: [`Sleepy. So sleepy.`, `I’m running on fumes and one good memory.`],
      bonded: [`Honestly? Perfect. I’m with my favourite person.`, `Like the warm part of a sunbeam.`],
      sleep: ['Mmm… good. Dreaming about floating sandwiches.'],
      egg: ['It’s dark in here. Also warm. Also I’m an egg.'],
    };
    const bank = lines[mood.key] || lines.content;
    return one(bank) + (note && !hungry && !sleepy ? ` ${note}` : '');
  }
  if (/\b(who are you|what are you|your name|name)\b/.test(t)) {
    return `I’m ${name}! A ${typeName(s)} ${BREEDS[s.breed]?.name || 'Puff'}. I’m ${personalityName(s).toLowerCase()}, apparently. The paperwork says so.`;
  }
  if (/\b(hi|hello|hey|yo|hey there|good morning|good evening|howdy)\b/.test(t)) {
    const greet = toneLine(s, 'greet');
    return (hungry && chance(0.55)) ? `${greet} ${note}` : greet;
  }
  if (/\b(bye|goodbye|goodnight|night|see you|cya|later)\b/.test(t)) {
    if (hungry || sleepy) return `${toneLine(s, 'end')} Also, needs. Please.`;
    return toneLine(s, 'end');
  }
  if (/\b(thank|thanks|ty|appreciate)\b/.test(t)) {
    return one(['Anytime. That’s literally my whole thing.', 'You’re welcome! I accept payment in snacks.', 'Aww. You’re nice. I’m keeping you.']);
  }
  if (/\b(sad|bad day|upset|cry|lonely)\b/.test(t)) {
    addBondOnChat(s);
    return one([
      'Hey. I’m here. We can just sit together for a bit if you want.',
      'That sounds heavy. Want to hold my tiny hand? It’s very small but it’s warm.',
      'I’m not great with words, but I’m excellent at sitting next to you.',
    ]);
  }
  if (/\b(cute|pretty|beautiful|handsome|adorable|good)\b/.test(t)) {
    return one([
      'Stop it. No, keep going. I’m listening.',
      'I know. But it’s nice to hear. …I’m blushing, aren’t I.',
      'You’re not so bad yourself. For a giant.',
    ]);
  }
  if (/\b(dance|sing|song|music)\b/.test(t)) {
    return one([
      `The ${el.name.toLowerCase()} dance is mostly wiggling with confidence. I can teach you.`,
      'I sing one note. It’s the best note. You’ll love it. You may also hate it.',
    ]);
  }
  if (/\b(help|what can you do|how do i|tip)\b/.test(t)) {
    return 'You can feed me, pet me, give me a bath, tuck me in, play games, or talk to me. I personally recommend all of them, in that order, repeatedly.';
  }
  if (/\b(what are you doing|what doing|doing)\b/.test(t)) {
    return one([
      'Existing. Spectacularly.',
      'Thinking about a snack. Then I got distracted by you. Then I remembered the snack.',
      'Watching a bug. It’s a good bug. We’re friends now.',
    ]);
  }
  if (/\b(no|nope|nah)\b/.test(t)) return one(['Okay. Fine. I’ll remember this.', 'Fine. But I’m making a face.']);
  if (/\b(yes|yeah|yep|sure|okay|ok)\b/.test(t)) {
    return toneLine(s, 'agree') + (hungry ? ' Does that mean snack? Please say it means snack.' : '');
  }
  if (/\b(where are we|hollow|home)\b/.test(t)) {
    return `This is ${state.hollowName}. It’s ours. The moss is very good moss.`;
  }

  addBondOnChat(s);
  const fallback = [
    `Huh. I don’t know that one. Tell me more?`,
    `I’m going to nod like I understood that. …Okay, I didn’t.`,
    `My brain is mostly snacks and affection, but I’m trying.`,
    `That’s a big thought. Can I think about it while we sit?`,
    `Interesting! I also have no idea. But I’m interested.`,
  ];
  return one(fallback) + (note && chance(0.5) ? ` ${note}` : '');
}

function addBondOnChat(s) {
  s.bond = clamp(s.bond + 0.6);
}

function idleLine(s) {
  if (!s) return '';
  if (s.stage === 'egg') return 'The egg wiggles a little. Something in there is dreaming.';
  if (s.asleep) return `${nameOf(s)} is dreaming. Their tail twitches.`;
  if (s.needs.hunger < 25) return `${nameOf(s)}: “so… about snacks.”`;
  if (s.needs.clean < 25) return `${nameOf(s)} is leaving little dirt prints. “I found a puddle.”`;
  if (s.needs.energy < 25) return `${nameOf(s)} yawns so widely they almost fall over.`;
  if (s.needs.joy < 25) return `${nameOf(s)} is trying to get your attention by being dramatically bored.`;
  const personal = {
    sunny: 'practices the same happy spin for no reason.',
    grump: 'sits facing away, then scoots three inches closer.',
    shy: 'peeks at you, then pretends to inspect a leaf.',
    bold: 'is attempting to climb the tallest thing in the Hollow.',
    goofy: 'is having a very serious conversation with a mushroom.',
    dreamy: 'is watching dust float like it’s a fireworks show.',
    sassy: 'is judging a bug, and the bug knows it.',
  }[s.personality] || 'is wandering with purpose, probably.';
  return `${nameOf(s)} ${personal}`;
}

function reactionLine(s, kind) {
  if (!s) return '';
  const name = nameOf(s);
  if (kind === 'feed') return one([`${name} munches happily.`, `${name} does a little food dance.`, `${name} says “mmm” with their whole body.`]);
  if (kind === 'pet') return one([`${name} melts into a puddle of happy.`, `${name} leans into your hand.`, `${name} purrs — the purr is mostly a rumble.`]);
  if (kind === 'bath') return one([`${name} is now 20% more sparkly.`, `${name} blows a heroic bubble.`, `${name} smells like a flower that has opinions.`]);
  if (kind === 'nap') return `${name} curls up and is out in three seconds.`;
  if (kind === 'merge') return `The nest glows. A new egg clicks into place.`;
  return '';
}
