// src/components/incidents/IncidentCard.jsx
import React, { useState } from "react";
import {
  FaWrench,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import IncidentStatusBadge from "./IncidentStatusBadge";

export default function IncidentCard({ incident, onStatusChange, onEdit, onDelete }) {
  const usuarioRol = localStorage.getItem("rol");
  const token = localStorage.getItem("token");
  const [showOptions, setShowOptions] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editDescripcion, setEditDescripcion] = useState(incident.title || "");
  const [editEstado, setEditEstado] = useState(incident.status);

  const handleEstado = async (nuevoEstado) => {
    try {
      await axios.put(
        `http://localhost:5100/api/incidents/${incident.id}`,
        { estado: nuevoEstado },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Estado cambiado a "${nuevoEstado.replace("_", " ")}"`);
      if (onStatusChange) onStatusChange(incident.id, nuevoEstado);
      setShowOptions(false);
    } catch (err) {
      console.error("Error al cambiar estado:", err);
      toast.error("No se pudo actualizar el estado");
    }
  };

 const handleGuardarEdicion = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token no encontrado. Inicia sesión nuevamente.");
      return;
    }

    await axios.put(
      `http://localhost:5100/api/incidents/${incident.id}`,
      {
        descripcion: editDescripcion,
        estado: editEstado,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success("Incidencia actualizada correctamente");
    setShowEditForm(false);
    if (onEdit) onEdit(incident.id, { descripcion: editDescripcion, estado: editEstado });
  } catch (err) {
    console.error("Error al actualizar incidencia:", err.response?.data || err.message);
    toast.error(err.response?.data?.msg || "No se pudo actualizar la incidencia");
  }
};

const handleEliminar = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token no encontrado. Inicia sesión nuevamente.");
      return;
    }

    await axios.delete(`http://localhost:5100/api/incidents/${incident.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Incidencia eliminada correctamente");
    setShowDeleteConfirm(false);
    if (onDelete) onDelete(incident.id);
  } catch (err) {
    console.error("Error al eliminar incidencia:", err.response?.data || err.message);
    toast.error(err.response?.data?.msg || "No se pudo eliminar la incidencia");
  }
};


  return (
    <>
      {/* === CARD PRINCIPAL === */}
      <div
        className={`relative rounded-2xl p-5 border-2 transition-shadow duration-300
        ${
          incident.status === "pendiente"
            ? "border-red-400 bg-white hover:shadow-md"
            : incident.status === "en_revision"
            ? "border-yellow-400 bg-white hover:shadow-md"
            : incident.status === "resuelta"
            ? "border-green-300 bg-gray-100 opacity-70"
            : "border-gray-200 bg-white"
        }`}
      >
        {/* === MENÚ ADMIN === */}
        {usuarioRol === "admin" && (
          <div className="absolute top-3 right-3">
            <button
              onClick={() => setShowAdminMenu(!showAdminMenu)}
              className="text-gray-600 hover:text-gray-900"
            >
              <FaEllipsisV />
            </button>

            {showAdminMenu && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
                <button
                  onClick={() => {
                    setShowEditForm(true);
                    setShowAdminMenu(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-t-xl w-full text-left"
                >
                  <FaEdit /> Editar
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(true);
                    setShowAdminMenu(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-xl w-full text-left"
                >
                  <FaTrash /> Eliminar
                </button>
              </div>
            )}
          </div>
        )}

        {/* === ETIQUETA DE ESTADO === */}
        <div className="absolute top-3 left-3">
          <IncidentStatusBadge status={incident.status} />
        </div>

        {/* === INFORMACIÓN === */}
        <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-2">
          {incident.title}
        </h3>

        <p className="text-sm text-gray-600 mb-1">
          <strong>Lote:</strong> {incident.lot}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Reportado:</strong> {incident.date}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Reportado por:</strong> {incident.reportedBy}
        </p>

        {/* === CAMBIAR ESTADO (Supervisor) === */}
        {usuarioRol === "supervisor" && incident.status !== "resuelta" && (
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="flex items-center justify-center gap-2 text-white px-4 py-2 rounded-xl w-full font-medium transition-all shadow-sm hover:scale-105"
              style={{ backgroundColor: "#22c55e" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#16a34a")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#22c55e")}
            >
              <FaWrench className="text-white" />
              Resolver incidencia
            </button>

            {showOptions && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                <button
                  onClick={() => handleEstado("en_revision")}
                  className="block w-full text-left px-4 py-2 text-yellow-600 hover:bg-yellow-50 rounded-t-xl"
                >
                  En Revisión
                </button>
                <button
                  onClick={() => handleEstado("resuelta")}
                  className="block w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 rounded-b-xl"
                >
                  Resuelta
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* === FORMULARIO DE EDICIÓN === */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowEditForm(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Editar incidencia
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Descripción
                </label>
                <textarea
                  value={editDescripcion}
                  onChange={(e) => setEditDescripcion(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Estado
                </label>
                <select
                  value={editEstado}
                  onChange={(e) => setEditEstado(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_revision">En revisión</option>
                  <option value="resuelta">Resuelta</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowEditForm(false)}
                  className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGuardarEdicion}
                  className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium"
                >
                  <FaCheck className="inline mr-1" /> Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === CONFIRMACIÓN DE ELIMINACIÓN === */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ¿Eliminar esta incidencia?
            </h3>
            <p className="text-gray-600 mb-5 text-sm">
              Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleEliminar}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl"
              >
                <FaTrash className="inline mr-1" /> Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
