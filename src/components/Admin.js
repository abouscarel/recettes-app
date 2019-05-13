import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import base, { firebaseApp } from "../base";

import AjouterRecette from "./AjouterRecette";
import AdminForm from "./AdminForm";
import Login from "./Login";

class Admin extends Component {
  state = {
    uid: null,
    chef: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.handleAuth({ user })
      }
    });
  }

  /**
   * Handle login with facebook success
   * @function handleAuth
   * @async
   * @param  {object} authData - Facebook user
   */
  handleAuth = async authData => {
    const box = await base.fetch(this.props.pseudo, { context: this });
    if (!box.chef) {
      await base.post(`${this.props.pseudo}/chef`, {
        data: authData.user.uid
      });
    }
    this.setState({
      uid: authData.user.uid,
      chef: box.chef || authData.user.uid
    });
  };

  /**
   * Log in with facebook
   * @function authenticate
   */
  authenticate = () => {
    const authProvider = new firebase.auth.FacebookAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.handleAuth);
  };

  /**
   * Log out action
   * @function logout
   * @async
   */
  logout = async () => {
    console.log("Déconnexion");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const {
      chargerExemple,
      ajouterRecette,
      modifierRecette,
      supprimerRecette,
      recettes
    } = this.props;

    const logout = <button onClick={this.logout}>Déconnexion</button>;

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    if (this.state.uid !== this.state.chef) {
      return (
        <div>
          <p>Tu n'es pas le chef de cette boîte !</p>
          {logout}
        </div>
      );
    }

    return (
      <div className="cards">
        <AjouterRecette ajouterRecette={ajouterRecette} />
        {Object.keys(recettes).map(key => (
          <AdminForm
            key={key}
            id={key}
            modifierRecette={modifierRecette}
            supprimerRecette={supprimerRecette}
            recettes={recettes}
          />
        ))}
        <footer>
          {logout}
          <button onClick={chargerExemple}>Remplir</button>
        </footer>
      </div>
    );
  }
}

export default Admin;
