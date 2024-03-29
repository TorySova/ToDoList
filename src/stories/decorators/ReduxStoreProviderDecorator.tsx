import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import { TaskPriorities, TaskStatuses } from '../../api/todolist-api'
import { appReducer } from '../../app/app-reducer'
import { authReducer } from '../../features/auth-reducer'
import { AppRootStateType } from '../../state/store'
import { tasksReducer } from '../../state/tasksReducer'
import { todoListReducer } from '../../state/todoListReducer'


const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todoListReducer,
   app: appReducer,
   auth: authReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: false
    },
    auth: {isLoggedIn: false}
 };
 
 export const storyBookStore = createStore(rootReducer, initialGlobalState);
 
 export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
 
 
 