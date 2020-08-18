import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { TaskType, FilterValueType } from './App'

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	removeTask: (taskId: string, todoListID: string ) => void
	changeFilter: (value: FilterValueType, todoListId: string) => void
	addTask: (title: string, todoListID: string) => void
	changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
	filter: string
	removeTodoList: (todoListID: string) => void
}

function TodoList(props: PropsType) {

	let [title, setTitle] = useState<string>("");
	let [error, setError] = useState<string | null>(null);

	const addTask = () => {
		if (title.trim() !== "") {
			props.addTask(title, props.id);
			setTitle("")
		}else {
			setError("error")
		}
	};

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	};

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.key === "Enter") {
			addTask();
		}
	};

	const onAllClickHandler = () => props.changeFilter("all", props.id);
	const onActiveClickHandler = () => props.changeFilter("active", props.id);
	const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

	return <div>
		<h3>{props.title} <button onClick={() => {props.removeTodoList(props.id)}} >x</button></h3>
		<div>
			<input
				value={title}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				className={error ? 'error' : ''}
			/>
			<button onClick={addTask}>+</button>
			{error && <div className="error-message">{error}</div> }
		</div>
		<ul>
			{
				props.tasks.map(task => {

					const removeTask = () => {props.removeTask(task.id, props.id)}
					const onChangeHadler = (e: ChangeEvent<HTMLInputElement>) => {
						let newIsDone = e.currentTarget.checked
						props.changeTaskStatus(task.id, newIsDone, props.id)
					
					
					}
					return (
						<li key={task.id} className={task.isDone ? 'is-done' : ''}>
							<input type="checkbox" checked={task.isDone} onChange={onChangeHadler}/>
							<span>{task.title}</span>
							<button onClick={removeTask}>x</button>
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
