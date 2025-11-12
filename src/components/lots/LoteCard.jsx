// src/components/lots/LoteCard.jsx
// src/components/lots/LoteCard.jsx
import React, { useState } from "react";
import {
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiMessageSquare,
  FiCheckCircle,
  FiMapPin,
  FiUser,
  FiPlusCircle,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import TaskModal from "../tasks/TaskModal";
import ChatLote from "../messages/ChatLot"; 

export default function LoteCard({ lote, onActualizar, onEditar, onEliminar }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [localCount, setLocalCount] = useState(lote.totalTareas || 0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const { rol } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setOpenMenu(!openMenu);

  const formatoEstado = (estado) => {
    if (!estado) return "Desconocido";
    return estado
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const puedeEditar = rol === "admin";
  const puedeEliminar = rol === "admin";
  const puedeAgregarTarea = rol === "admin" || rol === "supervisor";

  const handleEditar = () => {
    setOpenMenu(false);
    if (onEditar) onEditar(lote);
  };

  const handleEliminarConfirmado = async () => {
    try {
      await onEliminar?.(lote._id);
      setShowDeleteModal(false);
      onActualizar?.();
    } catch (e) {
      console.error(e);
      alert("Error al eliminar el lote.");
    }
  };

  const handleVerTareas = () => {
    navigate(`/dashboard/tareas?lote=${lote._id}`);
  };

  return (
    <>
      <div className="relative bg-white shadow-sm border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all duration-300">
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              {lote.nombre}
            </h3>
            <p className="text-sm text-gray-500">{lote.cultivo}</p>
          </div>

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

            {(puedeEditar || puedeEliminar || puedeAgregarTarea) && (
              <button
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <FiMoreVertical size={20} />
              </button>
            )}
          </div>

          {/* MENU */}
          {openMenu && (
            <div className="absolute top-10 right-3 bg-white border border-gray-200 rounded-xl shadow-md w-44 z-10">
              <ul className="text-sm text-gray-700">
                {puedeAgregarTarea && (
                  <li
                    className="px-4 py-2 hover:bg-green-50 text-green-600 cursor-pointer flex items-center gap-2"
                    onClick={() => {
                      setShowTaskModal(true);
                      setOpenMenu(false);
                    }}
                  >
                    <FiPlusCircle /> Crear tarea
                  </li>
                )}
                {puedeEditar && (
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    onClick={handleEditar}
                  >
                    <FiEdit2 /> Editar
                  </li>
                )}
                {puedeEliminar && (
                  <li
                    className="px-4 py-2 hover:bg-red-50 text-red-500 cursor-pointer flex items-center gap-2"
                    onClick={() => {
                      setOpenMenu(false);
                      setShowDeleteModal(true);
                    }}
                  >
                    <FiTrash2 /> Eliminar
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* BODY */}
        <div className="mt-3 space-y-1.5 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <FiMapPin className="text-gray-400" />{" "}
            {lote.ubicacion || "Sin ubicación"}
          </p>
          <p className="flex items-center gap-2">
            <FiUser className="text-gray-400" />{" "}
            {lote.supervisor?.nombre || "No asignado"}
          </p>
        </div>

        <hr className="my-3" />

        {/* FOOTER */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={handleVerTareas}
              className="flex items-center gap-1 border border-green-600 bg-green-50 text-green-700 font-medium px-3 py-1.5 rounded-lg hover:bg-green-100 transition"
            >
              <FiCheckCircle size={15} />
              {localCount} Tareas
            </button>

            {/* ✅ BOTÓN DEL CHAT */}
            <button
              className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition"
              onClick={() => setShowChatModal(true)}
            >
              <FiMessageSquare size={15} />
              <span></span>
            </button>
          </div>

          <button
            onClick={() => alert("Ver detalles del lote")}
            className="text-green-600 font-medium hover:underline"
          >
            Ver Detalles
          </button>
        </div>
      </div>

      {/* MODAL DE CREAR TAREA */}
      {showTaskModal && (
        <TaskModal
          lote={lote}
          onClose={() => setShowTaskModal(false)}
          onTareaCreada={() => {
            setLocalCount((c) => c + 1);
            onActualizar?.();
          }}
        />
      )}

      {/* MODAL ELIMINAR */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowDeleteModal(false)}
            >
              <FiX size={20} />
            </button>

            <div className="text-red-500 mb-3">
              <FiTrash2 size={40} className="mx-auto" />
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              ¿Eliminar {lote.nombre}?
            </h2>
            <p className="text-gray-600 mb-5">
              Esta acción no se puede deshacer. Todos los datos relacionados
              serán eliminados.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleEliminarConfirmado}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/*  MODAL CHAT DEL LOTE */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800">
                Chat - {lote.nombre}
              </h2>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowChatModal(false)}
              >
                <FiX size={22} />
              </button>
            </div>

            {/* Chat reutilizado */}
            <div className="h-[500px]">
              <ChatLote lote={lote} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
