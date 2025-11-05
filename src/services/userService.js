// src/services/userService.js
import axios from "axios";

const API = "http://localhost:5100/api/users";

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const getAllUsers = async () => {
  const res = await axios.get(API, authHeader());
  return res.data;
};

export const createUser = async (userData) => {
  const res = await axios.post(`${API}/register`, userData, authHeader());
  return res.data;
};

export const updateUser = async (id, userData) => {
  const res = await axios.put(`${API}/${id}`, userData, authHeader());
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${API}/${id}`, authHeader());
  return res.data;
};

export const updateUserRole = async (id, rol) => {
  const res = await axios.put(`${API}/${id}/rol`, { rol }, authHeader());
  return res.data;
};

export const getUsersByRole = async (rol) => {
  const res = await axios.get(`${API}/rol/${rol}`, authHeader());
  return res.data;
};