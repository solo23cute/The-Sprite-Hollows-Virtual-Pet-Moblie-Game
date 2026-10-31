package com.spritehollow.game;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.speech.tts.TextToSpeech;
import android.webkit.JavascriptInterface;

import java.util.Locale;

/** Offline voice lines through the device's text-to-speech engine. */
class VoiceBridge implements TextToSpeech.OnInitListener {

    private final TextToSpeech tts;
    private final Handler main = new Handler(Looper.getMainLooper());
    private volatile boolean ready = false;
    private volatile String pending = null;
    private volatile String voiceType = "female";

    VoiceBridge(Context context) {
        tts = new TextToSpeech(context.getApplicationContext(), this);
    }

    @Override
    public void onInit(int status) {
        if (status != TextToSpeech.SUCCESS) return;
        int language = tts.setLanguage(Locale.US);
        if (language == TextToSpeech.LANG_MISSING_DATA || language == TextToSpeech.LANG_NOT_SUPPORTED) return;
        applyTuning();
        ready = true;
        String queued = pending;
        pending = null;
        if (queued != null) speakNow(queued);
    }

    @JavascriptInterface
    public void setType(String type) {
        if ("male".equals(type)) voiceType = "male";
        else if ("female".equals(type)) voiceType = "female";
    }

    private void applyTuning() {
        boolean male = "male".equals(voiceType);
        tts.setPitch(male ? 0.8f : 1.1f);
        tts.setSpeechRate(male ? 0.96f : 1.0f);
    }

    @JavascriptInterface
    public void speak(String text) {
        if (text == null) return;
        String clean = text.trim();
        if (clean.isEmpty()) return;
        if (!ready) {
            pending = clean;
            return;
        }
        speakNow(clean);
    }

    private void speakNow(final String text) {
        main.post(() -> {
            try {
                applyTuning();
                tts.speak(text, TextToSpeech.QUEUE_FLUSH, null, "spritehollow");
            } catch (Exception ignored) {
                // A missing or busy TTS engine should never break the game.
            }
        });
    }

    @JavascriptInterface
    public void stop() {
        main.post(() -> {
            try {
                tts.stop();
            } catch (Exception ignored) {
                // Nothing to stop.
            }
        });
    }

    @JavascriptInterface
    public boolean isAvailable() {
        return ready;
    }

    void shutdown() {
        main.post(() -> {
            try {
                tts.stop();
                tts.shutdown();
            } catch (Exception ignored) {
                // Engine already gone.
            }
        });
    }
}
