import React from 'react';

function Square(props) {
  return (
    <input
      className={props.squareStyle}
      onClick={() => props.onClick()}
      type="button"
      value={props.value} />
  );
}

export default Square;
