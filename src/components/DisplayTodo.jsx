import React from "react";

import "./Displaytodo.css";
import { List, ListItemText } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function DisplayTodo({ task, setTasks }) {
    const handleCheck = (id) => {
        const isCompleteTask = task.map((data) =>
            data._id === id ? { ...data, isCompleted: !data.isCompleted } : data
        );
        setTasks(isCompleteTask);
        console.log(task);

        const myTask = task.filter((item) => item._id === id);
        console.log(myTask[0].isCompleted);
        fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: "PATCH",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isCompleted: myTask[0].isCompleted }),
        });
    };
    const handleDelete = (id) => {
        const deletedTasks = task.filter((data) => data._id !== id);
        setTasks(deletedTasks);
        fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: "DELETE",
        });
    };
    return (
        <List className="listdisplay">
            {task.map((item) => {
                return (
                    <ListItem value={item.title} key={item._id}>
                        <ListItemText primary={item.title} />
                        <input
                            type="checkbox"
                            checked={item.isCompleted}
                            onClick={() => handleCheck(item._id)}
                            className="checkbox"
                        />

                        <RemoveCircleIcon
                            sx={{ color: "red" }}
                            onClick={() => handleDelete(item._id)}
                        ></RemoveCircleIcon>
                    </ListItem>
                );
            })}
        </List>
    );
}
