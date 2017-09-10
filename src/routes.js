import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './components/App';
import PostsIndex from './components/posts_index';
import HumanGame from './components/human_game';
import RobotGame from './components/robot_game';

export default (
	<Route path='/' component={ App }>
    <IndexRoute component={ PostsIndex } />
		<Route path='/game/HUMAN' component={HumanGame} />
		<Route path='/game/ROBOT' component={RobotGame} />
		<Redirect path="*" to="/"/>
	</Route>
)
