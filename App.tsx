import React from 'react';
import {
  StyleSheet,
  Button
} from 'react-native';

import Sound from './modules/Sound';

Sound.setUrl('https://www.wordreference.com/audio/en/us/us/en042667.mp3');

const App = () => {
  return (
    <Button title='Prueba' onPress={()=>{
      Sound.play()
    }}/>
  );
};

const styles = StyleSheet.create({

});

export default App;
