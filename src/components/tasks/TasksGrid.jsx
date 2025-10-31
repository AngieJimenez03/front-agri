// src/components/dashboard/tasks/TasksGrid.jsx
import TaskCard from "./TaskCard";

export default function TasksGrid({ tareas = [], onEdit, onDelete, rol }) {
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
          <tr>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Fecha Límite</th>
            <th className="px-4 py-3">Título</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3">Lote</th>
            <th className="px-4 py-3">Supervisor</th>
            <th className="px-4 py-3 text-right"></th>
          </tr>
        </thead>

        <tbody>
          {tareas.length > 0 ? (
            tareas.map((task) => (
              <tr key={task._id} className="text-sm text-gray-700 hover:bg-gray-50">
                <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} rol={rol} />
              </tr>
            ))
          ) : (
            
            <tr>
              <td colSpan="7" className="text-center text-gray-500 py-4">
                No hay tareas disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
