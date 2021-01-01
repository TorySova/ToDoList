import React, { useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, LinearProgress, CircularProgress } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { initializeAppTC, RequestStatusType } from './app-reducer';
import { ErrorSnackbar } from '../common/ErrorSnackbar';
import { TodolistList } from '../components/TodolistList';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Login } from '../features/Login';
import { logoutTC } from '../features/auth-reducer';

type PropsType = {
	demo?: boolean
}

function App({ demo = false }: PropsType) {
	const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
	const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)
	const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
	let dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeAppTC())
	}, [])

	if (!isInitialized) {
        return <div
            style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
            <CircularProgress />
        </div>
    }

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
					{isLoggedIn && <Button color="primary" onClick={() => dispatch(logoutTC())}>log out</Button>}
				</Toolbar>
				{status === 'loading' && <LinearProgress />}
			</AppBar>
			<Container fixed>
				<Switch>
					<Route exact path={'/'} render={() => <TodolistList demo={demo} />} />
					<Route path={'/login'} render={() => <Login />} />

					<Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>} />
					<Redirect from={'*'} to={'/404'} />
				</Switch>
			</Container>
		</div>
	);
}



export default App;
