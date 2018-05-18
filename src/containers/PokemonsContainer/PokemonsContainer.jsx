import React, { Component } from 'react'
import { connect } from 'react-redux'
import getPokemons, { pokemonId, nextPokemons, prevPokemons, pokemonColor }  from '../../actions/getPokemonsAction'
import Pokemons from '../../components/Pokemons/Pokemons'

class PokemonsContainer extends Component {
  constructor() {
    super()
    this.state = {
    }
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
        pokemonColor={this.props.pokemonColor}
      />
    )
  }
}

const mapStateToProps = (store) => {
    return {
      pokemons: store.pokemons.allPokemons,
      pokemonUnit: store.pokemons.pokemonUnit,
      next: store.pokemons.allPokemons.next,
      prev: store.pokemons.allPokemons.previous,
      nextOrder: store.pokemons.nextOrder,
      fetchNext: store.pokemons.fetchNext,
      pokemonColor: store.pokemons.pokemonColor

    }
}
  
const mapDispatchToProps = (dispatch) => ({
    getPokemons: (data) => dispatch(getPokemons(data)),
    pokemonId: (data) => dispatch(pokemonId(data)),
    nextPokemons: (data) => dispatch(nextPokemons(data)),
    prevPokemons: (data) => dispatch(prevPokemons(data)),
    pokemonColor: (data) => dispatch(pokemonColor(data))
})

export default (connect(mapStateToProps, mapDispatchToProps) (PokemonsContainer))
