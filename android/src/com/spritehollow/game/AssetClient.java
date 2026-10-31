package com.spritehollow.game;

import android.content.res.AssetManager;
import android.graphics.Color;
import android.net.Uri;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

class AssetClient extends WebViewClient {

    private static final String BG = "#0B0A16";

    private final MainActivity activity;
    private final String host;
    private final AssetManager assets;

    AssetClient(MainActivity activity, String host, AssetManager assets) {
        this.activity = activity;
        this.host = host;
        this.assets = assets;
    }

    @Override
    public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
        Uri uri = request.getUrl();
        if (uri == null || !host.equals(uri.getHost())) {
            return null;
        }
        String path = uri.getPath();
        if (path == null || path.isEmpty() || "/".equals(path)) {
            path = "/index.html";
        }
        if (path.startsWith("/")) {
            path = path.substring(1);
        }
        try {
            InputStream stream = assets.open("www/" + path);
            WebResourceResponse response = new WebResourceResponse(mimeFor(path), "utf-8", stream);
            response.setStatusCodeAndReasonPhrase(200, "OK");
            return response;
        } catch (IOException missing) {
            WebResourceResponse response = new WebResourceResponse(
                "text/plain",
                "utf-8",
                new ByteArrayInputStream("Not found".getBytes(StandardCharsets.UTF_8))
            );
            response.setStatusCodeAndReasonPhrase(404, "Not Found");
            return response;
        }
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
        Uri uri = request.getUrl();
        if (uri != null && "spritehollow".equals(uri.getScheme()) && "exit".equals(uri.getHost())) {
            activity.finish();
            return true;
        }
        return uri == null || !host.equals(uri.getHost());
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        super.onPageFinished(view, url);
        view.setBackgroundColor(Color.parseColor(BG));
    }

    private static String mimeFor(String path) {
        if (path.endsWith(".js")) return "text/javascript";
        if (path.endsWith(".css")) return "text/css";
        if (path.endsWith(".html") || path.endsWith(".htm")) return "text/html";
        if (path.endsWith(".svg")) return "image/svg+xml";
        if (path.endsWith(".webmanifest") || path.endsWith(".json")) return "application/manifest+json";
        if (path.endsWith(".png")) return "image/png";
        if (path.endsWith(".webp")) return "image/webp";
        if (path.endsWith(".woff2")) return "font/woff2";
        if (path.endsWith(".woff")) return "font/woff";
        if (path.endsWith(".ttf")) return "font/ttf";
        return "application/octet-stream";
    }
}
