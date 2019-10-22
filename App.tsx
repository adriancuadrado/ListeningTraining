import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  // Dimensions
} from 'react-native';

import Sound from './native_modules/Sound';

class App extends Component {

  state: any;

  constructor(props : any) {
    super(props);
    // // // // // // // // // // // // // // // // // // let size = Dimensions.get('screen');
    this.state = {
      word:'',
      isVisible: false,
      isWordLoaded: false,
      // // // // // // // // // // // // // // // // // // isVertical: size.height > size.width
    };
    // // // // // // // // // // // // // // // // // Dimensions.addEventListener('change', ()=>{
    // // // // // // // // // // // // // // // // //   let size = Dimensions.get('screen');
    // // // // // // // // // // // // // // // // //   this.setState({
    // // // // // // // // // // // // // // // // //     isVertical: size.height > size.width
    // // // // // // // // // // // // // // // // //   });
    // // // // // // // // // // // // // // // // // });
    Sound.setOnPreparedListener(()=>{
      this.setState({
        isWordLoaded: true,
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
          // // // // // // // // // // // // // // // // //No siempre tiene wordreference audio para todas las palabras.
          // // // // // // // // // // // // // // // // //Cuando se da el extraordinario caso de que sea asi, simplemente cargamos otra palabra al azar
          this.loadRandomWord();
        }
      });
    });
  }

  toggleWordVisibility(){
    this.setState((state:any)=>{
      return {
        isVisible: !state.isVisible
      }
    });
  }
  
  render() {
    return (
      <>
        <View style={[style.layout, {flexGrow: 1}]}>
          <Text style={style.word}>{this.state.isVisible && this.state.word}</Text>
        </View>
        <TouchableOpacity style={[style.layout, style.button, (this.state.isWordLoaded ? null : style.disabled)]} onPress={()=>{
          this.toggleWordVisibility();
        }}>
          <Text style={style.text}>{this.state.isVisible ? 'OCULTAR' : 'MOSTRAR'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.layout, style.button, (this.state.isWordLoaded ? null : style.disabled)]} onPress={()=>{
          Sound.play();
        }}>
          <Text style={style.text}>ESCUCHAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[style.layout, style.button, (this.state.isWordLoaded ? null : style.disabled)]} onPress={()=>{
          this.loadRandomWord();
          this.setState({isVisible: false});
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
