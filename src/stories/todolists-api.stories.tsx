import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolist-api'

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodo().then((res) => {
            setState(res.data);
        })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodo().then((res) => {
            setState(res.data);
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4ded081a-828e-431e-b281-4ab22aa7093a'
        todolistAPI.deleteTodo(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'BlaBla'
        const todolistId = 'acf4c747-1972-4663-be34-5295c43a5450'
        todolistAPI.updateTodo(todolistId, title).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "182a241e-01e3-49c1-b1c0-b147c36396ab"
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '182a241e-01e3-49c1-b1c0-b147c36396ab'
        const taskId = '673e79ad-fad8-418a-ace0-368c338281d7'
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '182a241e-01e3-49c1-b1c0-b147c36396ab'
        const title = "some"
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '182a241e-01e3-49c1-b1c0-b147c36396ab'
        const taskId = 'f706dbdd-152d-42ca-b3a5-4ee8f5e84ed9'
        const title = 'newNew'
        todolistAPI.putTask(todolistId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}