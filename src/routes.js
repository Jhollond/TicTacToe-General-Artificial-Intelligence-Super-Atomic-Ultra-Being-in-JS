import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';

import App from './components/App';
import PostsIndex from './components/posts_index';
import HumanGame from './components/human_game';
import RobotGame from './components/robot_game';

const NotFound = () =>
	<div>
		<Link to="/">
			<span className="btn btn-secondary">
				Home
			</span>
		</Link>
		<h3>Welcome to TicTacToe</h3>
		<p>source is <span target="blank" href="havenotmaderepoyet.com">here</span></p>
	</div>

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ PostsIndex } />
    <Route path='game/HUMAN' component={HumanGame} />
    <Route path='game/ROBOT' component={RobotGame} />
		<Route path='*' component={NotFound} />
  </Route>
)
