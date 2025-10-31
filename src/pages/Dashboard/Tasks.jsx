import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "@/services/tasksService";
import TasksGrid from "@/components/tasks/TasksGrid";
import TaskForm from "@/components/tasks/TaskForm";
import { FiPlus, FiRefreshCcw, FiX } from "react-icons/fi";
import { useSocket } from "@/context/SocketContext";

export default function Tareas() {
  const socket = useSocket();
  const [tareas, setTareas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");
  const [tipo, setTipo] = useState("");
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tareaEditando, setTareaEditando] = useState(null);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [tareaAEliminar, setTareaAEliminar] = useState(null);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const rol = user.rol || "tecnico";

  useEffect(() => {
    cargarTareas();
  }, []);

  async function cargarTareas() {
    try {
      setCargando(true);
      const data = await getTasks();
      setTareas(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    } finally {
      setCargando(false);
    }
  }
 useEffect(() => {
    if (!socket) return;

    socket.on("tarea_actualizada", (data) => {
      console.log(" Actualización recibida:", data);
      setTareas((prevTareas) =>
        prevTareas.map((t) =>
          t._id === data.tareaId
            ? { ...t, estado: data.nuevoEstado }
            : t
        )
      );
    });

    return () => {
      socket.off("tarea_actualizada");
    };
  }, [socket]);

  async function handleCrearTarea(datos) {
    try {
      await createTask(datos);
      await cargarTareas();
      setMostrarModal(false);
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  }

  async function handleActualizarTarea(datos) {
    try {
      await updateTask(tareaEditando._id, datos);
      await cargarTareas();
      setMostrarModal(false);
      setTareaEditando(null);
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  }

  async function confirmarEliminarTarea() {
    try {
      await deleteTask(tareaAEliminar);
      await cargarTareas();
      setMostrarConfirmar(false);
      setTareaAEliminar(null);
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  }

  const filtradas = tareas.filter((t) => {
    const coincideBusqueda = t.titulo?.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = estado ? t.estado === estado : true;
    const coincideTipo = tipo ? t.tipo === tipo : true;
    return coincideBusqueda && coincideEstado && coincideTipo;
  });

  return (
    <div className="p-6">
      {/* 🔍 Barra de búsqueda y filtros */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Buscar tareas..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="border border-gray-300 rounded-xl px-3 py-2 text-gray-700 focus:ring-2 focus:ring-green-500"
        >
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En proceso</option>
          <option value="completada">Completada</option>
          <option value="retrasada">Retrasada</option>
        </select>

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border border-gray-300 rounded-xl px-3 py-2 text-gray-700 focus:ring-2 focus:ring-green-500"
        >
          <option value="">Todos los tipos</option>
          <option value="riego">Riego</option>
          <option value="fertilizacion">Fertilización</option>
          <option value="cosecha">Cosecha</option>
        </select>

        <button
          onClick={cargarTareas}
          title="Recargar"
          className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-xl transition"
        >
          <FiRefreshCcw className="text-lg" />
        </button>

        {(rol === "admin" || rol === "supervisor") && (
          <button
            onClick={() => {
              setTareaEditando(null);
              setMostrarModal(true);
            }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition"
          >
            <FiPlus /> Crear Nueva Tarea
          </button>
        )}
      </div>

      {cargando ? (
        <p className="text-gray-500 text-center">Cargando tareas...</p>
      ) : (
        <TasksGrid
          tareas={filtradas}
          rol={rol}
          onEdit={(task) => {
            setTareaEditando(task);
            setMostrarModal(true);
          }}
          onDelete={(id) => {
            setTareaAEliminar(id);
            setMostrarConfirmar(true);
          }}
        />
      )}

      {/* 🪟 Modal crear/editar */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => {
                setMostrarModal(false);
                setTareaEditando(null);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* ✅ aquí el cambio importante */}
            <TaskForm
  initialData={tareaEditando}
  onSubmit={tareaEditando ? handleActualizarTarea : handleCrearTarea}
  onCancel={() => {
    setMostrarModal(false);
    setTareaEditando(null);
  }}
/>
          </div>
        </div>
      )}

      {/* 🗑️ Modal Confirmación de eliminación */}
      {mostrarConfirmar && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">¿Eliminar tarea?</h2>
            <p className="text-gray-600 mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={confirmarEliminarTarea}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
              >
                Eliminar
              </button>
              <button
                onClick={() => setMostrarConfirmar(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
