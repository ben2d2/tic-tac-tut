import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/game.js';
import GameForm from './components/game_form.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: null
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  };

  handleFormSubmit(state) {
    this.setState({
      players: state
    });
  };

  render() {
    if (this.state.players){
      return <Game players={this.state.players}/>
    } else {
      return <GameForm onSubmit={this.handleFormSubmit}/>
    }
  }
}


// ========================================

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
