import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { TaskType, FilterValueType } from './App'

type PropsType = {
	title: string
	tasks: Array<TaskType>
	removeTask: (taskId: string) => void
	changeFilter: (value: FilterValueType) => void
	addTask: (title: string) => void
	changeTaskStatus: (id: string, isDone: boolean) => void
	filter: string
	selectedOll: (value: boolean)=> void
}

function TodoList(props: PropsType) {

	let [title, setTitle] = useState<string>("");
	let [error, setError] = useState<string | null>(null);

	const addTask = () => {
		if (title.trim() !== "") {
			props.addTask(title);
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

	const onAllClickHandler = () => props.changeFilter("all");
	const onActiveClickHandler = () => props.changeFilter("active");
	const onCompletedClickHandler = () => props.changeFilter("completed");

	const allSelectedHeandler = (e: ChangeEvent<HTMLInputElement> ) => {
			props.selectedOll(e.currentTarget.checked)
	}

	const isSelectedAll = props.tasks.filter(t => t.isDone).length === props.tasks.length
	// const isSelectedAll = props.tasks.every(t => t.isDone)

	return <div>
		<h3>{props.title}</h3>
		<div>
			<input
				value={title}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				className={error ? 'error' : ''}
			/>
			<button onClick={addTask}>+</button>
			<input type='checkbox' checked={isSelectedAll} onChange={allSelectedHeandler}/> <span>selected all</span>
			{error && <div className="error-message">{error}</div> }
		</div>
		<ul>
			{
				props.tasks.map(task => {

					const removeTask = () => {props.removeTask(task.id)}
					const onChangeHadler = (e: ChangeEvent<HTMLInputElement>) => {
						let newIsDone = e.currentTarget.checked
						props.changeTaskStatus(task.id, newIsDone)
					
					
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
