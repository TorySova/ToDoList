import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default {
    title: 'API',  
}

const settings = {
    withCredentials: true,
    header: {
        'API-KEY': '191b2fba-9710-4230-8f13-979317d96de4'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings).then((res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodolist = () => {
    const [state, setState] = useState(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'NewOne'}, settings).then((res) => {
            setState(res.data);
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
