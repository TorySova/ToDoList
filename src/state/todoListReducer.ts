import { setAppStatusAC, RequestStatusType, setAppErrorAC } from '../app/app-reducer';
import { TodolistType, todolistAPI } from './../api/todolist-api';
import { Dispatch } from 'redux';

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todoListReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [{ ...action.todolist, filter: 'all', entityStatus: 'idle' }, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? { ...t, title: action.title } : t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? { ...t, filter: action.filter } : t)
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
        }
        case 'CHANGE-TODOLIST-ENTITI-STATUS':
            return state.map(tl => tl.id === action.id ? { ...tl, entityStatus: action.entityStatus } : tl)
        default:
            return state
    }
}

type ActionType = RemoveTodolistActionType |
    AddTodolistActionType |
    ReturnType<typeof ChangeToodoListTitleAC> |
    ReturnType<typeof ChangeTodoListFilterAC> |
    ReturnType<typeof ChangeTodoListFilterAC> |
    SetTodolistsActionType |
    ReturnType<typeof changeTodolistEntityStatusAC>

export type AddTodolistActionType = ReturnType<typeof AddTodoListAC>
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodoListAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export const RemoveTodoListAC = (id: string) => ({ type: 'REMOVE-TODOLIST', id } as const)

export const AddTodoListAC = (todolist: TodolistType) => ({
    type: 'ADD-TODOLIST',
    todolist
} as const)
export const ChangeToodoListTitleAC = (todoListID: string, newTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: todoListID,
    title: newTitle
} as const)
export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListID: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: todoListID,
    filter: filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({
    type: 'SET-TODOLISTS',
    todolists
} as const)

export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType,) => ({
    type: 'CHANGE-TODOLIST-ENTITI-STATUS',
    id,
    entityStatus
} as const)

export const fetchTodolistsThunkTS = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTodo()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const RemoveTodoListTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistAPI.deleteTodo(todolistId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(RemoveTodoListAC(todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                }
            })
    }
}
export const AddTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.createTodo(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(AddTodoListAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                }else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('Some error occurred'))
                    }
                    dispatch(setAppStatusAC('failed'))
                }
            })
    }
}
export const ChangeToodoListTitleTC = (todoListID: string, newTitle: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTodo(todoListID, newTitle)
            .then((res) => {
                dispatch(ChangeToodoListTitleAC(todoListID, newTitle))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

