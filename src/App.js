import React, { Component } from 'react';
import Header from './components/Header/Headers'
import Footer from './components/Footer/Footer'
import PokemonsContainer from './containers/PokemonsContainer/PokemonsContainer'
import './assets/styles/style.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <PokemonsContainer />
        <Footer />
      </div>
    );
  }
}

export default App;
