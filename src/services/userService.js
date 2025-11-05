// src/services/userService.js
import axios from "axios";

const API = "http://localhost:5100/api/users";

//  Obtener todos los usuarios
export async function getAllUsers() {
  const token = localStorage.getItem("token");
  const res = await axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// ✅ Obtener usuarios por rol
export async function getUsersByRole(rol) {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API}/rol/${rol}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// ✅ Crear usuario nuevo
export async function createUser(userData) {
  const token = localStorage.getItem("token");
  const res = await axios.post(API, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// ✅ Editar (actualizar) usuario existente
export async function updateUser(id, userData) {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${API}/${id}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// ✅ Eliminar usuario
export async function deleteUser(id) {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

// ✅ Cambiar rol del usuario
export async function updateUserRole(id, nuevoRol) {
  const token = localStorage.getItem("token");
  const res = await axios.put(
    `${API}/${id}/rol`,
    { rol: nuevoRol },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

