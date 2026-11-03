/* Where the coin server lives.
   The web build leaves this empty and talks to its own origin ('/api').
   The packaged Android build is served from appassets.androidplatform.net,
   which has no server, so android/build.sh writes an absolute URL here when
   API_BASE is set. See src/pet-earn.js. */
window.SPRITE_HOLLOW_API = '';
