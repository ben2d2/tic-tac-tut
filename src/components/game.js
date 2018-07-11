import React from 'react';
import Board from './board.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  jumpTo(move) {
    this.setState({
      stepNumber: move,
      xIsNext: (move % 2) === 0,
    })
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) { return; }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        coordinates: getCoordinates(i)
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderGameInfo(history) {
    const moves = history.map((step, move) => {
      return (
        <tr key={move}>
          <td><img className='move-button' onClick={() => this.jumpTo(move)} src={ require('../images/refresh.png') } alt='refresh icon'/></td>
          <td>{move > 0 ? move : 'Start'}</td>
          <td>{step.coordinates ? step.coordinates['col'] : ''}</td>
          <td>{step.coordinates ? step.coordinates['row'] : ''}</td>
        </tr>
      )
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Reset</th>
            <th>Move #</th>
            <th>Col</th>
            <th>Row</th>
          </tr>
        </thead>
        <tbody>{moves}</tbody>
      </table>
    )
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    return (
      <div>
        <h1>Tic-Tac-Toe<button className="new-game-button left-margin" type="button" onClick={ refreshPage }>New Game</button></h1>
        <h2>{getStatus(winner, this.props, this.state)}</h2>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              winningSquares={winner ? winner['winningSquares'] : []}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            {this.renderGameInfo(history)}
          </div>
        </div>
      </div>
    );
  }
}

function getCoordinates(i) {
  const rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
  const cols = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];

  return {
    col: cols.findIndex(group => group.includes(i)) + 1,
    row: rows.findIndex(group => group.includes(i)) + 1
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { token: squares[a], winningSquares: [a, b, c] };
    }
  }
  return null;
}

function refreshPage(){
  window.location.reload();
}

function getStatus(winner, props, state) {
  if (winner) {
    return 'Winner: ' + props.players[winner['token']] + ' (' + winner['token'] + ')';
  } else if (!winner && state.stepNumber === 9) {
    return "No winner. It's a draw!";
  } else {
    var X = props.players.X + ' (X)';
    var O = props.players.O + ' (O)';
    return 'Next player: ' + (state.xIsNext ? X : O);
  }
}

export default Game;
