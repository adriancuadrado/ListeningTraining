import { NativeEventEmitter, NativeModules } from "react-native";

const eventEmitter = new NativeEventEmitter(NativeModules.Sound);

NativeModules.Sound.setOnPreparedListener = (callback: () => void) => {
    eventEmitter.addListener(
        NativeModules.SoundEVENT__SOUND_MODULE__ON_PREPARED,
        () => callback()
    );
};

export default NativeModules.Sound;