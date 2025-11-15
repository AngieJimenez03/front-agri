// src/services/userService.js
import API from "./api";

export const getAllUsers = async () => {
  const res = await API.get("/users");
  return res.data;
};

export const createUser = async (userData) => {
  const res = await API.post("/users/register", userData);
  return res.data;
};

export const updateUser = async (id, userData) => {
  const res = await API.put(`/users/${id}`, userData);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await API.delete(`/users/${id}`);
  return res.data;
};

export const updateUserRole = async (id, rol) => {
  const res = await API.put(`/users/${id}/rol`, { rol });
  return res.data;
};

export const getUsersByRole = async (rol) => {
  const res = await API.get(`/users/rol/${rol}`);
  return res.data;
};
