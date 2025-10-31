import { useEffect, useState } from "react";
import { obtenerLotes } from "@/services/lotsService";
import { getUsersByRole } from "@/services/userService";
import { format } from "date-fns-tz";
// ✅ Importar socket

export default function TaskForm({ onSubmit, onCancel, initialData = {} }) {
  const [form, setForm] = useState({
    titulo: "",
    tipo: "riego",
    fechaLimite: "",
    lote: "",
    tecnicosAsignados: [],
    estado: "pendiente",
  });

  const [lotes, setLotes] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  // ✅ Inicializar socket

  useEffect(() => {
    cargarLotes();
    cargarTecnicos();
  }, []);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm((prev) => {
        let fechaAjustada = prev.fechaLimite;
        if (initialData.fechaLimite) {
          try {
            const zonaLocal = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const fechaLocal = new Date(initialData.fechaLimite);
            fechaAjustada = format(fechaLocal, "yyyy-MM-dd", { timeZone: zonaLocal });
          } catch (error) {
            console.error("Error ajustando fecha límite:", error);
          }
        }
        return {
          ...prev,
          titulo: initialData.titulo ?? prev.titulo,
          tipo: initialData.tipo ?? prev.tipo,
          fechaLimite: fechaAjustada,
          lote: initialData.lote?._id ?? initialData.lote ?? prev.lote,
          tecnicosAsignados:
            initialData.tecnicosAsignados?.map((t) => t._id || t) ?? prev.tecnicosAsignados,
          estado: initialData.estado ?? prev.estado,
        };
      });
    }
  }, [initialData]);

  async function cargarLotes() {
    try {
      const data = await obtenerLotes();
      setLotes(data);
    } catch (error) {
      console.error("Error al cargar lotes:", error);
    }
  }

  async function cargarTecnicos() {
    try {
      const data = await getUsersByRole("tecnico");
      setTecnicos(data);
    } catch (error) {
      console.error("Error al cargar técnicos:", error);
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTecnicosChange = (e) => {
    const seleccionados = Array.from(e.target.selectedOptions).map((o) => o.value);
    setForm({ ...form, tecnicosAsignados: seleccionados });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let fechaNormalizada = null;
    if (form.fechaLimite) {
      const [year, month, day] = form.fechaLimite.split("-");
      fechaNormalizada = new Date(year, month - 1, day, 12, 0, 0);
    }

    const datosFinales = {
      ...form,
      fechaLimite: fechaNormalizada ? fechaNormalizada.toISOString() : null,
    };

    

    // 🔹 Ejecutar callback del padre (guardar en BD)
    onSubmit(datosFinales);
  };

  const esEdicion = Boolean(initialData && initialData._id);

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md space-y-3">
      <h2 className="text-lg font-semibold text-gray-700">
        {esEdicion ? "Editar tarea" : "Crear nueva tarea"}
      </h2>

      {/* Título */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          placeholder="Título de la tarea"
          className="w-full border rounded-lg px-3 py-2"
          required
        />
      </div>

      {/* Tipo */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipo de tarea</label>
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="riego">Riego</option>
          <option value="fertilizacion">Fertilización</option>
          <option value="cosecha">Cosecha</option>
        </select>
      </div>

      {/* Estado (solo edición) */}
      {esEdicion && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="pendiente">Pendiente</option>
            <option value="en_proceso">En proceso</option>
            <option value="completada">Completada</option>
            <option value="retrasada">Retrasada</option>
          </select>
        </div>
      )}

      {/* Fecha límite */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha límite</label>
        <input
          type="date"
          name="fechaLimite"
          value={form.fechaLimite}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
      </div>

      {/* Lote */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Lote</label>
        <select
          name="lote"
          value={form.lote}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
          required
        >
          <option value="">Selecciona un lote</option>
          {lotes.map((l) => (
            <option key={l._id} value={l._id}>
              {l.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Técnicos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Técnicos asignados</label>
        <div className="border rounded-lg overflow-hidden">
          <select
            multiple
            value={form.tecnicosAsignados}
            onChange={handleTecnicosChange}
            className="w-full px-3 py-2 h-28 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none text-gray-700"
          >
            {tecnicos.length > 0 ? (
              tecnicos.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.nombre}
                </option>
              ))
            ) : (
              <option disabled>No hay técnicos disponibles</option>
            )}
          </select>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-2 mt-4">
        <button type="button" onClick={onCancel} className="px-3 py-1 border rounded-lg">
          Cancelar
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
