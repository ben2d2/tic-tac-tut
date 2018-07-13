import React from 'react';

class GameInfo extends React.Component {
  render() {
    const moves = this.props.history.map((step, move) => {
      var prevMove = (move - 1);
      var token = ((prevMove) % 2) === 0 ? 'X' : 'O'
      var playerName = this.props.players[token];

      var baseColumns = [
        <img className='move-button' onClick={() => this.props.onClick(move)} src={ require('../images/refresh.png') } alt='refresh icon'/>,
        move > 0 ? move : 'Start',
        playerName,
        move > 0 ? token : '',
        step.coordinates ? step.coordinates['col'] : '',
        step.coordinates ? step.coordinates['row'] : ''
      ];
      if (playerName) {
        var columns = baseColumns.map((col) => { return <td>{col}</td>})
      } else {
        baseColumns.splice(2, 1)
        var columns = baseColumns.map((col) => { return <td>{col}</td>})
      }

      return (
        <tr key={move}>
          {columns}
        </tr>
      )
    });

    let headers;
    if (this.props.players['X'] && this.props.players['O']) {
      headers = ['Reset', 'Move#', 'Player', 'Token', 'Col', 'Row'].map((header) => {
        return <th>{header}</th>
      })
    } else {
      headers = ['Reset', 'Move#', 'Token', 'Col', 'Row'].map((header) => {
        return <th>{header}</th>
      })
    }

    return (
      <table>
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>{moves}</tbody>
      </table>
    )
  }
}

export default GameInfo;
