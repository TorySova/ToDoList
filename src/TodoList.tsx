import React, { ChangeEvent } from 'react';
import { TaskType, FilterValueType } from './App'
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

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
			<button onClick={() => { props.removeTodoList(props.id) }} >X</button>
		</h3>
		<AddItemForm addItem={addOneTask} />
		<ul>
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
						<li key={task.id} className={task.isDone ? 'is-done' : ''}>
							<input type="checkbox" checked={task.isDone} onChange={onChangeHadler} />
							<EditableSpan value={task.title} changeValue={changeTaskTitle} />
							<button onClick={removeTask}>X</button>
						</li>)
				})
			}
		</ul>
		<div>
			<button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
			<button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
			<button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
		</div>
	</div>
}

export default TodoList;
