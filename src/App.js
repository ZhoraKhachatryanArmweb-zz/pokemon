import React, { Component } from 'react';
import './App.css';
import PokemonsContainer from './containers/PokemonsContainer/PokemonsContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PokemonsContainer />
      </div>
    );
  }
}

export default App;
