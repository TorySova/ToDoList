import { Dispatch } from 'redux';
import { setIsLoggedInAC } from './../features/auth-reducer';
import { authAPI } from './../api/todolist-api';
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

const initialState: InitialStateType = {
    status: 'succeeded',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case "APP/SET-ERROR":
            return { ...state, error: action.error }
        case "APP/SET-INITIALIZED":
            return { ...state, isInitialized: action.isInitialized }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET-STATUS',
    status
} as const)
export const setAppErrorAC = (error: string | null) => ({
    type: 'APP/SET-ERROR',
    error
} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({ type: 'APP/SET-INITIALIZED', isInitialized } as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        debugger
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }
        dispatch(setIsInitializedAC(true))
    })
}


export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppInitializedActionType = ReturnType<typeof setIsInitializedAC>
type ActionsType = SetAppStatusActionType | setAppErrorActionType | SetAppInitializedActionType