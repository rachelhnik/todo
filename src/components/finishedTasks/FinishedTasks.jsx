import React from "react";
import "./FinishedTasks.css";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import config from "../Config";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";

import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export default function FinishedTasks({ setTasks }) {
    const allTasks = async () => {
        const response = await fetch(`${config.apiBaseUrl}/api/tasks `);
        const data = await response.json();
        setTasks(data.data);
    };
    const showFinishedTasks = async () => {
        const response = await fetch(`${config.apiBaseUrl}/api/tasks `);
        const data = await response.json();
        const tasks = await data.data;
        const tasksDone = tasks.filter((item) => item.isCompleted === true);
        setTasks(tasksDone);
    };

    const showUnfinishedTasks = async () => {
        const response = await fetch(`${config.apiBaseUrl}/api/tasks `);
        const data = await response.json();
        const tasks = await data.data;
        const tasksLeftToDone = tasks.filter(
            (item) => item.isCompleted === false
        );
        setTasks(tasksLeftToDone);
    };
    return (
        <div className="display">
            <BottomNavigation showLabels className="navi">
                <BottomNavigationAction
                    className="naviActions"
                    label="All tasks"
                    onClick={allTasks}
                    icon={<DensitySmallIcon />}
                />
                <BottomNavigationAction
                    className="naviActions"
                    label="Finished tasks"
                    onClick={showFinishedTasks}
                    icon={<DoneOutlineIcon />}
                />

                <BottomNavigationAction
                    className="naviActions"
                    label="Unfinished tasks"
                    onClick={showUnfinishedTasks}
                    icon={<SentimentVeryDissatisfiedIcon />}
                />
            </BottomNavigation>
        </div>
    );
}
