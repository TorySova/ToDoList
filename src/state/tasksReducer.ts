import { AddTodolistActionType, RemoveTodolistActionType } from './todoListReducer';
import { TaskStateType } from './../App';
import { v1 } from 'uuid';

type ActionType = RemoveTaskActionType |
    AddTaskActionType | ChangeTaskStatusType|
    ChangeTaskTitleType | AddTodolistActionType|
    RemoveTodolistActionType
    
export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListID: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}
export type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todoListID: string
}
export type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todoListID: string
}

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType) => {
    let todoList;
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = { ...state };
            let todoList = copyState[action.todoListID];
            copyState[action.todoListID] = todoList.filter(t => t.id !== action.taskId);
            return copyState
        }
        case 'ADD-TASK': {
            let newTask = { id: v1(), title: action.title, isDone: false };
            let copyState = { ...state };
            let todoList = copyState[action.todoListID];
            todoList = [newTask, ...todoList]
            return { ...copyState, [action.todoListID]: todoList }
        }
        case 'CHANGE-TASK-STATUS': {
            let copyState = { ...state };
            todoList = copyState[action.todoListID]
                .map(task => {
                    if(task.id !== action.taskId){
                        return task
                    }else{
                    return {...task, isDone: action.isDone }
                    }
                })
                return { ...copyState, [action.todoListID]: todoList }
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.todoListID]: state[action.todoListID]
                .map(task => {
                    if(task.id !== action.taskId){
                        return task
                    } else {
                        return {...task, title: action.title }
                    }
                })}
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy     
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy  
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todoListID }
}
export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title: title, todoListID }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListID: string): ChangeTaskStatusType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListID }
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListID: string): ChangeTaskTitleType => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todoListID }
}



