package com.listeningtraining.sound;

import android.media.AudioManager;
import android.media.MediaPlayer;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class SoundModule extends ReactContextBaseJavaModule {

    public static final String EVENT__SOUND_MODULE__ON_PREPARED = "EVENT__SOUND_MODULE__ON_PREPARED";
    public static final String EVENT__SOUND_MODULE__ON_COMPLETION = "EVENT__SOUND_MODULE__ON_COMPLETION";

    private ReactApplicationContext reactContext;

    private MediaPlayer mediaPlayer;

    public SoundModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        mediaPlayer = new MediaPlayer();
        mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
        mediaPlayer.setOnPreparedListener(mp -> {
            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(EVENT__SOUND_MODULE__ON_PREPARED, null);
        });
        mediaPlayer.setOnCompletionListener(mp -> {
            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(EVENT__SOUND_MODULE__ON_COMPLETION, null);
        });
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();
        constants.put(EVENT__SOUND_MODULE__ON_PREPARED, EVENT__SOUND_MODULE__ON_PREPARED);
        constants.put(EVENT__SOUND_MODULE__ON_COMPLETION, EVENT__SOUND_MODULE__ON_COMPLETION);
        return constants;
    }

    @NonNull
    @Override
    public String getName() {
        return "Sound";
    }

    @ReactMethod
    public void setUrl(String url){
        try {
            mediaPlayer.reset();
            mediaPlayer.setDataSource(url);
            mediaPlayer.prepare();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void play() {
        mediaPlayer.seekTo(0);
        mediaPlayer.start();
    }
}
