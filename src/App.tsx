import React from 'react';
import './App.css';
import TodoList from './TodoList';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    const tasks1: Array<TaskType> = [
        {id: 1, title:"Dog", isDone: false},
        {id: 2, title:"Cat", isDone: true},
        {id: 3, title:"Pig", isDone: false},
    ];

    const tasks2: Array<TaskType> = [
        {id: 1, title:"Hey", isDone: false},
        {id: 2, title:"Allo", isDone: true},
        {id: 3, title:"Good", isDone: false},
    ];

    const tasks3: Array<TaskType> = [
        {id: 1, title:"Pushkin", isDone: false},
        {id: 2, title:"Nekrasov", isDone: true},
        {id: 3, title:"Tolstoy", isDone: false},
    ];

    return (
        <div className="App">
            <TodoList title={"Pets"} tasks={tasks1} />
            <TodoList title={"Songs"} tasks={tasks2} />
            <TodoList title={"Books"} tasks={tasks3} />
        </div>
    );
}



export default App;
