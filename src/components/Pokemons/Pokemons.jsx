import React, { Component } from 'react'
import * as _ from 'lodash'
import './Pokemons.css'
import { connect } from 'react-redux'
import Pagination from "react-js-pagination"
import * as pokemonActions from '../../actions/getPokemonsAction'

class Pokemons extends Component {
  state = {
    tableDatLength: null,
    pokemonType: ''
  }

  handleColorPokemon = (e) => {
    let url = e.target.value
    this.setState({pokemonType: url})
    this.props.getPokemonsTable(null, url, true)
  } 

  componentWillReceiveProps(nextProps) {
    nextProps.count && this.setState({tableDatLength: nextProps.count}) 
  }

  handlePageChange = (pageNumber) => {
    this.setState({activePage: pageNumber});
    const fromType  = !!this.state.pokemonType
    this.props.getPokemonsTable(pageNumber, this.state.pokemonType, fromType)
  }

  render() {
    let pokemonTypes = _.map(this.props.pokemonTypes, (value, index) => {
      return (
        <option key={index} value={value.url}>{value.name}</option>
      )
    })
    let pokemonsTable = _.map(this.props.pokemonstTable, (value, index) => {
      return (
        <tr key={index}>
          <td><img  src={value.avatar} alt="avatar"/></td>
          <td>{value.name}</td>
          <td>{value.height}</td>
          <td>{value.weight}</td>
        </tr>
      )
    })
    return (
      <div className="container app-content">
        <div className="row">
          <div className="col-4 pt-2">
            <select className="form-control" value={this.state.pokemonType} onChange={(e) => { this.handleColorPokemon(e) }}>
              {pokemonTypes}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col pt-2">
          {!this.props.tableLoader ? 
            <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Height</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {pokemonsTable}
                </tbody>
              </table> 
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={5}
                pageRangeDisplayed={5}
                totalItemsCount={this.state.tableDatLength}
                onChange={this.handlePageChange}
                linkClassFirst="disabled"
                linkClassLast="disabled"
              />
            </div> :
            <img src={require('../../assets/images/loader.gif')} alt="loader" className="loader"/>}
          </div>
        </div>        
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    pokemonstTable: store.pokemons.pokemonstTable,
    tableLoader: store.pokemons.tableLoader,
    pokemonTypes: store.pokemons.pokemonTypes,
    count: store.pokemons.count
  }
}

export default connect(mapStateToProps, pokemonActions)(Pokemons)
