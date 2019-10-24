import { NativeEventEmitter, NativeModules } from "react-native";

NativeModules.Sound.setOnPreparedListener = (callback: () => void) => {
    new NativeEventEmitter(NativeModules.Sound).addListener(
        NativeModules.Sound.EVENT__SOUND_MODULE__ON_PREPARED,
        () => callback()
    );
};

export default NativeModules.Sound;