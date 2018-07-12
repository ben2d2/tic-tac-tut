import React from 'react';

class GameInfo extends React.Component {
  render() {
    const moves = this.props.history.map((step, move) => {
      var token = ((move - 1) % 2) === 0 ? 'X' : 'O'
      return (
        <tr key={move}>
          <td><img className='move-button' onClick={() => this.props.onClick(move)} src={ require('../images/refresh.png') } alt='refresh icon'/></td>
          <td>{move > 0 ? move : 'Start'}</td>
          <td>{move > 0 ? this.props.players[token] : ''}</td>
          <td>{move > 0 ? token : ''}</td>
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
            <th>Player</th>
            <th>Token</th>
            <th>Col</th>
            <th>Row</th>
          </tr>
        </thead>
        <tbody>{moves}</tbody>
      </table>
    )
  }
}

export default GameInfo;
