// src/services/tasksService.js
import axios from "axios";

const API = "http://localhost:5100/api/tasks";

export async function getTasks(loteId = null) {
  const token = localStorage.getItem("token");
  const url = loteId ? `${API}?loteId=${loteId}` : API; // 👈 Si viene, agrega query
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getLotes() {
  const { data } = await axios.get("/lotes");
  return data;
}

export async function createTask(data) {
  const token = localStorage.getItem("token");
  const res = await axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function updateTask(id, data) {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${API}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function deleteTask(id) {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

/* ✅ Nuevo método para cambiar solo el estado */
export async function updateTaskStatus(id, nuevoEstado) {
  const token = localStorage.getItem("token");
  const res = await axios.put(
    `${API}/${id}/estado`,
    { nuevoEstado },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}
