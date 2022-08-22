import React, { useState } from "react";
import classes from "./Task.module.css";
import { useNavigate } from "react-router-dom";

const Task = (props) => {
  const { title, completed } = props;
  const [isHovered, setIsHovered] = useState(false);

  let navigate = useNavigate();

  const editHandler = () => {
    props.onEdit();
    navigate("/form");
  };

  return (
    <div
      className={classes.task}
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
    >
      <div
        className={classes.status}
        style={{
          backgroundColor: completed ? "lightgreen" : "rgb(215, 215, 215)",
        }}
      >
        {completed ? "Completed" : "Pending"}
      </div>
      <div className={classes.title}>{title}</div>
      {isHovered && (
        <button className={classes.deleteBtn} onClick={props.onDelete}>
          Delete
        </button>
      )}
      {isHovered && (
        <button className={classes.editBtn} onClick={editHandler}>
          Edit
        </button>
      )}
    </div>
  );
};

export default Task;
