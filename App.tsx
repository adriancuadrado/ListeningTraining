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
      isNetworkError: false,
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

  loadRandomWord(){this.setState({isWordLoaded: true,});
  //   this.setState({
  //     isWordLoaded: false,
  //   });
  //   let promise : Promise<Response> = fetch(
  //     'http://watchout4snakes.com/wo4snakes/Random/RandomWord',
  //     {
  //       'method':'POST',
  //       'mode':'cors'
  //     }
  //   );
  //   promise
  //   .then((resp)=>resp.text())
  //   .then((word)=>{
  //     this.setState({word});
  //     let promise : Promise<Response> = fetch(`https://www.wordreference.com/es/translation.asp?tranword=${word}`);
  //     promise
  //     .then((resp)=>resp.text())
  //     .then(html=>{
  //       let audio = /<audio id='aud0' preload='none'><source src='(.*?)' type='audio\/mpeg'><\/audio>/.exec(html);
  //       if(audio) {
  //         Sound.setUrl(`https://www.wordreference.com${audio[1]}`);
  //         this.setState({isNetworkError: false});
  //       } else {
  //         //No siempre tiene wordreference audio para todas las palabras.
  //         //Cuando se da el caso cargamos otra palabra al azar.
  //         this.loadRandomWord();
  //       }
  //     });
  //     promise.catch((ex) => {
  //       this.setState({isNetworkError: true});
  //     });
  //   });
  //   promise.catch((ex)=>{
  //       this.setState({isNetworkError: true});
  //   });
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
        {/* Esta es la palabra que hay que adivinar */}
          <View style={[style.layout, {flexGrow: 1}]}>
            <Text style={style.word}>{this.state.isVisible && this.state.word}</Text>
          </View>

        {/* Boton MOSTRAR */}
          <TouchableOpacity
            disabled={!this.state.isWordLoaded}
            style={[style.layout, style.button, (this.state.isWordLoaded ? null : style.disabled)]}
            onPress={()=>{
            // this.toggleWordVisibility();




















            fetch(
              'http://watchout4snakes.com/wo4snakes/Random/RandomWord',
              {
                'method':'POST',
                'mode':'cors'
              }
            )
            .then((resp)=>resp.text())
            
            .catch(()=>{console.warn(":-(");});


























          }}>
            <Text style={style.text}>{this.state.isVisible ? 'OCULTAR' : 'MOSTRAR'}</Text>
          </TouchableOpacity>

        {/* Boton ESCUCHAR */}
          <TouchableOpacity
            disabled={!this.state.isWordLoaded}
            style={[style.layout, style.button, (this.state.isWordLoaded ? null : style.disabled)]}
            onPress={()=>{
              this.playSound();
            }}>
            <Text style={style.text}>ESCUCHAR</Text>
          </TouchableOpacity>

        {/* Boton CAMBIAR */}
          <TouchableOpacity
            disabled={!this.state.isWordLoaded}
            style={[style.layout, style.button, (this.state.isWordLoaded ? null : style.disabled)]}
            onPress={()=>{
              this.loadRandomWord();
              this.setState({isVisible: false});
            }}>
            <Text style={style.text}>CAMBIAR</Text>
          </TouchableOpacity>

        {/* POPUPS */}
          {/* ERROR DE CONEXION */}
            {this.state.isNetworkError && (<>
              <View style={style.popup_shadow}/>
              <View style={[style.popup, style.error_popup]}>
                <Text style={style.text}>
                  Error de conexion{'\n\n'}
                  Por favor compruebe su conexion a internet{'\n'}
                </Text>
                <TouchableOpacity
                  style={style.error_popup_button}
                  onPress={()=>{this.loadRandomWord()}}>
                  <Text style={[style.text, style.error_popup_button_text]}>
                    Reintentar
                  </Text>
                </TouchableOpacity>
              </View>
            </>)}
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
  },

  popup: {
    position: 'absolute',
    padding: 20,
  },

  popup_shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#00000088',
  },

  error_popup: {
    backgroundColor: 'red',
  },

  error_popup_button: {
    color: 'white',
    backgroundColor: 'gray',
    padding: 15,
  },

  error_popup_button_text: {
    textAlign: 'center',
  },
});

export default App;
