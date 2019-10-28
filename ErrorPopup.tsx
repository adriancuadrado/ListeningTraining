import React from 'react';
import Popup from './Popup';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class ErrorPopup extends Popup {

  constructor(
    public props: Readonly<{
      message: string,
      visible: boolean
    }>
  ){
    super(props);
  }

  render(){
    return (
      <>
        <View style={style.view}>
          <Text style={style.text}>
            Error de conexion{'\n\n'}
            Por favor compruebe su conexion a internet{'\n'}
          </Text>
          <TouchableOpacity style={style.button} onPress={()=>{}}>
            <Text style={[style.text, style.textButton]}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const style = StyleSheet.create({
  view: {
    position: 'absolute',
    padding: 20,
    backgroundColor: 'red',
  },

  text: {
    color: 'white',
    fontSize: 25,
  },

  button: {
    color: 'white',
    backgroundColor: 'gray',
    justifyContent: 'center',
    padding: 15,
  },

  textButton: {
  }
});