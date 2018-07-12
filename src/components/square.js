import React from 'react';

class Square extends React.Component {
  render() {
    return (
      <button
        className={this.props.winningSquare ? 'square winning-square' : 'square'}
        onClick={this.props.onClick}
      >
        {this.props.value}
      </button>
    );
  }
}

export default Square;
