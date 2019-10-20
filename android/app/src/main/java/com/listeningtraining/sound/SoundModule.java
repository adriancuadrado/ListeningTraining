package com.listeningtraining.sound;

import android.media.AudioManager;
import android.media.MediaPlayer;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.IOException;

public class SoundModule extends ReactContextBaseJavaModule {

    private MediaPlayer mediaPlayer;

    public SoundModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.mediaPlayer = new MediaPlayer();
        mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
    }

    @NonNull
    @Override
    public String getName() {
        return "Sound";
    }

    @ReactMethod
    public void setUrl(String url){
        try {
            mediaPlayer.setDataSource(url);
            mediaPlayer.prepare();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void play() {
        mediaPlayer.start();
    }

}
