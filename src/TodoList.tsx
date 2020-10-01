import React, { ChangeEvent } from 'react';
import { TaskType, FilterValueType, TodoListType } from './App'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import { IconButton, Button, Checkbox } from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	removeTask: (taskId: string, todoListID: string) => void
	changeFilter: (value: FilterValueType, todoListId: string) => void
	addTask: (title: string, todoListID: string) => void
	changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
	filter: string
	removeTodoList: (todoListID: string) => void
	changeTaskTitle: (id: string, title: string, todoListID: string) => void
	changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

function TodoList(props: PropsType) {

	// let todos = useSelector<AppRootStateType, TodoListType>(state => state.todolists[+props.id])

	const addOneTask = (title: string) => {
		props.addTask(title, props.id);
	}

	const changeTodoListTitle = (title: string) => {
		props.changeTodoListTitle(props.id, title);
	}

	const onAllClickHandler = () => props.changeFilter("all", props.id);
	const onActiveClickHandler = () => props.changeFilter("active", props.id);
	const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

	return <div>
		<h3>
			<EditableSpan value={props.title} changeValue={changeTodoListTitle} />
			{/* <button onClick={() => { props.removeTodoList(props.id) }} >X</button> */}
			<IconButton onClick={() => { props.removeTodoList(props.id) }}>
				<Delete/>
			</IconButton>
		</h3>
		<AddItemForm addItem={addOneTask} />
		<div>
			{
				props.tasks.map(task => {
					const removeTask = () => { props.removeTask(task.id, props.id) }
					const onChangeHadler = (e: ChangeEvent<HTMLInputElement>) => {
						let newIsDone = e.currentTarget.checked
						props.changeTaskStatus(task.id, newIsDone, props.id)
					}
					const changeTaskTitle = (title: string) => {
						props.changeTaskTitle(task.id, title, props.id)
					}
					return (
						<div key={task.id} className={task.isDone ? 'is-done' : ''}>
							<Checkbox color="primary" checked={task.isDone} onChange={onChangeHadler} />
							<EditableSpan value={task.title} changeValue={changeTaskTitle} />
							<IconButton onClick={removeTask} size="small">
								<Delete/>
							</IconButton>
						</div>)
				})
			}
		</div>
		<div>
			<Button variant={props.filter === 'all' ? 'outlined' : 'text'} 
					onClick={onAllClickHandler} 
					color="default"
					size="small">All</Button>
			<Button variant={props.filter === 'active' ? 'outlined' : 'text'}
					onClick={onActiveClickHandler}
					color="default"
					size="small">Active</Button>
			<Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
					onClick={onCompletedClickHandler}
					color="default"
					size="small">Completed</Button>
		</div>
	</div>
}

export default TodoList;
