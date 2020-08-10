import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import { v1 } from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "Dog", isDone: true },
        { id: v1(), title: "Cat", isDone: true },
        { id: v1(), title: "Pig", isDone: false },
        { id: v1(), title: "Horse", isDone: true }
    ]);


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


    function removeTask(taskId: string) {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    function addTack(title: string) {
        let newTask = { id: v1(), title: title, isDone: false };
        setTasks([newTask, ...tasks])
    }

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    function selectedOll(value: boolean) {
        const newTask = tasks.map(t => ({ ...t, isDone: value }))
        setTasks(newTask)
    }



    return (
        <div className="App">
            <TodoList title={"Pets"}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTack}
                changeTaskStatus={changeStatus}
                filter={filter}
                selectedOll={selectedOll} />
        </div>
    );
}



export default App;
