import { NativeEventEmitter, NativeModules } from "react-native";

export let soundEventEmitter: NativeEventEmitter = new NativeEventEmitter(NativeModules.Sound);

NativeModules.Sound.addOnPreparedListener = (callback: () => void) => {
    soundEventEmitter.addListener(
        NativeModules.Sound.EVENT__SOUND_MODULE__ON_PREPARED,
        () => callback()
    );
};

NativeModules.Sound.addOnCompletionListener = (callback: () => void) => {
    soundEventEmitter.addListener(
        NativeModules.Sound.EVENT__SOUND_MODULE__ON_COMPLETION,
        () => callback()
    );
};

export default NativeModules.Sound;