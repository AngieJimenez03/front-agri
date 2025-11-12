// src/components/tasks/TaskCard.jsx
import { useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiRepeat,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";
import { createPortal } from "react-dom";
import { updateTaskStatus } from "@/services/tasksService";
import { createIncident } from "@/services/incidentsService";
import toast from "react-hot-toast";

export default function TaskCard({ task, onEdit, onDelete, rol }) {
  const [mostrarEstado, setMostrarEstado] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState(task.estado);
  const [mostrarIncidencia, setMostrarIncidencia] = useState(false);
  const [descripcionIncidencia, setDescripcionIncidencia] = useState("");

  if (!task) return null;

  const estadoColor =
    {
      completada: "bg-green-100 text-green-700",
      en_proceso: "bg-blue-100 text-blue-700",
      pendiente: "bg-yellow-100 text-yellow-700",
      retrasada: "bg-red-100 text-red-700",
    }[task.estado] || "bg-gray-100 text-gray-700";

  const fecha = task.fechaLimite
    ? new Date(task.fechaLimite).toLocaleDateString("es-CO", {
        timeZone: "America/Bogota",
      })
    : "Sin fecha";

  // 🔹 Cambiar estado de la tarea
  async function handleCambiarEstado() {
    try {
      if (!nuevoEstado) return toast.error("Selecciona un estado");
      await updateTaskStatus(task._id, nuevoEstado);
      toast.success(`Estado cambiado a "${nuevoEstado}"`);
      setMostrarEstado(false);
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      toast.error("No se pudo actualizar el estado");
    }
  }

  // 🔹 Crear nueva incidencia
  async function handleCrearIncidencia() {
    try {
      if (!descripcionIncidencia.trim()) {
        return toast.error("Agrega una descripción para la incidencia");
      }

      await createIncident({
        descripcion: descripcionIncidencia,
        tarea: task._id, // 🔗 vincula con la tarea actual
      });

      toast.success("Incidencia reportada con éxito");
      setMostrarIncidencia(false);
      setDescripcionIncidencia("");
    } catch (error) {
      console.error("Error al crear incidencia:", error);
      toast.error("No se pudo reportar la incidencia");
    }
  }

  return (
    <>
      <td className="px-4 py-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${estadoColor}`}
        >
          {task.estado?.replace("_", " ").toUpperCase()}
        </span>
      </td>
      <td className="px-4 py-3">{fecha}</td>
      <td className="px-4 py-3 font-semibold">{task.titulo}</td>
      <td className="px-4 py-3 capitalize">{task.tipo}</td>
      <td className="px-4 py-3">{task.lote?.nombre || "Sin lote"}</td>
      <td className="px-4 py-3">{task.supervisor?.nombre || "No asignado"}</td>

      <td className="px-4 py-3 flex justify-end gap-2">
       {(rol === "admin" || rol === "supervisor") && (
  <div className="flex gap-2">
    <button
      onClick={() => onEdit && onEdit(task)}
      className="text-blue-600 hover:text-blue-800"
      title="Editar tarea"
    >
      <FiEdit2 />
    </button>

    {rol === "admin" && (
      <button
        onClick={() => onDelete && onDelete(task._id)}
        className="text-red-500 hover:text-red-700"
        title="Eliminar tarea"
      >
        <FiTrash2 />
      </button>
    )}
  </div>
)}
        {(rol === "tecnico" || rol === "admin") && (
          <>
            <button
              onClick={() => setMostrarEstado(true)}
              className="text-green-600 hover:text-green-800"
              title="Cambiar estado"
            >
              <FiRepeat />
            </button>

            {/* Botón de Reportar Incidencia */}
            <button
              onClick={() => setMostrarIncidencia(true)}
              className="text-orange-500 hover:text-orange-700"
              title="Reportar incidencia"
            >
              <FiAlertCircle />
            </button>
          </>
        )}
      </td>

      {/* 🔹 Modal Cambiar Estado */}
      {mostrarEstado &&
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
              <button
                onClick={() => setMostrarEstado(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Cambiar estado
              </h2>
              <select
                value={nuevoEstado}
                onChange={(e) => setNuevoEstado(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-4"
              >
                <option value="pendiente">Pendiente</option>
                <option value="en_proceso">En proceso</option>
                <option value="completada">Completada</option>
                <option value="retrasada">Retrasada</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setMostrarEstado(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCambiarEstado}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* 🔹 Modal Reportar Incidencia */}
      {mostrarIncidencia &&
        createPortal(
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
              <button
                onClick={() => setMostrarIncidencia(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Reportar incidencia
              </h2>

              <textarea
                value={descripcionIncidencia}
                onChange={(e) => setDescripcionIncidencia(e.target.value)}
                placeholder="Describe la incidencia..."
                className="w-full border rounded-lg px-3 py-2 mb-4 h-24"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setMostrarIncidencia(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCrearIncidencia}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
