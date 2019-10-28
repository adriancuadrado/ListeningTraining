import React, { Component } from 'react';
import { NativeEventEmitter, NativeModules } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import Sound from './native_modules/Sound';

import ErrorPopup from './ErrorPopup';

class App extends Component {

  state: any;

  constructor(props : any) {
    super(props);
    // // // // // // // // // // // // // // let size = Dimensions.get('screen');
    this.state = {
      word:'',
      isVisible: false,
      isWordLoaded: false,
      isReproducingAudio: false,
      errorMessage: '',
      // // // // // // // // // // // // // // isVertical: size.height > size.width
    };
    // // // // // // // // // // // // // Dimensions.addEventListener('change', ()=>{
    // // // // // // // // // // // // //   let size = Dimensions.get('screen');
    // // // // // // // // // // // // //   this.setState({
    // // // // // // // // // // // // //     isVertical: size.height > size.width
    // // // // // // // // // // // // //   });
    // // // // // // // // // // // // // });
    Sound.addOnPreparedListener(()=>{
      this.setState({
        isWordLoaded: true,
      });
    });
    Sound.addOnCompletionListener(()=>{
      this.setState({
        isReproducingAudio: false,
      });
    });
  }

  componentDidMount(){
    this.loadRandomWord();
  }

  loadRandomWord(){
    this.setState({
      isWordLoaded: false,
    });
    let promise : Promise<Response> = fetch(
      'http://watchout4snakes.com/wo4snakes/Random/RandomWord',
      {
        'method':'POST',
        'mode':'cors'
      }
    );
    promise
    .then((resp)=>resp.text())
    .then((word)=>{
      this.setState({word});
      let promise : Promise<Response> = fetch(`https://www.wordreference.com/es/translation.asp?tranword=${word}`);
      promise
      .then((resp)=>resp.text())
      .then(html=>{
        let audio = /<audio id='aud0' preload='none'><source src='(.*?)' type='audio\/mpeg'><\/audio>/.exec(html);
        if(audio) {
          Sound.setUrl(`https://www.wordreference.com${audio[1]}`);
          this.setState({errorMessage: ''});
        } else {
          //No siempre tiene wordreference audio para todas las palabras.
          //Cuando se da el caso cargamos otra palabra al azar.
          this.loadRandomWord();
        }
      });
      promise.catch((ex) => {
        //FIXME el error ya esta hardcodeado en ErrorPopup.tsx
        this.setState({errorMessage: 'X'});
      });
    });
    promise.catch((ex)=>{
        //FIXME el error ya esta hardcodeado en ErrorPopup.tsx
        this.setState({errorMessage: 'X'});
    });
  }

  toggleWordVisibility(){
    this.setState((state:any)=>{
      return {
        isVisible: !state.isVisible
      }
    });
  }

  playSound(){
    this.setState({isReproducingAudio: true});
    Sound.play();
  }
  
  render() {
    return (
      <>
        <View style={[style.layout, {flexGrow: 1}]}>
          <Text style={style.word}>{this.state.isVisible && this.state.word}</Text>
        </View>
        <TouchableOpacity disabled={!this.state.isWordLoaded} style={[style.layout, style.button, (this.state.isWordLoaded ? null : style.disabled)]} onPress={()=>{
          this.toggleWordVisibility();
        }}>
          <Text style={style.text}>{this.state.isVisible ? 'OCULTAR' : 'MOSTRAR'}</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={!this.state.isWordLoaded} style={[style.layout, style.button, (this.state.isWordLoaded ? null : style.disabled)]} onPress={()=>{
          this.playSound();
        }}>
          <Text style={style.text}>ESCUCHAR</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={!this.state.isWordLoaded} style={[style.layout, style.button, (this.state.isWordLoaded ? null : style.disabled)]} onPress={()=>{
          this.loadRandomWord();
          this.setState({isVisible: false});
        }}>
          <Text style={style.text}>CAMBIAR</Text>
        </TouchableOpacity>
        {/* FIXME: onPressReintentar no deberia de existir, deberia de usar el metodo desde aqui en vez de pasarlo */}
        { this.state.errorMessage != '' && (<ErrorPopup message={this.state.errorMessage} onPressReintentar={()=>{this.loadRandomWord()}}/>) }
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
    backgroundColor: '#3e76dd'
  },

  disabled: {
    backgroundColor: '#3e76dd88'
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
