import React from 'react';
import Board from './board.js';
import GameInfo from './game_info.js';
import Status from './status.js';
import GameOver from './game_over.js';

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

  renderStatus(winner) {
    if (!winner && this.state.stepNumber < 9) {
      return (
        <div className="status">
          <Status
            players={this.props.players}
            xIsNext={this.state.xIsNext}
          />
        </div>
      )
    }
  }

  renderGameComponent(current, winner) {
    if (winner || this.state.stepNumber === 9) {
      return <GameOver winner={winner} players={this.props.players} />
    } else {
      return (
        <div>
          <div className="game-board">
            <Board
              squares={current.squares}
              winningSquares={winner ? winner['winningSquares'] : []}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
        </div>
      )
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    return (
      <div>
        <h1>Tic-Tac-Toe</h1>
        {this.renderStatus(winner)}
        <div className="game">
          {this.renderGameComponent(current, winner)}
          <div className="game-info">
            <GameInfo
              history={history}
              players={this.props.players}
              onClick={(move) => this.jumpTo(move)}
            />
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
      return squares[a];
    }
  }
  return null;
}

export default Game;
