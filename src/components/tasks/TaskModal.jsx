// src/components/tasks/TaskModal.jsx
import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import TaskForm from "./TaskForm";
import { createTask } from "@/services/tasksService";

export default function TaskModal({ lote, onClose, onTareaCreada }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (datos) => {
    try {
      setLoading(true);
      const payload = { ...datos, lote: lote._id }; // asegurar que el lote sea el actual
      await createTask(payload);
      onTareaCreada && onTareaCreada();
      onClose();
    } catch (err) {
      console.error("Error creando tarea desde modal:", err);
      alert("Error al crear la tarea. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-base font-semibold mb-3 text-gray-800 text-center">
           <span className="text-green-600">{lote.nombre}</span>
        </h2>

        <TaskForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          loteFijo={lote._id} 
        />
      </div>
    </div>
  );
}
