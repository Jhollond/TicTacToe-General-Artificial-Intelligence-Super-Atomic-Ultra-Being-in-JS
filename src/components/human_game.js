import React, { Component } from 'react';
import { Link } from 'react-router';
import GameContainer from './container_game';

class HumanGame extends Component {
  constructor() {
    super();
    this.state = {
      playerOne: 'Crosses',
      playerTwo: 'Noughts',
      initGame: true
    }
  }
  initGame() {
    this.setState({initGame: true});
  }
  OnInputChange(player,name) {
    this.setState({[player]: name})

  }
  pickNames() {
    return(
      <div style={{"marginTop":10}}>
        <Link to="/">
					<span className="btn btn-secondary">
						Main Menu
					</span>
				</Link>
        <div>Pick your tile</div>
        <div className="tileSelectionMenu">
          <div className="status">
            <div>Player X Name: </div>
            <input
              className='form-control'
              value={this.state.playerOne}
              onChange={event => this.OnInputChange('playerOne',event.target.value)}
            />
          </div>
          <div className="status">
            <div>Player O Name: </div>
            <input
              className='form-control'
              value={this.state.playerTwo}
              onChange={event => this.OnInputChange('playerTwo',event.target.value)}
            />
          </div>
          <span
            className="btn btn-secondary"
            onClick={() => this.setState({initGame: false})}
            >go</span>
          </div>
      </div>
    )
  }
  render() {
    const names = {
      playerOne: this.state.playerOne,
      playerTwo: this.state.playerTwo
    }
    return (
      <div>
        {this.state.initGame ?
          this.pickNames() :
        <GameContainer
          names={names}
          newGame={() => this.initGame()}/>
        }
      </div>
    )
  }
}

export default HumanGame
