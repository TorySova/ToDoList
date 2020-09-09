import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import { v1 } from "uuid";
import AddItemForm from './AddItemForm';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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

type TaskStateType = {
	[key: string]: Array<TaskType>
}

function App() {

	let todolistID1 = v1();
	let todolistID2 = v1();

	let [todoLists, setTodolists] = useState<Array<TodoListType>>([
		{ id: todolistID1, title: 'One', filter: 'all' },
		{ id: todolistID2, title: 'Two', filter: 'all' },
	])

	let [tasks, setTasks] = useState<TaskStateType>({
		[todolistID1]: [
			{ id: v1(), title: "js", isDone: false },
			{ id: v1(), title: "css", isDone: false },
			{ id: v1(), title: "react", isDone: false },
			{ id: v1(), title: "redux", isDone: false }
		],
		[todolistID2]: [
			{ id: v1(), title: "Dog", isDone: true },
			{ id: v1(), title: "Cat", isDone: false },
			{ id: v1(), title: "Pig", isDone: false },
			{ id: v1(), title: "Horse", isDone: true }
		],
	})


	function changeFilter(filter: FilterValueType, todoListID: string) {
		let todoList = todoLists.find(tl => tl.id === todoListID);
		if (todoList) {
			todoList.filter = filter;
			setTodolists([...todoLists])
		}
	}

	function removeTask(taskId: string, todoListID: string) {
		let todoList = tasks[todoListID];
		tasks[todoListID] = todoList.filter(t => t.id !== taskId);
		setTasks({ ...tasks })
	}

	function addTack(title: string, todoListID: string) {
		let newTask = { id: v1(), title: title, isDone: false };
		let todoList = tasks[todoListID];
		tasks[todoListID] = [newTask, ...todoList]
		setTasks({ ...tasks })
	}

	function changeStatus(id: string, isDone: boolean, todoListID: string) {
		let todoList = tasks[todoListID];
		let task = todoList.find(t => t.id === id)
		if (task) {
			task.isDone = isDone
			setTasks({ ...tasks })
		}
	}

	function addTodoList(title: string) {
		let newTodoListID = v1();//генерим новый aйди
		let newTodoList: TodoListType = { //тип листа
			id: newTodoListID,
			title: title,
			filter: "all"
		};
		setTodolists([newTodoList, ...todoLists]) //добавляем лист 
		setTasks({  //в масиве тасок новый таски
			...tasks,
			[newTodoListID]: [] //доп.новое свойство
		})
	}

	function removeTodoList(todoListID: string) {
		let newTodoLists = todoLists.filter(tl => tl.id !== todoListID);
		setTodolists(newTodoLists);
		delete tasks[todoListID]
		setTasks({ ...tasks })
	}

	function changeTaskitle(id: string, title: string, todoListID: string) {
		let todoList = tasks[todoListID];
		let task = todoList.find(t => t.id === id)
		if (task) {
			task.title = title
			setTasks({ ...tasks })
		}
	}

	function changeTodoListTitle(todoListID: string, newTitle: string) {
		const todoList = todoLists.find(tl => tl.id === todoListID);
		if (todoList) {
			todoList.title = newTitle;
			setTodolists([...todoLists])
		}
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
							let tasksForTodoList = tasks[tl.id];
							if (tl.filter === "active") {
								tasksForTodoList = tasks[tl.id].filter(tl => tl.isDone === false)
							}
							if (tl.filter === "completed") {
								tasksForTodoList = tasks[tl.id].filter(tl => tl.isDone === true)
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



export default App;
