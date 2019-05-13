import React, { Component } from "react";

import recettes from "../recettes";

// Firebase
import base from "../base";

/**
 * @function withFirebase
 * @param  {ref} const withFirebase - Component to wrap
 */
const withFirebase = WrappedComponent =>
  class HOC extends Component {
    state = {
      pseudo: this.props.match.params.pseudo,
      recettes: {}
    };

    componentDidMount() {
      // Sync Firebase state with local state
      this.ref = base.syncState(`${this.state.pseudo}/recettes`, {
        context: this,
        state: "recettes"
      });
    }

    componentWillUnmount() {
      // Unsync firebase on unmount
      base.removeBinding(this.ref);
    }

    /**
     * Add recipe
     * @function ajouterRecette
     * @param  {object} recette - new recipe object
     */
    ajouterRecette = recette => {
      const recettes = { ...this.state.recettes };
      recettes[`recette-${Date.now()}`] = recette;
      this.setState({ recettes });
    };

    /**
     * Update recipe by key
     * @function modifierRecette
     * @param  {string} key - recipe key to update
     * @param  {object} newRecette - updated recipe object
     */
    modifierRecette = (key, newRecette) => {
      const recettes = { ...this.state.recettes };
      recettes[key] = newRecette;
      this.setState({ recettes });
    };

    /**
     * Delete recipe by key
     * @function supprimerRecette
     * @param  {string} key - recipe key to delete
     */
    supprimerRecette = key => {
      const recettes = { ...this.state.recettes };
      recettes[key] = null;
      this.setState({ recettes });
    };

    /**
     * Load exemple recipes
     * @function chargerExemple
     */
    chargerExemple = () => this.setState({ recettes });

    render() {
      return <WrappedComponent
        recettes={this.state.recettes}
        ajouterRecette={this.ajouterRecette}
        modifierRecette={this.modifierRecette}
        supprimerRecette={this.supprimerRecette}
        chargerExemple={this.chargerExemple} 
        {...this.props} />;
    }
  };

export default withFirebase;
