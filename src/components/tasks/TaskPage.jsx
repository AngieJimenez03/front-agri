// src/components/dashboard/tasks/TaskPage.jsx
import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask } from "../../../services/tasksService";
import TasksGrid from "./TasksGrid";
import TaskForm from "./TaskForm";
import { FiPlus } from "react-icons/fi";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  const handleCreate = async (taskData) => {
    await createTask(taskData);
    setShowForm(false);
    loadTasks();
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteTask(id);
      loadTasks();
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Task Panel</h1>
          <p className="text-gray-500 text-sm">Manage all your tasks in one place</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <FiPlus /> New Task
        </button>
      </div>

      {showForm && (
        <TaskForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      <TasksGrid tasks={tasks} onDelete={handleDelete} />
    </div>
  );
}
