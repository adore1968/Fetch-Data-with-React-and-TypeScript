import { useState, useEffect } from "react";
import { AppContext } from "../hooks/AppContext";
import { ChangeTaskProps, Task, TaskApiResponse } from "../interfaces/types";

const url = "http://localhost:3000/tasks";

export interface Props {
  children: JSX.Element;
}

const taskInitialState = {
  id: "",
  name: "",
  description: "",
  completed: false,
};

export function AppProvider({ children }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [task, setTask] = useState<Task>(taskInitialState);
  const [currentId, setCurrentId] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async (): Promise<TaskApiResponse[]> => {
      return fetch(url).then((response) => response.json());
    };

    const getCorrectProps = (apiResponse: TaskApiResponse[]): Task[] => {
      return apiResponse.map((value) => {
        const {
          id,
          taskName: name,
          taskDescription: description,
          taskCompleted: completed,
        } = value;
        return { id, name, description, completed };
      });
    };

    fetchTasks().then((apiResponse) => {
      setTasks(getCorrectProps(apiResponse));
      setIsLoading(false);
    });
  }, [tasks]);

  const changeTask = ({ target }: ChangeTaskProps) => {
    const { name, value } = target;
    if (name === "completed") {
      setTask({ ...task, completed: !task.completed });
    } else setTask({ ...task, [name]: value });
  };

  const createTask = async () => {
    try {
      const {
        name: taskName,
        description: taskDescription,
        completed: taskCompleted,
      } = task;

      const newTask = { taskName, taskDescription, taskCompleted };

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      };
      await fetch(url, options);
    } catch (error) {
      console.log(error);
    }
  };

  const setEditStates = (id: string) => {
    const currentTask = tasks.find((task) => task.id === id);
    if (currentTask) setTask(currentTask);
    setCurrentId(id);
  };

  const editTask = async () => {
    try {
      const {
        id,
        name: taskName,
        description: taskDescription,
        completed: taskCompleted,
      } = task;

      const newTask = { id, taskName, taskDescription, taskCompleted };

      const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      };
      await fetch(`${url}/${currentId}`, options);
    } catch (error) {
      console.log(error);
    }
    setCurrentId("");
  };

  const changeCompleted = async (newTask: Task) => {
    try {
      const {
        id,
        name: taskName,
        description: taskDescription,
        completed: taskCompleted,
      } = newTask;

      const correctTask = { id, taskName, taskDescription, taskCompleted };

      await fetch(`${url}/${correctTask.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(correctTask),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`${url}/${id}`, { method: "DELETE" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        isLoading,
        task,
        currentId,
        taskInitialState,
        changeTask,
        createTask,
        setEditStates,
        editTask,
        setTask,
        changeCompleted,
        deleteTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
