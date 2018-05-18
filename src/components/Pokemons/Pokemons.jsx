import React, { Component } from 'react';
import * as _ from 'lodash';

class Pokemons extends Component {
  constructor() {
    super();
    this.state = {
        pokemonImg: '',
        prevButton: true,
        nextButton: false
    };
  }

  handleCheck = (e) => {
    let body = e.target.getAttribute('name');
    this.props.pokemonId(body)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({pokemonImg: nextProps.pokemonUnit.sprites && nextProps.pokemonUnit.sprites.front_default})
    nextProps.fetchNext ? this.setState({prevButton: false}) : null
    nextProps.prev === null ? this.setState({prevButton: true}) : null
    nextProps.next === null ? this.setState({nextButton: true}) : null
  }

  nextPokemons = () => {
    this.props.nextPokemons(this.props.next)
  }

  prevPokemons = () => {
    this.props.prevPokemons(this.props.prev)
  }


  render() {
    console.log('COMPONENT',this.props)
    let pokemons = _.map(this.props.pokemons, (value, index) => {
        let pokemonName = value.name;
        return (
            <li key={index} onClick={this.handleCheck} name={pokemonName}>
                {pokemonName}
            </li>
        )
      });
    return (
      <div>
        <ul>
            {pokemons}
        </ul>
        <div>
            {this.props.pokemonUnit.name}
            <img src={this.state.pokemonImg}/>
            <button onClick={this.prevPokemons} disabled={this.state.prevButton}>Previous</button>
            <button onClick={this.nextPokemons} disabled={this.state.nextButton}>Next</button>
        </div>
      </div>
    );
  }
}

export default Pokemons;
