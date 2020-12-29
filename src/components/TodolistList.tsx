import React, { useCallback, useEffect } from 'react';
import AddItemForm from '../common/AddItemForm';
import { Grid, Paper } from '@material-ui/core';
import { ChangeTodoListFilterAC, RemoveTodoListTC, TodolistDomainType, FilterValuesType, fetchTodolistsThunkTS, AddTodoListTC, ChangeToodoListTitleTC } from '../state/todoListReducer';
import { changeTaskTitleAC, addTaskTC, removeTaskTC, updateTaskStatusTC, TaskStateType } from '../state/tasksReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { TodoList } from '../components/TodoList';
import { TaskStatuses } from '../api/todolist-api';

type PropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<PropsType> = ({demo = false}) => {
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
	let task =  useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
	
	let dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchTodolistsThunkTS())
	}, [])

	const changeFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
		const action = ChangeTodoListFilterAC(filter, todoListID)
		dispatch(action)
	}, [dispatch])

	const removeTask = useCallback((taskId: string, todoListID: string) => {
		
		dispatch(removeTaskTC(taskId, todoListID))
	}, [dispatch])

	const addTack = useCallback((title: string, todoListID: string) => {
		dispatch( addTaskTC(title, todoListID))
	}, [dispatch])

	const changeStatus = useCallback((taskId: string, status: TaskStatuses, todoListID: string) => {		
		dispatch(updateTaskStatusTC(taskId, status, todoListID))
	}, [dispatch])

	const addTodoList = useCallback((title: string) => {
		const action = AddTodoListTC(title)
		dispatch(action)
	}, [dispatch])

	const removeTodoList = useCallback((todoListID: string) => {
		const action = RemoveTodoListTC(todoListID)
		dispatch(action)
	}, [dispatch])

	const changeTaskitle = useCallback((id: string, title: string, todoListID: string) => {
		const action = changeTaskTitleAC(id, title, todoListID)
		dispatch(action)
	}, [dispatch])

	const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
		const action = ChangeToodoListTitleTC(todoListID, newTitle)
		dispatch(action)
	}, [dispatch])
    return (
        <div>
           <Grid container style={{ padding: "15px 0px 15px 0px" }}>
					<AddItemForm addItem={addTodoList} />
				</Grid>
				<Grid container spacing={2}>
					{
						todoLists.map(tl => {
							let tasksForTodoList = task[tl.id];
							
							return (
								<Grid item key={tl.id}>
									<Paper style={{ padding: "10px" }} elevation={3}>
										<TodoList
											id={tl.id}
											title={tl.title}
											entityStatus={tl.entityStatus}
											tasks={tasksForTodoList}
											removeTask={removeTask}
											changeFilter={changeFilter}
											addTask={addTack}
											changeTaskStatus={changeStatus}
											filter={tl.filter}
											removeTodoList={removeTodoList}
											changeTaskTitle={changeTaskitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                            demo={demo}
										/>
									</Paper>
								</Grid>
							);
						})
					}
				</Grid> 
        </div>
    )
}


