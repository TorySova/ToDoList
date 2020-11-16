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
