import { Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, useCallback } from 'react';
import { TaskType } from './App';
import EditableSpan from './EditableSpan';

type TaskPropsType = {
	removeTask: (taskId: string, todoListID: string) => void
	changeTaskStatus: (id: string, isDone: boolean, todoListID: string) => void
	changeTaskTitle: (id: string, title: string, todoListID: string) => void
	task: TaskType
	todoListId: string
}

export const Task = React.memo((props: TaskPropsType) => {
	const removeTask = () => { props.removeTask(props.task.id, props.todoListId) }
	const onChangeHadler = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDone = e.currentTarget.checked
		props.changeTaskStatus(props.task.id, newIsDone, props.todoListId)
	}
	const changeTaskTitle = useCallback((title: string) => {
		props.changeTaskTitle(props.task.id, title, props.todoListId)
	}, [props.changeTaskTitle, props.task.id, props.todoListId])
	return (
		<div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
			<Checkbox color="primary" checked={props.task.isDone} onChange={onChangeHadler} />
			<EditableSpan value={props.task.title} changeValue={changeTaskTitle} />
			<IconButton onClick={removeTask} size="small">
				<Delete />
			</IconButton>
		</div>)
})
