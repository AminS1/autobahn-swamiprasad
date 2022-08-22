import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import NewTask from "./NewTask";
import classes from "./Home.module.css";
import Task from "./Task";
import LoadingScreen from "./LoadingScreen";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const { tasks, isLoading, httpError } = props;

  let navigate = useNavigate();

  return (
    <div className={classes.home}>
      <Card>
        <NewTask
          onNewTask={() => {
            props.setCurrentId(null);
            props.setCurrentTask(null);
          }}
        />
        {tasks.map((task, index) => (
          <Task
            title={task.title}
            completed={task.completed}
            key={task.id}
            onDelete={() => {
              props.deleteTaskHandler(index + 1);
            }}
            onEdit={() => {
              props.setCurrentId(index);
              props.setCurrentTask(task);
            }}
          />
        ))}
        {httpError && <div className={classes.error}>{httpError}</div>}
      </Card>
      {isLoading &&
        ReactDOM.createPortal(
          <LoadingScreen />,
          document.getElementById("overlays")
        )}
    </div>
  );
};

export default Home;
