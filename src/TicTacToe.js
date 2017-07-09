export class TicTacToe {
  constructor(robotTile) {
    this.board = [];
    this.robotTile = robotTile;
    this.humanTile = robotTile === 'X' ? 'O' : 'X';
  }
  getMoves() {
    return this.board.reduce((acc,val,ind) => {
      return val === null ? acc.concat(ind) : acc;
    },[])
  }
  isTerminal() {
    if (this.getMoves().length === 0) {
      return true;
    }
    return this.getScore() !== 0;
  }
  getScore() {
    const squares = this.board;
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
      [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    // Check if the played move has created a line.
    let result = false;
    for (let i=0, line; i < lines.length; i++) {
      line = lines[i];
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        result = squares[a];
        break;
      }
    }
    if (result) {
      return result === this.robotTile ? -1 : 1;
    }
    return 0
  }
  getNext(move, player) {
    if (player === 'max') {
      player = this.humanTile;
    } else {
      player = this.robotTile;
    }
    const nextState = new TicTacToe(this.robotTile);
    nextState.board = this.board.slice();
    nextState.board[move] = player;

    return nextState;
  }
}

export const alphaBeta = (state) => {
  return minValue(state, -100000, 100000, true);
}

const maxValue = (state, alpha, beta, isFirst = false) => {
  if (state.isTerminal()) {
    return state.getScore();
  }
  const moves = state.getMoves('max');
  let v = -100000, bestMove = moves[0];
  for (let i=0, min; i < moves.length; i++) {
    min = minValue(state.getNext(moves[i], 'max', alpha, beta, false));
    if (min > v) {
      v = min;
      bestMove = moves[i];
    }
    if (v >= beta) {
      if (isFirst) {
        return moves[i];
      }
      return v;
    }
    if (v > alpha) {
      alpha = v;
    }
  }
  if (isFirst) {
    return bestMove;
  } else {
    return v;
  }
}

const minValue = (state, alpha, beta, isFirst) => {
  if (state.isTerminal()) {
    return state.getScore();
  }
  const moves = state.getMoves('min');
  let v = 100000, bestMove = moves[0];
  for (let i=0, max; i < moves.length; i++) {
    max = maxValue(state.getNext(moves[i], 'min', alpha, beta, false));
    if (max < v) {
      v = max;
      bestMove = moves[i];
    }
    if (v <= alpha) {
      if (isFirst) {
        return moves[i];
      }
      return v;
    }
    if (v < beta) {
      beta = v;
    }
  }
  if (isFirst) {
    return bestMove;
  } else {
    return v;
  }
}
