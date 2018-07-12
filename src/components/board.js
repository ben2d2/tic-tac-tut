import React from 'react';
import Square from './square.js';

class Board extends React.Component {
  renderSquare(i, isWinner) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      key={i}
      isWinner={isWinner}
    />;
  }

  renderRows() {
    return [[0, 1, 2], [3, 4, 5], [6, 7, 8]].map(function(row, index){
      return (<div className="board-row" key={"row-" + index}>{
        row.map(function(i) {
          var isWinner = this.props.winningSquares ? this.props.winningSquares.includes(i) : false
          return this.renderSquare(i, isWinner);
        }, this)
      }</div>)
    }, this);
  }

  render() {
    return <div>{this.renderRows()}</div>
  }
}

export default Board;
