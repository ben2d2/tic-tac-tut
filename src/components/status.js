import React from 'react';

class Status extends React.Component {
  render() {
    var x = this.props.players.X ? this.props.players.X + ' (X)' : 'X';
    var o = this.props.players.O ? this.props.players.O + ' (O)' : 'O';
    return <h2>Next player: {this.props.xIsNext ? x : o}</h2>
  }
}

export default Status;
