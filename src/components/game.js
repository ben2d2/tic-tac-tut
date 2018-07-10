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
    var rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
    var cols = [[0, 3, 6], [1, 4, 7], [2, 5, 8]]

    var row = 0
    rows.forEach((group, index) => {
        if (group.includes(i)) {
          row = index + 1
        }
      }
    )

    var col = 0
    cols.forEach((col, index) => {
        if (col.includes(i)) {
          col = index + 1
        }
      }
    )

    return { col: col, row: row }
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
      return (
        <tr key={move}>
          <td><img className='move-button' onClick={() => this.jumpTo(move)} src={ require('../images/refresh.png') } /></td>
          <td>{move > 0 ? move : 'Start'}</td>
          <td>{history[move].moveCoordinates ? history[move].moveCoordinates['col'] : ''}</td>
          <td>{history[move].moveCoordinates ? history[move].moveCoordinates['row'] : ''}</td>
        </tr>
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
          <table>
            <thead>
              <th>Reset</th>
              <th>Move #</th>
              <th>Col</th>
              <th>Row</th>
            </thead>
            <tbody>{moves}</tbody>
          </table>
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
