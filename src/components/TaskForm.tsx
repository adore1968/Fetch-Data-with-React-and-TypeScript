import { FormEvent } from "react";
import { useAppContext } from "../hooks/AppContext";

function TaskForm() {
  const {
    task,
    currentId,
    taskInitialState,
    changeTask,
    createTask,
    editTask,
    setTask,
  } = useAppContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.name && task.description && !currentId) createTask();
    else if (task.name && task.description) editTask();

    setTask(taskInitialState);
  };

  return (
    <div className="pt-10 min-w-fit max-w-2xl mx-auto mb-10">
      <h1 className="text-center mb-5 text-2xl sm:text-4xl">Create Task</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black rounded p-5 flex flex-col"
      >
        <label htmlFor="name" className="text-xl sm:text-2xl">
          Enter a name
          <input
            type="text"
            name="name"
            id="name"
            value={task.name}
            onChange={(e) => changeTask(e)}
            className="border w-full mt-1 text-lg sm:text-xl py-1.5 px-2"
          />
        </label>
        <label htmlFor="description" className="text-xl sm:text-2xl my-5">
          Enter a description
          <textarea
            name="description"
            id="description"
            onChange={(e) => changeTask(e)}
            value={task.description}
            className="border w-full mt-1 text-lg sm:text-xl py-1.5 px-2 resize-none min-h-[135px]"
          ></textarea>
        </label>
        <label
          htmlFor="completed"
          className="text-xl sm:text-2xl flex items-center justify-between mb-5"
        >
          <input
            type="checkbox"
            name="completed"
            id="completed"
            checked={task.completed}
            onChange={(e) => changeTask(e)}
          />
          Completed?
        </label>
        <button
          type="submit"
          className={`${
            currentId
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-red-600 hover:bg-red-500"
          } transition-colors p-2 text-xl sm:text-2xl text-white`}
        >
          {currentId ? "Edit" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
