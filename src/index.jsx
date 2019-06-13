import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'airbnb-prop-types';
import './index.css';

function Square({ onClick, value }) {
  return (
    <button
      type="button"
      className="square"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

function Row({ squares, onClick, i }) {
  return (
    <div
      className="board-row"
    >
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
      />
      <Square
        value={squares[i + 1]}
        onClick={() => onClick(i + 1)}
      />
      <Square
        value={squares[i + 2]}
        onClick={() => onClick(i + 2)}
      />
    </div>
  );
}

Row.propTypes = {
  squares: PropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired,
};

function Board({ squares, onClick, i }) {
  return (
    <div>
      <Row
        squares={squares[i]}
        onClick={onClick}
        i={i}
      />
      <Row
        squares={squares[i]}
        onClick={onClick}
        i={i}
      />
      <Row
        squares={squares[i]}
        onClick={onClick}
        i={i}
      />
    </div>
  );
}

Board.propTypes = {
  squares: PropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired,
};


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const { history, stepNumber, xIsNext } = this.state;
    const hist = history.slice(
      0,
      stepNumber + 1,
    );
    const current = hist[hist.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = (xIsNext) ? 'X' : 'O';
    this.setState({
      history: hist.concat([{
        squares,
      }]),
      stepNumber: hist.length,
      xIsNext: !xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const { history, stepNumber, xIsNext } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move}` :
        'Go to game start';
      return (
        <li key={+move}>
          <button
            onClick={() => this.jumpTo(move)}
            type="button"
          >
            {desc}
          </button>
        </li>
      );
    });
    const turn = (xIsNext) ? 'X' : 'O';
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${turn}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root'),
);
