import React from 'react';

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
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
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

export default GameForm;
