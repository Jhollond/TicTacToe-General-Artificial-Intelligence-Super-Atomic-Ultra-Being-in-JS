import React from 'react';
import { Link } from 'react-router';

const PostsIndex = () => {
  const gameMode =(post,key) => {
    return (
      <li className="list-group-item" key={key}>
        <Link to={"/game/"+post.title} style={{width: "100%"}}>
          <div className="gameSelect">
            <span><strong>{post.title}</strong></span>
            <span>{post.categories}</span>
          </div>
        </Link>
      </li>
    )
  }
  const modes = [
    {
      categories: "You versus the Computer",
      title: "ROBOT",
    },
    {
      categories: "You versus another Human",
      title: "HUMAN"
    }
  ]
  return (
    <div>
      <h3>Pick a gamemode</h3>
      <ul className="list-group d-flex">
        {modes.map((modeData, key) => gameMode(modeData, key))}
      </ul>
      <p>source is <a
  			target="blank"
                   href="https://github.com/Jhollond/TicTacToe-General-Artificial-Intelligence-Super-Atomic-Ultra-Being-in-JS">
        here
      </a>
      </p>
    </div>
  )
}

export default PostsIndex;
