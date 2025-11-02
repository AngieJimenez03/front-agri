import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "@/services/tasksService";
import TasksGrid from "@/components/tasks/TasksGrid";
import TaskForm from "@/components/tasks/TaskForm";
import { FiPlus, FiRefreshCcw, FiX, FiTrash2 } from "react-icons/fi";
import { useSocket } from "@/context/SocketContext";
import toast from "react-hot-toast";

export default function Tasks() {
  const socket = useSocket();
  const [tareas, setTareas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");
  const [tipo, setTipo] = useState("");
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tareaEditando, setTareaEditando] = useState(null);
  const [confirmarEliminar, setConfirmarEliminar] = useState(null); // 🔥 modal de confirmación

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
      toast.success("Tarea creada correctamente");
      cargarTareas();
    } catch (e) {
      console.error("Error al crear tarea:", e);
      toast.error("No se pudo crear la tarea");
    }
  }

  async function handleActualizarTarea(datos) {
    try {
      await updateTask(tareaEditando._id, datos);
      setMostrarModal(false);
      setTareaEditando(null);
      toast.success("Tarea actualizada");
      cargarTareas();
    } catch (e) {
      console.error("Error al actualizar tarea:", e);
      toast.error("No se pudo actualizar la tarea");
    }
  }

  // 💣 Modal elegante para confirmar eliminación
  async function handleConfirmarEliminar() {
    try {
      await deleteTask(confirmarEliminar._id);
      setTareas((prev) => prev.filter((t) => t._id !== confirmarEliminar._id));
      toast.success("Tarea eliminada");
    } catch (e) {
      console.error("Error al eliminar tarea:", e);
      toast.error("No se pudo eliminar la tarea");
    } finally {
      setConfirmarEliminar(null);
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
          onDelete={(tareaId) => {
            const tarea = tareas.find((t) => t._id === tareaId);
            setConfirmarEliminar(tarea);
          }}
        />
      )}

      {/* 🧩 Modal crear/editar tarea */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
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

     
{confirmarEliminar && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative border border-gray-100 transition-all scale-100">
      <button
        onClick={() => setConfirmarEliminar(null)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <FiX className="w-5 h-5" />
      </button>

      
      <div className="flex flex-col items-center text-center">
        <div className="bg-red-50 p-4 rounded-full mb-3 flex items-center justify-center">
          <FiTrash2 className="w-6 h-6 text-red-600" />
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Eliminar tarea
        </h2>

        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          ¿Seguro que deseas eliminar{" "}
          <span className="italic text-gray-400 font-normal">
            “{confirmarEliminar.titulo}”
          </span>
          ? Esta acción no se puede deshacer.
        </p>

        {/* Botones */}
        <div className="flex justify-center gap-2 w-full">
          <button
            onClick={() => setConfirmarEliminar(null)}
            className="w-1/2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmarEliminar}
            className="w-1/2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
