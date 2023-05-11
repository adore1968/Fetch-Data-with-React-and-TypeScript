import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="font-serif">
      <main className="min-h-screen bg-red-950">
        <section className="px-6 pb-6 text-white">
          <TaskForm />
          <TaskList />
        </section>
      </main>
    </div>
  );
}

export default App;
