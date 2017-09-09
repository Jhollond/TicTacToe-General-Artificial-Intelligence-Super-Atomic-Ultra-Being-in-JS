import React from 'react';

function Square(props) {
  const value = props.value || "";
  return (
    <input
      className={props.squareStyle}
      onClick={() => props.onClick()}
      type="button"
      value={value} />
  );
}

export default Square;
