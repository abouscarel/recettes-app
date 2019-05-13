import React, { Component } from 'react'

class Admin extends Component {
  render() {
    const { chargerExemple } = this.props;

    return (
      <footer>
        <button onClick={chargerExemple}>Remplir</button>
      </footer>
    )
  }
}

export default Admin
