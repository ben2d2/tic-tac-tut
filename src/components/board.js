import React from 'react';
import Square from './square.js';

class Board extends React.Component {
  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      key={i}
    />;
  }

  renderRows() {
    return [[0, 1, 2], [3, 4, 5], [6, 7, 8]].map(function(row, index){
      return (<div className="board-row" key={"row-" + index}>{
        row.map(function(i) {
          return this.renderSquare(i);
        }, this)
      }</div>)
    }, this);
  }

  render() {
    return <div>{this.renderRows()}</div>
  }
}

export default Board;
