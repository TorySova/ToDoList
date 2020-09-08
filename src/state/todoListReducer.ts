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

export const todoListReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {
                id: v1(),
                filter: "all",
                title: action.title
            }
            return [...state, newTodoList];
        case 'CHANGE-TODOLIST-TITLE':
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.title = action.title;
                return [...state]
            }
            return state;
        case 'CHANGE-TODOLIST-FILTER':
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
                return [...state]
            }
            return state;
        default:
            throw new Error('Error')
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodolistActionType  => {
    return {type: 'REMOVE-TODOLIST', id: todoListID }
}
export const AddTodoListAC = () => {
    return
}
