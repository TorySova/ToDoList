import React, { ChangeEvent, useCallback } from 'react';
import { TaskType, FilterValueType, TodoListType } from './App'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import { IconButton, Button, Checkbox } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Task } from './Task'
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	changeFilter: (value: FilterValueType, todoListId: string) => void
	addTask: (title: string, todoListID: string) => void
	removeTask: (taskId: string, todoListID: string) => void
	changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
	changeTaskTitle: (id: string, title: string, todoListID: string) => void
	filter: string
	removeTodoList: (todoListID: string) => void
	changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
	console.log('TodoList is called')

	const addTask = useCallback((title: string) => {
		props.addTask(title, props.id);
	}, [props.addTask, props.id])

	const changeTodoListTitle = useCallback((title: string) => {
		props.changeTodoListTitle(props.id, title);
	}, [props.changeTodoListTitle, props.id])

	const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
	const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
	const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

	let tasksForTodoList = props.tasks;
	if (props.filter === "active") {
		tasksForTodoList = props.tasks.filter(tl => tl.isDone === false)
	}
	if (props.filter === "completed") {
		tasksForTodoList = props.tasks.filter(tl => tl.isDone === true)
	}

	return <div>
		<h3>
			<EditableSpan value={props.title} changeValue={changeTodoListTitle} />
			{/* <button onClick={() => { props.removeTodoList(props.id) }} >X</button> */}
			<IconButton onClick={() => { props.removeTodoList(props.id) }}>
				<Delete />
			</IconButton>
		</h3>
		<AddItemForm addItem={addTask} />
		<div>
			{
				props.tasks.map(task => <Task
					changeTaskStatus={props.changeTaskStatus}
					removeTask={props.removeTask}
					task={task}
					changeTaskTitle={props.changeTaskTitle}
					todoListId={props.id}
					key={task.id} />)
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
})


