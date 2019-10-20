import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import Sound from './modules/Sound';

class App extends Component {

  state: any;

  constructor(props : any) {
    super(props);
    this.state = {
      word:'',
      isVisible: false
    };
    this.loadRandomWord();
  }

  toggleWordVisibility(){
    this.setState((state:any)=>{
      return {
        isVisible: !state.isVisible
      }
    });
  }

  loadRandomWord(){
    this.toggleWordVisibility();
    fetch(
      'http://watchout4snakes.com/wo4snakes/Random/RandomWord',
      {
        'method':'POST',
        'mode':'cors'
      }
    )
    .then((resp)=>resp.text())
    .then((word)=>{
      this.setState({word});
      fetch(`https://www.wordreference.com/es/translation.asp?tranword=${word}`)
      .then((resp)=>resp.text())
      .then(html=>{
        let audio = /<audio id='aud0' preload='none'><source src='(.*?)' type='audio\/mpeg'><\/audio>/.exec(html);
        if(audio) {
          Sound.setUrl(`https://www.wordreference.com${audio[1]}`);
        } else {
          throw 'No se ha podido recuperar el nombre del archivo de audio';
        }
      });
    });
  }
  
  render() {
    return (
      <>
        <View style={style.layout}>
          <Text style={style.word}>{this.state.isVisible && this.state.word}</Text>
        </View>
        <TouchableOpacity style={[style.layout, style.button]} onPress={()=>{this.toggleWordVisibility()}}>
          <Text style={style.text}>{this.state.isVisible ? 'OCULTAR' : 'MOSTRAR'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.layout, style.button]} onPress={()=>{
          Sound.play();
        }}>
          <Text style={style.text}>ESCUCHAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.layout, style.button]} onPress={()=>{
          this.loadRandomWord();
        }}>
          <Text style={style.text}>CAMBIAR</Text>
        </TouchableOpacity>
      </>
    );
  };
}

const style = StyleSheet.create({
  layout: {
    height: 0,
    flexGrow: 1,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10
  },

  button: {
    color: 'white',
    backgroundColor: '#3e76dd',
  },

  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },

  word: {
    color: 'black',
    fontSize: 50,
  }
});

export default App;
