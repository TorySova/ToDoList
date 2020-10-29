import React, { useCallback } from 'react';
import './App.css';
import AddItemForm from './AddItemForm';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AddTodoListAC, ChangeTodoListFilterAC, ChangeToodoListTitleAC, RemoveTodoListAC } from './state/todoListReducer';
import { addTaskAC, changeTaskStatusAC, removeTaskAC, changeTaskTitleAC } from './state/tasksReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { TodoList } from './TodoList';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
};

export type FilterValueType = "all" | "active" | "completed";

export type TodoListType = {
	id: string
	title: string
	filter: FilterValueType
}

export type TaskStateType = {
	[key: string]: Array<TaskType>
}

function AppWithRedux() {

	console.log('App is called')
	const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
	let task =  useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

	let dispatch = useDispatch()

	const changeFilter = useCallback((filter: FilterValueType, todoListID: string) => {
		const action = ChangeTodoListFilterAC(filter, todoListID)
		dispatch(action)
	}, [dispatch])

	const removeTask = useCallback((taskId: string, todoListID: string) => {
		const action = removeTaskAC(taskId, todoListID)
		dispatch(action)
	}, [dispatch])

	const addTack = useCallback((title: string, todoListID: string) => {
		dispatch( addTaskAC(title, todoListID))
	}, [dispatch])

	const changeStatus = useCallback((taskId: string, isDone: boolean, todoListID: string) => {
		const action = changeTaskStatusAC(taskId, isDone, todoListID)
		dispatch(action)
	}, [dispatch])

	const addTodoList = useCallback((title: string) => {
		const action = AddTodoListAC(title)
		dispatch(action)
	}, [dispatch])

	const removeTodoList = useCallback((todoListID: string) => {
		const action = RemoveTodoListAC(todoListID)
		dispatch(action)
	}, [dispatch])

	const changeTaskitle = useCallback((id: string, title: string, todoListID: string) => {
		const action = changeTaskTitleAC(id, title, todoListID)
		dispatch(action)
	}, [dispatch])

	const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
		const action = ChangeToodoListTitleAC(todoListID, newTitle)
		dispatch(action)
	}, [dispatch])


	return (
		<div className="App">
			<AppBar position="static" color="inherit">
				<Toolbar>
					<IconButton edge="start" color="primary" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6">
						TodoLists
    				</Typography>
					<Button color="primary">Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container style={{ padding: "10px 0px 10px 0px" }}>
					<AddItemForm addItem={addTodoList} />
				</Grid>
				<Grid container spacing={3}>
					{
						todoLists.map(tl => {
							let tasksForTodoList = task[tl.id];
							
							return (
								<Grid item key={tl.id}>
									<Paper style={{ padding: "10px" }} elevation={3}>
										<TodoList
											id={tl.id}
											title={tl.title}
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
