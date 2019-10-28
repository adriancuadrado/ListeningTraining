import React from 'react';
import Popup from './Popup';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class ErrorPopup extends Popup {

  constructor(public props: Readonly<{}>){
    super(props);
  }

  render(){
    return <></>;
  }
}