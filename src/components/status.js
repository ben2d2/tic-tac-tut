import React from 'react';

class GameOver extends React.Component {
  render() {
    const winner = this.props.winner;
    if (winner) {
      var name = this.props.players[winner['token']];
      var line = name ? name + ' (' + winner['token'] + ')' : winner['token'];
      return (
        <div className="game-over-banner">
          {'Winner: ' + line}
        </div>
      )
    } else {
      return (
        <div className="game-over-banner">
          No winner. It's a draw!
        </div>
      )
    }
  }
}

class NextPlayer extends React.Component {
  render() {
    var x = this.props.players.X ? this.props.players.X + ' (X)' : 'X';
    var o = this.props.players.O ? this.props.players.O + ' (O)' : 'O';
    return <h2>Next player: {this.props.xIsNext ? x : o}</h2>
  }
}

class Status extends React.Component {
  render() {
    if (!this.props.winner && this.props.stepNumber < 9) {
      return <NextPlayer {...this.props} />
    } else {
      return <GameOver {...this.props} />
    }
  }
}

export default Status;
