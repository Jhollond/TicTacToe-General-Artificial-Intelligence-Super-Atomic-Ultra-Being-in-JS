import React, { Component } from 'react';
import Game from './game/game';
import NavButtons from './buttons_nav';

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
		const mainGame = () => {
			return (
				<div>
					{this.scoreKeeper()}
						<Game
							names={this.props.names}
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
