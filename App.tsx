import React from 'react';
import {
  StyleSheet,
  Button,
} from 'react-native';

const App = () => {
  const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;
  return (
    <Button title='Prueba' onPress={()=>{}}/>
  );
};

const styles = StyleSheet.create({

});

export default App;
