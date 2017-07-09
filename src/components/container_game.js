import React, { Component } from 'react';
import { Link } from 'react-router';
import Game from './game/game';

class GameContainer extends Component {
	constructor() {
		super();
		this.state = {
			X: 0,
			O: 0,
			tie: 0,
			history: null
		}
		this.baseState = this.state;
	}
	newGame() {
		if (this.props.newGame) {
			this.props.newGame();
		}
		else {
			this.setState(this.baseState);
		}
	}
	tallyWin(target) {
		const tally = this.state[target];
		this.setState({[target]: tally+1});
	}
	NavBtns() {
		return (
			<div className="returnBtn">
				<Link to="/">
					<span className="btn btn-secondary">
						Main Menu
					</span>
				</Link>
				<span className="btn btn-secondary"
					onClick={() => this.newGame()}>
					New Game
				</span>
			</div>
		)
	}
	scoreKeeper() {
		const Noughts = this.props.names.playerTwo;
		const Crosses = this.props.names.playerOne;
		return (
			<div>
				<div className="tally">
					<span><b>Scores: </b></span>
					<span>{Crosses}: {this.state.X}</span>
					<span>{Noughts}: {this.state.O}</span>
					<span>Draws: {this.state.tie}</span>
				</div>
			</div>
		)
	}
	render() {
		return (
			<div style={{"marginTop":10}}>
				{this.NavBtns()}
				{this.scoreKeeper()}
				<Game
					names={this.props.names}
					tallyWin={target => this.tallyWin(target)}
					robot={this.props.robot}
				/>
			</div>
		)
	}
}

export default GameContainer
