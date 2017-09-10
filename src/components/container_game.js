import React, { Component } from 'react';
import Game from './game/game';
import NavButtons from './buttons_nav';

const toOrdinal = (base) => {
	const n = base.toString().slice(-1);
	if (base < 4 || base > 20) {
		base += n === "1" ? "st" : n === "2" ? "nd" : n === "3" ? "rd" : 'th'
	} else {
		base += "th";
	}
	return base;
}

class GameContainer extends Component {
	constructor() {
		super();
		this.state = {
			X: 0,
			O: 0,
			tie: 0,
			round: 1,
			history: null
		}
		this.baseState = this.state;
	}
	newGame() {
		this.setState(this.baseState);
		if (this.props.newGame) {
			this.props.newGame();
		}
	}
	tallyWin(target) {
		const tally = this.state[target];
		this.setState({[target]: tally+1, round: this.state.round+1});
	}
	scoreKeeper() {
		const Noughts = this.props.names.playerTwo;
		const Crosses = this.props.names.playerOne;
		let lines = this.props.linesTarget;
		lines = lines ? lines === 1 ? "" : lines + " lines" : false
		return (
			<div className="scoreKeeper">
				<div>
					<div style={{fontSize: "1.33em"}}>
						<b>{toOrdinal(this.state.round)}</b> Round
					</div>
					<div style={{fontSize: "0.66em"}}>
						<b>{lines}</b> {lines ? 'To Win':''}
					</div>
					{this.props.robot.delayCheckBox()}
					
				</div>
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
		const mainGame = () => {
			return (
				<div>
					{this.scoreKeeper()}
						<Game
							linesTarget={this.props.linesTarget}
							names={this.props.names}
							boardSize={this.props.boardSize}
							tallyWin={target => this.tallyWin(target)}
							robot={this.props.robot}
						/>
				</div>
			)
		}
		return (
			<div style={{"marginTop":10}}>
				<NavButtons
					include={["home", "New Game"]}
					customInclude={{"New Game": () => this.newGame()}}/>
				{this.props.ready && mainGame()}
			</div>
		)
	}
}

export default GameContainer
