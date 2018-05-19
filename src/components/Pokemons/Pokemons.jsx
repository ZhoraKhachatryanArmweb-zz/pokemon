import React, { Component } from 'react'
import * as _ from 'lodash'
import './Pokemons.css'

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
    this.setState({pokemonColor: color})
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
            <li key={index} onClick={this.handleCheck} name={pokemonName} className="list-group-item list-group-item-action">
                {pokemonName}
            </li>
        )
      })
    let pokemonsColorList = _.map(this.props.pokemonColorData, (value, index) => {
      let pokemonName = value.name
      return (
          <li key={index} onClick={this.handleCheck} name={pokemonName} className="list-group-item list-group-item-action">
              {pokemonName}
          </li>
      )
    })
    let type = []  
    _.forEach(this.props.pokemonUnit.types, item => {
      type.push(item.type.name)
    })
    return (
      <div className="container">
        <div className="row">
          <div className="col m-2 p-3 list-pokemons">
            <div className="row pokemon-list-header">
              <div className="col-md-6 col-sm-12 pb-1"><h4>Pokemons</h4></div>
              <div className="col-md-6 col-sm-12 pb-1"><input type="name" className="form-control" value={this.state.pokemonName} placeholder="Search pokemons" onChange={(e) => this.handleNameChange(e)}/></div>
            </div>
            <ul className="list-group">
              {pokemons}
            </ul>
            <div className="pt-2 prev-next-buttons">
              <button onClick={this.prevPokemons} className="prev btn btn-dark" disabled={this.state.prevButton}>Previous</button>
              <button onClick={this.nextPokemons} className="next btn btn-dark" disabled={this.state.nextButton}>Next</button>
            </div>
          </div>
          <div className="col m-2 p-3 details-pokemons">
            <div className="card">
              <img className="card-img-top" src={this.state.pokemonImg ? this.state.pokemonImg : require('../../assets/images/default.png')}/>
              <div className="card-body">
                <p className="card-text"><b>Name:</b> {this.props.pokemonUnit.name}</p>
                <p className="card-text"><b>ID:</b> {this.props.pokemonUnit.id}</p>
                <p className="card-text"><b>Type:</b> {type.join(', ')}</p>
                <p className="card-text"><b>Base experience:</b> {this.props.pokemonUnit.base_experience}</p>
                <p className="card-text"><b>Weight:</b> {this.props.pokemonUnit.weight}</p>
                <p className="card-text"><b>Height:</b> {this.props.pokemonUnit.height}</p>
              </div>
            </div>
            <div className="pokemons-color-box pt-2">
              <select className="form-control" value={this.state.pokemonColor} onChange={(e) => {this.handleColorPokemon(e)}}>
                <option>Select color</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="green">Green</option>
                <option value="Yellow">Yellow</option>
                <option value="Purple">Purple</option>
                <option value="Gray">Gray</option>
                <option value="Brown">Brown</option>
                <option value="White">White</option>
                <option value="Black">Black</option>
              </select>
              {this.props.showPokemonColor && <div className="pokemons-color-list mt-2">
                <ul className="list-group">
                  {pokemonsColorList}
                </ul>
              </div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Pokemons
