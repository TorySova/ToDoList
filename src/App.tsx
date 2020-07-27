import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValueType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: 1, title: "Dog", isDone: true },
        { id: 2, title: "Cat", isDone: true },
        { id: 3, title: "Pig", isDone: false },
        { id: 4, title: "Horse", isDone: true }
    ])

    let [filter, setFilter] = useState<FilterValueType>('all');

    function changeFilter(value: FilterValueType) {
        setFilter(value);
    }

    let tasksForTodoList = tasks;
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    // let tasks: Array<TaskType> = [
    //     {id: 1, title:"Dog", isDone: true},
    //     {id: 2, title:"Cat", isDone: true},
    //     {id: 3, title:"Pig", isDone: false},
    //     {id: 4, title:"Horse", isDone: true},
    // ];

    function removeTask(taskId: number) {
        setTasks(tasks.filter(task => task.id !== taskId))

    }

    return (
        <div className="App">
            <TodoList title={"Pets"}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter} />
        </div>
    );
}



export default App;
