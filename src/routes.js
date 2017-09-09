import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './components/App';
import PostsIndex from './components/posts_index';
import HumanGame from './components/human_game';
import RobotGame from './components/robot_game';
import NavButtons from './components/buttons_nav';

const NotFound = () => (
	<div>
    <NavButtons include="home"/>
		{window.setTimeout(()=>{
			window.location = "/"
		}, 1000)}
		<h3>Welcome to TicTacToe</h3>
		<p>source is <a
			target="blank"
								 href="https://github.com/Jhollond/TicTacToe-General-Artificial-Intelligence-Super-Atomic-Ultra-Being-in-JS">
           here
      </a>
    </p>
	</div>
)
export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ PostsIndex } />
    <Route path='game/HUMAN' component={HumanGame} />
    <Route path='game/ROBOT' component={RobotGame} />
		<Route path='*' component={NotFound} />
  </Route>
)
