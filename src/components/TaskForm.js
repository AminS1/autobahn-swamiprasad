import React, { useState } from "react";
import Card from "./Card";
import classes from "./TaskForm.module.css";
import { useNavigate } from "react-router-dom";

const TaskForm = (props) => {
  let navigate = useNavigate();
  const [inputClass, setInputClass] = useState("controls");
  const [errorText, setErrorText] = useState(null);
  const [title, setTitle] = useState(
    props.currentTask === null ? "" : props.currentTask.title
  );
  const [isCompleted, setIsCompleted] = useState(
    props.currentTask === null ? false : props.currentTask.completed
  );

  const inputChangeHandler = (event) => {
    setTitle(event.target.value);
    if (event.target.value.length > 0) {
      setErrorText(null);
      setInputClass("controls");
    }
  };

  const inputBlurHandler = () => {
    if (title.length === 0) {
      setErrorText("Please enter a valid title.");
      setInputClass("invalid");
    }
  };

  const checkChangeHandler = (event) => {
    setIsCompleted(event.target.checked);
  };

  const cancelHandler = (event) => {
    navigate("/home");
    event.preventDefault();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (title.length === 0) {
      setErrorText("Please enter a valid title.");
      setInputClass("invalid");
      return;
    }

    if (props.currentTask === null) {
      let userId = Math.floor(props.tasks[props.tasks.length - 1].id / 20) + 1;
      let id = props.tasks[props.tasks.length - 1].id + 1;
      console.log(props.tasks[props.tasks.length - 1].id + 1);
      let newTask = {
        title: title,
        completed: isCompleted,
        userId: userId,
        id: id,
      };
      console.log(newTask);
      props.addTaskHandler(newTask);
      navigate("/home");
    } else if (props.currentTask) {
      let userId = props.currentTask.userId;
      let id = props.currentTask.id;
      let editedTask = {
        title: title,
        completed: isCompleted,
        userId: userId,
        id: id,
      };
      props.editTaskHandler(props.currentId + 1, editedTask);
      navigate("/home");
    }
  };

  return (
    <div className={classes.form}>
      <Card>
        <h2
          style={{ textAlign: "center", marginBottom: "30px", color: "Black" }}
        >
          {props.currentTask === null ? "New Task" : "Edit Task"}
        </h2>
        <form>
          <div className={classes[inputClass]}>
            <label htmlFor="task-title">Task Title:</label>
            <input
              id="task-title"
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={inputChangeHandler}
              onBlur={inputBlurHandler}
            />
          </div>
          {errorText && <p>{errorText}</p>}
          <div className={classes.controls}>
            <label htmlFor="task-complete">Completed:</label>
            <input
              id="task-complete"
              type="checkbox"
              onChange={checkChangeHandler}
              checked={isCompleted}
            />
          </div>

          <div className={classes.actions}>
            <button onClick={cancelHandler}>Cancel</button>
            <button onClick={submitHandler}>Submit</button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default TaskForm;
