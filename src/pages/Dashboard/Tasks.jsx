// src/pages/Dashboard/Tasks.jsx
import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "@/services/tasksService";
import TasksGrid from "@/components/tasks/TasksGrid";
import TaskForm from "@/components/tasks/TaskForm";
import { FiPlus, FiRefreshCcw } from "react-icons/fi";
import { useSocket } from "@/context/SocketContext";

export default function Tasks() {
  const socket = useSocket();
  const [tareas, setTareas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");
  const [tipo, setTipo] = useState("");
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tareaEditando, setTareaEditando] = useState(null);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const rol = user.rol || "tecnico";

  async function cargarTareas() {
    try {
      setCargando(true);
      const data = await getTasks();
      setTareas(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error al cargar tareas:", e);
      setTareas([]);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarTareas();
  }, []);

  // 🔁 Escuchar eventos de socket
  useEffect(() => {
    if (!socket) return;

    const onCreada = (tareaNueva) => {
      setTareas((prev) => {
        const yaExiste = prev.some((t) => t._id === tareaNueva._id);
        return yaExiste ? prev : [tareaNueva, ...prev];
      });
    };

    const onActualizada = (data) => {
      console.log("📡 Tarea actualizada en tiempo real:", data);
      setTareas((prev) =>
        prev.map((t) =>
          t._id === data.tareaId ? { ...t, estado: data.nuevoEstado } : t
        )
      );
    };

    socket.on("tarea_creada", onCreada);
    socket.on("tarea_actualizada", onActualizada);

    return () => {
      socket.off("tarea_creada", onCreada);
      socket.off("tarea_actualizada", onActualizada);
    };
  }, [socket]);

  async function handleCrearTarea(datos) {
    try {
      await createTask(datos);
      setMostrarModal(false);
    } catch (e) {
      console.error("Error al crear tarea:", e);
    }
  }

  async function handleActualizarTarea(datos) {
    try {
      await updateTask(tareaEditando._id, datos);
      setMostrarModal(false);
      setTareaEditando(null);
    } catch (e) {
      console.error("Error al actualizar tarea:", e);
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
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Buscar tareas..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="flex-1 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500"
        />

        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="border rounded-xl px-3 py-2"
        >
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En proceso</option>
          <option value="completada">Completada</option>
        </select>

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border rounded-xl px-3 py-2"
        >
          <option value="">Todos los tipos</option>
          <option value="riego">Riego</option>
          <option value="fertilizacion">Fertilización</option>
          <option value="cosecha">Cosecha</option>
        </select>

        <button
          onClick={cargarTareas}
          title="Recargar"
          className="bg-gray-100 hover:bg-gray-200 p-2 rounded-xl"
        >
          <FiRefreshCcw />
        </button>

        {(rol === "admin" || rol === "supervisor") && (
          <button
            onClick={() => {
              setTareaEditando(null);
              setMostrarModal(true);
            }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
          >
            <FiPlus /> Nueva Tarea
          </button>
        )}
      </div>

      {cargando ? (
        <p className="text-gray-500 text-center">Cargando tareas...</p>
      ) : (
        <TasksGrid
          tareas={filtradas}
          rol={rol}
          onEdit={(t) => {
            setTareaEditando(t);
            setMostrarModal(true);
          }}
          onDelete={() => {}}
        />
      )}
    </div>
  );
}
