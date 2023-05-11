import { useAppContext } from "../hooks/AppContext";
import { Task } from "../interfaces/types";

interface Props {
  task: Task;
}

function TaskCard({ task }: Props) {
  const { setEditStates, changeCompleted, deleteTask } = useAppContext();

  const handleChange = () => {
    changeCompleted({ ...task, completed: !task.completed });
  };

  return (
    <div className="p-5 text-black bg-white rounded">
      <div className="mb-5">
        <h3 className="sm:text-2xl text-xl">{task.name}</h3>
        <p className="sm:text-xl mt-1 text-lg">{task.description}</p>
        <label
          htmlFor={task.id}
          className="sm:text-xl flex items-center justify-between mt-2 text-lg"
        >
          <input
            type="checkbox"
            id={task.id}
            checked={task.completed}
            onChange={handleChange}
          />
          Completed?
        </label>
      </div>
      <div className="flex justify-between gap-1">
        <button
          onClick={() => setEditStates(task.id)}
          className="sm:text-xl hover:bg-blue-500 flex-1 p-2 text-lg text-white transition-colors bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="sm:text-xl hover:bg-red-500 flex-1 p-2 text-lg text-white transition-colors bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
