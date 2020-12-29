import { Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent, useCallback } from 'react';
import { TaskStatuses, TaskType } from '../api/todolist-api';
import EditableSpan from '../common/EditableSpan';

type TaskPropsType = {
	removeTask: (taskId: string, todoListID: string) => void
	changeTaskStatus: (id: string, status: TaskStatuses, todoListID: string) => void
	changeTaskTitle: (id: string, title: string, todoListID: string) => void
	task: TaskType
	todoListId: string
}

export const Task = React.memo((props: TaskPropsType) => {
	const removeTask = () => { props.removeTask(props.task.id, props.todoListId) }
	const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todoListId)
	}, [props.task.id, props.todoListId]);
	
	const changeTaskTitle = useCallback((title: string) => {
		props.changeTaskTitle(props.task.id, title, props.todoListId)
	}, [props.changeTaskTitle, props.task.id, props.todoListId])
	return (
		<div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
			<Checkbox color="primary" checked={props.task.status === TaskStatuses.Completed} onChange={onChangeHandler} />
			<EditableSpan value={props.task.title} changeValue={changeTaskTitle} />
			<IconButton onClick={removeTask} size="small">
				<Delete />
			</IconButton>
		</div>)
})
