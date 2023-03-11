import "./App.css";
import Typebox from "./components/Typebox";
import DisplayTodo from "./components/DisplayTodo";
import { useEffect, useState } from "react";

function App() {
    const [task, setTasks] = useState([]);
    useEffect(() => {
        fetchTodo();
    }, []);
    const fetchTodo = async () => {
        const response = await fetch("http://localhost:3000/api/tasks");
        const data = await response.json();
        console.log(data.data);
        setTasks(data.data);
    };

    return (
        <div className="App">
            <Typebox task={task} setTasks={setTasks} />
            <DisplayTodo task={task} setTasks={setTasks} />
        </div>
    );
}

export default App;
