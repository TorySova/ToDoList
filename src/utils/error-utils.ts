import { ResponseType } from './../api/todolist-api';
import { setAppErrorAC, setAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../app/app-reducer';
import { Dispatch } from 'redux';


// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
   if (data.messages.length) {
       dispatch(setAppErrorAC(data.messages[0]))
   } else {
       dispatch(setAppErrorAC('Some error occurred'))
   }
   dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
   dispatch(setAppErrorAC(error.message))
   dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<setAppErrorActionType | SetAppStatusActionType>