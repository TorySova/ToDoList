import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddItemForm from './AddItemForm';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AddTodoListAC, ChangeTodoListFilterAC, ChangeToodoListTitleAC, RemoveTodoListAC } from './state/todoListReducer';
import { addTaskAC, changeTaskStatusAC, removeTaskAC, changeTaskTitleAC } from './state/tasksReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';

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
	const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
	let task =  useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

	let dispatch = useDispatch()

	// let [todoLists, dispatchTodolists] = useReducer(todoListReducer, [
	// 	{ id: todolistID1, title: 'One', filter: 'all' },
	// 	{ id: todolistID2, title: 'Two', filter: 'all' },
	// ])

	// let [tasks, dispatchTasks] = useReducer(tasksReducer, {
	// 	[todolistID1]: [
	// 		{ id: v1(), title: "js", isDone: false },
	// 		{ id: v1(), title: "css", isDone: false },
	// 		{ id: v1(), title: "react", isDone: false },
	// 		{ id: v1(), title: "redux", isDone: false }
	// 	],
	// 	[todolistID2]: [
	// 		{ id: v1(), title: "Dog", isDone: true },
	// 		{ id: v1(), title: "Cat", isDone: false },
	// 		{ id: v1(), title: "Pig", isDone: false },
	// 		{ id: v1(), title: "Horse", isDone: true }
	// 	],
	// })


	function changeFilter(filter: FilterValueType, todoListID: string) {
		const action = ChangeTodoListFilterAC(filter, todoListID)
		dispatch(action)
	}

	function removeTask(taskId: string, todoListID: string) {
		const action = removeTaskAC(taskId, todoListID)
		dispatch(action)
	}

	function addTack(title: string, todoListID: string) {
		dispatch( addTaskAC(title, todoListID))
	}

	function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
		const action = changeTaskStatusAC(taskId, isDone, todoListID)
		dispatch(action)
	}

	function addTodoList(title: string) {
		const action = AddTodoListAC(title)
		dispatch(action)
	}

	function removeTodoList(todoListID: string) {
		const action = RemoveTodoListAC(todoListID)
		dispatch(action)

	}

	function changeTaskitle(id: string, title: string, todoListID: string) {
		const action = changeTaskTitleAC(id, title, todoListID)
		dispatch(action)
	}

	function changeTodoListTitle(todoListID: string, newTitle: string) {
		const action = ChangeToodoListTitleAC(todoListID, newTitle)
		dispatch(action)
	}

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
							if (tl.filter === "active") {
								tasksForTodoList = task[tl.id].filter(tl => tl.isDone === false)
							}
							if (tl.filter === "completed") {
								tasksForTodoList = task[tl.id].filter(tl => tl.isDone === true)
							}
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
