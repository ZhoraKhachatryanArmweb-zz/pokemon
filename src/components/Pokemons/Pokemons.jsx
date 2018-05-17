import React, { Component } from 'react';
import * as _ from 'lodash';

class Pokemons extends Component {
  constructor() {
    super();
    this.state = {
        pokemonImg: ''
    };
  }

  handleCheck = (e) => {
    let body = e.target.getAttribute('name');
    this.props.pokemonId(body)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({pokemonImg: nextProps.pokemonUnit.sprites && nextProps.pokemonUnit.sprites.front_default})
  }

  nextPokemons = () => {
    !this.props.fetchNext ? this.props.nextPokemons(this.props.next) : this.props.nextPokemons(this.props.nextOrder)
  }

  prevPokemons = () => {
    this.props.prevPokemons(this.props.prev)
  }


  render() {
    console.log('COMPONENT',this.props.prev)
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
            <p onClick={this.prevPokemons}>Previous</p>
            <p onClick={this.nextPokemons}>Next</p>
        </div>
      </div>
    );
  }
}

export default Pokemons;
