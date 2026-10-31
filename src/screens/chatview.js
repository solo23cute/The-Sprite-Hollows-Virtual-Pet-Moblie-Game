/* Full-screen chat with a sprite. */

const CHAT_SESSIONS = new Map();
let activeChatClose = null;

function chatGreeting(s) {
  const name = displayName(s);
  const hour = new Date().getHours();
  const timeGreet = hour < 5 ? 'You’re up late.' : hour < 12 ? 'Morning!' : hour < 18 ? 'Hi!' : 'Evening!';
  const mood = moodOf(s);
  const intros = {
    sunny: 'I was hoping you’d stop by!',
    grump: 'I was napping. But fine, this is better.',
    shy: 'Oh — hi. I saved you a spot.',
    bold: 'Good timing. I was about to do something reckless.',
    goofy: 'I have been waiting for you for… how long is a while?',
    dreamy: 'I was watching the light. It’s nice when you’re in it.',
    sassy: 'There you are. I was starting to judge the wall.',
  };
  let extra = '';
  if (s.needs.hunger < 30) extra = ' Also, tiny confession: I’m starving.';
  else if (s.needs.joy < 30) extra = ' Also, I could really use some fun.';
  else if (s.needs.clean < 30) extra = ' Also, don’t look too closely at me.';
  return `${timeGreet} I’m ${name}, your ${typeName(s)}. ${intros[s.personality] || intros.sunny}${extra}`;
}

function openChatView(spriteId) {
  const sprite = findSprite(spriteId);
  if (!sprite) return;
  if (sprite.stage === 'egg') {
    toast('The egg isn’t talking yet. Warm it up!', '🥚');
    return;
  }
  if (activeChatClose) activeChatClose();
  closeAllOverlays();

  const app = document.getElementById('app');
  const overlay = document.createElement('div');
  overlay.className = 'chat-overlay';
  overlay.innerHTML = `
    <div class="chat-head">
      <button class="icon-btn" data-chat-close aria-label="Close chat">${icon('arrow')}</button>
      <div class="avatar">${spriteSVG(sprite, { expr: 'happy' })}</div>
      <div style="min-width:0;flex:1">
        <h3>${esc(displayName(sprite))}</h3>
        <div class="status"><span class="dot" style="width:6px;height:6px;border-radius:50%;background:var(--good)"></span>${bondTier(sprite)} · ${moodOf(sprite).icon} ${moodOf(sprite).label}</div>
      </div>
      <button class="icon-btn" data-chat-detail aria-label="Sprite details">${icon('chevron')}</button>
    </div>
    <div class="chat-body" data-chat-body></div>
    <div class="chat-quick" data-quick></div>
    <form class="chat-input-row" data-chat-form>
      <input data-chat-input maxlength="140" placeholder="Say something to ${esc(displayName(sprite))}…" autocomplete="off" enterkeyhint="send">
      <button class="chat-send" type="submit" aria-label="Send">${icon('send')}</button>
    </form>`;
  app.appendChild(overlay);

  const body = overlay.querySelector('[data-chat-body]');
  const input = overlay.querySelector('[data-chat-input]');
  const quickWrap = overlay.querySelector('[data-quick]');
  const timers = [];
  let closing = false;
  let typing = false;

  const session = CHAT_SESSIONS.get(sprite.id) || [];
  CHAT_SESSIONS.set(sprite.id, session);

  function scrollToBottom() {
    requestAnimationFrame(() => { body.scrollTop = body.scrollHeight; });
  }

  function addBubble(who, text, { typingBubble = false } = {}) {
    const div = document.createElement('div');
    div.className = `bubble${who === 'me' ? ' me' : ''}${typingBubble ? ' typing' : ''}`;
    if (typingBubble) {
      div.innerHTML = '<i></i><i></i><i></i>';
    } else {
      const whoLabel = who === 'me' ? '' : `<div class="who">${esc(displayName(sprite))}</div>`;
      div.innerHTML = `${whoLabel}${esc(text)}`;
    }
    body.appendChild(div);
    scrollToBottom();
    if (!typingBubble) {
      session.push({ who, text });
      if (session.length > 60) session.shift();
    }
    return div;
  }

  function setTyping(on) {
    typing = on;
    quickWrap.querySelectorAll('button').forEach((b) => { b.disabled = on; });
  }

  function deliverSoon(text, delay = 650) {
    const bubble = addBubble('sprite', '', { typingBubble: true });
    setTyping(true);
    const id = setTimeout(() => {
      bubble.remove();
      addBubble('sprite', text);
      setTyping(false);
      Sfx.pop();
    }, delay);
    timers.push(id);
  }

  function send(text) {
    const clean = String(text || '').trim();
    if (!clean || typing) return;
    addBubble('me', clean);
    input.value = '';
    input.blur();
    const result = Actions.chat(sprite.id, clean);
    const reply = chatReply(sprite, clean);
    const typingBubble = addBubble('sprite', '', { typingBubble: true });
    setTyping(true);
    const id = setTimeout(() => {
      typingBubble.remove();
      addBubble('sprite', reply);
      setTyping(false);
      Sfx.pop();
      if (result.coins) coinFly(overlay.querySelector('[data-chat-close]'), result.coins);
    }, 520 + Math.min(900, clean.length * 18));
    timers.push(id);
  }

  // restore history or greet
  if (session.length === 0) {
    const greet = addBubble('sprite', '', { typingBubble: true });
    setTyping(true);
    const id = setTimeout(() => {
      greet.remove();
      addBubble('sprite', chatGreeting(sprite));
      setTyping(false);
      Sfx.pop();
    }, 600);
    timers.push(id);
  } else {
    session.forEach((m) => {
      const div = document.createElement('div');
      div.className = `bubble${m.who === 'me' ? ' me' : ''}`;
      div.innerHTML = `${m.who === 'me' ? '' : `<div class="who">${esc(displayName(sprite))}</div>`}${esc(m.text)}`;
      body.appendChild(div);
    });
    scrollToBottom();
  }

  quickWrap.innerHTML = CHAT_QUICK.map((q) => `<button class="chip" data-quick-text="${esc(q)}">${esc(q)}</button>`).join('');
  quickWrap.querySelectorAll('[data-quick-text]').forEach((b) => {
    b.addEventListener('click', () => send(b.dataset.quickText));
  });

  overlay.querySelector('[data-chat-form]').addEventListener('submit', (e) => {
    e.preventDefault();
    send(input.value);
  });
  overlay.querySelector('[data-chat-detail]').addEventListener('click', () => {
    closeChat();
    openSpriteDetail(sprite.id);
  });

  function closeChat() {
    if (closing) return;
    closing = true;
    timers.forEach(clearTimeout);
    overlay.remove();
    document.removeEventListener('keydown', onKey);
    activeChatClose = null;
  }

  function onKey(e) {
    if (e.key === 'Escape') closeChat();
  }
  document.addEventListener('keydown', onKey);
  overlay.querySelector('[data-chat-close]').addEventListener('click', closeChat);

  activeChatClose = closeChat;
  setTimeout(() => {
    if (!document.body.classList.contains('reduce-motion')) {
      // focus for desktop, but avoid popping the keyboard open on phones immediately
      if (window.matchMedia('(min-width: 700px)').matches) input.focus();
    }
    scrollToBottom();
  }, 120);
}

function closeChat() {
  if (activeChatClose) activeChatClose();
}
