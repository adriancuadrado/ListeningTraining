import React, { Component } from 'react';
import {
  Button,
  Text
} from 'react-native';

import Sound from './modules/Sound';

class App extends Component {

  state: any;

  constructor(props : any) {
    super(props);
    this.state = {word:''};
    Sound.setUrl('https://www.wordreference.com/audio/en/us/us/en042667.mp3');
  }

  loadRandomWord(){
    fetch(
      "http://watchout4snakes.com/wo4snakes/Random/RandomWord",
      {
        "method":"POST",
        "mode":"cors"
      }
    )
    .then((resp)=>resp.text())
    .then((text) => {
      this.setState({
        word : text
      });
    });
  }
  
  render() {
    return (
      <>
        <Button title='Prueba' onPress={()=>{
          Sound.play();
          this.loadRandomWord();
        }}/>
        <Text>{this.state.word}</Text>
      </>
    );
  };
}

export default App;
