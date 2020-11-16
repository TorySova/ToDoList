import axios from 'axios'

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}



const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '67477460-bd4f-44a1-875d-97f09390d59f'
    }
})

export const todolistAPI = {
    getTodo() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    createTodo() {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title: 'NewNew' })
    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title })
    }
}