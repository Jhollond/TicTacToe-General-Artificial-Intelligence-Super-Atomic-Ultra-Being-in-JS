import React, { Component } from 'react';
import GameContainer from './container_game';
import {TicTacToe, alphaBeta} from '../TicTacToe'

class RobotGame extends Component {
  constructor() {
    super();
    this.state = {
      robot: null,
      human: null
    };
    this.baseState = this.state;
    this.bot = null;
  }
  makeAIMove(board) {
    this.bot.board = board;
    const bestMove = alphaBeta(this.bot);
    return bestMove;
  }
  newGame() {
    this.setState(this.baseState);
    this.bot = null;
  }
  initAI() {
    this.bot = new TicTacToe(this.state.robot);
    console.log(this.bot);
  }
  pickTile() {
    if (!this.state.robot) {
      return (
        <div style={{"marginTop":10,"width":190}} className="d-flex flex-column">
          <div><strong>Pick Your Tile</strong></div>
          <div className="tileSelectionMenu">
            <div className="tileSelection">
              <span>Go first:</span>
              <span className="btn btn-secondary"
              onClick={()=>{this.setState({robot: "O", human: "X"})}}>
                <b>X</b>
              </span>
            </div>
            <div className="tileSelection">
              <span>Go second:</span>
              <span className="btn btn-secondary"
              onClick={()=>{this.setState({robot: "X", human: "O"})}}>
                <b>O</b>
              </span>
            </div>
          </div>
        </div>
      )
    }
  }
  render() {
    if (this.bot === null && this.state.robot !== null) {
      this.initAI();
    }
    const names = {
      playerOne: this.state.robot === 'X' ? 'Robot' : 'Human',
      playerTwo: this.state.robot === 'O' ? 'Robot' : 'Human'
    }
    return (
      <div>
        <GameContainer
          ready={this.state.robot !== null}
          names={names}
          robot={{
            makeAIMove: i => this.makeAIMove(i),
            turn: this.state.robot
          }}
          newGame={() => this.newGame()}/>
        <div className="d-flex justify-content-center">{this.pickTile()}</div>
      </div>
    )
  }
}

export default RobotGame
