// src/services/incidentsService.js
import API from "./api";

// 🔹 Obtener todas las incidencias
export async function getIncidents() {
  try {
    const res = await API.get("/incidents");

    return res.data.map((item) => ({
      id: item._id,
      title: item.descripcion,
      lot: item.lote?.nombre || "Sin lote",
      status: item.estado,
      date: new Date(item.createdAt).toLocaleDateString(),
      reportedBy: item.tecnico?.nombre || "Desconocido",
    }));
  } catch (error) {
    console.error("Error al obtener incidencias:", error);
    return [];
  }
}

// 🔹 Crear nueva incidencia
export async function createIncident(data) {
  try {
    const res = await API.post("/incidents", data);
    return res.data;
  } catch (error) {
    console.error("Error al crear incidencia:", error.response?.data || error);
    throw error;
  }
}

// 🔹 Actualizar incidencia
export async function updateIncident(id, data) {
  try {
    const res = await API.put(`/incidents/${id}`, data);
    return res.data.incidencia;
  } catch (error) {
    console.error("Error al actualizar incidencia:", error);
    throw error;
  }
}

// 🔹 Eliminar incidencia
export async function deleteIncident(id) {
  try {
    await API.delete(`/incidents/${id}`);
  } catch (error) {
    console.error("Error al eliminar incidencia:", error);
    throw error;
  }
}
