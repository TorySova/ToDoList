import React, { useCallback, useEffect } from 'react';
import AddItemForm from '../common/AddItemForm';
import EditableSpan from '../common/EditableSpan';
import { IconButton, Button, Checkbox } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Task } from './Task'
import { TaskStatuses, TaskType } from '../api/todolist-api';
import { FilterValuesType } from '../state/todoListReducer';
import { fetchTasksTC } from '../state/tasksReducer';
import { useDispatch } from 'react-redux';
import { RequestStatusType } from '../app/app-reducer';

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	entityStatus: RequestStatusType
	changeFilter: (value: FilterValuesType, todoListId: string) => void
	addTask: (title: string, todoListID: string) => void
	removeTask: (taskId: string, todoListID: string) => void
	changeTaskStatus: (id: string, status: TaskStatuses, todoListID: string) => void
	changeTaskTitle: (id: string, title: string, todoListID: string) => void
	filter: string
	removeTodoList: (todoListID: string) => void
	changeTodoListTitle: (todoListID: string, newTitle: string) => void
	demo?: boolean

}

export const TodoList = React.memo(function ({demo = false, ...props}: PropsType) {
	console.log('TodoList is called')
	const dispatch = useDispatch()
	useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

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
		tasksForTodoList = props.tasks.filter(tl => tl.status === TaskStatuses.New)
	}
	if (props.filter === "completed") {
		tasksForTodoList = props.tasks.filter(tl => tl.status === TaskStatuses.Completed)
	}

	return <div>
		<h3>
			<EditableSpan value={props.title} changeValue={changeTodoListTitle} />
			<IconButton onClick={() => { props.removeTodoList(props.id) }}
				disabled={props.entityStatus === 'loading'}>
				<Delete />
			</IconButton>
		</h3>
		<AddItemForm addItem={addTask} />
		<div>
			{
				tasksForTodoList.map(task => <Task
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


