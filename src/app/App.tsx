import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper, LinearProgress } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { TaskType } from '../api/todolist-api';
import { RequestStatusType } from './app-reducer';
import { ErrorSnackbar } from '../common/ErrorSnackbar';
import { TodolistList } from '../components/TodolistList';
import { Route, Switch } from 'react-router-dom';
import { Login } from '../features/Login';


// export type TaskStateType = {
// 	[key: string]: Array<TaskType>
// }
type PropsType = {
	demo?: boolean
}

function App({ demo = false }: PropsType) {
	const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

	return (
		<div className="App">
			<ErrorSnackbar />
			<AppBar position="sticky" color="inherit" >
				<Toolbar>
					<IconButton edge="start" color="primary" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6">
						TodoLists
    				</Typography>
					<Button color="primary">Login</Button>
				</Toolbar>
				{status === 'loading' && <LinearProgress />}
			</AppBar>
			<Container fixed>
				<Switch>
					<Route exact path={'/'} render={() => <TodolistList demo={demo} />} />
					<Route path={'/login'} render={() => <Login />} />
					<Route path={'*'} render={() => <h1>404: PAGE NOT FOUND</h1>} />
				</Switch>
			</Container>
		</div>
	);
}



export default App;
