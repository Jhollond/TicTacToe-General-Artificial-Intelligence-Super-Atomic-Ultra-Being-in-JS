import React, {Component} from 'react';
// ====Child-Components==== //
import Board from './board';
import MovesList from './moves_list';
// ======================== //

class Game extends Component {
	constructor() {
		super();
		this.state = {
			history: [{
				squares: Array(9).fill(null)
			}],
			currentTurn: 'X',
			stepNumber: 0
		};
		this.endAnimation = "";
		this.isInProgress = true;
		this.baseState = this.state;
	}
	workThemTiles() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const squares = current.squares;
		const result = {
			tileStyle: Array(9).fill(false),
			line: null,
			toEnd: false
		};
		const lines = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
			[1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
		];
		// Check if the played move has created a line.
		lines.forEach(line => {
			const [a, b, c] = line;
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				// Set up board style to highlight winning team and combo
				result.tileStyle = squares.reduce((acc, tile, ind) => {
					tile = tile === squares[a] ? 1 : false;
					line.forEach(win => {
						if (ind === win) {
							tile = 2;
						}
					});
					// All tiles in combo get 2,
					// Tiles on same side get 1,
					// Rest are false
					return acc.concat(tile);
				}, []);
				result.toEnd = this.state.currentTurn;
				result.line = line;
			}
		});
		if (squares.join('').length === 9 && !result.toEnd) {
			console.log(squares.join(''));
			result.toEnd = 'tie';
		}
		// No winner so no highlights;
		return result;
	}
	getStatus(args, stepResult = this.workThemTiles()) {
		const currentIsX = this.state.currentTurn === 'X';
		const { playerOne, playerTwo } = this.props.names;
		let name = currentIsX ? playerOne : playerTwo;
		name += name.slice(-1) === 's' ? '\'' : '\'s';
		const o = {
			status: `${name} turn!`,
			end: false,
			type: false,
			color: currentIsX ? 'xTile' : 'oTile'
		}
		if (stepResult.toEnd) {
			name = name === playerOne ? playerTwo : playerOne;
			o.color = currentIsX ? 'oTile' : 'xTile';
			o.end = true;
			if (stepResult.toEnd === 'tie') {
				o.status = 'Draw!';
				o.type = 'tie';
				o.color = '';
			} else {
				const a = stepResult.line[0];
				o.type = args[a];
				o.status = `The winner is ${name}!`;
			}
		}
		return o;
	}
	jumpTo(step) {
		this.setState({
			stepNumber: step,
			currentTurn: (step % 2) ? 'O' : 'X'
		});
	}
	squareClick(i,isRobot) {
		if (!isRobot && this.props.robot && this.props.robot.turn === this.state.currentTurn) {
			return;
		}
		if (!this.isInProgress) {
			return;
		}
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (squares[i]) {
			return
		}
		else {
			squares[i] = this.state.currentTurn;
			this.setState({
				robotCanGo: isRobot ? false : true,
				history: history.concat([{squares}]),
				currentTurn: this.state.currentTurn === 'X' ? 'O' : 'X',
				stepNumber: history.length
			});
		}
	}
	doRobot() {
		// If the current tile is the robots tile
		const isRobotsTurn = this.props.robot.turn === this.state.currentTurn;
		// And we're at the end of history
		const isMostRecentTurn = this.state.stepNumber+1 === this.state.history.length;
		if ((isRobotsTurn && isMostRecentTurn) && this.isInProgress) {
			const bestMove = this.props.robot.makeAIMove(this.state.history.slice(-1)[0].squares);
			this.squareClick(bestMove, true);
		}
	}
	restartGame(type) {
		console.log(type);
		const timeoutID = window.setTimeout(() => {
			this.isInProgress = true;
			this.setState(this.baseState);
			window.clearTimeout(timeoutID);
			this.props.tallyWin(type);
			console.log(this.isInProgress + " meme");
			this.endAnimation = "";
		},1250);
	}
	componentDidMount() {
		this.forceUpdate();
	}
	componentDidUpdate() {
		if (this.props.robot) {
			this.doRobot();
		}
	}
	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const result = this.workThemTiles();
		const gameStatus = this.getStatus(current.squares, result);
		if (gameStatus.end && this.isInProgress) {
			this.restartGame(gameStatus.type);
			this.endAnimation = "statusExpandUp";
			this.isInProgress = false;
		}
		return (
			<div className="game">
				<div className={`status ${gameStatus.color} ${this.endAnimation}`}>
					{gameStatus.status}
				</div>
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={i => this.squareClick(i)}
						tileStyle={result.tileStyle}/>
				</div>
				<div className="game-info">
					<MovesList
						history={history}
						jumpTo={i => this.jumpTo(i)}
						stepNumber={this.state.stepNumber}/>
				</div>
			</div>
		);
	}
}

		// ========================================

export default Game;
