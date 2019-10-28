import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default abstract class Popup extends Component {

  abstract getPopupContents() : any;

  render(){
    return (
      <>
        <View style={style.shadow}/>
        <View style={style.popup}>
          {this.getPopupContents()}
        </View>
      </>
    );
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