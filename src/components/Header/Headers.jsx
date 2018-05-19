import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div className="header">
        <div className="logo">
            <img src={require('../../assets/images/pokemon.png')} />
        </div>
      </div>
    )
  }
}

export default Header
