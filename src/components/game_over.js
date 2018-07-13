import React from 'react';

class GameOver extends React.Component {
  renderPlayerInfo(winner) {
    var name = this.props.players[winner];
    if (name) {
      return (
        <div>
          <div className="sub-heading">
            {name}
          </div>
          {winner}
        </div>
      )
    } else {
      return winner
    }
  }

  render() {
    const winner = this.props.winner;
    if (winner) {
      return (
        <div>
          <div className={"game-over-banner square-" + winner}>
            {this.renderPlayerInfo(winner)}
            <div className="sub-heading">
              WINNER!
            </div>
            <div className="restart">
              <a href={null} onClick={ refreshPage }>RESTART</a>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="game-over-banner">
          <span className="square-X">X</span><span className="square-O">O</span>
          <div className="sub-heading">
            It's a Draw!
          </div>
          <div className="restart">
            <a href={null} onClick={ refreshPage }>RESTART</a>
          </div>
        </div>
      )
    }
  }
}

function refreshPage(){
  window.location.reload();
}

export default GameOver;
