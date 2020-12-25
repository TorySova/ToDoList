import { TodolistType, todolistAPI } from './../api/todolist-api';
import { v1 } from 'uuid';
import { Dispatch } from 'redux';


type ActionType = RemoveTodolistActionType| 
                    AddTodolistActionType|
                    ChangeTodolistTitleActionType|
                    ChangeTodolistFilterActionType |
                    SetTodolistsActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
 }
 

 const initialState: Array<TodolistDomainType> = []

 export type FilterValuesType = "all" | "active" | "completed";
 export type TodolistDomainType = TodolistType & {
     filter: FilterValuesType
 }

export const todoListReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all' 
            }))
        }             
        default:
            return state
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodolistActionType  => {
    return {type: 'REMOVE-TODOLIST', id: todoListID }
}
export const AddTodoListAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1() }
}
export const ChangeToodoListTitleAC = (todoListID: string, newTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todoListID, title: newTitle }
}
export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todoListID, filter: filter}
}
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
 }
 
 export const fetchTodolistsThunkTS = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodo()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}