import React from 'react';

//====Child-Components====//
import Square from './square'

const Board = (props) => {
  // constructor() {
  // 	super()
  // 	this.state = {
  // 		t0: 0,
  //
  // 	}
  // }
  const renderSquare = (i) => {
    const value = props.squares[i];
    const place = props.tileStyle[i];
    let squareStyle = 'square '
    squareStyle += value === 'X' ? 'xTile ' : 'oTile ';
    squareStyle += place === 2 ?
    'XwinTile' : place === 3 ?
    'OwinTile' : place ?
    'teamTile' : '';
    return (
      <Square
        squareStyle={squareStyle}
        scale={scale}
        key={i}
        value={value}
        onClick={() => props.onClick(i)} />
    )
  }
  let _ = Array(props.boardSize).fill('');
  let scale = 1;
  if (props.boardSize*50 >= 400) {
    scale = 365 / (props.boardSize*50);
    console.log(scale)
  }
  return (
    <div className="grid">{
      _.map((un,indexRow) => (
        <div key={indexRow} className="board-row">
          {_.map((und,index) =>
            renderSquare(index+indexRow*props.boardSize)
          )}
        </div>
      ))}
    </div>
  )
}

export default Board;
