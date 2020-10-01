import { FilterValueType } from './../App';
import { v1 } from 'uuid';
import { TodoListType } from '../App';

type ActionType = RemoveTodolistActionType| 
                    AddTodolistActionType|
                    ChangeTodolistTitleActionType|
                    ChangeTodolistFilterActionType

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
    filter: FilterValueType
    id: string
}

const initialState: Array<TodoListType> = []

export const todoListReducer = (state: Array<TodoListType> = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {
                id: action.todolistId,
                filter: "all",
                title: action.title
            }
            return [...state, newTodoList];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
            // const todoList = state.find(tl => tl.id === action.id);
            // if (todoList) {
            //     todoList.title = action.title;
            //     return [...state]
            // }
            // return state;
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
            // let todolist = state.find(tl => tl.id === action.id);
            // if (todolist) {
            //     todolist.filter = action.filter;
            //     return [...state]
            // }
            // return state;
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
export const ChangeTodoListFilterAC = (filter: FilterValueType, todoListID: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todoListID, filter: filter}
}
