import axios from "axios";

const API = "http://localhost:5100/api/users";


export async function getUsersByRole(rol) {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API}/rol/${rol}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}