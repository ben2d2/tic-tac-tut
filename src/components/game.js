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

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  moveCoordinates(i) {
    var row1 = [0, 1, 2];
    var row2 = [3, 4, 5];
    var row3 = [6, 7, 8];
    var col1 = [0, 3, 6];
    var col2 = [1, 4, 7];
    var col3 = [2, 5, 8];

    let row;
    if (row1.includes(i)) {
      row = 1
    } else if (row2.includes(i)) {
      row = 2
    } else if (row3.includes(i)) {
      row = 3
    }

    let col;
    if (col1.includes(i)) {
      col = 1
    } else if (col2.includes(i)) {
      col = 2
    } else if (col3.includes(i)) {
      col = 3
    }

    return "(" + col + ", " + row + ")"
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
        moveCoordinates: this.moveCoordinates(i)
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button className="move-button" onClick={() => this.jumpTo(move)}>{desc} {history[move].moveCoordinates}</button>
        </li>
      )
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner['token'];
    } else if (!winner && this.state.stepNumber == 9) {
      status = "No winner. It's a draw!";
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winningSquares={winner ? winner['winningSquares'] : []}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { token: squares[a], winningSquares: lines[i] };
    }
  }
  return null;
}

export default Game;
