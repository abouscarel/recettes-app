import React, { Component } from "react";
import PropTypes from 'prop-types';
// CSS
import "./App.css";

import Header from "./components/Header";
import Admin from "./components/Admin";
import Card from './components/Card';

import withFirebase from './hoc/withFirebase'

import ColorContext from './components/Color';

class App extends Component {
  state = {
    pseudo: this.props.match.params.pseudo, // Get pseudo from url
  };

  render() {
    const { pseudo } = this.state;
    // Get Firebase HOC props
    const { recettes, ajouterRecette, modifierRecette, supprimerRecette, chargerExemple } = this.props;

    const cards = Object.keys(recettes).map(key => <Card key={key} details={recettes[key]} />);
    
    return (
      <ColorContext>
        <div className="box">
          <Header pseudo={pseudo} />
          <div className="cards">
          { cards }
          </div>
          <Admin
            pseudo={pseudo}
            recettes={recettes}
            ajouterRecette={ajouterRecette}
            modifierRecette={modifierRecette}
            supprimerRecette={supprimerRecette}
            chargerExemple={chargerExemple} />
        </div>
      </ColorContext>
    );
  }
}

// Define props rules
App.propTypes = {
  recettes: PropTypes.object.isRequired,
  ajouterRecette: PropTypes.func.isRequired,
  modifierRecette: PropTypes.func.isRequired,
  supprimerRecette: PropTypes.func.isRequired,
  chargerExemple: PropTypes.func.isRequired
}

// Wrap HOC Component with App
const WrappedComponent = withFirebase(App)

// Export Wrapped Component
export default WrappedComponent;
