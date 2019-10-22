package com.listeningtraining.sound;

import android.media.AudioManager;
import android.media.MediaPlayer;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;

public class SoundModule extends ReactContextBaseJavaModule {

    private MediaPlayer mediaPlayer;
    private Callback onPreparedListener;

    public SoundModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.onPreparedListener = p -> {};
    }

    @NonNull
    @Override
    public String getName() {
        return "Sound";
    }

    @ReactMethod
    public void setUrl(String url){
        try {
            this.mediaPlayer = new MediaPlayer();
            mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
            mediaPlayer.setDataSource(url);
            mediaPlayer.setOnPreparedListener(mp -> {
                SoundModule.this.onPreparedListener.invoke();
            });
            mediaPlayer.prepare();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @ReactMethod
    public void setOnPreparedListener(Callback onPreparedListener) {
        this.onPreparedListener = onPreparedListener;
    }

    @ReactMethod
    public void play() {
        mediaPlayer.start();
    }

}
