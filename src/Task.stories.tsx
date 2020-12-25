import React from 'react';
import {action} from '@storybook/addon-actions';
import { Meta } from '@storybook/react/types-6-0';
import { Task } from './Task';
import { TaskPriorities, TaskStatuses } from './api/todolist-api';

export default {
	title: 'Task Component',
	component: Task,
} as Meta;

const removeCallback = action('Remove Button Task cliked');
const changeStatusCallback = action('Status chenged inside Task');
const changeTitleCallback = action('Titile chenged inside Task');

export const TaskBaseExample = () => {
	return <>
	<Task
		changeTaskStatus={changeStatusCallback}
		removeTask={removeCallback}
		task={{id: '1', status: TaskStatuses.Completed, title: "CSS", todoListId: "todolistId1", description: '',
		startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}}
		changeTaskTitle={changeTitleCallback}
		todoListId={'todoListId1'} />
	<Task
		changeTaskStatus={changeStatusCallback}
		removeTask={removeCallback}
		task={{id: '2', status: TaskStatuses.Completed, title: "CSS", todoListId: "todolistId1", description: '',
		startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}}
		changeTaskTitle={changeTitleCallback}
		todoListId={'todoListId2'} />
	</>
}