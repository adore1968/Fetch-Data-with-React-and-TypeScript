import { useAppContext } from "../hooks/AppContext";
import Loading from "./Loading";
import TaskCard from "./TaskCard";

function TaskList() {
  const { tasks, isLoading } = useAppContext();

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto">
      <h2 className="text-center mb-5 text-2xl sm:text-4xl">
        Tasks: {tasks.length}
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
