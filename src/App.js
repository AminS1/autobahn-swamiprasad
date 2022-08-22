import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import TaskForm from "./components/TaskForm";
import { useEffect, useState } from "react";

function App() {
  const [currentTask, setCurrentTask] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setHttpError(null);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log("Load Response: ", data);
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHttpError(error.message);
    }
  };

  const addTaskHandler = async (task) => {
    try {
      setIsLoading(true);
      setHttpError(null);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          body: JSON.stringify(task),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log("Add Task Response: ", data);
      tasks.push(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHttpError(error.message);
    }
  };

  const editTaskHandler = async (id, task) => {
    try {
      setIsLoading(true);
      setHttpError(null);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/" + id,
        {
          method: "PUT",
          body: JSON.stringify(task),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log("Edit Task Response: ", data);
      tasks[id - 1] = data;
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHttpError(error.message);
    }
  };

  const deleteTaskHandler = async (id) => {
    try {
      setIsLoading(true);
      setHttpError(null);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      console.log("Delete Task Response: ", data);
      tasks.splice(id - 1, 1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHttpError(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route
            path="/home"
            element={
              <Home
                setCurrentTask={setCurrentTask}
                setCurrentId={setCurrentId}
                deleteTaskHandler={deleteTaskHandler}
                tasks={tasks}
                isLoading={isLoading}
                httpError={httpError}
              />
            }
          />
          <Route
            path="/form"
            element={
              <TaskForm
                currentTask={currentTask}
                tasks={tasks}
                addTaskHandler={addTaskHandler}
                editTaskHandler={editTaskHandler}
                currentId={currentId}
              />
            }
          />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
