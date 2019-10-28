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

  getPopupContents(): any {
    return (
      <>
        <Text style={style.text}>
          Error de conexion{'\n\n'}
          Por favor compruebe su conexion a internet{'\n'}
        </Text>
        <TouchableOpacity style={style.button} onPress={()=>{}}>
          <Text style={[style.text, style.textButton]}>Reintentar</Text>
        </TouchableOpacity>
      </>
    );
  }

  getPopupStyle() {
    return {
      backgroundColor: 'red',
    }
  }

  constructor(
    public props: Readonly<{
      message: string,
      visible: boolean
    }>
  ){
    super(props);
  }
}

const style = StyleSheet.create({
  popup: {
    position: 'absolute',
    padding: 20,
    backgroundColor: 'red',
  },

  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#00000088',
  },

  text: {
    color: 'white',
    fontSize: 25,
  },

  button: {
    color: 'white',
    backgroundColor: 'gray',
    padding: 15,
  },

  textButton: {
    textAlign: "center",
  }
});