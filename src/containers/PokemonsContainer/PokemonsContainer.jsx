import React, { Component } from 'react';
import { connect } from 'react-redux';
import getPokemons, { pokemonId, nextPokemons, prevPokemons }  from '../../actions/getPokemonsAction';
import Pokemons from '../../components/Pokemons/Pokemons'

class PokemonsContainer extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

componentWillMount() {
    this.props.getPokemons()
}

  render() {
    return (
      <Pokemons 
        pokemons={this.props.pokemons}
        pokemonId={this.props.pokemonId}
        pokemonUnit={this.props.pokemonUnit}
        nextPokemons={this.props.nextPokemons}
        prevPokemons={this.props.prevPokemons}
        next={this.props.next}
        prev={this.props.prev}
        nextOrder={this.props.nextOrder}
        fetchNext={this.props.fetchNext}
      />
    );
  }
}

const mapStateToProps = (store) => {
  console.log('STORE',store.pokemons.allPokemons.previous)
  // console.log('STORE',store.pokemons.fetch)
    return {
      pokemons: store.pokemons.allPokemons.results,
      pokemonUnit: store.pokemons.pokemonUnit,
      next: store.pokemons.allPokemons.next,
      prev: store.pokemons.allPokemons.previous,
      nextOrder: store.pokemons.nextOrder,
      fetchNext: store.pokemons.fetchNext

    }
};
  
const mapDispatchToProps = (dispatch) => ({
    getPokemons: (data) => dispatch(getPokemons(data)),
    pokemonId: (data) => dispatch(pokemonId(data)),
    nextPokemons: (data) => dispatch(nextPokemons(data)),
    prevPokemons: (data) => dispatch(prevPokemons(data))
});

export default (connect(mapStateToProps, mapDispatchToProps) (PokemonsContainer));
