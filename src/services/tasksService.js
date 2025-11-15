// src/services/tasksService.js
// src/services/tasksService.js
import API from "./api";

export async function getTasks(loteId = null) {
  const url = loteId ? `/tasks?loteId=${loteId}` : "/tasks";
  const res = await API.get(url);
  return res.data;
}

export async function createTask(data) {
  const res = await API.post("/tasks", data);
  return res.data;
}

export async function updateTask(id, data) {
  const res = await API.put(`/tasks/${id}`, data);
  return res.data;
}

export async function deleteTask(id) {
  const res = await API.delete(`/tasks/${id}`);
  return res.data;
}

export async function updateTaskStatus(id, nuevoEstado) {
  const res = await API.put(`/tasks/${id}/estado`, { nuevoEstado });
  return res.data;
}
