import React, { Component } from 'react';

class MovesList extends Component {
    constructor() {
        super();
        this.state = {
            ascending: false,
            expanded: false,
            listHeight: null
        }
    }
    toggleExpand() {
        const bool = this.state.expanded;
        this.setState({
            expanded: !bool
        })
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
                        ▲
                </span>
                <span onClick={() => this.handleClick(false)}>
                    <input
                        onChange={() => this.handleClick(false)}
                        type="radio"
                        checked={!this.state.ascending} />
                        ▼
                </span>
            </span>
        )
    }
    mapList() {
        function gridr(oldArr, curArr) {
            var i, row = 1;
            oldArr.forEach(function(item,index){
                if (item !== curArr[index]) {
                    i = index +1
                    while(i > 3) {
                        i -=  3;
                        row++
                    }
                }
            });
            return `(${row},${i})`
        }
        const entryHTML = (move,desc) => {
            let onClicker;
            if (move === this.props.stepNumber) {
                desc = <b>{desc}</b>;
                onClicker = () => () => this.toggleExpand();
            }
            return (
                <div key={move}>
                    <span className="btn btn-secondary" onClick={onClicker ?
                        onClicker() :
                        ()=>this.props.jumpTo(move)}>
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
    render() {
        const isOpen = this.state.expanded;
        const roll = isOpen === null ? "null" : isOpen ? "rollout" : "rollin";
        const direction = this.state.ascending;
        const List = this.mapList();
        const headLength = Math.min(List.length,6)*-1;
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
