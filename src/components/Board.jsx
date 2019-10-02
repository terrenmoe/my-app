import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';

import Square from './Square';

class Board extends Component {
  renderSquare(idx) {
    const { squares, onClick } = this.props;
    return (
      <Square
        value={squares[idx]}
        onClick={() => onClick(idx)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  squares: PropTypes.isRequired,
  onClick: func.isRequired,
};

export default Board;
