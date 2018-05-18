import React, { Component } from 'react'
import * as _ from 'lodash'

class Pokemons extends Component {
  constructor() {
    super()
    this.state = {
        pokemonImg: '',
        pokemonName: '',
        pokemonColor: '',
        pokemonType: {},
        prevButton: true,
        nextButton: false
    }
  }

  handleCheck = (e) => {
    let body = e.target.getAttribute('name')
    this.props.pokemonId(body)
  }

  handleNameChange = (e) => {
    this.setState({pokemonName: e.target.value}, () => this.props.pokemonId(this.state.pokemonName))
  }

  handleColorPokemon = (e) =>{
    let color = e.target.value
    this.setState({pokemonColor:color})
    this.props.pokemonColor(color)
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
    let pokemons = _.map(this.props.pokemons, (value, index) => {
        let pokemonName = value.name
        return (
            <li key={index} onClick={this.handleCheck} name={pokemonName}>
                {pokemonName}
            </li>
        )
      })
    let type = []  
    _.forEach(this.props.pokemonUnit.types, item => {
      type.push(item.type.name)
    })
    return (
      <div>
        <ul>
            {pokemons}
        </ul>
        <div>
            {this.props.pokemonUnit.name}
            {type.join(', ')}
            {this.props.pokemonUnit.id}
            <img src={this.state.pokemonImg}/>
        </div>
          <input type="name" value={this.state.pokemonName} placeholder="Search pokemons" onChange={(e) => this.handleNameChange(e)}/>
          <select value={this.state.pokemonColor} onChange={(e) => {this.handleColorPokemon(e)}}>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
          </select>
          <button onClick={this.prevPokemons} disabled={this.state.prevButton}>Previous</button>
          <button onClick={this.nextPokemons} disabled={this.state.nextButton}>Next</button>
      </div>
    )
  }
}

export default Pokemons
