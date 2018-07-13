import React from 'react';

class Square extends React.Component {
  render() {
    return (
      <button
        className={'square square-' + this.props.value}
        onClick={this.props.onClick}
      >
        {this.props.value}
      </button>
    );
  }
}

export default Square;
