import React, { Component } from 'react';

//====Child-Components====//
import Square from './square'

class Board extends Component {
	// constructor() {
	// 	super()
	// 	this.state = {
	// 		t0: 0,
	//
	// 	}
	// }
    renderSquare(i) {
        const value = this.props.squares[i];
        const place = this.props.tileStyle[i];
        let squareStyle = 'square '
        squareStyle += value === 'X' ? 'xTile ' : 'oTile ';
        squareStyle += place === 2 ?
        'winTile' : place ?
        'teamTile' : '';
        return <Square
            squareStyle={squareStyle}
            key={i}
            value={value}
            onClick={() => this.props.onClick(i)} />;
        };
        render() {
            let _ = ['','',''];
            return (
                <div className="grid">{
                    _.map((un,indexRow) => {
                        return (
                            <div key={indexRow} className="board-row">
                                {_.map((und,index) => {
                                    var i = index+indexRow*3
                                    return (
                                        this.renderSquare(i)
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            );
        }
    }

    export default Board;
