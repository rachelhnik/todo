import React from "react";

import "./Displaytodo.css";
import { List, ListItemText } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import config from "./Config";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function DisplayTodo({ tasks, setTasks }) {
    const handleCheck = async (id) => {
        let myTask;
        const isCompleteTask = tasks.map((data) => {
            if (data._id === id) {
                myTask = data;
            }
            return data._id === id
                ? { ...data, isCompleted: !data.isCompleted }
                : data;
        });

        //const myTask = task.filter((item) => item._id === id);

        const data = await fetch(`${config.apiBaseUrl}/api/tasks/${id}`, {
            method: "PATCH",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isCompleted: !myTask.isCompleted }),
        });
        setTasks(isCompleteTask);
    };
    const handleDelete = async (id) => {
        const deletedTasks = tasks.filter((data) => data._id !== id);

        const data = await fetch(`${config.apiBaseUrl}/api/tasks/${id}`, {
            method: "DELETE",
        });
        setTasks(deletedTasks);
    };
    return (
        <div className="listdisplay">
            <List>
                {tasks.map((item) => {
                    return (
                        <ListItem
                            value={item.title}
                            key={item._id}
                            className="listItem"
                        >
                            <ListItemText
                                primary={item.title}
                                style={
                                    item.isCompleted
                                        ? { textDecoration: "line-through" }
                                        : null
                                }
                            />
                            <input
                                type="checkbox"
                                checked={item.isCompleted}
                                onChange={() => handleCheck(item._id)}
                                className="checkbox"
                            />

                            <RemoveCircleIcon
                                sx={{ color: "red" }}
                                onClick={() => {
                                    handleDelete(item._id);
                                }}
                            ></RemoveCircleIcon>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
}
