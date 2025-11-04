
// src/services/incidentsService.js
import axios from "axios";

// ✅ URL real del backend (ajusta el puerto si es diferente)
const API = "http://localhost:5100/api/incidents";

// 🔹 Obtener todas las incidencias
export async function getIncidents() {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(API, {
      headers: { Authorization: `Bearer ${token}` },
    });

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

// 🔹 Crear una nueva incidencia
export async function createIncident(data) {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.post(API, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error al crear incidencia:", error.response?.data || error);
    throw error;
  }
}
// 🔹 Actualizar incidencia
export async function updateIncident(id, data) {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.put(`${API}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.incidencia;
  } catch (error) {
    console.error("Error al actualizar incidencia:", error);
    throw error;
  }
}

// 🔹 Eliminar incidencia
export async function deleteIncident(id) {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error al eliminar incidencia:", error);
    throw error;
  }
}