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
      if (!playerName) {
        baseColumns.splice(2, 1)
      }
      var columns = baseColumns.map((col, i) => { return <td key={"td-" + i}>{col}</td>})

      return (
        <tr key={move}>
          {columns}
        </tr>
      )
    });

    var baseHeaders = ['Reset', 'Move#', 'Player', 'Token', 'Col', 'Row'];
    if (!this.props.players['X'] && !this.props.players['O']) {
      baseHeaders.splice(2, 1)
    }
    var headers = baseHeaders.map((header, i) => {
      return <th key={"tr-" + i}>{header}</th>
    })

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
