import { useState, useEffect } from "react";
import { crearLote, actualizarLote } from "@/services/lotsService";
import { getUsersByRole } from "@/services/userService";
import { FiX } from "react-icons/fi";

export default function LoteModal({ lote, onClose, onLoteGuardado }) {
  const [formData, setFormData] = useState({
    nombre: "",
    ubicacion: "",
    cultivo: "",
    estado: "activo",
    fechaSiembra: "",
    supervisor: "",
  });

  const [supervisores, setSupervisores] = useState([]);

  // 🔹 Cargar supervisores del backend
  useEffect(() => {
    const cargarSupervisores = async () => {
      try {
        const data = await getUsersByRole("supervisor");
        setSupervisores(data);
      } catch (error) {
        console.error(" Error al obtener supervisores:", error);
      }
    };
    cargarSupervisores();
  }, []);

  // 🔹 Si es edición, llenar el formulario
  useEffect(() => {
    if (lote) {
      setFormData({
        nombre: lote.nombre || "",
        ubicacion: lote.ubicacion || "",
        cultivo: lote.cultivo || "",
        estado: lote.estado || "activo",
        fechaSiembra: lote.fechaSiembra
          ? lote.fechaSiembra.split("T")[0]
          : "",
        supervisor: lote.supervisor?._id || "",
      });
    }
  }, [lote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (lote) {
        await actualizarLote(lote._id, formData);
      } else {
        await crearLote(formData);
      }
      onLoteGuardado();
      onClose();
    } catch (error) {
      console.error(" Error al guardar lote:", error);
      alert("Error al guardar el lote. Revisa los campos.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Título dinámico */}
        <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">
          {lote ? "Editar lote" : "Crear nuevo lote"}
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del lote
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Ejemplo: Lote 1 - Sur"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Ubicación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ubicación
            </label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              required
              placeholder="Ejemplo: Finca El Paraíso"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Cultivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cultivo (opcional)
            </label>
            <input
              type="text"
              name="cultivo"
              value={formData.cultivo}
              onChange={handleChange}
              placeholder="Ejemplo: Café, Maíz, Tomate..."
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Supervisor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supervisor asignado
            </label>
            <select
              name="supervisor"
              value={formData.supervisor}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Sin asignar</option>
              {supervisores.map((sup) => (
                <option key={sup._id} value={sup._id}>
                  {sup.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="en_proceso">En proceso</option>
            </select>
          </div>

          {/* Fecha de siembra */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de siembra (opcional)
            </label>
            <input
              type="date"
              name="fechaSiembra"
              value={formData.fechaSiembra}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold shadow transition"
            >
              {lote ? "Guardar cambios" : "Crear lote"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
