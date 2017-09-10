import React, {Component} from 'react';
// ====Child-Components==== //
import Board from './board';
import MovesList from './moves_list';
// ======================== //
import GetWinningTiles from './checkWinAlongGrid';

class Game extends Component {
	constructor() {
		super();
		this.state = {
			history: [{
				squares: Array(1).fill(null)
			}],
			currentTurn: 'X',
			stepNumber: 0,
			robotJustWent: false
		};
		this.endAnimation = "";
		this.isInProgress = true;
		this.baseState = this.state;
	}
	setBoardSize() {
		const boardSize = this.props.boardSize;
		const history = this.state.history.slice();
		history[0].squares = Array(boardSize**2).fill(null);
		this.setState({ history });
		this.baseState.history[0].squares = Array(boardSize**2).fill(null);
	}
	workThemTiles() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const squares = current.squares;
		const tileJustPlayed = this.state.currentTurn === 'X' ? 'O' : 'X';
		const boardSize = this.props.boardSize;
		const limit = this.props.linesTarget;
		const result = GetWinningTiles(squares, tileJustPlayed, boardSize, limit);
		if (squares.join('').length === squares.length && !result.toEnd) {
			result.toEnd = 'tie'
		}
		return result;
	}
	getStatus(args, stepResult) {
		const currentIsX = this.state.currentTurn === 'X';
		const { playerOne, playerTwo } = this.props.names;
		let name = currentIsX ? playerOne : playerTwo;
		const o = {
			status: `${name}${name.slice(-1) === 's' ? '\'' : '\'s'} turn!`,
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
				o.type = stepResult.toEnd;
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
		if (!isRobot) {
			this.setState({ robotJustWent: false })
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
				// and the game is in progress and is not about to restart
		const justWent = this.state.robotJustWent;
		if ((isRobotsTurn && isMostRecentTurn) && this.isInProgress && !justWent) {
			const board = this.state.history.slice(-1)[0].squares;
			const bestMove = this.props.robot.makeAIMove(board, this.state.stepNumber);
			if (this.props.robot.isDelay) {
				window.setTimeout(() => this.squareClick(bestMove, true)
				, this.props.robot.timeDelay);
			}
			else {
				this.squareClick(bestMove, true);
			}
			this.setState({ robotJustWent: true });
		}
	}
	restartGame(type) {
		const timeoutID = window.setTimeout(() => {
			this.isInProgress = true;
			this.setState(this.baseState);
			window.clearTimeout(timeoutID);
			this.props.tallyWin(type);
			this.endAnimation = "";
		},1250);
	}
	componentDidMount() {
		this.setBoardSize();
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
						boardSize={this.props.boardSize}
						squares={current.squares}
						onClick={i => this.squareClick(i)}
						tileStyle={result.tileStyle}/>
				</div>
				<div className="game-info">
					<MovesList
						boardSize={this.props.boardSize}
						history={history}
						jumpTo={i => this.jumpTo(i)}
						stepNumber={this.state.stepNumber}/>
				</div>
			</div>
		);
	}
}
Game.defaultProps = {
	boardSize: 3,
	linesTarget: 1
}
		// ========================================

export default Game;
