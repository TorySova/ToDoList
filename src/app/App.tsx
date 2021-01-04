import React, { useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, LinearProgress, CircularProgress } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { initializeAppTC, RequestStatusType } from './app-reducer';
import { ErrorSnackbar } from '../common/ErrorSnackbar';
import { TodolistList } from '../components/TodolistList';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Login } from '../features/Login';
import { logoutTC } from '../features/auth-reducer';
import { Error404 } from '../components/Error404';

type PropsType = {
	demo?: boolean
}

function App({ demo = false }: PropsType) {
	const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
	const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)
	const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
	let dispatch = useDispatch()
	let history = useHistory()
	
	useEffect(() => {
		dispatch(initializeAppTC())
	}, [])

	const handleClick = () => {
		history.push("/");
	  }

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
					<Typography variant="h6" onClick={handleClick} >
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

					<Route render={() => <Error404/>} />
					
				</Switch>
			</Container>
		</div>
	);
}



export default App;
