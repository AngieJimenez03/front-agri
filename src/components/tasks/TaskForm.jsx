import { useEffect, useState } from "react";
import { obtenerLotes } from "@/services/lotsService";
import { getUsersByRole } from "@/services/userService";
import { format } from "date-fns-tz";

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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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

    onSubmit(datosFinales);
  };

  const esEdicion = Boolean(initialData && initialData._id);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100 space-y-5 transition-all duration-200"
    >
      {/* Título principal */}
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 text-center">
        {esEdicion ? "Editar tarea" : "Nueva tarea"}
      </h2>

      {/* Campo: Título */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Título</label>
        <input
          type="text"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          placeholder="Ej: Riego del Lote A"
          className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
          required
        />
      </div>

      {/* Campo: Tipo */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Tipo de tarea</label>
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
        >
          <option value="riego">Riego</option>
          <option value="fertilizacion">Fertilización</option>
          <option value="cosecha">Cosecha</option>
        </select>
      </div>

      {/* Campo: Fecha límite */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Fecha límite</label>
        <input
          type="date"
          name="fechaLimite"
          value={form.fechaLimite}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
          required
        />
      </div>

      {/* Campo: Lote */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Lote</label>
        <select
          name="lote"
          value={form.lote}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none transition-all"
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

      {/* Campo: Técnicos */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Técnicos asignados</label>
        <div className="border border-gray-200 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-green-500">
          <select
            multiple
            value={form.tecnicosAsignados}
            onChange={handleTecnicosChange}
            className="w-full px-4 py-2 h-28 bg-transparent outline-none text-gray-700"
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
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-sm transition-all"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
