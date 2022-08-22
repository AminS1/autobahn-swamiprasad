import React from "react";
import classes from "./NewTask.module.css";
import { useNavigate } from "react-router-dom";

const NewTask = (props) => {
  let navigate = useNavigate();

  return (
    <div className={classes.newTask}>
      <div
        onClick={() => {
          props.onNewTask();
          navigate("/form");
        }}
      >
        +
      </div>
    </div>
  );
};

export default NewTask;
