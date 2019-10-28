import React from 'react';
import Popup from './Popup';
import {
  View,
  Text,
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
            Por favor compruebe su conexion a internet
          </Text>
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
  }
});