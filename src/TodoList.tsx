import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { TaskType, FilterValueType } from './App'

type PropsType = {
	title: string
	tasks: Array<TaskType>
	removeTask: (taskId: string) => void
	changeFilter: (value: FilterValueType) => void
	addTask: (title: string) => void
}

function TodoList(props: PropsType) {

	let [title, setTitle] = useState<string>("");

	const addTask = () => {
		if (title !== "") {
			props.addTask(title);
			setTitle("")
		}
	};

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	};

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			addTask()
		}
	};

	const onAllClickHandler = () => props.changeFilter("all");
	const onActiveClickHandler = () => props.changeFilter("active");
	const onCompletedClickHandler = () => props.changeFilter("completed");

	return <div>
		<h3>{props.title}</h3>
		<div>
			<input
				value={title}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
			/>
			<button onClick={addTask}>add</button>
		</div>
		<ul>
			{
				props.tasks.map(task => {
					const removeTask = () => {
						props.removeTask(task.id)
					}
					return (
						<li key={task.id}>
							<input type="checkbox" checked={task.isDone} />
							<span>{task.title}</span>
							<button onClick={removeTask}>x</button>
						</li>)
				})
			}
		</ul>
		<div>
			<button onClick={onAllClickHandler}>All</button>
			<button onClick={onActiveClickHandler}>Active</button>
			<button onClick={onCompletedClickHandler}>Completed</button>
		</div>
	</div>
}

export default TodoList;
