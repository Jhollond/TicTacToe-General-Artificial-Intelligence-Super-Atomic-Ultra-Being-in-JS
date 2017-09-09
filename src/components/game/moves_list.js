import React, { Component } from 'react';

class MovesList extends Component {
  constructor() {
    super();
    this.state = {
      ascending: false,
      expanded: false,
      listHeight: null,
    }
    this.timer = null;
  }
  toggleExpand(check, isUpdate = false) {
    window.clearTimeout(this.timer);
    this.timer = false;
    let shouldOpen = false;
    if (this.props.history.length > 4 &&
      check <= this.props.history.length - 4) {
      shouldOpen = true;
    }
    if (shouldOpen) {
      this.setState({expanded: true})
      if (check >= this.props.history.length - 4) {
        this.timer = window.setTimeout(() => {
          this.setState({expanded: false})
        },4444);
      }
    } else {
      this.timer = window.setTimeout(() => {
        this.setState({expanded: false})
      },4444);
    }
  }
  handleClick(bool) {
    if (this.state.ascending === bool ) {
      return
    }
    this.setState({
      ascending: bool
    })
  }
  orderMain(roll) {
    return (
      <span className={roll}>
        <span onClick={() => this.handleClick(true)}>
          <input
            onChange={() => this.handleClick(true)}
            type="radio"
            checked={this.state.ascending} />
          {"\t"}down
        </span>
        <span onClick={() => this.handleClick(false)}>
          <input
            onChange={() => this.handleClick(false)}
            type="radio"
            checked={!this.state.ascending} />
          {"\t"}up
        </span>
      </span>
    )
  }
  mapList() {
    const gridr = (oldArr, curArr) => {
      const boardLen = this.props.boardSize
      let i, row = 0;
      oldArr.forEach(function(item,index){
        if (item !== curArr[index]) {
          i = index
          while(i > boardLen) {
            i -=  boardLen;
            row++
          }
        }
      });
      return `(${row},${i})`
    }
    const entryHTML = (move,desc) => {
      if (move === this.props.stepNumber) {
        desc = <b>{desc}</b>;
      }
      return (
        <div key={move}>
          <span className="btn btn-secondary p-1"
            onClick={()=>{
              this.toggleExpand(move);
              this.props.jumpTo(move)}}>
            {desc}
          </span>
        </div>
      )
    }
    const listEntry = (step,move) => {
      let Coord = gridr(this.props.history[move-1].squares,step.squares);
      return `${move}. ${move%2?'X':'O'} moves ${Coord}`;
    }
    const gameStart = entryHTML(0,'Game Start');
    var list = [gameStart];
    return this.props.history.reduce((acc,step,move) => {
      if (!move) {return acc}
      const desc =  listEntry(step,move);
      return acc.concat( entryHTML(move,desc) );
    },list);
  }
  componentDidUpdate(e) {
    if (this.state.expanded && !this.timer &&
      this.props.stepNumber > this.props.history.length - 4) {
      this.toggleExpand(this.props.stepNumber, true);
    }
  }
  render() {
    const isOpen = this.state.expanded;
    const roll = isOpen === null ? "null" : isOpen ? "rollout" : "rollin";
    const direction = this.state.ascending;
    const List = this.mapList();
    const headLength = Math.min(List.length,4)*-1;
    const head = (b) => {
      const list1st = List.slice(headLength);
      if(b) return direction ? list1st : list1st.reverse();
    };
    const main = List.slice(0,headLength);
    return (
      <div className="MovesList">
        {this.orderMain(roll)}
        {head(!direction)}
        <div ref="listMain" className={roll}>
          {direction ? main : main.reverse()}
        </div>
        {head(direction)}

      </div>
    )
  }
}
export default MovesList;
