import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import { v1 } from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

export type FilterValueType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

type TaskStateType = {
    [key: string] : Array<TaskType>
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();
    let todolistID3 = v1();

    let [todoLists, setTodolists] = useState<Array<TodoListType>>([
        { id: todolistID1, title: 'One', filter: 'all' },
        { id: todolistID2, title: 'Two', filter: 'all' },
        { id: todolistID3, title: 'Three', filter: 'all' },
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            { id: v1(), title: "js", isDone: true },
            { id: v1(), title: "css", isDone: true },
            { id: v1(), title: "react", isDone: false },
            { id: v1(), title: "redux", isDone: true }
        ],
        [todolistID2]: [
            { id: v1(), title: "Dog", isDone: true },
            { id: v1(), title: "Cat", isDone: true },
            { id: v1(), title: "Pig", isDone: false },
            { id: v1(), title: "Horse", isDone: true }
        ],
        [todolistID3]: [
            { id: v1(), title: "Red", isDone: true },
            { id: v1(), title: "Blue", isDone: true },
            { id: v1(), title: "Green", isDone: false },
            { id: v1(), title: "Pinc", isDone: true }
        ],
    })


    function changeFilter(value: FilterValueType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.filter = value;
            setTodolists([...todoLists])
        }
    }

    function removeTask(taskId: string, todoListID: string) {
        let todoList = tasks[todoListID];
        todoList.filter(t => t.id !== taskId);
        setTasks({...tasks})
    }

    function addTack(title: string, todoListID: string) {
        let newTask = { id: v1(), title: title, isDone: false };
        let todoList = tasks[todoListID];
        tasks[todoListID] = [newTask,...todoList]
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let todoList = tasks[todoListID];
        let task = todoList.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function removeTodoList(todoListID: string){
        let newTodoLists = todoLists.filter(tl => tl.id !== todoListID);
        setTodolists(newTodoLists);
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let tasksForTodoList = tasks[tl.id];
                    if (tl.filter === "active") {
                        tasksForTodoList = tasks[tl.id].filter(tl => tl.isDone === false)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasks[tl.id].filter(tl => tl.isDone === true)
                    }
                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTack}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodoList={removeTodoList}
                            />
                            // selectedOll={selectedOll} />
                    );
                })
            }
        </div>
    );
}



export default App;
