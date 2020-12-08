import { TaskStatuses, TaskType } from './../api/todolist-api';
import { AddTodolistActionType, RemoveTodolistActionType } from './todoListReducer';
import { v1 } from 'uuid';

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

type ActionType = RemoveTaskActionType |
    AddTaskActionType | ChangeTaskStatusType |
    ChangeTaskTitleType | AddTodolistActionType |
    RemoveTodolistActionType

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
            // return {...state, [action.todoListID]: state[action.todoListID]
            //     .map(task => {
            //         if(task.id !== action.taskId){
            //             return task
            //         } else {
            //             return {...task, title: action.title }
            //         }
            //     })}
        }
        case 'ADD-TODOLIST': {
            const stateCopy = { ...state };
            stateCopy[action.todolistId] = [];
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = { ...state };
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
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return { type: 'ADD-TASK', task }
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListID: string): ChangeTaskStatusType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, status, todoListID }
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListID: string): ChangeTaskTitleType => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todoListID }
}



