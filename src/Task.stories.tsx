import React from 'react';
import {action} from '@storybook/addon-actions';
import { Meta } from '@storybook/react/types-6-0';
import { Task } from './Task';

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
		task={{ id: '1', title: "js", isDone: false }}
		changeTaskTitle={changeTitleCallback}
		todoListId={'todoListId1'} />
	<Task
		changeTaskStatus={changeStatusCallback}
		removeTask={removeCallback}
		task={{ id: '2', title: "css", isDone: true }}
		changeTaskTitle={changeTitleCallback}
		todoListId={'todoListId2'} />
	</>
}