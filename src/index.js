import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/game.js';

class GameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      X: null,
      O: null
    };

    this.handleChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    this.setState({playersEnrolled: true})
    event.preventDefault();
  }

  render() {
    if (this.state.playersEnrolled){
      return <Game players={this.state}/>
    } else {
      return (
        <div>
          <h1>Tic-Tac-Toe</h1>
          <h2>Welcome! Let's get started.</h2>
          <form onSubmit={this.handleSubmit}>
            <p>
              <label>
                Player name using <strong>X</strong>:
                <input name='X' type="text" onChange={this.handleChange} />
              </label>
            </p>
            <p>
              <label>
                Player name using <strong>O</strong>:
                <input name='O' type="text" onChange={this.handleChange} />
              </label>
            </p>
            <input className="new-game-button" type="submit" value="Start Game" />
          </form>
        </div>
      );
    }
  }
}


// ========================================

ReactDOM.render(
  <GameForm />,
  document.getElementById('root')
);
