import * as React from "react";
import "./Typebox.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import config from "./Config";

export default function Typebox({ tasks, setTasks }) {
    const [todo, setTodo] = useState("");

    const Addtodo = async (e) => {
        e.preventDefault();
        const title = todo;
        const myNewTask = {
            title: title,
            isCompleted: false,
        };
        const response = await fetch(`${config.apiBaseUrl}/api/tasks `, {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(myNewTask),
        });
        const data = await response.json();
        const totalTasks = [...tasks, data];

        setTasks(totalTasks);
        setTodo("");
    };
    return (
        <form className="typebox" onSubmit={Addtodo}>
            <TextField
                className="textfield"
                id="outlined-basic"
                placeholder="add your todo here ..."
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <Button variant="contained" className="button" onClick={Addtodo}>
                Add
            </Button>
        </form>
    );
}
