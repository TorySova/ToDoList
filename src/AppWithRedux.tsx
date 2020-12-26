import React, { useCallback, useEffect } from 'react';
import './App.css';
import AddItemForm from './AddItemForm';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper, LinearProgress } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AddTodoListAC, ChangeTodoListFilterAC, ChangeToodoListTitleAC, RemoveTodoListTC, setTodolistsAC, TodolistDomainType, FilterValuesType, fetchTodolistsThunkTS, AddTodoListTC, ChangeToodoListTitleTC } from './state/todoListReducer';
import { addTaskAC, changeTaskStatusAC, removeTaskAC, changeTaskTitleAC, addTaskTC, removeTaskTC, updateTaskStatusTC } from './state/tasksReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { TodoList } from './TodoList';
import { TaskStatuses, TaskType, todolistAPI } from './api/todolist-api';
import { RequestStatusType } from './app/app-reducer';
import { ErrorSnackbar } from './components/ErrorSnackbar';


export type TaskStateType = {
	[key: string]: Array<TaskType>
}

function AppWithRedux() {

	console.log('App is called')
	const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
	let task =  useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
	const status = useSelector<AppRootStateType , RequestStatusType>((state) => state.app.status)
	let dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchTodolistsThunkTS())
	}, [])

	const changeFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
		const action = ChangeTodoListFilterAC(filter, todoListID)
		dispatch(action)
	}, [dispatch])

	const removeTask = useCallback((taskId: string, todoListID: string) => {
		
		dispatch(removeTaskTC(taskId, todoListID))
	}, [dispatch])

	const addTack = useCallback((title: string, todoListID: string) => {
		dispatch( addTaskTC(title, todoListID))
	}, [dispatch])

	const changeStatus = useCallback((taskId: string, status: TaskStatuses, todoListID: string) => {		
		dispatch(updateTaskStatusTC(taskId, status, todoListID))
	}, [dispatch])

	const addTodoList = useCallback((title: string) => {
		const action = AddTodoListTC(title)
		dispatch(action)
	}, [dispatch])

	const removeTodoList = useCallback((todoListID: string) => {
		const action = RemoveTodoListTC(todoListID)
		dispatch(action)
	}, [dispatch])

	const changeTaskitle = useCallback((id: string, title: string, todoListID: string) => {
		const action = changeTaskTitleAC(id, title, todoListID)
		dispatch(action)
	}, [dispatch])

	const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
		const action = ChangeToodoListTitleTC(todoListID, newTitle)
		dispatch(action)
	}, [dispatch])


	return (
		<div className="App">
			<ErrorSnackbar/>
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
				<Grid container style={{ padding: "15px 0px 15px 0px" }}>
					<AddItemForm addItem={addTodoList} />
				</Grid>
				<Grid container spacing={2}>
					{
						todoLists.map(tl => {
							let tasksForTodoList = task[tl.id];
							
							return (
								<Grid item key={tl.id}>
									<Paper style={{ padding: "10px" }} elevation={3}>
										<TodoList
											id={tl.id}
											title={tl.title}
											entityStatus={tl.entityStatus}
											tasks={tasksForTodoList}
											removeTask={removeTask}
											changeFilter={changeFilter}
											addTask={addTack}
											changeTaskStatus={changeStatus}
											filter={tl.filter}
											removeTodoList={removeTodoList}
											changeTaskTitle={changeTaskitle}
											changeTodoListTitle={changeTodoListTitle}
										/>
									</Paper>
								</Grid>
							);
						})
					}
				</Grid>
			</Container>
		</div>
	);
}



export default AppWithRedux;
