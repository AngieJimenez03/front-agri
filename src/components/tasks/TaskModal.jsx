// src/components/tasks/TaskModal.jsx
import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import TaskForm from "./TaskForm";
import { createTask } from "@/services/tasksService";

export default function TaskModal({ lote, onClose, onTareaCreada }) {
  const [loading, setLoading] = useState(false);

  // recibe los datos desde TaskForm (ya normalizados por TaskForm)
  const handleSubmit = async (datos) => {
    try {
      setLoading(true);

      // Forzamos que la tarea pertenezca a este lote
      const payload = { ...datos, lote: lote._id };
      console.log("📤 Enviando tarea al backend:", payload);

      // Llamada real al backend
      await createTask(payload);

      // callback para que el padre actualice UI si quiere
      onTareaCreada && onTareaCreada();

      // cierra modal
      onClose();
    } catch (err) {
      console.error("Error creando tarea desde modal:", err);
      alert("❌ Error al crear la tarea (revisa la consola).");
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

        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Crear tarea para <span className="text-green-600">{lote.nombre}</span>
        </h2>

        {/* Reutiliza exactamente tu TaskForm */}
        <TaskForm
          initialData={{ lote: lote._id }}
          onSubmit={handleSubmit}
          onCancel={onClose}
          // si TaskForm soporta prop disabled, podrías pasar loading aquí
        />
      </div>
    </div>
  );
}
