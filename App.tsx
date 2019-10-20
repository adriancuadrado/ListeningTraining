import {
  StyleSheet,
  Button
} from 'react-native';

import Sound from './modules/Sound';

Sound.setUrl('https://www.wordreference.com/audio/en/us/us/en042667.mp3');

const App = () => {
  const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;
  return (
    <Button title='Prueba' onPress={()=>{
      Sound.play()
    }}/>
  );
};

const styles = StyleSheet.create({

});

export default App;
