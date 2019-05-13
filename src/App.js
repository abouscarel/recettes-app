import React, { Component } from "react";
// CSS
import "./App.css";

import Header from "./components/Header";
import Admin from "./components/Admin";
import Card from './components/Card';

import recettes from "./recettes";

class App extends Component {
  state = {
    pseudo: this.props.match.params.pseudo,
    recettes: {}
  };

  chargerExemple = () => this.setState({ recettes });

  render() {
    const { pseudo, recettes } = this.state;

    const cards = Object.keys(recettes).map(key => <Card key={key} details={recettes[key]} />);
    
    return (
      <div className="box">
        <Header pseudo={pseudo} />
        <div className="cards">
         { cards }
        </div>
        <Admin chargerExemple={this.chargerExemple} />
      </div>
    );
  }
}

export default App;
