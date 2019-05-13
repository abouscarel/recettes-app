import React from 'react'
import { Redirect } from 'react-router-dom'

class Connexion extends React.Component {
  state = {
    pseudo: '',
    goToApp: false
  }

  goToApp = event => {
    event.preventDefault()
    this.setState({ goToApp: true })
  }

  handleChange = event => {
    const pseudo = event.target.value
    this.setState({ pseudo })
  }

  render () {
    const { pseudo, goToApp } = this.state;
    if (goToApp) {
      return <Redirect push to={`/pseudo/${pseudo}`} />
    }

    return (
      <div className='connexionBox'>
        <form className='connexion' onSubmit={this.goToApp} >
          <h1>Ma Boîte à Recettes</h1>
          <input
            type='text'
            value={pseudo}
            onChange={this.handleChange}
            placeholder='Nom du Chef'
            pattern='[A-Za-z-]{1,}'
            required />
          <button type='submit'>GO</button>
          <p>Pas de caractères spéciaux.</p>
        </form>
      </div>
    )
  }
}

export default Connexion
