import { handleServerAppError, handleServerNetworkError } from './../utils/error-utils';
import { setAppStatusAC, setAppErrorAC } from '../app/app-reducer';
import { AppRootStateType } from './store';
import { TaskStatuses, TaskType, todolistAPI } from './../api/todolist-api';
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todoListReducer';
import { v1 } from 'uuid';
import { Dispatch } from 'redux';

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

type ActionType = RemoveTaskActionType |
    AddTaskActionType | ChangeTaskStatusType |
    ChangeTaskTitleType | AddTodolistActionType |
    RemoveTodolistActionType | SetTodolistsActionType | SetTasksActionType

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListID: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}
export type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todoListID: string
}
export type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todoListID: string
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
 }
 

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    let todoList;
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = { ...state };
            let todoList = copyState[action.todoListID];
            copyState[action.todoListID] = todoList.filter(t => t.id !== action.taskId);
            return copyState
        }
        case 'ADD-TASK': {
            let stateCopy = { ...state }
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todoListTasks = state[action.todoListID];
            state[action.todoListID] = todoListTasks
                .map(t => t.id === action.taskId
                    ? { ...t, status: action.status }
                    : t);
            return ({ ...state })
        }
        case 'CHANGE-TASK-TITLE': {
            let todoListTasks = state[action.todoListID];
            state[action.todoListID] = todoListTasks
                .map(t => t.id === action.taskId
                    ? { ...t, title: action.title }
                    : t);
            return ({ ...state })
        }
        case 'ADD-TODOLIST': {
            return { ...state, [action.todolist.id]: [] }
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = { ...state };
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
         }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
         }
         
         

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todoListID }
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return { type: 'ADD-TASK', task }
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListID: string): ChangeTaskStatusType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, status, todoListID }
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListID: string): ChangeTaskTitleType => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todoListID }
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
 }
 

 export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        })
 }
 
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))
            })
    }
 }
 export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const updateTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        // так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
        // те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if (task) {
            dispatch(setAppStatusAC('loading'))
            todolistAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            })
            
            .then(() => {
                const action = changeTaskStatusAC(taskId, status, todolistId)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error) => {
                handleServerNetworkError(error.message, dispatch)
            })
        }
    }
}
 


