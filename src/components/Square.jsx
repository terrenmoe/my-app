import React from 'react';
import { func, string } from 'prop-types';

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
  onClick: func.isRequired,
  value: string.isRequired,
};

export default Square;
