import React, { Component } from 'react';
import { Link } from 'react-router';

class PostsIndex extends Component {
    gameMode(post) {
        return (
            <li className="list-group-item">
                <Link to={"/game/"+post.title}>
                    <span className="pull-xs-right">{post.categories}</span>
                    <strong>{post.title}</strong>
                </Link>
            </li>
        )
    }
    vsComputer() {
        return (
            this.gameMode({
                categories: "You versus the computer",
                title: "ROBOT",
            })
        )
    }
    vsPlayer() {
        return (
            this.gameMode({
                categories: "You versus another Human",
                title: "HUMAN"
            })
        )
    }
    render() {
        return (
            <div>
                <h3>Pick a gamemode</h3>
                <ul className="list-group">
                    {this.vsPlayer()}
                    {this.vsComputer()}
                </ul>
            </div>
        );
    }
}

export default PostsIndex;
