import "./App.css";
import Typebox from "./components/Typebox";
import DisplayTodo from "./components/DisplayTodo";
import { useEffect, useState } from "react";
import FinishedTasks from "./components/finishedTasks/FinishedTasks";
import config from "./components/Config";

function App() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetchTodo();
    }, []);
    const fetchTodo = async () => {
        const response = await fetch(`${config.apiBaseUrl}/api/tasks `);
        const data = await response.json();
        console.log(data.data);
        setTasks(data.data);
    };

    return (
        <div className="App">
            <Typebox tasks={tasks} setTasks={setTasks} />
            <DisplayTodo tasks={tasks} setTasks={setTasks} />
            <FinishedTasks tasks={tasks} setTasks={setTasks} />
        </div>
    );
}

export default App;
