import React from 'react';
import { Link } from 'react-router';

const PostsIndex = () => {
  const gameMode =(post,key) => {
    return (
      <li className="list-group-item" key={key}>
        <Link to={"/game/"+post.title} style={{width: "100%"}}>
          <div className="d-flex justify-content-between flex-row-reverse">
            <span>{post.categories}</span>
            <span><strong>{post.title}</strong></span>
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
    </div>
  )
}

export default PostsIndex;
