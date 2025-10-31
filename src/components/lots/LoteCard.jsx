import { useState } from "react";
import {
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiMessageSquare,
  FiCheckCircle,
  FiMapPin,
  FiUser,
  FiPlusCircle,
} from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth"; // Asegúrate de que la ruta sea correcta

export default function LoteCard({ lote }) {
  const [openMenu, setOpenMenu] = useState(false);
  const { rol } = useAuth(); // 👈 Obtenemos el rol desde el hook
  const toggleMenu = () => setOpenMenu(!openMenu);

  // ✅ Formatear estado (quita guiones y pone mayúsculas)
  const formatoEstado = (estado) => {
    if (!estado) return "Desconocido";
    return estado
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // ✅ Lógica de permisos por rol
  const puedeEditar = rol === "admin";
  const puedeEliminar = rol === "admin";
  const puedeAgregarTarea = rol === "admin" || rol === "supervisor";

  return (
    <div className="relative bg-white shadow-sm border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all duration-300">
      {/* === HEADER === */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-base font-semibold text-gray-800">{lote.nombre}</h3>
          <p className="text-sm text-gray-500">{lote.cultivo}</p>
        </div>

        {/* === ESTADO + MENÚ === */}
        <div className="flex items-center gap-3">
          <span
            className={`text-base font-semibold px-4 py-1.5 rounded-full shadow-sm ${
              lote.estado === "activo"
                ? "bg-green-100 text-green-700"
                : lote.estado === "inactivo"
                ? "bg-gray-100 text-gray-600"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {formatoEstado(lote.estado)}
          </span>

          {/* Menú solo visible si tiene permisos */}
          {(puedeEditar || puedeEliminar || puedeAgregarTarea) && (
            <button
              className="p-1 rounded-full hover:bg-gray-100"
              onClick={toggleMenu}
            >
              <FiMoreVertical size={20} />
            </button>
          )}
        </div>

        {/* === MENU === */}
        {openMenu && (
          <div className="absolute top-10 right-3 bg-white border border-gray-200 rounded-xl shadow-md w-44 z-10">
            <ul className="text-sm text-gray-700">
              {puedeAgregarTarea && (
                <li
                  className="px-4 py-2 hover:bg-green-50 text-green-600 cursor-pointer flex items-center gap-2"
                  onClick={() => alert("Agregar tarea al lote")}
                >
                  <FiPlusCircle /> Agregar tarea
                </li>
              )}
              {puedeEditar && (
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={() => alert("Editar lote")}
                >
                  <FiEdit2 /> Editar
                </li>
              )}
              {puedeEliminar && (
                <li
                  className="px-4 py-2 hover:bg-red-50 text-red-500 cursor-pointer flex items-center gap-2"
                  onClick={() => alert("Eliminar lote")}
                >
                  <FiTrash2 /> Eliminar
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* === BODY === */}
      <div className="mt-3 space-y-1.5 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <FiMapPin className="text-gray-400" /> {lote.ubicacion || "Sin ubicación"}
        </p>
        <p className="flex items-center gap-2">
          <FiUser className="text-gray-400" /> {lote.supervisor?.nombre || "No asignado"}
        </p>
      </div>

      <hr className="my-3" />

      {/* === FOOTER === */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          {/* Botón de tareas */}
          <button className="flex items-center gap-1 border border-green-600 bg-green-50 text-green-700 font-medium px-3 py-1.5 rounded-lg hover:bg-green-100 transition">
            <FiCheckCircle size={15} />
            {lote.totalTareas || 0} Tareas
          </button>

          {/* Ícono de chat */}
          <button
            className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition"
            onClick={() => alert("Abrir chat del lote")}
          >
            <FiMessageSquare size={15} />
            <span>5</span>
          </button>
        </div>

        {/* Botón Ver Detalles */}
        <button
          onClick={() => alert("Ver detalles del lote")}
          className="text-green-600 font-medium hover:underline"
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
}

